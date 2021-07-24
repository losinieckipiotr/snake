import { expect } from '@open-wc/testing'
import { stub } from 'sinon'

import { getP5 } from '../../test/test-helper'
import { start } from './start'

describe('start', () => {
  let p
  before(() => {
    p = getP5()
  })

  it('should set setup and draw functions', () => {
    const setupStub = stub()
    const drawStub = stub()

    const setup = stub().returns(setupStub)
    const draw = stub().returns(drawStub)

    const sketch = start(setup, draw)

    sketch(p)

    expect(setup).to.have.been.calledOnce
    expect(setup.getCall(0).args[0]).to.equal(p)
    expect(p.setup).to.equal(setupStub)

    expect(draw).to.have.been.calledOnce
    expect(draw.getCall(0).args[0]).to.equal(p)
    expect(p.draw).to.equal(drawStub)
  })
})
