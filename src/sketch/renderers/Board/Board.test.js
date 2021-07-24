import { expect } from '@open-wc/testing'

import { getP5 } from '../../../../test/test-helper'

import { Store } from '../../../Store'
import { Board } from './Board'

import { defaultSimulationRate, boardSize, squareSize } from '../../../enums'

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

    const toggleButton = document.querySelector('#toggleButton')

    expect(toggleButton).to.be.instanceOf(HTMLButtonElement)
    expect(toggleButton).to.have.trimmed.text('Start simulation')

    const resetButton = document.querySelector('#resetButton')

    expect(resetButton).to.be.instanceOf(HTMLButtonElement)
    expect(resetButton).to.have.trimmed.text('Reset')

    const simRateSlider = document.querySelector('#simRateSlider')

    expect(simRateSlider).to.be.instanceOf(HTMLInputElement)
    expect(simRateSlider.type).to.equal('range')
    expect(simRateSlider.min).to.equal(String(1))
    expect(simRateSlider.max).to.equal(String(60))
    expect(simRateSlider.value).to.equal(String(defaultSimulationRate))
    expect(simRateSlider.step).to.equal(String(1))

    renderBoard()
  })
})
