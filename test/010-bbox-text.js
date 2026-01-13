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

  it("applies dy before calculating bbox", () => {
    const svgDoc = createSVGWindow().document
    const text = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.style.fontSize = '16px'
    text.setAttribute('y', '20')
    text.textContent = 'x'
    svgDoc.documentElement.appendChild(text)

    const text2 = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text')
    text2.style.fontSize = '16px'
    const tspan = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'tspan')
    tspan.setAttribute('dy', '20')
    tspan.textContent = 'x'
    text2.appendChild(tspan)
    svgDoc.documentElement.appendChild(text2)

    assert(Math.abs(text.getBBox().y - text2.getBBox().y) < 1)
  })
})
