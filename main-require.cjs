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
    const refNode = node.getRootNode().getElementById(ref.slice(1))
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxRQUFRO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDZEQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0RBQWU7QUFDNUMsZ0NBQWdDLHNEQUFlO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsZ0VBQVk7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGdFQUFZO0FBQ3RCO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHNEQUFJO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELHNEQUFlO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdD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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05tRDtBQUNuRDtBQUNpQztBQUNTO0FBQ047QUFDSTtBQUNIO0FBQ1E7QUFDVDtBQUNGO0FBQ007QUFDUDtBQUNNO0FBQ047QUFDRTtBQUNVO0FBQ0s7QUFDRDtBQUNMO0FBQ087QUFDRjtBQUNIO0FBQ0g7QUFDUTtBQUNUO0FBQ0s7QUFDTjtBQUNLO0FBQ1E7QUFDdEQ7QUFDK0I7QUFDRztBQUNmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ZnZG9tL2V4dGVybmFsIGNvbW1vbmpzIFwiLi9zcmMvdXRpbHMvZGlybmFtZS5janNcIiIsIndlYnBhY2s6Ly9zdmdkb20vZXh0ZXJuYWwgY29tbW9uanMgXCJmb250a2l0XCIiLCJ3ZWJwYWNrOi8vc3ZnZG9tL2V4dGVybmFsIGNvbW1vbmpzIFwiaW1hZ2Utc2l6ZVwiIiwid2VicGFjazovL3N2Z2RvbS9leHRlcm5hbCBjb21tb25qcyBcInNheFwiIiwid2VicGFjazovL3N2Z2RvbS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9BdHRyLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vQ2hhcmFjdGVyRGF0YS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0NvbW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9DdXN0b21FdmVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0RvY3VtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vRG9jdW1lbnRGcmFnbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0RvY3VtZW50VHlwZS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9FdmVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0V2ZW50VGFyZ2V0LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vTm9kZS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL05vZGVGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9UZXh0LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vV2luZG93LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vaHRtbC9IVE1MRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL2h0bWwvSFRNTEltYWdlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL2h0bWwvSFRNTExpbmtFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vaHRtbC9IVE1MUGFyc2VyLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vaHRtbC9IVE1MU2NyaXB0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL21peGlucy9DaGlsZE5vZGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9taXhpbnMvTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vbWl4aW5zL05vbkVsZW1lbnRQYXJlbnROb2RlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vbWl4aW5zL1BhcmVudE5vZGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9taXhpbnMvZWxlbWVudEFjY2Vzcy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR0dyYXBoaWNzRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdNYXRyaXguanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHUGF0aEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHUG9pbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHU1ZHRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdUZXh0Q29udGVudEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2ZhY3Rvcmllcy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvb3RoZXIvQm94LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9vdGhlci9Dc3NRdWVyeS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvb3RoZXIvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL05vZGVJdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvUG9pbnRDbG91ZC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvYmJveFV0aWxzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvbWFwVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL25hbWVzcGFjZXMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL25vZGVzVG9Ob2RlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9wYXRoVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL3JlZ2V4LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9zdHJVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvdGFnVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL3RleHRVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3ZnZG9tL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdmdkb20vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdmdkb20vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdmdkb20vLi9tYWluLW1vZHVsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3NyYy91dGlscy9kaXJuYW1lLmNqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmb250a2l0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImltYWdlLXNpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2F4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IGZvbnRraXQgZnJvbSAnZm9udGtpdCdcclxuXHJcbmNvbnN0IF9jb25maWcgPSB7fVxyXG5jb25zdCBmb250cyA9IHt9XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0Rm9udERpciA9IGZ1bmN0aW9uIChkaXIpIHtcclxuICBfY29uZmlnLmZvbnREaXIgPSBkaXJcclxuICByZXR1cm4gdGhpc1xyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0Rm9udEZhbWlseU1hcHBpbmdzID0gZnVuY3Rpb24gKG1hcCkge1xyXG4gIF9jb25maWcuZm9udEZhbWlseU1hcHBpbmdzID0gbWFwXHJcbiAgcmV0dXJuIHRoaXNcclxufVxyXG5cclxuLy8gVE9ETzogbWFrZSBhc3luY1xyXG5leHBvcnQgY29uc3QgcHJlbG9hZEZvbnRzID0gKCkgPT4ge1xyXG4gIHZhciBtYXAgPSBfY29uZmlnLmZvbnRGYW1pbHlNYXBwaW5nc1xyXG5cclxuICBmb3IgKGNvbnN0IFsgZm9udCwgZmlsZSBdIG9mIE9iamVjdC5lbnRyaWVzKG1hcCkpIHtcclxuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5qb2luKF9jb25maWcuZm9udERpciwgZmlsZSlcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBmb250c1tmb250XSA9IGZvbnRraXQub3BlblN5bmMoZmlsZW5hbWUpXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IGxvYWQgZm9udCBmaWxlIGZvciAke2ZvbnR9YCwgZSlcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXNcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGdldENvbmZpZyA9ICgpID0+IF9jb25maWdcclxuZXhwb3J0IGNvbnN0IGdldEZvbnRzID0gKCkgPT4gZm9udHNcclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XHJcbiAgc2V0Rm9udERpcixcclxuICBzZXRGb250RmFtaWx5TWFwcGluZ3MsXHJcbiAgcHJlbG9hZEZvbnRzLFxyXG4gIGdldENvbmZpZyxcclxuICBnZXRGb250c1xyXG59XHJcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXHJcbmltcG9ydCB7IGh0bWwgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEF0dHIgZXh0ZW5kcyBOb2RlIHtcclxuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMsIG5zKSB7XHJcbiAgICBzdXBlcihuYW1lLCB7IG5vZGVWYWx1ZTogJycsIC4uLnByb3BzIH0sIG5zKVxyXG5cclxuICAgIC8vIEZvbGxvdyBzcGVjIGFuZCBsb3dlcmNhc2Ugbm9kZU5hbWUgZm9yIGh0bWxcclxuICAgIHRoaXMubm9kZU5hbWUgPSBucyA9PT0gaHRtbCA/IG5hbWUudG9Mb3dlckNhc2UoKSA6IG5hbWVcclxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLkFUVFJJQlVURV9OT0RFXHJcbiAgICB0aGlzLm93bmVyRWxlbWVudCA9IG51bGxcclxuICB9XHJcblxyXG4gIGdldCB2YWx1ZSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlVmFsdWVcclxuICB9XHJcblxyXG4gIHNldCB2YWx1ZSAodmFsKSB7XHJcbiAgICB0aGlzLm5vZGVWYWx1ZSA9IHZhbFxyXG4gIH1cclxuXHJcbiAgZ2V0IG5hbWUgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZU5hbWVcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcclxuaW1wb3J0IHsgbWl4aW4gfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xyXG5pbXBvcnQgeyBOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGUgfSBmcm9tICcuL21peGlucy9Ob25Eb2N1bWVudFR5cGVDaGlsZE5vZGUuanMnXHJcbmltcG9ydCB7IENoaWxkTm9kZSB9IGZyb20gJy4vbWl4aW5zL0NoaWxkTm9kZS5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJEYXRhIGV4dGVuZHMgTm9kZSB7XHJcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzKSB7XHJcbiAgICBzdXBlcihuYW1lLCBwcm9wcylcclxuXHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLm5vZGVWYWx1ZVxyXG4gIH1cclxuXHJcbiAgYXBwZW5kRGF0YSAoZGF0YSkge1xyXG4gICAgdGhpcy5kYXRhICs9IGRhdGFcclxuICB9XHJcblxyXG4gIGRlbGV0ZURhdGEgKG9mZnNldCwgY291bnQpIHtcclxuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgwLCBvZmZzZXQpICsgdGhpcy5kYXRhLnNsaWNlKDAsIG9mZnNldCArIGNvdW50KVxyXG4gIH1cclxuXHJcbiAgaW5zZXJ0RGF0YSAob2Zmc2V0LCBkYXRhKSB7XHJcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuc2xpY2UoMCwgb2Zmc2V0KSArIGRhdGEgKyB0aGlzLmRhdGEuc2xpY2Uob2Zmc2V0KVxyXG4gIH1cclxuXHJcbiAgcmVwbGFjZURhdGEgKG9mZnNldCwgY291bnQsIGRhdGEpIHtcclxuICAgIHRoaXMuZGVsZXRlRGF0YShvZmZzZXQsIGNvdW50KVxyXG4gICAgdGhpcy5pbnNlcnREYXRhKG9mZnNldCwgZGF0YSlcclxuICB9XHJcblxyXG4gIHN1YnN0cmluZ0RhdGEgKG9mZnNldCwgY291bnQpIHtcclxuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5zdWJzdHIob2Zmc2V0LCBjb3VudClcclxuICB9XHJcblxyXG4gIGdldCBsZW5ndGggKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YS5sZW5ndGhcclxuICB9XHJcbn1cclxuXHJcbm1peGluKE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZSwgQ2hhcmFjdGVyRGF0YSlcclxubWl4aW4oQ2hpbGROb2RlLCBDaGFyYWN0ZXJEYXRhKVxyXG4iLCJpbXBvcnQgeyBDaGFyYWN0ZXJEYXRhIH0gZnJvbSAnLi9DaGFyYWN0ZXJEYXRhLmpzJ1xyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJ1xyXG5leHBvcnQgY2xhc3MgQ29tbWVudCBleHRlbmRzIENoYXJhY3RlckRhdGEge1xyXG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcykge1xyXG4gICAgc3VwZXIobmFtZSwgcHJvcHMpXHJcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5DT01NRU5UX05PREVcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL0V2ZW50LmpzJ1xyXG5leHBvcnQgY2xhc3MgQ3VzdG9tRXZlbnQgZXh0ZW5kcyBFdmVudCB7XHJcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzID0ge30pIHtcclxuICAgIHN1cGVyKG5hbWUpXHJcbiAgICB0aGlzLmRldGFpbCA9IHByb3BzLmRldGFpbCB8fCBudWxsXHJcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBwcm9wcy5jYW5jZWxhYmxlIHx8IGZhbHNlXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXHJcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tICcuL0NvbW1lbnQuanMnXHJcbmltcG9ydCB7IFRleHQgfSBmcm9tICcuL1RleHQuanMnXHJcbmltcG9ydCB7IEF0dHIgfSBmcm9tICcuL0F0dHIuanMnXHJcbmltcG9ydCB7IERvY3VtZW50RnJhZ21lbnQgfSBmcm9tICcuL0RvY3VtZW50RnJhZ21lbnQuanMnXHJcbmltcG9ydCB7IEhUTUxMaW5rRWxlbWVudCB9IGZyb20gJy4vaHRtbC9IVE1MTGlua0VsZW1lbnQuanMnXHJcbmltcG9ydCB7IEhUTUxTY3JpcHRFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBIVE1MSW1hZ2VFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxJbWFnZUVsZW1lbnQuanMnXHJcbmltcG9ydCB7IEhUTUxFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBlbGVtZW50QWNjZXNzIH0gZnJvbSAnLi9taXhpbnMvZWxlbWVudEFjY2Vzcy5qcydcclxuaW1wb3J0IHsgbWl4aW4gfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xyXG5pbXBvcnQgeyBTVkdTVkdFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHU1ZHRWxlbWVudC5qcydcclxuaW1wb3J0IHsgU1ZHUGF0aEVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdQYXRoRWxlbWVudC5qcydcclxuaW1wb3J0IHsgU1ZHVGV4dENvbnRlbnRFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHVGV4dENvbnRlbnRFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdHcmFwaGljc0VsZW1lbnQuanMnXHJcbmltcG9ydCB7IFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9QYXJlbnROb2RlLmpzJ1xyXG5pbXBvcnQgeyBzdmcsIGh0bWwgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xyXG5pbXBvcnQgeyBEb2N1bWVudFR5cGUgfSBmcm9tICcuL0RvY3VtZW50VHlwZS5qcydcclxuaW1wb3J0IHsgTm9uRWxlbWVudFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9Ob25FbGVtZW50UGFyZW50Tm9kZS5qcydcclxuXHJcbmZ1bmN0aW9uIGdldENoaWxkQnlUYWdOYW1lIChwYXJlbnQsIG5hbWUpIHtcclxuICBmb3IgKGxldCBjaGlsZCA9IHBhcmVudC5maXJzdENoaWxkOyBjaGlsZCAhPSBudWxsOyBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nKSB7XHJcbiAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIGNoaWxkLm5vZGVOYW1lID09PSBuYW1lKSB7XHJcbiAgICAgIHJldHVybiBjaGlsZFxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVsbFxyXG59XHJcblxyXG5jb25zdCBnZXRTVkdFbGVtZW50Rm9yTmFtZSA9IChuYW1lKSA9PiB7XHJcbiAgc3dpdGNoIChuYW1lLnRvTG93ZXJDYXNlKCkpIHtcclxuICBjYXNlICdzdmcnOlxyXG4gICAgcmV0dXJuIFNWR1NWR0VsZW1lbnRcclxuICBjYXNlICdwYXRoJzpcclxuICAgIHJldHVybiBTVkdQYXRoRWxlbWVudFxyXG4gIGNhc2UgJ3RleHQnOlxyXG4gIGNhc2UgJ3RzcGFuJzpcclxuICBjYXNlICd0cmVmJzpcclxuICBjYXNlICdhbHRnbHlwaCc6XHJcbiAgY2FzZSAndGV4dHBhdGgnOlxyXG4gICAgcmV0dXJuIFNWR1RleHRDb250ZW50RWxlbWVudFxyXG4gIGRlZmF1bHQ6XHJcbiAgICByZXR1cm4gU1ZHR3JhcGhpY3NFbGVtZW50XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBnZXRIVE1MRWxlbWVudEZvck5hbWUgPSAobmFtZSkgPT4ge1xyXG4gIHN3aXRjaCAobmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgY2FzZSAnaW1nJzpcclxuICAgIHJldHVybiBIVE1MSW1hZ2VFbGVtZW50XHJcbiAgY2FzZSAnbGluayc6XHJcbiAgICByZXR1cm4gSFRNTExpbmtFbGVtZW50XHJcbiAgY2FzZSAnc2NyaXB0JzpcclxuICAgIHJldHVybiBIVE1MU2NyaXB0RWxlbWVudFxyXG4gIGRlZmF1bHQ6XHJcbiAgICByZXR1cm4gSFRNTEVsZW1lbnRcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGdldEVsZW1lbnRGb3JOYW1lc3BhY2UgPSAobnMsIG5hbWUpID0+IHtcclxuICBzd2l0Y2ggKG5zKSB7XHJcbiAgY2FzZSBzdmc6XHJcbiAgICByZXR1cm4gZ2V0U1ZHRWxlbWVudEZvck5hbWUobmFtZSlcclxuICBjYXNlIGh0bWw6XHJcbiAgY2FzZSBudWxsOlxyXG4gIGNhc2UgJyc6XHJcbiAgZGVmYXVsdDpcclxuICAgIHJldHVybiBnZXRIVE1MRWxlbWVudEZvck5hbWUobmFtZSlcclxuICB9XHJcbn1cclxuXHJcbi8vIEZlYXR1cmUvdmVyc2lvbiBwYWlycyB0aGF0IERPTUltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoKSByZXR1cm5zIHRydWUgZm9yLiAgSXQgcmV0dXJucyBmYWxzZSBmb3IgYW55dGhpbmcgZWxzZS5cclxuY29uc3Qgc3VwcG9ydGVkRmVhdHVyZXMgPSB7XHJcbiAgeG1sOiB7ICcnOiB0cnVlLCAnMS4wJzogdHJ1ZSwgJzIuMCc6IHRydWUgfSxcclxuICBjb3JlOiB7ICcnOiB0cnVlLCAnMi4wJzogdHJ1ZSB9LFxyXG4gIGh0bWw6IHsgJyc6IHRydWUsICcxLjAnOiB0cnVlLCAnMi4wJzogdHJ1ZSB9LFxyXG4gIHhodG1sOiB7ICcnOiB0cnVlLCAnMS4wJzogdHJ1ZSwgJzIuMCc6IHRydWUgfSAvLyBIVE1MXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBET01JbXBsZW1lbnRhdGlvbiA9IHtcclxuICBoYXNGZWF0dXJlIChmZWF0dXJlLCB2ZXJzaW9uKSB7XHJcbiAgICBjb25zdCBmID0gc3VwcG9ydGVkRmVhdHVyZXNbKGZlYXR1cmUgfHwgJycpLnRvTG93ZXJDYXNlKCldXHJcbiAgICByZXR1cm4gKGYgJiYgZlt2ZXJzaW9uIHx8ICcnXSkgfHwgZmFsc2VcclxuICB9LFxyXG5cclxuICBjcmVhdGVEb2N1bWVudFR5cGUgKHF1YWxpZmllZE5hbWUsIHB1YmxpY0lkLCBzeXN0ZW1JZCkge1xyXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudFR5cGUocXVhbGlmaWVkTmFtZSwgeyBwdWJsaWNJZCwgc3lzdGVtSWQsIG93bmVyRG9jdW1lbnQ6IHRoaXMgfSlcclxuICB9LFxyXG5cclxuICBjcmVhdGVEb2N1bWVudCAobmFtZXNwYWNlLCBxdWFsaWZpZWROYW1lLCBkb2N0eXBlKSB7XHJcbiAgICBjb25zdCBkb2MgPSBuZXcgRG9jdW1lbnQobmFtZXNwYWNlKVxyXG4gICAgaWYgKGRvY3R5cGUpIHtcclxuICAgICAgaWYgKGRvY3R5cGUub3duZXJEb2N1bWVudCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIG9iamVjdCBpcyBpbiB0aGUgd3JvbmcgRG9jdW1lbnQsIGEgY2FsbCB0byBpbXBvcnROb2RlIGlzIHJlcXVpcmVkJylcclxuICAgICAgfVxyXG4gICAgICBkb2N0eXBlLm93bmVyRG9jdW1lbnQgPSBkb2NcclxuICAgICAgZG9jLmFwcGVuZENoaWxkKGRvY3R5cGUpXHJcbiAgICB9XHJcbiAgICBpZiAocXVhbGlmaWVkTmFtZSkge1xyXG4gICAgICBkb2MuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2UsIHF1YWxpZmllZE5hbWUpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRvY1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZUhUTUxEb2N1bWVudCAodGl0bGVUZXh0ID0gJycpIHtcclxuICAgIGNvbnN0IGQgPSBuZXcgRG9jdW1lbnQoaHRtbClcclxuICAgIGNvbnN0IHJvb3QgPSBkLmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKVxyXG4gICAgY29uc3QgaGVhZCA9IGQuY3JlYXRlRWxlbWVudCgnaGVhZCcpXHJcbiAgICBjb25zdCB0aXRsZSA9IGQuY3JlYXRlRWxlbWVudCgndGl0bGUnKVxyXG4gICAgdGl0bGUuYXBwZW5kQ2hpbGQoZC5jcmVhdGVUZXh0Tm9kZSh0aXRsZVRleHQpKVxyXG4gICAgaGVhZC5hcHBlbmRDaGlsZCh0aXRsZSlcclxuICAgIHJvb3QuYXBwZW5kQ2hpbGQoaGVhZClcclxuICAgIHJvb3QuYXBwZW5kQ2hpbGQoZC5jcmVhdGVFbGVtZW50KCdib2R5JykpXHJcblxyXG4gICAgZC5hcHBlbmRDaGlsZChyb290KVxyXG4gICAgcmV0dXJuIGRcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIE5vZGUge1xyXG4gIGNvbnN0cnVjdG9yIChucykge1xyXG4gICAgc3VwZXIoJyNkb2N1bWVudCcsIHt9LCBucylcclxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLkRPQ1VNRU5UX05PREVcclxuICAgIHRoaXMuaW1wbGVtZW50YXRpb24gPSBET01JbXBsZW1lbnRhdGlvblxyXG4gICAgdGhpcy5kZWZhdWx0VmlldyA9IG51bGxcclxuICB9XHJcblxyXG4gIC8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jZG9tLWRvY3VtZW50LWNyZWF0ZWF0dHJpYnV0ZVxyXG4gIGNyZWF0ZUF0dHJpYnV0ZSAobG9jYWxOYW1lKSB7XHJcbiAgICBpZiAodGhpcy5uYW1lc3BhY2VVUkkgPT09IGh0bWwpIHtcclxuICAgICAgbG9jYWxOYW1lID0gbG9jYWxOYW1lLnRvTG93ZXJDYXNlKClcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUF0dHJpYnV0ZU5TKG51bGwsIGxvY2FsTmFtZSwgdHJ1ZSlcclxuICB9XHJcblxyXG4gIGNyZWF0ZUF0dHJpYnV0ZU5TIChucywgcXVhbGlmaWVkTmFtZSwgbG9jYWwgPSBmYWxzZSkge1xyXG4gICAgcmV0dXJuIG5ldyBBdHRyKHF1YWxpZmllZE5hbWUsIHsgb3duZXJEb2N1bWVudDogdGhpcywgbG9jYWwgfSwgbnMpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVDb21tZW50ICh0ZXh0KSB7XHJcbiAgICByZXR1cm4gbmV3IENvbW1lbnQoJyNjb21tZW50JywgeyBub2RlVmFsdWU6IHRleHQsIG93bmVyRG9jdW1lbnQ6IHRoaXMgfSlcclxuICB9XHJcblxyXG4gIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQgKG5hbWUpIHtcclxuICAgIHJldHVybiBuZXcgRG9jdW1lbnRGcmFnbWVudCgnI2RvY3VtZW50LWZyYWdtZW50JywgeyBvd25lckRvY3VtZW50OiB0aGlzIH0pXHJcbiAgfVxyXG5cclxuICBjcmVhdGVFbGVtZW50IChsb2NhbE5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUVsZW1lbnROUyh0aGlzLm5hbWVzcGFjZVVSSSwgbG9jYWxOYW1lLCB0cnVlKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlRWxlbWVudE5TIChucywgcXVhbGlmaWVkTmFtZSwgbG9jYWwgPSBmYWxzZSkge1xyXG4gICAgY29uc3QgRWxlbWVudCA9IGdldEVsZW1lbnRGb3JOYW1lc3BhY2UobnMsIHF1YWxpZmllZE5hbWUpXHJcblxyXG4gICAgcmV0dXJuIG5ldyBFbGVtZW50KHF1YWxpZmllZE5hbWUsIHtcclxuICAgICAgb3duZXJEb2N1bWVudDogdGhpcyxcclxuICAgICAgbG9jYWxcclxuICAgIH0sIG5zKVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlVGV4dE5vZGUgKHRleHQpIHtcclxuICAgIHJldHVybiBuZXcgVGV4dCgnI3RleHQnLCB7IG5vZGVWYWx1ZTogdGV4dCwgb3duZXJEb2N1bWVudDogdGhpcyB9KVxyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbXBhdE1vZGUgKCkge1xyXG4gICAgcmV0dXJuICdDU1MxQ29tcGF0JyAvLyBhbHdheXMgYmUgaW4gc3RhbmRhcmRzLW1vZGVcclxuICB9XHJcblxyXG4gIGdldCBib2R5ICgpIHtcclxuICAgIHJldHVybiBnZXRDaGlsZEJ5VGFnTmFtZSh0aGlzLmRvY3VtZW50RWxlbWVudCwgJ0JPRFknKVxyXG4gIH1cclxuXHJcbiAgZ2V0IGhlYWQgKCkge1xyXG4gICAgcmV0dXJuIGdldENoaWxkQnlUYWdOYW1lKHRoaXMuZG9jdW1lbnRFbGVtZW50LCAnSEVBRCcpXHJcbiAgfVxyXG5cclxuICBnZXQgZG9jdW1lbnRFbGVtZW50ICgpIHtcclxuICAgIHJldHVybiB0aGlzLmxhc3RDaGlsZFxyXG4gIH1cclxufVxyXG5cclxubWl4aW4oZWxlbWVudEFjY2VzcywgRG9jdW1lbnQpXHJcbm1peGluKFBhcmVudE5vZGUsIERvY3VtZW50KVxyXG5taXhpbihOb25FbGVtZW50UGFyZW50Tm9kZSwgRG9jdW1lbnQpXHJcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXHJcbmltcG9ydCB7IG1peGluIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcclxuaW1wb3J0IHsgZWxlbWVudEFjY2VzcyB9IGZyb20gJy4vbWl4aW5zL2VsZW1lbnRBY2Nlc3MuanMnXHJcbmltcG9ydCB7IFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9QYXJlbnROb2RlLmpzJ1xyXG5pbXBvcnQgeyBOb25FbGVtZW50UGFyZW50Tm9kZSB9IGZyb20gJy4vbWl4aW5zL05vbkVsZW1lbnRQYXJlbnROb2RlLmpzJ1xyXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRGcmFnbWVudCBleHRlbmRzIE5vZGUge1xyXG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcykge1xyXG4gICAgc3VwZXIobmFtZSwgcHJvcHMpXHJcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFXHJcbiAgfVxyXG59XHJcblxyXG5taXhpbihlbGVtZW50QWNjZXNzLCBEb2N1bWVudEZyYWdtZW50KVxyXG5taXhpbihQYXJlbnROb2RlLCBEb2N1bWVudEZyYWdtZW50KVxyXG5taXhpbihOb25FbGVtZW50UGFyZW50Tm9kZSwgRG9jdW1lbnRGcmFnbWVudClcclxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcclxuaW1wb3J0IHsgbWl4aW4gfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xyXG5pbXBvcnQgeyBDaGlsZE5vZGUgfSBmcm9tICcuL21peGlucy9DaGlsZE5vZGUuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRUeXBlIGV4dGVuZHMgTm9kZSB7XHJcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzKSB7XHJcbiAgICBzdXBlcihuYW1lLCBwcm9wcylcclxuXHJcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5ET0NVTUVOVF9UWVBFX05PREVcclxuICAgIHRoaXMubmFtZSA9IG5hbWVcclxuXHJcbiAgICBjb25zdCB7IHB1YmxpY0lkLCBzeXN0ZW1JZCB9ID0gcHJvcHNcclxuICAgIHRoaXMucHVibGljSWQgPSBwdWJsaWNJZCB8fCAnJ1xyXG4gICAgdGhpcy5zeXN0ZW1JZCA9IHN5c3RlbUlkIHx8ICcnXHJcbiAgfVxyXG59XHJcblxyXG5taXhpbihDaGlsZE5vZGUsIERvY3VtZW50VHlwZSlcclxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcclxuXHJcbmltcG9ydCB7IFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9QYXJlbnROb2RlLmpzJ1xyXG5pbXBvcnQgeyBlbGVtZW50QWNjZXNzIH0gZnJvbSAnLi9taXhpbnMvZWxlbWVudEFjY2Vzcy5qcydcclxuaW1wb3J0IHsgSFRNTFBhcnNlciB9IGZyb20gJy4vaHRtbC9IVE1MUGFyc2VyLmpzJ1xyXG5pbXBvcnQgeyBEb2N1bWVudEZyYWdtZW50IH0gZnJvbSAnLi9Eb2N1bWVudEZyYWdtZW50LmpzJ1xyXG5pbXBvcnQgeyBtaXhpbiB9IGZyb20gJy4uL3V0aWxzL29iamVjdENyZWF0aW9uVXRpbHMuanMnXHJcbmltcG9ydCB7IHRhZyB9IGZyb20gJy4uL3V0aWxzL3RhZ1V0aWxzLmpzJ1xyXG5pbXBvcnQgeyBjc3NUb01hcCwgbWFwVG9Dc3MgfSBmcm9tICcuLi91dGlscy9tYXBVdGlscy5qcydcclxuaW1wb3J0IHsgaGV4VG9SR0IsIGRlY2FtZWxpemUsIGh0bWxFbnRpdGllcywgY2RhdGEsIGNvbW1lbnQgfSBmcm9tICcuLi91dGlscy9zdHJVdGlscy5qcydcclxuaW1wb3J0IHsgTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlIH0gZnJvbSAnLi9taXhpbnMvTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlLmpzJ1xyXG5pbXBvcnQgeyBDaGlsZE5vZGUgfSBmcm9tICcuL21peGlucy9DaGlsZE5vZGUuanMnXHJcbmltcG9ydCB7IGh0bWwsIHhtbCwgeG1sbnMgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xyXG5cclxuY29uc3QgdmFsaWRhdGVBbmRFeHRyYWN0ID0gKG5zLCBuYW1lKSA9PiB7XHJcbiAgbGV0IHByZWZpeCA9IG51bGxcclxuICBsZXQgbG9jYWxuYW1lID0gbmFtZVxyXG5cclxuICBpZiAoIW5zKSBucyA9IG51bGxcclxuXHJcbiAgaWYgKG5hbWUuaW5jbHVkZXMoJzonKSkge1xyXG4gICAgWyBwcmVmaXgsIGxvY2FsbmFtZSBdID0gbmFtZS5zcGxpdCgnOicpXHJcbiAgfVxyXG5cclxuICBpZiAoIW5zICYmIHByZWZpeCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOYW1lc3BhY2UgRXJyb3InKVxyXG4gIH1cclxuXHJcbiAgaWYgKHByZWZpeCA9PT0gJ3htbCcgJiYgbnMgIT09IHhtbCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOYW1lc3BhY2UgRXJyb3InKVxyXG4gIH1cclxuXHJcbiAgaWYgKChwcmVmaXggPT09ICd4bWxucycgfHwgbmFtZSA9PT0gJ3htbG5zJykgJiYgbnMgIT09IHhtbG5zKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWVzcGFjZSBFcnJvcicpXHJcbiAgfVxyXG5cclxuICBpZiAocHJlZml4ICE9PSAneG1sbnMnICYmIG5hbWUgIT09ICd4bWxucycgJiYgbnMgPT09IHhtbG5zKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWVzcGFjZSBFcnJvcicpXHJcbiAgfVxyXG5cclxuICByZXR1cm4gWyBucywgcHJlZml4LCBsb2NhbG5hbWUgXVxyXG59XHJcblxyXG5jb25zdCBnZXRBdHRyaWJ1dGVCeU5zQW5kTG9jYWxOYW1lID0gKGVsLCBucywgbG9jYWxOYW1lKSA9PiB7XHJcbiAgaWYgKCFucykgbnMgPSBudWxsXHJcbiAgcmV0dXJuIFsgLi4uZWwuYXR0cnMgXS5maW5kKChub2RlKSA9PiBub2RlLmxvY2FsTmFtZSA9PT0gbG9jYWxOYW1lICYmIG5vZGUubmFtZXNwYWNlVVJJID09PSBucylcclxufVxyXG5cclxuY29uc3QgZ2V0QXR0cmlidXRlQnlRdWFsaWZpZWROYW1lID0gKGVsLCBxdWFsaWZpZWROYW1lKSA9PiB7XHJcbiAgaWYgKGVsLm5hbWVzcGFjZVVSSSA9PT0gaHRtbCAmJiBlbC5vd25lckRvY3VtZW50Lm5hbWVzcGFjZVVSSSA9PT0gaHRtbCkge1xyXG4gICAgcXVhbGlmaWVkTmFtZSA9IHF1YWxpZmllZE5hbWUudG9Mb3dlckNhc2UoKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIFsgLi4uZWwuYXR0cnMgXS5maW5kKChub2RlKSA9PiBub2RlLm5hbWUgPT09IHF1YWxpZmllZE5hbWUpXHJcbn1cclxuXHJcbi8vIFRoaXMgUHJveHkgcHJveGllcyBhbGwgYWNjZXNzIHRvIG5vZGUuc3R5bGUgdG8gdGhlIGNzcyBzYXZlZCBpbiB0aGUgYXR0cmlidXRlXHJcbmNvbnN0IGdldFN0eWxlUHJveHkgPSAobm9kZSkgPT4ge1xyXG5cclxuICByZXR1cm4gbmV3IFByb3h5KG5vZGUsIHtcclxuICAgIGdldCAodGFyZ2V0LCBrZXkpIHtcclxuICAgICAgY29uc3Qgc3R5bGVzID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnc3R5bGUnKSB8fCAnJ1xyXG4gICAgICBjb25zdCBzdHlsZU1hcCA9IGNzc1RvTWFwKHN0eWxlcylcclxuXHJcbiAgICAgIGlmIChrZXkgPT09ICdjc3NUZXh0Jykge1xyXG4gICAgICAgIHJldHVybiBzdHlsZXNcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGtleSA9PT0gJ3NldFByb3BlcnR5Jykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocHJvcGVydHlOYW1lLCB2YWx1ZSA9ICcnLCBwcmlvcml0eSA9ICcnKSB7XHJcbiAgICAgICAgICBub2RlLnN0eWxlW3Byb3BlcnR5TmFtZV0gPSB2YWx1ZSArIChwcmlvcml0eSA/IGAgISR7cHJpb3JpdHl9YCA6ICcnKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAga2V5ID0gZGVjYW1lbGl6ZShrZXkpXHJcbiAgICAgIGlmICghc3R5bGVNYXAuaGFzKGtleSkpIHJldHVybiAnJ1xyXG5cclxuICAgICAgcmV0dXJuIHN0eWxlTWFwLmdldChrZXkpXHJcbiAgICB9LFxyXG4gICAgc2V0ICh0YXJnZXQsIGtleSwgdmFsdWUpIHtcclxuICAgICAga2V5ID0gZGVjYW1lbGl6ZShrZXkpXHJcblxyXG4gICAgICBpZiAoa2V5ID09PSAnY3NzLXRleHQnKSB7XHJcbiAgICAgICAgLy8gZW5zdXJlIGNvcnJlY3Qgc3BhY2luZyBhbmQgc3ludGF4IGJ5IGNvbnZlcnRpbmcgYmFjayBhbmQgZm9ydGhcclxuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdzdHlsZScsIG1hcFRvQ3NzKGNzc1RvTWFwKHZhbHVlKSkpXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YWx1ZSA9IGhleFRvUkdCKHZhbHVlLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnc3R5bGUnKSB8fCAnJ1xyXG4gICAgICAgIGNvbnN0IHN0eWxlTWFwID0gY3NzVG9NYXAoc3R5bGVzKVxyXG4gICAgICAgIHN0eWxlTWFwLnNldChrZXksIHZhbHVlKVxyXG5cclxuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdzdHlsZScsIG1hcFRvQ3NzKHN0eWxlTWFwKSlcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jZG9tLWVsZW1lbnQtc2V0YXR0cmlidXRlbnNcclxuZXhwb3J0IGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBOb2RlIHtcclxuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMsIG5zKSB7XHJcbiAgICBzdXBlcihuYW1lLCBwcm9wcywgbnMpXHJcblxyXG4gICAgdGhpcy5zdHlsZSA9IGdldFN0eWxlUHJveHkodGhpcylcclxuICAgIHRoaXMudGFnTmFtZSA9IHRoaXMubm9kZU5hbWVcclxuICB9XHJcblxyXG4gIGdldEF0dHJpYnV0ZSAocXVhbGlmaWVkTmFtZSkge1xyXG4gICAgY29uc3QgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZShxdWFsaWZpZWROYW1lKVxyXG4gICAgcmV0dXJuIGF0dHIgPyBhdHRyLnZhbHVlIDogbnVsbFxyXG4gIH1cclxuXHJcbiAgZ2V0QXR0cmlidXRlTm9kZSAocXVhbGlmaWVkTmFtZSkge1xyXG4gICAgcmV0dXJuIGdldEF0dHJpYnV0ZUJ5UXVhbGlmaWVkTmFtZSh0aGlzLCBxdWFsaWZpZWROYW1lKVxyXG4gIH1cclxuXHJcbiAgZ2V0QXR0cmlidXRlTm9kZU5TIChucywgbG9jYWxOYW1lKSB7XHJcbiAgICByZXR1cm4gZ2V0QXR0cmlidXRlQnlOc0FuZExvY2FsTmFtZSh0aGlzLCBucywgbG9jYWxOYW1lKVxyXG4gIH1cclxuXHJcbiAgZ2V0QXR0cmlidXRlTlMgKG5zLCBsb2NhbE5hbWUpIHtcclxuICAgIGNvbnN0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGVOUyhucywgbG9jYWxOYW1lKVxyXG4gICAgcmV0dXJuIGF0dHIgPyBhdHRyLnZhbHVlIDogbnVsbFxyXG4gIH1cclxuXHJcbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICgpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignT25seSBpbXBsZW1lbnRlZCBmb3IgU1ZHIEVsZW1lbnRzJylcclxuICB9XHJcblxyXG4gIGhhc0F0dHJpYnV0ZSAocXVhbGlmaWVkTmFtZSkge1xyXG4gICAgY29uc3QgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZShxdWFsaWZpZWROYW1lKVxyXG4gICAgcmV0dXJuICEhYXR0clxyXG4gIH1cclxuXHJcbiAgaGFzQXR0cmlidXRlTlMgKG5zLCBsb2NhbE5hbWUpIHtcclxuICAgIGNvbnN0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGVOUyhucywgbG9jYWxOYW1lKVxyXG4gICAgcmV0dXJuICEhYXR0clxyXG4gIH1cclxuXHJcbiAgbWF0Y2hlcyAocXVlcnkpIHtcclxuICAgIHJldHVybiB0aGlzLm1hdGNoV2l0aFNjb3BlKHF1ZXJ5LCB0aGlzKVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQXR0cmlidXRlIChxdWFsaWZpZWROYW1lKSB7XHJcbiAgICBjb25zdCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlKHF1YWxpZmllZE5hbWUpXHJcbiAgICBpZiAoYXR0cikge1xyXG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5vZGUoYXR0cilcclxuICAgIH1cclxuICAgIHJldHVybiBhdHRyXHJcbiAgfVxyXG5cclxuICByZW1vdmVBdHRyaWJ1dGVOb2RlIChub2RlKSB7XHJcbiAgICBpZiAoIXRoaXMuYXR0cnMuZGVsZXRlKG5vZGUpKSB0aHJvdyBuZXcgRXJyb3IoJ0F0dHJpYnV0ZSBjYW5ub3QgYmUgcmVtb3ZlZCBiZWNhdXNlIGl0IHdhcyBub3QgZm91bmQgb24gdGhlIGVsZW1lbnQnKVxyXG4gICAgcmV0dXJuIG5vZGVcclxuICB9XHJcblxyXG4gIC8vIGNhbGwgaXM6IGQucmVtb3ZlQXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cubW96aWxsYS5vcmcvbnMvc3BlY2lhbHNwYWNlJywgJ2FsaWduJywgJ2NlbnRlcicpO1xyXG4gIHJlbW92ZUF0dHJpYnV0ZU5TIChucywgbG9jYWxOYW1lKSB7XHJcbiAgICBjb25zdCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlTlMobnMsIGxvY2FsTmFtZSlcclxuICAgIGlmIChhdHRyKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTm9kZShhdHRyKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF0dHJcclxuICB9XHJcblxyXG4gIC8qIFRoZSBzZXRBdHRyaWJ1dGUocXVhbGlmaWVkTmFtZSwgdmFsdWUpIG1ldGhvZCwgd2hlbiBpbnZva2VkLCBtdXN0IHJ1biB0aGVzZSBzdGVwczpcclxuXHJcbiAgICBJZiBxdWFsaWZpZWROYW1lIGRvZXMgbm90IG1hdGNoIHRoZSBOYW1lIHByb2R1Y3Rpb24gaW4gWE1MLCB0aGVuIHRocm93IGFuIFwiSW52YWxpZENoYXJhY3RlckVycm9yXCIgRE9NRXhjZXB0aW9uLlxyXG5cclxuICAgIElmIHRoaXMgaXMgaW4gdGhlIEhUTUwgbmFtZXNwYWNlIGFuZCBpdHMgbm9kZSBkb2N1bWVudCBpcyBhbiBIVE1MIGRvY3VtZW50LCB0aGVuIHNldCBxdWFsaWZpZWROYW1lIHRvIHF1YWxpZmllZE5hbWUgaW4gQVNDSUkgbG93ZXJjYXNlLlxyXG5cclxuICAgIExldCBhdHRyaWJ1dGUgYmUgdGhlIGZpcnN0IGF0dHJpYnV0ZSBpbiB0aGlz4oCZcyBhdHRyaWJ1dGUgbGlzdCB3aG9zZSBxdWFsaWZpZWQgbmFtZSBpcyBxdWFsaWZpZWROYW1lLCBhbmQgbnVsbCBvdGhlcndpc2UuXHJcblxyXG4gICAgSWYgYXR0cmlidXRlIGlzIG51bGwsIGNyZWF0ZSBhbiBhdHRyaWJ1dGUgd2hvc2UgbG9jYWwgbmFtZSBpcyBxdWFsaWZpZWROYW1lLCB2YWx1ZSBpcyB2YWx1ZSwgYW5kIG5vZGUgZG9jdW1lbnQgaXMgdGhpc+KAmXMgbm9kZSBkb2N1bWVudCwgdGhlbiBhcHBlbmQgdGhpcyBhdHRyaWJ1dGUgdG8gdGhpcywgYW5kIHRoZW4gcmV0dXJuLlxyXG5cclxuICAgIENoYW5nZSBhdHRyaWJ1dGUgdG8gdmFsdWUuXHJcbiAgKi9cclxuICBzZXRBdHRyaWJ1dGUgKHF1YWxpZmllZE5hbWUsIHZhbHVlKSB7XHJcbiAgICAvLyBXZSBoYXZlIHRvIGRvIHRoYXQgaGVyZSBiZWNhdXNlIHdlIGNhbm5vdCBjaGVjayBpZiBgdGhpc2AgaXMgaW4gdGhlIGNvcnJlY3QgbmFtZXNwYWNlXHJcbiAgICAvLyB3aGVuIGRvaW5nIGl0IGluIGNyZWF0ZUF0dHJpYnV0ZVxyXG4gICAgaWYgKHRoaXMubmFtZXNwYWNlVVJJID09PSBodG1sICYmIHRoaXMub3duZXJEb2N1bWVudC5uYW1lc3BhY2VVUkkgPT09IGh0bWwpIHtcclxuICAgICAgcXVhbGlmaWVkTmFtZSA9IHF1YWxpZmllZE5hbWUudG9Mb3dlckNhc2UoKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlKHF1YWxpZmllZE5hbWUpXHJcbiAgICBpZiAoIWF0dHIpIHtcclxuICAgICAgLy8gQmVjYXVzZSBjcmVhdGVBdHRyaWJ1dGUgbG93ZXJjYXNlcyB0aGUgYXR0cmlidXRlIGluIGFuIGh0bWwgZG9jIHdlIGhhdmUgdG8gdXNlIGNyZWF0ZUF0dHJpYnV0ZU5TXHJcbiAgICAgIGF0dHIgPSB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlTlMobnVsbCwgcXVhbGlmaWVkTmFtZSwgdHJ1ZSlcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVOb2RlKGF0dHIpXHJcbiAgICB9XHJcblxyXG4gICAgYXR0ci52YWx1ZSA9IHZhbHVlXHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAgTGV0IG5hbWVzcGFjZSwgcHJlZml4LCBhbmQgbG9jYWxOYW1lIGJlIHRoZSByZXN1bHQgb2YgcGFzc2luZyBuYW1lc3BhY2UgYW5kIHF1YWxpZmllZE5hbWUgdG8gdmFsaWRhdGUgYW5kIGV4dHJhY3QuXHJcblxyXG4gICAgU2V0IGFuIGF0dHJpYnV0ZSB2YWx1ZSBmb3IgdGhpcyB1c2luZyBsb2NhbE5hbWUsIHZhbHVlLCBhbmQgYWxzbyBwcmVmaXggYW5kIG5hbWVzcGFjZS5cclxuXHJcbiAgICBJZiBwcmVmaXggaXMgbm90IGdpdmVuLCBzZXQgaXQgdG8gbnVsbC5cclxuICAgIElmIG5hbWVzcGFjZSBpcyBub3QgZ2l2ZW4sIHNldCBpdCB0byBudWxsLlxyXG4gICAgTGV0IGF0dHJpYnV0ZSBiZSB0aGUgcmVzdWx0IG9mIGdldHRpbmcgYW4gYXR0cmlidXRlIGdpdmVuIG5hbWVzcGFjZSwgbG9jYWxOYW1lLCBhbmQgZWxlbWVudC5cclxuICAgIElmIGF0dHJpYnV0ZSBpcyBudWxsLCBjcmVhdGUgYW4gYXR0cmlidXRlIHdob3NlIG5hbWVzcGFjZSBpcyBuYW1lc3BhY2UsIG5hbWVzcGFjZSBwcmVmaXggaXMgcHJlZml4LCBsb2NhbCBuYW1lIGlzIGxvY2FsTmFtZSwgdmFsdWUgaXMgdmFsdWUsIGFuZCBub2RlIGRvY3VtZW50IGlzIGVsZW1lbnTigJlzIG5vZGUgZG9jdW1lbnQsIHRoZW4gYXBwZW5kIHRoaXMgYXR0cmlidXRlIHRvIGVsZW1lbnQsIGFuZCB0aGVuIHJldHVybi5cclxuXHJcbiAgICBDaGFuZ2UgYXR0cmlidXRlIHRvIHZhbHVlLlxyXG4gICovXHJcblxyXG4gIHNldEF0dHJpYnV0ZU5vZGUgKG5vZGUpIHtcclxuICAgIHRoaXMuYXR0cnMuYWRkKG5vZGUpXHJcbiAgICBub2RlLm93bmVyRWxlbWVudCA9IHRoaXNcclxuICB9XHJcblxyXG4gIC8vIGNhbGwgaXM6IGQuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cubW96aWxsYS5vcmcvbnMvc3BlY2lhbHNwYWNlJywgJ3NwZWM6YWxpZ24nLCAnY2VudGVyJyk7XHJcbiAgc2V0QXR0cmlidXRlTlMgKG5hbWVzcGFjZSwgbmFtZSwgdmFsdWUpIHtcclxuXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIGNvbnN0IFsgbnMsIHByZWZpeCwgbG9jYWxOYW1lIF0gPSB2YWxpZGF0ZUFuZEV4dHJhY3QobmFtZXNwYWNlLCBuYW1lKVxyXG5cclxuICAgIGxldCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlTlMobnMsIGxvY2FsTmFtZSlcclxuICAgIGlmICghYXR0cikge1xyXG4gICAgICBhdHRyID0gdGhpcy5vd25lckRvY3VtZW50LmNyZWF0ZUF0dHJpYnV0ZU5TKG5zLCBuYW1lKVxyXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZU5vZGUoYXR0cikgLy8gc2V0QXR0cmlidXRlTm9kZU5TIGlzIGEgc3lub255bSBvZiBzZXRBdHRyaWJ1dGVOb2RlXHJcbiAgICB9XHJcblxyXG4gICAgYXR0ci52YWx1ZSA9IHZhbHVlXHJcblxyXG4gICAgdGhpcy5hdHRycy5hZGQoYXR0cilcclxuICB9XHJcblxyXG4gIGdldCBhdHRyaWJ1dGVzICgpIHtcclxuICAgIHJldHVybiBbIC4uLnRoaXMuYXR0cnMgXVxyXG4gIH1cclxuXHJcbiAgZ2V0IGNsYXNzTmFtZSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NsYXNzJylcclxuICB9XHJcblxyXG4gIHNldCBjbGFzc05hbWUgKGMpIHtcclxuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjbGFzcycsIGMpXHJcbiAgfVxyXG5cclxuICBnZXQgaWQgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpIHx8ICcnXHJcbiAgfVxyXG5cclxuICBzZXQgaWQgKGlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpXHJcbiAgfVxyXG5cclxuICBnZXQgaW5uZXJIVE1MICgpIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzLm1hcChub2RlID0+IHtcclxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSByZXR1cm4gaHRtbEVudGl0aWVzKG5vZGUuZGF0YSlcclxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuQ0RBVEFfU0VDVElPTl9OT0RFKSByZXR1cm4gY2RhdGEobm9kZS5kYXRhKVxyXG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREUpIHJldHVybiBjb21tZW50KG5vZGUuZGF0YSlcclxuICAgICAgcmV0dXJuIG5vZGUub3V0ZXJIVE1MXHJcbiAgICB9KS5qb2luKCcnKVxyXG4gIH1cclxuXHJcbiAgc2V0IGlubmVySFRNTCAoc3RyKSB7XHJcbiAgICB3aGlsZSAodGhpcy5maXJzdENoaWxkKSB7XHJcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5maXJzdENoaWxkKVxyXG4gICAgfVxyXG4gICAgLy8gVGhlIHBhcnNlciBhZGRzIHRoZSBodG1sIHRvIHRoaXNcclxuICAgIEhUTUxQYXJzZXIoc3RyLCB0aGlzKVxyXG4gIH1cclxuXHJcbiAgZ2V0IG91dGVySFRNTCAoKSB7XHJcbiAgICByZXR1cm4gdGFnKHRoaXMpXHJcbiAgfVxyXG5cclxuICBzZXQgb3V0ZXJIVE1MIChzdHIpIHtcclxuICAgIHZhciB3ZWxsID0gbmV3IERvY3VtZW50RnJhZ21lbnQoKVxyXG4gICAgSFRNTFBhcnNlcihzdHIsIHdlbGwpXHJcbiAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdlbGwsIHRoaXMpXHJcbiAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcylcclxuICB9XHJcblxyXG59XHJcblxyXG5taXhpbihQYXJlbnROb2RlLCBFbGVtZW50KVxyXG5taXhpbihlbGVtZW50QWNjZXNzLCBFbGVtZW50KVxyXG5taXhpbihOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGUsIEVsZW1lbnQpXHJcbm1peGluKENoaWxkTm9kZSwgRWxlbWVudClcclxuIiwiZXhwb3J0IGNsYXNzIEV2ZW50IHtcclxuICBjb25zdHJ1Y3RvciAodHlwZSkge1xyXG4gICAgdGhpcy50eXBlID0gdHlwZVxyXG4gICAgdGhpcy5jYW5jZWxhYmxlID0gZmFsc2VcclxuICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlXHJcbiAgICB0aGlzLnRhcmdldCA9IG51bGxcclxuICB9XHJcblxyXG4gIHByZXZlbnREZWZhdWx0ICgpIHtcclxuICAgIGlmICh0aGlzLmNhbmNlbGFibGUpIHtcclxuICAgICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gdHJ1ZVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJjb25zdCAkID0gU3ltYm9sKCdwcml2YXRlIHByb3BlcnRpZXMnKVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50VGFyZ2V0IHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICB0aGlzWyRdID0ge31cclxuICAgIHRoaXNbJF0ubGlzdGVuZXJzID0ge31cclxuICB9XHJcblxyXG4gIGFkZEV2ZW50TGlzdGVuZXIgKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoISh0eXBlIGluIHRoaXNbJF0ubGlzdGVuZXJzKSkge1xyXG4gICAgICB0aGlzWyRdLmxpc3RlbmVyc1t0eXBlXSA9IFtdXHJcbiAgICB9XHJcbiAgICB0aGlzWyRdLmxpc3RlbmVyc1t0eXBlXS5wdXNoKGNhbGxiYWNrKVxyXG4gIH1cclxuXHJcbiAgZGlzcGF0Y2hFdmVudCAoZXZlbnQpIHtcclxuICAgIGlmICghKGV2ZW50LnR5cGUgaW4gdGhpc1skXS5saXN0ZW5lcnMpKSB7IHJldHVybiB0cnVlIH1cclxuXHJcbiAgICB2YXIgc3RhY2sgPSB0aGlzWyRdLmxpc3RlbmVyc1tldmVudC50eXBlXVxyXG4gICAgZXZlbnQudGFyZ2V0ID0gdGhpc1xyXG5cclxuICAgIHN0YWNrLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsKGV2ZW50KVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWRcclxuICB9XHJcblxyXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIgKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoISh0eXBlIGluIHRoaXNbJF0ubGlzdGVuZXJzKSkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3RhY2sgPSB0aGlzWyRdLmxpc3RlbmVyc1t0eXBlXVxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc3RhY2subGVuZ3RoOyBpIDwgaWw7IGkrKykge1xyXG4gICAgICBpZiAoc3RhY2tbaV0gPT09IGNhbGxiYWNrKSB7XHJcbiAgICAgICAgc3RhY2suc3BsaWNlKGksIDEpXHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IGV4dGVuZCwgZXh0ZW5kU3RhdGljIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcclxuXHJcbmltcG9ydCB7IEV2ZW50VGFyZ2V0IH0gZnJvbSAnLi9FdmVudFRhcmdldC5qcydcclxuaW1wb3J0IHsgY2xvbmVOb2RlIH0gZnJvbSAnLi4vdXRpbHMvdGFnVXRpbHMuanMnXHJcbmltcG9ydCB7IGh0bWwgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xyXG5cclxuY29uc3Qgbm9kZVR5cGVzID0ge1xyXG4gIEVMRU1FTlRfTk9ERTogMSxcclxuICBBVFRSSUJVVEVfTk9ERTogMixcclxuICBURVhUX05PREU6IDMsXHJcbiAgQ0RBVEFfU0VDVElPTl9OT0RFOiA0LFxyXG4gIEVOVElUWV9SRUZFUkVOQ0VfTk9ERTogNSxcclxuICBFTlRJVFlfTk9ERTogNixcclxuICBQUk9DRVNTSU5HX0lOU1RSVUNUSU9OX05PREU6IDcsXHJcbiAgQ09NTUVOVF9OT0RFOiA4LFxyXG4gIERPQ1VNRU5UX05PREU6IDksXHJcbiAgRE9DVU1FTlRfVFlQRV9OT0RFOiAxMCxcclxuICBET0NVTUVOVF9GUkFHTUVOVF9OT0RFOiAxMSxcclxuICBOT1RBVElPTl9OT0RFOiAxMlxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTm9kZSBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcclxuICBjb25zdHJ1Y3RvciAobmFtZSA9ICcnLCBwcm9wcyA9IHt9LCBucyA9IG51bGwpIHtcclxuICAgIHN1cGVyKClcclxuXHJcbiAgICAvLyBJZiBwcm9wcy5sb2NhbCBpcyB0cnVlLCB0aGUgZWxlbWVudCB3YXMgTm9kZSB3YXMgY3JlYXRlZCB3aXRoIHRoZSBub24tbmFtZXNwYWNlIGZ1bmN0aW9uXHJcbiAgICAvLyB0aGF0IG1lYW5zIHdoYXRldmVyIHdhcyBwYXNzZWQgYXMgbmFtZSBpcyB0aGUgbG9jYWwgbmFtZSBldmVuIHRob3VnaCBpdCBtaWdodCBsb29rIGxpa2UgYSBwcmVmaXhcclxuICAgIGlmIChuYW1lLmluY2x1ZGVzKCc6JykgJiYgIXByb3BzLmxvY2FsKSB7XHJcbiAgICAgIDtbIHRoaXMucHJlZml4LCB0aGlzLmxvY2FsTmFtZSBdID0gbmFtZS5zcGxpdCgnOicpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvY2FsTmFtZSA9IG5hbWVcclxuICAgICAgdGhpcy5wcmVmaXggPSBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgLy8gRm9sbG93IHNwZWMgYW5kIHVwcGVyY2FzZSBub2RlTmFtZSBmb3IgaHRtbFxyXG4gICAgdGhpcy5ub2RlTmFtZSA9IG5zID09PSBodG1sID8gbmFtZS50b1VwcGVyQ2FzZSgpIDogbmFtZVxyXG5cclxuICAgIHRoaXMubmFtZXNwYWNlVVJJID0gbnNcclxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLkVMRU1FTlRfTk9ERVxyXG4gICAgdGhpcy5ub2RlVmFsdWUgPSBwcm9wcy5ub2RlVmFsdWUgIT0gbnVsbCA/IHByb3BzLm5vZGVWYWx1ZSA6IG51bGxcclxuICAgIHRoaXMuY2hpbGROb2RlcyA9IFtdXHJcblxyXG4gICAgdGhpcy5hdHRycyA9IHByb3BzLmF0dHJzIHx8IG5ldyBTZXQoKVxyXG5cclxuICAgIHRoaXMub3duZXJEb2N1bWVudCA9IHByb3BzLm93bmVyRG9jdW1lbnQgfHwgbnVsbFxyXG4gICAgdGhpcy5wYXJlbnROb2RlID0gbnVsbFxyXG5cclxuICAgIC8vIHRoaXMubmFtZXNwYWNlcyA9IHt9XHJcbiAgICAvLyBpZiAodGhpcy5wcmVmaXgpIHtcclxuICAgIC8vICAgdGhpcy5uYW1lc3BhY2VzW3RoaXMucHJlZml4XSA9IG5zXHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICB0aGlzLm5hbWVzcGFjZXMuZGVmYXVsdCA9IG5zXHJcbiAgICAvLyB9XHJcblxyXG4gICAgaWYgKHByb3BzLmNoaWxkTm9kZXMpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDAsIGlsID0gcHJvcHMuY2hpbGROb2Rlcy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChwcm9wcy5jaGlsZE5vZGVzW2ldKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhcHBlbmRDaGlsZCAobm9kZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zZXJ0QmVmb3JlKG5vZGUpXHJcbiAgfVxyXG5cclxuICBjbG9uZU5vZGUgKGRlZXAgPSBmYWxzZSkge1xyXG4gICAgY29uc3QgY2xvbmUgPSBjbG9uZU5vZGUodGhpcylcclxuXHJcbiAgICBpZiAoZGVlcCkge1xyXG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBjb25zdCBub2RlID0gZWwuY2xvbmVOb2RlKGRlZXApXHJcbiAgICAgICAgY2xvbmUuYXBwZW5kQ2hpbGQobm9kZSlcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2xvbmVcclxuICB9XHJcblxyXG4gIGNvbnRhaW5zIChub2RlKSB7XHJcbiAgICBpZiAobm9kZSA9PT0gdGhpcykgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgd2hpbGUgKG5vZGUucGFyZW50Tm9kZSkge1xyXG4gICAgICBpZiAobm9kZSA9PT0gdGhpcykgcmV0dXJuIHRydWVcclxuICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICBnZXRSb290Tm9kZSAoKSB7XHJcbiAgICBpZiAoIXRoaXMucGFyZW50Tm9kZSB8fCB0aGlzLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX05PREUpIHJldHVybiB0aGlzXHJcbiAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmdldFJvb3ROb2RlKClcclxuICB9XHJcblxyXG4gIGhhc0NoaWxkTm9kZXMgKCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5jaGlsZE5vZGVzLmxlbmd0aFxyXG4gIH1cclxuXHJcbiAgaW5zZXJ0QmVmb3JlIChub2RlLCBiZWZvcmUpIHtcclxuICAgIGxldCBpbmRleCA9IHRoaXMuY2hpbGROb2Rlcy5pbmRleE9mKGJlZm9yZSlcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgaW5kZXggPSB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSkge1xyXG4gICAgICBsZXQgY2hpbGRcclxuICAgICAgbGV0IG9sZENoaWxkID0gYmVmb3JlXHJcbiAgICAgIHdoaWxlICgoY2hpbGQgPSBub2RlLmNoaWxkTm9kZXMucG9wKCkpKSB7XHJcbiAgICAgICAgdGhpcy5pbnNlcnRCZWZvcmUoY2hpbGQsIG9sZENoaWxkKVxyXG4gICAgICAgIG9sZENoaWxkID0gY2hpbGRcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbm9kZVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChub2RlLnBhcmVudE5vZGUpIHtcclxuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXHJcbiAgICB9XHJcblxyXG4gICAgbm9kZS5wYXJlbnROb2RlID0gdGhpc1xyXG4gICAgLy8gT2JqZWN0LnNldFByb3RvdHlwZU9mKG5vZGUubmFtZXNwYWNlcy5wcm90b3R5cGUsIHRoaXMubmFtZXNwYWNlcy5wcm90b3R5cGUpXHJcblxyXG4gICAgdGhpcy5jaGlsZE5vZGVzLnNwbGljZShpbmRleCwgMCwgbm9kZSlcclxuICAgIHJldHVybiBub2RlXHJcbiAgfVxyXG5cclxuICBpc0RlZmF1bHROYW1lc3BhY2UgKG5hbWVzcGFjZVVSSSkge1xyXG4gICAgc3dpdGNoICh0aGlzLm5vZGVUeXBlKSB7XHJcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxyXG4gICAgICBpZiAoIXRoaXMucHJlZml4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZXNwYWNlVVJJID09PSBuYW1lc3BhY2VVUklcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKCd4bWxucycpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd4bWxucycpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcclxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGUuaXNEZWZhdWx0TmFtZXNwYWNlKG5hbWVzcGFjZVVSSSlcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfTk9ERTpcclxuICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRFbGVtZW50LmlzRGVmYXVsdE5hbWVzcGFjZShuYW1lc3BhY2VVUkkpXHJcbiAgICBjYXNlIE5vZGUuRU5USVRZX05PREU6XHJcbiAgICBjYXNlIE5vZGUuTk9UQVRJT05fTk9ERTpcclxuICAgIGNhc2UgTm9kZS5ET0NVTUVOVF9UWVBFX05PREU6XHJcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERTpcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBjYXNlIE5vZGUuQVRUUklCVVRFX05PREU6XHJcbiAgICAgIGlmICh0aGlzLm93bmVyRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm93bmVyRWxlbWVudC5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgLy8gRW50aXR5UmVmZXJlbmNlcyBtYXkgaGF2ZSB0byBiZSBza2lwcGVkIHRvIGdldCB0byBpdFxyXG4gICAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNFcXVhbE5vZGUgKG5vZGUpIHtcclxuICAgIHRoaXMubm9ybWFsaXplKClcclxuICAgIG5vZGUubm9ybWFsaXplKClcclxuXHJcbiAgICBsZXQgYm9vbCA9IHRoaXMubm9kZU5hbWUgPT09IG5vZGUubm9kZU5hbWVcclxuICAgIGJvb2wgPSBib29sICYmIHRoaXMubG9jYWxOYW1lID09PSBub2RlLmxvY2FsTmFtZVxyXG4gICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5uYW1lc3BhY2VVUkkgPT09IG5vZGUubmFtZXNwYWNlVVJJXHJcbiAgICBib29sID0gYm9vbCAmJiB0aGlzLnByZWZpeCA9PT0gbm9kZS5wcmVmaXhcclxuICAgIGJvb2wgPSBib29sICYmIHRoaXMubm9kZVZhbHVlID09PSBub2RlLm5vZGVWYWx1ZVxyXG5cclxuICAgIGJvb2wgPSBib29sICYmIHRoaXMuY2hpbGROb2Rlcy5sZW5ndGggPT09IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGhcclxuXHJcbiAgICAvLyBkb250IGNoZWNrIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5IHdoZW4gdGhlIGNvdW50IGRvZXNudCBldmVudCBhZGQgdXBcclxuICAgIGlmICghYm9vbCkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgYm9vbCA9IGJvb2wgJiYgIXRoaXMuY2hpbGROb2Rlcy5yZWR1Y2UoKGxhc3QsIGN1cnIsIGluZGV4KSA9PiB7XHJcbiAgICAgIHJldHVybiBsYXN0ICYmIGN1cnIuaXNFcXVhbE5vZGUobm9kZS5jaGlsZE5vZGVzW2luZGV4XSlcclxuICAgIH0sIHRydWUpXHJcblxyXG4gICAgLy8gRklYTUU6IFVzZSBhdHRyIG5vZGVzXHJcbiAgICAvKiBib29sID0gYm9vbCAmJiAhWyAuLi50aGlzLmF0dHJzLmVudHJpZXMoKSBdLnJlZHVjZSgobGFzdCwgY3VyciwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgWyBrZXksIHZhbCBdID0gbm9kZS5hdHRycy5lbnRyaWVzKClcclxuICAgICAgcmV0dXJuIGxhc3QgJiYgY3VyclswXSA9PT0ga2V5ICYmIGN1cnJbMV0gPT09IHZhbFxyXG4gICAgfSwgdHJ1ZSkgKi9cclxuXHJcbiAgICAvKlxyXG4gICAgVE9ETzpcclxuICAgIEZvciB0d28gRG9jdW1lbnRUeXBlIG5vZGVzIHRvIGJlIGVxdWFsLCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgbXVzdCBhbHNvIGJlIHNhdGlzZmllZDpcclxuXHJcbiAgICBUaGUgZm9sbG93aW5nIHN0cmluZyBhdHRyaWJ1dGVzIGFyZSBlcXVhbDogcHVibGljSWQsIHN5c3RlbUlkLCBpbnRlcm5hbFN1YnNldC5cclxuICAgIFRoZSBlbnRpdGllcyBOYW1lZE5vZGVNYXBzIGFyZSBlcXVhbC5cclxuICAgIFRoZSBub3RhdGlvbnMgTmFtZWROb2RlTWFwcyBhcmUgZXF1YWwuXHJcbiAgICAqL1xyXG5cclxuICAgIGlmICh0aGlzLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERSAmJiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERSkge1xyXG4gICAgICBib29sID0gYm9vbCAmJiB0aGlzLnB1YmxpY0lkID09PSBub2RlLnB1YmxpY0lkXHJcbiAgICAgIGJvb2wgPSBib29sICYmIHRoaXMuc3lzdGVtSWQgPT09IG5vZGUuc3lzdGVtSWRcclxuICAgICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5pbnRlcm5hbFN1YnNldCA9PT0gbm9kZS5pbnRlcm5hbFN1YnNldFxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBib29sXHJcbiAgfVxyXG5cclxuICBpc1NhbWVOb2RlIChub2RlKSB7XHJcbiAgICByZXR1cm4gdGhpcyA9PT0gbm9kZVxyXG4gIH1cclxuXHJcbiAgbG9va3VwTmFtZXNwYWNlUHJlZml4IChuYW1lc3BhY2VVUkksIG9yaWdpbmFsRWxlbWVudCkge1xyXG4gICAgaWYgKHRoaXMubmFtZXNwYWNlVVJJICYmIHRoaXMubmFtZXNwYWNlVVJJID09PSBuYW1lc3BhY2VVUkkgJiYgdGhpcy5wcmVmaXhcclxuICAgICAgICAgJiYgb3JpZ2luYWxFbGVtZW50Lmxvb2t1cE5hbWVzcGFjZVVSSSh0aGlzLnByZWZpeCkgPT09IG5hbWVzcGFjZVVSSSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcmVmaXhcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IFsga2V5LCB2YWwgXSBvZiB0aGlzLmF0dHJzLmVudHJpZXMoKSkge1xyXG4gICAgICBpZiAoIWtleS5pbmNsdWRlcygnOicpKSBjb250aW51ZVxyXG5cclxuICAgICAgY29uc3QgWyBhdHRyUHJlZml4LCBuYW1lIF0gPSBrZXkuc3BsaXQoJzonKVxyXG4gICAgICBpZiAoYXR0clByZWZpeCA9PT0gJ3htbG5zJyAmJiB2YWwgPT09IG5hbWVzcGFjZVVSSSAmJiBvcmlnaW5hbEVsZW1lbnQubG9va3VwTmFtZXNwYWNlVVJJKG5hbWUpID09PSBuYW1lc3BhY2VVUkkpIHtcclxuICAgICAgICByZXR1cm4gbmFtZVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRW50aXR5UmVmZXJlbmNlcyBtYXkgaGF2ZSB0byBiZSBza2lwcGVkIHRvIGdldCB0byBpdFxyXG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmxvb2t1cE5hbWVzcGFjZVByZWZpeChuYW1lc3BhY2VVUkksIG9yaWdpbmFsRWxlbWVudClcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG5cclxuICBsb29rdXBOYW1lc3BhY2VVUkkgKHByZWZpeCkge1xyXG4gICAgc3dpdGNoICh0aGlzLm5vZGVUeXBlKSB7XHJcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxyXG4gICAgICBpZiAodGhpcy5uYW1lc3BhY2VVUkkgIT0gbnVsbCAmJiB0aGlzLnByZWZpeCA9PT0gcHJlZml4KSB7XHJcbiAgICAgICAgLy8gTm90ZTogcHJlZml4IGNvdWxkIGJlIFwibnVsbFwiIGluIHRoaXMgY2FzZSB3ZSBhcmUgbG9va2luZyBmb3IgZGVmYXVsdCBuYW1lc3BhY2VcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lc3BhY2VVUklcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChjb25zdCBbIGtleSwgdmFsIF0gb2YgdGhpcy5hdHRycy5lbnRyaWVzKCkpIHtcclxuICAgICAgICBpZiAoIWtleS5pbmNsdWRlcygnOicpKSBjb250aW51ZVxyXG5cclxuICAgICAgICBjb25zdCBbIGF0dHJQcmVmaXgsIG5hbWUgXSA9IGtleS5zcGxpdCgnOicpXHJcbiAgICAgICAgaWYgKGF0dHJQcmVmaXggPT09ICd4bWxucycgJiYgbmFtZSA9PT0gcHJlZml4KSB7XHJcbiAgICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICAgIC8vIEZJWE1FOiBMb29rIHVwIGlmIHByZWZpeCBvciBhdHRyUHJlZml4XHJcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAneG1sbnMnICYmIHByZWZpeCA9PSBudWxsKSB7XHJcbiAgICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcclxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGUubG9va3VwTmFtZXNwYWNlVVJJKHByZWZpeClcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX05PREU6XHJcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudC5sb29rdXBOYW1lc3BhY2VVUkkocHJlZml4KVxyXG4gICAgY2FzZSBOb2RlLkVOVElUWV9OT0RFOlxyXG4gICAgY2FzZSBOb2RlLk5PVEFUSU9OX05PREU6XHJcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfVFlQRV9OT0RFOlxyXG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICBjYXNlIE5vZGUuQVRUUklCVVRFX05PREU6XHJcbiAgICAgIGlmICh0aGlzLm93bmVyRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm93bmVyRWxlbWVudC5sb29rdXBOYW1lc3BhY2VVUkkocHJlZml4KVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAvLyBFbnRpdHlSZWZlcmVuY2VzIG1heSBoYXZlIHRvIGJlIHNraXBwZWQgdG8gZ2V0IHRvIGl0XHJcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmxvb2t1cE5hbWVzcGFjZVVSSShwcmVmaXgpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvb2t1cFByZWZpeCAobmFtZXNwYWNlVVJJKSB7XHJcbiAgICBpZiAoIW5hbWVzcGFjZVVSSSkge1xyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLm5vZGVUeXBlXHJcblxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxyXG4gICAgICByZXR1cm4gdGhpcy5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJLCB0aGlzKVxyXG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX05PREU6XHJcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudC5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJKVxyXG4gICAgY2FzZSBOb2RlLkVOVElUWV9OT0RFIDpcclxuICAgIGNhc2UgTm9kZS5OT1RBVElPTl9OT0RFOlxyXG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XHJcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfVFlQRV9OT0RFOlxyXG4gICAgICByZXR1cm4gbnVsbCAvLyB0eXBlIGlzIHVua25vd25cclxuICAgIGNhc2UgTm9kZS5BVFRSSUJVVEVfTk9ERTpcclxuICAgICAgaWYgKHRoaXMub3duZXJFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3duZXJFbGVtZW50Lmxvb2t1cE5hbWVzcGFjZVByZWZpeChuYW1lc3BhY2VVUkkpXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcclxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGUubG9va3VwTmFtZXNwYWNlUHJlZml4KG5hbWVzcGFjZVVSSSlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbm9ybWFsaXplICgpIHtcclxuICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBbXVxyXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuY2hpbGROb2Rlcykge1xyXG4gICAgICBjb25zdCBsYXN0ID0gY2hpbGROb2Rlcy5zaGlmdCgpXHJcbiAgICAgIGlmICghbGFzdCkge1xyXG4gICAgICAgIGlmIChub2RlLmRhdGEpIHtcclxuICAgICAgICAgIGNoaWxkTm9kZXMudW5zaGlmdChub2RlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb250aW51ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcclxuICAgICAgICBpZiAoIW5vZGUuZGF0YSkge1xyXG4gICAgICAgICAgY2hpbGROb2Rlcy51bnNoaWZ0KGxhc3QpXHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxhc3Qubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XHJcbiAgICAgICAgICBjb25zdCBtZXJnZWQgPSB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGFzdC5kYXRhICsgbm9kZS5kYXRhKVxyXG4gICAgICAgICAgY2hpbGROb2Rlcy5wdXNoKG1lcmdlZClcclxuICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGlsZE5vZGVzLnB1c2gobGFzdCwgbm9kZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoaWxkTm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgbm9kZS5wYXJlbnROb2RlID0gdGhpc1xyXG4gICAgfSlcclxuICAgIHRoaXMuY2hpbGROb2RlcyA9IGNoaWxkTm9kZXNcclxuICAgIC8vIHRoaXMuY2hpbGROb2RlcyA9IHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKCh0ZXh0Tm9kZXMsIG5vZGUpID0+IHtcclxuICAgIC8vICAgLy8gRklYTUU6IElmIGZpcnN0IG5vZGUgaXMgYW4gZW1wdHkgdGV4dG5vZGUsIHdoYXQgZG8gd2UgZG8/IC0+IHNwZWNcclxuICAgIC8vICAgaWYgKCF0ZXh0Tm9kZXMpIHJldHVybiBbIG5vZGUgXVxyXG4gICAgLy8gICB2YXIgbGFzdCA9IHRleHROb2Rlcy5wb3AoKVxyXG5cclxuICAgIC8vICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XHJcbiAgICAvLyAgICAgaWYgKCFub2RlLmRhdGEpIHJldHVybiB0ZXh0Tm9kZXNcclxuXHJcbiAgICAvLyAgICAgaWYgKGxhc3Qubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XHJcbiAgICAvLyAgICAgICBjb25zdCBtZXJnZWQgPSB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGFzdC5kYXRhICsgJyAnICsgbm9kZS5kYXRhKVxyXG4gICAgLy8gICAgICAgdGV4dE5vZGVzLnB1c2gobWVyZ2VkKVxyXG4gICAgLy8gICAgICAgcmV0dXJuIHRleHROb2Rlcy5jb25jYXQobWVyZ2VkKVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfSBlbHNlIHtcclxuICAgIC8vICAgICB0ZXh0Tm9kZXMucHVzaChsYXN0LCBub2RlKVxyXG4gICAgLy8gICB9XHJcblxyXG4gICAgLy8gICByZXR1cm4gdGV4dE5vZGVzXHJcbiAgICAvLyB9LCBudWxsKVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ2hpbGQgKG5vZGUpIHtcclxuXHJcbiAgICBub2RlLnBhcmVudE5vZGUgPSBudWxsXHJcbiAgICAvLyBPYmplY3Quc2V0UHJvdG90eXBlT2Yobm9kZSwgbnVsbClcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGlsZE5vZGVzLmluZGV4T2Yobm9kZSlcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHJldHVybiBub2RlXHJcbiAgICB0aGlzLmNoaWxkTm9kZXMuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgcmV0dXJuIG5vZGVcclxuICB9XHJcblxyXG4gIHJlcGxhY2VDaGlsZCAobmV3Q2hpbGQsIG9sZENoaWxkKSB7XHJcbiAgICBjb25zdCBiZWZvcmUgPSBvbGRDaGlsZC5uZXh0U2libGluZ1xyXG4gICAgdGhpcy5yZW1vdmVDaGlsZChvbGRDaGlsZClcclxuICAgIHRoaXMuaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLCBiZWZvcmUpXHJcbiAgICByZXR1cm4gb2xkQ2hpbGRcclxuICB9XHJcblxyXG4gIGdldCBuZXh0U2libGluZyAoKSB7XHJcbiAgICBjb25zdCBjaGlsZCA9IHRoaXMucGFyZW50Tm9kZSAmJiB0aGlzLnBhcmVudE5vZGUuY2hpbGROb2Rlc1t0aGlzLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5pbmRleE9mKHRoaXMpICsgMV1cclxuICAgIHJldHVybiBjaGlsZCB8fCBudWxsXHJcbiAgfVxyXG5cclxuICBnZXQgcHJldmlvdXNTaWJsaW5nICgpIHtcclxuICAgIGNvbnN0IGNoaWxkID0gdGhpcy5wYXJlbnROb2RlICYmIHRoaXMucGFyZW50Tm9kZS5jaGlsZE5vZGVzW3RoaXMucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmluZGV4T2YodGhpcykgLSAxXVxyXG4gICAgcmV0dXJuIGNoaWxkIHx8IG51bGxcclxuICB9XHJcblxyXG4gIGdldCB0ZXh0Q29udGVudCAoKSB7XHJcbiAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHJldHVybiB0aGlzLmRhdGFcclxuICAgIGlmICh0aGlzLm5vZGVUeXBlID09PSBOb2RlLkNEQVRBX1NFQ1RJT05fTk9ERSkgcmV0dXJuIHRoaXMuZGF0YVxyXG4gICAgaWYgKHRoaXMubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFKSByZXR1cm4gdGhpcy5kYXRhXHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY2hpbGROb2Rlcy5yZWR1Y2UoZnVuY3Rpb24gKGxhc3QsIGN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuIGxhc3QgKyBjdXJyZW50LnRleHRDb250ZW50XHJcbiAgICB9LCAnJylcclxuICB9XHJcblxyXG4gIHNldCB0ZXh0Q29udGVudCAodGV4dCkge1xyXG4gICAgaWYgKHRoaXMubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFIHx8IHRoaXMubm9kZVR5cGUgPT09IE5vZGUuQ0RBVEFfU0VDVElPTl9OT0RFIHx8IHRoaXMubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFKSB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IHRleHRcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLmNoaWxkTm9kZXMgPSBbXVxyXG4gICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpXHJcbiAgfVxyXG5cclxuICBnZXQgbGFzdENoaWxkICgpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkTm9kZXNbdGhpcy5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdIHx8IG51bGxcclxuICB9XHJcblxyXG4gIGdldCBmaXJzdENoaWxkICgpIHtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkTm9kZXNbMF0gfHwgbnVsbFxyXG4gIH1cclxufVxyXG5cclxuZXh0ZW5kU3RhdGljKE5vZGUsIG5vZGVUeXBlcylcclxuZXh0ZW5kKE5vZGUsIG5vZGVUeXBlcylcclxuIiwiaW1wb3J0IHsgZXh0ZW5kU3RhdGljIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlRmlsdGVyIHtcclxuICBhY2NlcHROb2RlICgpIHtcclxuICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFRcclxuICB9XHJcbn1cclxuXHJcbmV4dGVuZFN0YXRpYyhOb2RlRmlsdGVyLCB7XHJcbiAgRklMVEVSX0FDQ0VQVDogMSxcclxuICBGSUxURVJfUkVKRUNUOiAyLFxyXG4gIEZJTFRFUl9JR05PUkU6IDQsXHJcbiAgU0hPV19BTEw6IC0xLFxyXG4gIFNIT1dfRUxFTUVOVDogMSxcclxuICBTSE9XX1RFWFQ6IDQsXHJcbiAgU0hPV19FTlRJVFlfUkVGRVJFTkNFOiAxNixcclxuICBTSE9XX0VOVElUWTogMzIsXHJcbiAgU0hPV19QUk9DRVNTSU5HX0lOU1RSVUNUSU9OOiA2NCxcclxuICBTSE9XX0NPTU1FTlQ6IDEyOCxcclxuICBTSE9XX0RPQ1VNRU5UOiAyNTYsXHJcbiAgU0hPV19ET0NVTUVOVF9UWVBFOiA1MTIsXHJcbiAgU0hPV19ET0NVTUVOVF9GUkFHTUVOVDogMTAyNCxcclxuICBTSE9XX05PVEFUSU9OOiAyMDQ4XHJcbn0pXHJcbiIsImltcG9ydCB7IENoYXJhY3RlckRhdGEgfSBmcm9tICcuL0NoYXJhY3RlckRhdGEuanMnXHJcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIENoYXJhY3RlckRhdGEge1xyXG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcykge1xyXG4gICAgc3VwZXIobmFtZSwgcHJvcHMpXHJcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5URVhUX05PREVcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcclxuaW1wb3J0IHsgRXZlbnRUYXJnZXQgfSBmcm9tICcuL0V2ZW50VGFyZ2V0LmpzJ1xyXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJ1xyXG5pbXBvcnQgeyBEb2N1bWVudCB9IGZyb20gJy4vRG9jdW1lbnQuanMnXHJcbmltcG9ydCB7IERvY3VtZW50RnJhZ21lbnQgfSBmcm9tICcuL0RvY3VtZW50RnJhZ21lbnQuanMnXHJcbmltcG9ydCB7IFRleHQgfSBmcm9tICcuL1RleHQuanMnXHJcbmltcG9ydCB7IEN1c3RvbUV2ZW50IH0gZnJvbSAnLi9DdXN0b21FdmVudC5qcydcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL0V2ZW50LmpzJ1xyXG5pbXBvcnQgeyBFbGVtZW50IH0gZnJvbSAnLi9FbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBBdHRyIH0gZnJvbSAnLi9BdHRyLmpzJ1xyXG5pbXBvcnQgeyBIVE1MSW1hZ2VFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxJbWFnZUVsZW1lbnQuanMnXHJcbmltcG9ydCB7IEhUTUxMaW5rRWxlbWVudCB9IGZyb20gJy4vaHRtbC9IVE1MTGlua0VsZW1lbnQuanMnXHJcbmltcG9ydCB7IEhUTUxTY3JpcHRFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBIVE1MRWxlbWVudCB9IGZyb20gJy4vaHRtbC9IVE1MRWxlbWVudC5qcydcclxuaW1wb3J0IHsgU1ZHUG9pbnQgfSBmcm9tICcuL3N2Zy9TVkdQb2ludC5qcydcclxuaW1wb3J0IHsgU1ZHTWF0cml4IH0gZnJvbSAnLi9zdmcvU1ZHTWF0cml4LmpzJ1xyXG5pbXBvcnQgeyBTVkdFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHRWxlbWVudC5qcydcclxuaW1wb3J0IHsgU1ZHU1ZHRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR1NWR0VsZW1lbnQuanMnXHJcbmltcG9ydCB7IFNWR1BhdGhFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHUGF0aEVsZW1lbnQuanMnXHJcbmltcG9ydCB7IFNWR0dyYXBoaWNzRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcclxuaW1wb3J0IHsgU1ZHVGV4dENvbnRlbnRFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHVGV4dENvbnRlbnRFbGVtZW50LmpzJ1xyXG5pbXBvcnQgeyBjYW1lbENhc2UgfSBmcm9tICcuLi91dGlscy9zdHJVdGlscy5qcydcclxuaW1wb3J0ICogYXMgZGVmYXVsdHMgZnJvbSAnLi4vdXRpbHMvZGVmYXVsdHMuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgV2luZG93IGV4dGVuZHMgRXZlbnRUYXJnZXQge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHN1cGVyKClcclxuICAgIHRoaXMuZG9jdW1lbnQgPSBuZXcgRG9jdW1lbnQoKVxyXG4gICAgdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyA9IHRoaXNcclxuICAgIHRoaXMuc2VsZiA9IHRoaXNcclxuICAgIGNvbnN0IGRvYyA9IHRoaXMuZG9jdW1lbnRcclxuICAgIHRoaXMuSW1hZ2UgPSBjbGFzcyB7XHJcbiAgICAgIGNvbnN0cnVjdG9yICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgY29uc3QgaW1nID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgaWYgKHdpZHRoICE9IG51bGwpIGltZy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgpXHJcbiAgICAgICAgaWYgKGhlaWdodCAhPSBudWxsKSBpbWcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQpXHJcbiAgICAgICAgcmV0dXJuIGltZ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDb21wdXRlZFN0eWxlIChub2RlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAvLyBGSVhNRTogQ3VycmVudGx5IHRoaXMgZnVuY3Rpb24gdHJlYXRzIGV2ZXJ5IGdpdmVuIGF0dHJcclxuICAgICAgLy8gYXMgaW5oZXJpdGFibGUgZnJvbSBpdHMgcGFyZW50cyB3aGljaCBpcyBvZmMgbm90IGFsd2F5cyB0cnVlXHJcbiAgICAgIC8vIGJ1dCBnb29kIGVub3VnaCBmb3Igc3ZnLmpzXHJcbiAgICAgIGdldFByb3BlcnR5VmFsdWUgKGF0dHIpIHtcclxuICAgICAgICBsZXQgdmFsdWVcclxuICAgICAgICBsZXQgY3VyID0gbm9kZVxyXG5cclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICB2YWx1ZSA9IGN1ci5zdHlsZVthdHRyXSB8fCBjdXIuZ2V0QXR0cmlidXRlKGF0dHIpXHJcbiAgICAgICAgfSB3aGlsZSAoXHJcbiAgICAgICAgICB2YWx1ZSA9PSBudWxsXHJcbiAgICAgICAgICAmJiAoY3VyID0gY3VyLnBhcmVudE5vZGUpXHJcbiAgICAgICAgICAmJiBjdXIubm9kZVR5cGUgPT09IDFcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZSB8fCBkZWZhdWx0c1tjYW1lbENhc2UoYXR0cildIHx8IG51bGxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubGV0IGxhc3RUaW1lID0gMFxyXG5jb25zdCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBjYWxsYmFjayA9PiB7XHJcbiAgY29uc3Qgbm93ID0gbmV3IGdsb2JhbC5EYXRlKCkuZ2V0VGltZSgpXHJcbiAgY29uc3QgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKG5vdyAtIGxhc3RUaW1lKSlcclxuICByZXR1cm4gZ2xvYmFsLnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgbGFzdFRpbWUgPSBub3cgKyB0aW1lVG9DYWxsXHJcbiAgICBjYWxsYmFjayhsYXN0VGltZSlcclxuICB9LCB0aW1lVG9DYWxsKVxyXG59XHJcblxyXG5jb25zdCBub3dPZmZzZXQgPSBnbG9iYWwuRGF0ZS5ub3coKVxyXG5jb25zdCBwZXJmb3JtYW5jZSA9IHtcclxuICBub3c6ICgpID0+IERhdGUubm93KCkgLSBub3dPZmZzZXRcclxufVxyXG5cclxuY29uc3Qgd2luUHJvcHMgPSB7XHJcbiAgV2luZG93LFxyXG4gIERvY3VtZW50LFxyXG4gIERvY3VtZW50RnJhZ21lbnQsXHJcbiAgTm9kZSxcclxuICBFdmVudFRhcmdldCxcclxuICBUZXh0LFxyXG4gIEF0dHIsXHJcbiAgRWxlbWVudCxcclxuICBDdXN0b21FdmVudCxcclxuICBFdmVudCxcclxuICBIVE1MRWxlbWVudCxcclxuICBIVE1MTGlua0VsZW1lbnQsXHJcbiAgSFRNTFNjcmlwdEVsZW1lbnQsXHJcbiAgSFRNTEltYWdlRWxlbWVudCxcclxuICAvLyBJbWFnZTogSFRNTEltYWdlRWxlbWVudCwgLy8gaXMgc2V0IG9uIGNvbnN0cnVjdGlvblxyXG4gIFNWR01hdHJpeCxcclxuICBTVkdQb2ludCxcclxuICBTVkdFbGVtZW50LFxyXG4gIFNWR1NWR0VsZW1lbnQsXHJcbiAgU1ZHUGF0aEVsZW1lbnQsXHJcbiAgU1ZHR3JhcGhpY3NFbGVtZW50LFxyXG4gIFNWR1RleHRDb250ZW50RWxlbWVudCxcclxuICBzZXRUaW1lb3V0OiBnbG9iYWwuc2V0VGltZW91dCxcclxuICBjbGVhclRpbWVvdXQ6IGdsb2JhbC5jbGVhclRpbWVvdXQsXHJcbiAgcGFnZVhPZmZzZXQ6IDAsXHJcbiAgcGFnZVlPZmZzZXQ6IDAsXHJcbiAgRGF0ZTogZ2xvYmFsLkRhdGUsXHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLFxyXG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lOiBnbG9iYWwuY2xlYXJUaW1lb3V0LFxyXG4gIHBlcmZvcm1hbmNlXHJcbn1cclxuXHJcbmV4dGVuZChXaW5kb3csIHdpblByb3BzKVxyXG4iLCJpbXBvcnQgeyBFbGVtZW50IH0gZnJvbSAnLi4vRWxlbWVudC5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBIVE1MRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge31cclxuIiwiaW1wb3J0IHNpemVPZiBmcm9tICdpbWFnZS1zaXplJ1xyXG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4uL0V2ZW50LmpzJ1xyXG5pbXBvcnQgeyBIVE1MRWxlbWVudCB9IGZyb20gJy4vSFRNTEVsZW1lbnQuanMnXHJcbi8vIGltcG9ydCB7IGdldEZpbGVCdWZmZXJGcm9tVVJMIH0gZnJvbSAnLi4vLi4vdXRpbHMvZmlsZVVybFRvQnVmZmVyLmpzJ1xyXG4vLyBpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEhUTUxJbWFnZUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcbiAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcclxuICAgIHN1cGVyKC4uLmFyZ3MpXHJcbiAgICB0aGlzLm5hdHVyYWxXaWR0aCA9IDBcclxuICAgIHRoaXMubmF0dXJhbEhlaWdodCA9IDBcclxuICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZVxyXG4gIH1cclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoSFRNTEltYWdlRWxlbWVudC5wcm90b3R5cGUsIHtcclxuICBzcmM6IHtcclxuICAgIGdldCAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc3JjJylcclxuICAgIH0sXHJcbiAgICBzZXQgKHZhbCkge1xyXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3JjJywgdmFsKVxyXG4gICAgICAvLyBjb25zdCB1cmwgPSBwYXRoLnJlc29sdmUodGhpcy5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmxvY2F0aW9uLCB2YWwpXHJcbiAgICAgIC8vIGdldEZpbGVCdWZmZXJGcm9tVVJMKHVybCwgKGJ1ZmZlcikgPT4ge1xyXG4gICAgICBzaXplT2YodmFsLCAoZXJyLCBzaXplKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnZXJyb3InKSlcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdHVyYWxXaWR0aCA9IHNpemUud2lkdGhcclxuICAgICAgICB0aGlzLm5hdHVyYWxIZWlnaHQgPSBzaXplLmhlaWdodFxyXG4gICAgICAgIHRoaXMuY29tcGxldGUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9hZCcpKVxyXG4gICAgICB9KVxyXG4gICAgICAvLyB9KVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgaGVpZ2h0OiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpIHx8IHRoaXMubmF0dXJhbEhlaWdodFxyXG4gICAgfSxcclxuICAgIHNldCAodmFsKSB7XHJcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB2YWwpXHJcbiAgICB9XHJcbiAgfSxcclxuICB3aWR0aDoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd3aWR0aCcpIHx8IHRoaXMubmF0dXJhbFdpZHRoXHJcbiAgICB9LFxyXG4gICAgc2V0ICh2YWwpIHtcclxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdmFsKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIiwiaW1wb3J0IHsgSFRNTEVsZW1lbnQgfSBmcm9tICcuL0hUTUxFbGVtZW50LmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEhUTUxMaW5rRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHt9XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhIVE1MTGlua0VsZW1lbnQucHJvdG90eXBlLCB7XHJcbiAgaHJlZjoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJylcclxuICAgIH0sXHJcbiAgICBzZXQgKHZhbCkge1xyXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnaHJlZicsIHZhbClcclxuICAgIH1cclxuICB9LFxyXG4gIHJlbDoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdyZWwnKVxyXG4gICAgfSxcclxuICAgIHNldCAodmFsKSB7XHJcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdyZWwnLCB2YWwpXHJcbiAgICB9XHJcbiAgfSxcclxuICB0eXBlOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3R5cGUnKVxyXG4gICAgfSxcclxuICAgIHNldCAodmFsKSB7XHJcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0eXBlJywgdmFsKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIiwiaW1wb3J0IHNheCBmcm9tICdzYXgnXHJcblxyXG4vLyBUT0RPOiBJdHMgYW4gWE1MUGFyc2VyIG5vdCBIVE1MUGFyc2VyISFcclxuZXhwb3J0IGNvbnN0IEhUTUxQYXJzZXIgPSBmdW5jdGlvbiAoc3RyLCBlbCkge1xyXG4gIGxldCBjdXJyZW50VGFnID0gZWxcclxuICAvLyBjb25zdCBuYW1lc3BhY2VzID0geyB4bWxuczogZWwuZ2V0QXR0cmlidXRlKCd4bWxucycpIH1cclxuICBsZXQgZG9jdW1lbnQgPSBlbC5vd25lckRvY3VtZW50XHJcbiAgbGV0IGNkYXRhID0gbnVsbFxyXG5cclxuICAvLyBzYXggZXhwZWN0cyBhIHJvb3QgZWxlbWVudCBidXQgd2UgYWxzbyBtaXNzdXNlIGl0IHRvIHBhcnNlIGZyYWdtZW50c1xyXG4gIGlmIChlbC5ub2RlVHlwZSAhPT0gZWwuRE9DVU1FTlRfTk9ERSkge1xyXG4gICAgc3RyID0gJzxzdmdkb206d3JhcHBlciB4bWxuczpzdmdkb209XCJzdmdkb206cm9ja3NcIj4nICsgc3RyICsgJzwvc3ZnZG9tOndyYXBwZXI+J1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudCA9IGVsXHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJzZXIgPSBzYXgucGFyc2VyKHRydWUsIHtcclxuICAgIC8vIGxvd2VyY2FzZTogdHJ1ZSxcclxuICAgIHhtbG5zOiB0cnVlLFxyXG4gICAgc3RyaWN0RW50aXRpZXM6IHRydWVcclxuICB9KVxyXG5cclxuICBwYXJzZXIub25lcnJvciA9IChlKSA9PiB7XHJcbiAgICB0aHJvdyBlXHJcbiAgfVxyXG5cclxuICBwYXJzZXIub25kb2N0eXBlID0gKHN0cikgPT4ge1xyXG4gICAgaWYgKGN1cnJlbnRUYWcgIT09IGRvY3VtZW50KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRG9jdHlwZSBjYW4gb25seSBiZSBhcHBlbmRlZCB0byBkb2N1bWVudCcpXHJcbiAgICB9XHJcbiAgICBjdXJyZW50VGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50VHlwZSgpKVxyXG4gIH1cclxuXHJcbiAgcGFyc2VyLm9udGV4dCA9IChzdHIpID0+IGN1cnJlbnRUYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyKSlcclxuICBwYXJzZXIub25jb21tZW50ID0gKHN0cikgPT4gY3VycmVudFRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVDb21tZW50KHN0cikpXHJcblxyXG4gIC8vIHBhcnNlci5vbm9wZW5uYW1lc3BhY2UgPSBucyA9PiB7XHJcbiAgLy8gICBuYW1lc3BhY2VzW25zLnByZWZpeF0gPSBucy51cmlcclxuICAvLyB9XHJcbiAgLy8gcGFyc2VyLm9uY2xvc2VuYW1lc3BhY2UgPSBucyA9PiB7XHJcbiAgLy8gICBkZWxldGUgbmFtZXNwYWNlc1tucy5wcmVmaXhdXHJcbiAgLy8gfVxyXG5cclxuICBwYXJzZXIub25vcGVudGFnID0gbm9kZSA9PiB7XHJcbiAgICBpZiAobm9kZS5uYW1lID09PSAnc3ZnZG9tOndyYXBwZXInKSByZXR1cm5cclxuXHJcbiAgICBjb25zdCBhdHRycyA9IG5vZGUuYXR0cmlidXRlc1xyXG5cclxuICAgIGNvbnN0IHVyaSA9IG5vZGUudXJpIHx8IGN1cnJlbnRUYWcubG9va3VwTmFtZXNwYWNlVVJJKG5vZGUucHJlZml4IHx8IG51bGwpXHJcblxyXG4gICAgdmFyIG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlModXJpLCBub2RlLm5hbWUpXHJcblxyXG4gICAgZm9yIChjb25zdCBbIG5hbWUsIG5vZGUgXSBvZiBPYmplY3QuZW50cmllcyhhdHRycykpIHtcclxuICAgICAgbmV3RWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhub2RlLnVyaSwgbmFtZSwgbm9kZS52YWx1ZSlcclxuICAgIH1cclxuXHJcbiAgICBjdXJyZW50VGFnLmFwcGVuZENoaWxkKG5ld0VsZW1lbnQpXHJcbiAgICBjdXJyZW50VGFnID0gbmV3RWxlbWVudFxyXG4gIH1cclxuXHJcbiAgcGFyc2VyLm9uY2xvc2V0YWcgPSB0YWdOYW1lID0+IHtcclxuICAgIGlmICh0YWdOYW1lID09PSAnc3ZnZG9tOndyYXBwZXInKSByZXR1cm5cclxuXHJcbiAgICBjdXJyZW50VGFnID0gY3VycmVudFRhZy5wYXJlbnROb2RlXHJcbiAgfVxyXG5cclxuICBwYXJzZXIub25vcGVuY2RhdGEgPSAoKSA9PiB7XHJcbiAgICBjZGF0YSA9IGRvY3VtZW50LmNyZWF0ZUNEQVRBU2VjdGlvbignJylcclxuICB9XHJcblxyXG4gIHBhcnNlci5vbmNkYXRhID0gKHN0cikgPT4ge1xyXG4gICAgY2RhdGEuYXBwZW5kRGF0YShzdHIpXHJcbiAgfVxyXG5cclxuICBwYXJzZXIub25jbG9zZWNkYXRhID0gKCkgPT4ge1xyXG4gICAgY3VycmVudFRhZy5hcHBlbmRDaGlsZChjZGF0YSlcclxuICB9XHJcblxyXG4gIHBhcnNlci53cml0ZShzdHIpXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IEhUTUxFbGVtZW50IH0gZnJvbSAnLi9IVE1MRWxlbWVudC5qcydcclxuZXhwb3J0IGNsYXNzIEhUTUxTY3JpcHRFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge31cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEhUTUxTY3JpcHRFbGVtZW50LnByb3RvdHlwZSwge1xyXG4gIHNyYzoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKVxyXG4gICAgfSxcclxuICAgIHNldCAodmFsKSB7XHJcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzcmMnLCB2YWwpXHJcbiAgICB9XHJcbiAgfSxcclxuICB0eXBlOiB7XHJcbiAgICBnZXQgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3R5cGUnKVxyXG4gICAgfSxcclxuICAgIHNldCAodmFsKSB7XHJcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0eXBlJywgdmFsKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIiwiaW1wb3J0IHsgbm9kZXNUb05vZGUgfSBmcm9tICcuLi8uLi91dGlscy9ub2Rlc1RvTm9kZS5qcydcclxuXHJcbi8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jaW50ZXJmYWNlLWNoaWxkbm9kZVxyXG4vLyBUb2RvOiBjaGVjayBpZiB0aGlzIGlzIGNvbnRhaW5lZCBpbiBub2RlcyBvciBzaWJsaW5ncyBhcmUgY29udGFpbmVkICh2aWFibGVQcmV2aW91c1NpYmxpbmcsIHZpYWJsZU5leHRTaWJsaW5nKVxyXG5leHBvcnQgY29uc3QgQ2hpbGROb2RlID0ge1xyXG4gIGJlZm9yZSAobm9kZXMpIHtcclxuICAgIGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm5cclxuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1RvTm9kZShub2RlcywgdGhpcy5vd25lckRvY3VtZW50KVxyXG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHRoaXMpXHJcbiAgfSxcclxuICBhZnRlciAobm9kZXMpIHtcclxuICAgIGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm5cclxuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1RvTm9kZShub2RlcywgdGhpcy5vd25lckRvY3VtZW50KVxyXG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHRoaXMubmV4dFNpYmxpbmcpXHJcbiAgfSxcclxuICByZXBsYWNlV2l0aCAobm9kZXMpIHtcclxuICAgIGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm5cclxuICAgIGNvbnN0IG5leHQgPSB0aGlzLm5leHRTaWJsaW5nXHJcbiAgICB0aGlzLmRlbGV0ZSgpXHJcbiAgICBjb25zdCBub2RlID0gbm9kZXNUb05vZGUobm9kZXMpXHJcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgbmV4dClcclxuICB9LFxyXG4gIHJlbW92ZSAoKSB7XHJcbiAgICBpZiAoIXRoaXMucGFyZW50Tm9kZSkgcmV0dXJuXHJcbiAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcylcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZSA9IHtcclxuXHJcbn1cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZSwge1xyXG4gIHByZXZpb3VzRWxlbWVudFNpYmxpbmc6IHtcclxuICAgIGdldCAoKSB7XHJcbiAgICAgIGxldCBub2RlXHJcbiAgICAgIHdoaWxlICgobm9kZSA9IHRoaXMucHJldmlvdXNTaWJsaW5nKSkge1xyXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBub2RlLkVMRU1FTlRfTk9ERSkge1xyXG4gICAgICAgICAgcmV0dXJuIG5vZGVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGxcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBuZXh0RWxlbWVudFNpYmxpbmc6IHtcclxuICAgIGdldCAoKSB7XHJcbiAgICAgIGxldCBub2RlXHJcbiAgICAgIHdoaWxlICgobm9kZSA9IHRoaXMubmV4dFNpYmxpbmcpKSB7XHJcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICAgICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIiwiaW1wb3J0IHsgTm9kZUl0ZXJhdG9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvTm9kZUl0ZXJhdG9yLmpzJ1xyXG5pbXBvcnQgeyBOb2RlRmlsdGVyIH0gZnJvbSAnLi4vTm9kZUZpbHRlci5qcydcclxuXHJcbi8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jaW50ZXJmYWNlLW5vbmVsZW1lbnRwYXJlbnRub2RlXHJcbmV4cG9ydCBjb25zdCBOb25FbGVtZW50UGFyZW50Tm9kZSA9IHtcclxuICBnZXRFbGVtZW50QnlJZCAoaWQpIHtcclxuICAgIGNvbnN0IGl0ZXIgPSBuZXcgTm9kZUl0ZXJhdG9yKHRoaXMsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCAobm9kZSkgPT4gaWQgPT09IG5vZGUuaWQgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUsIGZhbHNlKVxyXG4gICAgZm9yIChjb25zdCBub2RlIG9mIGl0ZXIpIHtcclxuICAgICAgcmV0dXJuIG5vZGVcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENzc1F1ZXJ5IH0gZnJvbSAnLi4vLi4vb3RoZXIvQ3NzUXVlcnkuanMnXHJcbmltcG9ydCB7IE5vZGVJdGVyYXRvciB9IGZyb20gJy4uLy4uL3V0aWxzL05vZGVJdGVyYXRvci5qcydcclxuaW1wb3J0IHsgTm9kZUZpbHRlciB9IGZyb20gJy4uL05vZGVGaWx0ZXIuanMnXHJcbmltcG9ydCB7IG5vZGVzVG9Ob2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvbm9kZXNUb05vZGUuanMnXHJcblxyXG4vLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI3BhcmVudG5vZGVcclxuY29uc3QgUGFyZW50Tm9kZSA9IHtcclxuICBtYXRjaFdpdGhTY29wZSAocXVlcnksIHNjb3BlKSB7XHJcbiAgICByZXR1cm4gbmV3IENzc1F1ZXJ5KHF1ZXJ5KS5tYXRjaGVzKHRoaXMsIHNjb3BlKVxyXG4gIH0sXHJcblxyXG4gIHF1ZXJ5IChxdWVyeSwgc2NvcGUsIHNpbmdsZSA9IGZhbHNlKSB7XHJcblxyXG4gICAgY29uc3QgaXRlciA9IG5ldyBOb2RlSXRlcmF0b3Ioc2NvcGUsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCAobm9kZSkgPT4gbm9kZS5tYXRjaFdpdGhTY29wZShxdWVyeSwgc2NvcGUpID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFLCBmYWxzZSlcclxuXHJcbiAgICBjb25zdCBub2RlcyA9IFtdXHJcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgaXRlcikge1xyXG4gICAgICBub2Rlcy5wdXNoKG5vZGUpXHJcbiAgICAgIGlmIChzaW5nbGUpIHJldHVybiBub2Rlc1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBub2Rlc1xyXG4gIH0sXHJcblxyXG4gIHF1ZXJ5U2VsZWN0b3JBbGwgKHF1ZXJ5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5xdWVyeShxdWVyeSwgdGhpcylcclxuICB9LFxyXG5cclxuICBxdWVyeVNlbGVjdG9yIChxdWVyeSkge1xyXG4gICAgcmV0dXJuIHRoaXMucXVlcnkocXVlcnksIHRoaXMsIHRydWUpWzBdIHx8IG51bGxcclxuICB9LFxyXG5cclxuICBwcmVwZW5kIChub2Rlcykge1xyXG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXHJcblxyXG4gICAgdGhpcy5pbnNlcnRCZWZvcmUobm9kZSwgdGhpcy5maXJzdENoaWxkKVxyXG4gIH0sXHJcblxyXG4gIGFwcGVuZCAobm9kZXMpIHtcclxuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1RvTm9kZShub2RlcywgdGhpcy5vd25lckRvY3VtZW50KVxyXG4gICAgdGhpcy5hcHBlbmRDaGlsZChub2RlKVxyXG4gIH0sXHJcblxyXG4gIHJlcGxhY2VDaGlsZHJlbiAobm9kZXMpIHtcclxuICAgIHdoaWxlICh0aGlzLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmZpcnN0Q2hpbGQpXHJcbiAgICB9XHJcbiAgICB0aGlzLmFwcGVuZChub2RlcylcclxuICB9XHJcbn1cclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFBhcmVudE5vZGUsIHtcclxuICBjaGlsZHJlbjoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGROb2Rlcy5maWx0ZXIoZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuICBmaXJzdEVsZW1lbnRDaGlsZDoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuY2hpbGROb2Rlcykge1xyXG4gICAgICAgIGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICAgICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbGFzdEVsZW1lbnRDaGlsZDoge1xyXG4gICAgZ2V0ICgpIHtcclxuICAgICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuY2hpbGROb2Rlcy5zbGljZSgpLnJldmVyc2UoKSkge1xyXG4gICAgICAgIGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICAgICAgICByZXR1cm4gbm9kZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2hpbGRFbGVtZW50Q291bnQ6IHtcclxuICAgIGdldCAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aFxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbmV4cG9ydCB7IFBhcmVudE5vZGUgfVxyXG4iLCJpbXBvcnQgeyBOb2RlRmlsdGVyIH0gZnJvbSAnLi4vTm9kZUZpbHRlci5qcydcclxuaW1wb3J0IHsgTm9kZUl0ZXJhdG9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvTm9kZUl0ZXJhdG9yLmpzJ1xyXG5cclxuY29uc3QgaGFzQ2xhc3MgPSAobm9kZSwgbmFtZSkgPT4ge1xyXG4gIGNvbnN0IGNsYXNzTGlzdCA9IG5vZGUuY2xhc3NOYW1lLnNwbGl0KC9cXHMrLylcclxuICByZXR1cm4gY2xhc3NMaXN0LmluY2x1ZGVzKG5hbWUpXHJcbn1cclxuXHJcbmNvbnN0IGVsZW1lbnRBY2Nlc3MgPSB7XHJcbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWUgKG5hbWUpIHtcclxuICAgIC8vIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50XHJcbiAgICBjb25zdCBpdGVyID0gbmV3IE5vZGVJdGVyYXRvcih0aGlzLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCwgKG5vZGUpID0+IG5vZGUubm9kZU5hbWUgPT09IG5hbWUgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUsIGZhbHNlKVxyXG4gICAgLy8gY29uc3QgaXRlciA9IGRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcih0aGlzLCAxLCAobm9kZSkgPT4gbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSlcclxuICAgIHJldHVybiBbIC4uLml0ZXIgXVxyXG4gIH0sXHJcblxyXG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lTlMgKG5zLCBuYW1lKSB7XHJcbiAgICAvLyBjb25zdCBkb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudFxyXG4gICAgY29uc3QgaXRlciA9IG5ldyBOb2RlSXRlcmF0b3IodGhpcywgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIChub2RlKSA9PiBub2RlLmlzTmFtZXNwYWNlKG5zKSAmJiBub2RlLm5vZGVOYW1lID09PSBuYW1lID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFLCBmYWxzZSlcclxuICAgIC8vIGNvbnN0IGl0ZXIgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3IodGhpcywgMSwgKG5vZGUpID0+IG5vZGUuaXNOYW1lc3BhY2UobnMpICYmIG5vZGUubm9kZU5hbWUgPT09IG5hbWUgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUpXHJcbiAgICByZXR1cm4gWyAuLi5pdGVyIF1cclxuICB9LFxyXG5cclxuICBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIChuYW1lKSB7XHJcbiAgICAvLyBjb25zdCBkb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudFxyXG4gICAgY29uc3QgaXRlciA9IG5ldyBOb2RlSXRlcmF0b3IodGhpcywgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIChub2RlKSA9PiBoYXNDbGFzcyhub2RlLCBuYW1lKSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSwgZmFsc2UpXHJcbiAgICAvLyBjb25zdCBpdGVyID0gZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKHRoaXMsIDEsIChub2RlKSA9PiBoYXNDbGFzcyhub2RlLCBuYW1lKSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSlcclxuICAgIHJldHVybiBbIC4uLml0ZXIgXVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgZWxlbWVudEFjY2VzcyB9XHJcbiIsImltcG9ydCB7IEVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50LmpzJ1xyXG5leHBvcnQgY2xhc3MgU1ZHRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xyXG4gIGdldCBvd25lclNWR0VsZW1lbnQgKCkge1xyXG4gICAgbGV0IHBhcmVudCA9IHRoaXNcclxuICAgIHdoaWxlICgocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUpKSB7XHJcbiAgICAgIGlmICgnc3ZnJyA9PSBwYXJlbnQubm9kZU5hbWUpIHtcclxuICAgICAgICByZXR1cm4gcGFyZW50XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG5cclxuICBnZXQgdmlld3BvcnRFbGVtZW50ICgpIHtcclxuICAgIGxldCBwYXJlbnQgPSB0aGlzXHJcbiAgICB3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlKSkge1xyXG4gICAgICAvLyBUT0RPOiBhbmQgb3RoZXJzXHJcbiAgICAgIGlmIChbICdzdmcnLCAnc3ltYm9sJyBdLmluY2x1ZGVzKHBhcmVudC5ub2RlTmFtZSkpIHtcclxuICAgICAgICByZXR1cm4gcGFyZW50XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFNWR0VsZW1lbnQgfSBmcm9tICcuL1NWR0VsZW1lbnQuanMnXHJcbmltcG9ydCB7IGdldFNlZ21lbnRzIH0gZnJvbSAnLi4vLi4vdXRpbHMvYmJveFV0aWxzLmpzJ1xyXG5pbXBvcnQgKiBhcyByZWdleCBmcm9tICcuLi8uLi91dGlscy9yZWdleC5qcydcclxuaW1wb3J0IHsgU1ZHTWF0cml4IH0gZnJvbSAnLi9TVkdNYXRyaXguanMnXHJcblxyXG4vLyBNYXAgbWF0cml4IGFycmF5IHRvIG9iamVjdFxyXG5mdW5jdGlvbiBhcnJheVRvTWF0cml4IChhKSB7XHJcbiAgcmV0dXJuIHsgYTogYVswXSwgYjogYVsxXSwgYzogYVsyXSwgZDogYVszXSwgZTogYVs0XSwgZjogYVs1XSB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTVkdHcmFwaGljc0VsZW1lbnQgZXh0ZW5kcyBTVkdFbGVtZW50IHtcclxuICAvLyBUT0RPOiBodHRwczovL3d3dy53My5vcmcvVFIvU1ZHMi9jb29yZHMuaHRtbCNDb21wdXRpbmdBVmlld3BvcnRzVHJhbnNmb3JtXHJcbiAgZ2VuZXJhdGVWaWV3Qm94TWF0cml4ICgpIHtcclxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvdmlld0JveFxyXG4gICAgaWYgKCFbICdtYXJrZXInLCAnc3ltYm9sJywgJ3BhdHRlcm4nLCAnc3ZnJywgJ3ZpZXcnIF0uaW5jbHVkZXModGhpcy5ub2RlTmFtZSkpIHtcclxuICAgICAgcmV0dXJuIG5ldyBTVkdNYXRyaXgoKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB2aWV3ID0gKHRoaXMuZ2V0QXR0cmlidXRlKCd2aWV3Qm94JykgfHwgJycpLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikubWFwKHBhcnNlRmxvYXQpLmZpbHRlcihlbCA9PiAhaXNOYU4oZWwpKVxyXG4gICAgY29uc3Qgd2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKSB8fCAwXHJcbiAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKSkgfHwgMFxyXG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyaWJ1dGUoJ3gnKSkgfHwgMFxyXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyaWJ1dGUoJ3knKSkgfHwgMFxyXG5cclxuICAgIC8vIFRPRE86IElmIG5vIHdpZHRoIGFuZCBoZWlnaHQgaXMgZ2l2ZW4sIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIG91dGVyIHN2ZyBlbGVtZW50IGlzIHVzZWRcclxuICAgIGlmICghd2lkdGggfHwgIWhlaWdodCkge1xyXG4gICAgICByZXR1cm4gbmV3IFNWR01hdHJpeCgpLnRyYW5zbGF0ZSh4LCB5KVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWV3Lmxlbmd0aCAhPT0gNCkge1xyXG4gICAgICB2aWV3ID0gWyAwLCAwLCB3aWR0aCwgaGVpZ2h0IF1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmaXJzdCBhcHBseSB4IGFuZCB5IGlmIG5lc3RlZCwgdGhlbiB2aWV3Ym94IHNjYWxlLCB0aGVuIHZpZXdCb3ggbW92ZVxyXG4gICAgcmV0dXJuIG5ldyBTVkdNYXRyaXgoKS50cmFuc2xhdGUoeCwgeSkuc2NhbGUod2lkdGggLyB2aWV3WzJdLCBoZWlnaHQgLyB2aWV3WzNdKS50cmFuc2xhdGUoLXZpZXdbMF0sIC12aWV3WzFdKVxyXG4gIH1cclxuXHJcbiAgZ2V0QkJveCAoKSB7XHJcbiAgICByZXR1cm4gZ2V0U2VnbWVudHModGhpcykuYmJveCgpXHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBUaGlzIG1ldGhvZCBhY3R1YWxseSBleGlzdHMgb24gYWxsIEVsZW1lbnRzXHJcbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICgpIHtcclxuICAgIC8vIFRoZSBib3VuZGluZyBjbGllbnQgcmVjdCB0YWtlcyB0aGUgc2NyZWVuIGN0bSBvZiB0aGUgZWxlbWVudFxyXG4gICAgLy8gYW5kIGNvbnZlcnRzIHRoZSBib3VuZGluZyBib3ggd2l0aCBpdFxyXG5cclxuICAgIC8vIGhvd2V2ZXIsIG5vcm1hbCBib3VuZGluZyBjb25zaXN0cyBvZjpcclxuICAgIC8vIC0gYWxsIGNoaWxkcmVuIHRyYW5zZm9ybWVkXHJcbiAgICAvLyAtIHRoZSB2aWV3Ym94IG9mIHRoZSBlbGVtZW50IGlmIGF2YWlsYWJsZVxyXG5cclxuICAgIC8vIFRoZSBib3VuZGluZ0NsaWVudFJlY3QgaXMgbm90IGFmZmVjdGVkIGJ5IGl0cyBvd24gdmlld2JveFxyXG4gICAgLy8gU28gd2UgYXBwbHkgb25seSBvdXIgb3duIHRyYW5zZm9ybWF0aW9ucyBhbmQgcGFyZW50cyBzY3JlZW5DVE1cclxuXHJcbiAgICBsZXQgbSA9IHRoaXMubWF0cml4aWZ5KClcclxuXHJcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlICYmIHRoaXMucGFyZW50Tm9kZS5ub2RlTmFtZSAhPT0gJyNkb2N1bWVudCcpIHtcclxuICAgICAgbSA9IHRoaXMucGFyZW50Tm9kZS5nZXRTY3JlZW5DVE0oKS5tdWx0aXBseShtKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGxldCBtID0gdGhpcy5nZXRTY3JlZW5DVE0oKVxyXG5cclxuICAgIC8vIFRoZXJlIGFyZSBhIGZldyBleHRyYSBydWxlcyByZWdhcmRpbmcgcmJveCBhbmQgdGhlIDxzdmc+IGVsZW1lbnRcclxuICAgIC8vIE5hbWVseSB0aGlzIGlzOlxyXG4gICAgLy8gQkJveCBpcyBjYWxjdWxhdGVkIGFzIG5vcm1hbCBmb3IgY29udGFpbmVyIGVsZW1lbnRzXHJcbiAgICAvLyBSYm94IGlzIGNhbGN1bGF0ZWQgd2l0aCB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgPHN2Zz5cclxuICAgIC8vIFRoaXMgY291bGQgYmUgYWxzbyB0cnVlIGZvciBzeW1ib2xzIHNvIHRoaXMgaXMgYTpcclxuICAgIC8vIFRvZG86IC4uLlxyXG4gICAgcmV0dXJuIGdldFNlZ21lbnRzKHRoaXMsIGZhbHNlLCB0cnVlKS50cmFuc2Zvcm0obSkuYmJveCgpXHJcbiAgfVxyXG5cclxuICBnZXRDVE0gKCkge1xyXG4gICAgbGV0IG0gPSB0aGlzLm1hdHJpeGlmeSgpXHJcblxyXG4gICAgbGV0IG5vZGUgPSB0aGlzXHJcbiAgICB3aGlsZSAoKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSB7XHJcbiAgICAgIGlmIChbICdzdmcnLCAnc3ltYm9sJywgJ2ltYWdlJywgJ3BhdHRlcm4nLCAnbWFya2VyJyBdLmluZGV4T2Yobm9kZS5ub2RlTmFtZSkgPiAtMSkgYnJlYWtcclxuICAgICAgbSA9IG0ubXVsdGlwbHkobm9kZS5tYXRyaXhpZnkoKSlcclxuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQnKSByZXR1cm4gdGhpcy5nZXRTY3JlZW5DVE0oKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBub2RlLmdlbmVyYXRlVmlld0JveE1hdHJpeCgpLm11bHRpcGx5KG0pXHJcbiAgfVxyXG5cclxuICBnZXRJbm5lck1hdHJpeCAoKSB7XHJcbiAgICBsZXQgbSA9IHRoaXMubWF0cml4aWZ5KClcclxuXHJcbiAgICBpZiAoWyAnc3ZnJywgJ3N5bWJvbCcsICdpbWFnZScsICdwYXR0ZXJuJywgJ21hcmtlcicgXS5pbmRleE9mKHRoaXMubm9kZU5hbWUpID4gLTEpIHtcclxuICAgICAgbSA9IHRoaXMuZ2VuZXJhdGVWaWV3Qm94TWF0cml4KCkubXVsdGlwbHkobSlcclxuICAgIH1cclxuICAgIHJldHVybiBtXHJcbiAgfVxyXG5cclxuICBnZXRTY3JlZW5DVE0gKCkge1xyXG4gICAgLy8gcmVmOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzQ0NTM3XHJcbiAgICAvLyBXZSBmb2xsb3cgQ2hyb21lcyBiZWhhdmlvciBhbmQgaW5jbHVkZSB0aGUgdmlld2JveCBpbiB0aGUgc2NyZWVuQ1RNXHJcbiAgICBjb25zdCBtID0gdGhpcy5nZXRJbm5lck1hdHJpeCgpXHJcblxyXG4gICAgLy8gVE9ETzogV2UgaGF2ZSB0byBsb29wIHVudGlsIGRvY3VtZW50LCBob3dldmVyIGh0bWwgZWxlbWVudHMgZG9udCBoYXZlIGdldFNjcmVlbkNUTSBpbXBsZW1lbnRlZFxyXG4gICAgLy8gdGhleSBhbHNvIGRvbnQgaGF2ZSBhIHRyYW5zZm9ybSBhdHRyaWJ1dGUuIFRoZXJlZm9yZSB3ZSBuZWVkIGEgZGlmZmVyZW50IHdheSBvZiBmaWd1cmluZyBvdXQgdGhlaXIgKGNzcykgdHJhbnNmb3JtXHJcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlICYmIHRoaXMucGFyZW50Tm9kZSBpbnN0YW5jZW9mIFNWR0dyYXBoaWNzRWxlbWVudCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmdldFNjcmVlbkNUTSgpLm11bHRpcGx5KG0pXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1cclxuICB9XHJcblxyXG4gIG1hdHJpeGlmeSAoKSB7XHJcbiAgICBjb25zdCBtYXRyaXggPSAodGhpcy5nZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScpIHx8ICcnKS50cmltKClcclxuICAgICAgLy8gc3BsaXQgdHJhbnNmb3JtYXRpb25zXHJcbiAgICAgIC5zcGxpdChyZWdleC50cmFuc2Zvcm1zKS5zbGljZSgwLCAtMSkubWFwKGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICAvLyBnZW5lcmF0ZSBrZXkgPT4gdmFsdWUgcGFpcnNcclxuICAgICAgICBjb25zdCBrdiA9IHN0ci50cmltKCkuc3BsaXQoJygnKVxyXG4gICAgICAgIHJldHVybiBbIGt2WzBdLnRyaW0oKSwga3ZbMV0uc3BsaXQocmVnZXguZGVsaW1pdGVyKS5tYXAoZnVuY3Rpb24gKHN0cikgeyByZXR1cm4gcGFyc2VGbG9hdChzdHIudHJpbSgpKSB9KSBdXHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIG1lcmdlIGV2ZXJ5IHRyYW5zZm9ybWF0aW9uIGludG8gb25lIG1hdHJpeFxyXG4gICAgICAucmVkdWNlKGZ1bmN0aW9uIChtYXRyaXgsIHRyYW5zZm9ybSkge1xyXG5cclxuICAgICAgICBpZiAodHJhbnNmb3JtWzBdID09PSAnbWF0cml4JykgcmV0dXJuIG1hdHJpeC5tdWx0aXBseShhcnJheVRvTWF0cml4KHRyYW5zZm9ybVsxXSkpXHJcbiAgICAgICAgcmV0dXJuIG1hdHJpeFt0cmFuc2Zvcm1bMF1dLmFwcGx5KG1hdHJpeCwgdHJhbnNmb3JtWzFdKVxyXG5cclxuICAgICAgfSwgbmV3IFNWR01hdHJpeCgpKVxyXG5cclxuICAgIHJldHVybiBtYXRyaXhcclxuICB9XHJcblxyXG4gIGdldCB0cmFuc2Zvcm0gKCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKVxyXG4gIH1cclxuXHJcbn1cclxuIiwiY29uc3QgcmFkaWFucyA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgcmV0dXJuIGQgJSAzNjAgKiBNYXRoLlBJIC8gMTgwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyaXhGYWN0b3J5IChhLCBiLCBjLCBkLCBlLCBmKSB7XHJcbiAgdmFyIHIgPSBuZXcgU1ZHTWF0cml4KClcclxuICByLmEgPSBhXHJcbiAgci5iID0gYlxyXG4gIHIuYyA9IGNcclxuICByLmQgPSBkXHJcbiAgci5lID0gZVxyXG4gIHIuZiA9IGZcclxuICByZXR1cm4gclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU1ZHTWF0cml4IHtcclxuICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICB0aGlzLmEgPSB0aGlzLmQgPSAxXHJcbiAgICB0aGlzLmIgPSB0aGlzLmMgPSB0aGlzLmUgPSB0aGlzLmYgPSAwXHJcbiAgfVxyXG5cclxuICBpbnZlcnNlICgpIHtcclxuICAgIC8vIEdldCB0aGUgY3VycmVudCBwYXJhbWV0ZXJzIG91dCBvZiB0aGUgbWF0cml4XHJcbiAgICB2YXIgYSA9IHRoaXMuYVxyXG4gICAgdmFyIGIgPSB0aGlzLmJcclxuICAgIHZhciBjID0gdGhpcy5jXHJcbiAgICB2YXIgZCA9IHRoaXMuZFxyXG4gICAgdmFyIGUgPSB0aGlzLmVcclxuICAgIHZhciBmID0gdGhpcy5mXHJcblxyXG4gICAgLy8gSW52ZXJ0IHRoZSAyeDIgbWF0cml4IGluIHRoZSB0b3AgbGVmdFxyXG4gICAgdmFyIGRldCA9IGEgKiBkIC0gYiAqIGNcclxuICAgIGlmICghZGV0KSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnZlcnQgJyArIHRoaXMpXHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSB0b3AgMngyIG1hdHJpeFxyXG4gICAgdmFyIG5hID0gZCAvIGRldFxyXG4gICAgdmFyIG5iID0gLWIgLyBkZXRcclxuICAgIHZhciBuYyA9IC1jIC8gZGV0XHJcbiAgICB2YXIgbmQgPSBhIC8gZGV0XHJcblxyXG4gICAgLy8gQXBwbHkgdGhlIGludmVydGVkIG1hdHJpeCB0byB0aGUgdG9wIHJpZ2h0XHJcbiAgICB2YXIgbmUgPSAtKG5hICogZSArIG5jICogZilcclxuICAgIHZhciBuZiA9IC0obmIgKiBlICsgbmQgKiBmKVxyXG5cclxuICAgIC8vIENvbnN0cnVjdCB0aGUgaW52ZXJ0ZWQgbWF0cml4XHJcbiAgICB0aGlzLmEgPSBuYVxyXG4gICAgdGhpcy5iID0gbmJcclxuICAgIHRoaXMuYyA9IG5jXHJcbiAgICB0aGlzLmQgPSBuZFxyXG4gICAgdGhpcy5lID0gbmVcclxuICAgIHRoaXMuZiA9IG5mXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIG11bHRpcGx5IChtKSB7XHJcbiAgICB2YXIgciA9IG5ldyBTVkdNYXRyaXgoKVxyXG4gICAgci5hID0gdGhpcy5hICogbS5hICsgdGhpcy5jICogbS5iICsgdGhpcy5lICogMFxyXG4gICAgci5iID0gdGhpcy5iICogbS5hICsgdGhpcy5kICogbS5iICsgdGhpcy5mICogMFxyXG4gICAgci5jID0gdGhpcy5hICogbS5jICsgdGhpcy5jICogbS5kICsgdGhpcy5lICogMFxyXG4gICAgci5kID0gdGhpcy5iICogbS5jICsgdGhpcy5kICogbS5kICsgdGhpcy5mICogMFxyXG4gICAgci5lID0gdGhpcy5hICogbS5lICsgdGhpcy5jICogbS5mICsgdGhpcy5lICogMVxyXG4gICAgci5mID0gdGhpcy5iICogbS5lICsgdGhpcy5kICogbS5mICsgdGhpcy5mICogMVxyXG4gICAgcmV0dXJuIHJcclxuICB9XHJcblxyXG4gIHJvdGF0ZSAociwgeCwgeSkge1xyXG4gICAgciA9IHIgJSAzNjAgKiBNYXRoLlBJIC8gMTgwXHJcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseShtYXRyaXhGYWN0b3J5KFxyXG4gICAgICBNYXRoLmNvcyhyKSxcclxuICAgICAgTWF0aC5zaW4ociksXHJcbiAgICAgIC1NYXRoLnNpbihyKSxcclxuICAgICAgTWF0aC5jb3MociksXHJcbiAgICAgIHggPyAtTWF0aC5jb3MocikgKiB4ICsgTWF0aC5zaW4ocikgKiB5ICsgeCA6IDAsXHJcbiAgICAgIHkgPyAtTWF0aC5zaW4ocikgKiB4IC0gTWF0aC5jb3MocikgKiB5ICsgeSA6IDBcclxuICAgICkpXHJcbiAgfVxyXG5cclxuICBzY2FsZSAoc2NhbGVYLCBzY2FsZVkgPSBzY2FsZVgpIHtcclxuICAgIHJldHVybiB0aGlzLm11bHRpcGx5KG1hdHJpeEZhY3Rvcnkoc2NhbGVYLCAwLCAwLCBzY2FsZVksIDAsIDApKVxyXG4gIH1cclxuXHJcbiAgc2tldyAoeCwgeSkge1xyXG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkobWF0cml4RmFjdG9yeSgxLCBNYXRoLnRhbihyYWRpYW5zKHkpKSwgTWF0aC50YW4ocmFkaWFucyh4KSksIDEsIDAsIDApKVxyXG4gIH1cclxuXHJcbiAgc2tld1ggKHgpIHtcclxuICAgIHJldHVybiB0aGlzLnNrZXcoeCwgMClcclxuICB9XHJcblxyXG4gIHNrZXdZICh5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5za2V3KDAsIHkpXHJcbiAgfVxyXG5cclxuICB0b1N0cmluZyAoKSB7XHJcbiAgICByZXR1cm4gJ1NWR01hdHJpeCdcclxuICB9XHJcblxyXG4gIHRyYW5zbGF0ZSAoeCA9IDAsIHkgPSAwKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseShtYXRyaXhGYWN0b3J5KDEsIDAsIDAsIDEsIHgsIHkpKVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9TVkdHcmFwaGljc0VsZW1lbnQuanMnXHJcbmltcG9ydCAqIGFzIHBhdGhVdGlscyBmcm9tICcuLi8uLi91dGlscy9wYXRoVXRpbHMuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgU1ZHUGF0aEVsZW1lbnQgZXh0ZW5kcyBTVkdHcmFwaGljc0VsZW1lbnQge1xyXG4gIGdldFBvaW50QXRMZW5ndGggKGxlbikge1xyXG4gICAgcmV0dXJuIHBhdGhVdGlscy5wb2ludEF0TGVuZ3RoKHRoaXMuZ2V0QXR0cmlidXRlKCdkJyksIGxlbilcclxuICB9XHJcblxyXG4gIGdldFRvdGFsTGVuZ3RoICgpIHtcclxuICAgIHJldHVybiBwYXRoVXRpbHMubGVuZ3RoKHRoaXMuZ2V0QXR0cmlidXRlKCdkJykpXHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBTVkdQb2ludCB7XHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgdGhpcy54ID0gMFxyXG4gICAgdGhpcy55ID0gMFxyXG4gIH1cclxuXHJcbiAgbWF0cml4VHJhbnNmb3JtIChtKSB7XHJcbiAgICB2YXIgciA9IG5ldyBTVkdQb2ludCgpXHJcbiAgICByLnggPSBtLmEgKiB0aGlzLnggKyBtLmMgKiB0aGlzLnkgKyBtLmUgKiAxXHJcbiAgICByLnkgPSBtLmIgKiB0aGlzLnggKyBtLmQgKiB0aGlzLnkgKyBtLmYgKiAxXHJcbiAgICByZXR1cm4gclxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnLi4vLi4vb3RoZXIvQm94LmpzJ1xyXG5pbXBvcnQgeyBTVkdNYXRyaXggfSBmcm9tICcuL1NWR01hdHJpeC5qcydcclxuaW1wb3J0IHsgU1ZHUG9pbnQgfSBmcm9tICcuL1NWR1BvaW50LmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFNWR1NWR0VsZW1lbnQgZXh0ZW5kcyBTVkdHcmFwaGljc0VsZW1lbnQge1xyXG4gIGNyZWF0ZVNWR01hdHJpeCAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFNWR01hdHJpeCgpXHJcbiAgfVxyXG5cclxuICBjcmVhdGVTVkdQb2ludCAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFNWR1BvaW50KClcclxuICB9XHJcblxyXG4gIGNyZWF0ZVNWR1JlY3QgKCkge1xyXG4gICAgcmV0dXJuIG5ldyBCb3goKVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9TVkdHcmFwaGljc0VsZW1lbnQuanMnXHJcblxyXG5leHBvcnQgY2xhc3MgU1ZHVGV4dENvbnRlbnRFbGVtZW50IGV4dGVuZHMgU1ZHR3JhcGhpY3NFbGVtZW50IHtcclxuICBnZXRDb21wdXRlZFRleHRMZW5ndGggKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0QkJveCgpLndpZHRoXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IFdpbmRvdyB9IGZyb20gJy4vZG9tL1dpbmRvdy5qcydcclxuaW1wb3J0IHsgRE9NSW1wbGVtZW50YXRpb24gfSBmcm9tICcuL2RvbS9Eb2N1bWVudC5qcydcclxuaW1wb3J0ICogYXMgbmFtZXNwYWNlcyBmcm9tICcuL3V0aWxzL25hbWVzcGFjZXMuanMnXHJcblxyXG5jb25zdCB7IGNyZWF0ZURvY3VtZW50LCBjcmVhdGVIVE1MRG9jdW1lbnQgfSA9IERPTUltcGxlbWVudGF0aW9uXHJcblxyXG5jb25zdCBjcmVhdGVXaW5kb3cgPSAoLi4uYXJncykgPT4ge1xyXG4gIGNvbnN0IHdpbmRvdyA9IG5ldyBXaW5kb3coKVxyXG4gIGNvbnN0IGRvY3VtZW50ID0gY3JlYXRlRG9jdW1lbnQoLi4uYXJncylcclxuICB3aW5kb3cuZG9jdW1lbnQgPSBkb2N1bWVudFxyXG4gIGRvY3VtZW50LmRlZmF1bHRWaWV3ID0gd2luZG93XHJcbiAgcmV0dXJuIHdpbmRvd1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVIVE1MV2luZG93ID0gKHRpdGxlKSA9PiB7XHJcbiAgY29uc3Qgd2luZG93ID0gbmV3IFdpbmRvdygpXHJcbiAgY29uc3QgZG9jdW1lbnQgPSBET01JbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQodGl0bGUpXHJcbiAgd2luZG93LmRvY3VtZW50ID0gZG9jdW1lbnRcclxuICBkb2N1bWVudC5kZWZhdWx0VmlldyA9IHdpbmRvd1xyXG4gIHJldHVybiB3aW5kb3dcclxufVxyXG5cclxuY29uc3QgY3JlYXRlU1ZHV2luZG93ID0gKCkgPT4ge1xyXG4gIHJldHVybiBjcmVhdGVXaW5kb3cobmFtZXNwYWNlcy5zdmcsICdzdmcnKVxyXG59XHJcblxyXG5jb25zdCBjcmVhdGVTVkdEb2N1bWVudCA9ICgpID0+IHtcclxuICByZXR1cm4gY3JlYXRlRG9jdW1lbnQobmFtZXNwYWNlcy5zdmcsICdzdmcnKVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIGNyZWF0ZURvY3VtZW50LFxyXG4gIGNyZWF0ZUhUTUxEb2N1bWVudCxcclxuICBjcmVhdGVTVkdEb2N1bWVudCxcclxuICBjcmVhdGVXaW5kb3csXHJcbiAgY3JlYXRlSFRNTFdpbmRvdyxcclxuICBjcmVhdGVTVkdXaW5kb3dcclxufVxyXG4iLCJpbXBvcnQgKiBhcyByZWdleCBmcm9tICcuLi91dGlscy9yZWdleC5qcydcclxuaW1wb3J0IHsgUG9pbnQgfSBmcm9tICcuL1BvaW50LmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEJveCB7XHJcbiAgY29uc3RydWN0b3IgKHNvdXJjZSkge1xyXG4gICAgdmFyIGJhc2UgPSBbIDAsIDAsIDAsIDAgXVxyXG4gICAgc291cmNlID0gdHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycgPyBzb3VyY2Uuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5tYXAocGFyc2VGbG9hdClcclxuICAgICAgOiBBcnJheS5pc0FycmF5KHNvdXJjZSkgPyBzb3VyY2VcclxuICAgICAgOiB0eXBlb2Ygc291cmNlID09PSAnb2JqZWN0JyA/IFtcclxuICAgICAgICBzb3VyY2UubGVmdCAhPSBudWxsID8gc291cmNlLmxlZnQgOiBzb3VyY2UueCxcclxuICAgICAgICBzb3VyY2UudG9wICE9IG51bGwgPyBzb3VyY2UudG9wIDogc291cmNlLnksXHJcbiAgICAgICAgc291cmNlLndpZHRoLFxyXG4gICAgICAgIHNvdXJjZS5oZWlnaHRcclxuICAgICAgXVxyXG4gICAgICA6IGFyZ3VtZW50cy5sZW5ndGggPT09IDQgPyBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcclxuICAgICAgOiBiYXNlXHJcblxyXG4gICAgdGhpcy54ID0gdGhpcy5sZWZ0ID0gc291cmNlWzBdXHJcbiAgICB0aGlzLnkgPSB0aGlzLnRvcCA9IHNvdXJjZVsxXVxyXG4gICAgdGhpcy53aWR0aCA9IHNvdXJjZVsyXVxyXG4gICAgdGhpcy5oZWlnaHQgPSBzb3VyY2VbM11cclxuICAgIHRoaXMucmlnaHQgPSB0aGlzLmxlZnQgKyB0aGlzLndpZHRoXHJcbiAgICB0aGlzLmJvdHRvbSA9IHRoaXMudG9wICsgdGhpcy5oZWlnaHRcclxuICB9XHJcblxyXG4gIC8vIE1lcmdlIHJlY3QgYm94IHdpdGggYW5vdGhlciwgcmV0dXJuIGEgbmV3IGluc3RhbmNlXHJcbiAgbWVyZ2UgKGJveCkge1xyXG4gICAgaWYgKGJveCBpbnN0YW5jZW9mIE5vQm94KSByZXR1cm4gbmV3IEJveCh0aGlzKVxyXG5cclxuICAgIHZhciB4ID0gTWF0aC5taW4odGhpcy54LCBib3gueClcclxuICAgIHZhciB5ID0gTWF0aC5taW4odGhpcy55LCBib3gueSlcclxuXHJcbiAgICByZXR1cm4gbmV3IEJveChcclxuICAgICAgeCwgeSxcclxuICAgICAgTWF0aC5tYXgodGhpcy54ICsgdGhpcy53aWR0aCwgYm94LnggKyBib3gud2lkdGgpIC0geCxcclxuICAgICAgTWF0aC5tYXgodGhpcy55ICsgdGhpcy5oZWlnaHQsIGJveC55ICsgYm94LmhlaWdodCkgLSB5XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm0gKG0pIHtcclxuICAgIHZhciB4TWluID0gSW5maW5pdHlcclxuICAgIHZhciB4TWF4ID0gLUluZmluaXR5XHJcbiAgICB2YXIgeU1pbiA9IEluZmluaXR5XHJcbiAgICB2YXIgeU1heCA9IC1JbmZpbml0eVxyXG5cclxuICAgIHZhciBwdHMgPSBbXHJcbiAgICAgIG5ldyBQb2ludCh0aGlzLngsIHRoaXMueSksXHJcbiAgICAgIG5ldyBQb2ludCh0aGlzLnggKyB0aGlzLndpZHRoLCB0aGlzLnkpLFxyXG4gICAgICBuZXcgUG9pbnQodGhpcy54LCB0aGlzLnkgKyB0aGlzLmhlaWdodCksXHJcbiAgICAgIG5ldyBQb2ludCh0aGlzLnggKyB0aGlzLndpZHRoLCB0aGlzLnkgKyB0aGlzLmhlaWdodClcclxuICAgIF1cclxuXHJcbiAgICBwdHMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xyXG4gICAgICBwID0gcC50cmFuc2Zvcm0obSlcclxuICAgICAgeE1pbiA9IE1hdGgubWluKHhNaW4sIHAueClcclxuICAgICAgeE1heCA9IE1hdGgubWF4KHhNYXgsIHAueClcclxuICAgICAgeU1pbiA9IE1hdGgubWluKHlNaW4sIHAueSlcclxuICAgICAgeU1heCA9IE1hdGgubWF4KHlNYXgsIHAueSlcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIG5ldyBCb3goXHJcbiAgICAgIHhNaW4sIHlNaW4sXHJcbiAgICAgIHhNYXggLSB4TWluLFxyXG4gICAgICB5TWF4IC0geU1pblxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5vQm94IGV4dGVuZHMgQm94IHtcclxuICAvLyBOb0JveCBoYXMgbm8gdmFsaWQgdmFsdWVzIHNvIGl0IGNhbnQgYmUgbWVyZ2VkXHJcbiAgbWVyZ2UgKGJveCkge1xyXG4gICAgcmV0dXJuIGJveCBpbnN0YW5jZW9mIE5vQm94ID8gbmV3IE5vQm94KCkgOiBuZXcgQm94KGJveClcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSAobSkge1xyXG4gICAgcmV0dXJuIG5ldyBOb0JveCgpXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IHJlbW92ZVF1b3Rlcywgc3BsaXROb3RJbkJyYWNrZXRzIH0gZnJvbSAnLi4vdXRpbHMvc3RyVXRpbHMuanMnXHJcbmltcG9ydCAqIGFzIHJlZ2V4IGZyb20gJy4uL3V0aWxzL3JlZ2V4LmpzJ1xyXG5pbXBvcnQgeyBodG1sIH0gZnJvbSAnLi4vdXRpbHMvbmFtZXNwYWNlcy5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBDc3NRdWVyeSB7XHJcbiAgY29uc3RydWN0b3IgKHF1ZXJ5KSB7XHJcbiAgICBpZiAoQ3NzUXVlcnkuY2FjaGUuaGFzKHF1ZXJ5KSkge1xyXG4gICAgICB0aGlzLnF1ZXJpZXMgPSBDc3NRdWVyeS5jYWNoZS5nZXQocXVlcnkpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIHZhciBxdWVyaWVzID0gc3BsaXROb3RJbkJyYWNrZXRzKHF1ZXJ5LCAnLCcpXHJcblxyXG4gICAgcXVlcmllcyA9IHF1ZXJpZXMubWFwKHF1ZXJ5ID0+IHtcclxuXHJcbiAgICAgIHZhciByb3VuZEJyYWNrZXRzID0gMFxyXG4gICAgICB2YXIgc3F1YXJlQnJhY2tldHMgPSAwXHJcblxyXG4gICAgICAvLyB0aGlzIGlzIHRoZSBzYW1lIGFzIGFib3ZlIGJ1dCBlYXNpZXJcclxuICAgICAgcXVlcnkgPSBxdWVyeS5yZXBsYWNlKC9bKClbXFxdPn4rXS9nLCBmdW5jdGlvbiAoY2gpIHtcclxuICAgICAgICBpZiAoY2ggPT09ICcoJykgKytyb3VuZEJyYWNrZXRzXHJcbiAgICAgICAgZWxzZSBpZiAoY2ggPT09ICcpJykgLS1yb3VuZEJyYWNrZXRzXHJcbiAgICAgICAgZWxzZSBpZiAoY2ggPT09ICdbJykgKytzcXVhcmVCcmFja2V0c1xyXG4gICAgICAgIGVsc2UgaWYgKGNoID09PSAnXScpIC0tc3F1YXJlQnJhY2tldHNcclxuXHJcbiAgICAgICAgaWYgKCcoKVtdJy5pbmRleE9mKGNoKSA+IC0xKSByZXR1cm4gY2hcclxuICAgICAgICBpZiAoc3F1YXJlQnJhY2tldHMgfHwgcm91bmRCcmFja2V0cykgcmV0dXJuIGNoXHJcblxyXG4gICAgICAgIHJldHVybiAnICcgKyBjaCArICcgJ1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgLy8gc3BsaXQgYXQgc3BhY2UgYW5kIHJlbW92ZSBlbXB0eSByZXN1bHRzXHJcbiAgICAgIHF1ZXJ5ID0gc3BsaXROb3RJbkJyYWNrZXRzKHF1ZXJ5LCAnICcpLmZpbHRlcihlbCA9PiAhIWVsLmxlbmd0aClcclxuXHJcbiAgICAgIHZhciBwYWlycyA9IFtdXHJcblxyXG4gICAgICB2YXIgcmVsYXRpb24gPSAnJSdcclxuXHJcbiAgICAgIC8vIGdlbmVyYXRlIHF1ZXJ5bm9kZSByZWxhdGlvbiB0dXBsZXNcclxuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gcXVlcnkubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xyXG5cclxuICAgICAgICBpZiAoJz5+KyUnLmluZGV4T2YocXVlcnlbaV0pID4gLTEpIHtcclxuICAgICAgICAgIHJlbGF0aW9uID0gcXVlcnlbaV1cclxuICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYWlycy5wdXNoKFsgcmVsYXRpb24sIHF1ZXJ5W2ldIF0pXHJcbiAgICAgICAgcmVsYXRpb24gPSAnJSdcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBwYWlyc1xyXG5cclxuICAgIH0pXHJcblxyXG4gICAgdGhpcy5xdWVyaWVzID0gcXVlcmllc1xyXG5cclxuICAgIC8vIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzIHdlIGhhdmUgdG8gbWFuYWdlIG91ciBjYWNoZS5cclxuICAgIC8vIHdlIGRlbGV0ZSBldmVyeXRoaW5nIHdoaWNoIGlzIG9sZGVyIHRoYW4gNTAgZW50cmllc1xyXG4gICAgaWYgKENzc1F1ZXJ5LmNhY2hlS2V5cy5sZW5ndGggPiA1MCkge1xyXG4gICAgICBDc3NRdWVyeS5jYWNoZS5kZWxldGUoQ3NzUXVlcnkuY2FjaGVLZXlzLnNoaWZ0KCkpXHJcbiAgICB9XHJcbiAgICBDc3NRdWVyeS5jYWNoZS5zZXQocXVlcnksIHF1ZXJpZXMpXHJcbiAgICBDc3NRdWVyeS5jYWNoZUtleXMucHVzaChxdWVyeSlcclxuXHJcbiAgfVxyXG5cclxuICBtYXRjaGVzIChub2RlLCBzY29wZSkge1xyXG4gICAgZm9yICh2YXIgaSA9IHRoaXMucXVlcmllcy5sZW5ndGg7IGktLTspIHtcclxuICAgICAgaWYgKHRoaXMubWF0Y2hIZWxwZXIodGhpcy5xdWVyaWVzW2ldLCBub2RlLCBzY29wZSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG4gIG1hdGNoSGVscGVyIChxdWVyeSwgbm9kZSwgc2NvcGUpIHtcclxuICAgIHF1ZXJ5ID0gcXVlcnkuc2xpY2UoKVxyXG4gICAgdmFyIGxhc3QgPSBxdWVyeS5wb3AoKVxyXG5cclxuICAgIGlmICghbmV3IENzc1F1ZXJ5Tm9kZShsYXN0WzFdKS5tYXRjaGVzKG5vZGUsIHNjb3BlKSkgeyByZXR1cm4gZmFsc2UgfVxyXG5cclxuICAgIGlmICghcXVlcnkubGVuZ3RoKSByZXR1cm4gdHJ1ZVxyXG5cclxuICAgIGlmIChsYXN0WzBdID09PSAnLCcpIHJldHVybiB0cnVlXHJcblxyXG4gICAgaWYgKGxhc3RbMF0gPT09ICcrJykge1xyXG4gICAgICByZXR1cm4gISFub2RlLnByZXZpb3VzU2libGluZyAmJiB0aGlzLm1hdGNoSGVscGVyKHF1ZXJ5LCBub2RlLnByZXZpb3VzU2libGluZywgc2NvcGUpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhc3RbMF0gPT09ICc+Jykge1xyXG4gICAgICByZXR1cm4gISFub2RlLnBhcmVudE5vZGUgJiYgdGhpcy5tYXRjaEhlbHBlcihxdWVyeSwgbm9kZS5wYXJlbnROb2RlLCBzY29wZSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGFzdFswXSA9PT0gJ34nKSB7XHJcbiAgICAgIHdoaWxlICgobm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nKSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1hdGNoSGVscGVyKHF1ZXJ5LCBub2RlLCBzY29wZSkpIHsgcmV0dXJuIHRydWUgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXN0WzBdID09PSAnJScpIHtcclxuICAgICAgd2hpbGUgKChub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1hdGNoSGVscGVyKHF1ZXJ5LCBub2RlLCBzY29wZSkpIHsgcmV0dXJuIHRydWUgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICB9XHJcbn1cclxuXHJcbkNzc1F1ZXJ5LmNhY2hlID0gbmV3IE1hcCgpXHJcbkNzc1F1ZXJ5LmNhY2hlS2V5cyA9IFtdXHJcblxyXG4vLyBjaGVjayBpZiBbbm9kZV0gaXMgdGhlIFtudGhdIGNoaWxkIG9mIFthcnJdIHdoZXJlIG50aCBjYW4gYWxzbyBiZSBhIGZvcm11bGFcclxuY29uc3QgbnRoID0gKG5vZGUsIGFyciwgbnRoKSA9PiB7XHJcblxyXG4gIGlmIChudGggPT09ICdldmVuJykgbnRoID0gJzJuJ1xyXG4gIGVsc2UgaWYgKG50aCA9PT0gJ29kZCcpIG50aCA9ICcybisxJ1xyXG5cclxuICAvLyBjaGVjayBmb3IgZXZhbCBjaGFyc1xyXG4gIGlmICgvW15cXGRcXC1uKyovXSsvLnRlc3QobnRoKSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gIG50aCA9IG50aC5yZXBsYWNlKCduJywgJypuJylcclxuXHJcbiAgLy8gZXZhbCBudGggdG8gZ2V0IHRoZSBpbmRleFxyXG4gIGZvciAodmFyIGksIG4gPSAwLCBubCA9IGFyci5sZW5ndGg7IG4gPCBubDsgKytuKSB7XHJcbiAgICAvKiBlc2xpbnQgbm8tZXZhbDogb2ZmICovXHJcbiAgICBpID0gZXZhbChudGgpXHJcblxyXG4gICAgaWYgKGkgPiBubCkgYnJlYWtcclxuICAgIGlmIChhcnJbaSAtIDFdID09PSBub2RlKSByZXR1cm4gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlXHJcbn1cclxuXHJcbmNvbnN0IGxvd2VyID0gYSA9PiBhLnRvTG93ZXJDYXNlKClcclxuXHJcbi8vIGNoZWNrcyBpZiBhIGFuZCBiIGFyZSBlcXVhbC4gSXMgaW5zZW5zaXRpdmUgd2hlbiBpIGlzIHRydWVcclxuY29uc3QgZXEgPSAoYSwgYiwgaSkgPT4gaSA/IGxvd2VyKGEpID09PSBsb3dlcihiKSA6IGEgPT09IGJcclxuXHJcbi8vIFtpXSAocHJlYm91bmQpIGlzIHRydWUgaWYgaW5zZW5zaXRpdmUgbWF0Y2hpbmcgaXMgcmVxdWlyZWRcclxuLy8gW2FdIChwcmVib3VuZCkgaXMgdGhlIHZhbHVlIHRoZSBhdHRyIGlzIGNvbXBhcmVkIHRvXHJcbi8vIFtiXSAocGFzc2VkKSAgIGlzIHRoZSB2YWx1ZSBvZiB0aGUgYXR0cmlidXRlXHJcbmNvbnN0IGF0dHJpYnV0ZU1hdGNoZXIgPSB7XHJcbiAgJz0nOiAoaSwgYSwgYikgPT4gZXEoYSwgYiwgaSksXHJcbiAgJ349JzogKGksIGEsIGIpID0+IGIuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5maWx0ZXIoZWwgPT4gZXEoZWwsIGEsIGkpKS5sZW5ndGggPiAwLFxyXG4gICd8PSc6IChpLCBhLCBiKSA9PiBlcShiLnNwbGl0KHJlZ2V4LmRlbGltaXRlcilbMF0sIGEsIGkpLFxyXG4gICdePSc6IChpLCBhLCBiKSA9PiBpID8gbG93ZXIoYikuc3RhcnRzV2l0aChsb3dlcihhKSkgOiBiLnN0YXJ0c1dpdGgoYSksXHJcbiAgJyQ9JzogKGksIGEsIGIpID0+IGkgPyBsb3dlcihiKS5lbmRzV2l0aChsb3dlcihhKSkgOiBiLmVuZHNXaXRoKGEpLFxyXG4gICcqPSc6IChpLCBhLCBiKSA9PiBpID8gbG93ZXIoYikuaW5jbHVkZXMobG93ZXIoYSkpIDogYi5pbmNsdWRlcyhhKSxcclxuICAnKic6IChpLCBhLCBiKSA9PiBiICE9IG51bGxcclxufVxyXG5cclxuY29uc3QgZ2V0QXR0cmlidXRlVmFsdWUgPSAocHJlZml4LCBuYW1lLCBub2RlKSA9PiB7XHJcbiAgaWYgKCFwcmVmaXggfHwgcHJlZml4ID09PSAnKicpIHtcclxuICAgIHJldHVybiBub2RlLmdldEF0dHJpYnV0ZShuYW1lKVxyXG4gIH1cclxuICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUocHJlZml4ICsgJzonICsgbmFtZSlcclxufVxyXG5cclxuLy8gW2FdIChwcmVib3VuZCkgW2Fdcmd1bWVudCBvZiB0aGUgcHNldWRvIHNlbGVjdG9yXHJcbi8vIFtuXSAocGFzc2VkKSAgIFtuXW9kZVxyXG4vLyBbc10gKHBhc3NlZCkgICBbc11jb3BlIC0gdGhlIGVsZW1lbnQgdGhpcyBxdWVyeSBpcyBzY29wZWQgdG9cclxuY29uc3QgcHNldWRvTWF0Y2hlciA9IHtcclxuICAnZmlyc3QtY2hpbGQnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG4ucGFyZW50Tm9kZS5maXJzdENoaWxkID09PSBuLFxyXG4gICdsYXN0LWNoaWxkJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBuLnBhcmVudE5vZGUubGFzdENoaWxkID09PSBuLFxyXG4gICdudGgtY2hpbGQnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG50aChuLCBuLnBhcmVudE5vZGUuY2hpbGROb2RlcywgYSksXHJcbiAgJ250aC1sYXN0LWNoaWxkJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBudGgobiwgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuc2xpY2UoKS5yZXZlcnNlKCksIGEpLFxyXG4gICdmaXJzdC1vZi10eXBlJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5maWx0ZXIoZWwgPT4gZWwubm9kZU5hbWUgPT09IG4ubm9kZU5hbWUpWzBdID09PSBuLFxyXG4gICdsYXN0LW9mLXR5cGUnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG4ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmZpbHRlcihlbCA9PiBlbC5ub2RlTmFtZSA9PT0gbi5ub2RlTmFtZSkucG9wKCkgPT09IG4sXHJcbiAgJ250aC1vZi10eXBlJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBudGgobiwgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuZmlsdGVyKGVsID0+IGVsLm5vZGVOYW1lID09PSBuLm5vZGVOYW1lKSwgYSksXHJcbiAgJ250aC1sYXN0LW9mLXR5cGUnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG50aChuLCBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5maWx0ZXIoZWwgPT4gZWwubm9kZU5hbWUgPT09IG4ubm9kZU5hbWUpLnJldmVyc2UoKSwgYSksXHJcbiAgJ29ubHktY2hpbGQnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG4ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSxcclxuICAnb25seS1vZi10eXBlJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5maWx0ZXIoZWwgPT4gZWwubm9kZU5hbWUgPT09IG4ubm9kZU5hbWUpLmxlbmd0aCA9PT0gMSxcclxuICByb290OiAoYSwgbikgPT4gbi5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA9PT0gbixcclxuICBub3Q6IChhLCBuLCBzKSA9PiAhKG5ldyBDc3NRdWVyeShhKSkubWF0Y2hlcyhuLCBzKSxcclxuICBtYXRjaGVzOiAoYSwgbiwgcykgPT4gKG5ldyBDc3NRdWVyeShhKSkubWF0Y2hlcyhuLCBzKSxcclxuICBzY29wZTogKGEsIG4sIHMpID0+IG4gPT09IHNcclxufVxyXG5cclxuY2xhc3MgQ3NzUXVlcnlOb2RlIHtcclxuICBjb25zdHJ1Y3RvciAobm9kZSkge1xyXG4gICAgdGhpcy50YWcgPSAnJ1xyXG4gICAgdGhpcy5pZCA9ICcnXHJcbiAgICB0aGlzLmNsYXNzTGlzdCA9IFtdXHJcbiAgICB0aGlzLmF0dHJzID0gW11cclxuICAgIHRoaXMucHNldWRvID0gW11cclxuXHJcbiAgICAvLyBtYXRjaCB0aGUgdGFnIG5hbWVcclxuICAgIHZhciBtYXRjaGVzID0gbm9kZS5tYXRjaCgvXltcXHctXSt8XlxcKi8pXHJcbiAgICBpZiAobWF0Y2hlcykge1xyXG4gICAgICB0aGlzLnRhZyA9IG1hdGNoZXNbMF1cclxuICAgICAgbm9kZSA9IG5vZGUuc2xpY2UodGhpcy50YWcubGVuZ3RoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1hdGNoIHBzZXVkbyBjbGFzc2VzXHJcbiAgICB3aGlsZSAoKG1hdGNoZXMgPSAvOihbXFx3LV0rKSg/OlxcKCguKylcXCkpPy9nLmV4ZWMobm9kZSkpKSB7XHJcbiAgICAgIHRoaXMucHNldWRvLnB1c2gocHNldWRvTWF0Y2hlclttYXRjaGVzWzFdXS5iaW5kKHRoaXMsIHJlbW92ZVF1b3RlcyhtYXRjaGVzWzJdIHx8ICcnKSkpXHJcbiAgICAgIG5vZGUgPSBub2RlLnNsaWNlKDAsIG1hdGNoZXMuaW5kZXgpICsgbm9kZS5zbGljZShtYXRjaGVzLmluZGV4ICsgbWF0Y2hlc1swXS5sZW5ndGgpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWF0Y2ggdGhlIGlkXHJcbiAgICBtYXRjaGVzID0gbm9kZS5tYXRjaCgvIyhbXFx3LV0rKS8pXHJcbiAgICBpZiAobWF0Y2hlcykge1xyXG4gICAgICB0aGlzLmlkID0gbWF0Y2hlc1sxXVxyXG4gICAgICBub2RlID0gbm9kZS5zbGljZSgwLCBtYXRjaGVzLmluZGV4KSArIG5vZGUuc2xpY2UobWF0Y2hlcy5pbmRleCArIG1hdGNoZXNbMF0ubGVuZ3RoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIG1hdGNoIGNsYXNzZXNcclxuICAgIHdoaWxlICgobWF0Y2hlcyA9IC9cXC4oW1xcdy1dKykvZy5leGVjKG5vZGUpKSkge1xyXG4gICAgICB0aGlzLmNsYXNzTGlzdC5wdXNoKG1hdGNoZXNbMV0pXHJcbiAgICAgIG5vZGUgPSBub2RlLnNsaWNlKDAsIG1hdGNoZXMuaW5kZXgpICsgbm9kZS5zbGljZShtYXRjaGVzLmluZGV4ICsgbWF0Y2hlc1swXS5sZW5ndGgpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gbWF0Y2ggYXR0cmlidXRlc1xyXG4gICAgd2hpbGUgKChtYXRjaGVzID0gL1xcWyhbXFx3LSpdK1xcfCk/KFtcXHctXSspKChbPV5+JHwqXSspKC4rPykoICtbaUldKT8pP1xcXS9nLmV4ZWMobm9kZSkpKSB7XHJcbiAgICAgIGNvbnN0IHByZWZpeCA9IG1hdGNoZXNbMV0gPyBtYXRjaGVzWzFdLnNwbGl0KCd8JylbMF0gOiBudWxsXHJcbiAgICAgIHRoaXMuYXR0cnMucHVzaCh7XHJcbiAgICAgICAgbmFtZTogbWF0Y2hlc1syXSxcclxuICAgICAgICBnZXRWYWx1ZTogZ2V0QXR0cmlidXRlVmFsdWUuYmluZCh0aGlzLCBwcmVmaXgsIG1hdGNoZXNbMl0pLFxyXG4gICAgICAgIG1hdGNoZXI6IGF0dHJpYnV0ZU1hdGNoZXJbbWF0Y2hlc1s0XSB8fCAnKiddLmJpbmQoXHJcbiAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgISFtYXRjaGVzWzZdLCAvLyBjYXNlIGluc2Vuc2l0aXZlIHllcy9ub1xyXG4gICAgICAgICAgcmVtb3ZlUXVvdGVzKChtYXRjaGVzWzVdIHx8ICcnKS50cmltKCkpIC8vIGF0dHJpYnV0ZSB2YWx1ZVxyXG4gICAgICAgIClcclxuICAgICAgfSlcclxuICAgICAgbm9kZSA9IG5vZGUuc2xpY2UoMCwgbWF0Y2hlcy5pbmRleCkgKyBub2RlLnNsaWNlKG1hdGNoZXMuaW5kZXggKyBtYXRjaGVzWzBdLmxlbmd0aClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1hdGNoZXMgKG5vZGUsIHNjb3BlKSB7XHJcbiAgICB2YXIgaVxyXG5cclxuICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSAxKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICAvLyBBbHdheXMgdGhpcyBleHRyYSBjb2RlIGZvciBodG1sIC0uLVxyXG4gICAgaWYgKG5vZGUubmFtZXNwYWNlVVJJID09PSBodG1sKSB7XHJcbiAgICAgIHRoaXMudGFnID0gdGhpcy50YWcudG9VcHBlckNhc2UoKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRhZyAmJiB0aGlzLnRhZyAhPT0gbm9kZS5ub2RlTmFtZSAmJiB0aGlzLnRhZyAhPT0gJyonKSB7IHJldHVybiBmYWxzZSB9XHJcblxyXG4gICAgaWYgKHRoaXMuaWQgJiYgdGhpcy5pZCAhPT0gbm9kZS5pZCkge1xyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2xhc3NMaXN0ID0gKG5vZGUuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihlbCA9PiAhIWVsLmxlbmd0aClcclxuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5maWx0ZXIoY2xhc3NOYW1lID0+IGNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSkgPCAwKS5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChpID0gdGhpcy5hdHRycy5sZW5ndGg7IGktLTspIHtcclxuICAgICAgdmFyIGF0dHJWYWx1ZSA9IHRoaXMuYXR0cnNbaV0uZ2V0VmFsdWUobm9kZSlcclxuICAgICAgaWYgKGF0dHJWYWx1ZSA9PT0gbnVsbCB8fCAhdGhpcy5hdHRyc1tpXS5tYXRjaGVyKGF0dHJWYWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaSA9IHRoaXMucHNldWRvLmxlbmd0aDsgaS0tOykge1xyXG4gICAgICBpZiAoIXRoaXMucHNldWRvW2ldKG5vZGUsIHNjb3BlKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IFNWR1BvaW50IH0gZnJvbSAnLi4vZG9tL3N2Zy9TVkdQb2ludC5qcydcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludCB7XHJcbiAgLy8gSW5pdGlhbGl6ZVxyXG4gIGNvbnN0cnVjdG9yICh4LCB5KSB7XHJcbiAgICBjb25zdCBiYXNlID0geyB4OiAwLCB5OiAwIH1cclxuXHJcbiAgICAvLyBlbnN1cmUgc291cmNlIGFzIG9iamVjdFxyXG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh4KVxyXG4gICAgICA/IHsgeDogeFswXSwgeTogeFsxXSB9XHJcbiAgICAgIDogdHlwZW9mIHggPT09ICdvYmplY3QnXHJcbiAgICAgICAgPyB7IHg6IHgueCwgeTogeC55IH1cclxuICAgICAgICA6IHggIT0gbnVsbFxyXG4gICAgICAgICAgPyB7IHg6IHgsIHk6ICh5ICE9IG51bGwgPyB5IDogeCkgfVxyXG4gICAgICAgICAgOiBiYXNlIC8vIElmIHkgaGFzIG5vIHZhbHVlLCB0aGVuIHggaXMgdXNlZCBoYXMgaXRzIHZhbHVlXHJcblxyXG4gICAgLy8gbWVyZ2Ugc291cmNlXHJcbiAgICB0aGlzLnggPSBzb3VyY2UueFxyXG4gICAgdGhpcy55ID0gc291cmNlLnlcclxuICB9XHJcblxyXG4gIGFicyAoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMuYWJzUXVhZCgpKVxyXG4gIH1cclxuXHJcbiAgYWJzUXVhZCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55XHJcbiAgfVxyXG5cclxuICBhZGQgKHgsIHkpIHtcclxuICAgIGNvbnN0IHAgPSBuZXcgUG9pbnQoeCwgeSlcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54ICsgcC54LCB0aGlzLnkgKyBwLnkpXHJcbiAgfVxyXG5cclxuICBhbmdsZVRvIChwKSB7XHJcbiAgICBsZXQgc2lnbiA9IE1hdGguc2lnbih0aGlzLnggKiBwLnkgLSB0aGlzLnkgKiBwLngpXHJcbiAgICBzaWduID0gc2lnbiB8fCAxXHJcbiAgICByZXR1cm4gc2lnbiAqIE1hdGguYWNvcyhNYXRoLnJvdW5kKCh0aGlzLmRvdChwKSAvICh0aGlzLmFicygpICogcC5hYnMoKSkpICogMTAwMDAwMCkgLyAxMDAwMDAwKVxyXG4gIH1cclxuXHJcbiAgLy8gQ2xvbmUgcG9pbnRcclxuICBjbG9uZSAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMpXHJcbiAgfVxyXG5cclxuICBjbG9zZVRvIChwLCBldGEgPSAwLjAwMDAxKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lcXVhbHMocCkgfHwgKE1hdGguYWJzKHRoaXMueCAtIHAueCkgPCBldGEgJiYgTWF0aC5hYnModGhpcy55IC0gcC55KSA8IGV0YSlcclxuICB9XHJcblxyXG4gIGRpdiAoZmFjdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCAvIGZhY3RvciwgdGhpcy55IC8gZmFjdG9yKVxyXG4gIH1cclxuXHJcbiAgZG90IChwKSB7XHJcbiAgICByZXR1cm4gdGhpcy54ICogcC54ICsgdGhpcy55ICogcC55XHJcbiAgfVxyXG5cclxuICBlcXVhbHMgKHApIHtcclxuICAgIHJldHVybiB0aGlzLnggPT09IHAueCAmJiB0aGlzLnkgPT09IHAueVxyXG4gIH1cclxuXHJcbiAgbXVsIChmYWN0b3IpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54ICogZmFjdG9yLCB0aGlzLnkgKiBmYWN0b3IpXHJcbiAgfVxyXG5cclxuICAvLyBDb252ZXJ0IHRvIG5hdGl2ZSBTVkdQb2ludFxyXG4gIG5hdGl2ZSAoKSB7XHJcbiAgICAvLyBjcmVhdGUgbmV3IHBvaW50XHJcbiAgICBjb25zdCBwb2ludCA9IG5ldyBTVkdQb2ludCgpXHJcblxyXG4gICAgLy8gdXBkYXRlIHdpdGggY3VycmVudCB2YWx1ZXNcclxuICAgIHBvaW50LnggPSB0aGlzLnhcclxuICAgIHBvaW50LnkgPSB0aGlzLnlcclxuXHJcbiAgICByZXR1cm4gcG9pbnRcclxuICB9XHJcblxyXG4gIG5vcm1hbCAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueSwgLXRoaXMueClcclxuICB9XHJcblxyXG4gIG5vcm1hbGl6ZSAoKSB7XHJcbiAgICBjb25zdCBhYnMgPSB0aGlzLmFicygpXHJcbiAgICBpZiAoIWFicykgdGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IG5vcm1hbGl6ZSB2ZWN0b3Igb2YgemVybyBsZW5ndGgnKVxyXG4gICAgcmV0dXJuIHRoaXMuZGl2KGFicylcclxuICB9XHJcblxyXG4gIHJlZmxlY3RBdCAocCkge1xyXG4gICAgcmV0dXJuIHAuYWRkKHAuc3ViKHRoaXMpKVxyXG4gIH1cclxuXHJcbiAgc3ViICh4LCB5KSB7XHJcbiAgICBjb25zdCBwID0gbmV3IFBvaW50KHgsIHkpXHJcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCAtIHAueCwgdGhpcy55IC0gcC55KVxyXG4gIH1cclxuXHJcbiAgdG9BcnJheSAoKSB7XHJcbiAgICByZXR1cm4gWyB0aGlzLngsIHRoaXMueSBdXHJcbiAgfVxyXG5cclxuICB0b1BhdGggKCkge1xyXG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLngsIHRoaXMueSBdLmpvaW4oJyAnKVxyXG4gIH1cclxuXHJcbiAgLy8gdHJhbnNmb3JtIHBvaW50IHdpdGggbWF0cml4XHJcbiAgdHJhbnNmb3JtIChtYXRyaXgpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5uYXRpdmUoKS5tYXRyaXhUcmFuc2Zvcm0obWF0cml4KSlcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybU8gKG1hdHJpeCkge1xyXG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLm5hdGl2ZSgpLm1hdHJpeFRyYW5zZm9ybShtYXRyaXgpXHJcbiAgICB0aGlzLnggPSB4XHJcbiAgICB0aGlzLnkgPSB5XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBOb2RlRmlsdGVyIH0gZnJvbSAnLi4vZG9tL05vZGVGaWx0ZXIuanMnXHJcblxyXG5jb25zdCBzaG93VGhpc05vZGUgPSAod2hhdFRvU2hvdywgbm9kZSkgPT4ge1xyXG4gIGlmICh3aGF0VG9TaG93ID09PSBOb2RlRmlsdGVyLlNIT1dfQUxMKSByZXR1cm4gdHJ1ZVxyXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHJldHVybiB0cnVlXHJcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfVEVYVCAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLlRFWFRfTk9ERSkgcmV0dXJuIHRydWVcclxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19FTlRJVFlfUkVGRVJFTkNFICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRU5USVRZX1JFRkVSRU5DRV9OT0RFKSByZXR1cm4gdHJ1ZVxyXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX0VOVElUWSAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkVOVElUWV9OT0RFKSByZXR1cm4gdHJ1ZVxyXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX1BST0NFU1NJTkdfSU5TVFJVQ1RJT04gJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5QUk9DRVNTSU5HX0lOU1RSVUNUSU9OX05PREUpIHJldHVybiB0cnVlXHJcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkNPTU1FTlRfTk9ERSkgcmV0dXJuIHRydWVcclxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19ET0NVTUVOVCAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkRPQ1VNRU5UX05PREUpIHJldHVybiB0cnVlXHJcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfRE9DVU1FTlRfVFlQRSAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkRPQ1VNRU5UX1RZUEVfTk9ERSkgcmV0dXJuIHRydWVcclxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19ET0NVTUVOVF9GUkFHTUVOVCAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpIHJldHVybiB0cnVlXHJcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfTk9UQVRJT04gJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5OT1RBVElPTl9OT0RFKSByZXR1cm4gdHJ1ZVxyXG4gIHJldHVybiBmYWxzZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTm9kZUl0ZXJhdG9yIHtcclxuICBjb25zdHJ1Y3RvciAocm9vdCwgd2hhdFRvU2hvdyA9IE5vZGVGaWx0ZXIuU0hPV19BTEwsIGZpbHRlciA9ICgpID0+IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCwgaW5jbHVkZVBhcmVudCA9IHRydWUpIHtcclxuICAgIHRoaXMucm9vdCA9IGluY2x1ZGVQYXJlbnQgPyB7IGNoaWxkTm9kZXM6IFsgcm9vdCBdIH0gOiByb290XHJcbiAgICB0aGlzLndoYXRUb1Nob3cgPSB3aGF0VG9TaG93XHJcbiAgICB0aGlzLmZpbHRlciA9IGZpbHRlclxyXG4gIH1cclxuXHJcbiAgKiBbU3ltYm9sLml0ZXJhdG9yXSAoKSB7XHJcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucm9vdC5jaGlsZE5vZGVzXHJcblxyXG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XHJcbiAgICAgIGlmICghc2hvd1RoaXNOb2RlKHRoaXMud2hhdFRvU2hvdywgbm9kZSkpIGNvbnRpbnVlXHJcblxyXG4gICAgICBjb25zdCBmaWx0ZXJSZXQgPSB0aGlzLmZpbHRlcihub2RlKVxyXG5cclxuICAgICAgaWYgKGZpbHRlclJldCA9PT0gTm9kZUZpbHRlci5GSUxURVJfUkVKRUNUKSBjb250aW51ZVxyXG4gICAgICBpZiAoZmlsdGVyUmV0ID09PSBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQpIHtcclxuICAgICAgICB5aWVsZCBub2RlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHlpZWxkICogbmV3IE5vZGVJdGVyYXRvcihub2RlLCB0aGlzLndoYXRUb1Nob3csIHRoaXMuZmlsdGVyLCBmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBCb3gsIE5vQm94IH0gZnJvbSAnLi4vb3RoZXIvQm94LmpzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50Q2xvdWQgZXh0ZW5kcyBBcnJheSB7XHJcbiAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJnc1swXSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgc3VwZXIoYXJncy5zaGlmdCgpKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3VwZXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGV4Y2VwdCBtdWx0aXBsZSBwb2ludCBhcnJheXMgYXMgaW5wdXQgYW5kIG1lcmdlIHRoZW0gaW50byBvbmVcclxuICAgIGFyZ3MucmVkdWNlKChsYXN0LCBjdXJyKSA9PiB7XHJcbiAgICAgIGxhc3QucHVzaCguLi5jdXJyKVxyXG4gICAgICByZXR1cm4gdGhpc1xyXG4gICAgfSwgdGhpcylcclxuICB9XHJcblxyXG4gIGJib3ggKCkge1xyXG4gICAgaWYgKCF0aGlzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gbmV3IE5vQm94KClcclxuICAgIH1cclxuXHJcbiAgICBsZXQgeE1pbiA9IEluZmluaXR5XHJcbiAgICBsZXQgeE1heCA9IC1JbmZpbml0eVxyXG4gICAgbGV0IHlNaW4gPSBJbmZpbml0eVxyXG4gICAgbGV0IHlNYXggPSAtSW5maW5pdHlcclxuXHJcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcclxuICAgICAgeE1pbiA9IE1hdGgubWluKHhNaW4sIHAueClcclxuICAgICAgeE1heCA9IE1hdGgubWF4KHhNYXgsIHAueClcclxuICAgICAgeU1pbiA9IE1hdGgubWluKHlNaW4sIHAueSlcclxuICAgICAgeU1heCA9IE1hdGgubWF4KHlNYXgsIHAueSlcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIG5ldyBCb3goXHJcbiAgICAgIHhNaW4sIHlNaW4sXHJcbiAgICAgIHhNYXggLSB4TWluLFxyXG4gICAgICB5TWF4IC0geU1pblxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgbWVyZ2UgKGNsb3VkKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50Q2xvdWQodGhpcywgY2xvdWQpXHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm0gKG0pIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnRDbG91ZCh0aGlzLm1hcCgocCkgPT4gcC50cmFuc2Zvcm0obSkpKVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgcGF0aFV0aWxzIGZyb20gJy4vcGF0aFV0aWxzLmpzJ1xyXG5pbXBvcnQgKiBhcyByZWdleCBmcm9tICcuL3JlZ2V4LmpzJ1xyXG5pbXBvcnQgKiBhcyB0ZXh0VXRpbHMgZnJvbSAnLi90ZXh0VXRpbHMuanMnXHJcbmltcG9ydCB7IE5vQm94IH0gZnJvbSAnLi4vb3RoZXIvQm94LmpzJ1xyXG5pbXBvcnQgeyBOb2RlSXRlcmF0b3IgfSBmcm9tICcuL05vZGVJdGVyYXRvci5qcydcclxuaW1wb3J0IHsgTm9kZUZpbHRlciB9IGZyb20gJy4uL2RvbS9Ob2RlRmlsdGVyLmpzJ1xyXG5cclxuY29uc3QgYXBwbHlUcmFuc2Zvcm1hdGlvbiA9IChzZWdtZW50cywgbm9kZSwgYXBwbHlUcmFuc2Zvcm1hdGlvbnMpID0+IHtcclxuICBpZiAobm9kZS5tYXRyaXhpZnkgJiYgYXBwbHlUcmFuc2Zvcm1hdGlvbnMpIHtcclxuICAgIHJldHVybiBzZWdtZW50cy50cmFuc2Zvcm0obm9kZS5tYXRyaXhpZnkoKSlcclxuICB9XHJcbiAgcmV0dXJuIHNlZ21lbnRzXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTZWdtZW50cyA9IChub2RlLCBhcHBseVRyYW5zZm9ybWF0aW9ucywgcmJveCA9IGZhbHNlKSA9PiB7XHJcbiAgY29uc3Qgc2VnbWVudHMgPSBnZXRQYXRoU2VnbWVudHMobm9kZSwgcmJveClcclxuICByZXR1cm4gYXBwbHlUcmFuc2Zvcm1hdGlvbihzZWdtZW50cywgbm9kZSwgYXBwbHlUcmFuc2Zvcm1hdGlvbnMpXHJcbn1cclxuXHJcbmNvbnN0IGdldFBhdGhTZWdtZW50cyA9IChub2RlLCByYm94KSA9PiB7XHJcbiAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEpIHJldHVybiBuZXcgcGF0aFV0aWxzLlBhdGhTZWdtZW50QXJyYXkoKVxyXG5cclxuICBzd2l0Y2ggKG5vZGUubm9kZU5hbWUpIHtcclxuICBjYXNlICdyZWN0JzpcclxuICBjYXNlICdpbWFnZSc6XHJcbiAgY2FzZSAncGF0dGVybic6XHJcbiAgY2FzZSAnbWFzayc6XHJcbiAgY2FzZSAnZm9yZWlnbk9iamVjdCc6XHJcbiAgICAvLyBDcmVhdGUgUGF0aCBmcm9tIHJlY3QgYW5kIGNyZWF0ZSBQb2ludENsb3VkIGZyb20gUGF0aFxyXG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRQYXRoU2VnbWVudHMocGF0aFV0aWxzLnBhdGhGcm9tLnJlY3Qobm9kZSkpXHJcbiAgY2FzZSAnc3ZnJzpcclxuICBjYXNlICdzeW1ib2wnOlxyXG4gICAgLy8gcmV0dXJuIHBhdGhVdGlscy5nZXRQYXRoU2VnbWVudHMocGF0aFV0aWxzLnBhdGhGcm9tLnJlY3Qobm9kZSkpXHJcbiAgICBpZiAocmJveCkge1xyXG4gICAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20ucmVjdChub2RlKSlcclxuICAgIH1cclxuICAvLyBBVFRFTlRJT046IEZBTEwgVEhST1VHSFxyXG4gIC8vIEJlY2F1c2Ugbm9ybWFsIGJib3ggaXMgY2FsY3VsYXRlZCBieSB0aGUgY29udGVudCBvZiB0aGUgZWxlbWVudCBhbmQgbm90IGl0cyB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgY2FzZSAnZyc6XHJcbiAgY2FzZSAnY2xpcFBhdGgnOlxyXG4gIGNhc2UgJ2EnOlxyXG4gIGNhc2UgJ21hcmtlcic6XHJcbiAgICAvLyBJdGVyYXRlIHRyb3VnaCBhbGwgY2hpbGRyZW4gYW5kIGdldCB0aGUgcG9pbnQgY2xvdWQgb2YgZWFjaFxyXG4gICAgLy8gVGhlbiB0cmFuc2Zvcm0gaXQgd2l0aCB2aWV3Ym94IG1hdHJpeCBpZiBuZWVkZWRcclxuICAgIHJldHVybiBub2RlLmNoaWxkTm9kZXMucmVkdWNlKChzZWdtZW50cywgY2hpbGQpID0+IHtcclxuICAgICAgaWYgKCFjaGlsZC5tYXRyaXhpZnkpIHJldHVybiBzZWdtZW50c1xyXG4gICAgICByZXR1cm4gc2VnbWVudHMubWVyZ2UoZ2V0U2VnbWVudHMoY2hpbGQsIHRydWUpLnRyYW5zZm9ybShjaGlsZC5nZW5lcmF0ZVZpZXdCb3hNYXRyaXgoKSkpXHJcbiAgICB9LCBuZXcgcGF0aFV0aWxzLlBhdGhTZWdtZW50QXJyYXkoKSlcclxuICBjYXNlICdjaXJjbGUnOlxyXG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRQYXRoU2VnbWVudHMocGF0aFV0aWxzLnBhdGhGcm9tLmNpcmNsZShub2RlKSlcclxuICBjYXNlICdlbGxpcHNlJzpcclxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKHBhdGhVdGlscy5wYXRoRnJvbS5lbGxpcHNlKG5vZGUpKVxyXG4gIGNhc2UgJ2xpbmUnOlxyXG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRQYXRoU2VnbWVudHMocGF0aFV0aWxzLnBhdGhGcm9tLmxpbmUobm9kZSkpXHJcbiAgY2FzZSAncG9seWxpbmUnOlxyXG4gIGNhc2UgJ3BvbHlnb24nOlxyXG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRQYXRoU2VnbWVudHMocGF0aFV0aWxzLnBhdGhGcm9tLnBvbHlsaW5lKG5vZGUpKVxyXG4gIGNhc2UgJ3BhdGgnOlxyXG4gIGNhc2UgJ2dseXBoJzpcclxuICBjYXNlICdtaXNzaW5nLWdseXBoJzpcclxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKG5vZGUuZ2V0QXR0cmlidXRlKCdkJykpXHJcbiAgY2FzZSAndXNlJzoge1xyXG4gICAgLy8gR2V0IHJlZmVyZW5jZSBmcm9tIGVsZW1lbnRcclxuICAgIGNvbnN0IHJlZiA9IG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnKVxyXG4gICAgLy8gR2V0IHRoZSBhY3R1YWwgcmVmZXJlbmNlZCBOb2RlXHJcbiAgICBjb25zdCByZWZOb2RlID0gbm9kZS5nZXRSb290Tm9kZSgpLmdldEVsZW1lbnRCeUlkKHJlZi5zbGljZSgxKSlcclxuICAgIC8vIEdldCB0aGUgQkJveCBvZiB0aGUgcmVmZXJlbmNlZCBlbGVtZW50IGFuZCBhcHBseSB0aGUgdmlld2JveCBvZiA8dXNlPlxyXG4gICAgLy8gVE9ETzogRG8gd2UgbmVlZCB0byBhcHBseSB0aGUgdHJhbnNmb3JtYXRpb25zIG9mIHRoZSBlbGVtZW50P1xyXG4gICAgLy8gQ2hlY2sgYmJveCBvZiB0cmFuc2Zvcm1lZCBlbGVtZW50IHdoaWNoIGlzIHJldXNlZCB3aXRoIDx1c2U+XHJcbiAgICByZXR1cm4gZ2V0U2VnbWVudHMocmVmTm9kZSkudHJhbnNmb3JtKG5vZGUuZ2VuZXJhdGVWaWV3Qm94TWF0cml4KCkpXHJcbiAgfVxyXG4gIGNhc2UgJ3RzcGFuJzpcclxuICBjYXNlICd0ZXh0JzpcclxuICBjYXNlICdhbHRHbHlwaCc6IHtcclxuICAgIGNvbnN0IGJveCA9IGdldFRleHRCQm94KG5vZGUpXHJcblxyXG4gICAgaWYgKGJveCBpbnN0YW5jZW9mIE5vQm94KSB7XHJcbiAgICAgIHJldHVybiBuZXcgcGF0aFV0aWxzLlBhdGhTZWdtZW50QXJyYXkoKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKHBhdGhVdGlscy5wYXRoRnJvbS5ib3goYm94KSlcclxuICB9XHJcbiAgZGVmYXVsdDpcclxuICAgIHJldHVybiBuZXcgcGF0aFV0aWxzLlBhdGhTZWdtZW50QXJyYXkoKVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZ2V0VGV4dEJCb3ggPSAobm9kZSkgPT4ge1xyXG4gIGNvbnN0IHRleHRSb290ID0gZmluZFRleHRSb290KG5vZGUpXHJcbiAgY29uc3QgYm94ZXMgPSBnZXRUZXh0QkJveGVzKG5vZGUsIHRleHRSb290KVxyXG4gIHJldHVybiBib3hlcy5maWx0ZXIoaXNOb3RFbXB0eUJveCkucmVkdWNlKChsYXN0LCBjdXJyKSA9PiBsYXN0Lm1lcmdlKGN1cnIpLCBuZXcgTm9Cb3goKSlcclxufVxyXG5cclxuY29uc3QgZmluZFRleHRSb290ID0gKG5vZGUpID0+IHtcclxuICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XHJcbiAgICBpZiAoKG5vZGUubm9kZU5hbWUgPT09ICd0ZXh0JyAmJiBub2RlLnBhcmVudE5vZGUubm9kZU5hbWUgPT09ICd0ZXh0JylcclxuICAgIHx8ICgobm9kZS5ub2RlTmFtZSA9PT0gJ3RzcGFuJyB8fCBub2RlLm5vZGVOYW1lID09PSAndGV4dFBhdGgnKSAmJiBbICd0c3BhbicsICd0ZXh0JywgJ3RleHRQYXRoJyBdLmluY2x1ZGVzKG5vZGUucGFyZW50Tm9kZS5ub2RlTmFtZSkpKSB7XHJcbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9kZVxyXG59XHJcblxyXG4vLyBUaGlzIGZ1bmN0aW9uIHRha2VzIGEgbm9kZSBvZiB3aGljaCB0aGUgYmJveCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkXHJcbi8vIEluIG9yZGVyIHRvIHBvc2l0aW9uIHRoZSBib3ggY29ycmVjdGx5LCB3ZSBuZWVkIHRvIGtub3cgd2VyZSB0aGUgcGFyZW50IGFuZCB3ZXJlIHRoZSBzaWJsaW5ncyAqYmVmb3JlKiBvdXIgbm9kZSBhcmVcclxuLy8gVGhhdHMgd2h5IGEgdGV4dFJvb3QgaXMgcGFzc2VkIHdoaWNoIGlzIHRoZSBtb3N0IG91dGVyIHRleHRFbGVtZW50IG5lZWRlZCB0byBjYWxjdWxhdGUgYWxsIGJveGVzXHJcbi8vIFdoZW4gdGhlIGl0ZXJhdG9yIGhpdHMgdGhlIGVsZW1lbnQgd2UgbmVlZCB0aGUgYmJveCBvZiwgaXQgaXMgdGVybWluYXRlZCBhbmQgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgYWdhaW5cclxuLy8gb25seSBmb3IgdGhlIHN1YnN0cmVlIG9mIG91ciBub2RlIGFuZCB3aXRob3V0IHRleHRSb29yIGJ1dCBpbnN0ZWFkIHBvcywgZHggYW5kIGR5IGFyZSBrbm93blxyXG5jb25zdCBnZXRUZXh0QkJveGVzID0gZnVuY3Rpb24gKHRhcmdldCwgdGV4dFJvb3QgPSB0YXJnZXQsIHBvcyA9IHsgeDogMCwgeTogMCB9LCBkeCA9IFsgMCBdLCBkeSA9IFsgMCBdLCBib3hlcyA9IFtdKSB7XHJcblxyXG4gIC8vIENyZWF0ZSBOb2RlSXRlcmF0b3IuIE9ubHkgc2hvdyBlbGVtbnRzIGFuZCB0ZXh0IGFuZCBza2lwIGRlc2NyaXB0aXZlIGVsZW1lbnRzXHJcbiAgLy8gVE9ETzogbWFrZSBhbiBpbnN0YW5jZW9mIGNoZWNrIGZvciBEZXNjcmlwdGl2ZUVsZW1lbnQgaW5zdGVhZCBvZiB0ZXN0aW5nIG9uZSBieSBvbmVcclxuICAvLyBPbmx5IHRpdGxlIGlzIHNraXBwZWQgYXRtXHJcbiAgY29uc3QgaXRlciA9IG5ldyBOb2RlSXRlcmF0b3IodGV4dFJvb3QsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIChub2RlKSA9PiB7XHJcbiAgICBpZiAobm9kZS5ub2RlTmFtZSA9PT0gJ3RpdGxlJykgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRVxyXG4gICAgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVFxyXG4gIH0pXHJcblxyXG4gIC8vIEl0ZXJhdGUgdHJvdWdoIGFsbCBub2RlcyB0b3AgdG8gYm90dG9tLCBsZWZ0IHRvIHJpZ2h0XHJcbiAgZm9yIChjb25zdCBub2RlIG9mIGl0ZXIpIHtcclxuXHJcbiAgICAvLyBJZiB3ZSBoaXQgb3VyIHRhcmdldCwgd2UgZ2F0aGVyZWQgYWxsIHBvc2l0aW9uYWwgaW5mb3JtYXRpb24gd2UgbmVlZCB0byBtb3ZlIHRoZSBiYm94IHRvIHRoZSBjb3JyZWN0IHNwb3RcclxuICAgIGlmIChub2RlID09PSB0YXJnZXQgJiYgbm9kZSAhPT0gdGV4dFJvb3QpIHtcclxuICAgICAgcmV0dXJuIGdldFRleHRCQm94ZXMobm9kZSwgbm9kZSwgcG9zLCBkeCwgZHkpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gVHJhdmVyc2UgdHJvdWdoIHRoaXMgbm9kZSB1cGRhdGluZyBwb3NpdGlvbnMgYW5kIGFkZCBib3hlc1xyXG4gICAgZ2V0UG9zaXRpb25EZXRhaWxzRm9yKG5vZGUsIHBvcywgZHgsIGR5LCBib3hlcylcclxuICB9XHJcblxyXG4gIHJldHVybiBib3hlc1xyXG59XHJcblxyXG5jb25zdCBpc05vdEVtcHR5Qm94ID0gYm94ID0+IGJveC54ICE9PSAwIHx8IGJveC55ICE9PSAwIHx8IGJveC53aWR0aCAhPT0gMCB8fCBib3guaGVpZ2h0ICE9PSAwXHJcblxyXG4vLyBUaGlzIGZ1bmN0aW9uIGVpdGhlciB1cGRhdGVzIHBvcywgZHggYW5kIGR5ICh3aGVuIGl0cyBhbiBlbGVtZW50KSBvciBjYWxjdWxhdGVzIHRoZSBib3hlcyBmb3IgdGV4dCB3aXRoIHRoZSBwYXNzZWQgYXJndW1lbnRzXHJcbi8vIEFsbCBhcmd1bWVudHMgYXJlIHBhc3NlZCBieSByZWZlcmVuY2Ugc28gZG9udCBvdmVyd3JpdGUgdGhlbSAodHJlYXQgdGhlbSBhcyBjb25zdCEpXHJcbi8vIFRPRE86IEJyZWFrIHRoaXMgaW50byB0d28gZnVuY3Rpb25zP1xyXG5jb25zdCBnZXRQb3NpdGlvbkRldGFpbHNGb3IgPSAobm9kZSwgcG9zLCBkeCwgZHksIGJveGVzKSA9PiB7XHJcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneCcpKVxyXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3knKSlcclxuXHJcbiAgICBwb3MueCA9IGlzTmFOKHgpID8gcG9zLnggOiB4XHJcbiAgICBwb3MueSA9IGlzTmFOKHkpID8gcG9zLnkgOiB5XHJcblxyXG4gICAgY29uc3QgZHgwID0gKG5vZGUuZ2V0QXR0cmlidXRlKCdkeCcpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihudW0gPT4gbnVtICE9PSAnJykubWFwKHBhcnNlRmxvYXQpXHJcbiAgICBjb25zdCBkeTAgPSAobm9kZS5nZXRBdHRyaWJ1dGUoJ2R5JykgfHwgJycpLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikuZmlsdGVyKG51bSA9PiBudW0gIT09ICcnKS5tYXAocGFyc2VGbG9hdClcclxuXHJcbiAgICAvLyBUT0RPOiBldmVudHVhbGx5IHJlcGxhY2Ugb25seSBhcyBtdWNoIHZhbHVlcyBhcyB3ZSBoYXZlIHRleHQgY2hhcnMgKG5vZGUudGV4dENvbnRlbnQubGVuZ3RoKSBiZWNhdXNlIHdlIGNvdWxkIGVuZCB1cCBhZGRpbmcgdG8gbXVjaFxyXG4gICAgLy8gcmVwbGFjZSBpbml0aWFsIHZhbHVlcyB3aXRoIG5vZGUgdmFsdWVzIGlmIHByZXNlbnRcclxuICAgIGR4LnNwbGljZSgwLCBkeDAubGVuZ3RoLCAuLi5keDApXHJcbiAgICBkeS5zcGxpY2UoMCwgZHkwLmxlbmd0aCwgLi4uZHkwKVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBnZXQgdGV4dCBkYXRhXHJcbiAgICBjb25zdCBkYXRhID0gbm9kZS5kYXRhXHJcblxyXG4gICAgbGV0IGogPSAwXHJcbiAgICBjb25zdCBqbCA9IGRhdGEubGVuZ3RoXHJcbiAgICBjb25zdCBkZXRhaWxzID0gZ2V0Rm9udERldGFpbHMobm9kZSlcclxuXHJcbiAgICAvLyBpZiBpdCBpcyBtb3JlIHRoYW4gb25lIGR4L2R5IHNpbmdsZSBsZXR0ZXJzIGFyZSBtb3ZlZCBieSB0aGUgYW1vdW50IChodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9TVkcvQXR0cmlidXRlL2R4KVxyXG4gICAgaWYgKGR5Lmxlbmd0aCB8fCBkeC5sZW5ndGgpIHtcclxuICAgICAgZm9yICg7aiA8IGpsOyBqKyspIHtcclxuICAgICAgICAvLyBDYWxjdWxhdGUgYSBib3ggZm9yIGEgc2luZ2xlIGxldHRlclxyXG4gICAgICAgIGJveGVzLnB1c2godGV4dFV0aWxzLnRleHRCQm94KGRhdGEuc3Vic3RyKGosIDEpLCBwb3MueCwgcG9zLnksIGRldGFpbHMpKVxyXG5cclxuICAgICAgICAvLyBBZGQgdGhlIG5leHQgcG9zaXRpb24gdG8gY3VycmVudCBvbmVcclxuICAgICAgICBwb3MueCArPSBkeC5zaGlmdCgpIHx8IDBcclxuICAgICAgICBwb3MueSArPSBkeS5zaGlmdCgpIHx8IDBcclxuXHJcbiAgICAgICAgaWYgKCFkeS5sZW5ndGggJiYgIWR4Lmxlbmd0aCkgYnJlYWtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGluIGNhc2UgaXQgd2FzIG9ubHkgb25lIGR4L2R5IG9yIG5vIG1vcmUgZHgvZHkgbW92ZSB0aGUgcmVzdCBvZiB0aGUgdGV4dFxyXG4gICAgYm94ZXMucHVzaCh0ZXh0VXRpbHMudGV4dEJCb3goZGF0YS5zdWJzdHIoaiksIHBvcy54LCBwb3MueSwgZGV0YWlscykpXHJcbiAgICBwb3MueCArPSBib3hlc1tib3hlcy5sZW5ndGggLSAxXS53aWR0aFxyXG4gIH1cclxufVxyXG5cclxuLypcclxuLy8gdGhpcyBmdW5jdGlvbiBpcyBwYXNzaW5nIGR4IGFuZCBkeSB2YWx1ZXMgYnkgcmVmZXJlbmNlcy4gRG9udCBhc3NpZ24gbmV3IHZhbHVlcyB0byBpdFxyXG5jb25zdCB0ZXh0SXRlcmF0b3IgPSBmdW5jdGlvbiAobm9kZSwgcG9zID0geyB4OiAwLCB5OiAwIH0sIGR4ID0gWyAwIF0sIGR5ID0gWyAwIF0pIHtcclxuXHJcbiAgdmFyIHggPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd4JykpXHJcbiAgdmFyIHkgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd5JykpXHJcblxyXG4gIHBvcy54ID0gaXNOYU4oeCkgPyBwb3MueCA6IHhcclxuICBwb3MueSA9IGlzTmFOKHkpID8gcG9zLnkgOiB5XHJcblxyXG4gIHZhciBkeDAgPSAobm9kZS5nZXRBdHRyaWJ1dGUoJ2R4JykgfHwgJycpLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikuZmlsdGVyKG51bSA9PiBudW0gIT09ICcnKS5tYXAocGFyc2VGbG9hdClcclxuICB2YXIgZHkwID0gKG5vZGUuZ2V0QXR0cmlidXRlKCdkeScpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihudW0gPT4gbnVtICE9PSAnJykubWFwKHBhcnNlRmxvYXQpXHJcbiAgdmFyIGJveGVzID0gW11cclxuICB2YXIgZGF0YSA9ICcnXHJcblxyXG4gIC8vIFRPRE86IGV2ZW50dWFsbHkgcmVwbGFjZSBvbmx5IGFzIG11Y2ggdmFsdWVzIGFzIHdlIGhhdmUgdGV4dCBjaGFycyAobm9kZS50ZXh0Q29udGVudC5sZW5ndGgpIGJlY2F1c2Ugd2UgY291bGQgZW5kIHVwIGFkZGluZyB0byBtdWNoXHJcbiAgLy8gcmVwbGFjZSBpbml0aWFsIHZhbHVlcyB3aXRoIG5vZGUgdmFsdWVzIGlmIHByZXNlbnRcclxuICBkeC5zcGxpY2UoMCwgZHgwLmxlbmd0aCwgLi4uZHgwKVxyXG4gIGR5LnNwbGljZSgwLCBkeTAubGVuZ3RoLCAuLi5keTApXHJcblxyXG4gIHZhciBpID0gMFxyXG4gIHZhciBpbCA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGhcclxuXHJcbiAgLy8gaXRlcmF0ZSB0aHJvdWdoIGFsbCBjaGlsZHJlblxyXG4gIGZvciAoOyBpIDwgaWw7ICsraSkge1xyXG5cclxuICAgIC8vIHNoaWZ0IG5leHQgY2hpbGRcclxuICAgIHBvcy54ICs9IGR4LnNoaWZ0KCkgfHwgMFxyXG4gICAgcG9zLnkgKz0gZHkuc2hpZnQoKSB8fCAwXHJcblxyXG4gICAgLy8gdGV4dFxyXG4gICAgaWYgKG5vZGUuY2hpbGROb2Rlc1tpXS5ub2RlVHlwZSA9PT0gbm9kZS5URVhUX05PREUpIHtcclxuXHJcbiAgICAgIC8vIGdldCB0ZXh0IGRhdGFcclxuICAgICAgZGF0YSA9IG5vZGUuY2hpbGROb2Rlc1tpXS5kYXRhXHJcblxyXG4gICAgICBsZXQgaiA9IDBcclxuICAgICAgY29uc3QgamwgPSBkYXRhLmxlbmd0aFxyXG5cclxuICAgICAgLy8gaWYgaXQgaXMgbW9yZSB0aGFuIG9uZSBkeC9keSBzaW5nbGUgbGV0dGVycyBhcmUgbW92ZWQgYnkgdGhlIGFtb3VudCAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS9keClcclxuICAgICAgaWYgKGR5Lmxlbmd0aCB8fCBkeC5sZW5ndGgpIHtcclxuICAgICAgICBmb3IgKDtqIDwgamw7IGorKykge1xyXG4gICAgICAgICAgYm94ZXMucHVzaCh0ZXh0VXRpbHMudGV4dEJCb3goZGF0YS5zdWJzdHIoaiwgMSksIHBvcy54LCBwb3MueSwgZ2V0Rm9udERldGFpbHMobm9kZSkpKVxyXG5cclxuICAgICAgICAgIHBvcy54ICs9IGR4LnNoaWZ0KCkgfHwgMFxyXG4gICAgICAgICAgcG9zLnkgKz0gZHkuc2hpZnQoKSB8fCAwXHJcblxyXG4gICAgICAgICAgaWYgKCFkeS5sZW5ndGggJiYgIWR4Lmxlbmd0aCkgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGluIGNhc2UgaXQgd2FzIG9ubHkgb25lIGR4L2R5IG9yIG5vIG1vcmUgZHgvZHkgbW92ZSB0aGUgcmVzdCBvZiB0aGUgdGV4dFxyXG5cclxuICAgICAgYm94ZXMucHVzaCh0ZXh0VXRpbHMudGV4dEJCb3goZGF0YS5zdWJzdHIoaiksIHBvcy54LCBwb3MueSwgZ2V0Rm9udERldGFpbHMobm9kZSkpKVxyXG4gICAgICBwb3MueCArPSBib3hlc1tib3hlcy5sZW5ndGggLSAxXS53aWR0aFxyXG5cclxuICAgIC8vIGVsZW1lbnRcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGluIGNhc2Ugb2YgZWxlbWVudCwgcmVjdXJzaXZlbHkgY2FsbCBmdW5jdGlvbiBhZ2FpbiB3aXRoIG5ldyBzdGFydCB2YWx1ZXNcclxuICAgICAgYm94ZXMgPSBib3hlcy5jb25jYXQodGV4dEl0ZXJhdG9yKG5vZGUuY2hpbGROb2Rlc1tpXSwgcG9zLCBkeCwgZHkpKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGJveGVzXHJcbn0gKi9cclxuXHJcbmNvbnN0IGdldEZvbnREZXRhaWxzID0gKG5vZGUpID0+IHtcclxuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5URVhUX05PREUpIG5vZGUgPSBub2RlLnBhcmVudE5vZGVcclxuXHJcbiAgbGV0IGZvbnRTaXplID0gbnVsbFxyXG4gIGxldCBmb250RmFtaWx5ID0gbnVsbFxyXG4gIGxldCB0ZXh0QW5jaG9yID0gbnVsbFxyXG4gIGxldCBkb21pbmFudEJhc2VsaW5lID0gbnVsbFxyXG5cclxuICBjb25zdCB0ZXh0Q29udGVudEVsZW1lbnRzID0gW1xyXG4gICAgJ3RleHQnLFxyXG4gICAgJ3RzcGFuJyxcclxuICAgICd0cmVmJyxcclxuICAgICd0ZXh0UGF0aCcsXHJcbiAgICAnYWx0R2x5cGgnLFxyXG4gICAgJ2cnXHJcbiAgXVxyXG5cclxuICBkbyB7XHJcbiAgICAvLyBUT0RPOiBzdG9wIG9uXHJcbiAgICBpZiAoIWZvbnRTaXplKSB7IGZvbnRTaXplID0gbm9kZS5zdHlsZS5mb250U2l6ZSB8fCBub2RlLmdldEF0dHJpYnV0ZSgnZm9udC1zaXplJykgfVxyXG4gICAgaWYgKCFmb250RmFtaWx5KSB7IGZvbnRGYW1pbHkgPSBub2RlLnN0eWxlLmZvbnRGYW1pbHkgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ2ZvbnQtZmFtaWx5JykgfVxyXG4gICAgaWYgKCF0ZXh0QW5jaG9yKSB7IHRleHRBbmNob3IgPSBub2RlLnN0eWxlLnRleHRBbmNob3IgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ3RleHQtYW5jaG9yJykgfVxyXG4gICAgaWYgKCFkb21pbmFudEJhc2VsaW5lKSB7IGRvbWluYW50QmFzZWxpbmUgPSBub2RlLnN0eWxlLmRvbWluYW50QmFzZWxpbmUgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ2RvbWluYW50LWJhc2VsaW5lJykgfVxyXG4gICAgLy8gVE9ETzogY2hlY2sgZm9yIGFsaWdubWVudC1iYXNlbGluZSBpbiB0c3BhbiwgdHJlZiwgdGV4dFBhdGgsIGFsdEdseXBoXHJcbiAgICAvLyBUT0RPOiBhbGlnbm1lbnQtYWRqdXN0LCBiYXNlbGluZS1zaGlmdFxyXG4gICAgLypcclxuICAgIGlmKCFhbGlnbm1lbnRCYXNlbGluZSlcclxuICAgIGFsaWdubWVudEJhc2VsaW5lID0gdGhpcy5zdHlsZS5hbGlnbm1lbnRCYXNlbGluZSB8fCB0aGlzLmdldEF0dHJpYnV0ZSgnYWxpZ25tZW50LWJhc2VsaW5lJylcclxuICAgICovXHJcblxyXG4gIH0gd2hpbGUgKFxyXG4gICAgKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpXHJcbiAgICAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkVMRU1FTlRfTk9ERVxyXG4gICAgJiYgKHRleHRDb250ZW50RWxlbWVudHMuaW5jbHVkZXMobm9kZS5ub2RlTmFtZSkpXHJcbiAgKVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZm9udEZhbWlseSxcclxuICAgIGZvbnRTaXplLFxyXG4gICAgdGV4dEFuY2hvcjogdGV4dEFuY2hvciB8fCAnc3RhcnQnLFxyXG4gICAgLy8gVE9ETzogdXNlIGNlbnRyYWwgZm9yIHdyaXRpbmctbW9kZSA9PT0gaG9yaXpvbnRhbCBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9TVkcvQXR0cmlidXRlL2RvbWluYW50LWJhc2VsaW5lXHJcbiAgICBkb21pbmFudEJhc2VsaW5lOiBkb21pbmFudEJhc2VsaW5lIHx8ICdhbHBoYWJldGljYWwnXHJcbiAgICAvLyBmb250RmFtaWx5TWFwcGluZ3M6IHRoaXMub3duZXJEb2N1bWVudC5mb250RmFtaWx5TWFwcGluZ3MsXHJcbiAgICAvLyBmb250RGlyOiB0aGlzLm93bmVyRG9jdW1lbnQuZm9udERpcixcclxuICAgIC8vIHByZWxvYWRlZDogdGhpcy5vd25lckRvY3VtZW50Ll9wcmVsb2FkZWRcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnXHJcbi8vIGltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnXHJcbmltcG9ydCB7IGRlZmF1bHQgYXMgX19kaXJuYW1lIH0gZnJvbSAnLi9kaXJuYW1lLmNqcycgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG5cclxuLy8gdXNlIHRoaXMgYXMgc29vbiBhcyBpbXBvcnQubWV0YSBpcyBzdGFuZGFyZGl6ZWRcclxuLy8gY29uc3QgX19kaXJuYW1lID0gZGlybmFtZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCkpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZvbnRTaXplID0gMTZcclxuZXhwb3J0IGNvbnN0IGZvbnRGYW1pbHkgPSAnc2Fucy1zZXJpZidcclxuZXhwb3J0IGNvbnN0IGZvbnREaXIgPSBqb2luKF9fZGlybmFtZSwgJy4uLy4uLycsICdmb250cy8nKVxyXG5leHBvcnQgY29uc3QgZm9udEZhbWlseU1hcHBpbmdzID0ge1xyXG4gICdzYW5zLXNlcmlmJzogJ09wZW5TYW5zLVJlZ3VsYXIudHRmJyxcclxuICAnT3BlbiBTYW5zJzogJ09wZW5TYW5zLVJlZ3VsYXIudHRmJ1xyXG59XHJcbiIsImltcG9ydCB7IGRlY2FtZWxpemUgfSBmcm9tICcuLi91dGlscy9zdHJVdGlscy5qcydcclxuXHJcbmV4cG9ydCBjb25zdCBvYmplY3RUb01hcCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICBpZiAob2JqIGluc3RhbmNlb2YgTWFwKSByZXR1cm4gbmV3IE1hcChvYmopXHJcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChtYXAsIGtleSkgPT4gbWFwLnNldChrZXksIG9ialtrZXldKSwgbmV3IE1hcCgpKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWFwVG9PYmplY3QgPSBmdW5jdGlvbiAobWFwKSB7XHJcbiAgdmFyIG9iaiA9IHt9XHJcbiAgbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgIG9ialtrZXldID0gdmFsdWVcclxuICB9KVxyXG4gIHJldHVybiBvYmpcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG1hcE1hcCA9IGZ1bmN0aW9uIChtYXAsIGNiKSB7XHJcbiAgdmFyIGFyciA9IFtdXHJcbiAgbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgIGFyci5wdXNoKGNiKHZhbHVlLCBrZXkpKVxyXG4gIH0pXHJcbiAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbWFwVG9Dc3MgPSBmdW5jdGlvbiAobXlNYXApIHtcclxuICByZXR1cm4gbWFwTWFwKG15TWFwLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlXHJcbiAgICByZXR1cm4gZGVjYW1lbGl6ZShrZXkpICsgJzogJyArIHZhbHVlXHJcbiAgfSkuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gISFlbCB9KS5qb2luKCc7ICcpICsgJzsnIHx8IG51bGxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNzc1RvTWFwID0gZnVuY3Rpb24gKGNzcykge1xyXG4gIHJldHVybiBuZXcgTWFwKGNzcy5zcGxpdCgvXFxzKjtcXHMqLykuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gISFlbCB9KS5tYXAoZnVuY3Rpb24gKGVsKSB7XHJcbiAgICByZXR1cm4gZWwuc3BsaXQoL1xccyo6XFxzKi8pXHJcbiAgfSkpXHJcbn1cclxuIiwiXHJcbmV4cG9ydCBjb25zdCBzdmcgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXHJcbmV4cG9ydCBjb25zdCB4bGluayA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJ1xyXG5leHBvcnQgY29uc3QgaHRtbCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJ1xyXG5leHBvcnQgY29uc3QgbWF0aG1sID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnXHJcbmV4cG9ydCBjb25zdCB4bWwgPSAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJ1xyXG5leHBvcnQgY29uc3QgeG1sbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nXHJcbiIsImV4cG9ydCBjb25zdCBub2Rlc1RvTm9kZSA9IChub2RlcywgZG9jdW1lbnQpID0+IHtcclxuICBub2RlcyA9IG5vZGVzLm1hcCgobm9kZSkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSlcclxuICAgIH1cclxuICAgIHJldHVybiBub2RlXHJcbiAgfSlcclxuICBpZiAobm9kZXMubGVuZ3RoID09PSAxKSB7IHJldHVybiBub2RlcyB9XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxyXG4gIG5vZGVzLmZvckVhY2gobm9kZS5hcHBlbmRDaGlsZCwgbm9kZSlcclxuICByZXR1cm4gbm9kZVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBleHRlbmQgPSAoLi4ubW9kdWxlcykgPT4ge1xyXG4gIHZhciBtZXRob2RzLCBrZXksIGlcclxuXHJcbiAgLy8gR2V0IG9iamVjdCB3aXRoIGV4dGVuc2lvbnNcclxuICBtZXRob2RzID0gbW9kdWxlcy5wb3AoKVxyXG5cclxuICBmb3IgKGkgPSBtb2R1bGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBmb3IgKGtleSBpbiBtZXRob2RzKSB7IG1vZHVsZXNbaV0ucHJvdG90eXBlW2tleV0gPSBtZXRob2RzW2tleV0gfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGV4dGVuZFN0YXRpYyA9ICguLi5tb2R1bGVzKSA9PiB7XHJcbiAgdmFyIG1ldGhvZHMsIGtleSwgaVxyXG5cclxuICAvLyBHZXQgb2JqZWN0IHdpdGggZXh0ZW5zaW9uc1xyXG4gIG1ldGhvZHMgPSBtb2R1bGVzLnBvcCgpXHJcblxyXG4gIGZvciAoaSA9IG1vZHVsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIGZvciAoa2V5IGluIG1ldGhvZHMpIHsgbW9kdWxlc1tpXVtrZXldID0gbWV0aG9kc1trZXldIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFRPRE86IHJlZmFjdG9yIHNvIHRoYXQgaXQgdGFrZXMgYSBjbGFzc1xyXG5leHBvcnQgY29uc3QgbWl4aW4gPSAobWl4aW4sIF9jbGFzcykgPT4ge1xyXG4gIGNvbnN0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobWl4aW4pXHJcbiAgLy8gY29uc3QgYWxsID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobWl4aW4pXHJcblxyXG4gIC8vIGNvbnN0IHByb3BOYW1lcyA9IE9iamVjdC5rZXlzKGRlc2NyaXB0b3JzKVxyXG4gIC8vIGNvbnN0IG1ldGhvZE5hbWVzID0gYWxsLmZpbHRlcihwID0+ICFwcm9wTmFtZXMuaW5jbHVkZXMocCkpXHJcblxyXG4gIC8vIGZvciAoY29uc3QgbWV0aG9kIG9mIG1ldGhvZE5hbWVzKSB7XHJcbiAgLy8gICBfY2xhc3MucHJvdG90eXBlW21ldGhvZF0gPSBtaXhpblttZXRob2RdXHJcbiAgLy8gfVxyXG5cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhfY2xhc3MucHJvdG90eXBlLCBkZXNjcmlwdG9ycylcclxufVxyXG4iLCJpbXBvcnQgeyBCb3gsIE5vQm94IH0gZnJvbSAnLi4vb3RoZXIvQm94LmpzJ1xyXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL290aGVyL1BvaW50LmpzJ1xyXG5pbXBvcnQgKiBhcyByZWdleCBmcm9tICcuL3JlZ2V4LmpzJ1xyXG4vLyBUT0RPOiB1c2Ugb3duIG1hdHJpeCBpbXBsZW1lbnRhdGlvblxyXG5pbXBvcnQgeyBtYXRyaXhGYWN0b3J5IH0gZnJvbSAnLi8uLi9kb20vc3ZnL1NWR01hdHJpeC5qcydcclxuaW1wb3J0IHsgUG9pbnRDbG91ZCB9IGZyb20gJy4vUG9pbnRDbG91ZC5qcydcclxuXHJcbmNvbnN0IHBhdGhIYW5kbGVycyA9IHtcclxuICBNIChjLCBwLCByLCBwMCkge1xyXG4gICAgcC54ID0gcDAueCA9IGNbMF1cclxuICAgIHAueSA9IHAwLnkgPSBjWzFdXHJcblxyXG4gICAgcmV0dXJuIG5ldyBNb3ZlKHApXHJcbiAgfSxcclxuICBMIChjLCBwKSB7XHJcbiAgICBjb25zdCByZXQgPSBuZXcgTGluZShwLngsIHAueSwgY1swXSwgY1sxXSkvLyAub2Zmc2V0KG8pXHJcbiAgICBwLnggPSBjWzBdXHJcbiAgICBwLnkgPSBjWzFdXHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfSxcclxuICBIIChjLCBwKSB7XHJcbiAgICByZXR1cm4gcGF0aEhhbmRsZXJzLkwoWyBjWzBdLCBwLnkgXSwgcClcclxuICB9LFxyXG4gIFYgKGMsIHApIHtcclxuICAgIHJldHVybiBwYXRoSGFuZGxlcnMuTChbIHAueCwgY1swXSBdLCBwKVxyXG4gIH0sXHJcbiAgUSAoYywgcCwgcikge1xyXG4gICAgY29uc3QgcmV0ID0gQ3ViaWMuZnJvbVF1YWQocCwgbmV3IFBvaW50KGNbMF0sIGNbMV0pLCBuZXcgUG9pbnQoY1syXSwgY1szXSkpLy8gLm9mZnNldChvKVxyXG4gICAgcC54ID0gY1syXVxyXG4gICAgcC55ID0gY1szXVxyXG5cclxuICAgIGNvbnN0IHJlZmxlY3QgPSBuZXcgUG9pbnQoY1swXSwgY1sxXSkucmVmbGVjdEF0KHApXHJcbiAgICByLnggPSByZWZsZWN0LnhcclxuICAgIHIueSA9IHJlZmxlY3QueVxyXG5cclxuICAgIHJldHVybiByZXRcclxuICB9LFxyXG4gIFQgKGMsIHAsIHIsIHAwLCByZWZsZWN0aW9uSXNQb3NzaWJsZSkge1xyXG4gICAgaWYgKHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKSB7IGMgPSBbIHIueCwgci55IF0uY29uY2F0KGMpIH0gZWxzZSB7IGMgPSBbIHAueCwgcC55IF0uY29uY2F0KGMpIH1cclxuICAgIHJldHVybiBwYXRoSGFuZGxlcnMuUShjLCBwLCByKVxyXG4gIH0sXHJcbiAgQyAoYywgcCwgcikge1xyXG4gICAgY29uc3QgcmV0ID0gbmV3IEN1YmljKHAsIG5ldyBQb2ludChjWzBdLCBjWzFdKSwgbmV3IFBvaW50KGNbMl0sIGNbM10pLCBuZXcgUG9pbnQoY1s0XSwgY1s1XSkpLy8gLm9mZnNldChvKVxyXG4gICAgcC54ID0gY1s0XVxyXG4gICAgcC55ID0gY1s1XVxyXG4gICAgY29uc3QgcmVmbGVjdCA9IG5ldyBQb2ludChjWzJdLCBjWzNdKS5yZWZsZWN0QXQocClcclxuICAgIHIueCA9IHJlZmxlY3QueFxyXG4gICAgci55ID0gcmVmbGVjdC55XHJcbiAgICByZXR1cm4gcmV0XHJcbiAgfSxcclxuICBTIChjLCBwLCByLCBwMCwgcmVmbGVjdGlvbklzUG9zc2libGUpIHtcclxuICAgIC8vIHJlZmxlY3Rpb24gbWFrZXMgb25seSBzZW5zZSBpZiB0aGlzIGNvbW1hbmQgd2FzIHByZWNlZWRlZCBieSBhbm90aGVyIGJlemllcmUgY29tbWFuZCAoUVRTQylcclxuICAgIGlmIChyZWZsZWN0aW9uSXNQb3NzaWJsZSkgeyBjID0gWyByLngsIHIueSBdLmNvbmNhdChjKSB9IGVsc2UgeyBjID0gWyBwLngsIHAueSBdLmNvbmNhdChjKSB9XHJcbiAgICByZXR1cm4gcGF0aEhhbmRsZXJzLkMoYywgcCwgcilcclxuICB9LFxyXG4gIFogKGMsIHAsIHIsIHAwKSB7XHJcbiAgICAvLyBGSVhNRTogVGhlIGJlaGF2aW9yIG9mIFogZGVwZW5kcyBvbiB0aGUgY29tbWFuZCBiZWZvcmVcclxuICAgIHJldHVybiBwYXRoSGFuZGxlcnMuTChbIHAwLngsIHAwLnkgXSwgcClcclxuICB9LFxyXG4gIEEgKGMsIHAsIHIpIHtcclxuICAgIGNvbnN0IHJldCA9IG5ldyBBcmMocCwgbmV3IFBvaW50KGNbNV0sIGNbNl0pLCBjWzBdLCBjWzFdLCBjWzJdLCBjWzNdLCBjWzRdKVxyXG4gICAgcC54ID0gY1s1XVxyXG4gICAgcC55ID0gY1s2XVxyXG4gICAgcmV0dXJuIHJldFxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgbWxodnF0Y3NhID0gJ21saHZxdGNzYXonLnNwbGl0KCcnKVxyXG5cclxuZm9yIChsZXQgaSA9IDAsIGlsID0gbWxodnF0Y3NhLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcclxuICBwYXRoSGFuZGxlcnNbbWxodnF0Y3NhW2ldXSA9IChmdW5jdGlvbiAoaSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjLCBwLCByLCBwMCwgcmVmbGVjdGlvbklzUG9zc2libGUpIHtcclxuICAgICAgaWYgKGkgPT09ICdIJykgY1swXSA9IGNbMF0gKyBwLnhcclxuICAgICAgZWxzZSBpZiAoaSA9PT0gJ1YnKSBjWzBdID0gY1swXSArIHAueVxyXG4gICAgICBlbHNlIGlmIChpID09PSAnQScpIHtcclxuICAgICAgICBjWzVdID0gY1s1XSArIHAueFxyXG4gICAgICAgIGNbNl0gPSBjWzZdICsgcC55XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIGpsID0gYy5sZW5ndGg7IGogPCBqbDsgKytqKSB7XHJcbiAgICAgICAgICBjW2pdID0gY1tqXSArIChqICUgMiA/IHAueSA6IHAueClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBwYXRoSGFuZGxlcnNbaV0oYywgcCwgciwgcDAsIHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKVxyXG4gICAgfVxyXG4gIH0pKG1saHZxdGNzYVtpXS50b1VwcGVyQ2FzZSgpKVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXRoUmVnUmVwbGFjZSAoYSwgYiwgYywgZCkge1xyXG4gIHJldHVybiBjICsgZC5yZXBsYWNlKHJlZ2V4LmRvdHMsICcgLicpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzQmV6aWVyZSAob2JqKSB7XHJcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEN1YmljXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwYXRoUGFyc2VyID0gKGFycmF5KSA9PiB7XHJcblxyXG4gIC8vIHByZXBhcmUgZm9yIHBhcnNpbmdcclxuICBjb25zdCBwYXJhbUNudCA9IHsgTTogMiwgTDogMiwgSDogMSwgVjogMSwgQzogNiwgUzogNCwgUTogNCwgVDogMiwgQTogNywgWjogMCB9XHJcblxyXG4gIGFycmF5ID0gYXJyYXlcclxuICAgIC5yZXBsYWNlKHJlZ2V4Lm51bWJlcnNXaXRoRG90cywgcGF0aFJlZ1JlcGxhY2UpIC8vIGNvbnZlcnQgNDUuMTIzLjEyMyB0byA0NS4xMjMgLjEyM1xyXG4gICAgLnJlcGxhY2UocmVnZXgucGF0aExldHRlcnMsICcgJCYgJykgLy8gcHV0IHNvbWUgcm9vbSBiZXR3ZWVuIGxldHRlcnMgYW5kIG51bWJlcnNcclxuICAgIC5yZXBsYWNlKHJlZ2V4Lmh5cGhlbiwgJyQxIC0nKSAvLyBhZGQgc3BhY2UgYmVmb3JlIGh5cGhlblxyXG4gICAgLnRyaW0oKSAvLyB0cmltXHJcbiAgICAuc3BsaXQocmVnZXguZGVsaW1pdGVyKSAvLyBzcGxpdCBpbnRvIGFycmF5XHJcblxyXG4gIC8vIGFycmF5IG5vdyBpcyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBwYXJ0cyBvZiBhIHBhdGggZS5nLiBbJ00nLCAnMCcsICcwJywgJ0wnLCAnMzAnLCAnMzAnIC4uLl1cclxuICBjb25zdCBhcnIgPSBbXVxyXG4gIGNvbnN0IHAgPSBuZXcgUG9pbnQoKVxyXG4gIGNvbnN0IHAwID0gbmV3IFBvaW50KClcclxuICBjb25zdCByID0gbmV3IFBvaW50KClcclxuICBsZXQgaW5kZXggPSAwXHJcbiAgY29uc3QgbGVuID0gYXJyYXkubGVuZ3RoXHJcbiAgbGV0IHNcclxuXHJcbiAgZG8ge1xyXG4gICAgLy8gVGVzdCBpZiB3ZSBoYXZlIGEgcGF0aCBsZXR0ZXJcclxuICAgIGlmIChyZWdleC5pc1BhdGhMZXR0ZXIudGVzdChhcnJheVtpbmRleF0pKSB7XHJcbiAgICAgIHMgPSBhcnJheVtpbmRleF1cclxuICAgICAgKytpbmRleFxyXG4gICAgLy8gSWYgbGFzdCBsZXR0ZXIgd2FzIGEgbW92ZSBjb21tYW5kIGFuZCB3ZSBnb3Qgbm8gbmV3LCBpdCBkZWZhdWx0cyB0byBbTF1pbmVcclxuICAgIH0gZWxzZSBpZiAocyA9PT0gJ00nKSB7XHJcbiAgICAgIHMgPSAnTCdcclxuICAgIH0gZWxzZSBpZiAocyA9PT0gJ20nKSB7XHJcbiAgICAgIHMgPSAnbCdcclxuICAgIH1cclxuXHJcbiAgICBhcnIucHVzaChcclxuICAgICAgcGF0aEhhbmRsZXJzW3NdLmNhbGwobnVsbCxcclxuICAgICAgICBhcnJheS5zbGljZShpbmRleCwgKGluZGV4ID0gaW5kZXggKyBwYXJhbUNudFtzLnRvVXBwZXJDYXNlKCldKSkubWFwKHBhcnNlRmxvYXQpLFxyXG4gICAgICAgIHAsIHIsIHAwLFxyXG4gICAgICAgIGlzQmV6aWVyZShhcnJbYXJyLmxlbmd0aCAtIDFdKVxyXG4gICAgICApXHJcbiAgICApXHJcblxyXG4gIH0gd2hpbGUgKGxlbiA+IGluZGV4KVxyXG5cclxuICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmNsYXNzIE1vdmUge1xyXG4gIGNvbnN0cnVjdG9yIChwKSB7XHJcbiAgICB0aGlzLnAxID0gcC5jbG9uZSgpXHJcbiAgfVxyXG5cclxuICAvLyBGSVhNRTogVXNlIHBvaW50Y2xvdWRcclxuICBiYm94ICgpIHtcclxuICAgIGNvbnN0IHAgPSB0aGlzLnAxXHJcbiAgICByZXR1cm4gbmV3IEJveChwLngsIHAueSwgMCwgMClcclxuICB9XHJcblxyXG4gIGdldENsb3VkICgpIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnRDbG91ZChbIHRoaXMucDEgXSlcclxuICB9XHJcblxyXG4gIGxlbmd0aCAoKSB7IHJldHVybiAwIH1cclxuXHJcbiAgdG9QYXRoICgpIHtcclxuICAgIHJldHVybiBbICdNJywgdGhpcy5wMS54LCB0aGlzLnAxLnkgXS5qb2luKCcgJylcclxuICB9XHJcblxyXG4gIHRvUGF0aEZyYWdtZW50ICgpIHtcclxuICAgIHJldHVybiBbICdNJywgdGhpcy5wMS54LCB0aGlzLnAxLnkgXVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtIChtYXRyaXgpIHtcclxuICAgIHRoaXMucDEudHJhbnNmb3JtTyhtYXRyaXgpXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFyYyB7XHJcbiAgY29uc3RydWN0b3IgKHAxLCBwMiwgcngsIHJ5LCDPhiwgYXJjLCBzd2VlcCkge1xyXG4gICAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRy9pbXBsbm90ZS5odG1sI0FyY0NvcnJlY3Rpb25PdXRPZlJhbmdlUmFkaWlcclxuICAgIGlmICghcnggfHwgIXJ5KSByZXR1cm4gbmV3IExpbmUocDEsIHAyKVxyXG5cclxuICAgIHJ4ID0gTWF0aC5hYnMocngpXHJcbiAgICByeSA9IE1hdGguYWJzKHJ5KVxyXG5cclxuICAgIHRoaXMucDEgPSBwMS5jbG9uZSgpXHJcbiAgICB0aGlzLnAyID0gcDIuY2xvbmUoKVxyXG4gICAgdGhpcy5hcmMgPSBhcmMgPyAxIDogMFxyXG4gICAgdGhpcy5zd2VlcCA9IHN3ZWVwID8gMSA6IDBcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgY29zIGFuZCBzaW4gb2YgYW5nbGUgcGhpXHJcbiAgICBjb25zdCBjb3PPhiA9IE1hdGguY29zKM+GIC8gMTgwICogTWF0aC5QSSlcclxuICAgIGNvbnN0IHNpbs+GID0gTWF0aC5zaW4oz4YgLyAxODAgKiBNYXRoLlBJKVxyXG5cclxuICAgIC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9TVkcvaW1wbG5vdGUuaHRtbCNBcmNDb252ZXJzaW9uRW5kcG9pbnRUb0NlbnRlclxyXG4gICAgLy8gKGVxLiA1LjEpXHJcbiAgICBjb25zdCBwMV8gPSBuZXcgUG9pbnQoXHJcbiAgICAgIChwMS54IC0gcDIueCkgLyAyLFxyXG4gICAgICAocDEueSAtIHAyLnkpIC8gMlxyXG4gICAgKS50cmFuc2Zvcm0obWF0cml4RmFjdG9yeShcclxuICAgICAgY29zz4YsIC1zaW7Phiwgc2luz4YsIGNvc8+GLCAwLCAwXHJcbiAgICApKVxyXG5cclxuICAgIC8vIChlcS4gNi4yKVxyXG4gICAgLy8gTWFrZSBzdXJlIHRoZSByYWRpdXMgZml0IHdpdGggdGhlIGFyYyBhbmQgY29ycmVjdCBpZiBuZWNjZXNzYXJ5XHJcbiAgICBjb25zdCByYXRpbyA9IChwMV8ueCAqKiAyIC8gcnggKiogMikgKyAocDFfLnkgKiogMiAvIHJ5ICoqIDIpXHJcblxyXG4gICAgLy8gKGVxLiA2LjMpXHJcbiAgICBpZiAocmF0aW8gPiAxKSB7XHJcbiAgICAgIHJ4ID0gTWF0aC5zcXJ0KHJhdGlvKSAqIHJ4XHJcbiAgICAgIHJ5ID0gTWF0aC5zcXJ0KHJhdGlvKSAqIHJ5XHJcbiAgICB9XHJcblxyXG4gICAgLy8gKGVxLiA1LjIpXHJcbiAgICBjb25zdCByeFF1YWQgPSByeCAqKiAyXHJcbiAgICBjb25zdCByeVF1YWQgPSByeSAqKiAyXHJcblxyXG4gICAgY29uc3QgZGl2aXNvcjEgPSByeFF1YWQgKiBwMV8ueSAqKiAyXHJcbiAgICBjb25zdCBkaXZpc29yMiA9IHJ5UXVhZCAqIHAxXy54ICoqIDJcclxuICAgIGNvbnN0IGRpdmlkZW5kID0gKHJ4UXVhZCAqIHJ5UXVhZCAtIGRpdmlzb3IxIC0gZGl2aXNvcjIpXHJcblxyXG4gICAgbGV0IGNfXHJcbiAgICBpZiAoTWF0aC5hYnMoZGl2aWRlbmQpIDwgMWUtMTUpIHtcclxuICAgICAgY18gPSBuZXcgUG9pbnQoMCwgMClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNfID0gbmV3IFBvaW50KFxyXG4gICAgICAgIHJ4ICogcDFfLnkgLyByeSxcclxuICAgICAgICAtcnkgKiBwMV8ueCAvIHJ4XHJcbiAgICAgICkubXVsKE1hdGguc3FydChcclxuICAgICAgICBkaXZpZGVuZCAvIChkaXZpc29yMSArIGRpdmlzb3IyKVxyXG4gICAgICApKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmFyYyA9PT0gdGhpcy5zd2VlcCkgY18gPSBjXy5tdWwoLTEpXHJcblxyXG4gICAgLy8gKGVxLiA1LjMpXHJcbiAgICBjb25zdCBjID0gY18udHJhbnNmb3JtKG1hdHJpeEZhY3RvcnkoXHJcbiAgICAgIGNvc8+GLCBzaW7PhiwgLXNpbs+GLCBjb3PPhiwgMCwgMFxyXG4gICAgKSkuYWRkKG5ldyBQb2ludChcclxuICAgICAgKHAxLnggKyBwMi54KSAvIDIsXHJcbiAgICAgIChwMS55ICsgcDIueSkgLyAyXHJcbiAgICApKVxyXG5cclxuICAgIGNvbnN0IGFuZ2xlUG9pbnQgPSBuZXcgUG9pbnQoXHJcbiAgICAgIChwMV8ueCAtIGNfLngpIC8gcngsXHJcbiAgICAgIChwMV8ueSAtIGNfLnkpIC8gcnlcclxuICAgIClcclxuXHJcbiAgICAvKiBGb3IgZXEuIDUuNCBzZWUgYW5nbGVUbyBmdW5jdGlvbiAqL1xyXG5cclxuICAgIC8vIChlcS4gNS41KVxyXG4gICAgY29uc3QgzrggPSBuZXcgUG9pbnQoMSwgMCkuYW5nbGVUbyhhbmdsZVBvaW50KVxyXG5cclxuICAgIC8vIChlcS4gNS42KVxyXG4gICAgbGV0IM6UzrggPSBhbmdsZVBvaW50LmFuZ2xlVG8obmV3IFBvaW50KFxyXG4gICAgICAoLXAxXy54IC0gY18ueCkgLyByeCxcclxuICAgICAgKC1wMV8ueSAtIGNfLnkpIC8gcnlcclxuICAgICkpXHJcblxyXG4gICAgzpTOuCA9ICjOlM64ICUgKDIgKiBNYXRoLlBJKSlcclxuXHJcbiAgICBpZiAoIXN3ZWVwICYmIM6UzrggPiAwKSDOlM64IC09IDIgKiBNYXRoLlBJXHJcbiAgICBpZiAoc3dlZXAgJiYgzpTOuCA8IDApIM6UzrggKz0gMiAqIE1hdGguUElcclxuXHJcbiAgICB0aGlzLmMgPSBjXHJcbiAgICB0aGlzLnRoZXRhID0gzrggKiAxODAgLyBNYXRoLlBJXHJcbiAgICB0aGlzLnRoZXRhMiA9ICjOuCArIM6UzrgpICogMTgwIC8gTWF0aC5QSVxyXG5cclxuICAgIHRoaXMuZGVsdGEgPSDOlM64ICogMTgwIC8gTWF0aC5QSVxyXG4gICAgdGhpcy5yeCA9IHJ4XHJcbiAgICB0aGlzLnJ5ID0gcnlcclxuICAgIHRoaXMucGhpID0gz4ZcclxuICAgIHRoaXMuY29zz4YgPSBjb3PPhlxyXG4gICAgdGhpcy5zaW7PhiA9IHNpbs+GXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUNlbnRlckZvcm0gKGMsIHJ4LCByeSwgz4YsIM64LCDOlM64KSB7XHJcbiAgICBjb25zdCBjb3PPhiA9IE1hdGguY29zKM+GIC8gMTgwICogTWF0aC5QSSlcclxuICAgIGNvbnN0IHNpbs+GID0gTWF0aC5zaW4oz4YgLyAxODAgKiBNYXRoLlBJKVxyXG4gICAgY29uc3QgbSA9IG1hdHJpeEZhY3RvcnkoY29zz4YsIHNpbs+GLCAtc2luz4YsIGNvc8+GLCAwLCAwKVxyXG5cclxuICAgIGNvbnN0IHAxID0gbmV3IFBvaW50KFxyXG4gICAgICByeCAqIE1hdGguY29zKM64IC8gMTgwICogTWF0aC5QSSksXHJcbiAgICAgIHJ5ICogTWF0aC5zaW4ozrggLyAxODAgKiBNYXRoLlBJKVxyXG4gICAgKS50cmFuc2Zvcm0obSkuYWRkKGMpXHJcblxyXG4gICAgY29uc3QgcDIgPSBuZXcgUG9pbnQoXHJcbiAgICAgIHJ4ICogTWF0aC5jb3MoKM64ICsgzpTOuCkgLyAxODAgKiBNYXRoLlBJKSxcclxuICAgICAgcnkgKiBNYXRoLnNpbigozrggKyDOlM64KSAvIDE4MCAqIE1hdGguUEkpXHJcbiAgICApLnRyYW5zZm9ybShtKS5hZGQoYylcclxuXHJcbiAgICBjb25zdCBhcmMgPSBNYXRoLmFicyjOlM64KSA+IDE4MCA/IDEgOiAwXHJcbiAgICBjb25zdCBzd2VlcCA9IM6UzrggPiAwID8gMSA6IDBcclxuXHJcbiAgICByZXR1cm4gbmV3IEFyYyhwMSwgcDIsIHJ4LCByeSwgz4YsIGFyYywgc3dlZXApXHJcbiAgfVxyXG5cclxuICBiYm94ICgpIHtcclxuICAgIGNvbnN0IGNsb3VkID0gdGhpcy5nZXRDbG91ZCgpXHJcbiAgICByZXR1cm4gY2xvdWQuYmJveCgpXHJcbiAgfVxyXG5cclxuICBjbG9uZSAoKSB7XHJcbiAgICByZXR1cm4gbmV3IEFyYyh0aGlzLnAxLCB0aGlzLnAyLCB0aGlzLnJ4LCB0aGlzLnJ5LCB0aGlzLnBoaSwgdGhpcy5hcmMsIHRoaXMuc3dlZXApXHJcbiAgfVxyXG5cclxuICBnZXRDbG91ZCAoKSB7XHJcbiAgICBpZiAodGhpcy5wMS5lcXVhbHModGhpcy5wMikpIHJldHVybiBuZXcgUG9pbnRDbG91ZChbIHRoaXMucDEgXSlcclxuXHJcbiAgICAvLyBhcmMgY291bGQgYmUgcm90YXRlZC4gdGhlIG1pbiBhbmQgbWF4IHZhbHVlcyB0aGVuIGRvbnQgbGllIG9uIG11bHRpcGxlcyBvZiA5MCBkZWdyZXNzIGJ1dCBhcmUgc2hpZnRlZCBieSB0aGUgcm90YXRpb24gYW5nbGVcclxuICAgIC8vIHNvIHdlIGZpcnN0IGNhbGN1bGF0ZSBvdXIgMC85MCBkZWdyZWUgYW5nbGVcclxuICAgIGxldCDOuDAxID0gTWF0aC5hdGFuKC10aGlzLnNpbs+GIC8gdGhpcy5jb3PPhiAqIHRoaXMucnkgLyB0aGlzLnJ4KSAqIDE4MCAvIE1hdGguUElcclxuICAgIGxldCDOuDAyID0gTWF0aC5hdGFuKHRoaXMuY29zz4YgLyB0aGlzLnNpbs+GICogdGhpcy5yeSAvIHRoaXMucngpICogMTgwIC8gTWF0aC5QSVxyXG4gICAgbGV0IM64MSA9IHRoaXMudGhldGFcclxuICAgIGxldCDOuDIgPSB0aGlzLnRoZXRhMlxyXG5cclxuICAgIGlmICjOuDEgPCAwIHx8IM64MiA8IDApIHtcclxuICAgICAgzrgxICs9IDM2MFxyXG4gICAgICDOuDIgKz0gMzYwXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKM64MiA8IM64MSkge1xyXG4gICAgICBjb25zdCB0ZW1wID0gzrgxXHJcbiAgICAgIM64MSA9IM64MlxyXG4gICAgICDOuDIgPSB0ZW1wXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlICjOuDAxIC0gOTAgPiDOuDAxKSDOuDAxIC09IDkwXHJcbiAgICB3aGlsZSAozrgwMSA8IM64MSkgzrgwMSArPSA5MFxyXG4gICAgd2hpbGUgKM64MDIgLSA5MCA+IM64MDIpIM64MDIgLT0gOTBcclxuICAgIHdoaWxlICjOuDAyIDwgzrgxKSDOuDAyICs9IDkwXHJcblxyXG4gICAgY29uc3QgYW5nbGVUb1Rlc3QgPSBbIM64MDEsIM64MDIsICjOuDAxICsgOTApLCAozrgwMiArIDkwKSwgKM64MDEgKyAxODApLCAozrgwMiArIDE4MCksICjOuDAxICsgMjcwKSwgKM64MDIgKyAyNzApIF1cclxuXHJcbiAgICBjb25zdCBwb2ludHMgPSBhbmdsZVRvVGVzdC5maWx0ZXIoZnVuY3Rpb24gKGFuZ2xlKSB7XHJcbiAgICAgIHJldHVybiAoYW5nbGUgPiDOuDEgJiYgYW5nbGUgPCDOuDIpXHJcbiAgICB9KS5tYXAoZnVuY3Rpb24gKGFuZ2xlKSB7XHJcbiAgICAgIHdoaWxlICh0aGlzLnRoZXRhIDwgYW5nbGUpIGFuZ2xlIC09IDM2MFxyXG4gICAgICByZXR1cm4gdGhpcy5wb2ludEF0KCgoYW5nbGUgLSB0aGlzLnRoZXRhKSAlIDM2MCkgLyAodGhpcy5kZWx0YSkpIC8vIFRPRE86IHJlcGxhY2UgdGhhdCBjYWxsIHdpdGggcG9pbnRBdEFuZ2xlXHJcbiAgICB9LmJpbmQodGhpcykpLmNvbmNhdCh0aGlzLnAxLCB0aGlzLnAyKVxyXG5cclxuICAgIHJldHVybiBuZXcgUG9pbnRDbG91ZChwb2ludHMpXHJcbiAgfVxyXG5cclxuICBsZW5ndGggKCkge1xyXG4gICAgaWYgKHRoaXMucDEuZXF1YWxzKHRoaXMucDIpKSByZXR1cm4gMFxyXG5cclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucDIuc3ViKHRoaXMucDEpLmFicygpXHJcblxyXG4gICAgY29uc3QgcmV0ID0gdGhpcy5zcGxpdEF0KDAuNSlcclxuICAgIGNvbnN0IGxlbjEgPSByZXRbMF0ucDIuc3ViKHJldFswXS5wMSkuYWJzKClcclxuICAgIGNvbnN0IGxlbjIgPSByZXRbMV0ucDIuc3ViKHJldFsxXS5wMSkuYWJzKClcclxuXHJcbiAgICBpZiAobGVuMSArIGxlbjIgLSBsZW5ndGggPCAwLjAwMDAxKSB7XHJcbiAgICAgIHJldHVybiBsZW4xICsgbGVuMlxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXRbMF0ubGVuZ3RoKCkgKyByZXRbMV0ubGVuZ3RoKClcclxuICB9XHJcblxyXG4gIHBvaW50QXQgKHQpIHtcclxuICAgIGlmICh0aGlzLnAxLmVxdWFscyh0aGlzLnAyKSkgcmV0dXJuIHRoaXMucDEuY2xvbmUoKVxyXG5cclxuICAgIGNvbnN0IHRJbkFuZ2xlID0gKHRoaXMudGhldGEgKyB0ICogdGhpcy5kZWx0YSkgLyAxODAgKiBNYXRoLlBJXHJcbiAgICBjb25zdCBzaW7OuCA9IE1hdGguc2luKHRJbkFuZ2xlKVxyXG4gICAgY29uc3QgY29zzrggPSBNYXRoLmNvcyh0SW5BbmdsZSlcclxuXHJcbiAgICByZXR1cm4gbmV3IFBvaW50KFxyXG4gICAgICB0aGlzLmNvc8+GICogdGhpcy5yeCAqIGNvc864IC0gdGhpcy5zaW7PhiAqIHRoaXMucnkgKiBzaW7OuCArIHRoaXMuYy54LFxyXG4gICAgICB0aGlzLnNpbs+GICogdGhpcy5yeSAqIGNvc864ICsgdGhpcy5jb3PPhiAqIHRoaXMucnggKiBzaW7OuCArIHRoaXMuYy55XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzcGxpdEF0ICh0KSB7XHJcbiAgICBjb25zdCBhYnNEZWx0YSA9IE1hdGguYWJzKHRoaXMuZGVsdGEpXHJcbiAgICBjb25zdCBkZWx0YTEgPSBhYnNEZWx0YSAqIHRcclxuICAgIGNvbnN0IGRlbHRhMiA9IGFic0RlbHRhICogKDEgLSB0KVxyXG5cclxuICAgIGNvbnN0IHBvaW50QXRUID0gdGhpcy5wb2ludEF0KHQpXHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgbmV3IEFyYyh0aGlzLnAxLCBwb2ludEF0VCwgdGhpcy5yeCwgdGhpcy5yeSwgdGhpcy5waGksIGRlbHRhMSA+IDE4MCwgdGhpcy5zd2VlcCksXHJcbiAgICAgIG5ldyBBcmMocG9pbnRBdFQsIHRoaXMucDIsIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCBkZWx0YTIgPiAxODAsIHRoaXMuc3dlZXApXHJcbiAgICBdXHJcbiAgfVxyXG5cclxuICB0b1BhdGggKCkge1xyXG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLnAxLngsIHRoaXMucDEueSwgJ0EnLCB0aGlzLnJ4LCB0aGlzLnJ5LCB0aGlzLnBoaSwgdGhpcy5hcmMsIHRoaXMuc3dlZXAsIHRoaXMucDIueCwgdGhpcy5wMi55IF0uam9pbignICcpXHJcbiAgfVxyXG5cclxuICB0b1BhdGhGcmFnbWVudCAoKSB7XHJcbiAgICByZXR1cm4gWyAnQScsIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCB0aGlzLmFyYywgdGhpcy5zd2VlcCwgdGhpcy5wMi54LCB0aGlzLnAyLnkgXVxyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmcgKCkge1xyXG4gICAgcmV0dXJuIGBwMTogJHt0aGlzLnAxLngudG9GaXhlZCg0KX0gJHt0aGlzLnAxLnkudG9GaXhlZCg0KX0sIHAyOiAke3RoaXMucDIueC50b0ZpeGVkKDQpfSAke3RoaXMucDIueS50b0ZpeGVkKDQpfSwgYzogJHt0aGlzLmMueC50b0ZpeGVkKDQpfSAke3RoaXMuYy55LnRvRml4ZWQoNCl9IHRoZXRhOiAke3RoaXMudGhldGEudG9GaXhlZCg0KX0sIHRoZXRhMjogJHt0aGlzLnRoZXRhMi50b0ZpeGVkKDQpfSwgZGVsdGE6ICR7dGhpcy5kZWx0YS50b0ZpeGVkKDQpfSwgbGFyZ2U6ICR7dGhpcy5hcmN9LCBzd2VlcDogJHt0aGlzLnN3ZWVwfWBcclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSAobWF0cml4KSB7XHJcbiAgICByZXR1cm4gbmV3IEFyYyh0aGlzLnAxLnRyYW5zZm9ybShtYXRyaXgpLCB0aGlzLnAyLnRyYW5zZm9ybShtYXRyaXgpLCB0aGlzLnJ4LCB0aGlzLnJ5LCB0aGlzLnBoaSwgdGhpcy5hcmMsIHRoaXMuc3dlZXApXHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBDdWJpYyB7XHJcbiAgY29uc3RydWN0b3IgKHAxLCBjMSwgYzIsIHAyKSB7XHJcbiAgICBpZiAocDEgaW5zdGFuY2VvZiBQb2ludCkge1xyXG4gICAgICB0aGlzLnAxID0gbmV3IFBvaW50KHAxKVxyXG4gICAgICB0aGlzLmMxID0gbmV3IFBvaW50KGMxKVxyXG4gICAgICB0aGlzLmMyID0gbmV3IFBvaW50KGMyKVxyXG4gICAgICB0aGlzLnAyID0gbmV3IFBvaW50KHAyKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wMSA9IG5ldyBQb2ludChwMS5wMSlcclxuICAgICAgdGhpcy5jMSA9IG5ldyBQb2ludChwMS5jMSlcclxuICAgICAgdGhpcy5jMiA9IG5ldyBQb2ludChwMS5jMilcclxuICAgICAgdGhpcy5wMiA9IG5ldyBQb2ludChwMS5wMilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBmcm9tUXVhZCAocDEsIGMsIHAyKSB7XHJcbiAgICBjb25zdCBjMSA9IHAxLm11bCgxIC8gMykuYWRkKGMubXVsKDIgLyAzKSlcclxuICAgIGNvbnN0IGMyID0gYy5tdWwoMiAvIDMpLmFkZChwMi5tdWwoMSAvIDMpKVxyXG4gICAgcmV0dXJuIG5ldyBDdWJpYyhwMSwgYzEsIGMyLCBwMilcclxuICB9XHJcblxyXG4gIGJib3ggKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2xvdWQoKS5iYm94KClcclxuICB9XHJcblxyXG4gIGZpbmRSb290cyAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kUm9vdHNYKCkuY29uY2F0KHRoaXMuZmluZFJvb3RzWSgpKVxyXG4gIH1cclxuXHJcbiAgZmluZFJvb3RzWCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kUm9vdHNYWSh0aGlzLnAxLngsIHRoaXMuYzEueCwgdGhpcy5jMi54LCB0aGlzLnAyLngpXHJcbiAgfVxyXG5cclxuICBmaW5kUm9vdHNYWSAocDEsIHAyLCBwMywgcDQpIHtcclxuICAgIGNvbnN0IGEgPSAzICogKC1wMSArIDMgKiBwMiAtIDMgKiBwMyArIHA0KVxyXG4gICAgY29uc3QgYiA9IDYgKiAocDEgLSAyICogcDIgKyBwMylcclxuICAgIGNvbnN0IGMgPSAzICogKHAyIC0gcDEpXHJcblxyXG4gICAgaWYgKGEgPT09IDApIHJldHVybiBbIC1jIC8gYiBdLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsID4gMCAmJiBlbCA8IDEgfSlcclxuXHJcbiAgICBpZiAoYiAqIGIgLSA0ICogYSAqIGMgPCAwKSByZXR1cm4gW11cclxuICAgIGlmIChiICogYiAtIDQgKiBhICogYyA9PT0gMCkgcmV0dXJuIFsgTWF0aC5yb3VuZCgoLWIgLyAoMiAqIGEpKSAqIDEwMDAwMCkgLyAxMDAwMDAgXS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbCA+IDAgJiYgZWwgPCAxIH0pXHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgTWF0aC5yb3VuZCgoLWIgKyBNYXRoLnNxcnQoYiAqIGIgLSA0ICogYSAqIGMpKSAvICgyICogYSkgKiAxMDAwMDApIC8gMTAwMDAwLFxyXG4gICAgICBNYXRoLnJvdW5kKCgtYiAtIE1hdGguc3FydChiICogYiAtIDQgKiBhICogYykpIC8gKDIgKiBhKSAqIDEwMDAwMCkgLyAxMDAwMDBcclxuICAgIF0uZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwgPiAwICYmIGVsIDwgMSB9KVxyXG4gIH1cclxuXHJcbiAgZmluZFJvb3RzWSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maW5kUm9vdHNYWSh0aGlzLnAxLnksIHRoaXMuYzEueSwgdGhpcy5jMi55LCB0aGlzLnAyLnkpXHJcbiAgfVxyXG5cclxuICBmbGF0bmVzcyAoKSB7XHJcbiAgICBsZXQgdXggPSBNYXRoLnBvdygzICogdGhpcy5jMS54IC0gMiAqIHRoaXMucDEueCAtIHRoaXMucDIueCwgMilcclxuICAgIGxldCB1eSA9IE1hdGgucG93KDMgKiB0aGlzLmMxLnkgLSAyICogdGhpcy5wMS55IC0gdGhpcy5wMi55LCAyKVxyXG4gICAgY29uc3QgdnggPSBNYXRoLnBvdygzICogdGhpcy5jMi54IC0gMiAqIHRoaXMucDIueCAtIHRoaXMucDEueCwgMilcclxuICAgIGNvbnN0IHZ5ID0gTWF0aC5wb3coMyAqIHRoaXMuYzIueSAtIDIgKiB0aGlzLnAyLnkgLSB0aGlzLnAxLnksIDIpXHJcblxyXG4gICAgaWYgKHV4IDwgdngpIHsgdXggPSB2eCB9XHJcbiAgICBpZiAodXkgPCB2eSkgeyB1eSA9IHZ5IH1cclxuXHJcbiAgICByZXR1cm4gdXggKyB1eVxyXG4gIH1cclxuXHJcbiAgZ2V0Q2xvdWQgKCkge1xyXG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5maW5kUm9vdHMoKVxyXG4gICAgICAuZmlsdGVyKHJvb3QgPT4gcm9vdCAhPT0gMCAmJiByb290ICE9PSAxKVxyXG4gICAgICAubWFwKHJvb3QgPT4gdGhpcy5wb2ludEF0KHJvb3QpKVxyXG4gICAgICAuY29uY2F0KHRoaXMucDEsIHRoaXMucDIpXHJcblxyXG4gICAgcmV0dXJuIG5ldyBQb2ludENsb3VkKHBvaW50cylcclxuICB9XHJcblxyXG4gIGxlbmd0aCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sZW5ndGhBdCgpXHJcbiAgfVxyXG5cclxuICBsZW5ndGhBdCAodCA9IDEpIHtcclxuICAgIGNvbnN0IGN1cnZlcyA9IHRoaXMuc3BsaXRBdCh0KVswXS5tYWtlRmxhdCh0KVxyXG5cclxuICAgIGxldCBsZW5ndGggPSAwXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY3VydmVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGxlbmd0aCArPSBjdXJ2ZXNbaV0ucDIuc3ViKGN1cnZlc1tpXS5wMSkuYWJzKClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGVuZ3RoXHJcbiAgfVxyXG5cclxuICBtYWtlRmxhdCAodCkge1xyXG4gICAgaWYgKHRoaXMuZmxhdG5lc3MoKSA+IDAuMTUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3BsaXRBdCgwLjUpXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsLm1ha2VGbGF0KHQgKiAwLjUpIH0pXHJcbiAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAobGFzdCwgY3VycmVudCkgeyByZXR1cm4gbGFzdC5jb25jYXQoY3VycmVudCkgfSwgW10pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRfdmFsdWUgPSB0XHJcbiAgICAgIHJldHVybiBbIHRoaXMgXVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcG9pbnRBdCAodCkge1xyXG4gICAgcmV0dXJuIG5ldyBQb2ludChcclxuICAgICAgKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpICogdGhpcy5wMS54ICsgMyAqICgxIC0gdCkgKiAoMSAtIHQpICogdCAqIHRoaXMuYzEueCArIDMgKiAoMSAtIHQpICogdCAqIHQgKiB0aGlzLmMyLnggKyB0ICogdCAqIHQgKiB0aGlzLnAyLngsXHJcbiAgICAgICgxIC0gdCkgKiAoMSAtIHQpICogKDEgLSB0KSAqIHRoaXMucDEueSArIDMgKiAoMSAtIHQpICogKDEgLSB0KSAqIHQgKiB0aGlzLmMxLnkgKyAzICogKDEgLSB0KSAqIHQgKiB0ICogdGhpcy5jMi55ICsgdCAqIHQgKiB0ICogdGhpcy5wMi55XHJcbiAgICApXHJcbiAgfVxyXG5cclxuICBzcGxpdEF0ICh6KSB7XHJcbiAgICBjb25zdCB4ID0gdGhpcy5zcGxpdEF0U2NhbGFyKHosICd4JylcclxuICAgIGNvbnN0IHkgPSB0aGlzLnNwbGl0QXRTY2FsYXIoeiwgJ3knKVxyXG5cclxuICAgIGNvbnN0IGEgPSBuZXcgQ3ViaWMoXHJcbiAgICAgIG5ldyBQb2ludCh4WzBdWzBdLCB5WzBdWzBdKSxcclxuICAgICAgbmV3IFBvaW50KHhbMF1bMV0sIHlbMF1bMV0pLFxyXG4gICAgICBuZXcgUG9pbnQoeFswXVsyXSwgeVswXVsyXSksXHJcbiAgICAgIG5ldyBQb2ludCh4WzBdWzNdLCB5WzBdWzNdKVxyXG4gICAgKVxyXG5cclxuICAgIGNvbnN0IGIgPSBuZXcgQ3ViaWMoXHJcbiAgICAgIG5ldyBQb2ludCh4WzFdWzBdLCB5WzFdWzBdKSxcclxuICAgICAgbmV3IFBvaW50KHhbMV1bMV0sIHlbMV1bMV0pLFxyXG4gICAgICBuZXcgUG9pbnQoeFsxXVsyXSwgeVsxXVsyXSksXHJcbiAgICAgIG5ldyBQb2ludCh4WzFdWzNdLCB5WzFdWzNdKVxyXG4gICAgKVxyXG5cclxuICAgIHJldHVybiBbIGEsIGIgXVxyXG4gIH1cclxuXHJcbiAgc3BsaXRBdFNjYWxhciAoeiwgcCkge1xyXG4gICAgY29uc3QgcDEgPSB0aGlzLnAxW3BdXHJcbiAgICBjb25zdCBwMiA9IHRoaXMuYzFbcF1cclxuICAgIGNvbnN0IHAzID0gdGhpcy5jMltwXVxyXG4gICAgY29uc3QgcDQgPSB0aGlzLnAyW3BdXHJcblxyXG4gICAgY29uc3QgdCA9IHogKiB6ICogeiAqIHA0IC0gMyAqIHogKiB6ICogKHogLSAxKSAqIHAzICsgMyAqIHogKiAoeiAtIDEpICogKHogLSAxKSAqIHAyIC0gKHogLSAxKSAqICh6IC0gMSkgKiAoeiAtIDEpICogcDFcclxuXHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBbXHJcbiAgICAgICAgcDEsXHJcbiAgICAgICAgeiAqIHAyIC0gKHogLSAxKSAqIHAxLFxyXG4gICAgICAgIHogKiB6ICogcDMgLSAyICogeiAqICh6IC0gMSkgKiBwMiArICh6IC0gMSkgKiAoeiAtIDEpICogcDEsXHJcbiAgICAgICAgdFxyXG4gICAgICBdLFxyXG4gICAgICBbXHJcbiAgICAgICAgdCxcclxuICAgICAgICB6ICogeiAqIHA0IC0gMiAqIHogKiAoeiAtIDEpICogcDMgKyAoeiAtIDEpICogKHogLSAxKSAqIHAyLFxyXG4gICAgICAgIHogKiBwNCAtICh6IC0gMSkgKiBwMyxcclxuICAgICAgICBwNFxyXG4gICAgICBdXHJcbiAgICBdXHJcbiAgfVxyXG5cclxuICB0b1BhdGggKCkge1xyXG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLnAxLngsIHRoaXMucDEueSBdLmNvbmNhdCh0aGlzLnRvUGF0aEZyYWdtZW50KCkpLmpvaW4oJyAnKVxyXG4gIH1cclxuXHJcbiAgdG9QYXRoRnJhZ21lbnQgKCkge1xyXG4gICAgcmV0dXJuIFsgJ0MnLCB0aGlzLmMxLngsIHRoaXMuYzEueSwgdGhpcy5jMi54LCB0aGlzLmMyLnksIHRoaXMucDIueCwgdGhpcy5wMi55IF1cclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSAobWF0cml4KSB7XHJcbiAgICB0aGlzLnAxLnRyYW5zZm9ybU8obWF0cml4KVxyXG4gICAgdGhpcy5jMS50cmFuc2Zvcm1PKG1hdHJpeClcclxuICAgIHRoaXMuYzIudHJhbnNmb3JtTyhtYXRyaXgpXHJcbiAgICB0aGlzLnAyLnRyYW5zZm9ybU8obWF0cml4KVxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIExpbmUge1xyXG4gIGNvbnN0cnVjdG9yICh4MSwgeTEsIHgyLCB5Mikge1xyXG4gICAgaWYgKHgxIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgIHRoaXMucDEgPSBuZXcgUG9pbnQoeDEpXHJcbiAgICAgIHRoaXMucDIgPSBuZXcgUG9pbnQoeTEpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnAxID0gbmV3IFBvaW50KHgxLCB5MSlcclxuICAgICAgdGhpcy5wMiA9IG5ldyBQb2ludCh4MiwgeTIpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBiYm94ICgpIHtcclxuICAgIHJldHVybiB0aGlzLmdldENsb3VkKCkuYmJveCgpXHJcbiAgfVxyXG5cclxuICBnZXRDbG91ZCAoKSB7XHJcbiAgICByZXR1cm4gbmV3IFBvaW50Q2xvdWQoWyB0aGlzLnAxLCB0aGlzLnAyIF0pXHJcbiAgfVxyXG5cclxuICBsZW5ndGggKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucDIuc3ViKHRoaXMucDEpLmFicygpXHJcbiAgfVxyXG5cclxuICBwb2ludEF0ICh0KSB7XHJcbiAgICBjb25zdCB2ZWMgPSB0aGlzLnAyLnN1Yih0aGlzLnAxKS5tdWwodClcclxuICAgIHJldHVybiB0aGlzLnAxLmFkZCh2ZWMpXHJcbiAgfVxyXG5cclxuICB0b1BhdGggKCkge1xyXG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLnAxLngsIHRoaXMucDEueSwgdGhpcy5wMi54LCB0aGlzLnAyLnkgXS5qb2luKCcgJylcclxuICB9XHJcblxyXG4gIHRvUGF0aEZyYWdtZW50ICgpIHtcclxuICAgIHJldHVybiBbICdMJywgdGhpcy5wMi54LCB0aGlzLnAyLnkgXVxyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtIChtYXRyaXgpIHtcclxuICAgIHRoaXMucDEudHJhbnNmb3JtTyhtYXRyaXgpXHJcbiAgICB0aGlzLnAyLnRyYW5zZm9ybU8obWF0cml4KVxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwYXRoQkJveCA9IGZ1bmN0aW9uIChkKSB7XHJcbiAgcmV0dXJuIHBhdGhQYXJzZXIoZCkucmVkdWNlKChsLCBjKSA9PiBsLm1lcmdlKGMuYmJveCgpKSwgbmV3IE5vQm94KCkpXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXRoU2VnbWVudEFycmF5IGV4dGVuZHMgQXJyYXkge1xyXG4gIGJib3ggKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVkdWNlKChsLCBjKSA9PiBsLm1lcmdlKGMuYmJveCgpKSwgbmV3IE5vQm94KCkpXHJcbiAgfVxyXG5cclxuICBjbG91ZCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWR1Y2UoXHJcbiAgICAgIChjbG91ZCwgc2VnbWVudCkgPT4gc2VnbWVudC5nZXRDbG91ZCgpLm1lcmdlKGNsb3VkKSxcclxuICAgICAgbmV3IFBvaW50Q2xvdWQoKVxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgbWVyZ2UgKG90aGVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25jYXQob3RoZXIpXHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm0gKG1hdHJpeCkge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwKHNlZ21lbnQgPT4gc2VnbWVudC50cmFuc2Zvcm0obWF0cml4KSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRQYXRoU2VnbWVudHMgPSBmdW5jdGlvbiAoZCkge1xyXG4gIHJldHVybiBuZXcgUGF0aFNlZ21lbnRBcnJheSguLi5wYXRoUGFyc2VyKGQpKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcG9pbnRBdExlbmd0aCA9IGZ1bmN0aW9uIChkLCBsZW4pIHtcclxuICBjb25zdCBzZWdzID0gcGF0aFBhcnNlcihkKVxyXG5cclxuICBjb25zdCBzZWdMZW5ndGhzID0gc2Vncy5tYXAoZWwgPT4gZWwubGVuZ3RoKCkpXHJcblxyXG4gIGNvbnN0IGxlbmd0aCA9IHNlZ0xlbmd0aHMucmVkdWNlKChsLCBjKSA9PiBsICsgYywgMClcclxuXHJcbiAgbGV0IGkgPSAwXHJcblxyXG4gIGxldCB0ID0gbGVuIC8gbGVuZ3RoXHJcblxyXG4gIC8vIEZJWE1FOiBQb3AgTW92ZSBiZWZvcmUgdXNpbmcgc2hvcnRjdXQ/XHJcbiAgLy8gc2hvcnRjdXQgZm9yIHRyaXZpYWwgY2FzZXNcclxuICBpZiAodCA+PSAxKSB7XHJcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIHAyLiBJZiBub3QsIHVzZSBwMVxyXG4gICAgaWYgKHNlZ3Nbc2Vncy5sZW5ndGggLSAxXS5wMikge1xyXG4gICAgICByZXR1cm4gc2Vnc1tzZWdzLmxlbmd0aCAtIDFdLnAyLm5hdGl2ZSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gc2Vnc1tzZWdzLmxlbmd0aCAtIDFdLnAxLm5hdGl2ZSgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAodCA8PSAwKSByZXR1cm4gc2Vnc1swXS5wMS5uYXRpdmUoKVxyXG5cclxuICAvLyByZW1vdmUgbW92ZSBjb21tYW5kcyBhdCB0aGUgdmVyeSBlbmQgb2YgdGhlIHBhdGhcclxuICB3aGlsZSAoc2Vnc1tzZWdzLmxlbmd0aCAtIDFdIGluc3RhbmNlb2YgTW92ZSkgc2Vncy5wb3AoKVxyXG5cclxuICBsZXQgc2VnRW5kID0gMFxyXG5cclxuICBmb3IgKGNvbnN0IGlsID0gc2VnTGVuZ3Rocy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XHJcbiAgICBjb25zdCBrID0gc2VnTGVuZ3Roc1tpXSAvIGxlbmd0aFxyXG4gICAgc2VnRW5kICs9IGtcclxuXHJcbiAgICBpZiAoc2VnRW5kID4gdCkge1xyXG4gICAgICBicmVha1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcmF0aW8gPSBsZW5ndGggLyBzZWdMZW5ndGhzW2ldXHJcbiAgdCA9IHJhdGlvICogKHQgLSBzZWdFbmQpICsgMVxyXG5cclxuICByZXR1cm4gc2Vnc1tpXS5wb2ludEF0KHQpLm5hdGl2ZSgpXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBsZW5ndGggPSBmdW5jdGlvbiAoZCkge1xyXG4gIHJldHVybiBwYXRoUGFyc2VyKGQpXHJcbiAgICAucmVkdWNlKChsLCBjKSA9PiBsICsgYy5sZW5ndGgoKSwgMClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGRlYnVnID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICBjb25zdCBwYXJzZSA9IHBhdGhQYXJzZXIobm9kZS5nZXRBdHRyaWJ1dGUoJ2QnKSlcclxuXHJcbiAgY29uc3QgcmV0ID0ge1xyXG4gICAgcGF0aHM6IHBhcnNlLm1hcChlbCA9PiBlbC50b1BhdGgoKSksXHJcbiAgICBmcmFnbWVudHM6IHBhcnNlLm1hcChlbCA9PiBlbC50b1BhdGhGcmFnbWVudCgpLmpvaW4oJyAnKSksXHJcbiAgICBiYm94czogcGFyc2UubWFwKGVsID0+IHtcclxuICAgICAgY29uc3QgYm94ID0gZWwuYmJveCgpXHJcbiAgICAgIHJldHVybiBbIGJveC54LCBib3gueSwgYm94LndpZHRoLCBib3guaGVpZ2h0IF1cclxuICAgIH0pLFxyXG4gICAgYmJveDogcGFyc2UucmVkdWNlKChsLCBjKSA9PiBsLm1lcmdlKGMuYmJveCgpKSwgbmV3IE5vQm94KCkpLFxyXG4gICAgYmJveHNUcmFuc2Zvcm1lZDogcGFyc2UubWFwKGVsID0+IHtcclxuICAgICAgcmV0dXJuIGVsLmdldENsb3VkKCkudHJhbnNmb3JtKG5vZGUubWF0cml4aWZ5KCkpLmJib3goKVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZXQsIHtcclxuICAgIGJib3hUcmFuc2Zvcm1lZDogcmV0LmJib3hzVHJhbnNmb3JtZWQucmVkdWNlKChsLCBjKSA9PiBsLm1lcmdlKGMpLCBuZXcgTm9Cb3goKSlcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0Q2xvdWQgPSAoZCkgPT4ge1xyXG4gIHJldHVybiBwYXRoUGFyc2VyKGQpLnJlZHVjZSgoY2xvdWQsIHNlZ21lbnQpID0+XHJcbiAgICBzZWdtZW50LmdldENsb3VkKCkubWVyZ2UoY2xvdWQpLCBuZXcgUG9pbnRDbG91ZCgpXHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcGF0aEZyb20gPSB7XHJcbiAgYm94ICh7IHgsIHksIHdpZHRoLCBoZWlnaHQgfSkge1xyXG4gICAgcmV0dXJuIGBNICR7eH0gJHt5fSBoICR7d2lkdGh9IHYgJHtoZWlnaHR9IEggJHt4fSBWICR7eX1gXHJcbiAgfSxcclxuICByZWN0IChub2RlKSB7XHJcbiAgICBjb25zdCB3aWR0aCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykpIHx8IDBcclxuICAgIGNvbnN0IGhlaWdodCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpKSB8fCAwXHJcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneCcpKSB8fCAwXHJcbiAgICBjb25zdCB5ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneScpKSB8fCAwXHJcbiAgICByZXR1cm4gYE0gJHt4fSAke3l9IGggJHt3aWR0aH0gdiAke2hlaWdodH0gSCAke3h9IFYgJHt5fWBcclxuICB9LFxyXG4gIGNpcmNsZSAobm9kZSkge1xyXG4gICAgY29uc3QgciA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3InKSkgfHwgMFxyXG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ2N4JykpIHx8IDBcclxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCdjeScpKSB8fCAwXHJcblxyXG4gICAgaWYgKHIgPT09IDApIHJldHVybiAnTTAgMCdcclxuXHJcbiAgICByZXR1cm4gYE0gJHt4IC0gcn0gJHt5fSBBICR7cn0gJHtyfSAwIDAgMCAke3ggKyByfSAke3l9IEEgJHtyfSAke3J9IDAgMCAwICR7eCAtIHJ9ICR7eX1gXHJcbiAgfSxcclxuICBlbGxpcHNlIChub2RlKSB7XHJcbiAgICBjb25zdCByeCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3J4JykpIHx8IDBcclxuICAgIGNvbnN0IHJ5ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgncnknKSkgfHwgMFxyXG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ2N4JykpIHx8IDBcclxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCdjeScpKSB8fCAwXHJcblxyXG4gICAgcmV0dXJuIGBNICR7eCAtIHJ4fSAke3l9IEEgJHtyeH0gJHtyeX0gMCAwIDAgJHt4ICsgcnh9ICR7eX0gQSAke3J4fSAke3J5fSAwIDAgMCAke3ggLSByeH0gJHt5fWBcclxuICB9LFxyXG4gIGxpbmUgKG5vZGUpIHtcclxuICAgIGNvbnN0IHgxID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneDEnKSkgfHwgMFxyXG4gICAgY29uc3QgeDIgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd4MicpKSB8fCAwXHJcbiAgICBjb25zdCB5MSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3kxJykpIHx8IDBcclxuICAgIGNvbnN0IHkyID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneTInKSkgfHwgMFxyXG5cclxuICAgIHJldHVybiBgTSAke3gxfSAke3kxfSBMICR7eDJ9ICR7eTJ9YFxyXG4gIH0sXHJcbiAgcG9seWdvbiAobm9kZSkge1xyXG4gICAgcmV0dXJuIGBNICR7bm9kZS5nZXRBdHRyaWJ1dGUoJ3BvaW50cycpfSB6YFxyXG4gIH0sXHJcbiAgcG9seWxpbmUgKG5vZGUpIHtcclxuICAgIHJldHVybiBgTSAke25vZGUuZ2V0QXR0cmlidXRlKCdwb2ludHMnKX1gXHJcbiAgfVxyXG59XHJcbiIsIi8vIHNwbGl0cyBhIHRyYW5zZm9ybWF0aW9uIGNoYWluXHJcbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1zID0gL1xcKVxccyosP1xccyovXHJcblxyXG4vLyBzcGxpdCBhdCB3aGl0ZXNwYWNlIGFuZCBjb21tYVxyXG5leHBvcnQgY29uc3QgZGVsaW1pdGVyID0gL1tcXHMsXSsvXHJcblxyXG4vLyBUaGUgZm9sbG93aW5nIHJlZ2V4IGFyZSB1c2VkIHRvIHBhcnNlIHRoZSBkIGF0dHJpYnV0ZSBvZiBhIHBhdGhcclxuXHJcbi8vIE1hdGNoZXMgYWxsIGh5cGhlbnMgd2hpY2ggYXJlIG5vdCBhZnRlciBhbiBleHBvbmVudFxyXG5leHBvcnQgY29uc3QgaHlwaGVuID0gLyhbXmVdKS0vZ2lcclxuXHJcbi8vIFJlcGxhY2VzIGFuZCB0ZXN0cyBmb3IgYWxsIHBhdGggbGV0dGVyc1xyXG5leHBvcnQgY29uc3QgcGF0aExldHRlcnMgPSAvW01MSFZDU1FUQVpdL2dpXHJcblxyXG4vLyB5ZXMgd2UgbmVlZCB0aGlzIG9uZSwgdG9vXHJcbmV4cG9ydCBjb25zdCBpc1BhdGhMZXR0ZXIgPSAvW01MSFZDU1FUQVpdL2lcclxuXHJcbi8vIG1hdGNoZXMgMC4xNTQuMjMuNDVcclxuZXhwb3J0IGNvbnN0IG51bWJlcnNXaXRoRG90cyA9IC8oKFxcZD9cXC5cXGQrKD86ZVsrLV0/XFxkKyk/KSgoPzpcXC5cXGQrKD86ZVsrLV0/XFxkKyk/KSspKSsvZ2lcclxuXHJcbi8vIG1hdGNoZXMgLlxyXG5leHBvcnQgY29uc3QgZG90cyA9IC9cXC4vZ1xyXG4iLCIvLyBFbnN1cmUgdG8gc2l4LWJhc2VkIGhleFxyXG5leHBvcnQgY29uc3QgZnVsbEhleCA9IGZ1bmN0aW9uIChoZXgpIHtcclxuICByZXR1cm4gaGV4Lmxlbmd0aCA9PT0gNFxyXG4gICAgPyBbICcjJyxcclxuICAgICAgaGV4LnN1YnN0cmluZygxLCAyKSwgaGV4LnN1YnN0cmluZygxLCAyKSxcclxuICAgICAgaGV4LnN1YnN0cmluZygyLCAzKSwgaGV4LnN1YnN0cmluZygyLCAzKSxcclxuICAgICAgaGV4LnN1YnN0cmluZygzLCA0KSwgaGV4LnN1YnN0cmluZygzLCA0KVxyXG4gICAgXS5qb2luKCcnKSA6IGhleFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgaGV4VG9SR0IgPSBmdW5jdGlvbiAodmFsT3JNYXApIHtcclxuICBpZiAodHlwZW9mIHZhbE9yTWFwIGluc3RhbmNlb2YgTWFwKSB7XHJcbiAgICBmb3IgKGNvbnN0IFsga2V5LCB2YWwgXSBvZiB2YWxPck1hcCkge1xyXG4gICAgICB2YWxPck1hcC5zZXQoa2V5LCBoZXhUb1JHQih2YWwpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbE9yTWFwXHJcbiAgfVxyXG5cclxuICBpZiAoIS8jWzAtOWEtZl17Myw2fS8udGVzdCh2YWxPck1hcCkpIHsgcmV0dXJuIHZhbE9yTWFwIH1cclxuXHJcbiAgdmFsT3JNYXAgPSBmdWxsSGV4KHZhbE9yTWFwKVxyXG5cclxuICByZXR1cm4gJ3JnYignICsgW1xyXG4gICAgcGFyc2VJbnQodmFsT3JNYXAuc2xpY2UoMSwgMyksIDE2KSxcclxuICAgIHBhcnNlSW50KHZhbE9yTWFwLnNsaWNlKDMsIDUpLCAxNiksXHJcbiAgICBwYXJzZUludCh2YWxPck1hcC5zbGljZSg1LCA3KSwgMTYpXHJcbiAgXS5qb2luKCcsJykgKyAnKSdcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlY2FtZWxpemUgKHMpIHtcclxuICByZXR1cm4gU3RyaW5nKHMpLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csIGZ1bmN0aW9uIChtLCBnMSwgZzIpIHtcclxuICAgIHJldHVybiBnMSArICctJyArIGcyLnRvTG93ZXJDYXNlKClcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxDYXNlIChzKSB7XHJcbiAgcmV0dXJuIFN0cmluZyhzKS5yZXBsYWNlKC8oW2Etel0pLShbYS16XSkvZywgZnVuY3Rpb24gKG0sIGcxLCBnMikge1xyXG4gICAgcmV0dXJuIGcxICsgZzIudG9VcHBlckNhc2UoKVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVRdW90ZXMgKHN0cikge1xyXG4gIGlmIChzdHIuc3RhcnRzV2l0aCgnXCInKSB8fCBzdHIuc3RhcnRzV2l0aChcIidcIikpIHtcclxuICAgIHJldHVybiBzdHIuc2xpY2UoMSwgLTEpXHJcbiAgfVxyXG4gIHJldHVybiBzdHJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxFbnRpdGllcyAoc3RyKSB7XHJcbiAgcmV0dXJuIFN0cmluZyhzdHIpLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVuaHRtbEVudGl0aWVzIChzdHIpIHtcclxuICByZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZSgvJmFtcDsvZywgJyYnKS5yZXBsYWNlKC8mbHQ7L2csICc8JykucmVwbGFjZSgvJmd0Oy9nLCAnPicpLnJlcGxhY2UoJyZxdW90OycsICdcIicpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjZGF0YSAoc3RyKSB7XHJcbiAgcmV0dXJuIGA8IVtDREFUQVske3N0cn1dXT5gXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21tZW50IChzdHIpIHtcclxuICByZXR1cm4gYDwhLS0ke3N0cn0tLT5gXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzcGxpdE5vdEluQnJhY2tldHMgPSAoc3RyLCBkZWxpbWl0ZXIpID0+IHtcclxuICB2YXIgcm91bmRCcmFja2V0cyA9IDBcclxuXHJcbiAgdmFyIHNxdWFyZUJyYWNrZXRzID0gMFxyXG5cclxuICB2YXIgbGFzdEluZGV4ID0gMFxyXG5cclxuICB2YXIgc3BsaXQgPSBbXVxyXG5cclxuICB2YXIgY2g7IHZhciBpOyB2YXIgaWxcclxuXHJcbiAgZm9yIChpID0gMCwgaWwgPSBzdHIubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xyXG4gICAgY2ggPSBzdHIuY2hhckF0KGkpXHJcblxyXG4gICAgaWYgKGNoID09PSBkZWxpbWl0ZXIgJiYgIXJvdW5kQnJhY2tldHMgJiYgIXNxdWFyZUJyYWNrZXRzKSB7XHJcbiAgICAgIHNwbGl0LnB1c2goc3RyLnNsaWNlKGxhc3RJbmRleCwgaSkudHJpbSgpKVxyXG4gICAgICBsYXN0SW5kZXggPSBpICsgMVxyXG4gICAgICBjb250aW51ZVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaCA9PT0gJygnKSArK3JvdW5kQnJhY2tldHNcclxuICAgIGVsc2UgaWYgKGNoID09PSAnKScpIC0tcm91bmRCcmFja2V0c1xyXG4gICAgZWxzZSBpZiAoY2ggPT09ICdbJykgKytzcXVhcmVCcmFja2V0c1xyXG4gICAgZWxzZSBpZiAoY2ggPT09ICddJykgLS1zcXVhcmVCcmFja2V0c1xyXG4gIH1cclxuXHJcbiAgc3BsaXQucHVzaChzdHIuc2xpY2UobGFzdEluZGV4KS50cmltKCkpXHJcbiAgcmV0dXJuIHNwbGl0XHJcbn1cclxuIiwiY29uc3QgaHRtbEVudGl0aWVzID0gZnVuY3Rpb24gKHN0cikge1xyXG4gIHJldHVybiBTdHJpbmcoc3RyKS5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7JykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXHJcbn1cclxuXHJcbnZhciBlbXB0eUVsZW1lbnRzID0ge1xyXG4gIGJyOiB0cnVlLFxyXG4gIGhyOiB0cnVlLFxyXG4gIGltZzogdHJ1ZSxcclxuICBsaW5rOiB0cnVlXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB0YWcgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gIGNvbnN0IGF0dHJzID0gWyAuLi5ub2RlLmF0dHJzIF0ubWFwKGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICByZXR1cm4gKG5vZGUucHJlZml4ID8gbm9kZS5wcmVmaXggKyAnOicgOiAnJykgKyBub2RlLmxvY2FsTmFtZSArICc9XCInICsgaHRtbEVudGl0aWVzKG5vZGUudmFsdWUpICsgJ1wiJ1xyXG4gIH0pXHJcblxyXG4gIGNvbnN0IHsgcHJlZml4LCBsb2NhbE5hbWUgfSA9IG5vZGVcclxuICBjb25zdCBxdWFsaWZpZWROYW1lID0gKHByZWZpeCA/IHByZWZpeCArICc6JyA6ICcnKSArIGxvY2FsTmFtZVxyXG5cclxuICByZXR1cm4gJzwnICsgW10uY29uY2F0KHF1YWxpZmllZE5hbWUsIGF0dHJzKS5qb2luKCcgJykgKyAnPicgKyAoZW1wdHlFbGVtZW50c1txdWFsaWZpZWROYW1lLnRvTG93ZXJDYXNlKCldID8gJycgOiBub2RlLmlubmVySFRNTCArICc8LycgKyBxdWFsaWZpZWROYW1lICsgJz4nKVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2xvbmVOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuXHJcbiAgY29uc3QgeyBwcmVmaXgsIGxvY2FsTmFtZSwgbmFtZXNwYWNlVVJJOiBucywgbm9kZVZhbHVlLCBvd25lckRvY3VtZW50IH0gPSBub2RlXHJcblxyXG4gIC8vIEJ1aWxkIHVwIHRoZSBjb3JyZWN0bHkgY2FzZWQgcXVhbGlmaWVkIG5hbWVcclxuICBjb25zdCBxdWFsaWZpZWROYW1lID0gKHByZWZpeCA/IHByZWZpeCArICc6JyA6ICcnKSArIGxvY2FsTmFtZVxyXG5cclxuICAvLyBDaGVjayBpZiBub2RlIHdhcyBjcmVhdGVkIHVzaW5nIG5vbi1uYW1lc3BhY2UgZnVuY3Rpb24gd2hpY2ggY2FuIGxlYWQgdG8gOiBpbiB0aGUgbG9jYWxOYW1lLlxyXG4gIC8vIFRoaXMgY2hlY2sgYWxsb3dzIGZhbHNlIG5lZ2F0aXZlcyBiZWNhdXNlIGBsb2NhbGAgb25seSBtYXR0ZXJzIElGIHRoZXJlIGFyZSA6IGluIHRoZSBsb2NhbE5hbWVcclxuICAvLyBhbmQgd2UgZG9udCBjYXJlIGFib3V0IGl0IHdoZW4gdGhlcmUgYXJlIG5vblxyXG4gIGNvbnN0IGxvY2FsID0gbG9jYWxOYW1lLmluY2x1ZGVzKCc6JylcclxuXHJcbiAgdmFyIGNsb25lID0gbmV3IG5vZGUuY29uc3RydWN0b3IocXVhbGlmaWVkTmFtZSwge1xyXG4gICAgYXR0cnM6IG5ldyBTZXQoWyAuLi5ub2RlLmF0dHJzIF0ubWFwKG5vZGUgPT4gbm9kZS5jbG9uZU5vZGUoKSkpLFxyXG4gICAgbm9kZVZhbHVlLFxyXG4gICAgb3duZXJEb2N1bWVudCxcclxuICAgIGxvY2FsXHJcbiAgfSwgbnMpXHJcblxyXG4gIHJldHVybiBjbG9uZVxyXG59XHJcbiIsImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCBmb250a2l0IGZyb20gJ2ZvbnRraXQnXHJcbmltcG9ydCAqIGFzIGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMuanMnXHJcbmltcG9ydCB7IEJveCwgTm9Cb3ggfSBmcm9tICcuLi9vdGhlci9Cb3guanMnXHJcbmltcG9ydCB7IGdldENvbmZpZywgZ2V0Rm9udHMgfSBmcm9tICcuLi9jb25maWcuanMnXHJcblxyXG5leHBvcnQgY29uc3QgdGV4dEJCb3ggPSBmdW5jdGlvbiAodGV4dCwgeCwgeSwgZGV0YWlscykge1xyXG5cclxuICBpZiAoIXRleHQpIHJldHVybiBuZXcgTm9Cb3goKVxyXG5cclxuICBjb25zdCBjb25maWcgPSBnZXRDb25maWcoKVxyXG4gIGNvbnN0IHByZWxvYWRlZCA9IGdldEZvbnRzKClcclxuXHJcbiAgdmFyIGZhbWlsaWVzID0gKGRldGFpbHMuZm9udEZhbWlseSB8fCBkZWZhdWx0cy5mb250RmFtaWx5KS5zcGxpdCgvXFxzKixcXHMqLylcclxuICB2YXIgZm9udE1hcCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLmZvbnRGYW1pbHlNYXBwaW5ncywgY29uZmlnLmZvbnRGYW1pbHlNYXBwaW5ncylcclxuICB2YXIgZm9udFNpemUgPSBkZXRhaWxzLmZvbnRTaXplIHx8IGRlZmF1bHRzLmZvbnRTaXplXHJcbiAgdmFyIGZvbnREaXIgPSBjb25maWcuZm9udERpciB8fCBkZWZhdWx0cy5mb250RGlyXHJcbiAgdmFyIGZvbnRGYW1pbHlcclxuICB2YXIgZm9udFxyXG5cclxuICBmb3IgKHZhciBpID0gMCwgaWwgPSBmYW1pbGllcy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XHJcbiAgICBpZiAoZm9udE1hcFtmYW1pbGllc1tpXV0pIHtcclxuICAgICAgZm9udEZhbWlseSA9IGZhbWlsaWVzW2ldXHJcbiAgICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoIWZvbnRGYW1pbHkpIHtcclxuICAgIGZvbnRGYW1pbHkgPSBkZWZhdWx0cy5mb250RmFtaWx5XHJcbiAgfVxyXG5cclxuICBpZiAocHJlbG9hZGVkW2ZvbnRGYW1pbHldKSB7XHJcbiAgICBmb250ID0gcHJlbG9hZGVkW2ZvbnRGYW1pbHldXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5qb2luKGZvbnREaXIsIGZvbnRNYXBbZm9udEZhbWlseV0pXHJcbiAgICB0cnkge1xyXG4gICAgICBmb250ID0gZm9udGtpdC5vcGVuU3luYyhmaWxlbmFtZSlcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3Qgb3BlbiBmb250IFwiJHtmb250RmFtaWx5fVwiIGluIGZpbGUgXCIke2ZpbGVuYW1lfVwiLiAke2UudG9TdHJpbmcoKX1gKVxyXG4gICAgICByZXR1cm4gbmV3IE5vQm94KClcclxuICAgIH1cclxuXHJcbiAgICBwcmVsb2FkZWRbZm9udEZhbWlseV0gPSBmb250XHJcbiAgfVxyXG5cclxuICB2YXIgZm9udEhlaWdodCA9IGZvbnQuYXNjZW50IC0gZm9udC5kZXNjZW50XHJcbiAgdmFyIGxpbmVIZWlnaHQgPSBmb250SGVpZ2h0ID4gZm9udC51bml0c1BlckVtID8gZm9udEhlaWdodCA6IGZvbnRIZWlnaHQgKyBmb250LmxpbmVHYXBcclxuXHJcbiAgdmFyIGhlaWdodCA9IGxpbmVIZWlnaHQgLyBmb250LnVuaXRzUGVyRW0gKiBmb250U2l6ZVxyXG4gIHZhciB3aWR0aCA9IGZvbnQubGF5b3V0KHRleHQpLmdseXBocy5yZWR1Y2UoKGxhc3QsIGN1cnIpID0+IGxhc3QgKyBjdXJyLmFkdmFuY2VXaWR0aCwgMCkgLyBmb250LnVuaXRzUGVyRW0gKiBmb250U2l6ZVxyXG5cclxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9TVkcvQXR0cmlidXRlL3RleHQtYW5jaG9yXHJcbiAgdmFyIHhBZGp1c3QgPSAwXHJcbiAgaWYgKGRldGFpbHMudGV4dEFuY2hvciA9PT0gJ2VuZCcpIHtcclxuICAgIHhBZGp1c3QgPSAtd2lkdGhcclxuICB9IGVsc2UgaWYgKGRldGFpbHMudGV4dEFuY2hvciA9PT0gJ21pZGRsZScpIHtcclxuICAgIHhBZGp1c3QgPSAtd2lkdGggLyAyXHJcbiAgfVxyXG5cclxuICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvMjAwMi9XRC1jc3MzLWxpbmVib3gtMjAwMjA1MTUvXHJcbiAgLy8gNC4yLiBCYXNlbGluZSBpZGVudGlmaWVyc1xyXG4gIHZhciB5QWRqdXN0ID0gZm9udC5hc2NlbnQgLy8gYWxwaGFiZXRpY1xyXG4gIGlmIChkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICdiZWZvcmUtZWRnZScgfHwgZGV0YWlscy5kb21pbmFudEJhc2VsaW5lID09PSAndGV4dC1iZWZvcmUtZWRnZScpIHtcclxuICAgIHlBZGp1c3QgPSAwXHJcbiAgfSBlbHNlIGlmIChkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICdoYW5naW5nJykge1xyXG4gICAgeUFkanVzdCA9IGZvbnQuYXNjZW50IC0gZm9udC54SGVpZ2h0IC0gZm9udC5jYXBIZWlnaHRcclxuICB9IGVsc2UgaWYgKGRldGFpbHMuZG9taW5hbnRCYXNlbGluZSA9PT0gJ21hdGhlbWF0aWNhbCcpIHtcclxuICAgIHlBZGp1c3QgPSBmb250LmFzY2VudCAtIGZvbnQueEhlaWdodFxyXG4gIH0gZWxzZSBpZiAoZGV0YWlscy5kb21pbmFudEJhc2VsaW5lID09PSAnbWlkZGxlJykge1xyXG4gICAgeUFkanVzdCA9IGZvbnQuYXNjZW50IC0gZm9udC54SGVpZ2h0IC8gMlxyXG4gIH0gZWxzZSBpZiAoZGV0YWlscy5kb21pbmFudEJhc2VsaW5lID09PSAnY2VudHJhbCcpIHtcclxuICAgIHlBZGp1c3QgPSBmb250LmFzY2VudCAvIDIgKyBmb250LmRlc2NlbnQgLyAyXHJcbiAgfSBlbHNlIGlmIChkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICdpZGVvZ3JhcGhpYycpIHtcclxuICAgIHlBZGp1c3QgPSBmb250LmFzY2VudCArIGZvbnQuZGVzY2VudFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5ldyBCb3goeCArIHhBZGp1c3QsIHkgLSB5QWRqdXN0IC8gZm9udC51bml0c1BlckVtICogZm9udFNpemUsIHdpZHRoLCBoZWlnaHQpXHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBkZWZhdWx0cyBmcm9tICcuL3NyYy91dGlscy9kZWZhdWx0cy5qcydcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9BdHRyLmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vQ2hhcmFjdGVyRGF0YS5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0NvbW1lbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9DdXN0b21FdmVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0RvY3VtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vRG9jdW1lbnRGcmFnbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0VsZW1lbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9FdmVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0V2ZW50VGFyZ2V0LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vTm9kZS5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL05vZGVGaWx0ZXIuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9UZXh0LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vV2luZG93LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vaHRtbC9IVE1MRWxlbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL2h0bWwvSFRNTEltYWdlRWxlbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL2h0bWwvSFRNTExpbmtFbGVtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vaHRtbC9IVE1MUGFyc2VyLmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vaHRtbC9IVE1MU2NyaXB0RWxlbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL21peGlucy9lbGVtZW50QWNjZXNzLmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vbWl4aW5zL1BhcmVudE5vZGUuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHRWxlbWVudC5qcydcclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdHcmFwaGljc0VsZW1lbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHTWF0cml4LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vc3ZnL1NWR1BhdGhFbGVtZW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vc3ZnL1NWR1BvaW50LmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vc3ZnL1NWR1NWR0VsZW1lbnQuanMnXHJcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHVGV4dENvbnRlbnRFbGVtZW50LmpzJ1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9zcmMvY29uZmlnLmpzJ1xyXG5leHBvcnQgKiBmcm9tICcuL3NyYy9mYWN0b3JpZXMuanMnXHJcbmV4cG9ydCB7IGRlZmF1bHRzIH1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9