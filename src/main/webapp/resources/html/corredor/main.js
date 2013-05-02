/*
 * Corredor.
 * 
 * Instrucciones:
 * - Cuando pulsas una de las flechas del teclado, el corredor comenzara a
 *   correr en la direccion correspondiente, acelerando su velocidad mientras
 *   mantengas la flecha pulsada.
 * - Al dejar de pulsar la flecha, la velocidad del corredor ira disminuyendo
 *   hasta detenerse.
 * - Puedes hacer que el corredor se detenga mas rapido si mantienes pulsada la
 *   tecla espacio.
 * - Pulsa la tecla intro para situar al corredor en el punto inicial (por si
 *   se te pierde por el ciberespacio).
 * - El fondo del corredor sera de color verde si el corredor corre a una
 *   velocidad razonable, y cambiara a rojo cuando el corredor vaya a una
 *   velocidad excesiva. Es recomendable detener al corredor cuando se ponga
 *   de color rojo, por su salud.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */



// CONFIGURACION

// Ratio de acceleracion al pulsar una flecha (aplicado cada UPDATE_INTERVAL milisegundos)
var ACCELERATE_RATIO = 2.3;

// Ratio de deceleracion (aplicado cada UPDATE_INTERVAL milisegundos tambien)
var DECELERATE_RATIO = 1.2;

// Multiplicador del ratio de deceleracion al tener pulsada la tecla espacio
var SPACE_MULTIPLIER = 2.5;

// Intervalo de actualizacion de la posicion y velocidad en milisegundos
var UPDATE_INTERVAL = 50;

// Velocidad a partir de la cual se considera que el corredor va demasiado rapido
var SPEED_HIGH = 50;

// Color que mostrar cuando el corredor esta parado
var COLOR_STOP = "#999";

// Color que mostrar cuando el corredor se mueve a una velocidad razonable
var COLOR_NORMAL = "#0f0";

// Color que mostrar cuando el corredor va a una velocidad excesiva
var COLOR_HIGH = "red";



// Constantes correspondientes a las distintas teclas
var KEY_ENTER	= 13;
var KEY_SPACE	= 32;
var KEY_LEFT	= 37;
var KEY_UP		= 38;
var KEY_RIGHT	= 39;
var KEY_DOWN	= 40;



// Posicion actual del corredor
var p = {
		x: 0,
		y: 0
};

// Velocidad actual del corredor
var v = {
		x: 0,
		y: 0
};

// Teclas actualmente pulsadas, true si esta pulsada, false si no (se rellena segun se van pulsando)
var keys = {};



//Pone el corredor en la esquina superior izquierda eliminando su velocidad
function reset() {
	v.x = 0;
	v.y = 0;
	p.x = 0;
	p.y = 0;
}


// Funcion llamada al producirse un evento de tecla, activa o desactiva la tecla correspondiente
function keyevent(e) {
	// e.type puede ser keydown o keyup
	keys[e.keyCode] = (e.type == "keydown"? true: false);
}


// Procesa las teclas, si esta activa acelerando la correspondiente velocidad
function proccesskeys() {
	// Recorrer las teclas de keys
	for (var key in keys) {
		// Seguir solo si la tecla esta activa
		if (keys[key]) {
			// Convertir la tecla a numero
			var k = Number(key);
			switch (k) {
			case KEY_RIGHT:
				v.x += ACCELERATE_RATIO;
				break;
				
			case KEY_LEFT:
				v.x -= ACCELERATE_RATIO;
				break;
				
			case KEY_DOWN:
				v.y += ACCELERATE_RATIO;
				break;
				
			case KEY_UP:
				v.y -= ACCELERATE_RATIO;
				break;
				
			case KEY_ENTER:
				reset();
				break;
			}
		}
	}
}


// Decelera la velocidad del corredor
function decelerate() {
	// Recorrer las variables de v (x e y), guarda el nombre de la variable actual en c
	for (var c in v) {
		// Obtener el valor actual de v[c] y guardarlo en l
		var l = v[c];
		// Si la velocidad actual no es cero...
		if (l != 0) {
			// Restar DECELERATE_RATIO a la velocidad actual si el valor actual es menor
			// que cero, y sumarselo si es mayor.
			// Multiplicar el ratio de deceleracion por SPACE_MULTIPLIER si esta pulsado espacio
			v[c] += DECELERATE_RATIO * (keys[KEY_SPACE]? SPACE_MULTIPLIER: 1) * (l > 0? -1: l < 0? 1: 0);
			// Si el signo de v[c] ha cambiado tras la operacion anterior, poner la velocidad a 0
			if ((l < 0 && v[c] > 0) || (l > 0 && v[c] < 0)) {
				v[c] = 0;
			}
		}
	}
}


// Comprueba la velocidad del corredor y si va demasiado rapido lo pone rojo
function checkspeed() {
	if (v.x == 0 && v.y == 0) {
		square.style.background = COLOR_STOP;
	} else if (Math.abs(v.x) >= SPEED_HIGH || Math.abs(v.y) >= SPEED_HIGH) {
		square.style.background = COLOR_HIGH;
	} else {
		square.style.background = COLOR_NORMAL;
	}
}


// Actualiza la posicion del corredor
function updateposition() {
	p.x += v.x;
	p.y += v.y;
	square.style.left = p.x;
	square.style.top = p.y;
}


// Actualizar la velocidad y posicion del corredor
function update() {
	proccesskeys();
	decelerate();
	checkspeed();
	updateposition();
}



// Al producirse un evento onkeydown o onkeyup se llamara a la misma funcion
document.body.onkeydown = keyevent;
document.body.onkeyup = keyevent;

// Actualizar el corredor periodicamente
setInterval(update, UPDATE_INTERVAL);
