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

<title>Registration Page</title>
</head>
<body>

<form:form method="post" modelAttribute="userBean" class="register">
	<table>
		<tr>
			<td>Nombre completo:</td>
			<td><form:input path="name" placeholder="Nombre completo" style="text-align:center" /></td>
			<td><form:errors path="name" cssClass="error" /></td>
		</tr>
		<tr>
			<td>Usuario:</td>
			<td><form:input path="username" placeholder="Usuario" style="text-align:center" /></td>
			<td><form:errors path="username" cssClass="error" /></td>
		</tr>
		<tr>
			<td>Correo electrónico:</td>
			<td><form:input type="email" path="email" placeholder="Correo electrónico" style="text-align:center" /></td>
			<td><form:errors path="email" cssClass="error" /></td>
		</tr>
		<tr>
			<td>Contraseña:</td>
			<td><form:password path="password" placeholder="Contraseña" style="text-align:center" /></td>
			<td><form:errors path="password" cssClass="error" /></td>
		</tr>
		<tr>
			<td></td>
			<td><input type="submit" value="Regístrate en PIUEx"></td>
			<td> <c:if test="${errormessage!=null}"> <span class="error"> ${errormessage} </span> </c:if> </td>
		</tr>
	</table>
</form:form>


</body>
</html>