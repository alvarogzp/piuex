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





/// VARIABLES GLOBALES ///

// Elemento que está siendo movido (span vacío), necesario para saber cuál es el origen del movimiento
var element = null;

// El span que sigue el movimiento del cursor
var $fantasma = $(".fantasma");

// Indica el estado de la confirmación de la jugada:
// 0 es que todavía no se ha empezado a confirmar (o ha sido rechazada)
// 1 es que se está confirmando
// 2 es que ha sido confirmada
var confirmandoJugada = 0;

// Barra de porcentaje usada en la confirmación de la jugada
var $bar = $(".bar");

// Span usado para mostrar mensajes mientras se confirma la jugada
var $mensaje = $(".js-mensaje");





/// MOVIMIENTO DE LAS FICHAS POR EL TABLERO ///

/*
 * Llamado al soltar el ratón sobre cualquier td de la página.
 */
function asignarCelda(e) {
	// this es el td de destino
	// element es el span que se está moviendo
	// el padre de element es el td de origen
	var $this = $(this);
	if (element == null) {
		detenermovimiento(e);
		return;
	} else if (element.parent()[0] == $this[0]) {
		// Se ha soltado el ratón en la misma celda en la que se presionó
		// No hacer nada para poder arrastrar la celda teniendo el ratón sin pulsar
		return;
	} else if (($this.hasClass("letra") || $this.hasClass("comodin")) && !$this.hasClass("mover")) {
		// Se ha soltado el ratón sobre una celda ya ocupada y que no se puede mover
		// Detener sin hacer nada
		detenermovimiento(e);
		return;
	}
	
	var $ep = element.parent();
	
	if ($this.hasClass("mover")) {
		// Se van a intercambiar las fichas
		var letrathis = addClasses($this, element);
		removeClasses($this);
		var letra = addClasses($ep, $this);
		removeClasses($ep);
		addClasses(element, $ep);
		removeClasses(element);
		intercambiartextarea($this, $ep);
		$ep.off("mousedown");
		element.remove();
		
		// Añadir span por si en el futuro se mueve esta celda poder guardarlo en element
		$this.html("<span>&nbsp;</span>");
		$this.mousedown(iniciarmovimiento);
		detenermovimiento(e);
	}
	
	var letra = addClasses($ep, $this);
	actualizartextarea($ep, $this, letra);
	removeClasses($ep);
	$ep.off("mousedown");
	element.remove();
	
	// Añadir span por si en el futuro se mueve esta celda poder guardarlo en element
	$this.html("<span>&nbsp;</span>");
	$this.mousedown(iniciarmovimiento);
	detenermovimiento(e);
}



/*
 * Añade las clases que tiene el elemento origen al elemento destino.
 * Las clases que se añaden son mover, letra, comodin y letra-[A-ZÑ].
 */
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



/*
 * Elimina las clases letra, letra-[A-ZÑ], comodin y mover del elemento.
 */
function removeClasses(elemento) {
	elemento.removeClass("letra");
	for (var i = 65; i <= 90; i++) {
		elemento.removeClass("letra-" + String.fromCharCode(i));
	}
	elemento.removeClass("letra-Ñ");
	elemento.removeClass("comodin");
	elemento.removeClass("mover");
}



/*
 * Actualiza el textarea que representa el tablero con la nueva posición de la letra,
 * borrando la posición anterior.
 * También actualiza el textarea de las fichas del jugador si el td corresponde a una
 * de ellas.
 */
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



/*
 * Pone en la posición [x, y] del textarea del tablero el carácter e.
 */
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



/*
 * Pone en la posición f de las fichas del jugador el carácter e.
 */
function actualizarfichas(f, e) {
	var $fichas = $("#fichas");
	var fichas_t = $fichas.text();
	var fichas = fichas_t.split("");
	fichas[f] = e;
	var t = fichas.join("");
	$fichas.text(t);
}



/*
 * Llamado al presionar el ratón sobre un td con la clase mover,
 * es decir, una letra que el jugador puede mover en este turno.
 */
function iniciarmovimiento(e) {
	// this es el td de origen
	// Evitar que el navegador se piense que el usuario está seleccionando texto al tener el ratón pulsado
	e.preventDefault();
	var $this = $(this);
	if (element != null) {
		if (element.parent()[0] == $this[0]) {
			// Si se estaba moviendo una ficha y se ha pulsado en ella nuevamente, dejar de moverla
			detenermovimiento(e);
		}
		// Si se ha pulsado mientras ya se estaba moviendo otra ficha, no hacer nada
		return;
	}
	element = $this.children("span");
	addClasses($this, $fantasma);
	$fantasma.removeClass("mover"); // porque addClasses se la pone también
	actualizarFantasma(e.pageX, e.pageY);
	$fantasma.show();
	$("body").mousemove(movimiento);
}



/*
 * Llamado desde body cuando se mueve el ratón mientras se está desplazando una ficha.
 */
function movimiento(e) {
	actualizarFantasma(e.pageX, e.pageY);
}



/*
 * Actualiza la posición x e y de una ficha transparente que sigue el ratón
 */
function actualizarFantasma(x, y) {
	$fantasma.css("left", x + 1);
	$fantasma.css("top", y + 1);
}



/*
 * Detiene el movimiento de una ficha.
 * Es seguro llamar a esta función aunque el movimiento ya esté detenido.
 */
function detenermovimiento(e) {
	$("body").off("mousemove");
	element = null;
	$fantasma.hide();
	removeClasses($fantasma);
}





/// COMPROBACIONES ANTES DE ENVIAR ///

/*
 * Llamado al pulsar sobre el botón de Jugar, justo antes de enviar el formulario con el tablero
 * y las fichas del jugador.
 * Si el método devuelve true, el formulario se envía; si devuelve false, no.
 * 
 * Realiza las siguientes comprobaciones:
 *   - Si el usuario no ha puesto fichas en el tablero, muestra un mensaje de confirmación, y
 *   si es aceptado, envía el formulario sin realizar más comprobaciones.
 *   - Comprueba que todas las fichas puestas estén en contacto con otras fichas previamente
 *   puestas o pasen por el centro del tablero en el caso de la primera jugada.
 *   - Comprueba que todas las palabras puestas sean correctas, es decir, que estén en el diccionario
 *   usado por la aplicación.
 * 
 * La última comprobación (comprobar que las palabras estén en un diccionario) requiere realizar una
 * petición HTTP para obtener el diccionario, y debe ser realizada de forma asíncrona. Por tanto, si
 * se llega a ese punto, la función devolverá false aunque no se haya acabado de procesar, y tras
 * recibir la petición y terminar la comprobación se decidirá si se envía el formulario o no.
 * Esto se consigue mediante una bandera con 3 estados: 0 si no se está realizando ninguna comprobación,
 * 1 si se está confirmando la jugada y 2 si la jugada ha sido confirmada con éxito.
 * Al realizarse la comprobación asíncrona satisfactoriamente y establecerse la bandera al valor 2,
 * se volverá a pulsar (de forma virtual) de nuevo el botón de Jugar, y se llamará a este método, que
 * al ver el valor 2 en la bandera enviará directamente el formulario sin realizar ningún tipo de
 * comprobación adicional.
 */
function confirmarjugada(e) {
	if (confirmandoJugada == 2) {
		// La jugada ya ha sido confirmada, enviar
		return true;
	} else if (confirmandoJugada == 1) {
		// La jugada se está confirmando, no hacer nada
		return false;
	}
	
	iniciarconfirmacion();
	
	// Comprobar que hayan desaparecido fichas del jugador
	var movidas = false;
	$("#letras td").each(function (i, d) {
		if (!$(d).hasClass("mover")) {
			movidas = true;
			// Dejar de iterar por las fichas
			return false;
		}
	});
	if (!movidas) {
		detenerconfirmacion();
		return confirm("No has hecho cambios al tablero\n¿Estás seguro que quieres pasar el turno?");
	}
	
	actualizarporcentaje(25, "Calculando nuevas palabras...");
	
	// Ha habido fichas puestas en el tablero, comprobar que estén seguidas
	// De paso ir guardando las nuevas palabras en un vector
	var $juegotd = $("#juego td");
	var seguidas = true;
	var palabras = [];
	$juegotd.each(function (i, d) {
		var $d = $(d);
		if ($d.hasClass("mover")) {
			if (!comprobarseguidas($d, $juegotd)) {
				seguidas = false;
				// Dejar de iterar por el tablero
				return false;
			}
			palabras = concatenarunicos(palabras, obtenerpalabras($d, $juegotd));
		}
	});
	if (!seguidas) {
		detenerconfirmacion();
		alert("¡La jugada es incorrecta!\nTodas las palabras que pongas tienen que estar unidas a otras que ya estuvieran puestas.\nSi estás haciendo el primer movimiento, debes poner una palabra que pase por el centro.");
		return false;
	}
	
	actualizarporcentaje(50, "Comprobando palabra(s): " + palabras.join(", "));
	
	console.log(palabras);
	// Comprobar palabras válidas
	// Esto debe hacerse de forma asíncrona porque jquery llamará al callback de esa manera
	// La url del diccionario se obtiene del html (para poder indicarla de forma relativa con un c:url)
	$.get($("#diccionario").text(), function(e) {
		comprobarDiccionario(palabras, e);
	});
	
	// Devolver falso en espera de que se realize la comprobación del diccionario
	return false;
}



/*
 * Devuelve true si encuentra una ficha seguida a la del td
 * que no haya puesto el usuario en el turno actual
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



/*
 * Devuelve las palabras que hay unidas al td pasado como parámetro,
 * es decir, palabras de las cuales el td forma parte.
 */
function obtenerpalabras(td, juegotd) {
	var palabras = [];
	// Direcciones que recorrer
	var d = [{dx: 1, dy: 0}, {dx: 0, dy: 1}];
	for (var i = 0; i < d.length; i++) {
		var x = td.data("x");
		var y = td.data("y");
		var dx = d[i].dx;
		var dy = d[i].dy;
		// Primero ir hacia atrás hasta que empieze la palabra
		var xy = finletras(x, y, -dx, -dy, juegotd);
		// Buscar el final de la cadena
		var xyfin = finletras(x, y, dx, dy, juegotd);
		if (xy.x == xyfin.x && xy.y == xyfin.y) {
			// No hay palabra en esta dirección
			continue;
		} else {
			var palabra = getpalabra(xy.x, xy.y, xyfin.x + 1, xyfin.y + 1, juegotd);
			palabras.push(palabra);
		}
	}
	return palabras;
}



/*
 * Dada una posición y una dirección, devuelve la posición en la que deja de haber letras en esa dirección.
 */
function finletras(x, y, dx, dy, juegotd) {
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
			}
		}
	}
	return {"x":x-dx, "y":y-dy};
}



/*
 * Dadas unas coordenadas de inicio y fin, devuelve la palabra que se encuentra en ellas.
 * Es decir, se empieza recorriendo el tablero en [xi, yi] y se sigue hasta [xf, yf] guardando las letras
 * que están dentro del área.
 * El índice xf e yf debe ser el límite que no se debe alcanzar al obtener la palabra, y como mínimo
 * uno más que xi e yi.
 * Lo normal es que la coordenada x o la y sea de ancho 1 y de este modo se obtendrían las letras de un
 * trozo de fila o de columna.
 */
function getpalabra(xi, yi, xf, yf, juegotd) {
	var palabra = [];
	var filas = $("#tablero").text().split(".");
	for (var i = yi; i < yf; i++) {
		var columna = filas[i].split("");
		for (var j = xi; j < xf; j++) {
			var letra = columna[j];
			palabra.push(letra);
		}
	}
	return palabra.join("");
}



/*
 * Concatena los vectores v1 y v2 eliminando duplicados.
 * Devuelve el vector resultante.
 * Se supone que v1 no tiene duplicados.
 * v2 puede tenerlos, incluso dentro de él mismo.
 * v1 es modificado para añadir los elementos de v2 no repetidos.
 */
function concatenarunicos(v1, v2) {
	var v = v1;
	_( v2 ).each(function (e) {
		if (v.every(function (f) {
			if (e == f) {
				// e ya está en v, no añadir y detener el recorrido de v
				return false;
			} else {
				// Continuar recorriendo v...
				return true;
			}
		})) {
			// Si el recorrido de v se ha terminado satisfactoriamente es que e no está en v, añadir
			v.push(e);
		}
	});
	return v;
}



/*
 * Llamado al obtener el diccionario mediante una petición AJAX.
 * palabras es la lista de palabras a analizar,
 * diccionario es una cadena con el contenido del diccionario.
 * El diccionario puede tener palabras separadas por espacios o saltos de línea, indistintamente.
 * Comprueba que todas las palabras estén en el diccionario, y si es así confirma la jugada
 * y simula una pulsación del botón de jugar para enviar el formulario.
 * Si hay palabras que no están, muestra un mensaje con las palabras que no están y detiene la confirmación.
 * 
 * El diccionario actualmente usado es un fichero de 15MB, por lo que su recorrido se puede demorar varios
 * segundos, incluso parecer que el navegador no responde.
 * El algoritmo intenta en la medida de lo posible ser eficiente, evitando recorrer todo el contenido si ya
 * se han comprobado todas las palabras, pero inevitablemente se debe recorrer entero si alguna palabra no
 * es correcta.
 * 
 * Las palabras del diccionario están en minúsculas y sólo contienen caracteres de la a la z y la eñe, sin
 * tildes ni diéresis.
 */
function comprobarDiccionario(palabras, diccionario) {
	palabras = tolowercase(palabras);
	// No se usa _.each porque no se puede parar cuando ya no se quiera seguir recorriendo el array
	// Con every se devuelve false para detener el recorrido, y entonces el propio every devuelve false
	// Dividir las palabras usando \s que separa tanto espacios como saltos de línea
	diccionario.split(/\s/).every(function (palabra, index) {
		if (index % 25000 == 0) {
			actualizarporcentaje(50 + (index / 25000));
		}
		if (!palabras.every(function (p) {
			if (palabra == p) {
				palabras = eliminarelemento(palabras, p);
				if (palabras.length == 0) {
					// Comprobación correcta!
					completarconfirmacion();
					$(".js-submit").click();
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
		detenerconfirmacion();
		alert("Las siguientes palabras no son válidas:\n" + palabras.join("\n"));
	}
}



/*
 * Convierte a minúsculas todas las palabras de un vector.
 */
function tolowercase(vector) {
	var nuevo = [];
	_(vector).each(function (e) {
		nuevo.push(e.toLowerCase());
	});
	return nuevo;
}



/*
 * Elimina elemento del vector, devolviendo el resultado.
 */
function eliminarelemento(vector, elemento) {
	var nuevo = [];
	_(vector).each(function (e) {
		if (e != elemento) {
			nuevo.push(e);
		}
	});
	return nuevo;
}



/*
 * Inicia una confirmación de la jugada en curso, oculta el botón de jugar,
 * muestra la barra de progreso y establece la bandera a 1.
 */
function iniciarconfirmacion() {
	confirmandoJugada = 1;
	$(".js-submit").hide();
	$(".js-confirm").show();
	actualizarporcentaje(10, "Confirmando jugada...");
}



/*
 * Completa la confirmación estableciendo la bandera a 2
 * y poniendo el porcentaje al 100%.
 */
function completarconfirmacion() {
	confirmandoJugada = 2;
	actualizarporcentaje(100, "¡Jugada válida!");
}



/*
 * Cambia el porcentaje de la barra al valor solicitado.
 */
function actualizarporcentaje(p, mensaje) {
	if (mensaje != undefined) {
		$mensaje.text(mensaje);
	}
	$bar.css("width", p + "%");
}



/*
 * Detiene una confirmación de la jugada en curso,
 * ocultando la barra de progreso y restableciendo la bandera.
 */
function detenerconfirmacion() {
	confirmandoJugada = 0;
	$(".js-confirm").hide();
	$(".js-submit").show();
	actualizarporcentaje(0, " ");
}





/// ASIGNACIÓN DE EVENTOS ///

// Al presionar con el ratón sobre un elemento de la clase mover
$(".mover").mousedown(iniciarmovimiento);

// Al levantar el ratón sobre un td
$("td").mouseup(asignarCelda);

// Al hacer click en el botón de enviar
$(".js-submit").click(confirmarjugada);

// Esconder el espacio para mostrar mensajes mientras se confirma la jugada
$(".js-confirm").hide();



console.log("¡Script cargado!");