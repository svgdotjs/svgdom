import assert from 'node:assert/strict'
import {
  InvalidSelectorError,
  parseSelector
} from '../src/other/css/selectorParser.js'
import { CssQuery } from '../src/other/CssQuery.js'

describe('selector parser', () => {
  it('produces a matching-independent selector representation', () => {
    const [selector] = parseSelector('svg > g.item[data-id="1" i]:first-child')

    assert.equal(selector.length, 2)
    assert.equal(selector[0][1].tag, 'svg')
    assert.equal(selector[1][0], '>')
    assert.deepEqual(selector[1][1].classList, ['item'])
    assert.deepEqual(selector[1][1].attrs[0], {
      prefix: null,
      name: 'data-id',
      operator: '=',
      value: '1',
      insensitive: true
    })
    assert.deepEqual(selector[1][1].pseudos, [
      { name: 'first-child', argument: '' }
    ])
  })

  it('supports forgiving selector-list parsing explicitly', () => {
    assert.equal(parseSelector('.valid, ???', { forgiving: true }).length, 1)
    assert.throws(() => parseSelector('.valid, ???'), InvalidSelectorError)
  })

  it('rejects malformed combinators while allowing relative selectors', () => {
    for (const selector of ['> rect', 'g>>rect', 'g >', 'g, > rect']) {
      assert.throws(() => parseSelector(selector), InvalidSelectorError)
    }

    const [relative] = parseSelector('> rect', { relative: true })
    assert.equal(relative[0][0], '>')
    assert.equal(relative[0][1].tag, 'rect')
  })

  it('validates unsupported pseudo-classes when compiling a query', () => {
    assert.throws(() => new CssQuery(':unsupported'), InvalidSelectorError)
  })

  it('bounds the shared parsed-selector cache', () => {
    CssQuery.cache.clear()
    for (let index = 0; index < 75; index++) new CssQuery(`item-${index}`)

    assert.equal(CssQuery.cache.size, 50)
    assert.equal(CssQuery.cache.has('item-0'), false)
    assert.equal(CssQuery.cache.has('item-74'), true)
  })
})
