# svgdom

> Straightforward DOM implementation to make SVG.js run headless on Node.js

This dom implementation was written for svg.js only. It is neither complete nor does it strictly follows the standards.
It just has enough to make svg.js work on nodejs.


## Get started with svg.js v2.5

```
npm install svg.js svgdom
```

```js
// returns a window with a document and an svg root node
const window   = require('svgdom')
const SVG      = require('svg.js')(window)
const document = window.document

// create svg.js instance
const canvas = SVG(document.documentElement)

// use svg.js as normal
canvas.rect(100,100).fill('yellow').move(50,50)

// get your svg as string
console.log(canvas.svg())
// or
console.log(canvas.node.outerHTML)
```

## Get started with svg.js v3.0

```
npm install @svgdotjs/svg.js svgdom
```

```js
// returns a window with a document and an svg root node
const window = require('../svgdom')
const document = window.document
const {SVG, registerWindow} = require('@svgdotjs/svg.js')

// register window and document
registerWindow(window , window.document)

// create canvas
const canvas = SVG(document.documentElement)

// use svg.js as normal
canvas.rect(100,100).fill('yellow').move(50,50)

// get your svg as string
console.log(canvas.svg())
// or
console.log(canvas.node.outerHTML)
```

The esm and node version of svg.js do not export a global SVG object anymore. Instead every property which was once available through the global SVG is now available via import/require.
So if you need e.g. extend, you would use `const {SVG, registerWindow, extend} = require('@svgdotjs/svg.js')`.

If you want the old object bag, you can simply build it yourself:
```js
const obj = require('@svgdotjs/svg.js')
const SVG = (arg) => {
  return obj.SVG(arg)
}

Object.assign(SVG, obj)
```

## Fonts

In order to calculate bounding boxes for text the font needs to be loaded first. `svgdom` loads `OpenSans-Regular` by default when no font file for the specified font was found.
The following options must be set in order to load your own fonts:

```js
const window = require(svgdom)
    // your font directory
    .setFontDir('./fonts')
    // map the font-family to the file
    .setFontFamilyMappings({'Arial': 'arial.ttf'})
    // you can preload your fonts to avoid the loading delay
    // when the font is used the first time
    .preloadFonts()
```

## Limitations
Almost all functions of svg.js work properly with svgdom. However there are a few known limitations:

- font properties like bold, italic... are only supported when you explicitely load that font e.g.
    ```js
    window.setFontFamilyMappings({'Arial-italic': 'arial_italic.ttf'})
    ```
- `querySelector` only supports the following pseudo classes:
    - `first-child`
    - `last-child`
    - `nth-child`
    - `nth-last-child`
    - `first-of-type`
    - `last-of-type`
    - `nth-of-type`
    - `nth-last-of-type`
    - `only-child`
    - `only-of-type`
    - `root`
    - `not`
    - `matches`

## Using svgdom in your own projects

Albeit this dom implementation aims to work with svgjs, it is of course possible to use it in your own projects.
Keep in mind, that some functions are just not needed in svgjs and therefore not implemented.
If you need a certain feature don't hesistate to open an issue or submit a pull request.

Last thing to say: **childNodes is an array!**
