<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<link rel="icon" type="image/png" href='<c:url value="/resources/img/logo.png"/>'>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
	<link href="<c:url value="/resources/css/piuex.css"/>" rel="stylesheet">
	<title>Apalabrados PIUEx</title>
</head>
<body style="text-align: center">

<!-- Barra de navegación -->

	<div class="navbar">
	  	<div class="navbar-inner">
	    	<ul class="nav"> 
	    		<li class="active"><a href="<c:url value="/"/>" class="brand">Home</a></li>
	    		<li class="divider-vertical"></li>
		      	<li><a href='<c:if test="${loggedUser==null}"><c:url value="/user/login"/></c:if>'>Login</a></li>
		      	<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/list"/></c:if>'>Usuarios</a></li>
		      	<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/game/list?id=${loggedUser.id}"/></c:if>'>Partidas</a></li>
	      	</ul>
	      	<ul class="nav pull-right">	
	      		<li><a target="_blank" href="https://twitter.com/#piuex"><img src="<c:url value="/resources/img/twitter.png"/>" class="barra-icon"></a></li>
	      		<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/logout"/></c:if>'><i class="icon-off"></i></a></li>
	    	</ul>
	  	</div>
	</div>

	<div style="position: fixed; top: 10%; width: 100%">
		<a href='<c:url value="/user"/>'><img src='<c:url value="/resources/img/PIUEx_logo.jpg"/>' title="¡¡ Entrar !!" width="600px" height="250px"></a>
		<br>
		¡¡ Pulsa en la imagen para entrar !!
	</div>
	<div style="position: fixed; bottom: 0; width: 98%">
		<p style="float:left; ">Autores:<br>
		Álvaro Gutiérrez Pérez<br>
		Carlos Rufo Jiménez</p>
		<p style="float: right;">Escuela Politécnica,<br>
		Universidad de Extremadura</p>
		<P>${serverTime}</P>
		<p><a href='<c:url value="/version"/>' title="Ver cambios">Versión: 1.1</a></p>
	</div>
	<script src='<c:url value="/resources/js/jquery.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.js"/>'></script>
</body>
</html>
