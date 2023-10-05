# svgdom

> Straightforward DOM implementation to make SVG.js run headless on Node.js

While this dom implementation was designed to run svg.js on node, it now is much more feature complete and can be used by anyone needing an xml, svg or html dom.

## Get started with svg.js v3.x

*for older versions of svg.js checkout older versions of svgdom*

```
npm install @svgdotjs/svg.js svgdom
```

```js
import { createSVGWindow } from 'svgdom'
import { SVG, registerWindow } from '@svgdotjs/svg.js'

// returns a window with a document and an svg root node
const window = createSVGWindow()
const document = window.document

// register window and document
registerWindow(window, document)

// create canvas
const canvas = SVG(document.documentElement)

// use svg.js as normal
canvas.rect(100, 100).fill('yellow').move(50,50)

// get your svg as string
console.log(canvas.svg())
// or
console.log(canvas.node.outerHTML)
```

## Create an HTML Dom or XML Dom

```js
// create HTML window with a document and an html root node
import { createHTMLWindow } from 'svgdom'
const window = createHTMLWindow()

// create XML window with a document and a given xml root node
import { createWindow } from 'svgdom'
const window = createWindow(namespaceURI, rootNode)
// e.g. createWindow('http://www.w3.org/1998/Math/MathML', 'math')
```

## Use svgdom as cjs module

svgdom is used best as esm module. However, if you still require cjs, you have to import the module via the async import function: 

```js
const main = async () => {
    const { createSVGWindow } = await import('svgdom')
}
main()
```

## Fonts

In order to calculate bounding boxes for text the font needs to be loaded first. `svgdom` loads `Open Sans-Regular` by default when no font file for the specified font was found.
The following options must be set in order to load your own fonts:

```js
import { config } from 'svgdom'
config.
    // your font directory
    .setFontDir('./fonts')
    // map the font-family to the file
    .setFontFamilyMappings({'Arial': 'arial.ttf'})
    // you can preload your fonts to avoid the loading delay
    // when the font is used the first time
    .preloadFonts()

// Alternatively you can import the functions itself and use them
const {setFontDir, setFontFamilyMappings, preloadFonts} = require('svgdom')
setFontDir('./fonts')
setFontFamilyMappings({'Arial': 'arial.ttf'})
preloadFonts()
```

## Limitations
Almost all functions of svg.js work properly with svgdom. However there are a few known limitations:

- font properties like bold, italic... are only supported when you explicitely load that font e.g.
    ```js
    setFontFamilyMappings({'Arial-italic': 'arial_italic.ttf'})
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
    - `scope`
- special chars in attribute values: `#` and `.` are allowed but things like `:` or `[]` will break the selector

## Using svgdom in your own projects

Albeit this dom implementation aims to work with svgjs, it is of course possible to use it in your own projects.
Keep in mind, that some functions are just not needed in svgjs and therefore not implemented or tested.
If you need a certain feature don't hesistate to open an issue or submit a pull request.

Last thing to say: **childNodes is an array!** (yet)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ulima.ums%40googlemail.com&lc=US&item_name=SVG.JS&currency_code=EUR&bn=PP-DonationsBF%3Abtn_donate_74x21.png%3ANonHostedGuest) or [![Sponsor](https://img.shields.io/badge/Sponsor-svgdom-green.svg)](https://github.com/sponsors/Fuzzyma)
