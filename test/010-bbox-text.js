import { createSVGWindow } from "../main-module.js"
import assert from 'assert'
import { getSegments } from "../src/utils/bboxUtils.js"

describe('bbox-text', () => {
  it("text doesn't return NaN in Box values", () => {
    const svgDoc = createSVGWindow().document
    const svgRoot = svgDoc.documentElement
    const text = svgDoc.createElement('text')
    text.style.fontSize = '16px';
    text.textContent = 'F'

    svgRoot.appendChild(text)
    const bboxText = getSegments(text).bbox();
    
    ['left', 'x', 'top', 'y', 'width', 'height', 'right', 'bottom'].forEach((property) => {
      assert(!isNaN(bboxText[property]));
    })
  })
})
