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

## Intentional DOM deviations

svgdom favors a small, convenient API for headless SVG use over complete browser DOM conformance. In particular:

- `document.createElement(name)` inherits the document namespace. For example, `createSVGDocument().createElement('rect')` creates an `SVGRectElement` in the SVG namespace. In a browser XML DOM, `createElement()` creates an element without a namespace and `createElementNS()` is required instead. Use `createElementNS()` when the namespace must be explicit.
- HTML behavior is inferred from the document namespace. A document whose namespace is `http://www.w3.org/1999/xhtml` receives HTML name casing, case-insensitive HTML type selectors, HTML void-element serialization, and the HTML restriction on CDATA. This also means that `createDocument(HTML_NAMESPACE, 'html')` is treated like an HTML document for these operations, whereas the browser DOM specifies an XML document.
- svgdom does not currently implement the forgiving HTML parsing algorithm. `HTMLParser` and `innerHTML` use a strict XML parser, so markup must be well-formed and HTML tag-soup recovery, optional end tags, and similar parsing behavior are not supported.

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
    - `empty`
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
    - `has`
    - `is`
    - `root`
    - `not`
    - `matches`
    - `scope`
    - `where`
  The `nth-child` and `nth-last-child` pseudo classes also support the `of <selector>` syntax.
- attribute values containing `]` are not currently parsed correctly in selectors, even when quoted

## Using svgdom in your own projects

Albeit this dom implementation aims to work with svgjs, it is of course possible to use it in your own projects.
Keep in mind, that some functions are just not needed in svgjs and therefore not implemented or tested.
If you need a certain feature don't hesistate to open an issue or submit a pull request.

Last thing to say: **childNodes is an array!** (yet)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=ulima.ums%40googlemail.com&lc=US&item_name=SVG.JS&currency_code=EUR&bn=PP-DonationsBF%3Abtn_donate_74x21.png%3ANonHostedGuest) or [![Sponsor](https://img.shields.io/badge/Sponsor-svgdom-green.svg)](https://github.com/sponsors/Fuzzyma)
