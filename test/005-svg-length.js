import assert from 'assert'
import { SVGLength } from '../src/dom/svg/SVGLength.js'
import { createSVGDocument } from '../main-module.js'
import { svg as SVG_NS } from '../src/utils/namespaces.js'
import { describe, it } from 'mocha'

describe('SVGLength', function () {
  /** @type {SVGRectElement} */
  let rect
  /** @type {SVGLength} */
  let svgLength

  this.beforeEach(function () {
    const svgDoc = createSVGDocument()
    rect = svgDoc.createElementNS(SVG_NS, 'rect')
    svgLength = new SVGLength(rect, 'x')
  })

  it('returns default value', function () {
    assert.strictEqual(svgLength.value, 0, 'default value')
    assert.strictEqual(
      svgLength.unitType,
      SVGLength.SVG_LENGTHTYPE_NUMBER,
      'default unit'
    )
  })

  it('parses unitless values', function () {
    svgLength.valueAsString = '42'
    assert.strictEqual(svgLength.value, 42, 'value')
    assert.strictEqual(
      svgLength.valueInSpecifiedUnits,
      42,
      'valueInSpecifiedUnits'
    )
    assert.strictEqual(svgLength.valueAsString, '42', 'valueAsString')
    assert.strictEqual(
      svgLength.unitType,
      SVGLength.SVG_LENGTHTYPE_NUMBER,
      'default unit'
    )
  })

  it('parses values with units', function () {
    svgLength.valueAsString = '1in'
    assert.strictEqual(svgLength.value, 96, 'value')
    assert.strictEqual(
      svgLength.valueInSpecifiedUnits,
      1,
      'valueInSpecifiedUnits'
    )
    assert.strictEqual(svgLength.valueAsString, '1in', 'valueAsString')
    assert.strictEqual(rect.getAttribute('x'), '1in', 'getAttribute')
    assert.strictEqual(svgLength.unitType, SVGLength.SVG_LENGTHTYPE_IN)
  })

  it('handles values with unknown units', function () {
    rect.setAttribute('x', '4dm')
    assert.strictEqual(svgLength.value, 0, 'value')
    assert.strictEqual(
      svgLength.valueInSpecifiedUnits,
      0,
      'valueInSpecifiedUnits'
    )
    assert.strictEqual(svgLength.valueAsString, '0', 'valueAsString')
    assert.strictEqual(svgLength.unitType, SVGLength.SVG_LENGTHTYPE_NUMBER)
  })

  it('allows setting value', function () {
    svgLength.valueAsString = '1in'
    svgLength.value = 2 * 96
    assert.strictEqual(svgLength.value, 2 * 96, 'value')
    assert.strictEqual(
      svgLength.valueInSpecifiedUnits,
      2,
      'valueInSpecifiedUnits'
    )
    assert.strictEqual(svgLength.valueAsString, '2in', 'valueInSpecifiedUnits')
  })

  it('allows setting valueInSpecifiedUnits', function () {
    svgLength.valueAsString = '1in'
    svgLength.valueInSpecifiedUnits = 2
    assert.strictEqual(svgLength.value, 2 * 96, 'value')
    assert.strictEqual(
      svgLength.valueInSpecifiedUnits,
      2,
      'valueInSpecifiedUnits'
    )
    assert.strictEqual(svgLength.valueAsString, '2in', 'valueInSpecifiedUnits')
  })

  it('supports some aspects of not fully supported units, throws for unsupported features', function () {
    svgLength.valueAsString = '50%'
    assert.strictEqual(rect.getAttribute('x'), '50%', 'getAttribute')
    assert.strictEqual(svgLength.valueAsString, '50%', 'valueAsString')
    assert.strictEqual(
      svgLength.valueInSpecifiedUnits,
      50,
      'valueInSpecifiedUnits'
    )
    assert.throws(() => svgLength.value, 'length')
  })
})
