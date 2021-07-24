import p5 from 'p5'
import { Store } from '../Store'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Renderer = (...args: any[]) => void;
export type p = p5;
export type SetupRendererI = (
  p: p5,
  setupArguments: {
    store: Store
  }
) => () => void
