import { expect } from '@open-wc/testing'

import { getP5 } from '../../../../test/test-helper'

import { Store } from '../../../Store'
import { Board } from './Board'

import { boardSize, squareSize } from '../../../enums'

describe('Board', () => {
  let p
  before(() => {
    p = getP5()
  })

  it('should setup board', () => {
    const store = new Store()
    const renderBoard = Board(p, { store })

    expect(renderBoard).to.be.a('function')

    const canvas = document.querySelector('canvas')
    expect(canvas.width).to.equal(boardSize * squareSize)
    expect(canvas.height).to.equal(boardSize * squareSize)

    renderBoard()
  })
})
