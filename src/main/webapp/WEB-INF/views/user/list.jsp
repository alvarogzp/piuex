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
	<title>Lista de usuarios</title>
</head>


<body>

	<!-- Barra de navegación -->

	<div class="navbar">
	  	<div class="navbar-inner">
	    	<ul class="nav">
	    		<li><a href="<c:url value="/"/>" class="brand">Home</a></li>
	    	    <li class="divider-vertical"></li> 	 	
		      	<li><a href='<c:if test="${loggedUser==null}"><c:url value="/user/login"/></c:if>'>Login</a></li>
		      	<li class="active"><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/list"/></c:if>'>Usuarios</a></li>
		      	<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/game/list?id=${loggedUser.id}"/></c:if>'>Partidas</a></li>
	      	</ul>
	      	<ul class="nav pull-right">	
	      		<li><a target="_blank" href="https://twitter.com/#piuex"><img src="<c:url value="/resources/img/twitter.png"/>" class="barra-icon"></a></li>
	      		<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/logout"/></c:if>'><i class="icon-off"></i></a></li>
	    	</ul>
	  	</div>
	</div>
	
	<div>
		<div style="width:75%;float:left;display:inline-block;">
	
			<h2 style="text-align:center">Has entrado como <a href="<c:url value="/user/profile?username=${loggedUser.username}"/>">${loggedUser.username}</a></h2><br>
			
		
			<table class="table table-hover table-striped table-condensed">
			
				<tr>
					<th>Id</th>
					<th>Nombre</th>
					<th>Usuario</th>
					<th>E-mail</th>
					<th>Level</th>
					<th>Avatar</th>
					<th>Partidas</th>
				</tr>
				
				<c:forEach items="${users}" var="user">
					<tr>
						<td>${user.id}</td>
						<td>${user.name}</td>
						<td>
							<c:if test="${loggedUser.rank==0 || loggedUser.username==user.username}">
								<a href="<c:url value="/user/profile?username=${user.username}"/>">
							</c:if>
							${user.username}
							<c:if test="${loggedUser.username} == ${user.username}">
								</a>
							</c:if>	
						</td>
						<td>${user.email}</td>
						<td>${user.level}</td>
						<td><img src="<c:url value="/resources/avatars/${user.avatarFileName}"/>" alt="${user.avatarFileName}" class="avatar-list"/></td>
						<td>
						<c:if test="${loggedUser.rank==0 || loggedUser.username==user.username}">
							<a class="btn btn-primary btn-block" href="<c:url value="/game/list?id=${user.id}"/>">
						</c:if>
						Partidas de ${user.username}
						<c:if test="${loggedUser.username} == ${user.username}">
							</a>
						</c:if>	
						</td>
					</tr>
			   </c:forEach>
			   
			</table>
			
			<c:if test="${errormessage!=null}"> <span class="error"> ${errormessage} </span> </c:if>
		</div>
		<div style="margin-left:20%;">
			<a class="twitter-timeline" width="300px" height="500px" href="https://twitter.com/search?q=%23PIUEx" data-widget-id="335841821836066816">Tweets sobre "#PIUEx"</a>
			<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	    </div>
		
	</div>
		
	
	<script src='<c:url value="/resources/js/jquery.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.js"/>'></script>
</body>

</html>