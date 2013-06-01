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
	<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
	<link href="<c:url value="/resources/css/piuex.css"/>" rel="stylesheet">
	<title>Estad�sticas de ${user.username}</title>
</head>
<body>

<!-- Barra de navegaci�n -->

	<div class="navbar">
	  	<div class="navbar-inner">
	    	<ul class="nav">
	    		<li><a href="<c:url value="/"/>" class="brand">Home</a></li>
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

	<h2 style="text-align:center">
		Estad�sticas de 
		<c:if test="${loggedUser.rank==0 || loggedUser.username==user.username}">
			<a href="<c:url value="/user/profile?username=${user.username}"/>">
		</c:if>
		${user.username}
		<c:if test="${loggedUser.rank==0 || loggedUser.username==user.username}">
			</a>
		</c:if>
	</h2><br>
	
	<table class="table table-hover table-striped table-condensed">
		<tr class="even">
			<th>N�mero de partidas</th>
			<th>Sin confirmar</th>
			<th>Jugando</th>
			<th>Finalizadas</th>
			<th>M�xima puntuaci�n jugada</th>
		</tr>
		<tr>
			<td> 5 </td>
			<td> 2 </td>
			<td> 2 </td>
			<td> 1 </td>
			<td> 70 </td>
		</tr>
	</table>
	
		
	<script src='<c:url value="/resources/js/jquery.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.js"/>'></script>
	</body>
</html>