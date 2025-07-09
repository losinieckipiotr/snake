import { expect } from '@open-wc/testing'
import { spy } from 'sinon'
import { Controls } from './Controls'
import { Store } from '../../../Store'

import { getP5 } from '../../../../test/test-helper'

import { runInAction } from 'mobx'

describe('Controls renderer', () => {
  let p
  before(() => {
    p = spy(getP5())
  })

  it('Should create one controls and setup theirs rendering', () => {
    const store = new Store()
    Controls(p, { store })

    expect(p.createP).to.have.been.calledOnce
    expect(p.createSpan).to.have.been.calledOnce

    const iterationSpan = document.querySelector('#iterationSpan')

    expect(iterationSpan).to.be.instanceOf(HTMLSpanElement)
    expect(iterationSpan).to.have.trimmed.text('Iteration: 0')

    runInAction(() => {
      store.iteration = 1
    })

    expect(iterationSpan).to.have.trimmed.text('Iteration: 1')
  })
})
