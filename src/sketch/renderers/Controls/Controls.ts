import { autorun } from 'mobx'
import { Store } from '../../../Store'
import { p, Renderer } from '../../types'

interface ControlsParams {
  store: Store
}

export function Controls (p: p, { store }: ControlsParams): Renderer {
  const messagesParagraph = p.createP()
  messagesParagraph.addClass('messages-paragraph')

  const iterationSpan = p.createSpan()
  iterationSpan.id('iterationSpan')
  iterationSpan.addClass('msg')
  iterationSpan.parent(messagesParagraph)

  autorun(() => {
    iterationSpan.html(`Iteration: ${store.iteration}`)
  })

  return () => {}
}
