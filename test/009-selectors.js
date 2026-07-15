// @ts-check

import assert from 'assert'
import { CssQuery } from '../src/other/CssQuery.js'
import { describe, it } from 'mocha'
import { createHTMLDocument } from '../main-module.js'

const document = createHTMLDocument()

describe('CssQuery - Single Selector', function () {
  it('parses a simple selector', function () {
    const query = new CssQuery('div')

    const trueCase = document.createElement('div')
    const falseCase = document.createElement('span')

    assert.ok(query.matches(trueCase))
    assert.ok(!query.matches(falseCase))
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
    const children = Array.from({ length: 5 }, () => document.createElement('span'))
    children.forEach(child => parent.appendChild(child))

    assert.ok(children.every(child => new CssQuery(':nth-child(n)').matches(child)))
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
