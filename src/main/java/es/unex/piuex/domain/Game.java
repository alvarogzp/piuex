package es.unex.piuex.domain;

import java.util.Random;

public class Game {
	
	private int id;

	private GameState status;
	
	private boolean p1Turn;
	
	private User p1;
	
	private User p2;
	
	private int p1Score;
	
	private int p2Score;
	
	private String board;
	
	private String letters;
	
	private String p1letters;
	
	private String p2letters;
	

	public Game() {
		this.status = GameState.ESPERANDO;
		this.p1Turn = true;
	}

	public Game(String status, boolean p1Turn, User p1, User p2) {
		setStatus(status);
		this.p1Turn = p1Turn;
		this.p1 = p1;
		this.p2 = p2;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	/**
	 * Para no romper el código existente, este método devuelve un String,
	 * aunque el tipo de status es GameState.
	 * 
	 * Si desea obtener el elemento GameState, use el método {@link #getState()}.
	 * 
	 * @return Estado de la partida en forma de cadena.
	 */
	public String getStatus() {
		return status.toString();
	}

	/**
	 * Para no romper el código existente, este método recibe un String,
	 * aunque el tipo de status es GameState.
	 * 
	 * Si desea pasar como parámetro un elemento GameState, use el método {@link #setState(GameState)}.
	 * 
	 * @param status Estado de la partida como cadena de texto.
	 */
	public void setStatus(String status) {
		this.status = GameState.fromString(status);
	}
	
	/**
	 * Devuelve el valor del elemento status.
	 * 
	 * Para obtener este valor como cadena, use {@link #getStatus()}.
	 * 
	 * @return El estado de la partida como elemento GameState.
	 */
	public GameState getState() {
		return status;
	}
	
	/**
	 * Establece el estado de la partida pasando un elemento GameState directamente.
	 * 
	 * Si desea establecer el estado de la partida a partir de un String, use {@link #setStatus(String)}.
	 * 
	 * @param status Estado de la partida que poner.
	 */
	public void setState(GameState status) {
		this.status = status;
	}

	public boolean isP1Turn() {
		return p1Turn;
	}
	
	public boolean getP1Turn() {
		return isP1Turn();
	}

	public void setP1Turn(boolean p1Turn) {
		this.p1Turn = p1Turn;
	}

	public User getP1() {
		return p1;
	}

	public void setP1(User p1) {
		this.p1 = p1;
	}

	public User getP2() {
		return p2;
	}

	public void setP2(User p2) {
		this.p2 = p2;
	}
	
	public int getP1Score() {
		return p1Score;
	}

	public void setP1Score(int p1Score) {
		this.p1Score = p1Score;
	}

	public int getP2Score() {
		return p2Score;
	}

	public void setP2Score(int p2Score) {
		this.p2Score = p2Score;
	}

	public String getBoard() {
		return board;
	}

	public void setBoard(String board) {
		this.board = board;
	}

	public String getLetters() {
		return letters;
	}

	public void setLetters(String letters) {
		this.letters = letters;
	}

	public String getP1letters() {
		return p1letters;
	}

	public void setP1letters(String p1letters) {
		this.p1letters = p1letters;
	}

	public String getP2letters() {
		return p2letters;
	}

	public void setP2letters(String p2letters) {
		this.p2letters = p2letters;
	}
	
	
	/**
	 * Actualiza las fichas del jugador 1, si es que le falta alguna.
	 */
	public void updateP1letters() {
		p1letters = updateLetters(p1letters);
	}
	
	/**
	 * Actualiza las fichas del jugador 2, si es que le falta alguna.
	 */
	public void updateP2letters() {
		p2letters = updateLetters(p2letters);
	}
	
	/**
	 * Actualiza las fichas de la cadena pasada como parámetro.
	 * 
	 * Si en la cadena no hay ningún hueco o si en la lista de letras no quedan letras,
	 * devuelve la misma cadena sin modificar.
	 * En caso contrario, añade tantas letras como espacios haya en la cadena
	 * o hasta que se acaben las letras de la bolsa, lo que primero ocurra.
	 * 
	 * @param pLetters Cadena con las letras a actualizar.
	 * 
	 * @return Cadena con las letras rellenadas, siempre que haya suficientes letras.
	 */
	private String updateLetters(String pLetters) {
		if (pLetters.contains(" ") && letters.length() > 0) {
			StringBuffer letters = new StringBuffer(this.letters);
			StringBuffer pletters = new StringBuffer(pLetters);
			Random random = new Random();
			int index = pletters.indexOf(" ");
			while (index != -1 && letters.length() > 0) {
				int rand = random.nextInt(letters.length());
				pletters.deleteCharAt(index).insert(index, letters.charAt(rand));
				letters.deleteCharAt(rand);
				index = pletters.indexOf(" ");
			}
			this.letters = letters.toString();
			return pletters.toString();
		}
		return pLetters;
	}
	
	
	/**
	 * Devuelve true si se ha alcanzado el final de la partida, false si no.
	 * 
	 * Actualmente, la condición de fin comprueba si las letras de algún jugador
	 * están vacías, de esta forma para acabar una partida se tienen que acabar
	 * todas las letras de la bolsa y las de un jugador.
	 * 
	 * Este método debe ser llamado SIEMPRE después de actualizar las letras
	 * de los jugadores, de lo contrario estas podrían estar vacías si se han
	 * usado todas durante la jugada.
	 * 
	 * @return true si la partida se ha acabado
	 */
	public boolean isEnd() {
		return p1letters.trim().isEmpty() || p2letters.trim().isEmpty();
	}
	
	
	/**
	 * Devuelve el número del jugador que tiene más puntos (1 o 2),
	 * o 0 si ambos tienen los mismos puntos.
	 * 
	 * Si la partida ya ha finalizado, este método sirve para saber quién ha ganado.
	 * 
	 * @return 1 si p1 tiene más puntos que p2, 2 si es al contrario y 0 si ambos tienen los mismos puntos.
	 */
	public int winner() {
		return p1Score > p2Score? 1: p1Score < p2Score? 2: 0;
	}
}
