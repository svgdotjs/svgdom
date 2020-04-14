const { createSVGWindow, setFontDir, setFontFamilyMappings } = require('./main-require.cjs')
const svgjs = require('../svg.js/dist/svg.node.js')

const { SVG, registerWindow } = svgjs

const window = createSVGWindow()
const document = window.document

setFontDir('./fonts')
setFontFamilyMappings({
  Calibri2: 'calibri.ttf',
  Arial2: 'arial.ttf',
  Comic2: 'comic.ttf',
  Coop2: 'COOPBL.TTF',
  Finale2: 'FinaleCopyistText.ttf',
  Free2: 'FREESCPT.TTF',
  Georgia2: 'georgia.ttf'
})

registerWindow(window, document)

const canvas = SVG(document.documentElement)
  .size(2000, 1000)
  .viewbox(-300, -300, 2000, 1000)

canvas.rect(100, 100).move(200, 100).size(200)

console.log(canvas.svg())
