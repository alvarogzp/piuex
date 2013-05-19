package es.unex.piuex.domain;

public class Game {
	
	private int id;

	private String status;
	
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
		this.status = "initializing";
		this.p1Turn = true;
	}

	public Game(String status, boolean p1Turn, User p1, User p2) {
		this.status = status;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
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
	
}
