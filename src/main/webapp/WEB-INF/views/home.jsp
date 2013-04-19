<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
<link rel="icon" type="image/png" href='<c:url value="/resources/img/logo.png"/>'>
	<title>Apalabrados PIUEx</title>
</head>
<body style="text-align: center">
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
<p>Versión: 1.2</p>
</div>
</body>
</html>
