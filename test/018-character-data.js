import assert from 'node:assert/strict'
import { createSVGDocument } from '../main-module.js'

describe('CharacterData', () => {
  it('keeps data and nodeValue synchronized', () => {
    const text = createSVGDocument().createTextNode('first')

    text.data = 'second'
    assert.equal(text.nodeValue, 'second')
    text.nodeValue = 'third'
    assert.equal(text.data, 'third')
  })

  it('implements mutation and substring methods without stale values', () => {
    const text = createSVGDocument().createTextNode('abcdef')

    text.deleteData(2, 2)
    assert.equal(text.data, 'abef')
    text.insertData(2, 'CD')
    assert.equal(text.data, 'abCDef')
    text.replaceData(2, 2, 'xy')
    assert.equal(text.data, 'abxyef')
    assert.equal(text.substringData(1, 3), 'bxy')
    assert.equal(text.data, 'abxyef')
  })

  it('validates ranges and clamps counts to the available data', () => {
    const text = createSVGDocument().createTextNode('abc')

    assert.equal(text.substringData(1, 100), 'bc')
    assert.throws(() => text.deleteData(4, 1), /Index Size/)
    assert.throws(() => text.insertData(-1, 'x'), /Index Size/)
  })

  it('clones the current value for text, comments, and CDATA', () => {
    const document = createSVGDocument()
    for (const node of [
      document.createTextNode('old'),
      document.createComment('old'),
      document.createCDATASection('old')
    ]) {
      node.data = 'current'
      assert.equal(node.cloneNode().data, 'current')
    }
  })

  it('stringifies factory and mutation inputs', () => {
    const document = createSVGDocument()
    const text = document.createTextNode(12)
    text.appendData(false)

    assert.equal(text.data, '12false')
    assert.equal(document.createComment(null).data, 'null')
  })
})
