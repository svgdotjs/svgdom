import assert from 'node:assert/strict'
import { createSVGDocument } from '../main-module.js'

describe('Node.contains', () => {
  it('handles self, descendants, detached nodes, and null', () => {
    const document = createSVGDocument()
    const root = document.documentElement
    const group = document.createElement('g')
    const rect = document.createElement('rect')
    const detached = document.createElement('circle')
    root.appendChild(group)
    group.appendChild(rect)

    assert.equal(root.contains(root), true)
    assert.equal(root.contains(group), true)
    assert.equal(root.contains(rect), true)
    assert.equal(group.contains(root), false)
    assert.equal(root.contains(detached), false)
    assert.equal(root.contains(null), false)
  })
})
