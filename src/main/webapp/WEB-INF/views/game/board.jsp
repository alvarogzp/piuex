<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
<head>
	<link rel="icon" type="image/png" href='<c:url value="/resources/img/logo.png"/>'>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link href="<c:url value="/resources/css/default.css"/>" rel="stylesheet"  type="text/css" />
	<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
	<link href="<c:url value="/resources/css/piuex.css"/>" rel="stylesheet">
	<link href="<c:url value="/resources/tablero/main.css"/>" rel="stylesheet"/>
	<title>Partida: <c:if test="${game.p1Turn}">*</c:if>${game.p1.username}<c:if test="${game.p1Turn}">*</c:if> VS <c:if test="${!game.p1Turn}">*</c:if>${game.p2.username}<c:if test="${!game.p1Turn}">*</c:if></title>
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
		      	<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/game/list?id=${loggedUser.id}"/></c:if>'>Partidas</a></li>
	      	</ul>
	      	<ul class="nav pull-right">	
	      		<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/profile"/></c:if>'>${loggedUser.username}</a></li>
	      		<li><a target="_blank" href="https://twitter.com/#piuex"><img src="<c:url value="/resources/img/twitter.png"/>" class="barra-icon"></a></li>
	      		<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/logout"/></c:if>'><i class="icon-off"></i></a></li>
	    	</ul>
	  	</div>
	</div>
	
	
	<span class="fantasma" data-letra=" "></span>
	<span style="display:none;" id="diccionario"><c:if test='${turn}'><c:url value="/resources/tablero/diccionarios/diccionario-enminusculas-sintildes.txt"/></c:if></span>
	
	<form method="post" autocomplete="off"> <!-- autocomplete="off" tells firefox to not remember the state of the controls, like the disabled state of the input button -->
		<div class="container" style="margin: 0 auto; width: 38%">
		
			<input id="id" name="id" type="hidden" value="${game.id}"/>
			<input id ="puntos" name="puntos" type="hidden" value="0"/>
			
			<div>
				<span style="font-size: 25px; color: #000000"><b>Partida: </b></span>  <span style="font-size: 20px"><c:if test="${game.p1Turn}"><b></c:if><a href="<c:url value="/user/stats?id=${game.p1.id}"/>">${game.p1.username}</a><c:if test="${game.p1Turn}"></b></c:if> VS <c:if test="${!game.p1Turn}"><b></c:if><a href="<c:url value="/user/stats?id=${game.p2.id}"/>">${game.p2.username}</a><c:if test="${!game.p1Turn}"></b></c:if> </span> 
				<span style="font-size: 25px; color: #000000"><b>&nbsp;&nbsp;&nbsp;Puntuación:  </b></span><span style="font-size: 20px">${game.p1Score} - ${game.p2Score} </span>
			</div>
			<br>
			<div class="container" style="margin: 0 auto; width: 38%">
				<span style="font-size: 20px; text-decoration: underline;"><b>Estado del tablero</b></span>
			</div>
			<br>
		</div>
				
		<div id="contenedor" class="container" style="margin: 0 auto; width: 35%">
			<textarea id="tablero" name="tablero">${game.board}</textarea>
			<c:if test="${letters != null}">
				<textarea id="fichas" name="fichas">${letters}</textarea>
			</c:if>
		
			<div id="juego">
				&nbsp;
			</div>
		</div>
		
		<br>
		
		
		<div class="container" style="margin: 0 auto; width: 35%">
			<div id="letras">
				&nbsp;
			</div>
		</div>
		
		<br>
		
		<div class="container" style="margin: 0 auto; width: 15%">
			<c:if test='${turn}'>
				<span class="js-diccionario label" style="display: none;">&nbsp;</span>
				<div class="js-confirm">
					<span class="js-mensaje label">&nbsp;</span>
					<div class="progress">
						<div class="bar bar-success" style="width: 0%;"></div>
					</div>
				</div>
				<div class="js-input">
					<span class="js-checklabel js-invalid js-invalid1 label label-important" style="display: none;">&nbsp;</span>
					<span class="js-checklabel js-invalid js-invalid2 label label-important" style="display: none;">&nbsp;</span>
					<span class="js-checklabel js-invalid js-invalid3 label label-important" style="display: none;">&nbsp;</span>
					<span class="js-checklabel js-correct label label-success" style="display: none;">&nbsp;</span>
					<span class="js-checklabel js-correct-points label label-success" style="display: none;">&nbsp;</span>
					<input type="submit" value="Pasar turno" class="btn btn-info btn-block js-submit" style="padding: 5px"/>
				</div>
				<span class="js-diccionario-error label label-warning" style="display: none;">Jugando sin diccionario</span>
			</c:if>
			<c:if test='${!turn}'>
				<c:choose>
					<c:when test='${game.status.equals("Jugando")}'>
						<c:if test="${letters != null}">
							<span class="label label-inverse" style="margin: 0 auto">¡No es tu turno!</span>
						</c:if>
						<a href="" class="btn btn-primary btn-block">Recargar</a>
					</c:when>
					<c:when test='${game.status.equals("Finalizada")}'>
						<span class="label label-success">Partida finalizada:</span>
						<c:choose>
							<c:when test="${(winner == 1 && loggedUser.id == game.p1.id) || (winner == 2 && loggedUser.id == game.p2.id)}">
								<span class="label label-success">¡Has ganado!</span>
							</c:when>
							<c:when test="${winner == 0}">
								<span class="label label-info">Ha quedado en empate</span>
							</c:when>
							<c:when test="${loggedUser.id == game.p1.id || loggedUser.id == game.p2.id}">
								<span class="label label-important">Has perdido :(</span>
							</c:when>
							<c:otherwise>
								<span class="label label-info">Ha ganado <c:choose><c:when test="${winner == 1}">${game.p1.username}</c:when><c:otherwise>${game.p2.username}</c:otherwise></c:choose></span>
							</c:otherwise>
						</c:choose>
					</c:when>
				</c:choose>
			</c:if>
			<c:if test="${puntosJugadaAnterior != null && puntosJugadaAnterior > 15}">
				<br><span class="label label-success" style="margin: 0 auto">¡Has conseguido una SUPER JUGADA, compártela!</span>
				<div>
					<a href="https://twitter.com/intent/tweet?button_hashtag=PIUEx&text=He%20conseguido%20realizar%20una%20%E2%9C%8E%20SUPER%20JUGADA%20%E2%9C%8E%20de%20${puntosJugadaAnterior}%20puntos%20en%20gprj-apalabrados-piuex.cloudfoundry.com" class="twitter-hashtag-button" data-lang="en" data-related="jasoncosta">Tweet #PIUEx</a>
					<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
				</div>
			</c:if>
		</div>
		
	</form>

	
	<script src='<c:url value="/resources/js/jquery.js"/>'></script>
	<script src='<c:url value="/resources/js/underscore.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.js"/>'></script>
	<script charset="UTF-8" src='<c:url value="/resources/tablero/main.js"/>'></script>
	<script charset="UTF-8" src='<c:url value="/resources/tablero/mover.js"/>'></script>	
	
	</body>
</html>