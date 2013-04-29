<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
<title>Versiones</title>
</head>
<body>
<h1 class="text-center" style="text-shadow: 0 4px 0 #BBBBBB"> Cambios de Apalabrados PIUEx </h1>

	<h3 style="text-shadow: 0 2px 0 #BBBBBB">Versi�n 1.1 (fecha 19-04-2013)</h3>
	<ul>
		<li>Creado usuario "Administrador". Dispone de total acceso a la aplicaci�n.</li>
		<li>A�adidas las im�genes de los usuarios. En la lista de partidas se puede observar el avatar de cada usuario.</li>
		<li>Arreglado enlace a la lista de partidas. Este enlace se encuentra en el tablero.</li>
	</ul>
	
	<h3 style="text-shadow: 0 2px 0 #BBBBBB">Versi�n 1.0 (fecha 07-03-2013)</h3>
	<ul>
		<li>Entrega parcial 1. Es la versi�n inicial de la aplicaci�n.</li>
	</ul>

<script src='<c:url value="/resources/jquery/1.6/jquery.js"/>'></script>
<script src='<c:url value="/resources/bootstrap/js/bootstrap.min.js"/>'></script>
</body>
</html>
