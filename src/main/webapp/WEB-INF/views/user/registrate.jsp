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
	<title>Registro</title>
		
</head>

<body >

	<h1 style="text-align: center"> Formulario de registro</h1>
	<div class="container" style="margin: 0 auto; width: 38%">
		
		<form:form class="form-horizontal" method="post" modelAttribute="userBean">
			
			<div class="control-group">
				<label class="control-label" for="name">Nombre completo:</label>
				<div class="controls">
					<form:input class="azul" type="text" path="name" placeholder="Nombre completo" style="text-align:center"/>
					<form:errors path="name" cssClass="label label-important" />
				</div>
			</div>
				
			<div class="control-group">
				<label class="control-label" for="username">Usuario:</label>
				<div class="controls">
					<form:input class="azul" path="username" placeholder="Usuario" style="text-align:center" />
					<form:errors path="username" cssClass="label label-important" />
				</div>
			</div>
				
			<div class="control-group">
				<label class="control-label" for="email">Correo electrónico:</label>
				<div class="controls">
					<div class="input-append">
						<form:input class="azul" id="appendedInput" type="email" path="email" placeholder="Correo electrónico" style="text-align:center" />
						<span class="add-on">@</span>
					</div>
					<form:errors path="email" cssClass="label label-important" />
				</div>
			</div>
			
			<div class="control-group">
				<label class="control-label" for="password" >Contraseña:</label>
				<div class="controls">
					<form:password class="azul" path="password" placeholder="Contraseña" style="text-align:center" />
					<form:errors path="password" cssClass="label label-important" />
				</div>	
			</div>
				
			<div class="control-group">
				<div class="controls">
					<input type="submit" class="btn btn-success" value="Regístrate en PIUEx">
					<c:if test="${errormessage!=null}"> <span class="label label-important"> ${errormessage} </span> </c:if>
				</div>
			</div>
		</form:form>
	</div>
	
	<script src='<c:url value="/resources/jquery/1.6/jquery.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.min.js"/>'></script>
</body>
</html>	