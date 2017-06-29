const Board = require('./Board')
const prompt = require('prompt-sync')()
/*
* Creates a Game Pseudoclassical Subclass
*/
const Game = function () {
  this._board = null
}

Game.prototype.start = function () {
  const number = parseInt(prompt('What size would you like the game board to be? 4, 5, 6, ...? '))
  if (isNaN(number)) {
    throw new Error('Provide a number for the size of the board')
  }
  this._board = new Board(number)

  while (this._board.validBoard()) {
    this._board.printBoard()
    const row = prompt('Provide the row for the cell you want to uncover or \'exit\' to leave the game? ')
    if (row === 'exit') { break }
    if (row < 1 || row > number) {
      throw new Error('Provide a number within the size of the board')
    }
    const col = prompt('Provide the column for the cell you want to uncover or \'exit\' to leave the game? ')
    if (col === 'exit') { break }
    if (col < 1 || col > number) {
      throw new Error('Provide a number within the size of the board')
    }
    this._board.checkCell(parseInt(row - 1), parseInt(col - 1))
  }

  this.gameOver()
}

Game.prototype.gameOver = function () {
  console.log('\n')
  console.log('G A M E O V E R ')
  console.log('\n')
  console.log('- - - - - - - - -')
  this._board.printBoard()
  process.exit(0)
}

module.exports = Game
