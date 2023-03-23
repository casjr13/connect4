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
  const c = col - 1;

  if (c < 0 || c > 6) {
    console.log(chalk.red("Can't go there"));
    return false;
  }

  if (board[c].length >= 6) {
    console.log(chalk.red("Can't go there"));
    return false;
  }

  board[c].push(piece ? 'x' : 'o');
  piece = !piece;
  return true;
}

function showBoard() {
  var show = ["","","","","",""];

  for (var r = 6; r >= 1; r--) {
    for (var c = 1; c <= 7; c++) {
      var rowNum = 6-r;
      var col = board[c-1];
      var len = col.length;
      show[rowNum] += r > len ? '.' : col[r-1];
    }
  }

  for (var r in show){
    console.log(`${r} ${show[r].split('').join(' ')}`)
  }

  console.log('  1 2 3 4 5 6 7');
}

showBoard();

while(true) {
  var col = prompt(`Player ${piece ? 'x' : 'o'}: `);
  if (addPiece(parseInt(col)))
  {
    showBoard();
  }
}