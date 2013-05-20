package es.unex.piuex.controller;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJacksonHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

import es.unex.piuex.dao.user.UserDAO;
import es.unex.piuex.domain.User;
import es.unex.piuex.utils.IpInfo;


/**
 * 
 * Controlador de /user
 * 
 * @author Carlos Rufo Jiménez
 * @author Álvaro Gutiérrez Pérez
 */
@Controller
@RequestMapping("/user")
@SessionAttributes("userBean")
public class UserControlller {
	
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private ServletContext servletContext;
	
	// Invoked initially to create the "form" attribute
	// Once created the "form" attribute comes from the HTTP session (see @SessionAttributes)
	@ModelAttribute("userBean")
	public User createUserBean() {
		return new User();
	}

	@RequestMapping(method=RequestMethod.GET)
	public String emptyForm(HttpSession session) {
		// Comprobar si el usuario está logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		else
			return "redirect:/user/list";
	}

	@RequestMapping(value="/registrate", method=RequestMethod.GET)
	public String registratePage(HttpSession session) {
		// Comprobar que el usuario NO esté logueado
		if (session.getAttribute("loggedUser") != null)
			// Redirigir a /user
			return "redirect:/user";
		return "/user/registrate";
	}
	
	@RequestMapping(value="/registrate", method=RequestMethod.POST)
	public String processSubmit(@Valid @ModelAttribute("userBean") User userBean, BindingResult result, Model model, RedirectAttributes attrs, HttpSession session, ServletRequest sr) {
		if (result.hasErrors() || userDAO.exists(userBean.getUsername())) {
			if (userDAO.exists(userBean.getUsername())) {
				model.addAttribute("errormessage", "El usuario que ha introducido ya existe");
			}
			model.addAttribute("userBean", userBean);
			return "/user/registrate";
		}
		userDAO.add(userBean);
		System.out.println("Creado usuario '" + userBean.getUsername() + "' por '" + sr.getRemoteAddr() + ":" + sr.getRemotePort() + "' at '" + new Date().toString() + "'");
		session.setAttribute("loggedUser", userDAO.get(userBean.getUsername()));
		// Añadir un atributo flash para asociar el siguiente GET al usuario que hizo el POST
		attrs.addFlashAttribute("userBean", userBean);
		return "redirect:/user/profile";
	}
	
	
	@RequestMapping(value="/profile", method=RequestMethod.GET, params="!username")
	public String getProfile(Model model, HttpServletRequest request, HttpSession session){
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		// Comprobar que haya atributos flash
		Map<String,?> map = RequestContextUtils.getInputFlashMap(request);
		if (map == null) {
			model.addAttribute("userBean", session.getAttribute("loggedUser"));
		}
		model.addAttribute("map", getMap());
		return "/user/profile";
	}
	
	@RequestMapping(value="/profile", method=RequestMethod.GET, params="username")
	public String populatedForm(@RequestParam String username, Model model, RedirectAttributes attrs, HttpSession session){
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		// Comprobar que el usuario que solicita el perfil sea el mismo que el perfil que se desea ver, excepto si es el administrador que puede acceder a todos los perfiles
		if (!((User)session.getAttribute("loggedUser")).getUsername().equals(username) && ((User)session.getAttribute("loggedUser")).getRank() != 0) {
			attrs.addFlashAttribute("errormessage", "¡No puedes acceder al perfil de ese usuario!");
			return "redirect:/user/list";
		}
		model.addAttribute("userBean", userDAO.get(username));
		model.addAttribute("map", getMap());
		return "/user/profile";
	}
	
	@RequestMapping(value="/profile", method=RequestMethod.POST)
	public String profileSubmit(@RequestParam MultipartFile file, User userBean, Model model, HttpSession session){
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		
		if (!file.isEmpty()) {
			//Save image to file
			String orgName = file.getOriginalFilename();
			String filePathToAvatarsDir = servletContext.getRealPath("/resources/avatars");
			int extIndex = orgName.lastIndexOf('.');
			String fileName = userBean.getUsername() + "." + (extIndex > 0? orgName.substring(extIndex+1).toLowerCase(): "");
			userBean.setAvatarFileName(fileName);
			File dest = new File(filePathToAvatarsDir, fileName);
			System.out.println("Nueva imagen: " + dest.getPath());
			try {
				file.transferTo(dest);
			} catch (IllegalStateException e) {
				e.printStackTrace();
				return "File uploaded failed: " + orgName;
			} catch (IOException e) {
				e.printStackTrace();
				return "File uploaded failed: " + orgName;
			}
		} else {
			userBean.setAvatarFileName(userDAO.get(userBean.getUsername()).getAvatarFileName());
		}
		
		userDAO.save(userBean);
		return "redirect:/user/list";
	}
	
	
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String loginPage(HttpSession session) {
		// Comprobar que el usuario NO esté logueado
		if (session.getAttribute("loggedUser") != null)
			return "redirect:/user";
		return "/user/login";
	}
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String processLogin(@Valid @ModelAttribute("userBean") User userBean, BindingResult result, Model model, HttpSession session, ServletRequest sr) {
		User loggedUser = userDAO.get(userBean.getUsername());
		if (loggedUser == null || !loggedUser.ckeckPassword(userBean)) {
			model.addAttribute("errormessage", "Usuario o contraseña incorrectos");
			return "/user/login";
		}
		
		session.setAttribute("loggedUser", loggedUser);
		System.out.println("Ha entrado '" + loggedUser.getUsername() + "' desde '" + sr.getRemoteAddr() + ":" + sr.getRemotePort() + "' at '" + new Date().toString() + "'");
		return "redirect:/user/list";
	}
	
	
	@RequestMapping(value="/logout", method=RequestMethod.GET)
	public String logout(HttpSession session, ServletRequest sr) {
		session.invalidate();
		System.out.println("Cerrada sesión por '" + sr.getRemoteAddr() + ":" + sr.getRemotePort() + "' at '" + new Date().toString() + "'");
		
		return "redirect:/user";
	}
	
	
	@RequestMapping("/list")
	public String getList(Model model, HttpSession session){
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		model.addAttribute("users", userDAO.getAll());
		return "/user/list";
	}
	
	
	private IpInfo getMap() {
		try {
			// URI
			String url = "http://freegeoip.net/json/158.49.113.104";
			// Create a REST template
			RestTemplate restTemplate = new RestTemplate();
			// Create a list for the message converters
			List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
			// Add the Jackson Message converter
			messageConverters.add(new MappingJacksonHttpMessageConverter());
			// Add the message converters to the restTemplate
			restTemplate.setMessageConverters(messageConverters);
			// A simple GET request, the response will be maped to IpInfo.class
			IpInfo result = restTemplate.getForObject(url, IpInfo.class);
			return result;
		} catch (Exception e) {
			// Si hay algún error, devolver las coordenadas de Cáceres
			IpInfo result = new IpInfo();
			result.setLatitude(39.4819f);
			result.setLongitude(-6.3732f);
			return result;
		}
	}
	
}

