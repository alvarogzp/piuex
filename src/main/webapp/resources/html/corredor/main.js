/*
 * Corredor.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */

var x = 0;
var y = 0;
var v = 0;

var acelerar = function(e) {
	v += 1;
};


var disminuirAceleracion = function() {
	if (v > 0) {
		v -= 1;
	}
};


var pintar = function() {
	x = x + v;
	// y = y + v;
	square.style.left = x;
	square.style.top = y;
};


setInterval(disminuirAceleracion, 60);
setInterval(pintar, 50);
document.body.onkeydown = acelerar;




































var x = 0, y = 0, element = null;


function mover(elemento) {
	elemento.onmousedown = iniciarmovimiento;
	elemento.onmouseup = detenermovimiento;
	console.log("Cargado movimiento para " + elemento.id);
}


function iniciarmovimiento(e) {
	console.log("Moviendo " + e.target.id);
	x = e.pageX;
	y = e.pageY;
	element = e.target;
	document.onmousemove = movimiento;
}


function movimiento(e) {
	// console.log("Moviendo...");
	moverelemento(element, "left", e.pageX - x);
	moverelemento(element, "top", e.pageY - y);
	x = e.pageX;
	y = e.pageY;
}


function moverelemento(element, position, diff) {
	element.style[position] = parseInt(element.style[position] || element.getBoundingClientRect()[position]) + diff;
}


function detenermovimiento(e) {
	document.onmousemove = null;
	element = null;
	console.log("Fin del movimiento de " + e.target.id);
}



var elements = document.getElementsByClassName("mover");
for (var i = 0; i < elements.length; i++) {
	mover(elements[i]);
}


console.log("Script cargado!");