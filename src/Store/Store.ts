import { action, computed, makeObservable, observable } from 'mobx'
import { defaultSimulationRate, boardSize, squareSize } from '../enums'
import { Cell } from '../sketch/renderers/Board/structs/Cell'
import { CellList } from '../sketch/renderers/Board/structs/CellList'
import { Renderer } from '../sketch/types'

export class Store {
  // simple props
  firstRender = true
  simulate = false
  renderers: Renderer[] = []
  currentCells: CellList
  nextCells: CellList

  // observable
  simulationRate = defaultSimulationRate // fps
  iteration = 0
  intervalHandle?: number

  constructor () {
    this.intervalHandle = undefined
    this.currentCells = new CellList({ boardSize, squareSize })
    this.nextCells = new CellList({ boardSize, squareSize })

    makeObservable(this, {
      simulationRate: observable,
      iteration: observable,
      intervalHandle: observable,

      simulationInterval: computed,

      incrementIteration: action,
      resetIteration: action,
      setIntervalHandle: action,
      setSimulationRate: action
    })
  }

  get simulationInterval (): number {
    const second = 1000
    return Math.floor(second / this.simulationRate)
  }

  setSimulationRate (simulationRate: number): void {
    this.simulationRate = simulationRate
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

  cloneCells (): void {
    this.nextCells = this.currentCells.clone()
  }

  swapCellsLists (): void {
    this.currentCells = this.nextCells
  }

  forEachCell (
    callback: (cell: Cell, currentCells: CellList, nextCells: CellList) => void
  ): void {
    this.currentCells.forEach(
      (cell) => callback(cell, this.currentCells, this.nextCells)
    )
  }
}
