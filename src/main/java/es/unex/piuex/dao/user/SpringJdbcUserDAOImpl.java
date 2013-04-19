package es.unex.piuex.dao.user;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import es.unex.piuex.domain.User;


@Repository
public class SpringJdbcUserDAOImpl implements UserDAO {

	private JdbcTemplate jdbcTemplate;
	
	
	@Autowired
	public void init(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	private final String USER_INSERT_SQL = "INSERT INTO APALABRADOS.USER (NAME, USERNAME, AVATAR, EMAIL, PASSWORD, LEVEL) VALUES (?, ?, ?, ?, ?, ?)";
	private final String USER_SELECT_SQL = "SELECT ID, NAME, USERNAME, EMAIL, PASSWORD, AVATAR, LEVEL, OPPONENTS, RANK FROM APALABRADOS.USER";
	private final String USER_SAVE_SQL = "UPDATE APALABRADOS.USER SET (AVATAR, LEVEL, OPPONENTS) = (?, ?, ?) WHERE USERNAME = ?";
	
	@Override
	public List<User> getAll() {
		return jdbcTemplate.query(USER_SELECT_SQL, new UserMapper());
	}
	
	public static final class UserMapper implements RowMapper<User> {
		public User mapRow(ResultSet rs, int rowNum) throws SQLException {
			User user = new User();
			user.setId(rs.getInt("id"));
			user.setName(rs.getString("name"));
			user.setUsername(rs.getString("username"));
			user.setEmail(rs.getString("email"));
			user.setPassword(rs.getString("password"));
			user.setAvatarFileName(rs.getString("avatar"));
			user.setLevel(rs.getString("level"));
			user.setRank(rs.getInt("rank"));
			//user.setOpponentsLevel(rs.getString("opponents"));
			return user;
		}
	}

	
	@Override
	public User get(String username) {
		try {
			return jdbcTemplate.queryForObject(USER_SELECT_SQL + " where username = ?", new Object[]{username}, new UserMapper());
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}
	
	@Override
	public User get(int id) {
		try {
			return jdbcTemplate.queryForObject(USER_SELECT_SQL + " where id = ?", new Object[]{id}, new UserMapper());
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}

	@Override
	public void add(User user) {
		jdbcTemplate.update(USER_INSERT_SQL, new Object[] {user.getName(), user.getUsername(), "pf.png", user.getEmail(), user._getPassword(), "newbie"});
	}
	
	public void save(User user) {
		//TODO: encode opponents values in String
		jdbcTemplate.update(USER_SAVE_SQL, new Object[] {user.getAvatarFileName(), user.getLevel(), "newbie", user.getUsername()});
	}

	@Override
	public boolean exists(String username) {
		return get(username) == null? false: true;
	}
	
}
