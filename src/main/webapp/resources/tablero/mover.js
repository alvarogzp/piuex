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

// Contiene información sobre el diccionario
var diccionario = {
		// Estado en el que se encuentra:
		// 0 si todavía no se ha obtenido
		// 1 si se está realizando la petición (obteniendo el diccionario)
		// 2 si se ha obtenido y se está procesando (separando en palabras)
		// 3 si se ha obtenido y almacenado correctamente
		// 4 si hubo un error en la obtención del diccionario
		// 5 si no hay diccionario que obtener (no es el turno)
		estado: 0,
		// Lista de palabras del diccionario, puede ser un array muy largo
		palabras: [],
		// Estado de una comprobación de palabras en el diccionario:
		// 0 es si no se está realizando ninguna comprobación
		// 1 es si se está preparando una comprobación
		// 2 es si se está esperando al diccionario para realizar una comprobación
		// 3 es si se está realizando una comprobación
		comprobando: 0,
		// Lista de palabras que comprobar, en el caso de que se esté realizando una comprobación
		comprobar: []
};





/// FUNCIONES COMUNES ///

/*
 * Devuelve true si el td indicado contiene a una ficha, ya sea letra o comodín.
 * 
 * Se debe llamar siempre pasando un objeto de jQuery.
 */
function esficha($td) {
//	return $td.hasClass("letra") || $td.hasClass("comodin");
	return $td.data("letra") != " ";
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
	
	// Gestionar el cambio de posición del comodín
	if (!comodinporletra($ep, $this)) {
		return;
	}
	
	if ($this.hasClass("mover")) {
		// Intercambiar una ficha con otra
		
		// Por si la ficha destino es comodín
		if (!comodinporletra($this, $ep)) {
			return;
		}
		
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
 * Comprueba si la casilla de origen es un comodín y si se está moviendo al tablero,
 * y en ese caso pide una letra para sustituirlo al usuario, y lo sustituye por la letra,
 * dejando sólo como rastro del comodín la propiedad data "comodin".
 * Si el comodín se mueve de regreso a las fichas del usuario, lo desenmascara convirtiéndolo
 * de nuevo en comodín.
 * 
 * $old es el td de origen, $new el de destino.
 * 
 * Devuelve false si el usuario no se ha dignado a indicar una letra por la que sustituir el
 * comodín, y se debe cancelar la asignación de la celda.
 */
function comodinporletra($old, $new) {
	var oldletra = $old.data("comodin");
	if (oldletra != undefined) {
		// Se va a mover un comodín
		if ($new.data("x") != undefined) {
			// El comodín se mueve a una casilla del tablero
			var letra = pedirletra(oldletra);
			if (letra == null) {
				return false;
			}
			$old.data("comodin", letra)
			.removeClass("comodin")
			.removeClass("letra-" + oldletra)
			.addClass("letra")
			.addClass("letra-" + letra)
			.data("letra", letra);
		} else if ($new.data("f") != undefined && $old.data("x") != undefined) {
			// El comodín se mueve a las fichas del jugador desde el tablero
			// Deshacer transformación a letra y convertir de nuevo en comodín
			// El data se queda como "caché" por si se vuelve a mover al tablero,
			// tener un valor que presentarle al usuario.
			$old.removeClass("letra")
			.removeClass("letra-" + oldletra)
			.addClass("comodin")
			.data("letra", "*");
		}
	}
	return true;
}



/*
 * Pide una letra al usuario para sustituir un comodín por ella.
 * 
 * El parámetro, si se indica, es la letra que estaba sustituyendo al comodín,
 * y se mostrará como valor por defecto al usuario.
 * 
 * Devuelve la letra introducida en mayúsculas, o null si se ha cancelado.
 */
function pedirletra(l) {
	while (true) {
		// Preguntar por la letra a la que sustituirá
		var letra = prompt("¿Por qué letra quieres sustituir el comodín?", l?l:"");
		if (letra == null) {
			// Se ha cancelado
			return null;
		} else {
			letra = letra.toUpperCase();
			if (letra.length != 1 || puntos[letra] == undefined || letra == "*") {
				alert("¡Letra no válida!\nDebes indicar una única letra de las que forman parte del juego (todas menos la K y la W).");
				// Volver a pedir
				continue;
			} else {
				// Letra correcta
				return letra;
			}
		}
	}
}



/*
 * Añade las clases que tiene el elemento origen al elemento destino.
 * Las clases que se añaden son mover, letra, comodin y letra-[A-ZÑ].
 * También añade el data de la letra y la puntuación.
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
	destino.data("puntos", origen.data("puntos"));
	destino.data("comodin", origen.data("comodin"));
	if (origen.data("comodin") == undefined) {
		destino.removeData("comodin");
	}
}



/*
 * Elimina las clases letra, letra-[A-ZÑ], comodin y mover del elemento.
 * También establece el data de la letra a un espacio (vacía) y la puntuación a 0.
 */
function removeClasses(elemento) {
	elemento.removeClass("letra");
	elemento.removeClass("letra-" + elemento.data("letra"));
	elemento.removeClass("comodin");
	elemento.removeClass("mover");
	elemento.data("letra", " ");
	elemento.data("puntos", "0");
	elemento.removeData("comodin");
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
		actualizartablero(x, y, td.data("comodin") != undefined? letra.toLowerCase() : letra);
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





/// COMPROBACIONES DE JUGADA CORRECTA ///

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
 * La última comprobación (comprobar que las palabras estén en un diccionario) se realiza de forma asíncrona
 * para mostrar mensajes por la pantalla mientras tanto, y no bloquear el navegador.
 * Por tanto, si se llega a ese punto, la función devolverá false aunque no se haya acabado de procesar,
 * y tras terminar la comprobación se decidirá si se envía el formulario o no.
 * 
 * Esto se consigue mediante una bandera con 3 estados: 0 si no se está realizando ninguna comprobación,
 * 1 si se está confirmando la jugada y 2 si la jugada ha sido confirmada con éxito.
 * Al realizarse la comprobación asíncrona satisfactoriamente y establecerse la bandera al valor 2,
 * se volverá a pulsar (de forma simulada) de nuevo el botón de enviar, y se llamará a este método, que
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
	
//	console.log(palabras);
	
	// Comprobar palabras válidas
	comprobarDiccionario(palabras);
	
	// Devolver falso ya que la comprobación del diccionario es asíncrona
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
			// La letra puede estar en minúsculas si es un comodín
			palabra.push(letra.toUpperCase());
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





/// GESTIÓN DEL DICCIONARIO ///

/*
 * Programa la descarga del diccionario tras un tiempo, para que no se bloquee la página
 * nada más cargarla con la carga del diccionario.
 */
function programarDescargaDiccionario() {
	setTimeout(descargarDiccionario, 1000);
}



/*
 * Descarga el diccionario asíncronamente llamando a $.get,
 * y lo procesa una vez descargado.
 */
function descargarDiccionario() {
	if (diccionario.estado != 0) {
		// Ya se ha obtenido o se está obteniendo el diccionario
		return;
	}
	// La url del diccionario se obtiene del html (para poder indicarla de forma relativa con un c:url)
	var url = $("#diccionario").text();
	// Sólo se obtiene el diccionario si había una url
	if (url) {
		diccionario.estado = 1;
		$(".js-diccionario").text("Descargando diccionario...").slideDown('slow', function() {
			$.get(url, procesarDiccionario)
			.fail(errorDiccionario);
		});
	} else {
		// No hay diccionario
		diccionario.estado = 5;
		finDiccionario();
	}
}



/*
 * Procesa el diccionario, recibido como una cadena de caracteres larguísima
 * con palabras separadas por espacios o saltos de línea indistintamente,
 * lo convierte a un vector de palabras larguísimo, y lo guarda en una variable global.
 */
function procesarDiccionario(dic) {
	diccionario.estado = 2;
	$(".js-diccionario").text("Procesando diccionario...");
	setTimeout(function() {
		// Dividir las palabras usando \s que separa tanto espacios como saltos de línea
		diccionario.palabras = dic.split(/\s/);
		diccionario.estado = 3;
		finDiccionario();
	}, 100);
}



/*
 * Ejecutado si falla la obtención del diccionario de la red.
 * Simplemente actualiza el estado y muestra un pequeño mensaje de error al usuario.
 */
function errorDiccionario(xhr, status, error) {
	diccionario.estado = 4;
	finDiccionario(error);
}



/*
 * Ejecutado al terminar de realizar las labores iniciales sobre el diccionario,
 * muestra un mensaje y lo oculta con una animación.
 */
function finDiccionario(estado) {
	// Sólo muestra mensajes si está el span
	if ($(".js-diccionario").length > 0) {
		$(".js-diccionario").addClass(
			diccionario.estado == 5? "label-warning":
			diccionario.estado == 4? "label-important":
			diccionario.estado == 3? "label-success": ""
		).text(
			diccionario.estado == 5? "Diccionario no definido":
			diccionario.estado == 4? "Error al obtener el diccionario: " + estado:
			diccionario.estado == 3? "¡Diccionario almacenado!": ""
		).slideDown('slow', function() {
			// Ocultar tras unos segundos cuando acabe la animación
			// Si el elemento ya estaba mostrado, se ejecuta inmediatamente
			setTimeout(function() {
				$(".js-diccionario").slideUp('slow', function() {
					if (diccionario.estado == 4 || diccionario.estado == 5) {
						// Error en el diccionario, mostrar span de error
						$(".js-diccionario-error").slideDown('slow');
					}
				});
			}, diccionario.estado == 3? 1000: 2000);
		});
	}
	// Ver si hay una comprobación en espera
	if (diccionario.comprobando == 2) {
		iniciarComprobarPalabrasDiccionario();
	}
}



/*
 * Comprueba que todas las palabras en "palabras" estén en el diccionario, y si es así confirma la jugada
 * y simula una pulsación del botón de jugar para enviar el formulario.
 * Si hay palabras que no están, muestra un mensaje con las palabras que no están y detiene la confirmación.
 * 
 * El diccionario actualmente usado es un fichero de 15MB, por lo que su recorrido se puede demorar varios
 * segundos, incluso parecer que el navegador no responde.
 * Se ha usado el algoritmo más eficiente encontrado según pruebas empíricas.
 * 
 * Las palabras del diccionario están en minúsculas y sólo contienen caracteres de la a la z y la eñe, sin
 * tildes ni diéresis.
 * 
 * Todo lo anteriormente mencionado es una descripción general de lo que llamar a esta función causa,
 * sin embargo, esta función únicamente prepara la comprobación y la inicia o encola dependiendo de si se
 * ha obtenido ya el diccionario o todavía no.
 * El resto de acciones son realizadas por las siguientes funciones.
 */
function comprobarDiccionario(palabras) {
	if (diccionario.comprobando != 0) {
		// Ya se está realizando una comprobación, no hacer nada
		return;
	}
	
	// Preparar comprobación
	diccionario.comprobando = 1;
	diccionario.comprobar = palabras;
	
	// Comprobar estado del diccionario
	switch (diccionario.estado) {
	case 0:
	case 1:
	case 2:
		// Esperar a la obtención del diccionario
		diccionario.comprobando = 2;
		actualizarporcentaje(0, "Esperando al diccionario...");
		if (diccionario.estado == 0) {
			// El diccionario todavía no se ha empezado a descargar, descargar ahora
			descargarDiccionario();
		}
		return;
	case 3:
	case 4:
	case 5:
		// Iniciar la comprobación
		iniciarComprobarPalabrasDiccionario();
		break;
	}
}



/*
 * Inicia la comprobación de las palabras del diccionario de forma asíncrona.
 */
function iniciarComprobarPalabrasDiccionario() {
	if (diccionario.estado == 4 || diccionario.estado == 5) {
		// Se juega sin diccionario, no se realizarán comprobaciones de palabras
		// Vaciar palabras para simular que son correctas
		diccionario.comprobar = [];
		finComprobarPalabrasDiccionario();
	} else if (diccionario.estado == 3) {
		diccionario.comprobando = 3;
		actualizarporcentaje(0, "Comprobando palabra(s): " + diccionario.comprobar.join(", "));
		setTimeout(comprobarPalabrasDiccionario, 100);
	}
}



/*
 * Realiza una comprobación de palabras el diccionario.
 */
function comprobarPalabrasDiccionario() {
	diccionario.comprobar = _.difference(tolowercase(diccionario.comprobar), diccionario.palabras);
	finComprobarPalabrasDiccionario();
}



/*
 * Finaliza la comprobación de las palabras del diccionario.
 */
function finComprobarPalabrasDiccionario() {
	var palabras = diccionario.comprobar;
	diccionario.comprobando = 0;
	diccionario.comprobar = [];
	if (palabras.length == 0) {
		// Comprobación correcta!
		completarconfirmacion();
		setTimeout(function() {
			// Simular una pulsación del botón de jugar para enviar el formulario
			$(".js-submit").click();
		}, 1000);
	} else {
		// Hay palabras no válidas
		detenerconfirmacion();
		alert("Las siguientes palabras no son válidas:\n" + touppercase(palabras).join("\n"));
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





/// MENSAJES EN EL TABLERO ///

/*
 * Inicia una confirmación de la jugada en curso, oculta el botón de jugar,
 * muestra la barra de progreso y establece la bandera a 1.
 */
function iniciarconfirmacion() {
	confirmandoJugada = 1;
	$(".js-input").hide();
	$(".js-confirm").show();
	actualizarporcentaje(0, "Comprobando jugada...");
}



/*
 * Completa la confirmación estableciendo la bandera a 2
 * y poniendo el porcentaje al 100%.
 */
function completarconfirmacion() {
	confirmandoJugada = 2;
	$mensaje.addClass("label-success");
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





/// ASIGNACIÓN DE EVENTOS Y ACCIONES INICIALES ///

// Crear data "comodin" para todos los comodines
$(".comodin").data("comodin", "");

// Al presionar con el ratón sobre un elemento de la clase mover
$(".mover").mousedown(iniciarmovimiento);

// Al levantar el ratón sobre un td
$("td").mouseup(asignarCelda);

// Al hacer click en el botón de enviar
$(".js-submit").click(confirmarjugada);

// Esconder el espacio para mostrar mensajes mientras se confirma la jugada
$(".js-confirm").hide();

// Empezar a descargar el diccionario cuando la página se cargue
$(programarDescargaDiccionario);



console.log("¡Script cargado!");
