/* global describe, it */

import { createSVGWindow } from '../main-module.js'
import assert from 'assert'
import { getSegments } from '../src/utils/bboxUtils.js'

describe('unescape-bbox', () => {
  it("bbox('<').x should be less then bbox('WW') ", () => {
    const svgDoc = createSVGWindow().document
    const svgRoot = svgDoc.documentElement
    const textLt = svgDoc.createElement('text')
    textLt.textContent = '<'
    const textWW = svgDoc.createElement('text')
    textWW.textContent = 'W'
    svgRoot.appendChild(textLt)
    svgRoot.appendChild(textWW)
    const bboxLt = getSegments(textLt).bbox()
    const bboxWW = getSegments(textWW).bbox()
    assert(bboxLt.width < bboxWW.width)
  })
})
