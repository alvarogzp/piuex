/*
 * Script para mover elementos en una pagina web.
 * 
 * Para usar este script carguelo AL FINAL del "body" de su pagina web,
 * y asigne la clase "mover" a los elementos que desea que se puedan mover.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */

var x = 0, y = 0, element = null;


function asignarCelda(e) {
	// this es el td de destino
	// element es el span que se está moviendo
	// el padre de element es el td de origen
	if (element == null) {
		detenermovimiento(e);
		return;
	} else if (element.parent()[0] == $(this)[0]) {
		return;
	} else if ($(this).hasClass("letra") || $(this).hasClass("comodin")) {
		detenermovimiento(e);
		return;
	}
	
	var $ep = element.parent();
	
	var letra = addClasses($ep, $(this));
	actualizartextarea($ep, $(this), letra);
	removeClasses($ep);
	
	$ep.off("mousedown");
	element.remove();
	$(this).html("<span>&nbsp;</span>");
	$(this).mousedown(iniciarmovimiento);
	detenermovimiento(e);
}


function addClasses(origen, destino) {
	var letra = "";
	_(origen.attr("class").split(" ")).each(
			function(c, i){
				if (c == "mover" || c == "letra" || c == "comodin" || c.match("letra-[A-Z]")) {
					this.addClass(c);
					if (c.match("letra-[A-Z]")) {
						letra = c.charAt(6);
					} else if (c == "comodin") {
						letra = "*";
					}
				}
			}, destino
		);
	return letra;
}


function removeClasses(elemento) {
	elemento.removeClass("letra");
	for (var i = 65; i <= 90; i++) {
		elemento.removeClass("letra-" + String.fromCharCode(i));
	}
	elemento.removeClass("comodin");
	elemento.removeClass("mover");
}


function actualizartextarea(tdant, td, letra) {
	var x = td.data("x");
	var y = td.data("y");
	if (x != undefined) {
		actualizar(x, y, letra);
	}
	var xant = tdant.data("x");
	var yant = tdant.data("y");
	if (xant != undefined) {
		actualizar(xant, yant, " ");
	}
}

function actualizar(x, y, e) {
	var tablero_t = $("#tablero").text();
	var filas = tablero_t.split(".");
	var columnas = filas[y].split("");
	columnas[x] = e;
	var c = columnas.join("");
	filas[y] = c;
	var t = filas.join(".");
	$("#tablero").text(t);
}



function iniciarmovimiento(e) {
	// this es el td de origen
	if (element != null) {
		return;
	}
	e.preventDefault();
	element = $(this).children("span");
	var p = element.position();
	x = p.left - e.pageX;
	y = p.top  - e.pageY;
	$("body").mousemove(movimiento);
	addClasses($(this), $(".fantasma"));
	$(".fantasma").removeClass("mover");
	$(".fantasma").show();
}


function movimiento(e) {
	// this es el contenedor
	$(".fantasma").css("left",e.pageX+1);
	$(".fantasma").css("top",e.pageY+1);
}


function detenermovimiento(e) {
	$("body").off("mousemove");
	element = null;
	$(".fantasma").hide();
	removeClasses($(".fantasma"));
}


$(".mover").mousedown(iniciarmovimiento);

$("td").mouseup(asignarCelda);


console.log("Script cargado!");