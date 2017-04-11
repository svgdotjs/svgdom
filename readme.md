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
