package es.unex.piuex.dao.game;

import java.util.List;

import es.unex.piuex.domain.Game;

public interface GameDAO {
	
	public List<Game> getAll();
	
	public Game get(int id);
	
	public boolean exists(int id);
	
	public void add(Game game);
	
	public void update(Game game);
	
	public List<Game> getAllUser(int id);
	
	public boolean delete(int id);
}
