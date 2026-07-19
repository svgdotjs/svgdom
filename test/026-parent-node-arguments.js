import assert from 'node:assert/strict'
import { createSVGDocument } from '../main-module.js'

describe('ParentNode and ChildNode arguments', () => {
  it('stringifies every non-node argument', () => {
    const document = createSVGDocument()
    const group = document.createElement('g')

    group.append('text', 12, false, null, { toString: () => 'object' })

    assert.deepEqual(
      group.childNodes.map(node => node.data),
      ['text', '12', 'false', 'null', 'object']
    )
  })

  it('uses the Document itself for argument conversion', () => {
    const document = createSVGDocument()

    assert.throws(() => document.append('text'), /Hierarchy/)
    assert.equal(document.documentElement.parentNode, document)
  })

  it('handles before and after arguments containing the context node', () => {
    const document = createSVGDocument()
    const parent = document.createElement('g')
    const before = document.createElement('before')
    const context = document.createElement('context')
    const after = document.createElement('after')
    parent.append(before, context, after)

    context.before(context, 'one')
    assert.deepEqual(
      parent.childNodes.map(node => node.nodeName),
      ['before', 'context', '#text', 'after']
    )

    context.after(context, 'two')
    assert.deepEqual(
      parent.childNodes.map(node => node.nodeName),
      ['before', 'context', '#text', '#text', 'after']
    )
  })

  it('handles replaceWith arguments containing the context node', () => {
    const document = createSVGDocument()
    const parent = document.createElement('g')
    const context = document.createElement('context')
    const after = document.createElement('after')
    parent.append(context, after)

    context.replaceWith('before', context, 'after')

    assert.deepEqual(
      parent.childNodes.map(node => node.nodeName),
      ['#text', 'context', '#text', 'after']
    )
    assert.equal(context.parentNode, parent)
  })
})
