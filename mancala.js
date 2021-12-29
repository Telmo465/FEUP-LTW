class Mancala{
  constructor(id, containers, mode, difficulty, startPlayer){
    const parent = document.getElementById(id);
    let board = document.createElement('div');
		board.id = "mancalaBoard";
		board.style.height = "300px";

    this.content = new Array(containers*2);
    this.containers = containers;
    this.currentPlayer = startPlayer;
    this.gameMode = mode;
    this.gameDifficulty = difficulty;
  }

  createTable(){
    const table = document.getElementById("jogar");

    for (let i = 0; i < this.containers; i++){
      let hole = createElement('div');
      hole.setAttribute('class', 'seedhole');
      hole.style.gridColumnStart = (2 + i%this.containers).toString();
			hole.id = 'cell' + i;
    }
  }
}
