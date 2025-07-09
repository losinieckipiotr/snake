import { p, Renderer } from '../../types'
import { Store } from '../../../Store'
import { Cell } from './structs/Cell'
import {
  frameRate,
  screenSize,
  squareSize
} from '../../../enums'
import { MySquare } from '../MySquare'

interface BoardParams {
  store: Store
}

export function Board (p: p, { store }: BoardParams): Renderer {
  p.frameRate(frameRate)

  // const screenSize = [p.windowWidth, p.windowHeight];
  p.createCanvas(...screenSize)

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


  // p.keyPressed = () => {
  //   if (p.keyCode === p.ENTER) {
  //   }
  // }

  return () => {
    if (store.firstRender) {
      renderAllDeadCells()
      store.firstRender = false
    }
  }
}
