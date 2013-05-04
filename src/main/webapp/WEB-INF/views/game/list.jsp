<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<link rel="icon" type="image/png" href='<c:url value="/resources/img/logo.png"/>'>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
	<link href="<c:url value="/resources/css/piuex.css"/>" rel="stylesheet">
	<title>Lista de partidas de ${username}</title>
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

	<h2> Partidas de ${username}</h2>
	
	<table class="table table-hover table-striped table-condensed">
		<tr class="even">
			<th>Id</th>
			<th>Estado</th>
			<th>Turno</th>
			<th>Jugador 1</th>
			<th>Jugador 2</th>
			<th>Puntuación</th>
		</tr>
		<c:forEach items="${games}" var="game">
			<tr>
			<td><a href="<c:url value="/game/detail?id=${game.id}"/>">${game.id}</a></td>
			<td>${game.status}</td>
			<td>Jugador <c:if test="${game.p1Turn==true}">1</c:if><c:if test="${game.p1Turn==false}">2</c:if></td>
			<td>${game.p1.username}</td>
			<td>${game.p2.username}</td>
			<td>${game.p1Score} - ${game.p2Score}</td>
			</tr>
	   </c:forEach>
	</table>
	
	<div class="container" style="margin: 0 auto; width: 38%">
		<c:url var="gameNew" value="/game/new"/>
		<form:form method="post" modelAttribute="newGame" action="${gameNew}">
				<input id="p1" name="p1" value="${p1}" type="hidden"/> 
				<label for="p2"> Oponente: </label>
				<form:select path="p2">
					<c:forEach items="${users}" var="user"> <option value="${user.id}"> ${user.username} </option></c:forEach>
				</form:select>
				<input type="submit" value="Nueva partida">
		</form:form>
	</div>
		
	<script src='<c:url value="/resources/js/jquery.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.js"/>'></script>
	</body>
</html>