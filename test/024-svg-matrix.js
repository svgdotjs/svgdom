import assert from 'node:assert/strict'
import { SVGMatrix, SVGPoint } from '../main-module.js'

const transformed = (matrix, x = 0, y = 0) => {
  const point = new SVGPoint()
  point.x = x
  point.y = y
  return point.matrixTransform(matrix)
}

const closeTo = (actual, expected) =>
  assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} != ${expected}`)

describe('SVGMatrix', () => {
  it('rotates around a center with a zero x coordinate', () => {
    const point = transformed(new SVGMatrix().rotate(90, 0, 10))

    closeTo(point.x, 10)
    closeTo(point.y, 10)
  })

  it('rotates around a center with a zero y coordinate', () => {
    const point = transformed(new SVGMatrix().rotate(90, 10, 0))

    closeTo(point.x, 10)
    closeTo(point.y, -10)
  })

  it('defaults omitted center coordinates to the origin', () => {
    const point = transformed(new SVGMatrix().rotate(-90), 2, 3)

    closeTo(point.x, 3)
    closeTo(point.y, -2)
  })

  it('preserves preceding transforms when rotating around a zero coordinate', () => {
    const matrix = new SVGMatrix().translate(5, 7).rotate(90, 0, 10)
    const point = transformed(matrix)

    closeTo(point.x, 15)
    closeTo(point.y, 17)
  })
})
