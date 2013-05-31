-- HSQLDB Test data for APALABRADOS SCHEMA


-- Usuarios:

INSERT INTO APALABRADOS.USER (ID, NAME, USERNAME, AVATAR, EMAIL, PASSWORD, LEVEL, RANK) VALUES (
	0,
	'Administrador',
	'admin',
	'admin.png',
	'admin@unex.es',
	'gprjPIUEX13',
	'master',
	0
);


INSERT INTO APALABRADOS.USER (NAME, USERNAME, AVATAR, EMAIL, PASSWORD, LEVEL) VALUES (
	'Sara Garcia',
	'sara',
	'sara.jpg',
	'sara@unex.es',
	'1234',
	'advanced'
);


INSERT INTO APALABRADOS.USER (NAME, USERNAME, AVATAR, EMAIL, PASSWORD, LEVEL) VALUES (
	'Daniel Gonzalez',
	'daniel',
	'daniel.jpg',
	'daniel@unex.es',
	'1234',
	'newbie'
);


INSERT INTO APALABRADOS.USER (NAME, USERNAME, AVATAR, EMAIL, PASSWORD, LEVEL, RANK) VALUES (
	'Koky',
	'koky',
	'koky.jpg',
	'koky@unex.es',
	'rjPIUEX13',
	'master',
	0
);


INSERT INTO APALABRADOS.USER (NAME, USERNAME, AVATAR, EMAIL, PASSWORD, LEVEL, RANK) VALUES (
	'Alvaro',
	'alvaro',
	'alvaro.png',
	'alvaro@unex.es',
	'gpPIUEX13',
	'master',
	0
);




-- Partidas:

INSERT INTO APALABRADOS.GAME (ID, STATUS, P1, P2) VALUES (
	0,
	'Jugando',
	0,
	0
);


INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD) VALUES (
	'Inicializando',
	1,
	1,
	2,
	0,
	0,
	'               .               .               .               .               .               .               .               .               .               .               .               .               .               .               '
);


INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD) VALUES (
	'Inicializando',
	1,
	2,
	3,
	0,
	0,
	'               .               .               .               .               .               .               .               .               .               .               .               .               .               .               '
);


INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD) VALUES (
	'Inicializando',
	1,
	4,
	1,
	0,
	0,
	'               .               .               .               .               .               .               .               .               .               .               .               .               .               .               '
);


INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD) VALUES (
	'Jugando',
	0,
	3,
	4,
	10,
	12,
	'               .               .               .               .               .               .         C     .    ALVARO     .         Q     .         U     .         I     .               .               .               .               '
);
