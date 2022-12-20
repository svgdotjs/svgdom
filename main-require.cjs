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
  for (let child = parent.firstChild; child != null; child = child.nextSibling) {
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
const supportedFeatures = {
  xml: { '': true, '1.0': true, '2.0': true },
  core: { '': true, '2.0': true },
  html: { '': true, '1.0': true, '2.0': true },
  xhtml: { '': true, '1.0': true, '2.0': true } // HTML
}

const DOMImplementation = {
  hasFeature (feature, version) {
    const f = supportedFeatures[(feature || '').toLowerCase()]
    return (f && f[version || '']) || false
  },

  createDocumentType (qualifiedName, publicId, systemId) {
    return new _DocumentType_js__WEBPACK_IMPORTED_MODULE_17__.DocumentType(qualifiedName, { publicId, systemId, ownerDocument: this })
  },

  createDocument (namespace, qualifiedName, doctype) {
    const doc = new Document(namespace)
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
      for (let i = 0, il = props.childNodes.length; i < il; ++i) {
        this.appendChild(props.childNodes[i])
      }
    }
  }

  appendChild (node) {
    return this.insertBefore(node)
  }

  cloneNode (deep = false) {
    const clone = (0,_utils_tagUtils_js__WEBPACK_IMPORTED_MODULE_2__.cloneNode)(this)

    if (deep) {
      this.childNodes.forEach(function (el) {
        const node = el.cloneNode(deep)
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
    if (!this.parentNode || this.nodeType === Node.DOCUMENT_NODE) return this
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

    childNodes.forEach(node => {
      node.parentNode = this
    })
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
    const index = this.childNodes.indexOf(node)
    if (index === -1) return node
    this.childNodes.splice(index, 1)
    return node
  }

  replaceChild (newChild, oldChild) {
    const before = oldChild.nextSibling
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
    if (this.nodeType === Node.TEXT_NODE || this.nodeType === Node.CDATA_SECTION_NODE || this.nodeType === Node.COMMENT_NODE) {
      this.data = text
      return
    }
    this.childNodes = []
    this.appendChild(this.ownerDocument.createTextNode(text))
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

    let view = (this.getAttribute('viewBox') || '').split(_utils_regex_js__WEBPACK_IMPORTED_MODULE_2__.delimiter).map(parseFloat).filter(el => !isNaN(el))
    const width = parseFloat(this.getAttribute('width')) || 0
    const height = parseFloat(this.getAttribute('height')) || 0
    const x = parseFloat(this.getAttribute('x')) || 0
    const y = parseFloat(this.getAttribute('y')) || 0

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
    return (0,_utils_bboxUtils_js__WEBPACK_IMPORTED_MODULE_1__.getSegments)(this).bbox()
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
    return (0,_utils_bboxUtils_js__WEBPACK_IMPORTED_MODULE_1__.getSegments)(this, false, true).transform(m).bbox()
  }

  getCTM () {
    let m = this.matrixify()

    let node = this
    while ((node = node.parentNode)) {
      if ([ 'svg', 'symbol', 'image', 'pattern', 'marker' ].indexOf(node.nodeName) > -1) break
      m = m.multiply(node.matrixify())
      if (node.nodeName === '#document') return this.getScreenCTM()
    }

    return node.generateViewBoxMatrix().multiply(m)
  }

  getInnerMatrix () {
    let m = this.matrixify()

    if ([ 'svg', 'symbol', 'image', 'pattern', 'marker' ].indexOf(this.nodeName) > -1) {
      m = this.generateViewBoxMatrix().multiply(m)
    }
    return m
  }

  getScreenCTM () {
    // ref: https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
    // We follow Chromes behavior and include the viewbox in the screenCTM
    const m = this.getInnerMatrix()

    // TODO: We have to loop until document, however html elements dont have getScreenCTM implemented
    // they also dont have a transform attribute. Therefore we need a different way of figuring out their (css) transform
    if (this.parentNode && this.parentNode instanceof SVGGraphicsElement) {
      return this.parentNode.getScreenCTM().multiply(m)
    }

    return m
  }

  matrixify () {
    const matrix = (this.getAttribute('transform') || '').trim()
      // split transformations
      .split(_utils_regex_js__WEBPACK_IMPORTED_MODULE_2__.transforms).slice(0, -1).map(function (str) {
        // generate key => value pairs
        const kv = str.trim().split('(')
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
    const base = { x: 0, y: 0 }

    // ensure source as object
    const source = Array.isArray(x)
      ? { x: x[0], y: x[1] }
      : typeof x === 'object'
        ? { x: x.x, y: x.y }
        : x != null
          ? { x: x, y: (y != null ? y : x) }
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
    const p = new Point(x, y)
    return new Point(this.x + p.x, this.y + p.y)
  }

  angleTo (p) {
    let sign = Math.sign(this.x * p.y - this.y * p.x)
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
    const point = new _dom_svg_SVGPoint_js__WEBPACK_IMPORTED_MODULE_0__.SVGPoint()

    // update with current values
    point.x = this.x
    point.y = this.y

    return point
  }

  normal () {
    return new Point(this.y, -this.x)
  }

  normalize () {
    const abs = this.abs()
    if (!abs) throw new Error('Can\'t normalize vector of zero length')
    return this.div(abs)
  }

  reflectAt (p) {
    return p.add(p.sub(this))
  }

  sub (x, y) {
    const p = new Point(x, y)
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

  transformO (matrix) {
    const { x, y } = this.native().matrixTransform(matrix)
    this.x = x
    this.y = y
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
/* harmony export */   "getSegments": () => (/* binding */ getSegments)
/* harmony export */ });
/* harmony import */ var _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pathUtils.js */ "./src/utils/pathUtils.js");
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regex.js */ "./src/utils/regex.js");
/* harmony import */ var _textUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./textUtils.js */ "./src/utils/textUtils.js");
/* harmony import */ var _other_Box_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../other/Box.js */ "./src/other/Box.js");
/* harmony import */ var _NodeIterator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NodeIterator.js */ "./src/utils/NodeIterator.js");
/* harmony import */ var _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom/NodeFilter.js */ "./src/dom/NodeFilter.js");







const applyTransformation = (segments, node, applyTransformations) => {
  if (node.matrixify && applyTransformations) {
    return segments.transform(node.matrixify())
  }
  return segments
}

const getSegments = (node, applyTransformations, rbox = false) => {
  const segments = getPathSegments(node, rbox)
  return applyTransformation(segments, node, applyTransformations)
}

const getPathSegments = (node, rbox) => {
  if (node.nodeType !== 1) return new _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.PathSegmentArray()

  switch (node.nodeName) {
  case 'rect':
  case 'image':
  case 'pattern':
  case 'mask':
  case 'foreignObject':
    // Create Path from rect and create PointCloud from Path
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPathSegments(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.rect(node))
  case 'svg':
  case 'symbol':
    // return pathUtils.getPathSegments(pathUtils.pathFrom.rect(node))
    if (rbox) {
      return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPathSegments(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.rect(node))
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
    return node.childNodes.reduce((segments, child) => {
      if (!child.matrixify) return segments
      return segments.merge(getSegments(child, true).transform(child.generateViewBoxMatrix()))
    }, new _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.PathSegmentArray())
  case 'circle':
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPathSegments(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.circle(node))
  case 'ellipse':
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPathSegments(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.ellipse(node))
  case 'line':
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPathSegments(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.line(node))
  case 'polyline':
  case 'polygon':
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPathSegments(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.polyline(node))
  case 'path':
  case 'glyph':
  case 'missing-glyph':
    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPathSegments(node.getAttribute('d'))
  case 'use': {
    // Get reference from element
    const ref = node.getAttribute('href') || node.getAttribute('xlink:href')
    // Get the actual referenced Node
    const refNode = node.getRootNode().querySelector(ref)
    // Get the BBox of the referenced element and apply the viewbox of <use>
    // TODO: Do we need to apply the transformations of the element?
    // Check bbox of transformed element which is reused with <use>
    return getSegments(refNode).transform(node.generateViewBoxMatrix())
  }
  case 'tspan':
  case 'text':
  case 'altGlyph': {
    const box = getTextBBox(node)

    if (box instanceof _other_Box_js__WEBPACK_IMPORTED_MODULE_3__.NoBox) {
      return new _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.PathSegmentArray()
    }

    return _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPathSegments(_pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.pathFrom.box(box))
  }
  default:
    return new _pathUtils_js__WEBPACK_IMPORTED_MODULE_0__.PathSegmentArray()
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
  const iter = new _NodeIterator_js__WEBPACK_IMPORTED_MODULE_4__.NodeIterator(textRoot, _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_5__.NodeFilter.SHOW_ELEMENT | _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_5__.NodeFilter.SHOW_TEXT, (node) => {
    if (node.nodeName === 'title') return _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_5__.NodeFilter.FILTER_IGNORE
    return _dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_5__.NodeFilter.FILTER_ACCEPT
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
    const x = parseFloat(node.getAttribute('x'))
    const y = parseFloat(node.getAttribute('y'))

    pos.x = isNaN(x) ? pos.x : x
    pos.y = isNaN(y) ? pos.y : y

    const dx0 = (node.getAttribute('dx') || '').split(_regex_js__WEBPACK_IMPORTED_MODULE_1__.delimiter).filter(num => num !== '').map(parseFloat)
    const dy0 = (node.getAttribute('dy') || '').split(_regex_js__WEBPACK_IMPORTED_MODULE_1__.delimiter).filter(num => num !== '').map(parseFloat)

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
/* harmony export */   "PathSegmentArray": () => (/* binding */ PathSegmentArray),
/* harmony export */   "getPathSegments": () => (/* binding */ getPathSegments),
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

  transform (matrix) {
    this.p1.transformO(matrix)
    return this
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

    let c_
    if (Math.abs(dividend) < 1e-15) {
      c_ = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(0, 0)
    } else {
      c_ = new _other_Point_js__WEBPACK_IMPORTED_MODULE_1__.Point(
        rx * p1_.y / ry,
        -ry * p1_.x / rx
      ).mul(Math.sqrt(
        dividend / (divisor1 + divisor2)
      ))
    }

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

  transform (matrix) {
    return new Arc(this.p1.transform(matrix), this.p2.transform(matrix), this.rx, this.ry, this.phi, this.arc, this.sweep)
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

  transform (matrix) {
    this.p1.transformO(matrix)
    this.c1.transformO(matrix)
    this.c2.transformO(matrix)
    this.p2.transformO(matrix)
    return this
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

  transform (matrix) {
    this.p1.transformO(matrix)
    this.p2.transformO(matrix)
    return this
  }
}

const pathBBox = function (d) {
  return pathParser(d).reduce((l, c) => l.merge(c.bbox()), new _other_Box_js__WEBPACK_IMPORTED_MODULE_0__.NoBox())
}

class PathSegmentArray extends Array {
  bbox () {
    return this.reduce((l, c) => l.merge(c.bbox()), new _other_Box_js__WEBPACK_IMPORTED_MODULE_0__.NoBox())
  }

  cloud () {
    return this.reduce(
      (cloud, segment) => segment.getCloud().merge(cloud),
      new _PointCloud_js__WEBPACK_IMPORTED_MODULE_4__.PointCloud()
    )
  }

  merge (other) {
    return this.concat(other)
  }

  transform (matrix) {
    return this.map(segment => segment.transform(matrix))
  }
}

const getPathSegments = function (d) {
  return new PathSegmentArray(...pathParser(d))
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
    bboxsTransformed: parse.map(el => {
      return el.getCloud().transform(node.matrixify()).bbox()
    })
  }

  return Object.assign({}, ret, {
    bboxTransformed: ret.bboxsTransformed.reduce((l, c) => l.merge(c), new _other_Box_js__WEBPACK_IMPORTED_MODULE_0__.NoBox())
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxJQUFJO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0RBQWU7QUFDNUMsZ0NBQWdDLHNEQUFlO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsZ0VBQVk7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsYUFBYSw4Q0FBRztBQUNoQjs7Ozs7OztVQzdFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05tRDtBQUNuRDtBQUNpQztBQUNTO0FBQ047QUFDSTtBQUNIO0FBQ1E7QUFDVDtBQUNGO0FBQ007QUFDUDtBQUNNO0FBQ047QUFDRTtBQUNVO0FBQ0s7QUFDRDtBQUNMO0FBQ087QUFDRjtBQUNIO0FBQ0g7QUFDUTtBQUNUO0FBQ0s7QUFDTjtBQUNLO0FBQ1E7QUFDdEQ7QUFDK0I7QUFDRztBQUNmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ZnZG9tL2V4dGVybmFsIGNvbW1vbmpzIFwiLi9zcmMvdXRpbHMvZGlybmFtZS5janNcIiIsIndlYnBhY2s6Ly9zdmdkb20vZXh0ZXJuYWwgY29tbW9uanMgXCJmb250a2l0XCIiLCJ3ZWJwYWNrOi8vc3ZnZG9tL2V4dGVybmFsIGNvbW1vbmpzIFwiaW1hZ2Utc2l6ZVwiIiwid2VicGFjazovL3N2Z2RvbS9leHRlcm5hbCBjb21tb25qcyBcInNheFwiIiwid2VicGFjazovL3N2Z2RvbS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9BdHRyLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vQ2hhcmFjdGVyRGF0YS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0NvbW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9DdXN0b21FdmVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0RvY3VtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vRG9jdW1lbnRGcmFnbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0RvY3VtZW50VHlwZS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9FdmVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0V2ZW50VGFyZ2V0LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vTm9kZS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL05vZGVGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9UZXh0LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vV2luZG93LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vaHRtbC9IVE1MRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL2h0bWwvSFRNTEltYWdlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL2h0bWwvSFRNTExpbmtFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vaHRtbC9IVE1MUGFyc2VyLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vaHRtbC9IVE1MU2NyaXB0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL21peGlucy9DaGlsZE5vZGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9taXhpbnMvTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vbWl4aW5zL05vbkVsZW1lbnRQYXJlbnROb2RlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vbWl4aW5zL1BhcmVudE5vZGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9taXhpbnMvZWxlbWVudEFjY2Vzcy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR0dyYXBoaWNzRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdNYXRyaXguanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHUGF0aEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHUG9pbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHU1ZHRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdUZXh0Q29udGVudEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2ZhY3Rvcmllcy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvb3RoZXIvQm94LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9vdGhlci9Dc3NRdWVyeS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvb3RoZXIvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL05vZGVJdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvUG9pbnRDbG91ZC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvYmJveFV0aWxzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvbWFwVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL25hbWVzcGFjZXMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL25vZGVzVG9Ob2RlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9wYXRoVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL3JlZ2V4LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9zdHJVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvdGFnVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL3RleHRVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3ZnZG9tL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdmdkb20vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdmdkb20vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdmdkb20vLi9tYWluLW1vZHVsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3NyYy91dGlscy9kaXJuYW1lLmNqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmb250a2l0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImltYWdlLXNpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2F4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IGZvbnRraXQgZnJvbSAnZm9udGtpdCdcclxuXHJcbmNvbnN0IF9jb25maWcgPSB7fVxyXG5jb25zdCBmb250cyA9IHt9XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0Rm9udERpciA9IGZ1bmN0aW9uIChkaXIpIHtcclxuICBfY29uZmlnLmZvbnREaXIgPSBkaXJcclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0Rm9udEZhbWlseU1hcHBpbmdzID0gZnVuY3Rpb24gKG1hcCkge1xyXG4gIF9jb25maWcuZm9udEZhbWlseU1hcHBpbmdzID0gbWFwXHJcbiAgcmV0dXJuIHRoaXNcclxufVxyXG5cclxuLy8gVE9ETzogbWFrZSBhc3luY1xyXG5leHBvcnQgY29uc3QgcHJlbG9hZEZvbnRzID0gKCkgPT4ge1xyXG4gIHZhciBtYXAgPSBfY29uZmlnLmZvbnRGYW1pbHlNYXBwaW5nc1xyXG5cclxuICBmb3IgKGNvbnN0IFsgZm9udCwgZmlsZSBdIG9mIE9iamVjdC5lbnRyaWVzKG1hcCkpIHtcclxuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5qb2luKF9jb25maWcuZm9udERpciwgZmlsZSlcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBmb250c1tmb250XSA9IGZvbnRraXQub3BlblN5bmMoZmlsZW5hbWUpXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IGxvYWQgZm9udCBmaWxlIGZvciAke2ZvbnR9YCwgZSlcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXNcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldENvbmZpZyA9ICgpID0+IF9jb25maWdcclxuZXhwb3J0IGNvbnN0IGdldEZvbnRzID0gKCkgPT4gZm9udHNcclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XHJcbiAgc2V0Rm9udERpcixcclxuICBzZXRGb250RmFtaWx5TWFwcGluZ3MsXHJcbiAgcHJlbG9hZEZvbnRzLFxyXG4gIGdldENvbmZpZyxcclxuICBnZXRGb250c1xyXG59XHJcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXHJcbmltcG9ydCB7IGh0bWwgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEF0dHIgZXh0ZW5kcyBOb2RlIHtcclxuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMsIG5zKSB7XHJcbiAgICBzdXBlcihuYW1lLCB7IG5vZGVWYWx1ZTogJycsIC4uLnByb3BzIH0sIG5zKVxyXG5cclxuICAgIC8vIEZvbGxvdyBzcGVjIGFuZCBsb3dlcmNhc2Ugbm9kZU5hbWUgZm9yIGh0bWxcclxuICAgIHRoaXMubm9kZU5hbWUgPSBucyA9PT0gaHRtbCA/IG5hbWUudG9Mb3dlckNhc2UoKSA6IG5hbWVcclxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLkFUVFJJQlVURV9OT0RFXHJcbiAgICB0aGlzLm93bmVyRWxlbWVudCA9IG51bGxcclxuICB9XHJcblxyXG4gIGdldCB2YWx1ZSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlVmFsdWVcclxuICB9XHJcblxyXG4gIHNldCB2YWx1ZSAodmFsKSB7XHJcbiAgICB0aGlzLm5vZGVWYWx1ZSA9IHZhbFxyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZU5hbWVcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcclxuaW1wb3J0IHsgbWl4aW4gfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xyXG5pbXBvcnQgeyBOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGUgfSBmcm9tICcuL21peGlucy9Ob25Eb2N1bWVudFR5cGVDaGlsZE5vZGUuanMnXHJcbmltcG9ydCB7IENoaWxkTm9kZSB9IGZyb20gJy4vbWl4aW5zL0NoaWxkTm9kZS5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJEYXRhIGV4dGVuZHMgTm9kZSB7XHJcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzKSB7XHJcbiAgICBzdXBlcihuYW1lLCBwcm9wcylcclxuXHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLm5vZGVWYWx1ZVxyXG4gIH1cclxuXHJcbiAgYXBwZW5kRGF0YSAoZGF0YSkge1xyXG4gICAgdGhpcy5kYXRhICs9IGRhdGFcclxuICB9XHJcblxyXG4gIGRlbGV0ZURhdGEgKG9mZnNldCwgY291bnQpIHtcclxuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgwLCBvZmZzZXQpICsgdGhpcy5kYXRhLnNsaWNlKDAsIG9mZnNldCArIGNvdW50KVxyXG4gIH1cclxuXHJcbiAgaW5zZXJ0RGF0YSAob2Zmc2V0LCBkYXRhKSB7XHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuc2xpY2UoMCwgb2Zmc2V0KSArIGRhdGEgKyB0aGlzLmRhdGEuc2xpY2Uob2Zmc2V0KVxyXG4gIH1cclxuXHJcbiAgcmVwbGFjZURhdGEgKG9mZnNldCwgY291bnQsIGRhdGEpIHtcclxuICAgIHRoaXMuZGVsZXRlRGF0YShvZmZzZXQsIGNvdW50KVxyXG4gICAgdGhpcy5pbnNlcnREYXRhKG9mZnNldCwgZGF0YSlcclxuICB9XHJcblxyXG4gIHN1YnN0cmluZ0RhdGEgKG9mZnNldCwgY291bnQpIHtcclxuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5zdWJzdHIob2Zmc2V0LCBjb3VudClcclxuICB9XHJcblxyXG4gIGdldCBsZW5ndGggKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YS5sZW5ndGhcclxuICB9XHJcbn1cclxuXHJcbm1peGluKE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZSwgQ2hhcmFjdGVyRGF0YSlcclxubWl4aW4oQ2hpbGROb2RlLCBDaGFyYWN0ZXJEYXRhKVxyXG4iLCJpbXBvcnQgeyBDaGFyYWN0ZXJEYXRhIH0gZnJvbSAnLi9DaGFyYWN0ZXJEYXRhLmpzJ1xyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJ1xyXG5leHBvcnQgY2xhc3MgQ29tbWVudCBleHRlbmRzIENoYXJhY3RlckRhdGEge1xyXG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcykge1xyXG4gICAgc3VwZXIobmFtZSwgcHJvcHMpXHJcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5DT01NRU5UX05PREVcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL0V2ZW50LmpzJ1xyXG5leHBvcnQgY2xhc3MgQ3VzdG9tRXZlbnQgZXh0ZW5kcyBFdmVudCB7XHJcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzID0ge30pIHtcclxuICAgIHN1cGVyKG5hbWUpXHJcbiAgICB0aGlzLmRldGFpbCA9IHByb3BzLmRldGFpbCB8fCBudWxsXHJcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBwcm9wcy5jYW5jZWxhYmxlIHx8IGZhbHNlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXHJcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tICcuL0NvbW1lbnQuanMnXHJcbmltcG9ydCB7IFRleHQgfSBmcm9tICcuL1RleHQuanMnXHJcbmltcG9ydCB7IEF0dHIgfSBmcm9tICcuL0F0dHIuanMnXHJcbmltcG9ydCB7IERvY3VtZW50RnJhZ21lbnQgfSBmcm9tICcuL0RvY3VtZW50RnJhZ21lbnQuanMnXHJcbmltcG9ydCB7IEhUTUxMaW5rRWxlbWVudCB9IGZyb20gJy4vaHRtbC9IVE1MTGlua0VsZW1lbnQuanMnXHJcbmltcG9ydCB7IEhUTUxTY3JpcHRFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBIVE1MSW1hZ2VFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxJbWFnZUVsZW1lbnQuanMnXHJcbmltcG9ydCB7IEhUTUxFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBlbGVtZW50QWNjZXNzIH0gZnJvbSAnLi9taXhpbnMvZWxlbWVudEFjY2Vzcy5qcydcclxuaW1wb3J0IHsgbWl4aW4gfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xyXG5pbXBvcnQgeyBTVkdTVkdFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHU1ZHRWxlbWVudC5qcydcclxuaW1wb3J0IHsgU1ZHUGF0aEVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdQYXRoRWxlbWVudC5qcydcclxuaW1wb3J0IHsgU1ZHVGV4dENvbnRlbnRFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHVGV4dENvbnRlbnRFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdHcmFwaGljc0VsZW1lbnQuanMnXHJcbmltcG9ydCB7IFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9QYXJlbnROb2RlLmpzJ1xyXG5pbXBvcnQgeyBzdmcsIGh0bWwgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xyXG5pbXBvcnQgeyBEb2N1bWVudFR5cGUgfSBmcm9tICcuL0RvY3VtZW50VHlwZS5qcydcclxuaW1wb3J0IHsgTm9uRWxlbWVudFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9Ob25FbGVtZW50UGFyZW50Tm9kZS5qcydcclxuXHJcbmZ1bmN0aW9uIGdldENoaWxkQnlUYWdOYW1lIChwYXJlbnQsIG5hbWUpIHtcclxuICBmb3IgKGxldCBjaGlsZCA9IHBhcmVudC5maXJzdENoaWxkOyBjaGlsZCAhPSBudWxsOyBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nKSB7XHJcbiAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIGNoaWxkLm5vZGVOYW1lID09PSBuYW1lKSB7XHJcbiAgICAgIHJldHVybiBjaGlsZFxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVsbFxyXG59XHJcblxyXG5jb25zdCBnZXRTVkdFbGVtZW50Rm9yTmFtZSA9IChuYW1lKSA9PiB7XHJcbiAgc3dpdGNoIChuYW1lLnRvTG93ZXJDYXNlKCkpIHtcclxuICBjYXNlICdzdmcnOlxyXG4gICAgcmV0dXJuIFNWR1NWR0VsZW1lbnRcclxuICBjYXNlICdwYXRoJzpcclxuICAgIHJldHVybiBTVkdQYXRoRWxlbWVudFxyXG4gIGNhc2UgJ3RleHQnOlxyXG4gIGNhc2UgJ3RzcGFuJzpcclxuICBjYXNlICd0cmVmJzpcclxuICBjYXNlICdhbHRnbHlwaCc6XHJcbiAgY2FzZSAndGV4dHBhdGgnOlxyXG4gICAgcmV0dXJuIFNWR1RleHRDb250ZW50RWxlbWVudFxyXG4gIGRlZmF1bHQ6XHJcbiAgICByZXR1cm4gU1ZHR3JhcGhpY3NFbGVtZW50XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBnZXRIVE1MRWxlbWVudEZvck5hbWUgPSAobmFtZSkgPT4ge1xyXG4gIHN3aXRjaCAobmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgY2FzZSAnaW1nJzpcclxuICAgIHJldHVybiBIVE1MSW1hZ2VFbGVtZW50XHJcbiAgY2FzZSAnbGluayc6XHJcbiAgICByZXR1cm4gSFRNTExpbmtFbGVtZW50XHJcbiAgY2FzZSAnc2NyaXB0JzpcclxuICAgIHJldHVybiBIVE1MU2NyaXB0RWxlbWVudFxyXG4gIGRlZmF1bHQ6XHJcbiAgICByZXR1cm4gSFRNTEVsZW1lbnRcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGdldEVsZW1lbnRGb3JOYW1lc3BhY2UgPSAobnMsIG5hbWUpID0+IHtcclxuICBzd2l0Y2ggKG5zKSB7XHJcbiAgY2FzZSBzdmc6XHJcbiAgICByZXR1cm4gZ2V0U1ZHRWxlbWVudEZvck5hbWUobmFtZSlcclxuICBjYXNlIGh0bWw6XHJcbiAgY2FzZSBudWxsOlxyXG4gIGNhc2UgJyc6XHJcbiAgZGVmYXVsdDpcclxuICAgIHJldHVybiBnZXRIVE1MRWxlbWVudEZvck5hbWUobmFtZSlcclxuICB9XHJcbn1cclxuXHJcbi8vIEZlYXR1cmUvdmVyc2lvbiBwYWlycyB0aGF0IERPTUltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoKSByZXR1cm5zIHRydWUgZm9yLiAgSXQgcmV0dXJucyBmYWxzZSBmb3IgYW55dGhpbmcgZWxzZS5cclxuY29uc3Qgc3VwcG9ydGVkRmVhdHVyZXMgPSB7XHJcbiAgeG1sOiB7ICcnOiB0cnVlLCAnMS4wJzogdHJ1ZSwgJzIuMCc6IHRydWUgfSxcclxuICBjb3JlOiB7ICcnOiB0cnVlLCAnMi4wJzogdHJ1ZSB9LFxyXG4gIGh0bWw6IHsgJyc6IHRydWUsICcxLjAnOiB0cnVlLCAnMi4wJzogdHJ1ZSB9LFxyXG4gIHhodG1sOiB7ICcnOiB0cnVlLCAnMS4wJzogdHJ1ZSwgJzIuMCc6IHRydWUgfSAvLyBIVE1MXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBET01JbXBsZW1lbnRhdGlvbiA9IHtcclxuICBoYXNGZWF0dXJlIChmZWF0dXJlLCB2ZXJzaW9uKSB7XHJcbiAgICBjb25zdCBmID0gc3VwcG9ydGVkRmVhdHVyZXNbKGZlYXR1cmUgfHwgJycpLnRvTG93ZXJDYXNlKCldXHJcbiAgICByZXR1cm4gKGYgJiYgZlt2ZXJzaW9uIHx8ICcnXSkgfHwgZmFsc2VcclxuICB9LFxyXG5cclxuICBjcmVhdGVEb2N1bWVudFR5cGUgKHF1YWxpZmllZE5hbWUsIHB1YmxpY0lkLCBzeXN0ZW1JZCkge1xyXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudFR5cGUocXVhbGlmaWVkTmFtZSwgeyBwdWJsaWNJZCwgc3lzdGVtSWQsIG93bmVyRG9jdW1lbnQ6IHRoaXMgfSlcclxuICB9LFxyXG5cclxuICBjcmVhdGVEb2N1bWVudCAobmFtZXNwYWNlLCBxdWFsaWZpZWROYW1lLCBkb2N0eXBlKSB7XHJcbiAgICBjb25zdCBkb2MgPSBuZXcgRG9jdW1lbnQobmFtZXNwYWNlKVxyXG4gICAgaWYgKGRvY3R5cGUpIHtcclxuICAgICAgaWYgKGRvY3R5cGUub3duZXJEb2N1bWVudCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIG9iamVjdCBpcyBpbiB0aGUgd3JvbmcgRG9jdW1lbnQsIGEgY2FsbCB0byBpbXBvcnROb2RlIGlzIHJlcXVpcmVkJylcclxuICAgICAgfVxyXG4gICAgICBkb2N0eXBlLm93bmVyRG9jdW1lbnQgPSBkb2NcclxuICAgICAgZG9jLmFwcGVuZENoaWxkKGRvY3R5cGUpXHJcbiAgICB9XHJcbiAgICBpZiAocXVhbGlmaWVkTmFtZSkge1xyXG4gICAgICBkb2MuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2UsIHF1YWxpZmllZE5hbWUpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRvY1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZUhUTUxEb2N1bWVudCAodGl0bGVUZXh0ID0gJycpIHtcclxuICAgIGNvbnN0IGQgPSBuZXcgRG9jdW1lbnQoaHRtbClcclxuICAgIGNvbnN0IHJvb3QgPSBkLmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKVxyXG4gICAgY29uc3QgaGVhZCA9IGQuY3JlYXRlRWxlbWVudCgnaGVhZCcpXHJcbiAgICBjb25zdCB0aXRsZSA9IGQuY3JlYXRlRWxlbWVudCgndGl0bGUnKVxyXG4gICAgdGl0bGUuYXBwZW5kQ2hpbGQoZC5jcmVhdGVUZXh0Tm9kZSh0aXRsZVRleHQpKVxyXG4gICAgaGVhZC5hcHBlbmRDaGlsZCh0aXRsZSlcclxuICAgIHJvb3QuYXBwZW5kQ2hpbGQoaGVhZClcclxuICAgIHJvb3QuYXBwZW5kQ2hpbGQoZC5jcmVhdGVFbGVtZW50KCdib2R5JykpXHJcblxyXG4gICAgZC5hcHBlbmRDaGlsZChyb290KVxyXG4gICAgcmV0dXJuIGRcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIE5vZGUge1xyXG4gIGNvbnN0cnVjdG9yIChucykge1xyXG4gICAgc3VwZXIoJyNkb2N1bWVudCcsIHt9LCBucylcclxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLkRPQ1VNRU5UX05PREVcclxuICAgIHRoaXMuaW1wbGVtZW50YXRpb24gPSBET01JbXBsZW1lbnRhdGlvblxyXG4gICAgdGhpcy5kZWZhdWx0VmlldyA9IG51bGxcclxuICB9XHJcblxyXG4gIC8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jZG9tLWRvY3VtZW50LWNyZWF0ZWF0dHJpYnV0ZVxyXG4gIGNyZWF0ZUF0dHJpYnV0ZSAobG9jYWxOYW1lKSB7XHJcbiAgICBpZiAodGhpcy5uYW1lc3BhY2VVUkkgPT09IGh0bWwpIHtcclxuICAgICAgbG9jYWxOYW1lID0gbG9jYWxOYW1lLnRvTG93ZXJDYXNlKClcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUF0dHJpYnV0ZU5TKG51bGwsIGxvY2FsTmFtZSwgdHJ1ZSlcclxuICB9XHJcblxyXG4gIGNyZWF0ZUF0dHJpYnV0ZU5TIChucywgcXVhbGlmaWVkTmFtZSwgbG9jYWwgPSBmYWxzZSkge1xyXG4gICAgcmV0dXJuIG5ldyBBdHRyKHF1YWxpZmllZE5hbWUsIHsgb3duZXJEb2N1bWVudDogdGhpcywgbG9jYWwgfSwgbnMpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVDb21tZW50ICh0ZXh0KSB7XHJcbiAgICByZXR1cm4gbmV3IENvbW1lbnQoJyNjb21tZW50JywgeyBub2RlVmFsdWU6IHRleHQsIG93bmVyRG9jdW1lbnQ6IHRoaXMgfSlcclxuICB9XHJcblxyXG4gIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQgKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgRG9jdW1lbnRGcmFnbWVudCgnI2RvY3VtZW50LWZyYWdtZW50JywgeyBvd25lckRvY3VtZW50OiB0aGlzIH0pXHJcbiAgfVxyXG5cclxuICBjcmVhdGVFbGVtZW50IChsb2NhbE5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUVsZW1lbnROUyh0aGlzLm5hbWVzcGFjZVVSSSwgbG9jYWxOYW1lLCB0cnVlKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlRWxlbWVudE5TIChucywgcXVhbGlmaWVkTmFtZSwgbG9jYWwgPSBmYWxzZSkge1xyXG4gICAgY29uc3QgRWxlbWVudCA9IGdldEVsZW1lbnRGb3JOYW1lc3BhY2UobnMsIHF1YWxpZmllZE5hbWUpXHJcblxyXG4gICAgcmV0dXJuIG5ldyBFbGVtZW50KHF1YWxpZmllZE5hbWUsIHtcclxuICAgICAgb3duZXJEb2N1bWVudDogdGhpcyxcclxuICAgICAgbG9jYWxcclxuICAgIH0sIG5zKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlVGV4dE5vZGUgKHRleHQpIHtcclxuICAgIHJldHVybiBuZXcgVGV4dCgnI3RleHQnLCB7IG5vZGVWYWx1ZTogdGV4dCwgb3duZXJEb2N1bWVudDogdGhpcyB9KVxyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbXBhdE1vZGUgKCkge1xyXG4gICAgcmV0dXJuICdDU1MxQ29tcGF0JyAvLyBhbHdheXMgYmUgaW4gc3RhbmRhcmRzLW1vZGVcclxuICB9XHJcblxyXG4gIGdldCBib2R5ICgpIHtcclxuICAgIHJldHVybiBnZXRDaGlsZEJ5VGFnTmFtZSh0aGlzLmRvY3VtZW50RWxlbWVudCwgJ0JPRFknKVxyXG4gIH1cclxuXHJcbiAgZ2V0IGhlYWQgKCkge1xyXG4gICAgcmV0dXJuIGdldENoaWxkQnlUYWdOYW1lKHRoaXMuZG9jdW1lbnRFbGVtZW50LCAnSEVBRCcpXHJcbiAgfVxyXG5cclxuICBnZXQgZG9jdW1lbnRFbGVtZW50ICgpIHtcclxuICAgIHJldHVybiB0aGlzLmxhc3RDaGlsZFxyXG4gIH1cclxufVxyXG5cclxubWl4aW4oZWxlbWVudEFjY2VzcywgRG9jdW1lbnQpXHJcbm1peGluKFBhcmVudE5vZGUsIERvY3VtZW50KVxyXG5taXhpbihOb25FbGVtZW50UGFyZW50Tm9kZSwgRG9jdW1lbnQpXHJcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXHJcbmltcG9ydCB7IG1peGluIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcclxuaW1wb3J0IHsgZWxlbWVudEFjY2VzcyB9IGZyb20gJy4vbWl4aW5zL2VsZW1lbnRBY2Nlc3MuanMnXHJcbmltcG9ydCB7IFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9QYXJlbnROb2RlLmpzJ1xyXG5pbXBvcnQgeyBOb25FbGVtZW50UGFyZW50Tm9kZSB9IGZyb20gJy4vbWl4aW5zL05vbkVsZW1lbnRQYXJlbnROb2RlLmpzJ1xyXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRGcmFnbWVudCBleHRlbmRzIE5vZGUge1xyXG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcykge1xyXG4gICAgc3VwZXIobmFtZSwgcHJvcHMpXHJcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFXHJcbiAgfVxyXG59XHJcblxyXG5taXhpbihlbGVtZW50QWNjZXNzLCBEb2N1bWVudEZyYWdtZW50KVxyXG5taXhpbihQYXJlbnROb2RlLCBEb2N1bWVudEZyYWdtZW50KVxyXG5taXhpbihOb25FbGVtZW50UGFyZW50Tm9kZSwgRG9jdW1lbnRGcmFnbWVudClcclxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcclxuaW1wb3J0IHsgbWl4aW4gfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xyXG5pbXBvcnQgeyBDaGlsZE5vZGUgfSBmcm9tICcuL21peGlucy9DaGlsZE5vZGUuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRUeXBlIGV4dGVuZHMgTm9kZSB7XHJcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzKSB7XHJcbiAgICBzdXBlcihuYW1lLCBwcm9wcylcclxuXHJcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5ET0NVTUVOVF9UWVBFX05PREVcclxuICAgIHRoaXMubmFtZSA9IG5hbWVcclxuXHJcbiAgICBjb25zdCB7IHB1YmxpY0lkLCBzeXN0ZW1JZCB9ID0gcHJvcHNcclxuICAgIHRoaXMucHVibGljSWQgPSBwdWJsaWNJZCB8fCAnJ1xyXG4gICAgdGhpcy5zeXN0ZW1JZCA9IHN5c3RlbUlkIHx8ICcnXHJcbiAgfVxyXG59XHJcblxyXG5taXhpbihDaGlsZE5vZGUsIERvY3VtZW50VHlwZSlcclxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcblxuaW1wb3J0IHsgUGFyZW50Tm9kZSB9IGZyb20gJy4vbWl4aW5zL1BhcmVudE5vZGUuanMnXG5pbXBvcnQgeyBlbGVtZW50QWNjZXNzIH0gZnJvbSAnLi9taXhpbnMvZWxlbWVudEFjY2Vzcy5qcydcbmltcG9ydCB7IEhUTUxQYXJzZXIgfSBmcm9tICcuL2h0bWwvSFRNTFBhcnNlci5qcydcbmltcG9ydCB7IERvY3VtZW50RnJhZ21lbnQgfSBmcm9tICcuL0RvY3VtZW50RnJhZ21lbnQuanMnXG5pbXBvcnQgeyBtaXhpbiB9IGZyb20gJy4uL3V0aWxzL29iamVjdENyZWF0aW9uVXRpbHMuanMnXG5pbXBvcnQgeyB0YWcgfSBmcm9tICcuLi91dGlscy90YWdVdGlscy5qcydcbmltcG9ydCB7IGNzc1RvTWFwLCBtYXBUb0NzcyB9IGZyb20gJy4uL3V0aWxzL21hcFV0aWxzLmpzJ1xuaW1wb3J0IHsgaGV4VG9SR0IsIGRlY2FtZWxpemUsIGh0bWxFbnRpdGllcywgY2RhdGEsIGNvbW1lbnQgfSBmcm9tICcuLi91dGlscy9zdHJVdGlscy5qcydcbmltcG9ydCB7IE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZSB9IGZyb20gJy4vbWl4aW5zL05vbkRvY3VtZW50VHlwZUNoaWxkTm9kZS5qcydcbmltcG9ydCB7IENoaWxkTm9kZSB9IGZyb20gJy4vbWl4aW5zL0NoaWxkTm9kZS5qcydcbmltcG9ydCB7IGh0bWwsIHhtbCwgeG1sbnMgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xuXG5jb25zdCB2YWxpZGF0ZUFuZEV4dHJhY3QgPSAobnMsIG5hbWUpID0+IHtcbiAgbGV0IHByZWZpeCA9IG51bGxcbiAgbGV0IGxvY2FsbmFtZSA9IG5hbWVcblxuICBpZiAoIW5zKSBucyA9IG51bGxcblxuICBpZiAobmFtZS5pbmNsdWRlcygnOicpKSB7XG4gICAgWyBwcmVmaXgsIGxvY2FsbmFtZSBdID0gbmFtZS5zcGxpdCgnOicpXG4gIH1cblxuICBpZiAoIW5zICYmIHByZWZpeCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTmFtZXNwYWNlIEVycm9yJylcbiAgfVxuXG4gIGlmIChwcmVmaXggPT09ICd4bWwnICYmIG5zICE9PSB4bWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWVzcGFjZSBFcnJvcicpXG4gIH1cblxuICBpZiAoKHByZWZpeCA9PT0gJ3htbG5zJyB8fCBuYW1lID09PSAneG1sbnMnKSAmJiBucyAhPT0geG1sbnMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWVzcGFjZSBFcnJvcicpXG4gIH1cblxuICBpZiAocHJlZml4ICE9PSAneG1sbnMnICYmIG5hbWUgIT09ICd4bWxucycgJiYgbnMgPT09IHhtbG5zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOYW1lc3BhY2UgRXJyb3InKVxuICB9XG5cbiAgcmV0dXJuIFsgbnMsIHByZWZpeCwgbG9jYWxuYW1lIF1cbn1cblxuY29uc3QgZ2V0QXR0cmlidXRlQnlOc0FuZExvY2FsTmFtZSA9IChlbCwgbnMsIGxvY2FsTmFtZSkgPT4ge1xuICBpZiAoIW5zKSBucyA9IG51bGxcbiAgcmV0dXJuIFsgLi4uZWwuYXR0cnMgXS5maW5kKChub2RlKSA9PiBub2RlLmxvY2FsTmFtZSA9PT0gbG9jYWxOYW1lICYmIG5vZGUubmFtZXNwYWNlVVJJID09PSBucylcbn1cblxuY29uc3QgZ2V0QXR0cmlidXRlQnlRdWFsaWZpZWROYW1lID0gKGVsLCBxdWFsaWZpZWROYW1lKSA9PiB7XG4gIGlmIChlbC5uYW1lc3BhY2VVUkkgPT09IGh0bWwgJiYgZWwub3duZXJEb2N1bWVudC5uYW1lc3BhY2VVUkkgPT09IGh0bWwpIHtcbiAgICBxdWFsaWZpZWROYW1lID0gcXVhbGlmaWVkTmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICByZXR1cm4gWyAuLi5lbC5hdHRycyBdLmZpbmQoKG5vZGUpID0+IG5vZGUubmFtZSA9PT0gcXVhbGlmaWVkTmFtZSlcbn1cblxuLy8gVGhpcyBQcm94eSBwcm94aWVzIGFsbCBhY2Nlc3MgdG8gbm9kZS5zdHlsZSB0byB0aGUgY3NzIHNhdmVkIGluIHRoZSBhdHRyaWJ1dGVcbmNvbnN0IGdldFN0eWxlUHJveHkgPSAobm9kZSkgPT4ge1xuXG4gIHJldHVybiBuZXcgUHJveHkobm9kZSwge1xuICAgIGdldCAodGFyZ2V0LCBrZXkpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJydcbiAgICAgIGNvbnN0IHN0eWxlTWFwID0gY3NzVG9NYXAoc3R5bGVzKVxuXG4gICAgICBpZiAoa2V5ID09PSAnY3NzVGV4dCcpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc1xuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ID09PSAnc2V0UHJvcGVydHknKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocHJvcGVydHlOYW1lLCB2YWx1ZSA9ICcnLCBwcmlvcml0eSA9ICcnKSB7XG4gICAgICAgICAgbm9kZS5zdHlsZVtwcm9wZXJ0eU5hbWVdID0gdmFsdWUgKyAocHJpb3JpdHkgPyBgICEke3ByaW9yaXR5fWAgOiAnJylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBrZXkgPSBkZWNhbWVsaXplKGtleSlcbiAgICAgIGlmICghc3R5bGVNYXAuaGFzKGtleSkpIHJldHVybiAnJ1xuXG4gICAgICByZXR1cm4gc3R5bGVNYXAuZ2V0KGtleSlcbiAgICB9LFxuICAgIHNldCAodGFyZ2V0LCBrZXksIHZhbHVlKSB7XG4gICAgICBrZXkgPSBkZWNhbWVsaXplKGtleSlcblxuICAgICAgaWYgKGtleSA9PT0gJ2Nzcy10ZXh0Jykge1xuICAgICAgICAvLyBlbnN1cmUgY29ycmVjdCBzcGFjaW5nIGFuZCBzeW50YXggYnkgY29udmVydGluZyBiYWNrIGFuZCBmb3J0aFxuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdzdHlsZScsIG1hcFRvQ3NzKGNzc1RvTWFwKHZhbHVlKSkpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGhleFRvUkdCKHZhbHVlLnRvU3RyaW5nKCkpXG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJydcbiAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBjc3NUb01hcChzdHlsZXMpXG4gICAgICAgIHN0eWxlTWFwLnNldChrZXksIHZhbHVlKVxuXG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgbWFwVG9Dc3Moc3R5bGVNYXApKVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG4vLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2RvbS1lbGVtZW50LXNldGF0dHJpYnV0ZW5zXG5leHBvcnQgY2xhc3MgRWxlbWVudCBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMsIG5zKSB7XG4gICAgc3VwZXIobmFtZSwgcHJvcHMsIG5zKVxuXG4gICAgdGhpcy5zdHlsZSA9IGdldFN0eWxlUHJveHkodGhpcylcbiAgICB0aGlzLnRhZ05hbWUgPSB0aGlzLm5vZGVOYW1lXG4gIH1cblxuICBnZXRBdHRyaWJ1dGUgKHF1YWxpZmllZE5hbWUpIHtcbiAgICBjb25zdCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlKHF1YWxpZmllZE5hbWUpXG4gICAgcmV0dXJuIGF0dHIgPyBhdHRyLnZhbHVlIDogbnVsbFxuICB9XG5cbiAgZ2V0QXR0cmlidXRlTm9kZSAocXVhbGlmaWVkTmFtZSkge1xuICAgIHJldHVybiBnZXRBdHRyaWJ1dGVCeVF1YWxpZmllZE5hbWUodGhpcywgcXVhbGlmaWVkTmFtZSlcbiAgfVxuXG4gIGdldEF0dHJpYnV0ZU5vZGVOUyAobnMsIGxvY2FsTmFtZSkge1xuICAgIHJldHVybiBnZXRBdHRyaWJ1dGVCeU5zQW5kTG9jYWxOYW1lKHRoaXMsIG5zLCBsb2NhbE5hbWUpXG4gIH1cblxuICBnZXRBdHRyaWJ1dGVOUyAobnMsIGxvY2FsTmFtZSkge1xuICAgIGNvbnN0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGVOUyhucywgbG9jYWxOYW1lKVxuICAgIHJldHVybiBhdHRyID8gYXR0ci52YWx1ZSA6IG51bGxcbiAgfVxuXG4gIGdldEJvdW5kaW5nQ2xpZW50UmVjdCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IGltcGxlbWVudGVkIGZvciBTVkcgRWxlbWVudHMnKVxuICB9XG5cbiAgaGFzQXR0cmlidXRlIChxdWFsaWZpZWROYW1lKSB7XG4gICAgY29uc3QgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZShxdWFsaWZpZWROYW1lKVxuICAgIHJldHVybiAhIWF0dHJcbiAgfVxuXG4gIGhhc0F0dHJpYnV0ZU5TIChucywgbG9jYWxOYW1lKSB7XG4gICAgY29uc3QgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZU5TKG5zLCBsb2NhbE5hbWUpXG4gICAgcmV0dXJuICEhYXR0clxuICB9XG5cbiAgbWF0Y2hlcyAocXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaFdpdGhTY29wZShxdWVyeSwgdGhpcylcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZSAocXVhbGlmaWVkTmFtZSkge1xuICAgIGNvbnN0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGUocXVhbGlmaWVkTmFtZSlcbiAgICBpZiAoYXR0cikge1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOb2RlKGF0dHIpXG4gICAgfVxuICAgIHJldHVybiBhdHRyXG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGVOb2RlIChub2RlKSB7XG4gICAgaWYgKCF0aGlzLmF0dHJzLmRlbGV0ZShub2RlKSkgdGhyb3cgbmV3IEVycm9yKCdBdHRyaWJ1dGUgY2Fubm90IGJlIHJlbW92ZWQgYmVjYXVzZSBpdCB3YXMgbm90IGZvdW5kIG9uIHRoZSBlbGVtZW50JylcbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgLy8gY2FsbCBpczogZC5yZW1vdmVBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy5tb3ppbGxhLm9yZy9ucy9zcGVjaWFsc3BhY2UnLCAnYWxpZ24nLCAnY2VudGVyJyk7XG4gIHJlbW92ZUF0dHJpYnV0ZU5TIChucywgbG9jYWxOYW1lKSB7XG4gICAgY29uc3QgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZU5TKG5zLCBsb2NhbE5hbWUpXG4gICAgaWYgKGF0dHIpIHtcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTm9kZShhdHRyKVxuICAgIH1cbiAgICByZXR1cm4gYXR0clxuICB9XG5cbiAgLyogVGhlIHNldEF0dHJpYnV0ZShxdWFsaWZpZWROYW1lLCB2YWx1ZSkgbWV0aG9kLCB3aGVuIGludm9rZWQsIG11c3QgcnVuIHRoZXNlIHN0ZXBzOlxuXG4gICAgSWYgcXVhbGlmaWVkTmFtZSBkb2VzIG5vdCBtYXRjaCB0aGUgTmFtZSBwcm9kdWN0aW9uIGluIFhNTCwgdGhlbiB0aHJvdyBhbiBcIkludmFsaWRDaGFyYWN0ZXJFcnJvclwiIERPTUV4Y2VwdGlvbi5cblxuICAgIElmIHRoaXMgaXMgaW4gdGhlIEhUTUwgbmFtZXNwYWNlIGFuZCBpdHMgbm9kZSBkb2N1bWVudCBpcyBhbiBIVE1MIGRvY3VtZW50LCB0aGVuIHNldCBxdWFsaWZpZWROYW1lIHRvIHF1YWxpZmllZE5hbWUgaW4gQVNDSUkgbG93ZXJjYXNlLlxuXG4gICAgTGV0IGF0dHJpYnV0ZSBiZSB0aGUgZmlyc3QgYXR0cmlidXRlIGluIHRoaXPigJlzIGF0dHJpYnV0ZSBsaXN0IHdob3NlIHF1YWxpZmllZCBuYW1lIGlzIHF1YWxpZmllZE5hbWUsIGFuZCBudWxsIG90aGVyd2lzZS5cblxuICAgIElmIGF0dHJpYnV0ZSBpcyBudWxsLCBjcmVhdGUgYW4gYXR0cmlidXRlIHdob3NlIGxvY2FsIG5hbWUgaXMgcXVhbGlmaWVkTmFtZSwgdmFsdWUgaXMgdmFsdWUsIGFuZCBub2RlIGRvY3VtZW50IGlzIHRoaXPigJlzIG5vZGUgZG9jdW1lbnQsIHRoZW4gYXBwZW5kIHRoaXMgYXR0cmlidXRlIHRvIHRoaXMsIGFuZCB0aGVuIHJldHVybi5cblxuICAgIENoYW5nZSBhdHRyaWJ1dGUgdG8gdmFsdWUuXG4gICovXG4gIHNldEF0dHJpYnV0ZSAocXVhbGlmaWVkTmFtZSwgdmFsdWUpIHtcbiAgICAvLyBXZSBoYXZlIHRvIGRvIHRoYXQgaGVyZSBiZWNhdXNlIHdlIGNhbm5vdCBjaGVjayBpZiBgdGhpc2AgaXMgaW4gdGhlIGNvcnJlY3QgbmFtZXNwYWNlXG4gICAgLy8gd2hlbiBkb2luZyBpdCBpbiBjcmVhdGVBdHRyaWJ1dGVcbiAgICBpZiAodGhpcy5uYW1lc3BhY2VVUkkgPT09IGh0bWwgJiYgdGhpcy5vd25lckRvY3VtZW50Lm5hbWVzcGFjZVVSSSA9PT0gaHRtbCkge1xuICAgICAgcXVhbGlmaWVkTmFtZSA9IHF1YWxpZmllZE5hbWUudG9Mb3dlckNhc2UoKVxuICAgIH1cblxuICAgIGxldCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlKHF1YWxpZmllZE5hbWUpXG4gICAgaWYgKCFhdHRyKSB7XG4gICAgICAvLyBCZWNhdXNlIGNyZWF0ZUF0dHJpYnV0ZSBsb3dlcmNhc2VzIHRoZSBhdHRyaWJ1dGUgaW4gYW4gaHRtbCBkb2Mgd2UgaGF2ZSB0byB1c2UgY3JlYXRlQXR0cmlidXRlTlNcbiAgICAgIGF0dHIgPSB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlTlMobnVsbCwgcXVhbGlmaWVkTmFtZSwgdHJ1ZSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlTm9kZShhdHRyKVxuICAgIH1cblxuICAgIGF0dHIudmFsdWUgPSB2YWx1ZVxuICB9XG5cbiAgLypcbiAgICBMZXQgbmFtZXNwYWNlLCBwcmVmaXgsIGFuZCBsb2NhbE5hbWUgYmUgdGhlIHJlc3VsdCBvZiBwYXNzaW5nIG5hbWVzcGFjZSBhbmQgcXVhbGlmaWVkTmFtZSB0byB2YWxpZGF0ZSBhbmQgZXh0cmFjdC5cblxuICAgIFNldCBhbiBhdHRyaWJ1dGUgdmFsdWUgZm9yIHRoaXMgdXNpbmcgbG9jYWxOYW1lLCB2YWx1ZSwgYW5kIGFsc28gcHJlZml4IGFuZCBuYW1lc3BhY2UuXG5cbiAgICBJZiBwcmVmaXggaXMgbm90IGdpdmVuLCBzZXQgaXQgdG8gbnVsbC5cbiAgICBJZiBuYW1lc3BhY2UgaXMgbm90IGdpdmVuLCBzZXQgaXQgdG8gbnVsbC5cbiAgICBMZXQgYXR0cmlidXRlIGJlIHRoZSByZXN1bHQgb2YgZ2V0dGluZyBhbiBhdHRyaWJ1dGUgZ2l2ZW4gbmFtZXNwYWNlLCBsb2NhbE5hbWUsIGFuZCBlbGVtZW50LlxuICAgIElmIGF0dHJpYnV0ZSBpcyBudWxsLCBjcmVhdGUgYW4gYXR0cmlidXRlIHdob3NlIG5hbWVzcGFjZSBpcyBuYW1lc3BhY2UsIG5hbWVzcGFjZSBwcmVmaXggaXMgcHJlZml4LCBsb2NhbCBuYW1lIGlzIGxvY2FsTmFtZSwgdmFsdWUgaXMgdmFsdWUsIGFuZCBub2RlIGRvY3VtZW50IGlzIGVsZW1lbnTigJlzIG5vZGUgZG9jdW1lbnQsIHRoZW4gYXBwZW5kIHRoaXMgYXR0cmlidXRlIHRvIGVsZW1lbnQsIGFuZCB0aGVuIHJldHVybi5cblxuICAgIENoYW5nZSBhdHRyaWJ1dGUgdG8gdmFsdWUuXG4gICovXG5cbiAgc2V0QXR0cmlidXRlTm9kZSAobm9kZSkge1xuICAgIHRoaXMuYXR0cnMuYWRkKG5vZGUpXG4gICAgbm9kZS5vd25lckVsZW1lbnQgPSB0aGlzXG4gIH1cblxuICAvLyBjYWxsIGlzOiBkLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3Lm1vemlsbGEub3JnL25zL3NwZWNpYWxzcGFjZScsICdzcGVjOmFsaWduJywgJ2NlbnRlcicpO1xuICBzZXRBdHRyaWJ1dGVOUyAobmFtZXNwYWNlLCBuYW1lLCB2YWx1ZSkge1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgY29uc3QgWyBucywgcHJlZml4LCBsb2NhbE5hbWUgXSA9IHZhbGlkYXRlQW5kRXh0cmFjdChuYW1lc3BhY2UsIG5hbWUpXG5cbiAgICBsZXQgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZU5TKG5zLCBsb2NhbE5hbWUpXG4gICAgaWYgKCFhdHRyKSB7XG4gICAgICBhdHRyID0gdGhpcy5vd25lckRvY3VtZW50LmNyZWF0ZUF0dHJpYnV0ZU5TKG5zLCBuYW1lKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVOb2RlKGF0dHIpIC8vIHNldEF0dHJpYnV0ZU5vZGVOUyBpcyBhIHN5bm9ueW0gb2Ygc2V0QXR0cmlidXRlTm9kZVxuICAgIH1cblxuICAgIGF0dHIudmFsdWUgPSB2YWx1ZVxuXG4gICAgdGhpcy5hdHRycy5hZGQoYXR0cilcbiAgfVxuXG4gIGdldCBhdHRyaWJ1dGVzICgpIHtcbiAgICByZXR1cm4gWyAuLi50aGlzLmF0dHJzIF1cbiAgfVxuXG4gIGdldCBjbGFzc05hbWUgKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2xhc3MnKVxuICB9XG5cbiAgc2V0IGNsYXNzTmFtZSAoYykge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjbGFzcycsIGMpXG4gIH1cblxuICBnZXQgaWQgKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaWQnKSB8fCAnJ1xuICB9XG5cbiAgc2V0IGlkIChpZCkge1xuICAgIHJldHVybiB0aGlzLnNldEF0dHJpYnV0ZSgnaWQnLCBpZClcbiAgfVxuXG4gIGdldCBpbm5lckhUTUwgKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuY2hpbGROb2Rlcy5tYXAobm9kZSA9PiB7XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHJldHVybiBodG1sRW50aXRpZXMobm9kZS5kYXRhKVxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuQ0RBVEFfU0VDVElPTl9OT0RFKSByZXR1cm4gY2RhdGEobm9kZS5kYXRhKVxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFKSByZXR1cm4gY29tbWVudChub2RlLmRhdGEpXG4gICAgICByZXR1cm4gbm9kZS5vdXRlckhUTUxcbiAgICB9KS5qb2luKCcnKVxuICB9XG5cbiAgc2V0IGlubmVySFRNTCAoc3RyKSB7XG4gICAgd2hpbGUgKHRoaXMuZmlyc3RDaGlsZCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIC8vIFRoZSBwYXJzZXIgYWRkcyB0aGUgaHRtbCB0byB0aGlzXG4gICAgSFRNTFBhcnNlcihzdHIsIHRoaXMpXG4gIH1cblxuICBnZXQgb3V0ZXJIVE1MICgpIHtcbiAgICByZXR1cm4gdGFnKHRoaXMpXG4gIH1cblxuICBzZXQgb3V0ZXJIVE1MIChzdHIpIHtcbiAgICB2YXIgd2VsbCA9IG5ldyBEb2N1bWVudEZyYWdtZW50KClcbiAgICBIVE1MUGFyc2VyKHN0ciwgd2VsbClcbiAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdlbGwsIHRoaXMpXG4gICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpXG4gIH1cblxufVxuXG5taXhpbihQYXJlbnROb2RlLCBFbGVtZW50KVxubWl4aW4oZWxlbWVudEFjY2VzcywgRWxlbWVudClcbm1peGluKE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZSwgRWxlbWVudClcbm1peGluKENoaWxkTm9kZSwgRWxlbWVudClcbiIsImV4cG9ydCBjbGFzcyBFdmVudCB7XHJcbiAgY29uc3RydWN0b3IgKHR5cGUpIHtcclxuICAgIHRoaXMudHlwZSA9IHR5cGVcclxuICAgIHRoaXMuY2FuY2VsYWJsZSA9IGZhbHNlXHJcbiAgICB0aGlzLmRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZVxyXG4gICAgdGhpcy50YXJnZXQgPSBudWxsXHJcbiAgfVxyXG5cclxuICBwcmV2ZW50RGVmYXVsdCAoKSB7XHJcbiAgICBpZiAodGhpcy5jYW5jZWxhYmxlKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IHRydWVcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiY29uc3QgJCA9IFN5bWJvbCgncHJpdmF0ZSBwcm9wZXJ0aWVzJylcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudFRhcmdldCB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgdGhpc1skXSA9IHt9XHJcbiAgICB0aGlzWyRdLmxpc3RlbmVycyA9IHt9XHJcbiAgfVxyXG5cclxuICBhZGRFdmVudExpc3RlbmVyICh0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgaWYgKCEodHlwZSBpbiB0aGlzWyRdLmxpc3RlbmVycykpIHtcclxuICAgICAgdGhpc1skXS5saXN0ZW5lcnNbdHlwZV0gPSBbXVxyXG4gICAgfVxyXG4gICAgdGhpc1skXS5saXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjaylcclxuICB9XHJcblxyXG4gIGRpc3BhdGNoRXZlbnQgKGV2ZW50KSB7XHJcbiAgICBpZiAoIShldmVudC50eXBlIGluIHRoaXNbJF0ubGlzdGVuZXJzKSkgeyByZXR1cm4gdHJ1ZSB9XHJcblxyXG4gICAgdmFyIHN0YWNrID0gdGhpc1skXS5saXN0ZW5lcnNbZXZlbnQudHlwZV1cclxuICAgIGV2ZW50LnRhcmdldCA9IHRoaXNcclxuXHJcbiAgICBzdGFjay5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbChldmVudClcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuICFldmVudC5kZWZhdWx0UHJldmVudGVkXHJcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIgKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoISh0eXBlIGluIHRoaXNbJF0ubGlzdGVuZXJzKSkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3RhY2sgPSB0aGlzWyRdLmxpc3RlbmVyc1t0eXBlXVxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc3RhY2subGVuZ3RoOyBpIDwgaWw7IGkrKykge1xyXG4gICAgICBpZiAoc3RhY2tbaV0gPT09IGNhbGxiYWNrKSB7XHJcbiAgICAgICAgc3RhY2suc3BsaWNlKGksIDEpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IGV4dGVuZCwgZXh0ZW5kU3RhdGljIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcblxuaW1wb3J0IHsgRXZlbnRUYXJnZXQgfSBmcm9tICcuL0V2ZW50VGFyZ2V0LmpzJ1xuaW1wb3J0IHsgY2xvbmVOb2RlIH0gZnJvbSAnLi4vdXRpbHMvdGFnVXRpbHMuanMnXG5pbXBvcnQgeyBodG1sIH0gZnJvbSAnLi4vdXRpbHMvbmFtZXNwYWNlcy5qcydcblxuY29uc3Qgbm9kZVR5cGVzID0ge1xuICBFTEVNRU5UX05PREU6IDEsXG4gIEFUVFJJQlVURV9OT0RFOiAyLFxuICBURVhUX05PREU6IDMsXG4gIENEQVRBX1NFQ1RJT05fTk9ERTogNCxcbiAgRU5USVRZX1JFRkVSRU5DRV9OT0RFOiA1LFxuICBFTlRJVFlfTk9ERTogNixcbiAgUFJPQ0VTU0lOR19JTlNUUlVDVElPTl9OT0RFOiA3LFxuICBDT01NRU5UX05PREU6IDgsXG4gIERPQ1VNRU5UX05PREU6IDksXG4gIERPQ1VNRU5UX1RZUEVfTk9ERTogMTAsXG4gIERPQ1VNRU5UX0ZSQUdNRU5UX05PREU6IDExLFxuICBOT1RBVElPTl9OT0RFOiAxMlxufVxuXG5leHBvcnQgY2xhc3MgTm9kZSBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcbiAgY29uc3RydWN0b3IgKG5hbWUgPSAnJywgcHJvcHMgPSB7fSwgbnMgPSBudWxsKSB7XG4gICAgc3VwZXIoKVxuXG4gICAgLy8gSWYgcHJvcHMubG9jYWwgaXMgdHJ1ZSwgdGhlIGVsZW1lbnQgd2FzIE5vZGUgd2FzIGNyZWF0ZWQgd2l0aCB0aGUgbm9uLW5hbWVzcGFjZSBmdW5jdGlvblxuICAgIC8vIHRoYXQgbWVhbnMgd2hhdGV2ZXIgd2FzIHBhc3NlZCBhcyBuYW1lIGlzIHRoZSBsb2NhbCBuYW1lIGV2ZW4gdGhvdWdoIGl0IG1pZ2h0IGxvb2sgbGlrZSBhIHByZWZpeFxuICAgIGlmIChuYW1lLmluY2x1ZGVzKCc6JykgJiYgIXByb3BzLmxvY2FsKSB7XG4gICAgICA7WyB0aGlzLnByZWZpeCwgdGhpcy5sb2NhbE5hbWUgXSA9IG5hbWUuc3BsaXQoJzonKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvY2FsTmFtZSA9IG5hbWVcbiAgICAgIHRoaXMucHJlZml4ID0gbnVsbFxuICAgIH1cblxuICAgIC8vIEZvbGxvdyBzcGVjIGFuZCB1cHBlcmNhc2Ugbm9kZU5hbWUgZm9yIGh0bWxcbiAgICB0aGlzLm5vZGVOYW1lID0gbnMgPT09IGh0bWwgPyBuYW1lLnRvVXBwZXJDYXNlKCkgOiBuYW1lXG5cbiAgICB0aGlzLm5hbWVzcGFjZVVSSSA9IG5zXG4gICAgdGhpcy5ub2RlVHlwZSA9IE5vZGUuRUxFTUVOVF9OT0RFXG4gICAgdGhpcy5ub2RlVmFsdWUgPSBwcm9wcy5ub2RlVmFsdWUgIT0gbnVsbCA/IHByb3BzLm5vZGVWYWx1ZSA6IG51bGxcbiAgICB0aGlzLmNoaWxkTm9kZXMgPSBbXVxuXG4gICAgdGhpcy5hdHRycyA9IHByb3BzLmF0dHJzIHx8IG5ldyBTZXQoKVxuXG4gICAgdGhpcy5vd25lckRvY3VtZW50ID0gcHJvcHMub3duZXJEb2N1bWVudCB8fCBudWxsXG4gICAgdGhpcy5wYXJlbnROb2RlID0gbnVsbFxuXG4gICAgLy8gdGhpcy5uYW1lc3BhY2VzID0ge31cbiAgICAvLyBpZiAodGhpcy5wcmVmaXgpIHtcbiAgICAvLyAgIHRoaXMubmFtZXNwYWNlc1t0aGlzLnByZWZpeF0gPSBuc1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICB0aGlzLm5hbWVzcGFjZXMuZGVmYXVsdCA9IG5zXG4gICAgLy8gfVxuXG4gICAgaWYgKHByb3BzLmNoaWxkTm9kZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IHByb3BzLmNoaWxkTm9kZXMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHByb3BzLmNoaWxkTm9kZXNbaV0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXBwZW5kQ2hpbGQgKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRCZWZvcmUobm9kZSlcbiAgfVxuXG4gIGNsb25lTm9kZSAoZGVlcCA9IGZhbHNlKSB7XG4gICAgY29uc3QgY2xvbmUgPSBjbG9uZU5vZGUodGhpcylcblxuICAgIGlmIChkZWVwKSB7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGVsLmNsb25lTm9kZShkZWVwKVxuICAgICAgICBjbG9uZS5hcHBlbmRDaGlsZChub2RlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmVcbiAgfVxuXG4gIGNvbnRhaW5zIChub2RlKSB7XG4gICAgaWYgKG5vZGUgPT09IHRoaXMpIHJldHVybiBmYWxzZVxuXG4gICAgd2hpbGUgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgaWYgKG5vZGUgPT09IHRoaXMpIHJldHVybiB0cnVlXG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZ2V0Um9vdE5vZGUgKCkge1xuICAgIGlmICghdGhpcy5wYXJlbnROb2RlIHx8IHRoaXMubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfTk9ERSkgcmV0dXJuIHRoaXNcbiAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmdldFJvb3ROb2RlKClcbiAgfVxuXG4gIGhhc0NoaWxkTm9kZXMgKCkge1xuICAgIHJldHVybiAhIXRoaXMuY2hpbGROb2Rlcy5sZW5ndGhcbiAgfVxuXG4gIGluc2VydEJlZm9yZSAobm9kZSwgYmVmb3JlKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5jaGlsZE5vZGVzLmluZGV4T2YoYmVmb3JlKVxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5jaGlsZE5vZGVzLmxlbmd0aFxuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpIHtcbiAgICAgIGxldCBjaGlsZFxuICAgICAgbGV0IG9sZENoaWxkID0gYmVmb3JlXG4gICAgICB3aGlsZSAoKGNoaWxkID0gbm9kZS5jaGlsZE5vZGVzLnBvcCgpKSkge1xuICAgICAgICB0aGlzLmluc2VydEJlZm9yZShjaGlsZCwgb2xkQ2hpbGQpXG4gICAgICAgIG9sZENoaWxkID0gY2hpbGRcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlXG4gICAgfVxuXG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4gICAgfVxuXG4gICAgbm9kZS5wYXJlbnROb2RlID0gdGhpc1xuICAgIC8vIE9iamVjdC5zZXRQcm90b3R5cGVPZihub2RlLm5hbWVzcGFjZXMucHJvdG90eXBlLCB0aGlzLm5hbWVzcGFjZXMucHJvdG90eXBlKVxuXG4gICAgdGhpcy5jaGlsZE5vZGVzLnNwbGljZShpbmRleCwgMCwgbm9kZSlcbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgaXNEZWZhdWx0TmFtZXNwYWNlIChuYW1lc3BhY2VVUkkpIHtcbiAgICBzd2l0Y2ggKHRoaXMubm9kZVR5cGUpIHtcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxuICAgICAgaWYgKCF0aGlzLnByZWZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lc3BhY2VVUkkgPT09IG5hbWVzcGFjZVVSSVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3htbG5zJykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd4bWxucycpXG4gICAgICB9XG5cbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfTk9ERTpcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudC5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxuICAgIGNhc2UgTm9kZS5FTlRJVFlfTk9ERTpcbiAgICBjYXNlIE5vZGUuTk9UQVRJT05fTk9ERTpcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfVFlQRV9OT0RFOlxuICAgIGNhc2UgTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgY2FzZSBOb2RlLkFUVFJJQlVURV9OT0RFOlxuICAgICAgaWYgKHRoaXMub3duZXJFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm93bmVyRWxlbWVudC5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaXNFcXVhbE5vZGUgKG5vZGUpIHtcbiAgICB0aGlzLm5vcm1hbGl6ZSgpXG4gICAgbm9kZS5ub3JtYWxpemUoKVxuXG4gICAgbGV0IGJvb2wgPSB0aGlzLm5vZGVOYW1lID09PSBub2RlLm5vZGVOYW1lXG4gICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5sb2NhbE5hbWUgPT09IG5vZGUubG9jYWxOYW1lXG4gICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5uYW1lc3BhY2VVUkkgPT09IG5vZGUubmFtZXNwYWNlVVJJXG4gICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5wcmVmaXggPT09IG5vZGUucHJlZml4XG4gICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5ub2RlVmFsdWUgPT09IG5vZGUubm9kZVZhbHVlXG5cbiAgICBib29sID0gYm9vbCAmJiB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoID09PSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoXG5cbiAgICAvLyBkb250IGNoZWNrIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5IHdoZW4gdGhlIGNvdW50IGRvZXNudCBldmVudCBhZGQgdXBcbiAgICBpZiAoIWJvb2wpIHJldHVybiBmYWxzZVxuXG4gICAgYm9vbCA9IGJvb2wgJiYgIXRoaXMuY2hpbGROb2Rlcy5yZWR1Y2UoKGxhc3QsIGN1cnIsIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gbGFzdCAmJiBjdXJyLmlzRXF1YWxOb2RlKG5vZGUuY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgfSwgdHJ1ZSlcblxuICAgIC8vIEZJWE1FOiBVc2UgYXR0ciBub2Rlc1xuICAgIC8qIGJvb2wgPSBib29sICYmICFbIC4uLnRoaXMuYXR0cnMuZW50cmllcygpIF0ucmVkdWNlKChsYXN0LCBjdXJyLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgWyBrZXksIHZhbCBdID0gbm9kZS5hdHRycy5lbnRyaWVzKClcbiAgICAgIHJldHVybiBsYXN0ICYmIGN1cnJbMF0gPT09IGtleSAmJiBjdXJyWzFdID09PSB2YWxcbiAgICB9LCB0cnVlKSAqL1xuXG4gICAgLypcbiAgICBUT0RPOlxuICAgIEZvciB0d28gRG9jdW1lbnRUeXBlIG5vZGVzIHRvIGJlIGVxdWFsLCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgbXVzdCBhbHNvIGJlIHNhdGlzZmllZDpcblxuICAgIFRoZSBmb2xsb3dpbmcgc3RyaW5nIGF0dHJpYnV0ZXMgYXJlIGVxdWFsOiBwdWJsaWNJZCwgc3lzdGVtSWQsIGludGVybmFsU3Vic2V0LlxuICAgIFRoZSBlbnRpdGllcyBOYW1lZE5vZGVNYXBzIGFyZSBlcXVhbC5cbiAgICBUaGUgbm90YXRpb25zIE5hbWVkTm9kZU1hcHMgYXJlIGVxdWFsLlxuICAgICovXG5cbiAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9UWVBFX05PREUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9UWVBFX05PREUpIHtcbiAgICAgIGJvb2wgPSBib29sICYmIHRoaXMucHVibGljSWQgPT09IG5vZGUucHVibGljSWRcbiAgICAgIGJvb2wgPSBib29sICYmIHRoaXMuc3lzdGVtSWQgPT09IG5vZGUuc3lzdGVtSWRcbiAgICAgIGJvb2wgPSBib29sICYmIHRoaXMuaW50ZXJuYWxTdWJzZXQgPT09IG5vZGUuaW50ZXJuYWxTdWJzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gYm9vbFxuICB9XG5cbiAgaXNTYW1lTm9kZSAobm9kZSkge1xuICAgIHJldHVybiB0aGlzID09PSBub2RlXG4gIH1cblxuICBsb29rdXBOYW1lc3BhY2VQcmVmaXggKG5hbWVzcGFjZVVSSSwgb3JpZ2luYWxFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMubmFtZXNwYWNlVVJJICYmIHRoaXMubmFtZXNwYWNlVVJJID09PSBuYW1lc3BhY2VVUkkgJiYgdGhpcy5wcmVmaXhcbiAgICAgICAgICYmIG9yaWdpbmFsRWxlbWVudC5sb29rdXBOYW1lc3BhY2VVUkkodGhpcy5wcmVmaXgpID09PSBuYW1lc3BhY2VVUkkpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZWZpeFxuICAgIH1cblxuICAgIGZvciAoY29uc3QgWyBrZXksIHZhbCBdIG9mIHRoaXMuYXR0cnMuZW50cmllcygpKSB7XG4gICAgICBpZiAoIWtleS5pbmNsdWRlcygnOicpKSBjb250aW51ZVxuXG4gICAgICBjb25zdCBbIGF0dHJQcmVmaXgsIG5hbWUgXSA9IGtleS5zcGxpdCgnOicpXG4gICAgICBpZiAoYXR0clByZWZpeCA9PT0gJ3htbG5zJyAmJiB2YWwgPT09IG5hbWVzcGFjZVVSSSAmJiBvcmlnaW5hbEVsZW1lbnQubG9va3VwTmFtZXNwYWNlVVJJKG5hbWUpID09PSBuYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgcmV0dXJuIG5hbWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbnRpdHlSZWZlcmVuY2VzIG1heSBoYXZlIHRvIGJlIHNraXBwZWQgdG8gZ2V0IHRvIGl0XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJLCBvcmlnaW5hbEVsZW1lbnQpXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBsb29rdXBOYW1lc3BhY2VVUkkgKHByZWZpeCkge1xuICAgIHN3aXRjaCAodGhpcy5ub2RlVHlwZSkge1xuICAgIGNhc2UgTm9kZS5FTEVNRU5UX05PREU6XG4gICAgICBpZiAodGhpcy5uYW1lc3BhY2VVUkkgIT0gbnVsbCAmJiB0aGlzLnByZWZpeCA9PT0gcHJlZml4KSB7XG4gICAgICAgIC8vIE5vdGU6IHByZWZpeCBjb3VsZCBiZSBcIm51bGxcIiBpbiB0aGlzIGNhc2Ugd2UgYXJlIGxvb2tpbmcgZm9yIGRlZmF1bHQgbmFtZXNwYWNlXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVzcGFjZVVSSVxuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IFsga2V5LCB2YWwgXSBvZiB0aGlzLmF0dHJzLmVudHJpZXMoKSkge1xuICAgICAgICBpZiAoIWtleS5pbmNsdWRlcygnOicpKSBjb250aW51ZVxuXG4gICAgICAgIGNvbnN0IFsgYXR0clByZWZpeCwgbmFtZSBdID0ga2V5LnNwbGl0KCc6JylcbiAgICAgICAgaWYgKGF0dHJQcmVmaXggPT09ICd4bWxucycgJiYgbmFtZSA9PT0gcHJlZml4KSB7XG4gICAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgLy8gRklYTUU6IExvb2sgdXAgaWYgcHJlZml4IG9yIGF0dHJQcmVmaXhcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAneG1sbnMnICYmIHByZWZpeCA9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRW50aXR5UmVmZXJlbmNlcyBtYXkgaGF2ZSB0byBiZSBza2lwcGVkIHRvIGdldCB0byBpdFxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmxvb2t1cE5hbWVzcGFjZVVSSShwcmVmaXgpXG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIGNhc2UgTm9kZS5ET0NVTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRFbGVtZW50Lmxvb2t1cE5hbWVzcGFjZVVSSShwcmVmaXgpXG4gICAgY2FzZSBOb2RlLkVOVElUWV9OT0RFOlxuICAgIGNhc2UgTm9kZS5OT1RBVElPTl9OT0RFOlxuICAgIGNhc2UgTm9kZS5ET0NVTUVOVF9UWVBFX05PREU6XG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XG4gICAgICByZXR1cm4gbnVsbFxuICAgIGNhc2UgTm9kZS5BVFRSSUJVVEVfTk9ERTpcbiAgICAgIGlmICh0aGlzLm93bmVyRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vd25lckVsZW1lbnQubG9va3VwTmFtZXNwYWNlVVJJKHByZWZpeClcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5sb29rdXBOYW1lc3BhY2VVUkkocHJlZml4KVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBsb29rdXBQcmVmaXggKG5hbWVzcGFjZVVSSSkge1xuICAgIGlmICghbmFtZXNwYWNlVVJJKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLm5vZGVUeXBlXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIHRoaXMubG9va3VwTmFtZXNwYWNlUHJlZml4KG5hbWVzcGFjZVVSSSwgdGhpcylcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfTk9ERTpcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudC5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJKVxuICAgIGNhc2UgTm9kZS5FTlRJVFlfTk9ERSA6XG4gICAgY2FzZSBOb2RlLk5PVEFUSU9OX05PREU6XG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERTpcbiAgICAgIHJldHVybiBudWxsIC8vIHR5cGUgaXMgdW5rbm93blxuICAgIGNhc2UgTm9kZS5BVFRSSUJVVEVfTk9ERTpcbiAgICAgIGlmICh0aGlzLm93bmVyRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vd25lckVsZW1lbnQubG9va3VwTmFtZXNwYWNlUHJlZml4KG5hbWVzcGFjZVVSSSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBub3JtYWxpemUgKCkge1xuICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBbXVxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLmNoaWxkTm9kZXMpIHtcbiAgICAgIGNvbnN0IGxhc3QgPSBjaGlsZE5vZGVzLnNoaWZ0KClcbiAgICAgIGlmICghbGFzdCkge1xuICAgICAgICBpZiAobm9kZS5kYXRhKSB7XG4gICAgICAgICAgY2hpbGROb2Rlcy51bnNoaWZ0KG5vZGUpXG4gICAgICAgIH1cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgIGlmICghbm9kZS5kYXRhKSB7XG4gICAgICAgICAgY2hpbGROb2Rlcy51bnNoaWZ0KGxhc3QpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsYXN0LmRhdGEgKyBub2RlLmRhdGEpXG4gICAgICAgICAgY2hpbGROb2Rlcy5wdXNoKG1lcmdlZClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2hpbGROb2Rlcy5wdXNoKGxhc3QsIG5vZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgbm9kZS5wYXJlbnROb2RlID0gdGhpc1xuICAgIH0pXG4gICAgdGhpcy5jaGlsZE5vZGVzID0gY2hpbGROb2Rlc1xuICAgIC8vIHRoaXMuY2hpbGROb2RlcyA9IHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKCh0ZXh0Tm9kZXMsIG5vZGUpID0+IHtcbiAgICAvLyAgIC8vIEZJWE1FOiBJZiBmaXJzdCBub2RlIGlzIGFuIGVtcHR5IHRleHRub2RlLCB3aGF0IGRvIHdlIGRvPyAtPiBzcGVjXG4gICAgLy8gICBpZiAoIXRleHROb2RlcykgcmV0dXJuIFsgbm9kZSBdXG4gICAgLy8gICB2YXIgbGFzdCA9IHRleHROb2Rlcy5wb3AoKVxuXG4gICAgLy8gICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAvLyAgICAgaWYgKCFub2RlLmRhdGEpIHJldHVybiB0ZXh0Tm9kZXNcblxuICAgIC8vICAgICBpZiAobGFzdC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAvLyAgICAgICBjb25zdCBtZXJnZWQgPSB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGFzdC5kYXRhICsgJyAnICsgbm9kZS5kYXRhKVxuICAgIC8vICAgICAgIHRleHROb2Rlcy5wdXNoKG1lcmdlZClcbiAgICAvLyAgICAgICByZXR1cm4gdGV4dE5vZGVzLmNvbmNhdChtZXJnZWQpXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIHRleHROb2Rlcy5wdXNoKGxhc3QsIG5vZGUpXG4gICAgLy8gICB9XG5cbiAgICAvLyAgIHJldHVybiB0ZXh0Tm9kZXNcbiAgICAvLyB9LCBudWxsKVxuICB9XG5cbiAgcmVtb3ZlQ2hpbGQgKG5vZGUpIHtcblxuICAgIG5vZGUucGFyZW50Tm9kZSA9IG51bGxcbiAgICAvLyBPYmplY3Quc2V0UHJvdG90eXBlT2Yobm9kZSwgbnVsbClcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hpbGROb2Rlcy5pbmRleE9mKG5vZGUpXG4gICAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuIG5vZGVcbiAgICB0aGlzLmNoaWxkTm9kZXMuc3BsaWNlKGluZGV4LCAxKVxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICByZXBsYWNlQ2hpbGQgKG5ld0NoaWxkLCBvbGRDaGlsZCkge1xuICAgIGNvbnN0IGJlZm9yZSA9IG9sZENoaWxkLm5leHRTaWJsaW5nXG4gICAgdGhpcy5yZW1vdmVDaGlsZChvbGRDaGlsZClcbiAgICB0aGlzLmluc2VydEJlZm9yZShuZXdDaGlsZCwgYmVmb3JlKVxuICAgIHJldHVybiBvbGRDaGlsZFxuICB9XG5cbiAgZ2V0IG5leHRTaWJsaW5nICgpIHtcbiAgICBjb25zdCBjaGlsZCA9IHRoaXMucGFyZW50Tm9kZSAmJiB0aGlzLnBhcmVudE5vZGUuY2hpbGROb2Rlc1t0aGlzLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5pbmRleE9mKHRoaXMpICsgMV1cbiAgICByZXR1cm4gY2hpbGQgfHwgbnVsbFxuICB9XG5cbiAgZ2V0IHByZXZpb3VzU2libGluZyAoKSB7XG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLnBhcmVudE5vZGUgJiYgdGhpcy5wYXJlbnROb2RlLmNoaWxkTm9kZXNbdGhpcy5wYXJlbnROb2RlLmNoaWxkTm9kZXMuaW5kZXhPZih0aGlzKSAtIDFdXG4gICAgcmV0dXJuIGNoaWxkIHx8IG51bGxcbiAgfVxuXG4gIGdldCB0ZXh0Q29udGVudCAoKSB7XG4gICAgaWYgKHRoaXMubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSByZXR1cm4gdGhpcy5kYXRhXG4gICAgaWYgKHRoaXMubm9kZVR5cGUgPT09IE5vZGUuQ0RBVEFfU0VDVElPTl9OT0RFKSByZXR1cm4gdGhpcy5kYXRhXG4gICAgaWYgKHRoaXMubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFKSByZXR1cm4gdGhpcy5kYXRhXG5cbiAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzLnJlZHVjZShmdW5jdGlvbiAobGFzdCwgY3VycmVudCkge1xuICAgICAgcmV0dXJuIGxhc3QgKyBjdXJyZW50LnRleHRDb250ZW50XG4gICAgfSwgJycpXG4gIH1cblxuICBzZXQgdGV4dENvbnRlbnQgKHRleHQpIHtcbiAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUgfHwgdGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5DREFUQV9TRUNUSU9OX05PREUgfHwgdGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREUpIHtcbiAgICAgIHRoaXMuZGF0YSA9IHRleHRcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmNoaWxkTm9kZXMgPSBbXVxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKVxuICB9XG5cbiAgZ2V0IGxhc3RDaGlsZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGROb2Rlc1t0aGlzLmNoaWxkTm9kZXMubGVuZ3RoIC0gMV0gfHwgbnVsbFxuICB9XG5cbiAgZ2V0IGZpcnN0Q2hpbGQgKCkge1xuICAgIHJldHVybiB0aGlzLmNoaWxkTm9kZXNbMF0gfHwgbnVsbFxuICB9XG59XG5cbmV4dGVuZFN0YXRpYyhOb2RlLCBub2RlVHlwZXMpXG5leHRlbmQoTm9kZSwgbm9kZVR5cGVzKVxuIiwiaW1wb3J0IHsgZXh0ZW5kU3RhdGljIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlRmlsdGVyIHtcclxuICBhY2NlcHROb2RlICgpIHtcclxuICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFRcclxuICB9XHJcbn1cclxuXHJcbmV4dGVuZFN0YXRpYyhOb2RlRmlsdGVyLCB7XHJcbiAgRklMVEVSX0FDQ0VQVDogMSxcclxuICBGSUxURVJfUkVKRUNUOiAyLFxyXG4gIEZJTFRFUl9JR05PUkU6IDQsXHJcbiAgU0hPV19BTEw6IC0xLFxyXG4gIFNIT1dfRUxFTUVOVDogMSxcclxuICBTSE9XX1RFWFQ6IDQsXHJcbiAgU0hPV19FTlRJVFlfUkVGRVJFTkNFOiAxNixcclxuICBTSE9XX0VOVElUWTogMzIsXHJcbiAgU0hPV19QUk9DRVNTSU5HX0lOU1RSVUNUSU9OOiA2NCxcclxuICBTSE9XX0NPTU1FTlQ6IDEyOCxcclxuICBTSE9XX0RPQ1VNRU5UOiAyNTYsXHJcbiAgU0hPV19ET0NVTUVOVF9UWVBFOiA1MTIsXHJcbiAgU0hPV19ET0NVTUVOVF9GUkFHTUVOVDogMTAyNCxcclxuICBTSE9XX05PVEFUSU9OOiAyMDQ4XHJcbn0pXHJcbiIsImltcG9ydCB7IENoYXJhY3RlckRhdGEgfSBmcm9tICcuL0NoYXJhY3RlckRhdGEuanMnXHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIENoYXJhY3RlckRhdGEge1xyXG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcykge1xyXG4gICAgc3VwZXIobmFtZSwgcHJvcHMpXHJcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5URVhUX05PREVcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcbmltcG9ydCB7IEV2ZW50VGFyZ2V0IH0gZnJvbSAnLi9FdmVudFRhcmdldC5qcydcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXG5pbXBvcnQgeyBEb2N1bWVudCB9IGZyb20gJy4vRG9jdW1lbnQuanMnXG5pbXBvcnQgeyBEb2N1bWVudEZyYWdtZW50IH0gZnJvbSAnLi9Eb2N1bWVudEZyYWdtZW50LmpzJ1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vVGV4dC5qcydcbmltcG9ydCB7IEN1c3RvbUV2ZW50IH0gZnJvbSAnLi9DdXN0b21FdmVudC5qcydcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9FdmVudC5qcydcbmltcG9ydCB7IEVsZW1lbnQgfSBmcm9tICcuL0VsZW1lbnQuanMnXG5pbXBvcnQgeyBBdHRyIH0gZnJvbSAnLi9BdHRyLmpzJ1xuaW1wb3J0IHsgSFRNTEltYWdlRWxlbWVudCB9IGZyb20gJy4vaHRtbC9IVE1MSW1hZ2VFbGVtZW50LmpzJ1xuaW1wb3J0IHsgSFRNTExpbmtFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxMaW5rRWxlbWVudC5qcydcbmltcG9ydCB7IEhUTUxTY3JpcHRFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzJ1xuaW1wb3J0IHsgSFRNTEVsZW1lbnQgfSBmcm9tICcuL2h0bWwvSFRNTEVsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdQb2ludCB9IGZyb20gJy4vc3ZnL1NWR1BvaW50LmpzJ1xuaW1wb3J0IHsgU1ZHTWF0cml4IH0gZnJvbSAnLi9zdmcvU1ZHTWF0cml4LmpzJ1xuaW1wb3J0IHsgU1ZHRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR0VsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdTVkdFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHU1ZHRWxlbWVudC5qcydcbmltcG9ydCB7IFNWR1BhdGhFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHUGF0aEVsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdHcmFwaGljc0VsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdUZXh0Q29udGVudEVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdUZXh0Q29udGVudEVsZW1lbnQuanMnXG5pbXBvcnQgeyBjYW1lbENhc2UgfSBmcm9tICcuLi91dGlscy9zdHJVdGlscy5qcydcbmltcG9ydCAqIGFzIGRlZmF1bHRzIGZyb20gJy4uL3V0aWxzL2RlZmF1bHRzLmpzJ1xuXG5leHBvcnQgY2xhc3MgV2luZG93IGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZG9jdW1lbnQgPSBuZXcgRG9jdW1lbnQoKVxuICAgIHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgPSB0aGlzXG4gICAgdGhpcy5zZWxmID0gdGhpc1xuICAgIGNvbnN0IGRvYyA9IHRoaXMuZG9jdW1lbnRcbiAgICB0aGlzLkltYWdlID0gY2xhc3Mge1xuICAgICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgY29uc3QgaW1nID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgIGlmICh3aWR0aCAhPSBudWxsKSBpbWcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoKVxuICAgICAgICBpZiAoaGVpZ2h0ICE9IG51bGwpIGltZy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgcmV0dXJuIGltZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENvbXB1dGVkU3R5bGUgKG5vZGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gRklYTUU6IEN1cnJlbnRseSB0aGlzIGZ1bmN0aW9uIHRyZWF0cyBldmVyeSBnaXZlbiBhdHRyXG4gICAgICAvLyBhcyBpbmhlcml0YWJsZSBmcm9tIGl0cyBwYXJlbnRzIHdoaWNoIGlzIG9mYyBub3QgYWx3YXlzIHRydWVcbiAgICAgIC8vIGJ1dCBnb29kIGVub3VnaCBmb3Igc3ZnLmpzXG4gICAgICBnZXRQcm9wZXJ0eVZhbHVlIChhdHRyKSB7XG4gICAgICAgIGxldCB2YWx1ZVxuICAgICAgICBsZXQgY3VyID0gbm9kZVxuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICB2YWx1ZSA9IGN1ci5zdHlsZVthdHRyXSB8fCBjdXIuZ2V0QXR0cmlidXRlKGF0dHIpXG4gICAgICAgIH0gd2hpbGUgKFxuICAgICAgICAgIHZhbHVlID09IG51bGxcbiAgICAgICAgICAmJiAoY3VyID0gY3VyLnBhcmVudE5vZGUpXG4gICAgICAgICAgJiYgY3VyLm5vZGVUeXBlID09PSAxXG4gICAgICAgIClcblxuICAgICAgICByZXR1cm4gdmFsdWUgfHwgZGVmYXVsdHNbY2FtZWxDYXNlKGF0dHIpXSB8fCBudWxsXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmxldCBsYXN0VGltZSA9IDBcbmNvbnN0IHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGNhbGxiYWNrID0+IHtcbiAgY29uc3Qgbm93ID0gbmV3IGdsb2JhbC5EYXRlKCkuZ2V0VGltZSgpXG4gIGNvbnN0IHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChub3cgLSBsYXN0VGltZSkpXG4gIHJldHVybiBnbG9iYWwuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbGFzdFRpbWUgPSBub3cgKyB0aW1lVG9DYWxsXG4gICAgY2FsbGJhY2sobGFzdFRpbWUpXG4gIH0sIHRpbWVUb0NhbGwpXG59XG5cbmNvbnN0IG5vd09mZnNldCA9IGdsb2JhbC5EYXRlLm5vdygpXG5jb25zdCBwZXJmb3JtYW5jZSA9IHtcbiAgbm93OiAoKSA9PiBEYXRlLm5vdygpIC0gbm93T2Zmc2V0XG59XG5cbmNvbnN0IHdpblByb3BzID0ge1xuICBXaW5kb3csXG4gIERvY3VtZW50LFxuICBEb2N1bWVudEZyYWdtZW50LFxuICBOb2RlLFxuICBFdmVudFRhcmdldCxcbiAgVGV4dCxcbiAgQXR0cixcbiAgRWxlbWVudCxcbiAgQ3VzdG9tRXZlbnQsXG4gIEV2ZW50LFxuICBIVE1MRWxlbWVudCxcbiAgSFRNTExpbmtFbGVtZW50LFxuICBIVE1MU2NyaXB0RWxlbWVudCxcbiAgSFRNTEltYWdlRWxlbWVudCxcbiAgLy8gSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIC8vIGlzIHNldCBvbiBjb25zdHJ1Y3Rpb25cbiAgU1ZHTWF0cml4LFxuICBTVkdQb2ludCxcbiAgU1ZHRWxlbWVudCxcbiAgU1ZHU1ZHRWxlbWVudCxcbiAgU1ZHUGF0aEVsZW1lbnQsXG4gIFNWR0dyYXBoaWNzRWxlbWVudCxcbiAgU1ZHVGV4dENvbnRlbnRFbGVtZW50LFxuICBzZXRUaW1lb3V0OiBnbG9iYWwuc2V0VGltZW91dCxcbiAgY2xlYXJUaW1lb3V0OiBnbG9iYWwuY2xlYXJUaW1lb3V0LFxuICBwYWdlWE9mZnNldDogMCxcbiAgcGFnZVlPZmZzZXQ6IDAsXG4gIERhdGU6IGdsb2JhbC5EYXRlLFxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lOiBnbG9iYWwuY2xlYXJUaW1lb3V0LFxuICBwZXJmb3JtYW5jZVxufVxuXG5leHRlbmQoV2luZG93LCB3aW5Qcm9wcylcbiIsImltcG9ydCB7IEVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50LmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEhUTUxFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7fVxyXG4iLCJpbXBvcnQgc2l6ZU9mIGZyb20gJ2ltYWdlLXNpemUnXHJcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi4vRXZlbnQuanMnXHJcbmltcG9ydCB7IEhUTUxFbGVtZW50IH0gZnJvbSAnLi9IVE1MRWxlbWVudC5qcydcclxuLy8gaW1wb3J0IHsgZ2V0RmlsZUJ1ZmZlckZyb21VUkwgfSBmcm9tICcuLi8uLi91dGlscy9maWxlVXJsVG9CdWZmZXIuanMnXHJcbi8vIGltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG5leHBvcnQgY2xhc3MgSFRNTEltYWdlRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICBjb25zdHJ1Y3RvciAoLi4uYXJncykge1xyXG4gICAgc3VwZXIoLi4uYXJncylcclxuICAgIHRoaXMubmF0dXJhbFdpZHRoID0gMFxyXG4gICAgdGhpcy5uYXR1cmFsSGVpZ2h0ID0gMFxyXG4gICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlXHJcbiAgfVxyXG59XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhIVE1MSW1hZ2VFbGVtZW50LnByb3RvdHlwZSwge1xyXG4gIHNyYzoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKVxyXG4gICAgfSxcclxuICAgIHNldCAodmFsKSB7XHJcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzcmMnLCB2YWwpXHJcbiAgICAgIC8vIGNvbnN0IHVybCA9IHBhdGgucmVzb2x2ZSh0aGlzLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcubG9jYXRpb24sIHZhbClcclxuICAgICAgLy8gZ2V0RmlsZUJ1ZmZlckZyb21VUkwodXJsLCAoYnVmZmVyKSA9PiB7XHJcbiAgICAgIHNpemVPZih2YWwsIChlcnIsIHNpemUpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdlcnJvcicpKVxyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF0dXJhbFdpZHRoID0gc2l6ZS53aWR0aFxyXG4gICAgICAgIHRoaXMubmF0dXJhbEhlaWdodCA9IHNpemUuaGVpZ2h0XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IHRydWVcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2FkJykpXHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBoZWlnaHQ6IHtcclxuICAgIGdldCAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykgfHwgdGhpcy5uYXR1cmFsSGVpZ2h0XHJcbiAgICB9LFxyXG4gICAgc2V0ICh2YWwpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHZhbClcclxuICAgIH1cclxuICB9LFxyXG4gIHdpZHRoOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykgfHwgdGhpcy5uYXR1cmFsV2lkdGhcclxuICAgIH0sXHJcbiAgICBzZXQgKHZhbCkge1xyXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB2YWwpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudCB9IGZyb20gJy4vSFRNTEVsZW1lbnQuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgSFRNTExpbmtFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge31cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEhUTUxMaW5rRWxlbWVudC5wcm90b3R5cGUsIHtcclxuICBocmVmOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxyXG4gICAgfSxcclxuICAgIHNldCAodmFsKSB7XHJcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdocmVmJywgdmFsKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcmVsOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3JlbCcpXHJcbiAgICB9LFxyXG4gICAgc2V0ICh2YWwpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JlbCcsIHZhbClcclxuICAgIH1cclxuICB9LFxyXG4gIHR5cGU6IHtcclxuICAgIGdldCAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHlwZScpXHJcbiAgICB9LFxyXG4gICAgc2V0ICh2YWwpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB2YWwpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iLCJpbXBvcnQgc2F4IGZyb20gJ3NheCdcclxuXHJcbi8vIFRPRE86IEl0cyBhbiBYTUxQYXJzZXIgbm90IEhUTUxQYXJzZXIhIVxyXG5leHBvcnQgY29uc3QgSFRNTFBhcnNlciA9IGZ1bmN0aW9uIChzdHIsIGVsKSB7XHJcbiAgbGV0IGN1cnJlbnRUYWcgPSBlbFxyXG4gIC8vIGNvbnN0IG5hbWVzcGFjZXMgPSB7IHhtbG5zOiBlbC5nZXRBdHRyaWJ1dGUoJ3htbG5zJykgfVxyXG4gIGxldCBkb2N1bWVudCA9IGVsLm93bmVyRG9jdW1lbnRcclxuICBsZXQgY2RhdGEgPSBudWxsXHJcblxyXG4gIC8vIHNheCBleHBlY3RzIGEgcm9vdCBlbGVtZW50IGJ1dCB3ZSBhbHNvIG1pc3N1c2UgaXQgdG8gcGFyc2UgZnJhZ21lbnRzXHJcbiAgaWYgKGVsLm5vZGVUeXBlICE9PSBlbC5ET0NVTUVOVF9OT0RFKSB7XHJcbiAgICBzdHIgPSAnPHN2Z2RvbTp3cmFwcGVyIHhtbG5zOnN2Z2RvbT1cInN2Z2RvbTpyb2Nrc1wiPicgKyBzdHIgKyAnPC9zdmdkb206d3JhcHBlcj4nXHJcbiAgfSBlbHNlIHtcclxuICAgIGRvY3VtZW50ID0gZWxcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlciA9IHNheC5wYXJzZXIodHJ1ZSwge1xyXG4gICAgLy8gbG93ZXJjYXNlOiB0cnVlLFxyXG4gICAgeG1sbnM6IHRydWUsXHJcbiAgICBzdHJpY3RFbnRpdGllczogdHJ1ZVxyXG4gIH0pXHJcblxyXG4gIHBhcnNlci5vbmVycm9yID0gKGUpID0+IHtcclxuICAgIHRocm93IGVcclxuICB9XHJcblxyXG4gIHBhcnNlci5vbmRvY3R5cGUgPSAoc3RyKSA9PiB7XHJcbiAgICBpZiAoY3VycmVudFRhZyAhPT0gZG9jdW1lbnQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEb2N0eXBlIGNhbiBvbmx5IGJlIGFwcGVuZGVkIHRvIGRvY3VtZW50JylcclxuICAgIH1cclxuICAgIGN1cnJlbnRUYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnRUeXBlKCkpXHJcbiAgfVxyXG5cclxuICBwYXJzZXIub250ZXh0ID0gKHN0cikgPT4gY3VycmVudFRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKVxyXG4gIHBhcnNlci5vbmNvbW1lbnQgPSAoc3RyKSA9PiBjdXJyZW50VGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoc3RyKSlcclxuXHJcbiAgLy8gcGFyc2VyLm9ub3Blbm5hbWVzcGFjZSA9IG5zID0+IHtcclxuICAvLyAgIG5hbWVzcGFjZXNbbnMucHJlZml4XSA9IG5zLnVyaVxyXG4gIC8vIH1cclxuICAvLyBwYXJzZXIub25jbG9zZW5hbWVzcGFjZSA9IG5zID0+IHtcclxuICAvLyAgIGRlbGV0ZSBuYW1lc3BhY2VzW25zLnByZWZpeF1cclxuICAvLyB9XHJcblxyXG4gIHBhcnNlci5vbm9wZW50YWcgPSBub2RlID0+IHtcclxuICAgIGlmIChub2RlLm5hbWUgPT09ICdzdmdkb206d3JhcHBlcicpIHJldHVyblxyXG5cclxuICAgIGNvbnN0IGF0dHJzID0gbm9kZS5hdHRyaWJ1dGVzXHJcblxyXG4gICAgY29uc3QgdXJpID0gbm9kZS51cmkgfHwgY3VycmVudFRhZy5sb29rdXBOYW1lc3BhY2VVUkkobm9kZS5wcmVmaXggfHwgbnVsbClcclxuXHJcbiAgICB2YXIgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyh1cmksIG5vZGUubmFtZSlcclxuXHJcbiAgICBmb3IgKGNvbnN0IFsgbmFtZSwgbm9kZSBdIG9mIE9iamVjdC5lbnRyaWVzKGF0dHJzKSkge1xyXG4gICAgICBuZXdFbGVtZW50LnNldEF0dHJpYnV0ZU5TKG5vZGUudXJpLCBuYW1lLCBub2RlLnZhbHVlKVxyXG4gICAgfVxyXG5cclxuICAgIGN1cnJlbnRUYWcuYXBwZW5kQ2hpbGQobmV3RWxlbWVudClcclxuICAgIGN1cnJlbnRUYWcgPSBuZXdFbGVtZW50XHJcbiAgfVxyXG5cclxuICBwYXJzZXIub25jbG9zZXRhZyA9IHRhZ05hbWUgPT4ge1xyXG4gICAgaWYgKHRhZ05hbWUgPT09ICdzdmdkb206d3JhcHBlcicpIHJldHVyblxyXG5cclxuICAgIGN1cnJlbnRUYWcgPSBjdXJyZW50VGFnLnBhcmVudE5vZGVcclxuICB9XHJcblxyXG4gIHBhcnNlci5vbm9wZW5jZGF0YSA9ICgpID0+IHtcclxuICAgIGNkYXRhID0gZG9jdW1lbnQuY3JlYXRlQ0RBVEFTZWN0aW9uKCcnKVxyXG4gIH1cclxuXHJcbiAgcGFyc2VyLm9uY2RhdGEgPSAoc3RyKSA9PiB7XHJcbiAgICBjZGF0YS5hcHBlbmREYXRhKHN0cilcclxuICB9XHJcblxyXG4gIHBhcnNlci5vbmNsb3NlY2RhdGEgPSAoKSA9PiB7XHJcbiAgICBjdXJyZW50VGFnLmFwcGVuZENoaWxkKGNkYXRhKVxyXG4gIH1cclxuXHJcbiAgcGFyc2VyLndyaXRlKHN0cilcclxufVxyXG4iLCJcclxuaW1wb3J0IHsgSFRNTEVsZW1lbnQgfSBmcm9tICcuL0hUTUxFbGVtZW50LmpzJ1xyXG5leHBvcnQgY2xhc3MgSFRNTFNjcmlwdEVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7fVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoSFRNTFNjcmlwdEVsZW1lbnQucHJvdG90eXBlLCB7XHJcbiAgc3JjOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NyYycpXHJcbiAgICB9LFxyXG4gICAgc2V0ICh2YWwpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHZhbClcclxuICAgIH1cclxuICB9LFxyXG4gIHR5cGU6IHtcclxuICAgIGdldCAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHlwZScpXHJcbiAgICB9LFxyXG4gICAgc2V0ICh2YWwpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB2YWwpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iLCJpbXBvcnQgeyBub2Rlc1RvTm9kZSB9IGZyb20gJy4uLy4uL3V0aWxzL25vZGVzVG9Ob2RlLmpzJ1xyXG5cclxuLy8gaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNpbnRlcmZhY2UtY2hpbGRub2RlXHJcbi8vIFRvZG86IGNoZWNrIGlmIHRoaXMgaXMgY29udGFpbmVkIGluIG5vZGVzIG9yIHNpYmxpbmdzIGFyZSBjb250YWluZWQgKHZpYWJsZVByZXZpb3VzU2libGluZywgdmlhYmxlTmV4dFNpYmxpbmcpXHJcbmV4cG9ydCBjb25zdCBDaGlsZE5vZGUgPSB7XHJcbiAgYmVmb3JlIChub2Rlcykge1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVyblxyXG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXHJcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdGhpcylcclxuICB9LFxyXG4gIGFmdGVyIChub2Rlcykge1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVyblxyXG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXHJcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgdGhpcy5uZXh0U2libGluZylcclxuICB9LFxyXG4gIHJlcGxhY2VXaXRoIChub2Rlcykge1xyXG4gICAgaWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVyblxyXG4gICAgY29uc3QgbmV4dCA9IHRoaXMubmV4dFNpYmxpbmdcclxuICAgIHRoaXMuZGVsZXRlKClcclxuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1RvTm9kZShub2RlcylcclxuICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZShub2RlLCBuZXh0KVxyXG4gIH0sXHJcbiAgcmVtb3ZlICgpIHtcclxuICAgIGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm5cclxuICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlID0ge1xyXG5cclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlLCB7XHJcbiAgcHJldmlvdXNFbGVtZW50U2libGluZzoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgbGV0IG5vZGVcclxuICAgICAgd2hpbGUgKChub2RlID0gdGhpcy5wcmV2aW91c1NpYmxpbmcpKSB7XHJcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICAgICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG5leHRFbGVtZW50U2libGluZzoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgbGV0IG5vZGVcclxuICAgICAgd2hpbGUgKChub2RlID0gdGhpcy5uZXh0U2libGluZykpIHtcclxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHtcclxuICAgICAgICAgIHJldHVybiBub2RlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iLCJpbXBvcnQgeyBOb2RlSXRlcmF0b3IgfSBmcm9tICcuLi8uLi91dGlscy9Ob2RlSXRlcmF0b3IuanMnXHJcbmltcG9ydCB7IE5vZGVGaWx0ZXIgfSBmcm9tICcuLi9Ob2RlRmlsdGVyLmpzJ1xyXG5cclxuLy8gaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNpbnRlcmZhY2Utbm9uZWxlbWVudHBhcmVudG5vZGVcclxuZXhwb3J0IGNvbnN0IE5vbkVsZW1lbnRQYXJlbnROb2RlID0ge1xyXG4gIGdldEVsZW1lbnRCeUlkIChpZCkge1xyXG4gICAgY29uc3QgaXRlciA9IG5ldyBOb2RlSXRlcmF0b3IodGhpcywgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIChub2RlKSA9PiBpZCA9PT0gbm9kZS5pZCA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSwgZmFsc2UpXHJcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgaXRlcikge1xyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGxcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ3NzUXVlcnkgfSBmcm9tICcuLi8uLi9vdGhlci9Dc3NRdWVyeS5qcydcclxuaW1wb3J0IHsgTm9kZUl0ZXJhdG9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvTm9kZUl0ZXJhdG9yLmpzJ1xyXG5pbXBvcnQgeyBOb2RlRmlsdGVyIH0gZnJvbSAnLi4vTm9kZUZpbHRlci5qcydcclxuaW1wb3J0IHsgbm9kZXNUb05vZGUgfSBmcm9tICcuLi8uLi91dGlscy9ub2Rlc1RvTm9kZS5qcydcclxuXHJcbi8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jcGFyZW50bm9kZVxyXG5jb25zdCBQYXJlbnROb2RlID0ge1xyXG4gIG1hdGNoV2l0aFNjb3BlIChxdWVyeSwgc2NvcGUpIHtcclxuICAgIHJldHVybiBuZXcgQ3NzUXVlcnkocXVlcnkpLm1hdGNoZXModGhpcywgc2NvcGUpXHJcbiAgfSxcclxuXHJcbiAgcXVlcnkgKHF1ZXJ5LCBzY29wZSwgc2luZ2xlID0gZmFsc2UpIHtcclxuXHJcbiAgICBjb25zdCBpdGVyID0gbmV3IE5vZGVJdGVyYXRvcihzY29wZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIChub2RlKSA9PiBub2RlLm1hdGNoV2l0aFNjb3BlKHF1ZXJ5LCBzY29wZSkgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUsIGZhbHNlKVxyXG5cclxuICAgIGNvbnN0IG5vZGVzID0gW11cclxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBpdGVyKSB7XHJcbiAgICAgIG5vZGVzLnB1c2gobm9kZSlcclxuICAgICAgaWYgKHNpbmdsZSkgcmV0dXJuIG5vZGVzXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5vZGVzXHJcbiAgfSxcclxuXHJcbiAgcXVlcnlTZWxlY3RvckFsbCAocXVlcnkpIHtcclxuICAgIHJldHVybiB0aGlzLnF1ZXJ5KHF1ZXJ5LCB0aGlzKVxyXG4gIH0sXHJcblxyXG4gIHF1ZXJ5U2VsZWN0b3IgKHF1ZXJ5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5xdWVyeShxdWVyeSwgdGhpcywgdHJ1ZSlbMF0gfHwgbnVsbFxyXG4gIH0sXHJcblxyXG4gIHByZXBlbmQgKG5vZGVzKSB7XHJcbiAgICBjb25zdCBub2RlID0gbm9kZXNUb05vZGUobm9kZXMsIHRoaXMub3duZXJEb2N1bWVudClcclxuXHJcbiAgICB0aGlzLmluc2VydEJlZm9yZShub2RlLCB0aGlzLmZpcnN0Q2hpbGQpXHJcbiAgfSxcclxuXHJcbiAgYXBwZW5kIChub2Rlcykge1xyXG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXHJcbiAgICB0aGlzLmFwcGVuZENoaWxkKG5vZGUpXHJcbiAgfSxcclxuXHJcbiAgcmVwbGFjZUNoaWxkcmVuIChub2Rlcykge1xyXG4gICAgd2hpbGUgKHRoaXMuZmlyc3RDaGlsZCkge1xyXG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZmlyc3RDaGlsZClcclxuICAgIH1cclxuICAgIHRoaXMuYXBwZW5kKG5vZGVzKVxyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUGFyZW50Tm9kZSwge1xyXG4gIGNoaWxkcmVuOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzLmZpbHRlcihmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUgfSlcclxuICAgIH1cclxuICB9LFxyXG4gIGZpcnN0RWxlbWVudENoaWxkOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5jaGlsZE5vZGVzKSB7XHJcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHtcclxuICAgICAgICAgIHJldHVybiBub2RlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgfSxcclxuICBsYXN0RWxlbWVudENoaWxkOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5jaGlsZE5vZGVzLnNsaWNlKCkucmV2ZXJzZSgpKSB7XHJcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHtcclxuICAgICAgICAgIHJldHVybiBub2RlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcbiAgfSxcclxuICBjaGlsZEVsZW1lbnRDb3VudDoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuZXhwb3J0IHsgUGFyZW50Tm9kZSB9XHJcbiIsImltcG9ydCB7IE5vZGVGaWx0ZXIgfSBmcm9tICcuLi9Ob2RlRmlsdGVyLmpzJ1xyXG5pbXBvcnQgeyBOb2RlSXRlcmF0b3IgfSBmcm9tICcuLi8uLi91dGlscy9Ob2RlSXRlcmF0b3IuanMnXHJcblxyXG5jb25zdCBoYXNDbGFzcyA9IChub2RlLCBuYW1lKSA9PiB7XHJcbiAgY29uc3QgY2xhc3NMaXN0ID0gbm9kZS5jbGFzc05hbWUuc3BsaXQoL1xccysvKVxyXG4gIHJldHVybiBjbGFzc0xpc3QuaW5jbHVkZXMobmFtZSlcclxufVxyXG5cclxuY29uc3QgZWxlbWVudEFjY2VzcyA9IHtcclxuICBnZXRFbGVtZW50c0J5VGFnTmFtZSAobmFtZSkge1xyXG4gICAgLy8gY29uc3QgZG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnRcclxuICAgIGNvbnN0IGl0ZXIgPSBuZXcgTm9kZUl0ZXJhdG9yKHRoaXMsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCAobm9kZSkgPT4gbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSwgZmFsc2UpXHJcbiAgICAvLyBjb25zdCBpdGVyID0gZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKHRoaXMsIDEsIChub2RlKSA9PiBub2RlLm5vZGVOYW1lID09PSBuYW1lID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFKVxyXG4gICAgcmV0dXJuIFsgLi4uaXRlciBdXHJcbiAgfSxcclxuXHJcbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWVOUyAobnMsIG5hbWUpIHtcclxuICAgIC8vIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50XHJcbiAgICBjb25zdCBpdGVyID0gbmV3IE5vZGVJdGVyYXRvcih0aGlzLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCwgKG5vZGUpID0+IG5vZGUuaXNOYW1lc3BhY2UobnMpICYmIG5vZGUubm9kZU5hbWUgPT09IG5hbWUgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUsIGZhbHNlKVxyXG4gICAgLy8gY29uc3QgaXRlciA9IGRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcih0aGlzLCAxLCAobm9kZSkgPT4gbm9kZS5pc05hbWVzcGFjZShucykgJiYgbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSlcclxuICAgIHJldHVybiBbIC4uLml0ZXIgXVxyXG4gIH0sXHJcblxyXG4gIGdldEVsZW1lbnRzQnlDbGFzc05hbWUgKG5hbWUpIHtcclxuICAgIC8vIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50XHJcbiAgICBjb25zdCBpdGVyID0gbmV3IE5vZGVJdGVyYXRvcih0aGlzLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCwgKG5vZGUpID0+IGhhc0NsYXNzKG5vZGUsIG5hbWUpID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFLCBmYWxzZSlcclxuICAgIC8vIGNvbnN0IGl0ZXIgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3IodGhpcywgMSwgKG5vZGUpID0+IGhhc0NsYXNzKG5vZGUsIG5hbWUpID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFKVxyXG4gICAgcmV0dXJuIFsgLi4uaXRlciBdXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBlbGVtZW50QWNjZXNzIH1cclxuIiwiaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gJy4uL0VsZW1lbnQuanMnXG5leHBvcnQgY2xhc3MgU1ZHRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBnZXQgb3duZXJTVkdFbGVtZW50ICgpIHtcbiAgICBsZXQgcGFyZW50ID0gdGhpc1xuICAgIHdoaWxlICgocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUpKSB7XG4gICAgICBpZiAoJ3N2ZycgPT0gcGFyZW50Lm5vZGVOYW1lKSB7XG4gICAgICAgIHJldHVybiBwYXJlbnRcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGdldCB2aWV3cG9ydEVsZW1lbnQgKCkge1xuICAgIGxldCBwYXJlbnQgPSB0aGlzXG4gICAgd2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSkpIHtcbiAgICAgIC8vIFRPRE86IGFuZCBvdGhlcnNcbiAgICAgIGlmIChbICdzdmcnLCAnc3ltYm9sJyBdLmluY2x1ZGVzKHBhcmVudC5ub2RlTmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJpbXBvcnQgeyBTVkdFbGVtZW50IH0gZnJvbSAnLi9TVkdFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBnZXRTZWdtZW50cyB9IGZyb20gJy4uLy4uL3V0aWxzL2Jib3hVdGlscy5qcydcclxuaW1wb3J0ICogYXMgcmVnZXggZnJvbSAnLi4vLi4vdXRpbHMvcmVnZXguanMnXHJcbmltcG9ydCB7IFNWR01hdHJpeCB9IGZyb20gJy4vU1ZHTWF0cml4LmpzJ1xyXG5cclxuLy8gTWFwIG1hdHJpeCBhcnJheSB0byBvYmplY3RcclxuZnVuY3Rpb24gYXJyYXlUb01hdHJpeCAoYSkge1xyXG4gIHJldHVybiB7IGE6IGFbMF0sIGI6IGFbMV0sIGM6IGFbMl0sIGQ6IGFbM10sIGU6IGFbNF0sIGY6IGFbNV0gfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU1ZHR3JhcGhpY3NFbGVtZW50IGV4dGVuZHMgU1ZHRWxlbWVudCB7XHJcbiAgLy8gVE9ETzogaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRzIvY29vcmRzLmh0bWwjQ29tcHV0aW5nQVZpZXdwb3J0c1RyYW5zZm9ybVxyXG4gIGdlbmVyYXRlVmlld0JveE1hdHJpeCAoKSB7XHJcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9TVkcvQXR0cmlidXRlL3ZpZXdCb3hcclxuICAgIGlmICghWyAnbWFya2VyJywgJ3N5bWJvbCcsICdwYXR0ZXJuJywgJ3N2ZycsICd2aWV3JyBdLmluY2x1ZGVzKHRoaXMubm9kZU5hbWUpKSB7XHJcbiAgICAgIHJldHVybiBuZXcgU1ZHTWF0cml4KClcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdmlldyA9ICh0aGlzLmdldEF0dHJpYnV0ZSgndmlld0JveCcpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLm1hcChwYXJzZUZsb2F0KS5maWx0ZXIoZWwgPT4gIWlzTmFOKGVsKSlcclxuICAgIGNvbnN0IHdpZHRoID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSkgfHwgMFxyXG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpIHx8IDBcclxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cmlidXRlKCd4JykpIHx8IDBcclxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cmlidXRlKCd5JykpIHx8IDBcclxuXHJcbiAgICAvLyBUT0RPOiBJZiBubyB3aWR0aCBhbmQgaGVpZ2h0IGlzIGdpdmVuLCB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBvdXRlciBzdmcgZWxlbWVudCBpcyB1c2VkXHJcbiAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBTVkdNYXRyaXgoKS50cmFuc2xhdGUoeCwgeSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmlldy5sZW5ndGggIT09IDQpIHtcclxuICAgICAgdmlldyA9IFsgMCwgMCwgd2lkdGgsIGhlaWdodCBdXHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmlyc3QgYXBwbHkgeCBhbmQgeSBpZiBuZXN0ZWQsIHRoZW4gdmlld2JveCBzY2FsZSwgdGhlbiB2aWV3Qm94IG1vdmVcclxuICAgIHJldHVybiBuZXcgU1ZHTWF0cml4KCkudHJhbnNsYXRlKHgsIHkpLnNjYWxlKHdpZHRoIC8gdmlld1syXSwgaGVpZ2h0IC8gdmlld1szXSkudHJhbnNsYXRlKC12aWV3WzBdLCAtdmlld1sxXSlcclxuICB9XHJcblxyXG4gIGdldEJCb3ggKCkge1xyXG4gICAgcmV0dXJuIGdldFNlZ21lbnRzKHRoaXMpLmJib3goKVxyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogVGhpcyBtZXRob2QgYWN0dWFsbHkgZXhpc3RzIG9uIGFsbCBFbGVtZW50c1xyXG4gIGdldEJvdW5kaW5nQ2xpZW50UmVjdCAoKSB7XHJcbiAgICAvLyBUaGUgYm91bmRpbmcgY2xpZW50IHJlY3QgdGFrZXMgdGhlIHNjcmVlbiBjdG0gb2YgdGhlIGVsZW1lbnRcclxuICAgIC8vIGFuZCBjb252ZXJ0cyB0aGUgYm91bmRpbmcgYm94IHdpdGggaXRcclxuXHJcbiAgICAvLyBob3dldmVyLCBub3JtYWwgYm91bmRpbmcgY29uc2lzdHMgb2Y6XHJcbiAgICAvLyAtIGFsbCBjaGlsZHJlbiB0cmFuc2Zvcm1lZFxyXG4gICAgLy8gLSB0aGUgdmlld2JveCBvZiB0aGUgZWxlbWVudCBpZiBhdmFpbGFibGVcclxuXHJcbiAgICAvLyBUaGUgYm91bmRpbmdDbGllbnRSZWN0IGlzIG5vdCBhZmZlY3RlZCBieSBpdHMgb3duIHZpZXdib3hcclxuICAgIC8vIFNvIHdlIGFwcGx5IG9ubHkgb3VyIG93biB0cmFuc2Zvcm1hdGlvbnMgYW5kIHBhcmVudHMgc2NyZWVuQ1RNXHJcblxyXG4gICAgbGV0IG0gPSB0aGlzLm1hdHJpeGlmeSgpXHJcblxyXG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSAmJiB0aGlzLnBhcmVudE5vZGUubm9kZU5hbWUgIT09ICcjZG9jdW1lbnQnKSB7XHJcbiAgICAgIG0gPSB0aGlzLnBhcmVudE5vZGUuZ2V0U2NyZWVuQ1RNKCkubXVsdGlwbHkobSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBsZXQgbSA9IHRoaXMuZ2V0U2NyZWVuQ1RNKClcclxuXHJcbiAgICAvLyBUaGVyZSBhcmUgYSBmZXcgZXh0cmEgcnVsZXMgcmVnYXJkaW5nIHJib3ggYW5kIHRoZSA8c3ZnPiBlbGVtZW50XHJcbiAgICAvLyBOYW1lbHkgdGhpcyBpczpcclxuICAgIC8vIEJCb3ggaXMgY2FsY3VsYXRlZCBhcyBub3JtYWwgZm9yIGNvbnRhaW5lciBlbGVtZW50c1xyXG4gICAgLy8gUmJveCBpcyBjYWxjdWxhdGVkIHdpdGggdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIDxzdmc+XHJcbiAgICAvLyBUaGlzIGNvdWxkIGJlIGFsc28gdHJ1ZSBmb3Igc3ltYm9scyBzbyB0aGlzIGlzIGE6XHJcbiAgICAvLyBUb2RvOiAuLi5cclxuICAgIHJldHVybiBnZXRTZWdtZW50cyh0aGlzLCBmYWxzZSwgdHJ1ZSkudHJhbnNmb3JtKG0pLmJib3goKVxyXG4gIH1cclxuXHJcbiAgZ2V0Q1RNICgpIHtcclxuICAgIGxldCBtID0gdGhpcy5tYXRyaXhpZnkoKVxyXG5cclxuICAgIGxldCBub2RlID0gdGhpc1xyXG4gICAgd2hpbGUgKChub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xyXG4gICAgICBpZiAoWyAnc3ZnJywgJ3N5bWJvbCcsICdpbWFnZScsICdwYXR0ZXJuJywgJ21hcmtlcicgXS5pbmRleE9mKG5vZGUubm9kZU5hbWUpID4gLTEpIGJyZWFrXHJcbiAgICAgIG0gPSBtLm11bHRpcGx5KG5vZGUubWF0cml4aWZ5KCkpXHJcbiAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSAnI2RvY3VtZW50JykgcmV0dXJuIHRoaXMuZ2V0U2NyZWVuQ1RNKClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbm9kZS5nZW5lcmF0ZVZpZXdCb3hNYXRyaXgoKS5tdWx0aXBseShtKVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5uZXJNYXRyaXggKCkge1xyXG4gICAgbGV0IG0gPSB0aGlzLm1hdHJpeGlmeSgpXHJcblxyXG4gICAgaWYgKFsgJ3N2ZycsICdzeW1ib2wnLCAnaW1hZ2UnLCAncGF0dGVybicsICdtYXJrZXInIF0uaW5kZXhPZih0aGlzLm5vZGVOYW1lKSA+IC0xKSB7XHJcbiAgICAgIG0gPSB0aGlzLmdlbmVyYXRlVmlld0JveE1hdHJpeCgpLm11bHRpcGx5KG0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbVxyXG4gIH1cclxuXHJcbiAgZ2V0U2NyZWVuQ1RNICgpIHtcclxuICAgIC8vIHJlZjogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM0NDUzN1xyXG4gICAgLy8gV2UgZm9sbG93IENocm9tZXMgYmVoYXZpb3IgYW5kIGluY2x1ZGUgdGhlIHZpZXdib3ggaW4gdGhlIHNjcmVlbkNUTVxyXG4gICAgY29uc3QgbSA9IHRoaXMuZ2V0SW5uZXJNYXRyaXgoKVxyXG5cclxuICAgIC8vIFRPRE86IFdlIGhhdmUgdG8gbG9vcCB1bnRpbCBkb2N1bWVudCwgaG93ZXZlciBodG1sIGVsZW1lbnRzIGRvbnQgaGF2ZSBnZXRTY3JlZW5DVE0gaW1wbGVtZW50ZWRcclxuICAgIC8vIHRoZXkgYWxzbyBkb250IGhhdmUgYSB0cmFuc2Zvcm0gYXR0cmlidXRlLiBUaGVyZWZvcmUgd2UgbmVlZCBhIGRpZmZlcmVudCB3YXkgb2YgZmlndXJpbmcgb3V0IHRoZWlyIChjc3MpIHRyYW5zZm9ybVxyXG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSAmJiB0aGlzLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBTVkdHcmFwaGljc0VsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5nZXRTY3JlZW5DVE0oKS5tdWx0aXBseShtKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtXHJcbiAgfVxyXG5cclxuICBtYXRyaXhpZnkgKCkge1xyXG4gICAgY29uc3QgbWF0cml4ID0gKHRoaXMuZ2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nKSB8fCAnJykudHJpbSgpXHJcbiAgICAgIC8vIHNwbGl0IHRyYW5zZm9ybWF0aW9uc1xyXG4gICAgICAuc3BsaXQocmVnZXgudHJhbnNmb3Jtcykuc2xpY2UoMCwgLTEpLm1hcChmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgLy8gZ2VuZXJhdGUga2V5ID0+IHZhbHVlIHBhaXJzXHJcbiAgICAgICAgY29uc3Qga3YgPSBzdHIudHJpbSgpLnNwbGl0KCcoJylcclxuICAgICAgICByZXR1cm4gWyBrdlswXS50cmltKCksIGt2WzFdLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikubWFwKGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIHBhcnNlRmxvYXQoc3RyLnRyaW0oKSkgfSkgXVxyXG4gICAgICB9KVxyXG4gICAgICAvLyBtZXJnZSBldmVyeSB0cmFuc2Zvcm1hdGlvbiBpbnRvIG9uZSBtYXRyaXhcclxuICAgICAgLnJlZHVjZShmdW5jdGlvbiAobWF0cml4LCB0cmFuc2Zvcm0pIHtcclxuXHJcbiAgICAgICAgaWYgKHRyYW5zZm9ybVswXSA9PT0gJ21hdHJpeCcpIHJldHVybiBtYXRyaXgubXVsdGlwbHkoYXJyYXlUb01hdHJpeCh0cmFuc2Zvcm1bMV0pKVxyXG4gICAgICAgIHJldHVybiBtYXRyaXhbdHJhbnNmb3JtWzBdXS5hcHBseShtYXRyaXgsIHRyYW5zZm9ybVsxXSlcclxuXHJcbiAgICAgIH0sIG5ldyBTVkdNYXRyaXgoKSlcclxuXHJcbiAgICByZXR1cm4gbWF0cml4XHJcbiAgfVxyXG5cclxuICBnZXQgdHJhbnNmb3JtICgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJylcclxuICB9XHJcblxyXG59XHJcbiIsImNvbnN0IHJhZGlhbnMgPSBmdW5jdGlvbiAoZCkge1xyXG4gIHJldHVybiBkICUgMzYwICogTWF0aC5QSSAvIDE4MFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0cml4RmFjdG9yeSAoYSwgYiwgYywgZCwgZSwgZikge1xyXG4gIHZhciByID0gbmV3IFNWR01hdHJpeCgpXHJcbiAgci5hID0gYVxyXG4gIHIuYiA9IGJcclxuICByLmMgPSBjXHJcbiAgci5kID0gZFxyXG4gIHIuZSA9IGVcclxuICByLmYgPSBmXHJcbiAgcmV0dXJuIHJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNWR01hdHJpeCB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgdGhpcy5hID0gdGhpcy5kID0gMVxyXG4gICAgdGhpcy5iID0gdGhpcy5jID0gdGhpcy5lID0gdGhpcy5mID0gMFxyXG4gIH1cclxuXHJcbiAgaW52ZXJzZSAoKSB7XHJcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcGFyYW1ldGVycyBvdXQgb2YgdGhlIG1hdHJpeFxyXG4gICAgdmFyIGEgPSB0aGlzLmFcclxuICAgIHZhciBiID0gdGhpcy5iXHJcbiAgICB2YXIgYyA9IHRoaXMuY1xyXG4gICAgdmFyIGQgPSB0aGlzLmRcclxuICAgIHZhciBlID0gdGhpcy5lXHJcbiAgICB2YXIgZiA9IHRoaXMuZlxyXG5cclxuICAgIC8vIEludmVydCB0aGUgMngyIG1hdHJpeCBpbiB0aGUgdG9wIGxlZnRcclxuICAgIHZhciBkZXQgPSBhICogZCAtIGIgKiBjXHJcbiAgICBpZiAoIWRldCkgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW52ZXJ0ICcgKyB0aGlzKVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgdG9wIDJ4MiBtYXRyaXhcclxuICAgIHZhciBuYSA9IGQgLyBkZXRcclxuICAgIHZhciBuYiA9IC1iIC8gZGV0XHJcbiAgICB2YXIgbmMgPSAtYyAvIGRldFxyXG4gICAgdmFyIG5kID0gYSAvIGRldFxyXG5cclxuICAgIC8vIEFwcGx5IHRoZSBpbnZlcnRlZCBtYXRyaXggdG8gdGhlIHRvcCByaWdodFxyXG4gICAgdmFyIG5lID0gLShuYSAqIGUgKyBuYyAqIGYpXHJcbiAgICB2YXIgbmYgPSAtKG5iICogZSArIG5kICogZilcclxuXHJcbiAgICAvLyBDb25zdHJ1Y3QgdGhlIGludmVydGVkIG1hdHJpeFxyXG4gICAgdGhpcy5hID0gbmFcclxuICAgIHRoaXMuYiA9IG5iXHJcbiAgICB0aGlzLmMgPSBuY1xyXG4gICAgdGhpcy5kID0gbmRcclxuICAgIHRoaXMuZSA9IG5lXHJcbiAgICB0aGlzLmYgPSBuZlxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxuXG4gIG11bHRpcGx5IChtKSB7XHJcbiAgICB2YXIgciA9IG5ldyBTVkdNYXRyaXgoKVxyXG4gICAgci5hID0gdGhpcy5hICogbS5hICsgdGhpcy5jICogbS5iICsgdGhpcy5lICogMFxyXG4gICAgci5iID0gdGhpcy5iICogbS5hICsgdGhpcy5kICogbS5iICsgdGhpcy5mICogMFxyXG4gICAgci5jID0gdGhpcy5hICogbS5jICsgdGhpcy5jICogbS5kICsgdGhpcy5lICogMFxyXG4gICAgci5kID0gdGhpcy5iICogbS5jICsgdGhpcy5kICogbS5kICsgdGhpcy5mICogMFxyXG4gICAgci5lID0gdGhpcy5hICogbS5lICsgdGhpcy5jICogbS5mICsgdGhpcy5lICogMVxyXG4gICAgci5mID0gdGhpcy5iICogbS5lICsgdGhpcy5kICogbS5mICsgdGhpcy5mICogMVxyXG4gICAgcmV0dXJuIHJcclxuICB9XHJcblxyXG4gIHJvdGF0ZSAociwgeCwgeSkge1xyXG4gICAgciA9IHIgJSAzNjAgKiBNYXRoLlBJIC8gMTgwXHJcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseShtYXRyaXhGYWN0b3J5KFxyXG4gICAgICBNYXRoLmNvcyhyKSxcclxuICAgICAgTWF0aC5zaW4ociksXHJcbiAgICAgIC1NYXRoLnNpbihyKSxcclxuICAgICAgTWF0aC5jb3MociksXHJcbiAgICAgIHggPyAtTWF0aC5jb3MocikgKiB4ICsgTWF0aC5zaW4ocikgKiB5ICsgeCA6IDAsXHJcbiAgICAgIHkgPyAtTWF0aC5zaW4ocikgKiB4IC0gTWF0aC5jb3MocikgKiB5ICsgeSA6IDBcclxuICAgICkpXHJcbiAgfVxuXG4gIHNjYWxlIChzY2FsZVgsIHNjYWxlWSA9IHNjYWxlWCkge1xyXG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkobWF0cml4RmFjdG9yeShzY2FsZVgsIDAsIDAsIHNjYWxlWSwgMCwgMCkpXHJcbiAgfVxuXG4gIHNrZXcgKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLm11bHRpcGx5KG1hdHJpeEZhY3RvcnkoMSwgTWF0aC50YW4ocmFkaWFucyh5KSksIE1hdGgudGFuKHJhZGlhbnMoeCkpLCAxLCAwLCAwKSlcclxuICB9XG5cbiAgc2tld1ggKHgpIHtcclxuICAgIHJldHVybiB0aGlzLnNrZXcoeCwgMClcclxuICB9XG5cbiAgc2tld1kgKHkpIHtcclxuICAgIHJldHVybiB0aGlzLnNrZXcoMCwgeSlcclxuICB9XG5cbiAgdG9TdHJpbmcgKCkge1xyXG4gICAgcmV0dXJuICdTVkdNYXRyaXgnXHJcbiAgfVxuXG4gIHRyYW5zbGF0ZSAoeCA9IDAsIHkgPSAwKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseShtYXRyaXhGYWN0b3J5KDEsIDAsIDAsIDEsIHgsIHkpKVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9TVkdHcmFwaGljc0VsZW1lbnQuanMnXHJcbmltcG9ydCAqIGFzIHBhdGhVdGlscyBmcm9tICcuLi8uLi91dGlscy9wYXRoVXRpbHMuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgU1ZHUGF0aEVsZW1lbnQgZXh0ZW5kcyBTVkdHcmFwaGljc0VsZW1lbnQge1xyXG4gIGdldFBvaW50QXRMZW5ndGggKGxlbikge1xyXG4gICAgcmV0dXJuIHBhdGhVdGlscy5wb2ludEF0TGVuZ3RoKHRoaXMuZ2V0QXR0cmlidXRlKCdkJyksIGxlbilcclxuICB9XHJcblxyXG4gIGdldFRvdGFsTGVuZ3RoICgpIHtcclxuICAgIHJldHVybiBwYXRoVXRpbHMubGVuZ3RoKHRoaXMuZ2V0QXR0cmlidXRlKCdkJykpXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBTVkdQb2ludCB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgdGhpcy54ID0gMFxyXG4gICAgdGhpcy55ID0gMFxyXG4gIH1cclxuXHJcbiAgbWF0cml4VHJhbnNmb3JtIChtKSB7XHJcbiAgICB2YXIgciA9IG5ldyBTVkdQb2ludCgpXHJcbiAgICByLnggPSBtLmEgKiB0aGlzLnggKyBtLmMgKiB0aGlzLnkgKyBtLmUgKiAxXHJcbiAgICByLnkgPSBtLmIgKiB0aGlzLnggKyBtLmQgKiB0aGlzLnkgKyBtLmYgKiAxXHJcbiAgICByZXR1cm4gclxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnLi4vLi4vb3RoZXIvQm94LmpzJ1xyXG5pbXBvcnQgeyBTVkdNYXRyaXggfSBmcm9tICcuL1NWR01hdHJpeC5qcydcclxuaW1wb3J0IHsgU1ZHUG9pbnQgfSBmcm9tICcuL1NWR1BvaW50LmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFNWR1NWR0VsZW1lbnQgZXh0ZW5kcyBTVkdHcmFwaGljc0VsZW1lbnQge1xyXG4gIGNyZWF0ZVNWR01hdHJpeCAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFNWR01hdHJpeCgpXHJcbiAgfVxuXG4gIGNyZWF0ZVNWR1BvaW50ICgpIHtcclxuICAgIHJldHVybiBuZXcgU1ZHUG9pbnQoKVxyXG4gIH1cblxuICBjcmVhdGVTVkdSZWN0ICgpIHtcclxuICAgIHJldHVybiBuZXcgQm94KClcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNWR0dyYXBoaWNzRWxlbWVudCB9IGZyb20gJy4vU1ZHR3JhcGhpY3NFbGVtZW50LmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFNWR1RleHRDb250ZW50RWxlbWVudCBleHRlbmRzIFNWR0dyYXBoaWNzRWxlbWVudCB7XHJcbiAgZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoICgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldEJCb3goKS53aWR0aFxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBXaW5kb3cgfSBmcm9tICcuL2RvbS9XaW5kb3cuanMnXHJcbmltcG9ydCB7IERPTUltcGxlbWVudGF0aW9uIH0gZnJvbSAnLi9kb20vRG9jdW1lbnQuanMnXHJcbmltcG9ydCAqIGFzIG5hbWVzcGFjZXMgZnJvbSAnLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xyXG5cclxuY29uc3QgeyBjcmVhdGVEb2N1bWVudCwgY3JlYXRlSFRNTERvY3VtZW50IH0gPSBET01JbXBsZW1lbnRhdGlvblxyXG5cclxuY29uc3QgY3JlYXRlV2luZG93ID0gKC4uLmFyZ3MpID0+IHtcclxuICBjb25zdCB3aW5kb3cgPSBuZXcgV2luZG93KClcclxuICBjb25zdCBkb2N1bWVudCA9IGNyZWF0ZURvY3VtZW50KC4uLmFyZ3MpXHJcbiAgd2luZG93LmRvY3VtZW50ID0gZG9jdW1lbnRcclxuICBkb2N1bWVudC5kZWZhdWx0VmlldyA9IHdpbmRvd1xyXG4gIHJldHVybiB3aW5kb3dcclxufVxyXG5cclxuY29uc3QgY3JlYXRlSFRNTFdpbmRvdyA9ICh0aXRsZSkgPT4ge1xyXG4gIGNvbnN0IHdpbmRvdyA9IG5ldyBXaW5kb3coKVxyXG4gIGNvbnN0IGRvY3VtZW50ID0gRE9NSW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KHRpdGxlKVxyXG4gIHdpbmRvdy5kb2N1bWVudCA9IGRvY3VtZW50XHJcbiAgZG9jdW1lbnQuZGVmYXVsdFZpZXcgPSB3aW5kb3dcclxuICByZXR1cm4gd2luZG93XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZVNWR1dpbmRvdyA9ICgpID0+IHtcclxuICByZXR1cm4gY3JlYXRlV2luZG93KG5hbWVzcGFjZXMuc3ZnLCAnc3ZnJylcclxufVxyXG5cclxuY29uc3QgY3JlYXRlU1ZHRG9jdW1lbnQgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIGNyZWF0ZURvY3VtZW50KG5hbWVzcGFjZXMuc3ZnLCAnc3ZnJylcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBjcmVhdGVEb2N1bWVudCxcclxuICBjcmVhdGVIVE1MRG9jdW1lbnQsXHJcbiAgY3JlYXRlU1ZHRG9jdW1lbnQsXHJcbiAgY3JlYXRlV2luZG93LFxyXG4gIGNyZWF0ZUhUTUxXaW5kb3csXHJcbiAgY3JlYXRlU1ZHV2luZG93XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcmVnZXggZnJvbSAnLi4vdXRpbHMvcmVnZXguanMnXHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi9Qb2ludC5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3gge1xyXG4gIGNvbnN0cnVjdG9yIChzb3VyY2UpIHtcclxuICAgIHZhciBiYXNlID0gWyAwLCAwLCAwLCAwIF1cclxuICAgIHNvdXJjZSA9IHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnID8gc291cmNlLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikubWFwKHBhcnNlRmxvYXQpXHJcbiAgICAgIDogQXJyYXkuaXNBcnJheShzb3VyY2UpID8gc291cmNlXHJcbiAgICAgIDogdHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcgPyBbXHJcbiAgICAgICAgc291cmNlLmxlZnQgIT0gbnVsbCA/IHNvdXJjZS5sZWZ0IDogc291cmNlLngsXHJcbiAgICAgICAgc291cmNlLnRvcCAhPSBudWxsID8gc291cmNlLnRvcCA6IHNvdXJjZS55LFxyXG4gICAgICAgIHNvdXJjZS53aWR0aCxcclxuICAgICAgICBzb3VyY2UuaGVpZ2h0XHJcbiAgICAgIF1cclxuICAgICAgOiBhcmd1bWVudHMubGVuZ3RoID09PSA0ID8gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXHJcbiAgICAgIDogYmFzZVxyXG5cclxuICAgIHRoaXMueCA9IHRoaXMubGVmdCA9IHNvdXJjZVswXVxyXG4gICAgdGhpcy55ID0gdGhpcy50b3AgPSBzb3VyY2VbMV1cclxuICAgIHRoaXMud2lkdGggPSBzb3VyY2VbMl1cclxuICAgIHRoaXMuaGVpZ2h0ID0gc291cmNlWzNdXHJcbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5sZWZ0ICsgdGhpcy53aWR0aFxyXG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLnRvcCArIHRoaXMuaGVpZ2h0XHJcbiAgfVxyXG5cclxuICAvLyBNZXJnZSByZWN0IGJveCB3aXRoIGFub3RoZXIsIHJldHVybiBhIG5ldyBpbnN0YW5jZVxyXG4gIG1lcmdlIChib3gpIHtcclxuICAgIGlmIChib3ggaW5zdGFuY2VvZiBOb0JveCkgcmV0dXJuIG5ldyBCb3godGhpcylcclxuXHJcbiAgICB2YXIgeCA9IE1hdGgubWluKHRoaXMueCwgYm94LngpXHJcbiAgICB2YXIgeSA9IE1hdGgubWluKHRoaXMueSwgYm94LnkpXHJcblxyXG4gICAgcmV0dXJuIG5ldyBCb3goXHJcbiAgICAgIHgsIHksXHJcbiAgICAgIE1hdGgubWF4KHRoaXMueCArIHRoaXMud2lkdGgsIGJveC54ICsgYm94LndpZHRoKSAtIHgsXHJcbiAgICAgIE1hdGgubWF4KHRoaXMueSArIHRoaXMuaGVpZ2h0LCBib3gueSArIGJveC5oZWlnaHQpIC0geVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtIChtKSB7XHJcbiAgICB2YXIgeE1pbiA9IEluZmluaXR5XHJcbiAgICB2YXIgeE1heCA9IC1JbmZpbml0eVxyXG4gICAgdmFyIHlNaW4gPSBJbmZpbml0eVxyXG4gICAgdmFyIHlNYXggPSAtSW5maW5pdHlcclxuXHJcbiAgICB2YXIgcHRzID0gW1xyXG4gICAgICBuZXcgUG9pbnQodGhpcy54LCB0aGlzLnkpLFxyXG4gICAgICBuZXcgUG9pbnQodGhpcy54ICsgdGhpcy53aWR0aCwgdGhpcy55KSxcclxuICAgICAgbmV3IFBvaW50KHRoaXMueCwgdGhpcy55ICsgdGhpcy5oZWlnaHQpLFxyXG4gICAgICBuZXcgUG9pbnQodGhpcy54ICsgdGhpcy53aWR0aCwgdGhpcy55ICsgdGhpcy5oZWlnaHQpXHJcbiAgICBdXHJcblxyXG4gICAgcHRzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcclxuICAgICAgcCA9IHAudHJhbnNmb3JtKG0pXHJcbiAgICAgIHhNaW4gPSBNYXRoLm1pbih4TWluLCBwLngpXHJcbiAgICAgIHhNYXggPSBNYXRoLm1heCh4TWF4LCBwLngpXHJcbiAgICAgIHlNaW4gPSBNYXRoLm1pbih5TWluLCBwLnkpXHJcbiAgICAgIHlNYXggPSBNYXRoLm1heCh5TWF4LCBwLnkpXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBuZXcgQm94KFxyXG4gICAgICB4TWluLCB5TWluLFxyXG4gICAgICB4TWF4IC0geE1pbixcclxuICAgICAgeU1heCAtIHlNaW5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOb0JveCBleHRlbmRzIEJveCB7XHJcbiAgLy8gTm9Cb3ggaGFzIG5vIHZhbGlkIHZhbHVlcyBzbyBpdCBjYW50IGJlIG1lcmdlZFxyXG4gIG1lcmdlIChib3gpIHtcclxuICAgIHJldHVybiBib3ggaW5zdGFuY2VvZiBOb0JveCA/IG5ldyBOb0JveCgpIDogbmV3IEJveChib3gpXHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm0gKG0pIHtcclxuICAgIHJldHVybiBuZXcgTm9Cb3goKVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyByZW1vdmVRdW90ZXMsIHNwbGl0Tm90SW5CcmFja2V0cyB9IGZyb20gJy4uL3V0aWxzL3N0clV0aWxzLmpzJ1xyXG5pbXBvcnQgKiBhcyByZWdleCBmcm9tICcuLi91dGlscy9yZWdleC5qcydcclxuaW1wb3J0IHsgaHRtbCB9IGZyb20gJy4uL3V0aWxzL25hbWVzcGFjZXMuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgQ3NzUXVlcnkge1xyXG4gIGNvbnN0cnVjdG9yIChxdWVyeSkge1xyXG4gICAgaWYgKENzc1F1ZXJ5LmNhY2hlLmhhcyhxdWVyeSkpIHtcclxuICAgICAgdGhpcy5xdWVyaWVzID0gQ3NzUXVlcnkuY2FjaGUuZ2V0KHF1ZXJ5KVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICB2YXIgcXVlcmllcyA9IHNwbGl0Tm90SW5CcmFja2V0cyhxdWVyeSwgJywnKVxyXG5cclxuICAgIHF1ZXJpZXMgPSBxdWVyaWVzLm1hcChxdWVyeSA9PiB7XHJcblxyXG4gICAgICB2YXIgcm91bmRCcmFja2V0cyA9IDBcclxuICAgICAgdmFyIHNxdWFyZUJyYWNrZXRzID0gMFxyXG5cclxuICAgICAgLy8gdGhpcyBpcyB0aGUgc2FtZSBhcyBhYm92ZSBidXQgZWFzaWVyXHJcbiAgICAgIHF1ZXJ5ID0gcXVlcnkucmVwbGFjZSgvWygpW1xcXT5+K10vZywgZnVuY3Rpb24gKGNoKSB7XHJcbiAgICAgICAgaWYgKGNoID09PSAnKCcpICsrcm91bmRCcmFja2V0c1xyXG4gICAgICAgIGVsc2UgaWYgKGNoID09PSAnKScpIC0tcm91bmRCcmFja2V0c1xyXG4gICAgICAgIGVsc2UgaWYgKGNoID09PSAnWycpICsrc3F1YXJlQnJhY2tldHNcclxuICAgICAgICBlbHNlIGlmIChjaCA9PT0gJ10nKSAtLXNxdWFyZUJyYWNrZXRzXHJcblxyXG4gICAgICAgIGlmICgnKClbXScuaW5kZXhPZihjaCkgPiAtMSkgcmV0dXJuIGNoXHJcbiAgICAgICAgaWYgKHNxdWFyZUJyYWNrZXRzIHx8IHJvdW5kQnJhY2tldHMpIHJldHVybiBjaFxyXG5cclxuICAgICAgICByZXR1cm4gJyAnICsgY2ggKyAnICdcclxuICAgICAgfSlcclxuXHJcbiAgICAgIC8vIHNwbGl0IGF0IHNwYWNlIGFuZCByZW1vdmUgZW1wdHkgcmVzdWx0c1xyXG4gICAgICBxdWVyeSA9IHNwbGl0Tm90SW5CcmFja2V0cyhxdWVyeSwgJyAnKS5maWx0ZXIoZWwgPT4gISFlbC5sZW5ndGgpXHJcblxyXG4gICAgICB2YXIgcGFpcnMgPSBbXVxyXG5cclxuICAgICAgdmFyIHJlbGF0aW9uID0gJyUnXHJcblxyXG4gICAgICAvLyBnZW5lcmF0ZSBxdWVyeW5vZGUgcmVsYXRpb24gdHVwbGVzXHJcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHF1ZXJ5Lmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcclxuXHJcbiAgICAgICAgaWYgKCc+fislJy5pbmRleE9mKHF1ZXJ5W2ldKSA+IC0xKSB7XHJcbiAgICAgICAgICByZWxhdGlvbiA9IHF1ZXJ5W2ldXHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFpcnMucHVzaChbIHJlbGF0aW9uLCBxdWVyeVtpXSBdKVxyXG4gICAgICAgIHJlbGF0aW9uID0gJyUnXHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcGFpcnNcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIHRoaXMucXVlcmllcyA9IHF1ZXJpZXNcclxuXHJcbiAgICAvLyB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcyB3ZSBoYXZlIHRvIG1hbmFnZSBvdXIgY2FjaGUuXHJcbiAgICAvLyB3ZSBkZWxldGUgZXZlcnl0aGluZyB3aGljaCBpcyBvbGRlciB0aGFuIDUwIGVudHJpZXNcclxuICAgIGlmIChDc3NRdWVyeS5jYWNoZUtleXMubGVuZ3RoID4gNTApIHtcclxuICAgICAgQ3NzUXVlcnkuY2FjaGUuZGVsZXRlKENzc1F1ZXJ5LmNhY2hlS2V5cy5zaGlmdCgpKVxyXG4gICAgfVxyXG4gICAgQ3NzUXVlcnkuY2FjaGUuc2V0KHF1ZXJ5LCBxdWVyaWVzKVxyXG4gICAgQ3NzUXVlcnkuY2FjaGVLZXlzLnB1c2gocXVlcnkpXHJcblxyXG4gIH1cclxuXHJcbiAgbWF0Y2hlcyAobm9kZSwgc2NvcGUpIHtcclxuICAgIGZvciAodmFyIGkgPSB0aGlzLnF1ZXJpZXMubGVuZ3RoOyBpLS07KSB7XHJcbiAgICAgIGlmICh0aGlzLm1hdGNoSGVscGVyKHRoaXMucXVlcmllc1tpXSwgbm9kZSwgc2NvcGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICBtYXRjaEhlbHBlciAocXVlcnksIG5vZGUsIHNjb3BlKSB7XHJcbiAgICBxdWVyeSA9IHF1ZXJ5LnNsaWNlKClcclxuICAgIHZhciBsYXN0ID0gcXVlcnkucG9wKClcclxuXHJcbiAgICBpZiAoIW5ldyBDc3NRdWVyeU5vZGUobGFzdFsxXSkubWF0Y2hlcyhub2RlLCBzY29wZSkpIHsgcmV0dXJuIGZhbHNlIH1cclxuXHJcbiAgICBpZiAoIXF1ZXJ5Lmxlbmd0aCkgcmV0dXJuIHRydWVcclxuXHJcbiAgICBpZiAobGFzdFswXSA9PT0gJywnKSByZXR1cm4gdHJ1ZVxyXG5cclxuICAgIGlmIChsYXN0WzBdID09PSAnKycpIHtcclxuICAgICAgcmV0dXJuICEhbm9kZS5wcmV2aW91c1NpYmxpbmcgJiYgdGhpcy5tYXRjaEhlbHBlcihxdWVyeSwgbm9kZS5wcmV2aW91c1NpYmxpbmcsIHNjb3BlKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXN0WzBdID09PSAnPicpIHtcclxuICAgICAgcmV0dXJuICEhbm9kZS5wYXJlbnROb2RlICYmIHRoaXMubWF0Y2hIZWxwZXIocXVlcnksIG5vZGUucGFyZW50Tm9kZSwgc2NvcGUpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhc3RbMF0gPT09ICd+Jykge1xyXG4gICAgICB3aGlsZSAoKG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZykpIHtcclxuICAgICAgICBpZiAodGhpcy5tYXRjaEhlbHBlcihxdWVyeSwgbm9kZSwgc2NvcGUpKSB7IHJldHVybiB0cnVlIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGFzdFswXSA9PT0gJyUnKSB7XHJcbiAgICAgIHdoaWxlICgobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpIHtcclxuICAgICAgICBpZiAodGhpcy5tYXRjaEhlbHBlcihxdWVyeSwgbm9kZSwgc2NvcGUpKSB7IHJldHVybiB0cnVlIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgfVxyXG59XHJcblxyXG5Dc3NRdWVyeS5jYWNoZSA9IG5ldyBNYXAoKVxyXG5Dc3NRdWVyeS5jYWNoZUtleXMgPSBbXVxyXG5cclxuLy8gY2hlY2sgaWYgW25vZGVdIGlzIHRoZSBbbnRoXSBjaGlsZCBvZiBbYXJyXSB3aGVyZSBudGggY2FuIGFsc28gYmUgYSBmb3JtdWxhXHJcbmNvbnN0IG50aCA9IChub2RlLCBhcnIsIG50aCkgPT4ge1xyXG5cclxuICBpZiAobnRoID09PSAnZXZlbicpIG50aCA9ICcybidcclxuICBlbHNlIGlmIChudGggPT09ICdvZGQnKSBudGggPSAnMm4rMSdcclxuXHJcbiAgLy8gY2hlY2sgZm9yIGV2YWwgY2hhcnNcclxuICBpZiAoL1teXFxkXFwtbisqL10rLy50ZXN0KG50aCkpIHJldHVybiBmYWxzZVxyXG5cclxuICBudGggPSBudGgucmVwbGFjZSgnbicsICcqbicpXHJcblxyXG4gIC8vIGV2YWwgbnRoIHRvIGdldCB0aGUgaW5kZXhcclxuICBmb3IgKHZhciBpLCBuID0gMCwgbmwgPSBhcnIubGVuZ3RoOyBuIDwgbmw7ICsrbikge1xyXG4gICAgLyogZXNsaW50IG5vLWV2YWw6IG9mZiAqL1xyXG4gICAgaSA9IGV2YWwobnRoKVxyXG5cclxuICAgIGlmIChpID4gbmwpIGJyZWFrXHJcbiAgICBpZiAoYXJyW2kgLSAxXSA9PT0gbm9kZSkgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5jb25zdCBsb3dlciA9IGEgPT4gYS50b0xvd2VyQ2FzZSgpXHJcblxyXG4vLyBjaGVja3MgaWYgYSBhbmQgYiBhcmUgZXF1YWwuIElzIGluc2Vuc2l0aXZlIHdoZW4gaSBpcyB0cnVlXHJcbmNvbnN0IGVxID0gKGEsIGIsIGkpID0+IGkgPyBsb3dlcihhKSA9PT0gbG93ZXIoYikgOiBhID09PSBiXHJcblxyXG4vLyBbaV0gKHByZWJvdW5kKSBpcyB0cnVlIGlmIGluc2Vuc2l0aXZlIG1hdGNoaW5nIGlzIHJlcXVpcmVkXHJcbi8vIFthXSAocHJlYm91bmQpIGlzIHRoZSB2YWx1ZSB0aGUgYXR0ciBpcyBjb21wYXJlZCB0b1xyXG4vLyBbYl0gKHBhc3NlZCkgICBpcyB0aGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZVxyXG5jb25zdCBhdHRyaWJ1dGVNYXRjaGVyID0ge1xyXG4gICc9JzogKGksIGEsIGIpID0+IGVxKGEsIGIsIGkpLFxyXG4gICd+PSc6IChpLCBhLCBiKSA9PiBiLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikuZmlsdGVyKGVsID0+IGVxKGVsLCBhLCBpKSkubGVuZ3RoID4gMCxcclxuICAnfD0nOiAoaSwgYSwgYikgPT4gZXEoYi5zcGxpdChyZWdleC5kZWxpbWl0ZXIpWzBdLCBhLCBpKSxcclxuICAnXj0nOiAoaSwgYSwgYikgPT4gaSA/IGxvd2VyKGIpLnN0YXJ0c1dpdGgobG93ZXIoYSkpIDogYi5zdGFydHNXaXRoKGEpLFxyXG4gICckPSc6IChpLCBhLCBiKSA9PiBpID8gbG93ZXIoYikuZW5kc1dpdGgobG93ZXIoYSkpIDogYi5lbmRzV2l0aChhKSxcclxuICAnKj0nOiAoaSwgYSwgYikgPT4gaSA/IGxvd2VyKGIpLmluY2x1ZGVzKGxvd2VyKGEpKSA6IGIuaW5jbHVkZXMoYSksXHJcbiAgJyonOiAoaSwgYSwgYikgPT4gYiAhPSBudWxsXHJcbn1cclxuXHJcbmNvbnN0IGdldEF0dHJpYnV0ZVZhbHVlID0gKHByZWZpeCwgbmFtZSwgbm9kZSkgPT4ge1xyXG4gIGlmICghcHJlZml4IHx8IHByZWZpeCA9PT0gJyonKSB7XHJcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUobmFtZSlcclxuICB9XHJcbiAgcmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlKHByZWZpeCArICc6JyArIG5hbWUpXHJcbn1cclxuXHJcbi8vIFthXSAocHJlYm91bmQpIFthXXJndW1lbnQgb2YgdGhlIHBzZXVkbyBzZWxlY3RvclxyXG4vLyBbbl0gKHBhc3NlZCkgICBbbl1vZGVcclxuLy8gW3NdIChwYXNzZWQpICAgW3NdY29wZSAtIHRoZSBlbGVtZW50IHRoaXMgcXVlcnkgaXMgc2NvcGVkIHRvXHJcbmNvbnN0IHBzZXVkb01hdGNoZXIgPSB7XHJcbiAgJ2ZpcnN0LWNoaWxkJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBuLnBhcmVudE5vZGUuZmlyc3RDaGlsZCA9PT0gbixcclxuICAnbGFzdC1jaGlsZCc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLmxhc3RDaGlsZCA9PT0gbixcclxuICAnbnRoLWNoaWxkJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBudGgobiwgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMsIGEpLFxyXG4gICdudGgtbGFzdC1jaGlsZCc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbnRoKG4sIG4ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLnNsaWNlKCkucmV2ZXJzZSgpLCBhKSxcclxuICAnZmlyc3Qtb2YtdHlwZSc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuZmlsdGVyKGVsID0+IGVsLm5vZGVOYW1lID09PSBuLm5vZGVOYW1lKVswXSA9PT0gbixcclxuICAnbGFzdC1vZi10eXBlJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5maWx0ZXIoZWwgPT4gZWwubm9kZU5hbWUgPT09IG4ubm9kZU5hbWUpLnBvcCgpID09PSBuLFxyXG4gICdudGgtb2YtdHlwZSc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbnRoKG4sIG4ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmZpbHRlcihlbCA9PiBlbC5ub2RlTmFtZSA9PT0gbi5ub2RlTmFtZSksIGEpLFxyXG4gICdudGgtbGFzdC1vZi10eXBlJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBudGgobiwgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuZmlsdGVyKGVsID0+IGVsLm5vZGVOYW1lID09PSBuLm5vZGVOYW1lKS5yZXZlcnNlKCksIGEpLFxyXG4gICdvbmx5LWNoaWxkJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEsXHJcbiAgJ29ubHktb2YtdHlwZSc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuZmlsdGVyKGVsID0+IGVsLm5vZGVOYW1lID09PSBuLm5vZGVOYW1lKS5sZW5ndGggPT09IDEsXHJcbiAgcm9vdDogKGEsIG4pID0+IG4ub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgPT09IG4sXHJcbiAgbm90OiAoYSwgbiwgcykgPT4gIShuZXcgQ3NzUXVlcnkoYSkpLm1hdGNoZXMobiwgcyksXHJcbiAgbWF0Y2hlczogKGEsIG4sIHMpID0+IChuZXcgQ3NzUXVlcnkoYSkpLm1hdGNoZXMobiwgcyksXHJcbiAgc2NvcGU6IChhLCBuLCBzKSA9PiBuID09PSBzXHJcbn1cclxuXHJcbmNsYXNzIENzc1F1ZXJ5Tm9kZSB7XHJcbiAgY29uc3RydWN0b3IgKG5vZGUpIHtcclxuICAgIHRoaXMudGFnID0gJydcclxuICAgIHRoaXMuaWQgPSAnJ1xyXG4gICAgdGhpcy5jbGFzc0xpc3QgPSBbXVxyXG4gICAgdGhpcy5hdHRycyA9IFtdXHJcbiAgICB0aGlzLnBzZXVkbyA9IFtdXHJcblxyXG4gICAgLy8gbWF0Y2ggdGhlIHRhZyBuYW1lXHJcbiAgICB2YXIgbWF0Y2hlcyA9IG5vZGUubWF0Y2goL15bXFx3LV0rfF5cXCovKVxyXG4gICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgdGhpcy50YWcgPSBtYXRjaGVzWzBdXHJcbiAgICAgIG5vZGUgPSBub2RlLnNsaWNlKHRoaXMudGFnLmxlbmd0aClcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYXRjaCBwc2V1ZG8gY2xhc3Nlc1xyXG4gICAgd2hpbGUgKChtYXRjaGVzID0gLzooW1xcdy1dKykoPzpcXCgoLispXFwpKT8vZy5leGVjKG5vZGUpKSkge1xyXG4gICAgICB0aGlzLnBzZXVkby5wdXNoKHBzZXVkb01hdGNoZXJbbWF0Y2hlc1sxXV0uYmluZCh0aGlzLCByZW1vdmVRdW90ZXMobWF0Y2hlc1syXSB8fCAnJykpKVxyXG4gICAgICBub2RlID0gbm9kZS5zbGljZSgwLCBtYXRjaGVzLmluZGV4KSArIG5vZGUuc2xpY2UobWF0Y2hlcy5pbmRleCArIG1hdGNoZXNbMF0ubGVuZ3RoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1hdGNoIHRoZSBpZFxyXG4gICAgbWF0Y2hlcyA9IG5vZGUubWF0Y2goLyMoW1xcdy1dKykvKVxyXG4gICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgdGhpcy5pZCA9IG1hdGNoZXNbMV1cclxuICAgICAgbm9kZSA9IG5vZGUuc2xpY2UoMCwgbWF0Y2hlcy5pbmRleCkgKyBub2RlLnNsaWNlKG1hdGNoZXMuaW5kZXggKyBtYXRjaGVzWzBdLmxlbmd0aClcclxuICAgIH1cclxuXHJcbiAgICAvLyBtYXRjaCBjbGFzc2VzXHJcbiAgICB3aGlsZSAoKG1hdGNoZXMgPSAvXFwuKFtcXHctXSspL2cuZXhlYyhub2RlKSkpIHtcclxuICAgICAgdGhpcy5jbGFzc0xpc3QucHVzaChtYXRjaGVzWzFdKVxyXG4gICAgICBub2RlID0gbm9kZS5zbGljZSgwLCBtYXRjaGVzLmluZGV4KSArIG5vZGUuc2xpY2UobWF0Y2hlcy5pbmRleCArIG1hdGNoZXNbMF0ubGVuZ3RoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1hdGNoIGF0dHJpYnV0ZXNcclxuICAgIHdoaWxlICgobWF0Y2hlcyA9IC9cXFsoW1xcdy0qXStcXHwpPyhbXFx3LV0rKSgoWz1efiR8Kl0rKSguKz8pKCArW2lJXSk/KT9cXF0vZy5leGVjKG5vZGUpKSkge1xyXG4gICAgICBjb25zdCBwcmVmaXggPSBtYXRjaGVzWzFdID8gbWF0Y2hlc1sxXS5zcGxpdCgnfCcpWzBdIDogbnVsbFxyXG4gICAgICB0aGlzLmF0dHJzLnB1c2goe1xyXG4gICAgICAgIG5hbWU6IG1hdGNoZXNbMl0sXHJcbiAgICAgICAgZ2V0VmFsdWU6IGdldEF0dHJpYnV0ZVZhbHVlLmJpbmQodGhpcywgcHJlZml4LCBtYXRjaGVzWzJdKSxcclxuICAgICAgICBtYXRjaGVyOiBhdHRyaWJ1dGVNYXRjaGVyW21hdGNoZXNbNF0gfHwgJyonXS5iaW5kKFxyXG4gICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICEhbWF0Y2hlc1s2XSwgLy8gY2FzZSBpbnNlbnNpdGl2ZSB5ZXMvbm9cclxuICAgICAgICAgIHJlbW92ZVF1b3RlcygobWF0Y2hlc1s1XSB8fCAnJykudHJpbSgpKSAvLyBhdHRyaWJ1dGUgdmFsdWVcclxuICAgICAgICApXHJcbiAgICAgIH0pXHJcbiAgICAgIG5vZGUgPSBub2RlLnNsaWNlKDAsIG1hdGNoZXMuaW5kZXgpICsgbm9kZS5zbGljZShtYXRjaGVzLmluZGV4ICsgbWF0Y2hlc1swXS5sZW5ndGgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtYXRjaGVzIChub2RlLCBzY29wZSkge1xyXG4gICAgdmFyIGlcclxuXHJcbiAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgLy8gQWx3YXlzIHRoaXMgZXh0cmEgY29kZSBmb3IgaHRtbCAtLi1cclxuICAgIGlmIChub2RlLm5hbWVzcGFjZVVSSSA9PT0gaHRtbCkge1xyXG4gICAgICB0aGlzLnRhZyA9IHRoaXMudGFnLnRvVXBwZXJDYXNlKClcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50YWcgJiYgdGhpcy50YWcgIT09IG5vZGUubm9kZU5hbWUgJiYgdGhpcy50YWcgIT09ICcqJykgeyByZXR1cm4gZmFsc2UgfVxyXG5cclxuICAgIGlmICh0aGlzLmlkICYmIHRoaXMuaWQgIT09IG5vZGUuaWQpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNsYXNzTGlzdCA9IChub2RlLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJykuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5maWx0ZXIoZWwgPT4gISFlbC5sZW5ndGgpXHJcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuZmlsdGVyKGNsYXNzTmFtZSA9PiBjbGFzc0xpc3QuaW5kZXhPZihjbGFzc05hbWUpIDwgMCkubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaSA9IHRoaXMuYXR0cnMubGVuZ3RoOyBpLS07KSB7XHJcbiAgICAgIHZhciBhdHRyVmFsdWUgPSB0aGlzLmF0dHJzW2ldLmdldFZhbHVlKG5vZGUpXHJcbiAgICAgIGlmIChhdHRyVmFsdWUgPT09IG51bGwgfHwgIXRoaXMuYXR0cnNbaV0ubWF0Y2hlcihhdHRyVmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGkgPSB0aGlzLnBzZXVkby5sZW5ndGg7IGktLTspIHtcclxuICAgICAgaWYgKCF0aGlzLnBzZXVkb1tpXShub2RlLCBzY29wZSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBTVkdQb2ludCB9IGZyb20gJy4uL2RvbS9zdmcvU1ZHUG9pbnQuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgUG9pbnQge1xyXG4gIC8vIEluaXRpYWxpemVcclxuICBjb25zdHJ1Y3RvciAoeCwgeSkge1xyXG4gICAgY29uc3QgYmFzZSA9IHsgeDogMCwgeTogMCB9XHJcblxyXG4gICAgLy8gZW5zdXJlIHNvdXJjZSBhcyBvYmplY3RcclxuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkoeClcclxuICAgICAgPyB7IHg6IHhbMF0sIHk6IHhbMV0gfVxyXG4gICAgICA6IHR5cGVvZiB4ID09PSAnb2JqZWN0J1xyXG4gICAgICAgID8geyB4OiB4LngsIHk6IHgueSB9XHJcbiAgICAgICAgOiB4ICE9IG51bGxcclxuICAgICAgICAgID8geyB4OiB4LCB5OiAoeSAhPSBudWxsID8geSA6IHgpIH1cclxuICAgICAgICAgIDogYmFzZSAvLyBJZiB5IGhhcyBubyB2YWx1ZSwgdGhlbiB4IGlzIHVzZWQgaGFzIGl0cyB2YWx1ZVxyXG5cclxuICAgIC8vIG1lcmdlIHNvdXJjZVxyXG4gICAgdGhpcy54ID0gc291cmNlLnhcclxuICAgIHRoaXMueSA9IHNvdXJjZS55XHJcbiAgfVxyXG5cclxuICBhYnMgKCkge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmFic1F1YWQoKSlcclxuICB9XHJcblxyXG4gIGFic1F1YWQgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueVxyXG4gIH1cclxuXHJcbiAgYWRkICh4LCB5KSB7XHJcbiAgICBjb25zdCBwID0gbmV3IFBvaW50KHgsIHkpXHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCArIHAueCwgdGhpcy55ICsgcC55KVxyXG4gIH1cclxuXHJcbiAgYW5nbGVUbyAocCkge1xyXG4gICAgbGV0IHNpZ24gPSBNYXRoLnNpZ24odGhpcy54ICogcC55IC0gdGhpcy55ICogcC54KVxyXG4gICAgc2lnbiA9IHNpZ24gfHwgMVxyXG4gICAgcmV0dXJuIHNpZ24gKiBNYXRoLmFjb3MoTWF0aC5yb3VuZCgodGhpcy5kb3QocCkgLyAodGhpcy5hYnMoKSAqIHAuYWJzKCkpKSAqIDEwMDAwMDApIC8gMTAwMDAwMClcclxuICB9XHJcblxyXG4gIC8vIENsb25lIHBvaW50XHJcbiAgY2xvbmUgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgY2xvc2VUbyAocCwgZXRhID0gMC4wMDAwMSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZXF1YWxzKHApIHx8IChNYXRoLmFicyh0aGlzLnggLSBwLngpIDwgZXRhICYmIE1hdGguYWJzKHRoaXMueSAtIHAueSkgPCBldGEpXHJcbiAgfVxyXG5cclxuICBkaXYgKGZhY3Rvcikge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggLyBmYWN0b3IsIHRoaXMueSAvIGZhY3RvcilcclxuICB9XHJcblxyXG4gIGRvdCAocCkge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHAueCArIHRoaXMueSAqIHAueVxyXG4gIH1cclxuXHJcbiAgZXF1YWxzIChwKSB7XHJcbiAgICByZXR1cm4gdGhpcy54ID09PSBwLnggJiYgdGhpcy55ID09PSBwLnlcclxuICB9XHJcblxyXG4gIG11bCAoZmFjdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCAqIGZhY3RvciwgdGhpcy55ICogZmFjdG9yKVxyXG4gIH1cclxuXHJcbiAgLy8gQ29udmVydCB0byBuYXRpdmUgU1ZHUG9pbnRcclxuICBuYXRpdmUgKCkge1xyXG4gICAgLy8gY3JlYXRlIG5ldyBwb2ludFxyXG4gICAgY29uc3QgcG9pbnQgPSBuZXcgU1ZHUG9pbnQoKVxyXG5cclxuICAgIC8vIHVwZGF0ZSB3aXRoIGN1cnJlbnQgdmFsdWVzXHJcbiAgICBwb2ludC54ID0gdGhpcy54XHJcbiAgICBwb2ludC55ID0gdGhpcy55XHJcblxyXG4gICAgcmV0dXJuIHBvaW50XHJcbiAgfVxyXG5cclxuICBub3JtYWwgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnksIC10aGlzLngpXHJcbiAgfVxyXG5cclxuICBub3JtYWxpemUgKCkge1xyXG4gICAgY29uc3QgYWJzID0gdGhpcy5hYnMoKVxyXG4gICAgaWYgKCFhYnMpIHRocm93IG5ldyBFcnJvcignQ2FuXFwndCBub3JtYWxpemUgdmVjdG9yIG9mIHplcm8gbGVuZ3RoJylcclxuICAgIHJldHVybiB0aGlzLmRpdihhYnMpXHJcbiAgfVxyXG5cclxuICByZWZsZWN0QXQgKHApIHtcclxuICAgIHJldHVybiBwLmFkZChwLnN1Yih0aGlzKSlcclxuICB9XHJcblxyXG4gIHN1YiAoeCwgeSkge1xyXG4gICAgY29uc3QgcCA9IG5ldyBQb2ludCh4LCB5KVxyXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggLSBwLngsIHRoaXMueSAtIHAueSlcclxuICB9XHJcblxyXG4gIHRvQXJyYXkgKCkge1xyXG4gICAgcmV0dXJuIFsgdGhpcy54LCB0aGlzLnkgXVxyXG4gIH1cclxuXHJcbiAgdG9QYXRoICgpIHtcclxuICAgIHJldHVybiBbICdNJywgdGhpcy54LCB0aGlzLnkgXS5qb2luKCcgJylcclxuICB9XHJcblxyXG4gIC8vIHRyYW5zZm9ybSBwb2ludCB3aXRoIG1hdHJpeFxyXG4gIHRyYW5zZm9ybSAobWF0cml4KSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMubmF0aXZlKCkubWF0cml4VHJhbnNmb3JtKG1hdHJpeCkpXHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1PIChtYXRyaXgpIHtcclxuICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5uYXRpdmUoKS5tYXRyaXhUcmFuc2Zvcm0obWF0cml4KVxyXG4gICAgdGhpcy54ID0geFxyXG4gICAgdGhpcy55ID0geVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgTm9kZUZpbHRlciB9IGZyb20gJy4uL2RvbS9Ob2RlRmlsdGVyLmpzJ1xyXG5cclxuY29uc3Qgc2hvd1RoaXNOb2RlID0gKHdoYXRUb1Nob3csIG5vZGUpID0+IHtcclxuICBpZiAod2hhdFRvU2hvdyA9PT0gTm9kZUZpbHRlci5TSE9XX0FMTCkgcmV0dXJuIHRydWVcclxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSByZXR1cm4gdHJ1ZVxyXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX1RFWFQgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5URVhUX05PREUpIHJldHVybiB0cnVlXHJcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfRU5USVRZX1JFRkVSRU5DRSAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkVOVElUWV9SRUZFUkVOQ0VfTk9ERSkgcmV0dXJuIHRydWVcclxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19FTlRJVFkgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTlRJVFlfTk9ERSkgcmV0dXJuIHRydWVcclxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19QUk9DRVNTSU5HX0lOU1RSVUNUSU9OICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuUFJPQ0VTU0lOR19JTlNUUlVDVElPTl9OT0RFKSByZXR1cm4gdHJ1ZVxyXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX0NPTU1FTlQgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5DT01NRU5UX05PREUpIHJldHVybiB0cnVlXHJcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfRE9DVU1FTlQgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5ET0NVTUVOVF9OT0RFKSByZXR1cm4gdHJ1ZVxyXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX0RPQ1VNRU5UX1RZUEUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5ET0NVTUVOVF9UWVBFX05PREUpIHJldHVybiB0cnVlXHJcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfRE9DVU1FTlRfRlJBR01FTlQgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKSByZXR1cm4gdHJ1ZVxyXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX05PVEFUSU9OICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuTk9UQVRJT05fTk9ERSkgcmV0dXJuIHRydWVcclxuICByZXR1cm4gZmFsc2VcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vZGVJdGVyYXRvciB7XHJcbiAgY29uc3RydWN0b3IgKHJvb3QsIHdoYXRUb1Nob3cgPSBOb2RlRmlsdGVyLlNIT1dfQUxMLCBmaWx0ZXIgPSAoKSA9PiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQsIGluY2x1ZGVQYXJlbnQgPSB0cnVlKSB7XHJcbiAgICB0aGlzLnJvb3QgPSBpbmNsdWRlUGFyZW50ID8geyBjaGlsZE5vZGVzOiBbIHJvb3QgXSB9IDogcm9vdFxyXG4gICAgdGhpcy53aGF0VG9TaG93ID0gd2hhdFRvU2hvd1xyXG4gICAgdGhpcy5maWx0ZXIgPSBmaWx0ZXJcclxuICB9XHJcblxyXG4gICogW1N5bWJvbC5pdGVyYXRvcl0gKCkge1xyXG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnJvb3QuY2hpbGROb2Rlc1xyXG5cclxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlcykge1xyXG4gICAgICBpZiAoIXNob3dUaGlzTm9kZSh0aGlzLndoYXRUb1Nob3csIG5vZGUpKSBjb250aW51ZVxyXG5cclxuICAgICAgY29uc3QgZmlsdGVyUmV0ID0gdGhpcy5maWx0ZXIobm9kZSlcclxuXHJcbiAgICAgIGlmIChmaWx0ZXJSZXQgPT09IE5vZGVGaWx0ZXIuRklMVEVSX1JFSkVDVCkgY29udGludWVcclxuICAgICAgaWYgKGZpbHRlclJldCA9PT0gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUKSB7XHJcbiAgICAgICAgeWllbGQgbm9kZVxyXG4gICAgICB9XHJcblxyXG4gICAgICB5aWVsZCAqIG5ldyBOb2RlSXRlcmF0b3Iobm9kZSwgdGhpcy53aGF0VG9TaG93LCB0aGlzLmZpbHRlciwgZmFsc2UpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQm94LCBOb0JveCB9IGZyb20gJy4uL290aGVyL0JveC5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludENsb3VkIGV4dGVuZHMgQXJyYXkge1xyXG4gIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XHJcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3NbMF0gPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHN1cGVyKGFyZ3Muc2hpZnQoKSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHN1cGVyKClcclxuICAgIH1cclxuXHJcbiAgICAvLyBleGNlcHQgbXVsdGlwbGUgcG9pbnQgYXJyYXlzIGFzIGlucHV0IGFuZCBtZXJnZSB0aGVtIGludG8gb25lXHJcbiAgICBhcmdzLnJlZHVjZSgobGFzdCwgY3VycikgPT4ge1xyXG4gICAgICBsYXN0LnB1c2goLi4uY3VycilcclxuICAgICAgcmV0dXJuIHRoaXNcclxuICAgIH0sIHRoaXMpXHJcbiAgfVxyXG5cclxuICBiYm94ICgpIHtcclxuICAgIGlmICghdGhpcy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIG5ldyBOb0JveCgpXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHhNaW4gPSBJbmZpbml0eVxyXG4gICAgbGV0IHhNYXggPSAtSW5maW5pdHlcclxuICAgIGxldCB5TWluID0gSW5maW5pdHlcclxuICAgIGxldCB5TWF4ID0gLUluZmluaXR5XHJcblxyXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgIHhNaW4gPSBNYXRoLm1pbih4TWluLCBwLngpXHJcbiAgICAgIHhNYXggPSBNYXRoLm1heCh4TWF4LCBwLngpXHJcbiAgICAgIHlNaW4gPSBNYXRoLm1pbih5TWluLCBwLnkpXHJcbiAgICAgIHlNYXggPSBNYXRoLm1heCh5TWF4LCBwLnkpXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBuZXcgQm94KFxyXG4gICAgICB4TWluLCB5TWluLFxyXG4gICAgICB4TWF4IC0geE1pbixcclxuICAgICAgeU1heCAtIHlNaW5cclxuICAgIClcclxuICB9XG5cbiAgbWVyZ2UgKGNsb3VkKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50Q2xvdWQodGhpcywgY2xvdWQpXHJcbiAgfVxuXG4gIHRyYW5zZm9ybSAobSkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludENsb3VkKHRoaXMubWFwKChwKSA9PiBwLnRyYW5zZm9ybShtKSkpXHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBwYXRoVXRpbHMgZnJvbSAnLi9wYXRoVXRpbHMuanMnXG5pbXBvcnQgKiBhcyByZWdleCBmcm9tICcuL3JlZ2V4LmpzJ1xuaW1wb3J0ICogYXMgdGV4dFV0aWxzIGZyb20gJy4vdGV4dFV0aWxzLmpzJ1xuaW1wb3J0IHsgTm9Cb3ggfSBmcm9tICcuLi9vdGhlci9Cb3guanMnXG5pbXBvcnQgeyBOb2RlSXRlcmF0b3IgfSBmcm9tICcuL05vZGVJdGVyYXRvci5qcydcbmltcG9ydCB7IE5vZGVGaWx0ZXIgfSBmcm9tICcuLi9kb20vTm9kZUZpbHRlci5qcydcblxuY29uc3QgYXBwbHlUcmFuc2Zvcm1hdGlvbiA9IChzZWdtZW50cywgbm9kZSwgYXBwbHlUcmFuc2Zvcm1hdGlvbnMpID0+IHtcbiAgaWYgKG5vZGUubWF0cml4aWZ5ICYmIGFwcGx5VHJhbnNmb3JtYXRpb25zKSB7XG4gICAgcmV0dXJuIHNlZ21lbnRzLnRyYW5zZm9ybShub2RlLm1hdHJpeGlmeSgpKVxuICB9XG4gIHJldHVybiBzZWdtZW50c1xufVxuXG5leHBvcnQgY29uc3QgZ2V0U2VnbWVudHMgPSAobm9kZSwgYXBwbHlUcmFuc2Zvcm1hdGlvbnMsIHJib3ggPSBmYWxzZSkgPT4ge1xuICBjb25zdCBzZWdtZW50cyA9IGdldFBhdGhTZWdtZW50cyhub2RlLCByYm94KVxuICByZXR1cm4gYXBwbHlUcmFuc2Zvcm1hdGlvbihzZWdtZW50cywgbm9kZSwgYXBwbHlUcmFuc2Zvcm1hdGlvbnMpXG59XG5cbmNvbnN0IGdldFBhdGhTZWdtZW50cyA9IChub2RlLCByYm94KSA9PiB7XG4gIGlmIChub2RlLm5vZGVUeXBlICE9PSAxKSByZXR1cm4gbmV3IHBhdGhVdGlscy5QYXRoU2VnbWVudEFycmF5KClcblxuICBzd2l0Y2ggKG5vZGUubm9kZU5hbWUpIHtcbiAgY2FzZSAncmVjdCc6XG4gIGNhc2UgJ2ltYWdlJzpcbiAgY2FzZSAncGF0dGVybic6XG4gIGNhc2UgJ21hc2snOlxuICBjYXNlICdmb3JlaWduT2JqZWN0JzpcbiAgICAvLyBDcmVhdGUgUGF0aCBmcm9tIHJlY3QgYW5kIGNyZWF0ZSBQb2ludENsb3VkIGZyb20gUGF0aFxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKHBhdGhVdGlscy5wYXRoRnJvbS5yZWN0KG5vZGUpKVxuICBjYXNlICdzdmcnOlxuICBjYXNlICdzeW1ib2wnOlxuICAgIC8vIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKHBhdGhVdGlscy5wYXRoRnJvbS5yZWN0KG5vZGUpKVxuICAgIGlmIChyYm94KSB7XG4gICAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20ucmVjdChub2RlKSlcbiAgICB9XG4gIC8vIEFUVEVOVElPTjogRkFMTCBUSFJPVUdIXG4gIC8vIEJlY2F1c2Ugbm9ybWFsIGJib3ggaXMgY2FsY3VsYXRlZCBieSB0aGUgY29udGVudCBvZiB0aGUgZWxlbWVudCBhbmQgbm90IGl0cyB3aWR0aCBhbmQgaGVpZ2h0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBjYXNlICdnJzpcbiAgY2FzZSAnY2xpcFBhdGgnOlxuICBjYXNlICdhJzpcbiAgY2FzZSAnbWFya2VyJzpcbiAgICAvLyBJdGVyYXRlIHRyb3VnaCBhbGwgY2hpbGRyZW4gYW5kIGdldCB0aGUgcG9pbnQgY2xvdWQgb2YgZWFjaFxuICAgIC8vIFRoZW4gdHJhbnNmb3JtIGl0IHdpdGggdmlld2JveCBtYXRyaXggaWYgbmVlZGVkXG4gICAgcmV0dXJuIG5vZGUuY2hpbGROb2Rlcy5yZWR1Y2UoKHNlZ21lbnRzLCBjaGlsZCkgPT4ge1xuICAgICAgaWYgKCFjaGlsZC5tYXRyaXhpZnkpIHJldHVybiBzZWdtZW50c1xuICAgICAgcmV0dXJuIHNlZ21lbnRzLm1lcmdlKGdldFNlZ21lbnRzKGNoaWxkLCB0cnVlKS50cmFuc2Zvcm0oY2hpbGQuZ2VuZXJhdGVWaWV3Qm94TWF0cml4KCkpKVxuICAgIH0sIG5ldyBwYXRoVXRpbHMuUGF0aFNlZ21lbnRBcnJheSgpKVxuICBjYXNlICdjaXJjbGUnOlxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKHBhdGhVdGlscy5wYXRoRnJvbS5jaXJjbGUobm9kZSkpXG4gIGNhc2UgJ2VsbGlwc2UnOlxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKHBhdGhVdGlscy5wYXRoRnJvbS5lbGxpcHNlKG5vZGUpKVxuICBjYXNlICdsaW5lJzpcbiAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20ubGluZShub2RlKSlcbiAgY2FzZSAncG9seWxpbmUnOlxuICBjYXNlICdwb2x5Z29uJzpcbiAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20ucG9seWxpbmUobm9kZSkpXG4gIGNhc2UgJ3BhdGgnOlxuICBjYXNlICdnbHlwaCc6XG4gIGNhc2UgJ21pc3NpbmctZ2x5cGgnOlxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKG5vZGUuZ2V0QXR0cmlidXRlKCdkJykpXG4gIGNhc2UgJ3VzZSc6IHtcbiAgICAvLyBHZXQgcmVmZXJlbmNlIGZyb20gZWxlbWVudFxuICAgIGNvbnN0IHJlZiA9IG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnKVxuICAgIC8vIEdldCB0aGUgYWN0dWFsIHJlZmVyZW5jZWQgTm9kZVxuICAgIGNvbnN0IHJlZk5vZGUgPSBub2RlLmdldFJvb3ROb2RlKCkucXVlcnlTZWxlY3RvcihyZWYpXG4gICAgLy8gR2V0IHRoZSBCQm94IG9mIHRoZSByZWZlcmVuY2VkIGVsZW1lbnQgYW5kIGFwcGx5IHRoZSB2aWV3Ym94IG9mIDx1c2U+XG4gICAgLy8gVE9ETzogRG8gd2UgbmVlZCB0byBhcHBseSB0aGUgdHJhbnNmb3JtYXRpb25zIG9mIHRoZSBlbGVtZW50P1xuICAgIC8vIENoZWNrIGJib3ggb2YgdHJhbnNmb3JtZWQgZWxlbWVudCB3aGljaCBpcyByZXVzZWQgd2l0aCA8dXNlPlxuICAgIHJldHVybiBnZXRTZWdtZW50cyhyZWZOb2RlKS50cmFuc2Zvcm0obm9kZS5nZW5lcmF0ZVZpZXdCb3hNYXRyaXgoKSlcbiAgfVxuICBjYXNlICd0c3Bhbic6XG4gIGNhc2UgJ3RleHQnOlxuICBjYXNlICdhbHRHbHlwaCc6IHtcbiAgICBjb25zdCBib3ggPSBnZXRUZXh0QkJveChub2RlKVxuXG4gICAgaWYgKGJveCBpbnN0YW5jZW9mIE5vQm94KSB7XG4gICAgICByZXR1cm4gbmV3IHBhdGhVdGlscy5QYXRoU2VnbWVudEFycmF5KClcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20uYm94KGJveCkpXG4gIH1cbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gbmV3IHBhdGhVdGlscy5QYXRoU2VnbWVudEFycmF5KClcbiAgfVxufVxuXG5jb25zdCBnZXRUZXh0QkJveCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHRleHRSb290ID0gZmluZFRleHRSb290KG5vZGUpXG4gIGNvbnN0IGJveGVzID0gZ2V0VGV4dEJCb3hlcyhub2RlLCB0ZXh0Um9vdClcbiAgcmV0dXJuIGJveGVzLmZpbHRlcihpc05vdEVtcHR5Qm94KS5yZWR1Y2UoKGxhc3QsIGN1cnIpID0+IGxhc3QubWVyZ2UoY3VyciksIG5ldyBOb0JveCgpKVxufVxuXG5jb25zdCBmaW5kVGV4dFJvb3QgPSAobm9kZSkgPT4ge1xuICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgaWYgKChub2RlLm5vZGVOYW1lID09PSAndGV4dCcgJiYgbm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lID09PSAndGV4dCcpXG4gICAgfHwgKChub2RlLm5vZGVOYW1lID09PSAndHNwYW4nIHx8IG5vZGUubm9kZU5hbWUgPT09ICd0ZXh0UGF0aCcpICYmIFsgJ3RzcGFuJywgJ3RleHQnLCAndGV4dFBhdGgnIF0uaW5jbHVkZXMobm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lKSkpIHtcbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGVcbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHRha2VzIGEgbm9kZSBvZiB3aGljaCB0aGUgYmJveCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkXG4vLyBJbiBvcmRlciB0byBwb3NpdGlvbiB0aGUgYm94IGNvcnJlY3RseSwgd2UgbmVlZCB0byBrbm93IHdlcmUgdGhlIHBhcmVudCBhbmQgd2VyZSB0aGUgc2libGluZ3MgKmJlZm9yZSogb3VyIG5vZGUgYXJlXG4vLyBUaGF0cyB3aHkgYSB0ZXh0Um9vdCBpcyBwYXNzZWQgd2hpY2ggaXMgdGhlIG1vc3Qgb3V0ZXIgdGV4dEVsZW1lbnQgbmVlZGVkIHRvIGNhbGN1bGF0ZSBhbGwgYm94ZXNcbi8vIFdoZW4gdGhlIGl0ZXJhdG9yIGhpdHMgdGhlIGVsZW1lbnQgd2UgbmVlZCB0aGUgYmJveCBvZiwgaXQgaXMgdGVybWluYXRlZCBhbmQgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgYWdhaW5cbi8vIG9ubHkgZm9yIHRoZSBzdWJzdHJlZSBvZiBvdXIgbm9kZSBhbmQgd2l0aG91dCB0ZXh0Um9vciBidXQgaW5zdGVhZCBwb3MsIGR4IGFuZCBkeSBhcmUga25vd25cbmNvbnN0IGdldFRleHRCQm94ZXMgPSBmdW5jdGlvbiAodGFyZ2V0LCB0ZXh0Um9vdCA9IHRhcmdldCwgcG9zID0geyB4OiAwLCB5OiAwIH0sIGR4ID0gWyAwIF0sIGR5ID0gWyAwIF0sIGJveGVzID0gW10pIHtcblxuICAvLyBDcmVhdGUgTm9kZUl0ZXJhdG9yLiBPbmx5IHNob3cgZWxlbW50cyBhbmQgdGV4dCBhbmQgc2tpcCBkZXNjcmlwdGl2ZSBlbGVtZW50c1xuICAvLyBUT0RPOiBtYWtlIGFuIGluc3RhbmNlb2YgY2hlY2sgZm9yIERlc2NyaXB0aXZlRWxlbWVudCBpbnN0ZWFkIG9mIHRlc3Rpbmcgb25lIGJ5IG9uZVxuICAvLyBPbmx5IHRpdGxlIGlzIHNraXBwZWQgYXRtXG4gIGNvbnN0IGl0ZXIgPSBuZXcgTm9kZUl0ZXJhdG9yKHRleHRSb290LCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19URVhULCAobm9kZSkgPT4ge1xuICAgIGlmIChub2RlLm5vZGVOYW1lID09PSAndGl0bGUnKSByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFXG4gICAgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVFxuICB9KVxuXG4gIC8vIEl0ZXJhdGUgdHJvdWdoIGFsbCBub2RlcyB0b3AgdG8gYm90dG9tLCBsZWZ0IHRvIHJpZ2h0XG4gIGZvciAoY29uc3Qgbm9kZSBvZiBpdGVyKSB7XG5cbiAgICAvLyBJZiB3ZSBoaXQgb3VyIHRhcmdldCwgd2UgZ2F0aGVyZWQgYWxsIHBvc2l0aW9uYWwgaW5mb3JtYXRpb24gd2UgbmVlZCB0byBtb3ZlIHRoZSBiYm94IHRvIHRoZSBjb3JyZWN0IHNwb3RcbiAgICBpZiAobm9kZSA9PT0gdGFyZ2V0ICYmIG5vZGUgIT09IHRleHRSb290KSB7XG4gICAgICByZXR1cm4gZ2V0VGV4dEJCb3hlcyhub2RlLCBub2RlLCBwb3MsIGR4LCBkeSlcbiAgICB9XG5cbiAgICAvLyBUcmF2ZXJzZSB0cm91Z2ggdGhpcyBub2RlIHVwZGF0aW5nIHBvc2l0aW9ucyBhbmQgYWRkIGJveGVzXG4gICAgZ2V0UG9zaXRpb25EZXRhaWxzRm9yKG5vZGUsIHBvcywgZHgsIGR5LCBib3hlcylcbiAgfVxuXG4gIHJldHVybiBib3hlc1xufVxuXG5jb25zdCBpc05vdEVtcHR5Qm94ID0gYm94ID0+IGJveC54ICE9PSAwIHx8IGJveC55ICE9PSAwIHx8IGJveC53aWR0aCAhPT0gMCB8fCBib3guaGVpZ2h0ICE9PSAwXG5cbi8vIFRoaXMgZnVuY3Rpb24gZWl0aGVyIHVwZGF0ZXMgcG9zLCBkeCBhbmQgZHkgKHdoZW4gaXRzIGFuIGVsZW1lbnQpIG9yIGNhbGN1bGF0ZXMgdGhlIGJveGVzIGZvciB0ZXh0IHdpdGggdGhlIHBhc3NlZCBhcmd1bWVudHNcbi8vIEFsbCBhcmd1bWVudHMgYXJlIHBhc3NlZCBieSByZWZlcmVuY2Ugc28gZG9udCBvdmVyd3JpdGUgdGhlbSAodHJlYXQgdGhlbSBhcyBjb25zdCEpXG4vLyBUT0RPOiBCcmVhayB0aGlzIGludG8gdHdvIGZ1bmN0aW9ucz9cbmNvbnN0IGdldFBvc2l0aW9uRGV0YWlsc0ZvciA9IChub2RlLCBwb3MsIGR4LCBkeSwgYm94ZXMpID0+IHtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3gnKSlcbiAgICBjb25zdCB5ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneScpKVxuXG4gICAgcG9zLnggPSBpc05hTih4KSA/IHBvcy54IDogeFxuICAgIHBvcy55ID0gaXNOYU4oeSkgPyBwb3MueSA6IHlcblxuICAgIGNvbnN0IGR4MCA9IChub2RlLmdldEF0dHJpYnV0ZSgnZHgnKSB8fCAnJykuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5maWx0ZXIobnVtID0+IG51bSAhPT0gJycpLm1hcChwYXJzZUZsb2F0KVxuICAgIGNvbnN0IGR5MCA9IChub2RlLmdldEF0dHJpYnV0ZSgnZHknKSB8fCAnJykuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5maWx0ZXIobnVtID0+IG51bSAhPT0gJycpLm1hcChwYXJzZUZsb2F0KVxuXG4gICAgLy8gVE9ETzogZXZlbnR1YWxseSByZXBsYWNlIG9ubHkgYXMgbXVjaCB2YWx1ZXMgYXMgd2UgaGF2ZSB0ZXh0IGNoYXJzIChub2RlLnRleHRDb250ZW50Lmxlbmd0aCkgYmVjYXVzZSB3ZSBjb3VsZCBlbmQgdXAgYWRkaW5nIHRvIG11Y2hcbiAgICAvLyByZXBsYWNlIGluaXRpYWwgdmFsdWVzIHdpdGggbm9kZSB2YWx1ZXMgaWYgcHJlc2VudFxuICAgIGR4LnNwbGljZSgwLCBkeDAubGVuZ3RoLCAuLi5keDApXG4gICAgZHkuc3BsaWNlKDAsIGR5MC5sZW5ndGgsIC4uLmR5MClcbiAgfSBlbHNlIHtcbiAgICAvLyBnZXQgdGV4dCBkYXRhXG4gICAgY29uc3QgZGF0YSA9IG5vZGUuZGF0YVxuXG4gICAgbGV0IGogPSAwXG4gICAgY29uc3QgamwgPSBkYXRhLmxlbmd0aFxuICAgIGNvbnN0IGRldGFpbHMgPSBnZXRGb250RGV0YWlscyhub2RlKVxuXG4gICAgLy8gaWYgaXQgaXMgbW9yZSB0aGFuIG9uZSBkeC9keSBzaW5nbGUgbGV0dGVycyBhcmUgbW92ZWQgYnkgdGhlIGFtb3VudCAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS9keClcbiAgICBpZiAoZHkubGVuZ3RoIHx8IGR4Lmxlbmd0aCkge1xuICAgICAgZm9yICg7aiA8IGpsOyBqKyspIHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIGEgYm94IGZvciBhIHNpbmdsZSBsZXR0ZXJcbiAgICAgICAgYm94ZXMucHVzaCh0ZXh0VXRpbHMudGV4dEJCb3goZGF0YS5zdWJzdHIoaiwgMSksIHBvcy54LCBwb3MueSwgZGV0YWlscykpXG5cbiAgICAgICAgLy8gQWRkIHRoZSBuZXh0IHBvc2l0aW9uIHRvIGN1cnJlbnQgb25lXG4gICAgICAgIHBvcy54ICs9IGR4LnNoaWZ0KCkgfHwgMFxuICAgICAgICBwb3MueSArPSBkeS5zaGlmdCgpIHx8IDBcblxuICAgICAgICBpZiAoIWR5Lmxlbmd0aCAmJiAhZHgubGVuZ3RoKSBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGluIGNhc2UgaXQgd2FzIG9ubHkgb25lIGR4L2R5IG9yIG5vIG1vcmUgZHgvZHkgbW92ZSB0aGUgcmVzdCBvZiB0aGUgdGV4dFxuICAgIGJveGVzLnB1c2godGV4dFV0aWxzLnRleHRCQm94KGRhdGEuc3Vic3RyKGopLCBwb3MueCwgcG9zLnksIGRldGFpbHMpKVxuICAgIHBvcy54ICs9IGJveGVzW2JveGVzLmxlbmd0aCAtIDFdLndpZHRoXG4gIH1cbn1cblxuLypcbi8vIHRoaXMgZnVuY3Rpb24gaXMgcGFzc2luZyBkeCBhbmQgZHkgdmFsdWVzIGJ5IHJlZmVyZW5jZXMuIERvbnQgYXNzaWduIG5ldyB2YWx1ZXMgdG8gaXRcbmNvbnN0IHRleHRJdGVyYXRvciA9IGZ1bmN0aW9uIChub2RlLCBwb3MgPSB7IHg6IDAsIHk6IDAgfSwgZHggPSBbIDAgXSwgZHkgPSBbIDAgXSkge1xuXG4gIHZhciB4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneCcpKVxuICB2YXIgeSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3knKSlcblxuICBwb3MueCA9IGlzTmFOKHgpID8gcG9zLnggOiB4XG4gIHBvcy55ID0gaXNOYU4oeSkgPyBwb3MueSA6IHlcblxuICB2YXIgZHgwID0gKG5vZGUuZ2V0QXR0cmlidXRlKCdkeCcpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihudW0gPT4gbnVtICE9PSAnJykubWFwKHBhcnNlRmxvYXQpXG4gIHZhciBkeTAgPSAobm9kZS5nZXRBdHRyaWJ1dGUoJ2R5JykgfHwgJycpLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikuZmlsdGVyKG51bSA9PiBudW0gIT09ICcnKS5tYXAocGFyc2VGbG9hdClcbiAgdmFyIGJveGVzID0gW11cbiAgdmFyIGRhdGEgPSAnJ1xuXG4gIC8vIFRPRE86IGV2ZW50dWFsbHkgcmVwbGFjZSBvbmx5IGFzIG11Y2ggdmFsdWVzIGFzIHdlIGhhdmUgdGV4dCBjaGFycyAobm9kZS50ZXh0Q29udGVudC5sZW5ndGgpIGJlY2F1c2Ugd2UgY291bGQgZW5kIHVwIGFkZGluZyB0byBtdWNoXG4gIC8vIHJlcGxhY2UgaW5pdGlhbCB2YWx1ZXMgd2l0aCBub2RlIHZhbHVlcyBpZiBwcmVzZW50XG4gIGR4LnNwbGljZSgwLCBkeDAubGVuZ3RoLCAuLi5keDApXG4gIGR5LnNwbGljZSgwLCBkeTAubGVuZ3RoLCAuLi5keTApXG5cbiAgdmFyIGkgPSAwXG4gIHZhciBpbCA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGhcblxuICAvLyBpdGVyYXRlIHRocm91Z2ggYWxsIGNoaWxkcmVuXG4gIGZvciAoOyBpIDwgaWw7ICsraSkge1xuXG4gICAgLy8gc2hpZnQgbmV4dCBjaGlsZFxuICAgIHBvcy54ICs9IGR4LnNoaWZ0KCkgfHwgMFxuICAgIHBvcy55ICs9IGR5LnNoaWZ0KCkgfHwgMFxuXG4gICAgLy8gdGV4dFxuICAgIGlmIChub2RlLmNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgPT09IG5vZGUuVEVYVF9OT0RFKSB7XG5cbiAgICAgIC8vIGdldCB0ZXh0IGRhdGFcbiAgICAgIGRhdGEgPSBub2RlLmNoaWxkTm9kZXNbaV0uZGF0YVxuXG4gICAgICBsZXQgaiA9IDBcbiAgICAgIGNvbnN0IGpsID0gZGF0YS5sZW5ndGhcblxuICAgICAgLy8gaWYgaXQgaXMgbW9yZSB0aGFuIG9uZSBkeC9keSBzaW5nbGUgbGV0dGVycyBhcmUgbW92ZWQgYnkgdGhlIGFtb3VudCAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS9keClcbiAgICAgIGlmIChkeS5sZW5ndGggfHwgZHgubGVuZ3RoKSB7XG4gICAgICAgIGZvciAoO2ogPCBqbDsgaisrKSB7XG4gICAgICAgICAgYm94ZXMucHVzaCh0ZXh0VXRpbHMudGV4dEJCb3goZGF0YS5zdWJzdHIoaiwgMSksIHBvcy54LCBwb3MueSwgZ2V0Rm9udERldGFpbHMobm9kZSkpKVxuXG4gICAgICAgICAgcG9zLnggKz0gZHguc2hpZnQoKSB8fCAwXG4gICAgICAgICAgcG9zLnkgKz0gZHkuc2hpZnQoKSB8fCAwXG5cbiAgICAgICAgICBpZiAoIWR5Lmxlbmd0aCAmJiAhZHgubGVuZ3RoKSBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGluIGNhc2UgaXQgd2FzIG9ubHkgb25lIGR4L2R5IG9yIG5vIG1vcmUgZHgvZHkgbW92ZSB0aGUgcmVzdCBvZiB0aGUgdGV4dFxuXG4gICAgICBib3hlcy5wdXNoKHRleHRVdGlscy50ZXh0QkJveChkYXRhLnN1YnN0cihqKSwgcG9zLngsIHBvcy55LCBnZXRGb250RGV0YWlscyhub2RlKSkpXG4gICAgICBwb3MueCArPSBib3hlc1tib3hlcy5sZW5ndGggLSAxXS53aWR0aFxuXG4gICAgLy8gZWxlbWVudFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbiBjYXNlIG9mIGVsZW1lbnQsIHJlY3Vyc2l2ZWx5IGNhbGwgZnVuY3Rpb24gYWdhaW4gd2l0aCBuZXcgc3RhcnQgdmFsdWVzXG4gICAgICBib3hlcyA9IGJveGVzLmNvbmNhdCh0ZXh0SXRlcmF0b3Iobm9kZS5jaGlsZE5vZGVzW2ldLCBwb3MsIGR4LCBkeSkpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJveGVzXG59ICovXG5cbmNvbnN0IGdldEZvbnREZXRhaWxzID0gKG5vZGUpID0+IHtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuVEVYVF9OT0RFKSBub2RlID0gbm9kZS5wYXJlbnROb2RlXG5cbiAgbGV0IGZvbnRTaXplID0gbnVsbFxuICBsZXQgZm9udEZhbWlseSA9IG51bGxcbiAgbGV0IHRleHRBbmNob3IgPSBudWxsXG4gIGxldCBkb21pbmFudEJhc2VsaW5lID0gbnVsbFxuXG4gIGNvbnN0IHRleHRDb250ZW50RWxlbWVudHMgPSBbXG4gICAgJ3RleHQnLFxuICAgICd0c3BhbicsXG4gICAgJ3RyZWYnLFxuICAgICd0ZXh0UGF0aCcsXG4gICAgJ2FsdEdseXBoJyxcbiAgICAnZydcbiAgXVxuXG4gIGRvIHtcbiAgICAvLyBUT0RPOiBzdG9wIG9uXG4gICAgaWYgKCFmb250U2l6ZSkgeyBmb250U2l6ZSA9IG5vZGUuc3R5bGUuZm9udFNpemUgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ2ZvbnQtc2l6ZScpIH1cbiAgICBpZiAoIWZvbnRGYW1pbHkpIHsgZm9udEZhbWlseSA9IG5vZGUuc3R5bGUuZm9udEZhbWlseSB8fCBub2RlLmdldEF0dHJpYnV0ZSgnZm9udC1mYW1pbHknKSB9XG4gICAgaWYgKCF0ZXh0QW5jaG9yKSB7IHRleHRBbmNob3IgPSBub2RlLnN0eWxlLnRleHRBbmNob3IgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ3RleHQtYW5jaG9yJykgfVxuICAgIGlmICghZG9taW5hbnRCYXNlbGluZSkgeyBkb21pbmFudEJhc2VsaW5lID0gbm9kZS5zdHlsZS5kb21pbmFudEJhc2VsaW5lIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCdkb21pbmFudC1iYXNlbGluZScpIH1cbiAgICAvLyBUT0RPOiBjaGVjayBmb3IgYWxpZ25tZW50LWJhc2VsaW5lIGluIHRzcGFuLCB0cmVmLCB0ZXh0UGF0aCwgYWx0R2x5cGhcbiAgICAvLyBUT0RPOiBhbGlnbm1lbnQtYWRqdXN0LCBiYXNlbGluZS1zaGlmdFxuICAgIC8qXG4gICAgaWYoIWFsaWdubWVudEJhc2VsaW5lKVxuICAgIGFsaWdubWVudEJhc2VsaW5lID0gdGhpcy5zdHlsZS5hbGlnbm1lbnRCYXNlbGluZSB8fCB0aGlzLmdldEF0dHJpYnV0ZSgnYWxpZ25tZW50LWJhc2VsaW5lJylcbiAgICAqL1xuXG4gIH0gd2hpbGUgKFxuICAgIChub2RlID0gbm9kZS5wYXJlbnROb2RlKVxuICAgICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFXG4gICAgJiYgKHRleHRDb250ZW50RWxlbWVudHMuaW5jbHVkZXMobm9kZS5ub2RlTmFtZSkpXG4gIClcblxuICByZXR1cm4ge1xuICAgIGZvbnRGYW1pbHksXG4gICAgZm9udFNpemUsXG4gICAgdGV4dEFuY2hvcjogdGV4dEFuY2hvciB8fCAnc3RhcnQnLFxuICAgIC8vIFRPRE86IHVzZSBjZW50cmFsIGZvciB3cml0aW5nLW1vZGUgPT09IGhvcml6b250YWwgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS9kb21pbmFudC1iYXNlbGluZVxuICAgIGRvbWluYW50QmFzZWxpbmU6IGRvbWluYW50QmFzZWxpbmUgfHwgJ2FscGhhYmV0aWNhbCdcbiAgICAvLyBmb250RmFtaWx5TWFwcGluZ3M6IHRoaXMub3duZXJEb2N1bWVudC5mb250RmFtaWx5TWFwcGluZ3MsXG4gICAgLy8gZm9udERpcjogdGhpcy5vd25lckRvY3VtZW50LmZvbnREaXIsXG4gICAgLy8gcHJlbG9hZGVkOiB0aGlzLm93bmVyRG9jdW1lbnQuX3ByZWxvYWRlZFxuICB9XG59XG4iLCJpbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCdcclxuLy8gaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCdcclxuaW1wb3J0IHsgZGVmYXVsdCBhcyBfX2Rpcm5hbWUgfSBmcm9tICcuL2Rpcm5hbWUuY2pzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblxyXG4vLyB1c2UgdGhpcyBhcyBzb29uIGFzIGltcG9ydC5tZXRhIGlzIHN0YW5kYXJkaXplZFxyXG4vLyBjb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XHJcblxyXG5leHBvcnQgY29uc3QgZm9udFNpemUgPSAxNlxyXG5leHBvcnQgY29uc3QgZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJ1xyXG5leHBvcnQgY29uc3QgZm9udERpciA9IGpvaW4oX19kaXJuYW1lLCAnLi4vLi4vJywgJ2ZvbnRzLycpXHJcbmV4cG9ydCBjb25zdCBmb250RmFtaWx5TWFwcGluZ3MgPSB7XHJcbiAgJ3NhbnMtc2VyaWYnOiAnT3BlblNhbnMtUmVndWxhci50dGYnLFxyXG4gICdPcGVuIFNhbnMnOiAnT3BlblNhbnMtUmVndWxhci50dGYnXHJcbn1cclxuIiwiaW1wb3J0IHsgZGVjYW1lbGl6ZSB9IGZyb20gJy4uL3V0aWxzL3N0clV0aWxzLmpzJ1xyXG5cclxuZXhwb3J0IGNvbnN0IG9iamVjdFRvTWFwID0gZnVuY3Rpb24gKG9iaikge1xyXG4gIGlmIChvYmogaW5zdGFuY2VvZiBNYXApIHJldHVybiBuZXcgTWFwKG9iailcclxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKG1hcCwga2V5KSA9PiBtYXAuc2V0KGtleSwgb2JqW2tleV0pLCBuZXcgTWFwKCkpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtYXBUb09iamVjdCA9IGZ1bmN0aW9uIChtYXApIHtcclxuICB2YXIgb2JqID0ge31cclxuICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgb2JqW2tleV0gPSB2YWx1ZVxyXG4gIH0pXHJcbiAgcmV0dXJuIG9ialxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWFwTWFwID0gZnVuY3Rpb24gKG1hcCwgY2IpIHtcclxuICB2YXIgYXJyID0gW11cclxuICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgYXJyLnB1c2goY2IodmFsdWUsIGtleSkpXHJcbiAgfSlcclxuICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtYXBUb0NzcyA9IGZ1bmN0aW9uIChteU1hcCkge1xyXG4gIHJldHVybiBtYXBNYXAobXlNYXAsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2VcclxuICAgIHJldHVybiBkZWNhbWVsaXplKGtleSkgKyAnOiAnICsgdmFsdWVcclxuICB9KS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAhIWVsIH0pLmpvaW4oJzsgJykgKyAnOycgfHwgbnVsbFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3NzVG9NYXAgPSBmdW5jdGlvbiAoY3NzKSB7XHJcbiAgcmV0dXJuIG5ldyBNYXAoY3NzLnNwbGl0KC9cXHMqO1xccyovKS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAhIWVsIH0pLm1hcChmdW5jdGlvbiAoZWwpIHtcclxuICAgIHJldHVybiBlbC5zcGxpdCgvXFxzKjpcXHMqLylcclxuICB9KSlcclxufVxyXG4iLCJcclxuZXhwb3J0IGNvbnN0IHN2ZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcclxuZXhwb3J0IGNvbnN0IHhsaW5rID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnXHJcbmV4cG9ydCBjb25zdCBodG1sID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnXHJcbmV4cG9ydCBjb25zdCBtYXRobWwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCdcclxuZXhwb3J0IGNvbnN0IHhtbCA9ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnXHJcbmV4cG9ydCBjb25zdCB4bWxucyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLydcclxuIiwiZXhwb3J0IGNvbnN0IG5vZGVzVG9Ob2RlID0gKG5vZGVzLCBkb2N1bWVudCkgPT4ge1xyXG4gIG5vZGVzID0gbm9kZXMubWFwKChub2RlKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vZGVcclxuICB9KVxyXG4gIGlmIChub2Rlcy5sZW5ndGggPT09IDEpIHsgcmV0dXJuIG5vZGVzIH1cclxuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXHJcbiAgbm9kZXMuZm9yRWFjaChub2RlLmFwcGVuZENoaWxkLCBub2RlKVxyXG4gIHJldHVybiBub2RlXHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGV4dGVuZCA9ICguLi5tb2R1bGVzKSA9PiB7XHJcbiAgdmFyIG1ldGhvZHMsIGtleSwgaVxyXG5cclxuICAvLyBHZXQgb2JqZWN0IHdpdGggZXh0ZW5zaW9uc1xyXG4gIG1ldGhvZHMgPSBtb2R1bGVzLnBvcCgpXHJcblxyXG4gIGZvciAoaSA9IG1vZHVsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIGZvciAoa2V5IGluIG1ldGhvZHMpIHsgbW9kdWxlc1tpXS5wcm90b3R5cGVba2V5XSA9IG1ldGhvZHNba2V5XSB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZXh0ZW5kU3RhdGljID0gKC4uLm1vZHVsZXMpID0+IHtcclxuICB2YXIgbWV0aG9kcywga2V5LCBpXHJcblxyXG4gIC8vIEdldCBvYmplY3Qgd2l0aCBleHRlbnNpb25zXHJcbiAgbWV0aG9kcyA9IG1vZHVsZXMucG9wKClcclxuXHJcbiAgZm9yIChpID0gbW9kdWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgZm9yIChrZXkgaW4gbWV0aG9kcykgeyBtb2R1bGVzW2ldW2tleV0gPSBtZXRob2RzW2tleV0gfVxyXG4gIH1cclxufVxyXG5cclxuLy8gVE9ETzogcmVmYWN0b3Igc28gdGhhdCBpdCB0YWtlcyBhIGNsYXNzXHJcbmV4cG9ydCBjb25zdCBtaXhpbiA9IChtaXhpbiwgX2NsYXNzKSA9PiB7XHJcbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhtaXhpbilcclxuICAvLyBjb25zdCBhbGwgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhtaXhpbilcclxuXHJcbiAgLy8gY29uc3QgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMoZGVzY3JpcHRvcnMpXHJcbiAgLy8gY29uc3QgbWV0aG9kTmFtZXMgPSBhbGwuZmlsdGVyKHAgPT4gIXByb3BOYW1lcy5pbmNsdWRlcyhwKSlcclxuXHJcbiAgLy8gZm9yIChjb25zdCBtZXRob2Qgb2YgbWV0aG9kTmFtZXMpIHtcclxuICAvLyAgIF9jbGFzcy5wcm90b3R5cGVbbWV0aG9kXSA9IG1peGluW21ldGhvZF1cclxuICAvLyB9XHJcblxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKF9jbGFzcy5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKVxyXG59XHJcbiIsImltcG9ydCB7IEJveCwgTm9Cb3ggfSBmcm9tICcuLi9vdGhlci9Cb3guanMnXHJcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vb3RoZXIvUG9pbnQuanMnXHJcbmltcG9ydCAqIGFzIHJlZ2V4IGZyb20gJy4vcmVnZXguanMnXHJcbi8vIFRPRE86IHVzZSBvd24gbWF0cml4IGltcGxlbWVudGF0aW9uXHJcbmltcG9ydCB7IG1hdHJpeEZhY3RvcnkgfSBmcm9tICcuLy4uL2RvbS9zdmcvU1ZHTWF0cml4LmpzJ1xyXG5pbXBvcnQgeyBQb2ludENsb3VkIH0gZnJvbSAnLi9Qb2ludENsb3VkLmpzJ1xyXG5cclxuY29uc3QgcGF0aEhhbmRsZXJzID0ge1xyXG4gIE0gKGMsIHAsIHIsIHAwKSB7XHJcbiAgICBwLnggPSBwMC54ID0gY1swXVxyXG4gICAgcC55ID0gcDAueSA9IGNbMV1cclxuXHJcbiAgICByZXR1cm4gbmV3IE1vdmUocClcclxuICB9LFxyXG4gIEwgKGMsIHApIHtcclxuICAgIGNvbnN0IHJldCA9IG5ldyBMaW5lKHAueCwgcC55LCBjWzBdLCBjWzFdKS8vIC5vZmZzZXQobylcclxuICAgIHAueCA9IGNbMF1cclxuICAgIHAueSA9IGNbMV1cclxuICAgIHJldHVybiByZXRcclxuICB9LFxyXG4gIEggKGMsIHApIHtcclxuICAgIHJldHVybiBwYXRoSGFuZGxlcnMuTChbIGNbMF0sIHAueSBdLCBwKVxyXG4gIH0sXHJcbiAgViAoYywgcCkge1xyXG4gICAgcmV0dXJuIHBhdGhIYW5kbGVycy5MKFsgcC54LCBjWzBdIF0sIHApXHJcbiAgfSxcclxuICBRIChjLCBwLCByKSB7XHJcbiAgICBjb25zdCByZXQgPSBDdWJpYy5mcm9tUXVhZChwLCBuZXcgUG9pbnQoY1swXSwgY1sxXSksIG5ldyBQb2ludChjWzJdLCBjWzNdKSkvLyAub2Zmc2V0KG8pXHJcbiAgICBwLnggPSBjWzJdXHJcbiAgICBwLnkgPSBjWzNdXHJcblxyXG4gICAgY29uc3QgcmVmbGVjdCA9IG5ldyBQb2ludChjWzBdLCBjWzFdKS5yZWZsZWN0QXQocClcclxuICAgIHIueCA9IHJlZmxlY3QueFxyXG4gICAgci55ID0gcmVmbGVjdC55XHJcblxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH0sXHJcbiAgVCAoYywgcCwgciwgcDAsIHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKSB7XHJcbiAgICBpZiAocmVmbGVjdGlvbklzUG9zc2libGUpIHsgYyA9IFsgci54LCByLnkgXS5jb25jYXQoYykgfSBlbHNlIHsgYyA9IFsgcC54LCBwLnkgXS5jb25jYXQoYykgfVxyXG4gICAgcmV0dXJuIHBhdGhIYW5kbGVycy5RKGMsIHAsIHIpXHJcbiAgfSxcclxuICBDIChjLCBwLCByKSB7XHJcbiAgICBjb25zdCByZXQgPSBuZXcgQ3ViaWMocCwgbmV3IFBvaW50KGNbMF0sIGNbMV0pLCBuZXcgUG9pbnQoY1syXSwgY1szXSksIG5ldyBQb2ludChjWzRdLCBjWzVdKSkvLyAub2Zmc2V0KG8pXHJcbiAgICBwLnggPSBjWzRdXHJcbiAgICBwLnkgPSBjWzVdXHJcbiAgICBjb25zdCByZWZsZWN0ID0gbmV3IFBvaW50KGNbMl0sIGNbM10pLnJlZmxlY3RBdChwKVxyXG4gICAgci54ID0gcmVmbGVjdC54XHJcbiAgICByLnkgPSByZWZsZWN0LnlcclxuICAgIHJldHVybiByZXRcclxuICB9LFxyXG4gIFMgKGMsIHAsIHIsIHAwLCByZWZsZWN0aW9uSXNQb3NzaWJsZSkge1xyXG4gICAgLy8gcmVmbGVjdGlvbiBtYWtlcyBvbmx5IHNlbnNlIGlmIHRoaXMgY29tbWFuZCB3YXMgcHJlY2VlZGVkIGJ5IGFub3RoZXIgYmV6aWVyZSBjb21tYW5kIChRVFNDKVxyXG4gICAgaWYgKHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKSB7IGMgPSBbIHIueCwgci55IF0uY29uY2F0KGMpIH0gZWxzZSB7IGMgPSBbIHAueCwgcC55IF0uY29uY2F0KGMpIH1cclxuICAgIHJldHVybiBwYXRoSGFuZGxlcnMuQyhjLCBwLCByKVxyXG4gIH0sXHJcbiAgWiAoYywgcCwgciwgcDApIHtcclxuICAgIC8vIEZJWE1FOiBUaGUgYmVoYXZpb3Igb2YgWiBkZXBlbmRzIG9uIHRoZSBjb21tYW5kIGJlZm9yZVxyXG4gICAgcmV0dXJuIHBhdGhIYW5kbGVycy5MKFsgcDAueCwgcDAueSBdLCBwKVxyXG4gIH0sXHJcbiAgQSAoYywgcCwgcikge1xyXG4gICAgY29uc3QgcmV0ID0gbmV3IEFyYyhwLCBuZXcgUG9pbnQoY1s1XSwgY1s2XSksIGNbMF0sIGNbMV0sIGNbMl0sIGNbM10sIGNbNF0pXHJcbiAgICBwLnggPSBjWzVdXHJcbiAgICBwLnkgPSBjWzZdXHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBtbGh2cXRjc2EgPSAnbWxodnF0Y3Nheicuc3BsaXQoJycpXHJcblxyXG5mb3IgKGxldCBpID0gMCwgaWwgPSBtbGh2cXRjc2EubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xyXG4gIHBhdGhIYW5kbGVyc1ttbGh2cXRjc2FbaV1dID0gKGZ1bmN0aW9uIChpKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGMsIHAsIHIsIHAwLCByZWZsZWN0aW9uSXNQb3NzaWJsZSkge1xyXG4gICAgICBpZiAoaSA9PT0gJ0gnKSBjWzBdID0gY1swXSArIHAueFxyXG4gICAgICBlbHNlIGlmIChpID09PSAnVicpIGNbMF0gPSBjWzBdICsgcC55XHJcbiAgICAgIGVsc2UgaWYgKGkgPT09ICdBJykge1xyXG4gICAgICAgIGNbNV0gPSBjWzVdICsgcC54XHJcbiAgICAgICAgY1s2XSA9IGNbNl0gKyBwLnlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMCwgamwgPSBjLmxlbmd0aDsgaiA8IGpsOyArK2opIHtcclxuICAgICAgICAgIGNbal0gPSBjW2pdICsgKGogJSAyID8gcC55IDogcC54KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHBhdGhIYW5kbGVyc1tpXShjLCBwLCByLCBwMCwgcmVmbGVjdGlvbklzUG9zc2libGUpXHJcbiAgICB9XHJcbiAgfSkobWxodnF0Y3NhW2ldLnRvVXBwZXJDYXNlKCkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhdGhSZWdSZXBsYWNlIChhLCBiLCBjLCBkKSB7XHJcbiAgcmV0dXJuIGMgKyBkLnJlcGxhY2UocmVnZXguZG90cywgJyAuJylcclxufVxyXG5cclxuZnVuY3Rpb24gaXNCZXppZXJlIChvYmopIHtcclxuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgQ3ViaWNcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHBhdGhQYXJzZXIgPSAoYXJyYXkpID0+IHtcclxuXHJcbiAgLy8gcHJlcGFyZSBmb3IgcGFyc2luZ1xyXG4gIGNvbnN0IHBhcmFtQ250ID0geyBNOiAyLCBMOiAyLCBIOiAxLCBWOiAxLCBDOiA2LCBTOiA0LCBROiA0LCBUOiAyLCBBOiA3LCBaOiAwIH1cclxuXHJcbiAgYXJyYXkgPSBhcnJheVxyXG4gICAgLnJlcGxhY2UocmVnZXgubnVtYmVyc1dpdGhEb3RzLCBwYXRoUmVnUmVwbGFjZSkgLy8gY29udmVydCA0NS4xMjMuMTIzIHRvIDQ1LjEyMyAuMTIzXHJcbiAgICAucmVwbGFjZShyZWdleC5wYXRoTGV0dGVycywgJyAkJiAnKSAvLyBwdXQgc29tZSByb29tIGJldHdlZW4gbGV0dGVycyBhbmQgbnVtYmVyc1xyXG4gICAgLnJlcGxhY2UocmVnZXguaHlwaGVuLCAnJDEgLScpIC8vIGFkZCBzcGFjZSBiZWZvcmUgaHlwaGVuXHJcbiAgICAudHJpbSgpIC8vIHRyaW1cclxuICAgIC5zcGxpdChyZWdleC5kZWxpbWl0ZXIpIC8vIHNwbGl0IGludG8gYXJyYXlcclxuXHJcbiAgLy8gYXJyYXkgbm93IGlzIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIHBhcnRzIG9mIGEgcGF0aCBlLmcuIFsnTScsICcwJywgJzAnLCAnTCcsICczMCcsICczMCcgLi4uXVxyXG4gIGNvbnN0IGFyciA9IFtdXHJcbiAgY29uc3QgcCA9IG5ldyBQb2ludCgpXHJcbiAgY29uc3QgcDAgPSBuZXcgUG9pbnQoKVxyXG4gIGNvbnN0IHIgPSBuZXcgUG9pbnQoKVxyXG4gIGxldCBpbmRleCA9IDBcclxuICBjb25zdCBsZW4gPSBhcnJheS5sZW5ndGhcclxuICBsZXQgc1xyXG5cclxuICBkbyB7XHJcbiAgICAvLyBUZXN0IGlmIHdlIGhhdmUgYSBwYXRoIGxldHRlclxyXG4gICAgaWYgKHJlZ2V4LmlzUGF0aExldHRlci50ZXN0KGFycmF5W2luZGV4XSkpIHtcclxuICAgICAgcyA9IGFycmF5W2luZGV4XVxyXG4gICAgICArK2luZGV4XHJcbiAgICAvLyBJZiBsYXN0IGxldHRlciB3YXMgYSBtb3ZlIGNvbW1hbmQgYW5kIHdlIGdvdCBubyBuZXcsIGl0IGRlZmF1bHRzIHRvIFtMXWluZVxyXG4gICAgfSBlbHNlIGlmIChzID09PSAnTScpIHtcclxuICAgICAgcyA9ICdMJ1xyXG4gICAgfSBlbHNlIGlmIChzID09PSAnbScpIHtcclxuICAgICAgcyA9ICdsJ1xyXG4gICAgfVxyXG5cclxuICAgIGFyci5wdXNoKFxyXG4gICAgICBwYXRoSGFuZGxlcnNbc10uY2FsbChudWxsLFxyXG4gICAgICAgIGFycmF5LnNsaWNlKGluZGV4LCAoaW5kZXggPSBpbmRleCArIHBhcmFtQ250W3MudG9VcHBlckNhc2UoKV0pKS5tYXAocGFyc2VGbG9hdCksXHJcbiAgICAgICAgcCwgciwgcDAsXHJcbiAgICAgICAgaXNCZXppZXJlKGFyclthcnIubGVuZ3RoIC0gMV0pXHJcbiAgICAgIClcclxuICAgIClcclxuXHJcbiAgfSB3aGlsZSAobGVuID4gaW5kZXgpXHJcblxyXG4gIHJldHVybiBhcnJcclxufVxyXG5cclxuY2xhc3MgTW92ZSB7XHJcbiAgY29uc3RydWN0b3IgKHApIHtcclxuICAgIHRoaXMucDEgPSBwLmNsb25lKClcclxuICB9XHJcblxyXG4gIC8vIEZJWE1FOiBVc2UgcG9pbnRjbG91ZFxyXG4gIGJib3ggKCkge1xyXG4gICAgY29uc3QgcCA9IHRoaXMucDFcclxuICAgIHJldHVybiBuZXcgQm94KHAueCwgcC55LCAwLCAwKVxyXG4gIH1cclxuXHJcbiAgZ2V0Q2xvdWQgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludENsb3VkKFsgdGhpcy5wMSBdKVxyXG4gIH1cclxuXHJcbiAgbGVuZ3RoICgpIHsgcmV0dXJuIDAgfVxyXG5cclxuICB0b1BhdGggKCkge1xyXG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLnAxLngsIHRoaXMucDEueSBdLmpvaW4oJyAnKVxyXG4gIH1cclxuXHJcbiAgdG9QYXRoRnJhZ21lbnQgKCkge1xyXG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLnAxLngsIHRoaXMucDEueSBdXHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm0gKG1hdHJpeCkge1xyXG4gICAgdGhpcy5wMS50cmFuc2Zvcm1PKG1hdHJpeClcclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXJjIHtcclxuICBjb25zdHJ1Y3RvciAocDEsIHAyLCByeCwgcnksIM+GLCBhcmMsIHN3ZWVwKSB7XHJcbiAgICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvU1ZHL2ltcGxub3RlLmh0bWwjQXJjQ29ycmVjdGlvbk91dE9mUmFuZ2VSYWRpaVxyXG4gICAgaWYgKCFyeCB8fCAhcnkpIHJldHVybiBuZXcgTGluZShwMSwgcDIpXHJcblxyXG4gICAgcnggPSBNYXRoLmFicyhyeClcclxuICAgIHJ5ID0gTWF0aC5hYnMocnkpXHJcblxyXG4gICAgdGhpcy5wMSA9IHAxLmNsb25lKClcclxuICAgIHRoaXMucDIgPSBwMi5jbG9uZSgpXHJcbiAgICB0aGlzLmFyYyA9IGFyYyA/IDEgOiAwXHJcbiAgICB0aGlzLnN3ZWVwID0gc3dlZXAgPyAxIDogMFxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSBjb3MgYW5kIHNpbiBvZiBhbmdsZSBwaGlcclxuICAgIGNvbnN0IGNvc8+GID0gTWF0aC5jb3Moz4YgLyAxODAgKiBNYXRoLlBJKVxyXG4gICAgY29uc3Qgc2luz4YgPSBNYXRoLnNpbijPhiAvIDE4MCAqIE1hdGguUEkpXHJcblxyXG4gICAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRy9pbXBsbm90ZS5odG1sI0FyY0NvbnZlcnNpb25FbmRwb2ludFRvQ2VudGVyXHJcbiAgICAvLyAoZXEuIDUuMSlcclxuICAgIGNvbnN0IHAxXyA9IG5ldyBQb2ludChcclxuICAgICAgKHAxLnggLSBwMi54KSAvIDIsXHJcbiAgICAgIChwMS55IC0gcDIueSkgLyAyXHJcbiAgICApLnRyYW5zZm9ybShtYXRyaXhGYWN0b3J5KFxyXG4gICAgICBjb3PPhiwgLXNpbs+GLCBzaW7PhiwgY29zz4YsIDAsIDBcclxuICAgICkpXHJcblxyXG4gICAgLy8gKGVxLiA2LjIpXHJcbiAgICAvLyBNYWtlIHN1cmUgdGhlIHJhZGl1cyBmaXQgd2l0aCB0aGUgYXJjIGFuZCBjb3JyZWN0IGlmIG5lY2Nlc3NhcnlcclxuICAgIGNvbnN0IHJhdGlvID0gKHAxXy54ICoqIDIgLyByeCAqKiAyKSArIChwMV8ueSAqKiAyIC8gcnkgKiogMilcclxuXHJcbiAgICAvLyAoZXEuIDYuMylcclxuICAgIGlmIChyYXRpbyA+IDEpIHtcclxuICAgICAgcnggPSBNYXRoLnNxcnQocmF0aW8pICogcnhcclxuICAgICAgcnkgPSBNYXRoLnNxcnQocmF0aW8pICogcnlcclxuICAgIH1cclxuXHJcbiAgICAvLyAoZXEuIDUuMilcclxuICAgIGNvbnN0IHJ4UXVhZCA9IHJ4ICoqIDJcclxuICAgIGNvbnN0IHJ5UXVhZCA9IHJ5ICoqIDJcclxuXHJcbiAgICBjb25zdCBkaXZpc29yMSA9IHJ4UXVhZCAqIHAxXy55ICoqIDJcclxuICAgIGNvbnN0IGRpdmlzb3IyID0gcnlRdWFkICogcDFfLnggKiogMlxyXG4gICAgY29uc3QgZGl2aWRlbmQgPSAocnhRdWFkICogcnlRdWFkIC0gZGl2aXNvcjEgLSBkaXZpc29yMilcclxuXHJcbiAgICBsZXQgY19cclxuICAgIGlmIChNYXRoLmFicyhkaXZpZGVuZCkgPCAxZS0xNSkge1xyXG4gICAgICBjXyA9IG5ldyBQb2ludCgwLCAwKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY18gPSBuZXcgUG9pbnQoXHJcbiAgICAgICAgcnggKiBwMV8ueSAvIHJ5LFxyXG4gICAgICAgIC1yeSAqIHAxXy54IC8gcnhcclxuICAgICAgKS5tdWwoTWF0aC5zcXJ0KFxyXG4gICAgICAgIGRpdmlkZW5kIC8gKGRpdmlzb3IxICsgZGl2aXNvcjIpXHJcbiAgICAgICkpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYXJjID09PSB0aGlzLnN3ZWVwKSBjXyA9IGNfLm11bCgtMSlcclxuXHJcbiAgICAvLyAoZXEuIDUuMylcclxuICAgIGNvbnN0IGMgPSBjXy50cmFuc2Zvcm0obWF0cml4RmFjdG9yeShcclxuICAgICAgY29zz4YsIHNpbs+GLCAtc2luz4YsIGNvc8+GLCAwLCAwXHJcbiAgICApKS5hZGQobmV3IFBvaW50KFxyXG4gICAgICAocDEueCArIHAyLngpIC8gMixcclxuICAgICAgKHAxLnkgKyBwMi55KSAvIDJcclxuICAgICkpXHJcblxyXG4gICAgY29uc3QgYW5nbGVQb2ludCA9IG5ldyBQb2ludChcclxuICAgICAgKHAxXy54IC0gY18ueCkgLyByeCxcclxuICAgICAgKHAxXy55IC0gY18ueSkgLyByeVxyXG4gICAgKVxyXG5cclxuICAgIC8qIEZvciBlcS4gNS40IHNlZSBhbmdsZVRvIGZ1bmN0aW9uICovXHJcblxyXG4gICAgLy8gKGVxLiA1LjUpXHJcbiAgICBjb25zdCDOuCA9IG5ldyBQb2ludCgxLCAwKS5hbmdsZVRvKGFuZ2xlUG9pbnQpXHJcblxyXG4gICAgLy8gKGVxLiA1LjYpXHJcbiAgICBsZXQgzpTOuCA9IGFuZ2xlUG9pbnQuYW5nbGVUbyhuZXcgUG9pbnQoXHJcbiAgICAgICgtcDFfLnggLSBjXy54KSAvIHJ4LFxyXG4gICAgICAoLXAxXy55IC0gY18ueSkgLyByeVxyXG4gICAgKSlcclxuXHJcbiAgICDOlM64ID0gKM6UzrggJSAoMiAqIE1hdGguUEkpKVxyXG5cclxuICAgIGlmICghc3dlZXAgJiYgzpTOuCA+IDApIM6UzrggLT0gMiAqIE1hdGguUElcclxuICAgIGlmIChzd2VlcCAmJiDOlM64IDwgMCkgzpTOuCArPSAyICogTWF0aC5QSVxyXG5cclxuICAgIHRoaXMuYyA9IGNcclxuICAgIHRoaXMudGhldGEgPSDOuCAqIDE4MCAvIE1hdGguUElcclxuICAgIHRoaXMudGhldGEyID0gKM64ICsgzpTOuCkgKiAxODAgLyBNYXRoLlBJXHJcblxyXG4gICAgdGhpcy5kZWx0YSA9IM6UzrggKiAxODAgLyBNYXRoLlBJXHJcbiAgICB0aGlzLnJ4ID0gcnhcclxuICAgIHRoaXMucnkgPSByeVxyXG4gICAgdGhpcy5waGkgPSDPhlxyXG4gICAgdGhpcy5jb3PPhiA9IGNvc8+GXHJcbiAgICB0aGlzLnNpbs+GID0gc2luz4ZcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tQ2VudGVyRm9ybSAoYywgcngsIHJ5LCDPhiwgzrgsIM6UzrgpIHtcclxuICAgIGNvbnN0IGNvc8+GID0gTWF0aC5jb3Moz4YgLyAxODAgKiBNYXRoLlBJKVxyXG4gICAgY29uc3Qgc2luz4YgPSBNYXRoLnNpbijPhiAvIDE4MCAqIE1hdGguUEkpXHJcbiAgICBjb25zdCBtID0gbWF0cml4RmFjdG9yeShjb3PPhiwgc2luz4YsIC1zaW7PhiwgY29zz4YsIDAsIDApXHJcblxyXG4gICAgY29uc3QgcDEgPSBuZXcgUG9pbnQoXHJcbiAgICAgIHJ4ICogTWF0aC5jb3MozrggLyAxODAgKiBNYXRoLlBJKSxcclxuICAgICAgcnkgKiBNYXRoLnNpbijOuCAvIDE4MCAqIE1hdGguUEkpXHJcbiAgICApLnRyYW5zZm9ybShtKS5hZGQoYylcclxuXHJcbiAgICBjb25zdCBwMiA9IG5ldyBQb2ludChcclxuICAgICAgcnggKiBNYXRoLmNvcygozrggKyDOlM64KSAvIDE4MCAqIE1hdGguUEkpLFxyXG4gICAgICByeSAqIE1hdGguc2luKCjOuCArIM6UzrgpIC8gMTgwICogTWF0aC5QSSlcclxuICAgICkudHJhbnNmb3JtKG0pLmFkZChjKVxyXG5cclxuICAgIGNvbnN0IGFyYyA9IE1hdGguYWJzKM6UzrgpID4gMTgwID8gMSA6IDBcclxuICAgIGNvbnN0IHN3ZWVwID0gzpTOuCA+IDAgPyAxIDogMFxyXG5cclxuICAgIHJldHVybiBuZXcgQXJjKHAxLCBwMiwgcngsIHJ5LCDPhiwgYXJjLCBzd2VlcClcclxuICB9XHJcblxyXG4gIGJib3ggKCkge1xyXG4gICAgY29uc3QgY2xvdWQgPSB0aGlzLmdldENsb3VkKClcclxuICAgIHJldHVybiBjbG91ZC5iYm94KClcclxuICB9XHJcblxyXG4gIGNsb25lICgpIHtcclxuICAgIHJldHVybiBuZXcgQXJjKHRoaXMucDEsIHRoaXMucDIsIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCB0aGlzLmFyYywgdGhpcy5zd2VlcClcclxuICB9XHJcblxyXG4gIGdldENsb3VkICgpIHtcclxuICAgIGlmICh0aGlzLnAxLmVxdWFscyh0aGlzLnAyKSkgcmV0dXJuIG5ldyBQb2ludENsb3VkKFsgdGhpcy5wMSBdKVxyXG5cclxuICAgIC8vIGFyYyBjb3VsZCBiZSByb3RhdGVkLiB0aGUgbWluIGFuZCBtYXggdmFsdWVzIHRoZW4gZG9udCBsaWUgb24gbXVsdGlwbGVzIG9mIDkwIGRlZ3Jlc3MgYnV0IGFyZSBzaGlmdGVkIGJ5IHRoZSByb3RhdGlvbiBhbmdsZVxyXG4gICAgLy8gc28gd2UgZmlyc3QgY2FsY3VsYXRlIG91ciAwLzkwIGRlZ3JlZSBhbmdsZVxyXG4gICAgbGV0IM64MDEgPSBNYXRoLmF0YW4oLXRoaXMuc2luz4YgLyB0aGlzLmNvc8+GICogdGhpcy5yeSAvIHRoaXMucngpICogMTgwIC8gTWF0aC5QSVxyXG4gICAgbGV0IM64MDIgPSBNYXRoLmF0YW4odGhpcy5jb3PPhiAvIHRoaXMuc2luz4YgKiB0aGlzLnJ5IC8gdGhpcy5yeCkgKiAxODAgLyBNYXRoLlBJXHJcbiAgICBsZXQgzrgxID0gdGhpcy50aGV0YVxyXG4gICAgbGV0IM64MiA9IHRoaXMudGhldGEyXHJcblxyXG4gICAgaWYgKM64MSA8IDAgfHwgzrgyIDwgMCkge1xyXG4gICAgICDOuDEgKz0gMzYwXHJcbiAgICAgIM64MiArPSAzNjBcclxuICAgIH1cclxuXHJcbiAgICBpZiAozrgyIDwgzrgxKSB7XHJcbiAgICAgIGNvbnN0IHRlbXAgPSDOuDFcclxuICAgICAgzrgxID0gzrgyXHJcbiAgICAgIM64MiA9IHRlbXBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKM64MDEgLSA5MCA+IM64MDEpIM64MDEgLT0gOTBcclxuICAgIHdoaWxlICjOuDAxIDwgzrgxKSDOuDAxICs9IDkwXHJcbiAgICB3aGlsZSAozrgwMiAtIDkwID4gzrgwMikgzrgwMiAtPSA5MFxyXG4gICAgd2hpbGUgKM64MDIgPCDOuDEpIM64MDIgKz0gOTBcclxuXHJcbiAgICBjb25zdCBhbmdsZVRvVGVzdCA9IFsgzrgwMSwgzrgwMiwgKM64MDEgKyA5MCksICjOuDAyICsgOTApLCAozrgwMSArIDE4MCksICjOuDAyICsgMTgwKSwgKM64MDEgKyAyNzApLCAozrgwMiArIDI3MCkgXVxyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IGFuZ2xlVG9UZXN0LmZpbHRlcihmdW5jdGlvbiAoYW5nbGUpIHtcclxuICAgICAgcmV0dXJuIChhbmdsZSA+IM64MSAmJiBhbmdsZSA8IM64MilcclxuICAgIH0pLm1hcChmdW5jdGlvbiAoYW5nbGUpIHtcclxuICAgICAgd2hpbGUgKHRoaXMudGhldGEgPCBhbmdsZSkgYW5nbGUgLT0gMzYwXHJcbiAgICAgIHJldHVybiB0aGlzLnBvaW50QXQoKChhbmdsZSAtIHRoaXMudGhldGEpICUgMzYwKSAvICh0aGlzLmRlbHRhKSkgLy8gVE9ETzogcmVwbGFjZSB0aGF0IGNhbGwgd2l0aCBwb2ludEF0QW5nbGVcclxuICAgIH0uYmluZCh0aGlzKSkuY29uY2F0KHRoaXMucDEsIHRoaXMucDIpXHJcblxyXG4gICAgcmV0dXJuIG5ldyBQb2ludENsb3VkKHBvaW50cylcclxuICB9XHJcblxyXG4gIGxlbmd0aCAoKSB7XHJcbiAgICBpZiAodGhpcy5wMS5lcXVhbHModGhpcy5wMikpIHJldHVybiAwXHJcblxyXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5wMi5zdWIodGhpcy5wMSkuYWJzKClcclxuXHJcbiAgICBjb25zdCByZXQgPSB0aGlzLnNwbGl0QXQoMC41KVxyXG4gICAgY29uc3QgbGVuMSA9IHJldFswXS5wMi5zdWIocmV0WzBdLnAxKS5hYnMoKVxyXG4gICAgY29uc3QgbGVuMiA9IHJldFsxXS5wMi5zdWIocmV0WzFdLnAxKS5hYnMoKVxyXG5cclxuICAgIGlmIChsZW4xICsgbGVuMiAtIGxlbmd0aCA8IDAuMDAwMDEpIHtcclxuICAgICAgcmV0dXJuIGxlbjEgKyBsZW4yXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJldFswXS5sZW5ndGgoKSArIHJldFsxXS5sZW5ndGgoKVxyXG4gIH1cclxuXHJcbiAgcG9pbnRBdCAodCkge1xyXG4gICAgaWYgKHRoaXMucDEuZXF1YWxzKHRoaXMucDIpKSByZXR1cm4gdGhpcy5wMS5jbG9uZSgpXHJcblxyXG4gICAgY29uc3QgdEluQW5nbGUgPSAodGhpcy50aGV0YSArIHQgKiB0aGlzLmRlbHRhKSAvIDE4MCAqIE1hdGguUElcclxuICAgIGNvbnN0IHNpbs64ID0gTWF0aC5zaW4odEluQW5nbGUpXHJcbiAgICBjb25zdCBjb3POuCA9IE1hdGguY29zKHRJbkFuZ2xlKVxyXG5cclxuICAgIHJldHVybiBuZXcgUG9pbnQoXHJcbiAgICAgIHRoaXMuY29zz4YgKiB0aGlzLnJ4ICogY29zzrggLSB0aGlzLnNpbs+GICogdGhpcy5yeSAqIHNpbs64ICsgdGhpcy5jLngsXHJcbiAgICAgIHRoaXMuc2luz4YgKiB0aGlzLnJ5ICogY29zzrggKyB0aGlzLmNvc8+GICogdGhpcy5yeCAqIHNpbs64ICsgdGhpcy5jLnlcclxuICAgIClcclxuICB9XHJcblxyXG4gIHNwbGl0QXQgKHQpIHtcclxuICAgIGNvbnN0IGFic0RlbHRhID0gTWF0aC5hYnModGhpcy5kZWx0YSlcclxuICAgIGNvbnN0IGRlbHRhMSA9IGFic0RlbHRhICogdFxyXG4gICAgY29uc3QgZGVsdGEyID0gYWJzRGVsdGEgKiAoMSAtIHQpXHJcblxyXG4gICAgY29uc3QgcG9pbnRBdFQgPSB0aGlzLnBvaW50QXQodClcclxuXHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBuZXcgQXJjKHRoaXMucDEsIHBvaW50QXRULCB0aGlzLnJ4LCB0aGlzLnJ5LCB0aGlzLnBoaSwgZGVsdGExID4gMTgwLCB0aGlzLnN3ZWVwKSxcclxuICAgICAgbmV3IEFyYyhwb2ludEF0VCwgdGhpcy5wMiwgdGhpcy5yeCwgdGhpcy5yeSwgdGhpcy5waGksIGRlbHRhMiA+IDE4MCwgdGhpcy5zd2VlcClcclxuICAgIF1cclxuICB9XHJcblxyXG4gIHRvUGF0aCAoKSB7XHJcbiAgICByZXR1cm4gWyAnTScsIHRoaXMucDEueCwgdGhpcy5wMS55LCAnQScsIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCB0aGlzLmFyYywgdGhpcy5zd2VlcCwgdGhpcy5wMi54LCB0aGlzLnAyLnkgXS5qb2luKCcgJylcclxuICB9XHJcblxyXG4gIHRvUGF0aEZyYWdtZW50ICgpIHtcclxuICAgIHJldHVybiBbICdBJywgdGhpcy5yeCwgdGhpcy5yeSwgdGhpcy5waGksIHRoaXMuYXJjLCB0aGlzLnN3ZWVwLCB0aGlzLnAyLngsIHRoaXMucDIueSBdXHJcbiAgfVxyXG5cclxuICB0b1N0cmluZyAoKSB7XHJcbiAgICByZXR1cm4gYHAxOiAke3RoaXMucDEueC50b0ZpeGVkKDQpfSAke3RoaXMucDEueS50b0ZpeGVkKDQpfSwgcDI6ICR7dGhpcy5wMi54LnRvRml4ZWQoNCl9ICR7dGhpcy5wMi55LnRvRml4ZWQoNCl9LCBjOiAke3RoaXMuYy54LnRvRml4ZWQoNCl9ICR7dGhpcy5jLnkudG9GaXhlZCg0KX0gdGhldGE6ICR7dGhpcy50aGV0YS50b0ZpeGVkKDQpfSwgdGhldGEyOiAke3RoaXMudGhldGEyLnRvRml4ZWQoNCl9LCBkZWx0YTogJHt0aGlzLmRlbHRhLnRvRml4ZWQoNCl9LCBsYXJnZTogJHt0aGlzLmFyY30sIHN3ZWVwOiAke3RoaXMuc3dlZXB9YFxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtIChtYXRyaXgpIHtcclxuICAgIHJldHVybiBuZXcgQXJjKHRoaXMucDEudHJhbnNmb3JtKG1hdHJpeCksIHRoaXMucDIudHJhbnNmb3JtKG1hdHJpeCksIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCB0aGlzLmFyYywgdGhpcy5zd2VlcClcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEN1YmljIHtcclxuICBjb25zdHJ1Y3RvciAocDEsIGMxLCBjMiwgcDIpIHtcclxuICAgIGlmIChwMSBpbnN0YW5jZW9mIFBvaW50KSB7XHJcbiAgICAgIHRoaXMucDEgPSBuZXcgUG9pbnQocDEpXHJcbiAgICAgIHRoaXMuYzEgPSBuZXcgUG9pbnQoYzEpXHJcbiAgICAgIHRoaXMuYzIgPSBuZXcgUG9pbnQoYzIpXHJcbiAgICAgIHRoaXMucDIgPSBuZXcgUG9pbnQocDIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnAxID0gbmV3IFBvaW50KHAxLnAxKVxyXG4gICAgICB0aGlzLmMxID0gbmV3IFBvaW50KHAxLmMxKVxyXG4gICAgICB0aGlzLmMyID0gbmV3IFBvaW50KHAxLmMyKVxyXG4gICAgICB0aGlzLnAyID0gbmV3IFBvaW50KHAxLnAyKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21RdWFkIChwMSwgYywgcDIpIHtcclxuICAgIGNvbnN0IGMxID0gcDEubXVsKDEgLyAzKS5hZGQoYy5tdWwoMiAvIDMpKVxyXG4gICAgY29uc3QgYzIgPSBjLm11bCgyIC8gMykuYWRkKHAyLm11bCgxIC8gMykpXHJcbiAgICByZXR1cm4gbmV3IEN1YmljKHAxLCBjMSwgYzIsIHAyKVxyXG4gIH1cclxuXHJcbiAgYmJveCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRDbG91ZCgpLmJib3goKVxyXG4gIH1cclxuXHJcbiAgZmluZFJvb3RzICgpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRSb290c1goKS5jb25jYXQodGhpcy5maW5kUm9vdHNZKCkpXHJcbiAgfVxyXG5cclxuICBmaW5kUm9vdHNYICgpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRSb290c1hZKHRoaXMucDEueCwgdGhpcy5jMS54LCB0aGlzLmMyLngsIHRoaXMucDIueClcclxuICB9XHJcblxyXG4gIGZpbmRSb290c1hZIChwMSwgcDIsIHAzLCBwNCkge1xyXG4gICAgY29uc3QgYSA9IDMgKiAoLXAxICsgMyAqIHAyIC0gMyAqIHAzICsgcDQpXHJcbiAgICBjb25zdCBiID0gNiAqIChwMSAtIDIgKiBwMiArIHAzKVxyXG4gICAgY29uc3QgYyA9IDMgKiAocDIgLSBwMSlcclxuXHJcbiAgICBpZiAoYSA9PT0gMCkgcmV0dXJuIFsgLWMgLyBiIF0uZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwgPiAwICYmIGVsIDwgMSB9KVxyXG5cclxuICAgIGlmIChiICogYiAtIDQgKiBhICogYyA8IDApIHJldHVybiBbXVxyXG4gICAgaWYgKGIgKiBiIC0gNCAqIGEgKiBjID09PSAwKSByZXR1cm4gWyBNYXRoLnJvdW5kKCgtYiAvICgyICogYSkpICogMTAwMDAwKSAvIDEwMDAwMCBdLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsID4gMCAmJiBlbCA8IDEgfSlcclxuXHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBNYXRoLnJvdW5kKCgtYiArIE1hdGguc3FydChiICogYiAtIDQgKiBhICogYykpIC8gKDIgKiBhKSAqIDEwMDAwMCkgLyAxMDAwMDAsXHJcbiAgICAgIE1hdGgucm91bmQoKC1iIC0gTWF0aC5zcXJ0KGIgKiBiIC0gNCAqIGEgKiBjKSkgLyAoMiAqIGEpICogMTAwMDAwKSAvIDEwMDAwMFxyXG4gICAgXS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbCA+IDAgJiYgZWwgPCAxIH0pXHJcbiAgfVxyXG5cclxuICBmaW5kUm9vdHNZICgpIHtcclxuICAgIHJldHVybiB0aGlzLmZpbmRSb290c1hZKHRoaXMucDEueSwgdGhpcy5jMS55LCB0aGlzLmMyLnksIHRoaXMucDIueSlcclxuICB9XHJcblxyXG4gIGZsYXRuZXNzICgpIHtcclxuICAgIGxldCB1eCA9IE1hdGgucG93KDMgKiB0aGlzLmMxLnggLSAyICogdGhpcy5wMS54IC0gdGhpcy5wMi54LCAyKVxyXG4gICAgbGV0IHV5ID0gTWF0aC5wb3coMyAqIHRoaXMuYzEueSAtIDIgKiB0aGlzLnAxLnkgLSB0aGlzLnAyLnksIDIpXHJcbiAgICBjb25zdCB2eCA9IE1hdGgucG93KDMgKiB0aGlzLmMyLnggLSAyICogdGhpcy5wMi54IC0gdGhpcy5wMS54LCAyKVxyXG4gICAgY29uc3QgdnkgPSBNYXRoLnBvdygzICogdGhpcy5jMi55IC0gMiAqIHRoaXMucDIueSAtIHRoaXMucDEueSwgMilcclxuXHJcbiAgICBpZiAodXggPCB2eCkgeyB1eCA9IHZ4IH1cclxuICAgIGlmICh1eSA8IHZ5KSB7IHV5ID0gdnkgfVxyXG5cclxuICAgIHJldHVybiB1eCArIHV5XHJcbiAgfVxyXG5cclxuICBnZXRDbG91ZCAoKSB7XHJcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLmZpbmRSb290cygpXHJcbiAgICAgIC5maWx0ZXIocm9vdCA9PiByb290ICE9PSAwICYmIHJvb3QgIT09IDEpXHJcbiAgICAgIC5tYXAocm9vdCA9PiB0aGlzLnBvaW50QXQocm9vdCkpXHJcbiAgICAgIC5jb25jYXQodGhpcy5wMSwgdGhpcy5wMilcclxuXHJcbiAgICByZXR1cm4gbmV3IFBvaW50Q2xvdWQocG9pbnRzKVxyXG4gIH1cclxuXHJcbiAgbGVuZ3RoICgpIHtcclxuICAgIHJldHVybiB0aGlzLmxlbmd0aEF0KClcclxuICB9XHJcblxyXG4gIGxlbmd0aEF0ICh0ID0gMSkge1xyXG4gICAgY29uc3QgY3VydmVzID0gdGhpcy5zcGxpdEF0KHQpWzBdLm1ha2VGbGF0KHQpXHJcblxyXG4gICAgbGV0IGxlbmd0aCA9IDBcclxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjdXJ2ZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgbGVuZ3RoICs9IGN1cnZlc1tpXS5wMi5zdWIoY3VydmVzW2ldLnAxKS5hYnMoKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsZW5ndGhcclxuICB9XHJcblxyXG4gIG1ha2VGbGF0ICh0KSB7XHJcbiAgICBpZiAodGhpcy5mbGF0bmVzcygpID4gMC4xNSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zcGxpdEF0KDAuNSlcclxuICAgICAgICAubWFwKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwubWFrZUZsYXQodCAqIDAuNSkgfSlcclxuICAgICAgICAucmVkdWNlKGZ1bmN0aW9uIChsYXN0LCBjdXJyZW50KSB7IHJldHVybiBsYXN0LmNvbmNhdChjdXJyZW50KSB9LCBbXSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudF92YWx1ZSA9IHRcclxuICAgICAgcmV0dXJuIFsgdGhpcyBdXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwb2ludEF0ICh0KSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KFxyXG4gICAgICAoMSAtIHQpICogKDEgLSB0KSAqICgxIC0gdCkgKiB0aGlzLnAxLnggKyAzICogKDEgLSB0KSAqICgxIC0gdCkgKiB0ICogdGhpcy5jMS54ICsgMyAqICgxIC0gdCkgKiB0ICogdCAqIHRoaXMuYzIueCArIHQgKiB0ICogdCAqIHRoaXMucDIueCxcclxuICAgICAgKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpICogdGhpcy5wMS55ICsgMyAqICgxIC0gdCkgKiAoMSAtIHQpICogdCAqIHRoaXMuYzEueSArIDMgKiAoMSAtIHQpICogdCAqIHQgKiB0aGlzLmMyLnkgKyB0ICogdCAqIHQgKiB0aGlzLnAyLnlcclxuICAgIClcclxuICB9XHJcblxyXG4gIHNwbGl0QXQgKHopIHtcclxuICAgIGNvbnN0IHggPSB0aGlzLnNwbGl0QXRTY2FsYXIoeiwgJ3gnKVxyXG4gICAgY29uc3QgeSA9IHRoaXMuc3BsaXRBdFNjYWxhcih6LCAneScpXHJcblxyXG4gICAgY29uc3QgYSA9IG5ldyBDdWJpYyhcclxuICAgICAgbmV3IFBvaW50KHhbMF1bMF0sIHlbMF1bMF0pLFxyXG4gICAgICBuZXcgUG9pbnQoeFswXVsxXSwgeVswXVsxXSksXHJcbiAgICAgIG5ldyBQb2ludCh4WzBdWzJdLCB5WzBdWzJdKSxcclxuICAgICAgbmV3IFBvaW50KHhbMF1bM10sIHlbMF1bM10pXHJcbiAgICApXHJcblxyXG4gICAgY29uc3QgYiA9IG5ldyBDdWJpYyhcclxuICAgICAgbmV3IFBvaW50KHhbMV1bMF0sIHlbMV1bMF0pLFxyXG4gICAgICBuZXcgUG9pbnQoeFsxXVsxXSwgeVsxXVsxXSksXHJcbiAgICAgIG5ldyBQb2ludCh4WzFdWzJdLCB5WzFdWzJdKSxcclxuICAgICAgbmV3IFBvaW50KHhbMV1bM10sIHlbMV1bM10pXHJcbiAgICApXHJcblxyXG4gICAgcmV0dXJuIFsgYSwgYiBdXHJcbiAgfVxyXG5cclxuICBzcGxpdEF0U2NhbGFyICh6LCBwKSB7XHJcbiAgICBjb25zdCBwMSA9IHRoaXMucDFbcF1cclxuICAgIGNvbnN0IHAyID0gdGhpcy5jMVtwXVxyXG4gICAgY29uc3QgcDMgPSB0aGlzLmMyW3BdXHJcbiAgICBjb25zdCBwNCA9IHRoaXMucDJbcF1cclxuXHJcbiAgICBjb25zdCB0ID0geiAqIHogKiB6ICogcDQgLSAzICogeiAqIHogKiAoeiAtIDEpICogcDMgKyAzICogeiAqICh6IC0gMSkgKiAoeiAtIDEpICogcDIgLSAoeiAtIDEpICogKHogLSAxKSAqICh6IC0gMSkgKiBwMVxyXG5cclxuICAgIHJldHVybiBbXHJcbiAgICAgIFtcclxuICAgICAgICBwMSxcclxuICAgICAgICB6ICogcDIgLSAoeiAtIDEpICogcDEsXHJcbiAgICAgICAgeiAqIHogKiBwMyAtIDIgKiB6ICogKHogLSAxKSAqIHAyICsgKHogLSAxKSAqICh6IC0gMSkgKiBwMSxcclxuICAgICAgICB0XHJcbiAgICAgIF0sXHJcbiAgICAgIFtcclxuICAgICAgICB0LFxyXG4gICAgICAgIHogKiB6ICogcDQgLSAyICogeiAqICh6IC0gMSkgKiBwMyArICh6IC0gMSkgKiAoeiAtIDEpICogcDIsXHJcbiAgICAgICAgeiAqIHA0IC0gKHogLSAxKSAqIHAzLFxyXG4gICAgICAgIHA0XHJcbiAgICAgIF1cclxuICAgIF1cclxuICB9XHJcblxyXG4gIHRvUGF0aCAoKSB7XHJcbiAgICByZXR1cm4gWyAnTScsIHRoaXMucDEueCwgdGhpcy5wMS55IF0uY29uY2F0KHRoaXMudG9QYXRoRnJhZ21lbnQoKSkuam9pbignICcpXHJcbiAgfVxyXG5cclxuICB0b1BhdGhGcmFnbWVudCAoKSB7XHJcbiAgICByZXR1cm4gWyAnQycsIHRoaXMuYzEueCwgdGhpcy5jMS55LCB0aGlzLmMyLngsIHRoaXMuYzIueSwgdGhpcy5wMi54LCB0aGlzLnAyLnkgXVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtIChtYXRyaXgpIHtcclxuICAgIHRoaXMucDEudHJhbnNmb3JtTyhtYXRyaXgpXHJcbiAgICB0aGlzLmMxLnRyYW5zZm9ybU8obWF0cml4KVxyXG4gICAgdGhpcy5jMi50cmFuc2Zvcm1PKG1hdHJpeClcclxuICAgIHRoaXMucDIudHJhbnNmb3JtTyhtYXRyaXgpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgTGluZSB7XHJcbiAgY29uc3RydWN0b3IgKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICBpZiAoeDEgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgdGhpcy5wMSA9IG5ldyBQb2ludCh4MSlcclxuICAgICAgdGhpcy5wMiA9IG5ldyBQb2ludCh5MSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucDEgPSBuZXcgUG9pbnQoeDEsIHkxKVxyXG4gICAgICB0aGlzLnAyID0gbmV3IFBvaW50KHgyLCB5MilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGJib3ggKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2xvdWQoKS5iYm94KClcclxuICB9XHJcblxyXG4gIGdldENsb3VkICgpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnRDbG91ZChbIHRoaXMucDEsIHRoaXMucDIgXSlcclxuICB9XHJcblxyXG4gIGxlbmd0aCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wMi5zdWIodGhpcy5wMSkuYWJzKClcclxuICB9XHJcblxyXG4gIHBvaW50QXQgKHQpIHtcclxuICAgIGNvbnN0IHZlYyA9IHRoaXMucDIuc3ViKHRoaXMucDEpLm11bCh0KVxyXG4gICAgcmV0dXJuIHRoaXMucDEuYWRkKHZlYylcclxuICB9XHJcblxyXG4gIHRvUGF0aCAoKSB7XHJcbiAgICByZXR1cm4gWyAnTScsIHRoaXMucDEueCwgdGhpcy5wMS55LCB0aGlzLnAyLngsIHRoaXMucDIueSBdLmpvaW4oJyAnKVxyXG4gIH1cclxuXHJcbiAgdG9QYXRoRnJhZ21lbnQgKCkge1xyXG4gICAgcmV0dXJuIFsgJ0wnLCB0aGlzLnAyLngsIHRoaXMucDIueSBdXHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm0gKG1hdHJpeCkge1xyXG4gICAgdGhpcy5wMS50cmFuc2Zvcm1PKG1hdHJpeClcclxuICAgIHRoaXMucDIudHJhbnNmb3JtTyhtYXRyaXgpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHBhdGhCQm94ID0gZnVuY3Rpb24gKGQpIHtcclxuICByZXR1cm4gcGF0aFBhcnNlcihkKS5yZWR1Y2UoKGwsIGMpID0+IGwubWVyZ2UoYy5iYm94KCkpLCBuZXcgTm9Cb3goKSlcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhdGhTZWdtZW50QXJyYXkgZXh0ZW5kcyBBcnJheSB7XHJcbiAgYmJveCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWR1Y2UoKGwsIGMpID0+IGwubWVyZ2UoYy5iYm94KCkpLCBuZXcgTm9Cb3goKSlcclxuICB9XHJcblxyXG4gIGNsb3VkICgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZHVjZShcclxuICAgICAgKGNsb3VkLCBzZWdtZW50KSA9PiBzZWdtZW50LmdldENsb3VkKCkubWVyZ2UoY2xvdWQpLFxyXG4gICAgICBuZXcgUG9pbnRDbG91ZCgpXHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBtZXJnZSAob3RoZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbmNhdChvdGhlcilcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSAobWF0cml4KSB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXAoc2VnbWVudCA9PiBzZWdtZW50LnRyYW5zZm9ybShtYXRyaXgpKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFBhdGhTZWdtZW50cyA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgcmV0dXJuIG5ldyBQYXRoU2VnbWVudEFycmF5KC4uLnBhdGhQYXJzZXIoZCkpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwb2ludEF0TGVuZ3RoID0gZnVuY3Rpb24gKGQsIGxlbikge1xyXG4gIGNvbnN0IHNlZ3MgPSBwYXRoUGFyc2VyKGQpXHJcblxyXG4gIGNvbnN0IHNlZ0xlbmd0aHMgPSBzZWdzLm1hcChlbCA9PiBlbC5sZW5ndGgoKSlcclxuXHJcbiAgY29uc3QgbGVuZ3RoID0gc2VnTGVuZ3Rocy5yZWR1Y2UoKGwsIGMpID0+IGwgKyBjLCAwKVxyXG5cclxuICBsZXQgaSA9IDBcclxuXHJcbiAgbGV0IHQgPSBsZW4gLyBsZW5ndGhcclxuXHJcbiAgLy8gRklYTUU6IFBvcCBNb3ZlIGJlZm9yZSB1c2luZyBzaG9ydGN1dD9cclxuICAvLyBzaG9ydGN1dCBmb3IgdHJpdmlhbCBjYXNlc1xyXG4gIGlmICh0ID49IDEpIHtcclxuICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgcDIuIElmIG5vdCwgdXNlIHAxXHJcbiAgICBpZiAoc2Vnc1tzZWdzLmxlbmd0aCAtIDFdLnAyKSB7XHJcbiAgICAgIHJldHVybiBzZWdzW3NlZ3MubGVuZ3RoIC0gMV0ucDIubmF0aXZlKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBzZWdzW3NlZ3MubGVuZ3RoIC0gMV0ucDEubmF0aXZlKClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICh0IDw9IDApIHJldHVybiBzZWdzWzBdLnAxLm5hdGl2ZSgpXHJcblxyXG4gIC8vIHJlbW92ZSBtb3ZlIGNvbW1hbmRzIGF0IHRoZSB2ZXJ5IGVuZCBvZiB0aGUgcGF0aFxyXG4gIHdoaWxlIChzZWdzW3NlZ3MubGVuZ3RoIC0gMV0gaW5zdGFuY2VvZiBNb3ZlKSBzZWdzLnBvcCgpXHJcblxyXG4gIGxldCBzZWdFbmQgPSAwXHJcblxyXG4gIGZvciAoY29uc3QgaWwgPSBzZWdMZW5ndGhzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcclxuICAgIGNvbnN0IGsgPSBzZWdMZW5ndGhzW2ldIC8gbGVuZ3RoXHJcbiAgICBzZWdFbmQgKz0ga1xyXG5cclxuICAgIGlmIChzZWdFbmQgPiB0KSB7XHJcbiAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCByYXRpbyA9IGxlbmd0aCAvIHNlZ0xlbmd0aHNbaV1cclxuICB0ID0gcmF0aW8gKiAodCAtIHNlZ0VuZCkgKyAxXHJcblxyXG4gIHJldHVybiBzZWdzW2ldLnBvaW50QXQodCkubmF0aXZlKClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGxlbmd0aCA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgcmV0dXJuIHBhdGhQYXJzZXIoZClcclxuICAgIC5yZWR1Y2UoKGwsIGMpID0+IGwgKyBjLmxlbmd0aCgpLCAwKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZGVidWcgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gIGNvbnN0IHBhcnNlID0gcGF0aFBhcnNlcihub2RlLmdldEF0dHJpYnV0ZSgnZCcpKVxyXG5cclxuICBjb25zdCByZXQgPSB7XHJcbiAgICBwYXRoczogcGFyc2UubWFwKGVsID0+IGVsLnRvUGF0aCgpKSxcclxuICAgIGZyYWdtZW50czogcGFyc2UubWFwKGVsID0+IGVsLnRvUGF0aEZyYWdtZW50KCkuam9pbignICcpKSxcclxuICAgIGJib3hzOiBwYXJzZS5tYXAoZWwgPT4ge1xyXG4gICAgICBjb25zdCBib3ggPSBlbC5iYm94KClcclxuICAgICAgcmV0dXJuIFsgYm94LngsIGJveC55LCBib3gud2lkdGgsIGJveC5oZWlnaHQgXVxyXG4gICAgfSksXHJcbiAgICBiYm94OiBwYXJzZS5yZWR1Y2UoKGwsIGMpID0+IGwubWVyZ2UoYy5iYm94KCkpLCBuZXcgTm9Cb3goKSksXHJcbiAgICBiYm94c1RyYW5zZm9ybWVkOiBwYXJzZS5tYXAoZWwgPT4ge1xyXG4gICAgICByZXR1cm4gZWwuZ2V0Q2xvdWQoKS50cmFuc2Zvcm0obm9kZS5tYXRyaXhpZnkoKSkuYmJveCgpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHJldCwge1xyXG4gICAgYmJveFRyYW5zZm9ybWVkOiByZXQuYmJveHNUcmFuc2Zvcm1lZC5yZWR1Y2UoKGwsIGMpID0+IGwubWVyZ2UoYyksIG5ldyBOb0JveCgpKVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDbG91ZCA9IChkKSA9PiB7XHJcbiAgcmV0dXJuIHBhdGhQYXJzZXIoZCkucmVkdWNlKChjbG91ZCwgc2VnbWVudCkgPT5cclxuICAgIHNlZ21lbnQuZ2V0Q2xvdWQoKS5tZXJnZShjbG91ZCksIG5ldyBQb2ludENsb3VkKClcclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwYXRoRnJvbSA9IHtcclxuICBib3ggKHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9KSB7XHJcbiAgICByZXR1cm4gYE0gJHt4fSAke3l9IGggJHt3aWR0aH0gdiAke2hlaWdodH0gSCAke3h9IFYgJHt5fWBcclxuICB9LFxyXG4gIHJlY3QgKG5vZGUpIHtcclxuICAgIGNvbnN0IHdpZHRoID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSkgfHwgMFxyXG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpIHx8IDBcclxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd4JykpIHx8IDBcclxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd5JykpIHx8IDBcclxuICAgIHJldHVybiBgTSAke3h9ICR7eX0gaCAke3dpZHRofSB2ICR7aGVpZ2h0fSBIICR7eH0gViAke3l9YFxyXG4gIH0sXHJcbiAgY2lyY2xlIChub2RlKSB7XHJcbiAgICBjb25zdCByID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgncicpKSB8fCAwXHJcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnY3gnKSkgfHwgMFxyXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ2N5JykpIHx8IDBcclxuXHJcbiAgICBpZiAociA9PT0gMCkgcmV0dXJuICdNMCAwJ1xyXG5cclxuICAgIHJldHVybiBgTSAke3ggLSByfSAke3l9IEEgJHtyfSAke3J9IDAgMCAwICR7eCArIHJ9ICR7eX0gQSAke3J9ICR7cn0gMCAwIDAgJHt4IC0gcn0gJHt5fWBcclxuICB9LFxyXG4gIGVsbGlwc2UgKG5vZGUpIHtcclxuICAgIGNvbnN0IHJ4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgncngnKSkgfHwgMFxyXG4gICAgY29uc3QgcnkgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCdyeScpKSB8fCAwXHJcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnY3gnKSkgfHwgMFxyXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ2N5JykpIHx8IDBcclxuXHJcbiAgICByZXR1cm4gYE0gJHt4IC0gcnh9ICR7eX0gQSAke3J4fSAke3J5fSAwIDAgMCAke3ggKyByeH0gJHt5fSBBICR7cnh9ICR7cnl9IDAgMCAwICR7eCAtIHJ4fSAke3l9YFxyXG4gIH0sXHJcbiAgbGluZSAobm9kZSkge1xyXG4gICAgY29uc3QgeDEgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd4MScpKSB8fCAwXHJcbiAgICBjb25zdCB4MiA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3gyJykpIHx8IDBcclxuICAgIGNvbnN0IHkxID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneTEnKSkgfHwgMFxyXG4gICAgY29uc3QgeTIgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd5MicpKSB8fCAwXHJcblxyXG4gICAgcmV0dXJuIGBNICR7eDF9ICR7eTF9IEwgJHt4Mn0gJHt5Mn1gXHJcbiAgfSxcclxuICBwb2x5Z29uIChub2RlKSB7XHJcbiAgICByZXR1cm4gYE0gJHtub2RlLmdldEF0dHJpYnV0ZSgncG9pbnRzJyl9IHpgXHJcbiAgfSxcclxuICBwb2x5bGluZSAobm9kZSkge1xyXG4gICAgcmV0dXJuIGBNICR7bm9kZS5nZXRBdHRyaWJ1dGUoJ3BvaW50cycpfWBcclxuICB9XHJcbn1cclxuIiwiLy8gc3BsaXRzIGEgdHJhbnNmb3JtYXRpb24gY2hhaW5cclxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybXMgPSAvXFwpXFxzKiw/XFxzKi9cclxuXHJcbi8vIHNwbGl0IGF0IHdoaXRlc3BhY2UgYW5kIGNvbW1hXHJcbmV4cG9ydCBjb25zdCBkZWxpbWl0ZXIgPSAvW1xccyxdKy9cclxuXHJcbi8vIFRoZSBmb2xsb3dpbmcgcmVnZXggYXJlIHVzZWQgdG8gcGFyc2UgdGhlIGQgYXR0cmlidXRlIG9mIGEgcGF0aFxyXG5cclxuLy8gTWF0Y2hlcyBhbGwgaHlwaGVucyB3aGljaCBhcmUgbm90IGFmdGVyIGFuIGV4cG9uZW50XHJcbmV4cG9ydCBjb25zdCBoeXBoZW4gPSAvKFteZV0pLS9naVxyXG5cclxuLy8gUmVwbGFjZXMgYW5kIHRlc3RzIGZvciBhbGwgcGF0aCBsZXR0ZXJzXHJcbmV4cG9ydCBjb25zdCBwYXRoTGV0dGVycyA9IC9bTUxIVkNTUVRBWl0vZ2lcclxuXHJcbi8vIHllcyB3ZSBuZWVkIHRoaXMgb25lLCB0b29cclxuZXhwb3J0IGNvbnN0IGlzUGF0aExldHRlciA9IC9bTUxIVkNTUVRBWl0vaVxyXG5cclxuLy8gbWF0Y2hlcyAwLjE1NC4yMy40NVxyXG5leHBvcnQgY29uc3QgbnVtYmVyc1dpdGhEb3RzID0gLygoXFxkP1xcLlxcZCsoPzplWystXT9cXGQrKT8pKCg/OlxcLlxcZCsoPzplWystXT9cXGQrKT8pKykpKy9naVxyXG5cclxuLy8gbWF0Y2hlcyAuXHJcbmV4cG9ydCBjb25zdCBkb3RzID0gL1xcLi9nXHJcbiIsIi8vIEVuc3VyZSB0byBzaXgtYmFzZWQgaGV4XHJcbmV4cG9ydCBjb25zdCBmdWxsSGV4ID0gZnVuY3Rpb24gKGhleCkge1xyXG4gIHJldHVybiBoZXgubGVuZ3RoID09PSA0XHJcbiAgICA/IFsgJyMnLFxyXG4gICAgICBoZXguc3Vic3RyaW5nKDEsIDIpLCBoZXguc3Vic3RyaW5nKDEsIDIpLFxyXG4gICAgICBoZXguc3Vic3RyaW5nKDIsIDMpLCBoZXguc3Vic3RyaW5nKDIsIDMpLFxyXG4gICAgICBoZXguc3Vic3RyaW5nKDMsIDQpLCBoZXguc3Vic3RyaW5nKDMsIDQpXHJcbiAgICBdLmpvaW4oJycpIDogaGV4XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBoZXhUb1JHQiA9IGZ1bmN0aW9uICh2YWxPck1hcCkge1xyXG4gIGlmICh0eXBlb2YgdmFsT3JNYXAgaW5zdGFuY2VvZiBNYXApIHtcclxuICAgIGZvciAoY29uc3QgWyBrZXksIHZhbCBdIG9mIHZhbE9yTWFwKSB7XHJcbiAgICAgIHZhbE9yTWFwLnNldChrZXksIGhleFRvUkdCKHZhbCkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsT3JNYXBcclxuICB9XHJcblxyXG4gIGlmICghLyNbMC05YS1mXXszLDZ9Ly50ZXN0KHZhbE9yTWFwKSkgeyByZXR1cm4gdmFsT3JNYXAgfVxyXG5cclxuICB2YWxPck1hcCA9IGZ1bGxIZXgodmFsT3JNYXApXHJcblxyXG4gIHJldHVybiAncmdiKCcgKyBbXHJcbiAgICBwYXJzZUludCh2YWxPck1hcC5zbGljZSgxLCAzKSwgMTYpLFxyXG4gICAgcGFyc2VJbnQodmFsT3JNYXAuc2xpY2UoMywgNSksIDE2KSxcclxuICAgIHBhcnNlSW50KHZhbE9yTWFwLnNsaWNlKDUsIDcpLCAxNilcclxuICBdLmpvaW4oJywnKSArICcpJ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVjYW1lbGl6ZSAocykge1xyXG4gIHJldHVybiBTdHJpbmcocykucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgZnVuY3Rpb24gKG0sIGcxLCBnMikge1xyXG4gICAgcmV0dXJuIGcxICsgJy0nICsgZzIudG9Mb3dlckNhc2UoKVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW1lbENhc2UgKHMpIHtcclxuICByZXR1cm4gU3RyaW5nKHMpLnJlcGxhY2UoLyhbYS16XSktKFthLXpdKS9nLCBmdW5jdGlvbiAobSwgZzEsIGcyKSB7XHJcbiAgICByZXR1cm4gZzEgKyBnMi50b1VwcGVyQ2FzZSgpXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVF1b3RlcyAoc3RyKSB7XHJcbiAgaWYgKHN0ci5zdGFydHNXaXRoKCdcIicpIHx8IHN0ci5zdGFydHNXaXRoKFwiJ1wiKSkge1xyXG4gICAgcmV0dXJuIHN0ci5zbGljZSgxLCAtMSlcclxuICB9XHJcbiAgcmV0dXJuIHN0clxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaHRtbEVudGl0aWVzIChzdHIpIHtcclxuICByZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdW5odG1sRW50aXRpZXMgKHN0cikge1xyXG4gIHJldHVybiBTdHJpbmcoc3RyKS5yZXBsYWNlKC8mYW1wOy9nLCAnJicpLnJlcGxhY2UoLyZsdDsvZywgJzwnKS5yZXBsYWNlKC8mZ3Q7L2csICc+JykucmVwbGFjZSgnJnF1b3Q7JywgJ1wiJylcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNkYXRhIChzdHIpIHtcclxuICByZXR1cm4gYDwhW0NEQVRBWyR7c3RyfV1dPmBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1lbnQgKHN0cikge1xyXG4gIHJldHVybiBgPCEtLSR7c3RyfS0tPmBcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNwbGl0Tm90SW5CcmFja2V0cyA9IChzdHIsIGRlbGltaXRlcikgPT4ge1xyXG4gIHZhciByb3VuZEJyYWNrZXRzID0gMFxyXG5cclxuICB2YXIgc3F1YXJlQnJhY2tldHMgPSAwXHJcblxyXG4gIHZhciBsYXN0SW5kZXggPSAwXHJcblxyXG4gIHZhciBzcGxpdCA9IFtdXHJcblxyXG4gIHZhciBjaDsgdmFyIGk7IHZhciBpbFxyXG5cclxuICBmb3IgKGkgPSAwLCBpbCA9IHN0ci5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XHJcbiAgICBjaCA9IHN0ci5jaGFyQXQoaSlcclxuXHJcbiAgICBpZiAoY2ggPT09IGRlbGltaXRlciAmJiAhcm91bmRCcmFja2V0cyAmJiAhc3F1YXJlQnJhY2tldHMpIHtcclxuICAgICAgc3BsaXQucHVzaChzdHIuc2xpY2UobGFzdEluZGV4LCBpKS50cmltKCkpXHJcbiAgICAgIGxhc3RJbmRleCA9IGkgKyAxXHJcbiAgICAgIGNvbnRpbnVlXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoID09PSAnKCcpICsrcm91bmRCcmFja2V0c1xyXG4gICAgZWxzZSBpZiAoY2ggPT09ICcpJykgLS1yb3VuZEJyYWNrZXRzXHJcbiAgICBlbHNlIGlmIChjaCA9PT0gJ1snKSArK3NxdWFyZUJyYWNrZXRzXHJcbiAgICBlbHNlIGlmIChjaCA9PT0gJ10nKSAtLXNxdWFyZUJyYWNrZXRzXHJcbiAgfVxyXG5cclxuICBzcGxpdC5wdXNoKHN0ci5zbGljZShsYXN0SW5kZXgpLnRyaW0oKSlcclxuICByZXR1cm4gc3BsaXRcclxufVxyXG4iLCJjb25zdCBodG1sRW50aXRpZXMgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgcmV0dXJuIFN0cmluZyhzdHIpLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcclxufVxyXG5cclxudmFyIGVtcHR5RWxlbWVudHMgPSB7XHJcbiAgYnI6IHRydWUsXHJcbiAgaHI6IHRydWUsXHJcbiAgaW1nOiB0cnVlLFxyXG4gIGxpbms6IHRydWVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHRhZyA9IGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgY29uc3QgYXR0cnMgPSBbIC4uLm5vZGUuYXR0cnMgXS5tYXAoZnVuY3Rpb24gKG5vZGUpIHtcclxuICAgIHJldHVybiAobm9kZS5wcmVmaXggPyBub2RlLnByZWZpeCArICc6JyA6ICcnKSArIG5vZGUubG9jYWxOYW1lICsgJz1cIicgKyBodG1sRW50aXRpZXMobm9kZS52YWx1ZSkgKyAnXCInXHJcbiAgfSlcclxuXHJcbiAgY29uc3QgeyBwcmVmaXgsIGxvY2FsTmFtZSB9ID0gbm9kZVxyXG4gIGNvbnN0IHF1YWxpZmllZE5hbWUgPSAocHJlZml4ID8gcHJlZml4ICsgJzonIDogJycpICsgbG9jYWxOYW1lXHJcblxyXG4gIHJldHVybiAnPCcgKyBbXS5jb25jYXQocXVhbGlmaWVkTmFtZSwgYXR0cnMpLmpvaW4oJyAnKSArICc+JyArIChlbXB0eUVsZW1lbnRzW3F1YWxpZmllZE5hbWUudG9Mb3dlckNhc2UoKV0gPyAnJyA6IG5vZGUuaW5uZXJIVE1MICsgJzwvJyArIHF1YWxpZmllZE5hbWUgKyAnPicpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjbG9uZU5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xyXG5cclxuICBjb25zdCB7IHByZWZpeCwgbG9jYWxOYW1lLCBuYW1lc3BhY2VVUkk6IG5zLCBub2RlVmFsdWUsIG93bmVyRG9jdW1lbnQgfSA9IG5vZGVcclxuXHJcbiAgLy8gQnVpbGQgdXAgdGhlIGNvcnJlY3RseSBjYXNlZCBxdWFsaWZpZWQgbmFtZVxyXG4gIGNvbnN0IHF1YWxpZmllZE5hbWUgPSAocHJlZml4ID8gcHJlZml4ICsgJzonIDogJycpICsgbG9jYWxOYW1lXHJcblxyXG4gIC8vIENoZWNrIGlmIG5vZGUgd2FzIGNyZWF0ZWQgdXNpbmcgbm9uLW5hbWVzcGFjZSBmdW5jdGlvbiB3aGljaCBjYW4gbGVhZCB0byA6IGluIHRoZSBsb2NhbE5hbWUuXHJcbiAgLy8gVGhpcyBjaGVjayBhbGxvd3MgZmFsc2UgbmVnYXRpdmVzIGJlY2F1c2UgYGxvY2FsYCBvbmx5IG1hdHRlcnMgSUYgdGhlcmUgYXJlIDogaW4gdGhlIGxvY2FsTmFtZVxyXG4gIC8vIGFuZCB3ZSBkb250IGNhcmUgYWJvdXQgaXQgd2hlbiB0aGVyZSBhcmUgbm9uXHJcbiAgY29uc3QgbG9jYWwgPSBsb2NhbE5hbWUuaW5jbHVkZXMoJzonKVxyXG5cclxuICB2YXIgY2xvbmUgPSBuZXcgbm9kZS5jb25zdHJ1Y3RvcihxdWFsaWZpZWROYW1lLCB7XHJcbiAgICBhdHRyczogbmV3IFNldChbIC4uLm5vZGUuYXR0cnMgXS5tYXAobm9kZSA9PiBub2RlLmNsb25lTm9kZSgpKSksXHJcbiAgICBub2RlVmFsdWUsXHJcbiAgICBvd25lckRvY3VtZW50LFxyXG4gICAgbG9jYWxcclxuICB9LCBucylcclxuXHJcbiAgcmV0dXJuIGNsb25lXHJcbn1cclxuIiwiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IGZvbnRraXQgZnJvbSAnZm9udGtpdCdcclxuaW1wb3J0ICogYXMgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cy5qcydcclxuaW1wb3J0IHsgQm94LCBOb0JveCB9IGZyb20gJy4uL290aGVyL0JveC5qcydcclxuaW1wb3J0IHsgZ2V0Q29uZmlnLCBnZXRGb250cyB9IGZyb20gJy4uL2NvbmZpZy5qcydcclxuXHJcbmV4cG9ydCBjb25zdCB0ZXh0QkJveCA9IGZ1bmN0aW9uICh0ZXh0LCB4LCB5LCBkZXRhaWxzKSB7XHJcblxyXG4gIGlmICghdGV4dCkgcmV0dXJuIG5ldyBOb0JveCgpXHJcblxyXG4gIGNvbnN0IGNvbmZpZyA9IGdldENvbmZpZygpXHJcbiAgY29uc3QgcHJlbG9hZGVkID0gZ2V0Rm9udHMoKVxyXG5cclxuICB2YXIgZmFtaWxpZXMgPSAoZGV0YWlscy5mb250RmFtaWx5IHx8IGRlZmF1bHRzLmZvbnRGYW1pbHkpLnNwbGl0KC9cXHMqLFxccyovKVxyXG4gIHZhciBmb250TWFwID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMuZm9udEZhbWlseU1hcHBpbmdzLCBjb25maWcuZm9udEZhbWlseU1hcHBpbmdzKVxyXG4gIHZhciBmb250U2l6ZSA9IGRldGFpbHMuZm9udFNpemUgfHwgZGVmYXVsdHMuZm9udFNpemVcclxuICB2YXIgZm9udERpciA9IGNvbmZpZy5mb250RGlyIHx8IGRlZmF1bHRzLmZvbnREaXJcclxuICB2YXIgZm9udEZhbWlseVxyXG4gIHZhciBmb250XHJcblxyXG4gIGZvciAodmFyIGkgPSAwLCBpbCA9IGZhbWlsaWVzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcclxuICAgIGlmIChmb250TWFwW2ZhbWlsaWVzW2ldXSkge1xyXG4gICAgICBmb250RmFtaWx5ID0gZmFtaWxpZXNbaV1cclxuICAgICAgYnJlYWtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICghZm9udEZhbWlseSkge1xyXG4gICAgZm9udEZhbWlseSA9IGRlZmF1bHRzLmZvbnRGYW1pbHlcclxuICB9XHJcblxyXG4gIGlmIChwcmVsb2FkZWRbZm9udEZhbWlseV0pIHtcclxuICAgIGZvbnQgPSBwcmVsb2FkZWRbZm9udEZhbWlseV1cclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmpvaW4oZm9udERpciwgZm9udE1hcFtmb250RmFtaWx5XSlcclxuICAgIHRyeSB7XHJcbiAgICAgIGZvbnQgPSBmb250a2l0Lm9wZW5TeW5jKGZpbGVuYW1lKVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBvcGVuIGZvbnQgXCIke2ZvbnRGYW1pbHl9XCIgaW4gZmlsZSBcIiR7ZmlsZW5hbWV9XCIuICR7ZS50b1N0cmluZygpfWApXHJcbiAgICAgIHJldHVybiBuZXcgTm9Cb3goKVxyXG4gICAgfVxyXG5cclxuICAgIHByZWxvYWRlZFtmb250RmFtaWx5XSA9IGZvbnRcclxuICB9XHJcblxyXG4gIHZhciBmb250SGVpZ2h0ID0gZm9udC5hc2NlbnQgLSBmb250LmRlc2NlbnRcclxuICB2YXIgbGluZUhlaWdodCA9IGZvbnRIZWlnaHQgPiBmb250LnVuaXRzUGVyRW0gPyBmb250SGVpZ2h0IDogZm9udEhlaWdodCArIGZvbnQubGluZUdhcFxyXG5cclxuICB2YXIgaGVpZ2h0ID0gbGluZUhlaWdodCAvIGZvbnQudW5pdHNQZXJFbSAqIGZvbnRTaXplXHJcbiAgdmFyIHdpZHRoID0gZm9udC5sYXlvdXQodGV4dCkuZ2x5cGhzLnJlZHVjZSgobGFzdCwgY3VycikgPT4gbGFzdCArIGN1cnIuYWR2YW5jZVdpZHRoLCAwKSAvIGZvbnQudW5pdHNQZXJFbSAqIGZvbnRTaXplXHJcblxyXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvdGV4dC1hbmNob3JcclxuICB2YXIgeEFkanVzdCA9IDBcclxuICBpZiAoZGV0YWlscy50ZXh0QW5jaG9yID09PSAnZW5kJykge1xyXG4gICAgeEFkanVzdCA9IC13aWR0aFxyXG4gIH0gZWxzZSBpZiAoZGV0YWlscy50ZXh0QW5jaG9yID09PSAnbWlkZGxlJykge1xyXG4gICAgeEFkanVzdCA9IC13aWR0aCAvIDJcclxuICB9XHJcblxyXG4gIC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi8yMDAyL1dELWNzczMtbGluZWJveC0yMDAyMDUxNS9cclxuICAvLyA0LjIuIEJhc2VsaW5lIGlkZW50aWZpZXJzXHJcbiAgdmFyIHlBZGp1c3QgPSBmb250LmFzY2VudCAvLyBhbHBoYWJldGljXHJcbiAgaWYgKGRldGFpbHMuZG9taW5hbnRCYXNlbGluZSA9PT0gJ2JlZm9yZS1lZGdlJyB8fCBkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICd0ZXh0LWJlZm9yZS1lZGdlJykge1xyXG4gICAgeUFkanVzdCA9IDBcclxuICB9IGVsc2UgaWYgKGRldGFpbHMuZG9taW5hbnRCYXNlbGluZSA9PT0gJ2hhbmdpbmcnKSB7XHJcbiAgICB5QWRqdXN0ID0gZm9udC5hc2NlbnQgLSBmb250LnhIZWlnaHQgLSBmb250LmNhcEhlaWdodFxyXG4gIH0gZWxzZSBpZiAoZGV0YWlscy5kb21pbmFudEJhc2VsaW5lID09PSAnbWF0aGVtYXRpY2FsJykge1xyXG4gICAgeUFkanVzdCA9IGZvbnQuYXNjZW50IC0gZm9udC54SGVpZ2h0XHJcbiAgfSBlbHNlIGlmIChkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICdtaWRkbGUnKSB7XHJcbiAgICB5QWRqdXN0ID0gZm9udC5hc2NlbnQgLSBmb250LnhIZWlnaHQgLyAyXHJcbiAgfSBlbHNlIGlmIChkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICdjZW50cmFsJykge1xyXG4gICAgeUFkanVzdCA9IGZvbnQuYXNjZW50IC8gMiArIGZvbnQuZGVzY2VudCAvIDJcclxuICB9IGVsc2UgaWYgKGRldGFpbHMuZG9taW5hbnRCYXNlbGluZSA9PT0gJ2lkZW9ncmFwaGljJykge1xyXG4gICAgeUFkanVzdCA9IGZvbnQuYXNjZW50ICsgZm9udC5kZXNjZW50XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbmV3IEJveCh4ICsgeEFkanVzdCwgeSAtIHlBZGp1c3QgLyBmb250LnVuaXRzUGVyRW0gKiBmb250U2l6ZSwgd2lkdGgsIGhlaWdodClcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGRlZmF1bHRzIGZyb20gJy4vc3JjL3V0aWxzL2RlZmF1bHRzLmpzJ1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0F0dHIuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9DaGFyYWN0ZXJEYXRhLmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vQ29tbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0N1c3RvbUV2ZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vRG9jdW1lbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9Eb2N1bWVudEZyYWdtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vRWxlbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0V2ZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vRXZlbnRUYXJnZXQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9Ob2RlLmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vTm9kZUZpbHRlci5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL1RleHQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9XaW5kb3cuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9odG1sL0hUTUxFbGVtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vaHRtbC9IVE1MSW1hZ2VFbGVtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vaHRtbC9IVE1MTGlua0VsZW1lbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9odG1sL0hUTUxQYXJzZXIuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vbWl4aW5zL2VsZW1lbnRBY2Nlc3MuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9taXhpbnMvUGFyZW50Tm9kZS5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdFbGVtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vc3ZnL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdNYXRyaXguanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHUGF0aEVsZW1lbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHUG9pbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHU1ZHRWxlbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdUZXh0Q29udGVudEVsZW1lbnQuanMnXHJcblxyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb25maWcuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2ZhY3Rvcmllcy5qcydcclxuZXhwb3J0IHsgZGVmYXVsdHMgfVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=