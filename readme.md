# svgdom

> Straightforward DOM implementation to make SVG.js run headless on Node.js
 
This dom implementation was written for svg.js only. It is neither complete nor does it strictly follows the standards.
It just has enough to make svg.js work on nodejs.

## Get started

```
npm install svg.js svgdom
```

```js
// returns a window with a document and an svg root node
const window   = require('svgdom')
const SVG      = require('svg.js')(window)
const document = window.document

// create svg.js instance
const draw = SVG(document.documentElement)

// use svg.js as normal
draw.rect(100,100).fill('yellow').move(50,50)

// get your svg as string
console.log(draw.svg())
// or
console.log(draw.node.outerHtml)
```

## Don't use visual functions

functions like `el.bbox()` or `el.rbox()` do not work correctly and return an empty box.
Thats because svgdom can't calculate the boxes at this point.
Same goes for `el.screenCTM()` and `ctm.el()`.