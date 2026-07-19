import assert from 'node:assert/strict'
import { createSVGDocument, DOMImplementation } from '../main-module.js'
import { SVGRectElement } from '../src/dom/svg/SVGRectElement.js'

describe('Node cloning', () => {
  it('deep-clones elements, attributes, and current character data', () => {
    const document = createSVGDocument()
    const group = document.createElement('g')
    const rect = document.createElement('rect')
    rect.setAttribute('width', 10)
    const text = document.createTextNode('old')
    text.data = 'current'
    group.append(rect, text)

    const clone = group.cloneNode(true)

    assert.equal(clone.isEqualNode(group), true)
    assert.notEqual(clone.childNodes, group.childNodes)
    assert.notEqual(clone.firstChild.attributes[0], rect.attributes[0])
    assert.equal(clone.firstChild instanceof SVGRectElement, true)
    assert.equal(clone.lastChild.data, 'current')
    clone.firstChild.setAttribute('width', 20)
    assert.equal(rect.getAttribute('width'), '10')
  })

  it('preserves DocumentType metadata', () => {
    const doctype = DOMImplementation.createDocumentType(
      'svg',
      'public',
      'system'
    )
    doctype.internalSubset = 'subset'

    const clone = doctype.cloneNode()

    assert.equal(clone.name, 'svg')
    assert.equal(clone.publicId, 'public')
    assert.equal(clone.systemId, 'system')
    assert.equal(clone.internalSubset, 'subset')
    assert.equal(clone.ownerDocument, null)
  })

  it('gives deep Document clones internally consistent ownership', () => {
    const document = createSVGDocument()
    const rect = document.createElement('rect')
    rect.setAttribute('width', 10)
    document.documentElement.appendChild(rect)

    const clone = document.cloneNode(true)

    assert.equal(clone.namespaceURI, document.namespaceURI)
    assert.equal(clone.ownerDocument, null)
    assert.notEqual(clone.documentElement, document.documentElement)
    assert.equal(clone.documentElement.ownerDocument, clone)
    assert.equal(clone.documentElement.firstChild.ownerDocument, clone)
    assert.equal(
      clone.documentElement.firstChild.attributes[0].ownerDocument,
      clone
    )
  })

  it('keeps ordinary clones associated with their source document', () => {
    const document = createSVGDocument()
    const fragment = document.createDocumentFragment()
    fragment.appendChild(document.createElement('rect'))

    const clone = fragment.cloneNode(true)

    assert.equal(clone.ownerDocument, document)
    assert.equal(clone.firstChild.ownerDocument, document)
    assert.equal(clone.firstChild.parentNode, clone)
  })

  it('preserves namespace-unaware names containing colons', () => {
    const document = createSVGDocument()
    const element = document.createElement('custom:name')
    const attribute = document.createAttribute('custom:attribute')
    attribute.value = 'value'
    element.setAttributeNode(attribute)

    const clone = element.cloneNode(true)

    assert.equal(clone.prefix, null)
    assert.equal(clone.localName, 'custom:name')
    assert.equal(clone.firstChild, null)
    assert.equal(clone.attributes[0].prefix, null)
    assert.equal(clone.attributes[0].localName, 'custom:attribute')
    assert.equal(clone.attributes[0].value, 'value')
  })
})
