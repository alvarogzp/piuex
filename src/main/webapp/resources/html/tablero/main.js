/*
 * Tablero.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */


var tablero_t = $("#tablero").text(),
	juego_d = $("#juego"),
	tabla = [ "<table border='1'>" ];

var filas = tablero_t.split("\n");

_( filas ).each(function( tr, i ) {
	
	tabla.push ( "<tr border='1'>" );
	
		_( tr.split("") ).each (function( td, j ) {
			tabla.push(  "<td border='1'><span class='mover'>" );
			tabla.push(    td   );
			tabla.push( "</span></td>" );
		});
	
	tabla.push ( "</tr>" );
});

tabla.push( "</table>" );

juego_d.html( tabla.join("") );



