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
