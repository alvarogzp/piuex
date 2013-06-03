package es.unex.piuex.controller;

import java.util.Date;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import es.unex.piuex.domain.GameState;
import es.unex.piuex.domain.User;

@Controller
@RequestMapping("/game")
public class GameControlller {
	
	private static final Logger logger = LoggerFactory.getLogger(GameControlller.class);
	
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
		model.addAttribute("username", userDAO.get(id).getUsername());
		model.addAttribute("users", userDAO.getAll());
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
		model.addAttribute("p1", -1);

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
		game.setState(GameState.ESPERANDO);
		// Empieza el jugador 2
		game.setP1Turn(false);
		/*
		 * Aquí se deberían asignar las primeras 8 letras a los usuarios, pero la "bolsa" de letras
		 * se asigna al guardar la partida en la base de datos, y una vez guardada no podemos recuperarla
		 * ya que no sabemos qué id le va a asignar la base de datos, así que las letras de cada jugador
		 * se asignan al confirmar la partida el otro jugador.
		 */
		gameDAO.add(game);
		logger.info("Nueva partida por '{}' desde '{}:{}' at '{}'", new Object[] {userDAO.get(p1).getUsername(), sr.getRemoteAddr(), sr.getRemotePort(), new Date().toString()});
		
		return "redirect:/game/list?id=" + p1; 
	}
	
	
	@RequestMapping(value="/detail", method=RequestMethod.GET, params={"id", "action=accept"})
	public String acceptGame(@RequestParam int id, Model model, HttpSession session) {
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		
		Game game = gameDAO.get(id);
		// Actualizar estado
		game.setState(GameState.JUGANDO);
		// Rellenar fichas
		game.updateP1letters();
		game.updateP2letters();
		// Poner turno al jugador 2 para que empieze este, ya que la acaba de aceptar,
		// así no hay que esperar a que el jugador 1 vuelva a conectarse
		game.setP1Turn(false);
		gameDAO.update(game);
		// Redirigir al tablero
		return "redirect:/game/detail?id=" + game.getId();
	}
	
	
	@RequestMapping(value="/detail", method=RequestMethod.GET, params={"id", "action=reject"})
	public String rejectGame(@RequestParam int id, Model model, HttpSession session) {
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		Game game = gameDAO.get(id);
		game.setState(GameState.RECHAZADA);
		gameDAO.update(game);
		// El usuario que puede aceptar o rechazar la partida es el 2, así que se redirige a su lista
		return "redirect:/game/list?id=" + game.getP2().getId();
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
		boolean turn = ((game.isP1Turn() && p1) || (!game.isP1Turn() && p2)) && game.getState() == GameState.JUGANDO;
		if (p1 && p2) {
			// El usuario está jugando consigo mismo
			// Activar p1 o p2 dependiendo del turno actual
			p1 = game.isP1Turn();
			p2 = !game.isP1Turn();
		}
		model.addAttribute("game", game);
		model.addAttribute("turn", turn);
		model.addAttribute("letters", p1? game.getP1letters(): p2? game.getP2letters(): null);
		model.addAttribute("winner", game.winner());
		return "/game/board";
	}
	
	
	@RequestMapping(value="/detail", method=RequestMethod.POST)
	public String postBoard(int id, Model model, HttpSession session, String tablero, String fichas, int puntos, RedirectAttributes attrs) {
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";
		Game game = gameDAO.get(id);
		// Actualizar tablero
		game.setBoard(tablero);
		// Actualizar fichas y puntos
		User user = null;
		if (game.getP1Turn()) {
			game.setP1letters(fichas);
			game.updateP1letters();
			game.setP1Score(game.getP1Score() + puntos);
			if (game.getP1().getMaxPuntosJugada() < puntos) {
				user = game.getP1();
			}
		} else {
			game.setP2letters(fichas);
			game.updateP2letters();
			game.setP2Score(game.getP2Score() + puntos);
			if (game.getP2().getMaxPuntosJugada() < puntos) {
				user = game.getP2();
			}
		}
		// Cambiar turno
		game.setP1Turn(!game.getP1Turn());
		// Si se ha acabado la partida, actualizar su estado
		if (game.isEnd()) {
			game.setState(GameState.FINALIZADA);
		}
		gameDAO.update(game);
		
		// Si se ha batido un record en los puntos, actualizar usuario
		if (user != null) {
			user.setMaxPuntosJugada(puntos);
			userDAO.save(user);
		}
		
		// Añadir un atributo flash para pasar los puntos de la jugada
		attrs.addFlashAttribute("puntosJugadaAnterior", puntos);
		
		return "redirect:/game/detail?id=" + id;
	}

	
	@RequestMapping(value="/delete", method=RequestMethod.GET, params="id")
	public String deleteGame(@RequestParam int id,@RequestParam int next, HttpSession session) {
		// Comprobar que el usuario esté logueado
		if (session.getAttribute("loggedUser") == null)
			return "redirect:/user/login";

		gameDAO.delete(id);
		
		return "redirect:/game/list" + (next != -1? ("?id=" + next): "");
	}
	
}