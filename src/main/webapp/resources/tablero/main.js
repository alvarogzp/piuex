/*
 * Tablero.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */


var tablero_t = $("#tablero").text(),
	juego_d = $("#juego"),
	tabla = [ "<table class='tabla'>" ];

var filas = tablero_t.split("\n");

_( filas ).each(function( tr, i ) {
	
	tabla.push ( "<tr>" );
	
		_( tr.split("") ).each (function( td, j ) {
			tabla.push( "<td data-y='"+ i +"' data-x='"+ j +"' class='tabla-td " );
			if (td == ' '){
				
			}
			else{
				if(td.match("[A-Z]")){
					tabla.push("letra letra-" + td);
				}
				else{
					tabla.push("casilla casilla-" + td);
				}
			}
			
			tabla.push("'>");
			
			tabla.push(    ' '   );
			tabla.push( "</td>" );
		});
	
	tabla.push ( "</tr>" );
});

tabla.push( "</table>" );

juego_d.html( tabla.join("") );


