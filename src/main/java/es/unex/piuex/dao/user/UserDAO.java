package es.unex.piuex.dao.user;

import java.util.List;

import es.unex.piuex.domain.User;

public interface UserDAO {
	
	public List<User> getAll();
	
	/**
	 * Gets the user with user-name <code>username</code>.
	 * 
	 * @param username User-name of the user.
	 * @return User if user exists, null otherwise.
	 */
	public User get(String username);
	
	public User get(int id);
	
	public boolean exists(String username);
	
	public void add(User user);
	
	public void save(User user);
	
	public boolean delete(int id);
}
