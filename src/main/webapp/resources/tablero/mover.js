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

// Estado de la parte inferior de la pantalla:
//  0: Botón activado, texto "Pasar turno"
//  1: Botón desactivado, error en la jugada
//  2: Botón activado, texto "Jugar"
var estadopantalla = 0;





/// FUNCIONES COMUNES ///

/*
 * Devuelve true si el td indicado contiene a una ficha, ya sea letra o comodín.
 * 
 * Se debe llamar siempre pasando un objeto de jQuery.
 */
function esficha($td) {
	return $td.hasClass("letra") || $td.hasClass("comodin");
}



/*
 * Devuelve true si el td indicado contiene a una ficha que no se puede mover.
 * 
 * Se debe llamar siempre pasando un objeto de jQuery.
 */
function esfichafija($td) {
	return esficha($td) && !$td.hasClass("mover");
}



/*
 * Devuelve true si el td indicado contiene a una ficha que se puede mover.
 * 
 * Se debe llamar siempre pasando un objeto de jQuery.
 */
function esfichamovil($td) {
	return esficha($td) && $td.hasClass("mover");
}





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
	} else if (esfichafija($this)) {
		// Se ha soltado el ratón sobre una celda ya ocupada y que no se puede mover
		// Detener sin hacer nada
		detenermovimiento(e);
		return;
	}
	
	var $ep = element.parent();
	
	if ($this.hasClass("mover")) {
		// Intercambiar una ficha con otra
		// Crear un span vacío para insertar las clases ahí de forma temporal
		var $tempspan = $(document.createElement("span"));
		
		// Añadir las clases de la celda de destino al span temporal, y borrar clases de la celda destino
		addClasses($this, $tempspan);
		removeClasses($this);
		
		// Añadir las clases de la celda de origen a la de destino, y borrar clases de la celda origen
		addClasses($ep, $this);
		removeClasses($ep);
		
		// Añadir las clases del span temporal (tiene las de la celda destino) a la celda origen
		addClasses($tempspan, $ep);
		removeClasses($tempspan);
		
	} else {
		// Mover una ficha de una celda a otra vacía
		addClasses($ep, $this);
		removeClasses($ep);
		
		// Limpiar celda origen
		$ep.off("mousedown");
		element.remove();
		
		// Añadir span por si en el futuro se mueve esta celda poder guardarlo en element
		$this.html("<span>&nbsp;</span>");
		$this.mousedown(iniciarmovimiento);
	}
	
	// Actualizar las letras del textarea
	ponertextarea($ep);
	ponertextarea($this);
	
	// Actualizar los botones
	actualizarestado();
	
	detenermovimiento(e);
}



/*
 * Añade las clases que tiene el elemento origen al elemento destino.
 * Las clases que se añaden son mover, letra, comodin y letra-[A-ZÑ].
 * También añade el data de la letra.
 */
function addClasses(origen, destino) {
	_(origen.attr("class").split(" ")).each(
		function(c, i) {
			if (c == "mover" || c == "letra" || c == "comodin" || c.match("letra-[A-ZÑ]")) {
				destino.addClass(c);
			}
		}
	);
	destino.data("letra", origen.data("letra"));
}



/*
 * Elimina las clases letra, letra-[A-ZÑ], comodin y mover del elemento.
 * También establece el data de la letra a un espacio (vacía).
 */
function removeClasses(elemento) {
	elemento.removeClass("letra");
	elemento.removeClass("letra-" + elemento.data("letra"));
	elemento.removeClass("comodin");
	elemento.removeClass("mover");
	elemento.data("letra", " ");
}



/*
 * Pone la letra en la posición indicada del textarea que representa el tablero.
 * Actualiza el textarea de las fichas del jugador si el td corresponde a una de ellas, o el del
 * tablero en caso contrario.
 * La letra la coje del data.
 */
function ponertextarea(td) {
	var x = td.data("x");
	var y = td.data("y");
	var f = td.data("f");
	var letra = td.data("letra");
	if (x != undefined) {
		actualizartablero(x, y, letra);
	} else if (f != undefined) {
		actualizarfichas(f, letra);
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
	$(document).mousemove(movimiento);
}



/*
 * Llamado desde el document cuando se mueve el ratón mientras se está desplazando una ficha.
 */
function movimiento(e) {
	actualizarFantasma(e.pageX, e.pageY);
}



/*
 * Actualiza la posición x e y de una ficha transparente que sigue el ratón
 */
function actualizarFantasma(x, y) {
	$fantasma.css("left", x + 1).css("top", y + 1);
}



/*
 * Detiene el movimiento de una ficha.
 * Es seguro llamar a esta función aunque el movimiento ya esté detenido.
 */
function detenermovimiento(e) {
	$(document).off("mousemove");
	element = null;
	$fantasma.hide();
	removeClasses($fantasma);
}





/// COMPROBACIONES ANTES DE ENVIAR ///

/*
 * Comprueba si las fichas puestas por el jugador en el tablero están en linea,
 * es decir en la misma fila o la misma columna y seguidas todas ellas o separadas por
 * otras fichas no puestas en esta jugada.
 * 
 * Si se cumple la condición anterior, devuelve una lista con dos elementos: el primero es true,
 * y el segundo es una lista de palabras insertadas o ampliadas con las letras puestas.
 * 
 * Si no se cumple la condición (hay algo mal puesto), devuelve una lista con 4 elementos:
 * el primero es false, el segundo es una lista de letras incorrectas que el usuario debe quitar,
 * el tercero es una lista de letras no alineadas con la fila o columna y que se ha usado para el alineamiento,
 * y el cuarto es una lista que contiene listas de letras válidas y que están seguidas,
 * pero con huecos con las otras listas de la lista y debe quedar sólo una de las listas
 * para poder completar la jugada.
 * 
 * Si el usuario no ha introducido todavía palabras, se devuelve como primer valor true y como segundo
 * una lista vacía.
 */
function puestasenlinea() {
	var $juegotd = $("#juego td");
	// Cambia a false si alguna condicion no se cumple
	var enlinea = true;
	// Contiene las palabras nuevas que se forman con las letras correctas puestas
	var palabras = [];
	// letras es una lista de listas de letras seguidas entre sí,
	// pero con huecos entre las demás
	// noalineadas es una lista de letras no alineadas con la coordenada usada para el alineamiento
	// malas contiene letras malas con seguridad
	var letras = [[]], noalineadas = [], malas = [];
	// Estas banderas se activan si se encuentra un hueco en la fila o columna en la que se ha puesto
	// una letra
	var huecox = false, huecoy = false;
	// Posiciones x e y de la primera casilla móvil vista
	// fijax es true si la X debe estar fija, false si la Y, y null si todavía no se sabe
	var x = null, y = null, fijax = null;
	$("#juego td").each(function (i, d) {
		var $d = $(d);
		if (!esficha($d)) {
			if (x != null) {
				var dx = $d.data("x"), dy = $d.data("y");
				if (x == dx) {
					huecox = true;
				}
				if (y == dy) {
					huecoy = true;
				}
			}
		} else {
			if ($d.hasClass("mover")) {
				if (!comprobarseguidas($d, $juegotd)) {
					// La ficha no está en línea con una ficha no fija y no es el centro del tablero
					enlinea = false;
					malas.push($d.data("letra"));
					return;
				}
				var dx = $d.data("x"), dy = $d.data("y");
				if (x == null) {
					// Inicializar los valores de X e Y si estaban por definir
					x = dx;
					y = dy;
				} else {
					if (fijax == null) {
						// Esta es la segunda casilla que se visita, se decide ahora qué coordenada estará fija:
						// si no ha cambiado la Y, la X es fija, y si no, la Y es fija
						fijax = y != dy;
					}
					if ((fijax && dx != x) || (!fijax && dy != y)) {
						// Ha cambiado la coordenada fija, las fichas no están alineadas
						enlinea = false;
						noalineadas.push($d.data("letra"));
						return;
					} else if ((fijax && huecox) || (!fijax && huecoy)) {
						// Ha habido un hueco entre las letras puestas
						enlinea = false;
						// Crear nueva lista para el hueco actual
						letras.push([]);
						letras[letras.length-1].push($d.data("letra"));
						// Desactivar el hueco para detectar más huecos
						huecox = false;
						huecoy = false;
						return;
					}
				}
				// Si se ha llegado hasta aquí es que la letra es buena
				letras[letras.length-1].push($d.data("letra"));
				// Obtener palabras de las que forma parte esta casilla y unirlas eliminando duplicados
				// a las palabras
				palabras = concatenarunicos(palabras, obtenerpalabras($d, $juegotd));
			}
		}
	});
	// TODO QUITAR ESTO ANTES DE ENVIARLO PARA PRODUCCION ;)
	// No es más que un checkeo que se debería cumplir siempre
	if (enlinea && (malas.length > 0 || noalineadas.length > 0 || letras.length > 1)) {
		alert("Hay algo mal en puestasenlinea, ¡avisa a Álvaro!");
	}
	return enlinea? [true, palabras]: [false, malas, noalineadas, letras];
}



/*
 * Es llamado cada vez que se cambia una ficha de sitio, y se encarga de actualizar los elementos
 * de la pantalla según el estado del tablero.
 * Únicamente actualiza los mensajes de la parte inferior de la pantalla, el tablero ya debe haber sido
 * actualizado antes de llamar a esta función.
 */
function actualizarestado() {
	// Comprobar cómo está el tablero
	var estado = puestasenlinea();
	
	if (estado[0] == false) {
		// Jugada incorrecta
		
		if (estadopantalla != 1) {
			// Desactivar envío
			$(".js-submit").addClass("btn-danger").removeClass("btn-success").removeClass("btn-info")
			.attr("value", "Jugada no válida");
			$(".js-checklabel").hide();
			estadopantalla = 1;
		}
		$(".js-invalid").hide();
		if (estado[1].length > 0) {
			$(".js-invalid1").show().text("Letras incorrectas: " + estado[1].join(", "));
		}
		if (estado[2].length > 0) {
			$(".js-invalid2").show().text("Letras no alineadas: " + estado[2].join(", "));
		}
		if (estado[3].length > 1) {
			$(".js-invalid3").show().text("Letras en grupos incompatibles: " + estado[3].join(" - "));
		}
		
	} else if (estado[0] == true) {
		// Jugada correcta
		
		if (estado[1].length == 0) {
			// No se han movido fichas (pasar turno)
			
			if (estadopantalla != 0) {
				$(".js-submit").addClass("btn-info").removeClass("btn-success").removeClass("btn-danger")
				.attr("value", "Pasar turno");
				$(".js-checklabel").hide();
				estadopantalla = 0;
			}
		} else {
			// Se han puesto fichas
			
			if (estadopantalla != 2) {
				$(".js-submit").addClass("btn-success").removeClass("btn-info").removeClass("btn-danger")
				.attr("value", "¡Jugar!");
				$(".js-checklabel").hide();
				estadopantalla = 2;
			}
			$(".js-correct").show().text("Palabras: " + estado[1].join(", "));
		}
	}
}



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
	
	// Obtener estado del tablero
	var estado = puestasenlinea();
	
	// Comprobar primero si se pasa el turno
	if (estado[0] == true && estado[1].length == 0) {
		detenerconfirmacion();
		return confirm("¿Estás seguro que quieres pasar el turno?");
	}
	
	actualizarporcentaje(25, "Calculando nuevas palabras...");
	
	// A continuación comprobar si la jugada es incorrecta
	if (estado[0] == false) {
		detenerconfirmacion();
		// Decidir qué mensaje mostrar dependiendo de si es el primer movimiento o no
		var primermovimiento = true;
		$("#juego td").each(function (i, d) {
			if (esfichafija($(d))) {
				primermovimiento = false;
				return false;
			}
		});
		var mensaje = "";
		if (primermovimiento) {
			mensaje = "Debes poner una palabra que pase por el centro.";
		} else {
			mensaje = "Todas las letras que pongas tienen que estar seguidas y unidas a otras que ya estuvieran puestas.";
		}
		alert("¡La jugada es incorrecta!\n" + mensaje);
		return false;
	}
	
	// En este punto la jugada es correcta
	var palabras = estado[1];
	
	actualizarporcentaje(50, "Comprobando palabra(s): " + palabras.join(", "));
	console.log(palabras);
	
	// Comprobar palabras válidas
	// Esto debe hacerse de forma asíncrona porque jquery llamará al callback de esa manera
	// La url del diccionario se obtiene del html (para poder indicarla de forma relativa con un c:url)
	$.get($("#diccionario").text(), function(e) {
		comprobarDiccionario(palabras, e);
	});
	
	// Devolver falso en espera de que se realice la comprobación del diccionario
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
				if (!esficha(jtd)) {
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
	// Lista de palabras obtenidas
	var palabras = [];
	// Coordenadas del td
	var x = td.data("x");
	var y = td.data("y");
	// Direcciones que recorrer
	var d = [{dx: 1, dy: 0}, {dx: 0, dy: 1}];
	for (var i = 0; i < d.length; i++) {
		var dx = d[i].dx;
		var dy = d[i].dy;
		// Primero ir hacia atrás hasta que empieze la palabra
		var xy = finletras(x, y, -dx, -dy, juegotd);
		// Buscar el final de la cadena
		var xyfin = finletras(x, y, dx, dy, juegotd);
		if (xy.x == xyfin.x && xy.y == xyfin.y) {
			// Si las coordenadas de inicio son iguales a las de fin, no hay palabra en esa dirección
			continue;
		} else {
			var palabra = getpalabra(xy.x, xy.y, xyfin.x + 1, xyfin.y + 1, juegotd);
			palabras.push(palabra);
		}
	}
	
	// Si es la casilla inicial y no se han detectado palabras, contar la única letra como una palabra
	// Este es el único caso en que se permite una palabra formada por una sola letra
	if (palabras.length == 0 && td.hasClass("inicial")) {
		palabras.push(getpalabra(x, y, x+1, y+1, juegotd));
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
			if (!esficha(jtd)) {
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
	// Se usa el textarea en lugar del tablero porque es más sencillo
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
		alert("Las siguientes palabras no son válidas:\n" + touppercase(palabras).join("\n"));
	} else {
		// Palabras vacías!
		completarconfirmacion();
		// Simular una pulsación del botón de jugar
		$(".js-submit").click();
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
 * Convierte a mayúsculas todas las palabras de un vector.
 */
function touppercase(vector) {
	var nuevo = [];
	_(vector).each(function (e) {
		nuevo.push(e.toUpperCase());
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
	$(".js-input").hide();
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
	$(".js-input").show();
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
