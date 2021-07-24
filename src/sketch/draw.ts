import { p, SetupRendererI } from './types'

export const draw: SetupRendererI = (p: p, { store }) => {
  const { renderers } = store

  return (): void => {
    renderers.forEach((render) => {
      render()
    })
  }
}
