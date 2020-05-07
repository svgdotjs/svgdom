/* global describe, it */

import { createSVGDocument } from '..'
import assert from 'assert'

describe('escaped-text', () => {
  it(' svg with text contain html elements should be printable ', () => {
    var svgDoc = createSVGDocument()
    var textNode = svgDoc.createTextNode('A<B')
    var html = textNode.innerHTML.toString()
    assert(html.indexOf('<') === -1)
  })
})
