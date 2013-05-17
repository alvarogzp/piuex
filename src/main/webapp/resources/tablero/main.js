/*
 * Tablero.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */


var modificadores = [
"3  2   3   2  3",
" 2   1   1   2 ",
"  2   0 0   2  ",
"0  2   0   2  0",
"    2     2    ",
" 1   1   1   1 ",
"  0   0 0   0  ",
"3  0   #   0  3",
"  0   0 0   0  ",
" 1   1   1   1 ",
"    2     2    ",
"0  2   0   2  0",
"  2   0 0   2  ",
" 2   1   1   2 ",
"3  2   3   2  3" ];


var tablero_t = $("#tablero").text(),
	juego_d = $("#juego"),
	tabla = [ "<table class='tabla'>" ];

var filas = tablero_t.split(".");

_( filas ).each(function( tr, i ) {
	
	tabla.push ( "<tr>" );
	
		_( tr.split("") ).each (function( td, j ) {
			tabla.push( "<td data-y='"+ i +"' data-x='"+ j +"' class='tabla-td " );
			
			console.log(i + ", " + j);
			if (modificadores[i][j] != " ") {
				if (modificadores[i][j].match("[0-3]")) {
					tabla.push("modificador ");
					switch (modificadores[i][j]) {
					case "0":
						tabla.push("modificador-dl ");
						break;
					case "1":
						tabla.push("modificador-tl ");
						break;
					case "2":
						tabla.push("modificador-dp ");
						break;
					case "3":
						tabla.push("modificador-tp ");
						break;
					}
				} else if (modificadores[i][j] == "#") {
					tabla.push("inicial ");
				}
			}
			
			if(td.match("[A-Z]")) {
				tabla.push("letra letra-" + td);
			} else if (td == "*") {
				tabla.push("comodin");
			}
			
			tabla.push("'>");
			
			tabla.push(    ' '   );
			tabla.push( "</td>" );
		});
	
	tabla.push ( "</tr>" );
});

tabla.push( "</table>" );

juego_d.html( tabla.join("") );



