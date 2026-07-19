import assert from 'node:assert/strict'
import { createHTMLDocument, createSVGDocument } from '../main-module.js'
import { html } from '../src/utils/namespaces.js'

const voidNames = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]

describe('HTML void-element serialization', () => {
  it('omits end tags for all HTML void elements', () => {
    const document = createHTMLDocument()

    for (const name of voidNames) {
      const element = document.createElement(name)
      element.appendChild(document.createTextNode('ignored'))
      assert.equal(element.outerHTML, `<${name}>`)
    }
  })

  it('closes same-named elements under XML serialization rules', () => {
    const document = createSVGDocument()
    const input = document.createElementNS(html, 'input')

    assert.equal(
      input.outerHTML,
      '<input xmlns="http://www.w3.org/1999/xhtml"></input>'
    )
  })

  it('recognizes prefixed HTML void elements by local name', () => {
    const document = createHTMLDocument()
    const element = document.createElementNS(html, 'h:br')

    assert.equal(element.outerHTML, '<h:br>')
  })
})
