import assert from 'assert'
import { describe, it } from 'mocha'
import { createSVGDocument } from '../main-module.js'

describe('path bbox', () => {
  it('includes extrema from nearly quadratic cubic curves', () => {
    const document = createSVGDocument()
    const path = document.createElement('path')
    path.setAttribute(
      'd',
      'M126.32 126.32C155.22 97.43 155.22 50.57 126.32 21.67C97.42 -7.22 50.57 -7.22 21.67 21.67C-7.22 50.57 -7.22 97.43 21.67 126.32C50.57 155.22 97.42 155.22 126.32 126.32Z'
    )

    const box = path.getBBox()

    assert(Math.abs(box.x - 0.0025) < 1e-9)
    assert(Math.abs(box.y - 0.0025) < 1e-9)
    assert(Math.abs(box.width - 147.9925) < 1e-9)
    assert(Math.abs(box.height - 147.9925) < 1e-9)
  })
})
