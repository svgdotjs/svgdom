import assert from 'node:assert/strict'
import { createHTMLDocument, createSVGDocument } from '../main-module.js'

describe('getElementsByClassName', () => {
  for (const [name, createDocument] of [
    ['SVG', createSVGDocument],
    ['HTML', createHTMLDocument]
  ]) {
    it(`handles unclassed and multiply-classed ${name} elements`, () => {
      const document = createDocument()
      const parent = document.createElement('div')
      const unclassed = document.createElement('span')
      const match = document.createElement('span')
      const partial = document.createElement('span')
      match.className = 'one two'
      partial.className = 'one'
      parent.append(unclassed, match, partial)
      document.documentElement.appendChild(parent)

      assert.equal(unclassed.className, '')
      assert.deepEqual(document.getElementsByClassName('one two'), [match])
      assert.deepEqual(document.getElementsByClassName('missing'), [])
      assert.deepEqual(document.getElementsByClassName('  '), [])
    })
  }
})
