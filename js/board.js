const MoveError = require("./moveError");

class Board {
  constructor() {
    this.grid = Board.makeGrid();
  }

  isEmptyPos(pos) {
    if (!Board.isValidPos(pos)) {
      throw new MoveError("Is not valid position!");
    }

    return this.grid[pos[0]][pos[1]] === null;
  }

  isOver() {
    if (this.winner() != null) {
      return true;
    }

    for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
      for (let colIdx = 0; colIdx < 7; colIdx++) {
        if (this.isEmptyPos([rowIdx, colIdx])) {
          return false;
        }
      }
    }

    return true;
  }

  placeMark(pos, mark) {
    if (!this.isEmptyPos(pos)) {
      throw new MoveError("Is not an empty position!");
    }

    this.grid[pos[0]][pos[1]] = mark;
  }

  winner() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        //rows
        // console.log(i,j);
        if (j < 4) {
          if (this.winnerHelper([[i, j], [i, j + 1], [i, j + 2], [i, j + 3]])) {
            return this.winnerHelper([
              [i, j],
              [i, j + 1],
              [i, j + 2],
              [i, j + 3]
            ]);
          }
        }
        //check columns
        if (i < 3) {
          if (this.winnerHelper([[i, j], [i + 1, j], [i + 2, j], [i + 3, j]])) {
            return this.winnerHelper([
              [i, j],
              [i + 1, j],
              [i + 2, j],
              [i + 3, j]
            ]);
          }
        }
      }
    }
    //check diagonal
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 7; j++) {
        if (j <= 3 && i <= 2) {
          //diag right and down
          if (
            this.winnerHelper([
              [i, j],
              [i + 1, j + 1],
              [i + 2, j + 2],
              [i + 3, j + 3]
            ])
          ) {
            return this.winnerHelper([
              [i, j],
              [i + 1, j + 1],
              [i + 2, j + 2],
              [i + 3, j + 3]
            ]);
          }
        } else if (i > 2 && j <= 3) {
          //diag right and up
          if (
            this.winnerHelper([
              [i, j],
              [i - 1, j + 1],
              [i - 2, j + 2],
              [i - 3, j + 3]
            ])
          ) {
            return this.winnerHelper([
              [i, j],
              [i - 1, j + 1],
              [i - 2, j + 2],
              [i - 3, j + 3]
            ]);
          }
        } else if (i > 2 && j >= 3) {
          // diag left and up
          if (
            this.winnerHelper([
              [i, j],
              [i - 1, j - 1],
              [i - 2, j - 2],
              [i - 3, j - 3]
            ])
          ) {
            return this.winnerHelper([
              [i, j],
              [i - 1, j - 1],
              [i - 2, j - 2],
              [i - 3, j - 3]
            ]);
          }
        } else if (i <= 2 && j >= 3) {
          // diag left and down
          if (
            this.winnerHelper([
              [i, j],
              [i + 1, j - 1],
              [i + 2, j - 2],
              [i + 3, j - 3]
            ])
          ) {
            return this.winnerHelper([
              [i, j],
              [i + 1, j - 1],
              [i + 2, j - 2],
              [i + 3, j - 3]
            ]);
          }
        }
      }
    }
    return null;
  }

  winnerHelper(array) {
    let grid = this.grid;
    let first = grid[array[0][0]][array[0][1]];
    let second = grid[array[1][0]][array[1][1]];
    let third = grid[array[2][0]][array[2][1]];
    let fourth = grid[array[3][0]][array[3][1]];
  
    if (
      first == second &&
      third == fourth &&
      first == fourth &&
      first !== null
    ) {
      return first;
    }
    return null;
  }

  static isValidPos(pos) {
    return 0 <= pos[0] && pos[0] < 6 && 0 <= pos[1] && pos[1] < 7;
  }

  static makeGrid() {
    const grid = [];

    for (let i = 0; i < 6; i++) {
      grid.push([]);
      for (let j = 0; j < 7; j++) {
        grid[i].push(null);
      }
    }

    return grid;
  }
}

Board.marks = ["red", "yellow"];

module.exports = Board;
