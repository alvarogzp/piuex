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
	<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
	<link href="<c:url value="/resources/css/piuex.css"/>" rel="stylesheet">
	<title>Login</title>
</head>


<body>

<!-- Barra de navegación -->

	<div class="navbar">
	  	<div class="navbar-inner">
	    	<ul class="nav">
	    		<li><a href="<c:url value="/"/>" class="brand">Home</a></li>
	    		<li class="divider-vertical"></li> 	
		      	<li class="active"><a href='<c:if test="${loggedUser==null}"><c:url value="/user/login"/></c:if>'>Login</a></li>
		      	<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/list"/></c:if>'>Usuarios</a></li>
		      	<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/game/list?id=${loggedUser.id}"/></c:if>'>Partidas</a></li>
	      	</ul>
	      	<ul class="nav pull-right">	
	      		<li><a target="_blank" href="https://twitter.com/#piuex"><img src="<c:url value="/resources/img/twitter.png"/>" class="barra-icon"></a></li>
	      		<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/logout"/></c:if>'><i class="icon-off"></i></a></li>
	    	</ul>
	  	</div>
	</div>

	<h1 style="text-align:center"> Formulario de login</h1>
	<div class="container" style="margin: 0 auto; width: 38%">
		<form:form class="form-horizontal" method="post" modelAttribute="userBean">
		
			<div class="control-group">
				<label class="control-label" for="username">Usuario:</label>
				<div class="controls">
					<form:input class="azul" path="username" placeholder="Usuario" style="text-align:center" autofocus="autofocus"/>
					<form:errors path="username" cssClass="label label-important" />
				</div>
			</div>
		
			<div class="control-group">
				<label class="control-label" for="password">Contraseña:</label>
				<div class="controls">
					<form:password class="azul" path="password" placeholder="Contraseña" style="text-align:center" />
					<form:errors path="password" cssClass="label label-important" />
				</div>
			</div>
		
			<div class="control-group">
				<div class="controls">
					<input style="padding: 3.5px 40px" type="submit" class="btn btn-success" value="Entrar">
					<c:if test="${errormessage!=null}">
						<span class="label label-important">${errormessage}</span>
					</c:if>
				</div>
			</div>
			
		</form:form>
	</div>

	<p class="text-center" style="font-size: 10pt">Si no tienes usuario, <a class="text-success" href="<c:url value="/user/registrate"/>">¡registrate aquí!</a> </p>

	<script src='<c:url value="/resources/jquery/1.6/jquery.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.min.js"/>'></script>
</body>
</html>