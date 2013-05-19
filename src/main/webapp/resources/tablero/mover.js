/*
 * Script para mover las letras del tablero.
 * 
 * Permite mover las letras que tienen la clase "mover", pudiendo soltarlas
 * en cualquier casilla libre del tablero o de las fichas del jugador.
 * 
 * El movimiento se puede hacer quedando presionado el ratón y arrastrando
 * hasta soltarlo en la casilla de destino; o pulsando y soltando el ratón
 * en la casilla origen, desplazar hasta la casilla destino y allí pulsar
 * y soltar el ratón nuevamente.
 * 
 * Cuando se está arrastrando una ficha (ya sea con el ratón pulsado o no)
 * se muestra la sombra de la ficha que está siendo arrastrada de forma
 * semi-transparente bajo el cursor.
 * Si se desea cancelar el movimiento de una ficha, se debe pulsar de nuevo
 * sobre la celda de origen en la que se encuentra la ficha que se está
 * moviendo.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */



// Elemento que está siendo movido (span vacío), necesario para saber cuál es el origen del movimiento
var element = null;

// El span que sigue el movimiento del cursor
var $fantasma = $(".fantasma");

// Indica el estado de la confirmación de la jugada:
// 0 es que todavía no se ha empezado a confirmar (o ha sido rechazada)
// 1 es que se está confirmando
// 2 es que ha sido confirmada
var confirmandoJugada = 0;



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
	 * Comprueba que las fichas puestas estén unidas a otras puestas previamente,
	 * o en el centro del tablero en el caso inicial.
	 * Devuelve false si no se debe realizar el submit, true si sí.
	 */
	if (confirmandoJugada == 2) {
		// La jugada ya ha sido confirmada, enviar
		return true;
	} else if (confirmandoJugada == 1) {
		// La jugada se está confirmando, no hacer nada
		return false;
	}
	
	confirmandoJugada = 1;
	
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
		// Detener confirmación
		confirmandoJugada = 0;
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
		// Detener confirmación
		confirmandoJugada = 0;
		alert("¡La jugada es incorrecta!\nTodas las palabras que pongas tienen que estar unidas a otras que ya estuvieran puestas.\nSi estás haciendo el primer movimiento, debes poner una palabra que pase por el centro.");
		return false;
	}
	
	/*
	 * Comprobar palabras válidas.
	 * Esto debe hacerse de forma asíncrona porque jquery llamará al callback de esa manera
	 */
	$.get($("#diccionario").text(), function(e) {
		comprobarDiccionario(["HOLA"], e);
	});
	
	// Devolver falso en espera de que se realize la comprobación del diccionario
	return false;
}


function comprobarDiccionario(palabras, diccionario) {
	palabras = tolowercase(palabras);
	// No se usa _.each porque no se puede parar cuando ya no quieras seguir recorriendo el array
	// Con every se devuelve false para detener el recorrido, y entonces el propio every devuelve false
	diccionario.split(/\s/).every(function (palabra) {
		if (!palabras.every(function (p) {
			if (palabra == p) {
				console.log("Eliminando: " + p + "\nLongitud: " + (palabras.length-1));
				palabras = eliminarelemento(palabras, p);
				if (palabras.length == 0) {
					// Comprobación correcta!
					confirmandoJugada = 2;
//					$(".js-submit").click();
					console.log("OK!");
					// Detener el recorrido
					return false;
				}
			}
			// Seguir el recorrido
			return true;
		})) {
			// El every interno nos informa que se ha vaciado el vector de palabras
			// Detener recorrido
			return false;
		}
		// Seguir recorrido
		return true;
	});
	if (palabras.length > 0) {
		// Hay palabras no reconocidas
		confirmandoJugada = 0;
		alert("Las siguientes palabras no son válidas:\n" + palabras.join("\n"));
	}
}


function tolowercase(vector) {
	var nuevo = [];
	_(vector).each(function (e, i) {
		nuevo.push(e.toLowerCase());
	});
	return nuevo;
}


function eliminarelemento(vector, elemento) {
	var nuevo = [];
	_(vector).each(function (e, i) {
		if (e != elemento) {
			nuevo.push(e);
		}
	});
	return nuevo;
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
			x += dx;
			y += dy;
		}
	}
	// No ha habido éxito
	return false;
}



$(".mover").mousedown(iniciarmovimiento);

$("td").mouseup(asignarCelda);

$(".js-submit").click(confirmarjugada);



console.log("Script cargado!");