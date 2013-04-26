<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
<title>Versiones</title>
</head>
<body>
<h1> Cambios de Apalabrados PIUEx </h1>

	<h2>Versión 1.1 (fecha 19-04-2013)</h2>
	<ul>
		<li>Creado usuario "Administrador". Dispone de total acceso a la aplicación.</li>
		<li>Añadidas las imágenes de los usuarios. En la lista de partidas se puede observar el avatar de cada usuario.</li>
		<li>Arreglado enlace a la lista de partidas. Este enlace se encuentra en el tablero.</li>
	</ul>
	
	<h2>Versión 1.0 (fecha 19-04-2013)</h2>
	<ul>
		<li>Entrega parcial 1. Es la versión inicial de la aplicación.</li>
	</ul>

<script src='<c:url value="/resources/jquery/1.6/jquery.js"/>'></script>
<script src='<c:url value="/resources/bootstrap/js/bootstrap.min.js"/>'></script>
</body>
</html>
