#!/usr/bin/env node

import chalk from 'chalk';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

let piece = true;

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

  if (c < 0 || c > 6) {
    console.log(chalk.red("Can't go there"));
    return false;
  }

  if (board[c].length >= 6) {
    console.log(chalk.red("Can't go there"));
    return false;
  }

  board[c].push(piece ? chalk.red('x') : chalk.blue('o'));
  piece = !piece;
  return true;
}

function showBoard() {
  var show = [[],[],[],[],[],[]];

  for (var r = 6; r >= 1; r--) {
    for (var c = 1; c <= 7; c++) {
      var rowNum = 6-r;
      var col = board[c-1];
      var len = col.length;
      show[rowNum].push(r > len ? '.' : col[r-1]);
    }
  }

  for (var r in show){
    const row = show[r];
    print(r);

    for (var c in row) {
      const col = row[c];
      print(` ${col}`);
    }

    print('\n');
  }

  console.log('  1 2 3 4 5 6 7');
}

function print(c) {
  process.stdout.write(c);
}

showBoard();

while(true) {
  var col = prompt(`Player ${piece ? 'x' : 'o'}: `);
  if (addPiece(parseInt(col)))
  {
    showBoard();
  }
}