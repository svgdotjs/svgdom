import assert from 'node:assert/strict'
import {
  createDocument,
  createSVGDocument,
  HTMLParser
} from '../main-module.js'

describe('transactional XML parsing', () => {
  it('preserves innerHTML when fragment parsing fails', () => {
    const document = createSVGDocument()
    const root = document.documentElement
    root.innerHTML = '<circle id="existing"/>'
    const existing = root.firstChild

    assert.throws(() => {
      root.innerHTML = '<rect/><g>'
    })

    assert.deepEqual(root.childNodes, [existing])
    assert.equal(existing.parentNode, root)
    assert.equal(root.innerHTML.includes('existing'), true)
  })

  it('does not expose partially parsed document nodes', () => {
    const document = createDocument(null)
    const comment = document.createComment('existing')
    document.appendChild(comment)

    assert.throws(() => HTMLParser('<root><child></root>', document))

    assert.deepEqual(document.childNodes, [comment])
    assert.equal(comment.parentNode, document)
  })

  it('commits valid fragments only after parsing completes', () => {
    const document = createSVGDocument()
    const root = document.documentElement
    const old = document.createElement('circle')
    root.appendChild(old)

    root.innerHTML = '<g><rect/></g><!--done-->'

    assert.equal(old.parentNode, null)
    assert.equal(root.childNodes.length, 2)
    assert.equal(root.firstChild.firstChild.nodeName, 'rect')
    assert.equal(root.lastChild.data, 'done')
  })

  it('converts markup setter values to strings', () => {
    const document = createSVGDocument()
    const parent = document.createElement('g')
    const child = document.createElement('rect')
    parent.appendChild(child)

    child.innerHTML = null
    assert.equal(child.textContent, 'null')

    child.outerHTML = 42
    assert.equal(parent.firstChild.data, '42')
  })

  it('retains parsed doctype identifiers and internal subsets', () => {
    const document = createDocument(null)

    HTMLParser(
      '<!DOCTYPE svg PUBLIC "public-id" "system-id" [<!ELEMENT svg ANY>]><svg/>',
      document
    )

    const doctype = document.firstChild
    assert.equal(doctype.publicId, 'public-id')
    assert.equal(doctype.systemId, 'system-id')
    assert.equal(doctype.internalSubset, '<!ELEMENT svg ANY>')
  })
})
