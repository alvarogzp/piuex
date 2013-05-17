-- HSQLDB Schema Creation
CREATE SCHEMA APALABRADOS AUTHORIZATION DBA

	CREATE TABLE USER (
		ID INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,
		NAME VARCHAR(50) NOT NULL,
		USERNAME VARCHAR(20) NOT NULL,
		AVATAR VARCHAR(40) DEFAULT 'pf.png',
		EMAIL VARCHAR(50),
		PASSWORD VARCHAR(64) NOT NULL,
		LEVEL VARCHAR(10) DEFAULT 'newbie',
		OPPONENTS VARCHAR(10) DEFAULT 'newbie',
		RANK INTEGER DEFAULT 10 NOT NULL
	)
	
	CREATE TABLE GAME (
		ID INTEGER GENERATED BY DEFAULT AS IDENTITY(START WITH 1) NOT NULL PRIMARY KEY,
		STATUS VARCHAR(20) NOT NULL,
		P1TURN INTEGER NOT NULL,
		P1 INTEGER REFERENCES USER(ID) NOT NULL,
		P2 INTEGER REFERENCES USER(ID) NOT NULL,
		P1SCORE INTEGER DEFAULT 0 NOT NULL,
		P2SCORE INTEGER DEFAULT 0 NOT NULL,
		BOARD VARCHAR(255)
	)
;