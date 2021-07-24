import { expect } from '@open-wc/testing'
import { isObservable, isObservableProp, isComputedProp, isAction } from 'mobx'
import { Store } from './Store'
import { defaultSimulationRate } from '../enums'

describe('store', () => {

  it('should make observable with valid config', () => {
    const store = new Store()

    expect(store.firstRender).to.be.true
    expect(store.simulationRate).to.be.equal(defaultSimulationRate)
    expect(store.iteration).to.be.equal(0)
    expect(store.intervalHandle).to.be.undefined

    expect(isObservable(store)).to.be.true

    expect(isObservableProp(store, 'simulationRate')).to.be.true
    expect(isObservableProp(store, 'iteration')).to.be.true
    expect(isObservableProp(store, 'intervalHandle')).to.be.true
    expect(isComputedProp(store, 'simulationInterval')).to.be.true

    expect(isAction(store.incrementIteration)).to.be.true
    expect(isAction(store.resetIteration)).to.be.true
    expect(isAction(store.setIntervalHandle)).to.be.true
  })

  it('should return simulation interval', () => {
    const store = new Store()

    const { simulationInterval } = store
    const second = 1000
    const expectedSimulationRate = Math.floor(second / defaultSimulationRate)
    expect(simulationInterval).to.be.equal(expectedSimulationRate)
  })

  it('should update simulation rate, and simulation interval', () => {
    const store = new Store()

    expect(store.simulationRate).to.be.equal(defaultSimulationRate)

    const newSimulationRate = 15
    expect(newSimulationRate).to.be.not.equal(defaultSimulationRate)
    store.simulationRate = newSimulationRate

    expect(store.simulationRate).to.be.equal(newSimulationRate)

    const { simulationInterval } = store
    const second = 1000
    const expectedSimulationRate = Math.floor(second / newSimulationRate)
    expect(simulationInterval).to.be.equal(expectedSimulationRate)
  })

  it('should increment iteration value', () => {
    const store = new Store()

    expect(store.iteration).to.be.equal(0)

    store.incrementIteration()

    expect(store.iteration).to.be.equal(1)
  })

  it('should reset iteration value', () => {
    const store = new Store()

    expect(store.iteration).to.be.equal(0)

    store.incrementIteration()
    store.incrementIteration()
    store.incrementIteration()

    expect(store.iteration).to.be.equal(3)

    store.resetIteration()

    expect(store.iteration).to.be.equal(0)
  })

  it('should set interval handler', () => {
    const store = new Store()

    expect(store.intervalHandle).to.be.undefined

    store.setIntervalHandle(1)

    expect(store.intervalHandle).to.be.equal(1)
  })
})
