package es.unex.piuex.dao.user;

import java.util.ArrayList;
import java.util.List;

//import org.springframework.stereotype.Service;

import es.unex.piuex.domain.User;


//Comentado para que no de problemas: @Service
public class SimpleUserDAO implements UserDAO {

	List<User> users;
	
	public SimpleUserDAO(){
		users = new ArrayList<User>(10);
		users.add(new User("Ana Lucero","ana@unex.es"));
		users.add(new User("Paco Rejas","paco@unex.es"));
		users.add(new User("Ariel Blanco","ariel@unex.es"));
	}
	
	@Override
	public List<User> getAll() {
		return users;
	}

	@Override
	public void add(User user) {
		users.add(user);

	}

	@Override
	public User get(String username) {
		for(User user: users)
			if (user.getUsername().equals(username)) return user;
		return null;
	}

	@Override
	public void save(User user) {
		int i;
		for (i = 0; i < users.size(); i++) {
			User u = users.get(i);
			if (u.getUsername() == user.getUsername()) {
				break;
			}
		}
		if (i == users.size()) {
			System.err.println("ERROR: No existe el usuario que se intentaba actualizar " + user.getUsername());
		} else {
			users.set(i, user);
		}
	}

	@Override
	public boolean exists(String username) {
		return get(username) == null? false: true;
	}

	@Override
	public User get(int id) {
		for(User user: users)
			if (user.getId() == id) return user;
		return null;
	}

	@Override
	public boolean delete(int id) {
		return users.remove(get(id));
	}

}
