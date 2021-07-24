import { Cell } from '../Cell'

interface CellListProps {
  boardSize: number;
  squareSize: number;
  cellsMap?: Array<Array<Cell>>;
}

export class CellList {
  private boardSize: number
  private squareSize: number;
  private cellsMap: Array<Array<Cell>>

  constructor ({
    boardSize,
    squareSize,
    cellsMap:
    oldCellsMap
  }: CellListProps) {
    this.boardSize = boardSize
    this.squareSize = squareSize
    this.cellsMap = new Array(boardSize)

    if (oldCellsMap) {
      for (let i = 0; i < boardSize; i++) {
        this.cellsMap[i] = new Array(boardSize)
        for (let j = 0; j < boardSize; j++) {
          const newCell = oldCellsMap[i][j].clone()
          this.cellsMap[i][j] = newCell
        }
      }
    } else {
      for (let i = 0; i < boardSize; i++) {
        this.cellsMap[i] = new Array(boardSize)
        for (let j = 0; j < boardSize; j++) {
          const cell = new Cell({ i, j, squareSize })
          this.cellsMap[i][j] = cell
        }
      }
    }
  }

  clone (): CellList {
    return new CellList({
      boardSize: this.boardSize,
      squareSize: this.squareSize,
      cellsMap: this.cellsMap
    })
  }

  forEach (callback: (cell: Cell) => void): void {
    const { boardSize } = this

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        callback(this.cellsMap[i][j])
      }
    }
  }

  getCell (i: number, j: number): Cell {
    return this.cellsMap[i][j]
  }

  getNeighbourVal (i: number, j: number): 0 | 1 {
    const { boardSize } = this
    const indexI = ((i % boardSize) + boardSize) % boardSize
    const indexJ = ((j % boardSize) + boardSize) % boardSize

    const cell = this.cellsMap[indexI][indexJ]

    return cell.alive ? 1 : 0
  }

  getAliveNeighbours (i: number, j: number): number {
    let sum = 0

    sum += this.getNeighbourVal(i - 1, j - 1)
    sum += this.getNeighbourVal(i, j - 1)
    sum += this.getNeighbourVal(i + 1, j - 1)
    sum += this.getNeighbourVal(i + 1, j)
    sum += this.getNeighbourVal(i + 1, j + 1)
    sum += this.getNeighbourVal(i, j + 1)
    sum += this.getNeighbourVal(i - 1, j + 1)
    sum += this.getNeighbourVal(i - 1, j)

    return sum
  }
}
