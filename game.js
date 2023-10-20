// Code for Tic Tac Toe game. Runs in JavaScript.

const prompt = require("prompt-sync")({ sigint: true });

let x = [['-', '-', '-'],
['-', '-', '-'],
['-', '-', '-']]

printArray = () => {
    x.forEach((item) => console.log(item[0] + " " + item[1] + " " + item[2]));
}

playerMove = (p) => {
    let r = prompt("Player " + p + " select row.");
    let c = prompt("Player " + p + " select column.");
    if (r > 2 || c > 2) {
        console.log("Invalid Move.");
        playerMove(p);
        return;
    }
    if (x[r][c] === '-') {
        x[r][c] = p === 1 ? 'X' : 'O'
        printArray();
        return;
    }
    console.log("Sorry, spot is taken.");
    playerMove(p);
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

playGame = () => {
    let win = false;
    printArray();
    while (!win) {
        playerMove(1);
        win = checkWin(1);
        if (win) { break };
        playerMove(2);
        win = checkWin(2);
        if (win) { break };
    }
}

playGame()
