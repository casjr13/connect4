#!/usr/bin/env node

import chalk from 'chalk';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

const EMPTY = chalk.gray('.');
const P1 = chalk.red('⬤');
const P2 = chalk.blue('⬤');
let turn = true;
const getPiece = () => turn ? P1 : P2;

const board = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

function addPiece(col) {
  if (isNaN(col)) {
    return false;
  }

  const c = col - 1;

  if (c < 0 || c > 6 || board[c].length >= 6) {
    console.log(chalk.red("Can't go there"));
    return false;
  }

  board[c].push(getPiece());
  turn = !turn;
  return true;
}

function showBoard() {
  var show = [[],[],[],[],[],[]];

  // Convert board into something we can print
  for (var r = 6; r >= 1; r--) {
    for (var c = 1; c <= 7; c++) {
      var rowNum = 6-r;
      var col = board[c-1];
      var len = col.length;
      show[rowNum].push(r > len ? EMPTY : col[r-1]);
    }
  }

  // Print the board
  console.clear();
  for (var r in show){
    const row = show[r];
    for (var c in row) {
      const col = row[c];
      print(`${c == 0 ? '' : ' '}${col}`);
    }
    print('\n');
  }
  console.log(chalk.green('1 2 3 4 5 6 7'));
}

function print(c) {
  process.stdout.write(c);
}

showBoard();

while(true) {
  var col = prompt(`Player ${getPiece()}: `);
  if (addPiece(parseInt(col)))
  {
    showBoard();
  }
}