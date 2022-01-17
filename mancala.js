class Mancala{
	constructor(id, containers, mode, diff, startplayer){
		const parent = document.getElementById(id);
		let board = document.createElement('div');
		board.id = "mancalaBoard";
		board.style.height = "300px";

		this.content = new Array(containers*2);
		this.containers = containers;
		this.p1Cont = 0;
		this.p2Cont = 0;
		this.current = startplayer;
		this.gamemode = mode;
		this.difficulty = diff;
		this.lastHole = 0;
		this.seedArray;

		console.log(this.containers);

		switch(parseInt(containers)){
			case 2: case "2":
				board.setAttribute('class', 'board4');
			break;
			case 3: case "3":
				board.setAttribute('class', 'board5');
			break;
			case 6: case "6":
				board.setAttribute('class', 'board8');
			break;
			case 9: case "9":
				board.setAttribute('class', 'board11');
			break;
			default:
			board.setAttribute('class', 'board11');
		}

		const oldBoard = document.getElementById("mancalaBoard");
		parent.replaceChild(board, oldBoard);

		sleep(1500).then(() => {
					if(this.gamemode === "s" && this.current === 'p2'){
						switch (this.difficulty) {
						case "2":
							console.log("A jogar aleatóriamente por escolha");
							playRandom();
						break;
						default:
							console.log("A jogar aleatóriamente porque não foi encontrada dificuldade");
							playRandom();
						break;
						}
					}
				});
	}

	criarTabuleiro(){
		const tabuleiro = document.getElementById("mancalaBoard");

		let player2Cont = document.createElement('div');
		player2Cont.setAttribute('class', 'playercontainer2');
		player2Cont.id = 'player2Container';
		player2Cont.style.height = "200px";
		let imgP2 = document.createElement('img');
		imgP2.src = 'bowl.png';
		imgP2.setAttribute("class", "hole");
		imgP2.style.height = '200px';
		imgP2.style.zIndex = '1';
		imgP2.id = 'player2Cont';
		player2Cont.appendChild(imgP2);
		tabuleiro.appendChild(player2Cont);

		for (let i = 0; i < this.containers; i++) {
			let hole = document.createElement('div');
			hole.setAttribute('class', 'pottop');
			hole.style.gridColumnStart = (2 + i%this.containers).toString();
			hole.id = 'cell' + i;
			let img = document.createElement('img');
			img.src = 'bowl.png';
			img.setAttribute("class", "hole");
			img.style.zIndex = '1';
			img.id = 'imgCont' + Math.abs(i).toString();
			hole.appendChild(img);
			console.log("added hole " + i.toString());
			hole.appendChild(img);
			tabuleiro.appendChild(hole);
		}

		for (let i = this.containers; i < 2*(this.containers); i++) {
			let hole = document.createElement('div');
			hole.setAttribute('class', 'potbot');
			hole.style.gridColumnStart = (2 + i%this.containers).toString();
			hole.id = 'cell' + i;
			let img = document.createElement('img');
			img.src = 'bowl.png';
			img.setAttribute("class", "hole");
			img.style.zIndex = '1';
			img.id = 'imgCont' + Math.abs(i).toString();
			hole.appendChild(img);
			console.log("added hole " + i.toString());
			hole.appendChild(img);
			tabuleiro.appendChild(hole);
		}

		let playerCont = document.createElement('div');
		playerCont.setAttribute('class', 'playercontainer1');
		playerCont.id = 'playerContainer';
		playerCont.style.width = "100px";
		playerCont.style.height = "200px";
		playerCont.style.gridColumnStart = (parseInt(2 + parseInt(this.containers))).toString();
		let imgP = document.createElement('img');
		imgP.src = 'bowl.png';
		imgP.setAttribute("class", "hole");
		imgP.style.height = '200px';
		imgP.style.zIndex = '1';
		imgP.id = 'playerCont';
		playerCont.appendChild(imgP);
		tabuleiro.appendChild(playerCont);

		let filler = document.createElement('div');
		filler.setAttribute('class', 'statepot');
		filler.id = 'stateP2';
		filler.innerText = '0';
		filler.style.top = "2px";
		filler.style.height = "25px";
		tabuleiro.appendChild(filler);

		for (let i = this.containers; i < 2*(this.containers); i++) {
			let cellTD = document.createElement('div');
			cellTD.setAttribute('class', 'statepot');
			cellTD.style.gridColumnStart = (2 + i%this.containers).toString();
			cellTD.setAttribute('id', 'cellTD'+i.toString());
			cellTD.style.height = '25px';
			let cellBtn = document.createElement('button');
			cellBtn.setAttribute("type", "button");
			cellBtn.setAttribute("class", "playBtn");
			cellBtn.innerText = 'Play';
			cellBtn.setAttribute("onclick", "play("+i.toString()+")");
			cellTD.appendChild(cellBtn);
			tabuleiro.appendChild(cellTD);
		}

		let filler2 = document.createElement('div');
		filler2.setAttribute('class', 'statepot');
		filler2.style.gridColumnStart = (parseInt(2 + parseInt(this.containers))).toString();
		filler2.style.width = "100px";
		filler2.id = 'stateP1';
		filler2.innerText = '0';
		filler2.style.top = "2px";
		filler2.style.height = "25px";
		tabuleiro.appendChild(filler2);
	}

	inserirSeeds(seedcount){
		this.seedTotal = seedcount;
		this.seedArray = new Array(this.containers * seedcount);
		for (let i = 0; i < this.containers*2; i++) {
			this.content[i] = seedcount;
			const td = document.getElementById('cell'+i.toString());
			for (let j = 0; j < seedcount; j++) {
				let k = parseInt(i*seedcount + j);
				this.seedArray[k] = document.createElement('div');
				this.seedArray[k].setAttribute('id', 'seed'+(i*seedcount+j).toString());
				this.seedArray[k].setAttribute('class', 'seed');
				this.seedArray[k].style.top = (85-Math.floor(Math.random()*80)).toString() + 'px';
				this.seedArray[k].style.left = (85-Math.floor(Math.random()*80)).toString() + 'px';
				console.log("created seed " + this.seedArray[k].id);
				td.appendChild(this.seedArray[k]);
			}
		}
	}
}


//objetos
var table; //onde o jogo "está"
var gNickname; //guarda o nome do utilizador
var gPassword; //guarda a password
var gameHash; //guarda o hash do jogo atual
var wins; //guarda o número de vitórias do utilizador
var plays; //guarda o número de jogos do utilizador
var group = 98; //número do grupo
var eventSource; //fonte do evento
var seedPos; //posição no array de sementes (para traduzir da internet)

//flags
var fimJogo; //guarda se o jogo atual já acabou
var logged; //guarda se o utilizador fez login
var validMove; //variável que guarda se a jogada mais recente foi válida

//secção de começar jogos
window.onload = function(){
	table = new Mancala("base", 2, 's', '1', 'Player');
	table.criarTabuleiro();
	table.inserirSeeds(2);
	allInvis("authent");
	if (!localStorage.getItem("wins")) {wins = 0;}
	else {wins = localStorage.getItem("wins");}

	if (!localStorage.getItem("plays")) {plays = 0;}
	else {plays = localStorage.getItem("plays");}
	fimJogo = false;
	logged = false;
	validMove = false;
}

function criarJogo(seeds, conts, gamemode, difficulty, starting){
	table = new Mancala("base", conts, gamemode, difficulty, starting);
	allInvis("base");
	table.criarTabuleiro();
	table.inserirSeeds(seeds);
	fimJogo = false;
	if (gamemode === 'm') {
		if (logged == true) {
			let userdata = {"group": 98, "nick": gNickname, "password": gPassword, "size": conts, "initial": seeds};
			sendRequest(userdata, "join");
		}
		else {
			alert("Por favor faça login antes de tentar jogar em multijogador");
		}
	}
}

function passForm(containers, seeds, gametype, diff, start){
	criarJogo(seeds, containers, gametype, diff, start);
	mensagem = containers + " contentores, " + seeds + " sementes, " + " tipo de jogo: " + gametype;
	if (gametype == 's') {
		mensagem = mensagem + " com dificuldade " + diff + " e com " + start + " a começar!";
	}
	sendMessage(mensagem);
}

function play(pos){
	if (fimJogo) {
		alert("O jogo acabou. Por favor comece um novo jogo.");
	}
	else if (table.gamemode == 's' && (table.current === 'p2' && pos >= table.containers) || (table.current === 'p1' && pos < table.containers)) {
		alert("Posição " + parseInt(pos + 1) + " não é jogável pelo jogador " + table.current + ".");
	}
	else if(table.content[pos] == 0){
		alert(table.current + ", por favor escolha uma posição com sementes");
	}
	else if(table.gamemode == 's'){
		sendMessage(table.current + " jogou na posição " + (pos % table.containers + 1));
		const playNode = document.getElementById('cell'+pos.toString());
		let seedOrigin = table.content[pos];
		let consumed = 0;
		if(table.current === 'p2'){
			consumed = playTopRow(pos, pos);
			seedOrigin -= consumed;
			while(seedOrigin > 0){
				table.content[pos] -= 1;
				seedOrigin -= 1;
				table.p2Cont = parseInt(table.p2Cont) + 1;
				table.lastHole = table.containers * 2;
				sendSeed(pos, 'player2Container');
				if(table.content[pos] == 0) break;
				consumed = playBottomRow(pos, table.containers);
				seedOrigin -= consumed;
				if(table.content[pos] == 0) break;
				consumed = playTopRow(pos, table.containers);
				seedOrigin -= consumed;
			}
		}
		else{
			consumed = playBottomRow(pos, pos+1);
			seedOrigin -= consumed;
			while(seedOrigin > parseInt(0)){
				table.content[pos] = parseInt(table.content[pos]) - 1;
				seedOrigin -= 1;
				table.p1Cont = parseInt(table.p1Cont) + 1;
				table.lastHole = table.containers * 2;
				sendSeed(pos, 'playerContainer');
				if(table.content[pos] == 0) break;
				consumed = playTopRow(pos, table.containers);
				seedOrigin -= consumed;
				if(table.content[pos] == 0) break;
				consumed = playBottomRow(pos, table.containers);
				seedOrigin -= consumed;
			}
		}

		let state1 = document.getElementById('stateP1');
		state1.innerHTML = table.p1Cont.toString();
		let state2 = document.getElementById('stateP2');
		state2.innerHTML = table.p2Cont.toString();

		//turno de p1
		if (table.current === "p1") {
			//verificar se o ultimo lugar jogado foi num dos contentores de p1
			if(upperSum() === 0 || lowerSum() === 0){
					gameOver();
					return;
				}
			let finalHole = table.lastHole;
			if(finalHole === table.containers * 2){
				table.current = "p1";
				sendMessage("É a vez do jogador 1 outra vez!");
			}
			else if(table.content[finalHole] === 1 && parseInt(finalHole) >= parseInt(table.containers)){
				let transfer = table.content[parseInt(finalHole - table.containers)];
				for (var i = transfer - 1; i >= 0; i--) {
					console.log("Sending seed from " + (finalHole - table.containers) + " to player 1's mancala container");
					table.p1Cont = parseInt(parseInt(table.p1Cont) + table.content[finalHole] + parseInt(table.content[parseInt(finalHole - table.containers)]));
					table.content[parseInt(finalHole - table.containers)] = 0;
					table.content[finalHole] = 0;
					sendSeed(parseInt(finalHole - table.containers), "playerContainer");
					sendSeed(finalHole, "playerContainer");
					let state1 = document.getElementById('stateP1');
					state1.innerHTML = table.p1Cont.toString();
					let state2 = document.getElementById('stateP2');
					state2.innerHTML = table.p2Cont.toString();
				}
				if(upperSum() === 0 || lowerSum() === 0){
					gameOver();
					return;
				}
				table.current = "p2";
				sendMessage("É a vez do jogador 2");
				sleep(1500).then(() => {
					if(table.gamemode === "s"){
						switch (table.difficulty) {
						case "2":
							console.log("A jogar aleatóriamente por escolha");
							playRandom();
						break;
						default:
							console.log("A jogar aleatóriamente porque não foi encontrada dificuldade");
							playRandom();
						break;
						}
					}
				});

			}
			else{
				if(upperSum() === 0 || lowerSum() === 0){
					gameOver();
					return;
				}
				table.current = "p2";
				sendMessage("É a vez do jogador 2");
				sleep(1500).then(() => {
					if(table.gamemode === "s"){
						switch (table.difficulty) {
						case "2":
							console.log("A jogar aleatóriamente por escolha");
							playRandom();
						break;
						default:
							console.log("A jogar aleatóriamente porque não foi encontrada dificuldade");
							playRandom();
						break;
						}
					}
				});
			}
		}
		//turno de p2
		else{
			if(upperSum() === 0 || lowerSum() === 0){
					gameOver();
					return;
				}
			//verificar se o ultimo lugar jogado foi num dos contentores de p2
			let finalHole = table.lastHole;
			if(finalHole === table.containers * 2){
				table.current = "p2";
				sendMessage("É a vez do jogador 2 outra vez!");
				sleep().then(() => {
					if(table.gamemode === "s"){
						switch (table.difficulty) {
						case "2":
							console.log("A jogar aleatóriamente por escolha");
							playRandom();
						break;
						default:
							console.log("A jogar aleatóriamente porque não foi encontrada dificuldade");
							playRandom();
						break;
						}
					}
				});
			}
			else if(table.content[finalHole] === 1  && parseInt(finalHole) < parseInt(table.containers)){
				let transfer = table.content[parseInt(finalHole + table.containers)];
				for (var i = transfer - 1; i >= 0; i--) {
					console.log("Sending seed from " + (finalHole + table.containers) + " to player 2's mancala container");
					table.p2Cont = parseInt(parseInt(table.p2Cont) + table.content[finalHole] + parseInt(table.content[parseInt(finalHole + table.containers)]));
					table.content[parseInt(finalHole + table.containers)] = 0;
					table.content[finalHole] = 0;
					sendSeed(parseInt(finalHole + table.containers), "player2Container");
					sendSeed(finalHole, "player2Container");
					let state1 = document.getElementById('stateP1');
					state1.innerHTML = table.p1Cont.toString();
					let state2 = document.getElementById('stateP2');
					state2.innerHTML = table.p2Cont.toString();
				}
				if(upperSum() === 0 || lowerSum() === 0){
					gameOver();
					return;
				}
				table.current = "p1";
				sendMessage("É a vez do jogador 1");
			}
			else{
				if(upperSum() === 0 || lowerSum() === 0){
					gameOver();
					return;
				}
				table.current = "p1";
				sendMessage("É a vez do jogador 1");
			}
		}
	}
	else {
		let userdata = {'nick': gNickname, 'password': gPassword, "game": gameHash, "move": parseInt(pos % table.containers)};
		sendRequest(userdata, "notify");
		if(validMove == true)
		{
			sendMessage(table.current + " jogou na posição " + (pos % table.containers + 1));
			validMove = false;
		}
	}
}

//secção de singleplayer
function playTopRow(startNode, startPos){
	console.log("starting transfer from hole in position " + startNode + ", which has "+table.content[startNode]+" seeds");
	let seedsUsed = 0;
	for (var i = startPos - 1; i >= 0; i--) {
		if (table.content[startNode] > 0) {
			table.content[startNode] = parseInt(table.content[startNode]) - 1;
			console.log("node in position " + startNode.toString() + " has " + table.content[startNode] + " seeds");
			table.content[i] = parseInt(table.content[i]) + 1;
			console.log("node in position " + i.toString() + " has " + table.content[i] + " seeds");
			sendSeed(startNode, 'cell'+i.toString());
			seedsUsed+=1;
			table.lastHole = i;
		}
		else break;
	}
	return seedsUsed;
}

function playBottomRow(startNode, startPos){
	console.log("starting transfer from hole in position " + startNode + ", which has "+table.content[startNode]+" seeds");
	let seedsUsed = 0;
	for (var i = startPos; i < table.containers*2; i++) {
		if (table.content[startNode] > 0) {
			table.content[startNode] = parseInt(table.content[startNode]) - 1;
			console.log("node in position " + startNode.toString() + " has " + table.content[startNode] + " seeds");
			table.content[i] = parseInt(table.content[i]) + 1;
			console.log("node in position " + i.toString() + " has " + table.content[i] + " seeds");
			sendSeed(startNode, 'cell'+i.toString());
			seedsUsed+=1;
			table.lastHole = i;
		}
		else break;
	}
	return seedsUsed;
}

function sendSeed(fromNode, toNode){
	const playNode = document.getElementById('cell'+fromNode.toString());
	let childNodes = playNode.childNodes;
	if (childNodes.length > 1) {
		let seed = childNodes[1];
		const targetNode = document.getElementById(toNode);
		targetNode.appendChild(seed);
	}
}

function shuffleSeed(toNode, init, nSeeds){
	const targetNode = document.getElementById(toNode);
	for (var i = init; i < parseInt(nSeeds + init); i++) {
		targetNode.appendChild(table.seedArray[i]);
	}
}

function upperSum(){
	let sum = 0;
	for (var i = table.containers - 1; i >= 0; i--) {
		sum = parseInt(sum + table.content[i]);
	}
	return sum;
}

function lowerSum(){
	let sum = 0;
	for (var i = table.containers; i < table.containers*2; i++) {
		sum = parseInt(sum + table.content[i]);
	}
	return sum;
}

function collectLeftovers(){
	for (var i = table.containers - 1; i >= 0; i--) {
		let transfer = table.content[i];
		table.p2Cont = parseInt(transfer + table.p2Cont);
		for (var j = transfer - 1; j >= 0; j--) {
			sendSeed(i, 'player2Container');
		}
	}

	for (var i = table.containers; i < table.containers*2; i++) {
		let transfer = table.content[i];
		table.p1Cont = parseInt(transfer + table.p1Cont);
		for (var j = transfer - 1; j >= 0; j--) {
			sendSeed(i, 'playerContainer');
		}
	}
}

function gameOver(){
	fimJogo = true;
	collectLeftovers();
	alert("O jogo acabou!");

	let state1 = document.getElementById('stateP1');
	state1.innerHTML = table.p1Cont.toString();
	let state2 = document.getElementById('stateP2');
	state2.innerHTML = table.p2Cont.toString();
	plays = parseInt(plays+1);
	if (table.p1Cont === table.p2Cont) {
		console.log("ties");
		sendMessage("Empate!");
	}
	else if(table.p1Cont > table.p2Cont){
		wins = parseInt(wins + 1);
		console.log("wins");
		if(logged===true){sendMessage(gNickname + " ganhou!");}
		else {sendMessage("O jogador ganhou!");}


	} else{
		console.log("loses");
		sendMessage("O computador ganhou!");
	}
	updClassif();
	localStorage.setItem("wins", wins);
	localStorage.setItem("plays", plays);
}

function updClassif(){
	let wstaken = document.getElementById("wins");
	let gameC = document.getElementById("plays");
	gameC.innerHTML = plays.toString();
	wstaken.innerHTML = wins.toString();
}

function desistir(){
	fimJogo = true;
	alert("Desistiu do jogo! Por favor, comece um novo!");
	sendMessage("O jogador desistiu!");

	//novo na parte 2
	//também trata de multiplayer
	if (table.gamemode == "m"){
		let userdata = {'nick': gNickname, 'password': gPassword, "game": gameHash};
		sendRequest(userdata, "leave");
	}
}

function playWorst(){}

function playRandom(){
	let pos = Math.floor(Math.random() * table.containers);
	while(table.content[pos] === 0) pos = Math.floor(Math.random() * table.containers);
	console.log("a jogar numa posição aleatória: " + pos);
	play(pos);
}

function playBest(){}

//função auxiliar para esperar
function sleep(time){
	return new Promise((resolve) => setTimeout(resolve, time));
}

//secção de funções de HTML do site
function sendMessage(msg){
	const parent = document.getElementById("messageList");
	let listText = document.createElement("li");
	listText.appendChild(document.createTextNode(msg));
	parent.appendChild(listText);
}



function allInvis(vis){
	const elem = document.getElementById("configs");
	elem.style.display = 'none';

	const elem2 = document.getElementById("authent");
	elem2.style.display = 'none';

	const elem3 = document.getElementById("base");
	elem3.style.display = 'none';

	const elem4 = document.getElementById("messageBoard");
	if(vis != "base") elem4.style.display = 'none';
	else {elem4.style.display = 'block'; elem4.style.height = "150px";}

	const elem5 = document.getElementById("regras");
	elem5.style.display = 'none';

	const elem7 = document.getElementById("classif");
	elem7.style.display = 'none';

	const elemF = document.getElementById(vis);
	elemF.style.display = 'block';

	if(vis == "messageBoard") elemF.style.height = "auto";
	if(vis == "classif") sendRequest({}, "ranking");
}

//PARTE 2
function registarPlayer(user, password){
	gNickname = user;
	gPassword = password;
	logged = true;

	let userdata = {'nick': gNickname, 'password': gPassword};
	sendRequest(userdata, "register");
}
//secção de funções de comunicação com o servidor
function sendRequest(obj,command){
        const xhr = new XMLHttpRequest();
        let server = "twserver.alunos.dcc.fc.up.pt"
        xhr.open('POST','http://'+server+':'+8008+'/'+command,true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState < 4) return;
            let data=JSON.parse(xhr.responseText);
            switch (command) {
                case "join":
                    preJoin(data);
                    break;
                case "leave":
                    preLeave(data);
                    break;
                case "notify":
                    preNotify(data);
                    break;
                case "ranking":
                    preRanking(data);
                    break;
                case "register":
                    preRegister(data);
                    break;
                case "update":
                    preUpdate(data);
                    break;
            }
        }
        xhr.send(JSON.stringify(obj));
}

function isObjectEmpty(obj) {
    for (const i in obj) return false;
    return true;
}

function preRegister (data){
    if (isObjectEmpty(data)){
        console.log("Registo sucedido /	Confirmação da password");
        alert("Login sucedido!");
    }
    if (data.error=="User registered with a different password"){
        alert("Login falhado por erro na password");
        logged = false;
    }
}

function preJoin(data){
    if (isObjectEmpty(data)){
        alert("ERRO");
    }
    else if(data.hasOwnProperty("game")){
        gameHash=data.game;
        console.log(gameHash);
        alert("Entrou num jogo!");
        openServer();
    }
    else {
    	alert("ERRO");
    	console.log(data.error);
    }
}

function preLeave(data){
    if (isObjectEmpty(data)){
    	eventSource.close();
        console.log("Saiu da sala!!!");
    }
    else{
        alert("ERRO");
    }
}

function preNotify(data){
    if (isObjectEmpty(data)){
        console.log("JOGADA COM SUCESSO");
        validMove = true;
    }
    else{
    	switch(data.error){
			case "Not your turn to play":
				alert("Não é a sua vez!!!");
			break;
			case "invalid move":
				alert("Os programadores fizeram asneira...");
			break;
			default:
			alert("ERRO");
		}

    }
}

function preRanking(data){
    if (isObjectEmpty(data)){
        alert("ERRO");
    }
    else{
        entrada=data.ranking; //criar função para pegar na entrada e meter na tabela
        let classifSize = entrada.length;
        console.log("Table size: " + classifSize);
        let classifTable = document.createElement("table");
        classifTable.id = "tabclassificW";
        let firstLine = document.createElement("tr");
        let nameTD = document.createElement("td");
        let winsTD = document.createElement("td");
        let gamesTD = document.createElement("td");
        nameTD.classList.add("headline", "primeiro");
        winsTD.classList.add("headline", "segundo");
        gamesTD.classList.add("headline", "terceiro");
        nameTD.innerText = "Jogador";
        winsTD.innerText = "Vitórias";
        gamesTD.innerText = "Jogos";
        firstLine.appendChild(nameTD);
        firstLine.appendChild(winsTD);
        firstLine.appendChild(gamesTD);
        classifTable.appendChild(firstLine);
        let oldTable = document.getElementById("tabclassificW");
        let div = document.getElementById("classifW");
        div.replaceChild(classifTable, oldTable);
        for (let i = 0; i < classifSize; i++) {
        	let tr = document.createElement("tr");
        	let td1 = document.createElement("td");
           	let td2 = document.createElement("td");
        	let td3 = document.createElement("td");
        	td1.classList.add("headline");
    	    td2.classList.add("headline");
        	td3.classList.add("headline");POST

        	td1.innerText = entrada[i].nick;
        	td2.innerText = entrada[i].victories;
        	td3.innerText = entrada[i].games;
        	console.log("Nick: " + entrada[i].nick + " Victories: " + entrada[i].victories + " Games: " + entrada[i].games);
        	tr.appendChild(td1);
        	tr.appendChild(td2);
        	tr.appendChild(td3);
        	classifTable.appendChild(tr);
        }
    }POST
}

function translateBoard(sides, key){
	let incr;
	let init;
	let store;
	if (key === gNickname) {
		incr = 1;
		init = table.containers;
		store = "playerContainer";
	}
	else {
		incr = -1;
		init = table.containers-1;
		store = "player2Container";
	}

	//mandar sementes para o contentor do jogador
	let storeC = sides[key].store;
	console.log("store of " + key + " is " + storeC);
	shuffleSeed(store, seedPos, storeC);
	seedPos = parseInt(seedPos + storeC);
	console.log("Seed number is: " + seedPos);

	//percorrer os contentores
	for (var i = 0; i < table.containers; i++) {
		console.log('cell'+parseInt(parseInt(init) + parseInt(i*incr)));
		let tNode = 'cell'+parseInt(parseInt(init) + parseInt(i*incr));
		let tSeeds = sides[key].pits[i];
		console.log(tSeeds);
		shuffleSeed(tNode, seedPos, tSeeds);
		seedPos = parseInt(seedPos + tSeeds);
		console.log("Seed number is: " + seedPos);
	}
}

function openServer(){
	if(!logged){alert("Por favor faça login primeiro!"); return;}
	let server = "twserver.alunos.dcc.fc.up.pt"
	eventSource = new EventSource('http://'+server+':'+'8008'+'/update?nick='+encodeURIComponent(gNickname)+'&game='+encodeURIComponent(gameHash));

	eventSource.onmessage = function(event){
		//tratar de dados
		const data = JSON.parse(event.data);
		const sides = data.board.sides;POST
		seedPos = 0;
		let k = Object.keys(sides)[0];
		console.log(k);
		translateBoard(sides, k);
		k = Object.keys(sides)[1];
		console.log(k);
		translateBoard(sides, k);

		//tratar de se o jogo acabou
		if (data.hasOwnProperty("winner")) {
			fimJogo = true;
			plays = parseInt(plays+1);
			if(data.winner === null){
				alert("Sem vencedor!");
			}
			else {
				if(data.winner === gNickname){
					wins = parseInt(wins+1);
				}
				alert(data.winner + " venceu!");
			}
			eventSource.close();
			updClassif();
		}
		else {
			//se for a vez do jogador, fazer um alert
			if(data.board.turn === gNickname) alert("É a sua vez de jogar!");
		}
	}
}
