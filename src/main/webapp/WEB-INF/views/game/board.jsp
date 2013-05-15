<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
<head>
	<link rel="icon" type="image/png" href='<c:url value="/resources/img/logo.png"/>'>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link href="<c:url value="/resources/css/default.css"/>" rel="stylesheet"  type="text/css" />
	<link href="<c:url value="/resources/bootstrap/css/bootstrap.min.css"/>" rel="stylesheet" media="screen">
	<link href="<c:url value="/resources/css/piuex.css"/>" rel="stylesheet">
	<link href="<c:url value="/resources/tablero/main.css"/>" rel="stylesheet"/>
	<title>Partida: ${game.p1.username} VS ${game.p2.username}</title>
</head>
<body>

	<!-- Barra de navegación -->

	<div class="navbar">
	  	<div class="navbar-inner">
	    	<a href="<c:url value="/"/>" class="brand">Home</a>
	    	<ul class="nav"> 	
		      	<li><a href='<c:if test="${loggedUser==null}"><c:url value="/user/login"/></c:if>'>Login</a></li>
		      	<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/list"/></c:if>'>Usuarios</a></li>
		      	<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/game/list?id=${loggedUser.id}"/></c:if>'>Partidas</a></li>
	      	</ul>
	      	<ul class="nav pull-right">	
	      		<li><a href="https://twitter.com/#piuex"><img src="<c:url value="/resources/img/twitter.png"/>" class="barra-icon"></a></li>
	      		<li><a href='<c:if test="${loggedUser!=null}"><c:url value="/user/logout"/></c:if>'><i class="icon-off"></i></a></li>
	    	</ul>
	  	</div>
	</div>
	
	<form method="post">
		<div class="container" style="margin: 0 auto; width: 38%">
			<input id="id" name="id" type="hidden" value="${game.id}"/>
			
			<span style="font-size: 25px; color: #000000"><b>Partida: </b></span>  <span style="font-size: 20px">${game.p1.username} VS ${game.p2.username} </span> 
			<span style="font-size: 25px; color: #000000"><b>&nbsp;&nbsp;&nbsp;Puntuación:  </b></span><span style="font-size: 20px">${game.p1Score} - ${game.p2Score} </span>
			<br>
			
			<div class="container" style="margin: 0 auto; width: 38%">
				<legend style="font-size: 20px; text-decoration: underline;"><b >Estado del tablero</b></legend>
			</div>
		</div>
				
		<div id="contenedor" class="container" style="margin: 0 auto; width: 35%">
			<textarea id="tablero">
3  2   3   2  3
 2   1   1   2 
  2   0 0   2  
0  2   0   2  0
    2     2    
 1   1   1   1 
  0   0 0   0  
3  0 PIUEX 0  3
  0   0 0   0  
 1   1   1   1 
    2     2    
0  2   0   2  0
  2   0 0   2  
 2   1   1   2 
3  2   3   2  3</textarea>
		
			<div id="juego">
				&nbsp;
			</div>
		</div>
		
		<br>
		
		<div class="container" style="margin: 0 auto; width: 35%">
			<div id="letras" >
				<table>
					<tr>
						<td class="letra letra-A tabla-td"><span class="mover">&nbsp;</span></td>
						<td class="letra letra-B tabla-td"><span class="mover">&nbsp;</span></td>
						<td class="letra letra-C tabla-td"><span class="mover">&nbsp;</span></td>
						<td class="letra letra-D tabla-td"><span class="mover">&nbsp;</span></td>
						<td class="letra letra-E tabla-td"><span class="mover">&nbsp;</span></td>
						<td class="letra letra-F tabla-td"><span class="mover">&nbsp;</span></td>
						<td class="letra letra-G tabla-td"><span class="mover">&nbsp;</span></td>
						<td class="letra letra-H tabla-td"><span class="mover">&nbsp;</span></td>
						
					</tr>
				</table>
			</div>
		</div>
		
			<br>
		<div class="container" style="margin: 0 auto; width: 15%">
			<input type="submit" value="Jugar" class="btn btn-success" style="padding: 5px 40px"/>
		</div>
		
			
		
		</form>

	
	<script src='<c:url value="/resources/js/jquery.js"/>'></script>
	<script src='<c:url value="/resources/js/underscore.js"/>'></script>
	<script src='<c:url value="/resources/bootstrap/js/bootstrap.js"/>'></script>
	<script src='<c:url value="/resources/tablero/main.js"/>'></script>
	<script src='<c:url value="/resources/tablero/mover.js"/>'></script>	
	
	</body>
</html>