import { autorun, reaction } from 'mobx'

import { p, Renderer } from '../../types'
import { Store } from '../../../Store'
import { Cell } from './structs/Cell'
import {
  boardSize,
  frameRate,
  screenSize,
  squareSize
} from '../../../enums'
import { constrain } from './helpers'
import { MySquare } from '../MySquare'

interface BoardParams {
  store: Store
}

export function Board (p: p, { store }: BoardParams): Renderer {
  p.frameRate(frameRate)

  // const screenSize = [p.windowWidth, p.windowHeight];
  p.createCanvas(...screenSize)

  p.createP()
  const toggleButton = p.createButton('')
  toggleButton.id('toggleButton')
  const resetButton = p.createButton('Reset')
  resetButton.id('resetButton')
  const simRateSlider = p.createSlider(1, 60, store.simulationRate, 1)
  simRateSlider.id('simRateSlider')

  const renderBlackSquare = MySquare(p, {
    size: squareSize,
    color: p.color(64, 64, 64)
  })
  const renderWhiteSquare = MySquare(p, {
    size: squareSize,
    color: p.color(224, 224, 224)
  })

  const renderCell = (cell: Cell) => {
    const { alive, x, y } = cell
    if (alive) {
      renderWhiteSquare(x, y) // side effect
    } else {
      renderBlackSquare(x, y) // side effect
    }
  }

  const renderAllDeadCells = () => {
    store.currentCells.forEach((cell) => {
      cell.alive = false
      renderCell(cell)
    })
  }

  const gameOfLifeSimulation = () => {
    store.cloneCells()
    store.forEachCell((cell, currentCells, nextCells) => {
      const { i, j } = cell

      const futureCell = nextCells.getCell(i, j)
      const aliveNeighbours = currentCells.getAliveNeighbours(i, j)
      if (cell.alive) {
        if (aliveNeighbours < 2 || aliveNeighbours > 3) {
          futureCell.alive = false // mutation
          renderCell(futureCell)
        }
      } else if (aliveNeighbours === 3) {
        futureCell.alive = true // mutation
        renderCell(futureCell)
      }
    })
    store.swapCellsLists()
  }

  const renderSingleSquare = (cell: Cell, renderAlive: boolean) => {
    if (renderAlive !== cell.alive) {
      cell.alive = renderAlive // mutation
      renderCell(cell)
    }
  }

  const onMousePressed = () => {
    const minMax: [number, number] = [0, boardSize - 1]
    const i = constrain(
      Math.floor(p.mouseX / squareSize),
      minMax
    )
    const j = constrain(
      Math.floor(p.mouseY / squareSize),
      minMax
    )

    if (isNaN(i) || isNaN(j)) {
      return
    }

    const cell = store.currentCells.getCell(i, j)
    if (p.mouseButton === p.LEFT) {
      renderSingleSquare(cell, true)
    } else if (p.mouseButton === p.RIGHT) {
      renderSingleSquare(cell, false)
    }
  }

  p.mousePressed = onMousePressed
  p.mouseDragged = onMousePressed

  const setupNextSimulation = () => {
    store.simulate = true
  }

  const startInterval = () => {
    // simulationLoop();
    // side effect
    store.setIntervalHandle(
      window.setInterval(setupNextSimulation, store.simulationInterval)
    )
  }

  const stopInterval = () => {
    clearInterval(store.intervalHandle) // side effect
    store.setIntervalHandle(undefined)
  }

  const toggleSimulation = () => {
    if (store.intervalHandle === undefined) {
      startInterval()
    } else {
      stopInterval()
    }
  }

  const reseSimulation = () => {
    stopInterval()
    // renderAllDeadCells()
    store.firstRender = true
    store.resetIteration()
  }

  toggleButton.mouseClicked(toggleSimulation)
  resetButton.mouseClicked(reseSimulation)
  p.keyPressed = () => {
    if (p.keyCode === p.ENTER) {
      toggleSimulation()
    }
  }

  reaction(
    () => store.simulationRate,
    () => {
      if (store.intervalHandle) {
        stopInterval()
        startInterval()
      }
    }
  )

  autorun(() => {
    if (store.intervalHandle) {
      toggleButton.html('Stop simulation')
    } else {
      toggleButton.html('Start simulation')
    }
  })

  return () => {
    if (p.mouseIsPressed) {
      onMousePressed()
    }

    if (store.simulate) {
      gameOfLifeSimulation()
      store.incrementIteration()
      store.simulate = false
    }

    if (store.firstRender) {
      renderAllDeadCells()
      store.firstRender = false
    }

    store.setSimulationRate(Number(simRateSlider.value()))
  }
}
