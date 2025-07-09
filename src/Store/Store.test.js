import { expect } from '@open-wc/testing'
import { isObservable, isObservableProp, isComputedProp, isAction } from 'mobx'
import { Store } from './Store'

describe('store', () => {

  it('should make observable with valid config', () => {
    const store = new Store()

    expect(store.firstRender).to.be.true
    expect(store.iteration).to.be.equal(0)
    expect(store.intervalHandle).to.be.undefined

    expect(isObservable(store)).to.be.true
  })
})
