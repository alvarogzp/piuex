/*
 * Anonymous unreadable script.
 */

var x = 0, y = 0, element = null;

function moverelemento(position, diff) {
	element.style[position] = parseInt(element.style[position] || element.getBoundingClientRect()[position]) + diff;
}

var elements = document.getElementsByClassName("mover");
for (var i = 0; i < elements.length; i++) {
	var elemento = elements[i];
	elemento.style.position = "absolute";
	elemento.style.cursor = "move";
	elemento.onmousedown = function (e) {
		e.preventDefault();
		x = e.pageX;
		y = e.pageY;
		element = e.target;
		document.onmousemove = function (e) {
			moverelemento("left", e.pageX - x);
			moverelemento("top", e.pageY - y);
			x = e.pageX;
			y = e.pageY;
		};
	};
	elemento.onmouseup = function (e) {
		document.onmousemove = null;
	};
}