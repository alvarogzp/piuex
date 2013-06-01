/*
 * Construye el tablero y las fichas del usuario dinámicamente en la página web.
 * 
 * Autores: Alvaro Gutierrez Perez y Carlos Rufo Jimenez.
 */





// Celdas especiales del tablero
var modificadores = [
	"3  0   3   0  3",
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
	"3  0   3   0  3"
];



// Mapping de puntos y fichas que tienen esos puntos
var puntos_fichas = {
		 0: "*",
		 1: "AEOISNLRUT",
		 2: "DG",
		 3: "CBMP",
		 4: "HFVY",
		 5: "QJ",
		 8: "ÑX",
		10: "Z"
};

// Mapping inverso al anterior de puntos que tiene cada ficha (se crea a partir del otro)
var fichas_puntos = (function() {
	var p = {};
	for (var punto in puntos_fichas) {
		var fichas = puntos_fichas[punto];
		_(fichas.split("")).each(function(ficha) {
			p[ficha] = punto;
		});
	}
	return p;
})();





// Construir tablero a partir del textarea con las letras
(function() {
	var tabla = [ "<table class='tabla'>" ];
	
	var tablero = $("#tablero").text();
	var filas = tablero.split(".");

	_( filas ).each(function( tr, i ) {
		
		tabla.push ( "<tr>" );
		
		var celdas = tr.split("");
		
		_( celdas ).each (function( td, j ) {
			var puntosletra = fichas_puntos[td] || "0";
			td = td.toUpperCase();
			tabla.push( "<td data-y='"+ i +"' data-x='"+ j +"' data-letra='" + td + "' data-puntos='" + puntosletra + "' class='tabla-td " );
			
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
			
			if (td.match("[A-ZÑ]")) {
				tabla.push("letra letra-" + td);
			} else if (td == "*") {
				tabla.push("comodin");
			}
			
			tabla.push( "'> </td>" );
		});
		
		tabla.push ( "</tr>" );
		
	});

	tabla.push( "</table>" );

	$("#juego").html( tabla.join("") );
})();





// Crear tabla con las fichas del jugador a partir de su textarea
(function() {
	var fichas = $("#fichas");
	if (fichas.length) {
		
		// En la partida juega el usuario
		fichas = fichas.text();
		
		// Es el turno del jugador?
		var mover = $(".js-submit").length? "mover ": "";
		
		var tabla = ["<table class='tabla'><tr>"];

		_(fichas.split("")).each(function( td, i ) {
			tabla.push("<td data-f='" + i + "' data-letra='" + td + "' data-puntos='" + fichas_puntos[td] + "' class='tabla-td ");
			
			if (td != " ") {
				tabla.push(mover);
			}
			
			if (td.match("[A-ZÑ]")) {
				tabla.push("letra letra-" + td);
			} else if (td == "*") {
				tabla.push("comodin");
			}
			
			tabla.push("'><span>&nbsp;</span></td>");
			
		});

		tabla.push("</tr></table>");

		$("#letras").html(tabla.join(""));
		
	} else {
		// El usuario no juega
		$("#letras").html('<span class="label label-important">¡No juegas en esta partida!</span>');
	}
})();
