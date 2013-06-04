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
	<title>Partidas de ${username}</title>
</head>
<body>

<!-- Barra de navegación -->

	<div class="navbar">
	  	<div class="navbar-inner">
	    	<ul class="nav">
	    		<li><a href="<c:url value="/"/>" class="brand">Home</a></li>
	    	   	<li class="divider-vertical"></li> 	 				 	
		      	<li><a href='<c:if test="${loggedUser==null}"><c:url value="/user/login"/></c:if>'>Login</a></li>
		      	<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/list"/></c:if>'>Usuarios</a></li>
		      	<li class="active"><a href='<c:if test="${loggedUser!=null}"><c:url value="/game/list?id=${loggedUser.id}"/></c:if>'>Partidas</a></li>
	      	</ul>
	      	<ul class="nav pull-right">	
	      		<c:if test="${loggedUser!=null}"><li><a href='<c:url value="/user/profile"/>' title="Ir al perfil">${loggedUser.username}</a></li></c:if>
	      		<li><a target="_blank" href="https://twitter.com/#piuex"><img src="<c:url value="/resources/img/twitter.png"/>" class="barra-icon"></a></li>
	      		<c:if test="${loggedUser!=null}"><li><a href='<c:url value="/user/logout"/>' title="Cerrar sesión"><i class="icon-off"></i></a></li></c:if>
	    	</ul>
	  	</div>
	</div>

	<h2 style="text-align:center">Partidas de <c:if test="${p1 != -1}"><a href="<c:url value="/user/stats?id=${p1}"/>"></c:if>${username}<c:if test="${p1 != -1}"></a></c:if></h2><br>
	
	<table class="table table-hover table-striped table-condensed">
		<tr class="even">
			<c:if test="${loggedUser.rank==0}"><th></th></c:if>
			<th>Id</th>
			<th>Estado</th>
			<th>Turno</th>
			<th>Jugador 1</th>
			<th>Jugador 2</th>
			<th>Puntuación</th>
			<th></th>
		</tr>
		<c:forEach items="${games}" var="game">
			<tr>
				<c:if test="${loggedUser.rank==0}">
					<td>
						<a href="<c:url value="/game/delete?id=${game.id}&next=${p1}"/>"><i class="icon-remove"></i></a>
					</td>
				</c:if>
				<td>${game.id}</td>
				<td>${game.status}</td>
				<td>Jugador <c:if test="${game.p1Turn}">1</c:if><c:if test="${!game.p1Turn}">2</c:if></td>
				<td><c:if test="${game.p1Turn}"><b></c:if>${game.p1.username}<c:if test="${game.p1Turn}"></b></c:if></td>
				<td><c:if test="${!game.p1Turn}"><b></c:if>${game.p2.username}<c:if test="${!game.p1Turn}"></b></c:if></td>
				<td>${game.p1Score} - ${game.p2Score}</td>
				<td>
					<c:choose>
						<c:when test='${game.status == "Esperando"}'>
							<c:choose>
								<c:when test="${p1 == game.p2.id}">
									<a class="btn btn-success" href="<c:url value="/game/detail?id=${game.id}&action=accept"/>">Aceptar</a>
									<a class="btn btn-danger" href="<c:url value="/game/detail?id=${game.id}&action=reject"/>">Rechazar</a>
								</c:when>
								<c:otherwise>
									<button class="btn btn-block" disabled>Esperando a ${game.p2.username}...</button>
								</c:otherwise>
							</c:choose>
						</c:when>
						<c:when test='${game.status == "Rechazada"}'>
							<button class="btn btn-link btn-block" disabled>&nbsp;</button>
						</c:when>
						<c:when test='${game.status == "Finalizada"}'>
							<a class="btn btn-block" href="<c:url value="/game/detail?id=${game.id}"/>">Ver el tablero final</a>
						</c:when>
						<c:otherwise>
							<a class="btn btn-<c:choose><c:when test='${(p1 == game.p1.id && game.p1Turn) || (p1 == game.p2.id && !game.p1Turn)}'>primary</c:when><c:otherwise>info</c:otherwise></c:choose> btn-block" href="<c:url value="/game/detail?id=${game.id}"/>">Acceder a la partida</a>
						</c:otherwise>
					</c:choose>
				</td>
			</tr>
	   </c:forEach>
	</table>
	
	<c:if test="${p1 != -1}">
		<div class="container" style="margin: 0 auto; width: 38%">
			<form method="post" action="<c:url value="/game/new"/>">
					<input id="p1" name="p1" value="${p1}" type="hidden"/>
					<label for="p2"> Oponente:</label>
					<select id="p2" name="p2">
						<c:forEach items="${users}" var="user">
							<option value="${user.id}"<c:if test="${user.id == p1}"> selected</c:if>>${user.username}</option>
						</c:forEach>
					</select>
					<input class="btn btn-success" type="submit" value="Nueva partida">
			</form>
		</div>
	</c:if>
	
	<script src='<c:url value="/resources/js/jquery.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.js"/>'></script>
	</body>
</html>