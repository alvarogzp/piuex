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
	// this es el td de destino
	// element es el span que se está moviendo
	// el padre de element es el td de origen
	if (!clases || $(this).hasClass("letra") || $(this).hasClass("comodin")) {
		return;
	}
	_(clases.split(" ")).each(
		function(d, i){
			$(this).addClass(d);
		}, this
	);
	clases = "";
	$(element).parent().removeClass("letra");
	$(element).remove();
	$(this).html("<span>&nbsp;</span>");
	$(this).mousedown(iniciarmovimiento);
	detenermovimiento(e);
}



function iniciarmovimiento(e) {
	e.preventDefault();
	element = $(this).children("span");
	var p = element.position();
	x = p.left;
	y = p.top;
	clases = $(this).attr("class");
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