import assert from 'assert'
import { describe, it } from 'mocha'
import { createSVGWindow, CSSStyleDeclaration } from '../main-module.js'

const createElement = () => {
  const window = createSVGWindow()
  return {
    element: window.document.createElementNS('http://www.w3.org/2000/svg', 'rect'),
    window
  }
}

describe('CSSStyleDeclaration', function () {
  it('exposes a CSSStyleDeclaration through Element.style', function () {
    const { element, window } = createElement()

    assert(element.style instanceof CSSStyleDeclaration)
    assert.strictEqual(window.CSSStyleDeclaration, CSSStyleDeclaration)
    assert.strictEqual(Object.prototype.toString.call(element.style), '[object CSSStyleDeclaration]')
    assert.strictEqual(element.style.parentRule, null)
  })

  it('preserves URLs, data URLs, and quoted separators', function () {
    const { element } = createElement()
    element.setAttribute('style', [
      'background-image: url("https://example.com/a.svg#paint")',
      '--data-image: url("data:image/svg+xml;charset=utf-8,<svg></svg>")',
      '--label: "left:right; top"'
    ].join('; '))

    assert.strictEqual(
      element.style.getPropertyValue('background-image'),
      'url("https://example.com/a.svg#paint")'
    )
    assert.strictEqual(
      element.style.getPropertyValue('--data-image'),
      'url("data:image/svg+xml;charset=utf-8,<svg></svg>")'
    )
    assert.strictEqual(element.style.getPropertyValue('--label'), '"left:right; top"')
  })

  it('respects escapes, comments, and nested functions while parsing', function () {
    const { element } = createElement()
    const complex = 'fn("escaped\\";:value", nested(a; b:c), /* ; : */ tail)'

    element.style.cssText = [
      `--complex: ${complex}`,
      '/* a comment containing ; and : */ fill: rgb(1; 2; nested(3:4))',
      'stroke: black /* another ; comment: */'
    ].join('; ')

    assert.strictEqual(element.style.getPropertyValue('--complex'), complex)
    assert.strictEqual(element.style.getPropertyValue('fill'), 'rgb(1; 2; nested(3:4))')
    assert.strictEqual(element.style.getPropertyValue('stroke'), 'black /* another ; comment: */')
  })

  it('preserves case-sensitive custom properties and normalizes standard names', function () {
    const { element } = createElement()

    element.style.setProperty('--Theme', 'dark')
    element.style.setProperty('--theme', 'light')
    element.style.backgroundColor = 'red'

    assert.strictEqual(element.style.getPropertyValue('--Theme'), 'dark')
    assert.strictEqual(element.style.getPropertyValue('--theme'), 'light')
    assert.strictEqual(element.style.getPropertyValue('--THEME'), '')
    assert.strictEqual(element.style.item(2), 'background-color')
    assert.match(element.style.cssText, /background-color: red;/)
  })

  it('tracks priorities separately and serializes important declarations', function () {
    const { element } = createElement()

    element.style.cssText = 'fill: red ! /* comment */ IMPORTANT; stroke: blue'

    assert.strictEqual(element.style.getPropertyValue('fill'), 'red')
    assert.strictEqual(element.style.getPropertyPriority('fill'), 'important')
    assert.strictEqual(element.style.cssText, 'fill: red !important; stroke: blue;')

    element.style.setProperty('stroke', 'green', 'IMPORTANT')
    assert.strictEqual(element.style.getPropertyValue('stroke'), 'green')
    assert.strictEqual(element.style.getPropertyPriority('stroke'), 'important')
    assert.strictEqual(element.style.cssText, 'fill: red !important; stroke: green !important;')

    element.style.setProperty('stroke', 'black', 'invalid')
    assert.strictEqual(element.style.getPropertyValue('stroke'), 'green')
  })

  it('enumerates in declaration order and keeps replacements in place', function () {
    const { element } = createElement()
    const style = element.style
    style.cssText = 'fill: red; stroke: black; opacity: 0.5'

    assert.strictEqual(style.length, 3)
    assert.strictEqual(style[0], 'fill')
    assert.strictEqual(style[1], 'stroke')
    assert.strictEqual(style.item(2), 'opacity')
    assert.strictEqual(style.item(3), '')

    style.setProperty('stroke', 'blue', 'important')
    assert.deepStrictEqual([ style[0], style[1], style[2] ], [ 'fill', 'stroke', 'opacity' ])

    assert.strictEqual(style.removeProperty('fill'), 'red')
    assert.deepStrictEqual([ style[0], style[1] ], [ 'stroke', 'opacity' ])
    assert.strictEqual(style.length, 2)

    style.setProperty('fill', 'green')
    assert.deepStrictEqual([ style[0], style[1], style[2] ], [ 'stroke', 'opacity', 'fill' ])
  })

  it('collapses duplicate declarations using CSS priority and source order', function () {
    const { element } = createElement()
    element.style.cssText = 'fill: red !important; stroke: black; fill: blue; opacity: 1'

    assert.strictEqual(element.style.getPropertyValue('fill'), 'red')
    assert.strictEqual(element.style.getPropertyPriority('fill'), 'important')
    assert.deepStrictEqual(
      [ element.style[0], element.style[1], element.style[2] ],
      [ 'stroke', 'fill', 'opacity' ]
    )
  })

  it('removes empty values and returns removed property values', function () {
    const { element } = createElement()
    const style = element.style

    style.setProperty('fill', 'red')
    style.setProperty('stroke', 'black')
    style.setProperty('fill', '')

    assert.strictEqual(style.getPropertyValue('fill'), '')
    assert.strictEqual(style.length, 1)
    assert.strictEqual(style.removeProperty('stroke'), 'black')
    assert.strictEqual(style.removeProperty('stroke'), '')
    assert.strictEqual(style.length, 0)
    assert.strictEqual(style.cssText, '')
    assert.strictEqual(element.getAttribute('style'), '')
  })

  it('stays synchronized with direct style attribute updates', function () {
    const { element } = createElement()
    const style = element.style

    element.setAttribute('style', '--Token: "a:b; c"; fill: none !important')
    assert.strictEqual(style.length, 2)
    assert.strictEqual(style.getPropertyValue('--Token'), '"a:b; c"')

    element.setAttribute('style', 'stroke: blue')
    assert.strictEqual(style.length, 1)
    assert.strictEqual(style[0], 'stroke')
    assert.strictEqual(style.getPropertyValue('--Token'), '')
  })
})
