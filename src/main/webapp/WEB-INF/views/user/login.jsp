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
<link href="<c:url value="/resources/css/default.css"/>" rel="stylesheet"  type="text/css" />
<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">

<title>Login</title>
</head>
<body>
<h1 style="text-align:center"> Formulario de login</h1>

<form:form method="post" modelAttribute="userBean" class="register">
	<table>
		<tr>
			<td>Usuario:</td>
			<td><form:input path="username" placeholder="Usuario" style="text-align:center" /></td>
			<td><form:errors path="username" cssClass="label label-important" /></td>
		</tr>
		<tr>
			<td>Contraseña:</td>
			<td><form:password path="password" placeholder="Contraseña" style="text-align:center" /></td>
			<td><form:errors path="password" cssClass="label label-important" /></td>
		</tr>
		<tr>
			<td></td>
			<td><input type="submit" class="btn btn-success" value="Entrar"></td>
			<td> <c:if test="${errormessage!=null}"> <span class="label label-important">${errormessage}</span> </c:if> </td>
		</tr>
	</table>
		<br>
		<p style="font-size: 10pt">Si no tienes usuario, <a href="<c:url value="/user/registrate"/>">¡registrate aquí!</a> </p>
</form:form>
<script src='<c:url value="/resources/jquery/1.6/jquery.js"/>'></script>
<script src='<c:url value="/resources/bootstrap/js/bootstrap.min.js"/>'></script>
</body>
</html>