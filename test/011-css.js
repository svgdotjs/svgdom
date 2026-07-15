// @ts-check

import assert from 'assert'
import { describe, it } from 'mocha'
import { createSVGWindow } from '../main-module.js'

describe('CSS', function () {
  const window = createSVGWindow()

  it('exposes the CSS namespace', function () {
    assert.equal(Object.prototype.toString.call(window.CSS), '[object CSS]')
    assert.equal(typeof window.CSS.escape, 'function')
  })

  it('serializes identifiers', function () {
    assert.throws(() => window.CSS.escape(), TypeError)
    assert.equal(window.CSS.escape(null), 'null')
    assert.equal(window.CSS.escape('\0'), '\uFFFD')
    assert.equal(window.CSS.escape('123'), '\\31 23')
    assert.equal(window.CSS.escape('-1a'), '-\\31 a')
    assert.equal(window.CSS.escape('-'), '\\-')
    assert.equal(
      window.CSS.escape('shape.with:special[chars]'),
      'shape\\.with\\:special\\[chars\\]'
    )
  })

  it('produces selectors accepted by querySelector', function () {
    const ids = [
      '123',
      'shape.with:special[chars]',
      'quote"and\'apostrophe',
      'white space'
    ]

    for (const id of ids) {
      const element = window.document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      )
      element.setAttribute('id', id)
      window.document.documentElement.appendChild(element)

      assert.equal(
        window.document.querySelector(`#${window.CSS.escape(id)}`),
        element
      )
    }
  })

  it('supports escaped ids in complex selectors', function () {
    const ids = [
      '1',
      '123',
      'shape.with:special[chars]',
      'white space',
      'non\u00a0breaking',
      'em\u2003space',
      'trailing ',
      'greater>than',
      'comma,name'
    ]

    for (const id of ids) {
      const group = window.document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      )
      const child = window.document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      )

      group.setAttribute('id', id)
      group.appendChild(child)
      window.document.documentElement.appendChild(group)

      const escapedId = window.CSS.escape(id)
      assert.equal(window.document.querySelector(`#${escapedId} rect`), child)
      assert.equal(window.document.querySelector(`g#${escapedId} > rect`), child)
    }
  })

  it('preserves explicit combinators around escaped ids', function () {
    const group = window.document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    )
    const wrapper = window.document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    )
    const child = window.document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    )

    group.setAttribute('id', 'not>a-direct-parent')
    wrapper.appendChild(child)
    group.appendChild(wrapper)
    window.document.documentElement.appendChild(group)

    const escapedId = window.CSS.escape(group.id)
    assert.equal(window.document.querySelector(`#${escapedId} rect`), child)
    assert.equal(window.document.querySelector(`#${escapedId} > rect`), null)
  })
})
