<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<link rel="icon" type="image/png" href='<c:url value="/resources/img/logo.png"/>'>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
	<link href="<c:url value="/resources/css/piuex.css"/>" rel="stylesheet">
	<title>Versiones</title>
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

<h1 class="text-center" style="text-shadow: 0 4px 0 #BBBBBB"> Cambios de Apalabrados PIUEx </h1><br>

	<h3 style="text-shadow: 0 2px 0 #BBBBBB">Versión 3.0 (fecha 03-06-2013)</h3>
	<ul>
		<li>Implementado concepto administrador.</li>
		<li>Finalizada funcionalidad de jugabilidad con puntuación.</li>
		<li>Versión preparada para la perfecta interactividad entre usuarios mediante partidas.</li>
	</ul>
	
	<h3 style="text-shadow: 0 2px 0 #BBBBBB">Versión 2.0 (fecha 20-05-2013)</h3>
	<ul>
		<li>Implementado tablero y jugabilidad.</li>
		<li>Aplicado estilo uniforme a toda la aplicación usando bootstrap.</li>
	</ul>

	<h3 style="text-shadow: 0 2px 0 #BBBBBB">Versión 1.1 (fecha 19-04-2013)</h3>
	<ul>
		<li>Creado usuario "Administrador". Dispone de total acceso a la aplicación.</li>
		<li>Añadidas las imágenes de los usuarios. En la lista de partidas se puede observar el avatar de cada usuario.</li>
		<li>Arreglado enlace a la lista de partidas. Este enlace se encuentra en el tablero.</li>
	</ul>
	
	<h3 style="text-shadow: 0 2px 0 #BBBBBB">Versión 1.0 (fecha 07-03-2013)</h3>
	<ul>
		<li>Entrega parcial 1. Es la versión inicial de la aplicación.</li>
	</ul>
	

<script src='<c:url value="/resources/jquery/1.6/jquery.js"/>'></script>
<script src='<c:url value="/resources/bootstrap/js/bootstrap.min.js"/>'></script>
</body>
</html>
