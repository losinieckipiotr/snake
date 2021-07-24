import { p, SetupRendererI } from './types'
import { Store } from '../Store'

export const start = (setup: SetupRendererI, draw: SetupRendererI) => {
  return (p: p): void => {
    const store = new Store()

    p.setup = setup(p, { store })
    p.draw = draw(p, { store })
  }
}
