import { expect } from '@open-wc/testing'
import { CellList } from './CellList2'

import { boardSize, squareSize } from '../../../../../enums'
import { Cell } from '../Cell/Cell'


describe('CellList', () => {
  it('should create list instance', () => {
    const list = new CellList({
      boardSize,
      squareSize
    })

    expect(list).to.be.a('object')
  })

  it('should clone list', () => {
    const list = new CellList({
      boardSize,
      squareSize
    })

    const list2 = list.clone()

    expect(list2).to.be.deep.equal(list)
  })

  it('should clone list', () => {
    const list = new CellList({
      boardSize,
      squareSize
    })

    const cellsSet = new Set()
    const cellsArray = []

    list.forEach((cell) => {
      expect(cell).to.be.an.instanceOf(Cell)
      cellsSet.add(JSON.stringify(cell))
      cellsArray.push(cell)
    })

    expect(cellsSet).to.have.lengthOf(boardSize * boardSize)
    expect(cellsArray).to.have.lengthOf(boardSize * boardSize)

    expect(cellsArray.every(cell => cell.alive === false)).to.be.true
  })

  it('should clone list', () => {
    const list = new CellList({
      boardSize,
      squareSize
    })

    let cell = list.getCell(2, 3)
    expect(cell).to.be.an.instanceOf(Cell)
    expect(cell.i).to.equal(2)
    expect(cell.j).to.equal(3)

    expect(cell.alive).to.be.false

    cell.alive = true
    cell = undefined
    cell = list.getCell(2, 3)

    expect(cell.alive).to.be.true
  })
})
