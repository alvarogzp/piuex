

var x = 0, y = 0;
var moving = false;


function iniciarmovimiento(e) {
	console.log("Moviendo elemento...");
	x = e.pageX;
	y = e.pageY;
	moving = true;
}


function mover(e) {
	if (moving) {
		// console.log("Moviendo...");
		moversquare("left", e.pageX - x);
		moversquare("top", e.pageY - y);
		x = e.pageX;
		y = e.pageY;
	}
}


function moversquare(position, diff) {
	square.style[position] = parseInt(square.style[position]) + diff;
}


function detenermovimiento(e) {
	moving = false;
	console.log("Fin del movimiento!");
	x = e.pageX;
	x = e.pageY;
}



square.style.left = 0;
square.style.top = 0;

square.onmousedown = iniciarmovimiento;
square.onmouseup = detenermovimiento;
document.onmousemove = mover;

console.log("Script cargado!");