// @ts-check

import assert from 'assert'
import { CssQuery } from '../src/other/CssQuery.js'
import { describe, it } from 'mocha'
import { createHTMLDocument } from '../main-module.js'
import { svg } from '../src/utils/namespaces.js'

const document = createHTMLDocument()

describe('CssQuery - Single Selector', function () {
  it('parses a simple selector', function () {
    const query = new CssQuery('div')

    const trueCase = document.createElement('div')
    const falseCase = document.createElement('span')

    assert.ok(query.matches(trueCase))
    assert.ok(!query.matches(falseCase))
  })

  it('does not mutate tag casing while matching foreign elements', function () {
    const query = new CssQuery('linearGradient')
    const htmlElement = document.createElement('linearGradient')
    const svgElement = document.createElementNS(svg, 'linearGradient')

    assert.ok(query.matches(htmlElement))
    assert.ok(query.matches(svgElement))
    assert.ok(!new CssQuery('lineargradient').matches(svgElement))
  })

  it('parses a simple selector with a class', function () {
    const query = new CssQuery('div.foo')

    const trueCase = document.createElement('div')
    trueCase.setAttribute('class', 'foo')
    const falseCase = document.createElement('div')

    assert.ok(query.matches(trueCase))
    assert.ok(!query.matches(falseCase))
  })

  it('parses a simple selector with an id', function () {
    const query = new CssQuery('div#foo')

    const trueCase = document.createElement('div')
    trueCase.setAttribute('id', 'foo')
    const falseCase = document.createElement('div')

    assert.ok(query.matches(trueCase))
    assert.ok(!query.matches(falseCase))
  })

  it('parses a simple selector with an attribute', function () {
    const query = new CssQuery('div[foo="bar"]')

    const trueCase = document.createElement('div')
    trueCase.setAttribute('foo', 'bar')
    const falseCase = document.createElement('div')

    assert.ok(query.matches(trueCase))
    assert.ok(!query.matches(falseCase))
  })

  it('matches dash-separated and namespaced attribute values', function () {
    const element = document.createElement('div')
    element.setAttribute('lang', 'en-US')
    element.setAttributeNS('urn:example', 'example:href', 'target')

    assert.ok(new CssQuery('[lang|=en]').matches(element))
    assert.ok(!new CssQuery('[lang|=fr]').matches(element))
    assert.ok(new CssQuery('[*|href=target]').matches(element))
    assert.ok(!new CssQuery('[href=target]').matches(element))
  })

  it('parses a simple selector with a pseudo-class', function () {
    const query = new CssQuery('div:first-child')

    const parent = document.createElement('div')
    const trueCase = document.createElement('div')
    const falseCase = document.createElement('span')

    parent.appendChild(trueCase)
    parent.appendChild(falseCase)

    assert.ok(query.matches(trueCase))
    assert.ok(!query.matches(falseCase))
  })

  it('parses a selector with all combined', function () {
    const query = new CssQuery('div.foo#bar[foo="bar"]:first-child')

    const parent = document.createElement('div')
    const trueCase = document.createElement('div')
    trueCase.setAttribute('id', 'bar')
    trueCase.setAttribute('class', 'foo')
    trueCase.setAttribute('foo', 'bar')
    const falseCase = document.createElement('span')

    parent.appendChild(trueCase)
    parent.appendChild(falseCase)

    assert.ok(query.matches(trueCase))
    assert.ok(!query.matches(falseCase))
  })

  it('parses a selector . and # inside attribute', function () {
    const query = new CssQuery('div[foo="bar#baz.blub"]')

    const trueCase = document.createElement('div')
    trueCase.setAttribute('foo', 'bar#baz.blub')
    const falseCase = document.createElement('div')

    assert.ok(query.matches(trueCase))
    assert.ok(!query.matches(falseCase))
  })

  it('counts only elements for child pseudo-classes', function () {
    const parent = document.createElement('div')
    const first = document.createElement('span')
    const second = document.createElement('span')
    const third = document.createElement('span')

    parent.appendChild(document.createTextNode('before'))
    parent.appendChild(first)
    parent.appendChild(document.createComment('between'))
    parent.appendChild(second)
    parent.appendChild(document.createTextNode('between'))
    parent.appendChild(third)
    parent.appendChild(document.createComment('after'))

    assert.ok(new CssQuery(':first-child').matches(first))
    assert.ok(new CssQuery(':last-child').matches(third))
    assert.ok(new CssQuery(':nth-child(2)').matches(second))
    assert.ok(new CssQuery(':nth-last-child(2)').matches(second))
    assert.ok(!new CssQuery(':only-child').matches(first))
  })

  it('matches An+B child formulas', function () {
    const parent = document.createElement('div')
    const children = Array.from({ length: 5 }, () =>
      document.createElement('span')
    )
    children.forEach(child => parent.appendChild(child))

    assert.ok(
      children.every(child => new CssQuery(':nth-child(n)').matches(child))
    )
    assert.ok(new CssQuery(':nth-child(2n + 1)').matches(children[0]))
    assert.ok(new CssQuery(':nth-child(2n + 1)').matches(children[2]))
    assert.ok(!new CssQuery(':nth-child(2n + 1)').matches(children[1]))
    assert.ok(new CssQuery(':nth-child(-n+3)').matches(children[2]))
    assert.ok(!new CssQuery(':nth-child(-n+3)').matches(children[3]))
    assert.ok(new CssQuery(':nth-child(0n+2)').matches(children[1]))
    assert.ok(!new CssQuery(':nth-child(2n/1)').matches(children[1]))
  })

  it('ignores non-elements for only-child and of-type pseudo-classes', function () {
    const parent = document.createElement('div')
    const child = document.createElement('span')

    parent.appendChild(document.createTextNode('before'))
    parent.appendChild(child)
    parent.appendChild(document.createComment('after'))

    assert.ok(new CssQuery(':only-child').matches(child))
    assert.ok(new CssQuery(':only-of-type').matches(child))
    assert.ok(new CssQuery(':first-of-type').matches(child))
    assert.ok(new CssQuery(':last-of-type').matches(child))
    assert.ok(new CssQuery(':nth-of-type(1)').matches(child))
    assert.ok(new CssQuery(':nth-last-of-type(1)').matches(child))
  })

  it('matches child pseudo-classes on an element without a parent', function () {
    const child = document.createElement('span')

    assert.ok(new CssQuery(':first-child').matches(child))
    assert.ok(new CssQuery(':last-child').matches(child))
    assert.ok(new CssQuery(':only-child').matches(child))
    assert.ok(new CssQuery(':nth-child(1)').matches(child))
    assert.ok(new CssQuery(':first-of-type').matches(child))
    assert.ok(new CssQuery(':last-of-type').matches(child))
    assert.ok(new CssQuery(':only-of-type').matches(child))
    assert.ok(new CssQuery(':nth-of-type(1)').matches(child))
  })

  it('matches :is(), :where(), and nested functional pseudo-classes', function () {
    const parent = document.createElement('div')
    const first = document.createElement('span')
    const second = document.createElement('span')

    first.setAttribute('class', 'first')
    second.setAttribute('class', 'second')
    parent.appendChild(first)
    parent.appendChild(second)

    assert.ok(new CssQuery(':is(div, span.first)').matches(first))
    assert.ok(new CssQuery(':where(.first, .second)').matches(second))
    assert.ok(
      new CssQuery('span:is(.first, .second):not(.second):first-child').matches(
        first
      )
    )
    assert.ok(new CssQuery(':not(:is(.first, .second))').matches(parent))
    assert.ok(!new CssQuery(':not(:is(.first, .second))').matches(first))
  })

  it('ignores invalid branches in :is() and :where()', function () {
    const element = document.createElement('div')
    element.setAttribute('class', 'match')

    assert.throws(() => new CssQuery(':unsupported').matches(element))
    assert.ok(new CssQuery(':is(.match, :unsupported)').matches(element))
    assert.ok(new CssQuery(':is(:unsupported, .match)').matches(element))
    assert.ok(new CssQuery(':where(.match, ???)').matches(element))
    assert.ok(!new CssQuery(':is(.missing, ???)').matches(element))
  })

  it('matches :empty without counting comments or document whitespace', function () {
    const empty = document.createElement('div')
    const whitespace = document.createElement('div')
    const comment = document.createElement('div')
    const text = document.createElement('div')
    const child = document.createElement('div')

    whitespace.appendChild(document.createTextNode(' \n\t'))
    comment.appendChild(document.createComment('ignored'))
    text.appendChild(document.createTextNode('content'))
    child.appendChild(document.createElement('span'))

    assert.ok(new CssQuery(':empty').matches(empty))
    assert.ok(new CssQuery(':empty').matches(whitespace))
    assert.ok(new CssQuery(':empty').matches(comment))
    assert.ok(!new CssQuery(':empty').matches(text))
    assert.ok(!new CssQuery(':empty').matches(child))
  })

  it('matches relative selectors with :has()', function () {
    const section = document.createElement('section')
    const image = document.createElement('img')
    const wrapper = document.createElement('div')
    const rect = document.createElement('rect')

    wrapper.appendChild(rect)
    section.appendChild(image)
    section.appendChild(wrapper)

    assert.ok(new CssQuery(':has(> img)').matches(section))
    assert.ok(new CssQuery(':has(rect)').matches(section))
    assert.ok(new CssQuery(':has(> p, > img)').matches(section))
    assert.ok(new CssQuery(':has(> :is(img, rect))').matches(section))
    assert.ok(
      new CssQuery(':not(:has(> rect)):has(:is(img, rect))').matches(section)
    )
    assert.ok(!new CssQuery(':has(> rect)').matches(section))
  })

  it('fails empty :has() selectors without throwing', function () {
    const section = document.createElement('section')
    const child = document.createElement('div')
    const nested = document.createElement('span')
    child.appendChild(nested)
    section.appendChild(child)
    assert.ok(!new CssQuery(':has()').matches(section))
    assert.ok(!new CssQuery(':has( )').matches(section))
    assert.ok(!new CssQuery(':has(.missing,)').matches(section))

    assert.ok(new CssQuery(':has(div:has(span))').matches(section))
  })

  it('matches sibling-relative selectors with :has()', function () {
    const parent = document.createElement('dl')
    const first = document.createElement('dt')
    const second = document.createElement('dt')

    parent.appendChild(first)
    parent.appendChild(document.createTextNode('between'))
    parent.appendChild(second)

    assert.equal(first.nextElementSibling, second)
    assert.equal(second.previousElementSibling, first)
    assert.ok(new CssQuery('dt:has(+ dt)').matches(first))
    assert.ok(new CssQuery('dt:has(~ dt)').matches(first))
    assert.ok(!new CssQuery('dt:has(+ dt)').matches(second))
  })

  it('filters siblings with the of selector in :nth-child()', function () {
    const parent = document.createElement('ul')
    const children = Array.from({ length: 4 }, () =>
      document.createElement('li')
    )

    children[0].setAttribute('class', 'important')
    children[1].setAttribute('hidden', '')
    children[2].setAttribute('class', 'important')
    children[3].setAttribute('hidden', '')
    children.forEach(child => parent.appendChild(child))

    assert.ok(new CssQuery(':nth-child(2 of .important)').matches(children[2]))
    assert.ok(!new CssQuery(':nth-child(2 of .important)').matches(children[0]))
    assert.ok(
      new CssQuery(':nth-last-child(1 of :not([hidden]))').matches(children[2])
    )
    assert.ok(
      !new CssQuery(':nth-last-child(1 of :not([hidden]))').matches(children[3])
    )
  })
})

describe('CssQuery - Multiple Selectors', function () {
  it('parses a simple selector list', function () {
    const query = new CssQuery('div, span')

    const trueCase = document.createElement('div')
    const trueCase2 = document.createElement('span')
    const falseCase = document.createElement('p')

    assert.ok(query.matches(trueCase))
    assert.ok(query.matches(trueCase2))
    assert.ok(!query.matches(falseCase))
  })

  it('parses a simple selector list with a class', function () {
    const query = new CssQuery('div.foo, span')

    const trueCase = document.createElement('div')
    trueCase.setAttribute('class', 'foo')
    const trueCase2 = document.createElement('span')
    const falseCase = document.createElement('p')

    assert.ok(query.matches(trueCase))
    assert.ok(query.matches(trueCase2))
    assert.ok(!query.matches(falseCase))
  })

  it('parses a simple selector list with an id', function () {
    const query = new CssQuery('div#foo, span')

    const trueCase = document.createElement('div')
    trueCase.setAttribute('id', 'foo')
    const trueCase2 = document.createElement('span')
    const falseCase = document.createElement('p')

    assert.ok(query.matches(trueCase))
    assert.ok(query.matches(trueCase2))
    assert.ok(!query.matches(falseCase))
  })

  it('parses a simple selector list with an attribute', function () {
    const query = new CssQuery('div[foo="bar"], span')

    const trueCase = document.createElement('div')
    trueCase.setAttribute('foo', 'bar')
    const trueCase2 = document.createElement('span')
    const falseCase = document.createElement('p')

    assert.ok(query.matches(trueCase))
    assert.ok(query.matches(trueCase2))
    assert.ok(!query.matches(falseCase))
  })

  it('parses a simple selector list with a pseudo-class', function () {
    const query = new CssQuery('div:first-child, span')

    const parent = document.createElement('div')
    const trueCase = document.createElement('div')
    const trueCase2 = document.createElement('span')
    const falseCase = document.createElement('p')

    parent.appendChild(trueCase)
    parent.appendChild(trueCase2)
    parent.appendChild(falseCase)

    assert.ok(query.matches(trueCase))
    assert.ok(query.matches(trueCase2))
    assert.ok(!query.matches(falseCase))
  })

  it('parses a selector list with all combined', function () {
    const query = new CssQuery('div.foo#bar[foo="bar"]:first-child, span')

    const parent = document.createElement('div')
    const trueCase = document.createElement('div')
    trueCase.setAttribute('id', 'bar')
    trueCase.setAttribute('class', 'foo')
    trueCase.setAttribute('foo', 'bar')
    const trueCase2 = document.createElement('span')
    const falseCase = document.createElement('p')

    parent.appendChild(trueCase)
    parent.appendChild(trueCase2)
    parent.appendChild(falseCase)

    assert.ok(query.matches(trueCase))
    assert.ok(query.matches(trueCase2))
    assert.ok(!query.matches(falseCase))
  })

  it('parses a selector list with all combined and a class', function () {
    const query = new CssQuery('div.foo#bar[foo="bar"]:first-child, span.blub')

    const parent = document.createElement('div')
    const trueCase = document.createElement('div')
    trueCase.setAttribute('id', 'bar')
    trueCase.setAttribute('class', 'foo')
    trueCase.setAttribute('foo', 'bar')
    const trueCase2 = document.createElement('span')
    trueCase2.setAttribute('class', 'blub')
    const falseCase = document.createElement('p')

    parent.appendChild(trueCase)
    parent.appendChild(trueCase2)
    parent.appendChild(falseCase)

    assert.ok(query.matches(trueCase))
    assert.ok(query.matches(trueCase2))
    assert.ok(!query.matches(falseCase))
  })
})
