import { Board } from './renderers/Board'
import { Controls } from './renderers/Controls'
import { p, SetupRendererI } from './types'

export const setup: SetupRendererI = (p: p, { store }) => {
  const { renderers } = store
  return () => {
    renderers.push(Board(p, { store }))
    renderers.push(Controls(p, { store }))
  }
}
