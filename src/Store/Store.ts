import { action, makeObservable, observable } from 'mobx'
import { boardSize, squareSize } from '../enums'
import { CellList } from '../sketch/renderers/Board/structs/CellList'
import { Renderer } from '../sketch/types'

export class Store {
  // simple props
  firstRender = true
  renderers: Renderer[] = []
  currentCells: CellList

  // observable
  iteration = 0
  intervalHandle?: number

  constructor () {
    this.intervalHandle = undefined
    this.currentCells = new CellList({ boardSize, squareSize })

    makeObservable(this, {
      iteration: observable,
      intervalHandle: observable,

      incrementIteration: action,
      resetIteration: action,
      setIntervalHandle: action
    })
  }

  incrementIteration (): void {
    ++this.iteration
  }

  resetIteration (): void {
    this.iteration = 0
  }

  setIntervalHandle (intervalHandle: number | undefined): void {
    this.intervalHandle = intervalHandle
  }
}
