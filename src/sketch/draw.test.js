import { expect } from '@open-wc/testing'
import { spy } from 'sinon'

import { getP5 } from '../../test/test-helper'
import { draw } from './draw'
import { Store } from '../Store'

describe('draw', () => {
  let p
  before(() => {
    p = getP5()
  })

  it('should return render function', () => {
    const renderer1 = spy()
    const renderer2 = spy()
    const store = new Store()
    store.renderers = [renderer1, renderer2]

    const render = draw(p, { store })
    expect(render).to.be.a('function')

    render()

    expect(renderer1).to.have.been.calledOnce
    expect(renderer2).to.have.been.calledOnce

    render()

    expect(renderer1).to.have.been.calledTwice
    expect(renderer2).to.have.been.calledTwice
  })
})
