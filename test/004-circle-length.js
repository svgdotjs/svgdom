import { createSVGWindow } from '../main-module.js'
import assert from 'assert'
import { SVG, registerWindow } from '@svgdotjs/svg.js'

const window = createSVGWindow()
const document = window.document
registerWindow(window, document)

describe('circle-length', () => {
  it('circumference of circle of radius 49.5 should be close to 99*Math.PI', () => {
    const canvas = SVG(document.documentElement)
    const circle = canvas.path(
      'M0.5 50a49.5 49.5 0 1 0 99 0 49.5 49.5 0 1 0-99 0'
    )
    const len = circle.length()
    assert(Math.abs(len - 99 * Math.PI) < 0.0005)
  })
})

describe('arc-length', () => {
  const paths = [
    'M 216.1027854225359 271.1209756706295 A 46.283096266347606 28.725390201836586 2.166914683186652 0 1 287.49723659993464 261.4021001840497',
    'M 164.16806031012334 277.88997477304815 A 112.78408575681235 76.52010425131027 -175.93248043341987 1 1 158.42630883977398 299.49871866124164',
    'M 0 0 A 10 10 0 0 0 100 251'
  ]

  for (const path of paths) {
    it('calculates a finite length without overflowing the call stack', () => {
      const element = document.createElement('path')
      element.setAttribute('d', path)

      const length = element.getTotalLength()

      assert(Number.isFinite(length))
      assert(length > 0)
    })
  }
})
