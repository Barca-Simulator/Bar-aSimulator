
function choose_character(){
	loadpage("./html/EscollirPersonatge.html");
}

function cargar_partida() {
	loadpage("./html/phasergame.html");
}
 
function phaser_game(){
	loadpage("./phasergame.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	close();
}



