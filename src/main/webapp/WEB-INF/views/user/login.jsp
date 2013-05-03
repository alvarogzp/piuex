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
	<title>Login</title>
</head>


<body>
	<h1 style="text-align:center"> Formulario de login</h1>

	<form:form method="post" modelAttribute="userBean" class="form-horizontal">

		<div class="control-group">
			<label class="control-label" for="username">Usuario:</label>
			<div class="controls">
				<form:input path="username" placeholder="Usuario" style="text-align:center" />
				<form:errors path="username" cssClass="label label-important" />
			</div>
		</div>
	
		<div class="control-group">
			<label class="control-label" for="password">Contraseña:</label>
			<div class="controls">
				<form:password path="password" placeholder="Contraseña" style="text-align:center" />
				<form:errors path="password" cssClass="label label-important" />
			</div>
		</div>
	
		<div class="control-group">
			<div class="controls">
				<input type="submit" class="btn btn-primary" value="Entrar">
				<c:if test="${errormessage!=null}">
					<span class="label label-important">${errormessage}</span>
				</c:if>
			</div>
		</div>
		
	</form:form>

	<p style="font-size: 10pt">Si no tienes usuario, <a href="<c:url value="/user/registrate"/>">¡registrate aquí!</a> </p>

	<script src='<c:url value="/resources/jquery/1.6/jquery.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.min.js"/>'></script>
</body>
</html>