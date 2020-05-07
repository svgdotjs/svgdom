/* global describe, it */

import { createSVGDocument } from '..'
import assert from 'assert'
const getPointCloud = require('../src/utils/bboxUtils')

describe('unescape-bbox', () => {
  it(" bbox('<').x should be less then bbox('WW') ", () => {
    var svgDoc = createSVGDocument()
    var svgRoot = svgDoc.documentElement
    var textLt = svgDoc.createElement('text')
    textLt.textContent = '<'
    var textWW = svgDoc.createElement('text')
    textWW.textContent = 'W'
    svgRoot.appendChild(textLt)
    svgRoot.appendChild(textWW)
    var bboxLt = getPointCloud(textLt).bbox()
    var bboxWW = getPointCloud(textWW).bbox()
    assert(bboxLt.width < bboxWW.width)
  })
})
