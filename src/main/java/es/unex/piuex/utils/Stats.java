package es.unex.piuex.utils;

import es.unex.piuex.domain.User;

public class Stats {

	private User user;
	
	private int partidas;
	
	private int partidasSinConfirmar;
	
	private int partidasJugando;
	
	private int partidasFinalizadas;
	
	private int partidasRechazadas;
	
	private int maximaPuntuacionJugada;

	public Stats(User user, int partidas, int partidasSinConfirmar, int partidasJugando,
			int partidasFinalizadas, int partidasRechazadas,
			int maximaPuntuacionJugada) {
		this.user = user;
		this.partidas = partidas;
		this.partidasSinConfirmar = partidasSinConfirmar;
		this.partidasJugando = partidasJugando;
		this.partidasFinalizadas = partidasFinalizadas;
		this.partidasRechazadas = partidasRechazadas;
		this.maximaPuntuacionJugada = maximaPuntuacionJugada;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getPartidas() {
		return partidas;
	}

	public void setPartidas(int partidas) {
		this.partidas = partidas;
	}

	public int getPartidasSinConfirmar() {
		return partidasSinConfirmar;
	}

	public void setPartidasSinConfirmar(int partidasSinConfirmar) {
		this.partidasSinConfirmar = partidasSinConfirmar;
	}

	public int getPartidasJugando() {
		return partidasJugando;
	}

	public void setPartidasJugando(int partidasJugando) {
		this.partidasJugando = partidasJugando;
	}

	public int getPartidasFinalizadas() {
		return partidasFinalizadas;
	}

	public void setPartidasFinalizadas(int partidasFinalizadas) {
		this.partidasFinalizadas = partidasFinalizadas;
	}
	
	public int getPartidasRechazadas() {
		return partidasRechazadas;
	}

	public void setPartidasRechazadas(int partidasRechazadas) {
		this.partidasRechazadas = partidasRechazadas;
	}

	public int getMaximaPuntuacionJugada() {
		return maximaPuntuacionJugada;
	}

	public void setMaximaPuntuacionJugada(int maximaPuntuacionJugada) {
		this.maximaPuntuacionJugada = maximaPuntuacionJugada;
	}
	
}
