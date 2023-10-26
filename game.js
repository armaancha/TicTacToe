// Code for Tic Tac Toe game. Runs in JavaScript.

const prompt = require("prompt-sync")({ sigint: true });

let x = [['-', '-', '-'],
['-', '-', '-'],
['-', '-', '-']]

printArray = () => {
  x.forEach((item) => console.log(item[0] + " " + item[1] + " " + item[2]));
}

checkLineWorker = (l, p) => {
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

checkLine = (p, type, index) => {
  let c = p===1 ? 'X' : 'O'
  let result = -1;
  let position;
  switch(type) {
    case "row":
      result = checkLineWorker([x[index][0],x[index][1], x[index][2]], p);
      position = {
        r:index,
        c:result
      };
      break;
    case "column":
      result = checkLineWorker([x[0][index],x[1][index], x[2][index]], p);
      position = {
        r:result,
        c:index
      };
      break;
    case "diagonal":
      switch(index) {
        case 0:
          result = checkLineWorker([x[0][0],x[1][1], x[2][2]], p);
          position = {
            r:result,
            c:result
          };
          break;
        case 1:
          result = checkLineWorker([x[0][2],x[1][1], x[2][0]], p);
          let col = 2-result;
          position = {
            r:result,
            c:col
          }
          break;
        default:
          break;
      }
    default:
      break;
  }
  if(result!=-1){
    x[position.r][position.c] = c;
    return true;
  }
  return false;
}

tryToWin = (p) => {
  if(checkLine(p, "row", 0) ||
    (checkLine(p, "row", 1) || 
    (checkLine(p, "row", 2) ||
    (checkLine(p, "column", 0) ||
    (checkLine(p, "column", 1) ||
    (checkLine(p, "column", 2) ||
    (checkLine(p, "diagonal", 0) ||
    (checkLine(p, "diagonal", 1)) {
    return true;
  }
  return false;
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
      if(tryToWin(p)) {
        return;
      }
      
    }
  }

  if (r > 2 || c > 2) {
    console.log("Invalid Move.");
    playerMove(p, isBot, difficulty;
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
  playerMove(p, isBot,difficulty);
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
