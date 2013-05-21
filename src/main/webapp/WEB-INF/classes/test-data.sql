-- HSQLDB Test data for APALABRADOS SCHEMA

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


INSERT INTO APALABRADOS.USER (NAME, USERNAME, AVATAR, EMAIL, PASSWORD, LEVEL) VALUES (
	'Ana Lucero',
	'ana',
	'ana.jpg',
	'ana@unex.es',
	'1234',
	'newbie'
);


INSERT INTO APALABRADOS.USER (NAME, USERNAME, AVATAR, EMAIL, PASSWORD, LEVEL) VALUES (
	'Pedro Baez',
	'pedro',
	'pedro.jpg',
	'pedro@unex.es',
	'1234',
	'master'
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




INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD) VALUES (
	'playing',
	0,
	1,
	2,
	10,
	55,
	'               .               .               .               .               .               .         C     .    ALVARO     .         Q     .         U     .         I     .               .               .               .               '
);


INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD) VALUES (
	'playing',
	1,
	3,
	4,
	13,
	5,
	'               .               .               .               .               .               .               .     PIUEX     .               .               .               .               .               .               .               '
);


INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD) VALUES (
	'initializing',
	1,
	4,
	5,
	0,
	0,
	'               .               .               .               .               .               .               .               .               .               .               .               .               .               .               '
);


INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD) VALUES (
	'finish',
	0,
	5,
	6,
	100,
	94,
	'               .               .               .               .               .               .               .  APALABRADOS  .               .               .               .               .               .               .               '
);
