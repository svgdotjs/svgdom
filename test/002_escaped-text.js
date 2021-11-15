/* global describe, it */

import { createSVGDocument } from '../main-module.js'
import assert from 'assert'

describe('escaped-text', () => {
  it(' svg with text contain html elements should be printable ', () => {
    const svgDoc = createSVGDocument()
    const node = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text')
    node.appendChild(svgDoc.createTextNode('A<B'))
    const html = node.innerHTML.toString()
    assert(html.indexOf('<') === -1)
  })
})
