import assert from 'node:assert/strict'
import {
  createDocument,
  createHTMLDocument,
  createSVGDocument
} from '../main-module.js'

describe('Document head and body accessors', () => {
  it('returns null for empty and non-HTML documents', () => {
    const empty = createDocument(null)
    const svg = createSVGDocument()

    assert.equal(empty.head, null)
    assert.equal(empty.body, null)
    assert.equal(svg.head, null)
    assert.equal(svg.body, null)
  })

  it('returns null for a partial HTML tree', () => {
    const document = createDocument('http://www.w3.org/1999/xhtml', 'html')

    assert.equal(document.head, null)
    assert.equal(document.body, null)
  })

  it('returns the generated HTML head and body', () => {
    const document = createHTMLDocument('title')

    assert.equal(document.head.nodeName, 'HEAD')
    assert.equal(document.body.nodeName, 'BODY')
  })
})
