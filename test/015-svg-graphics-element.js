import assert from 'assert'
import { describe, it } from 'mocha'
import { createHTMLDocument } from '../main-module.js'

const SVG_NS = 'http://www.w3.org/2000/svg'

describe('SVGGraphicsElement', () => {
  it('calculates a client rect when embedded below a plain HTML element', () => {
    const document = createHTMLDocument()
    const svg = document.createElementNS(SVG_NS, 'svg')
    svg.setAttribute('width', '100')
    svg.setAttribute('height', '50')
    document.body.appendChild(svg)

    const box = svg.getBoundingClientRect()

    assert.strictEqual(box.x, 0)
    assert.strictEqual(box.y, 0)
    assert.strictEqual(box.width, 100)
    assert.strictEqual(box.height, 50)
  })
})
