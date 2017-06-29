const Cell = require('./Cell')

/*
* Creates a Board Pseudoclassical Subclass
* @params {number} boardSize - The length of a single side of the board
* @params {number} bombCount - The number of bombs on the board
*/
const Board = function (boardSize, bombCount) {
  boardSize = boardSize || 5
  bombCount = bombCount || boardSize * 2
  if (boardSize * boardSize / 2 < bombCount) {
    throw new Error('Choose more bombs')
  }

  const self = this

  this._boardSize = boardSize
  this._bombCount = bombCount
  this._coveredCells = boardSize * boardSize
  this._validBoard = true
  this._board = initializeBoard()

  function initializeBoard () {
    const board = createBoard()
    return placeValuesOnBoard(board)
  }

  function createBoard () {
    const board = []
    for (var i = 0; i < self._boardSize; i++) {
      board.push(Array.from({ length: self._boardSize }, () => new Cell(0)))
    }
    return board
  }

  function placeValuesOnBoard (board) {
    let bombsLeft = self._bombCount

    while (bombsLeft > 0) {
      let row = Math.floor(Math.random() * self._boardSize)
      let col = Math.floor(Math.random() * self._boardSize)
      if (!board[row][col].containsBomb()) {
        board[row][col] = new Cell(4, row, col)
        placeNumbersAroundBomb(board, row, col)
        bombsLeft--
      }
    }
    return board
  }

  function placeNumbersAroundBomb (board, row, col) {
    // topleft
    if (board[row - 1] && board[row - 1][col - 1]) {
      board[row - 1][col - 1] = board[row - 1][col - 1].incrementValue()
    }
    // top
    if (board[row - 1]) {
      board[row - 1][col] = board[row - 1][col].incrementValue()
    }
    // topright
    if (board[row - 1] && board[row - 1][col + 1]) {
      board[row - 1][col + 1] = board[row - 1][col + 1].incrementValue()
    }
    // right
    if (board[row][col + 1]) {
      board[row][col + 1] = board[row][col + 1].incrementValue()
    }
    // bottomright
    if (board[row + 1] && board[row + 1][col + 1]) {
      board[row + 1][col + 1] = board[row + 1][col + 1].incrementValue()
    }
    // bottom
    if (board[row + 1]) {
      board[row + 1][col] = board[row + 1][col].incrementValue()
    }
    // bottomleft
    if (board[row + 1] && board[row + 1][col - 1]) {
      board[row + 1][col - 1] = board[row + 1][col - 1].incrementValue()
    }
    // left
    if (board[row][col - 1]) {
      board[row][col - 1] = board[row][col - 1].incrementValue()
    }
  }
}

Board.prototype.validBoard = function () {
  return this._validBoard
}

Board.prototype.checkCell = function (row, col) {
  const cell = this._board[row][col]
  if (cell.containsBomb() || this._coveredCells === 0) {
    console.log(`\nBomb found at row: ${row} and col: ${col}\n`)
    this._validBoard = false
    this.revealAllCells()
  } else {
    if (cell.isZeroCell()) {
      this.revealAroundZeroCell(row, col)
    }
    this._board[row][col] = cell.show()
    this._coveredCells--
  }
}

Board.prototype.revealAllCells = function () {
  for (var i = 0; i < this._boardSize; i++) {
    for (var j = 0; j < this._boardSize; j++) {
      this._board[i][j] = this._board[i][j].show()
    }
  }
}

Board.prototype.revealAroundZeroCell = function (row, col) {
  const board = this._board
  if (board[row - 1] && board[row - 1][col - 1]) {
    board[row - 1][col - 1] = board[row - 1][col - 1].show()
    this._coveredCells--
    if (board[row - 1][col - 1].isZeroCell()) {
      this.revealAroundZeroCell(row - 1, col - 1)
    }
  }
  // top
  if (board[row - 1]) {
    board[row - 1][col] = board[row - 1][col].show()
    this._coveredCells--
    if (board[row - 1][col].isZeroCell()) {
      this.revealAroundZeroCell(row - 1, col)
    }
  }
  // topright
  if (board[row - 1] && board[row - 1][col + 1]) {
    board[row - 1][col + 1] = board[row - 1][col + 1].show()
    this._coveredCells--
    if (board[row - 1][col + 1].isZeroCell()) {
      this.revealAroundZeroCell(row - 1, col + 1)
    }
  }
  // right
  if (board[row][col + 1]) {
    board[row][col + 1] = board[row][col + 1].show()
    this._coveredCells--
    if (board[row][col + 1].isZeroCell()) {
      this.revealAroundZeroCell(row, col + 1)
    }
  }
  // bottomright
  if (board[row + 1] && board[row + 1][col + 1]) {
    board[row + 1][col + 1] = board[row + 1][col + 1].show()
    this._coveredCells--
    if (board[row + 1][col + 1].isZeroCell()) {
      this.revealAroundZeroCell(row + 1, col + 1)
    }
  }
  // bottom
  if (board[row + 1]) {
    board[row + 1][col] = board[row + 1][col].show()
    this._coveredCells--
    if (board[row + 1][col].isZeroCell()) {
      this.revealAroundZeroCell(row + 1, col)
    }
  }
  // bottomleft
  if (board[row + 1] && board[row + 1][col - 1]) {
    board[row + 1][col - 1] = board[row + 1][col - 1].show()
    this._coveredCells--
    if (board[row + 1][col - 1].isZeroCell()) {
      this.revealAroundZeroCell(row + 1, col - 1)
    }
  }
  // left
  if (board[row][col - 1]) {
    board[row][col - 1] = board[row][col - 1].show()
    this._coveredCells--
    if (board[row][col - 1].isZeroCell()) {
      this.revealAroundZeroCell(row, col - 1)
    }
  }
}

Board.prototype.printBoard = function () {
  console.log('\n')
  console.log('M I N E S W E E P E R   B O A R D')
  console.log('\n')
  console.log(this._board.join('\n\n'))
  console.log('\n')
}

module.exports = Board
