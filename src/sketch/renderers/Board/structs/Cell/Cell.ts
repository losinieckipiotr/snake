interface CellParams {
  i: number,
  j: number,
  x?: number,
  y?: number,
  squareSize?: number,
  alive?: boolean;
}

export class Cell {
  /** col index number */
  public i: number;
  /** row index number */
  public j: number;
  /** render coordinate horizontal */
  public x: number;
  /** render cooridnate vertical */
  public y: number;
  /** is cell is alive */
  public alive: boolean;

  constructor ({
    i,
    j,
    x,
    y,
    squareSize,
    alive
  }: CellParams) {
    this.i = i
    this.j = j

    this.x = x !== undefined ? x : i * (squareSize as number)
    this.y = y !== undefined ? y : j * (squareSize as number)

    this.alive = !!alive
  }

  clone (): Cell {
    return new Cell({
      i: this.i,
      j: this.j,
      x: this.x,
      y: this.y,
      alive: this.alive
    })
  }
}
