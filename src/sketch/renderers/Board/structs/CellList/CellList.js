import { Cell } from './Cell'

/* eslint-disable */

export class CellList {
  constructor({ boardSize, squareSize, cellsMap }) {
    this.boardSize = boardSize;
    this.squareSize = squareSize;

    this.cellsMap = new Map();
    if (cellsMap) {
      cellsMap.forEach((cell) => {
        const newCell = cell.clone();
        this.cellsMap.set(this.getCellKey(newCell), newCell);
      });
    } else {
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          const cell = new Cell({ i, j, squareSize });
          this.cellsMap.set(this.getCellKey(cell), cell);
        }
      }
    }
  }

  calcCellKey(i, j) {
    return `${i}:${j}`;
  }

  getCellKey (cell) {
    return this.calcCellKey(cell.i, cell.j)
  }

  clone() {
    return new CellList({
      boardSize: this.boardSize,
      squareSize: this.squareSize,
      cellsMap: this.cellsMap
    });
  }

  forEach(callback) {
    this.cellsMap.forEach((cell) => callback(cell));
  }

  getCell(i, j) {
    return this.cellsMap.get(this.calcCellKey(i, j));
  }

  getCellVal(i, j) {
    const cell = this.cellsMap.get(this.calcCellKey(i, j));
    if (cell !== undefined && cell.alive) {
      return 1;
    } else {
      return 0;
    }
  }

  getAliveNeighbours(i, j) {
    let sum = 0;

    const leftTopCell = this.getCell(i - 1, j - 1);
    const topCell = this.getCell(i, j - 1);
    const rightTopCell = this.getCell(i + 1, j - 1);
    const rightCell = this.getCell(i + 1, j);
    const rightBottomCell = this.getCell(i + 1, j + 1);
    const bottomCell = this.getCell(i, j + 1);
    const leftBottomCell = this.getCell(i - 1, j + 1);
    const leftCell = this.getCell(i - 1, j);

    sum += leftTopCell?.alive ? 1 : 0;
    sum += topCell?.alive ? 1 : 0;
    sum += rightTopCell?.alive ? 1 : 0;
    sum += rightCell?.alive ? 1 : 0;
    sum += rightBottomCell?.alive ? 1 : 0;
    sum += bottomCell?.alive ? 1 : 0;
    sum += leftBottomCell?.alive ? 1 : 0;
    sum += leftCell?.alive ? 1 : 0;

    return sum;
  }

  getAliveNeighbours2(i, j) {
    const neighbours = [
      [-1, -1], // leftTopCell
      [-1, 0], // leftCell
      [-1, 1], // leftBottomCell
      [0, -1], // topCell
      [0, 1], // bottomCell
      [1, -1], // rightTopCell
      [1, 0], // rightCell
      [1, 1] // rightBottomCell
    ];

    let sum = 0;
    for (let k = 0; k < 8; k++) {
      const coordinates = neighbours[k];
      const cell = this.getCell(i + coordinates[0], j + coordinates[1]);
      if (cell && cell.alive) {
        sum += 1;
      }
      if (sum === 4) {
        break;
      }
    }
    return sum;
  }

  getAliveNeighbours3(i, j) {
    let sum = 0;

    sum += this.getCellVal(i - 1, j - 1);
    sum += this.getCellVal(i, j - 1);
    sum += this.getCellVal(i + 1, j - 1);
    sum += this.getCellVal(i + 1, j);
    sum += this.getCellVal(i + 1, j + 1);
    sum += this.getCellVal(i, j + 1);
    sum += this.getCellVal(i - 1, j + 1);
    sum += this.getCellVal(i - 1, j);

    return sum;
  }
}
