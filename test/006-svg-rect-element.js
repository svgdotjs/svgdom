// @ts-check

import assert from 'assert'
import { SVGLength } from '../src/dom/svg/SVGLength.js'
import { createSVGDocument } from '../main-module.js'
import { describe, it } from 'mocha'

describe('SVGRectElement', function () {
  /** @type {SVGRectElement} */
  let rect
  /** @type {Element} */
  let svgElement

  this.beforeEach(function () {
    const svgDoc = createSVGDocument()
    svgElement = svgDoc.documentElement
    svgElement.innerHTML = '<rect width="10" height="1in"/>'
    rect = svgElement.children[0]
  })

  it('has animatedLength properties', function () {
    assert.strictEqual(rect.width.baseVal.value, 10, 'width value')
    assert.strictEqual(rect.width.baseVal.unitType, SVGLength.SVG_LENGTHTYPE_NUMBER, 'width unit')
    assert.strictEqual(rect.height.baseVal.value, 96, 'height value')
    assert.strictEqual(rect.height.baseVal.unitType, SVGLength.SVG_LENGTHTYPE_IN, 'height unit')
  })
})
