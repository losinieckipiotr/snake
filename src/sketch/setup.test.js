import { expect } from '@open-wc/testing'

import { getP5 } from '../../test/test-helper'
import { Store } from '../Store'
import { setup } from './setup'

describe('setup', () => {
  let p
  before(() => {
    p = getP5()
  })

  it('should return setup function', () => {
    const store = new Store()

    const setupCallback = setup(p, { store })
    expect(setupCallback).to.be.a('function')

    expect(store.renderers).to.have.lengthOf(0)

    setupCallback()

    expect(store.renderers).to.have.lengthOf(2)
  })
})
