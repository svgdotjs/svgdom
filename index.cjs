const fs = require('fs')
// const a = require('.')
const { SVG, registerWindow } = require('../svg.js/dist/svg.node.cjs')

const main = async () => {
  const { createSVGWindow, config } = await import('./main-module.js')

  config
    .setFontDir('./fonts')
    .setFontFamilyMappings({ OpenSans: 'OpenSans-Regular.ttf' })
    .preloadFonts()

  // fs.readFile('./squares.svg', 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err)
  //     return
  //   }
  //   const window = createSVGWindow()
  //   const document = window.document
  //   registerWindow(window, document)
  //   const svgDoc = SVG(document.documentElement)
  //   svgDoc.svg(data)
  //   const mygroup = svgDoc.findOne('#layer1')
  //   console.log(mygroup.svg())
  //   console.log(mygroup.cx(), mygroup.cy())
  // })

  // const { createSVGWindow, setFontDir, setFontFamilyMappings } = require('./main-require.cjs')
  // const svgjs = require('../svg.js/dist/svg.node.js')

  // const { SVG, registerWindow } = svgjs

  const window = createSVGWindow()
  const document = window.document

  // setFontDir('./fonts')
  // setFontFamilyMappings({
  //   Calibri2: 'calibri.ttf',
  //   Arial2: 'arial.ttf',
  //   Comic2: 'comic.ttf',
  //   Coop2: 'COOPBL.TTF',
  //   Finale2: 'FinaleCopyistText.ttf',
  //   Free2: 'FREESCPT.TTF',
  //   Georgia2: 'georgia.ttf'
  // })

  registerWindow(window, document)

  const canvas = SVG(document.documentElement)
    .size(2000, 1000)
    .viewbox(-300, -300, 2000, 1000)

  canvas.rect(100, 100).move(200, 100).size(200)

  console.log(canvas.svg())

}
main()
