/*
* Creates a Cell Pseudoclassical Subclass
* @params {number} value - The value of the cell
* @params {number} col - The column position of the cell
* @params {number} row - The column position of the cell
*/
const Cell = function (value, row, col) {
  if (value > 4 || value < 0) {
    throw new Error('The value of the cell must be 0, 1, 2, 3 or 4')
  }
  // if (row === undefined || col === undefined) {
  //   throw new Error('Specify a number for the row and/or column arguments')
  // }
  this._row = row
  this._col = col
  this._visible = false
  this._value = value
}

Cell.prototype.show = function () {
  this._visible = true
}

Cell.prototype.incrementValue = function () {
  if (this._value < 3) { this._value++ }
  return this
}

Cell.prototype.containsBomb = function () {
  return this._value === 4
}

Cell.prototype.position = function () {
  return [this._row, this._col]
}

Cell.prototype.toString = function () {
  if (this._visible) {
    return this._value === 4 ? ' [ X ] ' : ` [ ${this._value} ] `
  } else {
    return ' [ ] '
  }
}

module.exports = Cell
