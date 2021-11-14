/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dirname.cjs":
/*!******************************************!*\
  !*** external "./src/utils/dirname.cjs" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("./src/utils/dirname.cjs");

/***/ }),

/***/ "fontkit":
/*!**************************!*\
  !*** external "fontkit" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("fontkit");

/***/ }),

/***/ "image-size":
/*!*****************************!*\
  !*** external "image-size" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("image-size");

/***/ }),

/***/ "sax":
/*!**********************!*\
  !*** external "sax" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("sax");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setFontDir": () => (/* binding */ setFontDir),
/* harmony export */   "setFontFamilyMappings": () => (/* binding */ setFontFamilyMappings),
/* harmony export */   "preloadFonts": () => (/* binding */ preloadFonts),
/* harmony export */   "getConfig": () => (/* binding */ getConfig),
/* harmony export */   "getFonts": () => (/* binding */ getFonts),
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var fontkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fontkit */ "fontkit");



const _config = {}
const fonts = {}

const setFontDir = function (dir) {
  _config.fontDir = dir
  return this
}

const setFontFamilyMappings = function (map) {
  _config.fontFamilyMappings = map
  return this
}

// TODO: make async
const preloadFonts = () => {
  var map = _config.fontFamilyMappings

  for (const [ font, file ] of Object.entries(map)) {
    const filename = path__WEBPACK_IMPORTED_MODULE_0__.join(_config.fontDir, file)

    try {
      fonts[font] = fontkit__WEBPACK_IMPORTED_MODULE_1__.openSync(filename)
    } catch (e) {
      console.warn(`Could not load font file for ${font}`, e)
    }
  }
  return undefined
}

const getConfig = () => _config
const getFonts = () => fonts

const config = {
  setFontDir,
  setFontFamilyMappings,
  preloadFonts,
  getConfig,
  getFonts
}


/***/ }),

/***/ "./src/dom/Attr.js":
/*!*************************!*\
  !*** ./src/dom/Attr.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Attr": () => (/* binding */ Attr)
/* harmony export */ });
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node.js */ "./src/dom/Node.js");
/* harmony import */ var _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/namespaces.js */ "./src/utils/namespaces.js");



class Attr extends _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node {
  constructor (name, props, ns) {
    super(name, { nodeValue: '', ...props }, ns)

    // Follow spec and lowercase nodeName for html
    this.nodeName = ns === _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_1__.html ? name.toLowerCase() : name
    this.nodeType = _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node.ATTRIBUTE_NODE
    this.ownerElement = null
  }

  get value () {
    return this.nodeValue
  }

  set value (val) {
    this.nodeValue = val
  }

  get name () {
    return this.nodeName
  }
}


/***/ }),

/***/ "./src/dom/CharacterData.js":
/*!**********************************!*\
  !*** ./src/dom/CharacterData.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CharacterData": () => (/* binding */ CharacterData)
/* harmony export */ });
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node.js */ "./src/dom/Node.js");
/* harmony import */ var _utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/objectCreationUtils.js */ "./src/utils/objectCreationUtils.js");
/* harmony import */ var _mixins_NonDocumentTypeChildNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/NonDocumentTypeChildNode.js */ "./src/dom/mixins/NonDocumentTypeChildNode.js");
/* harmony import */ var _mixins_ChildNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mixins/ChildNode.js */ "./src/dom/mixins/ChildNode.js");





class CharacterData extends _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node {
  constructor (name, props) {
    super(name, props)

    this.data = this.nodeValue
  }

  appendData (data) {
    this.data += data
  }

  deleteData (offset, count) {
    this.data = this.data.slice(0, offset) + this.data.slice(0, offset + count)
  }

  insertData (offset, data) {
    this.data = this.data.slice(0, offset) + data + this.data.slice(offset)
  }

  replaceData (offset, count, data) {
    this.deleteData(offset, count)
    this.insertData(offset, data)
  }

  substringData (offset, count) {
    this.data = this.data.substr(offset, count)
  }

  get length () {
    return this.data.length
  }
}

(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_1__.mixin)(_mixins_NonDocumentTypeChildNode_js__WEBPACK_IMPORTED_MODULE_2__.NonDocumentTypeChildNode, CharacterData)
;(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_1__.mixin)(_mixins_ChildNode_js__WEBPACK_IMPORTED_MODULE_3__.ChildNode, CharacterData)


/***/ }),

/***/ "./src/dom/Comment.js":
/*!****************************!*\
  !*** ./src/dom/Comment.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Comment": () => (/* binding */ Comment)
/* harmony export */ });
/* harmony import */ var _CharacterData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CharacterData.js */ "./src/dom/CharacterData.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node.js */ "./src/dom/Node.js");


class Comment extends _CharacterData_js__WEBPACK_IMPORTED_MODULE_0__.CharacterData {
  constructor (name, props) {
    super(name, props)
    this.nodeType = _Node_js__WEBPACK_IMPORTED_MODULE_1__.Node.COMMENT_NODE
  }
}


/***/ }),

/***/ "./src/dom/CustomEvent.js":
/*!********************************!*\
  !*** ./src/dom/CustomEvent.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomEvent": () => (/* binding */ CustomEvent)
/* harmony export */ });
/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Event.js */ "./src/dom/Event.js");

class CustomEvent extends _Event_js__WEBPACK_IMPORTED_MODULE_0__.Event {
  constructor (name, props = {}) {
    super(name)
    this.detail = props.detail || null
    this.cancelable = props.cancelable || false
  }
}


/***/ }),

/***/ "./src/dom/Document.js":
/*!*****************************!*\
  !*** ./src/dom/Document.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOMImplementation": () => (/* binding */ DOMImplementation),
/* harmony export */   "Document": () => (/* binding */ Document)
/* harmony export */ });
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node.js */ "./src/dom/Node.js");
/* harmony import */ var _Comment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comment.js */ "./src/dom/Comment.js");
/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Text.js */ "./src/dom/Text.js");
/* harmony import */ var _Attr_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Attr.js */ "./src/dom/Attr.js");
/* harmony import */ var _DocumentFragment_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DocumentFragment.js */ "./src/dom/DocumentFragment.js");
/* harmony import */ var _html_HTMLLinkElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./html/HTMLLinkElement.js */ "./src/dom/html/HTMLLinkElement.js");
/* harmony import */ var _html_HTMLScriptElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./html/HTMLScriptElement.js */ "./src/dom/html/HTMLScriptElement.js");
/* harmony import */ var _html_HTMLImageElement_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./html/HTMLImageElement.js */ "./src/dom/html/HTMLImageElement.js");
/* harmony import */ var _html_HTMLElement_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./html/HTMLElement.js */ "./src/dom/html/HTMLElement.js");
/* harmony import */ var _mixins_elementAccess_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mixins/elementAccess.js */ "./src/dom/mixins/elementAccess.js");
/* harmony import */ var _utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/objectCreationUtils.js */ "./src/utils/objectCreationUtils.js");
/* harmony import */ var _svg_SVGSVGElement_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./svg/SVGSVGElement.js */ "./src/dom/svg/SVGSVGElement.js");
/* harmony import */ var _svg_SVGPathElement_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./svg/SVGPathElement.js */ "./src/dom/svg/SVGPathElement.js");
/* harmony import */ var _svg_SVGTextContentElement_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./svg/SVGTextContentElement.js */ "./src/dom/svg/SVGTextContentElement.js");
/* harmony import */ var _svg_SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./svg/SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");
/* harmony import */ var _mixins_ParentNode_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./mixins/ParentNode.js */ "./src/dom/mixins/ParentNode.js");
/* harmony import */ var _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../utils/namespaces.js */ "./src/utils/namespaces.js");
/* harmony import */ var _DocumentType_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./DocumentType.js */ "./src/dom/DocumentType.js");
/* harmony import */ var _mixins_NonElementParentNode_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./mixins/NonElementParentNode.js */ "./src/dom/mixins/NonElementParentNode.js");




















function getChildByTagName (parent, name) {
  for (var child = parent.firstChild; child != null; child = child.nextSibling) {
    if (child.nodeType === _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node.ELEMENT_NODE && child.nodeName === name) {
      return child
    }
  }
  return null
}

const getSVGElementForName = (name) => {
  switch (name.toLowerCase()) {
  case 'svg':
    return _svg_SVGSVGElement_js__WEBPACK_IMPORTED_MODULE_11__.SVGSVGElement
  case 'path':
    return _svg_SVGPathElement_js__WEBPACK_IMPORTED_MODULE_12__.SVGPathElement
  case 'text':
  case 'tspan':
  case 'tref':
  case 'altglyph':
  case 'textpath':
    return _svg_SVGTextContentElement_js__WEBPACK_IMPORTED_MODULE_13__.SVGTextContentElement
  default:
    return _svg_SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_14__.SVGGraphicsElement
  }
}

const getHTMLElementForName = (name) => {
  switch (name.toLowerCase()) {
  case 'img':
    return _html_HTMLImageElement_js__WEBPACK_IMPORTED_MODULE_7__.HTMLImageElement
  case 'link':
    return _html_HTMLLinkElement_js__WEBPACK_IMPORTED_MODULE_5__.HTMLLinkElement
  case 'script':
    return _html_HTMLScriptElement_js__WEBPACK_IMPORTED_MODULE_6__.HTMLScriptElement
  default:
    return _html_HTMLElement_js__WEBPACK_IMPORTED_MODULE_8__.HTMLElement
  }
}

const getElementForNamespace = (ns, name) => {
  switch (ns) {
  case _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_16__.svg:
    return getSVGElementForName(name)
  case _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_16__.html:
  case null:
  case '':
  default:
    return getHTMLElementForName(name)
  }
}

// Feature/version pairs that DOMImplementation.hasFeature() returns true for.  It returns false for anything else.
var supportedFeatures = {
  xml: { '': true, '1.0': true, '2.0': true },
  core: { '': true, '2.0': true },
  html: { '': true, '1.0': true, '2.0': true },
  xhtml: { '': true, '1.0': true, '2.0': true } // HTML
}

const DOMImplementation = {
  hasFeature (feature, version) {
    var f = supportedFeatures[(feature || '').toLowerCase()]
    return (f && f[version || '']) || false
  },

  createDocumentType (qualifiedName, publicId, systemId) {
    return new _DocumentType_js__WEBPACK_IMPORTED_MODULE_17__.DocumentType(qualifiedName, { publicId, systemId, ownerDocument: this })
  },

  createDocument (namespace, qualifiedName, doctype) {
    var doc = new Document(namespace)
    if (doctype) {
      if (doctype.ownerDocument) {
        throw new Error('the object is in the wrong Document, a call to importNode is required')
      }
      doctype.ownerDocument = doc
      doc.appendChild(doctype)
    }
    if (qualifiedName) {
      doc.appendChild(doc.createElementNS(namespace, qualifiedName))
    }
    return doc
  },

  createHTMLDocument (titleText = '') {
    const d = new Document(_utils_namespaces_js__WEBPACK_IMPORTED_MODULE_16__.html)
    const root = d.createElement('html')
    const head = d.createElement('head')
    const title = d.createElement('title')
    title.appendChild(d.createTextNode(titleText))
    head.appendChild(title)
    root.appendChild(head)
    root.appendChild(d.createElement('body'))

    d.appendChild(root)
    return d
  }
}

class Document extends _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node {
  constructor (ns) {
    super('#document', {}, ns)
    this.nodeType = _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node.DOCUMENT_NODE
    this.implementation = DOMImplementation
    this.defaultView = null
  }

  // https://dom.spec.whatwg.org/#dom-document-createattribute
  createAttribute (localName) {
    if (this.namespaceURI === _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_16__.html) {
      localName = localName.toLowerCase()
    }
    return this.createAttributeNS(null, localName, true)
  }

  createAttributeNS (ns, qualifiedName, local = false) {
    return new _Attr_js__WEBPACK_IMPORTED_MODULE_3__.Attr(qualifiedName, { ownerDocument: this, local }, ns)
  }

  createComment (text) {
    return new _Comment_js__WEBPACK_IMPORTED_MODULE_1__.Comment('#comment', { nodeValue: text, ownerDocument: this })
  }

  createDocumentFragment (name) {
    return new _DocumentFragment_js__WEBPACK_IMPORTED_MODULE_4__.DocumentFragment('#document-fragment', { ownerDocument: this })
  }

  createElement (localName) {
    return this.createElementNS(this.namespaceURI, localName, true)
  }

  createElementNS (ns, qualifiedName, local = false) {
    const Element = getElementForNamespace(ns, qualifiedName)

    return new Element(qualifiedName, {
      ownerDocument: this,
      local
    }, ns)
  }

  createTextNode (text) {
    return new _Text_js__WEBPACK_IMPORTED_MODULE_2__.Text('#text', { nodeValue: text, ownerDocument: this })
  }

  get compatMode () {
    return 'CSS1Compat' // always be in standards-mode
  }

  get body () {
    return getChildByTagName(this.documentElement, 'BODY')
  }

  get head () {
    return getChildByTagName(this.documentElement, 'HEAD')
  }

  get documentElement () {
    return this.lastChild
  }
}

(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_10__.mixin)(_mixins_elementAccess_js__WEBPACK_IMPORTED_MODULE_9__.elementAccess, Document)
;(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_10__.mixin)(_mixins_ParentNode_js__WEBPACK_IMPORTED_MODULE_15__.ParentNode, Document)
;(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_10__.mixin)(_mixins_NonElementParentNode_js__WEBPACK_IMPORTED_MODULE_18__.NonElementParentNode, Document)


/***/ }),

/***/ "./src/dom/DocumentFragment.js":
/*!*************************************!*\
  !*** ./src/dom/DocumentFragment.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentFragment": () => (/* binding */ DocumentFragment)
/* harmony export */ });
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node.js */ "./src/dom/Node.js");
/* harmony import */ var _utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/objectCreationUtils.js */ "./src/utils/objectCreationUtils.js");
/* harmony import */ var _mixins_elementAccess_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/elementAccess.js */ "./src/dom/mixins/elementAccess.js");
/* harmony import */ var _mixins_ParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mixins/ParentNode.js */ "./src/dom/mixins/ParentNode.js");
/* harmony import */ var _mixins_NonElementParentNode_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mixins/NonElementParentNode.js */ "./src/dom/mixins/NonElementParentNode.js");





class DocumentFragment extends _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node {
  constructor (name, props) {
    super(name, props)
    this.nodeType = _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node.DOCUMENT_FRAGMENT_NODE
  }
}

(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_1__.mixin)(_mixins_elementAccess_js__WEBPACK_IMPORTED_MODULE_2__.elementAccess, DocumentFragment)
;(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_1__.mixin)(_mixins_ParentNode_js__WEBPACK_IMPORTED_MODULE_3__.ParentNode, DocumentFragment)
;(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_1__.mixin)(_mixins_NonElementParentNode_js__WEBPACK_IMPORTED_MODULE_4__.NonElementParentNode, DocumentFragment)


/***/ }),

/***/ "./src/dom/DocumentType.js":
/*!*********************************!*\
  !*** ./src/dom/DocumentType.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentType": () => (/* binding */ DocumentType)
/* harmony export */ });
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node.js */ "./src/dom/Node.js");
/* harmony import */ var _utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/objectCreationUtils.js */ "./src/utils/objectCreationUtils.js");
/* harmony import */ var _mixins_ChildNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/ChildNode.js */ "./src/dom/mixins/ChildNode.js");




class DocumentType extends _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node {
  constructor (name, props) {
    super(name, props)

    this.nodeType = _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node.DOCUMENT_TYPE_NODE
    this.name = name

    const { publicId, systemId } = props
    this.publicId = publicId || ''
    this.systemId = systemId || ''
  }
}

(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_1__.mixin)(_mixins_ChildNode_js__WEBPACK_IMPORTED_MODULE_2__.ChildNode, DocumentType)


/***/ }),

/***/ "./src/dom/Element.js":
/*!****************************!*\
  !*** ./src/dom/Element.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Element": () => (/* binding */ Element)
/* harmony export */ });
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node.js */ "./src/dom/Node.js");
/* harmony import */ var _mixins_ParentNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixins/ParentNode.js */ "./src/dom/mixins/ParentNode.js");
/* harmony import */ var _mixins_elementAccess_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/elementAccess.js */ "./src/dom/mixins/elementAccess.js");
/* harmony import */ var _html_HTMLParser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./html/HTMLParser.js */ "./src/dom/html/HTMLParser.js");
/* harmony import */ var _DocumentFragment_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DocumentFragment.js */ "./src/dom/DocumentFragment.js");
/* harmony import */ var _utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/objectCreationUtils.js */ "./src/utils/objectCreationUtils.js");
/* harmony import */ var _utils_tagUtils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/tagUtils.js */ "./src/utils/tagUtils.js");
/* harmony import */ var _utils_mapUtils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/mapUtils.js */ "./src/utils/mapUtils.js");
/* harmony import */ var _utils_strUtils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/strUtils.js */ "./src/utils/strUtils.js");
/* harmony import */ var _mixins_NonDocumentTypeChildNode_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mixins/NonDocumentTypeChildNode.js */ "./src/dom/mixins/NonDocumentTypeChildNode.js");
/* harmony import */ var _mixins_ChildNode_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mixins/ChildNode.js */ "./src/dom/mixins/ChildNode.js");
/* harmony import */ var _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/namespaces.js */ "./src/utils/namespaces.js");














const validateAndExtract = (ns, name) => {
  let prefix = null
  let localname = name

  if (!ns) ns = null

  if (name.includes(':')) {
    [ prefix, localname ] = name.split(':')
  }

  if (!ns && prefix) {
    throw new Error('Namespace Error')
  }

  if (prefix === 'xml' && ns !== _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_11__.xml) {
    throw new Error('Namespace Error')
  }

  if ((prefix === 'xmlns' || name === 'xmlns') && ns !== _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_11__.xmlns) {
    throw new Error('Namespace Error')
  }

  if (prefix !== 'xmlns' && name !== 'xmlns' && ns === _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_11__.xmlns) {
    throw new Error('Namespace Error')
  }

  return [ ns, prefix, localname ]
}

const getAttributeByNsAndLocalName = (el, ns, localName) => {
  if (!ns) ns = null
  return [ ...el.attrs ].find((node) => node.localName === localName && node.namespaceURI === ns)
}

const getAttributeByQualifiedName = (el, qualifiedName) => {
  if (el.namespaceURI === _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_11__.html && el.ownerDocument.namespaceURI === _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_11__.html) {
    qualifiedName = qualifiedName.toLowerCase()
  }

  return [ ...el.attrs ].find((node) => node.name === qualifiedName)
}

// This Proxy proxies all access to node.style to the css saved in the attribute
const getStyleProxy = (node) => {

  return new Proxy(node, {
    get (target, key) {
      const styles = target.getAttribute('style') || ''
      const styleMap = (0,_utils_mapUtils_js__WEBPACK_IMPORTED_MODULE_7__.cssToMap)(styles)

      if (key === 'cssText') {
        return styles
      }

      if (key === 'setProperty') {
        return function (propertyName, value = '', priority = '') {
          node.style[propertyName] = value + (priority ? ` !${priority}` : '')
        }
      }

      key = (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_8__.decamelize)(key)
      if (!styleMap.has(key)) return ''

      return styleMap.get(key)
    },
    set (target, key, value) {
      key = (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_8__.decamelize)(key)

      if (key === 'css-text') {
        // ensure correct spacing and syntax by converting back and forth
        target.setAttribute('style', (0,_utils_mapUtils_js__WEBPACK_IMPORTED_MODULE_7__.mapToCss)((0,_utils_mapUtils_js__WEBPACK_IMPORTED_MODULE_7__.cssToMap)(value)))
        return true
      } else {
        value = (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_8__.hexToRGB)(value.toString())
        const styles = target.getAttribute('style') || ''
        const styleMap = (0,_utils_mapUtils_js__WEBPACK_IMPORTED_MODULE_7__.cssToMap)(styles)
        styleMap.set(key, value)

        target.setAttribute('style', (0,_utils_mapUtils_js__WEBPACK_IMPORTED_MODULE_7__.mapToCss)(styleMap))

        return true
      }
    }
  })
}

// https://dom.spec.whatwg.org/#dom-element-setattributens
class Element extends _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node {
  constructor (name, props, ns) {
    super(name, props, ns)

    this.style = getStyleProxy(this)
    this.tagName = this.nodeName
  }

  getAttribute (qualifiedName) {
    const attr = this.getAttributeNode(qualifiedName)
    return attr ? attr.value : null
  }

  getAttributeNode (qualifiedName) {
    return getAttributeByQualifiedName(this, qualifiedName)
  }

  getAttributeNodeNS (ns, localName) {
    return getAttributeByNsAndLocalName(this, ns, localName)
  }

  getAttributeNS (ns, localName) {
    const attr = this.getAttributeNodeNS(ns, localName)
    return attr ? attr.value : null
  }

  getBoundingClientRect () {
    throw new Error('Only implemented for SVG Elements')
  }

  hasAttribute (qualifiedName) {
    const attr = this.getAttributeNode(qualifiedName)
    return !!attr
  }

  hasAttributeNS (ns, localName) {
    const attr = this.getAttributeNodeNS(ns, localName)
    return !!attr
  }

  matches (query) {
    return this.matchWithScope(query, this)
  }

  removeAttribute (qualifiedName) {
    const attr = this.getAttributeNode(qualifiedName)
    if (attr) {
      this.removeAttributeNode(attr)
    }
    return attr
  }

  removeAttributeNode (node) {
    if (!this.attrs.delete(node)) throw new Error('Attribute cannot be removed because it was not found on the element')
    return node
  }

  // call is: d.removeAttributeNS('http://www.mozilla.org/ns/specialspace', 'align', 'center');
  removeAttributeNS (ns, localName) {
    const attr = this.getAttributeNodeNS(ns, localName)
    if (attr) {
      this.removeAttributeNode(attr)
    }
    return attr
  }

  /* The setAttribute(qualifiedName, value) method, when invoked, must run these steps:

    If qualifiedName does not match the Name production in XML, then throw an "InvalidCharacterError" DOMException.

    If this is in the HTML namespace and its node document is an HTML document, then set qualifiedName to qualifiedName in ASCII lowercase.

    Let attribute be the first attribute in this’s attribute list whose qualified name is qualifiedName, and null otherwise.

    If attribute is null, create an attribute whose local name is qualifiedName, value is value, and node document is this’s node document, then append this attribute to this, and then return.

    Change attribute to value.
  */
  setAttribute (qualifiedName, value) {
    // We have to do that here because we cannot check if `this` is in the correct namespace
    // when doing it in createAttribute
    if (this.namespaceURI === _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_11__.html && this.ownerDocument.namespaceURI === _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_11__.html) {
      qualifiedName = qualifiedName.toLowerCase()
    }

    let attr = this.getAttributeNode(qualifiedName)
    if (!attr) {
      // Because createAttribute lowercases the attribute in an html doc we have to use createAttributeNS
      attr = this.ownerDocument.createAttributeNS(null, qualifiedName, true)
      this.setAttributeNode(attr)
    }

    attr.value = value
  }

  /*
    Let namespace, prefix, and localName be the result of passing namespace and qualifiedName to validate and extract.

    Set an attribute value for this using localName, value, and also prefix and namespace.

    If prefix is not given, set it to null.
    If namespace is not given, set it to null.
    Let attribute be the result of getting an attribute given namespace, localName, and element.
    If attribute is null, create an attribute whose namespace is namespace, namespace prefix is prefix, local name is localName, value is value, and node document is element’s node document, then append this attribute to element, and then return.

    Change attribute to value.
  */

  setAttributeNode (node) {
    this.attrs.add(node)
    node.ownerElement = this
  }

  // call is: d.setAttributeNS('http://www.mozilla.org/ns/specialspace', 'spec:align', 'center');
  setAttributeNS (namespace, name, value) {

    // eslint-disable-next-line
    const [ ns, prefix, localName ] = validateAndExtract(namespace, name)

    let attr = this.getAttributeNodeNS(ns, localName)
    if (!attr) {
      attr = this.ownerDocument.createAttributeNS(ns, name)
      this.setAttributeNode(attr) // setAttributeNodeNS is a synonym of setAttributeNode
    }

    attr.value = value

    this.attrs.add(attr)
  }

  get attributes () {
    return [ ...this.attrs ]
  }

  get className () {
    return this.getAttribute('class')
  }

  set className (c) {
    this.setAttribute('class', c)
  }

  get id () {
    return this.getAttribute('id') || ''
  }

  set id (id) {
    return this.setAttribute('id', id)
  }

  get innerHTML () {

    return this.childNodes.map(node => {
      if (node.nodeType === _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node.TEXT_NODE) return (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_8__.htmlEntities)(node.data)
      if (node.nodeType === _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node.CDATA_SECTION_NODE) return (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_8__.cdata)(node.data)
      if (node.nodeType === _Node_js__WEBPACK_IMPORTED_MODULE_0__.Node.COMMENT_NODE) return (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_8__.comment)(node.data)
      return node.outerHTML
    }).join('')
  }

  set innerHTML (str) {
    while (this.firstChild) {
      this.removeChild(this.firstChild)
    }
    // The parser adds the html to this
    (0,_html_HTMLParser_js__WEBPACK_IMPORTED_MODULE_3__.HTMLParser)(str, this)
  }

  get outerHTML () {
    return (0,_utils_tagUtils_js__WEBPACK_IMPORTED_MODULE_6__.tag)(this)
  }

  set outerHTML (str) {
    var well = new _DocumentFragment_js__WEBPACK_IMPORTED_MODULE_4__.DocumentFragment()
    ;(0,_html_HTMLParser_js__WEBPACK_IMPORTED_MODULE_3__.HTMLParser)(str, well)
    this.parentNode.insertBefore(well, this)
    this.parentNode.removeChild(this)
  }

}

(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_5__.mixin)(_mixins_ParentNode_js__WEBPACK_IMPORTED_MODULE_1__.ParentNode, Element)
;(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_5__.mixin)(_mixins_elementAccess_js__WEBPACK_IMPORTED_MODULE_2__.elementAccess, Element)
;(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_5__.mixin)(_mixins_NonDocumentTypeChildNode_js__WEBPACK_IMPORTED_MODULE_9__.NonDocumentTypeChildNode, Element)
;(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_5__.mixin)(_mixins_ChildNode_js__WEBPACK_IMPORTED_MODULE_10__.ChildNode, Element)


/***/ }),

/***/ "./src/dom/Event.js":
/*!**************************!*\
  !*** ./src/dom/Event.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Event": () => (/* binding */ Event)
/* harmony export */ });
class Event {
  constructor (type) {
    this.type = type
    this.cancelable = false
    this.defaultPrevented = false
    this.target = null
  }

  preventDefault () {
    if (this.cancelable) {
      this.defaultPrevented = true
    }
  }
}


/***/ }),

/***/ "./src/dom/EventTarget.js":
/*!********************************!*\
  !*** ./src/dom/EventTarget.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventTarget": () => (/* binding */ EventTarget)
/* harmony export */ });
const $ = Symbol('private properties')

class EventTarget {
  constructor () {
    this[$] = {}
    this[$].listeners = {}
  }

  addEventListener (type, callback) {
    if (!(type in this[$].listeners)) {
      this[$].listeners[type] = []
    }
    this[$].listeners[type].push(callback)
  }

  dispatchEvent (event) {
    if (!(event.type in this[$].listeners)) { return true }

    var stack = this[$].listeners[event.type]
    event.target = this

    stack.forEach(function (el) {
      el(event)
    })

    return !event.defaultPrevented
  }

  removeEventListener (type, callback) {
    if (!(type in this[$].listeners)) {
      return
    }

    var stack = this[$].listeners[type]
    for (var i = 0, il = stack.length; i < il; i++) {
      if (stack[i] === callback) {
        stack.splice(i, 1)
        return
      }
    }
  }

}


/***/ }),

/***/ "./src/dom/Node.js":
/*!*************************!*\
  !*** ./src/dom/Node.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Node": () => (/* binding */ Node)
/* harmony export */ });
/* harmony import */ var _utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/objectCreationUtils.js */ "./src/utils/objectCreationUtils.js");
/* harmony import */ var _EventTarget_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventTarget.js */ "./src/dom/EventTarget.js");
/* harmony import */ var _utils_tagUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/tagUtils.js */ "./src/utils/tagUtils.js");
/* harmony import */ var _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/namespaces.js */ "./src/utils/namespaces.js");






const nodeTypes = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12
}

class Node extends _EventTarget_js__WEBPACK_IMPORTED_MODULE_1__.EventTarget {
  constructor (name = '', props = {}, ns = null) {
    super()

    // If props.local is true, the element was Node was created with the non-namespace function
    // that means whatever was passed as name is the local name even though it might look like a prefix
    if (name.includes(':') && !props.local) {
      ;[ this.prefix, this.localName ] = name.split(':')
    } else {
      this.localName = name
      this.prefix = null
    }

    // Follow spec and uppercase nodeName for html
    this.nodeName = ns === _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_3__.html ? name.toUpperCase() : name

    this.namespaceURI = ns
    this.nodeType = Node.ELEMENT_NODE
    this.nodeValue = props.nodeValue != null ? props.nodeValue : null
    this.childNodes = []

    this.attrs = props.attrs || new Set()

    this.ownerDocument = props.ownerDocument || null
    this.parentNode = null

    // this.namespaces = {}
    // if (this.prefix) {
    //   this.namespaces[this.prefix] = ns
    // } else {
    //   this.namespaces.default = ns
    // }

    if (props.childNodes) {
      for (var i = 0, il = props.childNodes.length; i < il; ++i) {
        this.appendChild(props.childNodes[i])
      }
    }
  }

  appendChild (node) {
    return this.insertBefore(node)
  }

  cloneNode (deep = false) {
    var clone = (0,_utils_tagUtils_js__WEBPACK_IMPORTED_MODULE_2__.cloneNode)(this)

    if (deep) {
      this.childNodes.forEach(function (el) {
        var node = el.cloneNode(deep)
        clone.appendChild(node)
      })
    }

    return clone
  }

  contains (node) {
    if (node === this) return false

    while (node.parentNode) {
      if (node === this) return true
      node = node.parentNode
    }
    return false
  }

  getRootNode () {
    if (!this.parentNode || this.parentNode.nodeType === Node.DOCUMENT_NODE) return this
    return this.parentNode.getRootNode()
  }

  hasChildNodes () {
    return !!this.childNodes.length
  }

  insertBefore (node, before) {
    let index = this.childNodes.indexOf(before)
    if (index === -1) {
      index = this.childNodes.length
    }

    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      let child
      let oldChild = before
      while ((child = node.childNodes.pop())) {
        this.insertBefore(child, oldChild)
        oldChild = child
      }
      return node
    }

    if (node.parentNode) {
      node.parentNode.removeChild(node)
    }

    node.parentNode = this
    // Object.setPrototypeOf(node.namespaces.prototype, this.namespaces.prototype)

    this.childNodes.splice(index, 0, node)
    return node
  }

  isDefaultNamespace (namespaceURI) {
    switch (this.nodeType) {
    case Node.ELEMENT_NODE:
      if (!this.prefix) {
        return this.namespaceURI === namespaceURI
      }

      if (this.hasAttribute('xmlns')) {
        return this.getAttribute('xmlns')
      }

      // EntityReferences may have to be skipped to get to it
      if (this.parentNode) {
        return this.parentNode.isDefaultNamespace(namespaceURI)
      }

      return false
    case Node.DOCUMENT_NODE:
      return this.documentElement.isDefaultNamespace(namespaceURI)
    case Node.ENTITY_NODE:
    case Node.NOTATION_NODE:
    case Node.DOCUMENT_TYPE_NODE:
    case Node.DOCUMENT_FRAGMENT_NODE:
      return false
    case Node.ATTRIBUTE_NODE:
      if (this.ownerElement) {
        return this.ownerElement.isDefaultNamespace(namespaceURI)
      }
      return false
    default:
      // EntityReferences may have to be skipped to get to it
      if (this.parentNode) {
        return this.parentNode.isDefaultNamespace(namespaceURI)
      }
      return false
    }
  }

  isEqualNode (node) {
    this.normalize()
    node.normalize()

    let bool = this.nodeName === node.nodeName
    bool = bool && this.localName === node.localName
    bool = bool && this.namespaceURI === node.namespaceURI
    bool = bool && this.prefix === node.prefix
    bool = bool && this.nodeValue === node.nodeValue

    bool = bool && this.childNodes.length === node.childNodes.length

    // dont check children recursively when the count doesnt event add up
    if (!bool) return false

    bool = bool && !this.childNodes.reduce((last, curr, index) => {
      return last && curr.isEqualNode(node.childNodes[index])
    }, true)

    // FIXME: Use attr nodes
    /* bool = bool && ![ ...this.attrs.entries() ].reduce((last, curr, index) => {
      const [ key, val ] = node.attrs.entries()
      return last && curr[0] === key && curr[1] === val
    }, true) */

    /*
    TODO:
    For two DocumentType nodes to be equal, the following conditions must also be satisfied:

    The following string attributes are equal: publicId, systemId, internalSubset.
    The entities NamedNodeMaps are equal.
    The notations NamedNodeMaps are equal.
    */

    if (this.nodeType === Node.DOCUMENT_TYPE_NODE && node.nodeType === Node.DOCUMENT_TYPE_NODE) {
      bool = bool && this.publicId === node.publicId
      bool = bool && this.systemId === node.systemId
      bool = bool && this.internalSubset === node.internalSubset
    }

    return bool
  }

  isSameNode (node) {
    return this === node
  }

  lookupNamespacePrefix (namespaceURI, originalElement) {
    if (this.namespaceURI && this.namespaceURI === namespaceURI && this.prefix
         && originalElement.lookupNamespaceURI(this.prefix) === namespaceURI) {
      return this.prefix
    }

    for (const [ key, val ] of this.attrs.entries()) {
      if (!key.includes(':')) continue

      const [ attrPrefix, name ] = key.split(':')
      if (attrPrefix === 'xmlns' && val === namespaceURI && originalElement.lookupNamespaceURI(name) === namespaceURI) {
        return name
      }
    }

    // EntityReferences may have to be skipped to get to it
    if (this.parentNode) {
      return this.parentNode.lookupNamespacePrefix(namespaceURI, originalElement)
    }
    return null
  }

  lookupNamespaceURI (prefix) {
    switch (this.nodeType) {
    case Node.ELEMENT_NODE:
      if (this.namespaceURI != null && this.prefix === prefix) {
        // Note: prefix could be "null" in this case we are looking for default namespace
        return this.namespaceURI
      }

      for (const [ key, val ] of this.attrs.entries()) {
        if (!key.includes(':')) continue

        const [ attrPrefix, name ] = key.split(':')
        if (attrPrefix === 'xmlns' && name === prefix) {
          if (val != null) {
            return val
          }
          return null
          // FIXME: Look up if prefix or attrPrefix
        } else if (name === 'xmlns' && prefix == null) {
          if (val != null) {
            return val
          }
          return null
        }
      }

      // EntityReferences may have to be skipped to get to it
      if (this.parentNode) {
        return this.parentNode.lookupNamespaceURI(prefix)
      }
      return null
    case Node.DOCUMENT_NODE:
      return this.documentElement.lookupNamespaceURI(prefix)
    case Node.ENTITY_NODE:
    case Node.NOTATION_NODE:
    case Node.DOCUMENT_TYPE_NODE:
    case Node.DOCUMENT_FRAGMENT_NODE:
      return null
    case Node.ATTRIBUTE_NODE:
      if (this.ownerElement) {
        return this.ownerElement.lookupNamespaceURI(prefix)
      }
      return null
    default:
      // EntityReferences may have to be skipped to get to it
      if (this.parentNode) {
        return this.parentNode.lookupNamespaceURI(prefix)
      }
      return null
    }
  }

  lookupPrefix (namespaceURI) {
    if (!namespaceURI) {
      return null
    }

    const type = this.nodeType

    switch (type) {
    case Node.ELEMENT_NODE:
      return this.lookupNamespacePrefix(namespaceURI, this)
    case Node.DOCUMENT_NODE:
      return this.documentElement.lookupNamespacePrefix(namespaceURI)
    case Node.ENTITY_NODE :
    case Node.NOTATION_NODE:
    case Node.DOCUMENT_FRAGMENT_NODE:
    case Node.DOCUMENT_TYPE_NODE:
      return null // type is unknown
    case Node.ATTRIBUTE_NODE:
      if (this.ownerElement) {
        return this.ownerElement.lookupNamespacePrefix(namespaceURI)
      }
      return null
    default:
      // EntityReferences may have to be skipped to get to it
      if (this.parentNode) {
        return this.parentNode.lookupNamespacePrefix(namespaceURI)
      }
      return null
    }
  }

  normalize () {
    const childNodes = []
    for (const node of this.childNodes) {
      const last = childNodes.shift()
      if (!last) {
        if (node.data) {
          childNodes.unshift(node)
        }
        continue
      }

      if (node.nodeType === Node.TEXT_NODE) {
        if (!node.data) {
          childNodes.unshift(last)
          continue
        }

        if (last.nodeType === Node.TEXT_NODE) {
          const merged = this.ownerDocument.createTextNode(last.data + node.data)
          childNodes.push(merged)
          continue
        }

        childNodes.push(last, node)
      }
    }

    this.childNodes = childNodes
    // this.childNodes = this.childNodes.forEach((textNodes, node) => {
    //   // FIXME: If first node is an empty textnode, what do we do? -> spec
    //   if (!textNodes) return [ node ]
    //   var last = textNodes.pop()

    //   if (node.nodeType === Node.TEXT_NODE) {
    //     if (!node.data) return textNodes

    //     if (last.nodeType === Node.TEXT_NODE) {
    //       const merged = this.ownerDocument.createTextNode(last.data + ' ' + node.data)
    //       textNodes.push(merged)
    //       return textNodes.concat(merged)
    //     }
    //   } else {
    //     textNodes.push(last, node)
    //   }

    //   return textNodes
    // }, null)
  }

  removeChild (node) {

    node.parentNode = null
    // Object.setPrototypeOf(node, null)
    var index = this.childNodes.indexOf(node)
    if (index === -1) return node
    this.childNodes.splice(index, 1)
    return node
  }

  replaceChild (newChild, oldChild) {
    var before = oldChild.nextSibling
    this.removeChild(oldChild)
    this.insertBefore(newChild, before)
    return oldChild
  }

  get nextSibling () {
    const child = this.parentNode && this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) + 1]
    return child || null
  }

  get previousSibling () {
    const child = this.parentNode && this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) - 1]
    return child || null
  }

  get textContent () {
    if (this.nodeType === Node.TEXT_NODE) return this.data
    if (this.nodeType === Node.CDATA_SECTION_NODE) return this.data
    if (this.nodeType === Node.COMMENT_NODE) return this.data

    return this.childNodes.reduce(function (last, current) {
      return last + current.textContent
    }, '')
  }

  set textContent (text) {
    this.childNodes = [ this.ownerDocument.createTextNode(text) ]
  }

  get lastChild () {
    return this.childNodes[this.childNodes.length - 1] || null
  }

  get firstChild () {
    return this.childNodes[0] || null
  }
}

(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_0__.extendStatic)(Node, nodeTypes)
;(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Node, nodeTypes)


/***/ }),

/***/ "./src/dom/NodeFilter.js":
/*!*******************************!*\
  !*** ./src/dom/NodeFilter.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NodeFilter": () => (/* binding */ NodeFilter)
/* harmony export */ });
/* harmony import */ var _utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/objectCreationUtils.js */ "./src/utils/objectCreationUtils.js");


class NodeFilter {
  acceptNode () {
    return NodeFilter.FILTER_ACCEPT
  }
}

(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_0__.extendStatic)(NodeFilter, {
  FILTER_ACCEPT: 1,
  FILTER_REJECT: 2,
  FILTER_IGNORE: 4,
  SHOW_ALL: -1,
  SHOW_ELEMENT: 1,
  SHOW_TEXT: 4,
  SHOW_ENTITY_REFERENCE: 16,
  SHOW_ENTITY: 32,
  SHOW_PROCESSING_INSTRUCTION: 64,
  SHOW_COMMENT: 128,
  SHOW_DOCUMENT: 256,
  SHOW_DOCUMENT_TYPE: 512,
  SHOW_DOCUMENT_FRAGMENT: 1024,
  SHOW_NOTATION: 2048
})


/***/ }),

/***/ "./src/dom/Text.js":
/*!*************************!*\
  !*** ./src/dom/Text.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Text": () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _CharacterData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CharacterData.js */ "./src/dom/CharacterData.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node.js */ "./src/dom/Node.js");



class Text extends _CharacterData_js__WEBPACK_IMPORTED_MODULE_0__.CharacterData {
  constructor (name, props) {
    super(name, props)
    this.nodeType = _Node_js__WEBPACK_IMPORTED_MODULE_1__.Node.TEXT_NODE
  }
}


/***/ }),

/***/ "./src/dom/Window.js":
/*!***************************!*\
  !*** ./src/dom/Window.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Window": () => (/* binding */ Window)
/* harmony export */ });
/* harmony import */ var _utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/objectCreationUtils.js */ "./src/utils/objectCreationUtils.js");
/* harmony import */ var _EventTarget_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventTarget.js */ "./src/dom/EventTarget.js");
/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Node.js */ "./src/dom/Node.js");
/* harmony import */ var _Document_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Document.js */ "./src/dom/Document.js");
/* harmony import */ var _DocumentFragment_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DocumentFragment.js */ "./src/dom/DocumentFragment.js");
/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Text.js */ "./src/dom/Text.js");
/* harmony import */ var _CustomEvent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CustomEvent.js */ "./src/dom/CustomEvent.js");
/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Event.js */ "./src/dom/Event.js");
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Element.js */ "./src/dom/Element.js");
/* harmony import */ var _Attr_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Attr.js */ "./src/dom/Attr.js");
/* harmony import */ var _html_HTMLImageElement_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./html/HTMLImageElement.js */ "./src/dom/html/HTMLImageElement.js");
/* harmony import */ var _html_HTMLLinkElement_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./html/HTMLLinkElement.js */ "./src/dom/html/HTMLLinkElement.js");
/* harmony import */ var _html_HTMLScriptElement_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./html/HTMLScriptElement.js */ "./src/dom/html/HTMLScriptElement.js");
/* harmony import */ var _html_HTMLElement_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./html/HTMLElement.js */ "./src/dom/html/HTMLElement.js");
/* harmony import */ var _svg_SVGPoint_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./svg/SVGPoint.js */ "./src/dom/svg/SVGPoint.js");
/* harmony import */ var _svg_SVGMatrix_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./svg/SVGMatrix.js */ "./src/dom/svg/SVGMatrix.js");
/* harmony import */ var _svg_SVGElement_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./svg/SVGElement.js */ "./src/dom/svg/SVGElement.js");
/* harmony import */ var _svg_SVGSVGElement_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./svg/SVGSVGElement.js */ "./src/dom/svg/SVGSVGElement.js");
/* harmony import */ var _svg_SVGPathElement_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./svg/SVGPathElement.js */ "./src/dom/svg/SVGPathElement.js");
/* harmony import */ var _svg_SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./svg/SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");
/* harmony import */ var _svg_SVGTextContentElement_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./svg/SVGTextContentElement.js */ "./src/dom/svg/SVGTextContentElement.js");
/* harmony import */ var _utils_strUtils_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../utils/strUtils.js */ "./src/utils/strUtils.js");
/* harmony import */ var _utils_defaults_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../utils/defaults.js */ "./src/utils/defaults.js");
























class Window extends _EventTarget_js__WEBPACK_IMPORTED_MODULE_1__.EventTarget {
  constructor () {
    super()
    this.document = new _Document_js__WEBPACK_IMPORTED_MODULE_3__.Document()
    this.document.defaultView = this
    this.self = this
    const doc = this.document
    this.Image = class {
      constructor (width, height) {
        const img = doc.createElement('img')
        if (width != null) img.setAttribute('width', width)
        if (height != null) img.setAttribute('height', height)
        return img
      }
    }
  }

  getComputedStyle (node) {
    return {
      // FIXME: Currently this function treats every given attr
      // as inheritable from its parents which is ofc not always true
      // but good enough for svg.js
      getPropertyValue (attr) {
        let value
        let cur = node

        do {
          value = cur.style[attr] || cur.getAttribute(attr)
        } while (
          value == null
          && (cur = cur.parentNode)
          && cur.nodeType === 1
        )

        return value || _utils_defaults_js__WEBPACK_IMPORTED_MODULE_22__[(0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_21__.camelCase)(attr)] || null
      }
    }
  }
}

let lastTime = 0
const requestAnimationFrame = callback => {
  const now = new global.Date().getTime()
  const timeToCall = Math.max(0, 16 - (now - lastTime))
  return global.setTimeout(() => {
    lastTime = now + timeToCall
    callback(lastTime)
  }, timeToCall)
}

const nowOffset = global.Date.now()
const performance = {
  now: () => Date.now() - nowOffset
}

const winProps = {
  Window,
  Document: _Document_js__WEBPACK_IMPORTED_MODULE_3__.Document,
  DocumentFragment: _DocumentFragment_js__WEBPACK_IMPORTED_MODULE_4__.DocumentFragment,
  Node: _Node_js__WEBPACK_IMPORTED_MODULE_2__.Node,
  EventTarget: _EventTarget_js__WEBPACK_IMPORTED_MODULE_1__.EventTarget,
  Text: _Text_js__WEBPACK_IMPORTED_MODULE_5__.Text,
  Attr: _Attr_js__WEBPACK_IMPORTED_MODULE_9__.Attr,
  Element: _Element_js__WEBPACK_IMPORTED_MODULE_8__.Element,
  CustomEvent: _CustomEvent_js__WEBPACK_IMPORTED_MODULE_6__.CustomEvent,
  Event: _Event_js__WEBPACK_IMPORTED_MODULE_7__.Event,
  HTMLElement: _html_HTMLElement_js__WEBPACK_IMPORTED_MODULE_13__.HTMLElement,
  HTMLLinkElement: _html_HTMLLinkElement_js__WEBPACK_IMPORTED_MODULE_11__.HTMLLinkElement,
  HTMLScriptElement: _html_HTMLScriptElement_js__WEBPACK_IMPORTED_MODULE_12__.HTMLScriptElement,
  HTMLImageElement: _html_HTMLImageElement_js__WEBPACK_IMPORTED_MODULE_10__.HTMLImageElement,
  // Image: HTMLImageElement, // is set on construction
  SVGMatrix: _svg_SVGMatrix_js__WEBPACK_IMPORTED_MODULE_15__.SVGMatrix,
  SVGPoint: _svg_SVGPoint_js__WEBPACK_IMPORTED_MODULE_14__.SVGPoint,
  SVGElement: _svg_SVGElement_js__WEBPACK_IMPORTED_MODULE_16__.SVGElement,
  SVGSVGElement: _svg_SVGSVGElement_js__WEBPACK_IMPORTED_MODULE_17__.SVGSVGElement,
  SVGPathElement: _svg_SVGPathElement_js__WEBPACK_IMPORTED_MODULE_18__.SVGPathElement,
  SVGGraphicsElement: _svg_SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_19__.SVGGraphicsElement,
  SVGTextContentElement: _svg_SVGTextContentElement_js__WEBPACK_IMPORTED_MODULE_20__.SVGTextContentElement,
  setTimeout: global.setTimeout,
  clearTimeout: global.clearTimeout,
  pageXOffset: 0,
  pageYOffset: 0,
  Date: global.Date,
  requestAnimationFrame,
  cancelAnimationFrame: global.clearTimeout,
  performance
}

;(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Window, winProps)


/***/ }),

/***/ "./src/dom/html/HTMLElement.js":
/*!*************************************!*\
  !*** ./src/dom/html/HTMLElement.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTMLElement": () => (/* binding */ HTMLElement)
/* harmony export */ });
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Element.js */ "./src/dom/Element.js");


class HTMLElement extends _Element_js__WEBPACK_IMPORTED_MODULE_0__.Element {}


/***/ }),

/***/ "./src/dom/html/HTMLImageElement.js":
/*!******************************************!*\
  !*** ./src/dom/html/HTMLImageElement.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTMLImageElement": () => (/* binding */ HTMLImageElement)
/* harmony export */ });
/* harmony import */ var image_size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! image-size */ "image-size");
/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Event.js */ "./src/dom/Event.js");
/* harmony import */ var _HTMLElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HTMLElement.js */ "./src/dom/html/HTMLElement.js");



// import { getFileBufferFromURL } from '../../utils/fileUrlToBuffer.js'
// import path from 'path'

class HTMLImageElement extends _HTMLElement_js__WEBPACK_IMPORTED_MODULE_2__.HTMLElement {
  constructor (...args) {
    super(...args)
    this.naturalWidth = 0
    this.naturalHeight = 0
    this.complete = false
  }
}

Object.defineProperties(HTMLImageElement.prototype, {
  src: {
    get () {
      return this.getAttribute('src')
    },
    set (val) {
      this.setAttribute('src', val)
      // const url = path.resolve(this.ownerDocument.defaultView.location, val)
      // getFileBufferFromURL(url, (buffer) => {
      image_size__WEBPACK_IMPORTED_MODULE_0__(val, (err, size) => {
        if (err) {
          this.dispatchEvent(new _Event_js__WEBPACK_IMPORTED_MODULE_1__.Event('error'))
          return
        }
        this.naturalWidth = size.width
        this.naturalHeight = size.height
        this.complete = true
        this.dispatchEvent(new _Event_js__WEBPACK_IMPORTED_MODULE_1__.Event('load'))
      })
      // })
    }
  },
  height: {
    get () {
      return this.getAttribute('height') || this.naturalHeight
    },
    set (val) {
      this.setAttribute('height', val)
    }
  },
  width: {
    get () {
      return this.getAttribute('width') || this.naturalWidth
    },
    set (val) {
      this.setAttribute('width', val)
    }
  }
})


/***/ }),

/***/ "./src/dom/html/HTMLLinkElement.js":
/*!*****************************************!*\
  !*** ./src/dom/html/HTMLLinkElement.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTMLLinkElement": () => (/* binding */ HTMLLinkElement)
/* harmony export */ });
/* harmony import */ var _HTMLElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLElement.js */ "./src/dom/html/HTMLElement.js");


class HTMLLinkElement extends _HTMLElement_js__WEBPACK_IMPORTED_MODULE_0__.HTMLElement {}

Object.defineProperties(HTMLLinkElement.prototype, {
  href: {
    get () {
      return this.getAttribute('href')
    },
    set (val) {
      this.setAttribute('href', val)
    }
  },
  rel: {
    get () {
      return this.getAttribute('rel')
    },
    set (val) {
      this.setAttribute('rel', val)
    }
  },
  type: {
    get () {
      return this.getAttribute('type')
    },
    set (val) {
      this.setAttribute('type', val)
    }
  }
})


/***/ }),

/***/ "./src/dom/html/HTMLParser.js":
/*!************************************!*\
  !*** ./src/dom/html/HTMLParser.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTMLParser": () => (/* binding */ HTMLParser)
/* harmony export */ });
/* harmony import */ var sax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sax */ "sax");


// TODO: Its an XMLParser not HTMLParser!!
const HTMLParser = function (str, el) {
  let currentTag = el
  // const namespaces = { xmlns: el.getAttribute('xmlns') }
  let document = el.ownerDocument
  let cdata = null

  // sax expects a root element but we also missuse it to parse fragments
  if (el.nodeType !== el.DOCUMENT_NODE) {
    str = '<svgdom:wrapper xmlns:svgdom="svgdom:rocks">' + str + '</svgdom:wrapper>'
  } else {
    document = el
  }

  const parser = sax__WEBPACK_IMPORTED_MODULE_0__.parser(true, {
    // lowercase: true,
    xmlns: true,
    strictEntities: true
  })

  parser.onerror = (e) => {
    throw e
  }

  parser.ondoctype = (str) => {
    if (currentTag !== document) {
      throw new Error('Doctype can only be appended to document')
    }
    currentTag.appendChild(document.implementation.createDocumentType())
  }

  parser.ontext = (str) => currentTag.appendChild(document.createTextNode(str))
  parser.oncomment = (str) => currentTag.appendChild(document.createComment(str))

  // parser.onopennamespace = ns => {
  //   namespaces[ns.prefix] = ns.uri
  // }
  // parser.onclosenamespace = ns => {
  //   delete namespaces[ns.prefix]
  // }

  parser.onopentag = node => {
    if (node.name === 'svgdom:wrapper') return

    const attrs = node.attributes

    const uri = node.uri || currentTag.lookupNamespaceURI(node.prefix || null)

    var newElement = document.createElementNS(uri, node.name)

    for (const [ name, node ] of Object.entries(attrs)) {
      newElement.setAttributeNS(node.uri, name, node.value)
    }

    currentTag.appendChild(newElement)
    currentTag = newElement
  }

  parser.onclosetag = tagName => {
    if (tagName === 'svgdom:wrapper') return

    currentTag = currentTag.parentNode
  }

  parser.onopencdata = () => {
    cdata = document.createCDATASection('')
  }

  parser.oncdata = (str) => {
    cdata.appendData(str)
  }

  parser.onclosecdata = () => {
    currentTag.appendChild(cdata)
  }

  parser.write(str)
}


/***/ }),

/***/ "./src/dom/html/HTMLScriptElement.js":
/*!*******************************************!*\
  !*** ./src/dom/html/HTMLScriptElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTMLScriptElement": () => (/* binding */ HTMLScriptElement)
/* harmony export */ });
/* harmony import */ var _HTMLElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLElement.js */ "./src/dom/html/HTMLElement.js");


class HTMLScriptElement extends _HTMLElement_js__WEBPACK_IMPORTED_MODULE_0__.HTMLElement {}

Object.defineProperties(HTMLScriptElement.prototype, {
  src: {
    get () {
      return this.getAttribute('src')
    },
    set (val) {
      this.setAttribute('src', val)
    }
  },
  type: {
    get () {
      return this.getAttribute('type')
    },
    set (val) {
      this.setAttribute('type', val)
    }
  }
})


/***/ }),

/***/ "./src/dom/mixins/ChildNode.js":
/*!*************************************!*\
  !*** ./src/dom/mixins/ChildNode.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChildNode": () => (/* binding */ ChildNode)
/* harmony export */ });
/* harmony import */ var _utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/nodesToNode.js */ "./src/utils/nodesToNode.js");


// https://dom.spec.whatwg.org/#interface-childnode
// Todo: check if this is contained in nodes or siblings are contained (viablePreviousSibling, viableNextSibling)
const ChildNode = {
  before (nodes) {
    if (!this.parentNode) return
    const node = (0,_utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_0__.nodesToNode)(nodes, this.ownerDocument)
    this.parent.insertBefore(node, this)
  },
  after (nodes) {
    if (!this.parentNode) return
    const node = (0,_utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_0__.nodesToNode)(nodes, this.ownerDocument)
    this.parent.insertBefore(node, this.nextSibling)
  },
  replaceWith (nodes) {
    if (!this.parentNode) return
    const next = this.nextSibling
    this.delete()
    const node = (0,_utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_0__.nodesToNode)(nodes)
    this.parent.insertBefore(node, next)
  },
  remove () {
    if (!this.parentNode) return
    this.parentNode.removeChild(this)
  }
}


/***/ }),

/***/ "./src/dom/mixins/NonDocumentTypeChildNode.js":
/*!****************************************************!*\
  !*** ./src/dom/mixins/NonDocumentTypeChildNode.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NonDocumentTypeChildNode": () => (/* binding */ NonDocumentTypeChildNode)
/* harmony export */ });
const NonDocumentTypeChildNode = {

}

Object.defineProperties(NonDocumentTypeChildNode, {
  previousElementSibling: {
    get () {
      let node
      while ((node = this.previousSibling)) {
        if (node.nodeType === node.ELEMENT_NODE) {
          return node
        }
      }
      return null
    }
  },

  nextElementSibling: {
    get () {
      let node
      while ((node = this.nextSibling)) {
        if (node.nodeType === node.ELEMENT_NODE) {
          return node
        }
      }
      return null
    }
  }
})


/***/ }),

/***/ "./src/dom/mixins/NonElementParentNode.js":
/*!************************************************!*\
  !*** ./src/dom/mixins/NonElementParentNode.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NonElementParentNode": () => (/* binding */ NonElementParentNode)
/* harmony export */ });
/* harmony import */ var _utils_NodeIterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/NodeIterator.js */ "./src/utils/NodeIterator.js");
/* harmony import */ var _NodeFilter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../NodeFilter.js */ "./src/dom/NodeFilter.js");



// https://dom.spec.whatwg.org/#interface-nonelementparentnode
const NonElementParentNode = {
  getElementById (id) {
    const iter = new _utils_NodeIterator_js__WEBPACK_IMPORTED_MODULE_0__.NodeIterator(this, _NodeFilter_js__WEBPACK_IMPORTED_MODULE_1__.NodeFilter.SHOW_ELEMENT, (node) => id === node.id ? _NodeFilter_js__WEBPACK_IMPORTED_MODULE_1__.NodeFilter.FILTER_ACCEPT : _NodeFilter_js__WEBPACK_IMPORTED_MODULE_1__.NodeFilter.FILTER_IGNORE, false)
    for (const node of iter) {
      return node
    }
    return null
  }
}


/***/ }),

/***/ "./src/dom/mixins/ParentNode.js":
/*!**************************************!*\
  !*** ./src/dom/mixins/ParentNode.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParentNode": () => (/* binding */ ParentNode)
/* harmony export */ });
/* harmony import */ var _other_CssQuery_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../other/CssQuery.js */ "./src/other/CssQuery.js");
/* harmony import */ var _utils_NodeIterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/NodeIterator.js */ "./src/utils/NodeIterator.js");
/* harmony import */ var _NodeFilter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NodeFilter.js */ "./src/dom/NodeFilter.js");
/* harmony import */ var _utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/nodesToNode.js */ "./src/utils/nodesToNode.js");





// https://dom.spec.whatwg.org/#parentnode
const ParentNode = {
  matchWithScope (query, scope) {
    return new _other_CssQuery_js__WEBPACK_IMPORTED_MODULE_0__.CssQuery(query).matches(this, scope)
  },

  query (query, scope, single = false) {

    const iter = new _utils_NodeIterator_js__WEBPACK_IMPORTED_MODULE_1__.NodeIterator(scope, _NodeFilter_js__WEBPACK_IMPORTED_MODULE_2__.NodeFilter.SHOW_ELEMENT, (node) => node.matchWithScope(query, scope) ? _NodeFilter_js__WEBPACK_IMPORTED_MODULE_2__.NodeFilter.FILTER_ACCEPT : _NodeFilter_js__WEBPACK_IMPORTED_MODULE_2__.NodeFilter.FILTER_IGNORE, false)

    const nodes = []
    for (const node of iter) {
      nodes.push(node)
      if (single) return nodes
    }

    return nodes
  },

  querySelectorAll (query) {
    return this.query(query, this)
  },

  querySelector (query) {
    return this.query(query, this, true)[0] || null
  },

  prepend (nodes) {
    const node = (0,_utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_3__.nodesToNode)(nodes, this.ownerDocument)

    this.insertBefore(node, this.firstChild)
  },

  append (nodes) {
    const node = (0,_utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_3__.nodesToNode)(nodes, this.ownerDocument)
    this.appendChild(node)
  },

  replaceChildren (nodes) {
    while (this.firstChild) {
      this.removeChild(this.firstChild)
    }
    this.append(nodes)
  }
}

Object.defineProperties(ParentNode, {
  children: {
    get () {
      return this.childNodes.filter(function (node) { return node.nodeType === node.ELEMENT_NODE })
    }
  },
  firstElementChild: {
    get () {
      for (const node of this.childNodes) {
        if (node && node.nodeType === node.ELEMENT_NODE) {
          return node
        }
      }
      return null
    }
  },
  lastElementChild: {
    get () {
      for (const node of this.childNodes.slice().reverse()) {
        if (node && node.nodeType === node.ELEMENT_NODE) {
          return node
        }
      }
      return null
    }
  },
  childElementCount: {
    get () {
      return this.children.length
    }
  }
})




/***/ }),

/***/ "./src/dom/mixins/elementAccess.js":
/*!*****************************************!*\
  !*** ./src/dom/mixins/elementAccess.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "elementAccess": () => (/* binding */ elementAccess)
/* harmony export */ });
/* harmony import */ var _NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../NodeFilter.js */ "./src/dom/NodeFilter.js");
/* harmony import */ var _utils_NodeIterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/NodeIterator.js */ "./src/utils/NodeIterator.js");



const hasClass = (node, name) => {
  const classList = node.className.split(/\s+/)
  return classList.includes(name)
}

const elementAccess = {
  getElementsByTagName (name) {
    // const document = this.ownerDocument
    const iter = new _utils_NodeIterator_js__WEBPACK_IMPORTED_MODULE_1__.NodeIterator(this, _NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_ELEMENT, (node) => node.nodeName === name ? _NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.FILTER_ACCEPT : _NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.FILTER_IGNORE, false)
    // const iter = document.createNodeIterator(this, 1, (node) => node.nodeName === name ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE)
    return [ ...iter ]
  },

  getElementsByTagNameNS (ns, name) {
    // const document = this.ownerDocument
    const iter = new _utils_NodeIterator_js__WEBPACK_IMPORTED_MODULE_1__.NodeIterator(this, _NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_ELEMENT, (node) => node.isNamespace(ns) && node.nodeName === name ? _NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.FILTER_ACCEPT : _NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.FILTER_IGNORE, false)
    // const iter = document.createNodeIterator(this, 1, (node) => node.isNamespace(ns) && node.nodeName === name ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE)
    return [ ...iter ]
  },

  getElementsByClassName (name) {
    // const document = this.ownerDocument
    const iter = new _utils_NodeIterator_js__WEBPACK_IMPORTED_MODULE_1__.NodeIterator(this, _NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_ELEMENT, (node) => hasClass(node, name) ? _NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.FILTER_ACCEPT : _NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.FILTER_IGNORE, false)
    // const iter = document.createNodeIterator(this, 1, (node) => hasClass(node, name) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE)
    return [ ...iter ]
  }
}




/***/ }),

/***/ "./src/dom/svg/SVGElement.js":
/*!***********************************!*\
  !*** ./src/dom/svg/SVGElement.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGElement": () => (/* binding */ SVGElement)
/* harmony export */ });
/* harmony import */ var _Element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Element.js */ "./src/dom/Element.js");

class SVGElement extends _Element_js__WEBPACK_IMPORTED_MODULE_0__.Element {
  get ownerSVGElement () {
    let parent = this
    while ((parent = parent.parentNode)) {
      if ('svg' == parent.nodeName) {
        return parent
      }
    }
    return null
  }

  get viewportElement () {
    let parent = this
    while ((parent = parent.parentNode)) {
      // TODO: and others
      if ([ 'svg', 'symbol' ].includes(parent.nodeName)) {
        return parent
      }
    }
    return null
  }
}


/***/ }),

/***/ "./src/dom/svg/SVGGraphicsElement.js":
/*!*******************************************!*\
  !*** ./src/dom/svg/SVGGraphicsElement.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGGraphicsElement": () => (/* binding */ SVGGraphicsElement)
/* harmony export */ });
/* harmony import */ var _SVGElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGElement.js */ "./src/dom/svg/SVGElement.js");
/* harmony import */ var _utils_bboxUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/bboxUtils.js */ "./src/utils/bboxUtils.js");
/* harmony import */ var _utils_regex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/regex.js */ "./src/utils/regex.js");
/* harmony import */ var _SVGMatrix_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SVGMatrix.js */ "./src/dom/svg/SVGMatrix.js");





// Map matrix array to object
function arrayToMatrix (a) {
  return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] }
}

class SVGGraphicsElement extends _SVGElement_js__WEBPACK_IMPORTED_MODULE_0__.SVGElement {
  // TODO: https://www.w3.org/TR/SVG2/coords.html#ComputingAViewportsTransform
  generateViewBoxMatrix () {
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
    if (![ 'marker', 'symbol', 'pattern', 'svg', 'view' ].includes(this.nodeName)) {
      return new _SVGMatrix_js__WEBPACK_IMPORTED_MODULE_3__.SVGMatrix()
    }

    var view = (this.getAttribute('viewBox') || '').split(_utils_regex_js__WEBPACK_IMPORTED_MODULE_2__.delimiter).map(parseFloat).filter(el => !isNaN(el))
    var width = parseFloat(this.getAttribute('width')) || 0
    var height = parseFloat(this.getAttribute('height')) || 0
    var x = parseFloat(this.getAttribute('x')) || 0
    var y = parseFloat(this.getAttribute('y')) || 0

    // TODO: If no width and height is given, width and height of the outer svg element is used
    if (!width || !height) {
      return new _SVGMatrix_js__WEBPACK_IMPORTED_MODULE_3__.SVGMatrix().translate(x, y)
    }

    if (view.length !== 4) {
      view = [ 0, 0, width, height ]
    }

    // first apply x and y if nested, then viewbox scale, then viewBox move
    return new _SVGMatrix_js__WEBPACK_IMPORTED_MODULE_3__.SVGMatrix().translate(x, y).scale(width / view[2], height / view[3]).translate(-view[0], -view[1])
  }

  getBBox () {
    return (0,_utils_bboxUtils_js__WEBPACK_IMPORTED_MODULE_1__.getPointCloud)(this).bbox()
  }

  // TODO: This method actually exists on all Elements
  getBoundingClientRect () {
    // The bounding client rect takes the screen ctm of the element
    // and converts the bounding box with it

    // however, normal bounding consists of:
    // - all children transformed
    // - the viewbox of the element if available

    // The boundingClientRect is not affected by its own viewbox
    // So we apply only our own transformations and parents screenCTM

    let m = this.matrixify()

    if (this.parentNode && this.parentNode.nodeName !== '#document') {
      m = this.parentNode.getScreenCTM().multiply(m)
    }

    // let m = this.getScreenCTM()

    // There are a few extra rules regarding rbox and the <svg> element
    // Namely this is:
    // BBox is calculated as normal for container elements
    // Rbox is calculated with the width and height of the <svg>
    // This could be also true for symbols so this is a:
    // Todo: ...
    return (0,_utils_bboxUtils_js__WEBPACK_IMPORTED_MODULE_1__.getPointCloud)(this, false, true).transform(m).bbox()
  }

  getCTM () {
    var m = this.matrixify()

    var node = this
    while ((node = node.parentNode)) {
      if ([ 'svg', 'symbol', 'image', 'pattern', 'marker' ].indexOf(node.nodeName) > -1) break
      m = m.multiply(node.matrixify())
      if (node.nodeName === '#document') return this.getScreenCTM()
    }

    return node.generateViewBoxMatrix().multiply(m)
  }

  getInnerMatrix () {
    var m = this.matrixify()

    if ([ 'svg', 'symbol', 'image', 'pattern', 'marker' ].indexOf(this.nodeName) > -1) {
      m = this.generateViewBoxMatrix().multiply(m)
    }
    return m
  }

  getScreenCTM () {
    // ref: https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
    // We follow Chromes behavior and include the viewbox in the screenCTM
    var m = this.getInnerMatrix()

    // TODO: We have to loop until document, however html elements dont have getScreenCTM implemented
    // they also dont have a transform attribute. Therefore we need a different way of figuring out their (css) transform
    if (this.parentNode && this.parentNode instanceof SVGGraphicsElement) {
      return this.parentNode.getScreenCTM().multiply(m)
    }

    return m
  }

  matrixify () {
    var matrix = (this.getAttribute('transform') || '').trim()
      // split transformations
      .split(_utils_regex_js__WEBPACK_IMPORTED_MODULE_2__.transforms).slice(0, -1).map(function (str) {
        // generate key => value pairs
        var kv = str.trim().split('(')
        return [ kv[0].trim(), kv[1].split(_utils_regex_js__WEBPACK_IMPORTED_MODULE_2__.delimiter).map(function (str) { return parseFloat(str.trim()) }) ]
      })
      // merge every transformation into one matrix
      .reduce(function (matrix, transform) {

        if (transform[0] === 'matrix') return matrix.multiply(arrayToMatrix(transform[1]))
        return matrix[transform[0]].apply(matrix, transform[1])

      }, new _SVGMatrix_js__WEBPACK_IMPORTED_MODULE_3__.SVGMatrix())

    return matrix
  }

  get transform () {
    throw new Error('Not implemented')
  }

}


/***/ }),

/***/ "./src/dom/svg/SVGMatrix.js":
/*!**********************************!*\
  !*** ./src/dom/svg/SVGMatrix.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "matrixFactory": () => (/* binding */ matrixFactory),
/* harmony export */   "SVGMatrix": () => (/* binding */ SVGMatrix)
/* harmony export */ });
const radians = function (d) {
  return d % 360 * Math.PI / 180
}

function matrixFactory (a, b, c, d, e, f) {
  var r = new SVGMatrix()
  r.a = a
  r.b = b
  r.c = c
  r.d = d
  r.e = e
  r.f = f
  return r
}

class SVGMatrix {
  constructor () {
    this.a = this.d = 1
    this.b = this.c = this.e = this.f = 0
  }

  inverse () {
    // Get the current parameters out of the matrix
    var a = this.a
    var b = this.b
    var c = this.c
    var d = this.d
    var e = this.e
    var f = this.f

    // Invert the 2x2 matrix in the top left
    var det = a * d - b * c
    if (!det) throw new Error('Cannot invert ' + this)

    // Calculate the top 2x2 matrix
    var na = d / det
    var nb = -b / det
    var nc = -c / det
    var nd = a / det

    // Apply the inverted matrix to the top right
    var ne = -(na * e + nc * f)
    var nf = -(nb * e + nd * f)

    // Construct the inverted matrix
    this.a = na
    this.b = nb
    this.c = nc
    this.d = nd
    this.e = ne
    this.f = nf

    return this
  }

  multiply (m) {
    var r = new SVGMatrix()
    r.a = this.a * m.a + this.c * m.b + this.e * 0
    r.b = this.b * m.a + this.d * m.b + this.f * 0
    r.c = this.a * m.c + this.c * m.d + this.e * 0
    r.d = this.b * m.c + this.d * m.d + this.f * 0
    r.e = this.a * m.e + this.c * m.f + this.e * 1
    r.f = this.b * m.e + this.d * m.f + this.f * 1
    return r
  }

  rotate (r, x, y) {
    r = r % 360 * Math.PI / 180
    return this.multiply(matrixFactory(
      Math.cos(r),
      Math.sin(r),
      -Math.sin(r),
      Math.cos(r),
      x ? -Math.cos(r) * x + Math.sin(r) * y + x : 0,
      y ? -Math.sin(r) * x - Math.cos(r) * y + y : 0
    ))
  }

  scale (scaleX, scaleY = scaleX) {
    return this.multiply(matrixFactory(scaleX, 0, 0, scaleY, 0, 0))
  }

  skew (x, y) {
    return this.multiply(matrixFactory(1, Math.tan(radians(y)), Math.tan(radians(x)), 1, 0, 0))
  }

  skewX (x) {
    return this.skew(x, 0)
  }

  skewY (y) {
    return this.skew(0, y)
  }

  toString () {
    return 'SVGMatrix'
  }

  translate (x = 0, y = 0) {
    return this.multiply(matrixFactory(1, 0, 0, 1, x, y))
  }

}


/***/ }),

/***/ "./src/dom/svg/SVGPathElement.js":
/*!***************************************!*\
  !*** ./src/dom/svg/SVGPathElement.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGPathElement": () => (/* binding */ SVGPathElement)
/* harmony export */ });
/* harmony import */ var _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");
/* harmony import */ var _utils_pathUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/pathUtils.js */ "./src/utils/pathUtils.js");



class SVGPathElement extends _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_0__.SVGGraphicsElement {
  getPointAtLength (len) {
    return _utils_pathUtils_js__WEBPACK_IMPORTED_MODULE_1__.pointAtLength(this.getAttribute('d'), len)
  }

  getTotalLength () {
    return _utils_pathUtils_js__WEBPACK_IMPORTED_MODULE_1__.length(this.getAttribute('d'))
  }
}


/***/ }),

/***/ "./src/dom/svg/SVGPoint.js":
/*!*********************************!*\
  !*** ./src/dom/svg/SVGPoint.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGPoint": () => (/* binding */ SVGPoint)
/* harmony export */ });
class SVGPoint {
  constructor () {
    this.x = 0
    this.y = 0
  }

  matrixTransform (m) {
    var r = new SVGPoint()
    r.x = m.a * this.x + m.c * this.y + m.e * 1
    r.y = m.b * this.x + m.d * this.y + m.f * 1
    return r
  }
}


/***/ }),

/***/ "./src/dom/svg/SVGSVGElement.js":
/*!**************************************!*\
  !*** ./src/dom/svg/SVGSVGElement.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGSVGElement": () => (/* binding */ SVGSVGElement)
/* harmony export */ });
/* harmony import */ var _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");
/* harmony import */ var _other_Box_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../other/Box.js */ "./src/other/Box.js");
/* harmony import */ var _SVGMatrix_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SVGMatrix.js */ "./src/dom/svg/SVGMatrix.js");
/* harmony import */ var _SVGPoint_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SVGPoint.js */ "./src/dom/svg/SVGPoint.js");





class SVGSVGElement extends _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_0__.SVGGraphicsElement {
  createSVGMatrix () {
    return new _SVGMatrix_js__WEBPACK_IMPORTED_MODULE_2__.SVGMatrix()
  }

  createSVGPoint () {
    return new _SVGPoint_js__WEBPACK_IMPORTED_MODULE_3__.SVGPoint()
  }

  createSVGRect () {
    return new _other_Box_js__WEBPACK_IMPORTED_MODULE_1__.Box()
  }

}


/***/ }),

/***/ "./src/dom/svg/SVGTextContentElement.js":
/*!**********************************************!*\
  !*** ./src/dom/svg/SVGTextContentElement.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGTextContentElement": () => (/* binding */ SVGTextContentElement)
/* harmony export */ });
/* harmony import */ var _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");


class SVGTextContentElement extends _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_0__.SVGGraphicsElement {
  getComputedTextLength () {
    return this.getBBox().width
  }
}


/***/ }),

/***/ "./src/factories.js":
/*!**************************!*\
  !*** ./src/factories.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDocument": () => (/* binding */ createDocument),
/* harmony export */   "createHTMLDocument": () => (/* binding */ createHTMLDocument),
/* harmony export */   "createSVGDocument": () => (/* binding */ createSVGDocument),
/* harmony export */   "createWindow": () => (/* binding */ createWindow),
/* harmony export */   "createHTMLWindow": () => (/* binding */ createHTMLWindow),
/* harmony export */   "createSVGWindow": () => (/* binding */ createSVGWindow)
/* harmony export */ });
/* harmony import */ var _dom_Window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/Window.js */ "./src/dom/Window.js");
/* harmony import */ var _dom_Document_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/Document.js */ "./src/dom/Document.js");
/* harmony import */ var _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/namespaces.js */ "./src/utils/namespaces.js");




const { createDocument, createHTMLDocument } = _dom_Document_js__WEBPACK_IMPORTED_MODULE_1__.DOMImplementation

const createWindow = (...args) => {
  const window = new _dom_Window_js__WEBPACK_IMPORTED_MODULE_0__.Window()
  const document = createDocument(...args)
  window.document = document
  document.defaultView = window
  return window
}

const createHTMLWindow = (title) => {
  const window = new _dom_Window_js__WEBPACK_IMPORTED_MODULE_0__.Window()
  const document = _dom_Document_js__WEBPACK_IMPORTED_MODULE_1__.DOMImplementation.createHTMLDocument(title)
  window.document = document
  document.defaultView = window
  return window
}

const createSVGWindow = () => {
  return createWindow(_utils_namespaces_js__WEBPACK_IMPORTED_MODULE_2__.svg, 'svg')
}

const createSVGDocument = () => {
  return createDocument(_utils_namespaces_js__WEBPACK_IMPORTED_MODULE_2__.svg, 'svg')
}




/***/ }),

/***/ "./src/other/Box.js":
/*!**************************!*\
  !*** ./src/other/Box.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Box": () => (/* binding */ Box),
/* harmony export */   "NoBox": () => (/* binding */ NoBox)
/* harmony export */ });
/* harmony import */ var _utils_regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/regex.js */ "./src/utils/regex.js");
/* harmony import */ var _Point_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Point.js */ "./src/other/Point.js");



class Box {
  constructor (source) {
    var base = [ 0, 0, 0, 0 ]
    source = typeof source === 'string' ? source.split(_utils_regex_js__WEBPACK_IMPORTED_MODULE_0__.delimiter).map(parseFloat)
      : Array.isArray(source) ? source
      : typeof source === 'object' ? [
        source.left != null ? source.left : source.x,
        source.top != null ? source.top : source.y,
        source.width,
        source.height
      ]
      : arguments.length === 4 ? [].slice.call(arguments)
      : base

    this.x = this.left = source[0]
    this.y = this.top = source[1]
    this.width = source[2]
    this.height = source[3]
    this.right = this.left + this.width
    this.bottom = this.top + this.height
  }

  // Merge rect box with another, return a new instance
  merge (box) {
    if (box instanceof NoBox) return new Box(this)

    var x = Math.min(this.x, box.x)
    var y = Math.min(this.y, box.y)

    return new Box(
      x, y,
      Math.max(this.x + this.width, box.x + box.width) - x,
      Math.max(this.y + this.height, box.y + box.height) - y
    )
  }

  transform (m) {
    var xMin = Infinity
    var xMax = -Infinity
    var yMin = Infinity
    var yMax = -Infinity

    var pts = [
      new _Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(this.x, this.y),
      new _Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(this.x + this.width, this.y),
      new _Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(this.x, this.y + this.height),
      new _Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(this.x + this.width, this.y + this.height)
    ]

    pts.forEach(function (p) {
      p = p.transform(m)
      xMin = Math.min(xMin, p.x)
      xMax = Math.max(xMax, p.x)
      yMin = Math.min(yMin, p.y)
      yMax = Math.max(yMax, p.y)
    })

    return new Box(
      xMin, yMin,
      xMax - xMin,
      yMax - yMin
    )
  }
}

class NoBox extends Box {
  // NoBox has no valid values so it cant be merged
  merge (box) {
    return box instanceof NoBox ? new NoBox() : new Box(box)
  }

  transform (m) {
    return new NoBox()
  }
}


/***/ }),

/***/ "./src/other/CssQuery.js":
/*!*******************************!*\
  !*** ./src/other/CssQuery.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CssQuery": () => (/* binding */ CssQuery)
/* harmony export */ });
/* harmony import */ var _utils_strUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/strUtils.js */ "./src/utils/strUtils.js");
/* harmony import */ var _utils_regex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/regex.js */ "./src/utils/regex.js");
/* harmony import */ var _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/namespaces.js */ "./src/utils/namespaces.js");




class CssQuery {
  constructor (query) {
    if (CssQuery.cache.has(query)) {
      this.queries = CssQuery.cache.get(query)
      return
    }

    var queries = (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_0__.splitNotInBrackets)(query, ',')

    queries = queries.map(query => {

      var roundBrackets = 0
      var squareBrackets = 0

      // this is the same as above but easier
      query = query.replace(/[()[\]>~+]/g, function (ch) {
        if (ch === '(') ++roundBrackets
        else if (ch === ')') --roundBrackets
        else if (ch === '[') ++squareBrackets
        else if (ch === ']') --squareBrackets

        if ('()[]'.indexOf(ch) > -1) return ch
        if (squareBrackets || roundBrackets) return ch

        return ' ' + ch + ' '
      })

      // split at space and remove empty results
      query = (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_0__.splitNotInBrackets)(query, ' ').filter(el => !!el.length)

      var pairs = []

      var relation = '%'

      // generate querynode relation tuples
      for (var i = 0, il = query.length; i < il; ++i) {

        if ('>~+%'.indexOf(query[i]) > -1) {
          relation = query[i]
          continue
        }

        pairs.push([ relation, query[i] ])
        relation = '%'

      }

      return pairs

    })

    this.queries = queries

    // to prevent memory leaks we have to manage our cache.
    // we delete everything which is older than 50 entries
    if (CssQuery.cacheKeys.length > 50) {
      CssQuery.cache.delete(CssQuery.cacheKeys.shift())
    }
    CssQuery.cache.set(query, queries)
    CssQuery.cacheKeys.push(query)

  }

  matches (node, scope) {
    for (var i = this.queries.length; i--;) {
      if (this.matchHelper(this.queries[i], node, scope)) {
        return true
      }
    }
    return false
  }

  matchHelper (query, node, scope) {
    query = query.slice()
    var last = query.pop()

    if (!new CssQueryNode(last[1]).matches(node, scope)) { return false }

    if (!query.length) return true

    if (last[0] === ',') return true

    if (last[0] === '+') {
      return !!node.previousSibling && this.matchHelper(query, node.previousSibling, scope)
    }

    if (last[0] === '>') {
      return !!node.parentNode && this.matchHelper(query, node.parentNode, scope)
    }

    if (last[0] === '~') {
      while ((node = node.previousSibling)) {
        if (this.matchHelper(query, node, scope)) { return true }
      }
      return false
    }

    if (last[0] === '%') {
      while ((node = node.parentNode)) {
        if (this.matchHelper(query, node, scope)) { return true }
      }
      return false
    }

  }
}

CssQuery.cache = new Map()
CssQuery.cacheKeys = []

// check if [node] is the [nth] child of [arr] where nth can also be a formula
const nth = (node, arr, nth) => {

  if (nth === 'even') nth = '2n'
  else if (nth === 'odd') nth = '2n+1'

  // check for eval chars
  if (/[^\d\-n+*/]+/.test(nth)) return false

  nth = nth.replace('n', '*n')

  // eval nth to get the index
  for (var i, n = 0, nl = arr.length; n < nl; ++n) {
    /* eslint no-eval: off */
    i = eval(nth)

    if (i > nl) break
    if (arr[i - 1] === node) return true
  }

  return false
}

const lower = a => a.toLowerCase()

// checks if a and b are equal. Is insensitive when i is true
const eq = (a, b, i) => i ? lower(a) === lower(b) : a === b

// [i] (prebound) is true if insensitive matching is required
// [a] (prebound) is the value the attr is compared to
// [b] (passed)   is the value of the attribute
const attributeMatcher = {
  '=': (i, a, b) => eq(a, b, i),
  '~=': (i, a, b) => b.split(_utils_regex_js__WEBPACK_IMPORTED_MODULE_1__.delimiter).filter(el => eq(el, a, i)).length > 0,
  '|=': (i, a, b) => eq(b.split(_utils_regex_js__WEBPACK_IMPORTED_MODULE_1__.delimiter)[0], a, i),
  '^=': (i, a, b) => i ? lower(b).startsWith(lower(a)) : b.startsWith(a),
  '$=': (i, a, b) => i ? lower(b).endsWith(lower(a)) : b.endsWith(a),
  '*=': (i, a, b) => i ? lower(b).includes(lower(a)) : b.includes(a),
  '*': (i, a, b) => b != null
}

const getAttributeValue = (prefix, name, node) => {
  if (!prefix || prefix === '*') {
    return node.getAttribute(name)
  }
  return node.getAttribute(prefix + ':' + name)
}

// [a] (prebound) [a]rgument of the pseudo selector
// [n] (passed)   [n]ode
// [s] (passed)   [s]cope - the element this query is scoped to
const pseudoMatcher = {
  'first-child': (a, n) => n.parentNode && n.parentNode.firstChild === n,
  'last-child': (a, n) => n.parentNode && n.parentNode.lastChild === n,
  'nth-child': (a, n) => n.parentNode && nth(n, n.parentNode.childNodes, a),
  'nth-last-child': (a, n) => n.parentNode && nth(n, n.parentNode.childNodes.slice().reverse(), a),
  'first-of-type': (a, n) => n.parentNode && n.parentNode.childNodes.filter(el => el.nodeName === n.nodeName)[0] === n,
  'last-of-type': (a, n) => n.parentNode && n.parentNode.childNodes.filter(el => el.nodeName === n.nodeName).pop() === n,
  'nth-of-type': (a, n) => n.parentNode && nth(n, n.parentNode.childNodes.filter(el => el.nodeName === n.nodeName), a),
  'nth-last-of-type': (a, n) => n.parentNode && nth(n, n.parentNode.childNodes.filter(el => el.nodeName === n.nodeName).reverse(), a),
  'only-child': (a, n) => n.parentNode && n.parentNode.childNodes.length === 1,
  'only-of-type': (a, n) => n.parentNode && n.parentNode.childNodes.filter(el => el.nodeName === n.nodeName).length === 1,
  root: (a, n) => n.ownerDocument.documentElement === n,
  not: (a, n, s) => !(new CssQuery(a)).matches(n, s),
  matches: (a, n, s) => (new CssQuery(a)).matches(n, s),
  scope: (a, n, s) => n === s
}

class CssQueryNode {
  constructor (node) {
    this.tag = ''
    this.id = ''
    this.classList = []
    this.attrs = []
    this.pseudo = []

    // match the tag name
    var matches = node.match(/^[\w-]+|^\*/)
    if (matches) {
      this.tag = matches[0]
      node = node.slice(this.tag.length)
    }

    // match pseudo classes
    while ((matches = /:([\w-]+)(?:\((.+)\))?/g.exec(node))) {
      this.pseudo.push(pseudoMatcher[matches[1]].bind(this, (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_0__.removeQuotes)(matches[2] || '')))
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[0].length)
    }

    // match the id
    matches = node.match(/#([\w-]+)/)
    if (matches) {
      this.id = matches[1]
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[0].length)
    }

    // match classes
    while ((matches = /\.([\w-]+)/g.exec(node))) {
      this.classList.push(matches[1])
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[0].length)
    }

    // match attributes
    while ((matches = /\[([\w-*]+\|)?([\w-]+)(([=^~$|*]+)(.+?)( +[iI])?)?\]/g.exec(node))) {
      const prefix = matches[1] ? matches[1].split('|')[0] : null
      this.attrs.push({
        name: matches[2],
        getValue: getAttributeValue.bind(this, prefix, matches[2]),
        matcher: attributeMatcher[matches[4] || '*'].bind(
          this,
          !!matches[6], // case insensitive yes/no
          (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_0__.removeQuotes)((matches[5] || '').trim()) // attribute value
        )
      })
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[0].length)
    }
  }

  matches (node, scope) {
    var i

    if (node.nodeType !== 1) return false

    // Always this extra code for html -.-
    if (node.namespaceURI === _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_2__.html) {
      this.tag = this.tag.toUpperCase()
    }

    if (this.tag && this.tag !== node.nodeName && this.tag !== '*') { return false }

    if (this.id && this.id !== node.id) {
      return false
    }

    var classList = (node.getAttribute('class') || '').split(_utils_regex_js__WEBPACK_IMPORTED_MODULE_1__.delimiter).filter(el => !!el.length)
    if (this.classList.filter(className => classList.indexOf(className) < 0).length) {
      return false
    }

    for (i = this.attrs.length; i--;) {
      var attrValue = this.attrs[i].getValue(node)
      if (attrValue === null || !this.attrs[i].matcher(attrValue)) {
        return false
      }
    }

    for (i = this.pseudo.length; i--;) {
      if (!this.pseudo[i](node, scope)) {
        return false
      }
    }

    return true
  }

}


/***/ }),

/***/ "./src/other/Point.js":
/*!****************************!*\
  !*** ./src/other/Point.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point": () => (/* binding */ Point)
/* harmony export */ });
/* harmony import */ var _dom_svg_SVGPoint_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/svg/SVGPoint.js */ "./src/dom/svg/SVGPoint.js");


class Point {
  // Initialize
  constructor (x, y) {
    var source
    var base = { x: 0, y: 0 }

    // ensure source as object
    source = Array.isArray(x) ? { x: x[0], y: x[1] }
      : typeof x === 'object' ? { x: x.x, y: x.y }
      : x != null ? { x: x, y: (y != null ? y : x) }
      : base // If y has no value, then x is used has its value

    // merge source
    this.x = source.x
    this.y = source.y
  }

  abs () {
    return Math.sqrt(this.absQuad())
  }

  absQuad () {
    return this.x * this.x + this.y * this.y
  }

  add (x, y) {
    var p = new Point(x, y)
    return new Point(this.x + p.x, this.y + p.y)
  }

  angleTo (p) {
    var sign = Math.sign(this.x * p.y - this.y * p.x)
    sign = sign || 1
    return sign * Math.acos(Math.round((this.dot(p) / (this.abs() * p.abs())) * 1000000) / 1000000)
  }

  // Clone point
  clone () {
    return new Point(this)
  }

  closeTo (p, eta = 0.00001) {
    return this.equals(p) || (Math.abs(this.x - p.x) < eta && Math.abs(this.y - p.y) < eta)
  }

  div (factor) {
    return new Point(this.x / factor, this.y / factor)
  }

  dot (p) {
    return this.x * p.x + this.y * p.y
  }

  equals (p) {
    return this.x === p.x && this.y === p.y
  }

  mul (factor) {
    return new Point(this.x * factor, this.y * factor)
  }

  // Convert to native SVGPoint
  native () {
    // create new point
    var point = new _dom_svg_SVGPoint_js__WEBPACK_IMPORTED_MODULE_0__.SVGPoint()

    // update with current values
    point.x = this.x
    point.y = this.y

    return point
  }

  normal () {
    return new Point(this.y, -this.x)
  }

  normalize () {
    var abs = this.abs()
    if (!abs) throw new Error('Can\'t normalize vector of zero length')
    return this.div(abs)
  }

  reflectAt (p) {
    return p.add(p.sub(this))
  }

  sub (x, y) {
    var p = new Point(x, y)
    return new Point(this.x - p.x, this.y - p.y)
  }

  toArray () {
    return [ this.x, this.y ]
  }

  toPath () {
    return [ 'M', this.x, this.y ].join(' ')
  }

  // transform point with matrix
  transform (matrix) {
    return new Point(this.native().matrixTransform(matrix))
  }

}


/***/ }),

/***/ "./src/utils/NodeIterator.js":
/*!***********************************!*\
  !*** ./src/utils/NodeIterator.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NodeIterator": () => (/* binding */ NodeIterator)
/* harmony export */ });
/* harmony import */ var _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/NodeFilter.js */ "./src/dom/NodeFilter.js");


const showThisNode = (whatToShow, node) => {
  if (whatToShow === _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_ALL) return true
  if (whatToShow & _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_ELEMENT && node.nodeType === node.ELEMENT_NODE) return true
  if (whatToShow & _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_TEXT && node.nodeType === node.TEXT_NODE) return true
  if (whatToShow & _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_ENTITY_REFERENCE && node.nodeType === node.ENTITY_REFERENCE_NODE) return true
  if (whatToShow & _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_ENTITY && node.nodeType === node.ENTITY_NODE) return true
  if (whatToShow & _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_PROCESSING_INSTRUCTION && node.nodeType === node.PROCESSING_INSTRUCTION_NODE) return true
  if (whatToShow & _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_COMMENT && node.nodeType === node.COMMENT_NODE) return true
  if (whatToShow & _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_DOCUMENT && node.nodeType === node.DOCUMENT_NODE) return true
  if (whatToShow & _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_DOCUMENT_TYPE && node.nodeType === node.DOCUMENT_TYPE_NODE) return true
  if (whatToShow & _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_DOCUMENT_FRAGMENT && node.nodeType === node.DOCUMENT_FRAGMENT_NODE) return true
  if (whatToShow & _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_NOTATION && node.nodeType === node.NOTATION_NODE) return true
  return false
}

class NodeIterator {
  constructor (root, whatToShow = _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.SHOW_ALL, filter = () => _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.FILTER_ACCEPT, includeParent = true) {
    this.root = includeParent ? { childNodes: [ root ] } : root
    this.whatToShow = whatToShow
    this.filter = filter
  }

  * [Symbol.iterator] () {
    const nodes = this.root.childNodes

    for (const node of nodes) {
      if (!showThisNode(this.whatToShow, node)) continue

      const filterRet = this.filter(node)

      if (filterRet === _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.FILTER_REJECT) continue
      if (filterRet === _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_0__.NodeFilter.FILTER_ACCEPT) {
        yield node
      }

      yield * new NodeIterator(node, this.whatToShow, this.filter, false)
    }

    return this
  }
}


/***/ }),

/***/ "./src/utils/PointCloud.js":
/*!*********************************!*\
  !*** ./src/utils/PointCloud.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PointCloud": () => (/* binding */ PointCloud)
/* harmony export */ });
/* harmony import */ var _other_Box_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../other/Box.js */ "./src/other/Box.js");


class PointCloud extends Array {
  constructor (...args) {
    if (args.length === 1 && typeof args[0] === 'number') {
      super(args.shift())
    } else {
      super()
    }

    // except multiple point arrays as input and merge them into one
    args.reduce((last, curr) => {
      last.push(...curr)
      return this
    }, this)
  }

  bbox () {
    if (!this.length) {
      return new _other_Box_js__WEBPACK_IMPORTED_MODULE_0__.NoBox()
    }

    let xMin = Infinity
    let xMax = -Infinity
    let yMin = Infinity
    let yMax = -Infinity

    this.forEach(function (p) {
      xMin = Math.min(xMin, p.x)
      xMax = Math.max(xMax, p.x)
      yMin = Math.min(yMin, p.y)
      yMax = Math.max(yMax, p.y)
    })

    return new _other_Box_js__WEBPACK_IMPORTED_MODULE_0__.Box(
      xMin, yMin,
      xMax - xMin,
      yMax - yMin
    )
  }

  merge (cloud) {
    return new PointCloud(this, cloud)
  }

  transform (m) {
    return new PointCloud(this.map((p) => p.transform(m)))
  }

}


/***/ }),

/***/ "./src/utils/bboxUtils.js":
/*!********************************!*\
  !*** ./src/utils/bboxUtils.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPointCloud": () => (/* binding */ getPointCloud)
/* harmony export */ });
/* harmony import */ var _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pathUtils.js */ "./src/utils/pathUtils.js");
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regex.js */ "./src/utils/regex.js");
/* harmony import */ var _textUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./textUtils.js */ "./src/utils/textUtils.js");
/* harmony import */ var _other_Box_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../other/Box.js */ "./src/other/Box.js");
/* harmony import */ var _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PointCloud.js */ "./src/utils/PointCloud.js");
/* harmony import */ var _NodeIterator_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NodeIterator.js */ "./src/utils/NodeIterator.js");
/* harmony import */ var _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom/NodeFilter.js */ "./src/dom/NodeFilter.js");








const applyTransformation = (cloud, node, applyTransformations) => {
  if (node.matrixify && applyTransformations) {
    return cloud.transform(node.matrixify())
  }
  return cloud
}

const getPointCloud = (node, applyTransformations, rbox = false) => {
  const cloud = getPathCloud(node, rbox)
  return applyTransformation(cloud, node, applyTransformations)
}

const getPathCloud = (node, rbox) => {
  if (node.nodeType !== 1) return new _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__.PointCloud()

  switch (node.nodeName) {
  case 'rect':
  case 'image':
  case 'pattern':
  case 'mask':
  case 'foreignObject':
    // Create Path from rect and create PointCloud from Path
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getCloud(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.rect(node))
  case 'svg':
  case 'symbol':
    // return pathUtils.getCloud(pathUtils.pathFrom.rect(node))
    if (rbox) {
      return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getCloud(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.rect(node))
    }
  // ATTENTION: FALL THROUGH
  // Because normal bbox is calculated by the content of the element and not its width and height
  // eslint-disable-next-line
  case 'g':
  case 'clipPath':
  case 'a':
  case 'marker':
    // Iterate trough all children and get the point cloud of each
    // Then transform it with viewbox matrix if needed
    return node.childNodes.reduce((cloud, child) => {
      if (!child.matrixify) return cloud
      return cloud.merge(getPointCloud(child, true).transform(child.generateViewBoxMatrix()))
    }, new _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__.PointCloud())
  case 'circle':
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getCloud(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.circle(node))
  case 'ellipse':
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getCloud(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.ellipse(node))
  case 'line':
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getCloud(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.line(node))
  case 'polyline':
  case 'polygon':
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getCloud(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.polyline(node))
  case 'path':
  case 'glyph':
  case 'missing-glyph':
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getCloud(node.getAttribute('d'))
  case 'use': {
    // Get reference from element
    const ref = node.getAttribute('href') || node.getAttribute('xlink:href')
    // Get the actual referenced Node
    const refNode = node.getRootNode().getElementById(ref.slice(1))
    // Get the BBox of the referenced element and apply the viewbox of <use>
    // TODO: Do we need to apply the transformations of the element?
    // Check bbox of transformed element which is reused with <use>
    return getPointCloud(refNode).transform(node.generateViewBoxMatrix())
  }
  case 'tspan':
  case 'text':
  case 'altGlyph': {
    const box = getTextBBox(node)

    if (box instanceof _other_Box_js__WEBPACK_IMPORTED_MODULE_3__.NoBox) {
      return new _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__.PointCloud()
    }

    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getCloud(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.box(box))
  }
  default:
    return new _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__.PointCloud()
  }
}

const getTextBBox = (node) => {
  const textRoot = findTextRoot(node)
  const boxes = getTextBBoxes(node, textRoot)
  return boxes.filter(isNotEmptyBox).reduce((last, curr) => last.merge(curr), new _other_Box_js__WEBPACK_IMPORTED_MODULE_3__.NoBox())
}

const findTextRoot = (node) => {
  while (node.parentNode) {
    if ((node.nodeName === 'text' && node.parentNode.nodeName === 'text')
    || ((node.nodeName === 'tspan' || node.nodeName === 'textPath') && [ 'tspan', 'text', 'textPath' ].includes(node.parentNode.nodeName))) {
      node = node.parentNode
    } else {
      break
    }
  }

  return node
}

// This function takes a node of which the bbox needs to be calculated
// In order to position the box correctly, we need to know were the parent and were the siblings *before* our node are
// Thats why a textRoot is passed which is the most outer textElement needed to calculate all boxes
// When the iterator hits the element we need the bbox of, it is terminated and this function is called again
// only for the substree of our node and without textRoor but instead pos, dx and dy are known
const getTextBBoxes = function (target, textRoot = target, pos = { x: 0, y: 0 }, dx = [ 0 ], dy = [ 0 ], boxes = []) {

  // Create NodeIterator. Only show elemnts and text and skip descriptive elements
  // TODO: make an instanceof check for DescriptiveElement instead of testing one by one
  // Only title is skipped atm
  const iter = new _NodeIterator_js__WEBPACK_IMPORTED_MODULE_5__.NodeIterator(textRoot, _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_6__.NodeFilter.SHOW_ELEMENT | _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_6__.NodeFilter.SHOW_TEXT, (node) => {
    if (node.nodeName === 'title') return _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_6__.NodeFilter.FILTER_IGNORE
    return _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_6__.NodeFilter.FILTER_ACCEPT
  })

  // Iterate trough all nodes top to bottom, left to right
  for (const node of iter) {

    // If we hit our target, we gathered all positional information we need to move the bbox to the correct spot
    if (node === target && node !== textRoot) {
      return getTextBBoxes(node, node, pos, dx, dy)
    }

    // Traverse trough this node updating positions and add boxes
    getPositionDetailsFor(node, pos, dx, dy, boxes)
  }

  return boxes
}

const isNotEmptyBox = box => box.x !== 0 || box.y !== 0 || box.width !== 0 || box.height !== 0

// This function either updates pos, dx and dy (when its an element) or calculates the boxes for text with the passed arguments
// All arguments are passed by reference so dont overwrite them (treat them as const!)
// TODO: Break this into two functions?
const getPositionDetailsFor = (node, pos, dx, dy, boxes) => {
  if (node.nodeType === node.ELEMENT_NODE) {
    var x = parseFloat(node.getAttribute('x'))
    var y = parseFloat(node.getAttribute('y'))

    pos.x = isNaN(x) ? pos.x : x
    pos.y = isNaN(y) ? pos.y : y

    var dx0 = (node.getAttribute('dx') || '').split(_regex_js__WEBPACK_IMPORTED_MODULE_1__.delimiter).filter(num => num !== '').map(parseFloat)
    var dy0 = (node.getAttribute('dy') || '').split(_regex_js__WEBPACK_IMPORTED_MODULE_1__.delimiter).filter(num => num !== '').map(parseFloat)

    // TODO: eventually replace only as much values as we have text chars (node.textContent.length) because we could end up adding to much
    // replace initial values with node values if present
    dx.splice(0, dx0.length, ...dx0)
    dy.splice(0, dy0.length, ...dy0)
  } else {
    // get text data
    const data = node.data

    let j = 0
    const jl = data.length
    const details = getFontDetails(node)

    // if it is more than one dx/dy single letters are moved by the amount (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx)
    if (dy.length || dx.length) {
      for (;j < jl; j++) {
        // Calculate a box for a single letter
        boxes.push(_textUtils_js__WEBPACK_IMPORTED_MODULE_2__.textBBox(data.substr(j, 1), pos.x, pos.y, details))

        // Add the next position to current one
        pos.x += dx.shift() || 0
        pos.y += dy.shift() || 0

        if (!dy.length && !dx.length) break
      }
    }

    // in case it was only one dx/dy or no more dx/dy move the rest of the text
    boxes.push(_textUtils_js__WEBPACK_IMPORTED_MODULE_2__.textBBox(data.substr(j), pos.x, pos.y, details))
    pos.x += boxes[boxes.length - 1].width
  }
}

/*
// this function is passing dx and dy values by references. Dont assign new values to it
const textIterator = function (node, pos = { x: 0, y: 0 }, dx = [ 0 ], dy = [ 0 ]) {

  var x = parseFloat(node.getAttribute('x'))
  var y = parseFloat(node.getAttribute('y'))

  pos.x = isNaN(x) ? pos.x : x
  pos.y = isNaN(y) ? pos.y : y

  var dx0 = (node.getAttribute('dx') || '').split(regex.delimiter).filter(num => num !== '').map(parseFloat)
  var dy0 = (node.getAttribute('dy') || '').split(regex.delimiter).filter(num => num !== '').map(parseFloat)
  var boxes = []
  var data = ''

  // TODO: eventually replace only as much values as we have text chars (node.textContent.length) because we could end up adding to much
  // replace initial values with node values if present
  dx.splice(0, dx0.length, ...dx0)
  dy.splice(0, dy0.length, ...dy0)

  var i = 0
  var il = node.childNodes.length

  // iterate through all children
  for (; i < il; ++i) {

    // shift next child
    pos.x += dx.shift() || 0
    pos.y += dy.shift() || 0

    // text
    if (node.childNodes[i].nodeType === node.TEXT_NODE) {

      // get text data
      data = node.childNodes[i].data

      let j = 0
      const jl = data.length

      // if it is more than one dx/dy single letters are moved by the amount (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx)
      if (dy.length || dx.length) {
        for (;j < jl; j++) {
          boxes.push(textUtils.textBBox(data.substr(j, 1), pos.x, pos.y, getFontDetails(node)))

          pos.x += dx.shift() || 0
          pos.y += dy.shift() || 0

          if (!dy.length && !dx.length) break
        }
      }

      // in case it was only one dx/dy or no more dx/dy move the rest of the text

      boxes.push(textUtils.textBBox(data.substr(j), pos.x, pos.y, getFontDetails(node)))
      pos.x += boxes[boxes.length - 1].width

    // element
    } else {
      // in case of element, recursively call function again with new start values
      boxes = boxes.concat(textIterator(node.childNodes[i], pos, dx, dy))
    }
  }

  return boxes
} */

const getFontDetails = (node) => {
  if (node.nodeType === node.TEXT_NODE) node = node.parentNode

  let fontSize = null
  let fontFamily = null
  let textAnchor = null
  let dominantBaseline = null

  const textContentElements = [
    'text',
    'tspan',
    'tref',
    'textPath',
    'altGlyph',
    'g'
  ]

  do {
    // TODO: stop on
    if (!fontSize) { fontSize = node.style.fontSize || node.getAttribute('font-size') }
    if (!fontFamily) { fontFamily = node.style.fontFamily || node.getAttribute('font-family') }
    if (!textAnchor) { textAnchor = node.style.textAnchor || node.getAttribute('text-anchor') }
    if (!dominantBaseline) { dominantBaseline = node.style.dominantBaseline || node.getAttribute('dominant-baseline') }
    // TODO: check for alignment-baseline in tspan, tref, textPath, altGlyph
    // TODO: alignment-adjust, baseline-shift
    /*
    if(!alignmentBaseline)
    alignmentBaseline = this.style.alignmentBaseline || this.getAttribute('alignment-baseline')
    */

  } while (
    (node = node.parentNode)
    && node.nodeType === node.ELEMENT_NODE
    && (textContentElements.includes(node.nodeName))
  )

  return {
    fontFamily,
    fontSize,
    textAnchor: textAnchor || 'start',
    // TODO: use central for writing-mode === horizontal https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline
    dominantBaseline: dominantBaseline || 'alphabetical'
    // fontFamilyMappings: this.ownerDocument.fontFamilyMappings,
    // fontDir: this.ownerDocument.fontDir,
    // preloaded: this.ownerDocument._preloaded
  }
}


/***/ }),

/***/ "./src/utils/defaults.js":
/*!*******************************!*\
  !*** ./src/utils/defaults.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fontSize": () => (/* binding */ fontSize),
/* harmony export */   "fontFamily": () => (/* binding */ fontFamily),
/* harmony export */   "fontDir": () => (/* binding */ fontDir),
/* harmony export */   "fontFamilyMappings": () => (/* binding */ fontFamilyMappings)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var _dirname_cjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dirname.cjs */ "./dirname.cjs");

// import { fileURLToPath } from 'url'
 // eslint-disable-line

// use this as soon as import.meta is standardized
// const __dirname = dirname(fileURLToPath(import.meta.url));

const fontSize = 16
const fontFamily = 'sans-serif'
const fontDir = (0,path__WEBPACK_IMPORTED_MODULE_0__.join)(_dirname_cjs__WEBPACK_IMPORTED_MODULE_1__, '../../', 'fonts/')
const fontFamilyMappings = {
  'sans-serif': 'OpenSans-Regular.ttf',
  'Open Sans': 'OpenSans-Regular.ttf'
}


/***/ }),

/***/ "./src/utils/mapUtils.js":
/*!*******************************!*\
  !*** ./src/utils/mapUtils.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "objectToMap": () => (/* binding */ objectToMap),
/* harmony export */   "mapToObject": () => (/* binding */ mapToObject),
/* harmony export */   "mapMap": () => (/* binding */ mapMap),
/* harmony export */   "mapToCss": () => (/* binding */ mapToCss),
/* harmony export */   "cssToMap": () => (/* binding */ cssToMap)
/* harmony export */ });
/* harmony import */ var _utils_strUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/strUtils.js */ "./src/utils/strUtils.js");


const objectToMap = function (obj) {
  if (obj instanceof Map) return new Map(obj)
  return Object.keys(obj).reduce((map, key) => map.set(key, obj[key]), new Map())
}

const mapToObject = function (map) {
  var obj = {}
  map.forEach(function (value, key) {
    obj[key] = value
  })
  return obj
}

const mapMap = function (map, cb) {
  var arr = []
  map.forEach(function (value, key) {
    arr.push(cb(value, key))
  })
  return arr
}

const mapToCss = function (myMap) {
  return mapMap(myMap, function (value, key) {
    if (!value) return false
    return (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_0__.decamelize)(key) + ': ' + value
  }).filter(function (el) { return !!el }).join('; ') + ';' || 0
}

const cssToMap = function (css) {
  return new Map(css.split(/\s*;\s*/).filter(function (el) { return !!el }).map(function (el) {
    return el.split(/\s*:\s*/)
  }))
}


/***/ }),

/***/ "./src/utils/namespaces.js":
/*!*********************************!*\
  !*** ./src/utils/namespaces.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "svg": () => (/* binding */ svg),
/* harmony export */   "xlink": () => (/* binding */ xlink),
/* harmony export */   "html": () => (/* binding */ html),
/* harmony export */   "mathml": () => (/* binding */ mathml),
/* harmony export */   "xml": () => (/* binding */ xml),
/* harmony export */   "xmlns": () => (/* binding */ xmlns)
/* harmony export */ });

const svg = 'http://www.w3.org/2000/svg'
const xlink = 'http://www.w3.org/1999/xlink'
const html = 'http://www.w3.org/1999/xhtml'
const mathml = 'http://www.w3.org/1998/Math/MathML'
const xml = 'http://www.w3.org/XML/1998/namespace'
const xmlns = 'http://www.w3.org/2000/xmlns/'


/***/ }),

/***/ "./src/utils/nodesToNode.js":
/*!**********************************!*\
  !*** ./src/utils/nodesToNode.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nodesToNode": () => (/* binding */ nodesToNode)
/* harmony export */ });
const nodesToNode = (nodes, document) => {
  nodes = nodes.map((node) => {
    if (typeof node === 'string') {
      return document.createTextNode(node)
    }
    return node
  })
  if (nodes.length === 1) { return nodes }
  const node = document.createDocumentFragment()
  nodes.forEach(node.appendChild, node)
  return node
}


/***/ }),

/***/ "./src/utils/objectCreationUtils.js":
/*!******************************************!*\
  !*** ./src/utils/objectCreationUtils.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "extendStatic": () => (/* binding */ extendStatic),
/* harmony export */   "mixin": () => (/* binding */ mixin)
/* harmony export */ });
const extend = (...modules) => {
  var methods, key, i

  // Get object with extensions
  methods = modules.pop()

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) { modules[i].prototype[key] = methods[key] }
  }
}

const extendStatic = (...modules) => {
  var methods, key, i

  // Get object with extensions
  methods = modules.pop()

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) { modules[i][key] = methods[key] }
  }
}

// TODO: refactor so that it takes a class
const mixin = (mixin, _class) => {
  const descriptors = Object.getOwnPropertyDescriptors(mixin)
  // const all = Object.getOwnPropertyNames(mixin)

  // const propNames = Object.keys(descriptors)
  // const methodNames = all.filter(p => !propNames.includes(p))

  // for (const method of methodNames) {
  //   _class.prototype[method] = mixin[method]
  // }

  Object.defineProperties(_class.prototype, descriptors)
}


/***/ }),

/***/ "./src/utils/pathUtils.js":
/*!********************************!*\
  !*** ./src/utils/pathUtils.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pathParser": () => (/* binding */ pathParser),
/* harmony export */   "Arc": () => (/* binding */ Arc),
/* harmony export */   "pathBBox": () => (/* binding */ pathBBox),
/* harmony export */   "pointAtLength": () => (/* binding */ pointAtLength),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "getCloud": () => (/* binding */ getCloud),
/* harmony export */   "pathFrom": () => (/* binding */ pathFrom)
/* harmony export */ });
/* harmony import */ var _other_Box_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../other/Box.js */ "./src/other/Box.js");
/* harmony import */ var _other_Point_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../other/Point.js */ "./src/other/Point.js");
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./regex.js */ "./src/utils/regex.js");
/* harmony import */ var _dom_svg_SVGMatrix_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../dom/svg/SVGMatrix.js */ "./src/dom/svg/SVGMatrix.js");
/* harmony import */ var _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PointCloud.js */ "./src/utils/PointCloud.js");



// TODO: use own matrix implementation



const pathHandlers = {
  M (c, p, r, p0) {
    p.x = p0.x = c[0]
    p.y = p0.y = c[1]

    return new Move(p)
  },
  L (c, p) {
    const ret = new Line(p.x, p.y, c[0], c[1])// .offset(o)
    p.x = c[0]
    p.y = c[1]
    return ret
  },
  H (c, p) {
    return pathHandlers.L([ c[0], p.y ], p)
  },
  V (c, p) {
    return pathHandlers.L([ p.x, c[0] ], p)
  },
  Q (c, p, r) {
    const ret = Cubic.fromQuad(p, new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(c[0], c[1]), new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(c[2], c[3]))// .offset(o)
    p.x = c[2]
    p.y = c[3]

    const reflect = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(c[0], c[1]).reflectAt(p)
    r.x = reflect.x
    r.y = reflect.y

    return ret
  },
  T (c, p, r, p0, reflectionIsPossible) {
    if (reflectionIsPossible) { c = [ r.x, r.y ].concat(c) } else { c = [ p.x, p.y ].concat(c) }
    return pathHandlers.Q(c, p, r)
  },
  C (c, p, r) {
    const ret = new Cubic(p, new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(c[0], c[1]), new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(c[2], c[3]), new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(c[4], c[5]))// .offset(o)
    p.x = c[4]
    p.y = c[5]
    const reflect = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(c[2], c[3]).reflectAt(p)
    r.x = reflect.x
    r.y = reflect.y
    return ret
  },
  S (c, p, r, p0, reflectionIsPossible) {
    // reflection makes only sense if this command was preceeded by another beziere command (QTSC)
    if (reflectionIsPossible) { c = [ r.x, r.y ].concat(c) } else { c = [ p.x, p.y ].concat(c) }
    return pathHandlers.C(c, p, r)
  },
  Z (c, p, r, p0) {
    // FIXME: The behavior of Z depends on the command before
    return pathHandlers.L([ p0.x, p0.y ], p)
  },
  A (c, p, r) {
    const ret = new Arc(p, new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(c[5], c[6]), c[0], c[1], c[2], c[3], c[4])
    p.x = c[5]
    p.y = c[6]
    return ret
  }
}

const mlhvqtcsa = 'mlhvqtcsaz'.split('')

for (let i = 0, il = mlhvqtcsa.length; i < il; ++i) {
  pathHandlers[mlhvqtcsa[i]] = (function (i) {
    return function (c, p, r, p0, reflectionIsPossible) {
      if (i === 'H') c[0] = c[0] + p.x
      else if (i === 'V') c[0] = c[0] + p.y
      else if (i === 'A') {
        c[5] = c[5] + p.x
        c[6] = c[6] + p.y
      } else {
        for (let j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j % 2 ? p.y : p.x)
        }
      }

      return pathHandlers[i](c, p, r, p0, reflectionIsPossible)
    }
  })(mlhvqtcsa[i].toUpperCase())
}

function pathRegReplace (a, b, c, d) {
  return c + d.replace(_regex_js__WEBPACK_IMPORTED_MODULE_2__.dots, ' .')
}

function isBeziere (obj) {
  return obj instanceof Cubic
}

const pathParser = (array) => {

  // prepare for parsing
  const paramCnt = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 }

  array = array
    .replace(_regex_js__WEBPACK_IMPORTED_MODULE_2__.numbersWithDots, pathRegReplace) // convert 45.123.123 to 45.123 .123
    .replace(_regex_js__WEBPACK_IMPORTED_MODULE_2__.pathLetters, ' $& ') // put some room between letters and numbers
    .replace(_regex_js__WEBPACK_IMPORTED_MODULE_2__.hyphen, '$1 -') // add space before hyphen
    .trim() // trim
    .split(_regex_js__WEBPACK_IMPORTED_MODULE_2__.delimiter) // split into array

  // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]
  const arr = []
  const p = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point()
  const p0 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point()
  const r = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point()
  let index = 0
  const len = array.length
  let s

  do {
    // Test if we have a path letter
    if (_regex_js__WEBPACK_IMPORTED_MODULE_2__.isPathLetter.test(array[index])) {
      s = array[index]
      ++index
    // If last letter was a move command and we got no new, it defaults to [L]ine
    } else if (s === 'M') {
      s = 'L'
    } else if (s === 'm') {
      s = 'l'
    }

    arr.push(
      pathHandlers[s].call(null,
        array.slice(index, (index = index + paramCnt[s.toUpperCase()])).map(parseFloat),
        p, r, p0,
        isBeziere(arr[arr.length - 1])
      )
    )

  } while (len > index)

  return arr
}

class Move {
  constructor (p) {
    this.p1 = p.clone()
  }

  // FIXME: Use pointcloud
  bbox () {
    const p = this.p1
    return new _other_Box_js__WEBPACK_IMPORTED_MODULE_0__.Box(p.x, p.y, 0, 0)
  }

  getCloud () {
    return new _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__.PointCloud([ this.p1 ])
  }

  length () { return 0 }

  toPath () {
    return [ 'M', this.p1.x, this.p1.y ].join(' ')
  }

  toPathFragment () {
    return [ 'M', this.p1.x, this.p1.y ]
  }
}

class Arc {
  constructor (p1, p2, rx, ry, φ, arc, sweep) {
    // https://www.w3.org/TR/SVG/implnote.html#ArcCorrectionOutOfRangeRadii
    if (!rx || !ry) return new Line(p1, p2)

    rx = Math.abs(rx)
    ry = Math.abs(ry)

    this.p1 = p1.clone()
    this.p2 = p2.clone()
    this.arc = arc ? 1 : 0
    this.sweep = sweep ? 1 : 0

    // Calculate cos and sin of angle phi
    const cosφ = Math.cos(φ / 180 * Math.PI)
    const sinφ = Math.sin(φ / 180 * Math.PI)

    // https://www.w3.org/TR/SVG/implnote.html#ArcConversionEndpointToCenter
    // (eq. 5.1)
    const p1_ = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(
      (p1.x - p2.x) / 2,
      (p1.y - p2.y) / 2
    ).transform((0,_dom_svg_SVGMatrix_js__WEBPACK_IMPORTED_MODULE_3__.matrixFactory)(
      cosφ, -sinφ, sinφ, cosφ, 0, 0
    ))

    // (eq. 6.2)
    // Make sure the radius fit with the arc and correct if neccessary
    const ratio = (p1_.x ** 2 / rx ** 2) + (p1_.y ** 2 / ry ** 2)

    // (eq. 6.3)
    if (ratio > 1) {
      rx = Math.sqrt(ratio) * rx
      ry = Math.sqrt(ratio) * ry
    }

    // (eq. 5.2)
    const rxQuad = rx ** 2
    const ryQuad = ry ** 2

    const divisor1 = rxQuad * p1_.y ** 2
    const divisor2 = ryQuad * p1_.x ** 2
    const dividend = (rxQuad * ryQuad - divisor1 - divisor2)

    let c_ = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(
      rx * p1_.y / ry,
      -ry * p1_.x / rx
    ).mul(Math.sqrt(
      dividend / (divisor1 + divisor2)
    ))

    if (this.arc === this.sweep) c_ = c_.mul(-1)

    // (eq. 5.3)
    const c = c_.transform((0,_dom_svg_SVGMatrix_js__WEBPACK_IMPORTED_MODULE_3__.matrixFactory)(
      cosφ, sinφ, -sinφ, cosφ, 0, 0
    )).add(new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(
      (p1.x + p2.x) / 2,
      (p1.y + p2.y) / 2
    ))

    const anglePoint = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(
      (p1_.x - c_.x) / rx,
      (p1_.y - c_.y) / ry
    )

    /* For eq. 5.4 see angleTo function */

    // (eq. 5.5)
    const θ = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(1, 0).angleTo(anglePoint)

    // (eq. 5.6)
    let Δθ = anglePoint.angleTo(new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(
      (-p1_.x - c_.x) / rx,
      (-p1_.y - c_.y) / ry
    ))

    Δθ = (Δθ % (2 * Math.PI))

    if (!sweep && Δθ > 0) Δθ -= 2 * Math.PI
    if (sweep && Δθ < 0) Δθ += 2 * Math.PI

    this.c = c
    this.theta = θ * 180 / Math.PI
    this.theta2 = (θ + Δθ) * 180 / Math.PI

    this.delta = Δθ * 180 / Math.PI
    this.rx = rx
    this.ry = ry
    this.phi = φ
    this.cosφ = cosφ
    this.sinφ = sinφ
  }

  static fromCenterForm (c, rx, ry, φ, θ, Δθ) {
    const cosφ = Math.cos(φ / 180 * Math.PI)
    const sinφ = Math.sin(φ / 180 * Math.PI)
    const m = (0,_dom_svg_SVGMatrix_js__WEBPACK_IMPORTED_MODULE_3__.matrixFactory)(cosφ, sinφ, -sinφ, cosφ, 0, 0)

    const p1 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(
      rx * Math.cos(θ / 180 * Math.PI),
      ry * Math.sin(θ / 180 * Math.PI)
    ).transform(m).add(c)

    const p2 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(
      rx * Math.cos((θ + Δθ) / 180 * Math.PI),
      ry * Math.sin((θ + Δθ) / 180 * Math.PI)
    ).transform(m).add(c)

    const arc = Math.abs(Δθ) > 180 ? 1 : 0
    const sweep = Δθ > 0 ? 1 : 0

    return new Arc(p1, p2, rx, ry, φ, arc, sweep)
  }

  bbox () {
    const cloud = this.getCloud()
    return cloud.bbox()
  }

  clone () {
    return new Arc(this.p1, this.p2, this.rx, this.ry, this.phi, this.arc, this.sweep)
  }

  getCloud () {
    if (this.p1.equals(this.p2)) return new _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__.PointCloud([ this.p1 ])

    // arc could be rotated. the min and max values then dont lie on multiples of 90 degress but are shifted by the rotation angle
    // so we first calculate our 0/90 degree angle
    let θ01 = Math.atan(-this.sinφ / this.cosφ * this.ry / this.rx) * 180 / Math.PI
    let θ02 = Math.atan(this.cosφ / this.sinφ * this.ry / this.rx) * 180 / Math.PI
    let θ1 = this.theta
    let θ2 = this.theta2

    if (θ1 < 0 || θ2 < 0) {
      θ1 += 360
      θ2 += 360
    }

    if (θ2 < θ1) {
      const temp = θ1
      θ1 = θ2
      θ2 = temp

    }

    while (θ01 - 90 > θ01) θ01 -= 90
    while (θ01 < θ1) θ01 += 90
    while (θ02 - 90 > θ02) θ02 -= 90
    while (θ02 < θ1) θ02 += 90

    const angleToTest = [ θ01, θ02, (θ01 + 90), (θ02 + 90), (θ01 + 180), (θ02 + 180), (θ01 + 270), (θ02 + 270) ]

    const points = angleToTest.filter(function (angle) {
      return (angle > θ1 && angle < θ2)
    }).map(function (angle) {
      while (this.theta < angle) angle -= 360
      return this.pointAt(((angle - this.theta) % 360) / (this.delta)) // TODO: replace that call with pointAtAngle
    }.bind(this)).concat(this.p1, this.p2)

    return new _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__.PointCloud(points)
  }

  length () {
    if (this.p1.equals(this.p2)) return 0

    const length = this.p2.sub(this.p1).abs()

    const ret = this.splitAt(0.5)
    const len1 = ret[0].p2.sub(ret[0].p1).abs()
    const len2 = ret[1].p2.sub(ret[1].p1).abs()

    if (len1 + len2 - length < 0.00001) {
      return len1 + len2
    }

    return ret[0].length() + ret[1].length()
  }

  pointAt (t) {
    if (this.p1.equals(this.p2)) return this.p1.clone()

    const tInAngle = (this.theta + t * this.delta) / 180 * Math.PI
    const sinθ = Math.sin(tInAngle)
    const cosθ = Math.cos(tInAngle)

    return new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(
      this.cosφ * this.rx * cosθ - this.sinφ * this.ry * sinθ + this.c.x,
      this.sinφ * this.ry * cosθ + this.cosφ * this.rx * sinθ + this.c.y
    )
  }

  splitAt (t) {
    const absDelta = Math.abs(this.delta)
    const delta1 = absDelta * t
    const delta2 = absDelta * (1 - t)

    const pointAtT = this.pointAt(t)

    return [
      new Arc(this.p1, pointAtT, this.rx, this.ry, this.phi, delta1 > 180, this.sweep),
      new Arc(pointAtT, this.p2, this.rx, this.ry, this.phi, delta2 > 180, this.sweep)
    ]
  }

  toPath () {
    return [ 'M', this.p1.x, this.p1.y, 'A', this.rx, this.ry, this.phi, this.arc, this.sweep, this.p2.x, this.p2.y ].join(' ')
  }

  toPathFragment () {
    return [ 'A', this.rx, this.ry, this.phi, this.arc, this.sweep, this.p2.x, this.p2.y ]
  }

  toString () {
    return `p1: ${this.p1.x.toFixed(4)} ${this.p1.y.toFixed(4)}, p2: ${this.p2.x.toFixed(4)} ${this.p2.y.toFixed(4)}, c: ${this.c.x.toFixed(4)} ${this.c.y.toFixed(4)} theta: ${this.theta.toFixed(4)}, theta2: ${this.theta2.toFixed(4)}, delta: ${this.delta.toFixed(4)}, large: ${this.arc}, sweep: ${this.sweep}`
  }

}

class Cubic {
  constructor (p1, c1, c2, p2) {
    if (p1 instanceof _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point) {
      this.p1 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(p1)
      this.c1 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(c1)
      this.c2 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(c2)
      this.p2 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(p2)
    } else {
      this.p1 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(p1.p1)
      this.c1 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(p1.c1)
      this.c2 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(p1.c2)
      this.p2 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(p1.p2)
    }
  }

  static fromQuad (p1, c, p2) {
    const c1 = p1.mul(1 / 3).add(c.mul(2 / 3))
    const c2 = c.mul(2 / 3).add(p2.mul(1 / 3))
    return new Cubic(p1, c1, c2, p2)
  }

  bbox () {
    return this.getCloud().bbox()
  }

  findRoots () {
    return this.findRootsX().concat(this.findRootsY())
  }

  findRootsX () {
    return this.findRootsXY(this.p1.x, this.c1.x, this.c2.x, this.p2.x)
  }

  findRootsXY (p1, p2, p3, p4) {
    const a = 3 * (-p1 + 3 * p2 - 3 * p3 + p4)
    const b = 6 * (p1 - 2 * p2 + p3)
    const c = 3 * (p2 - p1)

    if (a === 0) return [ -c / b ].filter(function (el) { return el > 0 && el < 1 })

    if (b * b - 4 * a * c < 0) return []
    if (b * b - 4 * a * c === 0) return [ Math.round((-b / (2 * a)) * 100000) / 100000 ].filter(function (el) { return el > 0 && el < 1 })

    return [
      Math.round((-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a) * 100000) / 100000,
      Math.round((-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a) * 100000) / 100000
    ].filter(function (el) { return el > 0 && el < 1 })
  }

  findRootsY () {
    return this.findRootsXY(this.p1.y, this.c1.y, this.c2.y, this.p2.y)
  }

  flatness () {
    let ux = Math.pow(3 * this.c1.x - 2 * this.p1.x - this.p2.x, 2)
    let uy = Math.pow(3 * this.c1.y - 2 * this.p1.y - this.p2.y, 2)
    const vx = Math.pow(3 * this.c2.x - 2 * this.p2.x - this.p1.x, 2)
    const vy = Math.pow(3 * this.c2.y - 2 * this.p2.y - this.p1.y, 2)

    if (ux < vx) { ux = vx }
    if (uy < vy) { uy = vy }

    return ux + uy
  }

  getCloud () {
    const points = this.findRoots()
      .filter(root => root !== 0 && root !== 1)
      .map(root => this.pointAt(root))
      .concat(this.p1, this.p2)

    return new _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__.PointCloud(points)
  }

  length () {
    return this.lengthAt()
  }

  lengthAt (t = 1) {
    const curves = this.splitAt(t)[0].makeFlat(t)

    let length = 0
    for (let i = 0, len = curves.length; i < len; ++i) {
      length += curves[i].p2.sub(curves[i].p1).abs()
    }

    return length
  }

  makeFlat (t) {
    if (this.flatness() > 0.15) {
      return this.splitAt(0.5)
        .map(function (el) { return el.makeFlat(t * 0.5) })
        .reduce(function (last, current) { return last.concat(current) }, [])
    } else {
      this.t_value = t
      return [ this ]
    }
  }

  pointAt (t) {
    return new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(
      (1 - t) * (1 - t) * (1 - t) * this.p1.x + 3 * (1 - t) * (1 - t) * t * this.c1.x + 3 * (1 - t) * t * t * this.c2.x + t * t * t * this.p2.x,
      (1 - t) * (1 - t) * (1 - t) * this.p1.y + 3 * (1 - t) * (1 - t) * t * this.c1.y + 3 * (1 - t) * t * t * this.c2.y + t * t * t * this.p2.y
    )
  }

  splitAt (z) {
    const x = this.splitAtScalar(z, 'x')
    const y = this.splitAtScalar(z, 'y')

    const a = new Cubic(
      new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(x[0][0], y[0][0]),
      new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(x[0][1], y[0][1]),
      new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(x[0][2], y[0][2]),
      new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(x[0][3], y[0][3])
    )

    const b = new Cubic(
      new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(x[1][0], y[1][0]),
      new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(x[1][1], y[1][1]),
      new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(x[1][2], y[1][2]),
      new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(x[1][3], y[1][3])
    )

    return [ a, b ]
  }

  splitAtScalar (z, p) {
    const p1 = this.p1[p]
    const p2 = this.c1[p]
    const p3 = this.c2[p]
    const p4 = this.p2[p]

    const t = z * z * z * p4 - 3 * z * z * (z - 1) * p3 + 3 * z * (z - 1) * (z - 1) * p2 - (z - 1) * (z - 1) * (z - 1) * p1

    return [
      [
        p1,
        z * p2 - (z - 1) * p1,
        z * z * p3 - 2 * z * (z - 1) * p2 + (z - 1) * (z - 1) * p1,
        t
      ],
      [
        t,
        z * z * p4 - 2 * z * (z - 1) * p3 + (z - 1) * (z - 1) * p2,
        z * p4 - (z - 1) * p3,
        p4
      ]
    ]
  }

  toPath () {
    return [ 'M', this.p1.x, this.p1.y ].concat(this.toPathFragment()).join(' ')
  }

  toPathFragment () {
    return [ 'C', this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.p2.x, this.p2.y ]
  }

}

class Line {
  constructor (x1, y1, x2, y2) {
    if (x1 instanceof Object) {
      this.p1 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(x1)
      this.p2 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(y1)
    } else {
      this.p1 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(x1, y1)
      this.p2 = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(x2, y2)
    }
  }

  bbox () {
    return this.getCloud().bbox()
  }

  getCloud () {
    return new _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__.PointCloud([ this.p1, this.p2 ])
  }

  length () {
    return this.p2.sub(this.p1).abs()
  }

  pointAt (t) {
    const vec = this.p2.sub(this.p1).mul(t)
    return this.p1.add(vec)
  }

  toPath () {
    return [ 'M', this.p1.x, this.p1.y, this.p2.x, this.p2.y ].join(' ')
  }

  toPathFragment () {
    return [ 'L', this.p2.x, this.p2.y ]
  }
}

const pathBBox = function (d) {
  return pathParser(d).reduce((l, c) => l.merge(c.bbox()), new _other_Box_js__WEBPACK_IMPORTED_MODULE_0__.NoBox())
}

const pointAtLength = function (d, len) {
  const segs = pathParser(d)

  const segLengths = segs.map(el => el.length())

  const length = segLengths.reduce((l, c) => l + c, 0)

  let i = 0

  let t = len / length

  // FIXME: Pop Move before using shortcut?
  // shortcut for trivial cases
  if (t >= 1) {
    // Check if there is a p2. If not, use p1
    if (segs[segs.length - 1].p2) {
      return segs[segs.length - 1].p2.native()
    } else {
      return segs[segs.length - 1].p1.native()
    }
  }

  if (t <= 0) return segs[0].p1.native()

  // remove move commands at the very end of the path
  while (segs[segs.length - 1] instanceof Move) segs.pop()

  let segEnd = 0

  for (const il = segLengths.length; i < il; ++i) {
    const k = segLengths[i] / length
    segEnd += k

    if (segEnd > t) {
      break
    }
  }

  const ratio = length / segLengths[i]
  t = ratio * (t - segEnd) + 1

  return segs[i].pointAt(t).native()
}

const length = function (d) {
  return pathParser(d)
    .reduce((l, c) => l + c.length(), 0)
}

const debug = function (node) {
  const parse = pathParser(node.getAttribute('d'))

  const ret = {
    paths: parse.map(el => el.toPath()),
    fragments: parse.map(el => el.toPathFragment().join(' ')),
    bboxs: parse.map(el => {
      const box = el.bbox()
      return [ box.x, box.y, box.width, box.height ]
    }),
    bbox: parse.reduce((l, c) => l.merge(c.bbox()), new _other_Box_js__WEBPACK_IMPORTED_MODULE_0__.NoBox()),
    bboxs_new: parse.map(el => {
      return el.getCloud().transform(node.matrixify()).bbox()
    })
  }

  return Object.assign({}, ret, {
    bbox_new: ret.bboxs_new.reduce((l, c) => l.merge(c), new _other_Box_js__WEBPACK_IMPORTED_MODULE_0__.NoBox())
  })
}

const getCloud = (d) => {
  return pathParser(d).reduce((cloud, segment) =>
    segment.getCloud().merge(cloud), new _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__.PointCloud()
  )
}

const pathFrom = {
  box ({ x, y, width, height }) {
    return `M ${x} ${y} h ${width} v ${height} H ${x} V ${y}`
  },
  rect (node) {
    const width = parseFloat(node.getAttribute('width')) || 0
    const height = parseFloat(node.getAttribute('height')) || 0
    const x = parseFloat(node.getAttribute('x')) || 0
    const y = parseFloat(node.getAttribute('y')) || 0
    return `M ${x} ${y} h ${width} v ${height} H ${x} V ${y}`
  },
  circle (node) {
    const r = parseFloat(node.getAttribute('r')) || 0
    const x = parseFloat(node.getAttribute('cx')) || 0
    const y = parseFloat(node.getAttribute('cy')) || 0

    if (r === 0) return 'M0 0'

    return `M ${x - r} ${y} A ${r} ${r} 0 0 0 ${x + r} ${y} A ${r} ${r} 0 0 0 ${x - r} ${y}`
  },
  ellipse (node) {
    const rx = parseFloat(node.getAttribute('rx')) || 0
    const ry = parseFloat(node.getAttribute('ry')) || 0
    const x = parseFloat(node.getAttribute('cx')) || 0
    const y = parseFloat(node.getAttribute('cy')) || 0

    return `M ${x - rx} ${y} A ${rx} ${ry} 0 0 0 ${x + rx} ${y} A ${rx} ${ry} 0 0 0 ${x - rx} ${y}`
  },
  line (node) {
    const x1 = parseFloat(node.getAttribute('x1')) || 0
    const x2 = parseFloat(node.getAttribute('x2')) || 0
    const y1 = parseFloat(node.getAttribute('y1')) || 0
    const y2 = parseFloat(node.getAttribute('y2')) || 0

    return `M ${x1} ${y1} L ${x2} ${y2}`
  },
  polygon (node) {
    return `M ${node.getAttribute('points')} z`
  },
  polyline (node) {
    return `M ${node.getAttribute('points')}`
  }
}


/***/ }),

/***/ "./src/utils/regex.js":
/*!****************************!*\
  !*** ./src/utils/regex.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transforms": () => (/* binding */ transforms),
/* harmony export */   "delimiter": () => (/* binding */ delimiter),
/* harmony export */   "hyphen": () => (/* binding */ hyphen),
/* harmony export */   "pathLetters": () => (/* binding */ pathLetters),
/* harmony export */   "isPathLetter": () => (/* binding */ isPathLetter),
/* harmony export */   "numbersWithDots": () => (/* binding */ numbersWithDots),
/* harmony export */   "dots": () => (/* binding */ dots)
/* harmony export */ });
// splits a transformation chain
const transforms = /\)\s*,?\s*/

// split at whitespace and comma
const delimiter = /[\s,]+/

// The following regex are used to parse the d attribute of a path

// Matches all hyphens which are not after an exponent
const hyphen = /([^e])-/gi

// Replaces and tests for all path letters
const pathLetters = /[MLHVCSQTAZ]/gi

// yes we need this one, too
const isPathLetter = /[MLHVCSQTAZ]/i

// matches 0.154.23.45
const numbersWithDots = /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi

// matches .
const dots = /\./g


/***/ }),

/***/ "./src/utils/strUtils.js":
/*!*******************************!*\
  !*** ./src/utils/strUtils.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fullHex": () => (/* binding */ fullHex),
/* harmony export */   "hexToRGB": () => (/* binding */ hexToRGB),
/* harmony export */   "decamelize": () => (/* binding */ decamelize),
/* harmony export */   "camelCase": () => (/* binding */ camelCase),
/* harmony export */   "removeQuotes": () => (/* binding */ removeQuotes),
/* harmony export */   "htmlEntities": () => (/* binding */ htmlEntities),
/* harmony export */   "unhtmlEntities": () => (/* binding */ unhtmlEntities),
/* harmony export */   "cdata": () => (/* binding */ cdata),
/* harmony export */   "comment": () => (/* binding */ comment),
/* harmony export */   "splitNotInBrackets": () => (/* binding */ splitNotInBrackets)
/* harmony export */ });
// Ensure to six-based hex
const fullHex = function (hex) {
  return hex.length === 4
    ? [ '#',
      hex.substring(1, 2), hex.substring(1, 2),
      hex.substring(2, 3), hex.substring(2, 3),
      hex.substring(3, 4), hex.substring(3, 4)
    ].join('') : hex
}

const hexToRGB = function (valOrMap) {
  if (typeof valOrMap instanceof Map) {
    for (const [ key, val ] of valOrMap) {
      valOrMap.set(key, hexToRGB(val))
    }
    return valOrMap
  }

  if (!/#[0-9a-f]{3,6}/.test(valOrMap)) { return valOrMap }

  valOrMap = fullHex(valOrMap)

  return 'rgb(' + [
    parseInt(valOrMap.slice(1, 3), 16),
    parseInt(valOrMap.slice(3, 5), 16),
    parseInt(valOrMap.slice(5, 7), 16)
  ].join(',') + ')'
}

function decamelize (s) {
  return String(s).replace(/([a-z])([A-Z])/g, function (m, g1, g2) {
    return g1 + '-' + g2.toLowerCase()
  })
}

function camelCase (s) {
  return String(s).replace(/([a-z])-([a-z])/g, function (m, g1, g2) {
    return g1 + g2.toUpperCase()
  })
}

function removeQuotes (str) {
  if (str.startsWith('"') || str.startsWith("'")) {
    return str.slice(1, -1)
  }
  return str
}

function htmlEntities (str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function unhtmlEntities (str) {
  return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace('&quot;', '"')
}

function cdata (str) {
  return `<![CDATA[${str}]]>`
}

function comment (str) {
  return `<!--${str}-->`
}

const splitNotInBrackets = (str, delimiter) => {
  var roundBrackets = 0

  var squareBrackets = 0

  var lastIndex = 0

  var split = []

  var ch; var i; var il

  for (i = 0, il = str.length; i < il; ++i) {
    ch = str.charAt(i)

    if (ch === delimiter && !roundBrackets && !squareBrackets) {
      split.push(str.slice(lastIndex, i).trim())
      lastIndex = i + 1
      continue
    }

    if (ch === '(') ++roundBrackets
    else if (ch === ')') --roundBrackets
    else if (ch === '[') ++squareBrackets
    else if (ch === ']') --squareBrackets
  }

  split.push(str.slice(lastIndex).trim())
  return split
}


/***/ }),

/***/ "./src/utils/tagUtils.js":
/*!*******************************!*\
  !*** ./src/utils/tagUtils.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tag": () => (/* binding */ tag),
/* harmony export */   "cloneNode": () => (/* binding */ cloneNode)
/* harmony export */ });
const htmlEntities = function (str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

var emptyElements = {
  br: true,
  hr: true,
  img: true,
  link: true
}

const tag = function (node) {
  const attrs = [ ...node.attrs ].map(function (node) {
    return (node.prefix ? node.prefix + ':' : '') + node.localName + '="' + htmlEntities(node.value) + '"'
  })

  const { prefix, localName } = node
  const qualifiedName = (prefix ? prefix + ':' : '') + localName

  return '<' + [].concat(qualifiedName, attrs).join(' ') + '>' + (emptyElements[qualifiedName.toLowerCase()] ? '' : node.innerHTML + '</' + qualifiedName + '>')
}

const cloneNode = function (node) {

  const { prefix, localName, namespaceURI: ns, nodeValue, ownerDocument } = node

  // Build up the correctly cased qualified name
  const qualifiedName = (prefix ? prefix + ':' : '') + localName

  // Check if node was created using non-namespace function which can lead to : in the localName.
  // This check allows false negatives because `local` only matters IF there are : in the localName
  // and we dont care about it when there are non
  const local = localName.includes(':')

  var clone = new node.constructor(qualifiedName, {
    attrs: new Set([ ...node.attrs ].map(node => node.cloneNode())),
    nodeValue,
    ownerDocument,
    local
  }, ns)

  return clone
}


/***/ }),

/***/ "./src/utils/textUtils.js":
/*!********************************!*\
  !*** ./src/utils/textUtils.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "textBBox": () => (/* binding */ textBBox)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var fontkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fontkit */ "fontkit");
/* harmony import */ var _defaults_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaults.js */ "./src/utils/defaults.js");
/* harmony import */ var _other_Box_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../other/Box.js */ "./src/other/Box.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config.js */ "./src/config.js");






const textBBox = function (text, x, y, details) {

  if (!text) return new _other_Box_js__WEBPACK_IMPORTED_MODULE_3__.NoBox()

  const config = (0,_config_js__WEBPACK_IMPORTED_MODULE_4__.getConfig)()
  const preloaded = (0,_config_js__WEBPACK_IMPORTED_MODULE_4__.getFonts)()

  var families = (details.fontFamily || _defaults_js__WEBPACK_IMPORTED_MODULE_2__.fontFamily).split(/\s*,\s*/)
  var fontMap = Object.assign({}, _defaults_js__WEBPACK_IMPORTED_MODULE_2__.fontFamilyMappings, config.fontFamilyMappings)
  var fontSize = details.fontSize || _defaults_js__WEBPACK_IMPORTED_MODULE_2__.fontSize
  var fontDir = config.fontDir || _defaults_js__WEBPACK_IMPORTED_MODULE_2__.fontDir
  var fontFamily
  var font

  for (var i = 0, il = families.length; i < il; ++i) {
    if (fontMap[families[i]]) {
      fontFamily = families[i]
      break
    }
  }

  if (!fontFamily) {
    fontFamily = _defaults_js__WEBPACK_IMPORTED_MODULE_2__.fontFamily
  }

  if (preloaded[fontFamily]) {
    font = preloaded[fontFamily]
  } else {
    const filename = path__WEBPACK_IMPORTED_MODULE_0__.join(fontDir, fontMap[fontFamily])
    try {
      font = fontkit__WEBPACK_IMPORTED_MODULE_1__.openSync(filename)
    } catch (e) {
      console.warn(`Could not open font "${fontFamily}" in file "${filename}". ${e.toString()}`)
      return new _other_Box_js__WEBPACK_IMPORTED_MODULE_3__.NoBox()
    }

    preloaded[fontFamily] = font
  }

  var fontHeight = font.ascent - font.descent
  var lineHeight = fontHeight > font.unitsPerEm ? fontHeight : fontHeight + font.lineGap

  var height = lineHeight / font.unitsPerEm * fontSize
  var width = font.layout(text).glyphs.reduce((last, curr) => last + curr.advanceWidth, 0) / font.unitsPerEm * fontSize

  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
  var xAdjust = 0
  if (details.textAnchor === 'end') {
    xAdjust = -width
  } else if (details.textAnchor === 'middle') {
    xAdjust = -width / 2
  }

  // https://www.w3.org/TR/2002/WD-css3-linebox-20020515/
  // 4.2. Baseline identifiers
  var yAdjust = font.ascent // alphabetic
  if (details.dominantBaseline === 'before-edge' || details.dominantBaseline === 'text-before-edge') {
    yAdjust = 0
  } else if (details.dominantBaseline === 'hanging') {
    yAdjust = font.ascent - font.xHeight - font.capHeight
  } else if (details.dominantBaseline === 'mathematical') {
    yAdjust = font.ascent - font.xHeight
  } else if (details.dominantBaseline === 'middle') {
    yAdjust = font.ascent - font.xHeight / 2
  } else if (details.dominantBaseline === 'central') {
    yAdjust = font.ascent / 2 + font.descent / 2
  } else if (details.dominantBaseline === 'ideographic') {
    yAdjust = font.ascent + font.descent
  }

  return new _other_Box_js__WEBPACK_IMPORTED_MODULE_3__.Box(x + xAdjust, y - yAdjust / font.unitsPerEm * fontSize, width, height)
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./main-module.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Attr": () => (/* reexport safe */ _src_dom_Attr_js__WEBPACK_IMPORTED_MODULE_1__.Attr),
/* harmony export */   "CharacterData": () => (/* reexport safe */ _src_dom_CharacterData_js__WEBPACK_IMPORTED_MODULE_2__.CharacterData),
/* harmony export */   "Comment": () => (/* reexport safe */ _src_dom_Comment_js__WEBPACK_IMPORTED_MODULE_3__.Comment),
/* harmony export */   "CustomEvent": () => (/* reexport safe */ _src_dom_CustomEvent_js__WEBPACK_IMPORTED_MODULE_4__.CustomEvent),
/* harmony export */   "DOMImplementation": () => (/* reexport safe */ _src_dom_Document_js__WEBPACK_IMPORTED_MODULE_5__.DOMImplementation),
/* harmony export */   "Document": () => (/* reexport safe */ _src_dom_Document_js__WEBPACK_IMPORTED_MODULE_5__.Document),
/* harmony export */   "DocumentFragment": () => (/* reexport safe */ _src_dom_DocumentFragment_js__WEBPACK_IMPORTED_MODULE_6__.DocumentFragment),
/* harmony export */   "Element": () => (/* reexport safe */ _src_dom_Element_js__WEBPACK_IMPORTED_MODULE_7__.Element),
/* harmony export */   "Event": () => (/* reexport safe */ _src_dom_Event_js__WEBPACK_IMPORTED_MODULE_8__.Event),
/* harmony export */   "EventTarget": () => (/* reexport safe */ _src_dom_EventTarget_js__WEBPACK_IMPORTED_MODULE_9__.EventTarget),
/* harmony export */   "Node": () => (/* reexport safe */ _src_dom_Node_js__WEBPACK_IMPORTED_MODULE_10__.Node),
/* harmony export */   "NodeFilter": () => (/* reexport safe */ _src_dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_11__.NodeFilter),
/* harmony export */   "Text": () => (/* reexport safe */ _src_dom_Text_js__WEBPACK_IMPORTED_MODULE_12__.Text),
/* harmony export */   "Window": () => (/* reexport safe */ _src_dom_Window_js__WEBPACK_IMPORTED_MODULE_13__.Window),
/* harmony export */   "HTMLElement": () => (/* reexport safe */ _src_dom_html_HTMLElement_js__WEBPACK_IMPORTED_MODULE_14__.HTMLElement),
/* harmony export */   "HTMLImageElement": () => (/* reexport safe */ _src_dom_html_HTMLImageElement_js__WEBPACK_IMPORTED_MODULE_15__.HTMLImageElement),
/* harmony export */   "HTMLLinkElement": () => (/* reexport safe */ _src_dom_html_HTMLLinkElement_js__WEBPACK_IMPORTED_MODULE_16__.HTMLLinkElement),
/* harmony export */   "HTMLParser": () => (/* reexport safe */ _src_dom_html_HTMLParser_js__WEBPACK_IMPORTED_MODULE_17__.HTMLParser),
/* harmony export */   "HTMLScriptElement": () => (/* reexport safe */ _src_dom_html_HTMLScriptElement_js__WEBPACK_IMPORTED_MODULE_18__.HTMLScriptElement),
/* harmony export */   "elementAccess": () => (/* reexport safe */ _src_dom_mixins_elementAccess_js__WEBPACK_IMPORTED_MODULE_19__.elementAccess),
/* harmony export */   "ParentNode": () => (/* reexport safe */ _src_dom_mixins_ParentNode_js__WEBPACK_IMPORTED_MODULE_20__.ParentNode),
/* harmony export */   "SVGElement": () => (/* reexport safe */ _src_dom_svg_SVGElement_js__WEBPACK_IMPORTED_MODULE_21__.SVGElement),
/* harmony export */   "SVGGraphicsElement": () => (/* reexport safe */ _src_dom_svg_SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_22__.SVGGraphicsElement),
/* harmony export */   "SVGMatrix": () => (/* reexport safe */ _src_dom_svg_SVGMatrix_js__WEBPACK_IMPORTED_MODULE_23__.SVGMatrix),
/* harmony export */   "matrixFactory": () => (/* reexport safe */ _src_dom_svg_SVGMatrix_js__WEBPACK_IMPORTED_MODULE_23__.matrixFactory),
/* harmony export */   "SVGPathElement": () => (/* reexport safe */ _src_dom_svg_SVGPathElement_js__WEBPACK_IMPORTED_MODULE_24__.SVGPathElement),
/* harmony export */   "SVGPoint": () => (/* reexport safe */ _src_dom_svg_SVGPoint_js__WEBPACK_IMPORTED_MODULE_25__.SVGPoint),
/* harmony export */   "SVGSVGElement": () => (/* reexport safe */ _src_dom_svg_SVGSVGElement_js__WEBPACK_IMPORTED_MODULE_26__.SVGSVGElement),
/* harmony export */   "SVGTextContentElement": () => (/* reexport safe */ _src_dom_svg_SVGTextContentElement_js__WEBPACK_IMPORTED_MODULE_27__.SVGTextContentElement),
/* harmony export */   "config": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.config),
/* harmony export */   "getConfig": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.getConfig),
/* harmony export */   "getFonts": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.getFonts),
/* harmony export */   "preloadFonts": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.preloadFonts),
/* harmony export */   "setFontDir": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.setFontDir),
/* harmony export */   "setFontFamilyMappings": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.setFontFamilyMappings),
/* harmony export */   "createDocument": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createDocument),
/* harmony export */   "createHTMLDocument": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createHTMLDocument),
/* harmony export */   "createHTMLWindow": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createHTMLWindow),
/* harmony export */   "createSVGDocument": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createSVGDocument),
/* harmony export */   "createSVGWindow": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createSVGWindow),
/* harmony export */   "createWindow": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createWindow),
/* harmony export */   "defaults": () => (/* reexport module object */ _src_utils_defaults_js__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _src_utils_defaults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/utils/defaults.js */ "./src/utils/defaults.js");
/* harmony import */ var _src_dom_Attr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/dom/Attr.js */ "./src/dom/Attr.js");
/* harmony import */ var _src_dom_CharacterData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/dom/CharacterData.js */ "./src/dom/CharacterData.js");
/* harmony import */ var _src_dom_Comment_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/dom/Comment.js */ "./src/dom/Comment.js");
/* harmony import */ var _src_dom_CustomEvent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/dom/CustomEvent.js */ "./src/dom/CustomEvent.js");
/* harmony import */ var _src_dom_Document_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/dom/Document.js */ "./src/dom/Document.js");
/* harmony import */ var _src_dom_DocumentFragment_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/dom/DocumentFragment.js */ "./src/dom/DocumentFragment.js");
/* harmony import */ var _src_dom_Element_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/dom/Element.js */ "./src/dom/Element.js");
/* harmony import */ var _src_dom_Event_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/dom/Event.js */ "./src/dom/Event.js");
/* harmony import */ var _src_dom_EventTarget_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./src/dom/EventTarget.js */ "./src/dom/EventTarget.js");
/* harmony import */ var _src_dom_Node_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./src/dom/Node.js */ "./src/dom/Node.js");
/* harmony import */ var _src_dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./src/dom/NodeFilter.js */ "./src/dom/NodeFilter.js");
/* harmony import */ var _src_dom_Text_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./src/dom/Text.js */ "./src/dom/Text.js");
/* harmony import */ var _src_dom_Window_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./src/dom/Window.js */ "./src/dom/Window.js");
/* harmony import */ var _src_dom_html_HTMLElement_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./src/dom/html/HTMLElement.js */ "./src/dom/html/HTMLElement.js");
/* harmony import */ var _src_dom_html_HTMLImageElement_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./src/dom/html/HTMLImageElement.js */ "./src/dom/html/HTMLImageElement.js");
/* harmony import */ var _src_dom_html_HTMLLinkElement_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./src/dom/html/HTMLLinkElement.js */ "./src/dom/html/HTMLLinkElement.js");
/* harmony import */ var _src_dom_html_HTMLParser_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./src/dom/html/HTMLParser.js */ "./src/dom/html/HTMLParser.js");
/* harmony import */ var _src_dom_html_HTMLScriptElement_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./src/dom/html/HTMLScriptElement.js */ "./src/dom/html/HTMLScriptElement.js");
/* harmony import */ var _src_dom_mixins_elementAccess_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./src/dom/mixins/elementAccess.js */ "./src/dom/mixins/elementAccess.js");
/* harmony import */ var _src_dom_mixins_ParentNode_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./src/dom/mixins/ParentNode.js */ "./src/dom/mixins/ParentNode.js");
/* harmony import */ var _src_dom_svg_SVGElement_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./src/dom/svg/SVGElement.js */ "./src/dom/svg/SVGElement.js");
/* harmony import */ var _src_dom_svg_SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./src/dom/svg/SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");
/* harmony import */ var _src_dom_svg_SVGMatrix_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./src/dom/svg/SVGMatrix.js */ "./src/dom/svg/SVGMatrix.js");
/* harmony import */ var _src_dom_svg_SVGPathElement_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./src/dom/svg/SVGPathElement.js */ "./src/dom/svg/SVGPathElement.js");
/* harmony import */ var _src_dom_svg_SVGPoint_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./src/dom/svg/SVGPoint.js */ "./src/dom/svg/SVGPoint.js");
/* harmony import */ var _src_dom_svg_SVGSVGElement_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./src/dom/svg/SVGSVGElement.js */ "./src/dom/svg/SVGSVGElement.js");
/* harmony import */ var _src_dom_svg_SVGTextContentElement_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./src/dom/svg/SVGTextContentElement.js */ "./src/dom/svg/SVGTextContentElement.js");
/* harmony import */ var _src_config_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./src/config.js */ "./src/config.js");
/* harmony import */ var _src_factories_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./src/factories.js */ "./src/factories.js");


































})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBWTtBQUNaLHNFQUFNOzs7Ozs7Ozs7Ozs7Ozs7O0FDOVp3RDtBQUM5RDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJFQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7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QUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxhQUFhLDhDQUFHO0FBQ2hCOzs7Ozs7O1VDN0VBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTm1EO0FBQ25EO0FBQ2lDO0FBQ1M7QUFDTjtBQUNJO0FBQ0g7QUFDUTtBQUNUO0FBQ0Y7QUFDTTtBQUNQO0FBQ007QUFDTjtBQUNFO0FBQ1U7QUFDSztBQUNEO0FBQ0w7QUFDTztBQUNGO0FBQ0g7QUFDSDtBQUNRO0FBQ1Q7QUFDSztBQUNOO0FBQ0s7QUFDUTtBQUN0RDtBQUMrQjtBQUNHO0FBQ2YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmdkb20vZXh0ZXJuYWwgY29tbW9uanMgXCIuL3NyYy91dGlscy9kaXJuYW1lLmNqc1wiIiwid2VicGFjazovL3N2Z2RvbS9leHRlcm5hbCBjb21tb25qcyBcImZvbnRraXRcIiIsIndlYnBhY2s6Ly9zdmdkb20vZXh0ZXJuYWwgY29tbW9uanMgXCJpbWFnZS1zaXplXCIiLCJ3ZWJwYWNrOi8vc3ZnZG9tL2V4dGVybmFsIGNvbW1vbmpzIFwic2F4XCIiLCJ3ZWJwYWNrOi8vc3ZnZG9tL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0F0dHIuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9DaGFyYWN0ZXJEYXRhLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vQ29tbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0N1c3RvbUV2ZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vRG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9Eb2N1bWVudEZyYWdtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vRG9jdW1lbnRUeXBlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0V2ZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9Ob2RlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vTm9kZUZpbHRlci5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL1RleHQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9XaW5kb3cuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9odG1sL0hUTUxFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vaHRtbC9IVE1MSW1hZ2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vaHRtbC9IVE1MTGlua0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9odG1sL0hUTUxQYXJzZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vbWl4aW5zL0NoaWxkTm9kZS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL21peGlucy9Ob25Eb2N1bWVudFR5cGVDaGlsZE5vZGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9taXhpbnMvTm9uRWxlbWVudFBhcmVudE5vZGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9taXhpbnMvUGFyZW50Tm9kZS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL21peGlucy9lbGVtZW50QWNjZXNzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHR3JhcGhpY3NFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR01hdHJpeC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdQYXRoRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdQb2ludC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdTVkdFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR1RleHRDb250ZW50RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZmFjdG9yaWVzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9vdGhlci9Cb3guanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL290aGVyL0Nzc1F1ZXJ5LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9vdGhlci9Qb2ludC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvTm9kZUl0ZXJhdG9yLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9Qb2ludENsb3VkLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9iYm94VXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL2RlZmF1bHRzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9tYXBVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvbmFtZXNwYWNlcy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvbm9kZXNUb05vZGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL29iamVjdENyZWF0aW9uVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL3BhdGhVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvcmVnZXguanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL3N0clV0aWxzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy90YWdVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvdGV4dFV0aWxzLmpzIiwid2VicGFjazovL3N2Z2RvbS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdmdkb20vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3N2Z2RvbS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3N2Z2RvbS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3N2Z2RvbS8uL21haW4tbW9kdWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vc3JjL3V0aWxzL2Rpcm5hbWUuY2pzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZvbnRraXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW1hZ2Utc2l6ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzYXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgZm9udGtpdCBmcm9tICdmb250a2l0J1xyXG5cclxuY29uc3QgX2NvbmZpZyA9IHt9XHJcbmNvbnN0IGZvbnRzID0ge31cclxuXHJcbmV4cG9ydCBjb25zdCBzZXRGb250RGlyID0gZnVuY3Rpb24gKGRpcikge1xyXG4gIF9jb25maWcuZm9udERpciA9IGRpclxyXG4gIHJldHVybiB0aGlzXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzZXRGb250RmFtaWx5TWFwcGluZ3MgPSBmdW5jdGlvbiAobWFwKSB7XHJcbiAgX2NvbmZpZy5mb250RmFtaWx5TWFwcGluZ3MgPSBtYXBcclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG4vLyBUT0RPOiBtYWtlIGFzeW5jXHJcbmV4cG9ydCBjb25zdCBwcmVsb2FkRm9udHMgPSAoKSA9PiB7XHJcbiAgdmFyIG1hcCA9IF9jb25maWcuZm9udEZhbWlseU1hcHBpbmdzXHJcblxyXG4gIGZvciAoY29uc3QgWyBmb250LCBmaWxlIF0gb2YgT2JqZWN0LmVudHJpZXMobWFwKSkge1xyXG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmpvaW4oX2NvbmZpZy5mb250RGlyLCBmaWxlKVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGZvbnRzW2ZvbnRdID0gZm9udGtpdC5vcGVuU3luYyhmaWxlbmFtZSlcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgbG9hZCBmb250IGZpbGUgZm9yICR7Zm9udH1gLCBlKVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q29uZmlnID0gKCkgPT4gX2NvbmZpZ1xyXG5leHBvcnQgY29uc3QgZ2V0Rm9udHMgPSAoKSA9PiBmb250c1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcclxuICBzZXRGb250RGlyLFxyXG4gIHNldEZvbnRGYW1pbHlNYXBwaW5ncyxcclxuICBwcmVsb2FkRm9udHMsXHJcbiAgZ2V0Q29uZmlnLFxyXG4gIGdldEZvbnRzXHJcbn1cclxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcclxuaW1wb3J0IHsgaHRtbCB9IGZyb20gJy4uL3V0aWxzL25hbWVzcGFjZXMuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgQXR0ciBleHRlbmRzIE5vZGUge1xyXG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcywgbnMpIHtcclxuICAgIHN1cGVyKG5hbWUsIHsgbm9kZVZhbHVlOiAnJywgLi4ucHJvcHMgfSwgbnMpXHJcblxyXG4gICAgLy8gRm9sbG93IHNwZWMgYW5kIGxvd2VyY2FzZSBub2RlTmFtZSBmb3IgaHRtbFxyXG4gICAgdGhpcy5ub2RlTmFtZSA9IG5zID09PSBodG1sID8gbmFtZS50b0xvd2VyQ2FzZSgpIDogbmFtZVxyXG4gICAgdGhpcy5ub2RlVHlwZSA9IE5vZGUuQVRUUklCVVRFX05PREVcclxuICAgIHRoaXMub3duZXJFbGVtZW50ID0gbnVsbFxyXG4gIH1cclxuXHJcbiAgZ2V0IHZhbHVlICgpIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVWYWx1ZVxyXG4gIH1cclxuXHJcbiAgc2V0IHZhbHVlICh2YWwpIHtcclxuICAgIHRoaXMubm9kZVZhbHVlID0gdmFsXHJcbiAgfVxyXG5cclxuICBnZXQgbmFtZSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlTmFtZVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJ1xyXG5pbXBvcnQgeyBtaXhpbiB9IGZyb20gJy4uL3V0aWxzL29iamVjdENyZWF0aW9uVXRpbHMuanMnXHJcbmltcG9ydCB7IE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZSB9IGZyb20gJy4vbWl4aW5zL05vbkRvY3VtZW50VHlwZUNoaWxkTm9kZS5qcydcclxuaW1wb3J0IHsgQ2hpbGROb2RlIH0gZnJvbSAnLi9taXhpbnMvQ2hpbGROb2RlLmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIENoYXJhY3RlckRhdGEgZXh0ZW5kcyBOb2RlIHtcclxuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMpIHtcclxuICAgIHN1cGVyKG5hbWUsIHByb3BzKVxyXG5cclxuICAgIHRoaXMuZGF0YSA9IHRoaXMubm9kZVZhbHVlXHJcbiAgfVxyXG5cclxuICBhcHBlbmREYXRhIChkYXRhKSB7XHJcbiAgICB0aGlzLmRhdGEgKz0gZGF0YVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlRGF0YSAob2Zmc2V0LCBjb3VudCkge1xyXG4gICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLnNsaWNlKDAsIG9mZnNldCkgKyB0aGlzLmRhdGEuc2xpY2UoMCwgb2Zmc2V0ICsgY291bnQpXHJcbiAgfVxyXG5cclxuICBpbnNlcnREYXRhIChvZmZzZXQsIGRhdGEpIHtcclxuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgwLCBvZmZzZXQpICsgZGF0YSArIHRoaXMuZGF0YS5zbGljZShvZmZzZXQpXHJcbiAgfVxyXG5cclxuICByZXBsYWNlRGF0YSAob2Zmc2V0LCBjb3VudCwgZGF0YSkge1xyXG4gICAgdGhpcy5kZWxldGVEYXRhKG9mZnNldCwgY291bnQpXHJcbiAgICB0aGlzLmluc2VydERhdGEob2Zmc2V0LCBkYXRhKVxyXG4gIH1cclxuXHJcbiAgc3Vic3RyaW5nRGF0YSAob2Zmc2V0LCBjb3VudCkge1xyXG4gICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLnN1YnN0cihvZmZzZXQsIGNvdW50KVxyXG4gIH1cclxuXHJcbiAgZ2V0IGxlbmd0aCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aFxyXG4gIH1cclxufVxyXG5cclxubWl4aW4oTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlLCBDaGFyYWN0ZXJEYXRhKVxyXG5taXhpbihDaGlsZE5vZGUsIENoYXJhY3RlckRhdGEpXHJcbiIsImltcG9ydCB7IENoYXJhY3RlckRhdGEgfSBmcm9tICcuL0NoYXJhY3RlckRhdGEuanMnXHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXHJcbmV4cG9ydCBjbGFzcyBDb21tZW50IGV4dGVuZHMgQ2hhcmFjdGVyRGF0YSB7XHJcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzKSB7XHJcbiAgICBzdXBlcihuYW1lLCBwcm9wcylcclxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLkNPTU1FTlRfTk9ERVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBFdmVudCB9IGZyb20gJy4vRXZlbnQuanMnXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21FdmVudCBleHRlbmRzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMgPSB7fSkge1xyXG4gICAgc3VwZXIobmFtZSlcclxuICAgIHRoaXMuZGV0YWlsID0gcHJvcHMuZGV0YWlsIHx8IG51bGxcclxuICAgIHRoaXMuY2FuY2VsYWJsZSA9IHByb3BzLmNhbmNlbGFibGUgfHwgZmFsc2VcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcclxuaW1wb3J0IHsgQ29tbWVudCB9IGZyb20gJy4vQ29tbWVudC5qcydcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vVGV4dC5qcydcclxuaW1wb3J0IHsgQXR0ciB9IGZyb20gJy4vQXR0ci5qcydcclxuaW1wb3J0IHsgRG9jdW1lbnRGcmFnbWVudCB9IGZyb20gJy4vRG9jdW1lbnRGcmFnbWVudC5qcydcclxuaW1wb3J0IHsgSFRNTExpbmtFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxMaW5rRWxlbWVudC5qcydcclxuaW1wb3J0IHsgSFRNTFNjcmlwdEVsZW1lbnQgfSBmcm9tICcuL2h0bWwvSFRNTFNjcmlwdEVsZW1lbnQuanMnXHJcbmltcG9ydCB7IEhUTUxJbWFnZUVsZW1lbnQgfSBmcm9tICcuL2h0bWwvSFRNTEltYWdlRWxlbWVudC5qcydcclxuaW1wb3J0IHsgSFRNTEVsZW1lbnQgfSBmcm9tICcuL2h0bWwvSFRNTEVsZW1lbnQuanMnXHJcbmltcG9ydCB7IGVsZW1lbnRBY2Nlc3MgfSBmcm9tICcuL21peGlucy9lbGVtZW50QWNjZXNzLmpzJ1xyXG5pbXBvcnQgeyBtaXhpbiB9IGZyb20gJy4uL3V0aWxzL29iamVjdENyZWF0aW9uVXRpbHMuanMnXHJcbmltcG9ydCB7IFNWR1NWR0VsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdTVkdFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBTVkdQYXRoRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR1BhdGhFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBTVkdUZXh0Q29udGVudEVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdUZXh0Q29udGVudEVsZW1lbnQuanMnXHJcbmltcG9ydCB7IFNWR0dyYXBoaWNzRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcclxuaW1wb3J0IHsgUGFyZW50Tm9kZSB9IGZyb20gJy4vbWl4aW5zL1BhcmVudE5vZGUuanMnXHJcbmltcG9ydCB7IHN2ZywgaHRtbCB9IGZyb20gJy4uL3V0aWxzL25hbWVzcGFjZXMuanMnXHJcbmltcG9ydCB7IERvY3VtZW50VHlwZSB9IGZyb20gJy4vRG9jdW1lbnRUeXBlLmpzJ1xyXG5pbXBvcnQgeyBOb25FbGVtZW50UGFyZW50Tm9kZSB9IGZyb20gJy4vbWl4aW5zL05vbkVsZW1lbnRQYXJlbnROb2RlLmpzJ1xyXG5cclxuZnVuY3Rpb24gZ2V0Q2hpbGRCeVRhZ05hbWUgKHBhcmVudCwgbmFtZSkge1xyXG4gIGZvciAodmFyIGNoaWxkID0gcGFyZW50LmZpcnN0Q2hpbGQ7IGNoaWxkICE9IG51bGw7IGNoaWxkID0gY2hpbGQubmV4dFNpYmxpbmcpIHtcclxuICAgIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiYgY2hpbGQubm9kZU5hbWUgPT09IG5hbWUpIHtcclxuICAgICAgcmV0dXJuIGNoaWxkXHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBudWxsXHJcbn1cclxuXHJcbmNvbnN0IGdldFNWR0VsZW1lbnRGb3JOYW1lID0gKG5hbWUpID0+IHtcclxuICBzd2l0Y2ggKG5hbWUudG9Mb3dlckNhc2UoKSkge1xyXG4gIGNhc2UgJ3N2Zyc6XHJcbiAgICByZXR1cm4gU1ZHU1ZHRWxlbWVudFxyXG4gIGNhc2UgJ3BhdGgnOlxyXG4gICAgcmV0dXJuIFNWR1BhdGhFbGVtZW50XHJcbiAgY2FzZSAndGV4dCc6XHJcbiAgY2FzZSAndHNwYW4nOlxyXG4gIGNhc2UgJ3RyZWYnOlxyXG4gIGNhc2UgJ2FsdGdseXBoJzpcclxuICBjYXNlICd0ZXh0cGF0aCc6XHJcbiAgICByZXR1cm4gU1ZHVGV4dENvbnRlbnRFbGVtZW50XHJcbiAgZGVmYXVsdDpcclxuICAgIHJldHVybiBTVkdHcmFwaGljc0VsZW1lbnRcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGdldEhUTUxFbGVtZW50Rm9yTmFtZSA9IChuYW1lKSA9PiB7XHJcbiAgc3dpdGNoIChuYW1lLnRvTG93ZXJDYXNlKCkpIHtcclxuICBjYXNlICdpbWcnOlxyXG4gICAgcmV0dXJuIEhUTUxJbWFnZUVsZW1lbnRcclxuICBjYXNlICdsaW5rJzpcclxuICAgIHJldHVybiBIVE1MTGlua0VsZW1lbnRcclxuICBjYXNlICdzY3JpcHQnOlxyXG4gICAgcmV0dXJuIEhUTUxTY3JpcHRFbGVtZW50XHJcbiAgZGVmYXVsdDpcclxuICAgIHJldHVybiBIVE1MRWxlbWVudFxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZ2V0RWxlbWVudEZvck5hbWVzcGFjZSA9IChucywgbmFtZSkgPT4ge1xyXG4gIHN3aXRjaCAobnMpIHtcclxuICBjYXNlIHN2ZzpcclxuICAgIHJldHVybiBnZXRTVkdFbGVtZW50Rm9yTmFtZShuYW1lKVxyXG4gIGNhc2UgaHRtbDpcclxuICBjYXNlIG51bGw6XHJcbiAgY2FzZSAnJzpcclxuICBkZWZhdWx0OlxyXG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50Rm9yTmFtZShuYW1lKVxyXG4gIH1cclxufVxyXG5cclxuLy8gRmVhdHVyZS92ZXJzaW9uIHBhaXJzIHRoYXQgRE9NSW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSgpIHJldHVybnMgdHJ1ZSBmb3IuICBJdCByZXR1cm5zIGZhbHNlIGZvciBhbnl0aGluZyBlbHNlLlxyXG52YXIgc3VwcG9ydGVkRmVhdHVyZXMgPSB7XHJcbiAgeG1sOiB7ICcnOiB0cnVlLCAnMS4wJzogdHJ1ZSwgJzIuMCc6IHRydWUgfSxcclxuICBjb3JlOiB7ICcnOiB0cnVlLCAnMi4wJzogdHJ1ZSB9LFxyXG4gIGh0bWw6IHsgJyc6IHRydWUsICcxLjAnOiB0cnVlLCAnMi4wJzogdHJ1ZSB9LFxyXG4gIHhodG1sOiB7ICcnOiB0cnVlLCAnMS4wJzogdHJ1ZSwgJzIuMCc6IHRydWUgfSAvLyBIVE1MXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBET01JbXBsZW1lbnRhdGlvbiA9IHtcclxuICBoYXNGZWF0dXJlIChmZWF0dXJlLCB2ZXJzaW9uKSB7XHJcbiAgICB2YXIgZiA9IHN1cHBvcnRlZEZlYXR1cmVzWyhmZWF0dXJlIHx8ICcnKS50b0xvd2VyQ2FzZSgpXVxyXG4gICAgcmV0dXJuIChmICYmIGZbdmVyc2lvbiB8fCAnJ10pIHx8IGZhbHNlXHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlRG9jdW1lbnRUeXBlIChxdWFsaWZpZWROYW1lLCBwdWJsaWNJZCwgc3lzdGVtSWQpIHtcclxuICAgIHJldHVybiBuZXcgRG9jdW1lbnRUeXBlKHF1YWxpZmllZE5hbWUsIHsgcHVibGljSWQsIHN5c3RlbUlkLCBvd25lckRvY3VtZW50OiB0aGlzIH0pXHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlRG9jdW1lbnQgKG5hbWVzcGFjZSwgcXVhbGlmaWVkTmFtZSwgZG9jdHlwZSkge1xyXG4gICAgdmFyIGRvYyA9IG5ldyBEb2N1bWVudChuYW1lc3BhY2UpXHJcbiAgICBpZiAoZG9jdHlwZSkge1xyXG4gICAgICBpZiAoZG9jdHlwZS5vd25lckRvY3VtZW50KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgb2JqZWN0IGlzIGluIHRoZSB3cm9uZyBEb2N1bWVudCwgYSBjYWxsIHRvIGltcG9ydE5vZGUgaXMgcmVxdWlyZWQnKVxyXG4gICAgICB9XHJcbiAgICAgIGRvY3R5cGUub3duZXJEb2N1bWVudCA9IGRvY1xyXG4gICAgICBkb2MuYXBwZW5kQ2hpbGQoZG9jdHlwZSlcclxuICAgIH1cclxuICAgIGlmIChxdWFsaWZpZWROYW1lKSB7XHJcbiAgICAgIGRvYy5hcHBlbmRDaGlsZChkb2MuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZSwgcXVhbGlmaWVkTmFtZSkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZG9jXHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlSFRNTERvY3VtZW50ICh0aXRsZVRleHQgPSAnJykge1xyXG4gICAgY29uc3QgZCA9IG5ldyBEb2N1bWVudChodG1sKVxyXG4gICAgY29uc3Qgcm9vdCA9IGQuY3JlYXRlRWxlbWVudCgnaHRtbCcpXHJcbiAgICBjb25zdCBoZWFkID0gZC5jcmVhdGVFbGVtZW50KCdoZWFkJylcclxuICAgIGNvbnN0IHRpdGxlID0gZC5jcmVhdGVFbGVtZW50KCd0aXRsZScpXHJcbiAgICB0aXRsZS5hcHBlbmRDaGlsZChkLmNyZWF0ZVRleHROb2RlKHRpdGxlVGV4dCkpXHJcbiAgICBoZWFkLmFwcGVuZENoaWxkKHRpdGxlKVxyXG4gICAgcm9vdC5hcHBlbmRDaGlsZChoZWFkKVxyXG4gICAgcm9vdC5hcHBlbmRDaGlsZChkLmNyZWF0ZUVsZW1lbnQoJ2JvZHknKSlcclxuXHJcbiAgICBkLmFwcGVuZENoaWxkKHJvb3QpXHJcbiAgICByZXR1cm4gZFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgTm9kZSB7XHJcbiAgY29uc3RydWN0b3IgKG5zKSB7XHJcbiAgICBzdXBlcignI2RvY3VtZW50Jywge30sIG5zKVxyXG4gICAgdGhpcy5ub2RlVHlwZSA9IE5vZGUuRE9DVU1FTlRfTk9ERVxyXG4gICAgdGhpcy5pbXBsZW1lbnRhdGlvbiA9IERPTUltcGxlbWVudGF0aW9uXHJcbiAgICB0aGlzLmRlZmF1bHRWaWV3ID0gbnVsbFxyXG4gIH1cclxuXHJcbiAgLy8gaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNkb20tZG9jdW1lbnQtY3JlYXRlYXR0cmlidXRlXHJcbiAgY3JlYXRlQXR0cmlidXRlIChsb2NhbE5hbWUpIHtcclxuICAgIGlmICh0aGlzLm5hbWVzcGFjZVVSSSA9PT0gaHRtbCkge1xyXG4gICAgICBsb2NhbE5hbWUgPSBsb2NhbE5hbWUudG9Mb3dlckNhc2UoKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQXR0cmlidXRlTlMobnVsbCwgbG9jYWxOYW1lLCB0cnVlKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlQXR0cmlidXRlTlMgKG5zLCBxdWFsaWZpZWROYW1lLCBsb2NhbCA9IGZhbHNlKSB7XHJcbiAgICByZXR1cm4gbmV3IEF0dHIocXVhbGlmaWVkTmFtZSwgeyBvd25lckRvY3VtZW50OiB0aGlzLCBsb2NhbCB9LCBucylcclxuICB9XHJcblxyXG4gIGNyZWF0ZUNvbW1lbnQgKHRleHQpIHtcclxuICAgIHJldHVybiBuZXcgQ29tbWVudCgnI2NvbW1lbnQnLCB7IG5vZGVWYWx1ZTogdGV4dCwgb3duZXJEb2N1bWVudDogdGhpcyB9KVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlRG9jdW1lbnRGcmFnbWVudCAobmFtZSkge1xyXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudEZyYWdtZW50KCcjZG9jdW1lbnQtZnJhZ21lbnQnLCB7IG93bmVyRG9jdW1lbnQ6IHRoaXMgfSlcclxuICB9XHJcblxyXG4gIGNyZWF0ZUVsZW1lbnQgKGxvY2FsTmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRWxlbWVudE5TKHRoaXMubmFtZXNwYWNlVVJJLCBsb2NhbE5hbWUsIHRydWUpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVFbGVtZW50TlMgKG5zLCBxdWFsaWZpZWROYW1lLCBsb2NhbCA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBFbGVtZW50ID0gZ2V0RWxlbWVudEZvck5hbWVzcGFjZShucywgcXVhbGlmaWVkTmFtZSlcclxuXHJcbiAgICByZXR1cm4gbmV3IEVsZW1lbnQocXVhbGlmaWVkTmFtZSwge1xyXG4gICAgICBvd25lckRvY3VtZW50OiB0aGlzLFxyXG4gICAgICBsb2NhbFxyXG4gICAgfSwgbnMpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVUZXh0Tm9kZSAodGV4dCkge1xyXG4gICAgcmV0dXJuIG5ldyBUZXh0KCcjdGV4dCcsIHsgbm9kZVZhbHVlOiB0ZXh0LCBvd25lckRvY3VtZW50OiB0aGlzIH0pXHJcbiAgfVxyXG5cclxuICBnZXQgY29tcGF0TW9kZSAoKSB7XHJcbiAgICByZXR1cm4gJ0NTUzFDb21wYXQnIC8vIGFsd2F5cyBiZSBpbiBzdGFuZGFyZHMtbW9kZVxyXG4gIH1cclxuXHJcbiAgZ2V0IGJvZHkgKCkge1xyXG4gICAgcmV0dXJuIGdldENoaWxkQnlUYWdOYW1lKHRoaXMuZG9jdW1lbnRFbGVtZW50LCAnQk9EWScpXHJcbiAgfVxyXG5cclxuICBnZXQgaGVhZCAoKSB7XHJcbiAgICByZXR1cm4gZ2V0Q2hpbGRCeVRhZ05hbWUodGhpcy5kb2N1bWVudEVsZW1lbnQsICdIRUFEJylcclxuICB9XHJcblxyXG4gIGdldCBkb2N1bWVudEVsZW1lbnQgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGFzdENoaWxkXHJcbiAgfVxyXG59XHJcblxyXG5taXhpbihlbGVtZW50QWNjZXNzLCBEb2N1bWVudClcclxubWl4aW4oUGFyZW50Tm9kZSwgRG9jdW1lbnQpXHJcbm1peGluKE5vbkVsZW1lbnRQYXJlbnROb2RlLCBEb2N1bWVudClcclxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcclxuaW1wb3J0IHsgbWl4aW4gfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xyXG5pbXBvcnQgeyBlbGVtZW50QWNjZXNzIH0gZnJvbSAnLi9taXhpbnMvZWxlbWVudEFjY2Vzcy5qcydcclxuaW1wb3J0IHsgUGFyZW50Tm9kZSB9IGZyb20gJy4vbWl4aW5zL1BhcmVudE5vZGUuanMnXHJcbmltcG9ydCB7IE5vbkVsZW1lbnRQYXJlbnROb2RlIH0gZnJvbSAnLi9taXhpbnMvTm9uRWxlbWVudFBhcmVudE5vZGUuanMnXHJcbmV4cG9ydCBjbGFzcyBEb2N1bWVudEZyYWdtZW50IGV4dGVuZHMgTm9kZSB7XHJcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzKSB7XHJcbiAgICBzdXBlcihuYW1lLCBwcm9wcylcclxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREVcclxuICB9XHJcbn1cclxuXHJcbm1peGluKGVsZW1lbnRBY2Nlc3MsIERvY3VtZW50RnJhZ21lbnQpXHJcbm1peGluKFBhcmVudE5vZGUsIERvY3VtZW50RnJhZ21lbnQpXHJcbm1peGluKE5vbkVsZW1lbnRQYXJlbnROb2RlLCBEb2N1bWVudEZyYWdtZW50KVxyXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJ1xyXG5pbXBvcnQgeyBtaXhpbiB9IGZyb20gJy4uL3V0aWxzL29iamVjdENyZWF0aW9uVXRpbHMuanMnXHJcbmltcG9ydCB7IENoaWxkTm9kZSB9IGZyb20gJy4vbWl4aW5zL0NoaWxkTm9kZS5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBEb2N1bWVudFR5cGUgZXh0ZW5kcyBOb2RlIHtcclxuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMpIHtcclxuICAgIHN1cGVyKG5hbWUsIHByb3BzKVxyXG5cclxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERVxyXG4gICAgdGhpcy5uYW1lID0gbmFtZVxyXG5cclxuICAgIGNvbnN0IHsgcHVibGljSWQsIHN5c3RlbUlkIH0gPSBwcm9wc1xyXG4gICAgdGhpcy5wdWJsaWNJZCA9IHB1YmxpY0lkIHx8ICcnXHJcbiAgICB0aGlzLnN5c3RlbUlkID0gc3lzdGVtSWQgfHwgJydcclxuICB9XHJcbn1cclxuXHJcbm1peGluKENoaWxkTm9kZSwgRG9jdW1lbnRUeXBlKVxyXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJ1xuXG5pbXBvcnQgeyBQYXJlbnROb2RlIH0gZnJvbSAnLi9taXhpbnMvUGFyZW50Tm9kZS5qcydcbmltcG9ydCB7IGVsZW1lbnRBY2Nlc3MgfSBmcm9tICcuL21peGlucy9lbGVtZW50QWNjZXNzLmpzJ1xuaW1wb3J0IHsgSFRNTFBhcnNlciB9IGZyb20gJy4vaHRtbC9IVE1MUGFyc2VyLmpzJ1xuaW1wb3J0IHsgRG9jdW1lbnRGcmFnbWVudCB9IGZyb20gJy4vRG9jdW1lbnRGcmFnbWVudC5qcydcbmltcG9ydCB7IG1peGluIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcbmltcG9ydCB7IHRhZyB9IGZyb20gJy4uL3V0aWxzL3RhZ1V0aWxzLmpzJ1xuaW1wb3J0IHsgY3NzVG9NYXAsIG1hcFRvQ3NzIH0gZnJvbSAnLi4vdXRpbHMvbWFwVXRpbHMuanMnXG5pbXBvcnQgeyBoZXhUb1JHQiwgZGVjYW1lbGl6ZSwgaHRtbEVudGl0aWVzLCBjZGF0YSwgY29tbWVudCB9IGZyb20gJy4uL3V0aWxzL3N0clV0aWxzLmpzJ1xuaW1wb3J0IHsgTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlIH0gZnJvbSAnLi9taXhpbnMvTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlLmpzJ1xuaW1wb3J0IHsgQ2hpbGROb2RlIH0gZnJvbSAnLi9taXhpbnMvQ2hpbGROb2RlLmpzJ1xuaW1wb3J0IHsgaHRtbCwgeG1sLCB4bWxucyB9IGZyb20gJy4uL3V0aWxzL25hbWVzcGFjZXMuanMnXG5cbmNvbnN0IHZhbGlkYXRlQW5kRXh0cmFjdCA9IChucywgbmFtZSkgPT4ge1xuICBsZXQgcHJlZml4ID0gbnVsbFxuICBsZXQgbG9jYWxuYW1lID0gbmFtZVxuXG4gIGlmICghbnMpIG5zID0gbnVsbFxuXG4gIGlmIChuYW1lLmluY2x1ZGVzKCc6JykpIHtcbiAgICBbIHByZWZpeCwgbG9jYWxuYW1lIF0gPSBuYW1lLnNwbGl0KCc6JylcbiAgfVxuXG4gIGlmICghbnMgJiYgcHJlZml4KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOYW1lc3BhY2UgRXJyb3InKVxuICB9XG5cbiAgaWYgKHByZWZpeCA9PT0gJ3htbCcgJiYgbnMgIT09IHhtbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTmFtZXNwYWNlIEVycm9yJylcbiAgfVxuXG4gIGlmICgocHJlZml4ID09PSAneG1sbnMnIHx8IG5hbWUgPT09ICd4bWxucycpICYmIG5zICE9PSB4bWxucykge1xuICAgIHRocm93IG5ldyBFcnJvcignTmFtZXNwYWNlIEVycm9yJylcbiAgfVxuXG4gIGlmIChwcmVmaXggIT09ICd4bWxucycgJiYgbmFtZSAhPT0gJ3htbG5zJyAmJiBucyA9PT0geG1sbnMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWVzcGFjZSBFcnJvcicpXG4gIH1cblxuICByZXR1cm4gWyBucywgcHJlZml4LCBsb2NhbG5hbWUgXVxufVxuXG5jb25zdCBnZXRBdHRyaWJ1dGVCeU5zQW5kTG9jYWxOYW1lID0gKGVsLCBucywgbG9jYWxOYW1lKSA9PiB7XG4gIGlmICghbnMpIG5zID0gbnVsbFxuICByZXR1cm4gWyAuLi5lbC5hdHRycyBdLmZpbmQoKG5vZGUpID0+IG5vZGUubG9jYWxOYW1lID09PSBsb2NhbE5hbWUgJiYgbm9kZS5uYW1lc3BhY2VVUkkgPT09IG5zKVxufVxuXG5jb25zdCBnZXRBdHRyaWJ1dGVCeVF1YWxpZmllZE5hbWUgPSAoZWwsIHF1YWxpZmllZE5hbWUpID0+IHtcbiAgaWYgKGVsLm5hbWVzcGFjZVVSSSA9PT0gaHRtbCAmJiBlbC5vd25lckRvY3VtZW50Lm5hbWVzcGFjZVVSSSA9PT0gaHRtbCkge1xuICAgIHF1YWxpZmllZE5hbWUgPSBxdWFsaWZpZWROYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIHJldHVybiBbIC4uLmVsLmF0dHJzIF0uZmluZCgobm9kZSkgPT4gbm9kZS5uYW1lID09PSBxdWFsaWZpZWROYW1lKVxufVxuXG4vLyBUaGlzIFByb3h5IHByb3hpZXMgYWxsIGFjY2VzcyB0byBub2RlLnN0eWxlIHRvIHRoZSBjc3Mgc2F2ZWQgaW4gdGhlIGF0dHJpYnV0ZVxuY29uc3QgZ2V0U3R5bGVQcm94eSA9IChub2RlKSA9PiB7XG5cbiAgcmV0dXJuIG5ldyBQcm94eShub2RlLCB7XG4gICAgZ2V0ICh0YXJnZXQsIGtleSkge1xuICAgICAgY29uc3Qgc3R5bGVzID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnc3R5bGUnKSB8fCAnJ1xuICAgICAgY29uc3Qgc3R5bGVNYXAgPSBjc3NUb01hcChzdHlsZXMpXG5cbiAgICAgIGlmIChrZXkgPT09ICdjc3NUZXh0Jykge1xuICAgICAgICByZXR1cm4gc3R5bGVzXG4gICAgICB9XG5cbiAgICAgIGlmIChrZXkgPT09ICdzZXRQcm9wZXJ0eScpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChwcm9wZXJ0eU5hbWUsIHZhbHVlID0gJycsIHByaW9yaXR5ID0gJycpIHtcbiAgICAgICAgICBub2RlLnN0eWxlW3Byb3BlcnR5TmFtZV0gPSB2YWx1ZSArIChwcmlvcml0eSA/IGAgISR7cHJpb3JpdHl9YCA6ICcnKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGtleSA9IGRlY2FtZWxpemUoa2V5KVxuICAgICAgaWYgKCFzdHlsZU1hcC5oYXMoa2V5KSkgcmV0dXJuICcnXG5cbiAgICAgIHJldHVybiBzdHlsZU1hcC5nZXQoa2V5KVxuICAgIH0sXG4gICAgc2V0ICh0YXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgICAgIGtleSA9IGRlY2FtZWxpemUoa2V5KVxuXG4gICAgICBpZiAoa2V5ID09PSAnY3NzLXRleHQnKSB7XG4gICAgICAgIC8vIGVuc3VyZSBjb3JyZWN0IHNwYWNpbmcgYW5kIHN5bnRheCBieSBjb252ZXJ0aW5nIGJhY2sgYW5kIGZvcnRoXG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgbWFwVG9Dc3MoY3NzVG9NYXAodmFsdWUpKSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gaGV4VG9SR0IodmFsdWUudG9TdHJpbmcoKSlcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnc3R5bGUnKSB8fCAnJ1xuICAgICAgICBjb25zdCBzdHlsZU1hcCA9IGNzc1RvTWFwKHN0eWxlcylcbiAgICAgICAgc3R5bGVNYXAuc2V0KGtleSwgdmFsdWUpXG5cbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBtYXBUb0NzcyhzdHlsZU1hcCkpXG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG5cbi8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jZG9tLWVsZW1lbnQtc2V0YXR0cmlidXRlbnNcbmV4cG9ydCBjbGFzcyBFbGVtZW50IGV4dGVuZHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcywgbnMpIHtcbiAgICBzdXBlcihuYW1lLCBwcm9wcywgbnMpXG5cbiAgICB0aGlzLnN0eWxlID0gZ2V0U3R5bGVQcm94eSh0aGlzKVxuICAgIHRoaXMudGFnTmFtZSA9IHRoaXMubm9kZU5hbWVcbiAgfVxuXG4gIGdldEF0dHJpYnV0ZSAocXVhbGlmaWVkTmFtZSkge1xuICAgIGNvbnN0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGUocXVhbGlmaWVkTmFtZSlcbiAgICByZXR1cm4gYXR0ciA/IGF0dHIudmFsdWUgOiBudWxsXG4gIH1cblxuICBnZXRBdHRyaWJ1dGVOb2RlIChxdWFsaWZpZWROYW1lKSB7XG4gICAgcmV0dXJuIGdldEF0dHJpYnV0ZUJ5UXVhbGlmaWVkTmFtZSh0aGlzLCBxdWFsaWZpZWROYW1lKVxuICB9XG5cbiAgZ2V0QXR0cmlidXRlTm9kZU5TIChucywgbG9jYWxOYW1lKSB7XG4gICAgcmV0dXJuIGdldEF0dHJpYnV0ZUJ5TnNBbmRMb2NhbE5hbWUodGhpcywgbnMsIGxvY2FsTmFtZSlcbiAgfVxuXG4gIGdldEF0dHJpYnV0ZU5TIChucywgbG9jYWxOYW1lKSB7XG4gICAgY29uc3QgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZU5TKG5zLCBsb2NhbE5hbWUpXG4gICAgcmV0dXJuIGF0dHIgPyBhdHRyLnZhbHVlIDogbnVsbFxuICB9XG5cbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ09ubHkgaW1wbGVtZW50ZWQgZm9yIFNWRyBFbGVtZW50cycpXG4gIH1cblxuICBoYXNBdHRyaWJ1dGUgKHF1YWxpZmllZE5hbWUpIHtcbiAgICBjb25zdCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlKHF1YWxpZmllZE5hbWUpXG4gICAgcmV0dXJuICEhYXR0clxuICB9XG5cbiAgaGFzQXR0cmlidXRlTlMgKG5zLCBsb2NhbE5hbWUpIHtcbiAgICBjb25zdCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlTlMobnMsIGxvY2FsTmFtZSlcbiAgICByZXR1cm4gISFhdHRyXG4gIH1cblxuICBtYXRjaGVzIChxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLm1hdGNoV2l0aFNjb3BlKHF1ZXJ5LCB0aGlzKVxuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlIChxdWFsaWZpZWROYW1lKSB7XG4gICAgY29uc3QgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZShxdWFsaWZpZWROYW1lKVxuICAgIGlmIChhdHRyKSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5vZGUoYXR0cilcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZU5vZGUgKG5vZGUpIHtcbiAgICBpZiAoIXRoaXMuYXR0cnMuZGVsZXRlKG5vZGUpKSB0aHJvdyBuZXcgRXJyb3IoJ0F0dHJpYnV0ZSBjYW5ub3QgYmUgcmVtb3ZlZCBiZWNhdXNlIGl0IHdhcyBub3QgZm91bmQgb24gdGhlIGVsZW1lbnQnKVxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICAvLyBjYWxsIGlzOiBkLnJlbW92ZUF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3Lm1vemlsbGEub3JnL25zL3NwZWNpYWxzcGFjZScsICdhbGlnbicsICdjZW50ZXInKTtcbiAgcmVtb3ZlQXR0cmlidXRlTlMgKG5zLCBsb2NhbE5hbWUpIHtcbiAgICBjb25zdCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlTlMobnMsIGxvY2FsTmFtZSlcbiAgICBpZiAoYXR0cikge1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOb2RlKGF0dHIpXG4gICAgfVxuICAgIHJldHVybiBhdHRyXG4gIH1cblxuICAvKiBUaGUgc2V0QXR0cmlidXRlKHF1YWxpZmllZE5hbWUsIHZhbHVlKSBtZXRob2QsIHdoZW4gaW52b2tlZCwgbXVzdCBydW4gdGhlc2Ugc3RlcHM6XG5cbiAgICBJZiBxdWFsaWZpZWROYW1lIGRvZXMgbm90IG1hdGNoIHRoZSBOYW1lIHByb2R1Y3Rpb24gaW4gWE1MLCB0aGVuIHRocm93IGFuIFwiSW52YWxpZENoYXJhY3RlckVycm9yXCIgRE9NRXhjZXB0aW9uLlxuXG4gICAgSWYgdGhpcyBpcyBpbiB0aGUgSFRNTCBuYW1lc3BhY2UgYW5kIGl0cyBub2RlIGRvY3VtZW50IGlzIGFuIEhUTUwgZG9jdW1lbnQsIHRoZW4gc2V0IHF1YWxpZmllZE5hbWUgdG8gcXVhbGlmaWVkTmFtZSBpbiBBU0NJSSBsb3dlcmNhc2UuXG5cbiAgICBMZXQgYXR0cmlidXRlIGJlIHRoZSBmaXJzdCBhdHRyaWJ1dGUgaW4gdGhpc+KAmXMgYXR0cmlidXRlIGxpc3Qgd2hvc2UgcXVhbGlmaWVkIG5hbWUgaXMgcXVhbGlmaWVkTmFtZSwgYW5kIG51bGwgb3RoZXJ3aXNlLlxuXG4gICAgSWYgYXR0cmlidXRlIGlzIG51bGwsIGNyZWF0ZSBhbiBhdHRyaWJ1dGUgd2hvc2UgbG9jYWwgbmFtZSBpcyBxdWFsaWZpZWROYW1lLCB2YWx1ZSBpcyB2YWx1ZSwgYW5kIG5vZGUgZG9jdW1lbnQgaXMgdGhpc+KAmXMgbm9kZSBkb2N1bWVudCwgdGhlbiBhcHBlbmQgdGhpcyBhdHRyaWJ1dGUgdG8gdGhpcywgYW5kIHRoZW4gcmV0dXJuLlxuXG4gICAgQ2hhbmdlIGF0dHJpYnV0ZSB0byB2YWx1ZS5cbiAgKi9cbiAgc2V0QXR0cmlidXRlIChxdWFsaWZpZWROYW1lLCB2YWx1ZSkge1xuICAgIC8vIFdlIGhhdmUgdG8gZG8gdGhhdCBoZXJlIGJlY2F1c2Ugd2UgY2Fubm90IGNoZWNrIGlmIGB0aGlzYCBpcyBpbiB0aGUgY29ycmVjdCBuYW1lc3BhY2VcbiAgICAvLyB3aGVuIGRvaW5nIGl0IGluIGNyZWF0ZUF0dHJpYnV0ZVxuICAgIGlmICh0aGlzLm5hbWVzcGFjZVVSSSA9PT0gaHRtbCAmJiB0aGlzLm93bmVyRG9jdW1lbnQubmFtZXNwYWNlVVJJID09PSBodG1sKSB7XG4gICAgICBxdWFsaWZpZWROYW1lID0gcXVhbGlmaWVkTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgfVxuXG4gICAgbGV0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGUocXVhbGlmaWVkTmFtZSlcbiAgICBpZiAoIWF0dHIpIHtcbiAgICAgIC8vIEJlY2F1c2UgY3JlYXRlQXR0cmlidXRlIGxvd2VyY2FzZXMgdGhlIGF0dHJpYnV0ZSBpbiBhbiBodG1sIGRvYyB3ZSBoYXZlIHRvIHVzZSBjcmVhdGVBdHRyaWJ1dGVOU1xuICAgICAgYXR0ciA9IHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVBdHRyaWJ1dGVOUyhudWxsLCBxdWFsaWZpZWROYW1lLCB0cnVlKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVOb2RlKGF0dHIpXG4gICAgfVxuXG4gICAgYXR0ci52YWx1ZSA9IHZhbHVlXG4gIH1cblxuICAvKlxuICAgIExldCBuYW1lc3BhY2UsIHByZWZpeCwgYW5kIGxvY2FsTmFtZSBiZSB0aGUgcmVzdWx0IG9mIHBhc3NpbmcgbmFtZXNwYWNlIGFuZCBxdWFsaWZpZWROYW1lIHRvIHZhbGlkYXRlIGFuZCBleHRyYWN0LlxuXG4gICAgU2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmb3IgdGhpcyB1c2luZyBsb2NhbE5hbWUsIHZhbHVlLCBhbmQgYWxzbyBwcmVmaXggYW5kIG5hbWVzcGFjZS5cblxuICAgIElmIHByZWZpeCBpcyBub3QgZ2l2ZW4sIHNldCBpdCB0byBudWxsLlxuICAgIElmIG5hbWVzcGFjZSBpcyBub3QgZ2l2ZW4sIHNldCBpdCB0byBudWxsLlxuICAgIExldCBhdHRyaWJ1dGUgYmUgdGhlIHJlc3VsdCBvZiBnZXR0aW5nIGFuIGF0dHJpYnV0ZSBnaXZlbiBuYW1lc3BhY2UsIGxvY2FsTmFtZSwgYW5kIGVsZW1lbnQuXG4gICAgSWYgYXR0cmlidXRlIGlzIG51bGwsIGNyZWF0ZSBhbiBhdHRyaWJ1dGUgd2hvc2UgbmFtZXNwYWNlIGlzIG5hbWVzcGFjZSwgbmFtZXNwYWNlIHByZWZpeCBpcyBwcmVmaXgsIGxvY2FsIG5hbWUgaXMgbG9jYWxOYW1lLCB2YWx1ZSBpcyB2YWx1ZSwgYW5kIG5vZGUgZG9jdW1lbnQgaXMgZWxlbWVudOKAmXMgbm9kZSBkb2N1bWVudCwgdGhlbiBhcHBlbmQgdGhpcyBhdHRyaWJ1dGUgdG8gZWxlbWVudCwgYW5kIHRoZW4gcmV0dXJuLlxuXG4gICAgQ2hhbmdlIGF0dHJpYnV0ZSB0byB2YWx1ZS5cbiAgKi9cblxuICBzZXRBdHRyaWJ1dGVOb2RlIChub2RlKSB7XG4gICAgdGhpcy5hdHRycy5hZGQobm9kZSlcbiAgICBub2RlLm93bmVyRWxlbWVudCA9IHRoaXNcbiAgfVxuXG4gIC8vIGNhbGwgaXM6IGQuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cubW96aWxsYS5vcmcvbnMvc3BlY2lhbHNwYWNlJywgJ3NwZWM6YWxpZ24nLCAnY2VudGVyJyk7XG4gIHNldEF0dHJpYnV0ZU5TIChuYW1lc3BhY2UsIG5hbWUsIHZhbHVlKSB7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBjb25zdCBbIG5zLCBwcmVmaXgsIGxvY2FsTmFtZSBdID0gdmFsaWRhdGVBbmRFeHRyYWN0KG5hbWVzcGFjZSwgbmFtZSlcblxuICAgIGxldCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlTlMobnMsIGxvY2FsTmFtZSlcbiAgICBpZiAoIWF0dHIpIHtcbiAgICAgIGF0dHIgPSB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlTlMobnMsIG5hbWUpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZU5vZGUoYXR0cikgLy8gc2V0QXR0cmlidXRlTm9kZU5TIGlzIGEgc3lub255bSBvZiBzZXRBdHRyaWJ1dGVOb2RlXG4gICAgfVxuXG4gICAgYXR0ci52YWx1ZSA9IHZhbHVlXG5cbiAgICB0aGlzLmF0dHJzLmFkZChhdHRyKVxuICB9XG5cbiAgZ2V0IGF0dHJpYnV0ZXMgKCkge1xuICAgIHJldHVybiBbIC4uLnRoaXMuYXR0cnMgXVxuICB9XG5cbiAgZ2V0IGNsYXNzTmFtZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjbGFzcycpXG4gIH1cblxuICBzZXQgY2xhc3NOYW1lIChjKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYylcbiAgfVxuXG4gIGdldCBpZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpIHx8ICcnXG4gIH1cblxuICBzZXQgaWQgKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0QXR0cmlidXRlKCdpZCcsIGlkKVxuICB9XG5cbiAgZ2V0IGlubmVySFRNTCAoKSB7XG5cbiAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzLm1hcChub2RlID0+IHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuIGh0bWxFbnRpdGllcyhub2RlLmRhdGEpXG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5DREFUQV9TRUNUSU9OX05PREUpIHJldHVybiBjZGF0YShub2RlLmRhdGEpXG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREUpIHJldHVybiBjb21tZW50KG5vZGUuZGF0YSlcbiAgICAgIHJldHVybiBub2RlLm91dGVySFRNTFxuICAgIH0pLmpvaW4oJycpXG4gIH1cblxuICBzZXQgaW5uZXJIVE1MIChzdHIpIHtcbiAgICB3aGlsZSAodGhpcy5maXJzdENoaWxkKSB7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgLy8gVGhlIHBhcnNlciBhZGRzIHRoZSBodG1sIHRvIHRoaXNcbiAgICBIVE1MUGFyc2VyKHN0ciwgdGhpcylcbiAgfVxuXG4gIGdldCBvdXRlckhUTUwgKCkge1xuICAgIHJldHVybiB0YWcodGhpcylcbiAgfVxuXG4gIHNldCBvdXRlckhUTUwgKHN0cikge1xuICAgIHZhciB3ZWxsID0gbmV3IERvY3VtZW50RnJhZ21lbnQoKVxuICAgIEhUTUxQYXJzZXIoc3RyLCB3ZWxsKVxuICAgIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod2VsbCwgdGhpcylcbiAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcylcbiAgfVxuXG59XG5cbm1peGluKFBhcmVudE5vZGUsIEVsZW1lbnQpXG5taXhpbihlbGVtZW50QWNjZXNzLCBFbGVtZW50KVxubWl4aW4oTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlLCBFbGVtZW50KVxubWl4aW4oQ2hpbGROb2RlLCBFbGVtZW50KVxuIiwiZXhwb3J0IGNsYXNzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvciAodHlwZSkge1xyXG4gICAgdGhpcy50eXBlID0gdHlwZVxyXG4gICAgdGhpcy5jYW5jZWxhYmxlID0gZmFsc2VcclxuICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlXHJcbiAgICB0aGlzLnRhcmdldCA9IG51bGxcclxuICB9XHJcblxyXG4gIHByZXZlbnREZWZhdWx0ICgpIHtcclxuICAgIGlmICh0aGlzLmNhbmNlbGFibGUpIHtcclxuICAgICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gdHJ1ZVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJjb25zdCAkID0gU3ltYm9sKCdwcml2YXRlIHByb3BlcnRpZXMnKVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50VGFyZ2V0IHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICB0aGlzWyRdID0ge31cclxuICAgIHRoaXNbJF0ubGlzdGVuZXJzID0ge31cclxuICB9XHJcblxyXG4gIGFkZEV2ZW50TGlzdGVuZXIgKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoISh0eXBlIGluIHRoaXNbJF0ubGlzdGVuZXJzKSkge1xyXG4gICAgICB0aGlzWyRdLmxpc3RlbmVyc1t0eXBlXSA9IFtdXHJcbiAgICB9XHJcbiAgICB0aGlzWyRdLmxpc3RlbmVyc1t0eXBlXS5wdXNoKGNhbGxiYWNrKVxyXG4gIH1cclxuXHJcbiAgZGlzcGF0Y2hFdmVudCAoZXZlbnQpIHtcclxuICAgIGlmICghKGV2ZW50LnR5cGUgaW4gdGhpc1skXS5saXN0ZW5lcnMpKSB7IHJldHVybiB0cnVlIH1cclxuXHJcbiAgICB2YXIgc3RhY2sgPSB0aGlzWyRdLmxpc3RlbmVyc1tldmVudC50eXBlXVxyXG4gICAgZXZlbnQudGFyZ2V0ID0gdGhpc1xyXG5cclxuICAgIHN0YWNrLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsKGV2ZW50KVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWRcclxuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciAodHlwZSwgY2FsbGJhY2spIHtcclxuICAgIGlmICghKHR5cGUgaW4gdGhpc1skXS5saXN0ZW5lcnMpKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdGFjayA9IHRoaXNbJF0ubGlzdGVuZXJzW3R5cGVdXHJcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzdGFjay5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XHJcbiAgICAgIGlmIChzdGFja1tpXSA9PT0gY2FsbGJhY2spIHtcclxuICAgICAgICBzdGFjay5zcGxpY2UoaSwgMSlcclxuICAgICAgICByZXR1cm5cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgZXh0ZW5kLCBleHRlbmRTdGF0aWMgfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xyXG5cclxuaW1wb3J0IHsgRXZlbnRUYXJnZXQgfSBmcm9tICcuL0V2ZW50VGFyZ2V0LmpzJ1xyXG5pbXBvcnQgeyBjbG9uZU5vZGUgfSBmcm9tICcuLi91dGlscy90YWdVdGlscy5qcydcclxuaW1wb3J0IHsgaHRtbCB9IGZyb20gJy4uL3V0aWxzL25hbWVzcGFjZXMuanMnXHJcblxyXG5jb25zdCBub2RlVHlwZXMgPSB7XHJcbiAgRUxFTUVOVF9OT0RFOiAxLFxyXG4gIEFUVFJJQlVURV9OT0RFOiAyLFxyXG4gIFRFWFRfTk9ERTogMyxcclxuICBDREFUQV9TRUNUSU9OX05PREU6IDQsXHJcbiAgRU5USVRZX1JFRkVSRU5DRV9OT0RFOiA1LFxyXG4gIEVOVElUWV9OT0RFOiA2LFxyXG4gIFBST0NFU1NJTkdfSU5TVFJVQ1RJT05fTk9ERTogNyxcclxuICBDT01NRU5UX05PREU6IDgsXHJcbiAgRE9DVU1FTlRfTk9ERTogOSxcclxuICBET0NVTUVOVF9UWVBFX05PREU6IDEwLFxyXG4gIERPQ1VNRU5UX0ZSQUdNRU5UX05PREU6IDExLFxyXG4gIE5PVEFUSU9OX05PREU6IDEyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlIGV4dGVuZHMgRXZlbnRUYXJnZXQge1xyXG4gIGNvbnN0cnVjdG9yIChuYW1lID0gJycsIHByb3BzID0ge30sIG5zID0gbnVsbCkge1xyXG4gICAgc3VwZXIoKVxyXG5cclxuICAgIC8vIElmIHByb3BzLmxvY2FsIGlzIHRydWUsIHRoZSBlbGVtZW50IHdhcyBOb2RlIHdhcyBjcmVhdGVkIHdpdGggdGhlIG5vbi1uYW1lc3BhY2UgZnVuY3Rpb25cclxuICAgIC8vIHRoYXQgbWVhbnMgd2hhdGV2ZXIgd2FzIHBhc3NlZCBhcyBuYW1lIGlzIHRoZSBsb2NhbCBuYW1lIGV2ZW4gdGhvdWdoIGl0IG1pZ2h0IGxvb2sgbGlrZSBhIHByZWZpeFxyXG4gICAgaWYgKG5hbWUuaW5jbHVkZXMoJzonKSAmJiAhcHJvcHMubG9jYWwpIHtcclxuICAgICAgO1sgdGhpcy5wcmVmaXgsIHRoaXMubG9jYWxOYW1lIF0gPSBuYW1lLnNwbGl0KCc6JylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubG9jYWxOYW1lID0gbmFtZVxyXG4gICAgICB0aGlzLnByZWZpeCA9IG51bGxcclxuICAgIH1cclxuXHJcbiAgICAvLyBGb2xsb3cgc3BlYyBhbmQgdXBwZXJjYXNlIG5vZGVOYW1lIGZvciBodG1sXHJcbiAgICB0aGlzLm5vZGVOYW1lID0gbnMgPT09IGh0bWwgPyBuYW1lLnRvVXBwZXJDYXNlKCkgOiBuYW1lXHJcblxyXG4gICAgdGhpcy5uYW1lc3BhY2VVUkkgPSBuc1xyXG4gICAgdGhpcy5ub2RlVHlwZSA9IE5vZGUuRUxFTUVOVF9OT0RFXHJcbiAgICB0aGlzLm5vZGVWYWx1ZSA9IHByb3BzLm5vZGVWYWx1ZSAhPSBudWxsID8gcHJvcHMubm9kZVZhbHVlIDogbnVsbFxyXG4gICAgdGhpcy5jaGlsZE5vZGVzID0gW11cclxuXHJcbiAgICB0aGlzLmF0dHJzID0gcHJvcHMuYXR0cnMgfHwgbmV3IFNldCgpXHJcblxyXG4gICAgdGhpcy5vd25lckRvY3VtZW50ID0gcHJvcHMub3duZXJEb2N1bWVudCB8fCBudWxsXHJcbiAgICB0aGlzLnBhcmVudE5vZGUgPSBudWxsXHJcblxyXG4gICAgLy8gdGhpcy5uYW1lc3BhY2VzID0ge31cclxuICAgIC8vIGlmICh0aGlzLnByZWZpeCkge1xyXG4gICAgLy8gICB0aGlzLm5hbWVzcGFjZXNbdGhpcy5wcmVmaXhdID0gbnNcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIHRoaXMubmFtZXNwYWNlcy5kZWZhdWx0ID0gbnNcclxuICAgIC8vIH1cclxuXHJcbiAgICBpZiAocHJvcHMuY2hpbGROb2Rlcykge1xyXG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBwcm9wcy5jaGlsZE5vZGVzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcclxuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHByb3BzLmNoaWxkTm9kZXNbaV0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFwcGVuZENoaWxkIChub2RlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRCZWZvcmUobm9kZSlcclxuICB9XHJcblxyXG4gIGNsb25lTm9kZSAoZGVlcCA9IGZhbHNlKSB7XHJcbiAgICB2YXIgY2xvbmUgPSBjbG9uZU5vZGUodGhpcylcclxuXHJcbiAgICBpZiAoZGVlcCkge1xyXG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IGVsLmNsb25lTm9kZShkZWVwKVxyXG4gICAgICAgIGNsb25lLmFwcGVuZENoaWxkKG5vZGUpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNsb25lXHJcbiAgfVxyXG5cclxuICBjb250YWlucyAobm9kZSkge1xyXG4gICAgaWYgKG5vZGUgPT09IHRoaXMpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIHdoaWxlIChub2RlLnBhcmVudE5vZGUpIHtcclxuICAgICAgaWYgKG5vZGUgPT09IHRoaXMpIHJldHVybiB0cnVlXHJcbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGVcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxuXHJcbiAgZ2V0Um9vdE5vZGUgKCkge1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudE5vZGUgfHwgdGhpcy5wYXJlbnROb2RlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX05PREUpIHJldHVybiB0aGlzXHJcbiAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmdldFJvb3ROb2RlKClcclxuICB9XHJcblxyXG4gIGhhc0NoaWxkTm9kZXMgKCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5jaGlsZE5vZGVzLmxlbmd0aFxyXG4gIH1cclxuXHJcbiAgaW5zZXJ0QmVmb3JlIChub2RlLCBiZWZvcmUpIHtcclxuICAgIGxldCBpbmRleCA9IHRoaXMuY2hpbGROb2Rlcy5pbmRleE9mKGJlZm9yZSlcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgaW5kZXggPSB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSkge1xyXG4gICAgICBsZXQgY2hpbGRcclxuICAgICAgbGV0IG9sZENoaWxkID0gYmVmb3JlXHJcbiAgICAgIHdoaWxlICgoY2hpbGQgPSBub2RlLmNoaWxkTm9kZXMucG9wKCkpKSB7XHJcbiAgICAgICAgdGhpcy5pbnNlcnRCZWZvcmUoY2hpbGQsIG9sZENoaWxkKVxyXG4gICAgICAgIG9sZENoaWxkID0gY2hpbGRcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChub2RlLnBhcmVudE5vZGUpIHtcclxuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXHJcbiAgICB9XHJcblxyXG4gICAgbm9kZS5wYXJlbnROb2RlID0gdGhpc1xyXG4gICAgLy8gT2JqZWN0LnNldFByb3RvdHlwZU9mKG5vZGUubmFtZXNwYWNlcy5wcm90b3R5cGUsIHRoaXMubmFtZXNwYWNlcy5wcm90b3R5cGUpXHJcblxyXG4gICAgdGhpcy5jaGlsZE5vZGVzLnNwbGljZShpbmRleCwgMCwgbm9kZSlcclxuICAgIHJldHVybiBub2RlXHJcbiAgfVxyXG5cclxuICBpc0RlZmF1bHROYW1lc3BhY2UgKG5hbWVzcGFjZVVSSSkge1xyXG4gICAgc3dpdGNoICh0aGlzLm5vZGVUeXBlKSB7XHJcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxyXG4gICAgICBpZiAoIXRoaXMucHJlZml4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZXNwYWNlVVJJID09PSBuYW1lc3BhY2VVUklcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCd4bWxucycpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd4bWxucycpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcclxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGUuaXNEZWZhdWx0TmFtZXNwYWNlKG5hbWVzcGFjZVVSSSlcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfTk9ERTpcclxuICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRFbGVtZW50LmlzRGVmYXVsdE5hbWVzcGFjZShuYW1lc3BhY2VVUkkpXHJcbiAgICBjYXNlIE5vZGUuRU5USVRZX05PREU6XHJcbiAgICBjYXNlIE5vZGUuTk9UQVRJT05fTk9ERTpcclxuICAgIGNhc2UgTm9kZS5ET0NVTUVOVF9UWVBFX05PREU6XHJcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERTpcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBjYXNlIE5vZGUuQVRUUklCVVRFX05PREU6XHJcbiAgICAgIGlmICh0aGlzLm93bmVyRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm93bmVyRWxlbWVudC5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgLy8gRW50aXR5UmVmZXJlbmNlcyBtYXkgaGF2ZSB0byBiZSBza2lwcGVkIHRvIGdldCB0byBpdFxyXG4gICAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNFcXVhbE5vZGUgKG5vZGUpIHtcclxuICAgIHRoaXMubm9ybWFsaXplKClcclxuICAgIG5vZGUubm9ybWFsaXplKClcclxuXHJcbiAgICBsZXQgYm9vbCA9IHRoaXMubm9kZU5hbWUgPT09IG5vZGUubm9kZU5hbWVcclxuICAgIGJvb2wgPSBib29sICYmIHRoaXMubG9jYWxOYW1lID09PSBub2RlLmxvY2FsTmFtZVxyXG4gICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5uYW1lc3BhY2VVUkkgPT09IG5vZGUubmFtZXNwYWNlVVJJXHJcbiAgICBib29sID0gYm9vbCAmJiB0aGlzLnByZWZpeCA9PT0gbm9kZS5wcmVmaXhcclxuICAgIGJvb2wgPSBib29sICYmIHRoaXMubm9kZVZhbHVlID09PSBub2RlLm5vZGVWYWx1ZVxyXG5cclxuICAgIGJvb2wgPSBib29sICYmIHRoaXMuY2hpbGROb2Rlcy5sZW5ndGggPT09IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGhcclxuXHJcbiAgICAvLyBkb250IGNoZWNrIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5IHdoZW4gdGhlIGNvdW50IGRvZXNudCBldmVudCBhZGQgdXBcclxuICAgIGlmICghYm9vbCkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgYm9vbCA9IGJvb2wgJiYgIXRoaXMuY2hpbGROb2Rlcy5yZWR1Y2UoKGxhc3QsIGN1cnIsIGluZGV4KSA9PiB7XHJcbiAgICAgIHJldHVybiBsYXN0ICYmIGN1cnIuaXNFcXVhbE5vZGUobm9kZS5jaGlsZE5vZGVzW2luZGV4XSlcclxuICAgIH0sIHRydWUpXHJcblxyXG4gICAgLy8gRklYTUU6IFVzZSBhdHRyIG5vZGVzXHJcbiAgICAvKiBib29sID0gYm9vbCAmJiAhWyAuLi50aGlzLmF0dHJzLmVudHJpZXMoKSBdLnJlZHVjZSgobGFzdCwgY3VyciwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgWyBrZXksIHZhbCBdID0gbm9kZS5hdHRycy5lbnRyaWVzKClcclxuICAgICAgcmV0dXJuIGxhc3QgJiYgY3VyclswXSA9PT0ga2V5ICYmIGN1cnJbMV0gPT09IHZhbFxyXG4gICAgfSwgdHJ1ZSkgKi9cclxuXHJcbiAgICAvKlxyXG4gICAgVE9ETzpcclxuICAgIEZvciB0d28gRG9jdW1lbnRUeXBlIG5vZGVzIHRvIGJlIGVxdWFsLCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgbXVzdCBhbHNvIGJlIHNhdGlzZmllZDpcclxuXHJcbiAgICBUaGUgZm9sbG93aW5nIHN0cmluZyBhdHRyaWJ1dGVzIGFyZSBlcXVhbDogcHVibGljSWQsIHN5c3RlbUlkLCBpbnRlcm5hbFN1YnNldC5cclxuICAgIFRoZSBlbnRpdGllcyBOYW1lZE5vZGVNYXBzIGFyZSBlcXVhbC5cclxuICAgIFRoZSBub3RhdGlvbnMgTmFtZWROb2RlTWFwcyBhcmUgZXF1YWwuXHJcbiAgICAqL1xyXG5cclxuICAgIGlmICh0aGlzLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERSAmJiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERSkge1xyXG4gICAgICBib29sID0gYm9vbCAmJiB0aGlzLnB1YmxpY0lkID09PSBub2RlLnB1YmxpY0lkXHJcbiAgICAgIGJvb2wgPSBib29sICYmIHRoaXMuc3lzdGVtSWQgPT09IG5vZGUuc3lzdGVtSWRcclxuICAgICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5pbnRlcm5hbFN1YnNldCA9PT0gbm9kZS5pbnRlcm5hbFN1YnNldFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBib29sXHJcbiAgfVxyXG5cclxuICBpc1NhbWVOb2RlIChub2RlKSB7XHJcbiAgICByZXR1cm4gdGhpcyA9PT0gbm9kZVxyXG4gIH1cclxuXHJcbiAgbG9va3VwTmFtZXNwYWNlUHJlZml4IChuYW1lc3BhY2VVUkksIG9yaWdpbmFsRWxlbWVudCkge1xyXG4gICAgaWYgKHRoaXMubmFtZXNwYWNlVVJJICYmIHRoaXMubmFtZXNwYWNlVVJJID09PSBuYW1lc3BhY2VVUkkgJiYgdGhpcy5wcmVmaXhcclxuICAgICAgICAgJiYgb3JpZ2luYWxFbGVtZW50Lmxvb2t1cE5hbWVzcGFjZVVSSSh0aGlzLnByZWZpeCkgPT09IG5hbWVzcGFjZVVSSSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcmVmaXhcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IFsga2V5LCB2YWwgXSBvZiB0aGlzLmF0dHJzLmVudHJpZXMoKSkge1xyXG4gICAgICBpZiAoIWtleS5pbmNsdWRlcygnOicpKSBjb250aW51ZVxyXG5cclxuICAgICAgY29uc3QgWyBhdHRyUHJlZml4LCBuYW1lIF0gPSBrZXkuc3BsaXQoJzonKVxyXG4gICAgICBpZiAoYXR0clByZWZpeCA9PT0gJ3htbG5zJyAmJiB2YWwgPT09IG5hbWVzcGFjZVVSSSAmJiBvcmlnaW5hbEVsZW1lbnQubG9va3VwTmFtZXNwYWNlVVJJKG5hbWUpID09PSBuYW1lc3BhY2VVUkkpIHtcclxuICAgICAgICByZXR1cm4gbmFtZVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRW50aXR5UmVmZXJlbmNlcyBtYXkgaGF2ZSB0byBiZSBza2lwcGVkIHRvIGdldCB0byBpdFxyXG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmxvb2t1cE5hbWVzcGFjZVByZWZpeChuYW1lc3BhY2VVUkksIG9yaWdpbmFsRWxlbWVudClcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG5cclxuICBsb29rdXBOYW1lc3BhY2VVUkkgKHByZWZpeCkge1xyXG4gICAgc3dpdGNoICh0aGlzLm5vZGVUeXBlKSB7XHJcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxyXG4gICAgICBpZiAodGhpcy5uYW1lc3BhY2VVUkkgIT0gbnVsbCAmJiB0aGlzLnByZWZpeCA9PT0gcHJlZml4KSB7XHJcbiAgICAgICAgLy8gTm90ZTogcHJlZml4IGNvdWxkIGJlIFwibnVsbFwiIGluIHRoaXMgY2FzZSB3ZSBhcmUgbG9va2luZyBmb3IgZGVmYXVsdCBuYW1lc3BhY2VcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lc3BhY2VVUklcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChjb25zdCBbIGtleSwgdmFsIF0gb2YgdGhpcy5hdHRycy5lbnRyaWVzKCkpIHtcclxuICAgICAgICBpZiAoIWtleS5pbmNsdWRlcygnOicpKSBjb250aW51ZVxyXG5cclxuICAgICAgICBjb25zdCBbIGF0dHJQcmVmaXgsIG5hbWUgXSA9IGtleS5zcGxpdCgnOicpXHJcbiAgICAgICAgaWYgKGF0dHJQcmVmaXggPT09ICd4bWxucycgJiYgbmFtZSA9PT0gcHJlZml4KSB7XHJcbiAgICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICAgIC8vIEZJWE1FOiBMb29rIHVwIGlmIHByZWZpeCBvciBhdHRyUHJlZml4XHJcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAneG1sbnMnICYmIHByZWZpeCA9PSBudWxsKSB7XHJcbiAgICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcclxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGUubG9va3VwTmFtZXNwYWNlVVJJKHByZWZpeClcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX05PREU6XHJcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudC5sb29rdXBOYW1lc3BhY2VVUkkocHJlZml4KVxyXG4gICAgY2FzZSBOb2RlLkVOVElUWV9OT0RFOlxyXG4gICAgY2FzZSBOb2RlLk5PVEFUSU9OX05PREU6XHJcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfVFlQRV9OT0RFOlxyXG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICBjYXNlIE5vZGUuQVRUUklCVVRFX05PREU6XHJcbiAgICAgIGlmICh0aGlzLm93bmVyRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm93bmVyRWxlbWVudC5sb29rdXBOYW1lc3BhY2VVUkkocHJlZml4KVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAvLyBFbnRpdHlSZWZlcmVuY2VzIG1heSBoYXZlIHRvIGJlIHNraXBwZWQgdG8gZ2V0IHRvIGl0XHJcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmxvb2t1cE5hbWVzcGFjZVVSSShwcmVmaXgpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvb2t1cFByZWZpeCAobmFtZXNwYWNlVVJJKSB7XHJcbiAgICBpZiAoIW5hbWVzcGFjZVVSSSkge1xyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLm5vZGVUeXBlXHJcblxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxyXG4gICAgICByZXR1cm4gdGhpcy5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJLCB0aGlzKVxyXG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX05PREU6XHJcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudC5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJKVxyXG4gICAgY2FzZSBOb2RlLkVOVElUWV9OT0RFIDpcclxuICAgIGNhc2UgTm9kZS5OT1RBVElPTl9OT0RFOlxyXG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XHJcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfVFlQRV9OT0RFOlxyXG4gICAgICByZXR1cm4gbnVsbCAvLyB0eXBlIGlzIHVua25vd25cclxuICAgIGNhc2UgTm9kZS5BVFRSSUJVVEVfTk9ERTpcclxuICAgICAgaWYgKHRoaXMub3duZXJFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3duZXJFbGVtZW50Lmxvb2t1cE5hbWVzcGFjZVByZWZpeChuYW1lc3BhY2VVUkkpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcclxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGUubG9va3VwTmFtZXNwYWNlUHJlZml4KG5hbWVzcGFjZVVSSSlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbm9ybWFsaXplICgpIHtcclxuICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBbXVxyXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuY2hpbGROb2Rlcykge1xyXG4gICAgICBjb25zdCBsYXN0ID0gY2hpbGROb2Rlcy5zaGlmdCgpXHJcbiAgICAgIGlmICghbGFzdCkge1xyXG4gICAgICAgIGlmIChub2RlLmRhdGEpIHtcclxuICAgICAgICAgIGNoaWxkTm9kZXMudW5zaGlmdChub2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb250aW51ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcclxuICAgICAgICBpZiAoIW5vZGUuZGF0YSkge1xyXG4gICAgICAgICAgY2hpbGROb2Rlcy51bnNoaWZ0KGxhc3QpXHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxhc3Qubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XHJcbiAgICAgICAgICBjb25zdCBtZXJnZWQgPSB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGFzdC5kYXRhICsgbm9kZS5kYXRhKVxyXG4gICAgICAgICAgY2hpbGROb2Rlcy5wdXNoKG1lcmdlZClcclxuICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGlsZE5vZGVzLnB1c2gobGFzdCwgbm9kZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hpbGROb2RlcyA9IGNoaWxkTm9kZXNcclxuICAgIC8vIHRoaXMuY2hpbGROb2RlcyA9IHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKCh0ZXh0Tm9kZXMsIG5vZGUpID0+IHtcclxuICAgIC8vICAgLy8gRklYTUU6IElmIGZpcnN0IG5vZGUgaXMgYW4gZW1wdHkgdGV4dG5vZGUsIHdoYXQgZG8gd2UgZG8/IC0+IHNwZWNcclxuICAgIC8vICAgaWYgKCF0ZXh0Tm9kZXMpIHJldHVybiBbIG5vZGUgXVxyXG4gICAgLy8gICB2YXIgbGFzdCA9IHRleHROb2Rlcy5wb3AoKVxyXG5cclxuICAgIC8vICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XHJcbiAgICAvLyAgICAgaWYgKCFub2RlLmRhdGEpIHJldHVybiB0ZXh0Tm9kZXNcclxuXHJcbiAgICAvLyAgICAgaWYgKGxhc3Qubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XHJcbiAgICAvLyAgICAgICBjb25zdCBtZXJnZWQgPSB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGFzdC5kYXRhICsgJyAnICsgbm9kZS5kYXRhKVxyXG4gICAgLy8gICAgICAgdGV4dE5vZGVzLnB1c2gobWVyZ2VkKVxyXG4gICAgLy8gICAgICAgcmV0dXJuIHRleHROb2Rlcy5jb25jYXQobWVyZ2VkKVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfSBlbHNlIHtcclxuICAgIC8vICAgICB0ZXh0Tm9kZXMucHVzaChsYXN0LCBub2RlKVxyXG4gICAgLy8gICB9XHJcblxyXG4gICAgLy8gICByZXR1cm4gdGV4dE5vZGVzXHJcbiAgICAvLyB9LCBudWxsKVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ2hpbGQgKG5vZGUpIHtcclxuXHJcbiAgICBub2RlLnBhcmVudE5vZGUgPSBudWxsXHJcbiAgICAvLyBPYmplY3Quc2V0UHJvdG90eXBlT2Yobm9kZSwgbnVsbClcclxuICAgIHZhciBpbmRleCA9IHRoaXMuY2hpbGROb2Rlcy5pbmRleE9mKG5vZGUpXHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm4gbm9kZVxyXG4gICAgdGhpcy5jaGlsZE5vZGVzLnNwbGljZShpbmRleCwgMSlcclxuICAgIHJldHVybiBub2RlXHJcbiAgfVxyXG5cclxuICByZXBsYWNlQ2hpbGQgKG5ld0NoaWxkLCBvbGRDaGlsZCkge1xyXG4gICAgdmFyIGJlZm9yZSA9IG9sZENoaWxkLm5leHRTaWJsaW5nXHJcbiAgICB0aGlzLnJlbW92ZUNoaWxkKG9sZENoaWxkKVxyXG4gICAgdGhpcy5pbnNlcnRCZWZvcmUobmV3Q2hpbGQsIGJlZm9yZSlcclxuICAgIHJldHVybiBvbGRDaGlsZFxyXG4gIH1cclxuXHJcbiAgZ2V0IG5leHRTaWJsaW5nICgpIHtcclxuICAgIGNvbnN0IGNoaWxkID0gdGhpcy5wYXJlbnROb2RlICYmIHRoaXMucGFyZW50Tm9kZS5jaGlsZE5vZGVzW3RoaXMucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmluZGV4T2YodGhpcykgKyAxXVxyXG4gICAgcmV0dXJuIGNoaWxkIHx8IG51bGxcclxuICB9XHJcblxyXG4gIGdldCBwcmV2aW91c1NpYmxpbmcgKCkge1xyXG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLnBhcmVudE5vZGUgJiYgdGhpcy5wYXJlbnROb2RlLmNoaWxkTm9kZXNbdGhpcy5wYXJlbnROb2RlLmNoaWxkTm9kZXMuaW5kZXhPZih0aGlzKSAtIDFdXHJcbiAgICByZXR1cm4gY2hpbGQgfHwgbnVsbFxyXG4gIH1cclxuXHJcbiAgZ2V0IHRleHRDb250ZW50ICgpIHtcclxuICAgIGlmICh0aGlzLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkgcmV0dXJuIHRoaXMuZGF0YVxyXG4gICAgaWYgKHRoaXMubm9kZVR5cGUgPT09IE5vZGUuQ0RBVEFfU0VDVElPTl9OT0RFKSByZXR1cm4gdGhpcy5kYXRhXHJcbiAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREUpIHJldHVybiB0aGlzLmRhdGFcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzLnJlZHVjZShmdW5jdGlvbiAobGFzdCwgY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gbGFzdCArIGN1cnJlbnQudGV4dENvbnRlbnRcclxuICAgIH0sICcnKVxyXG4gIH1cclxuXHJcbiAgc2V0IHRleHRDb250ZW50ICh0ZXh0KSB7XHJcbiAgICB0aGlzLmNoaWxkTm9kZXMgPSBbIHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KSBdXHJcbiAgfVxyXG5cclxuICBnZXQgbGFzdENoaWxkICgpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkTm9kZXNbdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdIHx8IG51bGxcclxuICB9XHJcblxyXG4gIGdldCBmaXJzdENoaWxkICgpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkTm9kZXNbMF0gfHwgbnVsbFxyXG4gIH1cclxufVxyXG5cclxuZXh0ZW5kU3RhdGljKE5vZGUsIG5vZGVUeXBlcylcclxuZXh0ZW5kKE5vZGUsIG5vZGVUeXBlcylcclxuIiwiaW1wb3J0IHsgZXh0ZW5kU3RhdGljIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlRmlsdGVyIHtcclxuICBhY2NlcHROb2RlICgpIHtcclxuICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFRcclxuICB9XHJcbn1cclxuXHJcbmV4dGVuZFN0YXRpYyhOb2RlRmlsdGVyLCB7XHJcbiAgRklMVEVSX0FDQ0VQVDogMSxcclxuICBGSUxURVJfUkVKRUNUOiAyLFxyXG4gIEZJTFRFUl9JR05PUkU6IDQsXHJcbiAgU0hPV19BTEw6IC0xLFxyXG4gIFNIT1dfRUxFTUVOVDogMSxcclxuICBTSE9XX1RFWFQ6IDQsXHJcbiAgU0hPV19FTlRJVFlfUkVGRVJFTkNFOiAxNixcclxuICBTSE9XX0VOVElUWTogMzIsXHJcbiAgU0hPV19QUk9DRVNTSU5HX0lOU1RSVUNUSU9OOiA2NCxcclxuICBTSE9XX0NPTU1FTlQ6IDEyOCxcclxuICBTSE9XX0RPQ1VNRU5UOiAyNTYsXHJcbiAgU0hPV19ET0NVTUVOVF9UWVBFOiA1MTIsXHJcbiAgU0hPV19ET0NVTUVOVF9GUkFHTUVOVDogMTAyNCxcclxuICBTSE9XX05PVEFUSU9OOiAyMDQ4XHJcbn0pXHJcbiIsImltcG9ydCB7IENoYXJhY3RlckRhdGEgfSBmcm9tICcuL0NoYXJhY3RlckRhdGEuanMnXHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIENoYXJhY3RlckRhdGEge1xyXG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcykge1xyXG4gICAgc3VwZXIobmFtZSwgcHJvcHMpXHJcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5URVhUX05PREVcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcbmltcG9ydCB7IEV2ZW50VGFyZ2V0IH0gZnJvbSAnLi9FdmVudFRhcmdldC5qcydcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXG5pbXBvcnQgeyBEb2N1bWVudCB9IGZyb20gJy4vRG9jdW1lbnQuanMnXG5pbXBvcnQgeyBEb2N1bWVudEZyYWdtZW50IH0gZnJvbSAnLi9Eb2N1bWVudEZyYWdtZW50LmpzJ1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vVGV4dC5qcydcbmltcG9ydCB7IEN1c3RvbUV2ZW50IH0gZnJvbSAnLi9DdXN0b21FdmVudC5qcydcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9FdmVudC5qcydcbmltcG9ydCB7IEVsZW1lbnQgfSBmcm9tICcuL0VsZW1lbnQuanMnXG5pbXBvcnQgeyBBdHRyIH0gZnJvbSAnLi9BdHRyLmpzJ1xuaW1wb3J0IHsgSFRNTEltYWdlRWxlbWVudCB9IGZyb20gJy4vaHRtbC9IVE1MSW1hZ2VFbGVtZW50LmpzJ1xuaW1wb3J0IHsgSFRNTExpbmtFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxMaW5rRWxlbWVudC5qcydcbmltcG9ydCB7IEhUTUxTY3JpcHRFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzJ1xuaW1wb3J0IHsgSFRNTEVsZW1lbnQgfSBmcm9tICcuL2h0bWwvSFRNTEVsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdQb2ludCB9IGZyb20gJy4vc3ZnL1NWR1BvaW50LmpzJ1xuaW1wb3J0IHsgU1ZHTWF0cml4IH0gZnJvbSAnLi9zdmcvU1ZHTWF0cml4LmpzJ1xuaW1wb3J0IHsgU1ZHRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR0VsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdTVkdFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHU1ZHRWxlbWVudC5qcydcbmltcG9ydCB7IFNWR1BhdGhFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHUGF0aEVsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdHcmFwaGljc0VsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdUZXh0Q29udGVudEVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdUZXh0Q29udGVudEVsZW1lbnQuanMnXG5pbXBvcnQgeyBjYW1lbENhc2UgfSBmcm9tICcuLi91dGlscy9zdHJVdGlscy5qcydcbmltcG9ydCAqIGFzIGRlZmF1bHRzIGZyb20gJy4uL3V0aWxzL2RlZmF1bHRzLmpzJ1xuXG5leHBvcnQgY2xhc3MgV2luZG93IGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZG9jdW1lbnQgPSBuZXcgRG9jdW1lbnQoKVxuICAgIHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgPSB0aGlzXG4gICAgdGhpcy5zZWxmID0gdGhpc1xuICAgIGNvbnN0IGRvYyA9IHRoaXMuZG9jdW1lbnRcbiAgICB0aGlzLkltYWdlID0gY2xhc3Mge1xuICAgICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgY29uc3QgaW1nID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgIGlmICh3aWR0aCAhPSBudWxsKSBpbWcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoKVxuICAgICAgICBpZiAoaGVpZ2h0ICE9IG51bGwpIGltZy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgcmV0dXJuIGltZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENvbXB1dGVkU3R5bGUgKG5vZGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gRklYTUU6IEN1cnJlbnRseSB0aGlzIGZ1bmN0aW9uIHRyZWF0cyBldmVyeSBnaXZlbiBhdHRyXG4gICAgICAvLyBhcyBpbmhlcml0YWJsZSBmcm9tIGl0cyBwYXJlbnRzIHdoaWNoIGlzIG9mYyBub3QgYWx3YXlzIHRydWVcbiAgICAgIC8vIGJ1dCBnb29kIGVub3VnaCBmb3Igc3ZnLmpzXG4gICAgICBnZXRQcm9wZXJ0eVZhbHVlIChhdHRyKSB7XG4gICAgICAgIGxldCB2YWx1ZVxuICAgICAgICBsZXQgY3VyID0gbm9kZVxuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICB2YWx1ZSA9IGN1ci5zdHlsZVthdHRyXSB8fCBjdXIuZ2V0QXR0cmlidXRlKGF0dHIpXG4gICAgICAgIH0gd2hpbGUgKFxuICAgICAgICAgIHZhbHVlID09IG51bGxcbiAgICAgICAgICAmJiAoY3VyID0gY3VyLnBhcmVudE5vZGUpXG4gICAgICAgICAgJiYgY3VyLm5vZGVUeXBlID09PSAxXG4gICAgICAgIClcblxuICAgICAgICByZXR1cm4gdmFsdWUgfHwgZGVmYXVsdHNbY2FtZWxDYXNlKGF0dHIpXSB8fCBudWxsXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmxldCBsYXN0VGltZSA9IDBcbmNvbnN0IHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGNhbGxiYWNrID0+IHtcbiAgY29uc3Qgbm93ID0gbmV3IGdsb2JhbC5EYXRlKCkuZ2V0VGltZSgpXG4gIGNvbnN0IHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChub3cgLSBsYXN0VGltZSkpXG4gIHJldHVybiBnbG9iYWwuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbGFzdFRpbWUgPSBub3cgKyB0aW1lVG9DYWxsXG4gICAgY2FsbGJhY2sobGFzdFRpbWUpXG4gIH0sIHRpbWVUb0NhbGwpXG59XG5cbmNvbnN0IG5vd09mZnNldCA9IGdsb2JhbC5EYXRlLm5vdygpXG5jb25zdCBwZXJmb3JtYW5jZSA9IHtcbiAgbm93OiAoKSA9PiBEYXRlLm5vdygpIC0gbm93T2Zmc2V0XG59XG5cbmNvbnN0IHdpblByb3BzID0ge1xuICBXaW5kb3csXG4gIERvY3VtZW50LFxuICBEb2N1bWVudEZyYWdtZW50LFxuICBOb2RlLFxuICBFdmVudFRhcmdldCxcbiAgVGV4dCxcbiAgQXR0cixcbiAgRWxlbWVudCxcbiAgQ3VzdG9tRXZlbnQsXG4gIEV2ZW50LFxuICBIVE1MRWxlbWVudCxcbiAgSFRNTExpbmtFbGVtZW50LFxuICBIVE1MU2NyaXB0RWxlbWVudCxcbiAgSFRNTEltYWdlRWxlbWVudCxcbiAgLy8gSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIC8vIGlzIHNldCBvbiBjb25zdHJ1Y3Rpb25cbiAgU1ZHTWF0cml4LFxuICBTVkdQb2ludCxcbiAgU1ZHRWxlbWVudCxcbiAgU1ZHU1ZHRWxlbWVudCxcbiAgU1ZHUGF0aEVsZW1lbnQsXG4gIFNWR0dyYXBoaWNzRWxlbWVudCxcbiAgU1ZHVGV4dENvbnRlbnRFbGVtZW50LFxuICBzZXRUaW1lb3V0OiBnbG9iYWwuc2V0VGltZW91dCxcbiAgY2xlYXJUaW1lb3V0OiBnbG9iYWwuY2xlYXJUaW1lb3V0LFxuICBwYWdlWE9mZnNldDogMCxcbiAgcGFnZVlPZmZzZXQ6IDAsXG4gIERhdGU6IGdsb2JhbC5EYXRlLFxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lOiBnbG9iYWwuY2xlYXJUaW1lb3V0LFxuICBwZXJmb3JtYW5jZVxufVxuXG5leHRlbmQoV2luZG93LCB3aW5Qcm9wcylcbiIsImltcG9ydCB7IEVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50LmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEhUTUxFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7fVxyXG4iLCJpbXBvcnQgc2l6ZU9mIGZyb20gJ2ltYWdlLXNpemUnXHJcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi4vRXZlbnQuanMnXHJcbmltcG9ydCB7IEhUTUxFbGVtZW50IH0gZnJvbSAnLi9IVE1MRWxlbWVudC5qcydcclxuLy8gaW1wb3J0IHsgZ2V0RmlsZUJ1ZmZlckZyb21VUkwgfSBmcm9tICcuLi8uLi91dGlscy9maWxlVXJsVG9CdWZmZXIuanMnXHJcbi8vIGltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG5leHBvcnQgY2xhc3MgSFRNTEltYWdlRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvciAoLi4uYXJncykge1xyXG4gICAgc3VwZXIoLi4uYXJncylcclxuICAgIHRoaXMubmF0dXJhbFdpZHRoID0gMFxyXG4gICAgdGhpcy5uYXR1cmFsSGVpZ2h0ID0gMFxyXG4gICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlXHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhIVE1MSW1hZ2VFbGVtZW50LnByb3RvdHlwZSwge1xyXG4gIHNyYzoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKVxyXG4gICAgfSxcclxuICAgIHNldCAodmFsKSB7XHJcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzcmMnLCB2YWwpXHJcbiAgICAgIC8vIGNvbnN0IHVybCA9IHBhdGgucmVzb2x2ZSh0aGlzLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcubG9jYXRpb24sIHZhbClcclxuICAgICAgLy8gZ2V0RmlsZUJ1ZmZlckZyb21VUkwodXJsLCAoYnVmZmVyKSA9PiB7XHJcbiAgICAgIHNpemVPZih2YWwsIChlcnIsIHNpemUpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdlcnJvcicpKVxyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF0dXJhbFdpZHRoID0gc2l6ZS53aWR0aFxyXG4gICAgICAgIHRoaXMubmF0dXJhbEhlaWdodCA9IHNpemUuaGVpZ2h0XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IHRydWVcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2FkJykpXHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBoZWlnaHQ6IHtcclxuICAgIGdldCAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykgfHwgdGhpcy5uYXR1cmFsSGVpZ2h0XHJcbiAgICB9LFxyXG4gICAgc2V0ICh2YWwpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHZhbClcclxuICAgIH1cclxuICB9LFxyXG4gIHdpZHRoOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykgfHwgdGhpcy5uYXR1cmFsV2lkdGhcclxuICAgIH0sXHJcbiAgICBzZXQgKHZhbCkge1xyXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB2YWwpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudCB9IGZyb20gJy4vSFRNTEVsZW1lbnQuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgSFRNTExpbmtFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge31cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEhUTUxMaW5rRWxlbWVudC5wcm90b3R5cGUsIHtcclxuICBocmVmOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxyXG4gICAgfSxcclxuICAgIHNldCAodmFsKSB7XHJcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdocmVmJywgdmFsKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVsOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3JlbCcpXHJcbiAgICB9LFxyXG4gICAgc2V0ICh2YWwpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JlbCcsIHZhbClcclxuICAgIH1cclxuICB9LFxyXG4gIHR5cGU6IHtcclxuICAgIGdldCAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHlwZScpXHJcbiAgICB9LFxyXG4gICAgc2V0ICh2YWwpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB2YWwpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iLCJpbXBvcnQgc2F4IGZyb20gJ3NheCdcclxuXHJcbi8vIFRPRE86IEl0cyBhbiBYTUxQYXJzZXIgbm90IEhUTUxQYXJzZXIhIVxyXG5leHBvcnQgY29uc3QgSFRNTFBhcnNlciA9IGZ1bmN0aW9uIChzdHIsIGVsKSB7XHJcbiAgbGV0IGN1cnJlbnRUYWcgPSBlbFxyXG4gIC8vIGNvbnN0IG5hbWVzcGFjZXMgPSB7IHhtbG5zOiBlbC5nZXRBdHRyaWJ1dGUoJ3htbG5zJykgfVxyXG4gIGxldCBkb2N1bWVudCA9IGVsLm93bmVyRG9jdW1lbnRcclxuICBsZXQgY2RhdGEgPSBudWxsXHJcblxyXG4gIC8vIHNheCBleHBlY3RzIGEgcm9vdCBlbGVtZW50IGJ1dCB3ZSBhbHNvIG1pc3N1c2UgaXQgdG8gcGFyc2UgZnJhZ21lbnRzXHJcbiAgaWYgKGVsLm5vZGVUeXBlICE9PSBlbC5ET0NVTUVOVF9OT0RFKSB7XHJcbiAgICBzdHIgPSAnPHN2Z2RvbTp3cmFwcGVyIHhtbG5zOnN2Z2RvbT1cInN2Z2RvbTpyb2Nrc1wiPicgKyBzdHIgKyAnPC9zdmdkb206d3JhcHBlcj4nXHJcbiAgfSBlbHNlIHtcclxuICAgIGRvY3VtZW50ID0gZWxcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlciA9IHNheC5wYXJzZXIodHJ1ZSwge1xyXG4gICAgLy8gbG93ZXJjYXNlOiB0cnVlLFxyXG4gICAgeG1sbnM6IHRydWUsXHJcbiAgICBzdHJpY3RFbnRpdGllczogdHJ1ZVxyXG4gIH0pXHJcblxyXG4gIHBhcnNlci5vbmVycm9yID0gKGUpID0+IHtcclxuICAgIHRocm93IGVcclxuICB9XHJcblxyXG4gIHBhcnNlci5vbmRvY3R5cGUgPSAoc3RyKSA9PiB7XHJcbiAgICBpZiAoY3VycmVudFRhZyAhPT0gZG9jdW1lbnQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEb2N0eXBlIGNhbiBvbmx5IGJlIGFwcGVuZGVkIHRvIGRvY3VtZW50JylcclxuICAgIH1cclxuICAgIGN1cnJlbnRUYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnRUeXBlKCkpXHJcbiAgfVxyXG5cclxuICBwYXJzZXIub250ZXh0ID0gKHN0cikgPT4gY3VycmVudFRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKVxyXG4gIHBhcnNlci5vbmNvbW1lbnQgPSAoc3RyKSA9PiBjdXJyZW50VGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoc3RyKSlcclxuXHJcbiAgLy8gcGFyc2VyLm9ub3Blbm5hbWVzcGFjZSA9IG5zID0+IHtcclxuICAvLyAgIG5hbWVzcGFjZXNbbnMucHJlZml4XSA9IG5zLnVyaVxyXG4gIC8vIH1cclxuICAvLyBwYXJzZXIub25jbG9zZW5hbWVzcGFjZSA9IG5zID0+IHtcclxuICAvLyAgIGRlbGV0ZSBuYW1lc3BhY2VzW25zLnByZWZpeF1cclxuICAvLyB9XHJcblxyXG4gIHBhcnNlci5vbm9wZW50YWcgPSBub2RlID0+IHtcclxuICAgIGlmIChub2RlLm5hbWUgPT09ICdzdmdkb206d3JhcHBlcicpIHJldHVyblxyXG5cclxuICAgIGNvbnN0IGF0dHJzID0gbm9kZS5hdHRyaWJ1dGVzXHJcblxyXG4gICAgY29uc3QgdXJpID0gbm9kZS51cmkgfHwgY3VycmVudFRhZy5sb29rdXBOYW1lc3BhY2VVUkkobm9kZS5wcmVmaXggfHwgbnVsbClcclxuXHJcbiAgICB2YXIgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh1cmksIG5vZGUubmFtZSlcclxuXHJcbiAgICBmb3IgKGNvbnN0IFsgbmFtZSwgbm9kZSBdIG9mIE9iamVjdC5lbnRyaWVzKGF0dHJzKSkge1xyXG4gICAgICBuZXdFbGVtZW50LnNldEF0dHJpYnV0ZU5TKG5vZGUudXJpLCBuYW1lLCBub2RlLnZhbHVlKVxyXG4gICAgfVxyXG5cclxuICAgIGN1cnJlbnRUYWcuYXBwZW5kQ2hpbGQobmV3RWxlbWVudClcclxuICAgIGN1cnJlbnRUYWcgPSBuZXdFbGVtZW50XHJcbiAgfVxyXG5cclxuICBwYXJzZXIub25jbG9zZXRhZyA9IHRhZ05hbWUgPT4ge1xyXG4gICAgaWYgKHRhZ05hbWUgPT09ICdzdmdkb206d3JhcHBlcicpIHJldHVyblxyXG5cclxuICAgIGN1cnJlbnRUYWcgPSBjdXJyZW50VGFnLnBhcmVudE5vZGVcclxuICB9XHJcblxyXG4gIHBhcnNlci5vbm9wZW5jZGF0YSA9ICgpID0+IHtcclxuICAgIGNkYXRhID0gZG9jdW1lbnQuY3JlYXRlQ0RBVEFTZWN0aW9uKCcnKVxyXG4gIH1cclxuXHJcbiAgcGFyc2VyLm9uY2RhdGEgPSAoc3RyKSA9PiB7XHJcbiAgICBjZGF0YS5hcHBlbmREYXRhKHN0cilcclxuICB9XHJcblxyXG4gIHBhcnNlci5vbmNsb3NlY2RhdGEgPSAoKSA9PiB7XHJcbiAgICBjdXJyZW50VGFnLmFwcGVuZENoaWxkKGNkYXRhKVxyXG4gIH1cclxuXHJcbiAgcGFyc2VyLndyaXRlKHN0cilcclxufVxyXG4iLCJcclxuaW1wb3J0IHsgSFRNTEVsZW1lbnQgfSBmcm9tICcuL0hUTUxFbGVtZW50LmpzJ1xyXG5leHBvcnQgY2xhc3MgSFRNTFNjcmlwdEVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7fVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoSFRNTFNjcmlwdEVsZW1lbnQucHJvdG90eXBlLCB7XHJcbiAgc3JjOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NyYycpXHJcbiAgICB9LFxyXG4gICAgc2V0ICh2YWwpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHZhbClcclxuICAgIH1cclxuICB9LFxyXG4gIHR5cGU6IHtcclxuICAgIGdldCAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHlwZScpXHJcbiAgICB9LFxyXG4gICAgc2V0ICh2YWwpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB2YWwpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iLCJpbXBvcnQgeyBub2Rlc1RvTm9kZSB9IGZyb20gJy4uLy4uL3V0aWxzL25vZGVzVG9Ob2RlLmpzJ1xyXG5cclxuLy8gaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNpbnRlcmZhY2UtY2hpbGRub2RlXHJcbi8vIFRvZG86IGNoZWNrIGlmIHRoaXMgaXMgY29udGFpbmVkIGluIG5vZGVzIG9yIHNpYmxpbmdzIGFyZSBjb250YWluZWQgKHZpYWJsZVByZXZpb3VzU2libGluZywgdmlhYmxlTmV4dFNpYmxpbmcpXHJcbmV4cG9ydCBjb25zdCBDaGlsZE5vZGUgPSB7XHJcbiAgYmVmb3JlIChub2Rlcykge1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVyblxyXG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXHJcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdGhpcylcclxuICB9LFxyXG4gIGFmdGVyIChub2Rlcykge1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVyblxyXG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXHJcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdGhpcy5uZXh0U2libGluZylcclxuICB9LFxyXG4gIHJlcGxhY2VXaXRoIChub2Rlcykge1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVyblxyXG4gICAgY29uc3QgbmV4dCA9IHRoaXMubmV4dFNpYmxpbmdcclxuICAgIHRoaXMuZGVsZXRlKClcclxuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1RvTm9kZShub2RlcylcclxuICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZShub2RlLCBuZXh0KVxyXG4gIH0sXHJcbiAgcmVtb3ZlICgpIHtcclxuICAgIGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm5cclxuICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlID0ge1xyXG5cclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlLCB7XHJcbiAgcHJldmlvdXNFbGVtZW50U2libGluZzoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgbGV0IG5vZGVcclxuICAgICAgd2hpbGUgKChub2RlID0gdGhpcy5wcmV2aW91c1NpYmxpbmcpKSB7XHJcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICAgICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG5leHRFbGVtZW50U2libGluZzoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgbGV0IG5vZGVcclxuICAgICAgd2hpbGUgKChub2RlID0gdGhpcy5uZXh0U2libGluZykpIHtcclxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHtcclxuICAgICAgICAgIHJldHVybiBub2RlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iLCJpbXBvcnQgeyBOb2RlSXRlcmF0b3IgfSBmcm9tICcuLi8uLi91dGlscy9Ob2RlSXRlcmF0b3IuanMnXHJcbmltcG9ydCB7IE5vZGVGaWx0ZXIgfSBmcm9tICcuLi9Ob2RlRmlsdGVyLmpzJ1xyXG5cclxuLy8gaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNpbnRlcmZhY2Utbm9uZWxlbWVudHBhcmVudG5vZGVcclxuZXhwb3J0IGNvbnN0IE5vbkVsZW1lbnRQYXJlbnROb2RlID0ge1xyXG4gIGdldEVsZW1lbnRCeUlkIChpZCkge1xyXG4gICAgY29uc3QgaXRlciA9IG5ldyBOb2RlSXRlcmF0b3IodGhpcywgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIChub2RlKSA9PiBpZCA9PT0gbm9kZS5pZCA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSwgZmFsc2UpXHJcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgaXRlcikge1xyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ3NzUXVlcnkgfSBmcm9tICcuLi8uLi9vdGhlci9Dc3NRdWVyeS5qcydcclxuaW1wb3J0IHsgTm9kZUl0ZXJhdG9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvTm9kZUl0ZXJhdG9yLmpzJ1xyXG5pbXBvcnQgeyBOb2RlRmlsdGVyIH0gZnJvbSAnLi4vTm9kZUZpbHRlci5qcydcclxuaW1wb3J0IHsgbm9kZXNUb05vZGUgfSBmcm9tICcuLi8uLi91dGlscy9ub2Rlc1RvTm9kZS5qcydcclxuXHJcbi8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jcGFyZW50bm9kZVxyXG5jb25zdCBQYXJlbnROb2RlID0ge1xyXG4gIG1hdGNoV2l0aFNjb3BlIChxdWVyeSwgc2NvcGUpIHtcclxuICAgIHJldHVybiBuZXcgQ3NzUXVlcnkocXVlcnkpLm1hdGNoZXModGhpcywgc2NvcGUpXHJcbiAgfSxcclxuXHJcbiAgcXVlcnkgKHF1ZXJ5LCBzY29wZSwgc2luZ2xlID0gZmFsc2UpIHtcclxuXHJcbiAgICBjb25zdCBpdGVyID0gbmV3IE5vZGVJdGVyYXRvcihzY29wZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIChub2RlKSA9PiBub2RlLm1hdGNoV2l0aFNjb3BlKHF1ZXJ5LCBzY29wZSkgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUsIGZhbHNlKVxyXG5cclxuICAgIGNvbnN0IG5vZGVzID0gW11cclxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBpdGVyKSB7XHJcbiAgICAgIG5vZGVzLnB1c2gobm9kZSlcclxuICAgICAgaWYgKHNpbmdsZSkgcmV0dXJuIG5vZGVzXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5vZGVzXHJcbiAgfSxcclxuXHJcbiAgcXVlcnlTZWxlY3RvckFsbCAocXVlcnkpIHtcclxuICAgIHJldHVybiB0aGlzLnF1ZXJ5KHF1ZXJ5LCB0aGlzKVxyXG4gIH0sXHJcblxyXG4gIHF1ZXJ5U2VsZWN0b3IgKHF1ZXJ5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5xdWVyeShxdWVyeSwgdGhpcywgdHJ1ZSlbMF0gfHwgbnVsbFxyXG4gIH0sXHJcblxyXG4gIHByZXBlbmQgKG5vZGVzKSB7XHJcbiAgICBjb25zdCBub2RlID0gbm9kZXNUb05vZGUobm9kZXMsIHRoaXMub3duZXJEb2N1bWVudClcclxuXHJcbiAgICB0aGlzLmluc2VydEJlZm9yZShub2RlLCB0aGlzLmZpcnN0Q2hpbGQpXHJcbiAgfSxcclxuXHJcbiAgYXBwZW5kIChub2Rlcykge1xyXG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKG5vZGUpXHJcbiAgfSxcclxuXHJcbiAgcmVwbGFjZUNoaWxkcmVuIChub2Rlcykge1xyXG4gICAgd2hpbGUgKHRoaXMuZmlyc3RDaGlsZCkge1xyXG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZmlyc3RDaGlsZClcclxuICAgIH1cclxuICAgIHRoaXMuYXBwZW5kKG5vZGVzKVxyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUGFyZW50Tm9kZSwge1xyXG4gIGNoaWxkcmVuOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzLmZpbHRlcihmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIGZpcnN0RWxlbWVudENoaWxkOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5jaGlsZE5vZGVzKSB7XHJcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHtcclxuICAgICAgICAgIHJldHVybiBub2RlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgfSxcclxuICBsYXN0RWxlbWVudENoaWxkOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5jaGlsZE5vZGVzLnNsaWNlKCkucmV2ZXJzZSgpKSB7XHJcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHtcclxuICAgICAgICAgIHJldHVybiBub2RlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGlsZEVsZW1lbnRDb3VudDoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IHsgUGFyZW50Tm9kZSB9XHJcbiIsImltcG9ydCB7IE5vZGVGaWx0ZXIgfSBmcm9tICcuLi9Ob2RlRmlsdGVyLmpzJ1xyXG5pbXBvcnQgeyBOb2RlSXRlcmF0b3IgfSBmcm9tICcuLi8uLi91dGlscy9Ob2RlSXRlcmF0b3IuanMnXHJcblxyXG5jb25zdCBoYXNDbGFzcyA9IChub2RlLCBuYW1lKSA9PiB7XHJcbiAgY29uc3QgY2xhc3NMaXN0ID0gbm9kZS5jbGFzc05hbWUuc3BsaXQoL1xccysvKVxyXG4gIHJldHVybiBjbGFzc0xpc3QuaW5jbHVkZXMobmFtZSlcclxufVxyXG5cclxuY29uc3QgZWxlbWVudEFjY2VzcyA9IHtcclxuICBnZXRFbGVtZW50c0J5VGFnTmFtZSAobmFtZSkge1xyXG4gICAgLy8gY29uc3QgZG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnRcclxuICAgIGNvbnN0IGl0ZXIgPSBuZXcgTm9kZUl0ZXJhdG9yKHRoaXMsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCAobm9kZSkgPT4gbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSwgZmFsc2UpXHJcbiAgICAvLyBjb25zdCBpdGVyID0gZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKHRoaXMsIDEsIChub2RlKSA9PiBub2RlLm5vZGVOYW1lID09PSBuYW1lID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFKVxyXG4gICAgcmV0dXJuIFsgLi4uaXRlciBdXHJcbiAgfSxcclxuXHJcbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWVOUyAobnMsIG5hbWUpIHtcclxuICAgIC8vIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50XHJcbiAgICBjb25zdCBpdGVyID0gbmV3IE5vZGVJdGVyYXRvcih0aGlzLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCwgKG5vZGUpID0+IG5vZGUuaXNOYW1lc3BhY2UobnMpICYmIG5vZGUubm9kZU5hbWUgPT09IG5hbWUgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUsIGZhbHNlKVxyXG4gICAgLy8gY29uc3QgaXRlciA9IGRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcih0aGlzLCAxLCAobm9kZSkgPT4gbm9kZS5pc05hbWVzcGFjZShucykgJiYgbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSlcclxuICAgIHJldHVybiBbIC4uLml0ZXIgXVxyXG4gIH0sXHJcblxyXG4gIGdldEVsZW1lbnRzQnlDbGFzc05hbWUgKG5hbWUpIHtcclxuICAgIC8vIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50XHJcbiAgICBjb25zdCBpdGVyID0gbmV3IE5vZGVJdGVyYXRvcih0aGlzLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCwgKG5vZGUpID0+IGhhc0NsYXNzKG5vZGUsIG5hbWUpID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFLCBmYWxzZSlcclxuICAgIC8vIGNvbnN0IGl0ZXIgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3IodGhpcywgMSwgKG5vZGUpID0+IGhhc0NsYXNzKG5vZGUsIG5hbWUpID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFKVxyXG4gICAgcmV0dXJuIFsgLi4uaXRlciBdXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBlbGVtZW50QWNjZXNzIH1cclxuIiwiaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gJy4uL0VsZW1lbnQuanMnXG5leHBvcnQgY2xhc3MgU1ZHRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBnZXQgb3duZXJTVkdFbGVtZW50ICgpIHtcbiAgICBsZXQgcGFyZW50ID0gdGhpc1xuICAgIHdoaWxlICgocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUpKSB7XG4gICAgICBpZiAoJ3N2ZycgPT0gcGFyZW50Lm5vZGVOYW1lKSB7XG4gICAgICAgIHJldHVybiBwYXJlbnRcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGdldCB2aWV3cG9ydEVsZW1lbnQgKCkge1xuICAgIGxldCBwYXJlbnQgPSB0aGlzXG4gICAgd2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSkpIHtcbiAgICAgIC8vIFRPRE86IGFuZCBvdGhlcnNcbiAgICAgIGlmIChbICdzdmcnLCAnc3ltYm9sJyBdLmluY2x1ZGVzKHBhcmVudC5ub2RlTmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJpbXBvcnQgeyBTVkdFbGVtZW50IH0gZnJvbSAnLi9TVkdFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBnZXRQb2ludENsb3VkIH0gZnJvbSAnLi4vLi4vdXRpbHMvYmJveFV0aWxzLmpzJ1xyXG5pbXBvcnQgKiBhcyByZWdleCBmcm9tICcuLi8uLi91dGlscy9yZWdleC5qcydcclxuaW1wb3J0IHsgU1ZHTWF0cml4IH0gZnJvbSAnLi9TVkdNYXRyaXguanMnXHJcblxyXG4vLyBNYXAgbWF0cml4IGFycmF5IHRvIG9iamVjdFxyXG5mdW5jdGlvbiBhcnJheVRvTWF0cml4IChhKSB7XHJcbiAgcmV0dXJuIHsgYTogYVswXSwgYjogYVsxXSwgYzogYVsyXSwgZDogYVszXSwgZTogYVs0XSwgZjogYVs1XSB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTVkdHcmFwaGljc0VsZW1lbnQgZXh0ZW5kcyBTVkdFbGVtZW50IHtcclxuICAvLyBUT0RPOiBodHRwczovL3d3dy53My5vcmcvVFIvU1ZHMi9jb29yZHMuaHRtbCNDb21wdXRpbmdBVmlld3BvcnRzVHJhbnNmb3JtXHJcbiAgZ2VuZXJhdGVWaWV3Qm94TWF0cml4ICgpIHtcclxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvdmlld0JveFxyXG4gICAgaWYgKCFbICdtYXJrZXInLCAnc3ltYm9sJywgJ3BhdHRlcm4nLCAnc3ZnJywgJ3ZpZXcnIF0uaW5jbHVkZXModGhpcy5ub2RlTmFtZSkpIHtcclxuICAgICAgcmV0dXJuIG5ldyBTVkdNYXRyaXgoKVxyXG4gICAgfVxyXG5cclxuICAgIHZhciB2aWV3ID0gKHRoaXMuZ2V0QXR0cmlidXRlKCd2aWV3Qm94JykgfHwgJycpLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikubWFwKHBhcnNlRmxvYXQpLmZpbHRlcihlbCA9PiAhaXNOYU4oZWwpKVxyXG4gICAgdmFyIHdpZHRoID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSkgfHwgMFxyXG4gICAgdmFyIGhlaWdodCA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKSB8fCAwXHJcbiAgICB2YXIgeCA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyaWJ1dGUoJ3gnKSkgfHwgMFxyXG4gICAgdmFyIHkgPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cmlidXRlKCd5JykpIHx8IDBcclxuXHJcbiAgICAvLyBUT0RPOiBJZiBubyB3aWR0aCBhbmQgaGVpZ2h0IGlzIGdpdmVuLCB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBvdXRlciBzdmcgZWxlbWVudCBpcyB1c2VkXHJcbiAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBTVkdNYXRyaXgoKS50cmFuc2xhdGUoeCwgeSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmlldy5sZW5ndGggIT09IDQpIHtcclxuICAgICAgdmlldyA9IFsgMCwgMCwgd2lkdGgsIGhlaWdodCBdXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmlyc3QgYXBwbHkgeCBhbmQgeSBpZiBuZXN0ZWQsIHRoZW4gdmlld2JveCBzY2FsZSwgdGhlbiB2aWV3Qm94IG1vdmVcclxuICAgIHJldHVybiBuZXcgU1ZHTWF0cml4KCkudHJhbnNsYXRlKHgsIHkpLnNjYWxlKHdpZHRoIC8gdmlld1syXSwgaGVpZ2h0IC8gdmlld1szXSkudHJhbnNsYXRlKC12aWV3WzBdLCAtdmlld1sxXSlcclxuICB9XHJcblxyXG4gIGdldEJCb3ggKCkge1xyXG4gICAgcmV0dXJuIGdldFBvaW50Q2xvdWQodGhpcykuYmJveCgpXHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBUaGlzIG1ldGhvZCBhY3R1YWxseSBleGlzdHMgb24gYWxsIEVsZW1lbnRzXHJcbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICgpIHtcclxuICAgIC8vIFRoZSBib3VuZGluZyBjbGllbnQgcmVjdCB0YWtlcyB0aGUgc2NyZWVuIGN0bSBvZiB0aGUgZWxlbWVudFxyXG4gICAgLy8gYW5kIGNvbnZlcnRzIHRoZSBib3VuZGluZyBib3ggd2l0aCBpdFxyXG5cclxuICAgIC8vIGhvd2V2ZXIsIG5vcm1hbCBib3VuZGluZyBjb25zaXN0cyBvZjpcclxuICAgIC8vIC0gYWxsIGNoaWxkcmVuIHRyYW5zZm9ybWVkXHJcbiAgICAvLyAtIHRoZSB2aWV3Ym94IG9mIHRoZSBlbGVtZW50IGlmIGF2YWlsYWJsZVxyXG5cclxuICAgIC8vIFRoZSBib3VuZGluZ0NsaWVudFJlY3QgaXMgbm90IGFmZmVjdGVkIGJ5IGl0cyBvd24gdmlld2JveFxyXG4gICAgLy8gU28gd2UgYXBwbHkgb25seSBvdXIgb3duIHRyYW5zZm9ybWF0aW9ucyBhbmQgcGFyZW50cyBzY3JlZW5DVE1cclxuXHJcbiAgICBsZXQgbSA9IHRoaXMubWF0cml4aWZ5KClcclxuXHJcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlICYmIHRoaXMucGFyZW50Tm9kZS5ub2RlTmFtZSAhPT0gJyNkb2N1bWVudCcpIHtcclxuICAgICAgbSA9IHRoaXMucGFyZW50Tm9kZS5nZXRTY3JlZW5DVE0oKS5tdWx0aXBseShtKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGxldCBtID0gdGhpcy5nZXRTY3JlZW5DVE0oKVxyXG5cclxuICAgIC8vIFRoZXJlIGFyZSBhIGZldyBleHRyYSBydWxlcyByZWdhcmRpbmcgcmJveCBhbmQgdGhlIDxzdmc+IGVsZW1lbnRcclxuICAgIC8vIE5hbWVseSB0aGlzIGlzOlxyXG4gICAgLy8gQkJveCBpcyBjYWxjdWxhdGVkIGFzIG5vcm1hbCBmb3IgY29udGFpbmVyIGVsZW1lbnRzXHJcbiAgICAvLyBSYm94IGlzIGNhbGN1bGF0ZWQgd2l0aCB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgPHN2Zz5cclxuICAgIC8vIFRoaXMgY291bGQgYmUgYWxzbyB0cnVlIGZvciBzeW1ib2xzIHNvIHRoaXMgaXMgYTpcclxuICAgIC8vIFRvZG86IC4uLlxyXG4gICAgcmV0dXJuIGdldFBvaW50Q2xvdWQodGhpcywgZmFsc2UsIHRydWUpLnRyYW5zZm9ybShtKS5iYm94KClcclxuICB9XHJcblxyXG4gIGdldENUTSAoKSB7XHJcbiAgICB2YXIgbSA9IHRoaXMubWF0cml4aWZ5KClcclxuXHJcbiAgICB2YXIgbm9kZSA9IHRoaXNcclxuICAgIHdoaWxlICgobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpIHtcclxuICAgICAgaWYgKFsgJ3N2ZycsICdzeW1ib2wnLCAnaW1hZ2UnLCAncGF0dGVybicsICdtYXJrZXInIF0uaW5kZXhPZihub2RlLm5vZGVOYW1lKSA+IC0xKSBicmVha1xyXG4gICAgICBtID0gbS5tdWx0aXBseShub2RlLm1hdHJpeGlmeSgpKVxyXG4gICAgICBpZiAobm9kZS5ub2RlTmFtZSA9PT0gJyNkb2N1bWVudCcpIHJldHVybiB0aGlzLmdldFNjcmVlbkNUTSgpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5vZGUuZ2VuZXJhdGVWaWV3Qm94TWF0cml4KCkubXVsdGlwbHkobSlcclxuICB9XHJcblxyXG4gIGdldElubmVyTWF0cml4ICgpIHtcclxuICAgIHZhciBtID0gdGhpcy5tYXRyaXhpZnkoKVxyXG5cclxuICAgIGlmIChbICdzdmcnLCAnc3ltYm9sJywgJ2ltYWdlJywgJ3BhdHRlcm4nLCAnbWFya2VyJyBdLmluZGV4T2YodGhpcy5ub2RlTmFtZSkgPiAtMSkge1xyXG4gICAgICBtID0gdGhpcy5nZW5lcmF0ZVZpZXdCb3hNYXRyaXgoKS5tdWx0aXBseShtKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1cclxuICB9XHJcblxyXG4gIGdldFNjcmVlbkNUTSAoKSB7XHJcbiAgICAvLyByZWY6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEzNDQ1MzdcclxuICAgIC8vIFdlIGZvbGxvdyBDaHJvbWVzIGJlaGF2aW9yIGFuZCBpbmNsdWRlIHRoZSB2aWV3Ym94IGluIHRoZSBzY3JlZW5DVE1cclxuICAgIHZhciBtID0gdGhpcy5nZXRJbm5lck1hdHJpeCgpXHJcblxyXG4gICAgLy8gVE9ETzogV2UgaGF2ZSB0byBsb29wIHVudGlsIGRvY3VtZW50LCBob3dldmVyIGh0bWwgZWxlbWVudHMgZG9udCBoYXZlIGdldFNjcmVlbkNUTSBpbXBsZW1lbnRlZFxyXG4gICAgLy8gdGhleSBhbHNvIGRvbnQgaGF2ZSBhIHRyYW5zZm9ybSBhdHRyaWJ1dGUuIFRoZXJlZm9yZSB3ZSBuZWVkIGEgZGlmZmVyZW50IHdheSBvZiBmaWd1cmluZyBvdXQgdGhlaXIgKGNzcykgdHJhbnNmb3JtXHJcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlICYmIHRoaXMucGFyZW50Tm9kZSBpbnN0YW5jZW9mIFNWR0dyYXBoaWNzRWxlbWVudCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmdldFNjcmVlbkNUTSgpLm11bHRpcGx5KG0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1cclxuICB9XHJcblxyXG4gIG1hdHJpeGlmeSAoKSB7XHJcbiAgICB2YXIgbWF0cml4ID0gKHRoaXMuZ2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nKSB8fCAnJykudHJpbSgpXHJcbiAgICAgIC8vIHNwbGl0IHRyYW5zZm9ybWF0aW9uc1xyXG4gICAgICAuc3BsaXQocmVnZXgudHJhbnNmb3Jtcykuc2xpY2UoMCwgLTEpLm1hcChmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUga2V5ID0+IHZhbHVlIHBhaXJzXHJcbiAgICAgICAgdmFyIGt2ID0gc3RyLnRyaW0oKS5zcGxpdCgnKCcpXHJcbiAgICAgICAgcmV0dXJuIFsga3ZbMF0udHJpbSgpLCBrdlsxXS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLm1hcChmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBwYXJzZUZsb2F0KHN0ci50cmltKCkpIH0pIF1cclxuICAgICAgfSlcclxuICAgICAgLy8gbWVyZ2UgZXZlcnkgdHJhbnNmb3JtYXRpb24gaW50byBvbmUgbWF0cml4XHJcbiAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKG1hdHJpeCwgdHJhbnNmb3JtKSB7XHJcblxyXG4gICAgICAgIGlmICh0cmFuc2Zvcm1bMF0gPT09ICdtYXRyaXgnKSByZXR1cm4gbWF0cml4Lm11bHRpcGx5KGFycmF5VG9NYXRyaXgodHJhbnNmb3JtWzFdKSlcclxuICAgICAgICByZXR1cm4gbWF0cml4W3RyYW5zZm9ybVswXV0uYXBwbHkobWF0cml4LCB0cmFuc2Zvcm1bMV0pXHJcblxyXG4gICAgICB9LCBuZXcgU1ZHTWF0cml4KCkpXHJcblxyXG4gICAgcmV0dXJuIG1hdHJpeFxyXG4gIH1cclxuXHJcbiAgZ2V0IHRyYW5zZm9ybSAoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpXHJcbiAgfVxyXG5cclxufVxyXG4iLCJjb25zdCByYWRpYW5zID0gZnVuY3Rpb24gKGQpIHtcclxuICByZXR1cm4gZCAlIDM2MCAqIE1hdGguUEkgLyAxODBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdHJpeEZhY3RvcnkgKGEsIGIsIGMsIGQsIGUsIGYpIHtcclxuICB2YXIgciA9IG5ldyBTVkdNYXRyaXgoKVxyXG4gIHIuYSA9IGFcclxuICByLmIgPSBiXHJcbiAgci5jID0gY1xyXG4gIHIuZCA9IGRcclxuICByLmUgPSBlXHJcbiAgci5mID0gZlxyXG4gIHJldHVybiByXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTVkdNYXRyaXgge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHRoaXMuYSA9IHRoaXMuZCA9IDFcclxuICAgIHRoaXMuYiA9IHRoaXMuYyA9IHRoaXMuZSA9IHRoaXMuZiA9IDBcclxuICB9XHJcblxyXG4gIGludmVyc2UgKCkge1xyXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHBhcmFtZXRlcnMgb3V0IG9mIHRoZSBtYXRyaXhcclxuICAgIHZhciBhID0gdGhpcy5hXHJcbiAgICB2YXIgYiA9IHRoaXMuYlxyXG4gICAgdmFyIGMgPSB0aGlzLmNcclxuICAgIHZhciBkID0gdGhpcy5kXHJcbiAgICB2YXIgZSA9IHRoaXMuZVxyXG4gICAgdmFyIGYgPSB0aGlzLmZcclxuXHJcbiAgICAvLyBJbnZlcnQgdGhlIDJ4MiBtYXRyaXggaW4gdGhlIHRvcCBsZWZ0XHJcbiAgICB2YXIgZGV0ID0gYSAqIGQgLSBiICogY1xyXG4gICAgaWYgKCFkZXQpIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGludmVydCAnICsgdGhpcylcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIHRvcCAyeDIgbWF0cml4XHJcbiAgICB2YXIgbmEgPSBkIC8gZGV0XHJcbiAgICB2YXIgbmIgPSAtYiAvIGRldFxyXG4gICAgdmFyIG5jID0gLWMgLyBkZXRcclxuICAgIHZhciBuZCA9IGEgLyBkZXRcclxuXHJcbiAgICAvLyBBcHBseSB0aGUgaW52ZXJ0ZWQgbWF0cml4IHRvIHRoZSB0b3AgcmlnaHRcclxuICAgIHZhciBuZSA9IC0obmEgKiBlICsgbmMgKiBmKVxyXG4gICAgdmFyIG5mID0gLShuYiAqIGUgKyBuZCAqIGYpXHJcblxyXG4gICAgLy8gQ29uc3RydWN0IHRoZSBpbnZlcnRlZCBtYXRyaXhcclxuICAgIHRoaXMuYSA9IG5hXHJcbiAgICB0aGlzLmIgPSBuYlxyXG4gICAgdGhpcy5jID0gbmNcclxuICAgIHRoaXMuZCA9IG5kXHJcbiAgICB0aGlzLmUgPSBuZVxyXG4gICAgdGhpcy5mID0gbmZcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cblxuICBtdWx0aXBseSAobSkge1xyXG4gICAgdmFyIHIgPSBuZXcgU1ZHTWF0cml4KClcclxuICAgIHIuYSA9IHRoaXMuYSAqIG0uYSArIHRoaXMuYyAqIG0uYiArIHRoaXMuZSAqIDBcclxuICAgIHIuYiA9IHRoaXMuYiAqIG0uYSArIHRoaXMuZCAqIG0uYiArIHRoaXMuZiAqIDBcclxuICAgIHIuYyA9IHRoaXMuYSAqIG0uYyArIHRoaXMuYyAqIG0uZCArIHRoaXMuZSAqIDBcclxuICAgIHIuZCA9IHRoaXMuYiAqIG0uYyArIHRoaXMuZCAqIG0uZCArIHRoaXMuZiAqIDBcclxuICAgIHIuZSA9IHRoaXMuYSAqIG0uZSArIHRoaXMuYyAqIG0uZiArIHRoaXMuZSAqIDFcclxuICAgIHIuZiA9IHRoaXMuYiAqIG0uZSArIHRoaXMuZCAqIG0uZiArIHRoaXMuZiAqIDFcclxuICAgIHJldHVybiByXHJcbiAgfVxyXG5cclxuICByb3RhdGUgKHIsIHgsIHkpIHtcclxuICAgIHIgPSByICUgMzYwICogTWF0aC5QSSAvIDE4MFxyXG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkobWF0cml4RmFjdG9yeShcclxuICAgICAgTWF0aC5jb3MociksXHJcbiAgICAgIE1hdGguc2luKHIpLFxyXG4gICAgICAtTWF0aC5zaW4ociksXHJcbiAgICAgIE1hdGguY29zKHIpLFxyXG4gICAgICB4ID8gLU1hdGguY29zKHIpICogeCArIE1hdGguc2luKHIpICogeSArIHggOiAwLFxyXG4gICAgICB5ID8gLU1hdGguc2luKHIpICogeCAtIE1hdGguY29zKHIpICogeSArIHkgOiAwXHJcbiAgICApKVxyXG4gIH1cblxuICBzY2FsZSAoc2NhbGVYLCBzY2FsZVkgPSBzY2FsZVgpIHtcclxuICAgIHJldHVybiB0aGlzLm11bHRpcGx5KG1hdHJpeEZhY3Rvcnkoc2NhbGVYLCAwLCAwLCBzY2FsZVksIDAsIDApKVxyXG4gIH1cblxuICBza2V3ICh4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseShtYXRyaXhGYWN0b3J5KDEsIE1hdGgudGFuKHJhZGlhbnMoeSkpLCBNYXRoLnRhbihyYWRpYW5zKHgpKSwgMSwgMCwgMCkpXHJcbiAgfVxuXG4gIHNrZXdYICh4KSB7XHJcbiAgICByZXR1cm4gdGhpcy5za2V3KHgsIDApXHJcbiAgfVxuXG4gIHNrZXdZICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5za2V3KDAsIHkpXHJcbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcclxuICAgIHJldHVybiAnU1ZHTWF0cml4J1xyXG4gIH1cblxuICB0cmFuc2xhdGUgKHggPSAwLCB5ID0gMCkge1xyXG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkobWF0cml4RmFjdG9yeSgxLCAwLCAwLCAxLCB4LCB5KSlcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNWR0dyYXBoaWNzRWxlbWVudCB9IGZyb20gJy4vU1ZHR3JhcGhpY3NFbGVtZW50LmpzJ1xyXG5pbXBvcnQgKiBhcyBwYXRoVXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvcGF0aFV0aWxzLmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFNWR1BhdGhFbGVtZW50IGV4dGVuZHMgU1ZHR3JhcGhpY3NFbGVtZW50IHtcclxuICBnZXRQb2ludEF0TGVuZ3RoIChsZW4pIHtcclxuICAgIHJldHVybiBwYXRoVXRpbHMucG9pbnRBdExlbmd0aCh0aGlzLmdldEF0dHJpYnV0ZSgnZCcpLCBsZW4pXHJcbiAgfVxyXG5cclxuICBnZXRUb3RhbExlbmd0aCAoKSB7XHJcbiAgICByZXR1cm4gcGF0aFV0aWxzLmxlbmd0aCh0aGlzLmdldEF0dHJpYnV0ZSgnZCcpKVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgU1ZHUG9pbnQge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHRoaXMueCA9IDBcclxuICAgIHRoaXMueSA9IDBcclxuICB9XHJcblxyXG4gIG1hdHJpeFRyYW5zZm9ybSAobSkge1xyXG4gICAgdmFyIHIgPSBuZXcgU1ZHUG9pbnQoKVxyXG4gICAgci54ID0gbS5hICogdGhpcy54ICsgbS5jICogdGhpcy55ICsgbS5lICogMVxyXG4gICAgci55ID0gbS5iICogdGhpcy54ICsgbS5kICogdGhpcy55ICsgbS5mICogMVxyXG4gICAgcmV0dXJuIHJcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9TVkdHcmFwaGljc0VsZW1lbnQuanMnXHJcbmltcG9ydCB7IEJveCB9IGZyb20gJy4uLy4uL290aGVyL0JveC5qcydcclxuaW1wb3J0IHsgU1ZHTWF0cml4IH0gZnJvbSAnLi9TVkdNYXRyaXguanMnXHJcbmltcG9ydCB7IFNWR1BvaW50IH0gZnJvbSAnLi9TVkdQb2ludC5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBTVkdTVkdFbGVtZW50IGV4dGVuZHMgU1ZHR3JhcGhpY3NFbGVtZW50IHtcclxuICBjcmVhdGVTVkdNYXRyaXggKCkge1xyXG4gICAgcmV0dXJuIG5ldyBTVkdNYXRyaXgoKVxyXG4gIH1cblxuICBjcmVhdGVTVkdQb2ludCAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFNWR1BvaW50KClcclxuICB9XG5cbiAgY3JlYXRlU1ZHUmVjdCAoKSB7XHJcbiAgICByZXR1cm4gbmV3IEJveCgpXHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBTVkdUZXh0Q29udGVudEVsZW1lbnQgZXh0ZW5kcyBTVkdHcmFwaGljc0VsZW1lbnQge1xyXG4gIGdldENvbXB1dGVkVGV4dExlbmd0aCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRCQm94KCkud2lkdGhcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgV2luZG93IH0gZnJvbSAnLi9kb20vV2luZG93LmpzJ1xyXG5pbXBvcnQgeyBET01JbXBsZW1lbnRhdGlvbiB9IGZyb20gJy4vZG9tL0RvY3VtZW50LmpzJ1xyXG5pbXBvcnQgKiBhcyBuYW1lc3BhY2VzIGZyb20gJy4vdXRpbHMvbmFtZXNwYWNlcy5qcydcclxuXHJcbmNvbnN0IHsgY3JlYXRlRG9jdW1lbnQsIGNyZWF0ZUhUTUxEb2N1bWVudCB9ID0gRE9NSW1wbGVtZW50YXRpb25cclxuXHJcbmNvbnN0IGNyZWF0ZVdpbmRvdyA9ICguLi5hcmdzKSA9PiB7XHJcbiAgY29uc3Qgd2luZG93ID0gbmV3IFdpbmRvdygpXHJcbiAgY29uc3QgZG9jdW1lbnQgPSBjcmVhdGVEb2N1bWVudCguLi5hcmdzKVxyXG4gIHdpbmRvdy5kb2N1bWVudCA9IGRvY3VtZW50XHJcbiAgZG9jdW1lbnQuZGVmYXVsdFZpZXcgPSB3aW5kb3dcclxuICByZXR1cm4gd2luZG93XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZUhUTUxXaW5kb3cgPSAodGl0bGUpID0+IHtcclxuICBjb25zdCB3aW5kb3cgPSBuZXcgV2luZG93KClcclxuICBjb25zdCBkb2N1bWVudCA9IERPTUltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCh0aXRsZSlcclxuICB3aW5kb3cuZG9jdW1lbnQgPSBkb2N1bWVudFxyXG4gIGRvY3VtZW50LmRlZmF1bHRWaWV3ID0gd2luZG93XHJcbiAgcmV0dXJuIHdpbmRvd1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVTVkdXaW5kb3cgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIGNyZWF0ZVdpbmRvdyhuYW1lc3BhY2VzLnN2ZywgJ3N2ZycpXHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZVNWR0RvY3VtZW50ID0gKCkgPT4ge1xyXG4gIHJldHVybiBjcmVhdGVEb2N1bWVudChuYW1lc3BhY2VzLnN2ZywgJ3N2ZycpXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgY3JlYXRlRG9jdW1lbnQsXHJcbiAgY3JlYXRlSFRNTERvY3VtZW50LFxyXG4gIGNyZWF0ZVNWR0RvY3VtZW50LFxyXG4gIGNyZWF0ZVdpbmRvdyxcclxuICBjcmVhdGVIVE1MV2luZG93LFxyXG4gIGNyZWF0ZVNWR1dpbmRvd1xyXG59XHJcbiIsImltcG9ydCAqIGFzIHJlZ2V4IGZyb20gJy4uL3V0aWxzL3JlZ2V4LmpzJ1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4vUG9pbnQuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgQm94IHtcclxuICBjb25zdHJ1Y3RvciAoc291cmNlKSB7XHJcbiAgICB2YXIgYmFzZSA9IFsgMCwgMCwgMCwgMCBdXHJcbiAgICBzb3VyY2UgPSB0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJyA/IHNvdXJjZS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLm1hcChwYXJzZUZsb2F0KVxyXG4gICAgICA6IEFycmF5LmlzQXJyYXkoc291cmNlKSA/IHNvdXJjZVxyXG4gICAgICA6IHR5cGVvZiBzb3VyY2UgPT09ICdvYmplY3QnID8gW1xyXG4gICAgICAgIHNvdXJjZS5sZWZ0ICE9IG51bGwgPyBzb3VyY2UubGVmdCA6IHNvdXJjZS54LFxyXG4gICAgICAgIHNvdXJjZS50b3AgIT0gbnVsbCA/IHNvdXJjZS50b3AgOiBzb3VyY2UueSxcclxuICAgICAgICBzb3VyY2Uud2lkdGgsXHJcbiAgICAgICAgc291cmNlLmhlaWdodFxyXG4gICAgICBdXHJcbiAgICAgIDogYXJndW1lbnRzLmxlbmd0aCA9PT0gNCA/IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxyXG4gICAgICA6IGJhc2VcclxuXHJcbiAgICB0aGlzLnggPSB0aGlzLmxlZnQgPSBzb3VyY2VbMF1cclxuICAgIHRoaXMueSA9IHRoaXMudG9wID0gc291cmNlWzFdXHJcbiAgICB0aGlzLndpZHRoID0gc291cmNlWzJdXHJcbiAgICB0aGlzLmhlaWdodCA9IHNvdXJjZVszXVxyXG4gICAgdGhpcy5yaWdodCA9IHRoaXMubGVmdCArIHRoaXMud2lkdGhcclxuICAgIHRoaXMuYm90dG9tID0gdGhpcy50b3AgKyB0aGlzLmhlaWdodFxyXG4gIH1cclxuXHJcbiAgLy8gTWVyZ2UgcmVjdCBib3ggd2l0aCBhbm90aGVyLCByZXR1cm4gYSBuZXcgaW5zdGFuY2VcclxuICBtZXJnZSAoYm94KSB7XHJcbiAgICBpZiAoYm94IGluc3RhbmNlb2YgTm9Cb3gpIHJldHVybiBuZXcgQm94KHRoaXMpXHJcblxyXG4gICAgdmFyIHggPSBNYXRoLm1pbih0aGlzLngsIGJveC54KVxyXG4gICAgdmFyIHkgPSBNYXRoLm1pbih0aGlzLnksIGJveC55KVxyXG5cclxuICAgIHJldHVybiBuZXcgQm94KFxyXG4gICAgICB4LCB5LFxyXG4gICAgICBNYXRoLm1heCh0aGlzLnggKyB0aGlzLndpZHRoLCBib3gueCArIGJveC53aWR0aCkgLSB4LFxyXG4gICAgICBNYXRoLm1heCh0aGlzLnkgKyB0aGlzLmhlaWdodCwgYm94LnkgKyBib3guaGVpZ2h0KSAtIHlcclxuICAgIClcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSAobSkge1xyXG4gICAgdmFyIHhNaW4gPSBJbmZpbml0eVxyXG4gICAgdmFyIHhNYXggPSAtSW5maW5pdHlcclxuICAgIHZhciB5TWluID0gSW5maW5pdHlcclxuICAgIHZhciB5TWF4ID0gLUluZmluaXR5XHJcblxyXG4gICAgdmFyIHB0cyA9IFtcclxuICAgICAgbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KSxcclxuICAgICAgbmV3IFBvaW50KHRoaXMueCArIHRoaXMud2lkdGgsIHRoaXMueSksXHJcbiAgICAgIG5ldyBQb2ludCh0aGlzLngsIHRoaXMueSArIHRoaXMuaGVpZ2h0KSxcclxuICAgICAgbmV3IFBvaW50KHRoaXMueCArIHRoaXMud2lkdGgsIHRoaXMueSArIHRoaXMuaGVpZ2h0KVxyXG4gICAgXVxyXG5cclxuICAgIHB0cy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgIHAgPSBwLnRyYW5zZm9ybShtKVxyXG4gICAgICB4TWluID0gTWF0aC5taW4oeE1pbiwgcC54KVxyXG4gICAgICB4TWF4ID0gTWF0aC5tYXgoeE1heCwgcC54KVxyXG4gICAgICB5TWluID0gTWF0aC5taW4oeU1pbiwgcC55KVxyXG4gICAgICB5TWF4ID0gTWF0aC5tYXgoeU1heCwgcC55KVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gbmV3IEJveChcclxuICAgICAgeE1pbiwgeU1pbixcclxuICAgICAgeE1heCAtIHhNaW4sXHJcbiAgICAgIHlNYXggLSB5TWluXHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTm9Cb3ggZXh0ZW5kcyBCb3gge1xyXG4gIC8vIE5vQm94IGhhcyBubyB2YWxpZCB2YWx1ZXMgc28gaXQgY2FudCBiZSBtZXJnZWRcclxuICBtZXJnZSAoYm94KSB7XHJcbiAgICByZXR1cm4gYm94IGluc3RhbmNlb2YgTm9Cb3ggPyBuZXcgTm9Cb3goKSA6IG5ldyBCb3goYm94KVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtIChtKSB7XHJcbiAgICByZXR1cm4gbmV3IE5vQm94KClcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgcmVtb3ZlUXVvdGVzLCBzcGxpdE5vdEluQnJhY2tldHMgfSBmcm9tICcuLi91dGlscy9zdHJVdGlscy5qcydcclxuaW1wb3J0ICogYXMgcmVnZXggZnJvbSAnLi4vdXRpbHMvcmVnZXguanMnXHJcbmltcG9ydCB7IGh0bWwgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIENzc1F1ZXJ5IHtcclxuICBjb25zdHJ1Y3RvciAocXVlcnkpIHtcclxuICAgIGlmIChDc3NRdWVyeS5jYWNoZS5oYXMocXVlcnkpKSB7XHJcbiAgICAgIHRoaXMucXVlcmllcyA9IENzc1F1ZXJ5LmNhY2hlLmdldChxdWVyeSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHF1ZXJpZXMgPSBzcGxpdE5vdEluQnJhY2tldHMocXVlcnksICcsJylcclxuXHJcbiAgICBxdWVyaWVzID0gcXVlcmllcy5tYXAocXVlcnkgPT4ge1xyXG5cclxuICAgICAgdmFyIHJvdW5kQnJhY2tldHMgPSAwXHJcbiAgICAgIHZhciBzcXVhcmVCcmFja2V0cyA9IDBcclxuXHJcbiAgICAgIC8vIHRoaXMgaXMgdGhlIHNhbWUgYXMgYWJvdmUgYnV0IGVhc2llclxyXG4gICAgICBxdWVyeSA9IHF1ZXJ5LnJlcGxhY2UoL1soKVtcXF0+fitdL2csIGZ1bmN0aW9uIChjaCkge1xyXG4gICAgICAgIGlmIChjaCA9PT0gJygnKSArK3JvdW5kQnJhY2tldHNcclxuICAgICAgICBlbHNlIGlmIChjaCA9PT0gJyknKSAtLXJvdW5kQnJhY2tldHNcclxuICAgICAgICBlbHNlIGlmIChjaCA9PT0gJ1snKSArK3NxdWFyZUJyYWNrZXRzXHJcbiAgICAgICAgZWxzZSBpZiAoY2ggPT09ICddJykgLS1zcXVhcmVCcmFja2V0c1xyXG5cclxuICAgICAgICBpZiAoJygpW10nLmluZGV4T2YoY2gpID4gLTEpIHJldHVybiBjaFxyXG4gICAgICAgIGlmIChzcXVhcmVCcmFja2V0cyB8fCByb3VuZEJyYWNrZXRzKSByZXR1cm4gY2hcclxuXHJcbiAgICAgICAgcmV0dXJuICcgJyArIGNoICsgJyAnXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAvLyBzcGxpdCBhdCBzcGFjZSBhbmQgcmVtb3ZlIGVtcHR5IHJlc3VsdHNcclxuICAgICAgcXVlcnkgPSBzcGxpdE5vdEluQnJhY2tldHMocXVlcnksICcgJykuZmlsdGVyKGVsID0+ICEhZWwubGVuZ3RoKVxyXG5cclxuICAgICAgdmFyIHBhaXJzID0gW11cclxuXHJcbiAgICAgIHZhciByZWxhdGlvbiA9ICclJ1xyXG5cclxuICAgICAgLy8gZ2VuZXJhdGUgcXVlcnlub2RlIHJlbGF0aW9uIHR1cGxlc1xyXG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBxdWVyeS5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XHJcblxyXG4gICAgICAgIGlmICgnPn4rJScuaW5kZXhPZihxdWVyeVtpXSkgPiAtMSkge1xyXG4gICAgICAgICAgcmVsYXRpb24gPSBxdWVyeVtpXVxyXG4gICAgICAgICAgY29udGludWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhaXJzLnB1c2goWyByZWxhdGlvbiwgcXVlcnlbaV0gXSlcclxuICAgICAgICByZWxhdGlvbiA9ICclJ1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHBhaXJzXHJcblxyXG4gICAgfSlcclxuXHJcbiAgICB0aGlzLnF1ZXJpZXMgPSBxdWVyaWVzXHJcblxyXG4gICAgLy8gdG8gcHJldmVudCBtZW1vcnkgbGVha3Mgd2UgaGF2ZSB0byBtYW5hZ2Ugb3VyIGNhY2hlLlxyXG4gICAgLy8gd2UgZGVsZXRlIGV2ZXJ5dGhpbmcgd2hpY2ggaXMgb2xkZXIgdGhhbiA1MCBlbnRyaWVzXHJcbiAgICBpZiAoQ3NzUXVlcnkuY2FjaGVLZXlzLmxlbmd0aCA+IDUwKSB7XHJcbiAgICAgIENzc1F1ZXJ5LmNhY2hlLmRlbGV0ZShDc3NRdWVyeS5jYWNoZUtleXMuc2hpZnQoKSlcclxuICAgIH1cclxuICAgIENzc1F1ZXJ5LmNhY2hlLnNldChxdWVyeSwgcXVlcmllcylcclxuICAgIENzc1F1ZXJ5LmNhY2hlS2V5cy5wdXNoKHF1ZXJ5KVxyXG5cclxuICB9XHJcblxyXG4gIG1hdGNoZXMgKG5vZGUsIHNjb3BlKSB7XHJcbiAgICBmb3IgKHZhciBpID0gdGhpcy5xdWVyaWVzLmxlbmd0aDsgaS0tOykge1xyXG4gICAgICBpZiAodGhpcy5tYXRjaEhlbHBlcih0aGlzLnF1ZXJpZXNbaV0sIG5vZGUsIHNjb3BlKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxuXHJcbiAgbWF0Y2hIZWxwZXIgKHF1ZXJ5LCBub2RlLCBzY29wZSkge1xyXG4gICAgcXVlcnkgPSBxdWVyeS5zbGljZSgpXHJcbiAgICB2YXIgbGFzdCA9IHF1ZXJ5LnBvcCgpXHJcblxyXG4gICAgaWYgKCFuZXcgQ3NzUXVlcnlOb2RlKGxhc3RbMV0pLm1hdGNoZXMobm9kZSwgc2NvcGUpKSB7IHJldHVybiBmYWxzZSB9XHJcblxyXG4gICAgaWYgKCFxdWVyeS5sZW5ndGgpIHJldHVybiB0cnVlXHJcblxyXG4gICAgaWYgKGxhc3RbMF0gPT09ICcsJykgcmV0dXJuIHRydWVcclxuXHJcbiAgICBpZiAobGFzdFswXSA9PT0gJysnKSB7XHJcbiAgICAgIHJldHVybiAhIW5vZGUucHJldmlvdXNTaWJsaW5nICYmIHRoaXMubWF0Y2hIZWxwZXIocXVlcnksIG5vZGUucHJldmlvdXNTaWJsaW5nLCBzY29wZSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGFzdFswXSA9PT0gJz4nKSB7XHJcbiAgICAgIHJldHVybiAhIW5vZGUucGFyZW50Tm9kZSAmJiB0aGlzLm1hdGNoSGVscGVyKHF1ZXJ5LCBub2RlLnBhcmVudE5vZGUsIHNjb3BlKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXN0WzBdID09PSAnficpIHtcclxuICAgICAgd2hpbGUgKChub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmcpKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWF0Y2hIZWxwZXIocXVlcnksIG5vZGUsIHNjb3BlKSkgeyByZXR1cm4gdHJ1ZSB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhc3RbMF0gPT09ICclJykge1xyXG4gICAgICB3aGlsZSAoKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWF0Y2hIZWxwZXIocXVlcnksIG5vZGUsIHNjb3BlKSkgeyByZXR1cm4gdHJ1ZSB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gIH1cclxufVxyXG5cclxuQ3NzUXVlcnkuY2FjaGUgPSBuZXcgTWFwKClcclxuQ3NzUXVlcnkuY2FjaGVLZXlzID0gW11cclxuXHJcbi8vIGNoZWNrIGlmIFtub2RlXSBpcyB0aGUgW250aF0gY2hpbGQgb2YgW2Fycl0gd2hlcmUgbnRoIGNhbiBhbHNvIGJlIGEgZm9ybXVsYVxyXG5jb25zdCBudGggPSAobm9kZSwgYXJyLCBudGgpID0+IHtcclxuXHJcbiAgaWYgKG50aCA9PT0gJ2V2ZW4nKSBudGggPSAnMm4nXHJcbiAgZWxzZSBpZiAobnRoID09PSAnb2RkJykgbnRoID0gJzJuKzEnXHJcblxyXG4gIC8vIGNoZWNrIGZvciBldmFsIGNoYXJzXHJcbiAgaWYgKC9bXlxcZFxcLW4rKi9dKy8udGVzdChudGgpKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgbnRoID0gbnRoLnJlcGxhY2UoJ24nLCAnKm4nKVxyXG5cclxuICAvLyBldmFsIG50aCB0byBnZXQgdGhlIGluZGV4XHJcbiAgZm9yICh2YXIgaSwgbiA9IDAsIG5sID0gYXJyLmxlbmd0aDsgbiA8IG5sOyArK24pIHtcclxuICAgIC8qIGVzbGludCBuby1ldmFsOiBvZmYgKi9cclxuICAgIGkgPSBldmFsKG50aClcclxuXHJcbiAgICBpZiAoaSA+IG5sKSBicmVha1xyXG4gICAgaWYgKGFycltpIC0gMV0gPT09IG5vZGUpIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsc2VcclxufVxyXG5cclxuY29uc3QgbG93ZXIgPSBhID0+IGEudG9Mb3dlckNhc2UoKVxyXG5cclxuLy8gY2hlY2tzIGlmIGEgYW5kIGIgYXJlIGVxdWFsLiBJcyBpbnNlbnNpdGl2ZSB3aGVuIGkgaXMgdHJ1ZVxyXG5jb25zdCBlcSA9IChhLCBiLCBpKSA9PiBpID8gbG93ZXIoYSkgPT09IGxvd2VyKGIpIDogYSA9PT0gYlxyXG5cclxuLy8gW2ldIChwcmVib3VuZCkgaXMgdHJ1ZSBpZiBpbnNlbnNpdGl2ZSBtYXRjaGluZyBpcyByZXF1aXJlZFxyXG4vLyBbYV0gKHByZWJvdW5kKSBpcyB0aGUgdmFsdWUgdGhlIGF0dHIgaXMgY29tcGFyZWQgdG9cclxuLy8gW2JdIChwYXNzZWQpICAgaXMgdGhlIHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGVcclxuY29uc3QgYXR0cmlidXRlTWF0Y2hlciA9IHtcclxuICAnPSc6IChpLCBhLCBiKSA9PiBlcShhLCBiLCBpKSxcclxuICAnfj0nOiAoaSwgYSwgYikgPT4gYi5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihlbCA9PiBlcShlbCwgYSwgaSkpLmxlbmd0aCA+IDAsXHJcbiAgJ3w9JzogKGksIGEsIGIpID0+IGVxKGIuc3BsaXQocmVnZXguZGVsaW1pdGVyKVswXSwgYSwgaSksXHJcbiAgJ149JzogKGksIGEsIGIpID0+IGkgPyBsb3dlcihiKS5zdGFydHNXaXRoKGxvd2VyKGEpKSA6IGIuc3RhcnRzV2l0aChhKSxcclxuICAnJD0nOiAoaSwgYSwgYikgPT4gaSA/IGxvd2VyKGIpLmVuZHNXaXRoKGxvd2VyKGEpKSA6IGIuZW5kc1dpdGgoYSksXHJcbiAgJyo9JzogKGksIGEsIGIpID0+IGkgPyBsb3dlcihiKS5pbmNsdWRlcyhsb3dlcihhKSkgOiBiLmluY2x1ZGVzKGEpLFxyXG4gICcqJzogKGksIGEsIGIpID0+IGIgIT0gbnVsbFxyXG59XHJcblxyXG5jb25zdCBnZXRBdHRyaWJ1dGVWYWx1ZSA9IChwcmVmaXgsIG5hbWUsIG5vZGUpID0+IHtcclxuICBpZiAoIXByZWZpeCB8fCBwcmVmaXggPT09ICcqJykge1xyXG4gICAgcmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlKG5hbWUpXHJcbiAgfVxyXG4gIHJldHVybiBub2RlLmdldEF0dHJpYnV0ZShwcmVmaXggKyAnOicgKyBuYW1lKVxyXG59XHJcblxyXG4vLyBbYV0gKHByZWJvdW5kKSBbYV1yZ3VtZW50IG9mIHRoZSBwc2V1ZG8gc2VsZWN0b3JcclxuLy8gW25dIChwYXNzZWQpICAgW25db2RlXHJcbi8vIFtzXSAocGFzc2VkKSAgIFtzXWNvcGUgLSB0aGUgZWxlbWVudCB0aGlzIHF1ZXJ5IGlzIHNjb3BlZCB0b1xyXG5jb25zdCBwc2V1ZG9NYXRjaGVyID0ge1xyXG4gICdmaXJzdC1jaGlsZCc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLmZpcnN0Q2hpbGQgPT09IG4sXHJcbiAgJ2xhc3QtY2hpbGQnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG4ucGFyZW50Tm9kZS5sYXN0Q2hpbGQgPT09IG4sXHJcbiAgJ250aC1jaGlsZCc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbnRoKG4sIG4ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLCBhKSxcclxuICAnbnRoLWxhc3QtY2hpbGQnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG50aChuLCBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5zbGljZSgpLnJldmVyc2UoKSwgYSksXHJcbiAgJ2ZpcnN0LW9mLXR5cGUnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG4ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmZpbHRlcihlbCA9PiBlbC5ub2RlTmFtZSA9PT0gbi5ub2RlTmFtZSlbMF0gPT09IG4sXHJcbiAgJ2xhc3Qtb2YtdHlwZSc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuZmlsdGVyKGVsID0+IGVsLm5vZGVOYW1lID09PSBuLm5vZGVOYW1lKS5wb3AoKSA9PT0gbixcclxuICAnbnRoLW9mLXR5cGUnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG50aChuLCBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5maWx0ZXIoZWwgPT4gZWwubm9kZU5hbWUgPT09IG4ubm9kZU5hbWUpLCBhKSxcclxuICAnbnRoLWxhc3Qtb2YtdHlwZSc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbnRoKG4sIG4ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmZpbHRlcihlbCA9PiBlbC5ub2RlTmFtZSA9PT0gbi5ub2RlTmFtZSkucmV2ZXJzZSgpLCBhKSxcclxuICAnb25seS1jaGlsZCc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMubGVuZ3RoID09PSAxLFxyXG4gICdvbmx5LW9mLXR5cGUnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG4ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmZpbHRlcihlbCA9PiBlbC5ub2RlTmFtZSA9PT0gbi5ub2RlTmFtZSkubGVuZ3RoID09PSAxLFxyXG4gIHJvb3Q6IChhLCBuKSA9PiBuLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ID09PSBuLFxyXG4gIG5vdDogKGEsIG4sIHMpID0+ICEobmV3IENzc1F1ZXJ5KGEpKS5tYXRjaGVzKG4sIHMpLFxyXG4gIG1hdGNoZXM6IChhLCBuLCBzKSA9PiAobmV3IENzc1F1ZXJ5KGEpKS5tYXRjaGVzKG4sIHMpLFxyXG4gIHNjb3BlOiAoYSwgbiwgcykgPT4gbiA9PT0gc1xyXG59XHJcblxyXG5jbGFzcyBDc3NRdWVyeU5vZGUge1xyXG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XHJcbiAgICB0aGlzLnRhZyA9ICcnXHJcbiAgICB0aGlzLmlkID0gJydcclxuICAgIHRoaXMuY2xhc3NMaXN0ID0gW11cclxuICAgIHRoaXMuYXR0cnMgPSBbXVxyXG4gICAgdGhpcy5wc2V1ZG8gPSBbXVxyXG5cclxuICAgIC8vIG1hdGNoIHRoZSB0YWcgbmFtZVxyXG4gICAgdmFyIG1hdGNoZXMgPSBub2RlLm1hdGNoKC9eW1xcdy1dK3xeXFwqLylcclxuICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgIHRoaXMudGFnID0gbWF0Y2hlc1swXVxyXG4gICAgICBub2RlID0gbm9kZS5zbGljZSh0aGlzLnRhZy5sZW5ndGgpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWF0Y2ggcHNldWRvIGNsYXNzZXNcclxuICAgIHdoaWxlICgobWF0Y2hlcyA9IC86KFtcXHctXSspKD86XFwoKC4rKVxcKSk/L2cuZXhlYyhub2RlKSkpIHtcclxuICAgICAgdGhpcy5wc2V1ZG8ucHVzaChwc2V1ZG9NYXRjaGVyW21hdGNoZXNbMV1dLmJpbmQodGhpcywgcmVtb3ZlUXVvdGVzKG1hdGNoZXNbMl0gfHwgJycpKSlcclxuICAgICAgbm9kZSA9IG5vZGUuc2xpY2UoMCwgbWF0Y2hlcy5pbmRleCkgKyBub2RlLnNsaWNlKG1hdGNoZXMuaW5kZXggKyBtYXRjaGVzWzBdLmxlbmd0aClcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYXRjaCB0aGUgaWRcclxuICAgIG1hdGNoZXMgPSBub2RlLm1hdGNoKC8jKFtcXHctXSspLylcclxuICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgIHRoaXMuaWQgPSBtYXRjaGVzWzFdXHJcbiAgICAgIG5vZGUgPSBub2RlLnNsaWNlKDAsIG1hdGNoZXMuaW5kZXgpICsgbm9kZS5zbGljZShtYXRjaGVzLmluZGV4ICsgbWF0Y2hlc1swXS5sZW5ndGgpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWF0Y2ggY2xhc3Nlc1xyXG4gICAgd2hpbGUgKChtYXRjaGVzID0gL1xcLihbXFx3LV0rKS9nLmV4ZWMobm9kZSkpKSB7XHJcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnB1c2gobWF0Y2hlc1sxXSlcclxuICAgICAgbm9kZSA9IG5vZGUuc2xpY2UoMCwgbWF0Y2hlcy5pbmRleCkgKyBub2RlLnNsaWNlKG1hdGNoZXMuaW5kZXggKyBtYXRjaGVzWzBdLmxlbmd0aClcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYXRjaCBhdHRyaWJ1dGVzXHJcbiAgICB3aGlsZSAoKG1hdGNoZXMgPSAvXFxbKFtcXHctKl0rXFx8KT8oW1xcdy1dKykoKFs9Xn4kfCpdKykoLis/KSggK1tpSV0pPyk/XFxdL2cuZXhlYyhub2RlKSkpIHtcclxuICAgICAgY29uc3QgcHJlZml4ID0gbWF0Y2hlc1sxXSA/IG1hdGNoZXNbMV0uc3BsaXQoJ3wnKVswXSA6IG51bGxcclxuICAgICAgdGhpcy5hdHRycy5wdXNoKHtcclxuICAgICAgICBuYW1lOiBtYXRjaGVzWzJdLFxyXG4gICAgICAgIGdldFZhbHVlOiBnZXRBdHRyaWJ1dGVWYWx1ZS5iaW5kKHRoaXMsIHByZWZpeCwgbWF0Y2hlc1syXSksXHJcbiAgICAgICAgbWF0Y2hlcjogYXR0cmlidXRlTWF0Y2hlclttYXRjaGVzWzRdIHx8ICcqJ10uYmluZChcclxuICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAhIW1hdGNoZXNbNl0sIC8vIGNhc2UgaW5zZW5zaXRpdmUgeWVzL25vXHJcbiAgICAgICAgICByZW1vdmVRdW90ZXMoKG1hdGNoZXNbNV0gfHwgJycpLnRyaW0oKSkgLy8gYXR0cmlidXRlIHZhbHVlXHJcbiAgICAgICAgKVxyXG4gICAgICB9KVxyXG4gICAgICBub2RlID0gbm9kZS5zbGljZSgwLCBtYXRjaGVzLmluZGV4KSArIG5vZGUuc2xpY2UobWF0Y2hlcy5pbmRleCArIG1hdGNoZXNbMF0ubGVuZ3RoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWF0Y2hlcyAobm9kZSwgc2NvcGUpIHtcclxuICAgIHZhciBpXHJcblxyXG4gICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIC8vIEFsd2F5cyB0aGlzIGV4dHJhIGNvZGUgZm9yIGh0bWwgLS4tXHJcbiAgICBpZiAobm9kZS5uYW1lc3BhY2VVUkkgPT09IGh0bWwpIHtcclxuICAgICAgdGhpcy50YWcgPSB0aGlzLnRhZy50b1VwcGVyQ2FzZSgpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudGFnICYmIHRoaXMudGFnICE9PSBub2RlLm5vZGVOYW1lICYmIHRoaXMudGFnICE9PSAnKicpIHsgcmV0dXJuIGZhbHNlIH1cclxuXHJcbiAgICBpZiAodGhpcy5pZCAmJiB0aGlzLmlkICE9PSBub2RlLmlkKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjbGFzc0xpc3QgPSAobm9kZS5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJycpLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikuZmlsdGVyKGVsID0+ICEhZWwubGVuZ3RoKVxyXG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmZpbHRlcihjbGFzc05hbWUgPT4gY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKSA8IDApLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGkgPSB0aGlzLmF0dHJzLmxlbmd0aDsgaS0tOykge1xyXG4gICAgICB2YXIgYXR0clZhbHVlID0gdGhpcy5hdHRyc1tpXS5nZXRWYWx1ZShub2RlKVxyXG4gICAgICBpZiAoYXR0clZhbHVlID09PSBudWxsIHx8ICF0aGlzLmF0dHJzW2ldLm1hdGNoZXIoYXR0clZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChpID0gdGhpcy5wc2V1ZG8ubGVuZ3RoOyBpLS07KSB7XHJcbiAgICAgIGlmICghdGhpcy5wc2V1ZG9baV0obm9kZSwgc2NvcGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU1ZHUG9pbnQgfSBmcm9tICcuLi9kb20vc3ZnL1NWR1BvaW50LmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50IHtcclxuICAvLyBJbml0aWFsaXplXHJcbiAgY29uc3RydWN0b3IgKHgsIHkpIHtcclxuICAgIHZhciBzb3VyY2VcclxuICAgIHZhciBiYXNlID0geyB4OiAwLCB5OiAwIH1cclxuXHJcbiAgICAvLyBlbnN1cmUgc291cmNlIGFzIG9iamVjdFxyXG4gICAgc291cmNlID0gQXJyYXkuaXNBcnJheSh4KSA/IHsgeDogeFswXSwgeTogeFsxXSB9XHJcbiAgICAgIDogdHlwZW9mIHggPT09ICdvYmplY3QnID8geyB4OiB4LngsIHk6IHgueSB9XHJcbiAgICAgIDogeCAhPSBudWxsID8geyB4OiB4LCB5OiAoeSAhPSBudWxsID8geSA6IHgpIH1cclxuICAgICAgOiBiYXNlIC8vIElmIHkgaGFzIG5vIHZhbHVlLCB0aGVuIHggaXMgdXNlZCBoYXMgaXRzIHZhbHVlXHJcblxyXG4gICAgLy8gbWVyZ2Ugc291cmNlXHJcbiAgICB0aGlzLnggPSBzb3VyY2UueFxyXG4gICAgdGhpcy55ID0gc291cmNlLnlcclxuICB9XHJcblxyXG4gIGFicyAoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuYWJzUXVhZCgpKVxyXG4gIH1cblxuICBhYnNRdWFkICgpIHtcclxuICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnlcclxuICB9XG5cbiAgYWRkICh4LCB5KSB7XHJcbiAgICB2YXIgcCA9IG5ldyBQb2ludCh4LCB5KVxyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKyBwLngsIHRoaXMueSArIHAueSlcclxuICB9XG5cbiAgYW5nbGVUbyAocCkge1xyXG4gICAgdmFyIHNpZ24gPSBNYXRoLnNpZ24odGhpcy54ICogcC55IC0gdGhpcy55ICogcC54KVxyXG4gICAgc2lnbiA9IHNpZ24gfHwgMVxyXG4gICAgcmV0dXJuIHNpZ24gKiBNYXRoLmFjb3MoTWF0aC5yb3VuZCgodGhpcy5kb3QocCkgLyAodGhpcy5hYnMoKSAqIHAuYWJzKCkpKSAqIDEwMDAwMDApIC8gMTAwMDAwMClcclxuICB9XG5cbiAgLy8gQ2xvbmUgcG9pbnRcclxuICBjbG9uZSAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMpXHJcbiAgfVxyXG5cclxuICBjbG9zZVRvIChwLCBldGEgPSAwLjAwMDAxKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lcXVhbHMocCkgfHwgKE1hdGguYWJzKHRoaXMueCAtIHAueCkgPCBldGEgJiYgTWF0aC5hYnModGhpcy55IC0gcC55KSA8IGV0YSlcclxuICB9XG5cbiAgZGl2IChmYWN0b3IpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54IC8gZmFjdG9yLCB0aGlzLnkgLyBmYWN0b3IpXHJcbiAgfVxuXG4gIGRvdCAocCkge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHAueCArIHRoaXMueSAqIHAueVxyXG4gIH1cblxuICBlcXVhbHMgKHApIHtcclxuICAgIHJldHVybiB0aGlzLnggPT09IHAueCAmJiB0aGlzLnkgPT09IHAueVxyXG4gIH1cblxuICBtdWwgKGZhY3Rvcikge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKiBmYWN0b3IsIHRoaXMueSAqIGZhY3RvcilcclxuICB9XG5cbiAgLy8gQ29udmVydCB0byBuYXRpdmUgU1ZHUG9pbnRcclxuICBuYXRpdmUgKCkge1xyXG4gICAgLy8gY3JlYXRlIG5ldyBwb2ludFxyXG4gICAgdmFyIHBvaW50ID0gbmV3IFNWR1BvaW50KClcclxuXHJcbiAgICAvLyB1cGRhdGUgd2l0aCBjdXJyZW50IHZhbHVlc1xyXG4gICAgcG9pbnQueCA9IHRoaXMueFxyXG4gICAgcG9pbnQueSA9IHRoaXMueVxyXG5cclxuICAgIHJldHVybiBwb2ludFxyXG4gIH1cclxuXHJcbiAgbm9ybWFsICgpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy55LCAtdGhpcy54KVxyXG4gIH1cblxuICBub3JtYWxpemUgKCkge1xyXG4gICAgdmFyIGFicyA9IHRoaXMuYWJzKClcclxuICAgIGlmICghYWJzKSB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3Qgbm9ybWFsaXplIHZlY3RvciBvZiB6ZXJvIGxlbmd0aCcpXHJcbiAgICByZXR1cm4gdGhpcy5kaXYoYWJzKVxyXG4gIH1cblxuICByZWZsZWN0QXQgKHApIHtcclxuICAgIHJldHVybiBwLmFkZChwLnN1Yih0aGlzKSlcclxuICB9XG5cbiAgc3ViICh4LCB5KSB7XHJcbiAgICB2YXIgcCA9IG5ldyBQb2ludCh4LCB5KVxyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggLSBwLngsIHRoaXMueSAtIHAueSlcclxuICB9XG5cbiAgdG9BcnJheSAoKSB7XHJcbiAgICByZXR1cm4gWyB0aGlzLngsIHRoaXMueSBdXHJcbiAgfVxuXG4gIHRvUGF0aCAoKSB7XHJcbiAgICByZXR1cm4gWyAnTScsIHRoaXMueCwgdGhpcy55IF0uam9pbignICcpXHJcbiAgfVxuXG4gIC8vIHRyYW5zZm9ybSBwb2ludCB3aXRoIG1hdHJpeFxyXG4gIHRyYW5zZm9ybSAobWF0cml4KSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMubmF0aXZlKCkubWF0cml4VHJhbnNmb3JtKG1hdHJpeCkpXHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBOb2RlRmlsdGVyIH0gZnJvbSAnLi4vZG9tL05vZGVGaWx0ZXIuanMnXHJcblxyXG5jb25zdCBzaG93VGhpc05vZGUgPSAod2hhdFRvU2hvdywgbm9kZSkgPT4ge1xyXG4gIGlmICh3aGF0VG9TaG93ID09PSBOb2RlRmlsdGVyLlNIT1dfQUxMKSByZXR1cm4gdHJ1ZVxyXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHJldHVybiB0cnVlXHJcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfVEVYVCAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLlRFWFRfTk9ERSkgcmV0dXJuIHRydWVcclxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19FTlRJVFlfUkVGRVJFTkNFICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRU5USVRZX1JFRkVSRU5DRV9OT0RFKSByZXR1cm4gdHJ1ZVxyXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX0VOVElUWSAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkVOVElUWV9OT0RFKSByZXR1cm4gdHJ1ZVxyXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX1BST0NFU1NJTkdfSU5TVFJVQ1RJT04gJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5QUk9DRVNTSU5HX0lOU1RSVUNUSU9OX05PREUpIHJldHVybiB0cnVlXHJcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkNPTU1FTlRfTk9ERSkgcmV0dXJuIHRydWVcclxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19ET0NVTUVOVCAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkRPQ1VNRU5UX05PREUpIHJldHVybiB0cnVlXHJcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfRE9DVU1FTlRfVFlQRSAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkRPQ1VNRU5UX1RZUEVfTk9ERSkgcmV0dXJuIHRydWVcclxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19ET0NVTUVOVF9GUkFHTUVOVCAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpIHJldHVybiB0cnVlXHJcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfTk9UQVRJT04gJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5OT1RBVElPTl9OT0RFKSByZXR1cm4gdHJ1ZVxyXG4gIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTm9kZUl0ZXJhdG9yIHtcclxuICBjb25zdHJ1Y3RvciAocm9vdCwgd2hhdFRvU2hvdyA9IE5vZGVGaWx0ZXIuU0hPV19BTEwsIGZpbHRlciA9ICgpID0+IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCwgaW5jbHVkZVBhcmVudCA9IHRydWUpIHtcclxuICAgIHRoaXMucm9vdCA9IGluY2x1ZGVQYXJlbnQgPyB7IGNoaWxkTm9kZXM6IFsgcm9vdCBdIH0gOiByb290XHJcbiAgICB0aGlzLndoYXRUb1Nob3cgPSB3aGF0VG9TaG93XHJcbiAgICB0aGlzLmZpbHRlciA9IGZpbHRlclxyXG4gIH1cclxuXHJcbiAgKiBbU3ltYm9sLml0ZXJhdG9yXSAoKSB7XHJcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucm9vdC5jaGlsZE5vZGVzXHJcblxyXG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgIGlmICghc2hvd1RoaXNOb2RlKHRoaXMud2hhdFRvU2hvdywgbm9kZSkpIGNvbnRpbnVlXHJcblxyXG4gICAgICBjb25zdCBmaWx0ZXJSZXQgPSB0aGlzLmZpbHRlcihub2RlKVxyXG5cclxuICAgICAgaWYgKGZpbHRlclJldCA9PT0gTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUKSBjb250aW51ZVxyXG4gICAgICBpZiAoZmlsdGVyUmV0ID09PSBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQpIHtcclxuICAgICAgICB5aWVsZCBub2RlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHlpZWxkICogbmV3IE5vZGVJdGVyYXRvcihub2RlLCB0aGlzLndoYXRUb1Nob3csIHRoaXMuZmlsdGVyLCBmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBCb3gsIE5vQm94IH0gZnJvbSAnLi4vb3RoZXIvQm94LmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50Q2xvdWQgZXh0ZW5kcyBBcnJheSB7XHJcbiAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJnc1swXSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgc3VwZXIoYXJncy5zaGlmdCgpKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3VwZXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGV4Y2VwdCBtdWx0aXBsZSBwb2ludCBhcnJheXMgYXMgaW5wdXQgYW5kIG1lcmdlIHRoZW0gaW50byBvbmVcclxuICAgIGFyZ3MucmVkdWNlKChsYXN0LCBjdXJyKSA9PiB7XHJcbiAgICAgIGxhc3QucHVzaCguLi5jdXJyKVxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfSwgdGhpcylcclxuICB9XHJcblxyXG4gIGJib3ggKCkge1xyXG4gICAgaWYgKCF0aGlzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gbmV3IE5vQm94KClcclxuICAgIH1cclxuXHJcbiAgICBsZXQgeE1pbiA9IEluZmluaXR5XHJcbiAgICBsZXQgeE1heCA9IC1JbmZpbml0eVxyXG4gICAgbGV0IHlNaW4gPSBJbmZpbml0eVxyXG4gICAgbGV0IHlNYXggPSAtSW5maW5pdHlcclxuXHJcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcclxuICAgICAgeE1pbiA9IE1hdGgubWluKHhNaW4sIHAueClcclxuICAgICAgeE1heCA9IE1hdGgubWF4KHhNYXgsIHAueClcclxuICAgICAgeU1pbiA9IE1hdGgubWluKHlNaW4sIHAueSlcclxuICAgICAgeU1heCA9IE1hdGgubWF4KHlNYXgsIHAueSlcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIG5ldyBCb3goXHJcbiAgICAgIHhNaW4sIHlNaW4sXHJcbiAgICAgIHhNYXggLSB4TWluLFxyXG4gICAgICB5TWF4IC0geU1pblxyXG4gICAgKVxyXG4gIH1cblxuICBtZXJnZSAoY2xvdWQpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnRDbG91ZCh0aGlzLCBjbG91ZClcclxuICB9XG5cbiAgdHJhbnNmb3JtIChtKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50Q2xvdWQodGhpcy5tYXAoKHApID0+IHAudHJhbnNmb3JtKG0pKSlcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIHBhdGhVdGlscyBmcm9tICcuL3BhdGhVdGlscy5qcydcclxuaW1wb3J0ICogYXMgcmVnZXggZnJvbSAnLi9yZWdleC5qcydcclxuaW1wb3J0ICogYXMgdGV4dFV0aWxzIGZyb20gJy4vdGV4dFV0aWxzLmpzJ1xyXG5pbXBvcnQgeyBOb0JveCB9IGZyb20gJy4uL290aGVyL0JveC5qcydcclxuaW1wb3J0IHsgUG9pbnRDbG91ZCB9IGZyb20gJy4vUG9pbnRDbG91ZC5qcydcclxuaW1wb3J0IHsgTm9kZUl0ZXJhdG9yIH0gZnJvbSAnLi9Ob2RlSXRlcmF0b3IuanMnXHJcbmltcG9ydCB7IE5vZGVGaWx0ZXIgfSBmcm9tICcuLi9kb20vTm9kZUZpbHRlci5qcydcclxuXHJcbmNvbnN0IGFwcGx5VHJhbnNmb3JtYXRpb24gPSAoY2xvdWQsIG5vZGUsIGFwcGx5VHJhbnNmb3JtYXRpb25zKSA9PiB7XHJcbiAgaWYgKG5vZGUubWF0cml4aWZ5ICYmIGFwcGx5VHJhbnNmb3JtYXRpb25zKSB7XHJcbiAgICByZXR1cm4gY2xvdWQudHJhbnNmb3JtKG5vZGUubWF0cml4aWZ5KCkpXHJcbiAgfVxyXG4gIHJldHVybiBjbG91ZFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0UG9pbnRDbG91ZCA9IChub2RlLCBhcHBseVRyYW5zZm9ybWF0aW9ucywgcmJveCA9IGZhbHNlKSA9PiB7XHJcbiAgY29uc3QgY2xvdWQgPSBnZXRQYXRoQ2xvdWQobm9kZSwgcmJveClcclxuICByZXR1cm4gYXBwbHlUcmFuc2Zvcm1hdGlvbihjbG91ZCwgbm9kZSwgYXBwbHlUcmFuc2Zvcm1hdGlvbnMpXHJcbn1cclxuXHJcbmNvbnN0IGdldFBhdGhDbG91ZCA9IChub2RlLCByYm94KSA9PiB7XHJcbiAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEpIHJldHVybiBuZXcgUG9pbnRDbG91ZCgpXHJcblxyXG4gIHN3aXRjaCAobm9kZS5ub2RlTmFtZSkge1xyXG4gIGNhc2UgJ3JlY3QnOlxyXG4gIGNhc2UgJ2ltYWdlJzpcclxuICBjYXNlICdwYXR0ZXJuJzpcclxuICBjYXNlICdtYXNrJzpcclxuICBjYXNlICdmb3JlaWduT2JqZWN0JzpcclxuICAgIC8vIENyZWF0ZSBQYXRoIGZyb20gcmVjdCBhbmQgY3JlYXRlIFBvaW50Q2xvdWQgZnJvbSBQYXRoXHJcbiAgICByZXR1cm4gcGF0aFV0aWxzLmdldENsb3VkKHBhdGhVdGlscy5wYXRoRnJvbS5yZWN0KG5vZGUpKVxyXG4gIGNhc2UgJ3N2Zyc6XHJcbiAgY2FzZSAnc3ltYm9sJzpcclxuICAgIC8vIHJldHVybiBwYXRoVXRpbHMuZ2V0Q2xvdWQocGF0aFV0aWxzLnBhdGhGcm9tLnJlY3Qobm9kZSkpXHJcbiAgICBpZiAocmJveCkge1xyXG4gICAgICByZXR1cm4gcGF0aFV0aWxzLmdldENsb3VkKHBhdGhVdGlscy5wYXRoRnJvbS5yZWN0KG5vZGUpKVxyXG4gICAgfVxyXG4gIC8vIEFUVEVOVElPTjogRkFMTCBUSFJPVUdIXHJcbiAgLy8gQmVjYXVzZSBub3JtYWwgYmJveCBpcyBjYWxjdWxhdGVkIGJ5IHRoZSBjb250ZW50IG9mIHRoZSBlbGVtZW50IGFuZCBub3QgaXRzIHdpZHRoIGFuZCBoZWlnaHRcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICBjYXNlICdnJzpcclxuICBjYXNlICdjbGlwUGF0aCc6XHJcbiAgY2FzZSAnYSc6XHJcbiAgY2FzZSAnbWFya2VyJzpcclxuICAgIC8vIEl0ZXJhdGUgdHJvdWdoIGFsbCBjaGlsZHJlbiBhbmQgZ2V0IHRoZSBwb2ludCBjbG91ZCBvZiBlYWNoXHJcbiAgICAvLyBUaGVuIHRyYW5zZm9ybSBpdCB3aXRoIHZpZXdib3ggbWF0cml4IGlmIG5lZWRlZFxyXG4gICAgcmV0dXJuIG5vZGUuY2hpbGROb2Rlcy5yZWR1Y2UoKGNsb3VkLCBjaGlsZCkgPT4ge1xyXG4gICAgICBpZiAoIWNoaWxkLm1hdHJpeGlmeSkgcmV0dXJuIGNsb3VkXHJcbiAgICAgIHJldHVybiBjbG91ZC5tZXJnZShnZXRQb2ludENsb3VkKGNoaWxkLCB0cnVlKS50cmFuc2Zvcm0oY2hpbGQuZ2VuZXJhdGVWaWV3Qm94TWF0cml4KCkpKVxyXG4gICAgfSwgbmV3IFBvaW50Q2xvdWQoKSlcclxuICBjYXNlICdjaXJjbGUnOlxyXG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRDbG91ZChwYXRoVXRpbHMucGF0aEZyb20uY2lyY2xlKG5vZGUpKVxyXG4gIGNhc2UgJ2VsbGlwc2UnOlxyXG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRDbG91ZChwYXRoVXRpbHMucGF0aEZyb20uZWxsaXBzZShub2RlKSlcclxuICBjYXNlICdsaW5lJzpcclxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0Q2xvdWQocGF0aFV0aWxzLnBhdGhGcm9tLmxpbmUobm9kZSkpXHJcbiAgY2FzZSAncG9seWxpbmUnOlxyXG4gIGNhc2UgJ3BvbHlnb24nOlxyXG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRDbG91ZChwYXRoVXRpbHMucGF0aEZyb20ucG9seWxpbmUobm9kZSkpXHJcbiAgY2FzZSAncGF0aCc6XHJcbiAgY2FzZSAnZ2x5cGgnOlxyXG4gIGNhc2UgJ21pc3NpbmctZ2x5cGgnOlxyXG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRDbG91ZChub2RlLmdldEF0dHJpYnV0ZSgnZCcpKVxyXG4gIGNhc2UgJ3VzZSc6IHtcclxuICAgIC8vIEdldCByZWZlcmVuY2UgZnJvbSBlbGVtZW50XHJcbiAgICBjb25zdCByZWYgPSBub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCd4bGluazpocmVmJylcclxuICAgIC8vIEdldCB0aGUgYWN0dWFsIHJlZmVyZW5jZWQgTm9kZVxyXG4gICAgY29uc3QgcmVmTm9kZSA9IG5vZGUuZ2V0Um9vdE5vZGUoKS5nZXRFbGVtZW50QnlJZChyZWYuc2xpY2UoMSkpXHJcbiAgICAvLyBHZXQgdGhlIEJCb3ggb2YgdGhlIHJlZmVyZW5jZWQgZWxlbWVudCBhbmQgYXBwbHkgdGhlIHZpZXdib3ggb2YgPHVzZT5cclxuICAgIC8vIFRPRE86IERvIHdlIG5lZWQgdG8gYXBwbHkgdGhlIHRyYW5zZm9ybWF0aW9ucyBvZiB0aGUgZWxlbWVudD9cclxuICAgIC8vIENoZWNrIGJib3ggb2YgdHJhbnNmb3JtZWQgZWxlbWVudCB3aGljaCBpcyByZXVzZWQgd2l0aCA8dXNlPlxyXG4gICAgcmV0dXJuIGdldFBvaW50Q2xvdWQocmVmTm9kZSkudHJhbnNmb3JtKG5vZGUuZ2VuZXJhdGVWaWV3Qm94TWF0cml4KCkpXHJcbiAgfVxyXG4gIGNhc2UgJ3RzcGFuJzpcclxuICBjYXNlICd0ZXh0JzpcclxuICBjYXNlICdhbHRHbHlwaCc6IHtcclxuICAgIGNvbnN0IGJveCA9IGdldFRleHRCQm94KG5vZGUpXHJcblxyXG4gICAgaWYgKGJveCBpbnN0YW5jZW9mIE5vQm94KSB7XHJcbiAgICAgIHJldHVybiBuZXcgUG9pbnRDbG91ZCgpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRDbG91ZChwYXRoVXRpbHMucGF0aEZyb20uYm94KGJveCkpXHJcbiAgfVxyXG4gIGRlZmF1bHQ6XHJcbiAgICByZXR1cm4gbmV3IFBvaW50Q2xvdWQoKVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZ2V0VGV4dEJCb3ggPSAobm9kZSkgPT4ge1xyXG4gIGNvbnN0IHRleHRSb290ID0gZmluZFRleHRSb290KG5vZGUpXHJcbiAgY29uc3QgYm94ZXMgPSBnZXRUZXh0QkJveGVzKG5vZGUsIHRleHRSb290KVxyXG4gIHJldHVybiBib3hlcy5maWx0ZXIoaXNOb3RFbXB0eUJveCkucmVkdWNlKChsYXN0LCBjdXJyKSA9PiBsYXN0Lm1lcmdlKGN1cnIpLCBuZXcgTm9Cb3goKSlcclxufVxyXG5cclxuY29uc3QgZmluZFRleHRSb290ID0gKG5vZGUpID0+IHtcclxuICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XHJcbiAgICBpZiAoKG5vZGUubm9kZU5hbWUgPT09ICd0ZXh0JyAmJiBub2RlLnBhcmVudE5vZGUubm9kZU5hbWUgPT09ICd0ZXh0JylcclxuICAgIHx8ICgobm9kZS5ub2RlTmFtZSA9PT0gJ3RzcGFuJyB8fCBub2RlLm5vZGVOYW1lID09PSAndGV4dFBhdGgnKSAmJiBbICd0c3BhbicsICd0ZXh0JywgJ3RleHRQYXRoJyBdLmluY2x1ZGVzKG5vZGUucGFyZW50Tm9kZS5ub2RlTmFtZSkpKSB7XHJcbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9kZVxyXG59XHJcblxyXG4vLyBUaGlzIGZ1bmN0aW9uIHRha2VzIGEgbm9kZSBvZiB3aGljaCB0aGUgYmJveCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkXHJcbi8vIEluIG9yZGVyIHRvIHBvc2l0aW9uIHRoZSBib3ggY29ycmVjdGx5LCB3ZSBuZWVkIHRvIGtub3cgd2VyZSB0aGUgcGFyZW50IGFuZCB3ZXJlIHRoZSBzaWJsaW5ncyAqYmVmb3JlKiBvdXIgbm9kZSBhcmVcclxuLy8gVGhhdHMgd2h5IGEgdGV4dFJvb3QgaXMgcGFzc2VkIHdoaWNoIGlzIHRoZSBtb3N0IG91dGVyIHRleHRFbGVtZW50IG5lZWRlZCB0byBjYWxjdWxhdGUgYWxsIGJveGVzXHJcbi8vIFdoZW4gdGhlIGl0ZXJhdG9yIGhpdHMgdGhlIGVsZW1lbnQgd2UgbmVlZCB0aGUgYmJveCBvZiwgaXQgaXMgdGVybWluYXRlZCBhbmQgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgYWdhaW5cclxuLy8gb25seSBmb3IgdGhlIHN1YnN0cmVlIG9mIG91ciBub2RlIGFuZCB3aXRob3V0IHRleHRSb29yIGJ1dCBpbnN0ZWFkIHBvcywgZHggYW5kIGR5IGFyZSBrbm93blxyXG5jb25zdCBnZXRUZXh0QkJveGVzID0gZnVuY3Rpb24gKHRhcmdldCwgdGV4dFJvb3QgPSB0YXJnZXQsIHBvcyA9IHsgeDogMCwgeTogMCB9LCBkeCA9IFsgMCBdLCBkeSA9IFsgMCBdLCBib3hlcyA9IFtdKSB7XHJcblxyXG4gIC8vIENyZWF0ZSBOb2RlSXRlcmF0b3IuIE9ubHkgc2hvdyBlbGVtbnRzIGFuZCB0ZXh0IGFuZCBza2lwIGRlc2NyaXB0aXZlIGVsZW1lbnRzXHJcbiAgLy8gVE9ETzogbWFrZSBhbiBpbnN0YW5jZW9mIGNoZWNrIGZvciBEZXNjcmlwdGl2ZUVsZW1lbnQgaW5zdGVhZCBvZiB0ZXN0aW5nIG9uZSBieSBvbmVcclxuICAvLyBPbmx5IHRpdGxlIGlzIHNraXBwZWQgYXRtXHJcbiAgY29uc3QgaXRlciA9IG5ldyBOb2RlSXRlcmF0b3IodGV4dFJvb3QsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIChub2RlKSA9PiB7XHJcbiAgICBpZiAobm9kZS5ub2RlTmFtZSA9PT0gJ3RpdGxlJykgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRVxyXG4gICAgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVFxyXG4gIH0pXHJcblxyXG4gIC8vIEl0ZXJhdGUgdHJvdWdoIGFsbCBub2RlcyB0b3AgdG8gYm90dG9tLCBsZWZ0IHRvIHJpZ2h0XHJcbiAgZm9yIChjb25zdCBub2RlIG9mIGl0ZXIpIHtcclxuXHJcbiAgICAvLyBJZiB3ZSBoaXQgb3VyIHRhcmdldCwgd2UgZ2F0aGVyZWQgYWxsIHBvc2l0aW9uYWwgaW5mb3JtYXRpb24gd2UgbmVlZCB0byBtb3ZlIHRoZSBiYm94IHRvIHRoZSBjb3JyZWN0IHNwb3RcclxuICAgIGlmIChub2RlID09PSB0YXJnZXQgJiYgbm9kZSAhPT0gdGV4dFJvb3QpIHtcclxuICAgICAgcmV0dXJuIGdldFRleHRCQm94ZXMobm9kZSwgbm9kZSwgcG9zLCBkeCwgZHkpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gVHJhdmVyc2UgdHJvdWdoIHRoaXMgbm9kZSB1cGRhdGluZyBwb3NpdGlvbnMgYW5kIGFkZCBib3hlc1xyXG4gICAgZ2V0UG9zaXRpb25EZXRhaWxzRm9yKG5vZGUsIHBvcywgZHgsIGR5LCBib3hlcylcclxuICB9XHJcblxyXG4gIHJldHVybiBib3hlc1xyXG59XHJcblxyXG5jb25zdCBpc05vdEVtcHR5Qm94ID0gYm94ID0+IGJveC54ICE9PSAwIHx8IGJveC55ICE9PSAwIHx8IGJveC53aWR0aCAhPT0gMCB8fCBib3guaGVpZ2h0ICE9PSAwXHJcblxyXG4vLyBUaGlzIGZ1bmN0aW9uIGVpdGhlciB1cGRhdGVzIHBvcywgZHggYW5kIGR5ICh3aGVuIGl0cyBhbiBlbGVtZW50KSBvciBjYWxjdWxhdGVzIHRoZSBib3hlcyBmb3IgdGV4dCB3aXRoIHRoZSBwYXNzZWQgYXJndW1lbnRzXHJcbi8vIEFsbCBhcmd1bWVudHMgYXJlIHBhc3NlZCBieSByZWZlcmVuY2Ugc28gZG9udCBvdmVyd3JpdGUgdGhlbSAodHJlYXQgdGhlbSBhcyBjb25zdCEpXHJcbi8vIFRPRE86IEJyZWFrIHRoaXMgaW50byB0d28gZnVuY3Rpb25zP1xyXG5jb25zdCBnZXRQb3NpdGlvbkRldGFpbHNGb3IgPSAobm9kZSwgcG9zLCBkeCwgZHksIGJveGVzKSA9PiB7XHJcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICB2YXIgeCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3gnKSlcclxuICAgIHZhciB5ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneScpKVxyXG5cclxuICAgIHBvcy54ID0gaXNOYU4oeCkgPyBwb3MueCA6IHhcclxuICAgIHBvcy55ID0gaXNOYU4oeSkgPyBwb3MueSA6IHlcclxuXHJcbiAgICB2YXIgZHgwID0gKG5vZGUuZ2V0QXR0cmlidXRlKCdkeCcpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihudW0gPT4gbnVtICE9PSAnJykubWFwKHBhcnNlRmxvYXQpXHJcbiAgICB2YXIgZHkwID0gKG5vZGUuZ2V0QXR0cmlidXRlKCdkeScpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihudW0gPT4gbnVtICE9PSAnJykubWFwKHBhcnNlRmxvYXQpXHJcblxyXG4gICAgLy8gVE9ETzogZXZlbnR1YWxseSByZXBsYWNlIG9ubHkgYXMgbXVjaCB2YWx1ZXMgYXMgd2UgaGF2ZSB0ZXh0IGNoYXJzIChub2RlLnRleHRDb250ZW50Lmxlbmd0aCkgYmVjYXVzZSB3ZSBjb3VsZCBlbmQgdXAgYWRkaW5nIHRvIG11Y2hcclxuICAgIC8vIHJlcGxhY2UgaW5pdGlhbCB2YWx1ZXMgd2l0aCBub2RlIHZhbHVlcyBpZiBwcmVzZW50XHJcbiAgICBkeC5zcGxpY2UoMCwgZHgwLmxlbmd0aCwgLi4uZHgwKVxyXG4gICAgZHkuc3BsaWNlKDAsIGR5MC5sZW5ndGgsIC4uLmR5MClcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gZ2V0IHRleHQgZGF0YVxyXG4gICAgY29uc3QgZGF0YSA9IG5vZGUuZGF0YVxyXG5cclxuICAgIGxldCBqID0gMFxyXG4gICAgY29uc3QgamwgPSBkYXRhLmxlbmd0aFxyXG4gICAgY29uc3QgZGV0YWlscyA9IGdldEZvbnREZXRhaWxzKG5vZGUpXHJcblxyXG4gICAgLy8gaWYgaXQgaXMgbW9yZSB0aGFuIG9uZSBkeC9keSBzaW5nbGUgbGV0dGVycyBhcmUgbW92ZWQgYnkgdGhlIGFtb3VudCAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS9keClcclxuICAgIGlmIChkeS5sZW5ndGggfHwgZHgubGVuZ3RoKSB7XHJcbiAgICAgIGZvciAoO2ogPCBqbDsgaisrKSB7XHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIGEgYm94IGZvciBhIHNpbmdsZSBsZXR0ZXJcclxuICAgICAgICBib3hlcy5wdXNoKHRleHRVdGlscy50ZXh0QkJveChkYXRhLnN1YnN0cihqLCAxKSwgcG9zLngsIHBvcy55LCBkZXRhaWxzKSlcclxuXHJcbiAgICAgICAgLy8gQWRkIHRoZSBuZXh0IHBvc2l0aW9uIHRvIGN1cnJlbnQgb25lXHJcbiAgICAgICAgcG9zLnggKz0gZHguc2hpZnQoKSB8fCAwXHJcbiAgICAgICAgcG9zLnkgKz0gZHkuc2hpZnQoKSB8fCAwXHJcblxyXG4gICAgICAgIGlmICghZHkubGVuZ3RoICYmICFkeC5sZW5ndGgpIGJyZWFrXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBpbiBjYXNlIGl0IHdhcyBvbmx5IG9uZSBkeC9keSBvciBubyBtb3JlIGR4L2R5IG1vdmUgdGhlIHJlc3Qgb2YgdGhlIHRleHRcclxuICAgIGJveGVzLnB1c2godGV4dFV0aWxzLnRleHRCQm94KGRhdGEuc3Vic3RyKGopLCBwb3MueCwgcG9zLnksIGRldGFpbHMpKVxyXG4gICAgcG9zLnggKz0gYm94ZXNbYm94ZXMubGVuZ3RoIC0gMV0ud2lkdGhcclxuICB9XHJcbn1cclxuXHJcbi8qXHJcbi8vIHRoaXMgZnVuY3Rpb24gaXMgcGFzc2luZyBkeCBhbmQgZHkgdmFsdWVzIGJ5IHJlZmVyZW5jZXMuIERvbnQgYXNzaWduIG5ldyB2YWx1ZXMgdG8gaXRcclxuY29uc3QgdGV4dEl0ZXJhdG9yID0gZnVuY3Rpb24gKG5vZGUsIHBvcyA9IHsgeDogMCwgeTogMCB9LCBkeCA9IFsgMCBdLCBkeSA9IFsgMCBdKSB7XHJcblxyXG4gIHZhciB4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneCcpKVxyXG4gIHZhciB5ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneScpKVxyXG5cclxuICBwb3MueCA9IGlzTmFOKHgpID8gcG9zLnggOiB4XHJcbiAgcG9zLnkgPSBpc05hTih5KSA/IHBvcy55IDogeVxyXG5cclxuICB2YXIgZHgwID0gKG5vZGUuZ2V0QXR0cmlidXRlKCdkeCcpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihudW0gPT4gbnVtICE9PSAnJykubWFwKHBhcnNlRmxvYXQpXHJcbiAgdmFyIGR5MCA9IChub2RlLmdldEF0dHJpYnV0ZSgnZHknKSB8fCAnJykuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5maWx0ZXIobnVtID0+IG51bSAhPT0gJycpLm1hcChwYXJzZUZsb2F0KVxyXG4gIHZhciBib3hlcyA9IFtdXHJcbiAgdmFyIGRhdGEgPSAnJ1xyXG5cclxuICAvLyBUT0RPOiBldmVudHVhbGx5IHJlcGxhY2Ugb25seSBhcyBtdWNoIHZhbHVlcyBhcyB3ZSBoYXZlIHRleHQgY2hhcnMgKG5vZGUudGV4dENvbnRlbnQubGVuZ3RoKSBiZWNhdXNlIHdlIGNvdWxkIGVuZCB1cCBhZGRpbmcgdG8gbXVjaFxyXG4gIC8vIHJlcGxhY2UgaW5pdGlhbCB2YWx1ZXMgd2l0aCBub2RlIHZhbHVlcyBpZiBwcmVzZW50XHJcbiAgZHguc3BsaWNlKDAsIGR4MC5sZW5ndGgsIC4uLmR4MClcclxuICBkeS5zcGxpY2UoMCwgZHkwLmxlbmd0aCwgLi4uZHkwKVxyXG5cclxuICB2YXIgaSA9IDBcclxuICB2YXIgaWwgPSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoXHJcblxyXG4gIC8vIGl0ZXJhdGUgdGhyb3VnaCBhbGwgY2hpbGRyZW5cclxuICBmb3IgKDsgaSA8IGlsOyArK2kpIHtcclxuXHJcbiAgICAvLyBzaGlmdCBuZXh0IGNoaWxkXHJcbiAgICBwb3MueCArPSBkeC5zaGlmdCgpIHx8IDBcclxuICAgIHBvcy55ICs9IGR5LnNoaWZ0KCkgfHwgMFxyXG5cclxuICAgIC8vIHRleHRcclxuICAgIGlmIChub2RlLmNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgPT09IG5vZGUuVEVYVF9OT0RFKSB7XHJcblxyXG4gICAgICAvLyBnZXQgdGV4dCBkYXRhXHJcbiAgICAgIGRhdGEgPSBub2RlLmNoaWxkTm9kZXNbaV0uZGF0YVxyXG5cclxuICAgICAgbGV0IGogPSAwXHJcbiAgICAgIGNvbnN0IGpsID0gZGF0YS5sZW5ndGhcclxuXHJcbiAgICAgIC8vIGlmIGl0IGlzIG1vcmUgdGhhbiBvbmUgZHgvZHkgc2luZ2xlIGxldHRlcnMgYXJlIG1vdmVkIGJ5IHRoZSBhbW91bnQgKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvZHgpXHJcbiAgICAgIGlmIChkeS5sZW5ndGggfHwgZHgubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yICg7aiA8IGpsOyBqKyspIHtcclxuICAgICAgICAgIGJveGVzLnB1c2godGV4dFV0aWxzLnRleHRCQm94KGRhdGEuc3Vic3RyKGosIDEpLCBwb3MueCwgcG9zLnksIGdldEZvbnREZXRhaWxzKG5vZGUpKSlcclxuXHJcbiAgICAgICAgICBwb3MueCArPSBkeC5zaGlmdCgpIHx8IDBcclxuICAgICAgICAgIHBvcy55ICs9IGR5LnNoaWZ0KCkgfHwgMFxyXG5cclxuICAgICAgICAgIGlmICghZHkubGVuZ3RoICYmICFkeC5sZW5ndGgpIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpbiBjYXNlIGl0IHdhcyBvbmx5IG9uZSBkeC9keSBvciBubyBtb3JlIGR4L2R5IG1vdmUgdGhlIHJlc3Qgb2YgdGhlIHRleHRcclxuXHJcbiAgICAgIGJveGVzLnB1c2godGV4dFV0aWxzLnRleHRCQm94KGRhdGEuc3Vic3RyKGopLCBwb3MueCwgcG9zLnksIGdldEZvbnREZXRhaWxzKG5vZGUpKSlcclxuICAgICAgcG9zLnggKz0gYm94ZXNbYm94ZXMubGVuZ3RoIC0gMV0ud2lkdGhcclxuXHJcbiAgICAvLyBlbGVtZW50XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBpbiBjYXNlIG9mIGVsZW1lbnQsIHJlY3Vyc2l2ZWx5IGNhbGwgZnVuY3Rpb24gYWdhaW4gd2l0aCBuZXcgc3RhcnQgdmFsdWVzXHJcbiAgICAgIGJveGVzID0gYm94ZXMuY29uY2F0KHRleHRJdGVyYXRvcihub2RlLmNoaWxkTm9kZXNbaV0sIHBvcywgZHgsIGR5KSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBib3hlc1xyXG59ICovXHJcblxyXG5jb25zdCBnZXRGb250RGV0YWlscyA9IChub2RlKSA9PiB7XHJcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuVEVYVF9OT0RFKSBub2RlID0gbm9kZS5wYXJlbnROb2RlXHJcblxyXG4gIGxldCBmb250U2l6ZSA9IG51bGxcclxuICBsZXQgZm9udEZhbWlseSA9IG51bGxcclxuICBsZXQgdGV4dEFuY2hvciA9IG51bGxcclxuICBsZXQgZG9taW5hbnRCYXNlbGluZSA9IG51bGxcclxuXHJcbiAgY29uc3QgdGV4dENvbnRlbnRFbGVtZW50cyA9IFtcclxuICAgICd0ZXh0JyxcclxuICAgICd0c3BhbicsXHJcbiAgICAndHJlZicsXHJcbiAgICAndGV4dFBhdGgnLFxyXG4gICAgJ2FsdEdseXBoJyxcclxuICAgICdnJ1xyXG4gIF1cclxuXHJcbiAgZG8ge1xyXG4gICAgLy8gVE9ETzogc3RvcCBvblxyXG4gICAgaWYgKCFmb250U2l6ZSkgeyBmb250U2l6ZSA9IG5vZGUuc3R5bGUuZm9udFNpemUgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ2ZvbnQtc2l6ZScpIH1cclxuICAgIGlmICghZm9udEZhbWlseSkgeyBmb250RmFtaWx5ID0gbm9kZS5zdHlsZS5mb250RmFtaWx5IHx8IG5vZGUuZ2V0QXR0cmlidXRlKCdmb250LWZhbWlseScpIH1cclxuICAgIGlmICghdGV4dEFuY2hvcikgeyB0ZXh0QW5jaG9yID0gbm9kZS5zdHlsZS50ZXh0QW5jaG9yIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCd0ZXh0LWFuY2hvcicpIH1cclxuICAgIGlmICghZG9taW5hbnRCYXNlbGluZSkgeyBkb21pbmFudEJhc2VsaW5lID0gbm9kZS5zdHlsZS5kb21pbmFudEJhc2VsaW5lIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCdkb21pbmFudC1iYXNlbGluZScpIH1cclxuICAgIC8vIFRPRE86IGNoZWNrIGZvciBhbGlnbm1lbnQtYmFzZWxpbmUgaW4gdHNwYW4sIHRyZWYsIHRleHRQYXRoLCBhbHRHbHlwaFxyXG4gICAgLy8gVE9ETzogYWxpZ25tZW50LWFkanVzdCwgYmFzZWxpbmUtc2hpZnRcclxuICAgIC8qXHJcbiAgICBpZighYWxpZ25tZW50QmFzZWxpbmUpXHJcbiAgICBhbGlnbm1lbnRCYXNlbGluZSA9IHRoaXMuc3R5bGUuYWxpZ25tZW50QmFzZWxpbmUgfHwgdGhpcy5nZXRBdHRyaWJ1dGUoJ2FsaWdubWVudC1iYXNlbGluZScpXHJcbiAgICAqL1xyXG5cclxuICB9IHdoaWxlIChcclxuICAgIChub2RlID0gbm9kZS5wYXJlbnROb2RlKVxyXG4gICAgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREVcclxuICAgICYmICh0ZXh0Q29udGVudEVsZW1lbnRzLmluY2x1ZGVzKG5vZGUubm9kZU5hbWUpKVxyXG4gIClcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGZvbnRGYW1pbHksXHJcbiAgICBmb250U2l6ZSxcclxuICAgIHRleHRBbmNob3I6IHRleHRBbmNob3IgfHwgJ3N0YXJ0JyxcclxuICAgIC8vIFRPRE86IHVzZSBjZW50cmFsIGZvciB3cml0aW5nLW1vZGUgPT09IGhvcml6b250YWwgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS9kb21pbmFudC1iYXNlbGluZVxyXG4gICAgZG9taW5hbnRCYXNlbGluZTogZG9taW5hbnRCYXNlbGluZSB8fCAnYWxwaGFiZXRpY2FsJ1xyXG4gICAgLy8gZm9udEZhbWlseU1hcHBpbmdzOiB0aGlzLm93bmVyRG9jdW1lbnQuZm9udEZhbWlseU1hcHBpbmdzLFxyXG4gICAgLy8gZm9udERpcjogdGhpcy5vd25lckRvY3VtZW50LmZvbnREaXIsXHJcbiAgICAvLyBwcmVsb2FkZWQ6IHRoaXMub3duZXJEb2N1bWVudC5fcHJlbG9hZGVkXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJ1xyXG4vLyBpbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJ1xyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIF9fZGlybmFtZSB9IGZyb20gJy4vZGlybmFtZS5janMnIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHJcbi8vIHVzZSB0aGlzIGFzIHNvb24gYXMgaW1wb3J0Lm1ldGEgaXMgc3RhbmRhcmRpemVkXHJcbi8vIGNvbnN0IF9fZGlybmFtZSA9IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcclxuXHJcbmV4cG9ydCBjb25zdCBmb250U2l6ZSA9IDE2XHJcbmV4cG9ydCBjb25zdCBmb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnXHJcbmV4cG9ydCBjb25zdCBmb250RGlyID0gam9pbihfX2Rpcm5hbWUsICcuLi8uLi8nLCAnZm9udHMvJylcclxuZXhwb3J0IGNvbnN0IGZvbnRGYW1pbHlNYXBwaW5ncyA9IHtcclxuICAnc2Fucy1zZXJpZic6ICdPcGVuU2Fucy1SZWd1bGFyLnR0ZicsXHJcbiAgJ09wZW4gU2Fucyc6ICdPcGVuU2Fucy1SZWd1bGFyLnR0ZidcclxufVxyXG4iLCJpbXBvcnQgeyBkZWNhbWVsaXplIH0gZnJvbSAnLi4vdXRpbHMvc3RyVXRpbHMuanMnXHJcblxyXG5leHBvcnQgY29uc3Qgb2JqZWN0VG9NYXAgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgaWYgKG9iaiBpbnN0YW5jZW9mIE1hcCkgcmV0dXJuIG5ldyBNYXAob2JqKVxyXG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZSgobWFwLCBrZXkpID0+IG1hcC5zZXQoa2V5LCBvYmpba2V5XSksIG5ldyBNYXAoKSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1hcFRvT2JqZWN0ID0gZnVuY3Rpb24gKG1hcCkge1xyXG4gIHZhciBvYmogPSB7fVxyXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICBvYmpba2V5XSA9IHZhbHVlXHJcbiAgfSlcclxuICByZXR1cm4gb2JqXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtYXBNYXAgPSBmdW5jdGlvbiAobWFwLCBjYikge1xyXG4gIHZhciBhcnIgPSBbXVxyXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICBhcnIucHVzaChjYih2YWx1ZSwga2V5KSlcclxuICB9KVxyXG4gIHJldHVybiBhcnJcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1hcFRvQ3NzID0gZnVuY3Rpb24gKG15TWFwKSB7XHJcbiAgcmV0dXJuIG1hcE1hcChteU1hcCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgIGlmICghdmFsdWUpIHJldHVybiBmYWxzZVxyXG4gICAgcmV0dXJuIGRlY2FtZWxpemUoa2V5KSArICc6ICcgKyB2YWx1ZVxyXG4gIH0pLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuICEhZWwgfSkuam9pbignOyAnKSArICc7JyB8fCBudWxsXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjc3NUb01hcCA9IGZ1bmN0aW9uIChjc3MpIHtcclxuICByZXR1cm4gbmV3IE1hcChjc3Muc3BsaXQoL1xccyo7XFxzKi8pLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuICEhZWwgfSkubWFwKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgcmV0dXJuIGVsLnNwbGl0KC9cXHMqOlxccyovKVxyXG4gIH0pKVxyXG59XHJcbiIsIlxyXG5leHBvcnQgY29uc3Qgc3ZnID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ1xyXG5leHBvcnQgY29uc3QgeGxpbmsgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaydcclxuZXhwb3J0IGNvbnN0IGh0bWwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCdcclxuZXhwb3J0IGNvbnN0IG1hdGhtbCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJ1xyXG5leHBvcnQgY29uc3QgeG1sID0gJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZSdcclxuZXhwb3J0IGNvbnN0IHhtbG5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJ1xyXG4iLCJleHBvcnQgY29uc3Qgbm9kZXNUb05vZGUgPSAobm9kZXMsIGRvY3VtZW50KSA9PiB7XHJcbiAgbm9kZXMgPSBub2Rlcy5tYXAoKG5vZGUpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbm9kZVxyXG4gIH0pXHJcbiAgaWYgKG5vZGVzLmxlbmd0aCA9PT0gMSkgeyByZXR1cm4gbm9kZXMgfVxyXG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcclxuICBub2Rlcy5mb3JFYWNoKG5vZGUuYXBwZW5kQ2hpbGQsIG5vZGUpXHJcbiAgcmV0dXJuIG5vZGVcclxufVxyXG4iLCJleHBvcnQgY29uc3QgZXh0ZW5kID0gKC4uLm1vZHVsZXMpID0+IHtcclxuICB2YXIgbWV0aG9kcywga2V5LCBpXHJcblxyXG4gIC8vIEdldCBvYmplY3Qgd2l0aCBleHRlbnNpb25zXHJcbiAgbWV0aG9kcyA9IG1vZHVsZXMucG9wKClcclxuXHJcbiAgZm9yIChpID0gbW9kdWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgZm9yIChrZXkgaW4gbWV0aG9kcykgeyBtb2R1bGVzW2ldLnByb3RvdHlwZVtrZXldID0gbWV0aG9kc1trZXldIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBleHRlbmRTdGF0aWMgPSAoLi4ubW9kdWxlcykgPT4ge1xyXG4gIHZhciBtZXRob2RzLCBrZXksIGlcclxuXHJcbiAgLy8gR2V0IG9iamVjdCB3aXRoIGV4dGVuc2lvbnNcclxuICBtZXRob2RzID0gbW9kdWxlcy5wb3AoKVxyXG5cclxuICBmb3IgKGkgPSBtb2R1bGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBmb3IgKGtleSBpbiBtZXRob2RzKSB7IG1vZHVsZXNbaV1ba2V5XSA9IG1ldGhvZHNba2V5XSB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBUT0RPOiByZWZhY3RvciBzbyB0aGF0IGl0IHRha2VzIGEgY2xhc3NcclxuZXhwb3J0IGNvbnN0IG1peGluID0gKG1peGluLCBfY2xhc3MpID0+IHtcclxuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG1peGluKVxyXG4gIC8vIGNvbnN0IGFsbCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG1peGluKVxyXG5cclxuICAvLyBjb25zdCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhkZXNjcmlwdG9ycylcclxuICAvLyBjb25zdCBtZXRob2ROYW1lcyA9IGFsbC5maWx0ZXIocCA9PiAhcHJvcE5hbWVzLmluY2x1ZGVzKHApKVxyXG5cclxuICAvLyBmb3IgKGNvbnN0IG1ldGhvZCBvZiBtZXRob2ROYW1lcykge1xyXG4gIC8vICAgX2NsYXNzLnByb3RvdHlwZVttZXRob2RdID0gbWl4aW5bbWV0aG9kXVxyXG4gIC8vIH1cclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoX2NsYXNzLnByb3RvdHlwZSwgZGVzY3JpcHRvcnMpXHJcbn1cclxuIiwiaW1wb3J0IHsgQm94LCBOb0JveCB9IGZyb20gJy4uL290aGVyL0JveC5qcydcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuLi9vdGhlci9Qb2ludC5qcydcclxuaW1wb3J0ICogYXMgcmVnZXggZnJvbSAnLi9yZWdleC5qcydcclxuLy8gVE9ETzogdXNlIG93biBtYXRyaXggaW1wbGVtZW50YXRpb25cclxuaW1wb3J0IHsgbWF0cml4RmFjdG9yeSB9IGZyb20gJy4vLi4vZG9tL3N2Zy9TVkdNYXRyaXguanMnXHJcbmltcG9ydCB7IFBvaW50Q2xvdWQgfSBmcm9tICcuL1BvaW50Q2xvdWQuanMnXHJcblxyXG5jb25zdCBwYXRoSGFuZGxlcnMgPSB7XHJcbiAgTSAoYywgcCwgciwgcDApIHtcclxuICAgIHAueCA9IHAwLnggPSBjWzBdXHJcbiAgICBwLnkgPSBwMC55ID0gY1sxXVxyXG5cclxuICAgIHJldHVybiBuZXcgTW92ZShwKVxyXG4gIH0sXHJcbiAgTCAoYywgcCkge1xyXG4gICAgY29uc3QgcmV0ID0gbmV3IExpbmUocC54LCBwLnksIGNbMF0sIGNbMV0pLy8gLm9mZnNldChvKVxyXG4gICAgcC54ID0gY1swXVxyXG4gICAgcC55ID0gY1sxXVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH0sXHJcbiAgSCAoYywgcCkge1xyXG4gICAgcmV0dXJuIHBhdGhIYW5kbGVycy5MKFsgY1swXSwgcC55IF0sIHApXHJcbiAgfSxcclxuICBWIChjLCBwKSB7XHJcbiAgICByZXR1cm4gcGF0aEhhbmRsZXJzLkwoWyBwLngsIGNbMF0gXSwgcClcclxuICB9LFxyXG4gIFEgKGMsIHAsIHIpIHtcclxuICAgIGNvbnN0IHJldCA9IEN1YmljLmZyb21RdWFkKHAsIG5ldyBQb2ludChjWzBdLCBjWzFdKSwgbmV3IFBvaW50KGNbMl0sIGNbM10pKS8vIC5vZmZzZXQobylcclxuICAgIHAueCA9IGNbMl1cclxuICAgIHAueSA9IGNbM11cclxuXHJcbiAgICBjb25zdCByZWZsZWN0ID0gbmV3IFBvaW50KGNbMF0sIGNbMV0pLnJlZmxlY3RBdChwKVxyXG4gICAgci54ID0gcmVmbGVjdC54XHJcbiAgICByLnkgPSByZWZsZWN0LnlcclxuXHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfSxcclxuICBUIChjLCBwLCByLCBwMCwgcmVmbGVjdGlvbklzUG9zc2libGUpIHtcclxuICAgIGlmIChyZWZsZWN0aW9uSXNQb3NzaWJsZSkgeyBjID0gWyByLngsIHIueSBdLmNvbmNhdChjKSB9IGVsc2UgeyBjID0gWyBwLngsIHAueSBdLmNvbmNhdChjKSB9XHJcbiAgICByZXR1cm4gcGF0aEhhbmRsZXJzLlEoYywgcCwgcilcclxuICB9LFxyXG4gIEMgKGMsIHAsIHIpIHtcclxuICAgIGNvbnN0IHJldCA9IG5ldyBDdWJpYyhwLCBuZXcgUG9pbnQoY1swXSwgY1sxXSksIG5ldyBQb2ludChjWzJdLCBjWzNdKSwgbmV3IFBvaW50KGNbNF0sIGNbNV0pKS8vIC5vZmZzZXQobylcclxuICAgIHAueCA9IGNbNF1cclxuICAgIHAueSA9IGNbNV1cclxuICAgIGNvbnN0IHJlZmxlY3QgPSBuZXcgUG9pbnQoY1syXSwgY1szXSkucmVmbGVjdEF0KHApXHJcbiAgICByLnggPSByZWZsZWN0LnhcclxuICAgIHIueSA9IHJlZmxlY3QueVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH0sXHJcbiAgUyAoYywgcCwgciwgcDAsIHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKSB7XHJcbiAgICAvLyByZWZsZWN0aW9uIG1ha2VzIG9ubHkgc2Vuc2UgaWYgdGhpcyBjb21tYW5kIHdhcyBwcmVjZWVkZWQgYnkgYW5vdGhlciBiZXppZXJlIGNvbW1hbmQgKFFUU0MpXHJcbiAgICBpZiAocmVmbGVjdGlvbklzUG9zc2libGUpIHsgYyA9IFsgci54LCByLnkgXS5jb25jYXQoYykgfSBlbHNlIHsgYyA9IFsgcC54LCBwLnkgXS5jb25jYXQoYykgfVxyXG4gICAgcmV0dXJuIHBhdGhIYW5kbGVycy5DKGMsIHAsIHIpXHJcbiAgfSxcclxuICBaIChjLCBwLCByLCBwMCkge1xyXG4gICAgLy8gRklYTUU6IFRoZSBiZWhhdmlvciBvZiBaIGRlcGVuZHMgb24gdGhlIGNvbW1hbmQgYmVmb3JlXHJcbiAgICByZXR1cm4gcGF0aEhhbmRsZXJzLkwoWyBwMC54LCBwMC55IF0sIHApXHJcbiAgfSxcclxuICBBIChjLCBwLCByKSB7XHJcbiAgICBjb25zdCByZXQgPSBuZXcgQXJjKHAsIG5ldyBQb2ludChjWzVdLCBjWzZdKSwgY1swXSwgY1sxXSwgY1syXSwgY1szXSwgY1s0XSlcclxuICAgIHAueCA9IGNbNV1cclxuICAgIHAueSA9IGNbNl1cclxuICAgIHJldHVybiByZXRcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG1saHZxdGNzYSA9ICdtbGh2cXRjc2F6Jy5zcGxpdCgnJylcclxuXHJcbmZvciAobGV0IGkgPSAwLCBpbCA9IG1saHZxdGNzYS5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XHJcbiAgcGF0aEhhbmRsZXJzW21saHZxdGNzYVtpXV0gPSAoZnVuY3Rpb24gKGkpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoYywgcCwgciwgcDAsIHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKSB7XHJcbiAgICAgIGlmIChpID09PSAnSCcpIGNbMF0gPSBjWzBdICsgcC54XHJcbiAgICAgIGVsc2UgaWYgKGkgPT09ICdWJykgY1swXSA9IGNbMF0gKyBwLnlcclxuICAgICAgZWxzZSBpZiAoaSA9PT0gJ0EnKSB7XHJcbiAgICAgICAgY1s1XSA9IGNbNV0gKyBwLnhcclxuICAgICAgICBjWzZdID0gY1s2XSArIHAueVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwLCBqbCA9IGMubGVuZ3RoOyBqIDwgamw7ICsraikge1xyXG4gICAgICAgICAgY1tqXSA9IGNbal0gKyAoaiAlIDIgPyBwLnkgOiBwLngpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcGF0aEhhbmRsZXJzW2ldKGMsIHAsIHIsIHAwLCByZWZsZWN0aW9uSXNQb3NzaWJsZSlcclxuICAgIH1cclxuICB9KShtbGh2cXRjc2FbaV0udG9VcHBlckNhc2UoKSlcclxufVxyXG5cclxuZnVuY3Rpb24gcGF0aFJlZ1JlcGxhY2UgKGEsIGIsIGMsIGQpIHtcclxuICByZXR1cm4gYyArIGQucmVwbGFjZShyZWdleC5kb3RzLCAnIC4nKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0JlemllcmUgKG9iaikge1xyXG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBDdWJpY1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcGF0aFBhcnNlciA9IChhcnJheSkgPT4ge1xyXG5cclxuICAvLyBwcmVwYXJlIGZvciBwYXJzaW5nXHJcbiAgY29uc3QgcGFyYW1DbnQgPSB7IE06IDIsIEw6IDIsIEg6IDEsIFY6IDEsIEM6IDYsIFM6IDQsIFE6IDQsIFQ6IDIsIEE6IDcsIFo6IDAgfVxyXG5cclxuICBhcnJheSA9IGFycmF5XHJcbiAgICAucmVwbGFjZShyZWdleC5udW1iZXJzV2l0aERvdHMsIHBhdGhSZWdSZXBsYWNlKSAvLyBjb252ZXJ0IDQ1LjEyMy4xMjMgdG8gNDUuMTIzIC4xMjNcclxuICAgIC5yZXBsYWNlKHJlZ2V4LnBhdGhMZXR0ZXJzLCAnICQmICcpIC8vIHB1dCBzb21lIHJvb20gYmV0d2VlbiBsZXR0ZXJzIGFuZCBudW1iZXJzXHJcbiAgICAucmVwbGFjZShyZWdleC5oeXBoZW4sICckMSAtJykgLy8gYWRkIHNwYWNlIGJlZm9yZSBoeXBoZW5cclxuICAgIC50cmltKCkgLy8gdHJpbVxyXG4gICAgLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikgLy8gc3BsaXQgaW50byBhcnJheVxyXG5cclxuICAvLyBhcnJheSBub3cgaXMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgcGFydHMgb2YgYSBwYXRoIGUuZy4gWydNJywgJzAnLCAnMCcsICdMJywgJzMwJywgJzMwJyAuLi5dXHJcbiAgY29uc3QgYXJyID0gW11cclxuICBjb25zdCBwID0gbmV3IFBvaW50KClcclxuICBjb25zdCBwMCA9IG5ldyBQb2ludCgpXHJcbiAgY29uc3QgciA9IG5ldyBQb2ludCgpXHJcbiAgbGV0IGluZGV4ID0gMFxyXG4gIGNvbnN0IGxlbiA9IGFycmF5Lmxlbmd0aFxyXG4gIGxldCBzXHJcblxyXG4gIGRvIHtcclxuICAgIC8vIFRlc3QgaWYgd2UgaGF2ZSBhIHBhdGggbGV0dGVyXHJcbiAgICBpZiAocmVnZXguaXNQYXRoTGV0dGVyLnRlc3QoYXJyYXlbaW5kZXhdKSkge1xyXG4gICAgICBzID0gYXJyYXlbaW5kZXhdXHJcbiAgICAgICsraW5kZXhcclxuICAgIC8vIElmIGxhc3QgbGV0dGVyIHdhcyBhIG1vdmUgY29tbWFuZCBhbmQgd2UgZ290IG5vIG5ldywgaXQgZGVmYXVsdHMgdG8gW0xdaW5lXHJcbiAgICB9IGVsc2UgaWYgKHMgPT09ICdNJykge1xyXG4gICAgICBzID0gJ0wnXHJcbiAgICB9IGVsc2UgaWYgKHMgPT09ICdtJykge1xyXG4gICAgICBzID0gJ2wnXHJcbiAgICB9XHJcblxyXG4gICAgYXJyLnB1c2goXHJcbiAgICAgIHBhdGhIYW5kbGVyc1tzXS5jYWxsKG51bGwsXHJcbiAgICAgICAgYXJyYXkuc2xpY2UoaW5kZXgsIChpbmRleCA9IGluZGV4ICsgcGFyYW1DbnRbcy50b1VwcGVyQ2FzZSgpXSkpLm1hcChwYXJzZUZsb2F0KSxcclxuICAgICAgICBwLCByLCBwMCxcclxuICAgICAgICBpc0JlemllcmUoYXJyW2Fyci5sZW5ndGggLSAxXSlcclxuICAgICAgKVxyXG4gICAgKVxyXG5cclxuICB9IHdoaWxlIChsZW4gPiBpbmRleClcclxuXHJcbiAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5jbGFzcyBNb3ZlIHtcclxuICBjb25zdHJ1Y3RvciAocCkge1xyXG4gICAgdGhpcy5wMSA9IHAuY2xvbmUoKVxyXG4gIH1cclxuXHJcbiAgLy8gRklYTUU6IFVzZSBwb2ludGNsb3VkXHJcbiAgYmJveCAoKSB7XHJcbiAgICBjb25zdCBwID0gdGhpcy5wMVxyXG4gICAgcmV0dXJuIG5ldyBCb3gocC54LCBwLnksIDAsIDApXHJcbiAgfVxyXG5cclxuICBnZXRDbG91ZCAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50Q2xvdWQoWyB0aGlzLnAxIF0pXHJcbiAgfVxyXG5cclxuICBsZW5ndGggKCkgeyByZXR1cm4gMCB9XHJcblxyXG4gIHRvUGF0aCAoKSB7XHJcbiAgICByZXR1cm4gWyAnTScsIHRoaXMucDEueCwgdGhpcy5wMS55IF0uam9pbignICcpXHJcbiAgfVxyXG5cclxuICB0b1BhdGhGcmFnbWVudCAoKSB7XHJcbiAgICByZXR1cm4gWyAnTScsIHRoaXMucDEueCwgdGhpcy5wMS55IF1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBcmMge1xyXG4gIGNvbnN0cnVjdG9yIChwMSwgcDIsIHJ4LCByeSwgz4YsIGFyYywgc3dlZXApIHtcclxuICAgIC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9TVkcvaW1wbG5vdGUuaHRtbCNBcmNDb3JyZWN0aW9uT3V0T2ZSYW5nZVJhZGlpXHJcbiAgICBpZiAoIXJ4IHx8ICFyeSkgcmV0dXJuIG5ldyBMaW5lKHAxLCBwMilcclxuXHJcbiAgICByeCA9IE1hdGguYWJzKHJ4KVxyXG4gICAgcnkgPSBNYXRoLmFicyhyeSlcclxuXHJcbiAgICB0aGlzLnAxID0gcDEuY2xvbmUoKVxyXG4gICAgdGhpcy5wMiA9IHAyLmNsb25lKClcclxuICAgIHRoaXMuYXJjID0gYXJjID8gMSA6IDBcclxuICAgIHRoaXMuc3dlZXAgPSBzd2VlcCA/IDEgOiAwXHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIGNvcyBhbmQgc2luIG9mIGFuZ2xlIHBoaVxyXG4gICAgY29uc3QgY29zz4YgPSBNYXRoLmNvcyjPhiAvIDE4MCAqIE1hdGguUEkpXHJcbiAgICBjb25zdCBzaW7PhiA9IE1hdGguc2luKM+GIC8gMTgwICogTWF0aC5QSSlcclxuXHJcbiAgICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvU1ZHL2ltcGxub3RlLmh0bWwjQXJjQ29udmVyc2lvbkVuZHBvaW50VG9DZW50ZXJcclxuICAgIC8vIChlcS4gNS4xKVxyXG4gICAgY29uc3QgcDFfID0gbmV3IFBvaW50KFxyXG4gICAgICAocDEueCAtIHAyLngpIC8gMixcclxuICAgICAgKHAxLnkgLSBwMi55KSAvIDJcclxuICAgICkudHJhbnNmb3JtKG1hdHJpeEZhY3RvcnkoXHJcbiAgICAgIGNvc8+GLCAtc2luz4YsIHNpbs+GLCBjb3PPhiwgMCwgMFxyXG4gICAgKSlcclxuXHJcbiAgICAvLyAoZXEuIDYuMilcclxuICAgIC8vIE1ha2Ugc3VyZSB0aGUgcmFkaXVzIGZpdCB3aXRoIHRoZSBhcmMgYW5kIGNvcnJlY3QgaWYgbmVjY2Vzc2FyeVxyXG4gICAgY29uc3QgcmF0aW8gPSAocDFfLnggKiogMiAvIHJ4ICoqIDIpICsgKHAxXy55ICoqIDIgLyByeSAqKiAyKVxyXG5cclxuICAgIC8vIChlcS4gNi4zKVxyXG4gICAgaWYgKHJhdGlvID4gMSkge1xyXG4gICAgICByeCA9IE1hdGguc3FydChyYXRpbykgKiByeFxyXG4gICAgICByeSA9IE1hdGguc3FydChyYXRpbykgKiByeVxyXG4gICAgfVxyXG5cclxuICAgIC8vIChlcS4gNS4yKVxyXG4gICAgY29uc3QgcnhRdWFkID0gcnggKiogMlxyXG4gICAgY29uc3QgcnlRdWFkID0gcnkgKiogMlxyXG5cclxuICAgIGNvbnN0IGRpdmlzb3IxID0gcnhRdWFkICogcDFfLnkgKiogMlxyXG4gICAgY29uc3QgZGl2aXNvcjIgPSByeVF1YWQgKiBwMV8ueCAqKiAyXHJcbiAgICBjb25zdCBkaXZpZGVuZCA9IChyeFF1YWQgKiByeVF1YWQgLSBkaXZpc29yMSAtIGRpdmlzb3IyKVxyXG5cclxuICAgIGxldCBjXyA9IG5ldyBQb2ludChcclxuICAgICAgcnggKiBwMV8ueSAvIHJ5LFxyXG4gICAgICAtcnkgKiBwMV8ueCAvIHJ4XHJcbiAgICApLm11bChNYXRoLnNxcnQoXHJcbiAgICAgIGRpdmlkZW5kIC8gKGRpdmlzb3IxICsgZGl2aXNvcjIpXHJcbiAgICApKVxyXG5cclxuICAgIGlmICh0aGlzLmFyYyA9PT0gdGhpcy5zd2VlcCkgY18gPSBjXy5tdWwoLTEpXHJcblxyXG4gICAgLy8gKGVxLiA1LjMpXHJcbiAgICBjb25zdCBjID0gY18udHJhbnNmb3JtKG1hdHJpeEZhY3RvcnkoXHJcbiAgICAgIGNvc8+GLCBzaW7PhiwgLXNpbs+GLCBjb3PPhiwgMCwgMFxyXG4gICAgKSkuYWRkKG5ldyBQb2ludChcclxuICAgICAgKHAxLnggKyBwMi54KSAvIDIsXHJcbiAgICAgIChwMS55ICsgcDIueSkgLyAyXHJcbiAgICApKVxyXG5cclxuICAgIGNvbnN0IGFuZ2xlUG9pbnQgPSBuZXcgUG9pbnQoXHJcbiAgICAgIChwMV8ueCAtIGNfLngpIC8gcngsXHJcbiAgICAgIChwMV8ueSAtIGNfLnkpIC8gcnlcclxuICAgIClcclxuXHJcbiAgICAvKiBGb3IgZXEuIDUuNCBzZWUgYW5nbGVUbyBmdW5jdGlvbiAqL1xyXG5cclxuICAgIC8vIChlcS4gNS41KVxyXG4gICAgY29uc3QgzrggPSBuZXcgUG9pbnQoMSwgMCkuYW5nbGVUbyhhbmdsZVBvaW50KVxyXG5cclxuICAgIC8vIChlcS4gNS42KVxyXG4gICAgbGV0IM6UzrggPSBhbmdsZVBvaW50LmFuZ2xlVG8obmV3IFBvaW50KFxyXG4gICAgICAoLXAxXy54IC0gY18ueCkgLyByeCxcclxuICAgICAgKC1wMV8ueSAtIGNfLnkpIC8gcnlcclxuICAgICkpXHJcblxyXG4gICAgzpTOuCA9ICjOlM64ICUgKDIgKiBNYXRoLlBJKSlcclxuXHJcbiAgICBpZiAoIXN3ZWVwICYmIM6UzrggPiAwKSDOlM64IC09IDIgKiBNYXRoLlBJXHJcbiAgICBpZiAoc3dlZXAgJiYgzpTOuCA8IDApIM6UzrggKz0gMiAqIE1hdGguUElcclxuXHJcbiAgICB0aGlzLmMgPSBjXHJcbiAgICB0aGlzLnRoZXRhID0gzrggKiAxODAgLyBNYXRoLlBJXHJcbiAgICB0aGlzLnRoZXRhMiA9ICjOuCArIM6UzrgpICogMTgwIC8gTWF0aC5QSVxyXG5cclxuICAgIHRoaXMuZGVsdGEgPSDOlM64ICogMTgwIC8gTWF0aC5QSVxyXG4gICAgdGhpcy5yeCA9IHJ4XHJcbiAgICB0aGlzLnJ5ID0gcnlcclxuICAgIHRoaXMucGhpID0gz4ZcclxuICAgIHRoaXMuY29zz4YgPSBjb3PPhlxyXG4gICAgdGhpcy5zaW7PhiA9IHNpbs+GXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUNlbnRlckZvcm0gKGMsIHJ4LCByeSwgz4YsIM64LCDOlM64KSB7XHJcbiAgICBjb25zdCBjb3PPhiA9IE1hdGguY29zKM+GIC8gMTgwICogTWF0aC5QSSlcclxuICAgIGNvbnN0IHNpbs+GID0gTWF0aC5zaW4oz4YgLyAxODAgKiBNYXRoLlBJKVxyXG4gICAgY29uc3QgbSA9IG1hdHJpeEZhY3RvcnkoY29zz4YsIHNpbs+GLCAtc2luz4YsIGNvc8+GLCAwLCAwKVxyXG5cclxuICAgIGNvbnN0IHAxID0gbmV3IFBvaW50KFxyXG4gICAgICByeCAqIE1hdGguY29zKM64IC8gMTgwICogTWF0aC5QSSksXHJcbiAgICAgIHJ5ICogTWF0aC5zaW4ozrggLyAxODAgKiBNYXRoLlBJKVxyXG4gICAgKS50cmFuc2Zvcm0obSkuYWRkKGMpXHJcblxyXG4gICAgY29uc3QgcDIgPSBuZXcgUG9pbnQoXHJcbiAgICAgIHJ4ICogTWF0aC5jb3MoKM64ICsgzpTOuCkgLyAxODAgKiBNYXRoLlBJKSxcclxuICAgICAgcnkgKiBNYXRoLnNpbigozrggKyDOlM64KSAvIDE4MCAqIE1hdGguUEkpXHJcbiAgICApLnRyYW5zZm9ybShtKS5hZGQoYylcclxuXHJcbiAgICBjb25zdCBhcmMgPSBNYXRoLmFicyjOlM64KSA+IDE4MCA/IDEgOiAwXHJcbiAgICBjb25zdCBzd2VlcCA9IM6UzrggPiAwID8gMSA6IDBcclxuXHJcbiAgICByZXR1cm4gbmV3IEFyYyhwMSwgcDIsIHJ4LCByeSwgz4YsIGFyYywgc3dlZXApXHJcbiAgfVxyXG5cclxuICBiYm94ICgpIHtcclxuICAgIGNvbnN0IGNsb3VkID0gdGhpcy5nZXRDbG91ZCgpXHJcbiAgICByZXR1cm4gY2xvdWQuYmJveCgpXHJcbiAgfVxyXG5cclxuICBjbG9uZSAoKSB7XHJcbiAgICByZXR1cm4gbmV3IEFyYyh0aGlzLnAxLCB0aGlzLnAyLCB0aGlzLnJ4LCB0aGlzLnJ5LCB0aGlzLnBoaSwgdGhpcy5hcmMsIHRoaXMuc3dlZXApXHJcbiAgfVxyXG5cclxuICBnZXRDbG91ZCAoKSB7XHJcbiAgICBpZiAodGhpcy5wMS5lcXVhbHModGhpcy5wMikpIHJldHVybiBuZXcgUG9pbnRDbG91ZChbIHRoaXMucDEgXSlcclxuXHJcbiAgICAvLyBhcmMgY291bGQgYmUgcm90YXRlZC4gdGhlIG1pbiBhbmQgbWF4IHZhbHVlcyB0aGVuIGRvbnQgbGllIG9uIG11bHRpcGxlcyBvZiA5MCBkZWdyZXNzIGJ1dCBhcmUgc2hpZnRlZCBieSB0aGUgcm90YXRpb24gYW5nbGVcclxuICAgIC8vIHNvIHdlIGZpcnN0IGNhbGN1bGF0ZSBvdXIgMC85MCBkZWdyZWUgYW5nbGVcclxuICAgIGxldCDOuDAxID0gTWF0aC5hdGFuKC10aGlzLnNpbs+GIC8gdGhpcy5jb3PPhiAqIHRoaXMucnkgLyB0aGlzLnJ4KSAqIDE4MCAvIE1hdGguUElcclxuICAgIGxldCDOuDAyID0gTWF0aC5hdGFuKHRoaXMuY29zz4YgLyB0aGlzLnNpbs+GICogdGhpcy5yeSAvIHRoaXMucngpICogMTgwIC8gTWF0aC5QSVxyXG4gICAgbGV0IM64MSA9IHRoaXMudGhldGFcclxuICAgIGxldCDOuDIgPSB0aGlzLnRoZXRhMlxyXG5cclxuICAgIGlmICjOuDEgPCAwIHx8IM64MiA8IDApIHtcclxuICAgICAgzrgxICs9IDM2MFxyXG4gICAgICDOuDIgKz0gMzYwXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKM64MiA8IM64MSkge1xyXG4gICAgICBjb25zdCB0ZW1wID0gzrgxXHJcbiAgICAgIM64MSA9IM64MlxyXG4gICAgICDOuDIgPSB0ZW1wXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlICjOuDAxIC0gOTAgPiDOuDAxKSDOuDAxIC09IDkwXHJcbiAgICB3aGlsZSAozrgwMSA8IM64MSkgzrgwMSArPSA5MFxyXG4gICAgd2hpbGUgKM64MDIgLSA5MCA+IM64MDIpIM64MDIgLT0gOTBcclxuICAgIHdoaWxlICjOuDAyIDwgzrgxKSDOuDAyICs9IDkwXHJcblxyXG4gICAgY29uc3QgYW5nbGVUb1Rlc3QgPSBbIM64MDEsIM64MDIsICjOuDAxICsgOTApLCAozrgwMiArIDkwKSwgKM64MDEgKyAxODApLCAozrgwMiArIDE4MCksICjOuDAxICsgMjcwKSwgKM64MDIgKyAyNzApIF1cclxuXHJcbiAgICBjb25zdCBwb2ludHMgPSBhbmdsZVRvVGVzdC5maWx0ZXIoZnVuY3Rpb24gKGFuZ2xlKSB7XHJcbiAgICAgIHJldHVybiAoYW5nbGUgPiDOuDEgJiYgYW5nbGUgPCDOuDIpXHJcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGFuZ2xlKSB7XHJcbiAgICAgIHdoaWxlICh0aGlzLnRoZXRhIDwgYW5nbGUpIGFuZ2xlIC09IDM2MFxyXG4gICAgICByZXR1cm4gdGhpcy5wb2ludEF0KCgoYW5nbGUgLSB0aGlzLnRoZXRhKSAlIDM2MCkgLyAodGhpcy5kZWx0YSkpIC8vIFRPRE86IHJlcGxhY2UgdGhhdCBjYWxsIHdpdGggcG9pbnRBdEFuZ2xlXHJcbiAgICB9LmJpbmQodGhpcykpLmNvbmNhdCh0aGlzLnAxLCB0aGlzLnAyKVxyXG5cclxuICAgIHJldHVybiBuZXcgUG9pbnRDbG91ZChwb2ludHMpXHJcbiAgfVxyXG5cclxuICBsZW5ndGggKCkge1xyXG4gICAgaWYgKHRoaXMucDEuZXF1YWxzKHRoaXMucDIpKSByZXR1cm4gMFxyXG5cclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucDIuc3ViKHRoaXMucDEpLmFicygpXHJcblxyXG4gICAgY29uc3QgcmV0ID0gdGhpcy5zcGxpdEF0KDAuNSlcclxuICAgIGNvbnN0IGxlbjEgPSByZXRbMF0ucDIuc3ViKHJldFswXS5wMSkuYWJzKClcclxuICAgIGNvbnN0IGxlbjIgPSByZXRbMV0ucDIuc3ViKHJldFsxXS5wMSkuYWJzKClcclxuXHJcbiAgICBpZiAobGVuMSArIGxlbjIgLSBsZW5ndGggPCAwLjAwMDAxKSB7XHJcbiAgICAgIHJldHVybiBsZW4xICsgbGVuMlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXRbMF0ubGVuZ3RoKCkgKyByZXRbMV0ubGVuZ3RoKClcclxuICB9XHJcblxyXG4gIHBvaW50QXQgKHQpIHtcclxuICAgIGlmICh0aGlzLnAxLmVxdWFscyh0aGlzLnAyKSkgcmV0dXJuIHRoaXMucDEuY2xvbmUoKVxyXG5cclxuICAgIGNvbnN0IHRJbkFuZ2xlID0gKHRoaXMudGhldGEgKyB0ICogdGhpcy5kZWx0YSkgLyAxODAgKiBNYXRoLlBJXHJcbiAgICBjb25zdCBzaW7OuCA9IE1hdGguc2luKHRJbkFuZ2xlKVxyXG4gICAgY29uc3QgY29zzrggPSBNYXRoLmNvcyh0SW5BbmdsZSlcclxuXHJcbiAgICByZXR1cm4gbmV3IFBvaW50KFxyXG4gICAgICB0aGlzLmNvc8+GICogdGhpcy5yeCAqIGNvc864IC0gdGhpcy5zaW7PhiAqIHRoaXMucnkgKiBzaW7OuCArIHRoaXMuYy54LFxyXG4gICAgICB0aGlzLnNpbs+GICogdGhpcy5yeSAqIGNvc864ICsgdGhpcy5jb3PPhiAqIHRoaXMucnggKiBzaW7OuCArIHRoaXMuYy55XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzcGxpdEF0ICh0KSB7XHJcbiAgICBjb25zdCBhYnNEZWx0YSA9IE1hdGguYWJzKHRoaXMuZGVsdGEpXHJcbiAgICBjb25zdCBkZWx0YTEgPSBhYnNEZWx0YSAqIHRcclxuICAgIGNvbnN0IGRlbHRhMiA9IGFic0RlbHRhICogKDEgLSB0KVxyXG5cclxuICAgIGNvbnN0IHBvaW50QXRUID0gdGhpcy5wb2ludEF0KHQpXHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgbmV3IEFyYyh0aGlzLnAxLCBwb2ludEF0VCwgdGhpcy5yeCwgdGhpcy5yeSwgdGhpcy5waGksIGRlbHRhMSA+IDE4MCwgdGhpcy5zd2VlcCksXHJcbiAgICAgIG5ldyBBcmMocG9pbnRBdFQsIHRoaXMucDIsIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCBkZWx0YTIgPiAxODAsIHRoaXMuc3dlZXApXHJcbiAgICBdXHJcbiAgfVxyXG5cclxuICB0b1BhdGggKCkge1xyXG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLnAxLngsIHRoaXMucDEueSwgJ0EnLCB0aGlzLnJ4LCB0aGlzLnJ5LCB0aGlzLnBoaSwgdGhpcy5hcmMsIHRoaXMuc3dlZXAsIHRoaXMucDIueCwgdGhpcy5wMi55IF0uam9pbignICcpXHJcbiAgfVxyXG5cclxuICB0b1BhdGhGcmFnbWVudCAoKSB7XHJcbiAgICByZXR1cm4gWyAnQScsIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCB0aGlzLmFyYywgdGhpcy5zd2VlcCwgdGhpcy5wMi54LCB0aGlzLnAyLnkgXVxyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcgKCkge1xyXG4gICAgcmV0dXJuIGBwMTogJHt0aGlzLnAxLngudG9GaXhlZCg0KX0gJHt0aGlzLnAxLnkudG9GaXhlZCg0KX0sIHAyOiAke3RoaXMucDIueC50b0ZpeGVkKDQpfSAke3RoaXMucDIueS50b0ZpeGVkKDQpfSwgYzogJHt0aGlzLmMueC50b0ZpeGVkKDQpfSAke3RoaXMuYy55LnRvRml4ZWQoNCl9IHRoZXRhOiAke3RoaXMudGhldGEudG9GaXhlZCg0KX0sIHRoZXRhMjogJHt0aGlzLnRoZXRhMi50b0ZpeGVkKDQpfSwgZGVsdGE6ICR7dGhpcy5kZWx0YS50b0ZpeGVkKDQpfSwgbGFyZ2U6ICR7dGhpcy5hcmN9LCBzd2VlcDogJHt0aGlzLnN3ZWVwfWBcclxuICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBDdWJpYyB7XHJcbiAgY29uc3RydWN0b3IgKHAxLCBjMSwgYzIsIHAyKSB7XHJcbiAgICBpZiAocDEgaW5zdGFuY2VvZiBQb2ludCkge1xyXG4gICAgICB0aGlzLnAxID0gbmV3IFBvaW50KHAxKVxyXG4gICAgICB0aGlzLmMxID0gbmV3IFBvaW50KGMxKVxyXG4gICAgICB0aGlzLmMyID0gbmV3IFBvaW50KGMyKVxyXG4gICAgICB0aGlzLnAyID0gbmV3IFBvaW50KHAyKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wMSA9IG5ldyBQb2ludChwMS5wMSlcclxuICAgICAgdGhpcy5jMSA9IG5ldyBQb2ludChwMS5jMSlcclxuICAgICAgdGhpcy5jMiA9IG5ldyBQb2ludChwMS5jMilcclxuICAgICAgdGhpcy5wMiA9IG5ldyBQb2ludChwMS5wMilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tUXVhZCAocDEsIGMsIHAyKSB7XHJcbiAgICBjb25zdCBjMSA9IHAxLm11bCgxIC8gMykuYWRkKGMubXVsKDIgLyAzKSlcclxuICAgIGNvbnN0IGMyID0gYy5tdWwoMiAvIDMpLmFkZChwMi5tdWwoMSAvIDMpKVxyXG4gICAgcmV0dXJuIG5ldyBDdWJpYyhwMSwgYzEsIGMyLCBwMilcclxuICB9XHJcblxyXG4gIGJib3ggKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2xvdWQoKS5iYm94KClcclxuICB9XHJcblxyXG4gIGZpbmRSb290cyAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kUm9vdHNYKCkuY29uY2F0KHRoaXMuZmluZFJvb3RzWSgpKVxyXG4gIH1cclxuXHJcbiAgZmluZFJvb3RzWCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kUm9vdHNYWSh0aGlzLnAxLngsIHRoaXMuYzEueCwgdGhpcy5jMi54LCB0aGlzLnAyLngpXHJcbiAgfVxyXG5cclxuICBmaW5kUm9vdHNYWSAocDEsIHAyLCBwMywgcDQpIHtcclxuICAgIGNvbnN0IGEgPSAzICogKC1wMSArIDMgKiBwMiAtIDMgKiBwMyArIHA0KVxyXG4gICAgY29uc3QgYiA9IDYgKiAocDEgLSAyICogcDIgKyBwMylcclxuICAgIGNvbnN0IGMgPSAzICogKHAyIC0gcDEpXHJcblxyXG4gICAgaWYgKGEgPT09IDApIHJldHVybiBbIC1jIC8gYiBdLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsID4gMCAmJiBlbCA8IDEgfSlcclxuXHJcbiAgICBpZiAoYiAqIGIgLSA0ICogYSAqIGMgPCAwKSByZXR1cm4gW11cclxuICAgIGlmIChiICogYiAtIDQgKiBhICogYyA9PT0gMCkgcmV0dXJuIFsgTWF0aC5yb3VuZCgoLWIgLyAoMiAqIGEpKSAqIDEwMDAwMCkgLyAxMDAwMDAgXS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbCA+IDAgJiYgZWwgPCAxIH0pXHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgTWF0aC5yb3VuZCgoLWIgKyBNYXRoLnNxcnQoYiAqIGIgLSA0ICogYSAqIGMpKSAvICgyICogYSkgKiAxMDAwMDApIC8gMTAwMDAwLFxyXG4gICAgICBNYXRoLnJvdW5kKCgtYiAtIE1hdGguc3FydChiICogYiAtIDQgKiBhICogYykpIC8gKDIgKiBhKSAqIDEwMDAwMCkgLyAxMDAwMDBcclxuICAgIF0uZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwgPiAwICYmIGVsIDwgMSB9KVxyXG4gIH1cclxuXHJcbiAgZmluZFJvb3RzWSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kUm9vdHNYWSh0aGlzLnAxLnksIHRoaXMuYzEueSwgdGhpcy5jMi55LCB0aGlzLnAyLnkpXHJcbiAgfVxyXG5cclxuICBmbGF0bmVzcyAoKSB7XHJcbiAgICBsZXQgdXggPSBNYXRoLnBvdygzICogdGhpcy5jMS54IC0gMiAqIHRoaXMucDEueCAtIHRoaXMucDIueCwgMilcclxuICAgIGxldCB1eSA9IE1hdGgucG93KDMgKiB0aGlzLmMxLnkgLSAyICogdGhpcy5wMS55IC0gdGhpcy5wMi55LCAyKVxyXG4gICAgY29uc3QgdnggPSBNYXRoLnBvdygzICogdGhpcy5jMi54IC0gMiAqIHRoaXMucDIueCAtIHRoaXMucDEueCwgMilcclxuICAgIGNvbnN0IHZ5ID0gTWF0aC5wb3coMyAqIHRoaXMuYzIueSAtIDIgKiB0aGlzLnAyLnkgLSB0aGlzLnAxLnksIDIpXHJcblxyXG4gICAgaWYgKHV4IDwgdngpIHsgdXggPSB2eCB9XHJcbiAgICBpZiAodXkgPCB2eSkgeyB1eSA9IHZ5IH1cclxuXHJcbiAgICByZXR1cm4gdXggKyB1eVxyXG4gIH1cclxuXHJcbiAgZ2V0Q2xvdWQgKCkge1xyXG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5maW5kUm9vdHMoKVxyXG4gICAgICAuZmlsdGVyKHJvb3QgPT4gcm9vdCAhPT0gMCAmJiByb290ICE9PSAxKVxyXG4gICAgICAubWFwKHJvb3QgPT4gdGhpcy5wb2ludEF0KHJvb3QpKVxyXG4gICAgICAuY29uY2F0KHRoaXMucDEsIHRoaXMucDIpXHJcblxyXG4gICAgcmV0dXJuIG5ldyBQb2ludENsb3VkKHBvaW50cylcclxuICB9XHJcblxyXG4gIGxlbmd0aCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sZW5ndGhBdCgpXHJcbiAgfVxyXG5cclxuICBsZW5ndGhBdCAodCA9IDEpIHtcclxuICAgIGNvbnN0IGN1cnZlcyA9IHRoaXMuc3BsaXRBdCh0KVswXS5tYWtlRmxhdCh0KVxyXG5cclxuICAgIGxldCBsZW5ndGggPSAwXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY3VydmVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGxlbmd0aCArPSBjdXJ2ZXNbaV0ucDIuc3ViKGN1cnZlc1tpXS5wMSkuYWJzKClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGVuZ3RoXHJcbiAgfVxyXG5cclxuICBtYWtlRmxhdCAodCkge1xyXG4gICAgaWYgKHRoaXMuZmxhdG5lc3MoKSA+IDAuMTUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3BsaXRBdCgwLjUpXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLm1ha2VGbGF0KHQgKiAwLjUpIH0pXHJcbiAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAobGFzdCwgY3VycmVudCkgeyByZXR1cm4gbGFzdC5jb25jYXQoY3VycmVudCkgfSwgW10pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRfdmFsdWUgPSB0XHJcbiAgICAgIHJldHVybiBbIHRoaXMgXVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9pbnRBdCAodCkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludChcclxuICAgICAgKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpICogdGhpcy5wMS54ICsgMyAqICgxIC0gdCkgKiAoMSAtIHQpICogdCAqIHRoaXMuYzEueCArIDMgKiAoMSAtIHQpICogdCAqIHQgKiB0aGlzLmMyLnggKyB0ICogdCAqIHQgKiB0aGlzLnAyLngsXHJcbiAgICAgICgxIC0gdCkgKiAoMSAtIHQpICogKDEgLSB0KSAqIHRoaXMucDEueSArIDMgKiAoMSAtIHQpICogKDEgLSB0KSAqIHQgKiB0aGlzLmMxLnkgKyAzICogKDEgLSB0KSAqIHQgKiB0ICogdGhpcy5jMi55ICsgdCAqIHQgKiB0ICogdGhpcy5wMi55XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzcGxpdEF0ICh6KSB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy5zcGxpdEF0U2NhbGFyKHosICd4JylcclxuICAgIGNvbnN0IHkgPSB0aGlzLnNwbGl0QXRTY2FsYXIoeiwgJ3knKVxyXG5cclxuICAgIGNvbnN0IGEgPSBuZXcgQ3ViaWMoXHJcbiAgICAgIG5ldyBQb2ludCh4WzBdWzBdLCB5WzBdWzBdKSxcclxuICAgICAgbmV3IFBvaW50KHhbMF1bMV0sIHlbMF1bMV0pLFxyXG4gICAgICBuZXcgUG9pbnQoeFswXVsyXSwgeVswXVsyXSksXHJcbiAgICAgIG5ldyBQb2ludCh4WzBdWzNdLCB5WzBdWzNdKVxyXG4gICAgKVxyXG5cclxuICAgIGNvbnN0IGIgPSBuZXcgQ3ViaWMoXHJcbiAgICAgIG5ldyBQb2ludCh4WzFdWzBdLCB5WzFdWzBdKSxcclxuICAgICAgbmV3IFBvaW50KHhbMV1bMV0sIHlbMV1bMV0pLFxyXG4gICAgICBuZXcgUG9pbnQoeFsxXVsyXSwgeVsxXVsyXSksXHJcbiAgICAgIG5ldyBQb2ludCh4WzFdWzNdLCB5WzFdWzNdKVxyXG4gICAgKVxyXG5cclxuICAgIHJldHVybiBbIGEsIGIgXVxyXG4gIH1cclxuXHJcbiAgc3BsaXRBdFNjYWxhciAoeiwgcCkge1xyXG4gICAgY29uc3QgcDEgPSB0aGlzLnAxW3BdXHJcbiAgICBjb25zdCBwMiA9IHRoaXMuYzFbcF1cclxuICAgIGNvbnN0IHAzID0gdGhpcy5jMltwXVxyXG4gICAgY29uc3QgcDQgPSB0aGlzLnAyW3BdXHJcblxyXG4gICAgY29uc3QgdCA9IHogKiB6ICogeiAqIHA0IC0gMyAqIHogKiB6ICogKHogLSAxKSAqIHAzICsgMyAqIHogKiAoeiAtIDEpICogKHogLSAxKSAqIHAyIC0gKHogLSAxKSAqICh6IC0gMSkgKiAoeiAtIDEpICogcDFcclxuXHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBbXHJcbiAgICAgICAgcDEsXHJcbiAgICAgICAgeiAqIHAyIC0gKHogLSAxKSAqIHAxLFxyXG4gICAgICAgIHogKiB6ICogcDMgLSAyICogeiAqICh6IC0gMSkgKiBwMiArICh6IC0gMSkgKiAoeiAtIDEpICogcDEsXHJcbiAgICAgICAgdFxyXG4gICAgICBdLFxyXG4gICAgICBbXHJcbiAgICAgICAgdCxcclxuICAgICAgICB6ICogeiAqIHA0IC0gMiAqIHogKiAoeiAtIDEpICogcDMgKyAoeiAtIDEpICogKHogLSAxKSAqIHAyLFxyXG4gICAgICAgIHogKiBwNCAtICh6IC0gMSkgKiBwMyxcclxuICAgICAgICBwNFxyXG4gICAgICBdXHJcbiAgICBdXHJcbiAgfVxyXG5cclxuICB0b1BhdGggKCkge1xyXG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLnAxLngsIHRoaXMucDEueSBdLmNvbmNhdCh0aGlzLnRvUGF0aEZyYWdtZW50KCkpLmpvaW4oJyAnKVxyXG4gIH1cclxuXHJcbiAgdG9QYXRoRnJhZ21lbnQgKCkge1xyXG4gICAgcmV0dXJuIFsgJ0MnLCB0aGlzLmMxLngsIHRoaXMuYzEueSwgdGhpcy5jMi54LCB0aGlzLmMyLnksIHRoaXMucDIueCwgdGhpcy5wMi55IF1cclxuICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBMaW5lIHtcclxuICBjb25zdHJ1Y3RvciAoeDEsIHkxLCB4MiwgeTIpIHtcclxuICAgIGlmICh4MSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICB0aGlzLnAxID0gbmV3IFBvaW50KHgxKVxyXG4gICAgICB0aGlzLnAyID0gbmV3IFBvaW50KHkxKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wMSA9IG5ldyBQb2ludCh4MSwgeTEpXHJcbiAgICAgIHRoaXMucDIgPSBuZXcgUG9pbnQoeDIsIHkyKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYmJveCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDbG91ZCgpLmJib3goKVxyXG4gIH1cclxuXHJcbiAgZ2V0Q2xvdWQgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludENsb3VkKFsgdGhpcy5wMSwgdGhpcy5wMiBdKVxyXG4gIH1cclxuXHJcbiAgbGVuZ3RoICgpIHtcclxuICAgIHJldHVybiB0aGlzLnAyLnN1Yih0aGlzLnAxKS5hYnMoKVxyXG4gIH1cclxuXHJcbiAgcG9pbnRBdCAodCkge1xyXG4gICAgY29uc3QgdmVjID0gdGhpcy5wMi5zdWIodGhpcy5wMSkubXVsKHQpXHJcbiAgICByZXR1cm4gdGhpcy5wMS5hZGQodmVjKVxyXG4gIH1cclxuXHJcbiAgdG9QYXRoICgpIHtcclxuICAgIHJldHVybiBbICdNJywgdGhpcy5wMS54LCB0aGlzLnAxLnksIHRoaXMucDIueCwgdGhpcy5wMi55IF0uam9pbignICcpXHJcbiAgfVxyXG5cclxuICB0b1BhdGhGcmFnbWVudCAoKSB7XHJcbiAgICByZXR1cm4gWyAnTCcsIHRoaXMucDIueCwgdGhpcy5wMi55IF1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwYXRoQkJveCA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgcmV0dXJuIHBhdGhQYXJzZXIoZCkucmVkdWNlKChsLCBjKSA9PiBsLm1lcmdlKGMuYmJveCgpKSwgbmV3IE5vQm94KCkpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwb2ludEF0TGVuZ3RoID0gZnVuY3Rpb24gKGQsIGxlbikge1xyXG4gIGNvbnN0IHNlZ3MgPSBwYXRoUGFyc2VyKGQpXHJcblxyXG4gIGNvbnN0IHNlZ0xlbmd0aHMgPSBzZWdzLm1hcChlbCA9PiBlbC5sZW5ndGgoKSlcclxuXHJcbiAgY29uc3QgbGVuZ3RoID0gc2VnTGVuZ3Rocy5yZWR1Y2UoKGwsIGMpID0+IGwgKyBjLCAwKVxyXG5cclxuICBsZXQgaSA9IDBcclxuXHJcbiAgbGV0IHQgPSBsZW4gLyBsZW5ndGhcclxuXHJcbiAgLy8gRklYTUU6IFBvcCBNb3ZlIGJlZm9yZSB1c2luZyBzaG9ydGN1dD9cclxuICAvLyBzaG9ydGN1dCBmb3IgdHJpdmlhbCBjYXNlc1xyXG4gIGlmICh0ID49IDEpIHtcclxuICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgcDIuIElmIG5vdCwgdXNlIHAxXHJcbiAgICBpZiAoc2Vnc1tzZWdzLmxlbmd0aCAtIDFdLnAyKSB7XHJcbiAgICAgIHJldHVybiBzZWdzW3NlZ3MubGVuZ3RoIC0gMV0ucDIubmF0aXZlKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBzZWdzW3NlZ3MubGVuZ3RoIC0gMV0ucDEubmF0aXZlKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICh0IDw9IDApIHJldHVybiBzZWdzWzBdLnAxLm5hdGl2ZSgpXHJcblxyXG4gIC8vIHJlbW92ZSBtb3ZlIGNvbW1hbmRzIGF0IHRoZSB2ZXJ5IGVuZCBvZiB0aGUgcGF0aFxyXG4gIHdoaWxlIChzZWdzW3NlZ3MubGVuZ3RoIC0gMV0gaW5zdGFuY2VvZiBNb3ZlKSBzZWdzLnBvcCgpXHJcblxyXG4gIGxldCBzZWdFbmQgPSAwXHJcblxyXG4gIGZvciAoY29uc3QgaWwgPSBzZWdMZW5ndGhzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcclxuICAgIGNvbnN0IGsgPSBzZWdMZW5ndGhzW2ldIC8gbGVuZ3RoXHJcbiAgICBzZWdFbmQgKz0ga1xyXG5cclxuICAgIGlmIChzZWdFbmQgPiB0KSB7XHJcbiAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCByYXRpbyA9IGxlbmd0aCAvIHNlZ0xlbmd0aHNbaV1cclxuICB0ID0gcmF0aW8gKiAodCAtIHNlZ0VuZCkgKyAxXHJcblxyXG4gIHJldHVybiBzZWdzW2ldLnBvaW50QXQodCkubmF0aXZlKClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGxlbmd0aCA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgcmV0dXJuIHBhdGhQYXJzZXIoZClcclxuICAgIC5yZWR1Y2UoKGwsIGMpID0+IGwgKyBjLmxlbmd0aCgpLCAwKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGVidWcgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gIGNvbnN0IHBhcnNlID0gcGF0aFBhcnNlcihub2RlLmdldEF0dHJpYnV0ZSgnZCcpKVxyXG5cclxuICBjb25zdCByZXQgPSB7XHJcbiAgICBwYXRoczogcGFyc2UubWFwKGVsID0+IGVsLnRvUGF0aCgpKSxcclxuICAgIGZyYWdtZW50czogcGFyc2UubWFwKGVsID0+IGVsLnRvUGF0aEZyYWdtZW50KCkuam9pbignICcpKSxcclxuICAgIGJib3hzOiBwYXJzZS5tYXAoZWwgPT4ge1xyXG4gICAgICBjb25zdCBib3ggPSBlbC5iYm94KClcclxuICAgICAgcmV0dXJuIFsgYm94LngsIGJveC55LCBib3gud2lkdGgsIGJveC5oZWlnaHQgXVxyXG4gICAgfSksXHJcbiAgICBiYm94OiBwYXJzZS5yZWR1Y2UoKGwsIGMpID0+IGwubWVyZ2UoYy5iYm94KCkpLCBuZXcgTm9Cb3goKSksXHJcbiAgICBiYm94c19uZXc6IHBhcnNlLm1hcChlbCA9PiB7XHJcbiAgICAgIHJldHVybiBlbC5nZXRDbG91ZCgpLnRyYW5zZm9ybShub2RlLm1hdHJpeGlmeSgpKS5iYm94KClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcmV0LCB7XHJcbiAgICBiYm94X25ldzogcmV0LmJib3hzX25ldy5yZWR1Y2UoKGwsIGMpID0+IGwubWVyZ2UoYyksIG5ldyBOb0JveCgpKVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDbG91ZCA9IChkKSA9PiB7XHJcbiAgcmV0dXJuIHBhdGhQYXJzZXIoZCkucmVkdWNlKChjbG91ZCwgc2VnbWVudCkgPT5cclxuICAgIHNlZ21lbnQuZ2V0Q2xvdWQoKS5tZXJnZShjbG91ZCksIG5ldyBQb2ludENsb3VkKClcclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwYXRoRnJvbSA9IHtcclxuICBib3ggKHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9KSB7XHJcbiAgICByZXR1cm4gYE0gJHt4fSAke3l9IGggJHt3aWR0aH0gdiAke2hlaWdodH0gSCAke3h9IFYgJHt5fWBcclxuICB9LFxyXG4gIHJlY3QgKG5vZGUpIHtcclxuICAgIGNvbnN0IHdpZHRoID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSkgfHwgMFxyXG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpIHx8IDBcclxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd4JykpIHx8IDBcclxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd5JykpIHx8IDBcclxuICAgIHJldHVybiBgTSAke3h9ICR7eX0gaCAke3dpZHRofSB2ICR7aGVpZ2h0fSBIICR7eH0gViAke3l9YFxyXG4gIH0sXHJcbiAgY2lyY2xlIChub2RlKSB7XHJcbiAgICBjb25zdCByID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgncicpKSB8fCAwXHJcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnY3gnKSkgfHwgMFxyXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ2N5JykpIHx8IDBcclxuXHJcbiAgICBpZiAociA9PT0gMCkgcmV0dXJuICdNMCAwJ1xyXG5cclxuICAgIHJldHVybiBgTSAke3ggLSByfSAke3l9IEEgJHtyfSAke3J9IDAgMCAwICR7eCArIHJ9ICR7eX0gQSAke3J9ICR7cn0gMCAwIDAgJHt4IC0gcn0gJHt5fWBcclxuICB9LFxyXG4gIGVsbGlwc2UgKG5vZGUpIHtcclxuICAgIGNvbnN0IHJ4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgncngnKSkgfHwgMFxyXG4gICAgY29uc3QgcnkgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCdyeScpKSB8fCAwXHJcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnY3gnKSkgfHwgMFxyXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ2N5JykpIHx8IDBcclxuXHJcbiAgICByZXR1cm4gYE0gJHt4IC0gcnh9ICR7eX0gQSAke3J4fSAke3J5fSAwIDAgMCAke3ggKyByeH0gJHt5fSBBICR7cnh9ICR7cnl9IDAgMCAwICR7eCAtIHJ4fSAke3l9YFxyXG4gIH0sXHJcbiAgbGluZSAobm9kZSkge1xyXG4gICAgY29uc3QgeDEgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd4MScpKSB8fCAwXHJcbiAgICBjb25zdCB4MiA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3gyJykpIHx8IDBcclxuICAgIGNvbnN0IHkxID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneTEnKSkgfHwgMFxyXG4gICAgY29uc3QgeTIgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd5MicpKSB8fCAwXHJcblxyXG4gICAgcmV0dXJuIGBNICR7eDF9ICR7eTF9IEwgJHt4Mn0gJHt5Mn1gXHJcbiAgfSxcclxuICBwb2x5Z29uIChub2RlKSB7XHJcbiAgICByZXR1cm4gYE0gJHtub2RlLmdldEF0dHJpYnV0ZSgncG9pbnRzJyl9IHpgXHJcbiAgfSxcclxuICBwb2x5bGluZSAobm9kZSkge1xyXG4gICAgcmV0dXJuIGBNICR7bm9kZS5nZXRBdHRyaWJ1dGUoJ3BvaW50cycpfWBcclxuICB9XHJcbn1cclxuIiwiLy8gc3BsaXRzIGEgdHJhbnNmb3JtYXRpb24gY2hhaW5cclxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybXMgPSAvXFwpXFxzKiw/XFxzKi9cclxuXHJcbi8vIHNwbGl0IGF0IHdoaXRlc3BhY2UgYW5kIGNvbW1hXHJcbmV4cG9ydCBjb25zdCBkZWxpbWl0ZXIgPSAvW1xccyxdKy9cclxuXHJcbi8vIFRoZSBmb2xsb3dpbmcgcmVnZXggYXJlIHVzZWQgdG8gcGFyc2UgdGhlIGQgYXR0cmlidXRlIG9mIGEgcGF0aFxyXG5cclxuLy8gTWF0Y2hlcyBhbGwgaHlwaGVucyB3aGljaCBhcmUgbm90IGFmdGVyIGFuIGV4cG9uZW50XHJcbmV4cG9ydCBjb25zdCBoeXBoZW4gPSAvKFteZV0pLS9naVxyXG5cclxuLy8gUmVwbGFjZXMgYW5kIHRlc3RzIGZvciBhbGwgcGF0aCBsZXR0ZXJzXHJcbmV4cG9ydCBjb25zdCBwYXRoTGV0dGVycyA9IC9bTUxIVkNTUVRBWl0vZ2lcclxuXHJcbi8vIHllcyB3ZSBuZWVkIHRoaXMgb25lLCB0b29cclxuZXhwb3J0IGNvbnN0IGlzUGF0aExldHRlciA9IC9bTUxIVkNTUVRBWl0vaVxyXG5cclxuLy8gbWF0Y2hlcyAwLjE1NC4yMy40NVxyXG5leHBvcnQgY29uc3QgbnVtYmVyc1dpdGhEb3RzID0gLygoXFxkP1xcLlxcZCsoPzplWystXT9cXGQrKT8pKCg/OlxcLlxcZCsoPzplWystXT9cXGQrKT8pKykpKy9naVxyXG5cclxuLy8gbWF0Y2hlcyAuXHJcbmV4cG9ydCBjb25zdCBkb3RzID0gL1xcLi9nXHJcbiIsIi8vIEVuc3VyZSB0byBzaXgtYmFzZWQgaGV4XHJcbmV4cG9ydCBjb25zdCBmdWxsSGV4ID0gZnVuY3Rpb24gKGhleCkge1xyXG4gIHJldHVybiBoZXgubGVuZ3RoID09PSA0XHJcbiAgICA/IFsgJyMnLFxyXG4gICAgICBoZXguc3Vic3RyaW5nKDEsIDIpLCBoZXguc3Vic3RyaW5nKDEsIDIpLFxyXG4gICAgICBoZXguc3Vic3RyaW5nKDIsIDMpLCBoZXguc3Vic3RyaW5nKDIsIDMpLFxyXG4gICAgICBoZXguc3Vic3RyaW5nKDMsIDQpLCBoZXguc3Vic3RyaW5nKDMsIDQpXHJcbiAgICBdLmpvaW4oJycpIDogaGV4XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBoZXhUb1JHQiA9IGZ1bmN0aW9uICh2YWxPck1hcCkge1xyXG4gIGlmICh0eXBlb2YgdmFsT3JNYXAgaW5zdGFuY2VvZiBNYXApIHtcclxuICAgIGZvciAoY29uc3QgWyBrZXksIHZhbCBdIG9mIHZhbE9yTWFwKSB7XHJcbiAgICAgIHZhbE9yTWFwLnNldChrZXksIGhleFRvUkdCKHZhbCkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsT3JNYXBcclxuICB9XHJcblxyXG4gIGlmICghLyNbMC05YS1mXXszLDZ9Ly50ZXN0KHZhbE9yTWFwKSkgeyByZXR1cm4gdmFsT3JNYXAgfVxyXG5cclxuICB2YWxPck1hcCA9IGZ1bGxIZXgodmFsT3JNYXApXHJcblxyXG4gIHJldHVybiAncmdiKCcgKyBbXHJcbiAgICBwYXJzZUludCh2YWxPck1hcC5zbGljZSgxLCAzKSwgMTYpLFxyXG4gICAgcGFyc2VJbnQodmFsT3JNYXAuc2xpY2UoMywgNSksIDE2KSxcclxuICAgIHBhcnNlSW50KHZhbE9yTWFwLnNsaWNlKDUsIDcpLCAxNilcclxuICBdLmpvaW4oJywnKSArICcpJ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVjYW1lbGl6ZSAocykge1xyXG4gIHJldHVybiBTdHJpbmcocykucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgZnVuY3Rpb24gKG0sIGcxLCBnMikge1xyXG4gICAgcmV0dXJuIGcxICsgJy0nICsgZzIudG9Mb3dlckNhc2UoKVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW1lbENhc2UgKHMpIHtcclxuICByZXR1cm4gU3RyaW5nKHMpLnJlcGxhY2UoLyhbYS16XSktKFthLXpdKS9nLCBmdW5jdGlvbiAobSwgZzEsIGcyKSB7XHJcbiAgICByZXR1cm4gZzEgKyBnMi50b1VwcGVyQ2FzZSgpXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVF1b3RlcyAoc3RyKSB7XHJcbiAgaWYgKHN0ci5zdGFydHNXaXRoKCdcIicpIHx8IHN0ci5zdGFydHNXaXRoKFwiJ1wiKSkge1xyXG4gICAgcmV0dXJuIHN0ci5zbGljZSgxLCAtMSlcclxuICB9XHJcbiAgcmV0dXJuIHN0clxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaHRtbEVudGl0aWVzIChzdHIpIHtcclxuICByZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW5odG1sRW50aXRpZXMgKHN0cikge1xyXG4gIHJldHVybiBTdHJpbmcoc3RyKS5yZXBsYWNlKC8mYW1wOy9nLCAnJicpLnJlcGxhY2UoLyZsdDsvZywgJzwnKS5yZXBsYWNlKC8mZ3Q7L2csICc+JykucmVwbGFjZSgnJnF1b3Q7JywgJ1wiJylcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNkYXRhIChzdHIpIHtcclxuICByZXR1cm4gYDwhW0NEQVRBWyR7c3RyfV1dPmBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1lbnQgKHN0cikge1xyXG4gIHJldHVybiBgPCEtLSR7c3RyfS0tPmBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNwbGl0Tm90SW5CcmFja2V0cyA9IChzdHIsIGRlbGltaXRlcikgPT4ge1xyXG4gIHZhciByb3VuZEJyYWNrZXRzID0gMFxyXG5cclxuICB2YXIgc3F1YXJlQnJhY2tldHMgPSAwXHJcblxyXG4gIHZhciBsYXN0SW5kZXggPSAwXHJcblxyXG4gIHZhciBzcGxpdCA9IFtdXHJcblxyXG4gIHZhciBjaDsgdmFyIGk7IHZhciBpbFxyXG5cclxuICBmb3IgKGkgPSAwLCBpbCA9IHN0ci5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XHJcbiAgICBjaCA9IHN0ci5jaGFyQXQoaSlcclxuXHJcbiAgICBpZiAoY2ggPT09IGRlbGltaXRlciAmJiAhcm91bmRCcmFja2V0cyAmJiAhc3F1YXJlQnJhY2tldHMpIHtcclxuICAgICAgc3BsaXQucHVzaChzdHIuc2xpY2UobGFzdEluZGV4LCBpKS50cmltKCkpXHJcbiAgICAgIGxhc3RJbmRleCA9IGkgKyAxXHJcbiAgICAgIGNvbnRpbnVlXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoID09PSAnKCcpICsrcm91bmRCcmFja2V0c1xyXG4gICAgZWxzZSBpZiAoY2ggPT09ICcpJykgLS1yb3VuZEJyYWNrZXRzXHJcbiAgICBlbHNlIGlmIChjaCA9PT0gJ1snKSArK3NxdWFyZUJyYWNrZXRzXHJcbiAgICBlbHNlIGlmIChjaCA9PT0gJ10nKSAtLXNxdWFyZUJyYWNrZXRzXHJcbiAgfVxyXG5cclxuICBzcGxpdC5wdXNoKHN0ci5zbGljZShsYXN0SW5kZXgpLnRyaW0oKSlcclxuICByZXR1cm4gc3BsaXRcclxufVxyXG4iLCJjb25zdCBodG1sRW50aXRpZXMgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgcmV0dXJuIFN0cmluZyhzdHIpLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcclxufVxyXG5cclxudmFyIGVtcHR5RWxlbWVudHMgPSB7XHJcbiAgYnI6IHRydWUsXHJcbiAgaHI6IHRydWUsXHJcbiAgaW1nOiB0cnVlLFxyXG4gIGxpbms6IHRydWVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRhZyA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgY29uc3QgYXR0cnMgPSBbIC4uLm5vZGUuYXR0cnMgXS5tYXAoZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgIHJldHVybiAobm9kZS5wcmVmaXggPyBub2RlLnByZWZpeCArICc6JyA6ICcnKSArIG5vZGUubG9jYWxOYW1lICsgJz1cIicgKyBodG1sRW50aXRpZXMobm9kZS52YWx1ZSkgKyAnXCInXHJcbiAgfSlcclxuXHJcbiAgY29uc3QgeyBwcmVmaXgsIGxvY2FsTmFtZSB9ID0gbm9kZVxyXG4gIGNvbnN0IHF1YWxpZmllZE5hbWUgPSAocHJlZml4ID8gcHJlZml4ICsgJzonIDogJycpICsgbG9jYWxOYW1lXHJcblxyXG4gIHJldHVybiAnPCcgKyBbXS5jb25jYXQocXVhbGlmaWVkTmFtZSwgYXR0cnMpLmpvaW4oJyAnKSArICc+JyArIChlbXB0eUVsZW1lbnRzW3F1YWxpZmllZE5hbWUudG9Mb3dlckNhc2UoKV0gPyAnJyA6IG5vZGUuaW5uZXJIVE1MICsgJzwvJyArIHF1YWxpZmllZE5hbWUgKyAnPicpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjbG9uZU5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xyXG5cclxuICBjb25zdCB7IHByZWZpeCwgbG9jYWxOYW1lLCBuYW1lc3BhY2VVUkk6IG5zLCBub2RlVmFsdWUsIG93bmVyRG9jdW1lbnQgfSA9IG5vZGVcclxuXHJcbiAgLy8gQnVpbGQgdXAgdGhlIGNvcnJlY3RseSBjYXNlZCBxdWFsaWZpZWQgbmFtZVxyXG4gIGNvbnN0IHF1YWxpZmllZE5hbWUgPSAocHJlZml4ID8gcHJlZml4ICsgJzonIDogJycpICsgbG9jYWxOYW1lXHJcblxyXG4gIC8vIENoZWNrIGlmIG5vZGUgd2FzIGNyZWF0ZWQgdXNpbmcgbm9uLW5hbWVzcGFjZSBmdW5jdGlvbiB3aGljaCBjYW4gbGVhZCB0byA6IGluIHRoZSBsb2NhbE5hbWUuXHJcbiAgLy8gVGhpcyBjaGVjayBhbGxvd3MgZmFsc2UgbmVnYXRpdmVzIGJlY2F1c2UgYGxvY2FsYCBvbmx5IG1hdHRlcnMgSUYgdGhlcmUgYXJlIDogaW4gdGhlIGxvY2FsTmFtZVxyXG4gIC8vIGFuZCB3ZSBkb250IGNhcmUgYWJvdXQgaXQgd2hlbiB0aGVyZSBhcmUgbm9uXHJcbiAgY29uc3QgbG9jYWwgPSBsb2NhbE5hbWUuaW5jbHVkZXMoJzonKVxyXG5cclxuICB2YXIgY2xvbmUgPSBuZXcgbm9kZS5jb25zdHJ1Y3RvcihxdWFsaWZpZWROYW1lLCB7XHJcbiAgICBhdHRyczogbmV3IFNldChbIC4uLm5vZGUuYXR0cnMgXS5tYXAobm9kZSA9PiBub2RlLmNsb25lTm9kZSgpKSksXHJcbiAgICBub2RlVmFsdWUsXHJcbiAgICBvd25lckRvY3VtZW50LFxyXG4gICAgbG9jYWxcclxuICB9LCBucylcclxuXHJcbiAgcmV0dXJuIGNsb25lXHJcbn1cclxuIiwiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IGZvbnRraXQgZnJvbSAnZm9udGtpdCdcclxuaW1wb3J0ICogYXMgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cy5qcydcclxuaW1wb3J0IHsgQm94LCBOb0JveCB9IGZyb20gJy4uL290aGVyL0JveC5qcydcclxuaW1wb3J0IHsgZ2V0Q29uZmlnLCBnZXRGb250cyB9IGZyb20gJy4uL2NvbmZpZy5qcydcclxuXHJcbmV4cG9ydCBjb25zdCB0ZXh0QkJveCA9IGZ1bmN0aW9uICh0ZXh0LCB4LCB5LCBkZXRhaWxzKSB7XHJcblxyXG4gIGlmICghdGV4dCkgcmV0dXJuIG5ldyBOb0JveCgpXHJcblxyXG4gIGNvbnN0IGNvbmZpZyA9IGdldENvbmZpZygpXHJcbiAgY29uc3QgcHJlbG9hZGVkID0gZ2V0Rm9udHMoKVxyXG5cclxuICB2YXIgZmFtaWxpZXMgPSAoZGV0YWlscy5mb250RmFtaWx5IHx8IGRlZmF1bHRzLmZvbnRGYW1pbHkpLnNwbGl0KC9cXHMqLFxccyovKVxyXG4gIHZhciBmb250TWFwID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMuZm9udEZhbWlseU1hcHBpbmdzLCBjb25maWcuZm9udEZhbWlseU1hcHBpbmdzKVxyXG4gIHZhciBmb250U2l6ZSA9IGRldGFpbHMuZm9udFNpemUgfHwgZGVmYXVsdHMuZm9udFNpemVcclxuICB2YXIgZm9udERpciA9IGNvbmZpZy5mb250RGlyIHx8IGRlZmF1bHRzLmZvbnREaXJcclxuICB2YXIgZm9udEZhbWlseVxyXG4gIHZhciBmb250XHJcblxyXG4gIGZvciAodmFyIGkgPSAwLCBpbCA9IGZhbWlsaWVzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcclxuICAgIGlmIChmb250TWFwW2ZhbWlsaWVzW2ldXSkge1xyXG4gICAgICBmb250RmFtaWx5ID0gZmFtaWxpZXNbaV1cclxuICAgICAgYnJlYWtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICghZm9udEZhbWlseSkge1xyXG4gICAgZm9udEZhbWlseSA9IGRlZmF1bHRzLmZvbnRGYW1pbHlcclxuICB9XHJcblxyXG4gIGlmIChwcmVsb2FkZWRbZm9udEZhbWlseV0pIHtcclxuICAgIGZvbnQgPSBwcmVsb2FkZWRbZm9udEZhbWlseV1cclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmpvaW4oZm9udERpciwgZm9udE1hcFtmb250RmFtaWx5XSlcclxuICAgIHRyeSB7XHJcbiAgICAgIGZvbnQgPSBmb250a2l0Lm9wZW5TeW5jKGZpbGVuYW1lKVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBvcGVuIGZvbnQgXCIke2ZvbnRGYW1pbHl9XCIgaW4gZmlsZSBcIiR7ZmlsZW5hbWV9XCIuICR7ZS50b1N0cmluZygpfWApXHJcbiAgICAgIHJldHVybiBuZXcgTm9Cb3goKVxyXG4gICAgfVxyXG5cclxuICAgIHByZWxvYWRlZFtmb250RmFtaWx5XSA9IGZvbnRcclxuICB9XHJcblxyXG4gIHZhciBmb250SGVpZ2h0ID0gZm9udC5hc2NlbnQgLSBmb250LmRlc2NlbnRcclxuICB2YXIgbGluZUhlaWdodCA9IGZvbnRIZWlnaHQgPiBmb250LnVuaXRzUGVyRW0gPyBmb250SGVpZ2h0IDogZm9udEhlaWdodCArIGZvbnQubGluZUdhcFxyXG5cclxuICB2YXIgaGVpZ2h0ID0gbGluZUhlaWdodCAvIGZvbnQudW5pdHNQZXJFbSAqIGZvbnRTaXplXHJcbiAgdmFyIHdpZHRoID0gZm9udC5sYXlvdXQodGV4dCkuZ2x5cGhzLnJlZHVjZSgobGFzdCwgY3VycikgPT4gbGFzdCArIGN1cnIuYWR2YW5jZVdpZHRoLCAwKSAvIGZvbnQudW5pdHNQZXJFbSAqIGZvbnRTaXplXHJcblxyXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvdGV4dC1hbmNob3JcclxuICB2YXIgeEFkanVzdCA9IDBcclxuICBpZiAoZGV0YWlscy50ZXh0QW5jaG9yID09PSAnZW5kJykge1xyXG4gICAgeEFkanVzdCA9IC13aWR0aFxyXG4gIH0gZWxzZSBpZiAoZGV0YWlscy50ZXh0QW5jaG9yID09PSAnbWlkZGxlJykge1xyXG4gICAgeEFkanVzdCA9IC13aWR0aCAvIDJcclxuICB9XHJcblxyXG4gIC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi8yMDAyL1dELWNzczMtbGluZWJveC0yMDAyMDUxNS9cclxuICAvLyA0LjIuIEJhc2VsaW5lIGlkZW50aWZpZXJzXHJcbiAgdmFyIHlBZGp1c3QgPSBmb250LmFzY2VudCAvLyBhbHBoYWJldGljXHJcbiAgaWYgKGRldGFpbHMuZG9taW5hbnRCYXNlbGluZSA9PT0gJ2JlZm9yZS1lZGdlJyB8fCBkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICd0ZXh0LWJlZm9yZS1lZGdlJykge1xyXG4gICAgeUFkanVzdCA9IDBcclxuICB9IGVsc2UgaWYgKGRldGFpbHMuZG9taW5hbnRCYXNlbGluZSA9PT0gJ2hhbmdpbmcnKSB7XHJcbiAgICB5QWRqdXN0ID0gZm9udC5hc2NlbnQgLSBmb250LnhIZWlnaHQgLSBmb250LmNhcEhlaWdodFxyXG4gIH0gZWxzZSBpZiAoZGV0YWlscy5kb21pbmFudEJhc2VsaW5lID09PSAnbWF0aGVtYXRpY2FsJykge1xyXG4gICAgeUFkanVzdCA9IGZvbnQuYXNjZW50IC0gZm9udC54SGVpZ2h0XHJcbiAgfSBlbHNlIGlmIChkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICdtaWRkbGUnKSB7XHJcbiAgICB5QWRqdXN0ID0gZm9udC5hc2NlbnQgLSBmb250LnhIZWlnaHQgLyAyXHJcbiAgfSBlbHNlIGlmIChkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICdjZW50cmFsJykge1xyXG4gICAgeUFkanVzdCA9IGZvbnQuYXNjZW50IC8gMiArIGZvbnQuZGVzY2VudCAvIDJcclxuICB9IGVsc2UgaWYgKGRldGFpbHMuZG9taW5hbnRCYXNlbGluZSA9PT0gJ2lkZW9ncmFwaGljJykge1xyXG4gICAgeUFkanVzdCA9IGZvbnQuYXNjZW50ICsgZm9udC5kZXNjZW50XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IEJveCh4ICsgeEFkanVzdCwgeSAtIHlBZGp1c3QgLyBmb250LnVuaXRzUGVyRW0gKiBmb250U2l6ZSwgd2lkdGgsIGhlaWdodClcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGRlZmF1bHRzIGZyb20gJy4vc3JjL3V0aWxzL2RlZmF1bHRzLmpzJ1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0F0dHIuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9DaGFyYWN0ZXJEYXRhLmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vQ29tbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0N1c3RvbUV2ZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vRG9jdW1lbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9Eb2N1bWVudEZyYWdtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vRWxlbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0V2ZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vRXZlbnRUYXJnZXQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9Ob2RlLmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vTm9kZUZpbHRlci5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL1RleHQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9XaW5kb3cuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9odG1sL0hUTUxFbGVtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vaHRtbC9IVE1MSW1hZ2VFbGVtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vaHRtbC9IVE1MTGlua0VsZW1lbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9odG1sL0hUTUxQYXJzZXIuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vbWl4aW5zL2VsZW1lbnRBY2Nlc3MuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9taXhpbnMvUGFyZW50Tm9kZS5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdFbGVtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vc3ZnL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdNYXRyaXguanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHUGF0aEVsZW1lbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHUG9pbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHU1ZHRWxlbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdUZXh0Q29udGVudEVsZW1lbnQuanMnXHJcblxyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb25maWcuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2ZhY3Rvcmllcy5qcydcclxuZXhwb3J0IHsgZGVmYXVsdHMgfVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=