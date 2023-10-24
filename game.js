// Code for Tic Tac Toe game. Runs in JavaScript.

const prompt = require("prompt-sync")({ sigint: true });

let x = [['-', '-', '-'],
['-', '-', '-'],
['-', '-', '-']]

printArray = () => {
  x.forEach((item) => console.log(item[0] + " " + item[1] + " " + item[2]));
}

checkLine = (l, p) => {
  let cCount = 0;
  let dashCount = 0;
  let c = p===1 ? 'X' : 'O'
  let position = -1;
  for(i=0;i<l.length;i++) {
    if(l[i]==='-') {
      dashCount++;
      position = i;
    }
    else if(l[i]===c) {
      cCount++;
    }
  }
  if(dashCount===1 && cCount ===2){
    return position;
  }
  return -1;
}

tryToWin = (p) => {
  let result = checkLine([x[0][0],x[0][1], x[0][2]], p);
  if(result!=-1){
    return({
      r:0,
      c:result
    })
  }
  
}

playerMove = (p, isBot, difficulty) => {
  let r = 0;
  let c = 0;
  if(!isBot) {
    r = prompt("Player " + p + " select row.")-1;
    c = prompt("Player " + p + " select column.")-1;
  }
  else {
    if(difficulty===0) {
      r = Math.floor(Math.random() * 3);
      c = Math.floor(Math.random() * 3);
    }
    else {
      tryToWin(p)
    }
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
  let difficulty = 0;
  if(player1Bot || player2Bot) {
    difficulty = parseInt(prompt("0 for easy, 1 for hard"));
  }
  printArray();
  while (true) {
    playerMove(1, player1Bot, difficulty);
    if(checkWin(1) || checkDraw()) { break };
    playerMove(2, player2Bot, difficulty);
    if(checkWin(2) || checkDraw()) { break };
  }
}

playGame()
