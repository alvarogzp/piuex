package es.unex.piuex.domain;

/**
 * Posibles estados de una partida.
 * 
 * @author Álvaro y Carlos
 *
 */
public enum GameState {
	
	/**
	 * Estado inicial.
	 * La partida comienza esperando a que el otro jugador la acepte.
	 */
	ESPERANDO,
	
	/**
	 * Este estado indica que la partida ya ha comenzado y ambos jugadores juegan.
	 */
	JUGANDO,
	
	/**
	 * La partida ha finalizado.
	 */
	FINALIZADA,
	
	/**
	 * El otro usuario no ha aceptado la invitación a jugar, y la partida se ha rechazado.
	 */
	RECHAZADA,
	
	/**
	 * Estado de partida desconocido.
	 * Este estado es usado cuando no se puede determinar el estado de una partida.
	 */
	DESCONOCIDO;
	
	
	/**
	 * Devuelve el nombre de la constante con la primera letra mayúscula y el resto minúsculas.
	 */
	@Override
	public String toString() {
		// Nombre de la constante en mayúsculas
		String mayusculas = name();
		// Copiar el primer carácter igual y el resto en minúsculas
		return new StringBuffer(mayusculas.length())
		.append(mayusculas.charAt(0))
		.append(mayusculas.substring(1).toLowerCase())
		.toString();
	}
	
	
	/**
	 * Devuelve uno de los elementos de la enumeración a partir de una cadena
	 * que debe contener una representación de un valor de la enumeración,
	 * posiblemente con mayúsculas y minúsculas diferentes.
	 * 
	 * @param cadena Cadena que representa un valor de la enumeración.
	 * @return Uno de los estados de la partida, o DESCONOCIDO si no se pudo determinar.
	 */
	public static GameState fromString(String cadena) {
		// Convertir a mayúsculas
		cadena = cadena.toUpperCase();
		// Comparar con cada constante y devolverla si tienen el mismo nombre
		for (GameState g: GameState.class.getEnumConstants()) {
			if (cadena.equals(g.name())) {
				return g;
			}
		}
		// Si no hay ninguna constante asociada devolver desconocido
		return GameState.DESCONOCIDO;
	}
}
