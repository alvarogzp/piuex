/*
 * Script para mover las letras del tablero.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */



// Elemento que está siendo movido (span vacío), necesario para saber cuál es el origen del movimiento
var element = null;
// El span que sigue el movimiento del cursor
var $fantasma = $(".fantasma");



function asignarCelda(e) {
	// this es el td de destino
	// element es el span que se está moviendo
	// el padre de element es el td de origen
	var $this = $(this);
	if (element == null) {
		detenermovimiento(e);
		return;
	} else if (element.parent()[0] == $this[0]) {
		return;
	} else if ($this.hasClass("letra") || $this.hasClass("comodin")) {
		detenermovimiento(e);
		return;
	}
	
	var $ep = element.parent();
	
	var letra = addClasses($ep, $this);
	actualizartextarea($ep, $this, letra);
	removeClasses($ep);
	
	$ep.off("mousedown");
	element.remove();
	$this.html("<span>&nbsp;</span>");
	$this.mousedown(iniciarmovimiento);
	detenermovimiento(e);
}



function addClasses(origen, destino) {
	var letra = "";
	_(origen.attr("class").split(" ")).each(
		function(c, i) {
			if (c == "mover" || c == "letra" || c == "comodin" || c.match("letra-([A-Z]|Ñ)")) {
				this.addClass(c);
				if (c.match("letra-([A-Z]|Ñ)")) {
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
	elemento.removeClass("letra-Ñ");
	elemento.removeClass("comodin");
	elemento.removeClass("mover");
}



function actualizartextarea(tdant, td, letra) {
	var x = td.data("x");
	var y = td.data("y");
	var f = td.data("f");
	if (x != undefined) {
		actualizartablero(x, y, letra);
	} else if (f != undefined) {
		actualizarfichas(f, letra);
	}
	var xant = tdant.data("x");
	var yant = tdant.data("y");
	var fant = tdant.data("f");
	if (xant != undefined) {
		actualizartablero(xant, yant, " ");
	} else if (fant != undefined) {
		actualizarfichas(fant, " ");
	}
}


function actualizartablero(x, y, e) {
	var $tablero = $("#tablero");
	var tablero_t = $tablero.text();
	var filas = tablero_t.split(".");
	var columnas = filas[y].split("");
	columnas[x] = e;
	var c = columnas.join("");
	filas[y] = c;
	var t = filas.join(".");
	$tablero.text(t);
}


function actualizarfichas(f, e) {
	var $fichas = $("#fichas");
	var fichas_t = $fichas.text();
	var fichas = fichas_t.split("");
	fichas[f] = e;
	var t = fichas.join("");
	$fichas.text(t);
}



function iniciarmovimiento(e) {
	// this es el td de origen
	e.preventDefault();
	var $this = $(this);
	if (element != null) {
		if (element.parent()[0] == $this[0]) {
			detenermovimiento(e);
		}
		return;
	}
	element = $this.children("span");
	addClasses($this, $fantasma);
	$fantasma.removeClass("mover"); // porque addClasses se la pone también
	actualizarFantasma(e.pageX, e.pageY);
	$fantasma.show();
	$("body").mousemove(movimiento);
}


function movimiento(e) {
	actualizarFantasma(e.pageX, e.pageY);
}


function actualizarFantasma(x, y) {
	$fantasma.css("left", x + 1);
	$fantasma.css("top", y + 1);
}



function detenermovimiento(e) {
	$("body").off("mousemove");
	element = null;
	$fantasma.hide();
	removeClasses($fantasma);
}



function confirmarjugada(e) {
	/*
	 * Ejecutado al enviar la jugada.
	 * Comprueba si no se han cambiado fichas del tablero y muestra una advertencia en ese caso.
	 * Comprueba que las fichas puestas estén seguidas.
	 * Devuelve false si no se debe realizar el submit, true si sí.
	 */
	// Comprobar que hayan desaparecido fichas del usuario
	var movidas = false;
	$("#letras td").each(function (i, d) {
		if (!$(d).hasClass("mover")) {
			movidas = true;
			// Para dejar de iterar por las fichas
			return false;
		}
	});
	if (!movidas) {
		return confirm("No has hecho cambios al tablero\n¿Estás seguro que quieres pasar el turno?");
	}
	
	// Ha habido fichas puestas en el tablero, comprobar que estén seguidas
	var $juegotd = $("#juego td");
	var seguidas = true;
	$juegotd.each(function (i, d) {
		var $d = $(d);
		if ($d.hasClass("mover")) {
			if (!comprobarseguidas($d, $juegotd)) {
				seguidas = false;
				// Para dejar de iterar por las fichas
				return false;
			}
		}
	});
	if (!seguidas) {
		alert("¡La jugada es incorrecta!\nTodas las palabras que pongas tienen que estar unidas a otras que ya estuvieran puestas");
		return false;
	}
	
	return true;
}


/*
 * Devuelve true si encuentra una ficha seguida que no haya puesto el usuario en el turno actual
 * o se encuentra con el centro del tablero, false si no.
 * Busca hacia arriba, abajo, izquierda y derecha.
 */
function comprobarseguidas(td, juegotd) {
	// Direcciones que recorrer
	var d = [{dx:1, dy:0}, {dx:0, dy:1}, {dx:-1, dy:0}, {dx:0, dy:-1}];
	for (var i = 0; i < d.length; i++) {
		var x = td.data("x");
		var y = td.data("y");
		var dx = d[i].dx;
		var dy = d[i].dy;
		while (true) {
			x += dx;
			y += dy;
			if (!(x < 15 && x >= 0 && y < 15 && y >= 0)) {
				// Celda fuera de los límites
				break;
			} else {
				var jtd = $(juegotd[y*15+x]);
				if (!jtd.hasClass("letra") && !jtd.hasClass("comodin")) {
					// Celda vacía, dejar de buscar en esta dirección
					break;
				} else if (!jtd.hasClass("mover") || jtd.hasClass("inicial")) {
					// Si la ficha no tiene la clase mover o es el centro del tablero, devolver true
					return true;
				}
			}
		}
	}
	// No ha habido éxito
	return false;
}



$(".mover").mousedown(iniciarmovimiento);

$("td").mouseup(asignarCelda);

$(".js-submit").click(confirmarjugada);



console.log("Script cargado!");