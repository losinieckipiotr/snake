import './styles.css'

import { setup } from './sketch/setup'
import { draw } from './sketch/draw'
import { start } from './sketch/start'

import p5 from 'p5'

const sketch = start(setup, draw)
const appNode = document.querySelector('#sketchContainer')
new p5(sketch, appNode as HTMLDivElement)
