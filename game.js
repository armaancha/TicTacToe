// Code for Tic Tac Toe game. Runs in JavaScript.

const prompt = require("prompt-sync")({ sigint: true });

let x = [['-', '-', '-'],
['-', '-', '-'],
['-', '-', '-']]

printArray = () => {
  x.forEach((item) => console.log(item[0] + " " + item[1] + " " + item[2]));
}

playerMove = (p, isBot) => {
  let r = 0;
  let c = 0;
  if(!isBot) {
    r = prompt("Player " + p + " select row.")-1;
    c = prompt("Player " + p + " select column.")-1;
  }
  else {
    r = Math.floor(Math.random() * 3);
    c = Math.floor(Math.random() * 3);
  }

  if (r > 2 || c > 2) {
    console.log("Invalid Move.");
    playerMove(p, isBot);
    return;
  }
  if (x[r][c] === '-') {
    x[r][c] = p === 1 ? 'X' : 'O'
    console.log("Player " + p + " move.");
    printArray();
    return;
  }
  if (!isBot) {
    console.log("Sorry, spot is taken.");
  }
  playerMove(p, isBot);
}

checkWin = (p) => {
  let c = p === 1 ? 'X' : 'O'
  if ((x[0][0] === c && x[0][1] === c && x[0][2] === c) ||
    (x[1][0] === c && x[1][1] === c && x[1][2] === c) ||
    (x[2][0] === c && x[2][1] === c && x[2][2] === c) ||
    (x[0][0] === c && x[1][0] === c && x[2][0] === c) ||
    (x[0][1] === c && x[1][1] === c && x[2][1] === c) ||
    (x[0][2] === c && x[1][2] === c && x[2][2] === c) ||
    (x[0][0] === c && x[1][1] === c && x[2][2] === c) ||
    (x[0][2] === c && x[1][1] === c && x[2][0] === c)) {
    console.log("Player " + p + " has won!");
    return true;
  }
  return false;
}

checkDraw = () => {
  for(let i=0; i<x.length; i++) {
    for(let j=0; j<x[i].length; j++) {
      if(x[i][j] === '-') {
        return false;
      }
    }
  }
  console.log("It's a draw!")
  return true;
}

playGame = () => {
  let option = prompt("0 for no player, 1 for singleplayer, 2 for multiplayer ");
  let player1Bot = option === "0" ? true : false;
  let player2Bot = option === "0" || "1" ? true : false;
  printArray();
  while (true) {
    playerMove(1, player1Bot);
    if(checkWin(1) || checkDraw()) { break };
    playerMove(2, player2Bot);
    if(checkWin(2) || checkDraw()) { break };
  }
}

playGame()
