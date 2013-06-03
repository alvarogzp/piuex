package es.unex.piuex.dao.game;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import es.unex.piuex.dao.user.SpringJdbcUserDAOImpl;
import es.unex.piuex.domain.Game;
import es.unex.piuex.domain.User;

@Repository
public class SpringJdbcGameDAOImpl implements GameDAO {

	private JdbcTemplate jdbcTemplate;
	
	
	@Autowired
	public void init(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	private final String GAME_INSERT_SQL = "INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2) VALUES (?, ?, ?, ?)";
	private final String GAME_SELECT_SQL = "SELECT ID, STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD, LETTERS, P1LETTERS, P2LETTERS FROM APALABRADOS.GAME";
	private final String GAME_UPDATE_SQL = "UPDATE APALABRADOS.GAME SET (STATUS, P1TURN, P1SCORE, P2SCORE, BOARD, LETTERS, P1LETTERS, P2LETTERS) = (?, ?, ?, ?, ?, ?, ?, ?) WHERE ID = ?";
	private final String GAME_DELETE_SQL = "DELETE FROM APALABRADOS.GAME WHERE ID = ?";
	
	private final String GAME_ORDER_SQL = " ORDER BY ID" ;
	
	private static final String USER_SELECT_SQL = "SELECT ID, NAME, USERNAME, EMAIL, PASSWORD, AVATAR, LEVEL, RANK, MAXPUNTOSJUGADA FROM APALABRADOS.USER";

	
	@Override
	public List<Game> getAll() {
		return jdbcTemplate.query(GAME_SELECT_SQL, new UserMapper(jdbcTemplate));
	}
	
	private static final class UserMapper implements RowMapper<Game> {
		
		private JdbcTemplate jdbcTemplate;
		
		public UserMapper(JdbcTemplate jdbcTemplate){
			this.jdbcTemplate = jdbcTemplate;
		}
		
		public Game mapRow(ResultSet rs, int rowNum) throws SQLException {
			Game game = new Game();
			game.setId(rs.getInt("id"));
			game.setStatus(rs.getString("status"));
			game.setP1Turn(rs.getInt("p1turn") == 1);
			game.setP1(getUser(rs.getInt("p1")));
			game.setP2(getUser(rs.getInt("p2")));
			game.setP1Score(rs.getInt("p1score"));
			game.setP2Score(rs.getInt("p2score"));
			game.setBoard(rs.getString("board"));
			game.setLetters(rs.getString("letters"));
			game.setP1letters(rs.getString("p1letters"));
			game.setP2letters(rs.getString("p2letters"));
			return game;
		}
		
		public User getUser(int id) {
			try {
				return jdbcTemplate.queryForObject(USER_SELECT_SQL + " where id = ?", new Object[]{id}, new SpringJdbcUserDAOImpl.UserMapper());
			} catch (EmptyResultDataAccessException e) {
				return null;
			}
		}
	}
	

	@Override
	public Game get(int id) {
		try {
			return jdbcTemplate.queryForObject(GAME_SELECT_SQL + " where id = ?", new Object[]{id}, new UserMapper(jdbcTemplate));
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}
	
	

	@Override
	public boolean exists(int id) {
		return get(id) == null? false: true;
	}

	
	@Override
	public void add(Game game) {
		jdbcTemplate.update(GAME_INSERT_SQL, new Object[] {game.getStatus(), game.getP1Turn(), game.getP1().getId(), game.getP2().getId()});
	}

	
	@Override
	public void update(Game game) {
		jdbcTemplate.update(GAME_UPDATE_SQL, new Object[] {game.getStatus(), game.getP1Turn(), game.getP1Score(), game.getP2Score(), game.getBoard(), game.getLetters(), game.getP1letters(), game.getP2letters(), game.getId()});
	}

	
	@Override
	public List<Game> getAllUser(int id) {
		return jdbcTemplate.query(GAME_SELECT_SQL + " where p1 = ? or p2 = ?" + GAME_ORDER_SQL, new Object[]{id, id}, new UserMapper(jdbcTemplate));		
	}
	
	
	@Override
	public boolean delete(int id) {
		return jdbcTemplate.update(GAME_DELETE_SQL, new Object[] {id}) > 0;
	}
}
