-- HSQLDB Test data for APALABRADOS SCHEMA
INSERT INTO APALABRADOS.USER (ID, NAME, USERNAME,AVATAR,EMAIL,PASSWORD,LEVEL, RANK) VALUES (
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
	'Ana Lucero',
	'ana',
	'ana.png',
	'ana@unex.es',
	'1234',
	'newbie',
	10
);

INSERT INTO APALABRADOS.USER (NAME, USERNAME,AVATAR,EMAIL,PASSWORD,LEVEL, RANK) VALUES (
	'Pedro Baez',
	'pedro',
	'pedro.png',
	'pedro@unex.es',
	'1234',
	'master',
	10
);

INSERT INTO APALABRADOS.USER (NAME, USERNAME,AVATAR,EMAIL,PASSWORD,LEVEL, RANK) VALUES (
	'Sara Garcia',
	'sara',
	'sara.png',
	'sara@unex.es',
	'1234',
	'advanced',
	10
);

INSERT INTO APALABRADOS.USER (NAME, USERNAME,AVATAR,EMAIL,PASSWORD,LEVEL, RANK) VALUES (
	'Daniel Gonzalez',
	'daniel',
	'daniel.png',
	'daniel@unex.es',
	'1234',
	'newbie',
	10
);

INSERT INTO APALABRADOS.USER (NAME, USERNAME,AVATAR,EMAIL,PASSWORD,LEVEL, RANK) VALUES (
	'Koky',
	'koky',
	'koky.png',
	'koky@unex.es',
	'rjPIUEX13',
	'master',
	0
);

INSERT INTO APALABRADOS.USER (NAME, USERNAME,AVATAR,EMAIL,PASSWORD,LEVEL, RANK) VALUES (
	'Alvaro',
	'alvaro',
	'alvaro.png',
	'alvaro@unex.es',
	'gpPIUEX13',
	'master',
	0
);


INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD) VALUES (
	'playing',
	1,
	1,
	2,
	13,
	5,
	'               .               .               .               .               .               .               .     PIUEX     .               .               .               .               .               .               .               '
);

INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD) VALUES (
	'initializing',
	1,
	2,
	3,
	0,
	0,
	'               .               .               .               .               .               .               .               .               .               .               .               .               .               .               '
);

INSERT INTO APALABRADOS.GAME (STATUS, P1TURN, P1, P2, P1SCORE, P2SCORE, BOARD) VALUES (
	'finish',
	0,
	3,
	4,
	100,
	94,
	'               .               .               .               .               .               .               .  APALABRADOS  .               .               .               .               .               .               .               '
);
