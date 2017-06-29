const readline = require('readline')
const Board = require('./src/Board')
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: 'Bot> '
// })

const board = new Board(5)
board.printBoard()
