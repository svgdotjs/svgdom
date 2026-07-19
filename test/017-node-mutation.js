import assert from 'node:assert/strict'
import { createSVGDocument } from '../main-module.js'

describe('Node mutation invariants', () => {
  it('moves a child within one parent without changing the requested order', () => {
    const document = createSVGDocument()
    const parent = document.createElement('g')
    const a = document.createElement('a')
    const b = document.createElement('b')
    const c = document.createElement('c')
    parent.append(a, b, c)

    parent.insertBefore(a, c)

    assert.deepEqual(parent.childNodes, [b, a, c])
  })

  it('does not detach a node when removing it from the wrong parent', () => {
    const document = createSVGDocument()
    const parent = document.createElement('g')
    const other = document.createElement('g')
    const child = document.createElement('rect')
    parent.appendChild(child)

    assert.throws(() => other.removeChild(child), /Not Found/)
    assert.equal(child.parentNode, parent)
    assert.deepEqual(parent.childNodes, [child])
  })

  it('rejects cycles before mutation', () => {
    const document = createSVGDocument()
    const group = document.createElement('g')
    const child = document.createElement('rect')
    group.appendChild(child)

    assert.throws(() => child.appendChild(group), /Hierarchy/)
    assert.equal(group.parentNode, null)
    assert.equal(child.parentNode, group)
  })

  it('adopts cross-document subtrees on insertion', () => {
    const document = createSVGDocument()
    const group = document.createElement('g')
    const foreignDocument = createSVGDocument()
    const foreign = foreignDocument.createElement('circle')
    const child = foreignDocument.createElement('title')
    const attribute = foreignDocument.createAttribute('data-value')
    foreign.setAttributeNode(attribute)
    foreign.appendChild(child)
    foreignDocument.documentElement.appendChild(foreign)

    group.appendChild(foreign)

    assert.equal(foreign.parentNode, group)
    assert.equal(foreignDocument.documentElement.contains(foreign), false)
    assert.equal(foreign.ownerDocument, document)
    assert.equal(child.ownerDocument, document)
    assert.equal(attribute.ownerDocument, document)
  })

  it('provides the legacy DOM error code for missing children', () => {
    const document = createSVGDocument()
    const parent = document.createElement('g')
    const child = document.createElement('rect')

    assert.throws(
      () => parent.removeChild(child),
      error => error.message === 'Not Found Error' && error.code === 8
    )
  })

  it('detaches replaced textContent children and omits empty text nodes', () => {
    const document = createSVGDocument()
    const parent = document.createElement('g')
    const child = document.createElement('rect')
    parent.appendChild(child)

    parent.textContent = 'text'
    assert.equal(child.parentNode, null)
    assert.equal(parent.firstChild.data, 'text')

    const text = parent.firstChild
    parent.textContent = ''
    assert.equal(text.parentNode, null)
    assert.equal(parent.childNodes.length, 0)
  })

  it('empties inserted fragments while preserving child order', () => {
    const document = createSVGDocument()
    const fragment = document.createDocumentFragment()
    const a = document.createElement('a')
    const b = document.createElement('b')
    fragment.append(a, b)

    document.documentElement.appendChild(fragment)

    assert.deepEqual(document.documentElement.childNodes, [a, b])
    assert.equal(fragment.childNodes.length, 0)
    assert.equal(a.parentNode, document.documentElement)
    assert.equal(b.parentNode, document.documentElement)
  })

  it('rejects an unknown reference child without changing either tree', () => {
    const document = createSVGDocument()
    const parent = document.createElement('g')
    const existing = document.createElement('rect')
    const inserted = document.createElement('circle')
    const reference = document.createElement('line')
    parent.appendChild(existing)

    assert.throws(() => parent.insertBefore(inserted, reference), /Not Found/)
    assert.deepEqual(parent.childNodes, [existing])
    assert.equal(existing.parentNode, parent)
    assert.equal(inserted.parentNode, null)
  })

  it('replaces a document element atomically', () => {
    const document = createSVGDocument()
    const oldRoot = document.documentElement
    const newRoot = document.createElement('replacement')

    assert.equal(document.replaceChild(newRoot, oldRoot), oldRoot)
    assert.equal(document.documentElement, newRoot)
    assert.equal(newRoot.parentNode, document)
    assert.equal(oldRoot.parentNode, null)
  })

  it('rejects invalid document fragments without emptying them', () => {
    const document = createSVGDocument()
    const fragment = document.createDocumentFragment()
    const first = document.createElement('first')
    const second = document.createElement('second')
    fragment.append(first, second)

    assert.throws(() =>
      document.replaceChild(fragment, document.documentElement)
    )
    assert.deepEqual(fragment.childNodes, [first, second])
    assert.equal(first.parentNode, fragment)
    assert.equal(second.parentNode, fragment)
    assert.equal(document.documentElement.nodeName, 'svg')
  })

  it('validates replaceChildren before removing existing content', () => {
    const document = createSVGDocument()
    const parent = document.createElement('g')
    const child = document.createElement('rect')
    parent.appendChild(child)

    assert.throws(() => parent.replaceChildren(parent), /Hierarchy/)
    assert.deepEqual(parent.childNodes, [child])
    assert.equal(child.parentNode, parent)

    const container = document.createElement('g')
    container.appendChild(parent)
    assert.throws(() => parent.replaceChildren(child, parent), /Hierarchy/)
    assert.equal(parent.parentNode, container)
    assert.deepEqual(parent.childNodes, [child])

    const root = document.documentElement
    assert.throws(
      () => document.replaceChildren(document.createTextNode('invalid')),
      /Hierarchy/
    )
    assert.equal(document.documentElement, root)
  })

  it('rejects invalid insertion shortcuts and non-tree nodes', () => {
    const document = createSVGDocument()
    const parent = document.createElement('g')
    const detached = document.createElement('rect')
    const fragment = document.createDocumentFragment()
    const attribute = document.createAttribute('name')

    assert.throws(() => parent.insertBefore(detached, detached), /Not Found/)
    assert.throws(() => fragment.appendChild(fragment), /Hierarchy/)
    assert.throws(() => parent.appendChild(attribute), /Hierarchy/)
    assert.equal(attribute.parentNode, null)
  })

  it('dispatches textContent by node type without corrupting documents', () => {
    const document = createSVGDocument()
    const root = document.documentElement
    const element = document.createElement('text')
    const nested = document.createElement('tspan')
    const attribute = document.createAttribute('label')
    element.append('before', document.createComment('hidden'), nested)
    nested.textContent = 'after'
    attribute.value = 'old'

    assert.equal(element.textContent, 'beforeafter')
    assert.equal(attribute.textContent, 'old')
    attribute.textContent = null
    assert.equal(attribute.value, '')

    assert.equal(document.textContent, null)
    document.textContent = 'ignored'
    assert.equal(document.documentElement, root)
  })
})
