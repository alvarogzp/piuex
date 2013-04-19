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
<link href="<c:url value="/resources/css/default.css"/>" rel="stylesheet" type="text/css" />
	
<title>Perfil de ${userBean.username}</title>
</head>
<body style="text-align:center">
<form:form method="post" modelAttribute="userBean" enctype="multipart/form-data">
	<h1 style='color: #888888; font-family: "Times New Roman", Serif; font-weight: bold; font-size: 45px'>Perfil de usuario</h1>
	
		<a href="<c:url value="/user/list"/>" style="font-style: oblique">Ir a la lista de usuarios</a>
		<br>
		<br>
		<fieldset class="row4">		
		
		<img src="<c:url value="/resources/avatars/${userBean.avatarFileName}"/>" alt="avatar" />
		
		<form:hidden path="username"/>
		
		<h2 style="color: #000000">${userBean.name} - ${userBean.username}</h2>
			<p style="color: #888888">${userBean.email}
		</p>
		</fieldset>
		
		<div>
			<img src="http://maps.googleapis.com/maps/api/staticmap?size=380x263&sensor=false&zoom=13&maptype=hybrid&markers=${map.latitude},${map.longitude}" alt="map">
		</div>
		
		<fieldset class="row4">
		<p>
			<label for="file">New image:</label>
			<input id="file" type="file" name="file"/>
			</p>
		</fieldset>
		
		<fieldset style="text-align:center" class="row4" style="width: 464px; ">
			<legend>My Mastery Level: </legend>
			<p class="agreement">
				<form:radiobutton path="level" value="newbie"/>
				<label>Newbie</label>
			</p>
			<p class="agreement">
				<form:radiobutton path="level" value="advanced"/>
				<label>Advanced</label>
			</p>
			<p class="agreement">
				<form:radiobutton path="level" value="master"/>
				<label>Master</label>
			</p>
		</fieldset>
		<div>
				<input type="submit" value="Save" class="button" style="margin-left: 44%; padding-left: 40px; padding-right: 40px ">
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
</body>
</html>