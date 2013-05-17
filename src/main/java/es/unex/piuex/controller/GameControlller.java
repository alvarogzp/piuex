package es.unex.piuex.controller;

import java.util.Date;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import es.unex.piuex.dao.game.GameDAO;
import es.unex.piuex.dao.user.UserDAO;
import es.unex.piuex.domain.Game;
import es.unex.piuex.domain.User;

@Controller
@RequestMapping("/game")
public class GameControlller {
	
	@Autowired
	private GameDAO gameDAO;
	
	@Autowired
	private UserDAO userDAO;
	
	@RequestMapping(method=RequestMethod.GET)
	public String emptyForm() {
		return "redirect:/game/list";
	}
	
	@RequestMapping(value="/list", method=RequestMethod.GET, params = "id")
	public String getGameList(@RequestParam int id, Model model, HttpSession session, RedirectAttributes attrs) {
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		// Comprobar que el usuario que solicita las partidas sea el mismo que las partidas que se desean ver, excepto si es el administrador que puede acceder a todas las partidas
		if (!((User)session.getAttribute("loggedUser")).getUsername().equals(userDAO.get(id).getUsername()) && ((User)session.getAttribute("loggedUser")).getRank() != 0) {
			attrs.addFlashAttribute("errormessage", "¡No puedes acceder a las partidas de ese usuario!");
			return "redirect:/user/list";
		}
		model.addAttribute("games", gameDAO.getAllUser(id));
		User p1 = userDAO.get(id);
		model.addAttribute("username", userDAO.get(id).getUsername());
		model.addAttribute("users", userDAO.getAll());
		model.addAttribute("newGame", new Game("initializing", true, p1, null));
		model.addAttribute("p1", id);

		return "/game/list";
	}
	
	@RequestMapping(value="/list", method=RequestMethod.GET, params = "!id")
	public String getAllGameList(Model model, HttpSession session, RedirectAttributes attrs) {
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		// Solo el administrador puede ver todas las partidas
		if (((User)session.getAttribute("loggedUser")).getRank() != 0) {
			attrs.addFlashAttribute("errormessage", "¡No puedes ver toda la lista de partidas!");
			return "redirect:/user/list";
		}
		model.addAttribute("games", gameDAO.getAll());
		model.addAttribute("username", "todos");
		model.addAttribute("users", userDAO.getAll());
		model.addAttribute("newGame", new Game());

		return "/game/list";
	}
	
	
	@RequestMapping(value="/new", method=RequestMethod.POST)
	public String processNewGame(int p1, int p2, Model model, HttpSession session, ServletRequest sr) {
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		Game game = new Game();
		game.setP1(userDAO.get(p1));
		game.setP2(userDAO.get(p2));
		game.setStatus("starting");
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < 15; i++) {
			for (int j = 0; j < 15; j++) {
				sb.append(' ');
			}
			if (i < 14) {
				sb.append('.');
			}
		}
		game.setBoard(sb.toString());
		gameDAO.add(game);
		System.out.println("Nueva partida por '" + userDAO.get(p1).getUsername() + "' desde '" + sr.getRemoteAddr() + ":" + sr.getRemotePort() + "' at '" + new Date().toString() + "'");
		
		return "redirect:/game/list?id=" + p1; 
		
	}
	
	@RequestMapping(value="/detail", method=RequestMethod.GET, params = "id")
	public String getBoard(@RequestParam int id, Model model, HttpSession session) {
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		model.addAttribute("game", gameDAO.get(id));
		return "/game/board";
	}
	
	
	@RequestMapping(value="/detail", method=RequestMethod.POST)
	public String postBoard(int id, Model model, HttpSession session, String tablero) {
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		Game game = gameDAO.get(id);
		game.setBoard(tablero);
		gameDAO.update(game);
		model.addAttribute("game", game);
		return "/game/board";
	}

}
