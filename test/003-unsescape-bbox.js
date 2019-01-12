/* global describe, it */

import svgdom from '../dom'
import assert from 'assert'
const getPointCloud = require('../utils/bboxUtils')

describe('unescape-bbox', () => {
  it(" bbox('<').x should be less then bbox('WW') ", () => {
    var svgDoc = new svgdom.constructor().document
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
