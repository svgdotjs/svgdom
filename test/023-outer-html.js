import assert from 'node:assert/strict'
import { createSVGDocument } from '../main-module.js'

describe('Element.outerHTML', () => {
  it('replaces an attached element in its parent namespace', () => {
    const document = createSVGDocument()
    const group = document.createElement('g')
    const circle = document.createElement('circle')
    document.documentElement.appendChild(group)
    group.appendChild(circle)

    circle.outerHTML = '<rect/><line/>'

    assert.deepEqual(
      group.childNodes.map(node => node.nodeName),
      ['rect', 'line']
    )
    assert.equal(group.firstChild.namespaceURI, document.namespaceURI)
    assert.equal(circle.parentNode, null)
  })

  it('preserves the original element when parsing fails', () => {
    const document = createSVGDocument()
    const rect = document.createElement('rect')
    document.documentElement.appendChild(rect)

    assert.throws(() => {
      rect.outerHTML = '<circle><g>'
    })
    assert.deepEqual(document.documentElement.childNodes, [rect])
    assert.equal(rect.parentNode, document.documentElement)
  })

  it('replaces a document element with standalone serialized markup', () => {
    const document = createSVGDocument()
    const oldRoot = document.documentElement

    oldRoot.outerHTML = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>'

    assert.notEqual(document.documentElement, oldRoot)
    assert.equal(document.documentElement.nodeName, 'svg')
    assert.equal(document.documentElement.firstChild.nodeName, 'rect')
    assert.equal(oldRoot.parentNode, null)
  })

  it('does nothing for detached elements', () => {
    const document = createSVGDocument()
    const rect = document.createElement('rect')

    rect.outerHTML = '<circle/>'

    assert.equal(rect.parentNode, null)
    assert.equal(rect.nodeName, 'rect')
  })
})
