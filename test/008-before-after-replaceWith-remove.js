// @ts-check

import assert from 'assert'
import { createSVGDocument } from '../main-module.js'
import { svg } from '../src/utils/namespaces.js'
import { describe, it } from 'mocha'

describe('before', function () {
  /** @type {Element} */
  let svgElement, rect

  this.beforeEach(function () {
    const svgDoc = createSVGDocument()
    svgElement = svgDoc.documentElement
    svgElement.innerHTML = '<rect width="10" height="1in"/>'
    rect = svgElement.children[0]
  })

  it('inserts one node', function () {
    rect.before(svgElement.ownerDocument.createElementNS(svg, 'circle'))
    assert.strictEqual(svgElement.children.length, 2)
    assert.strictEqual(svgElement.children[0].tagName, 'circle')
  })

  it('inserts multiple nodes', function () {
    rect.before(
      svgElement.ownerDocument.createElementNS(svg, 'circle'),
      svgElement.ownerDocument.createElementNS(svg, 'circle'),
      'circle'
    )

    assert.strictEqual(svgElement.childNodes.length, 4)
    assert.strictEqual(svgElement.childNodes[0].nodeName, 'circle')
    assert.strictEqual(svgElement.childNodes[1].nodeName, 'circle')
    assert.strictEqual(svgElement.childNodes[2].nodeName, '#text')
  })
})

describe('after', function () {
  /** @type {Element} */
  let svgElement, rect

  this.beforeEach(function () {
    const svgDoc = createSVGDocument()
    svgElement = svgDoc.documentElement
    svgElement.innerHTML = '<rect width="10" height="1in"/>'
    rect = svgElement.children[0]
  })

  it('inserts one node', function () {
    rect.after(svgElement.ownerDocument.createElementNS(svg, 'circle'))
    assert.strictEqual(svgElement.children.length, 2)
    assert.strictEqual(svgElement.children[1].tagName, 'circle')
  })

  it('inserts multiple nodes', function () {
    rect.after(
      svgElement.ownerDocument.createElementNS(svg, 'circle'),
      svgElement.ownerDocument.createElementNS(svg, 'circle'),
      'circle'
    )
    assert.strictEqual(svgElement.childNodes.length, 4)
    assert.strictEqual(svgElement.childNodes[1].nodeName, 'circle')
    assert.strictEqual(svgElement.childNodes[2].nodeName, 'circle')
    assert.strictEqual(svgElement.childNodes[3].nodeName, '#text')
  })
})

describe('replaceWith', function () {
  /** @type {Element} */
  let svgElement, rect

  this.beforeEach(function () {
    const svgDoc = createSVGDocument()
    svgElement = svgDoc.documentElement
    svgElement.innerHTML = '<rect width="10" height="1in"/>'
    rect = svgElement.children[0]
  })

  it('inserts one node', function () {
    rect.replaceWith(svgElement.ownerDocument.createElementNS(svg, 'circle'))
    assert.strictEqual(svgElement.children.length, 1)
    assert.strictEqual(svgElement.children[0].tagName, 'circle')
  })

  it('inserts multiple nodes', function () {
    rect.replaceWith(
      svgElement.ownerDocument.createElementNS(svg, 'circle'),
      svgElement.ownerDocument.createElementNS(svg, 'circle'),
      'circle'
    )
    assert.strictEqual(svgElement.childNodes.length, 3)
    assert.strictEqual(svgElement.childNodes[0].nodeName, 'circle')
    assert.strictEqual(svgElement.childNodes[1].nodeName, 'circle')
    assert.strictEqual(svgElement.childNodes[2].nodeName, '#text')
  })
})

describe('remove', function () {
  /** @type {Element} */
  let svgElement, rect

  this.beforeEach(function () {
    const svgDoc = createSVGDocument()
    svgElement = svgDoc.documentElement
    svgElement.innerHTML = '<rect width="10" height="1in"/>'
    rect = svgElement.children[0]
  })

  it('removes the node', function () {
    rect.remove()
    assert.strictEqual(svgElement.children.length, 0)
  })
})
