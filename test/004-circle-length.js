/* global describe, it */

import { createSVGWindow, createSVGDocument } from '..'
import assert from 'assert'

const document = createSVGDocument()
const { SVG, registerWindow } = require('@svgdotjs/svg.js')
registerWindow(createSVGWindow(), document)

describe('circle-length', () => {
  it('circumference of circle of radius 49.5 should be close to 99*Math.PI', () => {
    const canvas = SVG(document.documentElement)
    const circle = canvas.path('M0.5 50a49.5 49.5 0 1 0 99 0 49.5 49.5 0 1 0-99 0')
    const len = circle.length()
    assert(Math.abs(len - 99 * Math.PI) < 0.0005)
  })
})
