/*
 * Script para mover elementos en una pagina web.
 * 
 * Para usar este script carguelo AL FINAL del "body" de su pagina web,
 * y asigne la clase "mover" a los elementos que desea que se puedan mover.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */

var x = 0, y = 0, element = null, objeto = null;



function asignarCelda(e) {
	var $td = $(this);
	$td.html(meterCelda(element));
}


function meterCelda(e) {
	return $(e).html();
}


function iniciarmovimiento(e) {
	e.preventDefault();
	var p = $(this).position();
	x = p.left;
	y = p.top;
	element = this;
	$("#contenedor").mousemove(movimiento);
	$("#contenedor").mouseup(detenermovimiento);
	$("#contenedor").mouseup(detenermovimiento);
}


function movimiento(e) {
	var p = $(this).position();
	var $p = $(element).position();
	$p.left += p.left - x;
	$p.top += p.top - y;
	x = p.left;
	y = p.top;
}


function moverelemento(element, position, diff) {
	element.style[position] = parseInt(element.style[position] || element.getBoundingClientRect()[position]) + diff;
}


function detenermovimiento(e) {
	$("#contenedor").mousemove(null);
	element = null;
	console.log("Fin del movimiento de " + e.target.id);
}


$(".mover").mousedown(iniciarmovimiento);

$("#juego td").mouseup(asignarCelda);

console.log("Script cargado!");