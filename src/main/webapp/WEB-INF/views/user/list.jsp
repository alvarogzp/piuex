<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="icon" type="image/png" href='<c:url value="/resources/img/logo.png"/>'>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<style type="text/css">
.even {
	background-color: silver;
}
.error{
	color: #D8000C;
	background-color: #FFBABA;
}
.avatarList {
	height: 45px;
	width: auto;
}
</style>
<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
<title>Lista de usuarios</title>
</head>
<body>

	<a style="float:right" href="<c:url value="/user/logout"/>"> Cerrar sesi�n </a>
	<table cellpadding="5" class="table table-hover table-striped table-condensed">
		<tr class="even">
			<th>Id</th>
			<th>Name</th>
			<th>Username</th>
			<th>E-mail</th>
			<th>Level</th>
			<th>Avatar</th>
			<th>Games</th>
		</tr>
		<c:forEach items="${users}" var="user">
			<tr>
				<td>${user.id}</td>
				<td>${user.name}</td>
				<td><a href="<c:url value="/user/profile?username=${user.username}"/>">${user.username}</a></td>
				<td>${user.email}</td>
				<td>${user.level}</td>
				<td><img src="<c:url value="/resources/avatars/${user.avatarFileName}"/>" alt="avatar" class="avatarList"/></td>
				<td><a href="<c:url value="/game/list?id=${user.id}"/>"> Partidas de ${user.username}</a></td>
			</tr>
	   </c:forEach>
	</table>
	 <c:if test="${errormessage!=null}"> <span class="error"> ${errormessage} </span> </c:if>
	 <script src='<c:url value="/resources/jquery/1.6/jquery.js"/>'></script>
	 <script src='<c:url value="/resources/bootstrap/js/bootstrap.min.js"/>'></script>
	</body>
</html>