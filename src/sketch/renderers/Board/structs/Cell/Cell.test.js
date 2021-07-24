import { expect } from '@open-wc/testing'
import { Cell } from './Cell'

describe('Cell tests', () => {
  it('Should cell valid props', () => {
    const cell = new Cell({
      i: 0,
      j: 0,
      x: 0,
      y: 0,
      alive: false
    })

    expect(cell.i).to.be.equal(0)
    expect(cell.j).to.be.equal(0)
    expect(cell.x).to.be.equal(0)
    expect(cell.y).to.be.equal(0)
    expect(cell.alive).to.be.false
  })


  it('Should create real case cell with valid props', () => {
    const cell = new Cell({
      i: 2,
      j: 3,
      squareSize: 10,
      alive: true
    })

    expect(cell.i).to.be.equal(2)
    expect(cell.j).to.be.equal(3)
    expect(cell.x).to.be.equal(20)
    expect(cell.y).to.be.equal(30)
    expect(cell.alive).to.be.true
  })

  it('Should clone cell', () => {
    const cell1 = new Cell({
      i: 2,
      j: 3,
      squareSize: 10,
      alive: true
    })
    const cell2 = cell1.clone()

    expect(cell1).to.be.deep.equal(cell2)
    expect(cell1).to.not.be.equal(cell2)

    cell1.alive = false // mutation
    expect(cell1.alive).to.be.false // mutation works
    expect(cell2.alive).to.be.true // clone not changed
  })

})
