/*
 * Script para mover elementos en una pagina web.
 * 
 * Para usar este script carguelo AL FINAL del "body" de su pagina web,
 * y asigne la clase "mover" a los elementos que desea que se puedan mover.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */

var x = 0, y = 0, element = null, objeto = null, clases = "";



function asignarCelda(e) {
	if (!clases || $(this).hasClass("letra")) {
		return;
	}
	$(this).attr("class", clases);
	clases = "";
	$(element).parent().attr("class", "tabla-td");
	$(element).remove();
	$(this).html("<span class='mover'>&nbsp;</span>");
	$(this).children(".mover").mousedown(iniciarmovimiento);
	detenermovimiento(e);
}



function iniciarmovimiento(e) {
	e.preventDefault();
	var p = $(this).position();
	x = p.left;
	y = p.top;
	element = this;
	clases = $(this).parent().attr("class");
	$("#contenedor").mousemove(movimiento);
//	$("#contenedor").mouseup(detenermovimiento);
//	$("#contenedor").mouseout(detenermovimiento);
}


function movimiento(e) {
	if (!element) {
		return;
	}
	var p = $(this).position();
	var $p = $(element).position();
	$p.left = ($p.left || 0) + (p.left || 0) - x;
	$p.top = ($p.top || 0) + (p.top || 0) - y;
	x = p.left;
	y = p.top;
}


function moverelemento(element, position, diff) {
	element.style[position] = parseInt(element.style[position] || element.getBoundingClientRect()[position]) + diff;
}


function detenermovimiento(e) {
	$("#contenedor").mousemove(null);
	element = null;
}


$(".mover").mousedown(iniciarmovimiento);

$("td").mouseup(asignarCelda);

console.log("Script cargado!");