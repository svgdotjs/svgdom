# svgdom

> Straightforward DOM implementation to make SVG.js run headless on Node.js
 
This dom implementation was written for svg.js only. It is neither complete nor does it strictly follows the standards.
It just has enough to make svg.js work on nodejs.

**The first version of svg.js which works with svgdom is [svg.js v2.5.1](https://github.com/svgdotjs/svg.js/tree/2.5.1)**

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

## Limitations
Almost all functions of svg.js work properly with svgdom. However there are a few known limitations:

- calculating text length and text bounding boxes is not possible. It would require to load the fontfile and parse the glyphs which is not implemented yet. For the time beeing don't use `text.move()` (you can use `text.attr('y')` instead) and `text.length()`
- `SVG.select()` does not support css pseudo classes. However all other features do work.

This issues might be solved in feature releases.


## Using svgdom in your own projects

Albeit this dom implementation aims to work with svgjs, it is of course possible to use it in your own projects.
Keep in mind, that some functions are just not needed in svgjs and therefore not implemented.
If you need a certain feature don't hesistate to open an issue or submit a pull request.

Last thing to say: **childNodes is an array!**