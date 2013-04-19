<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Apalabrados #piuex</title>
	</head>
<body>
<ul>
<li> 
<form id="readJsonPost" class="readJsonFormPost" action="<c:url value="/users" />" method="post">
<input id="readJsonSubmit" type="submit" value="POST /users" />	
</form>
</li><li>
<form id="readJsonDelete" class="readJsonFormDelete" action="<c:url value="/users/2" />">
<input id="readJsonSubmit" type="submit" value="DELETE /users/2" />	
</form>
</li><li>
<form id="readJsonDelete" class="readJsonFormDelete" action="<c:url value="/users" />">
<input id="readJsonSubmit" type="submit" value="DELETE /users" />	
</form>
</li><li>
<form id="readJsonPut" class="readJsonFormPut" action="<c:url value="/users/1" />">
<input id="readJsonSubmit" type="submit" value="PUT /users/1" />	
</form>
</li><li>
<a id="writeJsonAccept1" class="writeJsonLink" href="<c:url value="/users" />">GET /users (HTTP Header Accept:applicaton/json)</a>
</li><li>
<a id="writeJsonAccept2" class="writeJsonLink2" href="<c:url value="/users?alt=json" />">GET /users (Param alt=json)</a>
</li><li>
<a id="writeJsonAccept3" class="writeJsonLink" href="<c:url value="/users/1" />">GET /users/1 (HTTP Header Accept:applicaton/json)</a>
</li><li>
<a id="writeJsonAccept4" class="writeJsonLink2" href="<c:url value="/users/1?alt=json" />">GET /users/1 (Param alt=json)</a>
</li></ul>
<script type="text/javascript" src="<c:url value="/resources/jquery/1.6/jquery.js" />"></script>
<script>
	MvcUtil = {};
	MvcUtil.showSuccessResponse = function (text, element) {
		MvcUtil.showResponse("success", text, element);
	};
	MvcUtil.showErrorResponse = function showErrorResponse(text, element) {
		MvcUtil.showResponse("error", text, element);
	};
	MvcUtil.showResponse = function(type, text, element) {
		var responseElementId = element.attr("id") + "Response";
		var responseElement = $("#" + responseElementId);
		if (responseElement.length == 0) {
			responseElement = $('<span id="' + responseElementId + '" class="' + type + '" style="display:none">' + text + '</span>').insertAfter(element);
		} else {
			responseElement.replaceWith('<span id="' + responseElementId + '" class="' + type + '" style="display:none">' + text + '</span>');
			responseElement = $("#" + responseElementId);
		}
		responseElement.fadeIn("slow");
	};
	MvcUtil.xmlencode = function(xml) {
		//for IE 
		var text;
		if (window.ActiveXObject) {
		    text = xml.xml;
		 }
		// for Mozilla, Firefox, Opera, etc.
		else {
		   text = (new XMLSerializer()).serializeToString(xml);
		}			
		    return text.replace(/\&/g,'&'+'amp;').replace(/</g,'&'+'lt;')
	        .replace(/>/g,'&'+'gt;').replace(/\'/g,'&'+'apos;').replace(/\"/g,'&'+'quot;');
	};
</script>	
<script type="text/javascript">
$(document).ready(function() {		

	$("form.readJsonFormPost").submit(function() {
		var form = $(this);
		var button = form.children(":first");
		var data = "{ \"name\": \"Ayra Stark\", \"username\": \"ayra\", \"email\": \"astark@unex.es\", \"password\":\"changeme\" }";
		
		$.ajax({ type: "POST", url: form.attr("action"), data: data, contentType: "application/json", dataType: "application/json", success: function(text) { MvcUtil.showSuccessResponse(text, button); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, button); }});
		return false;
	});
	
	$("form.readJsonFormDelete").submit(function() {
		var form = $(this);
		var button = form.children(":first");
		var data = "";
		
		$.ajax({ type: "DELETE", url: form.attr("action"), data: data, contentType: "application/json", dataType: "application/json", success: function(text) { MvcUtil.showSuccessResponse(text, button); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, button); }});
		return false;
	});
	
	$("form.readJsonFormPut").submit(function() {
		var form = $(this);
		var button = form.children(":first");
		// var data = "{ \"level\": \"master\", \"opponentsLevel\": { \"master\": \"true\", \"newbie\": \"true\" }, \"avatarFileName\": \"av.jpg\" }";
		var data = "{ \"level\": \"master\", \"avatarFileName\": \"av.jpg\" }";
		
		$.ajax({ type: "PUT", url: form.attr("action"), data: data, contentType: "application/json", dataType: "application/json", success: function(text) { MvcUtil.showSuccessResponse(text, button); }, error: function(xhr) { MvcUtil.showErrorResponse(xhr.responseText, button); }});
		return false;
	});

	$("a.writeJsonLink").click(function() {
		var link = $(this);
		$.ajax({ url: this.href,
			beforeSend: function(req) {
	
					req.setRequestHeader("Accept", "application/json");
	
			},
			success: function(json) {
				MvcUtil.showSuccessResponse(JSON.stringify(json), link);
			},
			error: function(xhr) {
				MvcUtil.showErrorResponse(xhr.responseText, link);
			}});
		return false;
	});
	
	$("a.writeJsonLink2").click(function() {
		var link = $(this);
		$.ajax({ url: this.href,
			success: function(json) {
				MvcUtil.showSuccessResponse(JSON.stringify(json), link);
			},
			error: function(xhr) {
				MvcUtil.showErrorResponse(xhr.responseText, link);
			}});
		return false;
	});

});
</script>
</body>
</html>
