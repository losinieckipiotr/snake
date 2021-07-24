/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* global p5 */
import 'p5'

export const getP5 = () => {
  return new p5(() => {}, document.querySelector('#sketchContainer'))
}
