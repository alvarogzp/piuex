/*
 * Script para mover elementos en una pagina web usando jQuery, versión mini.
 * 
 * Para usar este script carguelo AL FINAL del "body" de su pagina web,
 * y asigne la clase "mover" a los elementos que desea que se puedan mover.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */
var x = 0, y = 0, $e;
$(".mover").mousedown(function (e) {
	e.preventDefault();
	$e = $(e.target);
	x = e.pageX - parseInt($e.css("left")) || 0;
	y = e.pageY - parseInt($e.css("top")) || 0;
	$(document).mousemove(function (e) {
		$e.css("left", e.pageX - x).css("top", e.pageY - y);
	});
}).mouseup(function (e) {
	$(document).off("mousemove");
});