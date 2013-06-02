package es.unex.piuex.controller;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import es.unex.piuex.dao.user.UserDAO;
import es.unex.piuex.domain.User;
import es.unex.piuex.exceptions.UnknownResourceException;


@Controller
@RequestMapping("/users")
public class JsonUserControlller {
	
	private static final Logger logger = LoggerFactory.getLogger(JsonUserControlller.class);
	
	@Autowired
	private UserDAO userDAO;
	
	
	@RequestMapping(method=RequestMethod.GET, params="alt=jsp")
	public String getAJAXUI() {
		return "/json";
	}
	
	
	@RequestMapping(method=RequestMethod.GET, params="alt=json")
	public @ResponseBody List<User> getUsersParam() {
		return userDAO.getAll();
	}
	
	@RequestMapping(method=RequestMethod.GET, produces="application/json")
	public @ResponseBody List<User> getUsersAccept() {
		return userDAO.getAll();
	}
	
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET, params="alt=json")
	public @ResponseBody User getUserParam(@PathVariable int id) {
		User user = userDAO.get(id);
		if (user == null) {
			logger.info("Se ha lanzado la excepcion UnknownResourceException!");
			throw new UnknownResourceException("El usuario no existe!");
		}
		return user;
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET, produces="application/json")
	public @ResponseBody User getUserAccept(@PathVariable int id) {
		return userDAO.get(id);
	}
	
	
	@RequestMapping(method=RequestMethod.POST, consumes="application/json")
	public @ResponseBody User postUser(@RequestBody User user) {
		if (userDAO.get(user.getUsername()) != null) {
			return user;
		}
		userDAO.add(user);
		return userDAO.get(user.getUsername());
	}
	
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE, consumes="application/json")
	public @ResponseBody String deleteUser(@PathVariable int id) {
		if (userDAO.delete(id)) {
			return "User " + id + " borrado!";
		} else {
			return "ERROR: No existe ese usuario!";
		}
	}
	
	@RequestMapping(method=RequestMethod.DELETE, consumes="application/json")
	public @ResponseBody String deleteUsers() {
		for (User user: userDAO.getAll()) {
			userDAO.delete(user.getId());
		}
		return "¡Todos los usuarios han sido borrados!";
	}
	
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT, consumes="application/json")
	public @ResponseBody User putUser(@RequestBody User user, @PathVariable int id) {
		User u = userDAO.get(id);
		if (u != null) {
			user.setUsername(u.getUsername());
			userDAO.save(user);
		}
		return user;
	}
}
