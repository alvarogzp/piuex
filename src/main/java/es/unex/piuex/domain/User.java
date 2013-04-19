package es.unex.piuex.domain;

import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

public class User {
	
	private int id;
	
	@NotBlank
	@Size(max=50)
	private String name;
	
	@NotBlank
	@Size(max=20)
	private String username;
	
	@NotEmpty
	@Email
	@Size(max=50)
	private String email;
	
	@Size(min=4, max=64)
	private String password;
	
	@Size(max=10)
	private String level;
	
	@Size(max=40)
	private String avatarFileName;
	
	/**
	 * Rango del usuario:
	 * 0 es Administrador
	 * 10 es Usuario normal (jugador)
	 */
	private int rank = 10;
	

	public User(){
		this.name = "";
		this.email = "";
		this.username = "";
		this.level = "newbie";
		this.avatarFileName = "pf.png";
	}
	
	//Creado para implementacion SimpleUserDAO
	public User(String name, String email) {
		this.name = name;
		this.email = email;
		this.username = email.split("@")[0];
		this.level = "newbie";
		this.avatarFileName = "pf.png";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean ckeckPassword(User user) {
		return this.password.equals(user.password);
	}
	
	/**
	 * Tiene una barra baja delante para que Spring no muestre las contraseñas cuando muestra la información del usuario.
	 * 
	 * @return Contraseña
	 */
	public String _getPassword() {
		return password;
	}
	
	/**
	 * Devuelve una cadena fija para no mostrar las contraseñas
	 * 
	 * @return <hidden>
	 */
	public String getPassword() {
		return "<hidden>";
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}
	
	public String getAvatarFileName() {
		return avatarFileName;
	}
	
	public void setAvatarFileName(String avatar) {
		this.avatarFileName = avatar;
	}
	
	
	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}
}
