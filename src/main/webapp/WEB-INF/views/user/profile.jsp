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
<%-- 	<link href="<c:url value="/resources/css/default.css"/>" rel="stylesheet" type="text/css" /> --%>
	<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
	<link href="<c:url value="/resources/css/piuex.css"/>" rel="stylesheet">
	<title>Perfil de ${userBean.username}</title>
</head>

<body>

	<!-- Barra de navegación -->

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
	      		<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/profile"/></c:if>'>${loggedUser.username}</a></li>	
	      		<li><a target="_blank" href="https://twitter.com/#piuex"><img src="<c:url value="/resources/img/twitter.png"/>" class="barra-icon"></a></li>
	      		<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/logout"/></c:if>'><i class="icon-off"></i></a></li>
	    	</ul>
	  	</div>
	</div>
	
	<div class="container" style="margin: 0 auto; width: 38%">
		<form:form method="post" modelAttribute="userBean" enctype="multipart/form-data">
			<h1>Perfil de usuario</h1><br>
			
			<div>
				<img width="50%" height="50%" src="<c:url value="/resources/avatars/${userBean.avatarFileName}"/>" alt="avatar" />
				<form:hidden path="username"/>
				<h3>
					<span style="color: #000000">${userBean.name} - ${userBean.username}</span> 
					<span style="color: #888888"> (${userBean.email}) </span>
				</h3>
			</div>
			
			<div>
				<img src="http://maps.googleapis.com/maps/api/staticmap?size=380x263&sensor=false&zoom=13&maptype=hybrid&markers=${map.latitude},${map.longitude}" alt="map">
			</div>
			<br>
			<div>
				<p>
					<label for="file">Nueva imagen:</label>
					<input id="file" type="file" name="file"/>
				</p>
			</div>
			
				
			<div class="container" style="margin: 0 auto; width: 38%">	
				<fieldset style="text-align:center">
					<legend>My Mastery Level: </legend>
					<p class="agreement">
						<form:radiobutton path="level" value="newbie"/>
						<label for="level1">Newbie</label>
					</p>
					<p class="agreement">
						<form:radiobutton path="level" value="advanced"/>
						<label for="level2">Advanced</label>
					</p>
					<p class="agreement">
						<form:radiobutton path="level" value="master"/>
						<label for="level3">Master</label>
					</p>
				</fieldset>
				<br>
				<input type="submit" value="Guardar" class="btn btn-success" style="padding: 5px 40px">
			</div>
			
			
			
			
			<!--  
			<fieldset class="row4">
				<legend>Opponents Mastery Level: </legend>
				<p class="agreement">
					<input id="opponentsLevelnewbie1" name="opponentsLevel[newbie]" type="checkbox" value="true"/><input type="hidden" name="_opponentsLevel[newbie]" value="on"/>
					<label>Newbie</label>
				</p>
				<p class="agreement">
					<input id="opponentsLeveladvanced1" name="opponentsLevel[advanced]" type="checkbox" value="true"/><input type="hidden" name="_opponentsLevel[advanced]" value="on"/>
					<label>Advanced</label>
				</p>
				<p class="agreement">
					<input id="opponentsLevelmaster1" name="opponentsLevel[master]" type="checkbox" value="true" checked="checked"/><input type="hidden" name="_opponentsLevel[master]" value="on"/>
					<label>Master</label>
				</p>
			</fieldset>
			-->
				
		</form:form>
	</div>	
	
	<script src='<c:url value="/resources/js/jquery.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.js"/>'></script>
	</body>
</html>