import { expect } from '@open-wc/testing'
import { spy } from 'sinon'
import { getP5 } from '../../../../test/test-helper'

import { MySquare } from './MySquare'

describe('MySquare tests', () => {
  let p
  before(() => {
    p = spy(getP5())
  })

  it('should call p5 methods with valid args', () => {
    const color = p.color(255, 255, 255)

    const renderer = MySquare(p, {
      size: 10,
      color
    })
    renderer(0, 0)

    expect(p.fill).to.have.been.calledOnce
    expect(p.fill).to.have.been.calledOnceWith(color)
    expect(p.rect).to.have.been.calledOnceWith(0, 0, 10, 10)
  })
})
