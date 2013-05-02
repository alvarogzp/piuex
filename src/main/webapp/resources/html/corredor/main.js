/*
 * Script para mover elementos en una pagina web.
 * 
 * Para usar este script carguelo AL FINAL del "body" de su pagina web,
 * y asigne la clase "mover" a los elementos que desea que se puedan mover.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */



var x=0;
var y=0;
var v=0;

var f= function(e){
	
	switch (e.keyCode) {
	case 37:{ //Izquierda
		if(x>=500){
			square.style.background="#0F0";
		}
		else{
			x += 10;
			square.style.left = x;
		}
		break;
	}
	case 38:{ //Arriba
		
		break;
	}
	case 39:{ //Derecha
		
		break;
	}
	case 40:{ //Abajo
	
		break;
	}

	default:
		break;
	}
	
	
};

document.body.onkeydown=f;


















//var x = 0, y = 0, element = null;
//
//
//function mover(elemento) {
//	elemento.onmousedown = iniciarmovimiento;
//	elemento.onmouseup = detenermovimiento;
//	console.log("Cargado movimiento para " + elemento.id);
//}
//
//
//function iniciarmovimiento(e) {
//	console.log("Moviendo " + e.target.id);
//	x = e.pageX;
//	y = e.pageY;
//	element = e.target;
//	document.onmousemove = movimiento;
//}
//
//
//function movimiento(e) {
//	// console.log("Moviendo...");
//	moverelemento(element, "left", e.pageX - x);
//	moverelemento(element, "top", e.pageY - y);
//	x = e.pageX;
//	y = e.pageY;
//}
//
//
//function moverelemento(element, position, diff) {
//	element.style[position] = parseInt(element.style[position] || element.getBoundingClientRect()[position]) + diff;
//}
//
//
//function detenermovimiento(e) {
//	document.onmousemove = null;
//	element = null;
//	console.log("Fin del movimiento de " + e.target.id);
//}
//
//
//
//var elements = document.getElementsByClassName("mover");
//for (var i = 0; i < elements.length; i++) {
//	mover(elements[i]);
//}


console.log("Script cargado!");