/*
 * Tablero.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */


var tablero_t = $("#tablero").text(),
	juego_d = $("#juego"),
	tabla = [ "<table>" ];

var filas = tablero_t.split("\n");

_( filas ).each(function( tr, i ) {
	
	tabla.push ( "<tr>" );
	
		_( tr.split("") ).each (function( td, j ) {
			tabla.push(  "<td>" );
			tabla.push(    td   );
			tabla.push( "</td>" );
		});
	
	tabla.push ( "</tr>" );
});

tabla.push( "</table>" );

juego_d.html( tabla.join("") );



