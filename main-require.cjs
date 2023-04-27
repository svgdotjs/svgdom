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
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "getConfig": () => (/* binding */ getConfig),
/* harmony export */   "getFonts": () => (/* binding */ getFonts),
/* harmony export */   "preloadFonts": () => (/* binding */ preloadFonts),
/* harmony export */   "setFontDir": () => (/* binding */ setFontDir),
/* harmony export */   "setFontFamilyMappings": () => (/* binding */ setFontFamilyMappings)
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
/* harmony import */ var _svg_SVGRectElement_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./svg/SVGRectElement.js */ "./src/dom/svg/SVGRectElement.js");
/* harmony import */ var _svg_SVGCircleElement_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./svg/SVGCircleElement.js */ "./src/dom/svg/SVGCircleElement.js");
/* harmony import */ var _svg_SVGLineElement_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./svg/SVGLineElement.js */ "./src/dom/svg/SVGLineElement.js");
/* harmony import */ var _svg_SVGEllipseElement_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./svg/SVGEllipseElement.js */ "./src/dom/svg/SVGEllipseElement.js");
/* harmony import */ var _svg_SVGForeignObjectElement_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./svg/SVGForeignObjectElement.js */ "./src/dom/svg/SVGForeignObjectElement.js");
/* harmony import */ var _svg_SVGImageElement_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./svg/SVGImageElement.js */ "./src/dom/svg/SVGImageElement.js");


























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
  case 'circle':
    return _svg_SVGCircleElement_js__WEBPACK_IMPORTED_MODULE_20__.SVGCircleElement
  case 'ellipse':
    return _svg_SVGEllipseElement_js__WEBPACK_IMPORTED_MODULE_22__.SVGEllipseElement
  case 'line':
    return _svg_SVGLineElement_js__WEBPACK_IMPORTED_MODULE_21__.SVGLineElement
  case 'rect':
    return _svg_SVGRectElement_js__WEBPACK_IMPORTED_MODULE_19__.SVGRectElement
  case 'foreignObject':
    return _svg_SVGForeignObjectElement_js__WEBPACK_IMPORTED_MODULE_23__.SVGForeignObjectElement
  case 'image':
    return _svg_SVGImageElement_js__WEBPACK_IMPORTED_MODULE_24__.SVGImageElement
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
  before (...nodes) {
    if (!this.parentNode) return
    const node = (0,_utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_0__.nodesToNode)(nodes, this.ownerDocument)
    this.parentNode.insertBefore(node, this)
  },
  after (...nodes) {
    if (!this.parentNode) return
    const node = (0,_utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_0__.nodesToNode)(nodes, this.ownerDocument)
    this.parentNode.insertBefore(node, this.nextSibling)
  },
  replaceWith (...nodes) {
    if (!this.parentNode) return
    const next = this.nextSibling
    const node = (0,_utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_0__.nodesToNode)(nodes, this.ownerDocument)
    this.parentNode.insertBefore(node, next)
    this.remove()
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

  closest (query) {
    const cssQuery = new _other_CssQuery_js__WEBPACK_IMPORTED_MODULE_0__.CssQuery(query)
    let node = this
    while (node) {
      if (cssQuery.matches(node, this)) {
        return node
      }
      node = node.parentNode
    }
    return null
  },

  prepend (...nodes) {
    const node = (0,_utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_3__.nodesToNode)(nodes, this.ownerDocument)

    this.insertBefore(node, this.firstChild)
  },

  append (...nodes) {
    const node = (0,_utils_nodesToNode_js__WEBPACK_IMPORTED_MODULE_3__.nodesToNode)(nodes, this.ownerDocument)
    this.appendChild(node)
  },

  replaceChildren (...nodes) {
    while (this.firstChild) {
      this.removeChild(this.firstChild)
    }
    this.append(...nodes)
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

/***/ "./src/dom/svg/SVGAnimatedLength.js":
/*!******************************************!*\
  !*** ./src/dom/svg/SVGAnimatedLength.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGAnimatedLength": () => (/* binding */ SVGAnimatedLength)
/* harmony export */ });
/* harmony import */ var _SVGLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGLength.js */ "./src/dom/svg/SVGLength.js");
// @ts-check


class SVGAnimatedLength {
  baseVal

  constructor(element, attributeName) {
    this.baseVal = new _SVGLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGLength(element, attributeName)
  }

  get animVal() {
    throw new Error('animVal is not implemented')
  }
}


/***/ }),

/***/ "./src/dom/svg/SVGCircleElement.js":
/*!*****************************************!*\
  !*** ./src/dom/svg/SVGCircleElement.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGCircleElement": () => (/* binding */ SVGCircleElement)
/* harmony export */ });
/* harmony import */ var _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGAnimatedLength.js */ "./src/dom/svg/SVGAnimatedLength.js");
/* harmony import */ var _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");
// @ts-check



class SVGCircleElement extends _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__.SVGGraphicsElement {
  cx = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'cx')
  cy = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'cy')
  r = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'r')
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

/***/ "./src/dom/svg/SVGEllipseElement.js":
/*!******************************************!*\
  !*** ./src/dom/svg/SVGEllipseElement.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGEllipseElement": () => (/* binding */ SVGEllipseElement)
/* harmony export */ });
/* harmony import */ var _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGAnimatedLength.js */ "./src/dom/svg/SVGAnimatedLength.js");
/* harmony import */ var _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");
// @ts-check



class SVGEllipseElement extends _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__.SVGGraphicsElement {
  cx = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'cx')
  cy = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'cy')
  rx = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'rx')
  ry = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'ry')
}


/***/ }),

/***/ "./src/dom/svg/SVGForeignObjectElement.js":
/*!************************************************!*\
  !*** ./src/dom/svg/SVGForeignObjectElement.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGForeignObjectElement": () => (/* binding */ SVGForeignObjectElement)
/* harmony export */ });
/* harmony import */ var _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGAnimatedLength.js */ "./src/dom/svg/SVGAnimatedLength.js");
/* harmony import */ var _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");
// @ts-check




class SVGForeignObjectElement extends _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__.SVGGraphicsElement {
  x = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'x')
  y = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'y')
  width = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'width')
  height = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'height')
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

/***/ "./src/dom/svg/SVGImageElement.js":
/*!****************************************!*\
  !*** ./src/dom/svg/SVGImageElement.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGImageElement": () => (/* binding */ SVGImageElement)
/* harmony export */ });
/* harmony import */ var _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGAnimatedLength.js */ "./src/dom/svg/SVGAnimatedLength.js");
/* harmony import */ var _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");



class SVGImageElement extends _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__.SVGGraphicsElement {
  x = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'x')
  y = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'y')
  width = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'width')
  height = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'height')
}


/***/ }),

/***/ "./src/dom/svg/SVGLength.js":
/*!**********************************!*\
  !*** ./src/dom/svg/SVGLength.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGLength": () => (/* binding */ SVGLength)
/* harmony export */ });
/* harmony import */ var _utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/objectCreationUtils.js */ "./src/utils/objectCreationUtils.js");
// @ts-check
// @ts-ignore


const unitTypes = {
  SVG_LENGTHTYPE_UNKNOWN: 0,
  SVG_LENGTHTYPE_NUMBER: 1,
  SVG_LENGTHTYPE_PERCENTAGE: 2,
  SVG_LENGTHTYPE_EMS: 3,
  SVG_LENGTHTYPE_EXS: 4,
  SVG_LENGTHTYPE_PX: 5,
  SVG_LENGTHTYPE_CM: 6,
  SVG_LENGTHTYPE_MM: 7,
  SVG_LENGTHTYPE_IN: 8,
  SVG_LENGTHTYPE_PT: 9,
  SVG_LENGTHTYPE_PC: 10,
}

const unitByString = {
  ['']: unitTypes.SVG_LENGTHTYPE_NUMBER,
  ['%']: unitTypes.SVG_LENGTHTYPE_PERCENTAGE,
  ['em']: unitTypes.SVG_LENGTHTYPE_EMS,
  ['ex']: unitTypes.SVG_LENGTHTYPE_EXS,
  ['px']: unitTypes.SVG_LENGTHTYPE_PX,
  ['cm']: unitTypes.SVG_LENGTHTYPE_CM,
  ['mm']: unitTypes.SVG_LENGTHTYPE_MM,
  ['in']: unitTypes.SVG_LENGTHTYPE_IN,
  ['pt']: unitTypes.SVG_LENGTHTYPE_PT,
  ['pc']: unitTypes.SVG_LENGTHTYPE_PC,
}

const unitStringByConstant = new Map(
  Object.entries(unitByString).map(([unitString, unitConstant]) => [
    unitConstant,
    unitString,
  ])
)

const unitFactors = new Map([
  [unitTypes.SVG_LENGTHTYPE_NUMBER, 1],
  [unitTypes.SVG_LENGTHTYPE_PERCENTAGE, NaN],
  [unitTypes.SVG_LENGTHTYPE_EMS, NaN],
  [unitTypes.SVG_LENGTHTYPE_EXS, NaN],
  [unitTypes.SVG_LENGTHTYPE_PX, 1],
  [unitTypes.SVG_LENGTHTYPE_CM, 6],
  [unitTypes.SVG_LENGTHTYPE_MM, 96 / 25.4],
  [unitTypes.SVG_LENGTHTYPE_IN, 96],
  [unitTypes.SVG_LENGTHTYPE_PT, 4 / 3],
  [unitTypes.SVG_LENGTHTYPE_PC, 16],
])

const valuePattern = /^\s*([+-]?[0-9]*[.]?[0-9]+(?:e[+-]?[0-9]+)?)(em|ex|px|in|cm|mm|pt|pc|%)?\s*$/i;

class SVGLength {
  element
  attributeName

  /**
   * @param {Element} element
   * @param {string} attributeName
   */
  constructor(element, attributeName) {
    this.element = element
    this.attributeName = attributeName
  }

  get unitType() {
    return parseValue(this.element.getAttribute(this.attributeName))[1]
  }

  get value() {
    const [value, unit] = parseValue(
      this.element.getAttribute(this.attributeName)
    )
    return value * getUnitFactor(unit)
  }

  set value(value) {
    const unitFactor = getUnitFactor(this.unitType)
    this.element.setAttribute(
      this.attributeName,
      value / unitFactor + unitString(this)
    )
  }

  get valueInSpecifiedUnits() {
    return parseValue(this.element.getAttribute(this.attributeName))[0]
  }

  set valueInSpecifiedUnits(value) {
    this.element.setAttribute(this.attributeName, value + unitString(this))
  }

  get valueAsString() {
    // Do not simply use getAttribute() as this function has to return a string
    // that is a valid representation of the used value.
    return this.valueInSpecifiedUnits + unitString(this)
  }

  set valueAsString(valueString) {
    const [value, unit] = parseValue(valueString, false)
    const unitString = unitStringByConstant.get(unit) || ''
    this.element.setAttribute(this.attributeName, value + unitString)
  }
}

/**
 * @param {string|null} valueString
 * @param {boolean} fallback  If set to `false` causes an error to be thrown if
 * `valueString` can not be parsed properly. Otherwise the returned value falls
 * back to 0 and the unit falls back to `SVG_LENGTHTYPE_NUMBER`.
 * @return {[number, number]}  Value and unit. For unknown units, if the
 * attribute is not of the correct format or if the attribute is not present on
 * the element, value 0 and unit SVG_LENGTHTYPE_NUMBER are returned.
 */
function parseValue(valueString, fallback = true) {
  const [, rawValue, rawUnit] = (valueString || '').match(valuePattern) || []
  const unit = unitByString[(rawUnit || '').toLowerCase()]
  if (rawValue !== undefined && unit !== undefined) {
    return [parseFloat(rawValue), unit]
  }
  if (fallback) {
    // For unknown units or unparsable attributes, browsers fall back to value 0
    return [0, unitTypes.SVG_LENGTHTYPE_NUMBER]
  }
  throw new Error('An invalid or illegal string was specified')
}

/**
 * @param {number} unit  Unit constant
 */
function getUnitFactor(unit) {
  const unitFactor = unitFactors.get(unit)
  if (unitFactor === undefined) {
    throw new Error(unitFactor + ' is not a known unit constant')
  }
  if (isNaN(unitFactor)) {
    throw new Error(`Unit ${unitStringByConstant.get(unit)} is not supported`)
  }
  return unitFactor
}

/**
 * @param {SVGLength} svgLength
 * @return {string}
 */
function unitString(svgLength) {
  return unitStringByConstant.get(svgLength.unitType) || ''
}

(0,_utils_objectCreationUtils_js__WEBPACK_IMPORTED_MODULE_0__.extendStatic)(SVGLength, unitTypes)


/***/ }),

/***/ "./src/dom/svg/SVGLineElement.js":
/*!***************************************!*\
  !*** ./src/dom/svg/SVGLineElement.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGLineElement": () => (/* binding */ SVGLineElement)
/* harmony export */ });
/* harmony import */ var _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGAnimatedLength.js */ "./src/dom/svg/SVGAnimatedLength.js");
/* harmony import */ var _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");
// @ts-check



class SVGLineElement extends _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__.SVGGraphicsElement {
  x1 = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'x1')
  y1 = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'y1')
  x2 = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'x2')
  y2 = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'y2')
}


/***/ }),

/***/ "./src/dom/svg/SVGMatrix.js":
/*!**********************************!*\
  !*** ./src/dom/svg/SVGMatrix.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGMatrix": () => (/* binding */ SVGMatrix),
/* harmony export */   "matrixFactory": () => (/* binding */ matrixFactory)
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

/***/ "./src/dom/svg/SVGRectElement.js":
/*!***************************************!*\
  !*** ./src/dom/svg/SVGRectElement.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGRectElement": () => (/* binding */ SVGRectElement)
/* harmony export */ });
/* harmony import */ var _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");
/* harmony import */ var _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SVGAnimatedLength.js */ "./src/dom/svg/SVGAnimatedLength.js");
// @ts-check



class SVGRectElement extends _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_0__.SVGGraphicsElement {
  x = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_1__.SVGAnimatedLength(this, 'x')
  y = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_1__.SVGAnimatedLength(this, 'y')
  width = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_1__.SVGAnimatedLength(this, 'width')
  height = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_1__.SVGAnimatedLength(this, 'height')
  rx = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_1__.SVGAnimatedLength(this, 'rx')
  ry = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_1__.SVGAnimatedLength(this, 'ry')
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
/* harmony import */ var _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SVGAnimatedLength.js */ "./src/dom/svg/SVGAnimatedLength.js");
/* harmony import */ var _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SVGGraphicsElement.js */ "./src/dom/svg/SVGGraphicsElement.js");



class SVGTextContentElement extends _SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_1__.SVGGraphicsElement {
  textWidth = new _SVGAnimatedLength_js__WEBPACK_IMPORTED_MODULE_0__.SVGAnimatedLength(this, 'textWidth')

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
/* harmony export */   "createHTMLWindow": () => (/* binding */ createHTMLWindow),
/* harmony export */   "createSVGDocument": () => (/* binding */ createSVGDocument),
/* harmony export */   "createSVGWindow": () => (/* binding */ createSVGWindow),
/* harmony export */   "createWindow": () => (/* binding */ createWindow)
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
/* harmony export */   "CssQuery": () => (/* binding */ CssQuery),
/* harmony export */   "CssQueryNode": () => (/* binding */ CssQueryNode)
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

    let queries = (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_0__.splitNotInBrackets)(query, ',')

    queries = queries.map(query => {

      let roundBrackets = 0
      let squareBrackets = 0

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

      const pairs = []

      let relation = '%'

      // generate querynode relation tuples
      for (let i = 0, il = query.length; i < il; ++i) {

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
    for (let i = this.queries.length; i--;) {
      if (this.matchHelper(this.queries[i], node, scope)) {
        return true
      }
    }
    return false
  }

  matchHelper (query, node, scope) {
    query = query.slice()
    const last = query.pop()

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
    let matches = node.match(/^[\w-]+|^\*/)
    if (matches) {
      this.tag = matches[0]
      node = node.slice(this.tag.length)
    }

    // match pseudo classes
    while ((matches = /:([\w-]+)(?:\((.+)\))?/g.exec(node))) {
      this.pseudo.push(pseudoMatcher[matches[1]].bind(this, (0,_utils_strUtils_js__WEBPACK_IMPORTED_MODULE_0__.removeQuotes)(matches[2] || '')))
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
  }

  matches (node, scope) {
    let i

    if (node.nodeType !== 1) return false

    // Always this extra code for html -.-
    if (node.namespaceURI === _utils_namespaces_js__WEBPACK_IMPORTED_MODULE_2__.html) {
      this.tag = this.tag.toUpperCase()
    }

    if (this.tag && this.tag !== node.nodeName && this.tag !== '*') { return false }

    if (this.id && this.id !== node.id) {
      return false
    }

    const classList = (node.getAttribute('class') || '').split(_utils_regex_js__WEBPACK_IMPORTED_MODULE_1__.delimiter).filter(el => !!el.length)
    if (this.classList.filter(className => classList.indexOf(className) < 0).length) {
      return false
    }

    for (i = this.attrs.length; i--;) {
      const attrValue = this.attrs[i].getValue(node)
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
/* harmony export */   "fontDir": () => (/* binding */ fontDir),
/* harmony export */   "fontFamily": () => (/* binding */ fontFamily),
/* harmony export */   "fontFamilyMappings": () => (/* binding */ fontFamilyMappings),
/* harmony export */   "fontSize": () => (/* binding */ fontSize)
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
/* harmony export */   "cssToMap": () => (/* binding */ cssToMap),
/* harmony export */   "mapMap": () => (/* binding */ mapMap),
/* harmony export */   "mapToCss": () => (/* binding */ mapToCss),
/* harmony export */   "mapToObject": () => (/* binding */ mapToObject),
/* harmony export */   "objectToMap": () => (/* binding */ objectToMap)
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
/* harmony export */   "html": () => (/* binding */ html),
/* harmony export */   "mathml": () => (/* binding */ mathml),
/* harmony export */   "svg": () => (/* binding */ svg),
/* harmony export */   "xlink": () => (/* binding */ xlink),
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
  if (nodes.length === 1) { return nodes[0] }
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
/* harmony export */   "Arc": () => (/* binding */ Arc),
/* harmony export */   "PathSegmentArray": () => (/* binding */ PathSegmentArray),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "getCloud": () => (/* binding */ getCloud),
/* harmony export */   "getPathSegments": () => (/* binding */ getPathSegments),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "pathBBox": () => (/* binding */ pathBBox),
/* harmony export */   "pathFrom": () => (/* binding */ pathFrom),
/* harmony export */   "pathParser": () => (/* binding */ pathParser),
/* harmony export */   "pointAtLength": () => (/* binding */ pointAtLength)
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
/* harmony export */   "delimiter": () => (/* binding */ delimiter),
/* harmony export */   "dots": () => (/* binding */ dots),
/* harmony export */   "hyphen": () => (/* binding */ hyphen),
/* harmony export */   "isPathLetter": () => (/* binding */ isPathLetter),
/* harmony export */   "numbersWithDots": () => (/* binding */ numbersWithDots),
/* harmony export */   "pathLetters": () => (/* binding */ pathLetters),
/* harmony export */   "transforms": () => (/* binding */ transforms)
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
/* harmony export */   "camelCase": () => (/* binding */ camelCase),
/* harmony export */   "cdata": () => (/* binding */ cdata),
/* harmony export */   "comment": () => (/* binding */ comment),
/* harmony export */   "decamelize": () => (/* binding */ decamelize),
/* harmony export */   "fullHex": () => (/* binding */ fullHex),
/* harmony export */   "hexToRGB": () => (/* binding */ hexToRGB),
/* harmony export */   "htmlEntities": () => (/* binding */ htmlEntities),
/* harmony export */   "removeQuotes": () => (/* binding */ removeQuotes),
/* harmony export */   "splitNotInBrackets": () => (/* binding */ splitNotInBrackets),
/* harmony export */   "unhtmlEntities": () => (/* binding */ unhtmlEntities)
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
/* harmony export */   "cloneNode": () => (/* binding */ cloneNode),
/* harmony export */   "tag": () => (/* binding */ tag)
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
/* harmony export */   "HTMLElement": () => (/* reexport safe */ _src_dom_html_HTMLElement_js__WEBPACK_IMPORTED_MODULE_14__.HTMLElement),
/* harmony export */   "HTMLImageElement": () => (/* reexport safe */ _src_dom_html_HTMLImageElement_js__WEBPACK_IMPORTED_MODULE_15__.HTMLImageElement),
/* harmony export */   "HTMLLinkElement": () => (/* reexport safe */ _src_dom_html_HTMLLinkElement_js__WEBPACK_IMPORTED_MODULE_16__.HTMLLinkElement),
/* harmony export */   "HTMLParser": () => (/* reexport safe */ _src_dom_html_HTMLParser_js__WEBPACK_IMPORTED_MODULE_17__.HTMLParser),
/* harmony export */   "HTMLScriptElement": () => (/* reexport safe */ _src_dom_html_HTMLScriptElement_js__WEBPACK_IMPORTED_MODULE_18__.HTMLScriptElement),
/* harmony export */   "Node": () => (/* reexport safe */ _src_dom_Node_js__WEBPACK_IMPORTED_MODULE_10__.Node),
/* harmony export */   "NodeFilter": () => (/* reexport safe */ _src_dom_NodeFilter_js__WEBPACK_IMPORTED_MODULE_11__.NodeFilter),
/* harmony export */   "ParentNode": () => (/* reexport safe */ _src_dom_mixins_ParentNode_js__WEBPACK_IMPORTED_MODULE_20__.ParentNode),
/* harmony export */   "SVGElement": () => (/* reexport safe */ _src_dom_svg_SVGElement_js__WEBPACK_IMPORTED_MODULE_21__.SVGElement),
/* harmony export */   "SVGGraphicsElement": () => (/* reexport safe */ _src_dom_svg_SVGGraphicsElement_js__WEBPACK_IMPORTED_MODULE_22__.SVGGraphicsElement),
/* harmony export */   "SVGMatrix": () => (/* reexport safe */ _src_dom_svg_SVGMatrix_js__WEBPACK_IMPORTED_MODULE_23__.SVGMatrix),
/* harmony export */   "SVGPathElement": () => (/* reexport safe */ _src_dom_svg_SVGPathElement_js__WEBPACK_IMPORTED_MODULE_24__.SVGPathElement),
/* harmony export */   "SVGPoint": () => (/* reexport safe */ _src_dom_svg_SVGPoint_js__WEBPACK_IMPORTED_MODULE_25__.SVGPoint),
/* harmony export */   "SVGSVGElement": () => (/* reexport safe */ _src_dom_svg_SVGSVGElement_js__WEBPACK_IMPORTED_MODULE_26__.SVGSVGElement),
/* harmony export */   "SVGTextContentElement": () => (/* reexport safe */ _src_dom_svg_SVGTextContentElement_js__WEBPACK_IMPORTED_MODULE_27__.SVGTextContentElement),
/* harmony export */   "Text": () => (/* reexport safe */ _src_dom_Text_js__WEBPACK_IMPORTED_MODULE_12__.Text),
/* harmony export */   "Window": () => (/* reexport safe */ _src_dom_Window_js__WEBPACK_IMPORTED_MODULE_13__.Window),
/* harmony export */   "config": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.config),
/* harmony export */   "createDocument": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createDocument),
/* harmony export */   "createHTMLDocument": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createHTMLDocument),
/* harmony export */   "createHTMLWindow": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createHTMLWindow),
/* harmony export */   "createSVGDocument": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createSVGDocument),
/* harmony export */   "createSVGWindow": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createSVGWindow),
/* harmony export */   "createWindow": () => (/* reexport safe */ _src_factories_js__WEBPACK_IMPORTED_MODULE_29__.createWindow),
/* harmony export */   "defaults": () => (/* reexport module object */ _src_utils_defaults_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "elementAccess": () => (/* reexport safe */ _src_dom_mixins_elementAccess_js__WEBPACK_IMPORTED_MODULE_19__.elementAccess),
/* harmony export */   "getConfig": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.getConfig),
/* harmony export */   "getFonts": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.getFonts),
/* harmony export */   "matrixFactory": () => (/* reexport safe */ _src_dom_svg_SVGMatrix_js__WEBPACK_IMPORTED_MODULE_23__.matrixFactory),
/* harmony export */   "preloadFonts": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.preloadFonts),
/* harmony export */   "setFontDir": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.setFontDir),
/* harmony export */   "setFontFamilyMappings": () => (/* reexport safe */ _src_config_js__WEBPACK_IMPORTED_MODULE_28__.setFontFamilyMappings)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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QUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsYUFBYSw4Q0FBRztBQUNoQjs7Ozs7OztVQzdFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05tRDs7QUFFbEI7QUFDUztBQUNOO0FBQ0k7QUFDSDtBQUNRO0FBQ1Q7QUFDRjtBQUNNO0FBQ1A7QUFDTTtBQUNOO0FBQ0U7QUFDVTtBQUNLO0FBQ0Q7QUFDTDtBQUNPO0FBQ0Y7QUFDSDtBQUNIO0FBQ1E7QUFDVDtBQUNLO0FBQ047QUFDSztBQUNROztBQUV2QjtBQUNHO0FBQ2YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmdkb20vZXh0ZXJuYWwgY29tbW9uanMgXCIuL3NyYy91dGlscy9kaXJuYW1lLmNqc1wiIiwid2VicGFjazovL3N2Z2RvbS9leHRlcm5hbCBjb21tb25qcyBcImZvbnRraXRcIiIsIndlYnBhY2s6Ly9zdmdkb20vZXh0ZXJuYWwgY29tbW9uanMgXCJpbWFnZS1zaXplXCIiLCJ3ZWJwYWNrOi8vc3ZnZG9tL2V4dGVybmFsIGNvbW1vbmpzIFwic2F4XCIiLCJ3ZWJwYWNrOi8vc3ZnZG9tL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0F0dHIuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9DaGFyYWN0ZXJEYXRhLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vQ29tbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0N1c3RvbUV2ZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vRG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9Eb2N1bWVudEZyYWdtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vRG9jdW1lbnRUeXBlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0V2ZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vRXZlbnRUYXJnZXQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9Ob2RlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vTm9kZUZpbHRlci5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL1RleHQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9XaW5kb3cuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9odG1sL0hUTUxFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vaHRtbC9IVE1MSW1hZ2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vaHRtbC9IVE1MTGlua0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9odG1sL0hUTUxQYXJzZXIuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vbWl4aW5zL0NoaWxkTm9kZS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL21peGlucy9Ob25Eb2N1bWVudFR5cGVDaGlsZE5vZGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9taXhpbnMvTm9uRWxlbWVudFBhcmVudE5vZGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9taXhpbnMvUGFyZW50Tm9kZS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL21peGlucy9lbGVtZW50QWNjZXNzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR0FuaW1hdGVkTGVuZ3RoLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR0NpcmNsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdFbGxpcHNlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdGb3JlaWduT2JqZWN0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdHcmFwaGljc0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHSW1hZ2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR0xlbmd0aC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdMaW5lRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdNYXRyaXguanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHUGF0aEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHUG9pbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHUmVjdEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHU1ZHRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdUZXh0Q29udGVudEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2ZhY3Rvcmllcy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvb3RoZXIvQm94LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9vdGhlci9Dc3NRdWVyeS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvb3RoZXIvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL05vZGVJdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvUG9pbnRDbG91ZC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvYmJveFV0aWxzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvbWFwVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL25hbWVzcGFjZXMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL25vZGVzVG9Ob2RlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9wYXRoVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL3JlZ2V4LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9zdHJVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvdGFnVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL3RleHRVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3ZnZG9tL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdmdkb20vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdmdkb20vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zdmdkb20vLi9tYWluLW1vZHVsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3NyYy91dGlscy9kaXJuYW1lLmNqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmb250a2l0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImltYWdlLXNpemVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2F4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBmb250a2l0IGZyb20gJ2ZvbnRraXQnXG5cbmNvbnN0IF9jb25maWcgPSB7fVxuY29uc3QgZm9udHMgPSB7fVxuXG5leHBvcnQgY29uc3Qgc2V0Rm9udERpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgX2NvbmZpZy5mb250RGlyID0gZGlyXG4gIHJldHVybiB0aGlzXG59XG5cbmV4cG9ydCBjb25zdCBzZXRGb250RmFtaWx5TWFwcGluZ3MgPSBmdW5jdGlvbiAobWFwKSB7XG4gIF9jb25maWcuZm9udEZhbWlseU1hcHBpbmdzID0gbWFwXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIFRPRE86IG1ha2UgYXN5bmNcbmV4cG9ydCBjb25zdCBwcmVsb2FkRm9udHMgPSAoKSA9PiB7XG4gIHZhciBtYXAgPSBfY29uZmlnLmZvbnRGYW1pbHlNYXBwaW5nc1xuXG4gIGZvciAoY29uc3QgWyBmb250LCBmaWxlIF0gb2YgT2JqZWN0LmVudHJpZXMobWFwKSkge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5qb2luKF9jb25maWcuZm9udERpciwgZmlsZSlcblxuICAgIHRyeSB7XG4gICAgICBmb250c1tmb250XSA9IGZvbnRraXQub3BlblN5bmMoZmlsZW5hbWUpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgbG9hZCBmb250IGZpbGUgZm9yICR7Zm9udH1gLCBlKVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnQgY29uc3QgZ2V0Q29uZmlnID0gKCkgPT4gX2NvbmZpZ1xuZXhwb3J0IGNvbnN0IGdldEZvbnRzID0gKCkgPT4gZm9udHNcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgc2V0Rm9udERpcixcbiAgc2V0Rm9udEZhbWlseU1hcHBpbmdzLFxuICBwcmVsb2FkRm9udHMsXG4gIGdldENvbmZpZyxcbiAgZ2V0Rm9udHNcbn1cbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXG5pbXBvcnQgeyBodG1sIH0gZnJvbSAnLi4vdXRpbHMvbmFtZXNwYWNlcy5qcydcblxuZXhwb3J0IGNsYXNzIEF0dHIgZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzLCBucykge1xuICAgIHN1cGVyKG5hbWUsIHsgbm9kZVZhbHVlOiAnJywgLi4ucHJvcHMgfSwgbnMpXG5cbiAgICAvLyBGb2xsb3cgc3BlYyBhbmQgbG93ZXJjYXNlIG5vZGVOYW1lIGZvciBodG1sXG4gICAgdGhpcy5ub2RlTmFtZSA9IG5zID09PSBodG1sID8gbmFtZS50b0xvd2VyQ2FzZSgpIDogbmFtZVxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLkFUVFJJQlVURV9OT0RFXG4gICAgdGhpcy5vd25lckVsZW1lbnQgPSBudWxsXG4gIH1cblxuICBnZXQgdmFsdWUgKCkge1xuICAgIHJldHVybiB0aGlzLm5vZGVWYWx1ZVxuICB9XG5cbiAgc2V0IHZhbHVlICh2YWwpIHtcbiAgICB0aGlzLm5vZGVWYWx1ZSA9IHZhbFxuICB9XG5cbiAgZ2V0IG5hbWUgKCkge1xuICAgIHJldHVybiB0aGlzLm5vZGVOYW1lXG4gIH1cbn1cbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXG5pbXBvcnQgeyBtaXhpbiB9IGZyb20gJy4uL3V0aWxzL29iamVjdENyZWF0aW9uVXRpbHMuanMnXG5pbXBvcnQgeyBOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGUgfSBmcm9tICcuL21peGlucy9Ob25Eb2N1bWVudFR5cGVDaGlsZE5vZGUuanMnXG5pbXBvcnQgeyBDaGlsZE5vZGUgfSBmcm9tICcuL21peGlucy9DaGlsZE5vZGUuanMnXG5cbmV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJEYXRhIGV4dGVuZHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcykge1xuICAgIHN1cGVyKG5hbWUsIHByb3BzKVxuXG4gICAgdGhpcy5kYXRhID0gdGhpcy5ub2RlVmFsdWVcbiAgfVxuXG4gIGFwcGVuZERhdGEgKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgKz0gZGF0YVxuICB9XG5cbiAgZGVsZXRlRGF0YSAob2Zmc2V0LCBjb3VudCkge1xuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5zbGljZSgwLCBvZmZzZXQpICsgdGhpcy5kYXRhLnNsaWNlKDAsIG9mZnNldCArIGNvdW50KVxuICB9XG5cbiAgaW5zZXJ0RGF0YSAob2Zmc2V0LCBkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLnNsaWNlKDAsIG9mZnNldCkgKyBkYXRhICsgdGhpcy5kYXRhLnNsaWNlKG9mZnNldClcbiAgfVxuXG4gIHJlcGxhY2VEYXRhIChvZmZzZXQsIGNvdW50LCBkYXRhKSB7XG4gICAgdGhpcy5kZWxldGVEYXRhKG9mZnNldCwgY291bnQpXG4gICAgdGhpcy5pbnNlcnREYXRhKG9mZnNldCwgZGF0YSlcbiAgfVxuXG4gIHN1YnN0cmluZ0RhdGEgKG9mZnNldCwgY291bnQpIHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuc3Vic3RyKG9mZnNldCwgY291bnQpXG4gIH1cblxuICBnZXQgbGVuZ3RoICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aFxuICB9XG59XG5cbm1peGluKE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZSwgQ2hhcmFjdGVyRGF0YSlcbm1peGluKENoaWxkTm9kZSwgQ2hhcmFjdGVyRGF0YSlcbiIsImltcG9ydCB7IENoYXJhY3RlckRhdGEgfSBmcm9tICcuL0NoYXJhY3RlckRhdGEuanMnXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJ1xuZXhwb3J0IGNsYXNzIENvbW1lbnQgZXh0ZW5kcyBDaGFyYWN0ZXJEYXRhIHtcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzKSB7XG4gICAgc3VwZXIobmFtZSwgcHJvcHMpXG4gICAgdGhpcy5ub2RlVHlwZSA9IE5vZGUuQ09NTUVOVF9OT0RFXG4gIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9FdmVudC5qcydcbmV4cG9ydCBjbGFzcyBDdXN0b21FdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzID0ge30pIHtcbiAgICBzdXBlcihuYW1lKVxuICAgIHRoaXMuZGV0YWlsID0gcHJvcHMuZGV0YWlsIHx8IG51bGxcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBwcm9wcy5jYW5jZWxhYmxlIHx8IGZhbHNlXG4gIH1cbn1cbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXG5pbXBvcnQgeyBDb21tZW50IH0gZnJvbSAnLi9Db21tZW50LmpzJ1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vVGV4dC5qcydcbmltcG9ydCB7IEF0dHIgfSBmcm9tICcuL0F0dHIuanMnXG5pbXBvcnQgeyBEb2N1bWVudEZyYWdtZW50IH0gZnJvbSAnLi9Eb2N1bWVudEZyYWdtZW50LmpzJ1xuaW1wb3J0IHsgSFRNTExpbmtFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxMaW5rRWxlbWVudC5qcydcbmltcG9ydCB7IEhUTUxTY3JpcHRFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzJ1xuaW1wb3J0IHsgSFRNTEltYWdlRWxlbWVudCB9IGZyb20gJy4vaHRtbC9IVE1MSW1hZ2VFbGVtZW50LmpzJ1xuaW1wb3J0IHsgSFRNTEVsZW1lbnQgfSBmcm9tICcuL2h0bWwvSFRNTEVsZW1lbnQuanMnXG5pbXBvcnQgeyBlbGVtZW50QWNjZXNzIH0gZnJvbSAnLi9taXhpbnMvZWxlbWVudEFjY2Vzcy5qcydcbmltcG9ydCB7IG1peGluIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcbmltcG9ydCB7IFNWR1NWR0VsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdTVkdFbGVtZW50LmpzJ1xuaW1wb3J0IHsgU1ZHUGF0aEVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdQYXRoRWxlbWVudC5qcydcbmltcG9ydCB7IFNWR1RleHRDb250ZW50RWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR1RleHRDb250ZW50RWxlbWVudC5qcydcbmltcG9ydCB7IFNWR0dyYXBoaWNzRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcbmltcG9ydCB7IFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9QYXJlbnROb2RlLmpzJ1xuaW1wb3J0IHsgc3ZnLCBodG1sIH0gZnJvbSAnLi4vdXRpbHMvbmFtZXNwYWNlcy5qcydcbmltcG9ydCB7IERvY3VtZW50VHlwZSB9IGZyb20gJy4vRG9jdW1lbnRUeXBlLmpzJ1xuaW1wb3J0IHsgTm9uRWxlbWVudFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9Ob25FbGVtZW50UGFyZW50Tm9kZS5qcydcbmltcG9ydCB7IFNWR1JlY3RFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHUmVjdEVsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdDaXJjbGVFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHQ2lyY2xlRWxlbWVudC5qcydcbmltcG9ydCB7IFNWR0xpbmVFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHTGluZUVsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdFbGxpcHNlRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR0VsbGlwc2VFbGVtZW50LmpzJ1xuaW1wb3J0IHsgU1ZHRm9yZWlnbk9iamVjdEVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdGb3JlaWduT2JqZWN0RWxlbWVudC5qcydcbmltcG9ydCB7IFNWR0ltYWdlRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR0ltYWdlRWxlbWVudC5qcydcblxuZnVuY3Rpb24gZ2V0Q2hpbGRCeVRhZ05hbWUgKHBhcmVudCwgbmFtZSkge1xuICBmb3IgKGxldCBjaGlsZCA9IHBhcmVudC5maXJzdENoaWxkOyBjaGlsZCAhPSBudWxsOyBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nKSB7XG4gICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBjaGlsZC5ub2RlTmFtZSA9PT0gbmFtZSkge1xuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsXG59XG5cbmNvbnN0IGdldFNWR0VsZW1lbnRGb3JOYW1lID0gKG5hbWUpID0+IHtcbiAgc3dpdGNoIChuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgY2FzZSAnc3ZnJzpcbiAgICByZXR1cm4gU1ZHU1ZHRWxlbWVudFxuICBjYXNlICdwYXRoJzpcbiAgICByZXR1cm4gU1ZHUGF0aEVsZW1lbnRcbiAgY2FzZSAnY2lyY2xlJzpcbiAgICByZXR1cm4gU1ZHQ2lyY2xlRWxlbWVudFxuICBjYXNlICdlbGxpcHNlJzpcbiAgICByZXR1cm4gU1ZHRWxsaXBzZUVsZW1lbnRcbiAgY2FzZSAnbGluZSc6XG4gICAgcmV0dXJuIFNWR0xpbmVFbGVtZW50XG4gIGNhc2UgJ3JlY3QnOlxuICAgIHJldHVybiBTVkdSZWN0RWxlbWVudFxuICBjYXNlICdmb3JlaWduT2JqZWN0JzpcbiAgICByZXR1cm4gU1ZHRm9yZWlnbk9iamVjdEVsZW1lbnRcbiAgY2FzZSAnaW1hZ2UnOlxuICAgIHJldHVybiBTVkdJbWFnZUVsZW1lbnRcbiAgY2FzZSAndGV4dCc6XG4gIGNhc2UgJ3RzcGFuJzpcbiAgY2FzZSAndHJlZic6XG4gIGNhc2UgJ2FsdGdseXBoJzpcbiAgY2FzZSAndGV4dHBhdGgnOlxuICAgIHJldHVybiBTVkdUZXh0Q29udGVudEVsZW1lbnRcbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gU1ZHR3JhcGhpY3NFbGVtZW50XG4gIH1cbn1cblxuY29uc3QgZ2V0SFRNTEVsZW1lbnRGb3JOYW1lID0gKG5hbWUpID0+IHtcbiAgc3dpdGNoIChuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgY2FzZSAnaW1nJzpcbiAgICByZXR1cm4gSFRNTEltYWdlRWxlbWVudFxuICBjYXNlICdsaW5rJzpcbiAgICByZXR1cm4gSFRNTExpbmtFbGVtZW50XG4gIGNhc2UgJ3NjcmlwdCc6XG4gICAgcmV0dXJuIEhUTUxTY3JpcHRFbGVtZW50XG4gIGRlZmF1bHQ6XG4gICAgcmV0dXJuIEhUTUxFbGVtZW50XG4gIH1cbn1cblxuY29uc3QgZ2V0RWxlbWVudEZvck5hbWVzcGFjZSA9IChucywgbmFtZSkgPT4ge1xuICBzd2l0Y2ggKG5zKSB7XG4gIGNhc2Ugc3ZnOlxuICAgIHJldHVybiBnZXRTVkdFbGVtZW50Rm9yTmFtZShuYW1lKVxuICBjYXNlIGh0bWw6XG4gIGNhc2UgbnVsbDpcbiAgY2FzZSAnJzpcbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gZ2V0SFRNTEVsZW1lbnRGb3JOYW1lKG5hbWUpXG4gIH1cbn1cblxuLy8gRmVhdHVyZS92ZXJzaW9uIHBhaXJzIHRoYXQgRE9NSW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZSgpIHJldHVybnMgdHJ1ZSBmb3IuICBJdCByZXR1cm5zIGZhbHNlIGZvciBhbnl0aGluZyBlbHNlLlxuY29uc3Qgc3VwcG9ydGVkRmVhdHVyZXMgPSB7XG4gIHhtbDogeyAnJzogdHJ1ZSwgJzEuMCc6IHRydWUsICcyLjAnOiB0cnVlIH0sXG4gIGNvcmU6IHsgJyc6IHRydWUsICcyLjAnOiB0cnVlIH0sXG4gIGh0bWw6IHsgJyc6IHRydWUsICcxLjAnOiB0cnVlLCAnMi4wJzogdHJ1ZSB9LFxuICB4aHRtbDogeyAnJzogdHJ1ZSwgJzEuMCc6IHRydWUsICcyLjAnOiB0cnVlIH0gLy8gSFRNTFxufVxuXG5leHBvcnQgY29uc3QgRE9NSW1wbGVtZW50YXRpb24gPSB7XG4gIGhhc0ZlYXR1cmUgKGZlYXR1cmUsIHZlcnNpb24pIHtcbiAgICBjb25zdCBmID0gc3VwcG9ydGVkRmVhdHVyZXNbKGZlYXR1cmUgfHwgJycpLnRvTG93ZXJDYXNlKCldXG4gICAgcmV0dXJuIChmICYmIGZbdmVyc2lvbiB8fCAnJ10pIHx8IGZhbHNlXG4gIH0sXG5cbiAgY3JlYXRlRG9jdW1lbnRUeXBlIChxdWFsaWZpZWROYW1lLCBwdWJsaWNJZCwgc3lzdGVtSWQpIHtcbiAgICByZXR1cm4gbmV3IERvY3VtZW50VHlwZShxdWFsaWZpZWROYW1lLCB7IHB1YmxpY0lkLCBzeXN0ZW1JZCwgb3duZXJEb2N1bWVudDogdGhpcyB9KVxuICB9LFxuXG4gIGNyZWF0ZURvY3VtZW50IChuYW1lc3BhY2UsIHF1YWxpZmllZE5hbWUsIGRvY3R5cGUpIHtcbiAgICBjb25zdCBkb2MgPSBuZXcgRG9jdW1lbnQobmFtZXNwYWNlKVxuICAgIGlmIChkb2N0eXBlKSB7XG4gICAgICBpZiAoZG9jdHlwZS5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndGhlIG9iamVjdCBpcyBpbiB0aGUgd3JvbmcgRG9jdW1lbnQsIGEgY2FsbCB0byBpbXBvcnROb2RlIGlzIHJlcXVpcmVkJylcbiAgICAgIH1cbiAgICAgIGRvY3R5cGUub3duZXJEb2N1bWVudCA9IGRvY1xuICAgICAgZG9jLmFwcGVuZENoaWxkKGRvY3R5cGUpXG4gICAgfVxuICAgIGlmIChxdWFsaWZpZWROYW1lKSB7XG4gICAgICBkb2MuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2UsIHF1YWxpZmllZE5hbWUpKVxuICAgIH1cbiAgICByZXR1cm4gZG9jXG4gIH0sXG5cbiAgY3JlYXRlSFRNTERvY3VtZW50ICh0aXRsZVRleHQgPSAnJykge1xuICAgIGNvbnN0IGQgPSBuZXcgRG9jdW1lbnQoaHRtbClcbiAgICBjb25zdCByb290ID0gZC5jcmVhdGVFbGVtZW50KCdodG1sJylcbiAgICBjb25zdCBoZWFkID0gZC5jcmVhdGVFbGVtZW50KCdoZWFkJylcbiAgICBjb25zdCB0aXRsZSA9IGQuY3JlYXRlRWxlbWVudCgndGl0bGUnKVxuICAgIHRpdGxlLmFwcGVuZENoaWxkKGQuY3JlYXRlVGV4dE5vZGUodGl0bGVUZXh0KSlcbiAgICBoZWFkLmFwcGVuZENoaWxkKHRpdGxlKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQoaGVhZClcbiAgICByb290LmFwcGVuZENoaWxkKGQuY3JlYXRlRWxlbWVudCgnYm9keScpKVxuXG4gICAgZC5hcHBlbmRDaGlsZChyb290KVxuICAgIHJldHVybiBkXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yIChucykge1xuICAgIHN1cGVyKCcjZG9jdW1lbnQnLCB7fSwgbnMpXG4gICAgdGhpcy5ub2RlVHlwZSA9IE5vZGUuRE9DVU1FTlRfTk9ERVxuICAgIHRoaXMuaW1wbGVtZW50YXRpb24gPSBET01JbXBsZW1lbnRhdGlvblxuICAgIHRoaXMuZGVmYXVsdFZpZXcgPSBudWxsXG4gIH1cblxuICAvLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2RvbS1kb2N1bWVudC1jcmVhdGVhdHRyaWJ1dGVcbiAgY3JlYXRlQXR0cmlidXRlIChsb2NhbE5hbWUpIHtcbiAgICBpZiAodGhpcy5uYW1lc3BhY2VVUkkgPT09IGh0bWwpIHtcbiAgICAgIGxvY2FsTmFtZSA9IGxvY2FsTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNyZWF0ZUF0dHJpYnV0ZU5TKG51bGwsIGxvY2FsTmFtZSwgdHJ1ZSlcbiAgfVxuXG4gIGNyZWF0ZUF0dHJpYnV0ZU5TIChucywgcXVhbGlmaWVkTmFtZSwgbG9jYWwgPSBmYWxzZSkge1xuICAgIHJldHVybiBuZXcgQXR0cihxdWFsaWZpZWROYW1lLCB7IG93bmVyRG9jdW1lbnQ6IHRoaXMsIGxvY2FsIH0sIG5zKVxuICB9XG5cbiAgY3JlYXRlQ29tbWVudCAodGV4dCkge1xuICAgIHJldHVybiBuZXcgQ29tbWVudCgnI2NvbW1lbnQnLCB7IG5vZGVWYWx1ZTogdGV4dCwgb3duZXJEb2N1bWVudDogdGhpcyB9KVxuICB9XG5cbiAgY3JlYXRlRG9jdW1lbnRGcmFnbWVudCAobmFtZSkge1xuICAgIHJldHVybiBuZXcgRG9jdW1lbnRGcmFnbWVudCgnI2RvY3VtZW50LWZyYWdtZW50JywgeyBvd25lckRvY3VtZW50OiB0aGlzIH0pXG4gIH1cblxuICBjcmVhdGVFbGVtZW50IChsb2NhbE5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVFbGVtZW50TlModGhpcy5uYW1lc3BhY2VVUkksIGxvY2FsTmFtZSwgdHJ1ZSlcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnROUyAobnMsIHF1YWxpZmllZE5hbWUsIGxvY2FsID0gZmFsc2UpIHtcbiAgICBjb25zdCBFbGVtZW50ID0gZ2V0RWxlbWVudEZvck5hbWVzcGFjZShucywgcXVhbGlmaWVkTmFtZSlcblxuICAgIHJldHVybiBuZXcgRWxlbWVudChxdWFsaWZpZWROYW1lLCB7XG4gICAgICBvd25lckRvY3VtZW50OiB0aGlzLFxuICAgICAgbG9jYWxcbiAgICB9LCBucylcbiAgfVxuXG4gIGNyZWF0ZVRleHROb2RlICh0ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBUZXh0KCcjdGV4dCcsIHsgbm9kZVZhbHVlOiB0ZXh0LCBvd25lckRvY3VtZW50OiB0aGlzIH0pXG4gIH1cblxuICBnZXQgY29tcGF0TW9kZSAoKSB7XG4gICAgcmV0dXJuICdDU1MxQ29tcGF0JyAvLyBhbHdheXMgYmUgaW4gc3RhbmRhcmRzLW1vZGVcbiAgfVxuXG4gIGdldCBib2R5ICgpIHtcbiAgICByZXR1cm4gZ2V0Q2hpbGRCeVRhZ05hbWUodGhpcy5kb2N1bWVudEVsZW1lbnQsICdCT0RZJylcbiAgfVxuXG4gIGdldCBoZWFkICgpIHtcbiAgICByZXR1cm4gZ2V0Q2hpbGRCeVRhZ05hbWUodGhpcy5kb2N1bWVudEVsZW1lbnQsICdIRUFEJylcbiAgfVxuXG4gIGdldCBkb2N1bWVudEVsZW1lbnQgKCkge1xuICAgIHJldHVybiB0aGlzLmxhc3RDaGlsZFxuICB9XG59XG5cbm1peGluKGVsZW1lbnRBY2Nlc3MsIERvY3VtZW50KVxubWl4aW4oUGFyZW50Tm9kZSwgRG9jdW1lbnQpXG5taXhpbihOb25FbGVtZW50UGFyZW50Tm9kZSwgRG9jdW1lbnQpXG4iLCJpbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJ1xuaW1wb3J0IHsgbWl4aW4gfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xuaW1wb3J0IHsgZWxlbWVudEFjY2VzcyB9IGZyb20gJy4vbWl4aW5zL2VsZW1lbnRBY2Nlc3MuanMnXG5pbXBvcnQgeyBQYXJlbnROb2RlIH0gZnJvbSAnLi9taXhpbnMvUGFyZW50Tm9kZS5qcydcbmltcG9ydCB7IE5vbkVsZW1lbnRQYXJlbnROb2RlIH0gZnJvbSAnLi9taXhpbnMvTm9uRWxlbWVudFBhcmVudE5vZGUuanMnXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRGcmFnbWVudCBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMpIHtcbiAgICBzdXBlcihuYW1lLCBwcm9wcylcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFXG4gIH1cbn1cblxubWl4aW4oZWxlbWVudEFjY2VzcywgRG9jdW1lbnRGcmFnbWVudClcbm1peGluKFBhcmVudE5vZGUsIERvY3VtZW50RnJhZ21lbnQpXG5taXhpbihOb25FbGVtZW50UGFyZW50Tm9kZSwgRG9jdW1lbnRGcmFnbWVudClcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXG5pbXBvcnQgeyBtaXhpbiB9IGZyb20gJy4uL3V0aWxzL29iamVjdENyZWF0aW9uVXRpbHMuanMnXG5pbXBvcnQgeyBDaGlsZE5vZGUgfSBmcm9tICcuL21peGlucy9DaGlsZE5vZGUuanMnXG5cbmV4cG9ydCBjbGFzcyBEb2N1bWVudFR5cGUgZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzKSB7XG4gICAgc3VwZXIobmFtZSwgcHJvcHMpXG5cbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5ET0NVTUVOVF9UWVBFX05PREVcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG5cbiAgICBjb25zdCB7IHB1YmxpY0lkLCBzeXN0ZW1JZCB9ID0gcHJvcHNcbiAgICB0aGlzLnB1YmxpY0lkID0gcHVibGljSWQgfHwgJydcbiAgICB0aGlzLnN5c3RlbUlkID0gc3lzdGVtSWQgfHwgJydcbiAgfVxufVxuXG5taXhpbihDaGlsZE5vZGUsIERvY3VtZW50VHlwZSlcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXG5cbmltcG9ydCB7IFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9QYXJlbnROb2RlLmpzJ1xuaW1wb3J0IHsgZWxlbWVudEFjY2VzcyB9IGZyb20gJy4vbWl4aW5zL2VsZW1lbnRBY2Nlc3MuanMnXG5pbXBvcnQgeyBIVE1MUGFyc2VyIH0gZnJvbSAnLi9odG1sL0hUTUxQYXJzZXIuanMnXG5pbXBvcnQgeyBEb2N1bWVudEZyYWdtZW50IH0gZnJvbSAnLi9Eb2N1bWVudEZyYWdtZW50LmpzJ1xuaW1wb3J0IHsgbWl4aW4gfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xuaW1wb3J0IHsgdGFnIH0gZnJvbSAnLi4vdXRpbHMvdGFnVXRpbHMuanMnXG5pbXBvcnQgeyBjc3NUb01hcCwgbWFwVG9Dc3MgfSBmcm9tICcuLi91dGlscy9tYXBVdGlscy5qcydcbmltcG9ydCB7IGhleFRvUkdCLCBkZWNhbWVsaXplLCBodG1sRW50aXRpZXMsIGNkYXRhLCBjb21tZW50IH0gZnJvbSAnLi4vdXRpbHMvc3RyVXRpbHMuanMnXG5pbXBvcnQgeyBOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGUgfSBmcm9tICcuL21peGlucy9Ob25Eb2N1bWVudFR5cGVDaGlsZE5vZGUuanMnXG5pbXBvcnQgeyBDaGlsZE5vZGUgfSBmcm9tICcuL21peGlucy9DaGlsZE5vZGUuanMnXG5pbXBvcnQgeyBodG1sLCB4bWwsIHhtbG5zIH0gZnJvbSAnLi4vdXRpbHMvbmFtZXNwYWNlcy5qcydcblxuY29uc3QgdmFsaWRhdGVBbmRFeHRyYWN0ID0gKG5zLCBuYW1lKSA9PiB7XG4gIGxldCBwcmVmaXggPSBudWxsXG4gIGxldCBsb2NhbG5hbWUgPSBuYW1lXG5cbiAgaWYgKCFucykgbnMgPSBudWxsXG5cbiAgaWYgKG5hbWUuaW5jbHVkZXMoJzonKSkge1xuICAgIFsgcHJlZml4LCBsb2NhbG5hbWUgXSA9IG5hbWUuc3BsaXQoJzonKVxuICB9XG5cbiAgaWYgKCFucyAmJiBwcmVmaXgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWVzcGFjZSBFcnJvcicpXG4gIH1cblxuICBpZiAocHJlZml4ID09PSAneG1sJyAmJiBucyAhPT0geG1sKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOYW1lc3BhY2UgRXJyb3InKVxuICB9XG5cbiAgaWYgKChwcmVmaXggPT09ICd4bWxucycgfHwgbmFtZSA9PT0gJ3htbG5zJykgJiYgbnMgIT09IHhtbG5zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOYW1lc3BhY2UgRXJyb3InKVxuICB9XG5cbiAgaWYgKHByZWZpeCAhPT0gJ3htbG5zJyAmJiBuYW1lICE9PSAneG1sbnMnICYmIG5zID09PSB4bWxucykge1xuICAgIHRocm93IG5ldyBFcnJvcignTmFtZXNwYWNlIEVycm9yJylcbiAgfVxuXG4gIHJldHVybiBbIG5zLCBwcmVmaXgsIGxvY2FsbmFtZSBdXG59XG5cbmNvbnN0IGdldEF0dHJpYnV0ZUJ5TnNBbmRMb2NhbE5hbWUgPSAoZWwsIG5zLCBsb2NhbE5hbWUpID0+IHtcbiAgaWYgKCFucykgbnMgPSBudWxsXG4gIHJldHVybiBbIC4uLmVsLmF0dHJzIF0uZmluZCgobm9kZSkgPT4gbm9kZS5sb2NhbE5hbWUgPT09IGxvY2FsTmFtZSAmJiBub2RlLm5hbWVzcGFjZVVSSSA9PT0gbnMpXG59XG5cbmNvbnN0IGdldEF0dHJpYnV0ZUJ5UXVhbGlmaWVkTmFtZSA9IChlbCwgcXVhbGlmaWVkTmFtZSkgPT4ge1xuICBpZiAoZWwubmFtZXNwYWNlVVJJID09PSBodG1sICYmIGVsLm93bmVyRG9jdW1lbnQubmFtZXNwYWNlVVJJID09PSBodG1sKSB7XG4gICAgcXVhbGlmaWVkTmFtZSA9IHF1YWxpZmllZE5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgcmV0dXJuIFsgLi4uZWwuYXR0cnMgXS5maW5kKChub2RlKSA9PiBub2RlLm5hbWUgPT09IHF1YWxpZmllZE5hbWUpXG59XG5cbi8vIFRoaXMgUHJveHkgcHJveGllcyBhbGwgYWNjZXNzIHRvIG5vZGUuc3R5bGUgdG8gdGhlIGNzcyBzYXZlZCBpbiB0aGUgYXR0cmlidXRlXG5jb25zdCBnZXRTdHlsZVByb3h5ID0gKG5vZGUpID0+IHtcblxuICByZXR1cm4gbmV3IFByb3h5KG5vZGUsIHtcbiAgICBnZXQgKHRhcmdldCwga2V5KSB7XG4gICAgICBjb25zdCBzdHlsZXMgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdzdHlsZScpIHx8ICcnXG4gICAgICBjb25zdCBzdHlsZU1hcCA9IGNzc1RvTWFwKHN0eWxlcylcblxuICAgICAgaWYgKGtleSA9PT0gJ2Nzc1RleHQnKSB7XG4gICAgICAgIHJldHVybiBzdHlsZXNcbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PT0gJ3NldFByb3BlcnR5Jykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSwgdmFsdWUgPSAnJywgcHJpb3JpdHkgPSAnJykge1xuICAgICAgICAgIG5vZGUuc3R5bGVbcHJvcGVydHlOYW1lXSA9IHZhbHVlICsgKHByaW9yaXR5ID8gYCAhJHtwcmlvcml0eX1gIDogJycpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAga2V5ID0gZGVjYW1lbGl6ZShrZXkpXG4gICAgICBpZiAoIXN0eWxlTWFwLmhhcyhrZXkpKSByZXR1cm4gJydcblxuICAgICAgcmV0dXJuIHN0eWxlTWFwLmdldChrZXkpXG4gICAgfSxcbiAgICBzZXQgKHRhcmdldCwga2V5LCB2YWx1ZSkge1xuICAgICAga2V5ID0gZGVjYW1lbGl6ZShrZXkpXG5cbiAgICAgIGlmIChrZXkgPT09ICdjc3MtdGV4dCcpIHtcbiAgICAgICAgLy8gZW5zdXJlIGNvcnJlY3Qgc3BhY2luZyBhbmQgc3ludGF4IGJ5IGNvbnZlcnRpbmcgYmFjayBhbmQgZm9ydGhcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBtYXBUb0Nzcyhjc3NUb01hcCh2YWx1ZSkpKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBoZXhUb1JHQih2YWx1ZS50b1N0cmluZygpKVxuICAgICAgICBjb25zdCBzdHlsZXMgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdzdHlsZScpIHx8ICcnXG4gICAgICAgIGNvbnN0IHN0eWxlTWFwID0gY3NzVG9NYXAoc3R5bGVzKVxuICAgICAgICBzdHlsZU1hcC5zZXQoa2V5LCB2YWx1ZSlcblxuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdzdHlsZScsIG1hcFRvQ3NzKHN0eWxlTWFwKSlcblxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cblxuLy8gaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNkb20tZWxlbWVudC1zZXRhdHRyaWJ1dGVuc1xuZXhwb3J0IGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzLCBucykge1xuICAgIHN1cGVyKG5hbWUsIHByb3BzLCBucylcblxuICAgIHRoaXMuc3R5bGUgPSBnZXRTdHlsZVByb3h5KHRoaXMpXG4gICAgdGhpcy50YWdOYW1lID0gdGhpcy5ub2RlTmFtZVxuICB9XG5cbiAgZ2V0QXR0cmlidXRlIChxdWFsaWZpZWROYW1lKSB7XG4gICAgY29uc3QgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZShxdWFsaWZpZWROYW1lKVxuICAgIHJldHVybiBhdHRyID8gYXR0ci52YWx1ZSA6IG51bGxcbiAgfVxuXG4gIGdldEF0dHJpYnV0ZU5vZGUgKHF1YWxpZmllZE5hbWUpIHtcbiAgICByZXR1cm4gZ2V0QXR0cmlidXRlQnlRdWFsaWZpZWROYW1lKHRoaXMsIHF1YWxpZmllZE5hbWUpXG4gIH1cblxuICBnZXRBdHRyaWJ1dGVOb2RlTlMgKG5zLCBsb2NhbE5hbWUpIHtcbiAgICByZXR1cm4gZ2V0QXR0cmlidXRlQnlOc0FuZExvY2FsTmFtZSh0aGlzLCBucywgbG9jYWxOYW1lKVxuICB9XG5cbiAgZ2V0QXR0cmlidXRlTlMgKG5zLCBsb2NhbE5hbWUpIHtcbiAgICBjb25zdCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlTlMobnMsIGxvY2FsTmFtZSlcbiAgICByZXR1cm4gYXR0ciA/IGF0dHIudmFsdWUgOiBudWxsXG4gIH1cblxuICBnZXRCb3VuZGluZ0NsaWVudFJlY3QgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignT25seSBpbXBsZW1lbnRlZCBmb3IgU1ZHIEVsZW1lbnRzJylcbiAgfVxuXG4gIGhhc0F0dHJpYnV0ZSAocXVhbGlmaWVkTmFtZSkge1xuICAgIGNvbnN0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGUocXVhbGlmaWVkTmFtZSlcbiAgICByZXR1cm4gISFhdHRyXG4gIH1cblxuICBoYXNBdHRyaWJ1dGVOUyAobnMsIGxvY2FsTmFtZSkge1xuICAgIGNvbnN0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGVOUyhucywgbG9jYWxOYW1lKVxuICAgIHJldHVybiAhIWF0dHJcbiAgfVxuXG4gIG1hdGNoZXMgKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hXaXRoU2NvcGUocXVlcnksIHRoaXMpXG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGUgKHF1YWxpZmllZE5hbWUpIHtcbiAgICBjb25zdCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlKHF1YWxpZmllZE5hbWUpXG4gICAgaWYgKGF0dHIpIHtcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTm9kZShhdHRyKVxuICAgIH1cbiAgICByZXR1cm4gYXR0clxuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlTm9kZSAobm9kZSkge1xuICAgIGlmICghdGhpcy5hdHRycy5kZWxldGUobm9kZSkpIHRocm93IG5ldyBFcnJvcignQXR0cmlidXRlIGNhbm5vdCBiZSByZW1vdmVkIGJlY2F1c2UgaXQgd2FzIG5vdCBmb3VuZCBvbiB0aGUgZWxlbWVudCcpXG4gICAgcmV0dXJuIG5vZGVcbiAgfVxuXG4gIC8vIGNhbGwgaXM6IGQucmVtb3ZlQXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cubW96aWxsYS5vcmcvbnMvc3BlY2lhbHNwYWNlJywgJ2FsaWduJywgJ2NlbnRlcicpO1xuICByZW1vdmVBdHRyaWJ1dGVOUyAobnMsIGxvY2FsTmFtZSkge1xuICAgIGNvbnN0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGVOUyhucywgbG9jYWxOYW1lKVxuICAgIGlmIChhdHRyKSB7XG4gICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5vZGUoYXR0cilcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJcbiAgfVxuXG4gIC8qIFRoZSBzZXRBdHRyaWJ1dGUocXVhbGlmaWVkTmFtZSwgdmFsdWUpIG1ldGhvZCwgd2hlbiBpbnZva2VkLCBtdXN0IHJ1biB0aGVzZSBzdGVwczpcblxuICAgIElmIHF1YWxpZmllZE5hbWUgZG9lcyBub3QgbWF0Y2ggdGhlIE5hbWUgcHJvZHVjdGlvbiBpbiBYTUwsIHRoZW4gdGhyb3cgYW4gXCJJbnZhbGlkQ2hhcmFjdGVyRXJyb3JcIiBET01FeGNlcHRpb24uXG5cbiAgICBJZiB0aGlzIGlzIGluIHRoZSBIVE1MIG5hbWVzcGFjZSBhbmQgaXRzIG5vZGUgZG9jdW1lbnQgaXMgYW4gSFRNTCBkb2N1bWVudCwgdGhlbiBzZXQgcXVhbGlmaWVkTmFtZSB0byBxdWFsaWZpZWROYW1lIGluIEFTQ0lJIGxvd2VyY2FzZS5cblxuICAgIExldCBhdHRyaWJ1dGUgYmUgdGhlIGZpcnN0IGF0dHJpYnV0ZSBpbiB0aGlz4oCZcyBhdHRyaWJ1dGUgbGlzdCB3aG9zZSBxdWFsaWZpZWQgbmFtZSBpcyBxdWFsaWZpZWROYW1lLCBhbmQgbnVsbCBvdGhlcndpc2UuXG5cbiAgICBJZiBhdHRyaWJ1dGUgaXMgbnVsbCwgY3JlYXRlIGFuIGF0dHJpYnV0ZSB3aG9zZSBsb2NhbCBuYW1lIGlzIHF1YWxpZmllZE5hbWUsIHZhbHVlIGlzIHZhbHVlLCBhbmQgbm9kZSBkb2N1bWVudCBpcyB0aGlz4oCZcyBub2RlIGRvY3VtZW50LCB0aGVuIGFwcGVuZCB0aGlzIGF0dHJpYnV0ZSB0byB0aGlzLCBhbmQgdGhlbiByZXR1cm4uXG5cbiAgICBDaGFuZ2UgYXR0cmlidXRlIHRvIHZhbHVlLlxuICAqL1xuICBzZXRBdHRyaWJ1dGUgKHF1YWxpZmllZE5hbWUsIHZhbHVlKSB7XG4gICAgLy8gV2UgaGF2ZSB0byBkbyB0aGF0IGhlcmUgYmVjYXVzZSB3ZSBjYW5ub3QgY2hlY2sgaWYgYHRoaXNgIGlzIGluIHRoZSBjb3JyZWN0IG5hbWVzcGFjZVxuICAgIC8vIHdoZW4gZG9pbmcgaXQgaW4gY3JlYXRlQXR0cmlidXRlXG4gICAgaWYgKHRoaXMubmFtZXNwYWNlVVJJID09PSBodG1sICYmIHRoaXMub3duZXJEb2N1bWVudC5uYW1lc3BhY2VVUkkgPT09IGh0bWwpIHtcbiAgICAgIHF1YWxpZmllZE5hbWUgPSBxdWFsaWZpZWROYW1lLnRvTG93ZXJDYXNlKClcbiAgICB9XG5cbiAgICBsZXQgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZShxdWFsaWZpZWROYW1lKVxuICAgIGlmICghYXR0cikge1xuICAgICAgLy8gQmVjYXVzZSBjcmVhdGVBdHRyaWJ1dGUgbG93ZXJjYXNlcyB0aGUgYXR0cmlidXRlIGluIGFuIGh0bWwgZG9jIHdlIGhhdmUgdG8gdXNlIGNyZWF0ZUF0dHJpYnV0ZU5TXG4gICAgICBhdHRyID0gdGhpcy5vd25lckRvY3VtZW50LmNyZWF0ZUF0dHJpYnV0ZU5TKG51bGwsIHF1YWxpZmllZE5hbWUsIHRydWUpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZU5vZGUoYXR0cilcbiAgICB9XG5cbiAgICBhdHRyLnZhbHVlID0gdmFsdWVcbiAgfVxuXG4gIC8qXG4gICAgTGV0IG5hbWVzcGFjZSwgcHJlZml4LCBhbmQgbG9jYWxOYW1lIGJlIHRoZSByZXN1bHQgb2YgcGFzc2luZyBuYW1lc3BhY2UgYW5kIHF1YWxpZmllZE5hbWUgdG8gdmFsaWRhdGUgYW5kIGV4dHJhY3QuXG5cbiAgICBTZXQgYW4gYXR0cmlidXRlIHZhbHVlIGZvciB0aGlzIHVzaW5nIGxvY2FsTmFtZSwgdmFsdWUsIGFuZCBhbHNvIHByZWZpeCBhbmQgbmFtZXNwYWNlLlxuXG4gICAgSWYgcHJlZml4IGlzIG5vdCBnaXZlbiwgc2V0IGl0IHRvIG51bGwuXG4gICAgSWYgbmFtZXNwYWNlIGlzIG5vdCBnaXZlbiwgc2V0IGl0IHRvIG51bGwuXG4gICAgTGV0IGF0dHJpYnV0ZSBiZSB0aGUgcmVzdWx0IG9mIGdldHRpbmcgYW4gYXR0cmlidXRlIGdpdmVuIG5hbWVzcGFjZSwgbG9jYWxOYW1lLCBhbmQgZWxlbWVudC5cbiAgICBJZiBhdHRyaWJ1dGUgaXMgbnVsbCwgY3JlYXRlIGFuIGF0dHJpYnV0ZSB3aG9zZSBuYW1lc3BhY2UgaXMgbmFtZXNwYWNlLCBuYW1lc3BhY2UgcHJlZml4IGlzIHByZWZpeCwgbG9jYWwgbmFtZSBpcyBsb2NhbE5hbWUsIHZhbHVlIGlzIHZhbHVlLCBhbmQgbm9kZSBkb2N1bWVudCBpcyBlbGVtZW504oCZcyBub2RlIGRvY3VtZW50LCB0aGVuIGFwcGVuZCB0aGlzIGF0dHJpYnV0ZSB0byBlbGVtZW50LCBhbmQgdGhlbiByZXR1cm4uXG5cbiAgICBDaGFuZ2UgYXR0cmlidXRlIHRvIHZhbHVlLlxuICAqL1xuXG4gIHNldEF0dHJpYnV0ZU5vZGUgKG5vZGUpIHtcbiAgICB0aGlzLmF0dHJzLmFkZChub2RlKVxuICAgIG5vZGUub3duZXJFbGVtZW50ID0gdGhpc1xuICB9XG5cbiAgLy8gY2FsbCBpczogZC5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy5tb3ppbGxhLm9yZy9ucy9zcGVjaWFsc3BhY2UnLCAnc3BlYzphbGlnbicsICdjZW50ZXInKTtcbiAgc2V0QXR0cmlidXRlTlMgKG5hbWVzcGFjZSwgbmFtZSwgdmFsdWUpIHtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIGNvbnN0IFsgbnMsIHByZWZpeCwgbG9jYWxOYW1lIF0gPSB2YWxpZGF0ZUFuZEV4dHJhY3QobmFtZXNwYWNlLCBuYW1lKVxuXG4gICAgbGV0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGVOUyhucywgbG9jYWxOYW1lKVxuICAgIGlmICghYXR0cikge1xuICAgICAgYXR0ciA9IHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVBdHRyaWJ1dGVOUyhucywgbmFtZSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlTm9kZShhdHRyKSAvLyBzZXRBdHRyaWJ1dGVOb2RlTlMgaXMgYSBzeW5vbnltIG9mIHNldEF0dHJpYnV0ZU5vZGVcbiAgICB9XG5cbiAgICBhdHRyLnZhbHVlID0gdmFsdWVcblxuICAgIHRoaXMuYXR0cnMuYWRkKGF0dHIpXG4gIH1cblxuICBnZXQgYXR0cmlidXRlcyAoKSB7XG4gICAgcmV0dXJuIFsgLi4udGhpcy5hdHRycyBdXG4gIH1cblxuICBnZXQgY2xhc3NOYW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NsYXNzJylcbiAgfVxuXG4gIHNldCBjbGFzc05hbWUgKGMpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjKVxuICB9XG5cbiAgZ2V0IGlkICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgJydcbiAgfVxuXG4gIHNldCBpZCAoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpXG4gIH1cblxuICBnZXQgaW5uZXJIVE1MICgpIHtcblxuICAgIHJldHVybiB0aGlzLmNoaWxkTm9kZXMubWFwKG5vZGUgPT4ge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSByZXR1cm4gaHRtbEVudGl0aWVzKG5vZGUuZGF0YSlcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkNEQVRBX1NFQ1RJT05fTk9ERSkgcmV0dXJuIGNkYXRhKG5vZGUuZGF0YSlcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkNPTU1FTlRfTk9ERSkgcmV0dXJuIGNvbW1lbnQobm9kZS5kYXRhKVxuICAgICAgcmV0dXJuIG5vZGUub3V0ZXJIVE1MXG4gICAgfSkuam9pbignJylcbiAgfVxuXG4gIHNldCBpbm5lckhUTUwgKHN0cikge1xuICAgIHdoaWxlICh0aGlzLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5maXJzdENoaWxkKVxuICAgIH1cbiAgICAvLyBUaGUgcGFyc2VyIGFkZHMgdGhlIGh0bWwgdG8gdGhpc1xuICAgIEhUTUxQYXJzZXIoc3RyLCB0aGlzKVxuICB9XG5cbiAgZ2V0IG91dGVySFRNTCAoKSB7XG4gICAgcmV0dXJuIHRhZyh0aGlzKVxuICB9XG5cbiAgc2V0IG91dGVySFRNTCAoc3RyKSB7XG4gICAgdmFyIHdlbGwgPSBuZXcgRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgSFRNTFBhcnNlcihzdHIsIHdlbGwpXG4gICAgdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3ZWxsLCB0aGlzKVxuICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKVxuICB9XG5cbn1cblxubWl4aW4oUGFyZW50Tm9kZSwgRWxlbWVudClcbm1peGluKGVsZW1lbnRBY2Nlc3MsIEVsZW1lbnQpXG5taXhpbihOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGUsIEVsZW1lbnQpXG5taXhpbihDaGlsZE5vZGUsIEVsZW1lbnQpXG4iLCJleHBvcnQgY2xhc3MgRXZlbnQge1xuICBjb25zdHJ1Y3RvciAodHlwZSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGVcbiAgICB0aGlzLmNhbmNlbGFibGUgPSBmYWxzZVxuICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlXG4gICAgdGhpcy50YXJnZXQgPSBudWxsXG4gIH1cblxuICBwcmV2ZW50RGVmYXVsdCAoKSB7XG4gICAgaWYgKHRoaXMuY2FuY2VsYWJsZSkge1xuICAgICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuIiwiY29uc3QgJCA9IFN5bWJvbCgncHJpdmF0ZSBwcm9wZXJ0aWVzJylcblxuZXhwb3J0IGNsYXNzIEV2ZW50VGFyZ2V0IHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXNbJF0gPSB7fVxuICAgIHRoaXNbJF0ubGlzdGVuZXJzID0ge31cbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIgKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzWyRdLmxpc3RlbmVycykpIHtcbiAgICAgIHRoaXNbJF0ubGlzdGVuZXJzW3R5cGVdID0gW11cbiAgICB9XG4gICAgdGhpc1skXS5saXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjaylcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQgKGV2ZW50KSB7XG4gICAgaWYgKCEoZXZlbnQudHlwZSBpbiB0aGlzWyRdLmxpc3RlbmVycykpIHsgcmV0dXJuIHRydWUgfVxuXG4gICAgdmFyIHN0YWNrID0gdGhpc1skXS5saXN0ZW5lcnNbZXZlbnQudHlwZV1cbiAgICBldmVudC50YXJnZXQgPSB0aGlzXG5cbiAgICBzdGFjay5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgZWwoZXZlbnQpXG4gICAgfSlcblxuICAgIHJldHVybiAhZXZlbnQuZGVmYXVsdFByZXZlbnRlZFxuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciAodHlwZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXNbJF0ubGlzdGVuZXJzKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdmFyIHN0YWNrID0gdGhpc1skXS5saXN0ZW5lcnNbdHlwZV1cbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzdGFjay5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBpZiAoc3RhY2tbaV0gPT09IGNhbGxiYWNrKSB7XG4gICAgICAgIHN0YWNrLnNwbGljZShpLCAxKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgZXh0ZW5kLCBleHRlbmRTdGF0aWMgfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xuXG5pbXBvcnQgeyBFdmVudFRhcmdldCB9IGZyb20gJy4vRXZlbnRUYXJnZXQuanMnXG5pbXBvcnQgeyBjbG9uZU5vZGUgfSBmcm9tICcuLi91dGlscy90YWdVdGlscy5qcydcbmltcG9ydCB7IGh0bWwgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xuXG5jb25zdCBub2RlVHlwZXMgPSB7XG4gIEVMRU1FTlRfTk9ERTogMSxcbiAgQVRUUklCVVRFX05PREU6IDIsXG4gIFRFWFRfTk9ERTogMyxcbiAgQ0RBVEFfU0VDVElPTl9OT0RFOiA0LFxuICBFTlRJVFlfUkVGRVJFTkNFX05PREU6IDUsXG4gIEVOVElUWV9OT0RFOiA2LFxuICBQUk9DRVNTSU5HX0lOU1RSVUNUSU9OX05PREU6IDcsXG4gIENPTU1FTlRfTk9ERTogOCxcbiAgRE9DVU1FTlRfTk9ERTogOSxcbiAgRE9DVU1FTlRfVFlQRV9OT0RFOiAxMCxcbiAgRE9DVU1FTlRfRlJBR01FTlRfTk9ERTogMTEsXG4gIE5PVEFUSU9OX05PREU6IDEyXG59XG5cbmV4cG9ydCBjbGFzcyBOb2RlIGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuICBjb25zdHJ1Y3RvciAobmFtZSA9ICcnLCBwcm9wcyA9IHt9LCBucyA9IG51bGwpIHtcbiAgICBzdXBlcigpXG5cbiAgICAvLyBJZiBwcm9wcy5sb2NhbCBpcyB0cnVlLCB0aGUgZWxlbWVudCB3YXMgTm9kZSB3YXMgY3JlYXRlZCB3aXRoIHRoZSBub24tbmFtZXNwYWNlIGZ1bmN0aW9uXG4gICAgLy8gdGhhdCBtZWFucyB3aGF0ZXZlciB3YXMgcGFzc2VkIGFzIG5hbWUgaXMgdGhlIGxvY2FsIG5hbWUgZXZlbiB0aG91Z2ggaXQgbWlnaHQgbG9vayBsaWtlIGEgcHJlZml4XG4gICAgaWYgKG5hbWUuaW5jbHVkZXMoJzonKSAmJiAhcHJvcHMubG9jYWwpIHtcbiAgICAgIDtbIHRoaXMucHJlZml4LCB0aGlzLmxvY2FsTmFtZSBdID0gbmFtZS5zcGxpdCgnOicpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9jYWxOYW1lID0gbmFtZVxuICAgICAgdGhpcy5wcmVmaXggPSBudWxsXG4gICAgfVxuXG4gICAgLy8gRm9sbG93IHNwZWMgYW5kIHVwcGVyY2FzZSBub2RlTmFtZSBmb3IgaHRtbFxuICAgIHRoaXMubm9kZU5hbWUgPSBucyA9PT0gaHRtbCA/IG5hbWUudG9VcHBlckNhc2UoKSA6IG5hbWVcblxuICAgIHRoaXMubmFtZXNwYWNlVVJJID0gbnNcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5FTEVNRU5UX05PREVcbiAgICB0aGlzLm5vZGVWYWx1ZSA9IHByb3BzLm5vZGVWYWx1ZSAhPSBudWxsID8gcHJvcHMubm9kZVZhbHVlIDogbnVsbFxuICAgIHRoaXMuY2hpbGROb2RlcyA9IFtdXG5cbiAgICB0aGlzLmF0dHJzID0gcHJvcHMuYXR0cnMgfHwgbmV3IFNldCgpXG5cbiAgICB0aGlzLm93bmVyRG9jdW1lbnQgPSBwcm9wcy5vd25lckRvY3VtZW50IHx8IG51bGxcbiAgICB0aGlzLnBhcmVudE5vZGUgPSBudWxsXG5cbiAgICAvLyB0aGlzLm5hbWVzcGFjZXMgPSB7fVxuICAgIC8vIGlmICh0aGlzLnByZWZpeCkge1xuICAgIC8vICAgdGhpcy5uYW1lc3BhY2VzW3RoaXMucHJlZml4XSA9IG5zXG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHRoaXMubmFtZXNwYWNlcy5kZWZhdWx0ID0gbnNcbiAgICAvLyB9XG5cbiAgICBpZiAocHJvcHMuY2hpbGROb2Rlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGlsID0gcHJvcHMuY2hpbGROb2Rlcy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQocHJvcHMuY2hpbGROb2Rlc1tpXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhcHBlbmRDaGlsZCAobm9kZSkge1xuICAgIHJldHVybiB0aGlzLmluc2VydEJlZm9yZShub2RlKVxuICB9XG5cbiAgY2xvbmVOb2RlIChkZWVwID0gZmFsc2UpIHtcbiAgICBjb25zdCBjbG9uZSA9IGNsb25lTm9kZSh0aGlzKVxuXG4gICAgaWYgKGRlZXApIHtcbiAgICAgIHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBjb25zdCBub2RlID0gZWwuY2xvbmVOb2RlKGRlZXApXG4gICAgICAgIGNsb25lLmFwcGVuZENoaWxkKG5vZGUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBjbG9uZVxuICB9XG5cbiAgY29udGFpbnMgKG5vZGUpIHtcbiAgICBpZiAobm9kZSA9PT0gdGhpcykgcmV0dXJuIGZhbHNlXG5cbiAgICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gdGhpcykgcmV0dXJuIHRydWVcbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBnZXRSb290Tm9kZSAoKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudE5vZGUgfHwgdGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9OT0RFKSByZXR1cm4gdGhpc1xuICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGUuZ2V0Um9vdE5vZGUoKVxuICB9XG5cbiAgaGFzQ2hpbGROb2RlcyAoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5jaGlsZE5vZGVzLmxlbmd0aFxuICB9XG5cbiAgaW5zZXJ0QmVmb3JlIChub2RlLCBiZWZvcmUpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmNoaWxkTm9kZXMuaW5kZXhPZihiZWZvcmUpXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgaW5kZXggPSB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoXG4gICAgfVxuXG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSkge1xuICAgICAgbGV0IGNoaWxkXG4gICAgICBsZXQgb2xkQ2hpbGQgPSBiZWZvcmVcbiAgICAgIHdoaWxlICgoY2hpbGQgPSBub2RlLmNoaWxkTm9kZXMucG9wKCkpKSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0QmVmb3JlKGNoaWxkLCBvbGRDaGlsZClcbiAgICAgICAgb2xkQ2hpbGQgPSBjaGlsZFxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGVcbiAgICB9XG5cbiAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbiAgICB9XG5cbiAgICBub2RlLnBhcmVudE5vZGUgPSB0aGlzXG4gICAgLy8gT2JqZWN0LnNldFByb3RvdHlwZU9mKG5vZGUubmFtZXNwYWNlcy5wcm90b3R5cGUsIHRoaXMubmFtZXNwYWNlcy5wcm90b3R5cGUpXG5cbiAgICB0aGlzLmNoaWxkTm9kZXMuc3BsaWNlKGluZGV4LCAwLCBub2RlKVxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICBpc0RlZmF1bHROYW1lc3BhY2UgKG5hbWVzcGFjZVVSSSkge1xuICAgIHN3aXRjaCAodGhpcy5ub2RlVHlwZSkge1xuICAgIGNhc2UgTm9kZS5FTEVNRU5UX05PREU6XG4gICAgICBpZiAoIXRoaXMucHJlZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVzcGFjZVVSSSA9PT0gbmFtZXNwYWNlVVJJXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgneG1sbnMnKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3htbG5zJylcbiAgICAgIH1cblxuICAgICAgLy8gRW50aXR5UmVmZXJlbmNlcyBtYXkgaGF2ZSB0byBiZSBza2lwcGVkIHRvIGdldCB0byBpdFxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmlzRGVmYXVsdE5hbWVzcGFjZShuYW1lc3BhY2VVUkkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIGNhc2UgTm9kZS5ET0NVTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRFbGVtZW50LmlzRGVmYXVsdE5hbWVzcGFjZShuYW1lc3BhY2VVUkkpXG4gICAgY2FzZSBOb2RlLkVOVElUWV9OT0RFOlxuICAgIGNhc2UgTm9kZS5OT1RBVElPTl9OT0RFOlxuICAgIGNhc2UgTm9kZS5ET0NVTUVOVF9UWVBFX05PREU6XG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBjYXNlIE5vZGUuQVRUUklCVVRFX05PREU6XG4gICAgICBpZiAodGhpcy5vd25lckVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3duZXJFbGVtZW50LmlzRGVmYXVsdE5hbWVzcGFjZShuYW1lc3BhY2VVUkkpXG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gRW50aXR5UmVmZXJlbmNlcyBtYXkgaGF2ZSB0byBiZSBza2lwcGVkIHRvIGdldCB0byBpdFxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmlzRGVmYXVsdE5hbWVzcGFjZShuYW1lc3BhY2VVUkkpXG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBpc0VxdWFsTm9kZSAobm9kZSkge1xuICAgIHRoaXMubm9ybWFsaXplKClcbiAgICBub2RlLm5vcm1hbGl6ZSgpXG5cbiAgICBsZXQgYm9vbCA9IHRoaXMubm9kZU5hbWUgPT09IG5vZGUubm9kZU5hbWVcbiAgICBib29sID0gYm9vbCAmJiB0aGlzLmxvY2FsTmFtZSA9PT0gbm9kZS5sb2NhbE5hbWVcbiAgICBib29sID0gYm9vbCAmJiB0aGlzLm5hbWVzcGFjZVVSSSA9PT0gbm9kZS5uYW1lc3BhY2VVUklcbiAgICBib29sID0gYm9vbCAmJiB0aGlzLnByZWZpeCA9PT0gbm9kZS5wcmVmaXhcbiAgICBib29sID0gYm9vbCAmJiB0aGlzLm5vZGVWYWx1ZSA9PT0gbm9kZS5ub2RlVmFsdWVcblxuICAgIGJvb2wgPSBib29sICYmIHRoaXMuY2hpbGROb2Rlcy5sZW5ndGggPT09IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGhcblxuICAgIC8vIGRvbnQgY2hlY2sgY2hpbGRyZW4gcmVjdXJzaXZlbHkgd2hlbiB0aGUgY291bnQgZG9lc250IGV2ZW50IGFkZCB1cFxuICAgIGlmICghYm9vbCkgcmV0dXJuIGZhbHNlXG5cbiAgICBib29sID0gYm9vbCAmJiAhdGhpcy5jaGlsZE5vZGVzLnJlZHVjZSgobGFzdCwgY3VyciwgaW5kZXgpID0+IHtcbiAgICAgIHJldHVybiBsYXN0ICYmIGN1cnIuaXNFcXVhbE5vZGUobm9kZS5jaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9LCB0cnVlKVxuXG4gICAgLy8gRklYTUU6IFVzZSBhdHRyIG5vZGVzXG4gICAgLyogYm9vbCA9IGJvb2wgJiYgIVsgLi4udGhpcy5hdHRycy5lbnRyaWVzKCkgXS5yZWR1Y2UoKGxhc3QsIGN1cnIsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBbIGtleSwgdmFsIF0gPSBub2RlLmF0dHJzLmVudHJpZXMoKVxuICAgICAgcmV0dXJuIGxhc3QgJiYgY3VyclswXSA9PT0ga2V5ICYmIGN1cnJbMV0gPT09IHZhbFxuICAgIH0sIHRydWUpICovXG5cbiAgICAvKlxuICAgIFRPRE86XG4gICAgRm9yIHR3byBEb2N1bWVudFR5cGUgbm9kZXMgdG8gYmUgZXF1YWwsIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBtdXN0IGFsc28gYmUgc2F0aXNmaWVkOlxuXG4gICAgVGhlIGZvbGxvd2luZyBzdHJpbmcgYXR0cmlidXRlcyBhcmUgZXF1YWw6IHB1YmxpY0lkLCBzeXN0ZW1JZCwgaW50ZXJuYWxTdWJzZXQuXG4gICAgVGhlIGVudGl0aWVzIE5hbWVkTm9kZU1hcHMgYXJlIGVxdWFsLlxuICAgIFRoZSBub3RhdGlvbnMgTmFtZWROb2RlTWFwcyBhcmUgZXF1YWwuXG4gICAgKi9cblxuICAgIGlmICh0aGlzLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERSAmJiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERSkge1xuICAgICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5wdWJsaWNJZCA9PT0gbm9kZS5wdWJsaWNJZFxuICAgICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5zeXN0ZW1JZCA9PT0gbm9kZS5zeXN0ZW1JZFxuICAgICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5pbnRlcm5hbFN1YnNldCA9PT0gbm9kZS5pbnRlcm5hbFN1YnNldFxuICAgIH1cblxuICAgIHJldHVybiBib29sXG4gIH1cblxuICBpc1NhbWVOb2RlIChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMgPT09IG5vZGVcbiAgfVxuXG4gIGxvb2t1cE5hbWVzcGFjZVByZWZpeCAobmFtZXNwYWNlVVJJLCBvcmlnaW5hbEVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5uYW1lc3BhY2VVUkkgJiYgdGhpcy5uYW1lc3BhY2VVUkkgPT09IG5hbWVzcGFjZVVSSSAmJiB0aGlzLnByZWZpeFxuICAgICAgICAgJiYgb3JpZ2luYWxFbGVtZW50Lmxvb2t1cE5hbWVzcGFjZVVSSSh0aGlzLnByZWZpeCkgPT09IG5hbWVzcGFjZVVSSSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJlZml4XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBbIGtleSwgdmFsIF0gb2YgdGhpcy5hdHRycy5lbnRyaWVzKCkpIHtcbiAgICAgIGlmICgha2V5LmluY2x1ZGVzKCc6JykpIGNvbnRpbnVlXG5cbiAgICAgIGNvbnN0IFsgYXR0clByZWZpeCwgbmFtZSBdID0ga2V5LnNwbGl0KCc6JylcbiAgICAgIGlmIChhdHRyUHJlZml4ID09PSAneG1sbnMnICYmIHZhbCA9PT0gbmFtZXNwYWNlVVJJICYmIG9yaWdpbmFsRWxlbWVudC5sb29rdXBOYW1lc3BhY2VVUkkobmFtZSkgPT09IG5hbWVzcGFjZVVSSSkge1xuICAgICAgICByZXR1cm4gbmFtZVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcbiAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmxvb2t1cE5hbWVzcGFjZVByZWZpeChuYW1lc3BhY2VVUkksIG9yaWdpbmFsRWxlbWVudClcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGxvb2t1cE5hbWVzcGFjZVVSSSAocHJlZml4KSB7XG4gICAgc3dpdGNoICh0aGlzLm5vZGVUeXBlKSB7XG4gICAgY2FzZSBOb2RlLkVMRU1FTlRfTk9ERTpcbiAgICAgIGlmICh0aGlzLm5hbWVzcGFjZVVSSSAhPSBudWxsICYmIHRoaXMucHJlZml4ID09PSBwcmVmaXgpIHtcbiAgICAgICAgLy8gTm90ZTogcHJlZml4IGNvdWxkIGJlIFwibnVsbFwiIGluIHRoaXMgY2FzZSB3ZSBhcmUgbG9va2luZyBmb3IgZGVmYXVsdCBuYW1lc3BhY2VcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZXNwYWNlVVJJXG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgWyBrZXksIHZhbCBdIG9mIHRoaXMuYXR0cnMuZW50cmllcygpKSB7XG4gICAgICAgIGlmICgha2V5LmluY2x1ZGVzKCc6JykpIGNvbnRpbnVlXG5cbiAgICAgICAgY29uc3QgWyBhdHRyUHJlZml4LCBuYW1lIF0gPSBrZXkuc3BsaXQoJzonKVxuICAgICAgICBpZiAoYXR0clByZWZpeCA9PT0gJ3htbG5zJyAmJiBuYW1lID09PSBwcmVmaXgpIHtcbiAgICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAvLyBGSVhNRTogTG9vayB1cCBpZiBwcmVmaXggb3IgYXR0clByZWZpeFxuICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICd4bWxucycgJiYgcHJlZml4ID09IG51bGwpIHtcbiAgICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWxcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBFbnRpdHlSZWZlcmVuY2VzIG1heSBoYXZlIHRvIGJlIHNraXBwZWQgdG8gZ2V0IHRvIGl0XG4gICAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGUubG9va3VwTmFtZXNwYWNlVVJJKHByZWZpeClcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX05PREU6XG4gICAgICByZXR1cm4gdGhpcy5kb2N1bWVudEVsZW1lbnQubG9va3VwTmFtZXNwYWNlVVJJKHByZWZpeClcbiAgICBjYXNlIE5vZGUuRU5USVRZX05PREU6XG4gICAgY2FzZSBOb2RlLk5PVEFUSU9OX05PREU6XG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERTpcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERTpcbiAgICAgIHJldHVybiBudWxsXG4gICAgY2FzZSBOb2RlLkFUVFJJQlVURV9OT0RFOlxuICAgICAgaWYgKHRoaXMub3duZXJFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm93bmVyRWxlbWVudC5sb29rdXBOYW1lc3BhY2VVUkkocHJlZml4KVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGxcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gRW50aXR5UmVmZXJlbmNlcyBtYXkgaGF2ZSB0byBiZSBza2lwcGVkIHRvIGdldCB0byBpdFxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmxvb2t1cE5hbWVzcGFjZVVSSShwcmVmaXgpXG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGxvb2t1cFByZWZpeCAobmFtZXNwYWNlVVJJKSB7XG4gICAgaWYgKCFuYW1lc3BhY2VVUkkpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgY29uc3QgdHlwZSA9IHRoaXMubm9kZVR5cGVcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgTm9kZS5FTEVNRU5UX05PREU6XG4gICAgICByZXR1cm4gdGhpcy5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJLCB0aGlzKVxuICAgIGNhc2UgTm9kZS5ET0NVTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRFbGVtZW50Lmxvb2t1cE5hbWVzcGFjZVByZWZpeChuYW1lc3BhY2VVUkkpXG4gICAgY2FzZSBOb2RlLkVOVElUWV9OT0RFIDpcbiAgICBjYXNlIE5vZGUuTk9UQVRJT05fTk9ERTpcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERTpcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfVFlQRV9OT0RFOlxuICAgICAgcmV0dXJuIG51bGwgLy8gdHlwZSBpcyB1bmtub3duXG4gICAgY2FzZSBOb2RlLkFUVFJJQlVURV9OT0RFOlxuICAgICAgaWYgKHRoaXMub3duZXJFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm93bmVyRWxlbWVudC5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGxcbiAgICBkZWZhdWx0OlxuICAgICAgLy8gRW50aXR5UmVmZXJlbmNlcyBtYXkgaGF2ZSB0byBiZSBza2lwcGVkIHRvIGdldCB0byBpdFxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmxvb2t1cE5hbWVzcGFjZVByZWZpeChuYW1lc3BhY2VVUkkpXG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIG5vcm1hbGl6ZSAoKSB7XG4gICAgY29uc3QgY2hpbGROb2RlcyA9IFtdXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuY2hpbGROb2Rlcykge1xuICAgICAgY29uc3QgbGFzdCA9IGNoaWxkTm9kZXMuc2hpZnQoKVxuICAgICAgaWYgKCFsYXN0KSB7XG4gICAgICAgIGlmIChub2RlLmRhdGEpIHtcbiAgICAgICAgICBjaGlsZE5vZGVzLnVuc2hpZnQobm9kZSlcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgaWYgKCFub2RlLmRhdGEpIHtcbiAgICAgICAgICBjaGlsZE5vZGVzLnVuc2hpZnQobGFzdClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3Qubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgICAgY29uc3QgbWVyZ2VkID0gdGhpcy5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGxhc3QuZGF0YSArIG5vZGUuZGF0YSlcbiAgICAgICAgICBjaGlsZE5vZGVzLnB1c2gobWVyZ2VkKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBjaGlsZE5vZGVzLnB1c2gobGFzdCwgbm9kZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZE5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBub2RlLnBhcmVudE5vZGUgPSB0aGlzXG4gICAgfSlcbiAgICB0aGlzLmNoaWxkTm9kZXMgPSBjaGlsZE5vZGVzXG4gICAgLy8gdGhpcy5jaGlsZE5vZGVzID0gdGhpcy5jaGlsZE5vZGVzLmZvckVhY2goKHRleHROb2Rlcywgbm9kZSkgPT4ge1xuICAgIC8vICAgLy8gRklYTUU6IElmIGZpcnN0IG5vZGUgaXMgYW4gZW1wdHkgdGV4dG5vZGUsIHdoYXQgZG8gd2UgZG8/IC0+IHNwZWNcbiAgICAvLyAgIGlmICghdGV4dE5vZGVzKSByZXR1cm4gWyBub2RlIF1cbiAgICAvLyAgIHZhciBsYXN0ID0gdGV4dE5vZGVzLnBvcCgpXG5cbiAgICAvLyAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgIC8vICAgICBpZiAoIW5vZGUuZGF0YSkgcmV0dXJuIHRleHROb2Rlc1xuXG4gICAgLy8gICAgIGlmIChsYXN0Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgIC8vICAgICAgIGNvbnN0IG1lcmdlZCA9IHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsYXN0LmRhdGEgKyAnICcgKyBub2RlLmRhdGEpXG4gICAgLy8gICAgICAgdGV4dE5vZGVzLnB1c2gobWVyZ2VkKVxuICAgIC8vICAgICAgIHJldHVybiB0ZXh0Tm9kZXMuY29uY2F0KG1lcmdlZClcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgdGV4dE5vZGVzLnB1c2gobGFzdCwgbm9kZSlcbiAgICAvLyAgIH1cblxuICAgIC8vICAgcmV0dXJuIHRleHROb2Rlc1xuICAgIC8vIH0sIG51bGwpXG4gIH1cblxuICByZW1vdmVDaGlsZCAobm9kZSkge1xuXG4gICAgbm9kZS5wYXJlbnROb2RlID0gbnVsbFxuICAgIC8vIE9iamVjdC5zZXRQcm90b3R5cGVPZihub2RlLCBudWxsKVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaGlsZE5vZGVzLmluZGV4T2Yobm9kZSlcbiAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm4gbm9kZVxuICAgIHRoaXMuY2hpbGROb2Rlcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgcmV0dXJuIG5vZGVcbiAgfVxuXG4gIHJlcGxhY2VDaGlsZCAobmV3Q2hpbGQsIG9sZENoaWxkKSB7XG4gICAgY29uc3QgYmVmb3JlID0gb2xkQ2hpbGQubmV4dFNpYmxpbmdcbiAgICB0aGlzLnJlbW92ZUNoaWxkKG9sZENoaWxkKVxuICAgIHRoaXMuaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLCBiZWZvcmUpXG4gICAgcmV0dXJuIG9sZENoaWxkXG4gIH1cblxuICBnZXQgbmV4dFNpYmxpbmcgKCkge1xuICAgIGNvbnN0IGNoaWxkID0gdGhpcy5wYXJlbnROb2RlICYmIHRoaXMucGFyZW50Tm9kZS5jaGlsZE5vZGVzW3RoaXMucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmluZGV4T2YodGhpcykgKyAxXVxuICAgIHJldHVybiBjaGlsZCB8fCBudWxsXG4gIH1cblxuICBnZXQgcHJldmlvdXNTaWJsaW5nICgpIHtcbiAgICBjb25zdCBjaGlsZCA9IHRoaXMucGFyZW50Tm9kZSAmJiB0aGlzLnBhcmVudE5vZGUuY2hpbGROb2Rlc1t0aGlzLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5pbmRleE9mKHRoaXMpIC0gMV1cbiAgICByZXR1cm4gY2hpbGQgfHwgbnVsbFxuICB9XG5cbiAgZ2V0IHRleHRDb250ZW50ICgpIHtcbiAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHJldHVybiB0aGlzLmRhdGFcbiAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5DREFUQV9TRUNUSU9OX05PREUpIHJldHVybiB0aGlzLmRhdGFcbiAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREUpIHJldHVybiB0aGlzLmRhdGFcblxuICAgIHJldHVybiB0aGlzLmNoaWxkTm9kZXMucmVkdWNlKGZ1bmN0aW9uIChsYXN0LCBjdXJyZW50KSB7XG4gICAgICByZXR1cm4gbGFzdCArIGN1cnJlbnQudGV4dENvbnRlbnRcbiAgICB9LCAnJylcbiAgfVxuXG4gIHNldCB0ZXh0Q29udGVudCAodGV4dCkge1xuICAgIGlmICh0aGlzLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSB8fCB0aGlzLm5vZGVUeXBlID09PSBOb2RlLkNEQVRBX1NFQ1RJT05fTk9ERSB8fCB0aGlzLm5vZGVUeXBlID09PSBOb2RlLkNPTU1FTlRfTk9ERSkge1xuICAgICAgdGhpcy5kYXRhID0gdGV4dFxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuY2hpbGROb2RlcyA9IFtdXG4gICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpXG4gIH1cblxuICBnZXQgbGFzdENoaWxkICgpIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzW3RoaXMuY2hpbGROb2Rlcy5sZW5ndGggLSAxXSB8fCBudWxsXG4gIH1cblxuICBnZXQgZmlyc3RDaGlsZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGROb2Rlc1swXSB8fCBudWxsXG4gIH1cbn1cblxuZXh0ZW5kU3RhdGljKE5vZGUsIG5vZGVUeXBlcylcbmV4dGVuZChOb2RlLCBub2RlVHlwZXMpXG4iLCJpbXBvcnQgeyBleHRlbmRTdGF0aWMgfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xuXG5leHBvcnQgY2xhc3MgTm9kZUZpbHRlciB7XG4gIGFjY2VwdE5vZGUgKCkge1xuICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFRcbiAgfVxufVxuXG5leHRlbmRTdGF0aWMoTm9kZUZpbHRlciwge1xuICBGSUxURVJfQUNDRVBUOiAxLFxuICBGSUxURVJfUkVKRUNUOiAyLFxuICBGSUxURVJfSUdOT1JFOiA0LFxuICBTSE9XX0FMTDogLTEsXG4gIFNIT1dfRUxFTUVOVDogMSxcbiAgU0hPV19URVhUOiA0LFxuICBTSE9XX0VOVElUWV9SRUZFUkVOQ0U6IDE2LFxuICBTSE9XX0VOVElUWTogMzIsXG4gIFNIT1dfUFJPQ0VTU0lOR19JTlNUUlVDVElPTjogNjQsXG4gIFNIT1dfQ09NTUVOVDogMTI4LFxuICBTSE9XX0RPQ1VNRU5UOiAyNTYsXG4gIFNIT1dfRE9DVU1FTlRfVFlQRTogNTEyLFxuICBTSE9XX0RPQ1VNRU5UX0ZSQUdNRU5UOiAxMDI0LFxuICBTSE9XX05PVEFUSU9OOiAyMDQ4XG59KVxuIiwiaW1wb3J0IHsgQ2hhcmFjdGVyRGF0YSB9IGZyb20gJy4vQ2hhcmFjdGVyRGF0YS5qcydcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXG5cbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgQ2hhcmFjdGVyRGF0YSB7XG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcykge1xuICAgIHN1cGVyKG5hbWUsIHByb3BzKVxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLlRFWFRfTk9ERVxuICB9XG59XG4iLCJpbXBvcnQgeyBleHRlbmQgfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xuaW1wb3J0IHsgRXZlbnRUYXJnZXQgfSBmcm9tICcuL0V2ZW50VGFyZ2V0LmpzJ1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcbmltcG9ydCB7IERvY3VtZW50IH0gZnJvbSAnLi9Eb2N1bWVudC5qcydcbmltcG9ydCB7IERvY3VtZW50RnJhZ21lbnQgfSBmcm9tICcuL0RvY3VtZW50RnJhZ21lbnQuanMnXG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnLi9UZXh0LmpzJ1xuaW1wb3J0IHsgQ3VzdG9tRXZlbnQgfSBmcm9tICcuL0N1c3RvbUV2ZW50LmpzJ1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL0V2ZW50LmpzJ1xuaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudC5qcydcbmltcG9ydCB7IEF0dHIgfSBmcm9tICcuL0F0dHIuanMnXG5pbXBvcnQgeyBIVE1MSW1hZ2VFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxJbWFnZUVsZW1lbnQuanMnXG5pbXBvcnQgeyBIVE1MTGlua0VsZW1lbnQgfSBmcm9tICcuL2h0bWwvSFRNTExpbmtFbGVtZW50LmpzJ1xuaW1wb3J0IHsgSFRNTFNjcmlwdEVsZW1lbnQgfSBmcm9tICcuL2h0bWwvSFRNTFNjcmlwdEVsZW1lbnQuanMnXG5pbXBvcnQgeyBIVE1MRWxlbWVudCB9IGZyb20gJy4vaHRtbC9IVE1MRWxlbWVudC5qcydcbmltcG9ydCB7IFNWR1BvaW50IH0gZnJvbSAnLi9zdmcvU1ZHUG9pbnQuanMnXG5pbXBvcnQgeyBTVkdNYXRyaXggfSBmcm9tICcuL3N2Zy9TVkdNYXRyaXguanMnXG5pbXBvcnQgeyBTVkdFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHRWxlbWVudC5qcydcbmltcG9ydCB7IFNWR1NWR0VsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdTVkdFbGVtZW50LmpzJ1xuaW1wb3J0IHsgU1ZHUGF0aEVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdQYXRoRWxlbWVudC5qcydcbmltcG9ydCB7IFNWR0dyYXBoaWNzRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcbmltcG9ydCB7IFNWR1RleHRDb250ZW50RWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR1RleHRDb250ZW50RWxlbWVudC5qcydcbmltcG9ydCB7IGNhbWVsQ2FzZSB9IGZyb20gJy4uL3V0aWxzL3N0clV0aWxzLmpzJ1xuaW1wb3J0ICogYXMgZGVmYXVsdHMgZnJvbSAnLi4vdXRpbHMvZGVmYXVsdHMuanMnXG5cbmV4cG9ydCBjbGFzcyBXaW5kb3cgZXh0ZW5kcyBFdmVudFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5kb2N1bWVudCA9IG5ldyBEb2N1bWVudCgpXG4gICAgdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyA9IHRoaXNcbiAgICB0aGlzLnNlbGYgPSB0aGlzXG4gICAgY29uc3QgZG9jID0gdGhpcy5kb2N1bWVudFxuICAgIHRoaXMuSW1hZ2UgPSBjbGFzcyB7XG4gICAgICBjb25zdHJ1Y3RvciAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBjb25zdCBpbWcgPSBkb2MuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICAgICAgaWYgKHdpZHRoICE9IG51bGwpIGltZy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgpXG4gICAgICAgIGlmIChoZWlnaHQgIT0gbnVsbCkgaW1nLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgICByZXR1cm4gaW1nXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29tcHV0ZWRTdHlsZSAobm9kZSkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBGSVhNRTogQ3VycmVudGx5IHRoaXMgZnVuY3Rpb24gdHJlYXRzIGV2ZXJ5IGdpdmVuIGF0dHJcbiAgICAgIC8vIGFzIGluaGVyaXRhYmxlIGZyb20gaXRzIHBhcmVudHMgd2hpY2ggaXMgb2ZjIG5vdCBhbHdheXMgdHJ1ZVxuICAgICAgLy8gYnV0IGdvb2QgZW5vdWdoIGZvciBzdmcuanNcbiAgICAgIGdldFByb3BlcnR5VmFsdWUgKGF0dHIpIHtcbiAgICAgICAgbGV0IHZhbHVlXG4gICAgICAgIGxldCBjdXIgPSBub2RlXG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgIHZhbHVlID0gY3VyLnN0eWxlW2F0dHJdIHx8IGN1ci5nZXRBdHRyaWJ1dGUoYXR0cilcbiAgICAgICAgfSB3aGlsZSAoXG4gICAgICAgICAgdmFsdWUgPT0gbnVsbFxuICAgICAgICAgICYmIChjdXIgPSBjdXIucGFyZW50Tm9kZSlcbiAgICAgICAgICAmJiBjdXIubm9kZVR5cGUgPT09IDFcbiAgICAgICAgKVxuXG4gICAgICAgIHJldHVybiB2YWx1ZSB8fCBkZWZhdWx0c1tjYW1lbENhc2UoYXR0cildIHx8IG51bGxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubGV0IGxhc3RUaW1lID0gMFxuY29uc3QgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gY2FsbGJhY2sgPT4ge1xuICBjb25zdCBub3cgPSBuZXcgZ2xvYmFsLkRhdGUoKS5nZXRUaW1lKClcbiAgY29uc3QgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKG5vdyAtIGxhc3RUaW1lKSlcbiAgcmV0dXJuIGdsb2JhbC5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsYXN0VGltZSA9IG5vdyArIHRpbWVUb0NhbGxcbiAgICBjYWxsYmFjayhsYXN0VGltZSlcbiAgfSwgdGltZVRvQ2FsbClcbn1cblxuY29uc3Qgbm93T2Zmc2V0ID0gZ2xvYmFsLkRhdGUubm93KClcbmNvbnN0IHBlcmZvcm1hbmNlID0ge1xuICBub3c6ICgpID0+IERhdGUubm93KCkgLSBub3dPZmZzZXRcbn1cblxuY29uc3Qgd2luUHJvcHMgPSB7XG4gIFdpbmRvdyxcbiAgRG9jdW1lbnQsXG4gIERvY3VtZW50RnJhZ21lbnQsXG4gIE5vZGUsXG4gIEV2ZW50VGFyZ2V0LFxuICBUZXh0LFxuICBBdHRyLFxuICBFbGVtZW50LFxuICBDdXN0b21FdmVudCxcbiAgRXZlbnQsXG4gIEhUTUxFbGVtZW50LFxuICBIVE1MTGlua0VsZW1lbnQsXG4gIEhUTUxTY3JpcHRFbGVtZW50LFxuICBIVE1MSW1hZ2VFbGVtZW50LFxuICAvLyBJbWFnZTogSFRNTEltYWdlRWxlbWVudCwgLy8gaXMgc2V0IG9uIGNvbnN0cnVjdGlvblxuICBTVkdNYXRyaXgsXG4gIFNWR1BvaW50LFxuICBTVkdFbGVtZW50LFxuICBTVkdTVkdFbGVtZW50LFxuICBTVkdQYXRoRWxlbWVudCxcbiAgU1ZHR3JhcGhpY3NFbGVtZW50LFxuICBTVkdUZXh0Q29udGVudEVsZW1lbnQsXG4gIHNldFRpbWVvdXQ6IGdsb2JhbC5zZXRUaW1lb3V0LFxuICBjbGVhclRpbWVvdXQ6IGdsb2JhbC5jbGVhclRpbWVvdXQsXG4gIHBhZ2VYT2Zmc2V0OiAwLFxuICBwYWdlWU9mZnNldDogMCxcbiAgRGF0ZTogZ2xvYmFsLkRhdGUsXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSxcbiAgY2FuY2VsQW5pbWF0aW9uRnJhbWU6IGdsb2JhbC5jbGVhclRpbWVvdXQsXG4gIHBlcmZvcm1hbmNlXG59XG5cbmV4dGVuZChXaW5kb3csIHdpblByb3BzKVxuIiwiaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gJy4uL0VsZW1lbnQuanMnXG5cbmV4cG9ydCBjbGFzcyBIVE1MRWxlbWVudCBleHRlbmRzIEVsZW1lbnQge31cbiIsImltcG9ydCBzaXplT2YgZnJvbSAnaW1hZ2Utc2l6ZSdcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi4vRXZlbnQuanMnXG5pbXBvcnQgeyBIVE1MRWxlbWVudCB9IGZyb20gJy4vSFRNTEVsZW1lbnQuanMnXG4vLyBpbXBvcnQgeyBnZXRGaWxlQnVmZmVyRnJvbVVSTCB9IGZyb20gJy4uLy4uL3V0aWxzL2ZpbGVVcmxUb0J1ZmZlci5qcydcbi8vIGltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBjbGFzcyBIVE1MSW1hZ2VFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciAoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpXG4gICAgdGhpcy5uYXR1cmFsV2lkdGggPSAwXG4gICAgdGhpcy5uYXR1cmFsSGVpZ2h0ID0gMFxuICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZVxuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEhUTUxJbWFnZUVsZW1lbnQucHJvdG90eXBlLCB7XG4gIHNyYzoge1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NyYycpXG4gICAgfSxcbiAgICBzZXQgKHZhbCkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHZhbClcbiAgICAgIC8vIGNvbnN0IHVybCA9IHBhdGgucmVzb2x2ZSh0aGlzLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcubG9jYXRpb24sIHZhbClcbiAgICAgIC8vIGdldEZpbGVCdWZmZXJGcm9tVVJMKHVybCwgKGJ1ZmZlcikgPT4ge1xuICAgICAgc2l6ZU9mKHZhbCwgKGVyciwgc2l6ZSkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnZXJyb3InKSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5hdHVyYWxXaWR0aCA9IHNpemUud2lkdGhcbiAgICAgICAgdGhpcy5uYXR1cmFsSGVpZ2h0ID0gc2l6ZS5oZWlnaHRcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IHRydWVcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9hZCcpKVxuICAgICAgfSlcbiAgICAgIC8vIH0pXG4gICAgfVxuICB9LFxuICBoZWlnaHQ6IHtcbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKSB8fCB0aGlzLm5hdHVyYWxIZWlnaHRcbiAgICB9LFxuICAgIHNldCAodmFsKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdmFsKVxuICAgIH1cbiAgfSxcbiAgd2lkdGg6IHtcbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd3aWR0aCcpIHx8IHRoaXMubmF0dXJhbFdpZHRoXG4gICAgfSxcbiAgICBzZXQgKHZhbCkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdmFsKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IEhUTUxFbGVtZW50IH0gZnJvbSAnLi9IVE1MRWxlbWVudC5qcydcblxuZXhwb3J0IGNsYXNzIEhUTUxMaW5rRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHt9XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEhUTUxMaW5rRWxlbWVudC5wcm90b3R5cGUsIHtcbiAgaHJlZjoge1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuICAgIH0sXG4gICAgc2V0ICh2YWwpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdocmVmJywgdmFsKVxuICAgIH1cbiAgfSxcbiAgcmVsOiB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncmVsJylcbiAgICB9LFxuICAgIHNldCAodmFsKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncmVsJywgdmFsKVxuICAgIH1cbiAgfSxcbiAgdHlwZToge1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3R5cGUnKVxuICAgIH0sXG4gICAgc2V0ICh2YWwpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0eXBlJywgdmFsKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCBzYXggZnJvbSAnc2F4J1xuXG4vLyBUT0RPOiBJdHMgYW4gWE1MUGFyc2VyIG5vdCBIVE1MUGFyc2VyISFcbmV4cG9ydCBjb25zdCBIVE1MUGFyc2VyID0gZnVuY3Rpb24gKHN0ciwgZWwpIHtcbiAgbGV0IGN1cnJlbnRUYWcgPSBlbFxuICAvLyBjb25zdCBuYW1lc3BhY2VzID0geyB4bWxuczogZWwuZ2V0QXR0cmlidXRlKCd4bWxucycpIH1cbiAgbGV0IGRvY3VtZW50ID0gZWwub3duZXJEb2N1bWVudFxuICBsZXQgY2RhdGEgPSBudWxsXG5cbiAgLy8gc2F4IGV4cGVjdHMgYSByb290IGVsZW1lbnQgYnV0IHdlIGFsc28gbWlzc3VzZSBpdCB0byBwYXJzZSBmcmFnbWVudHNcbiAgaWYgKGVsLm5vZGVUeXBlICE9PSBlbC5ET0NVTUVOVF9OT0RFKSB7XG4gICAgc3RyID0gJzxzdmdkb206d3JhcHBlciB4bWxuczpzdmdkb209XCJzdmdkb206cm9ja3NcIj4nICsgc3RyICsgJzwvc3ZnZG9tOndyYXBwZXI+J1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50ID0gZWxcbiAgfVxuXG4gIGNvbnN0IHBhcnNlciA9IHNheC5wYXJzZXIodHJ1ZSwge1xuICAgIC8vIGxvd2VyY2FzZTogdHJ1ZSxcbiAgICB4bWxuczogdHJ1ZSxcbiAgICBzdHJpY3RFbnRpdGllczogdHJ1ZVxuICB9KVxuXG4gIHBhcnNlci5vbmVycm9yID0gKGUpID0+IHtcbiAgICB0aHJvdyBlXG4gIH1cblxuICBwYXJzZXIub25kb2N0eXBlID0gKHN0cikgPT4ge1xuICAgIGlmIChjdXJyZW50VGFnICE9PSBkb2N1bWVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEb2N0eXBlIGNhbiBvbmx5IGJlIGFwcGVuZGVkIHRvIGRvY3VtZW50JylcbiAgICB9XG4gICAgY3VycmVudFRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudFR5cGUoKSlcbiAgfVxuXG4gIHBhcnNlci5vbnRleHQgPSAoc3RyKSA9PiBjdXJyZW50VGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpXG4gIHBhcnNlci5vbmNvbW1lbnQgPSAoc3RyKSA9PiBjdXJyZW50VGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoc3RyKSlcblxuICAvLyBwYXJzZXIub25vcGVubmFtZXNwYWNlID0gbnMgPT4ge1xuICAvLyAgIG5hbWVzcGFjZXNbbnMucHJlZml4XSA9IG5zLnVyaVxuICAvLyB9XG4gIC8vIHBhcnNlci5vbmNsb3NlbmFtZXNwYWNlID0gbnMgPT4ge1xuICAvLyAgIGRlbGV0ZSBuYW1lc3BhY2VzW25zLnByZWZpeF1cbiAgLy8gfVxuXG4gIHBhcnNlci5vbm9wZW50YWcgPSBub2RlID0+IHtcbiAgICBpZiAobm9kZS5uYW1lID09PSAnc3ZnZG9tOndyYXBwZXInKSByZXR1cm5cblxuICAgIGNvbnN0IGF0dHJzID0gbm9kZS5hdHRyaWJ1dGVzXG5cbiAgICBjb25zdCB1cmkgPSBub2RlLnVyaSB8fCBjdXJyZW50VGFnLmxvb2t1cE5hbWVzcGFjZVVSSShub2RlLnByZWZpeCB8fCBudWxsKVxuXG4gICAgdmFyIG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlModXJpLCBub2RlLm5hbWUpXG5cbiAgICBmb3IgKGNvbnN0IFsgbmFtZSwgbm9kZSBdIG9mIE9iamVjdC5lbnRyaWVzKGF0dHJzKSkge1xuICAgICAgbmV3RWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhub2RlLnVyaSwgbmFtZSwgbm9kZS52YWx1ZSlcbiAgICB9XG5cbiAgICBjdXJyZW50VGFnLmFwcGVuZENoaWxkKG5ld0VsZW1lbnQpXG4gICAgY3VycmVudFRhZyA9IG5ld0VsZW1lbnRcbiAgfVxuXG4gIHBhcnNlci5vbmNsb3NldGFnID0gdGFnTmFtZSA9PiB7XG4gICAgaWYgKHRhZ05hbWUgPT09ICdzdmdkb206d3JhcHBlcicpIHJldHVyblxuXG4gICAgY3VycmVudFRhZyA9IGN1cnJlbnRUYWcucGFyZW50Tm9kZVxuICB9XG5cbiAgcGFyc2VyLm9ub3BlbmNkYXRhID0gKCkgPT4ge1xuICAgIGNkYXRhID0gZG9jdW1lbnQuY3JlYXRlQ0RBVEFTZWN0aW9uKCcnKVxuICB9XG5cbiAgcGFyc2VyLm9uY2RhdGEgPSAoc3RyKSA9PiB7XG4gICAgY2RhdGEuYXBwZW5kRGF0YShzdHIpXG4gIH1cblxuICBwYXJzZXIub25jbG9zZWNkYXRhID0gKCkgPT4ge1xuICAgIGN1cnJlbnRUYWcuYXBwZW5kQ2hpbGQoY2RhdGEpXG4gIH1cblxuICBwYXJzZXIud3JpdGUoc3RyKVxufVxuIiwiXG5pbXBvcnQgeyBIVE1MRWxlbWVudCB9IGZyb20gJy4vSFRNTEVsZW1lbnQuanMnXG5leHBvcnQgY2xhc3MgSFRNTFNjcmlwdEVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7fVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhIVE1MU2NyaXB0RWxlbWVudC5wcm90b3R5cGUsIHtcbiAgc3JjOiB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc3JjJylcbiAgICB9LFxuICAgIHNldCAodmFsKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3JjJywgdmFsKVxuICAgIH1cbiAgfSxcbiAgdHlwZToge1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3R5cGUnKVxuICAgIH0sXG4gICAgc2V0ICh2YWwpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd0eXBlJywgdmFsKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IG5vZGVzVG9Ob2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvbm9kZXNUb05vZGUuanMnXG5cbi8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jaW50ZXJmYWNlLWNoaWxkbm9kZVxuLy8gVG9kbzogY2hlY2sgaWYgdGhpcyBpcyBjb250YWluZWQgaW4gbm9kZXMgb3Igc2libGluZ3MgYXJlIGNvbnRhaW5lZCAodmlhYmxlUHJldmlvdXNTaWJsaW5nLCB2aWFibGVOZXh0U2libGluZylcbmV4cG9ydCBjb25zdCBDaGlsZE5vZGUgPSB7XG4gIGJlZm9yZSAoLi4ubm9kZXMpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50Tm9kZSkgcmV0dXJuXG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXG4gICAgdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCB0aGlzKVxuICB9LFxuICBhZnRlciAoLi4ubm9kZXMpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50Tm9kZSkgcmV0dXJuXG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXG4gICAgdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCB0aGlzLm5leHRTaWJsaW5nKVxuICB9LFxuICByZXBsYWNlV2l0aCAoLi4ubm9kZXMpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50Tm9kZSkgcmV0dXJuXG4gICAgY29uc3QgbmV4dCA9IHRoaXMubmV4dFNpYmxpbmdcbiAgICBjb25zdCBub2RlID0gbm9kZXNUb05vZGUobm9kZXMsIHRoaXMub3duZXJEb2N1bWVudClcbiAgICB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIG5leHQpXG4gICAgdGhpcy5yZW1vdmUoKVxuICB9LFxuICByZW1vdmUgKCkge1xuICAgIGlmICghdGhpcy5wYXJlbnROb2RlKSByZXR1cm5cbiAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcylcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZSA9IHtcblxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGUsIHtcbiAgcHJldmlvdXNFbGVtZW50U2libGluZzoge1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgbm9kZVxuICAgICAgd2hpbGUgKChub2RlID0gdGhpcy5wcmV2aW91c1NpYmxpbmcpKSB7XG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBub2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9LFxuXG4gIG5leHRFbGVtZW50U2libGluZzoge1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgbm9kZVxuICAgICAgd2hpbGUgKChub2RlID0gdGhpcy5uZXh0U2libGluZykpIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBOb2RlSXRlcmF0b3IgfSBmcm9tICcuLi8uLi91dGlscy9Ob2RlSXRlcmF0b3IuanMnXG5pbXBvcnQgeyBOb2RlRmlsdGVyIH0gZnJvbSAnLi4vTm9kZUZpbHRlci5qcydcblxuLy8gaHR0cHM6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNpbnRlcmZhY2Utbm9uZWxlbWVudHBhcmVudG5vZGVcbmV4cG9ydCBjb25zdCBOb25FbGVtZW50UGFyZW50Tm9kZSA9IHtcbiAgZ2V0RWxlbWVudEJ5SWQgKGlkKSB7XG4gICAgY29uc3QgaXRlciA9IG5ldyBOb2RlSXRlcmF0b3IodGhpcywgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIChub2RlKSA9PiBpZCA9PT0gbm9kZS5pZCA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSwgZmFsc2UpXG4gICAgZm9yIChjb25zdCBub2RlIG9mIGl0ZXIpIHtcbiAgICAgIHJldHVybiBub2RlXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiIsImltcG9ydCB7IENzc1F1ZXJ5IH0gZnJvbSAnLi4vLi4vb3RoZXIvQ3NzUXVlcnkuanMnXG5pbXBvcnQgeyBOb2RlSXRlcmF0b3IgfSBmcm9tICcuLi8uLi91dGlscy9Ob2RlSXRlcmF0b3IuanMnXG5pbXBvcnQgeyBOb2RlRmlsdGVyIH0gZnJvbSAnLi4vTm9kZUZpbHRlci5qcydcbmltcG9ydCB7IG5vZGVzVG9Ob2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvbm9kZXNUb05vZGUuanMnXG5cbi8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jcGFyZW50bm9kZVxuY29uc3QgUGFyZW50Tm9kZSA9IHtcbiAgbWF0Y2hXaXRoU2NvcGUgKHF1ZXJ5LCBzY29wZSkge1xuICAgIHJldHVybiBuZXcgQ3NzUXVlcnkocXVlcnkpLm1hdGNoZXModGhpcywgc2NvcGUpXG4gIH0sXG5cbiAgcXVlcnkgKHF1ZXJ5LCBzY29wZSwgc2luZ2xlID0gZmFsc2UpIHtcblxuICAgIGNvbnN0IGl0ZXIgPSBuZXcgTm9kZUl0ZXJhdG9yKHNjb3BlLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCwgKG5vZGUpID0+IG5vZGUubWF0Y2hXaXRoU2NvcGUocXVlcnksIHNjb3BlKSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSwgZmFsc2UpXG5cbiAgICBjb25zdCBub2RlcyA9IFtdXG4gICAgZm9yIChjb25zdCBub2RlIG9mIGl0ZXIpIHtcbiAgICAgIG5vZGVzLnB1c2gobm9kZSlcbiAgICAgIGlmIChzaW5nbGUpIHJldHVybiBub2Rlc1xuICAgIH1cblxuICAgIHJldHVybiBub2Rlc1xuICB9LFxuXG4gIHF1ZXJ5U2VsZWN0b3JBbGwgKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkocXVlcnksIHRoaXMpXG4gIH0sXG5cbiAgcXVlcnlTZWxlY3RvciAocXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeShxdWVyeSwgdGhpcywgdHJ1ZSlbMF0gfHwgbnVsbFxuICB9LFxuXG4gIGNsb3Nlc3QgKHF1ZXJ5KSB7XG4gICAgY29uc3QgY3NzUXVlcnkgPSBuZXcgQ3NzUXVlcnkocXVlcnkpXG4gICAgbGV0IG5vZGUgPSB0aGlzXG4gICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgIGlmIChjc3NRdWVyeS5tYXRjaGVzKG5vZGUsIHRoaXMpKSB7XG4gICAgICAgIHJldHVybiBub2RlXG4gICAgICB9XG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgcHJlcGVuZCAoLi4ubm9kZXMpIHtcbiAgICBjb25zdCBub2RlID0gbm9kZXNUb05vZGUobm9kZXMsIHRoaXMub3duZXJEb2N1bWVudClcblxuICAgIHRoaXMuaW5zZXJ0QmVmb3JlKG5vZGUsIHRoaXMuZmlyc3RDaGlsZClcbiAgfSxcblxuICBhcHBlbmQgKC4uLm5vZGVzKSB7XG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXG4gICAgdGhpcy5hcHBlbmRDaGlsZChub2RlKVxuICB9LFxuXG4gIHJlcGxhY2VDaGlsZHJlbiAoLi4ubm9kZXMpIHtcbiAgICB3aGlsZSAodGhpcy5maXJzdENoaWxkKSB7XG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgdGhpcy5hcHBlbmQoLi4ubm9kZXMpXG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoUGFyZW50Tm9kZSwge1xuICBjaGlsZHJlbjoge1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzLmZpbHRlcihmdW5jdGlvbiAobm9kZSkgeyByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUgfSlcbiAgICB9XG4gIH0sXG4gIGZpcnN0RWxlbWVudENoaWxkOiB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLmNoaWxkTm9kZXMpIHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfSxcbiAgbGFzdEVsZW1lbnRDaGlsZDoge1xuICAgIGdldCAoKSB7XG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5jaGlsZE5vZGVzLnNsaWNlKCkucmV2ZXJzZSgpKSB7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH0sXG4gIGNoaWxkRWxlbWVudENvdW50OiB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aFxuICAgIH1cbiAgfVxufSlcblxuZXhwb3J0IHsgUGFyZW50Tm9kZSB9XG4iLCJpbXBvcnQgeyBOb2RlRmlsdGVyIH0gZnJvbSAnLi4vTm9kZUZpbHRlci5qcydcbmltcG9ydCB7IE5vZGVJdGVyYXRvciB9IGZyb20gJy4uLy4uL3V0aWxzL05vZGVJdGVyYXRvci5qcydcblxuY29uc3QgaGFzQ2xhc3MgPSAobm9kZSwgbmFtZSkgPT4ge1xuICBjb25zdCBjbGFzc0xpc3QgPSBub2RlLmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pXG4gIHJldHVybiBjbGFzc0xpc3QuaW5jbHVkZXMobmFtZSlcbn1cblxuY29uc3QgZWxlbWVudEFjY2VzcyA9IHtcbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWUgKG5hbWUpIHtcbiAgICAvLyBjb25zdCBkb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudFxuICAgIGNvbnN0IGl0ZXIgPSBuZXcgTm9kZUl0ZXJhdG9yKHRoaXMsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCAobm9kZSkgPT4gbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSwgZmFsc2UpXG4gICAgLy8gY29uc3QgaXRlciA9IGRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcih0aGlzLCAxLCAobm9kZSkgPT4gbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSlcbiAgICByZXR1cm4gWyAuLi5pdGVyIF1cbiAgfSxcblxuICBnZXRFbGVtZW50c0J5VGFnTmFtZU5TIChucywgbmFtZSkge1xuICAgIC8vIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50XG4gICAgY29uc3QgaXRlciA9IG5ldyBOb2RlSXRlcmF0b3IodGhpcywgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIChub2RlKSA9PiBub2RlLmlzTmFtZXNwYWNlKG5zKSAmJiBub2RlLm5vZGVOYW1lID09PSBuYW1lID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFLCBmYWxzZSlcbiAgICAvLyBjb25zdCBpdGVyID0gZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKHRoaXMsIDEsIChub2RlKSA9PiBub2RlLmlzTmFtZXNwYWNlKG5zKSAmJiBub2RlLm5vZGVOYW1lID09PSBuYW1lID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFKVxuICAgIHJldHVybiBbIC4uLml0ZXIgXVxuICB9LFxuXG4gIGdldEVsZW1lbnRzQnlDbGFzc05hbWUgKG5hbWUpIHtcbiAgICAvLyBjb25zdCBkb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudFxuICAgIGNvbnN0IGl0ZXIgPSBuZXcgTm9kZUl0ZXJhdG9yKHRoaXMsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCAobm9kZSkgPT4gaGFzQ2xhc3Mobm9kZSwgbmFtZSkgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUsIGZhbHNlKVxuICAgIC8vIGNvbnN0IGl0ZXIgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3IodGhpcywgMSwgKG5vZGUpID0+IGhhc0NsYXNzKG5vZGUsIG5hbWUpID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFKVxuICAgIHJldHVybiBbIC4uLml0ZXIgXVxuICB9XG59XG5cbmV4cG9ydCB7IGVsZW1lbnRBY2Nlc3MgfVxuIiwiLy8gQHRzLWNoZWNrXG5pbXBvcnQgeyBTVkdMZW5ndGggfSBmcm9tICcuL1NWR0xlbmd0aC5qcydcblxuZXhwb3J0IGNsYXNzIFNWR0FuaW1hdGVkTGVuZ3RoIHtcbiAgYmFzZVZhbFxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICB0aGlzLmJhc2VWYWwgPSBuZXcgU1ZHTGVuZ3RoKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpXG4gIH1cblxuICBnZXQgYW5pbVZhbCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FuaW1WYWwgaXMgbm90IGltcGxlbWVudGVkJylcbiAgfVxufVxuIiwiLy8gQHRzLWNoZWNrXG5pbXBvcnQgeyBTVkdBbmltYXRlZExlbmd0aCB9IGZyb20gJy4vU1ZHQW5pbWF0ZWRMZW5ndGguanMnXG5pbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcblxuZXhwb3J0IGNsYXNzIFNWR0NpcmNsZUVsZW1lbnQgZXh0ZW5kcyBTVkdHcmFwaGljc0VsZW1lbnQge1xuICBjeCA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAnY3gnKVxuICBjeSA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAnY3knKVxuICByID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICdyJylcbn1cbiIsImltcG9ydCB7IEVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50LmpzJ1xuZXhwb3J0IGNsYXNzIFNWR0VsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgZ2V0IG93bmVyU1ZHRWxlbWVudCAoKSB7XG4gICAgbGV0IHBhcmVudCA9IHRoaXNcbiAgICB3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlKSkge1xuICAgICAgaWYgKCdzdmcnID09IHBhcmVudC5ub2RlTmFtZSkge1xuICAgICAgICByZXR1cm4gcGFyZW50XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBnZXQgdmlld3BvcnRFbGVtZW50ICgpIHtcbiAgICBsZXQgcGFyZW50ID0gdGhpc1xuICAgIHdoaWxlICgocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUpKSB7XG4gICAgICAvLyBUT0RPOiBhbmQgb3RoZXJzXG4gICAgICBpZiAoWyAnc3ZnJywgJ3N5bWJvbCcgXS5pbmNsdWRlcyhwYXJlbnQubm9kZU5hbWUpKSB7XG4gICAgICAgIHJldHVybiBwYXJlbnRcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuIiwiLy8gQHRzLWNoZWNrXG5pbXBvcnQgeyBTVkdBbmltYXRlZExlbmd0aCB9IGZyb20gJy4vU1ZHQW5pbWF0ZWRMZW5ndGguanMnXG5pbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcblxuZXhwb3J0IGNsYXNzIFNWR0VsbGlwc2VFbGVtZW50IGV4dGVuZHMgU1ZHR3JhcGhpY3NFbGVtZW50IHtcbiAgY3ggPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ2N4JylcbiAgY3kgPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ2N5JylcbiAgcnggPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3J4JylcbiAgcnkgPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3J5Jylcbn1cbiIsIi8vIEB0cy1jaGVja1xuXG5pbXBvcnQgeyBTVkdBbmltYXRlZExlbmd0aCB9IGZyb20gJy4vU1ZHQW5pbWF0ZWRMZW5ndGguanMnXG5pbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcblxuZXhwb3J0IGNsYXNzIFNWR0ZvcmVpZ25PYmplY3RFbGVtZW50IGV4dGVuZHMgU1ZHR3JhcGhpY3NFbGVtZW50IHtcbiAgeCA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAneCcpXG4gIHkgPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3knKVxuICB3aWR0aCA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAnd2lkdGgnKVxuICBoZWlnaHQgPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ2hlaWdodCcpXG59XG4iLCJpbXBvcnQgeyBTVkdFbGVtZW50IH0gZnJvbSAnLi9TVkdFbGVtZW50LmpzJ1xuaW1wb3J0IHsgZ2V0U2VnbWVudHMgfSBmcm9tICcuLi8uLi91dGlscy9iYm94VXRpbHMuanMnXG5pbXBvcnQgKiBhcyByZWdleCBmcm9tICcuLi8uLi91dGlscy9yZWdleC5qcydcbmltcG9ydCB7IFNWR01hdHJpeCB9IGZyb20gJy4vU1ZHTWF0cml4LmpzJ1xuXG4vLyBNYXAgbWF0cml4IGFycmF5IHRvIG9iamVjdFxuZnVuY3Rpb24gYXJyYXlUb01hdHJpeCAoYSkge1xuICByZXR1cm4geyBhOiBhWzBdLCBiOiBhWzFdLCBjOiBhWzJdLCBkOiBhWzNdLCBlOiBhWzRdLCBmOiBhWzVdIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNWR0dyYXBoaWNzRWxlbWVudCBleHRlbmRzIFNWR0VsZW1lbnQge1xuICAvLyBUT0RPOiBodHRwczovL3d3dy53My5vcmcvVFIvU1ZHMi9jb29yZHMuaHRtbCNDb21wdXRpbmdBVmlld3BvcnRzVHJhbnNmb3JtXG4gIGdlbmVyYXRlVmlld0JveE1hdHJpeCAoKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS92aWV3Qm94XG4gICAgaWYgKCFbICdtYXJrZXInLCAnc3ltYm9sJywgJ3BhdHRlcm4nLCAnc3ZnJywgJ3ZpZXcnIF0uaW5jbHVkZXModGhpcy5ub2RlTmFtZSkpIHtcbiAgICAgIHJldHVybiBuZXcgU1ZHTWF0cml4KClcbiAgICB9XG5cbiAgICBsZXQgdmlldyA9ICh0aGlzLmdldEF0dHJpYnV0ZSgndmlld0JveCcpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLm1hcChwYXJzZUZsb2F0KS5maWx0ZXIoZWwgPT4gIWlzTmFOKGVsKSlcbiAgICBjb25zdCB3aWR0aCA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykpIHx8IDBcbiAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKSkgfHwgMFxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cmlidXRlKCd4JykpIHx8IDBcbiAgICBjb25zdCB5ID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHJpYnV0ZSgneScpKSB8fCAwXG5cbiAgICAvLyBUT0RPOiBJZiBubyB3aWR0aCBhbmQgaGVpZ2h0IGlzIGdpdmVuLCB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBvdXRlciBzdmcgZWxlbWVudCBpcyB1c2VkXG4gICAgaWYgKCF3aWR0aCB8fCAhaGVpZ2h0KSB7XG4gICAgICByZXR1cm4gbmV3IFNWR01hdHJpeCgpLnRyYW5zbGF0ZSh4LCB5KVxuICAgIH1cblxuICAgIGlmICh2aWV3Lmxlbmd0aCAhPT0gNCkge1xuICAgICAgdmlldyA9IFsgMCwgMCwgd2lkdGgsIGhlaWdodCBdXG4gICAgfVxuXG4gICAgLy8gZmlyc3QgYXBwbHkgeCBhbmQgeSBpZiBuZXN0ZWQsIHRoZW4gdmlld2JveCBzY2FsZSwgdGhlbiB2aWV3Qm94IG1vdmVcbiAgICByZXR1cm4gbmV3IFNWR01hdHJpeCgpLnRyYW5zbGF0ZSh4LCB5KS5zY2FsZSh3aWR0aCAvIHZpZXdbMl0sIGhlaWdodCAvIHZpZXdbM10pLnRyYW5zbGF0ZSgtdmlld1swXSwgLXZpZXdbMV0pXG4gIH1cblxuICBnZXRCQm94ICgpIHtcbiAgICByZXR1cm4gZ2V0U2VnbWVudHModGhpcykuYmJveCgpXG4gIH1cblxuICAvLyBUT0RPOiBUaGlzIG1ldGhvZCBhY3R1YWxseSBleGlzdHMgb24gYWxsIEVsZW1lbnRzXG4gIGdldEJvdW5kaW5nQ2xpZW50UmVjdCAoKSB7XG4gICAgLy8gVGhlIGJvdW5kaW5nIGNsaWVudCByZWN0IHRha2VzIHRoZSBzY3JlZW4gY3RtIG9mIHRoZSBlbGVtZW50XG4gICAgLy8gYW5kIGNvbnZlcnRzIHRoZSBib3VuZGluZyBib3ggd2l0aCBpdFxuXG4gICAgLy8gaG93ZXZlciwgbm9ybWFsIGJvdW5kaW5nIGNvbnNpc3RzIG9mOlxuICAgIC8vIC0gYWxsIGNoaWxkcmVuIHRyYW5zZm9ybWVkXG4gICAgLy8gLSB0aGUgdmlld2JveCBvZiB0aGUgZWxlbWVudCBpZiBhdmFpbGFibGVcblxuICAgIC8vIFRoZSBib3VuZGluZ0NsaWVudFJlY3QgaXMgbm90IGFmZmVjdGVkIGJ5IGl0cyBvd24gdmlld2JveFxuICAgIC8vIFNvIHdlIGFwcGx5IG9ubHkgb3VyIG93biB0cmFuc2Zvcm1hdGlvbnMgYW5kIHBhcmVudHMgc2NyZWVuQ1RNXG5cbiAgICBsZXQgbSA9IHRoaXMubWF0cml4aWZ5KClcblxuICAgIGlmICh0aGlzLnBhcmVudE5vZGUgJiYgdGhpcy5wYXJlbnROb2RlLm5vZGVOYW1lICE9PSAnI2RvY3VtZW50Jykge1xuICAgICAgbSA9IHRoaXMucGFyZW50Tm9kZS5nZXRTY3JlZW5DVE0oKS5tdWx0aXBseShtKVxuICAgIH1cblxuICAgIC8vIGxldCBtID0gdGhpcy5nZXRTY3JlZW5DVE0oKVxuXG4gICAgLy8gVGhlcmUgYXJlIGEgZmV3IGV4dHJhIHJ1bGVzIHJlZ2FyZGluZyByYm94IGFuZCB0aGUgPHN2Zz4gZWxlbWVudFxuICAgIC8vIE5hbWVseSB0aGlzIGlzOlxuICAgIC8vIEJCb3ggaXMgY2FsY3VsYXRlZCBhcyBub3JtYWwgZm9yIGNvbnRhaW5lciBlbGVtZW50c1xuICAgIC8vIFJib3ggaXMgY2FsY3VsYXRlZCB3aXRoIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSA8c3ZnPlxuICAgIC8vIFRoaXMgY291bGQgYmUgYWxzbyB0cnVlIGZvciBzeW1ib2xzIHNvIHRoaXMgaXMgYTpcbiAgICAvLyBUb2RvOiAuLi5cbiAgICByZXR1cm4gZ2V0U2VnbWVudHModGhpcywgZmFsc2UsIHRydWUpLnRyYW5zZm9ybShtKS5iYm94KClcbiAgfVxuXG4gIGdldENUTSAoKSB7XG4gICAgbGV0IG0gPSB0aGlzLm1hdHJpeGlmeSgpXG5cbiAgICBsZXQgbm9kZSA9IHRoaXNcbiAgICB3aGlsZSAoKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSB7XG4gICAgICBpZiAoWyAnc3ZnJywgJ3N5bWJvbCcsICdpbWFnZScsICdwYXR0ZXJuJywgJ21hcmtlcicgXS5pbmRleE9mKG5vZGUubm9kZU5hbWUpID4gLTEpIGJyZWFrXG4gICAgICBtID0gbS5tdWx0aXBseShub2RlLm1hdHJpeGlmeSgpKVxuICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQnKSByZXR1cm4gdGhpcy5nZXRTY3JlZW5DVE0oKVxuICAgIH1cblxuICAgIHJldHVybiBub2RlLmdlbmVyYXRlVmlld0JveE1hdHJpeCgpLm11bHRpcGx5KG0pXG4gIH1cblxuICBnZXRJbm5lck1hdHJpeCAoKSB7XG4gICAgbGV0IG0gPSB0aGlzLm1hdHJpeGlmeSgpXG5cbiAgICBpZiAoWyAnc3ZnJywgJ3N5bWJvbCcsICdpbWFnZScsICdwYXR0ZXJuJywgJ21hcmtlcicgXS5pbmRleE9mKHRoaXMubm9kZU5hbWUpID4gLTEpIHtcbiAgICAgIG0gPSB0aGlzLmdlbmVyYXRlVmlld0JveE1hdHJpeCgpLm11bHRpcGx5KG0pXG4gICAgfVxuICAgIHJldHVybiBtXG4gIH1cblxuICBnZXRTY3JlZW5DVE0gKCkge1xuICAgIC8vIHJlZjogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM0NDUzN1xuICAgIC8vIFdlIGZvbGxvdyBDaHJvbWVzIGJlaGF2aW9yIGFuZCBpbmNsdWRlIHRoZSB2aWV3Ym94IGluIHRoZSBzY3JlZW5DVE1cbiAgICBjb25zdCBtID0gdGhpcy5nZXRJbm5lck1hdHJpeCgpXG5cbiAgICAvLyBUT0RPOiBXZSBoYXZlIHRvIGxvb3AgdW50aWwgZG9jdW1lbnQsIGhvd2V2ZXIgaHRtbCBlbGVtZW50cyBkb250IGhhdmUgZ2V0U2NyZWVuQ1RNIGltcGxlbWVudGVkXG4gICAgLy8gdGhleSBhbHNvIGRvbnQgaGF2ZSBhIHRyYW5zZm9ybSBhdHRyaWJ1dGUuIFRoZXJlZm9yZSB3ZSBuZWVkIGEgZGlmZmVyZW50IHdheSBvZiBmaWd1cmluZyBvdXQgdGhlaXIgKGNzcykgdHJhbnNmb3JtXG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSAmJiB0aGlzLnBhcmVudE5vZGUgaW5zdGFuY2VvZiBTVkdHcmFwaGljc0VsZW1lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudE5vZGUuZ2V0U2NyZWVuQ1RNKCkubXVsdGlwbHkobSlcbiAgICB9XG5cbiAgICByZXR1cm4gbVxuICB9XG5cbiAgbWF0cml4aWZ5ICgpIHtcbiAgICBjb25zdCBtYXRyaXggPSAodGhpcy5nZXRBdHRyaWJ1dGUoJ3RyYW5zZm9ybScpIHx8ICcnKS50cmltKClcbiAgICAgIC8vIHNwbGl0IHRyYW5zZm9ybWF0aW9uc1xuICAgICAgLnNwbGl0KHJlZ2V4LnRyYW5zZm9ybXMpLnNsaWNlKDAsIC0xKS5tYXAoZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAvLyBnZW5lcmF0ZSBrZXkgPT4gdmFsdWUgcGFpcnNcbiAgICAgICAgY29uc3Qga3YgPSBzdHIudHJpbSgpLnNwbGl0KCcoJylcbiAgICAgICAgcmV0dXJuIFsga3ZbMF0udHJpbSgpLCBrdlsxXS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLm1hcChmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBwYXJzZUZsb2F0KHN0ci50cmltKCkpIH0pIF1cbiAgICAgIH0pXG4gICAgICAvLyBtZXJnZSBldmVyeSB0cmFuc2Zvcm1hdGlvbiBpbnRvIG9uZSBtYXRyaXhcbiAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKG1hdHJpeCwgdHJhbnNmb3JtKSB7XG5cbiAgICAgICAgaWYgKHRyYW5zZm9ybVswXSA9PT0gJ21hdHJpeCcpIHJldHVybiBtYXRyaXgubXVsdGlwbHkoYXJyYXlUb01hdHJpeCh0cmFuc2Zvcm1bMV0pKVxuICAgICAgICByZXR1cm4gbWF0cml4W3RyYW5zZm9ybVswXV0uYXBwbHkobWF0cml4LCB0cmFuc2Zvcm1bMV0pXG5cbiAgICAgIH0sIG5ldyBTVkdNYXRyaXgoKSlcblxuICAgIHJldHVybiBtYXRyaXhcbiAgfVxuXG4gIGdldCB0cmFuc2Zvcm0gKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJylcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBTVkdBbmltYXRlZExlbmd0aCB9IGZyb20gJy4vU1ZHQW5pbWF0ZWRMZW5ndGguanMnXG5pbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcblxuZXhwb3J0IGNsYXNzIFNWR0ltYWdlRWxlbWVudCBleHRlbmRzIFNWR0dyYXBoaWNzRWxlbWVudCB7XG4gIHggPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3gnKVxuICB5ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICd5JylcbiAgd2lkdGggPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3dpZHRoJylcbiAgaGVpZ2h0ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICdoZWlnaHQnKVxufVxuIiwiLy8gQHRzLWNoZWNrXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgeyBleHRlbmRTdGF0aWMgfSBmcm9tICcuLi8uLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xuXG5jb25zdCB1bml0VHlwZXMgPSB7XG4gIFNWR19MRU5HVEhUWVBFX1VOS05PV046IDAsXG4gIFNWR19MRU5HVEhUWVBFX05VTUJFUjogMSxcbiAgU1ZHX0xFTkdUSFRZUEVfUEVSQ0VOVEFHRTogMixcbiAgU1ZHX0xFTkdUSFRZUEVfRU1TOiAzLFxuICBTVkdfTEVOR1RIVFlQRV9FWFM6IDQsXG4gIFNWR19MRU5HVEhUWVBFX1BYOiA1LFxuICBTVkdfTEVOR1RIVFlQRV9DTTogNixcbiAgU1ZHX0xFTkdUSFRZUEVfTU06IDcsXG4gIFNWR19MRU5HVEhUWVBFX0lOOiA4LFxuICBTVkdfTEVOR1RIVFlQRV9QVDogOSxcbiAgU1ZHX0xFTkdUSFRZUEVfUEM6IDEwLFxufVxuXG5jb25zdCB1bml0QnlTdHJpbmcgPSB7XG4gIFsnJ106IHVuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9OVU1CRVIsXG4gIFsnJSddOiB1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfUEVSQ0VOVEFHRSxcbiAgWydlbSddOiB1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfRU1TLFxuICBbJ2V4J106IHVuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9FWFMsXG4gIFsncHgnXTogdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX1BYLFxuICBbJ2NtJ106IHVuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9DTSxcbiAgWydtbSddOiB1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfTU0sXG4gIFsnaW4nXTogdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX0lOLFxuICBbJ3B0J106IHVuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9QVCxcbiAgWydwYyddOiB1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfUEMsXG59XG5cbmNvbnN0IHVuaXRTdHJpbmdCeUNvbnN0YW50ID0gbmV3IE1hcChcbiAgT2JqZWN0LmVudHJpZXModW5pdEJ5U3RyaW5nKS5tYXAoKFt1bml0U3RyaW5nLCB1bml0Q29uc3RhbnRdKSA9PiBbXG4gICAgdW5pdENvbnN0YW50LFxuICAgIHVuaXRTdHJpbmcsXG4gIF0pXG4pXG5cbmNvbnN0IHVuaXRGYWN0b3JzID0gbmV3IE1hcChbXG4gIFt1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfTlVNQkVSLCAxXSxcbiAgW3VuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9QRVJDRU5UQUdFLCBOYU5dLFxuICBbdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX0VNUywgTmFOXSxcbiAgW3VuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9FWFMsIE5hTl0sXG4gIFt1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfUFgsIDFdLFxuICBbdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX0NNLCA2XSxcbiAgW3VuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9NTSwgOTYgLyAyNS40XSxcbiAgW3VuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9JTiwgOTZdLFxuICBbdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX1BULCA0IC8gM10sXG4gIFt1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfUEMsIDE2XSxcbl0pXG5cbmNvbnN0IHZhbHVlUGF0dGVybiA9IC9eXFxzKihbKy1dP1swLTldKlsuXT9bMC05XSsoPzplWystXT9bMC05XSspPykoZW18ZXh8cHh8aW58Y218bW18cHR8cGN8JSk/XFxzKiQvaTtcblxuZXhwb3J0IGNsYXNzIFNWR0xlbmd0aCB7XG4gIGVsZW1lbnRcbiAgYXR0cmlidXRlTmFtZVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZU5hbWVcbiAgICovXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5hdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlTmFtZVxuICB9XG5cbiAgZ2V0IHVuaXRUeXBlKCkge1xuICAgIHJldHVybiBwYXJzZVZhbHVlKHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUodGhpcy5hdHRyaWJ1dGVOYW1lKSlbMV1cbiAgfVxuXG4gIGdldCB2YWx1ZSgpIHtcbiAgICBjb25zdCBbdmFsdWUsIHVuaXRdID0gcGFyc2VWYWx1ZShcbiAgICAgIHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUodGhpcy5hdHRyaWJ1dGVOYW1lKVxuICAgIClcbiAgICByZXR1cm4gdmFsdWUgKiBnZXRVbml0RmFjdG9yKHVuaXQpXG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICBjb25zdCB1bml0RmFjdG9yID0gZ2V0VW5pdEZhY3Rvcih0aGlzLnVuaXRUeXBlKVxuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICB0aGlzLmF0dHJpYnV0ZU5hbWUsXG4gICAgICB2YWx1ZSAvIHVuaXRGYWN0b3IgKyB1bml0U3RyaW5nKHRoaXMpXG4gICAgKVxuICB9XG5cbiAgZ2V0IHZhbHVlSW5TcGVjaWZpZWRVbml0cygpIHtcbiAgICByZXR1cm4gcGFyc2VWYWx1ZSh0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKHRoaXMuYXR0cmlidXRlTmFtZSkpWzBdXG4gIH1cblxuICBzZXQgdmFsdWVJblNwZWNpZmllZFVuaXRzKHZhbHVlKSB7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJpYnV0ZU5hbWUsIHZhbHVlICsgdW5pdFN0cmluZyh0aGlzKSlcbiAgfVxuXG4gIGdldCB2YWx1ZUFzU3RyaW5nKCkge1xuICAgIC8vIERvIG5vdCBzaW1wbHkgdXNlIGdldEF0dHJpYnV0ZSgpIGFzIHRoaXMgZnVuY3Rpb24gaGFzIHRvIHJldHVybiBhIHN0cmluZ1xuICAgIC8vIHRoYXQgaXMgYSB2YWxpZCByZXByZXNlbnRhdGlvbiBvZiB0aGUgdXNlZCB2YWx1ZS5cbiAgICByZXR1cm4gdGhpcy52YWx1ZUluU3BlY2lmaWVkVW5pdHMgKyB1bml0U3RyaW5nKHRoaXMpXG4gIH1cblxuICBzZXQgdmFsdWVBc1N0cmluZyh2YWx1ZVN0cmluZykge1xuICAgIGNvbnN0IFt2YWx1ZSwgdW5pdF0gPSBwYXJzZVZhbHVlKHZhbHVlU3RyaW5nLCBmYWxzZSlcbiAgICBjb25zdCB1bml0U3RyaW5nID0gdW5pdFN0cmluZ0J5Q29uc3RhbnQuZ2V0KHVuaXQpIHx8ICcnXG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSh0aGlzLmF0dHJpYnV0ZU5hbWUsIHZhbHVlICsgdW5pdFN0cmluZylcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IHZhbHVlU3RyaW5nXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGZhbGxiYWNrICBJZiBzZXQgdG8gYGZhbHNlYCBjYXVzZXMgYW4gZXJyb3IgdG8gYmUgdGhyb3duIGlmXG4gKiBgdmFsdWVTdHJpbmdgIGNhbiBub3QgYmUgcGFyc2VkIHByb3Blcmx5LiBPdGhlcndpc2UgdGhlIHJldHVybmVkIHZhbHVlIGZhbGxzXG4gKiBiYWNrIHRvIDAgYW5kIHRoZSB1bml0IGZhbGxzIGJhY2sgdG8gYFNWR19MRU5HVEhUWVBFX05VTUJFUmAuXG4gKiBAcmV0dXJuIHtbbnVtYmVyLCBudW1iZXJdfSAgVmFsdWUgYW5kIHVuaXQuIEZvciB1bmtub3duIHVuaXRzLCBpZiB0aGVcbiAqIGF0dHJpYnV0ZSBpcyBub3Qgb2YgdGhlIGNvcnJlY3QgZm9ybWF0IG9yIGlmIHRoZSBhdHRyaWJ1dGUgaXMgbm90IHByZXNlbnQgb25cbiAqIHRoZSBlbGVtZW50LCB2YWx1ZSAwIGFuZCB1bml0IFNWR19MRU5HVEhUWVBFX05VTUJFUiBhcmUgcmV0dXJuZWQuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlVmFsdWUodmFsdWVTdHJpbmcsIGZhbGxiYWNrID0gdHJ1ZSkge1xuICBjb25zdCBbLCByYXdWYWx1ZSwgcmF3VW5pdF0gPSAodmFsdWVTdHJpbmcgfHwgJycpLm1hdGNoKHZhbHVlUGF0dGVybikgfHwgW11cbiAgY29uc3QgdW5pdCA9IHVuaXRCeVN0cmluZ1socmF3VW5pdCB8fCAnJykudG9Mb3dlckNhc2UoKV1cbiAgaWYgKHJhd1ZhbHVlICE9PSB1bmRlZmluZWQgJiYgdW5pdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFtwYXJzZUZsb2F0KHJhd1ZhbHVlKSwgdW5pdF1cbiAgfVxuICBpZiAoZmFsbGJhY2spIHtcbiAgICAvLyBGb3IgdW5rbm93biB1bml0cyBvciB1bnBhcnNhYmxlIGF0dHJpYnV0ZXMsIGJyb3dzZXJzIGZhbGwgYmFjayB0byB2YWx1ZSAwXG4gICAgcmV0dXJuIFswLCB1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfTlVNQkVSXVxuICB9XG4gIHRocm93IG5ldyBFcnJvcignQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkJylcbn1cblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gdW5pdCAgVW5pdCBjb25zdGFudFxuICovXG5mdW5jdGlvbiBnZXRVbml0RmFjdG9yKHVuaXQpIHtcbiAgY29uc3QgdW5pdEZhY3RvciA9IHVuaXRGYWN0b3JzLmdldCh1bml0KVxuICBpZiAodW5pdEZhY3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHVuaXRGYWN0b3IgKyAnIGlzIG5vdCBhIGtub3duIHVuaXQgY29uc3RhbnQnKVxuICB9XG4gIGlmIChpc05hTih1bml0RmFjdG9yKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5pdCAke3VuaXRTdHJpbmdCeUNvbnN0YW50LmdldCh1bml0KX0gaXMgbm90IHN1cHBvcnRlZGApXG4gIH1cbiAgcmV0dXJuIHVuaXRGYWN0b3Jcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1NWR0xlbmd0aH0gc3ZnTGVuZ3RoXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHVuaXRTdHJpbmcoc3ZnTGVuZ3RoKSB7XG4gIHJldHVybiB1bml0U3RyaW5nQnlDb25zdGFudC5nZXQoc3ZnTGVuZ3RoLnVuaXRUeXBlKSB8fCAnJ1xufVxuXG5leHRlbmRTdGF0aWMoU1ZHTGVuZ3RoLCB1bml0VHlwZXMpXG4iLCIvLyBAdHMtY2hlY2tcbmltcG9ydCB7IFNWR0FuaW1hdGVkTGVuZ3RoIH0gZnJvbSAnLi9TVkdBbmltYXRlZExlbmd0aC5qcydcbmltcG9ydCB7IFNWR0dyYXBoaWNzRWxlbWVudCB9IGZyb20gJy4vU1ZHR3JhcGhpY3NFbGVtZW50LmpzJ1xuXG5leHBvcnQgY2xhc3MgU1ZHTGluZUVsZW1lbnQgZXh0ZW5kcyBTVkdHcmFwaGljc0VsZW1lbnQge1xuICB4MSA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAneDEnKVxuICB5MSA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAneTEnKVxuICB4MiA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAneDInKVxuICB5MiA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAneTInKVxufVxuIiwiY29uc3QgcmFkaWFucyA9IGZ1bmN0aW9uIChkKSB7XG4gIHJldHVybiBkICUgMzYwICogTWF0aC5QSSAvIDE4MFxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWF0cml4RmFjdG9yeSAoYSwgYiwgYywgZCwgZSwgZikge1xuICB2YXIgciA9IG5ldyBTVkdNYXRyaXgoKVxuICByLmEgPSBhXG4gIHIuYiA9IGJcbiAgci5jID0gY1xuICByLmQgPSBkXG4gIHIuZSA9IGVcbiAgci5mID0gZlxuICByZXR1cm4gclxufVxuXG5leHBvcnQgY2xhc3MgU1ZHTWF0cml4IHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuYSA9IHRoaXMuZCA9IDFcbiAgICB0aGlzLmIgPSB0aGlzLmMgPSB0aGlzLmUgPSB0aGlzLmYgPSAwXG4gIH1cblxuICBpbnZlcnNlICgpIHtcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgcGFyYW1ldGVycyBvdXQgb2YgdGhlIG1hdHJpeFxuICAgIHZhciBhID0gdGhpcy5hXG4gICAgdmFyIGIgPSB0aGlzLmJcbiAgICB2YXIgYyA9IHRoaXMuY1xuICAgIHZhciBkID0gdGhpcy5kXG4gICAgdmFyIGUgPSB0aGlzLmVcbiAgICB2YXIgZiA9IHRoaXMuZlxuXG4gICAgLy8gSW52ZXJ0IHRoZSAyeDIgbWF0cml4IGluIHRoZSB0b3AgbGVmdFxuICAgIHZhciBkZXQgPSBhICogZCAtIGIgKiBjXG4gICAgaWYgKCFkZXQpIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGludmVydCAnICsgdGhpcylcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgdG9wIDJ4MiBtYXRyaXhcbiAgICB2YXIgbmEgPSBkIC8gZGV0XG4gICAgdmFyIG5iID0gLWIgLyBkZXRcbiAgICB2YXIgbmMgPSAtYyAvIGRldFxuICAgIHZhciBuZCA9IGEgLyBkZXRcblxuICAgIC8vIEFwcGx5IHRoZSBpbnZlcnRlZCBtYXRyaXggdG8gdGhlIHRvcCByaWdodFxuICAgIHZhciBuZSA9IC0obmEgKiBlICsgbmMgKiBmKVxuICAgIHZhciBuZiA9IC0obmIgKiBlICsgbmQgKiBmKVxuXG4gICAgLy8gQ29uc3RydWN0IHRoZSBpbnZlcnRlZCBtYXRyaXhcbiAgICB0aGlzLmEgPSBuYVxuICAgIHRoaXMuYiA9IG5iXG4gICAgdGhpcy5jID0gbmNcbiAgICB0aGlzLmQgPSBuZFxuICAgIHRoaXMuZSA9IG5lXG4gICAgdGhpcy5mID0gbmZcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBtdWx0aXBseSAobSkge1xuICAgIHZhciByID0gbmV3IFNWR01hdHJpeCgpXG4gICAgci5hID0gdGhpcy5hICogbS5hICsgdGhpcy5jICogbS5iICsgdGhpcy5lICogMFxuICAgIHIuYiA9IHRoaXMuYiAqIG0uYSArIHRoaXMuZCAqIG0uYiArIHRoaXMuZiAqIDBcbiAgICByLmMgPSB0aGlzLmEgKiBtLmMgKyB0aGlzLmMgKiBtLmQgKyB0aGlzLmUgKiAwXG4gICAgci5kID0gdGhpcy5iICogbS5jICsgdGhpcy5kICogbS5kICsgdGhpcy5mICogMFxuICAgIHIuZSA9IHRoaXMuYSAqIG0uZSArIHRoaXMuYyAqIG0uZiArIHRoaXMuZSAqIDFcbiAgICByLmYgPSB0aGlzLmIgKiBtLmUgKyB0aGlzLmQgKiBtLmYgKyB0aGlzLmYgKiAxXG4gICAgcmV0dXJuIHJcbiAgfVxuXG4gIHJvdGF0ZSAociwgeCwgeSkge1xuICAgIHIgPSByICUgMzYwICogTWF0aC5QSSAvIDE4MFxuICAgIHJldHVybiB0aGlzLm11bHRpcGx5KG1hdHJpeEZhY3RvcnkoXG4gICAgICBNYXRoLmNvcyhyKSxcbiAgICAgIE1hdGguc2luKHIpLFxuICAgICAgLU1hdGguc2luKHIpLFxuICAgICAgTWF0aC5jb3MociksXG4gICAgICB4ID8gLU1hdGguY29zKHIpICogeCArIE1hdGguc2luKHIpICogeSArIHggOiAwLFxuICAgICAgeSA/IC1NYXRoLnNpbihyKSAqIHggLSBNYXRoLmNvcyhyKSAqIHkgKyB5IDogMFxuICAgICkpXG4gIH1cblxuICBzY2FsZSAoc2NhbGVYLCBzY2FsZVkgPSBzY2FsZVgpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseShtYXRyaXhGYWN0b3J5KHNjYWxlWCwgMCwgMCwgc2NhbGVZLCAwLCAwKSlcbiAgfVxuXG4gIHNrZXcgKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseShtYXRyaXhGYWN0b3J5KDEsIE1hdGgudGFuKHJhZGlhbnMoeSkpLCBNYXRoLnRhbihyYWRpYW5zKHgpKSwgMSwgMCwgMCkpXG4gIH1cblxuICBza2V3WCAoeCkge1xuICAgIHJldHVybiB0aGlzLnNrZXcoeCwgMClcbiAgfVxuXG4gIHNrZXdZICh5KSB7XG4gICAgcmV0dXJuIHRoaXMuc2tldygwLCB5KVxuICB9XG5cbiAgdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiAnU1ZHTWF0cml4J1xuICB9XG5cbiAgdHJhbnNsYXRlICh4ID0gMCwgeSA9IDApIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseShtYXRyaXhGYWN0b3J5KDEsIDAsIDAsIDEsIHgsIHkpKVxuICB9XG5cbn1cbiIsImltcG9ydCB7IFNWR0dyYXBoaWNzRWxlbWVudCB9IGZyb20gJy4vU1ZHR3JhcGhpY3NFbGVtZW50LmpzJ1xuaW1wb3J0ICogYXMgcGF0aFV0aWxzIGZyb20gJy4uLy4uL3V0aWxzL3BhdGhVdGlscy5qcydcblxuZXhwb3J0IGNsYXNzIFNWR1BhdGhFbGVtZW50IGV4dGVuZHMgU1ZHR3JhcGhpY3NFbGVtZW50IHtcbiAgZ2V0UG9pbnRBdExlbmd0aCAobGVuKSB7XG4gICAgcmV0dXJuIHBhdGhVdGlscy5wb2ludEF0TGVuZ3RoKHRoaXMuZ2V0QXR0cmlidXRlKCdkJyksIGxlbilcbiAgfVxuXG4gIGdldFRvdGFsTGVuZ3RoICgpIHtcbiAgICByZXR1cm4gcGF0aFV0aWxzLmxlbmd0aCh0aGlzLmdldEF0dHJpYnV0ZSgnZCcpKVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU1ZHUG9pbnQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy54ID0gMFxuICAgIHRoaXMueSA9IDBcbiAgfVxuXG4gIG1hdHJpeFRyYW5zZm9ybSAobSkge1xuICAgIHZhciByID0gbmV3IFNWR1BvaW50KClcbiAgICByLnggPSBtLmEgKiB0aGlzLnggKyBtLmMgKiB0aGlzLnkgKyBtLmUgKiAxXG4gICAgci55ID0gbS5iICogdGhpcy54ICsgbS5kICogdGhpcy55ICsgbS5mICogMVxuICAgIHJldHVybiByXG4gIH1cbn1cbiIsIi8vIEB0cy1jaGVja1xuaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9TVkdHcmFwaGljc0VsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdBbmltYXRlZExlbmd0aCB9IGZyb20gJy4vU1ZHQW5pbWF0ZWRMZW5ndGguanMnXG5cbmV4cG9ydCBjbGFzcyBTVkdSZWN0RWxlbWVudCBleHRlbmRzIFNWR0dyYXBoaWNzRWxlbWVudCB7XG4gIHggPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3gnKVxuICB5ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICd5JylcbiAgd2lkdGggPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3dpZHRoJylcbiAgaGVpZ2h0ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICdoZWlnaHQnKVxuICByeCA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAncngnKVxuICByeSA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAncnknKVxufVxuIiwiaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9TVkdHcmFwaGljc0VsZW1lbnQuanMnXG5pbXBvcnQgeyBCb3ggfSBmcm9tICcuLi8uLi9vdGhlci9Cb3guanMnXG5pbXBvcnQgeyBTVkdNYXRyaXggfSBmcm9tICcuL1NWR01hdHJpeC5qcydcbmltcG9ydCB7IFNWR1BvaW50IH0gZnJvbSAnLi9TVkdQb2ludC5qcydcblxuZXhwb3J0IGNsYXNzIFNWR1NWR0VsZW1lbnQgZXh0ZW5kcyBTVkdHcmFwaGljc0VsZW1lbnQge1xuICBjcmVhdGVTVkdNYXRyaXggKCkge1xuICAgIHJldHVybiBuZXcgU1ZHTWF0cml4KClcbiAgfVxuXG4gIGNyZWF0ZVNWR1BvaW50ICgpIHtcbiAgICByZXR1cm4gbmV3IFNWR1BvaW50KClcbiAgfVxuXG4gIGNyZWF0ZVNWR1JlY3QgKCkge1xuICAgIHJldHVybiBuZXcgQm94KClcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBTVkdBbmltYXRlZExlbmd0aCB9IGZyb20gJy4vU1ZHQW5pbWF0ZWRMZW5ndGguanMnXG5pbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcblxuZXhwb3J0IGNsYXNzIFNWR1RleHRDb250ZW50RWxlbWVudCBleHRlbmRzIFNWR0dyYXBoaWNzRWxlbWVudCB7XG4gIHRleHRXaWR0aCA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAndGV4dFdpZHRoJylcblxuICBnZXRDb21wdXRlZFRleHRMZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmdldEJCb3goKS53aWR0aFxuICB9XG59XG4iLCJpbXBvcnQgeyBXaW5kb3cgfSBmcm9tICcuL2RvbS9XaW5kb3cuanMnXG5pbXBvcnQgeyBET01JbXBsZW1lbnRhdGlvbiB9IGZyb20gJy4vZG9tL0RvY3VtZW50LmpzJ1xuaW1wb3J0ICogYXMgbmFtZXNwYWNlcyBmcm9tICcuL3V0aWxzL25hbWVzcGFjZXMuanMnXG5cbmNvbnN0IHsgY3JlYXRlRG9jdW1lbnQsIGNyZWF0ZUhUTUxEb2N1bWVudCB9ID0gRE9NSW1wbGVtZW50YXRpb25cblxuY29uc3QgY3JlYXRlV2luZG93ID0gKC4uLmFyZ3MpID0+IHtcbiAgY29uc3Qgd2luZG93ID0gbmV3IFdpbmRvdygpXG4gIGNvbnN0IGRvY3VtZW50ID0gY3JlYXRlRG9jdW1lbnQoLi4uYXJncylcbiAgd2luZG93LmRvY3VtZW50ID0gZG9jdW1lbnRcbiAgZG9jdW1lbnQuZGVmYXVsdFZpZXcgPSB3aW5kb3dcbiAgcmV0dXJuIHdpbmRvd1xufVxuXG5jb25zdCBjcmVhdGVIVE1MV2luZG93ID0gKHRpdGxlKSA9PiB7XG4gIGNvbnN0IHdpbmRvdyA9IG5ldyBXaW5kb3coKVxuICBjb25zdCBkb2N1bWVudCA9IERPTUltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCh0aXRsZSlcbiAgd2luZG93LmRvY3VtZW50ID0gZG9jdW1lbnRcbiAgZG9jdW1lbnQuZGVmYXVsdFZpZXcgPSB3aW5kb3dcbiAgcmV0dXJuIHdpbmRvd1xufVxuXG5jb25zdCBjcmVhdGVTVkdXaW5kb3cgPSAoKSA9PiB7XG4gIHJldHVybiBjcmVhdGVXaW5kb3cobmFtZXNwYWNlcy5zdmcsICdzdmcnKVxufVxuXG5jb25zdCBjcmVhdGVTVkdEb2N1bWVudCA9ICgpID0+IHtcbiAgcmV0dXJuIGNyZWF0ZURvY3VtZW50KG5hbWVzcGFjZXMuc3ZnLCAnc3ZnJylcbn1cblxuZXhwb3J0IHtcbiAgY3JlYXRlRG9jdW1lbnQsXG4gIGNyZWF0ZUhUTUxEb2N1bWVudCxcbiAgY3JlYXRlU1ZHRG9jdW1lbnQsXG4gIGNyZWF0ZVdpbmRvdyxcbiAgY3JlYXRlSFRNTFdpbmRvdyxcbiAgY3JlYXRlU1ZHV2luZG93XG59XG4iLCJpbXBvcnQgKiBhcyByZWdleCBmcm9tICcuLi91dGlscy9yZWdleC5qcydcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi9Qb2ludC5qcydcblxuZXhwb3J0IGNsYXNzIEJveCB7XG4gIGNvbnN0cnVjdG9yIChzb3VyY2UpIHtcbiAgICB2YXIgYmFzZSA9IFsgMCwgMCwgMCwgMCBdXG4gICAgc291cmNlID0gdHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycgPyBzb3VyY2Uuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5tYXAocGFyc2VGbG9hdClcbiAgICAgIDogQXJyYXkuaXNBcnJheShzb3VyY2UpID8gc291cmNlXG4gICAgICA6IHR5cGVvZiBzb3VyY2UgPT09ICdvYmplY3QnID8gW1xuICAgICAgICBzb3VyY2UubGVmdCAhPSBudWxsID8gc291cmNlLmxlZnQgOiBzb3VyY2UueCxcbiAgICAgICAgc291cmNlLnRvcCAhPSBudWxsID8gc291cmNlLnRvcCA6IHNvdXJjZS55LFxuICAgICAgICBzb3VyY2Uud2lkdGgsXG4gICAgICAgIHNvdXJjZS5oZWlnaHRcbiAgICAgIF1cbiAgICAgIDogYXJndW1lbnRzLmxlbmd0aCA9PT0gNCA/IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgICAgOiBiYXNlXG5cbiAgICB0aGlzLnggPSB0aGlzLmxlZnQgPSBzb3VyY2VbMF1cbiAgICB0aGlzLnkgPSB0aGlzLnRvcCA9IHNvdXJjZVsxXVxuICAgIHRoaXMud2lkdGggPSBzb3VyY2VbMl1cbiAgICB0aGlzLmhlaWdodCA9IHNvdXJjZVszXVxuICAgIHRoaXMucmlnaHQgPSB0aGlzLmxlZnQgKyB0aGlzLndpZHRoXG4gICAgdGhpcy5ib3R0b20gPSB0aGlzLnRvcCArIHRoaXMuaGVpZ2h0XG4gIH1cblxuICAvLyBNZXJnZSByZWN0IGJveCB3aXRoIGFub3RoZXIsIHJldHVybiBhIG5ldyBpbnN0YW5jZVxuICBtZXJnZSAoYm94KSB7XG4gICAgaWYgKGJveCBpbnN0YW5jZW9mIE5vQm94KSByZXR1cm4gbmV3IEJveCh0aGlzKVxuXG4gICAgdmFyIHggPSBNYXRoLm1pbih0aGlzLngsIGJveC54KVxuICAgIHZhciB5ID0gTWF0aC5taW4odGhpcy55LCBib3gueSlcblxuICAgIHJldHVybiBuZXcgQm94KFxuICAgICAgeCwgeSxcbiAgICAgIE1hdGgubWF4KHRoaXMueCArIHRoaXMud2lkdGgsIGJveC54ICsgYm94LndpZHRoKSAtIHgsXG4gICAgICBNYXRoLm1heCh0aGlzLnkgKyB0aGlzLmhlaWdodCwgYm94LnkgKyBib3guaGVpZ2h0KSAtIHlcbiAgICApXG4gIH1cblxuICB0cmFuc2Zvcm0gKG0pIHtcbiAgICB2YXIgeE1pbiA9IEluZmluaXR5XG4gICAgdmFyIHhNYXggPSAtSW5maW5pdHlcbiAgICB2YXIgeU1pbiA9IEluZmluaXR5XG4gICAgdmFyIHlNYXggPSAtSW5maW5pdHlcblxuICAgIHZhciBwdHMgPSBbXG4gICAgICBuZXcgUG9pbnQodGhpcy54LCB0aGlzLnkpLFxuICAgICAgbmV3IFBvaW50KHRoaXMueCArIHRoaXMud2lkdGgsIHRoaXMueSksXG4gICAgICBuZXcgUG9pbnQodGhpcy54LCB0aGlzLnkgKyB0aGlzLmhlaWdodCksXG4gICAgICBuZXcgUG9pbnQodGhpcy54ICsgdGhpcy53aWR0aCwgdGhpcy55ICsgdGhpcy5oZWlnaHQpXG4gICAgXVxuXG4gICAgcHRzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgIHAgPSBwLnRyYW5zZm9ybShtKVxuICAgICAgeE1pbiA9IE1hdGgubWluKHhNaW4sIHAueClcbiAgICAgIHhNYXggPSBNYXRoLm1heCh4TWF4LCBwLngpXG4gICAgICB5TWluID0gTWF0aC5taW4oeU1pbiwgcC55KVxuICAgICAgeU1heCA9IE1hdGgubWF4KHlNYXgsIHAueSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIG5ldyBCb3goXG4gICAgICB4TWluLCB5TWluLFxuICAgICAgeE1heCAtIHhNaW4sXG4gICAgICB5TWF4IC0geU1pblxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTm9Cb3ggZXh0ZW5kcyBCb3gge1xuICAvLyBOb0JveCBoYXMgbm8gdmFsaWQgdmFsdWVzIHNvIGl0IGNhbnQgYmUgbWVyZ2VkXG4gIG1lcmdlIChib3gpIHtcbiAgICByZXR1cm4gYm94IGluc3RhbmNlb2YgTm9Cb3ggPyBuZXcgTm9Cb3goKSA6IG5ldyBCb3goYm94KVxuICB9XG5cbiAgdHJhbnNmb3JtIChtKSB7XG4gICAgcmV0dXJuIG5ldyBOb0JveCgpXG4gIH1cbn1cbiIsImltcG9ydCB7IHJlbW92ZVF1b3Rlcywgc3BsaXROb3RJbkJyYWNrZXRzIH0gZnJvbSAnLi4vdXRpbHMvc3RyVXRpbHMuanMnXG5pbXBvcnQgKiBhcyByZWdleCBmcm9tICcuLi91dGlscy9yZWdleC5qcydcbmltcG9ydCB7IGh0bWwgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xuXG5leHBvcnQgY2xhc3MgQ3NzUXVlcnkge1xuICBjb25zdHJ1Y3RvciAocXVlcnkpIHtcbiAgICBpZiAoQ3NzUXVlcnkuY2FjaGUuaGFzKHF1ZXJ5KSkge1xuICAgICAgdGhpcy5xdWVyaWVzID0gQ3NzUXVlcnkuY2FjaGUuZ2V0KHF1ZXJ5KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHF1ZXJpZXMgPSBzcGxpdE5vdEluQnJhY2tldHMocXVlcnksICcsJylcblxuICAgIHF1ZXJpZXMgPSBxdWVyaWVzLm1hcChxdWVyeSA9PiB7XG5cbiAgICAgIGxldCByb3VuZEJyYWNrZXRzID0gMFxuICAgICAgbGV0IHNxdWFyZUJyYWNrZXRzID0gMFxuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBzYW1lIGFzIGFib3ZlIGJ1dCBlYXNpZXJcbiAgICAgIHF1ZXJ5ID0gcXVlcnkucmVwbGFjZSgvWygpW1xcXT5+K10vZywgZnVuY3Rpb24gKGNoKSB7XG4gICAgICAgIGlmIChjaCA9PT0gJygnKSArK3JvdW5kQnJhY2tldHNcbiAgICAgICAgZWxzZSBpZiAoY2ggPT09ICcpJykgLS1yb3VuZEJyYWNrZXRzXG4gICAgICAgIGVsc2UgaWYgKGNoID09PSAnWycpICsrc3F1YXJlQnJhY2tldHNcbiAgICAgICAgZWxzZSBpZiAoY2ggPT09ICddJykgLS1zcXVhcmVCcmFja2V0c1xuXG4gICAgICAgIGlmICgnKClbXScuaW5kZXhPZihjaCkgPiAtMSkgcmV0dXJuIGNoXG4gICAgICAgIGlmIChzcXVhcmVCcmFja2V0cyB8fCByb3VuZEJyYWNrZXRzKSByZXR1cm4gY2hcblxuICAgICAgICByZXR1cm4gJyAnICsgY2ggKyAnICdcbiAgICAgIH0pXG5cbiAgICAgIC8vIHNwbGl0IGF0IHNwYWNlIGFuZCByZW1vdmUgZW1wdHkgcmVzdWx0c1xuICAgICAgcXVlcnkgPSBzcGxpdE5vdEluQnJhY2tldHMocXVlcnksICcgJykuZmlsdGVyKGVsID0+ICEhZWwubGVuZ3RoKVxuXG4gICAgICBjb25zdCBwYWlycyA9IFtdXG5cbiAgICAgIGxldCByZWxhdGlvbiA9ICclJ1xuXG4gICAgICAvLyBnZW5lcmF0ZSBxdWVyeW5vZGUgcmVsYXRpb24gdHVwbGVzXG4gICAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBxdWVyeS5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG5cbiAgICAgICAgaWYgKCc+fislJy5pbmRleE9mKHF1ZXJ5W2ldKSA+IC0xKSB7XG4gICAgICAgICAgcmVsYXRpb24gPSBxdWVyeVtpXVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBwYWlycy5wdXNoKFsgcmVsYXRpb24sIHF1ZXJ5W2ldIF0pXG4gICAgICAgIHJlbGF0aW9uID0gJyUnXG5cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhaXJzXG5cbiAgICB9KVxuXG4gICAgdGhpcy5xdWVyaWVzID0gcXVlcmllc1xuXG4gICAgLy8gdG8gcHJldmVudCBtZW1vcnkgbGVha3Mgd2UgaGF2ZSB0byBtYW5hZ2Ugb3VyIGNhY2hlLlxuICAgIC8vIHdlIGRlbGV0ZSBldmVyeXRoaW5nIHdoaWNoIGlzIG9sZGVyIHRoYW4gNTAgZW50cmllc1xuICAgIGlmIChDc3NRdWVyeS5jYWNoZUtleXMubGVuZ3RoID4gNTApIHtcbiAgICAgIENzc1F1ZXJ5LmNhY2hlLmRlbGV0ZShDc3NRdWVyeS5jYWNoZUtleXMuc2hpZnQoKSlcbiAgICB9XG4gICAgQ3NzUXVlcnkuY2FjaGUuc2V0KHF1ZXJ5LCBxdWVyaWVzKVxuICAgIENzc1F1ZXJ5LmNhY2hlS2V5cy5wdXNoKHF1ZXJ5KVxuXG4gIH1cblxuICBtYXRjaGVzIChub2RlLCBzY29wZSkge1xuICAgIGZvciAobGV0IGkgPSB0aGlzLnF1ZXJpZXMubGVuZ3RoOyBpLS07KSB7XG4gICAgICBpZiAodGhpcy5tYXRjaEhlbHBlcih0aGlzLnF1ZXJpZXNbaV0sIG5vZGUsIHNjb3BlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIG1hdGNoSGVscGVyIChxdWVyeSwgbm9kZSwgc2NvcGUpIHtcbiAgICBxdWVyeSA9IHF1ZXJ5LnNsaWNlKClcbiAgICBjb25zdCBsYXN0ID0gcXVlcnkucG9wKClcblxuICAgIGlmICghbmV3IENzc1F1ZXJ5Tm9kZShsYXN0WzFdKS5tYXRjaGVzKG5vZGUsIHNjb3BlKSkgeyByZXR1cm4gZmFsc2UgfVxuXG4gICAgaWYgKCFxdWVyeS5sZW5ndGgpIHJldHVybiB0cnVlXG5cbiAgICBpZiAobGFzdFswXSA9PT0gJywnKSByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgKGxhc3RbMF0gPT09ICcrJykge1xuICAgICAgcmV0dXJuICEhbm9kZS5wcmV2aW91c1NpYmxpbmcgJiYgdGhpcy5tYXRjaEhlbHBlcihxdWVyeSwgbm9kZS5wcmV2aW91c1NpYmxpbmcsIHNjb3BlKVxuICAgIH1cblxuICAgIGlmIChsYXN0WzBdID09PSAnPicpIHtcbiAgICAgIHJldHVybiAhIW5vZGUucGFyZW50Tm9kZSAmJiB0aGlzLm1hdGNoSGVscGVyKHF1ZXJ5LCBub2RlLnBhcmVudE5vZGUsIHNjb3BlKVxuICAgIH1cblxuICAgIGlmIChsYXN0WzBdID09PSAnficpIHtcbiAgICAgIHdoaWxlICgobm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nKSkge1xuICAgICAgICBpZiAodGhpcy5tYXRjaEhlbHBlcihxdWVyeSwgbm9kZSwgc2NvcGUpKSB7IHJldHVybiB0cnVlIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChsYXN0WzBdID09PSAnJScpIHtcbiAgICAgIHdoaWxlICgobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpIHtcbiAgICAgICAgaWYgKHRoaXMubWF0Y2hIZWxwZXIocXVlcnksIG5vZGUsIHNjb3BlKSkgeyByZXR1cm4gdHJ1ZSB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgfVxufVxuXG5Dc3NRdWVyeS5jYWNoZSA9IG5ldyBNYXAoKVxuQ3NzUXVlcnkuY2FjaGVLZXlzID0gW11cblxuLy8gY2hlY2sgaWYgW25vZGVdIGlzIHRoZSBbbnRoXSBjaGlsZCBvZiBbYXJyXSB3aGVyZSBudGggY2FuIGFsc28gYmUgYSBmb3JtdWxhXG5jb25zdCBudGggPSAobm9kZSwgYXJyLCBudGgpID0+IHtcblxuICBpZiAobnRoID09PSAnZXZlbicpIG50aCA9ICcybidcbiAgZWxzZSBpZiAobnRoID09PSAnb2RkJykgbnRoID0gJzJuKzEnXG5cbiAgLy8gY2hlY2sgZm9yIGV2YWwgY2hhcnNcbiAgaWYgKC9bXlxcZFxcLW4rKi9dKy8udGVzdChudGgpKSByZXR1cm4gZmFsc2VcblxuICBudGggPSBudGgucmVwbGFjZSgnbicsICcqbicpXG5cbiAgLy8gZXZhbCBudGggdG8gZ2V0IHRoZSBpbmRleFxuICBmb3IgKHZhciBpLCBuID0gMCwgbmwgPSBhcnIubGVuZ3RoOyBuIDwgbmw7ICsrbikge1xuICAgIC8qIGVzbGludCBuby1ldmFsOiBvZmYgKi9cbiAgICBpID0gZXZhbChudGgpXG5cbiAgICBpZiAoaSA+IG5sKSBicmVha1xuICAgIGlmIChhcnJbaSAtIDFdID09PSBub2RlKSByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmNvbnN0IGxvd2VyID0gYSA9PiBhLnRvTG93ZXJDYXNlKClcblxuLy8gY2hlY2tzIGlmIGEgYW5kIGIgYXJlIGVxdWFsLiBJcyBpbnNlbnNpdGl2ZSB3aGVuIGkgaXMgdHJ1ZVxuY29uc3QgZXEgPSAoYSwgYiwgaSkgPT4gaSA/IGxvd2VyKGEpID09PSBsb3dlcihiKSA6IGEgPT09IGJcblxuLy8gW2ldIChwcmVib3VuZCkgaXMgdHJ1ZSBpZiBpbnNlbnNpdGl2ZSBtYXRjaGluZyBpcyByZXF1aXJlZFxuLy8gW2FdIChwcmVib3VuZCkgaXMgdGhlIHZhbHVlIHRoZSBhdHRyIGlzIGNvbXBhcmVkIHRvXG4vLyBbYl0gKHBhc3NlZCkgICBpcyB0aGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZVxuY29uc3QgYXR0cmlidXRlTWF0Y2hlciA9IHtcbiAgJz0nOiAoaSwgYSwgYikgPT4gZXEoYSwgYiwgaSksXG4gICd+PSc6IChpLCBhLCBiKSA9PiBiLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikuZmlsdGVyKGVsID0+IGVxKGVsLCBhLCBpKSkubGVuZ3RoID4gMCxcbiAgJ3w9JzogKGksIGEsIGIpID0+IGVxKGIuc3BsaXQocmVnZXguZGVsaW1pdGVyKVswXSwgYSwgaSksXG4gICdePSc6IChpLCBhLCBiKSA9PiBpID8gbG93ZXIoYikuc3RhcnRzV2l0aChsb3dlcihhKSkgOiBiLnN0YXJ0c1dpdGgoYSksXG4gICckPSc6IChpLCBhLCBiKSA9PiBpID8gbG93ZXIoYikuZW5kc1dpdGgobG93ZXIoYSkpIDogYi5lbmRzV2l0aChhKSxcbiAgJyo9JzogKGksIGEsIGIpID0+IGkgPyBsb3dlcihiKS5pbmNsdWRlcyhsb3dlcihhKSkgOiBiLmluY2x1ZGVzKGEpLFxuICAnKic6IChpLCBhLCBiKSA9PiBiICE9IG51bGxcbn1cblxuY29uc3QgZ2V0QXR0cmlidXRlVmFsdWUgPSAocHJlZml4LCBuYW1lLCBub2RlKSA9PiB7XG4gIGlmICghcHJlZml4IHx8IHByZWZpeCA9PT0gJyonKSB7XG4gICAgcmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlKG5hbWUpXG4gIH1cbiAgcmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlKHByZWZpeCArICc6JyArIG5hbWUpXG59XG5cbi8vIFthXSAocHJlYm91bmQpIFthXXJndW1lbnQgb2YgdGhlIHBzZXVkbyBzZWxlY3RvclxuLy8gW25dIChwYXNzZWQpICAgW25db2RlXG4vLyBbc10gKHBhc3NlZCkgICBbc11jb3BlIC0gdGhlIGVsZW1lbnQgdGhpcyBxdWVyeSBpcyBzY29wZWQgdG9cbmNvbnN0IHBzZXVkb01hdGNoZXIgPSB7XG4gICdmaXJzdC1jaGlsZCc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLmZpcnN0Q2hpbGQgPT09IG4sXG4gICdsYXN0LWNoaWxkJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBuLnBhcmVudE5vZGUubGFzdENoaWxkID09PSBuLFxuICAnbnRoLWNoaWxkJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBudGgobiwgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMsIGEpLFxuICAnbnRoLWxhc3QtY2hpbGQnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG50aChuLCBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5zbGljZSgpLnJldmVyc2UoKSwgYSksXG4gICdmaXJzdC1vZi10eXBlJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5maWx0ZXIoZWwgPT4gZWwubm9kZU5hbWUgPT09IG4ubm9kZU5hbWUpWzBdID09PSBuLFxuICAnbGFzdC1vZi10eXBlJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5maWx0ZXIoZWwgPT4gZWwubm9kZU5hbWUgPT09IG4ubm9kZU5hbWUpLnBvcCgpID09PSBuLFxuICAnbnRoLW9mLXR5cGUnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG50aChuLCBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5maWx0ZXIoZWwgPT4gZWwubm9kZU5hbWUgPT09IG4ubm9kZU5hbWUpLCBhKSxcbiAgJ250aC1sYXN0LW9mLXR5cGUnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG50aChuLCBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5maWx0ZXIoZWwgPT4gZWwubm9kZU5hbWUgPT09IG4ubm9kZU5hbWUpLnJldmVyc2UoKSwgYSksXG4gICdvbmx5LWNoaWxkJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEsXG4gICdvbmx5LW9mLXR5cGUnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG4ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmZpbHRlcihlbCA9PiBlbC5ub2RlTmFtZSA9PT0gbi5ub2RlTmFtZSkubGVuZ3RoID09PSAxLFxuICByb290OiAoYSwgbikgPT4gbi5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA9PT0gbixcbiAgbm90OiAoYSwgbiwgcykgPT4gIShuZXcgQ3NzUXVlcnkoYSkpLm1hdGNoZXMobiwgcyksXG4gIG1hdGNoZXM6IChhLCBuLCBzKSA9PiAobmV3IENzc1F1ZXJ5KGEpKS5tYXRjaGVzKG4sIHMpLFxuICBzY29wZTogKGEsIG4sIHMpID0+IG4gPT09IHNcbn1cblxuZXhwb3J0IGNsYXNzIENzc1F1ZXJ5Tm9kZSB7XG4gIGNvbnN0cnVjdG9yIChub2RlKSB7XG4gICAgdGhpcy50YWcgPSAnJ1xuICAgIHRoaXMuaWQgPSAnJ1xuICAgIHRoaXMuY2xhc3NMaXN0ID0gW11cbiAgICB0aGlzLmF0dHJzID0gW11cbiAgICB0aGlzLnBzZXVkbyA9IFtdXG5cbiAgICAvLyBtYXRjaCB0aGUgdGFnIG5hbWVcbiAgICBsZXQgbWF0Y2hlcyA9IG5vZGUubWF0Y2goL15bXFx3LV0rfF5cXCovKVxuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICB0aGlzLnRhZyA9IG1hdGNoZXNbMF1cbiAgICAgIG5vZGUgPSBub2RlLnNsaWNlKHRoaXMudGFnLmxlbmd0aClcbiAgICB9XG5cbiAgICAvLyBtYXRjaCBwc2V1ZG8gY2xhc3Nlc1xuICAgIHdoaWxlICgobWF0Y2hlcyA9IC86KFtcXHctXSspKD86XFwoKC4rKVxcKSk/L2cuZXhlYyhub2RlKSkpIHtcbiAgICAgIHRoaXMucHNldWRvLnB1c2gocHNldWRvTWF0Y2hlclttYXRjaGVzWzFdXS5iaW5kKHRoaXMsIHJlbW92ZVF1b3RlcyhtYXRjaGVzWzJdIHx8ICcnKSkpXG4gICAgICBub2RlID0gbm9kZS5zbGljZSgwLCBtYXRjaGVzLmluZGV4KSArIG5vZGUuc2xpY2UobWF0Y2hlcy5pbmRleCArIG1hdGNoZXNbMF0ubGVuZ3RoKVxuICAgIH1cblxuICAgIC8vIG1hdGNoIGF0dHJpYnV0ZXNcbiAgICB3aGlsZSAoKG1hdGNoZXMgPSAvXFxbKFtcXHctKl0rXFx8KT8oW1xcdy1dKykoKFs9Xn4kfCpdKykoLis/KSggK1tpSV0pPyk/XFxdL2cuZXhlYyhub2RlKSkpIHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IG1hdGNoZXNbMV0gPyBtYXRjaGVzWzFdLnNwbGl0KCd8JylbMF0gOiBudWxsXG4gICAgICB0aGlzLmF0dHJzLnB1c2goe1xuICAgICAgICBuYW1lOiBtYXRjaGVzWzJdLFxuICAgICAgICBnZXRWYWx1ZTogZ2V0QXR0cmlidXRlVmFsdWUuYmluZCh0aGlzLCBwcmVmaXgsIG1hdGNoZXNbMl0pLFxuICAgICAgICBtYXRjaGVyOiBhdHRyaWJ1dGVNYXRjaGVyW21hdGNoZXNbNF0gfHwgJyonXS5iaW5kKFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgISFtYXRjaGVzWzZdLCAvLyBjYXNlIGluc2Vuc2l0aXZlIHllcy9ub1xuICAgICAgICAgIHJlbW92ZVF1b3RlcygobWF0Y2hlc1s1XSB8fCAnJykudHJpbSgpKSAvLyBhdHRyaWJ1dGUgdmFsdWVcbiAgICAgICAgKVxuICAgICAgfSlcbiAgICAgIG5vZGUgPSBub2RlLnNsaWNlKDAsIG1hdGNoZXMuaW5kZXgpICsgbm9kZS5zbGljZShtYXRjaGVzLmluZGV4ICsgbWF0Y2hlc1swXS5sZW5ndGgpXG4gICAgfVxuXG4gICAgLy8gbWF0Y2ggdGhlIGlkXG4gICAgbWF0Y2hlcyA9IG5vZGUubWF0Y2goLyMoW1xcdy1dKykvKVxuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICB0aGlzLmlkID0gbWF0Y2hlc1sxXVxuICAgICAgbm9kZSA9IG5vZGUuc2xpY2UoMCwgbWF0Y2hlcy5pbmRleCkgKyBub2RlLnNsaWNlKG1hdGNoZXMuaW5kZXggKyBtYXRjaGVzWzBdLmxlbmd0aClcbiAgICB9XG5cbiAgICAvLyBtYXRjaCBjbGFzc2VzXG4gICAgd2hpbGUgKChtYXRjaGVzID0gL1xcLihbXFx3LV0rKS9nLmV4ZWMobm9kZSkpKSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5wdXNoKG1hdGNoZXNbMV0pXG4gICAgICBub2RlID0gbm9kZS5zbGljZSgwLCBtYXRjaGVzLmluZGV4KSArIG5vZGUuc2xpY2UobWF0Y2hlcy5pbmRleCArIG1hdGNoZXNbMF0ubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIG1hdGNoZXMgKG5vZGUsIHNjb3BlKSB7XG4gICAgbGV0IGlcblxuICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSAxKSByZXR1cm4gZmFsc2VcblxuICAgIC8vIEFsd2F5cyB0aGlzIGV4dHJhIGNvZGUgZm9yIGh0bWwgLS4tXG4gICAgaWYgKG5vZGUubmFtZXNwYWNlVVJJID09PSBodG1sKSB7XG4gICAgICB0aGlzLnRhZyA9IHRoaXMudGFnLnRvVXBwZXJDYXNlKClcbiAgICB9XG5cbiAgICBpZiAodGhpcy50YWcgJiYgdGhpcy50YWcgIT09IG5vZGUubm9kZU5hbWUgJiYgdGhpcy50YWcgIT09ICcqJykgeyByZXR1cm4gZmFsc2UgfVxuXG4gICAgaWYgKHRoaXMuaWQgJiYgdGhpcy5pZCAhPT0gbm9kZS5pZCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NMaXN0ID0gKG5vZGUuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihlbCA9PiAhIWVsLmxlbmd0aClcbiAgICBpZiAodGhpcy5jbGFzc0xpc3QuZmlsdGVyKGNsYXNzTmFtZSA9PiBjbGFzc0xpc3QuaW5kZXhPZihjbGFzc05hbWUpIDwgMCkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBmb3IgKGkgPSB0aGlzLmF0dHJzLmxlbmd0aDsgaS0tOykge1xuICAgICAgY29uc3QgYXR0clZhbHVlID0gdGhpcy5hdHRyc1tpXS5nZXRWYWx1ZShub2RlKVxuICAgICAgaWYgKGF0dHJWYWx1ZSA9PT0gbnVsbCB8fCAhdGhpcy5hdHRyc1tpXS5tYXRjaGVyKGF0dHJWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gdGhpcy5wc2V1ZG8ubGVuZ3RoOyBpLS07KSB7XG4gICAgICBpZiAoIXRoaXMucHNldWRvW2ldKG5vZGUsIHNjb3BlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbn1cbiIsImltcG9ydCB7IFNWR1BvaW50IH0gZnJvbSAnLi4vZG9tL3N2Zy9TVkdQb2ludC5qcydcblxuZXhwb3J0IGNsYXNzIFBvaW50IHtcbiAgLy8gSW5pdGlhbGl6ZVxuICBjb25zdHJ1Y3RvciAoeCwgeSkge1xuICAgIGNvbnN0IGJhc2UgPSB7IHg6IDAsIHk6IDAgfVxuXG4gICAgLy8gZW5zdXJlIHNvdXJjZSBhcyBvYmplY3RcbiAgICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KHgpXG4gICAgICA/IHsgeDogeFswXSwgeTogeFsxXSB9XG4gICAgICA6IHR5cGVvZiB4ID09PSAnb2JqZWN0J1xuICAgICAgICA/IHsgeDogeC54LCB5OiB4LnkgfVxuICAgICAgICA6IHggIT0gbnVsbFxuICAgICAgICAgID8geyB4OiB4LCB5OiAoeSAhPSBudWxsID8geSA6IHgpIH1cbiAgICAgICAgICA6IGJhc2UgLy8gSWYgeSBoYXMgbm8gdmFsdWUsIHRoZW4geCBpcyB1c2VkIGhhcyBpdHMgdmFsdWVcblxuICAgIC8vIG1lcmdlIHNvdXJjZVxuICAgIHRoaXMueCA9IHNvdXJjZS54XG4gICAgdGhpcy55ID0gc291cmNlLnlcbiAgfVxuXG4gIGFicyAoKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmFic1F1YWQoKSlcbiAgfVxuXG4gIGFic1F1YWQgKCkge1xuICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnlcbiAgfVxuXG4gIGFkZCAoeCwgeSkge1xuICAgIGNvbnN0IHAgPSBuZXcgUG9pbnQoeCwgeSlcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCArIHAueCwgdGhpcy55ICsgcC55KVxuICB9XG5cbiAgYW5nbGVUbyAocCkge1xuICAgIGxldCBzaWduID0gTWF0aC5zaWduKHRoaXMueCAqIHAueSAtIHRoaXMueSAqIHAueClcbiAgICBzaWduID0gc2lnbiB8fCAxXG4gICAgcmV0dXJuIHNpZ24gKiBNYXRoLmFjb3MoTWF0aC5yb3VuZCgodGhpcy5kb3QocCkgLyAodGhpcy5hYnMoKSAqIHAuYWJzKCkpKSAqIDEwMDAwMDApIC8gMTAwMDAwMClcbiAgfVxuXG4gIC8vIENsb25lIHBvaW50XG4gIGNsb25lICgpIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMpXG4gIH1cblxuICBjbG9zZVRvIChwLCBldGEgPSAwLjAwMDAxKSB7XG4gICAgcmV0dXJuIHRoaXMuZXF1YWxzKHApIHx8IChNYXRoLmFicyh0aGlzLnggLSBwLngpIDwgZXRhICYmIE1hdGguYWJzKHRoaXMueSAtIHAueSkgPCBldGEpXG4gIH1cblxuICBkaXYgKGZhY3Rvcikge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54IC8gZmFjdG9yLCB0aGlzLnkgLyBmYWN0b3IpXG4gIH1cblxuICBkb3QgKHApIHtcbiAgICByZXR1cm4gdGhpcy54ICogcC54ICsgdGhpcy55ICogcC55XG4gIH1cblxuICBlcXVhbHMgKHApIHtcbiAgICByZXR1cm4gdGhpcy54ID09PSBwLnggJiYgdGhpcy55ID09PSBwLnlcbiAgfVxuXG4gIG11bCAoZmFjdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKiBmYWN0b3IsIHRoaXMueSAqIGZhY3RvcilcbiAgfVxuXG4gIC8vIENvbnZlcnQgdG8gbmF0aXZlIFNWR1BvaW50XG4gIG5hdGl2ZSAoKSB7XG4gICAgLy8gY3JlYXRlIG5ldyBwb2ludFxuICAgIGNvbnN0IHBvaW50ID0gbmV3IFNWR1BvaW50KClcblxuICAgIC8vIHVwZGF0ZSB3aXRoIGN1cnJlbnQgdmFsdWVzXG4gICAgcG9pbnQueCA9IHRoaXMueFxuICAgIHBvaW50LnkgPSB0aGlzLnlcblxuICAgIHJldHVybiBwb2ludFxuICB9XG5cbiAgbm9ybWFsICgpIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueSwgLXRoaXMueClcbiAgfVxuXG4gIG5vcm1hbGl6ZSAoKSB7XG4gICAgY29uc3QgYWJzID0gdGhpcy5hYnMoKVxuICAgIGlmICghYWJzKSB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3Qgbm9ybWFsaXplIHZlY3RvciBvZiB6ZXJvIGxlbmd0aCcpXG4gICAgcmV0dXJuIHRoaXMuZGl2KGFicylcbiAgfVxuXG4gIHJlZmxlY3RBdCAocCkge1xuICAgIHJldHVybiBwLmFkZChwLnN1Yih0aGlzKSlcbiAgfVxuXG4gIHN1YiAoeCwgeSkge1xuICAgIGNvbnN0IHAgPSBuZXcgUG9pbnQoeCwgeSlcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCAtIHAueCwgdGhpcy55IC0gcC55KVxuICB9XG5cbiAgdG9BcnJheSAoKSB7XG4gICAgcmV0dXJuIFsgdGhpcy54LCB0aGlzLnkgXVxuICB9XG5cbiAgdG9QYXRoICgpIHtcbiAgICByZXR1cm4gWyAnTScsIHRoaXMueCwgdGhpcy55IF0uam9pbignICcpXG4gIH1cblxuICAvLyB0cmFuc2Zvcm0gcG9pbnQgd2l0aCBtYXRyaXhcbiAgdHJhbnNmb3JtIChtYXRyaXgpIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMubmF0aXZlKCkubWF0cml4VHJhbnNmb3JtKG1hdHJpeCkpXG4gIH1cblxuICB0cmFuc2Zvcm1PIChtYXRyaXgpIHtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMubmF0aXZlKCkubWF0cml4VHJhbnNmb3JtKG1hdHJpeClcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5vZGVGaWx0ZXIgfSBmcm9tICcuLi9kb20vTm9kZUZpbHRlci5qcydcblxuY29uc3Qgc2hvd1RoaXNOb2RlID0gKHdoYXRUb1Nob3csIG5vZGUpID0+IHtcbiAgaWYgKHdoYXRUb1Nob3cgPT09IE5vZGVGaWx0ZXIuU0hPV19BTEwpIHJldHVybiB0cnVlXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHJldHVybiB0cnVlXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX1RFWFQgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5URVhUX05PREUpIHJldHVybiB0cnVlXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX0VOVElUWV9SRUZFUkVOQ0UgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTlRJVFlfUkVGRVJFTkNFX05PREUpIHJldHVybiB0cnVlXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX0VOVElUWSAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkVOVElUWV9OT0RFKSByZXR1cm4gdHJ1ZVxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19QUk9DRVNTSU5HX0lOU1RSVUNUSU9OICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuUFJPQ0VTU0lOR19JTlNUUlVDVElPTl9OT0RFKSByZXR1cm4gdHJ1ZVxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuQ09NTUVOVF9OT0RFKSByZXR1cm4gdHJ1ZVxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19ET0NVTUVOVCAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkRPQ1VNRU5UX05PREUpIHJldHVybiB0cnVlXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX0RPQ1VNRU5UX1RZUEUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5ET0NVTUVOVF9UWVBFX05PREUpIHJldHVybiB0cnVlXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX0RPQ1VNRU5UX0ZSQUdNRU5UICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSkgcmV0dXJuIHRydWVcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfTk9UQVRJT04gJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5OT1RBVElPTl9OT0RFKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVJdGVyYXRvciB7XG4gIGNvbnN0cnVjdG9yIChyb290LCB3aGF0VG9TaG93ID0gTm9kZUZpbHRlci5TSE9XX0FMTCwgZmlsdGVyID0gKCkgPT4gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBULCBpbmNsdWRlUGFyZW50ID0gdHJ1ZSkge1xuICAgIHRoaXMucm9vdCA9IGluY2x1ZGVQYXJlbnQgPyB7IGNoaWxkTm9kZXM6IFsgcm9vdCBdIH0gOiByb290XG4gICAgdGhpcy53aGF0VG9TaG93ID0gd2hhdFRvU2hvd1xuICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyXG4gIH1cblxuICAqIFtTeW1ib2wuaXRlcmF0b3JdICgpIHtcbiAgICBjb25zdCBub2RlcyA9IHRoaXMucm9vdC5jaGlsZE5vZGVzXG5cbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGlmICghc2hvd1RoaXNOb2RlKHRoaXMud2hhdFRvU2hvdywgbm9kZSkpIGNvbnRpbnVlXG5cbiAgICAgIGNvbnN0IGZpbHRlclJldCA9IHRoaXMuZmlsdGVyKG5vZGUpXG5cbiAgICAgIGlmIChmaWx0ZXJSZXQgPT09IE5vZGVGaWx0ZXIuRklMVEVSX1JFSkVDVCkgY29udGludWVcbiAgICAgIGlmIChmaWx0ZXJSZXQgPT09IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCkge1xuICAgICAgICB5aWVsZCBub2RlXG4gICAgICB9XG5cbiAgICAgIHlpZWxkICogbmV3IE5vZGVJdGVyYXRvcihub2RlLCB0aGlzLndoYXRUb1Nob3csIHRoaXMuZmlsdGVyLCBmYWxzZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG4iLCJpbXBvcnQgeyBCb3gsIE5vQm94IH0gZnJvbSAnLi4vb3RoZXIvQm94LmpzJ1xuXG5leHBvcnQgY2xhc3MgUG9pbnRDbG91ZCBleHRlbmRzIEFycmF5IHtcbiAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3NbMF0gPT09ICdudW1iZXInKSB7XG4gICAgICBzdXBlcihhcmdzLnNoaWZ0KCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyKClcbiAgICB9XG5cbiAgICAvLyBleGNlcHQgbXVsdGlwbGUgcG9pbnQgYXJyYXlzIGFzIGlucHV0IGFuZCBtZXJnZSB0aGVtIGludG8gb25lXG4gICAgYXJncy5yZWR1Y2UoKGxhc3QsIGN1cnIpID0+IHtcbiAgICAgIGxhc3QucHVzaCguLi5jdXJyKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LCB0aGlzKVxuICB9XG5cbiAgYmJveCAoKSB7XG4gICAgaWYgKCF0aGlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG5ldyBOb0JveCgpXG4gICAgfVxuXG4gICAgbGV0IHhNaW4gPSBJbmZpbml0eVxuICAgIGxldCB4TWF4ID0gLUluZmluaXR5XG4gICAgbGV0IHlNaW4gPSBJbmZpbml0eVxuICAgIGxldCB5TWF4ID0gLUluZmluaXR5XG5cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgIHhNaW4gPSBNYXRoLm1pbih4TWluLCBwLngpXG4gICAgICB4TWF4ID0gTWF0aC5tYXgoeE1heCwgcC54KVxuICAgICAgeU1pbiA9IE1hdGgubWluKHlNaW4sIHAueSlcbiAgICAgIHlNYXggPSBNYXRoLm1heCh5TWF4LCBwLnkpXG4gICAgfSlcblxuICAgIHJldHVybiBuZXcgQm94KFxuICAgICAgeE1pbiwgeU1pbixcbiAgICAgIHhNYXggLSB4TWluLFxuICAgICAgeU1heCAtIHlNaW5cbiAgICApXG4gIH1cblxuICBtZXJnZSAoY2xvdWQpIHtcbiAgICByZXR1cm4gbmV3IFBvaW50Q2xvdWQodGhpcywgY2xvdWQpXG4gIH1cblxuICB0cmFuc2Zvcm0gKG0pIHtcbiAgICByZXR1cm4gbmV3IFBvaW50Q2xvdWQodGhpcy5tYXAoKHApID0+IHAudHJhbnNmb3JtKG0pKSlcbiAgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyBwYXRoVXRpbHMgZnJvbSAnLi9wYXRoVXRpbHMuanMnXG5pbXBvcnQgKiBhcyByZWdleCBmcm9tICcuL3JlZ2V4LmpzJ1xuaW1wb3J0ICogYXMgdGV4dFV0aWxzIGZyb20gJy4vdGV4dFV0aWxzLmpzJ1xuaW1wb3J0IHsgTm9Cb3ggfSBmcm9tICcuLi9vdGhlci9Cb3guanMnXG5pbXBvcnQgeyBOb2RlSXRlcmF0b3IgfSBmcm9tICcuL05vZGVJdGVyYXRvci5qcydcbmltcG9ydCB7IE5vZGVGaWx0ZXIgfSBmcm9tICcuLi9kb20vTm9kZUZpbHRlci5qcydcblxuY29uc3QgYXBwbHlUcmFuc2Zvcm1hdGlvbiA9IChzZWdtZW50cywgbm9kZSwgYXBwbHlUcmFuc2Zvcm1hdGlvbnMpID0+IHtcbiAgaWYgKG5vZGUubWF0cml4aWZ5ICYmIGFwcGx5VHJhbnNmb3JtYXRpb25zKSB7XG4gICAgcmV0dXJuIHNlZ21lbnRzLnRyYW5zZm9ybShub2RlLm1hdHJpeGlmeSgpKVxuICB9XG4gIHJldHVybiBzZWdtZW50c1xufVxuXG5leHBvcnQgY29uc3QgZ2V0U2VnbWVudHMgPSAobm9kZSwgYXBwbHlUcmFuc2Zvcm1hdGlvbnMsIHJib3ggPSBmYWxzZSkgPT4ge1xuICBjb25zdCBzZWdtZW50cyA9IGdldFBhdGhTZWdtZW50cyhub2RlLCByYm94KVxuICByZXR1cm4gYXBwbHlUcmFuc2Zvcm1hdGlvbihzZWdtZW50cywgbm9kZSwgYXBwbHlUcmFuc2Zvcm1hdGlvbnMpXG59XG5cbmNvbnN0IGdldFBhdGhTZWdtZW50cyA9IChub2RlLCByYm94KSA9PiB7XG4gIGlmIChub2RlLm5vZGVUeXBlICE9PSAxKSByZXR1cm4gbmV3IHBhdGhVdGlscy5QYXRoU2VnbWVudEFycmF5KClcblxuICBzd2l0Y2ggKG5vZGUubm9kZU5hbWUpIHtcbiAgY2FzZSAncmVjdCc6XG4gIGNhc2UgJ2ltYWdlJzpcbiAgY2FzZSAncGF0dGVybic6XG4gIGNhc2UgJ21hc2snOlxuICBjYXNlICdmb3JlaWduT2JqZWN0JzpcbiAgICAvLyBDcmVhdGUgUGF0aCBmcm9tIHJlY3QgYW5kIGNyZWF0ZSBQb2ludENsb3VkIGZyb20gUGF0aFxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKHBhdGhVdGlscy5wYXRoRnJvbS5yZWN0KG5vZGUpKVxuICBjYXNlICdzdmcnOlxuICBjYXNlICdzeW1ib2wnOlxuICAgIC8vIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKHBhdGhVdGlscy5wYXRoRnJvbS5yZWN0KG5vZGUpKVxuICAgIGlmIChyYm94KSB7XG4gICAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20ucmVjdChub2RlKSlcbiAgICB9XG4gIC8vIEFUVEVOVElPTjogRkFMTCBUSFJPVUdIXG4gIC8vIEJlY2F1c2Ugbm9ybWFsIGJib3ggaXMgY2FsY3VsYXRlZCBieSB0aGUgY29udGVudCBvZiB0aGUgZWxlbWVudCBhbmQgbm90IGl0cyB3aWR0aCBhbmQgaGVpZ2h0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBjYXNlICdnJzpcbiAgY2FzZSAnY2xpcFBhdGgnOlxuICBjYXNlICdhJzpcbiAgY2FzZSAnbWFya2VyJzpcbiAgICAvLyBJdGVyYXRlIHRyb3VnaCBhbGwgY2hpbGRyZW4gYW5kIGdldCB0aGUgcG9pbnQgY2xvdWQgb2YgZWFjaFxuICAgIC8vIFRoZW4gdHJhbnNmb3JtIGl0IHdpdGggdmlld2JveCBtYXRyaXggaWYgbmVlZGVkXG4gICAgcmV0dXJuIG5vZGUuY2hpbGROb2Rlcy5yZWR1Y2UoKHNlZ21lbnRzLCBjaGlsZCkgPT4ge1xuICAgICAgaWYgKCFjaGlsZC5tYXRyaXhpZnkpIHJldHVybiBzZWdtZW50c1xuICAgICAgcmV0dXJuIHNlZ21lbnRzLm1lcmdlKGdldFNlZ21lbnRzKGNoaWxkLCB0cnVlKS50cmFuc2Zvcm0oY2hpbGQuZ2VuZXJhdGVWaWV3Qm94TWF0cml4KCkpKVxuICAgIH0sIG5ldyBwYXRoVXRpbHMuUGF0aFNlZ21lbnRBcnJheSgpKVxuICBjYXNlICdjaXJjbGUnOlxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKHBhdGhVdGlscy5wYXRoRnJvbS5jaXJjbGUobm9kZSkpXG4gIGNhc2UgJ2VsbGlwc2UnOlxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKHBhdGhVdGlscy5wYXRoRnJvbS5lbGxpcHNlKG5vZGUpKVxuICBjYXNlICdsaW5lJzpcbiAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20ubGluZShub2RlKSlcbiAgY2FzZSAncG9seWxpbmUnOlxuICBjYXNlICdwb2x5Z29uJzpcbiAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20ucG9seWxpbmUobm9kZSkpXG4gIGNhc2UgJ3BhdGgnOlxuICBjYXNlICdnbHlwaCc6XG4gIGNhc2UgJ21pc3NpbmctZ2x5cGgnOlxuICAgIHJldHVybiBwYXRoVXRpbHMuZ2V0UGF0aFNlZ21lbnRzKG5vZGUuZ2V0QXR0cmlidXRlKCdkJykpXG4gIGNhc2UgJ3VzZSc6IHtcbiAgICAvLyBHZXQgcmVmZXJlbmNlIGZyb20gZWxlbWVudFxuICAgIGNvbnN0IHJlZiA9IG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnKVxuICAgIC8vIEdldCB0aGUgYWN0dWFsIHJlZmVyZW5jZWQgTm9kZVxuICAgIGNvbnN0IHJlZk5vZGUgPSBub2RlLmdldFJvb3ROb2RlKCkucXVlcnlTZWxlY3RvcihyZWYpXG4gICAgLy8gR2V0IHRoZSBCQm94IG9mIHRoZSByZWZlcmVuY2VkIGVsZW1lbnQgYW5kIGFwcGx5IHRoZSB2aWV3Ym94IG9mIDx1c2U+XG4gICAgLy8gVE9ETzogRG8gd2UgbmVlZCB0byBhcHBseSB0aGUgdHJhbnNmb3JtYXRpb25zIG9mIHRoZSBlbGVtZW50P1xuICAgIC8vIENoZWNrIGJib3ggb2YgdHJhbnNmb3JtZWQgZWxlbWVudCB3aGljaCBpcyByZXVzZWQgd2l0aCA8dXNlPlxuICAgIHJldHVybiBnZXRTZWdtZW50cyhyZWZOb2RlKS50cmFuc2Zvcm0obm9kZS5nZW5lcmF0ZVZpZXdCb3hNYXRyaXgoKSlcbiAgfVxuICBjYXNlICd0c3Bhbic6XG4gIGNhc2UgJ3RleHQnOlxuICBjYXNlICdhbHRHbHlwaCc6IHtcbiAgICBjb25zdCBib3ggPSBnZXRUZXh0QkJveChub2RlKVxuXG4gICAgaWYgKGJveCBpbnN0YW5jZW9mIE5vQm94KSB7XG4gICAgICByZXR1cm4gbmV3IHBhdGhVdGlscy5QYXRoU2VnbWVudEFycmF5KClcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20uYm94KGJveCkpXG4gIH1cbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gbmV3IHBhdGhVdGlscy5QYXRoU2VnbWVudEFycmF5KClcbiAgfVxufVxuXG5jb25zdCBnZXRUZXh0QkJveCA9IChub2RlKSA9PiB7XG4gIGNvbnN0IHRleHRSb290ID0gZmluZFRleHRSb290KG5vZGUpXG4gIGNvbnN0IGJveGVzID0gZ2V0VGV4dEJCb3hlcyhub2RlLCB0ZXh0Um9vdClcbiAgcmV0dXJuIGJveGVzLmZpbHRlcihpc05vdEVtcHR5Qm94KS5yZWR1Y2UoKGxhc3QsIGN1cnIpID0+IGxhc3QubWVyZ2UoY3VyciksIG5ldyBOb0JveCgpKVxufVxuXG5jb25zdCBmaW5kVGV4dFJvb3QgPSAobm9kZSkgPT4ge1xuICB3aGlsZSAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgaWYgKChub2RlLm5vZGVOYW1lID09PSAndGV4dCcgJiYgbm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lID09PSAndGV4dCcpXG4gICAgfHwgKChub2RlLm5vZGVOYW1lID09PSAndHNwYW4nIHx8IG5vZGUubm9kZU5hbWUgPT09ICd0ZXh0UGF0aCcpICYmIFsgJ3RzcGFuJywgJ3RleHQnLCAndGV4dFBhdGgnIF0uaW5jbHVkZXMobm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lKSkpIHtcbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGVcbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbm9kZVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHRha2VzIGEgbm9kZSBvZiB3aGljaCB0aGUgYmJveCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkXG4vLyBJbiBvcmRlciB0byBwb3NpdGlvbiB0aGUgYm94IGNvcnJlY3RseSwgd2UgbmVlZCB0byBrbm93IHdlcmUgdGhlIHBhcmVudCBhbmQgd2VyZSB0aGUgc2libGluZ3MgKmJlZm9yZSogb3VyIG5vZGUgYXJlXG4vLyBUaGF0cyB3aHkgYSB0ZXh0Um9vdCBpcyBwYXNzZWQgd2hpY2ggaXMgdGhlIG1vc3Qgb3V0ZXIgdGV4dEVsZW1lbnQgbmVlZGVkIHRvIGNhbGN1bGF0ZSBhbGwgYm94ZXNcbi8vIFdoZW4gdGhlIGl0ZXJhdG9yIGhpdHMgdGhlIGVsZW1lbnQgd2UgbmVlZCB0aGUgYmJveCBvZiwgaXQgaXMgdGVybWluYXRlZCBhbmQgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgYWdhaW5cbi8vIG9ubHkgZm9yIHRoZSBzdWJzdHJlZSBvZiBvdXIgbm9kZSBhbmQgd2l0aG91dCB0ZXh0Um9vciBidXQgaW5zdGVhZCBwb3MsIGR4IGFuZCBkeSBhcmUga25vd25cbmNvbnN0IGdldFRleHRCQm94ZXMgPSBmdW5jdGlvbiAodGFyZ2V0LCB0ZXh0Um9vdCA9IHRhcmdldCwgcG9zID0geyB4OiAwLCB5OiAwIH0sIGR4ID0gWyAwIF0sIGR5ID0gWyAwIF0sIGJveGVzID0gW10pIHtcblxuICAvLyBDcmVhdGUgTm9kZUl0ZXJhdG9yLiBPbmx5IHNob3cgZWxlbW50cyBhbmQgdGV4dCBhbmQgc2tpcCBkZXNjcmlwdGl2ZSBlbGVtZW50c1xuICAvLyBUT0RPOiBtYWtlIGFuIGluc3RhbmNlb2YgY2hlY2sgZm9yIERlc2NyaXB0aXZlRWxlbWVudCBpbnN0ZWFkIG9mIHRlc3Rpbmcgb25lIGJ5IG9uZVxuICAvLyBPbmx5IHRpdGxlIGlzIHNraXBwZWQgYXRtXG4gIGNvbnN0IGl0ZXIgPSBuZXcgTm9kZUl0ZXJhdG9yKHRleHRSb290LCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19URVhULCAobm9kZSkgPT4ge1xuICAgIGlmIChub2RlLm5vZGVOYW1lID09PSAndGl0bGUnKSByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFXG4gICAgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVFxuICB9KVxuXG4gIC8vIEl0ZXJhdGUgdHJvdWdoIGFsbCBub2RlcyB0b3AgdG8gYm90dG9tLCBsZWZ0IHRvIHJpZ2h0XG4gIGZvciAoY29uc3Qgbm9kZSBvZiBpdGVyKSB7XG5cbiAgICAvLyBJZiB3ZSBoaXQgb3VyIHRhcmdldCwgd2UgZ2F0aGVyZWQgYWxsIHBvc2l0aW9uYWwgaW5mb3JtYXRpb24gd2UgbmVlZCB0byBtb3ZlIHRoZSBiYm94IHRvIHRoZSBjb3JyZWN0IHNwb3RcbiAgICBpZiAobm9kZSA9PT0gdGFyZ2V0ICYmIG5vZGUgIT09IHRleHRSb290KSB7XG4gICAgICByZXR1cm4gZ2V0VGV4dEJCb3hlcyhub2RlLCBub2RlLCBwb3MsIGR4LCBkeSlcbiAgICB9XG5cbiAgICAvLyBUcmF2ZXJzZSB0cm91Z2ggdGhpcyBub2RlIHVwZGF0aW5nIHBvc2l0aW9ucyBhbmQgYWRkIGJveGVzXG4gICAgZ2V0UG9zaXRpb25EZXRhaWxzRm9yKG5vZGUsIHBvcywgZHgsIGR5LCBib3hlcylcbiAgfVxuXG4gIHJldHVybiBib3hlc1xufVxuXG5jb25zdCBpc05vdEVtcHR5Qm94ID0gYm94ID0+IGJveC54ICE9PSAwIHx8IGJveC55ICE9PSAwIHx8IGJveC53aWR0aCAhPT0gMCB8fCBib3guaGVpZ2h0ICE9PSAwXG5cbi8vIFRoaXMgZnVuY3Rpb24gZWl0aGVyIHVwZGF0ZXMgcG9zLCBkeCBhbmQgZHkgKHdoZW4gaXRzIGFuIGVsZW1lbnQpIG9yIGNhbGN1bGF0ZXMgdGhlIGJveGVzIGZvciB0ZXh0IHdpdGggdGhlIHBhc3NlZCBhcmd1bWVudHNcbi8vIEFsbCBhcmd1bWVudHMgYXJlIHBhc3NlZCBieSByZWZlcmVuY2Ugc28gZG9udCBvdmVyd3JpdGUgdGhlbSAodHJlYXQgdGhlbSBhcyBjb25zdCEpXG4vLyBUT0RPOiBCcmVhayB0aGlzIGludG8gdHdvIGZ1bmN0aW9ucz9cbmNvbnN0IGdldFBvc2l0aW9uRGV0YWlsc0ZvciA9IChub2RlLCBwb3MsIGR4LCBkeSwgYm94ZXMpID0+IHtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3gnKSlcbiAgICBjb25zdCB5ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneScpKVxuXG4gICAgcG9zLnggPSBpc05hTih4KSA/IHBvcy54IDogeFxuICAgIHBvcy55ID0gaXNOYU4oeSkgPyBwb3MueSA6IHlcblxuICAgIGNvbnN0IGR4MCA9IChub2RlLmdldEF0dHJpYnV0ZSgnZHgnKSB8fCAnJykuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5maWx0ZXIobnVtID0+IG51bSAhPT0gJycpLm1hcChwYXJzZUZsb2F0KVxuICAgIGNvbnN0IGR5MCA9IChub2RlLmdldEF0dHJpYnV0ZSgnZHknKSB8fCAnJykuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5maWx0ZXIobnVtID0+IG51bSAhPT0gJycpLm1hcChwYXJzZUZsb2F0KVxuXG4gICAgLy8gVE9ETzogZXZlbnR1YWxseSByZXBsYWNlIG9ubHkgYXMgbXVjaCB2YWx1ZXMgYXMgd2UgaGF2ZSB0ZXh0IGNoYXJzIChub2RlLnRleHRDb250ZW50Lmxlbmd0aCkgYmVjYXVzZSB3ZSBjb3VsZCBlbmQgdXAgYWRkaW5nIHRvIG11Y2hcbiAgICAvLyByZXBsYWNlIGluaXRpYWwgdmFsdWVzIHdpdGggbm9kZSB2YWx1ZXMgaWYgcHJlc2VudFxuICAgIGR4LnNwbGljZSgwLCBkeDAubGVuZ3RoLCAuLi5keDApXG4gICAgZHkuc3BsaWNlKDAsIGR5MC5sZW5ndGgsIC4uLmR5MClcbiAgfSBlbHNlIHtcbiAgICAvLyBnZXQgdGV4dCBkYXRhXG4gICAgY29uc3QgZGF0YSA9IG5vZGUuZGF0YVxuXG4gICAgbGV0IGogPSAwXG4gICAgY29uc3QgamwgPSBkYXRhLmxlbmd0aFxuICAgIGNvbnN0IGRldGFpbHMgPSBnZXRGb250RGV0YWlscyhub2RlKVxuXG4gICAgLy8gaWYgaXQgaXMgbW9yZSB0aGFuIG9uZSBkeC9keSBzaW5nbGUgbGV0dGVycyBhcmUgbW92ZWQgYnkgdGhlIGFtb3VudCAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS9keClcbiAgICBpZiAoZHkubGVuZ3RoIHx8IGR4Lmxlbmd0aCkge1xuICAgICAgZm9yICg7aiA8IGpsOyBqKyspIHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIGEgYm94IGZvciBhIHNpbmdsZSBsZXR0ZXJcbiAgICAgICAgYm94ZXMucHVzaCh0ZXh0VXRpbHMudGV4dEJCb3goZGF0YS5zdWJzdHIoaiwgMSksIHBvcy54LCBwb3MueSwgZGV0YWlscykpXG5cbiAgICAgICAgLy8gQWRkIHRoZSBuZXh0IHBvc2l0aW9uIHRvIGN1cnJlbnQgb25lXG4gICAgICAgIHBvcy54ICs9IGR4LnNoaWZ0KCkgfHwgMFxuICAgICAgICBwb3MueSArPSBkeS5zaGlmdCgpIHx8IDBcblxuICAgICAgICBpZiAoIWR5Lmxlbmd0aCAmJiAhZHgubGVuZ3RoKSBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGluIGNhc2UgaXQgd2FzIG9ubHkgb25lIGR4L2R5IG9yIG5vIG1vcmUgZHgvZHkgbW92ZSB0aGUgcmVzdCBvZiB0aGUgdGV4dFxuICAgIGJveGVzLnB1c2godGV4dFV0aWxzLnRleHRCQm94KGRhdGEuc3Vic3RyKGopLCBwb3MueCwgcG9zLnksIGRldGFpbHMpKVxuICAgIHBvcy54ICs9IGJveGVzW2JveGVzLmxlbmd0aCAtIDFdLndpZHRoXG4gIH1cbn1cblxuLypcbi8vIHRoaXMgZnVuY3Rpb24gaXMgcGFzc2luZyBkeCBhbmQgZHkgdmFsdWVzIGJ5IHJlZmVyZW5jZXMuIERvbnQgYXNzaWduIG5ldyB2YWx1ZXMgdG8gaXRcbmNvbnN0IHRleHRJdGVyYXRvciA9IGZ1bmN0aW9uIChub2RlLCBwb3MgPSB7IHg6IDAsIHk6IDAgfSwgZHggPSBbIDAgXSwgZHkgPSBbIDAgXSkge1xuXG4gIHZhciB4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneCcpKVxuICB2YXIgeSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3knKSlcblxuICBwb3MueCA9IGlzTmFOKHgpID8gcG9zLnggOiB4XG4gIHBvcy55ID0gaXNOYU4oeSkgPyBwb3MueSA6IHlcblxuICB2YXIgZHgwID0gKG5vZGUuZ2V0QXR0cmlidXRlKCdkeCcpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihudW0gPT4gbnVtICE9PSAnJykubWFwKHBhcnNlRmxvYXQpXG4gIHZhciBkeTAgPSAobm9kZS5nZXRBdHRyaWJ1dGUoJ2R5JykgfHwgJycpLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikuZmlsdGVyKG51bSA9PiBudW0gIT09ICcnKS5tYXAocGFyc2VGbG9hdClcbiAgdmFyIGJveGVzID0gW11cbiAgdmFyIGRhdGEgPSAnJ1xuXG4gIC8vIFRPRE86IGV2ZW50dWFsbHkgcmVwbGFjZSBvbmx5IGFzIG11Y2ggdmFsdWVzIGFzIHdlIGhhdmUgdGV4dCBjaGFycyAobm9kZS50ZXh0Q29udGVudC5sZW5ndGgpIGJlY2F1c2Ugd2UgY291bGQgZW5kIHVwIGFkZGluZyB0byBtdWNoXG4gIC8vIHJlcGxhY2UgaW5pdGlhbCB2YWx1ZXMgd2l0aCBub2RlIHZhbHVlcyBpZiBwcmVzZW50XG4gIGR4LnNwbGljZSgwLCBkeDAubGVuZ3RoLCAuLi5keDApXG4gIGR5LnNwbGljZSgwLCBkeTAubGVuZ3RoLCAuLi5keTApXG5cbiAgdmFyIGkgPSAwXG4gIHZhciBpbCA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGhcblxuICAvLyBpdGVyYXRlIHRocm91Z2ggYWxsIGNoaWxkcmVuXG4gIGZvciAoOyBpIDwgaWw7ICsraSkge1xuXG4gICAgLy8gc2hpZnQgbmV4dCBjaGlsZFxuICAgIHBvcy54ICs9IGR4LnNoaWZ0KCkgfHwgMFxuICAgIHBvcy55ICs9IGR5LnNoaWZ0KCkgfHwgMFxuXG4gICAgLy8gdGV4dFxuICAgIGlmIChub2RlLmNoaWxkTm9kZXNbaV0ubm9kZVR5cGUgPT09IG5vZGUuVEVYVF9OT0RFKSB7XG5cbiAgICAgIC8vIGdldCB0ZXh0IGRhdGFcbiAgICAgIGRhdGEgPSBub2RlLmNoaWxkTm9kZXNbaV0uZGF0YVxuXG4gICAgICBsZXQgaiA9IDBcbiAgICAgIGNvbnN0IGpsID0gZGF0YS5sZW5ndGhcblxuICAgICAgLy8gaWYgaXQgaXMgbW9yZSB0aGFuIG9uZSBkeC9keSBzaW5nbGUgbGV0dGVycyBhcmUgbW92ZWQgYnkgdGhlIGFtb3VudCAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS9keClcbiAgICAgIGlmIChkeS5sZW5ndGggfHwgZHgubGVuZ3RoKSB7XG4gICAgICAgIGZvciAoO2ogPCBqbDsgaisrKSB7XG4gICAgICAgICAgYm94ZXMucHVzaCh0ZXh0VXRpbHMudGV4dEJCb3goZGF0YS5zdWJzdHIoaiwgMSksIHBvcy54LCBwb3MueSwgZ2V0Rm9udERldGFpbHMobm9kZSkpKVxuXG4gICAgICAgICAgcG9zLnggKz0gZHguc2hpZnQoKSB8fCAwXG4gICAgICAgICAgcG9zLnkgKz0gZHkuc2hpZnQoKSB8fCAwXG5cbiAgICAgICAgICBpZiAoIWR5Lmxlbmd0aCAmJiAhZHgubGVuZ3RoKSBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGluIGNhc2UgaXQgd2FzIG9ubHkgb25lIGR4L2R5IG9yIG5vIG1vcmUgZHgvZHkgbW92ZSB0aGUgcmVzdCBvZiB0aGUgdGV4dFxuXG4gICAgICBib3hlcy5wdXNoKHRleHRVdGlscy50ZXh0QkJveChkYXRhLnN1YnN0cihqKSwgcG9zLngsIHBvcy55LCBnZXRGb250RGV0YWlscyhub2RlKSkpXG4gICAgICBwb3MueCArPSBib3hlc1tib3hlcy5sZW5ndGggLSAxXS53aWR0aFxuXG4gICAgLy8gZWxlbWVudFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbiBjYXNlIG9mIGVsZW1lbnQsIHJlY3Vyc2l2ZWx5IGNhbGwgZnVuY3Rpb24gYWdhaW4gd2l0aCBuZXcgc3RhcnQgdmFsdWVzXG4gICAgICBib3hlcyA9IGJveGVzLmNvbmNhdCh0ZXh0SXRlcmF0b3Iobm9kZS5jaGlsZE5vZGVzW2ldLCBwb3MsIGR4LCBkeSkpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJveGVzXG59ICovXG5cbmNvbnN0IGdldEZvbnREZXRhaWxzID0gKG5vZGUpID0+IHtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuVEVYVF9OT0RFKSBub2RlID0gbm9kZS5wYXJlbnROb2RlXG5cbiAgbGV0IGZvbnRTaXplID0gbnVsbFxuICBsZXQgZm9udEZhbWlseSA9IG51bGxcbiAgbGV0IHRleHRBbmNob3IgPSBudWxsXG4gIGxldCBkb21pbmFudEJhc2VsaW5lID0gbnVsbFxuXG4gIGNvbnN0IHRleHRDb250ZW50RWxlbWVudHMgPSBbXG4gICAgJ3RleHQnLFxuICAgICd0c3BhbicsXG4gICAgJ3RyZWYnLFxuICAgICd0ZXh0UGF0aCcsXG4gICAgJ2FsdEdseXBoJyxcbiAgICAnZydcbiAgXVxuXG4gIGRvIHtcbiAgICAvLyBUT0RPOiBzdG9wIG9uXG4gICAgaWYgKCFmb250U2l6ZSkgeyBmb250U2l6ZSA9IG5vZGUuc3R5bGUuZm9udFNpemUgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ2ZvbnQtc2l6ZScpIH1cbiAgICBpZiAoIWZvbnRGYW1pbHkpIHsgZm9udEZhbWlseSA9IG5vZGUuc3R5bGUuZm9udEZhbWlseSB8fCBub2RlLmdldEF0dHJpYnV0ZSgnZm9udC1mYW1pbHknKSB9XG4gICAgaWYgKCF0ZXh0QW5jaG9yKSB7IHRleHRBbmNob3IgPSBub2RlLnN0eWxlLnRleHRBbmNob3IgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ3RleHQtYW5jaG9yJykgfVxuICAgIGlmICghZG9taW5hbnRCYXNlbGluZSkgeyBkb21pbmFudEJhc2VsaW5lID0gbm9kZS5zdHlsZS5kb21pbmFudEJhc2VsaW5lIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCdkb21pbmFudC1iYXNlbGluZScpIH1cbiAgICAvLyBUT0RPOiBjaGVjayBmb3IgYWxpZ25tZW50LWJhc2VsaW5lIGluIHRzcGFuLCB0cmVmLCB0ZXh0UGF0aCwgYWx0R2x5cGhcbiAgICAvLyBUT0RPOiBhbGlnbm1lbnQtYWRqdXN0LCBiYXNlbGluZS1zaGlmdFxuICAgIC8qXG4gICAgaWYoIWFsaWdubWVudEJhc2VsaW5lKVxuICAgIGFsaWdubWVudEJhc2VsaW5lID0gdGhpcy5zdHlsZS5hbGlnbm1lbnRCYXNlbGluZSB8fCB0aGlzLmdldEF0dHJpYnV0ZSgnYWxpZ25tZW50LWJhc2VsaW5lJylcbiAgICAqL1xuXG4gIH0gd2hpbGUgKFxuICAgIChub2RlID0gbm9kZS5wYXJlbnROb2RlKVxuICAgICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFXG4gICAgJiYgKHRleHRDb250ZW50RWxlbWVudHMuaW5jbHVkZXMobm9kZS5ub2RlTmFtZSkpXG4gIClcblxuICByZXR1cm4ge1xuICAgIGZvbnRGYW1pbHksXG4gICAgZm9udFNpemUsXG4gICAgdGV4dEFuY2hvcjogdGV4dEFuY2hvciB8fCAnc3RhcnQnLFxuICAgIC8vIFRPRE86IHVzZSBjZW50cmFsIGZvciB3cml0aW5nLW1vZGUgPT09IGhvcml6b250YWwgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS9kb21pbmFudC1iYXNlbGluZVxuICAgIGRvbWluYW50QmFzZWxpbmU6IGRvbWluYW50QmFzZWxpbmUgfHwgJ2FscGhhYmV0aWNhbCdcbiAgICAvLyBmb250RmFtaWx5TWFwcGluZ3M6IHRoaXMub3duZXJEb2N1bWVudC5mb250RmFtaWx5TWFwcGluZ3MsXG4gICAgLy8gZm9udERpcjogdGhpcy5vd25lckRvY3VtZW50LmZvbnREaXIsXG4gICAgLy8gcHJlbG9hZGVkOiB0aGlzLm93bmVyRG9jdW1lbnQuX3ByZWxvYWRlZFxuICB9XG59XG4iLCJpbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCdcbi8vIGltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnXG5pbXBvcnQgeyBkZWZhdWx0IGFzIF9fZGlybmFtZSB9IGZyb20gJy4vZGlybmFtZS5janMnIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuLy8gdXNlIHRoaXMgYXMgc29vbiBhcyBpbXBvcnQubWV0YSBpcyBzdGFuZGFyZGl6ZWRcbi8vIGNvbnN0IF9fZGlybmFtZSA9IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcblxuZXhwb3J0IGNvbnN0IGZvbnRTaXplID0gMTZcbmV4cG9ydCBjb25zdCBmb250RmFtaWx5ID0gJ3NhbnMtc2VyaWYnXG5leHBvcnQgY29uc3QgZm9udERpciA9IGpvaW4oX19kaXJuYW1lLCAnLi4vLi4vJywgJ2ZvbnRzLycpXG5leHBvcnQgY29uc3QgZm9udEZhbWlseU1hcHBpbmdzID0ge1xuICAnc2Fucy1zZXJpZic6ICdPcGVuU2Fucy1SZWd1bGFyLnR0ZicsXG4gICdPcGVuIFNhbnMnOiAnT3BlblNhbnMtUmVndWxhci50dGYnXG59XG4iLCJpbXBvcnQgeyBkZWNhbWVsaXplIH0gZnJvbSAnLi4vdXRpbHMvc3RyVXRpbHMuanMnXG5cbmV4cG9ydCBjb25zdCBvYmplY3RUb01hcCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKG9iaiBpbnN0YW5jZW9mIE1hcCkgcmV0dXJuIG5ldyBNYXAob2JqKVxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKG1hcCwga2V5KSA9PiBtYXAuc2V0KGtleSwgb2JqW2tleV0pLCBuZXcgTWFwKCkpXG59XG5cbmV4cG9ydCBjb25zdCBtYXBUb09iamVjdCA9IGZ1bmN0aW9uIChtYXApIHtcbiAgdmFyIG9iaiA9IHt9XG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZVxuICB9KVxuICByZXR1cm4gb2JqXG59XG5cbmV4cG9ydCBjb25zdCBtYXBNYXAgPSBmdW5jdGlvbiAobWFwLCBjYikge1xuICB2YXIgYXJyID0gW11cbiAgbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBhcnIucHVzaChjYih2YWx1ZSwga2V5KSlcbiAgfSlcbiAgcmV0dXJuIGFyclxufVxuXG5leHBvcnQgY29uc3QgbWFwVG9Dc3MgPSBmdW5jdGlvbiAobXlNYXApIHtcbiAgcmV0dXJuIG1hcE1hcChteU1hcCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gZGVjYW1lbGl6ZShrZXkpICsgJzogJyArIHZhbHVlXG4gIH0pLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuICEhZWwgfSkuam9pbignOyAnKSArICc7JyB8fCBudWxsXG59XG5cbmV4cG9ydCBjb25zdCBjc3NUb01hcCA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgcmV0dXJuIG5ldyBNYXAoY3NzLnNwbGl0KC9cXHMqO1xccyovKS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAhIWVsIH0pLm1hcChmdW5jdGlvbiAoZWwpIHtcbiAgICByZXR1cm4gZWwuc3BsaXQoL1xccyo6XFxzKi8pXG4gIH0pKVxufVxuIiwiXG5leHBvcnQgY29uc3Qgc3ZnID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ1xuZXhwb3J0IGNvbnN0IHhsaW5rID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnXG5leHBvcnQgY29uc3QgaHRtbCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJ1xuZXhwb3J0IGNvbnN0IG1hdGhtbCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJ1xuZXhwb3J0IGNvbnN0IHhtbCA9ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnXG5leHBvcnQgY29uc3QgeG1sbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nXG4iLCJleHBvcnQgY29uc3Qgbm9kZXNUb05vZGUgPSAobm9kZXMsIGRvY3VtZW50KSA9PiB7XG4gIG5vZGVzID0gbm9kZXMubWFwKChub2RlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpXG4gICAgfVxuICAgIHJldHVybiBub2RlXG4gIH0pXG4gIGlmIChub2Rlcy5sZW5ndGggPT09IDEpIHsgcmV0dXJuIG5vZGVzWzBdIH1cbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICBub2Rlcy5mb3JFYWNoKG5vZGUuYXBwZW5kQ2hpbGQsIG5vZGUpXG4gIHJldHVybiBub2RlXG59XG4iLCJleHBvcnQgY29uc3QgZXh0ZW5kID0gKC4uLm1vZHVsZXMpID0+IHtcbiAgdmFyIG1ldGhvZHMsIGtleSwgaVxuXG4gIC8vIEdldCBvYmplY3Qgd2l0aCBleHRlbnNpb25zXG4gIG1ldGhvZHMgPSBtb2R1bGVzLnBvcCgpXG5cbiAgZm9yIChpID0gbW9kdWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGZvciAoa2V5IGluIG1ldGhvZHMpIHsgbW9kdWxlc1tpXS5wcm90b3R5cGVba2V5XSA9IG1ldGhvZHNba2V5XSB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGV4dGVuZFN0YXRpYyA9ICguLi5tb2R1bGVzKSA9PiB7XG4gIHZhciBtZXRob2RzLCBrZXksIGlcblxuICAvLyBHZXQgb2JqZWN0IHdpdGggZXh0ZW5zaW9uc1xuICBtZXRob2RzID0gbW9kdWxlcy5wb3AoKVxuXG4gIGZvciAoaSA9IG1vZHVsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBmb3IgKGtleSBpbiBtZXRob2RzKSB7IG1vZHVsZXNbaV1ba2V5XSA9IG1ldGhvZHNba2V5XSB9XG4gIH1cbn1cblxuLy8gVE9ETzogcmVmYWN0b3Igc28gdGhhdCBpdCB0YWtlcyBhIGNsYXNzXG5leHBvcnQgY29uc3QgbWl4aW4gPSAobWl4aW4sIF9jbGFzcykgPT4ge1xuICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG1peGluKVxuICAvLyBjb25zdCBhbGwgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhtaXhpbilcblxuICAvLyBjb25zdCBwcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhkZXNjcmlwdG9ycylcbiAgLy8gY29uc3QgbWV0aG9kTmFtZXMgPSBhbGwuZmlsdGVyKHAgPT4gIXByb3BOYW1lcy5pbmNsdWRlcyhwKSlcblxuICAvLyBmb3IgKGNvbnN0IG1ldGhvZCBvZiBtZXRob2ROYW1lcykge1xuICAvLyAgIF9jbGFzcy5wcm90b3R5cGVbbWV0aG9kXSA9IG1peGluW21ldGhvZF1cbiAgLy8gfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKF9jbGFzcy5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKVxufVxuIiwiaW1wb3J0IHsgQm94LCBOb0JveCB9IGZyb20gJy4uL290aGVyL0JveC5qcydcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi4vb3RoZXIvUG9pbnQuanMnXG5pbXBvcnQgKiBhcyByZWdleCBmcm9tICcuL3JlZ2V4LmpzJ1xuLy8gVE9ETzogdXNlIG93biBtYXRyaXggaW1wbGVtZW50YXRpb25cbmltcG9ydCB7IG1hdHJpeEZhY3RvcnkgfSBmcm9tICcuLy4uL2RvbS9zdmcvU1ZHTWF0cml4LmpzJ1xuaW1wb3J0IHsgUG9pbnRDbG91ZCB9IGZyb20gJy4vUG9pbnRDbG91ZC5qcydcblxuY29uc3QgcGF0aEhhbmRsZXJzID0ge1xuICBNIChjLCBwLCByLCBwMCkge1xuICAgIHAueCA9IHAwLnggPSBjWzBdXG4gICAgcC55ID0gcDAueSA9IGNbMV1cblxuICAgIHJldHVybiBuZXcgTW92ZShwKVxuICB9LFxuICBMIChjLCBwKSB7XG4gICAgY29uc3QgcmV0ID0gbmV3IExpbmUocC54LCBwLnksIGNbMF0sIGNbMV0pLy8gLm9mZnNldChvKVxuICAgIHAueCA9IGNbMF1cbiAgICBwLnkgPSBjWzFdXG4gICAgcmV0dXJuIHJldFxuICB9LFxuICBIIChjLCBwKSB7XG4gICAgcmV0dXJuIHBhdGhIYW5kbGVycy5MKFsgY1swXSwgcC55IF0sIHApXG4gIH0sXG4gIFYgKGMsIHApIHtcbiAgICByZXR1cm4gcGF0aEhhbmRsZXJzLkwoWyBwLngsIGNbMF0gXSwgcClcbiAgfSxcbiAgUSAoYywgcCwgcikge1xuICAgIGNvbnN0IHJldCA9IEN1YmljLmZyb21RdWFkKHAsIG5ldyBQb2ludChjWzBdLCBjWzFdKSwgbmV3IFBvaW50KGNbMl0sIGNbM10pKS8vIC5vZmZzZXQobylcbiAgICBwLnggPSBjWzJdXG4gICAgcC55ID0gY1szXVxuXG4gICAgY29uc3QgcmVmbGVjdCA9IG5ldyBQb2ludChjWzBdLCBjWzFdKS5yZWZsZWN0QXQocClcbiAgICByLnggPSByZWZsZWN0LnhcbiAgICByLnkgPSByZWZsZWN0LnlcblxuICAgIHJldHVybiByZXRcbiAgfSxcbiAgVCAoYywgcCwgciwgcDAsIHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKSB7XG4gICAgaWYgKHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKSB7IGMgPSBbIHIueCwgci55IF0uY29uY2F0KGMpIH0gZWxzZSB7IGMgPSBbIHAueCwgcC55IF0uY29uY2F0KGMpIH1cbiAgICByZXR1cm4gcGF0aEhhbmRsZXJzLlEoYywgcCwgcilcbiAgfSxcbiAgQyAoYywgcCwgcikge1xuICAgIGNvbnN0IHJldCA9IG5ldyBDdWJpYyhwLCBuZXcgUG9pbnQoY1swXSwgY1sxXSksIG5ldyBQb2ludChjWzJdLCBjWzNdKSwgbmV3IFBvaW50KGNbNF0sIGNbNV0pKS8vIC5vZmZzZXQobylcbiAgICBwLnggPSBjWzRdXG4gICAgcC55ID0gY1s1XVxuICAgIGNvbnN0IHJlZmxlY3QgPSBuZXcgUG9pbnQoY1syXSwgY1szXSkucmVmbGVjdEF0KHApXG4gICAgci54ID0gcmVmbGVjdC54XG4gICAgci55ID0gcmVmbGVjdC55XG4gICAgcmV0dXJuIHJldFxuICB9LFxuICBTIChjLCBwLCByLCBwMCwgcmVmbGVjdGlvbklzUG9zc2libGUpIHtcbiAgICAvLyByZWZsZWN0aW9uIG1ha2VzIG9ubHkgc2Vuc2UgaWYgdGhpcyBjb21tYW5kIHdhcyBwcmVjZWVkZWQgYnkgYW5vdGhlciBiZXppZXJlIGNvbW1hbmQgKFFUU0MpXG4gICAgaWYgKHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKSB7IGMgPSBbIHIueCwgci55IF0uY29uY2F0KGMpIH0gZWxzZSB7IGMgPSBbIHAueCwgcC55IF0uY29uY2F0KGMpIH1cbiAgICByZXR1cm4gcGF0aEhhbmRsZXJzLkMoYywgcCwgcilcbiAgfSxcbiAgWiAoYywgcCwgciwgcDApIHtcbiAgICAvLyBGSVhNRTogVGhlIGJlaGF2aW9yIG9mIFogZGVwZW5kcyBvbiB0aGUgY29tbWFuZCBiZWZvcmVcbiAgICByZXR1cm4gcGF0aEhhbmRsZXJzLkwoWyBwMC54LCBwMC55IF0sIHApXG4gIH0sXG4gIEEgKGMsIHAsIHIpIHtcbiAgICBjb25zdCByZXQgPSBuZXcgQXJjKHAsIG5ldyBQb2ludChjWzVdLCBjWzZdKSwgY1swXSwgY1sxXSwgY1syXSwgY1szXSwgY1s0XSlcbiAgICBwLnggPSBjWzVdXG4gICAgcC55ID0gY1s2XVxuICAgIHJldHVybiByZXRcbiAgfVxufVxuXG5jb25zdCBtbGh2cXRjc2EgPSAnbWxodnF0Y3Nheicuc3BsaXQoJycpXG5cbmZvciAobGV0IGkgPSAwLCBpbCA9IG1saHZxdGNzYS5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gIHBhdGhIYW5kbGVyc1ttbGh2cXRjc2FbaV1dID0gKGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjLCBwLCByLCBwMCwgcmVmbGVjdGlvbklzUG9zc2libGUpIHtcbiAgICAgIGlmIChpID09PSAnSCcpIGNbMF0gPSBjWzBdICsgcC54XG4gICAgICBlbHNlIGlmIChpID09PSAnVicpIGNbMF0gPSBjWzBdICsgcC55XG4gICAgICBlbHNlIGlmIChpID09PSAnQScpIHtcbiAgICAgICAgY1s1XSA9IGNbNV0gKyBwLnhcbiAgICAgICAgY1s2XSA9IGNbNl0gKyBwLnlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBqbCA9IGMubGVuZ3RoOyBqIDwgamw7ICsraikge1xuICAgICAgICAgIGNbal0gPSBjW2pdICsgKGogJSAyID8gcC55IDogcC54KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXRoSGFuZGxlcnNbaV0oYywgcCwgciwgcDAsIHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKVxuICAgIH1cbiAgfSkobWxodnF0Y3NhW2ldLnRvVXBwZXJDYXNlKCkpXG59XG5cbmZ1bmN0aW9uIHBhdGhSZWdSZXBsYWNlIChhLCBiLCBjLCBkKSB7XG4gIHJldHVybiBjICsgZC5yZXBsYWNlKHJlZ2V4LmRvdHMsICcgLicpXG59XG5cbmZ1bmN0aW9uIGlzQmV6aWVyZSAob2JqKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBDdWJpY1xufVxuXG5leHBvcnQgY29uc3QgcGF0aFBhcnNlciA9IChhcnJheSkgPT4ge1xuXG4gIC8vIHByZXBhcmUgZm9yIHBhcnNpbmdcbiAgY29uc3QgcGFyYW1DbnQgPSB7IE06IDIsIEw6IDIsIEg6IDEsIFY6IDEsIEM6IDYsIFM6IDQsIFE6IDQsIFQ6IDIsIEE6IDcsIFo6IDAgfVxuXG4gIGFycmF5ID0gYXJyYXlcbiAgICAucmVwbGFjZShyZWdleC5udW1iZXJzV2l0aERvdHMsIHBhdGhSZWdSZXBsYWNlKSAvLyBjb252ZXJ0IDQ1LjEyMy4xMjMgdG8gNDUuMTIzIC4xMjNcbiAgICAucmVwbGFjZShyZWdleC5wYXRoTGV0dGVycywgJyAkJiAnKSAvLyBwdXQgc29tZSByb29tIGJldHdlZW4gbGV0dGVycyBhbmQgbnVtYmVyc1xuICAgIC5yZXBsYWNlKHJlZ2V4Lmh5cGhlbiwgJyQxIC0nKSAvLyBhZGQgc3BhY2UgYmVmb3JlIGh5cGhlblxuICAgIC50cmltKCkgLy8gdHJpbVxuICAgIC5zcGxpdChyZWdleC5kZWxpbWl0ZXIpIC8vIHNwbGl0IGludG8gYXJyYXlcblxuICAvLyBhcnJheSBub3cgaXMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgcGFydHMgb2YgYSBwYXRoIGUuZy4gWydNJywgJzAnLCAnMCcsICdMJywgJzMwJywgJzMwJyAuLi5dXG4gIGNvbnN0IGFyciA9IFtdXG4gIGNvbnN0IHAgPSBuZXcgUG9pbnQoKVxuICBjb25zdCBwMCA9IG5ldyBQb2ludCgpXG4gIGNvbnN0IHIgPSBuZXcgUG9pbnQoKVxuICBsZXQgaW5kZXggPSAwXG4gIGNvbnN0IGxlbiA9IGFycmF5Lmxlbmd0aFxuICBsZXQgc1xuXG4gIGRvIHtcbiAgICAvLyBUZXN0IGlmIHdlIGhhdmUgYSBwYXRoIGxldHRlclxuICAgIGlmIChyZWdleC5pc1BhdGhMZXR0ZXIudGVzdChhcnJheVtpbmRleF0pKSB7XG4gICAgICBzID0gYXJyYXlbaW5kZXhdXG4gICAgICArK2luZGV4XG4gICAgLy8gSWYgbGFzdCBsZXR0ZXIgd2FzIGEgbW92ZSBjb21tYW5kIGFuZCB3ZSBnb3Qgbm8gbmV3LCBpdCBkZWZhdWx0cyB0byBbTF1pbmVcbiAgICB9IGVsc2UgaWYgKHMgPT09ICdNJykge1xuICAgICAgcyA9ICdMJ1xuICAgIH0gZWxzZSBpZiAocyA9PT0gJ20nKSB7XG4gICAgICBzID0gJ2wnXG4gICAgfVxuXG4gICAgYXJyLnB1c2goXG4gICAgICBwYXRoSGFuZGxlcnNbc10uY2FsbChudWxsLFxuICAgICAgICBhcnJheS5zbGljZShpbmRleCwgKGluZGV4ID0gaW5kZXggKyBwYXJhbUNudFtzLnRvVXBwZXJDYXNlKCldKSkubWFwKHBhcnNlRmxvYXQpLFxuICAgICAgICBwLCByLCBwMCxcbiAgICAgICAgaXNCZXppZXJlKGFyclthcnIubGVuZ3RoIC0gMV0pXG4gICAgICApXG4gICAgKVxuXG4gIH0gd2hpbGUgKGxlbiA+IGluZGV4KVxuXG4gIHJldHVybiBhcnJcbn1cblxuY2xhc3MgTW92ZSB7XG4gIGNvbnN0cnVjdG9yIChwKSB7XG4gICAgdGhpcy5wMSA9IHAuY2xvbmUoKVxuICB9XG5cbiAgLy8gRklYTUU6IFVzZSBwb2ludGNsb3VkXG4gIGJib3ggKCkge1xuICAgIGNvbnN0IHAgPSB0aGlzLnAxXG4gICAgcmV0dXJuIG5ldyBCb3gocC54LCBwLnksIDAsIDApXG4gIH1cblxuICBnZXRDbG91ZCAoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludENsb3VkKFsgdGhpcy5wMSBdKVxuICB9XG5cbiAgbGVuZ3RoICgpIHsgcmV0dXJuIDAgfVxuXG4gIHRvUGF0aCAoKSB7XG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLnAxLngsIHRoaXMucDEueSBdLmpvaW4oJyAnKVxuICB9XG5cbiAgdG9QYXRoRnJhZ21lbnQgKCkge1xuICAgIHJldHVybiBbICdNJywgdGhpcy5wMS54LCB0aGlzLnAxLnkgXVxuICB9XG5cbiAgdHJhbnNmb3JtIChtYXRyaXgpIHtcbiAgICB0aGlzLnAxLnRyYW5zZm9ybU8obWF0cml4KVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFyYyB7XG4gIGNvbnN0cnVjdG9yIChwMSwgcDIsIHJ4LCByeSwgz4YsIGFyYywgc3dlZXApIHtcbiAgICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvU1ZHL2ltcGxub3RlLmh0bWwjQXJjQ29ycmVjdGlvbk91dE9mUmFuZ2VSYWRpaVxuICAgIGlmICghcnggfHwgIXJ5KSByZXR1cm4gbmV3IExpbmUocDEsIHAyKVxuXG4gICAgcnggPSBNYXRoLmFicyhyeClcbiAgICByeSA9IE1hdGguYWJzKHJ5KVxuXG4gICAgdGhpcy5wMSA9IHAxLmNsb25lKClcbiAgICB0aGlzLnAyID0gcDIuY2xvbmUoKVxuICAgIHRoaXMuYXJjID0gYXJjID8gMSA6IDBcbiAgICB0aGlzLnN3ZWVwID0gc3dlZXAgPyAxIDogMFxuXG4gICAgLy8gQ2FsY3VsYXRlIGNvcyBhbmQgc2luIG9mIGFuZ2xlIHBoaVxuICAgIGNvbnN0IGNvc8+GID0gTWF0aC5jb3Moz4YgLyAxODAgKiBNYXRoLlBJKVxuICAgIGNvbnN0IHNpbs+GID0gTWF0aC5zaW4oz4YgLyAxODAgKiBNYXRoLlBJKVxuXG4gICAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRy9pbXBsbm90ZS5odG1sI0FyY0NvbnZlcnNpb25FbmRwb2ludFRvQ2VudGVyXG4gICAgLy8gKGVxLiA1LjEpXG4gICAgY29uc3QgcDFfID0gbmV3IFBvaW50KFxuICAgICAgKHAxLnggLSBwMi54KSAvIDIsXG4gICAgICAocDEueSAtIHAyLnkpIC8gMlxuICAgICkudHJhbnNmb3JtKG1hdHJpeEZhY3RvcnkoXG4gICAgICBjb3PPhiwgLXNpbs+GLCBzaW7PhiwgY29zz4YsIDAsIDBcbiAgICApKVxuXG4gICAgLy8gKGVxLiA2LjIpXG4gICAgLy8gTWFrZSBzdXJlIHRoZSByYWRpdXMgZml0IHdpdGggdGhlIGFyYyBhbmQgY29ycmVjdCBpZiBuZWNjZXNzYXJ5XG4gICAgY29uc3QgcmF0aW8gPSAocDFfLnggKiogMiAvIHJ4ICoqIDIpICsgKHAxXy55ICoqIDIgLyByeSAqKiAyKVxuXG4gICAgLy8gKGVxLiA2LjMpXG4gICAgaWYgKHJhdGlvID4gMSkge1xuICAgICAgcnggPSBNYXRoLnNxcnQocmF0aW8pICogcnhcbiAgICAgIHJ5ID0gTWF0aC5zcXJ0KHJhdGlvKSAqIHJ5XG4gICAgfVxuXG4gICAgLy8gKGVxLiA1LjIpXG4gICAgY29uc3QgcnhRdWFkID0gcnggKiogMlxuICAgIGNvbnN0IHJ5UXVhZCA9IHJ5ICoqIDJcblxuICAgIGNvbnN0IGRpdmlzb3IxID0gcnhRdWFkICogcDFfLnkgKiogMlxuICAgIGNvbnN0IGRpdmlzb3IyID0gcnlRdWFkICogcDFfLnggKiogMlxuICAgIGNvbnN0IGRpdmlkZW5kID0gKHJ4UXVhZCAqIHJ5UXVhZCAtIGRpdmlzb3IxIC0gZGl2aXNvcjIpXG5cbiAgICBsZXQgY19cbiAgICBpZiAoTWF0aC5hYnMoZGl2aWRlbmQpIDwgMWUtMTUpIHtcbiAgICAgIGNfID0gbmV3IFBvaW50KDAsIDApXG4gICAgfSBlbHNlIHtcbiAgICAgIGNfID0gbmV3IFBvaW50KFxuICAgICAgICByeCAqIHAxXy55IC8gcnksXG4gICAgICAgIC1yeSAqIHAxXy54IC8gcnhcbiAgICAgICkubXVsKE1hdGguc3FydChcbiAgICAgICAgZGl2aWRlbmQgLyAoZGl2aXNvcjEgKyBkaXZpc29yMilcbiAgICAgICkpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYXJjID09PSB0aGlzLnN3ZWVwKSBjXyA9IGNfLm11bCgtMSlcblxuICAgIC8vIChlcS4gNS4zKVxuICAgIGNvbnN0IGMgPSBjXy50cmFuc2Zvcm0obWF0cml4RmFjdG9yeShcbiAgICAgIGNvc8+GLCBzaW7PhiwgLXNpbs+GLCBjb3PPhiwgMCwgMFxuICAgICkpLmFkZChuZXcgUG9pbnQoXG4gICAgICAocDEueCArIHAyLngpIC8gMixcbiAgICAgIChwMS55ICsgcDIueSkgLyAyXG4gICAgKSlcblxuICAgIGNvbnN0IGFuZ2xlUG9pbnQgPSBuZXcgUG9pbnQoXG4gICAgICAocDFfLnggLSBjXy54KSAvIHJ4LFxuICAgICAgKHAxXy55IC0gY18ueSkgLyByeVxuICAgIClcblxuICAgIC8qIEZvciBlcS4gNS40IHNlZSBhbmdsZVRvIGZ1bmN0aW9uICovXG5cbiAgICAvLyAoZXEuIDUuNSlcbiAgICBjb25zdCDOuCA9IG5ldyBQb2ludCgxLCAwKS5hbmdsZVRvKGFuZ2xlUG9pbnQpXG5cbiAgICAvLyAoZXEuIDUuNilcbiAgICBsZXQgzpTOuCA9IGFuZ2xlUG9pbnQuYW5nbGVUbyhuZXcgUG9pbnQoXG4gICAgICAoLXAxXy54IC0gY18ueCkgLyByeCxcbiAgICAgICgtcDFfLnkgLSBjXy55KSAvIHJ5XG4gICAgKSlcblxuICAgIM6UzrggPSAozpTOuCAlICgyICogTWF0aC5QSSkpXG5cbiAgICBpZiAoIXN3ZWVwICYmIM6UzrggPiAwKSDOlM64IC09IDIgKiBNYXRoLlBJXG4gICAgaWYgKHN3ZWVwICYmIM6UzrggPCAwKSDOlM64ICs9IDIgKiBNYXRoLlBJXG5cbiAgICB0aGlzLmMgPSBjXG4gICAgdGhpcy50aGV0YSA9IM64ICogMTgwIC8gTWF0aC5QSVxuICAgIHRoaXMudGhldGEyID0gKM64ICsgzpTOuCkgKiAxODAgLyBNYXRoLlBJXG5cbiAgICB0aGlzLmRlbHRhID0gzpTOuCAqIDE4MCAvIE1hdGguUElcbiAgICB0aGlzLnJ4ID0gcnhcbiAgICB0aGlzLnJ5ID0gcnlcbiAgICB0aGlzLnBoaSA9IM+GXG4gICAgdGhpcy5jb3PPhiA9IGNvc8+GXG4gICAgdGhpcy5zaW7PhiA9IHNpbs+GXG4gIH1cblxuICBzdGF0aWMgZnJvbUNlbnRlckZvcm0gKGMsIHJ4LCByeSwgz4YsIM64LCDOlM64KSB7XG4gICAgY29uc3QgY29zz4YgPSBNYXRoLmNvcyjPhiAvIDE4MCAqIE1hdGguUEkpXG4gICAgY29uc3Qgc2luz4YgPSBNYXRoLnNpbijPhiAvIDE4MCAqIE1hdGguUEkpXG4gICAgY29uc3QgbSA9IG1hdHJpeEZhY3RvcnkoY29zz4YsIHNpbs+GLCAtc2luz4YsIGNvc8+GLCAwLCAwKVxuXG4gICAgY29uc3QgcDEgPSBuZXcgUG9pbnQoXG4gICAgICByeCAqIE1hdGguY29zKM64IC8gMTgwICogTWF0aC5QSSksXG4gICAgICByeSAqIE1hdGguc2luKM64IC8gMTgwICogTWF0aC5QSSlcbiAgICApLnRyYW5zZm9ybShtKS5hZGQoYylcblxuICAgIGNvbnN0IHAyID0gbmV3IFBvaW50KFxuICAgICAgcnggKiBNYXRoLmNvcygozrggKyDOlM64KSAvIDE4MCAqIE1hdGguUEkpLFxuICAgICAgcnkgKiBNYXRoLnNpbigozrggKyDOlM64KSAvIDE4MCAqIE1hdGguUEkpXG4gICAgKS50cmFuc2Zvcm0obSkuYWRkKGMpXG5cbiAgICBjb25zdCBhcmMgPSBNYXRoLmFicyjOlM64KSA+IDE4MCA/IDEgOiAwXG4gICAgY29uc3Qgc3dlZXAgPSDOlM64ID4gMCA/IDEgOiAwXG5cbiAgICByZXR1cm4gbmV3IEFyYyhwMSwgcDIsIHJ4LCByeSwgz4YsIGFyYywgc3dlZXApXG4gIH1cblxuICBiYm94ICgpIHtcbiAgICBjb25zdCBjbG91ZCA9IHRoaXMuZ2V0Q2xvdWQoKVxuICAgIHJldHVybiBjbG91ZC5iYm94KClcbiAgfVxuXG4gIGNsb25lICgpIHtcbiAgICByZXR1cm4gbmV3IEFyYyh0aGlzLnAxLCB0aGlzLnAyLCB0aGlzLnJ4LCB0aGlzLnJ5LCB0aGlzLnBoaSwgdGhpcy5hcmMsIHRoaXMuc3dlZXApXG4gIH1cblxuICBnZXRDbG91ZCAoKSB7XG4gICAgaWYgKHRoaXMucDEuZXF1YWxzKHRoaXMucDIpKSByZXR1cm4gbmV3IFBvaW50Q2xvdWQoWyB0aGlzLnAxIF0pXG5cbiAgICAvLyBhcmMgY291bGQgYmUgcm90YXRlZC4gdGhlIG1pbiBhbmQgbWF4IHZhbHVlcyB0aGVuIGRvbnQgbGllIG9uIG11bHRpcGxlcyBvZiA5MCBkZWdyZXNzIGJ1dCBhcmUgc2hpZnRlZCBieSB0aGUgcm90YXRpb24gYW5nbGVcbiAgICAvLyBzbyB3ZSBmaXJzdCBjYWxjdWxhdGUgb3VyIDAvOTAgZGVncmVlIGFuZ2xlXG4gICAgbGV0IM64MDEgPSBNYXRoLmF0YW4oLXRoaXMuc2luz4YgLyB0aGlzLmNvc8+GICogdGhpcy5yeSAvIHRoaXMucngpICogMTgwIC8gTWF0aC5QSVxuICAgIGxldCDOuDAyID0gTWF0aC5hdGFuKHRoaXMuY29zz4YgLyB0aGlzLnNpbs+GICogdGhpcy5yeSAvIHRoaXMucngpICogMTgwIC8gTWF0aC5QSVxuICAgIGxldCDOuDEgPSB0aGlzLnRoZXRhXG4gICAgbGV0IM64MiA9IHRoaXMudGhldGEyXG5cbiAgICBpZiAozrgxIDwgMCB8fCDOuDIgPCAwKSB7XG4gICAgICDOuDEgKz0gMzYwXG4gICAgICDOuDIgKz0gMzYwXG4gICAgfVxuXG4gICAgaWYgKM64MiA8IM64MSkge1xuICAgICAgY29uc3QgdGVtcCA9IM64MVxuICAgICAgzrgxID0gzrgyXG4gICAgICDOuDIgPSB0ZW1wXG5cbiAgICB9XG5cbiAgICB3aGlsZSAozrgwMSAtIDkwID4gzrgwMSkgzrgwMSAtPSA5MFxuICAgIHdoaWxlICjOuDAxIDwgzrgxKSDOuDAxICs9IDkwXG4gICAgd2hpbGUgKM64MDIgLSA5MCA+IM64MDIpIM64MDIgLT0gOTBcbiAgICB3aGlsZSAozrgwMiA8IM64MSkgzrgwMiArPSA5MFxuXG4gICAgY29uc3QgYW5nbGVUb1Rlc3QgPSBbIM64MDEsIM64MDIsICjOuDAxICsgOTApLCAozrgwMiArIDkwKSwgKM64MDEgKyAxODApLCAozrgwMiArIDE4MCksICjOuDAxICsgMjcwKSwgKM64MDIgKyAyNzApIF1cblxuICAgIGNvbnN0IHBvaW50cyA9IGFuZ2xlVG9UZXN0LmZpbHRlcihmdW5jdGlvbiAoYW5nbGUpIHtcbiAgICAgIHJldHVybiAoYW5nbGUgPiDOuDEgJiYgYW5nbGUgPCDOuDIpXG4gICAgfSkubWFwKGZ1bmN0aW9uIChhbmdsZSkge1xuICAgICAgd2hpbGUgKHRoaXMudGhldGEgPCBhbmdsZSkgYW5nbGUgLT0gMzYwXG4gICAgICByZXR1cm4gdGhpcy5wb2ludEF0KCgoYW5nbGUgLSB0aGlzLnRoZXRhKSAlIDM2MCkgLyAodGhpcy5kZWx0YSkpIC8vIFRPRE86IHJlcGxhY2UgdGhhdCBjYWxsIHdpdGggcG9pbnRBdEFuZ2xlXG4gICAgfS5iaW5kKHRoaXMpKS5jb25jYXQodGhpcy5wMSwgdGhpcy5wMilcblxuICAgIHJldHVybiBuZXcgUG9pbnRDbG91ZChwb2ludHMpXG4gIH1cblxuICBsZW5ndGggKCkge1xuICAgIGlmICh0aGlzLnAxLmVxdWFscyh0aGlzLnAyKSkgcmV0dXJuIDBcblxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMucDIuc3ViKHRoaXMucDEpLmFicygpXG5cbiAgICBjb25zdCByZXQgPSB0aGlzLnNwbGl0QXQoMC41KVxuICAgIGNvbnN0IGxlbjEgPSByZXRbMF0ucDIuc3ViKHJldFswXS5wMSkuYWJzKClcbiAgICBjb25zdCBsZW4yID0gcmV0WzFdLnAyLnN1YihyZXRbMV0ucDEpLmFicygpXG5cbiAgICBpZiAobGVuMSArIGxlbjIgLSBsZW5ndGggPCAwLjAwMDAxKSB7XG4gICAgICByZXR1cm4gbGVuMSArIGxlbjJcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0WzBdLmxlbmd0aCgpICsgcmV0WzFdLmxlbmd0aCgpXG4gIH1cblxuICBwb2ludEF0ICh0KSB7XG4gICAgaWYgKHRoaXMucDEuZXF1YWxzKHRoaXMucDIpKSByZXR1cm4gdGhpcy5wMS5jbG9uZSgpXG5cbiAgICBjb25zdCB0SW5BbmdsZSA9ICh0aGlzLnRoZXRhICsgdCAqIHRoaXMuZGVsdGEpIC8gMTgwICogTWF0aC5QSVxuICAgIGNvbnN0IHNpbs64ID0gTWF0aC5zaW4odEluQW5nbGUpXG4gICAgY29uc3QgY29zzrggPSBNYXRoLmNvcyh0SW5BbmdsZSlcblxuICAgIHJldHVybiBuZXcgUG9pbnQoXG4gICAgICB0aGlzLmNvc8+GICogdGhpcy5yeCAqIGNvc864IC0gdGhpcy5zaW7PhiAqIHRoaXMucnkgKiBzaW7OuCArIHRoaXMuYy54LFxuICAgICAgdGhpcy5zaW7PhiAqIHRoaXMucnkgKiBjb3POuCArIHRoaXMuY29zz4YgKiB0aGlzLnJ4ICogc2luzrggKyB0aGlzLmMueVxuICAgIClcbiAgfVxuXG4gIHNwbGl0QXQgKHQpIHtcbiAgICBjb25zdCBhYnNEZWx0YSA9IE1hdGguYWJzKHRoaXMuZGVsdGEpXG4gICAgY29uc3QgZGVsdGExID0gYWJzRGVsdGEgKiB0XG4gICAgY29uc3QgZGVsdGEyID0gYWJzRGVsdGEgKiAoMSAtIHQpXG5cbiAgICBjb25zdCBwb2ludEF0VCA9IHRoaXMucG9pbnRBdCh0KVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBBcmModGhpcy5wMSwgcG9pbnRBdFQsIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCBkZWx0YTEgPiAxODAsIHRoaXMuc3dlZXApLFxuICAgICAgbmV3IEFyYyhwb2ludEF0VCwgdGhpcy5wMiwgdGhpcy5yeCwgdGhpcy5yeSwgdGhpcy5waGksIGRlbHRhMiA+IDE4MCwgdGhpcy5zd2VlcClcbiAgICBdXG4gIH1cblxuICB0b1BhdGggKCkge1xuICAgIHJldHVybiBbICdNJywgdGhpcy5wMS54LCB0aGlzLnAxLnksICdBJywgdGhpcy5yeCwgdGhpcy5yeSwgdGhpcy5waGksIHRoaXMuYXJjLCB0aGlzLnN3ZWVwLCB0aGlzLnAyLngsIHRoaXMucDIueSBdLmpvaW4oJyAnKVxuICB9XG5cbiAgdG9QYXRoRnJhZ21lbnQgKCkge1xuICAgIHJldHVybiBbICdBJywgdGhpcy5yeCwgdGhpcy5yeSwgdGhpcy5waGksIHRoaXMuYXJjLCB0aGlzLnN3ZWVwLCB0aGlzLnAyLngsIHRoaXMucDIueSBdXG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIGBwMTogJHt0aGlzLnAxLngudG9GaXhlZCg0KX0gJHt0aGlzLnAxLnkudG9GaXhlZCg0KX0sIHAyOiAke3RoaXMucDIueC50b0ZpeGVkKDQpfSAke3RoaXMucDIueS50b0ZpeGVkKDQpfSwgYzogJHt0aGlzLmMueC50b0ZpeGVkKDQpfSAke3RoaXMuYy55LnRvRml4ZWQoNCl9IHRoZXRhOiAke3RoaXMudGhldGEudG9GaXhlZCg0KX0sIHRoZXRhMjogJHt0aGlzLnRoZXRhMi50b0ZpeGVkKDQpfSwgZGVsdGE6ICR7dGhpcy5kZWx0YS50b0ZpeGVkKDQpfSwgbGFyZ2U6ICR7dGhpcy5hcmN9LCBzd2VlcDogJHt0aGlzLnN3ZWVwfWBcbiAgfVxuXG4gIHRyYW5zZm9ybSAobWF0cml4KSB7XG4gICAgcmV0dXJuIG5ldyBBcmModGhpcy5wMS50cmFuc2Zvcm0obWF0cml4KSwgdGhpcy5wMi50cmFuc2Zvcm0obWF0cml4KSwgdGhpcy5yeCwgdGhpcy5yeSwgdGhpcy5waGksIHRoaXMuYXJjLCB0aGlzLnN3ZWVwKVxuICB9XG59XG5cbmNsYXNzIEN1YmljIHtcbiAgY29uc3RydWN0b3IgKHAxLCBjMSwgYzIsIHAyKSB7XG4gICAgaWYgKHAxIGluc3RhbmNlb2YgUG9pbnQpIHtcbiAgICAgIHRoaXMucDEgPSBuZXcgUG9pbnQocDEpXG4gICAgICB0aGlzLmMxID0gbmV3IFBvaW50KGMxKVxuICAgICAgdGhpcy5jMiA9IG5ldyBQb2ludChjMilcbiAgICAgIHRoaXMucDIgPSBuZXcgUG9pbnQocDIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucDEgPSBuZXcgUG9pbnQocDEucDEpXG4gICAgICB0aGlzLmMxID0gbmV3IFBvaW50KHAxLmMxKVxuICAgICAgdGhpcy5jMiA9IG5ldyBQb2ludChwMS5jMilcbiAgICAgIHRoaXMucDIgPSBuZXcgUG9pbnQocDEucDIpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21RdWFkIChwMSwgYywgcDIpIHtcbiAgICBjb25zdCBjMSA9IHAxLm11bCgxIC8gMykuYWRkKGMubXVsKDIgLyAzKSlcbiAgICBjb25zdCBjMiA9IGMubXVsKDIgLyAzKS5hZGQocDIubXVsKDEgLyAzKSlcbiAgICByZXR1cm4gbmV3IEN1YmljKHAxLCBjMSwgYzIsIHAyKVxuICB9XG5cbiAgYmJveCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2xvdWQoKS5iYm94KClcbiAgfVxuXG4gIGZpbmRSb290cyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZFJvb3RzWCgpLmNvbmNhdCh0aGlzLmZpbmRSb290c1koKSlcbiAgfVxuXG4gIGZpbmRSb290c1ggKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRSb290c1hZKHRoaXMucDEueCwgdGhpcy5jMS54LCB0aGlzLmMyLngsIHRoaXMucDIueClcbiAgfVxuXG4gIGZpbmRSb290c1hZIChwMSwgcDIsIHAzLCBwNCkge1xuICAgIGNvbnN0IGEgPSAzICogKC1wMSArIDMgKiBwMiAtIDMgKiBwMyArIHA0KVxuICAgIGNvbnN0IGIgPSA2ICogKHAxIC0gMiAqIHAyICsgcDMpXG4gICAgY29uc3QgYyA9IDMgKiAocDIgLSBwMSlcblxuICAgIGlmIChhID09PSAwKSByZXR1cm4gWyAtYyAvIGIgXS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbCA+IDAgJiYgZWwgPCAxIH0pXG5cbiAgICBpZiAoYiAqIGIgLSA0ICogYSAqIGMgPCAwKSByZXR1cm4gW11cbiAgICBpZiAoYiAqIGIgLSA0ICogYSAqIGMgPT09IDApIHJldHVybiBbIE1hdGgucm91bmQoKC1iIC8gKDIgKiBhKSkgKiAxMDAwMDApIC8gMTAwMDAwIF0uZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwgPiAwICYmIGVsIDwgMSB9KVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIE1hdGgucm91bmQoKC1iICsgTWF0aC5zcXJ0KGIgKiBiIC0gNCAqIGEgKiBjKSkgLyAoMiAqIGEpICogMTAwMDAwKSAvIDEwMDAwMCxcbiAgICAgIE1hdGgucm91bmQoKC1iIC0gTWF0aC5zcXJ0KGIgKiBiIC0gNCAqIGEgKiBjKSkgLyAoMiAqIGEpICogMTAwMDAwKSAvIDEwMDAwMFxuICAgIF0uZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwgPiAwICYmIGVsIDwgMSB9KVxuICB9XG5cbiAgZmluZFJvb3RzWSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZFJvb3RzWFkodGhpcy5wMS55LCB0aGlzLmMxLnksIHRoaXMuYzIueSwgdGhpcy5wMi55KVxuICB9XG5cbiAgZmxhdG5lc3MgKCkge1xuICAgIGxldCB1eCA9IE1hdGgucG93KDMgKiB0aGlzLmMxLnggLSAyICogdGhpcy5wMS54IC0gdGhpcy5wMi54LCAyKVxuICAgIGxldCB1eSA9IE1hdGgucG93KDMgKiB0aGlzLmMxLnkgLSAyICogdGhpcy5wMS55IC0gdGhpcy5wMi55LCAyKVxuICAgIGNvbnN0IHZ4ID0gTWF0aC5wb3coMyAqIHRoaXMuYzIueCAtIDIgKiB0aGlzLnAyLnggLSB0aGlzLnAxLngsIDIpXG4gICAgY29uc3QgdnkgPSBNYXRoLnBvdygzICogdGhpcy5jMi55IC0gMiAqIHRoaXMucDIueSAtIHRoaXMucDEueSwgMilcblxuICAgIGlmICh1eCA8IHZ4KSB7IHV4ID0gdnggfVxuICAgIGlmICh1eSA8IHZ5KSB7IHV5ID0gdnkgfVxuXG4gICAgcmV0dXJuIHV4ICsgdXlcbiAgfVxuXG4gIGdldENsb3VkICgpIHtcbiAgICBjb25zdCBwb2ludHMgPSB0aGlzLmZpbmRSb290cygpXG4gICAgICAuZmlsdGVyKHJvb3QgPT4gcm9vdCAhPT0gMCAmJiByb290ICE9PSAxKVxuICAgICAgLm1hcChyb290ID0+IHRoaXMucG9pbnRBdChyb290KSlcbiAgICAgIC5jb25jYXQodGhpcy5wMSwgdGhpcy5wMilcblxuICAgIHJldHVybiBuZXcgUG9pbnRDbG91ZChwb2ludHMpXG4gIH1cblxuICBsZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aEF0KClcbiAgfVxuXG4gIGxlbmd0aEF0ICh0ID0gMSkge1xuICAgIGNvbnN0IGN1cnZlcyA9IHRoaXMuc3BsaXRBdCh0KVswXS5tYWtlRmxhdCh0KVxuXG4gICAgbGV0IGxlbmd0aCA9IDBcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY3VydmVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gY3VydmVzW2ldLnAyLnN1YihjdXJ2ZXNbaV0ucDEpLmFicygpXG4gICAgfVxuXG4gICAgcmV0dXJuIGxlbmd0aFxuICB9XG5cbiAgbWFrZUZsYXQgKHQpIHtcbiAgICBpZiAodGhpcy5mbGF0bmVzcygpID4gMC4xNSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3BsaXRBdCgwLjUpXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGVsKSB7IHJldHVybiBlbC5tYWtlRmxhdCh0ICogMC41KSB9KVxuICAgICAgICAucmVkdWNlKGZ1bmN0aW9uIChsYXN0LCBjdXJyZW50KSB7IHJldHVybiBsYXN0LmNvbmNhdChjdXJyZW50KSB9LCBbXSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50X3ZhbHVlID0gdFxuICAgICAgcmV0dXJuIFsgdGhpcyBdXG4gICAgfVxuICB9XG5cbiAgcG9pbnRBdCAodCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQoXG4gICAgICAoMSAtIHQpICogKDEgLSB0KSAqICgxIC0gdCkgKiB0aGlzLnAxLnggKyAzICogKDEgLSB0KSAqICgxIC0gdCkgKiB0ICogdGhpcy5jMS54ICsgMyAqICgxIC0gdCkgKiB0ICogdCAqIHRoaXMuYzIueCArIHQgKiB0ICogdCAqIHRoaXMucDIueCxcbiAgICAgICgxIC0gdCkgKiAoMSAtIHQpICogKDEgLSB0KSAqIHRoaXMucDEueSArIDMgKiAoMSAtIHQpICogKDEgLSB0KSAqIHQgKiB0aGlzLmMxLnkgKyAzICogKDEgLSB0KSAqIHQgKiB0ICogdGhpcy5jMi55ICsgdCAqIHQgKiB0ICogdGhpcy5wMi55XG4gICAgKVxuICB9XG5cbiAgc3BsaXRBdCAoeikge1xuICAgIGNvbnN0IHggPSB0aGlzLnNwbGl0QXRTY2FsYXIoeiwgJ3gnKVxuICAgIGNvbnN0IHkgPSB0aGlzLnNwbGl0QXRTY2FsYXIoeiwgJ3knKVxuXG4gICAgY29uc3QgYSA9IG5ldyBDdWJpYyhcbiAgICAgIG5ldyBQb2ludCh4WzBdWzBdLCB5WzBdWzBdKSxcbiAgICAgIG5ldyBQb2ludCh4WzBdWzFdLCB5WzBdWzFdKSxcbiAgICAgIG5ldyBQb2ludCh4WzBdWzJdLCB5WzBdWzJdKSxcbiAgICAgIG5ldyBQb2ludCh4WzBdWzNdLCB5WzBdWzNdKVxuICAgIClcblxuICAgIGNvbnN0IGIgPSBuZXcgQ3ViaWMoXG4gICAgICBuZXcgUG9pbnQoeFsxXVswXSwgeVsxXVswXSksXG4gICAgICBuZXcgUG9pbnQoeFsxXVsxXSwgeVsxXVsxXSksXG4gICAgICBuZXcgUG9pbnQoeFsxXVsyXSwgeVsxXVsyXSksXG4gICAgICBuZXcgUG9pbnQoeFsxXVszXSwgeVsxXVszXSlcbiAgICApXG5cbiAgICByZXR1cm4gWyBhLCBiIF1cbiAgfVxuXG4gIHNwbGl0QXRTY2FsYXIgKHosIHApIHtcbiAgICBjb25zdCBwMSA9IHRoaXMucDFbcF1cbiAgICBjb25zdCBwMiA9IHRoaXMuYzFbcF1cbiAgICBjb25zdCBwMyA9IHRoaXMuYzJbcF1cbiAgICBjb25zdCBwNCA9IHRoaXMucDJbcF1cblxuICAgIGNvbnN0IHQgPSB6ICogeiAqIHogKiBwNCAtIDMgKiB6ICogeiAqICh6IC0gMSkgKiBwMyArIDMgKiB6ICogKHogLSAxKSAqICh6IC0gMSkgKiBwMiAtICh6IC0gMSkgKiAoeiAtIDEpICogKHogLSAxKSAqIHAxXG5cbiAgICByZXR1cm4gW1xuICAgICAgW1xuICAgICAgICBwMSxcbiAgICAgICAgeiAqIHAyIC0gKHogLSAxKSAqIHAxLFxuICAgICAgICB6ICogeiAqIHAzIC0gMiAqIHogKiAoeiAtIDEpICogcDIgKyAoeiAtIDEpICogKHogLSAxKSAqIHAxLFxuICAgICAgICB0XG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICB0LFxuICAgICAgICB6ICogeiAqIHA0IC0gMiAqIHogKiAoeiAtIDEpICogcDMgKyAoeiAtIDEpICogKHogLSAxKSAqIHAyLFxuICAgICAgICB6ICogcDQgLSAoeiAtIDEpICogcDMsXG4gICAgICAgIHA0XG4gICAgICBdXG4gICAgXVxuICB9XG5cbiAgdG9QYXRoICgpIHtcbiAgICByZXR1cm4gWyAnTScsIHRoaXMucDEueCwgdGhpcy5wMS55IF0uY29uY2F0KHRoaXMudG9QYXRoRnJhZ21lbnQoKSkuam9pbignICcpXG4gIH1cblxuICB0b1BhdGhGcmFnbWVudCAoKSB7XG4gICAgcmV0dXJuIFsgJ0MnLCB0aGlzLmMxLngsIHRoaXMuYzEueSwgdGhpcy5jMi54LCB0aGlzLmMyLnksIHRoaXMucDIueCwgdGhpcy5wMi55IF1cbiAgfVxuXG4gIHRyYW5zZm9ybSAobWF0cml4KSB7XG4gICAgdGhpcy5wMS50cmFuc2Zvcm1PKG1hdHJpeClcbiAgICB0aGlzLmMxLnRyYW5zZm9ybU8obWF0cml4KVxuICAgIHRoaXMuYzIudHJhbnNmb3JtTyhtYXRyaXgpXG4gICAgdGhpcy5wMi50cmFuc2Zvcm1PKG1hdHJpeClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbmNsYXNzIExpbmUge1xuICBjb25zdHJ1Y3RvciAoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBpZiAoeDEgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIHRoaXMucDEgPSBuZXcgUG9pbnQoeDEpXG4gICAgICB0aGlzLnAyID0gbmV3IFBvaW50KHkxKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnAxID0gbmV3IFBvaW50KHgxLCB5MSlcbiAgICAgIHRoaXMucDIgPSBuZXcgUG9pbnQoeDIsIHkyKVxuICAgIH1cbiAgfVxuXG4gIGJib3ggKCkge1xuICAgIHJldHVybiB0aGlzLmdldENsb3VkKCkuYmJveCgpXG4gIH1cblxuICBnZXRDbG91ZCAoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludENsb3VkKFsgdGhpcy5wMSwgdGhpcy5wMiBdKVxuICB9XG5cbiAgbGVuZ3RoICgpIHtcbiAgICByZXR1cm4gdGhpcy5wMi5zdWIodGhpcy5wMSkuYWJzKClcbiAgfVxuXG4gIHBvaW50QXQgKHQpIHtcbiAgICBjb25zdCB2ZWMgPSB0aGlzLnAyLnN1Yih0aGlzLnAxKS5tdWwodClcbiAgICByZXR1cm4gdGhpcy5wMS5hZGQodmVjKVxuICB9XG5cbiAgdG9QYXRoICgpIHtcbiAgICByZXR1cm4gWyAnTScsIHRoaXMucDEueCwgdGhpcy5wMS55LCB0aGlzLnAyLngsIHRoaXMucDIueSBdLmpvaW4oJyAnKVxuICB9XG5cbiAgdG9QYXRoRnJhZ21lbnQgKCkge1xuICAgIHJldHVybiBbICdMJywgdGhpcy5wMi54LCB0aGlzLnAyLnkgXVxuICB9XG5cbiAgdHJhbnNmb3JtIChtYXRyaXgpIHtcbiAgICB0aGlzLnAxLnRyYW5zZm9ybU8obWF0cml4KVxuICAgIHRoaXMucDIudHJhbnNmb3JtTyhtYXRyaXgpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcGF0aEJCb3ggPSBmdW5jdGlvbiAoZCkge1xuICByZXR1cm4gcGF0aFBhcnNlcihkKS5yZWR1Y2UoKGwsIGMpID0+IGwubWVyZ2UoYy5iYm94KCkpLCBuZXcgTm9Cb3goKSlcbn1cblxuZXhwb3J0IGNsYXNzIFBhdGhTZWdtZW50QXJyYXkgZXh0ZW5kcyBBcnJheSB7XG4gIGJib3ggKCkge1xuICAgIHJldHVybiB0aGlzLnJlZHVjZSgobCwgYykgPT4gbC5tZXJnZShjLmJib3goKSksIG5ldyBOb0JveCgpKVxuICB9XG5cbiAgY2xvdWQgKCkge1xuICAgIHJldHVybiB0aGlzLnJlZHVjZShcbiAgICAgIChjbG91ZCwgc2VnbWVudCkgPT4gc2VnbWVudC5nZXRDbG91ZCgpLm1lcmdlKGNsb3VkKSxcbiAgICAgIG5ldyBQb2ludENsb3VkKClcbiAgICApXG4gIH1cblxuICBtZXJnZSAob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy5jb25jYXQob3RoZXIpXG4gIH1cblxuICB0cmFuc2Zvcm0gKG1hdHJpeCkge1xuICAgIHJldHVybiB0aGlzLm1hcChzZWdtZW50ID0+IHNlZ21lbnQudHJhbnNmb3JtKG1hdHJpeCkpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldFBhdGhTZWdtZW50cyA9IGZ1bmN0aW9uIChkKSB7XG4gIHJldHVybiBuZXcgUGF0aFNlZ21lbnRBcnJheSguLi5wYXRoUGFyc2VyKGQpKVxufVxuXG5leHBvcnQgY29uc3QgcG9pbnRBdExlbmd0aCA9IGZ1bmN0aW9uIChkLCBsZW4pIHtcbiAgY29uc3Qgc2VncyA9IHBhdGhQYXJzZXIoZClcblxuICBjb25zdCBzZWdMZW5ndGhzID0gc2Vncy5tYXAoZWwgPT4gZWwubGVuZ3RoKCkpXG5cbiAgY29uc3QgbGVuZ3RoID0gc2VnTGVuZ3Rocy5yZWR1Y2UoKGwsIGMpID0+IGwgKyBjLCAwKVxuXG4gIGxldCBpID0gMFxuXG4gIGxldCB0ID0gbGVuIC8gbGVuZ3RoXG5cbiAgLy8gRklYTUU6IFBvcCBNb3ZlIGJlZm9yZSB1c2luZyBzaG9ydGN1dD9cbiAgLy8gc2hvcnRjdXQgZm9yIHRyaXZpYWwgY2FzZXNcbiAgaWYgKHQgPj0gMSkge1xuICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgcDIuIElmIG5vdCwgdXNlIHAxXG4gICAgaWYgKHNlZ3Nbc2Vncy5sZW5ndGggLSAxXS5wMikge1xuICAgICAgcmV0dXJuIHNlZ3Nbc2Vncy5sZW5ndGggLSAxXS5wMi5uYXRpdmUoKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc2Vnc1tzZWdzLmxlbmd0aCAtIDFdLnAxLm5hdGl2ZSgpXG4gICAgfVxuICB9XG5cbiAgaWYgKHQgPD0gMCkgcmV0dXJuIHNlZ3NbMF0ucDEubmF0aXZlKClcblxuICAvLyByZW1vdmUgbW92ZSBjb21tYW5kcyBhdCB0aGUgdmVyeSBlbmQgb2YgdGhlIHBhdGhcbiAgd2hpbGUgKHNlZ3Nbc2Vncy5sZW5ndGggLSAxXSBpbnN0YW5jZW9mIE1vdmUpIHNlZ3MucG9wKClcblxuICBsZXQgc2VnRW5kID0gMFxuXG4gIGZvciAoY29uc3QgaWwgPSBzZWdMZW5ndGhzLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICBjb25zdCBrID0gc2VnTGVuZ3Roc1tpXSAvIGxlbmd0aFxuICAgIHNlZ0VuZCArPSBrXG5cbiAgICBpZiAoc2VnRW5kID4gdCkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBjb25zdCByYXRpbyA9IGxlbmd0aCAvIHNlZ0xlbmd0aHNbaV1cbiAgdCA9IHJhdGlvICogKHQgLSBzZWdFbmQpICsgMVxuXG4gIHJldHVybiBzZWdzW2ldLnBvaW50QXQodCkubmF0aXZlKClcbn1cblxuZXhwb3J0IGNvbnN0IGxlbmd0aCA9IGZ1bmN0aW9uIChkKSB7XG4gIHJldHVybiBwYXRoUGFyc2VyKGQpXG4gICAgLnJlZHVjZSgobCwgYykgPT4gbCArIGMubGVuZ3RoKCksIDApXG59XG5cbmV4cG9ydCBjb25zdCBkZWJ1ZyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIGNvbnN0IHBhcnNlID0gcGF0aFBhcnNlcihub2RlLmdldEF0dHJpYnV0ZSgnZCcpKVxuXG4gIGNvbnN0IHJldCA9IHtcbiAgICBwYXRoczogcGFyc2UubWFwKGVsID0+IGVsLnRvUGF0aCgpKSxcbiAgICBmcmFnbWVudHM6IHBhcnNlLm1hcChlbCA9PiBlbC50b1BhdGhGcmFnbWVudCgpLmpvaW4oJyAnKSksXG4gICAgYmJveHM6IHBhcnNlLm1hcChlbCA9PiB7XG4gICAgICBjb25zdCBib3ggPSBlbC5iYm94KClcbiAgICAgIHJldHVybiBbIGJveC54LCBib3gueSwgYm94LndpZHRoLCBib3guaGVpZ2h0IF1cbiAgICB9KSxcbiAgICBiYm94OiBwYXJzZS5yZWR1Y2UoKGwsIGMpID0+IGwubWVyZ2UoYy5iYm94KCkpLCBuZXcgTm9Cb3goKSksXG4gICAgYmJveHNUcmFuc2Zvcm1lZDogcGFyc2UubWFwKGVsID0+IHtcbiAgICAgIHJldHVybiBlbC5nZXRDbG91ZCgpLnRyYW5zZm9ybShub2RlLm1hdHJpeGlmeSgpKS5iYm94KClcbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHJldCwge1xuICAgIGJib3hUcmFuc2Zvcm1lZDogcmV0LmJib3hzVHJhbnNmb3JtZWQucmVkdWNlKChsLCBjKSA9PiBsLm1lcmdlKGMpLCBuZXcgTm9Cb3goKSlcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldENsb3VkID0gKGQpID0+IHtcbiAgcmV0dXJuIHBhdGhQYXJzZXIoZCkucmVkdWNlKChjbG91ZCwgc2VnbWVudCkgPT5cbiAgICBzZWdtZW50LmdldENsb3VkKCkubWVyZ2UoY2xvdWQpLCBuZXcgUG9pbnRDbG91ZCgpXG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IHBhdGhGcm9tID0ge1xuICBib3ggKHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9KSB7XG4gICAgcmV0dXJuIGBNICR7eH0gJHt5fSBoICR7d2lkdGh9IHYgJHtoZWlnaHR9IEggJHt4fSBWICR7eX1gXG4gIH0sXG4gIHJlY3QgKG5vZGUpIHtcbiAgICBjb25zdCB3aWR0aCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykpIHx8IDBcbiAgICBjb25zdCBoZWlnaHQgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKSkgfHwgMFxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd4JykpIHx8IDBcbiAgICBjb25zdCB5ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneScpKSB8fCAwXG4gICAgcmV0dXJuIGBNICR7eH0gJHt5fSBoICR7d2lkdGh9IHYgJHtoZWlnaHR9IEggJHt4fSBWICR7eX1gXG4gIH0sXG4gIGNpcmNsZSAobm9kZSkge1xuICAgIGNvbnN0IHIgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCdyJykpIHx8IDBcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnY3gnKSkgfHwgMFxuICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCdjeScpKSB8fCAwXG5cbiAgICBpZiAociA9PT0gMCkgcmV0dXJuICdNMCAwJ1xuXG4gICAgcmV0dXJuIGBNICR7eCAtIHJ9ICR7eX0gQSAke3J9ICR7cn0gMCAwIDAgJHt4ICsgcn0gJHt5fSBBICR7cn0gJHtyfSAwIDAgMCAke3ggLSByfSAke3l9YFxuICB9LFxuICBlbGxpcHNlIChub2RlKSB7XG4gICAgY29uc3QgcnggPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCdyeCcpKSB8fCAwXG4gICAgY29uc3QgcnkgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCdyeScpKSB8fCAwXG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ2N4JykpIHx8IDBcbiAgICBjb25zdCB5ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnY3knKSkgfHwgMFxuXG4gICAgcmV0dXJuIGBNICR7eCAtIHJ4fSAke3l9IEEgJHtyeH0gJHtyeX0gMCAwIDAgJHt4ICsgcnh9ICR7eX0gQSAke3J4fSAke3J5fSAwIDAgMCAke3ggLSByeH0gJHt5fWBcbiAgfSxcbiAgbGluZSAobm9kZSkge1xuICAgIGNvbnN0IHgxID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneDEnKSkgfHwgMFxuICAgIGNvbnN0IHgyID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneDInKSkgfHwgMFxuICAgIGNvbnN0IHkxID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneTEnKSkgfHwgMFxuICAgIGNvbnN0IHkyID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneTInKSkgfHwgMFxuXG4gICAgcmV0dXJuIGBNICR7eDF9ICR7eTF9IEwgJHt4Mn0gJHt5Mn1gXG4gIH0sXG4gIHBvbHlnb24gKG5vZGUpIHtcbiAgICByZXR1cm4gYE0gJHtub2RlLmdldEF0dHJpYnV0ZSgncG9pbnRzJyl9IHpgXG4gIH0sXG4gIHBvbHlsaW5lIChub2RlKSB7XG4gICAgcmV0dXJuIGBNICR7bm9kZS5nZXRBdHRyaWJ1dGUoJ3BvaW50cycpfWBcbiAgfVxufVxuIiwiLy8gc3BsaXRzIGEgdHJhbnNmb3JtYXRpb24gY2hhaW5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1zID0gL1xcKVxccyosP1xccyovXG5cbi8vIHNwbGl0IGF0IHdoaXRlc3BhY2UgYW5kIGNvbW1hXG5leHBvcnQgY29uc3QgZGVsaW1pdGVyID0gL1tcXHMsXSsvXG5cbi8vIFRoZSBmb2xsb3dpbmcgcmVnZXggYXJlIHVzZWQgdG8gcGFyc2UgdGhlIGQgYXR0cmlidXRlIG9mIGEgcGF0aFxuXG4vLyBNYXRjaGVzIGFsbCBoeXBoZW5zIHdoaWNoIGFyZSBub3QgYWZ0ZXIgYW4gZXhwb25lbnRcbmV4cG9ydCBjb25zdCBoeXBoZW4gPSAvKFteZV0pLS9naVxuXG4vLyBSZXBsYWNlcyBhbmQgdGVzdHMgZm9yIGFsbCBwYXRoIGxldHRlcnNcbmV4cG9ydCBjb25zdCBwYXRoTGV0dGVycyA9IC9bTUxIVkNTUVRBWl0vZ2lcblxuLy8geWVzIHdlIG5lZWQgdGhpcyBvbmUsIHRvb1xuZXhwb3J0IGNvbnN0IGlzUGF0aExldHRlciA9IC9bTUxIVkNTUVRBWl0vaVxuXG4vLyBtYXRjaGVzIDAuMTU0LjIzLjQ1XG5leHBvcnQgY29uc3QgbnVtYmVyc1dpdGhEb3RzID0gLygoXFxkP1xcLlxcZCsoPzplWystXT9cXGQrKT8pKCg/OlxcLlxcZCsoPzplWystXT9cXGQrKT8pKykpKy9naVxuXG4vLyBtYXRjaGVzIC5cbmV4cG9ydCBjb25zdCBkb3RzID0gL1xcLi9nXG4iLCIvLyBFbnN1cmUgdG8gc2l4LWJhc2VkIGhleFxuZXhwb3J0IGNvbnN0IGZ1bGxIZXggPSBmdW5jdGlvbiAoaGV4KSB7XG4gIHJldHVybiBoZXgubGVuZ3RoID09PSA0XG4gICAgPyBbICcjJyxcbiAgICAgIGhleC5zdWJzdHJpbmcoMSwgMiksIGhleC5zdWJzdHJpbmcoMSwgMiksXG4gICAgICBoZXguc3Vic3RyaW5nKDIsIDMpLCBoZXguc3Vic3RyaW5nKDIsIDMpLFxuICAgICAgaGV4LnN1YnN0cmluZygzLCA0KSwgaGV4LnN1YnN0cmluZygzLCA0KVxuICAgIF0uam9pbignJykgOiBoZXhcbn1cblxuZXhwb3J0IGNvbnN0IGhleFRvUkdCID0gZnVuY3Rpb24gKHZhbE9yTWFwKSB7XG4gIGlmICh0eXBlb2YgdmFsT3JNYXAgaW5zdGFuY2VvZiBNYXApIHtcbiAgICBmb3IgKGNvbnN0IFsga2V5LCB2YWwgXSBvZiB2YWxPck1hcCkge1xuICAgICAgdmFsT3JNYXAuc2V0KGtleSwgaGV4VG9SR0IodmFsKSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbE9yTWFwXG4gIH1cblxuICBpZiAoIS8jWzAtOWEtZl17Myw2fS8udGVzdCh2YWxPck1hcCkpIHsgcmV0dXJuIHZhbE9yTWFwIH1cblxuICB2YWxPck1hcCA9IGZ1bGxIZXgodmFsT3JNYXApXG5cbiAgcmV0dXJuICdyZ2IoJyArIFtcbiAgICBwYXJzZUludCh2YWxPck1hcC5zbGljZSgxLCAzKSwgMTYpLFxuICAgIHBhcnNlSW50KHZhbE9yTWFwLnNsaWNlKDMsIDUpLCAxNiksXG4gICAgcGFyc2VJbnQodmFsT3JNYXAuc2xpY2UoNSwgNyksIDE2KVxuICBdLmpvaW4oJywnKSArICcpJ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVjYW1lbGl6ZSAocykge1xuICByZXR1cm4gU3RyaW5nKHMpLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csIGZ1bmN0aW9uIChtLCBnMSwgZzIpIHtcbiAgICByZXR1cm4gZzEgKyAnLScgKyBnMi50b0xvd2VyQ2FzZSgpXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW1lbENhc2UgKHMpIHtcbiAgcmV0dXJuIFN0cmluZyhzKS5yZXBsYWNlKC8oW2Etel0pLShbYS16XSkvZywgZnVuY3Rpb24gKG0sIGcxLCBnMikge1xuICAgIHJldHVybiBnMSArIGcyLnRvVXBwZXJDYXNlKClcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVF1b3RlcyAoc3RyKSB7XG4gIGlmIChzdHIuc3RhcnRzV2l0aCgnXCInKSB8fCBzdHIuc3RhcnRzV2l0aChcIidcIikpIHtcbiAgICByZXR1cm4gc3RyLnNsaWNlKDEsIC0xKVxuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxFbnRpdGllcyAoc3RyKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyKS5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7JykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmh0bWxFbnRpdGllcyAoc3RyKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyKS5yZXBsYWNlKC8mYW1wOy9nLCAnJicpLnJlcGxhY2UoLyZsdDsvZywgJzwnKS5yZXBsYWNlKC8mZ3Q7L2csICc+JykucmVwbGFjZSgnJnF1b3Q7JywgJ1wiJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNkYXRhIChzdHIpIHtcbiAgcmV0dXJuIGA8IVtDREFUQVske3N0cn1dXT5gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21tZW50IChzdHIpIHtcbiAgcmV0dXJuIGA8IS0tJHtzdHJ9LS0+YFxufVxuXG5leHBvcnQgY29uc3Qgc3BsaXROb3RJbkJyYWNrZXRzID0gKHN0ciwgZGVsaW1pdGVyKSA9PiB7XG4gIHZhciByb3VuZEJyYWNrZXRzID0gMFxuXG4gIHZhciBzcXVhcmVCcmFja2V0cyA9IDBcblxuICB2YXIgbGFzdEluZGV4ID0gMFxuXG4gIHZhciBzcGxpdCA9IFtdXG5cbiAgdmFyIGNoOyB2YXIgaTsgdmFyIGlsXG5cbiAgZm9yIChpID0gMCwgaWwgPSBzdHIubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgIGNoID0gc3RyLmNoYXJBdChpKVxuXG4gICAgaWYgKGNoID09PSBkZWxpbWl0ZXIgJiYgIXJvdW5kQnJhY2tldHMgJiYgIXNxdWFyZUJyYWNrZXRzKSB7XG4gICAgICBzcGxpdC5wdXNoKHN0ci5zbGljZShsYXN0SW5kZXgsIGkpLnRyaW0oKSlcbiAgICAgIGxhc3RJbmRleCA9IGkgKyAxXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChjaCA9PT0gJygnKSArK3JvdW5kQnJhY2tldHNcbiAgICBlbHNlIGlmIChjaCA9PT0gJyknKSAtLXJvdW5kQnJhY2tldHNcbiAgICBlbHNlIGlmIChjaCA9PT0gJ1snKSArK3NxdWFyZUJyYWNrZXRzXG4gICAgZWxzZSBpZiAoY2ggPT09ICddJykgLS1zcXVhcmVCcmFja2V0c1xuICB9XG5cbiAgc3BsaXQucHVzaChzdHIuc2xpY2UobGFzdEluZGV4KS50cmltKCkpXG4gIHJldHVybiBzcGxpdFxufVxuIiwiY29uc3QgaHRtbEVudGl0aWVzID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxufVxuXG52YXIgZW1wdHlFbGVtZW50cyA9IHtcbiAgYnI6IHRydWUsXG4gIGhyOiB0cnVlLFxuICBpbWc6IHRydWUsXG4gIGxpbms6IHRydWVcbn1cblxuZXhwb3J0IGNvbnN0IHRhZyA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIGNvbnN0IGF0dHJzID0gWyAuLi5ub2RlLmF0dHJzIF0ubWFwKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgcmV0dXJuIChub2RlLnByZWZpeCA/IG5vZGUucHJlZml4ICsgJzonIDogJycpICsgbm9kZS5sb2NhbE5hbWUgKyAnPVwiJyArIGh0bWxFbnRpdGllcyhub2RlLnZhbHVlKSArICdcIidcbiAgfSlcblxuICBjb25zdCB7IHByZWZpeCwgbG9jYWxOYW1lIH0gPSBub2RlXG4gIGNvbnN0IHF1YWxpZmllZE5hbWUgPSAocHJlZml4ID8gcHJlZml4ICsgJzonIDogJycpICsgbG9jYWxOYW1lXG5cbiAgcmV0dXJuICc8JyArIFtdLmNvbmNhdChxdWFsaWZpZWROYW1lLCBhdHRycykuam9pbignICcpICsgJz4nICsgKGVtcHR5RWxlbWVudHNbcXVhbGlmaWVkTmFtZS50b0xvd2VyQ2FzZSgpXSA/ICcnIDogbm9kZS5pbm5lckhUTUwgKyAnPC8nICsgcXVhbGlmaWVkTmFtZSArICc+Jylcbn1cblxuZXhwb3J0IGNvbnN0IGNsb25lTm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG5cbiAgY29uc3QgeyBwcmVmaXgsIGxvY2FsTmFtZSwgbmFtZXNwYWNlVVJJOiBucywgbm9kZVZhbHVlLCBvd25lckRvY3VtZW50IH0gPSBub2RlXG5cbiAgLy8gQnVpbGQgdXAgdGhlIGNvcnJlY3RseSBjYXNlZCBxdWFsaWZpZWQgbmFtZVxuICBjb25zdCBxdWFsaWZpZWROYW1lID0gKHByZWZpeCA/IHByZWZpeCArICc6JyA6ICcnKSArIGxvY2FsTmFtZVxuXG4gIC8vIENoZWNrIGlmIG5vZGUgd2FzIGNyZWF0ZWQgdXNpbmcgbm9uLW5hbWVzcGFjZSBmdW5jdGlvbiB3aGljaCBjYW4gbGVhZCB0byA6IGluIHRoZSBsb2NhbE5hbWUuXG4gIC8vIFRoaXMgY2hlY2sgYWxsb3dzIGZhbHNlIG5lZ2F0aXZlcyBiZWNhdXNlIGBsb2NhbGAgb25seSBtYXR0ZXJzIElGIHRoZXJlIGFyZSA6IGluIHRoZSBsb2NhbE5hbWVcbiAgLy8gYW5kIHdlIGRvbnQgY2FyZSBhYm91dCBpdCB3aGVuIHRoZXJlIGFyZSBub25cbiAgY29uc3QgbG9jYWwgPSBsb2NhbE5hbWUuaW5jbHVkZXMoJzonKVxuXG4gIHZhciBjbG9uZSA9IG5ldyBub2RlLmNvbnN0cnVjdG9yKHF1YWxpZmllZE5hbWUsIHtcbiAgICBhdHRyczogbmV3IFNldChbIC4uLm5vZGUuYXR0cnMgXS5tYXAobm9kZSA9PiBub2RlLmNsb25lTm9kZSgpKSksXG4gICAgbm9kZVZhbHVlLFxuICAgIG93bmVyRG9jdW1lbnQsXG4gICAgbG9jYWxcbiAgfSwgbnMpXG5cbiAgcmV0dXJuIGNsb25lXG59XG4iLCJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGZvbnRraXQgZnJvbSAnZm9udGtpdCdcbmltcG9ydCAqIGFzIGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMuanMnXG5pbXBvcnQgeyBCb3gsIE5vQm94IH0gZnJvbSAnLi4vb3RoZXIvQm94LmpzJ1xuaW1wb3J0IHsgZ2V0Q29uZmlnLCBnZXRGb250cyB9IGZyb20gJy4uL2NvbmZpZy5qcydcblxuZXhwb3J0IGNvbnN0IHRleHRCQm94ID0gZnVuY3Rpb24gKHRleHQsIHgsIHksIGRldGFpbHMpIHtcblxuICBpZiAoIXRleHQpIHJldHVybiBuZXcgTm9Cb3goKVxuXG4gIGNvbnN0IGNvbmZpZyA9IGdldENvbmZpZygpXG4gIGNvbnN0IHByZWxvYWRlZCA9IGdldEZvbnRzKClcblxuICB2YXIgZmFtaWxpZXMgPSAoZGV0YWlscy5mb250RmFtaWx5IHx8IGRlZmF1bHRzLmZvbnRGYW1pbHkpLnNwbGl0KC9cXHMqLFxccyovKVxuICB2YXIgZm9udE1hcCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLmZvbnRGYW1pbHlNYXBwaW5ncywgY29uZmlnLmZvbnRGYW1pbHlNYXBwaW5ncylcbiAgdmFyIGZvbnRTaXplID0gZGV0YWlscy5mb250U2l6ZSB8fCBkZWZhdWx0cy5mb250U2l6ZVxuICB2YXIgZm9udERpciA9IGNvbmZpZy5mb250RGlyIHx8IGRlZmF1bHRzLmZvbnREaXJcbiAgdmFyIGZvbnRGYW1pbHlcbiAgdmFyIGZvbnRcblxuICBmb3IgKHZhciBpID0gMCwgaWwgPSBmYW1pbGllcy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgaWYgKGZvbnRNYXBbZmFtaWxpZXNbaV1dKSB7XG4gICAgICBmb250RmFtaWx5ID0gZmFtaWxpZXNbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKCFmb250RmFtaWx5KSB7XG4gICAgZm9udEZhbWlseSA9IGRlZmF1bHRzLmZvbnRGYW1pbHlcbiAgfVxuXG4gIGlmIChwcmVsb2FkZWRbZm9udEZhbWlseV0pIHtcbiAgICBmb250ID0gcHJlbG9hZGVkW2ZvbnRGYW1pbHldXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmpvaW4oZm9udERpciwgZm9udE1hcFtmb250RmFtaWx5XSlcbiAgICB0cnkge1xuICAgICAgZm9udCA9IGZvbnRraXQub3BlblN5bmMoZmlsZW5hbWUpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3Qgb3BlbiBmb250IFwiJHtmb250RmFtaWx5fVwiIGluIGZpbGUgXCIke2ZpbGVuYW1lfVwiLiAke2UudG9TdHJpbmcoKX1gKVxuICAgICAgcmV0dXJuIG5ldyBOb0JveCgpXG4gICAgfVxuXG4gICAgcHJlbG9hZGVkW2ZvbnRGYW1pbHldID0gZm9udFxuICB9XG5cbiAgdmFyIGZvbnRIZWlnaHQgPSBmb250LmFzY2VudCAtIGZvbnQuZGVzY2VudFxuICB2YXIgbGluZUhlaWdodCA9IGZvbnRIZWlnaHQgPiBmb250LnVuaXRzUGVyRW0gPyBmb250SGVpZ2h0IDogZm9udEhlaWdodCArIGZvbnQubGluZUdhcFxuXG4gIHZhciBoZWlnaHQgPSBsaW5lSGVpZ2h0IC8gZm9udC51bml0c1BlckVtICogZm9udFNpemVcbiAgdmFyIHdpZHRoID0gZm9udC5sYXlvdXQodGV4dCkuZ2x5cGhzLnJlZHVjZSgobGFzdCwgY3VycikgPT4gbGFzdCArIGN1cnIuYWR2YW5jZVdpZHRoLCAwKSAvIGZvbnQudW5pdHNQZXJFbSAqIGZvbnRTaXplXG5cbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvU1ZHL0F0dHJpYnV0ZS90ZXh0LWFuY2hvclxuICB2YXIgeEFkanVzdCA9IDBcbiAgaWYgKGRldGFpbHMudGV4dEFuY2hvciA9PT0gJ2VuZCcpIHtcbiAgICB4QWRqdXN0ID0gLXdpZHRoXG4gIH0gZWxzZSBpZiAoZGV0YWlscy50ZXh0QW5jaG9yID09PSAnbWlkZGxlJykge1xuICAgIHhBZGp1c3QgPSAtd2lkdGggLyAyXG4gIH1cblxuICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvMjAwMi9XRC1jc3MzLWxpbmVib3gtMjAwMjA1MTUvXG4gIC8vIDQuMi4gQmFzZWxpbmUgaWRlbnRpZmllcnNcbiAgdmFyIHlBZGp1c3QgPSBmb250LmFzY2VudCAvLyBhbHBoYWJldGljXG4gIGlmIChkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICdiZWZvcmUtZWRnZScgfHwgZGV0YWlscy5kb21pbmFudEJhc2VsaW5lID09PSAndGV4dC1iZWZvcmUtZWRnZScpIHtcbiAgICB5QWRqdXN0ID0gMFxuICB9IGVsc2UgaWYgKGRldGFpbHMuZG9taW5hbnRCYXNlbGluZSA9PT0gJ2hhbmdpbmcnKSB7XG4gICAgeUFkanVzdCA9IGZvbnQuYXNjZW50IC0gZm9udC54SGVpZ2h0IC0gZm9udC5jYXBIZWlnaHRcbiAgfSBlbHNlIGlmIChkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICdtYXRoZW1hdGljYWwnKSB7XG4gICAgeUFkanVzdCA9IGZvbnQuYXNjZW50IC0gZm9udC54SGVpZ2h0XG4gIH0gZWxzZSBpZiAoZGV0YWlscy5kb21pbmFudEJhc2VsaW5lID09PSAnbWlkZGxlJykge1xuICAgIHlBZGp1c3QgPSBmb250LmFzY2VudCAtIGZvbnQueEhlaWdodCAvIDJcbiAgfSBlbHNlIGlmIChkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICdjZW50cmFsJykge1xuICAgIHlBZGp1c3QgPSBmb250LmFzY2VudCAvIDIgKyBmb250LmRlc2NlbnQgLyAyXG4gIH0gZWxzZSBpZiAoZGV0YWlscy5kb21pbmFudEJhc2VsaW5lID09PSAnaWRlb2dyYXBoaWMnKSB7XG4gICAgeUFkanVzdCA9IGZvbnQuYXNjZW50ICsgZm9udC5kZXNjZW50XG4gIH1cblxuICByZXR1cm4gbmV3IEJveCh4ICsgeEFkanVzdCwgeSAtIHlBZGp1c3QgLyBmb250LnVuaXRzUGVyRW0gKiBmb250U2l6ZSwgd2lkdGgsIGhlaWdodClcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgZGVmYXVsdHMgZnJvbSAnLi9zcmMvdXRpbHMvZGVmYXVsdHMuanMnXG5cbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9BdHRyLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0NoYXJhY3RlckRhdGEuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vQ29tbWVudC5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9DdXN0b21FdmVudC5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9Eb2N1bWVudC5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9Eb2N1bWVudEZyYWdtZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0VsZW1lbnQuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vRXZlbnQuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vRXZlbnRUYXJnZXQuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vTm9kZS5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9Ob2RlRmlsdGVyLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL1RleHQuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vV2luZG93LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL2h0bWwvSFRNTEVsZW1lbnQuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vaHRtbC9IVE1MSW1hZ2VFbGVtZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL2h0bWwvSFRNTExpbmtFbGVtZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL2h0bWwvSFRNTFBhcnNlci5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL21peGlucy9lbGVtZW50QWNjZXNzLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL21peGlucy9QYXJlbnROb2RlLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdFbGVtZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdHcmFwaGljc0VsZW1lbnQuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vc3ZnL1NWR01hdHJpeC5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHUGF0aEVsZW1lbnQuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vc3ZnL1NWR1BvaW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdTVkdFbGVtZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdUZXh0Q29udGVudEVsZW1lbnQuanMnXG5cbmV4cG9ydCAqIGZyb20gJy4vc3JjL2NvbmZpZy5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2ZhY3Rvcmllcy5qcydcbmV4cG9ydCB7IGRlZmF1bHRzIH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==