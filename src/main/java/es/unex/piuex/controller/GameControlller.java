package es.unex.piuex.controller;

import java.util.Date;
import java.util.Random;

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
		game.setStatus("Empezando");
		/*
		 * Aquí se deberían asignar las primeras 8 letras a los usuarios, pero la "bolsa" de letras
		 * se asigna al guardar la partida en la base de datos, y una vez guardada no podemos recuperarla
		 * ya que no sabemos qué id le va a asignar la base de datos, así que las letras de cada jugador
		 * se asignan al mostrar el tablero.
		 */
		gameDAO.add(game);
		System.out.println("Nueva partida por '" + userDAO.get(p1).getUsername() + "' desde '" + sr.getRemoteAddr() + ":" + sr.getRemotePort() + "' at '" + new Date().toString() + "'");
		
		return "redirect:/game/list?id=" + p1; 
		
	}
	
	@RequestMapping(value="/detail", method=RequestMethod.GET, params = "id")
	public String getBoard(@RequestParam int id, Model model, HttpSession session) {
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		Game game = gameDAO.get(id);
		int loggedUserId = ((User) session.getAttribute("loggedUser")).getId();
		boolean p1 = loggedUserId == game.getP1().getId();
		boolean p2 = loggedUserId == game.getP2().getId();
		boolean turn = (game.isP1Turn() && p1) || (!game.isP1Turn() && p2);
		if (p1 && p2) {
			// El usuario está jugando consigo mismo
			// Activar p1 o p2 dependiendo del turno actual
			p1 = game.isP1Turn();
			p2 = !game.isP1Turn();
		}
		// Comprobar si faltan letras y rellenar
		boolean update = false;
		if (p1 && game.getP1letters().contains(" ")) {
			StringBuffer letters = new StringBuffer(game.getLetters());
			StringBuffer pletters = new StringBuffer(game.getP1letters());
			Random random = new Random();
			int index = pletters.indexOf(" ");
			while (index != -1) {
				int rand = random.nextInt(letters.length());
				pletters.deleteCharAt(index).insert(index, letters.charAt(rand));
				letters.deleteCharAt(rand);
				index = pletters.indexOf(" ");
			}
			game.setLetters(letters.toString());
			game.setP1letters(pletters.toString());
			update = true;
		} else if (p2 && game.getP2letters().contains(" ")) {
			StringBuffer letters = new StringBuffer(game.getLetters());
			StringBuffer pletters = new StringBuffer(game.getP2letters());
			Random random = new Random();
			int index = pletters.indexOf(" ");
			while (index != -1) {
				int rand = random.nextInt(letters.length());
				pletters.deleteCharAt(index).insert(index, letters.charAt(rand));
				letters.deleteCharAt(rand);
				index = pletters.indexOf(" ");
			}
			game.setLetters(letters.toString());
			game.setP2letters(pletters.toString());
			update = true;
		}
		if (update) {
			gameDAO.update(game);
			game = gameDAO.get(game.getId());
		}
		String letras = null;
		if (p1) {
			letras = game.getP1letters();
		} else if (p2) {
			letras = game.getP2letters();
		}
		model.addAttribute("game", game);
		model.addAttribute("turn", turn);
		model.addAttribute("letters", letras);
		return "/game/board";
	}
	
	
	@RequestMapping(value="/detail", method=RequestMethod.POST)
	public String postBoard(int id, Model model, HttpSession session, String tablero, String fichas) {
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		Game game = gameDAO.get(id);
		game.setBoard(tablero); // Actualizar tablero
		if (game.getP1Turn()) {
			game.setP1letters(fichas);
		} else {
			game.setP2letters(fichas);
		}
		game.setP1Turn(!game.getP1Turn()); // Cambiar turno
		gameDAO.update(game);
		return "redirect:/game/detail?id=" + id;
	}

}
