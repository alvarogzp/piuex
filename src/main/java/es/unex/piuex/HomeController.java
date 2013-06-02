package es.unex.piuex;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.ServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model, ServletRequest sr) {
		//logger.info("Welcome home! The client locale is {}.", locale);
		logger.info("GET '/' by '" + sr.getRemoteAddr() + ":" + sr.getRemotePort() + "' at '" + new Date().toString() + "'");
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.MEDIUM, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	
	
	@RequestMapping(value="/version", method=RequestMethod.GET)
	public String version() {
		return "/version";
	}
	
	@RequestMapping(value="/errors/error404")
	public String error404(){
		return "/errors/error404";
	}
	
	@RequestMapping(value="/errors/error500")
	public String error500(){
		return "/errors/error500";
	}
	
	@RequestMapping(value="/errors/error")
	public String error(){
		return "/errors/error";
	}
}
