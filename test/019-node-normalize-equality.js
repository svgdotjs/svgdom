import assert from 'node:assert/strict'
import { createSVGDocument } from '../main-module.js'

describe('Node normalization and equality', () => {
  it('preserves elements and normalizes descendant text', () => {
    const document = createSVGDocument()
    const root = document.documentElement
    const group = document.createElement('g')
    const rect = document.createElement('rect')
    const empty = document.createTextNode('')
    const first = document.createTextNode('a')
    const second = document.createTextNode('b')
    group.append(empty, first, second)
    root.append(group, rect)

    root.normalize()

    assert.deepEqual(root.childNodes, [group, rect])
    assert.deepEqual(group.childNodes, [first])
    assert.equal(first.data, 'ab')
    assert.equal(empty.parentNode, null)
    assert.equal(second.parentNode, null)
  })

  it('compares deep trees without mutating either tree', () => {
    const document = createSVGDocument()
    const left = document.createElement('g')
    left.setAttribute('id', 'same')
    left.append(document.createTextNode('a'), document.createTextNode('b'))
    const right = left.cloneNode(true)
    const leftChildren = left.childNodes.slice()

    assert.equal(left.isEqualNode(right), true)
    assert.deepEqual(left.childNodes, leftChildren)
    assert.equal(left.childNodes.length, 2)

    right.lastChild.data = 'different'
    assert.equal(left.isEqualNode(right), false)
  })

  it('compares attributes independent of order', () => {
    const document = createSVGDocument()
    const left = document.createElement('rect')
    const right = document.createElement('rect')
    left.setAttribute('x', 1)
    left.setAttribute('y', 2)
    right.setAttribute('y', 2)
    right.setAttribute('x', 1)

    assert.equal(left.isEqualNode(right), true)
    right.setAttribute('x', 3)
    assert.equal(left.isEqualNode(right), false)
    assert.equal(left.isEqualNode(null), false)
  })
})
