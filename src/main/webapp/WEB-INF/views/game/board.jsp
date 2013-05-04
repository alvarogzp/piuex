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
	<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
	<link href="<c:url value="/resources/css/piuex.css"/>" rel="stylesheet">
	<title>Partida: ${game.p1.username} VS ${game.p2.username}</title>
</head>
<body>

	<!-- Barra de navegación -->

	<div class="navbar">
	  	<div class="navbar-inner">
	    	<a href="<c:url value="/"/>" class="brand">Home</a>
	    	<ul class="nav"> 	
		      	<li><a href='<c:if test="${loggedUser==null}"><c:url value="/user/login"/></c:if>'>Login</a></li>
		      	<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/list"/></c:if>'>Usuarios</a></li>
		      	<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/game/list?id=${loggedUser.id}"/></c:if>'>Partidas</a></li>
	      	</ul>
	      	<ul class="nav pull-right">	
	      		<li><a href="https://twitter.com/#piuex"><img src="<c:url value="/resources/img/twitter.png"/>" class="barra-icon"></a></li>
	      		<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/logout"/></c:if>'><i class="icon-off"></i></a></li>
	    	</ul>
	  	</div>
	</div>
	
	<div class="container" style="margin: 0 auto; width: 38%">
		<form method="post">
			<input id="id" name="id" type="hidden" value="${game.id}"/>
			
			<span style="font-size: 25px; color: #000000"><b>Partida: </b></span>  <span style="font-size: 20px">${game.p1.username} VS ${game.p2.username} </span> 
			<span style="font-size: 25px; color: #000000"><b>&nbsp;&nbsp;&nbsp;Puntuación:  </b></span><span style="font-size: 20px">${game.p1Score} - ${game.p2Score} </span>
			<br>
			<fieldset class="row2">
			
				<div class="container" style="margin: 0 auto; width: 38%">
					<legend style="font-size: 20px; text-decoration: underline;"><b >Estado del tablero</b></legend>
				</div>
				
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
			
			<div class="container" style="margin: 0 auto; width: 38%">
				<legend style="font-size: 20px"><b>Tus letras:</b></legend>
			</div>
			
			<div class="container" style="margin: 0 auto; width: 38%">
				<div class="letters" style="font-size: 16px">
					<span> A B C D E F G H </span>
					<br><br>
					<input type="submit" value="Jugar" class="btn btn-success" style="padding: 5px 40px"/>
				</div>	  
			</div>	
		</form>
	</div>
	
	<script src='<c:url value="/resources/js/jquery.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.js"/>'></script>
	</body>
</html>