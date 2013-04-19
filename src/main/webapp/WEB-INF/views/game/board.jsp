<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<link rel="icon" type="image/png" href='<c:url value="/resources/img/logo.png"/>'>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link href="<c:url value="/resources/css/default.css"/>" rel="stylesheet"  type="text/css" />

<title>Tablero de juego</title>
</head>
<body>
	
	<form method="post">
	
	<input id="id" name="id" type="hidden" value="${game.id}"/>
	<h1>
	<span style="font-size: 23px; color: #000000"><b>Partida: </b></span>  <span>${game.p1.username} VS ${game.p2.username} </span> 
	<span style="color: #000000"><b>&nbsp;&nbsp;&nbsp;Puntuación:  </b></span> <span>${game.p1Score} - ${game.p2Score} </span>
	</h1>
	<br>
	<fieldset class="row2">
	<legend style="font-size: 15px; text-decoration: underline;"><b>Estado del tablero</b></legend>
	<br>
	<table class="board">
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">M</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">U</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">N</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">D</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">H</td><td class="board">O</td><td class="board">L</td><td class="board">A</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
		<tr>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>
		<td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td><td class="board">&nbsp;</td>		
		</tr>
	</table>
	</fieldset>
	<br>
	<fieldset class="row3">
  <legend style="margin-left: 9%"><b>Tus letras:</b></legend>
	<div class="letters" style="font-size: 16px; margin-left: 6.8%">A B C D E F G H</div>	
	  <input type="submit" value="Play" class="button"/>	  
	  </fieldset>
	  
	  <a href="#" onclick="history.back(1)">Regresar a la lista usuarios</a>
	  	
	</form>
	</body>
</html>