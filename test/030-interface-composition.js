import assert from 'node:assert/strict'
import { createSVGDocument } from '../main-module.js'

describe('DOM interface composition', () => {
  it('exposes selector methods only on their intended interfaces', () => {
    const document = createSVGDocument()
    const fragment = document.createDocumentFragment()
    const element = document.createElement('g')

    for (const parent of [document, fragment]) {
      assert.equal(parent.closest, undefined)
      assert.equal(parent.matches, undefined)
      assert.equal(parent.matchWithScope, undefined)
      assert.equal(parent.query, undefined)
      assert.equal(typeof parent.querySelector, 'function')
      assert.equal(typeof parent.querySelectorAll, 'function')
    }

    assert.equal(typeof element.matches, 'function')
    assert.equal(typeof element.closest, 'function')
    assert.equal(element.matchWithScope, undefined)
    assert.equal(element.query, undefined)
  })

  it('preserves scoped query and closest behavior', () => {
    const document = createSVGDocument()
    document.documentElement.innerHTML = '<g><rect id="target"/></g>'
    const rect = document.querySelector('#target')

    assert.equal(document.querySelectorAll('g > rect')[0], rect)
    assert.equal(rect.closest('svg'), document.documentElement)
    assert.equal(rect.matches('#target:scope'), true)
  })
})
