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

      if (key === 'getPropetyValue') {
        return function (propertyName) {
          return node.style[propertyName] ?? ''
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
    const well = new _DocumentFragment_js__WEBPACK_IMPORTED_MODULE_4__.DocumentFragment()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQSxhQUFhLDhDQUFHO0FBQ2hCOzs7Ozs7O1VDN0VBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTm1EOztBQUVsQjtBQUNTO0FBQ047QUFDSTtBQUNIO0FBQ1E7QUFDVDtBQUNGO0FBQ007QUFDUDtBQUNNO0FBQ047QUFDRTtBQUNVO0FBQ0s7QUFDRDtBQUNMO0FBQ087QUFDRjtBQUNIO0FBQ0g7QUFDUTtBQUNUO0FBQ0s7QUFDTjtBQUNLO0FBQ1E7O0FBRXZCO0FBQ0c7QUFDZiIsInNvdXJjZXMiOlsid2VicGFjazovL3N2Z2RvbS9leHRlcm5hbCBjb21tb25qcyBcIi4vc3JjL3V0aWxzL2Rpcm5hbWUuY2pzXCIiLCJ3ZWJwYWNrOi8vc3ZnZG9tL2V4dGVybmFsIGNvbW1vbmpzIFwiZm9udGtpdFwiIiwid2VicGFjazovL3N2Z2RvbS9leHRlcm5hbCBjb21tb25qcyBcImltYWdlLXNpemVcIiIsIndlYnBhY2s6Ly9zdmdkb20vZXh0ZXJuYWwgY29tbW9uanMgXCJzYXhcIiIsIndlYnBhY2s6Ly9zdmdkb20vZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInBhdGhcIiIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvY29uZmlnLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vQXR0ci5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0NoYXJhY3RlckRhdGEuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9Db21tZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vQ3VzdG9tRXZlbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9Eb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL0RvY3VtZW50RnJhZ21lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9Eb2N1bWVudFR5cGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9FbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vRXZlbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9FdmVudFRhcmdldC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL05vZGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9Ob2RlRmlsdGVyLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vVGV4dC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL1dpbmRvdy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL2h0bWwvSFRNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9odG1sL0hUTUxJbWFnZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9odG1sL0hUTUxMaW5rRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL2h0bWwvSFRNTFBhcnNlci5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL2h0bWwvSFRNTFNjcmlwdEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9taXhpbnMvQ2hpbGROb2RlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vbWl4aW5zL05vbkRvY3VtZW50VHlwZUNoaWxkTm9kZS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL21peGlucy9Ob25FbGVtZW50UGFyZW50Tm9kZS5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL21peGlucy9QYXJlbnROb2RlLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vbWl4aW5zL2VsZW1lbnRBY2Nlc3MuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHQW5pbWF0ZWRMZW5ndGguanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHQ2lyY2xlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR0VsbGlwc2VFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR0ZvcmVpZ25PYmplY3RFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR0dyYXBoaWNzRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdJbWFnZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL2RvbS9zdmcvU1ZHTGVuZ3RoLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR0xpbmVFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR01hdHJpeC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdQYXRoRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdQb2ludC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdSZWN0RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZG9tL3N2Zy9TVkdTVkdFbGVtZW50LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9kb20vc3ZnL1NWR1RleHRDb250ZW50RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvZmFjdG9yaWVzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9vdGhlci9Cb3guanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL290aGVyL0Nzc1F1ZXJ5LmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy9vdGhlci9Qb2ludC5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvTm9kZUl0ZXJhdG9yLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9Qb2ludENsb3VkLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9iYm94VXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL2RlZmF1bHRzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy9tYXBVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvbmFtZXNwYWNlcy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvbm9kZXNUb05vZGUuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL29iamVjdENyZWF0aW9uVXRpbHMuanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL3BhdGhVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvcmVnZXguanMiLCJ3ZWJwYWNrOi8vc3ZnZG9tLy4vc3JjL3V0aWxzL3N0clV0aWxzLmpzIiwid2VicGFjazovL3N2Z2RvbS8uL3NyYy91dGlscy90YWdVdGlscy5qcyIsIndlYnBhY2s6Ly9zdmdkb20vLi9zcmMvdXRpbHMvdGV4dFV0aWxzLmpzIiwid2VicGFjazovL3N2Z2RvbS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdmdkb20vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3N2Z2RvbS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3N2Z2RvbS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3N2Z2RvbS8uL21haW4tbW9kdWxlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vc3JjL3V0aWxzL2Rpcm5hbWUuY2pzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZvbnRraXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW1hZ2Utc2l6ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzYXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGZvbnRraXQgZnJvbSAnZm9udGtpdCdcblxuY29uc3QgX2NvbmZpZyA9IHt9XG5jb25zdCBmb250cyA9IHt9XG5cbmV4cG9ydCBjb25zdCBzZXRGb250RGlyID0gZnVuY3Rpb24gKGRpcikge1xuICBfY29uZmlnLmZvbnREaXIgPSBkaXJcbiAgcmV0dXJuIHRoaXNcbn1cblxuZXhwb3J0IGNvbnN0IHNldEZvbnRGYW1pbHlNYXBwaW5ncyA9IGZ1bmN0aW9uIChtYXApIHtcbiAgX2NvbmZpZy5mb250RmFtaWx5TWFwcGluZ3MgPSBtYXBcbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gVE9ETzogbWFrZSBhc3luY1xuZXhwb3J0IGNvbnN0IHByZWxvYWRGb250cyA9ICgpID0+IHtcbiAgdmFyIG1hcCA9IF9jb25maWcuZm9udEZhbWlseU1hcHBpbmdzXG5cbiAgZm9yIChjb25zdCBbIGZvbnQsIGZpbGUgXSBvZiBPYmplY3QuZW50cmllcyhtYXApKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBwYXRoLmpvaW4oX2NvbmZpZy5mb250RGlyLCBmaWxlKVxuXG4gICAgdHJ5IHtcbiAgICAgIGZvbnRzW2ZvbnRdID0gZm9udGtpdC5vcGVuU3luYyhmaWxlbmFtZSlcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBsb2FkIGZvbnQgZmlsZSBmb3IgJHtmb250fWAsIGUpXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDb25maWcgPSAoKSA9PiBfY29uZmlnXG5leHBvcnQgY29uc3QgZ2V0Rm9udHMgPSAoKSA9PiBmb250c1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBzZXRGb250RGlyLFxuICBzZXRGb250RmFtaWx5TWFwcGluZ3MsXG4gIHByZWxvYWRGb250cyxcbiAgZ2V0Q29uZmlnLFxuICBnZXRGb250c1xufVxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcbmltcG9ydCB7IGh0bWwgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xuXG5leHBvcnQgY2xhc3MgQXR0ciBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMsIG5zKSB7XG4gICAgc3VwZXIobmFtZSwgeyBub2RlVmFsdWU6ICcnLCAuLi5wcm9wcyB9LCBucylcblxuICAgIC8vIEZvbGxvdyBzcGVjIGFuZCBsb3dlcmNhc2Ugbm9kZU5hbWUgZm9yIGh0bWxcbiAgICB0aGlzLm5vZGVOYW1lID0gbnMgPT09IGh0bWwgPyBuYW1lLnRvTG93ZXJDYXNlKCkgOiBuYW1lXG4gICAgdGhpcy5ub2RlVHlwZSA9IE5vZGUuQVRUUklCVVRFX05PREVcbiAgICB0aGlzLm93bmVyRWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIGdldCB2YWx1ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZVZhbHVlXG4gIH1cblxuICBzZXQgdmFsdWUgKHZhbCkge1xuICAgIHRoaXMubm9kZVZhbHVlID0gdmFsXG4gIH1cblxuICBnZXQgbmFtZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZU5hbWVcbiAgfVxufVxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcbmltcG9ydCB7IG1peGluIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcbmltcG9ydCB7IE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZSB9IGZyb20gJy4vbWl4aW5zL05vbkRvY3VtZW50VHlwZUNoaWxkTm9kZS5qcydcbmltcG9ydCB7IENoaWxkTm9kZSB9IGZyb20gJy4vbWl4aW5zL0NoaWxkTm9kZS5qcydcblxuZXhwb3J0IGNsYXNzIENoYXJhY3RlckRhdGEgZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3IgKG5hbWUsIHByb3BzKSB7XG4gICAgc3VwZXIobmFtZSwgcHJvcHMpXG5cbiAgICB0aGlzLmRhdGEgPSB0aGlzLm5vZGVWYWx1ZVxuICB9XG5cbiAgYXBwZW5kRGF0YSAoZGF0YSkge1xuICAgIHRoaXMuZGF0YSArPSBkYXRhXG4gIH1cblxuICBkZWxldGVEYXRhIChvZmZzZXQsIGNvdW50KSB7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLnNsaWNlKDAsIG9mZnNldCkgKyB0aGlzLmRhdGEuc2xpY2UoMCwgb2Zmc2V0ICsgY291bnQpXG4gIH1cblxuICBpbnNlcnREYXRhIChvZmZzZXQsIGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuc2xpY2UoMCwgb2Zmc2V0KSArIGRhdGEgKyB0aGlzLmRhdGEuc2xpY2Uob2Zmc2V0KVxuICB9XG5cbiAgcmVwbGFjZURhdGEgKG9mZnNldCwgY291bnQsIGRhdGEpIHtcbiAgICB0aGlzLmRlbGV0ZURhdGEob2Zmc2V0LCBjb3VudClcbiAgICB0aGlzLmluc2VydERhdGEob2Zmc2V0LCBkYXRhKVxuICB9XG5cbiAgc3Vic3RyaW5nRGF0YSAob2Zmc2V0LCBjb3VudCkge1xuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5zdWJzdHIob2Zmc2V0LCBjb3VudClcbiAgfVxuXG4gIGdldCBsZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoXG4gIH1cbn1cblxubWl4aW4oTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlLCBDaGFyYWN0ZXJEYXRhKVxubWl4aW4oQ2hpbGROb2RlLCBDaGFyYWN0ZXJEYXRhKVxuIiwiaW1wb3J0IHsgQ2hhcmFjdGVyRGF0YSB9IGZyb20gJy4vQ2hhcmFjdGVyRGF0YS5qcydcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXG5leHBvcnQgY2xhc3MgQ29tbWVudCBleHRlbmRzIENoYXJhY3RlckRhdGEge1xuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMpIHtcbiAgICBzdXBlcihuYW1lLCBwcm9wcylcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5DT01NRU5UX05PREVcbiAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuL0V2ZW50LmpzJ1xuZXhwb3J0IGNsYXNzIEN1c3RvbUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMgPSB7fSkge1xuICAgIHN1cGVyKG5hbWUpXG4gICAgdGhpcy5kZXRhaWwgPSBwcm9wcy5kZXRhaWwgfHwgbnVsbFxuICAgIHRoaXMuY2FuY2VsYWJsZSA9IHByb3BzLmNhbmNlbGFibGUgfHwgZmFsc2VcbiAgfVxufVxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tICcuL0NvbW1lbnQuanMnXG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnLi9UZXh0LmpzJ1xuaW1wb3J0IHsgQXR0ciB9IGZyb20gJy4vQXR0ci5qcydcbmltcG9ydCB7IERvY3VtZW50RnJhZ21lbnQgfSBmcm9tICcuL0RvY3VtZW50RnJhZ21lbnQuanMnXG5pbXBvcnQgeyBIVE1MTGlua0VsZW1lbnQgfSBmcm9tICcuL2h0bWwvSFRNTExpbmtFbGVtZW50LmpzJ1xuaW1wb3J0IHsgSFRNTFNjcmlwdEVsZW1lbnQgfSBmcm9tICcuL2h0bWwvSFRNTFNjcmlwdEVsZW1lbnQuanMnXG5pbXBvcnQgeyBIVE1MSW1hZ2VFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxJbWFnZUVsZW1lbnQuanMnXG5pbXBvcnQgeyBIVE1MRWxlbWVudCB9IGZyb20gJy4vaHRtbC9IVE1MRWxlbWVudC5qcydcbmltcG9ydCB7IGVsZW1lbnRBY2Nlc3MgfSBmcm9tICcuL21peGlucy9lbGVtZW50QWNjZXNzLmpzJ1xuaW1wb3J0IHsgbWl4aW4gfSBmcm9tICcuLi91dGlscy9vYmplY3RDcmVhdGlvblV0aWxzLmpzJ1xuaW1wb3J0IHsgU1ZHU1ZHRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR1NWR0VsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdQYXRoRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR1BhdGhFbGVtZW50LmpzJ1xuaW1wb3J0IHsgU1ZHVGV4dENvbnRlbnRFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHVGV4dENvbnRlbnRFbGVtZW50LmpzJ1xuaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHR3JhcGhpY3NFbGVtZW50LmpzJ1xuaW1wb3J0IHsgUGFyZW50Tm9kZSB9IGZyb20gJy4vbWl4aW5zL1BhcmVudE5vZGUuanMnXG5pbXBvcnQgeyBzdmcsIGh0bWwgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xuaW1wb3J0IHsgRG9jdW1lbnRUeXBlIH0gZnJvbSAnLi9Eb2N1bWVudFR5cGUuanMnXG5pbXBvcnQgeyBOb25FbGVtZW50UGFyZW50Tm9kZSB9IGZyb20gJy4vbWl4aW5zL05vbkVsZW1lbnRQYXJlbnROb2RlLmpzJ1xuaW1wb3J0IHsgU1ZHUmVjdEVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdSZWN0RWxlbWVudC5qcydcbmltcG9ydCB7IFNWR0NpcmNsZUVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdDaXJjbGVFbGVtZW50LmpzJ1xuaW1wb3J0IHsgU1ZHTGluZUVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdMaW5lRWxlbWVudC5qcydcbmltcG9ydCB7IFNWR0VsbGlwc2VFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHRWxsaXBzZUVsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdGb3JlaWduT2JqZWN0RWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR0ZvcmVpZ25PYmplY3RFbGVtZW50LmpzJ1xuaW1wb3J0IHsgU1ZHSW1hZ2VFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHSW1hZ2VFbGVtZW50LmpzJ1xuXG5mdW5jdGlvbiBnZXRDaGlsZEJ5VGFnTmFtZSAocGFyZW50LCBuYW1lKSB7XG4gIGZvciAobGV0IGNoaWxkID0gcGFyZW50LmZpcnN0Q2hpbGQ7IGNoaWxkICE9IG51bGw7IGNoaWxkID0gY2hpbGQubmV4dFNpYmxpbmcpIHtcbiAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIGNoaWxkLm5vZGVOYW1lID09PSBuYW1lKSB7XG4gICAgICByZXR1cm4gY2hpbGRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuY29uc3QgZ2V0U1ZHRWxlbWVudEZvck5hbWUgPSAobmFtZSkgPT4ge1xuICBzd2l0Y2ggKG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICBjYXNlICdzdmcnOlxuICAgIHJldHVybiBTVkdTVkdFbGVtZW50XG4gIGNhc2UgJ3BhdGgnOlxuICAgIHJldHVybiBTVkdQYXRoRWxlbWVudFxuICBjYXNlICdjaXJjbGUnOlxuICAgIHJldHVybiBTVkdDaXJjbGVFbGVtZW50XG4gIGNhc2UgJ2VsbGlwc2UnOlxuICAgIHJldHVybiBTVkdFbGxpcHNlRWxlbWVudFxuICBjYXNlICdsaW5lJzpcbiAgICByZXR1cm4gU1ZHTGluZUVsZW1lbnRcbiAgY2FzZSAncmVjdCc6XG4gICAgcmV0dXJuIFNWR1JlY3RFbGVtZW50XG4gIGNhc2UgJ2ZvcmVpZ25PYmplY3QnOlxuICAgIHJldHVybiBTVkdGb3JlaWduT2JqZWN0RWxlbWVudFxuICBjYXNlICdpbWFnZSc6XG4gICAgcmV0dXJuIFNWR0ltYWdlRWxlbWVudFxuICBjYXNlICd0ZXh0JzpcbiAgY2FzZSAndHNwYW4nOlxuICBjYXNlICd0cmVmJzpcbiAgY2FzZSAnYWx0Z2x5cGgnOlxuICBjYXNlICd0ZXh0cGF0aCc6XG4gICAgcmV0dXJuIFNWR1RleHRDb250ZW50RWxlbWVudFxuICBkZWZhdWx0OlxuICAgIHJldHVybiBTVkdHcmFwaGljc0VsZW1lbnRcbiAgfVxufVxuXG5jb25zdCBnZXRIVE1MRWxlbWVudEZvck5hbWUgPSAobmFtZSkgPT4ge1xuICBzd2l0Y2ggKG5hbWUudG9Mb3dlckNhc2UoKSkge1xuICBjYXNlICdpbWcnOlxuICAgIHJldHVybiBIVE1MSW1hZ2VFbGVtZW50XG4gIGNhc2UgJ2xpbmsnOlxuICAgIHJldHVybiBIVE1MTGlua0VsZW1lbnRcbiAgY2FzZSAnc2NyaXB0JzpcbiAgICByZXR1cm4gSFRNTFNjcmlwdEVsZW1lbnRcbiAgZGVmYXVsdDpcbiAgICByZXR1cm4gSFRNTEVsZW1lbnRcbiAgfVxufVxuXG5jb25zdCBnZXRFbGVtZW50Rm9yTmFtZXNwYWNlID0gKG5zLCBuYW1lKSA9PiB7XG4gIHN3aXRjaCAobnMpIHtcbiAgY2FzZSBzdmc6XG4gICAgcmV0dXJuIGdldFNWR0VsZW1lbnRGb3JOYW1lKG5hbWUpXG4gIGNhc2UgaHRtbDpcbiAgY2FzZSBudWxsOlxuICBjYXNlICcnOlxuICBkZWZhdWx0OlxuICAgIHJldHVybiBnZXRIVE1MRWxlbWVudEZvck5hbWUobmFtZSlcbiAgfVxufVxuXG4vLyBGZWF0dXJlL3ZlcnNpb24gcGFpcnMgdGhhdCBET01JbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKCkgcmV0dXJucyB0cnVlIGZvci4gIEl0IHJldHVybnMgZmFsc2UgZm9yIGFueXRoaW5nIGVsc2UuXG5jb25zdCBzdXBwb3J0ZWRGZWF0dXJlcyA9IHtcbiAgeG1sOiB7ICcnOiB0cnVlLCAnMS4wJzogdHJ1ZSwgJzIuMCc6IHRydWUgfSxcbiAgY29yZTogeyAnJzogdHJ1ZSwgJzIuMCc6IHRydWUgfSxcbiAgaHRtbDogeyAnJzogdHJ1ZSwgJzEuMCc6IHRydWUsICcyLjAnOiB0cnVlIH0sXG4gIHhodG1sOiB7ICcnOiB0cnVlLCAnMS4wJzogdHJ1ZSwgJzIuMCc6IHRydWUgfSAvLyBIVE1MXG59XG5cbmV4cG9ydCBjb25zdCBET01JbXBsZW1lbnRhdGlvbiA9IHtcbiAgaGFzRmVhdHVyZSAoZmVhdHVyZSwgdmVyc2lvbikge1xuICAgIGNvbnN0IGYgPSBzdXBwb3J0ZWRGZWF0dXJlc1soZmVhdHVyZSB8fCAnJykudG9Mb3dlckNhc2UoKV1cbiAgICByZXR1cm4gKGYgJiYgZlt2ZXJzaW9uIHx8ICcnXSkgfHwgZmFsc2VcbiAgfSxcblxuICBjcmVhdGVEb2N1bWVudFR5cGUgKHF1YWxpZmllZE5hbWUsIHB1YmxpY0lkLCBzeXN0ZW1JZCkge1xuICAgIHJldHVybiBuZXcgRG9jdW1lbnRUeXBlKHF1YWxpZmllZE5hbWUsIHsgcHVibGljSWQsIHN5c3RlbUlkLCBvd25lckRvY3VtZW50OiB0aGlzIH0pXG4gIH0sXG5cbiAgY3JlYXRlRG9jdW1lbnQgKG5hbWVzcGFjZSwgcXVhbGlmaWVkTmFtZSwgZG9jdHlwZSkge1xuICAgIGNvbnN0IGRvYyA9IG5ldyBEb2N1bWVudChuYW1lc3BhY2UpXG4gICAgaWYgKGRvY3R5cGUpIHtcbiAgICAgIGlmIChkb2N0eXBlLm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUgb2JqZWN0IGlzIGluIHRoZSB3cm9uZyBEb2N1bWVudCwgYSBjYWxsIHRvIGltcG9ydE5vZGUgaXMgcmVxdWlyZWQnKVxuICAgICAgfVxuICAgICAgZG9jdHlwZS5vd25lckRvY3VtZW50ID0gZG9jXG4gICAgICBkb2MuYXBwZW5kQ2hpbGQoZG9jdHlwZSlcbiAgICB9XG4gICAgaWYgKHF1YWxpZmllZE5hbWUpIHtcbiAgICAgIGRvYy5hcHBlbmRDaGlsZChkb2MuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZSwgcXVhbGlmaWVkTmFtZSkpXG4gICAgfVxuICAgIHJldHVybiBkb2NcbiAgfSxcblxuICBjcmVhdGVIVE1MRG9jdW1lbnQgKHRpdGxlVGV4dCA9ICcnKSB7XG4gICAgY29uc3QgZCA9IG5ldyBEb2N1bWVudChodG1sKVxuICAgIGNvbnN0IHJvb3QgPSBkLmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKVxuICAgIGNvbnN0IGhlYWQgPSBkLmNyZWF0ZUVsZW1lbnQoJ2hlYWQnKVxuICAgIGNvbnN0IHRpdGxlID0gZC5jcmVhdGVFbGVtZW50KCd0aXRsZScpXG4gICAgdGl0bGUuYXBwZW5kQ2hpbGQoZC5jcmVhdGVUZXh0Tm9kZSh0aXRsZVRleHQpKVxuICAgIGhlYWQuYXBwZW5kQ2hpbGQodGl0bGUpXG4gICAgcm9vdC5hcHBlbmRDaGlsZChoZWFkKVxuICAgIHJvb3QuYXBwZW5kQ2hpbGQoZC5jcmVhdGVFbGVtZW50KCdib2R5JykpXG5cbiAgICBkLmFwcGVuZENoaWxkKHJvb3QpXG4gICAgcmV0dXJuIGRcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBOb2RlIHtcbiAgY29uc3RydWN0b3IgKG5zKSB7XG4gICAgc3VwZXIoJyNkb2N1bWVudCcsIHt9LCBucylcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5ET0NVTUVOVF9OT0RFXG4gICAgdGhpcy5pbXBsZW1lbnRhdGlvbiA9IERPTUltcGxlbWVudGF0aW9uXG4gICAgdGhpcy5kZWZhdWx0VmlldyA9IG51bGxcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jZG9tLWRvY3VtZW50LWNyZWF0ZWF0dHJpYnV0ZVxuICBjcmVhdGVBdHRyaWJ1dGUgKGxvY2FsTmFtZSkge1xuICAgIGlmICh0aGlzLm5hbWVzcGFjZVVSSSA9PT0gaHRtbCkge1xuICAgICAgbG9jYWxOYW1lID0gbG9jYWxOYW1lLnRvTG93ZXJDYXNlKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlQXR0cmlidXRlTlMobnVsbCwgbG9jYWxOYW1lLCB0cnVlKVxuICB9XG5cbiAgY3JlYXRlQXR0cmlidXRlTlMgKG5zLCBxdWFsaWZpZWROYW1lLCBsb2NhbCA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIG5ldyBBdHRyKHF1YWxpZmllZE5hbWUsIHsgb3duZXJEb2N1bWVudDogdGhpcywgbG9jYWwgfSwgbnMpXG4gIH1cblxuICBjcmVhdGVDb21tZW50ICh0ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBDb21tZW50KCcjY29tbWVudCcsIHsgbm9kZVZhbHVlOiB0ZXh0LCBvd25lckRvY3VtZW50OiB0aGlzIH0pXG4gIH1cblxuICBjcmVhdGVEb2N1bWVudEZyYWdtZW50IChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudEZyYWdtZW50KCcjZG9jdW1lbnQtZnJhZ21lbnQnLCB7IG93bmVyRG9jdW1lbnQ6IHRoaXMgfSlcbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQgKGxvY2FsTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUVsZW1lbnROUyh0aGlzLm5hbWVzcGFjZVVSSSwgbG9jYWxOYW1lLCB0cnVlKVxuICB9XG5cbiAgY3JlYXRlRWxlbWVudE5TIChucywgcXVhbGlmaWVkTmFtZSwgbG9jYWwgPSBmYWxzZSkge1xuICAgIGNvbnN0IEVsZW1lbnQgPSBnZXRFbGVtZW50Rm9yTmFtZXNwYWNlKG5zLCBxdWFsaWZpZWROYW1lKVxuXG4gICAgcmV0dXJuIG5ldyBFbGVtZW50KHF1YWxpZmllZE5hbWUsIHtcbiAgICAgIG93bmVyRG9jdW1lbnQ6IHRoaXMsXG4gICAgICBsb2NhbFxuICAgIH0sIG5zKVxuICB9XG5cbiAgY3JlYXRlVGV4dE5vZGUgKHRleHQpIHtcbiAgICByZXR1cm4gbmV3IFRleHQoJyN0ZXh0JywgeyBub2RlVmFsdWU6IHRleHQsIG93bmVyRG9jdW1lbnQ6IHRoaXMgfSlcbiAgfVxuXG4gIGdldCBjb21wYXRNb2RlICgpIHtcbiAgICByZXR1cm4gJ0NTUzFDb21wYXQnIC8vIGFsd2F5cyBiZSBpbiBzdGFuZGFyZHMtbW9kZVxuICB9XG5cbiAgZ2V0IGJvZHkgKCkge1xuICAgIHJldHVybiBnZXRDaGlsZEJ5VGFnTmFtZSh0aGlzLmRvY3VtZW50RWxlbWVudCwgJ0JPRFknKVxuICB9XG5cbiAgZ2V0IGhlYWQgKCkge1xuICAgIHJldHVybiBnZXRDaGlsZEJ5VGFnTmFtZSh0aGlzLmRvY3VtZW50RWxlbWVudCwgJ0hFQUQnKVxuICB9XG5cbiAgZ2V0IGRvY3VtZW50RWxlbWVudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFzdENoaWxkXG4gIH1cbn1cblxubWl4aW4oZWxlbWVudEFjY2VzcywgRG9jdW1lbnQpXG5taXhpbihQYXJlbnROb2RlLCBEb2N1bWVudClcbm1peGluKE5vbkVsZW1lbnRQYXJlbnROb2RlLCBEb2N1bWVudClcbiIsImltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXG5pbXBvcnQgeyBtaXhpbiB9IGZyb20gJy4uL3V0aWxzL29iamVjdENyZWF0aW9uVXRpbHMuanMnXG5pbXBvcnQgeyBlbGVtZW50QWNjZXNzIH0gZnJvbSAnLi9taXhpbnMvZWxlbWVudEFjY2Vzcy5qcydcbmltcG9ydCB7IFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9QYXJlbnROb2RlLmpzJ1xuaW1wb3J0IHsgTm9uRWxlbWVudFBhcmVudE5vZGUgfSBmcm9tICcuL21peGlucy9Ob25FbGVtZW50UGFyZW50Tm9kZS5qcydcbmV4cG9ydCBjbGFzcyBEb2N1bWVudEZyYWdtZW50IGV4dGVuZHMgTm9kZSB7XG4gIGNvbnN0cnVjdG9yIChuYW1lLCBwcm9wcykge1xuICAgIHN1cGVyKG5hbWUsIHByb3BzKVxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREVcbiAgfVxufVxuXG5taXhpbihlbGVtZW50QWNjZXNzLCBEb2N1bWVudEZyYWdtZW50KVxubWl4aW4oUGFyZW50Tm9kZSwgRG9jdW1lbnRGcmFnbWVudClcbm1peGluKE5vbkVsZW1lbnRQYXJlbnROb2RlLCBEb2N1bWVudEZyYWdtZW50KVxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcbmltcG9ydCB7IG1peGluIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcbmltcG9ydCB7IENoaWxkTm9kZSB9IGZyb20gJy4vbWl4aW5zL0NoaWxkTm9kZS5qcydcblxuZXhwb3J0IGNsYXNzIERvY3VtZW50VHlwZSBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMpIHtcbiAgICBzdXBlcihuYW1lLCBwcm9wcylcblxuICAgIHRoaXMubm9kZVR5cGUgPSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERVxuICAgIHRoaXMubmFtZSA9IG5hbWVcblxuICAgIGNvbnN0IHsgcHVibGljSWQsIHN5c3RlbUlkIH0gPSBwcm9wc1xuICAgIHRoaXMucHVibGljSWQgPSBwdWJsaWNJZCB8fCAnJ1xuICAgIHRoaXMuc3lzdGVtSWQgPSBzeXN0ZW1JZCB8fCAnJ1xuICB9XG59XG5cbm1peGluKENoaWxkTm9kZSwgRG9jdW1lbnRUeXBlKVxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZS5qcydcblxuaW1wb3J0IHsgUGFyZW50Tm9kZSB9IGZyb20gJy4vbWl4aW5zL1BhcmVudE5vZGUuanMnXG5pbXBvcnQgeyBlbGVtZW50QWNjZXNzIH0gZnJvbSAnLi9taXhpbnMvZWxlbWVudEFjY2Vzcy5qcydcbmltcG9ydCB7IEhUTUxQYXJzZXIgfSBmcm9tICcuL2h0bWwvSFRNTFBhcnNlci5qcydcbmltcG9ydCB7IERvY3VtZW50RnJhZ21lbnQgfSBmcm9tICcuL0RvY3VtZW50RnJhZ21lbnQuanMnXG5pbXBvcnQgeyBtaXhpbiB9IGZyb20gJy4uL3V0aWxzL29iamVjdENyZWF0aW9uVXRpbHMuanMnXG5pbXBvcnQgeyB0YWcgfSBmcm9tICcuLi91dGlscy90YWdVdGlscy5qcydcbmltcG9ydCB7IGNzc1RvTWFwLCBtYXBUb0NzcyB9IGZyb20gJy4uL3V0aWxzL21hcFV0aWxzLmpzJ1xuaW1wb3J0IHsgaGV4VG9SR0IsIGRlY2FtZWxpemUsIGh0bWxFbnRpdGllcywgY2RhdGEsIGNvbW1lbnQgfSBmcm9tICcuLi91dGlscy9zdHJVdGlscy5qcydcbmltcG9ydCB7IE5vbkRvY3VtZW50VHlwZUNoaWxkTm9kZSB9IGZyb20gJy4vbWl4aW5zL05vbkRvY3VtZW50VHlwZUNoaWxkTm9kZS5qcydcbmltcG9ydCB7IENoaWxkTm9kZSB9IGZyb20gJy4vbWl4aW5zL0NoaWxkTm9kZS5qcydcbmltcG9ydCB7IGh0bWwsIHhtbCwgeG1sbnMgfSBmcm9tICcuLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xuXG5jb25zdCB2YWxpZGF0ZUFuZEV4dHJhY3QgPSAobnMsIG5hbWUpID0+IHtcbiAgbGV0IHByZWZpeCA9IG51bGxcbiAgbGV0IGxvY2FsbmFtZSA9IG5hbWVcblxuICBpZiAoIW5zKSBucyA9IG51bGxcblxuICBpZiAobmFtZS5pbmNsdWRlcygnOicpKSB7XG4gICAgWyBwcmVmaXgsIGxvY2FsbmFtZSBdID0gbmFtZS5zcGxpdCgnOicpXG4gIH1cblxuICBpZiAoIW5zICYmIHByZWZpeCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTmFtZXNwYWNlIEVycm9yJylcbiAgfVxuXG4gIGlmIChwcmVmaXggPT09ICd4bWwnICYmIG5zICE9PSB4bWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWVzcGFjZSBFcnJvcicpXG4gIH1cblxuICBpZiAoKHByZWZpeCA9PT0gJ3htbG5zJyB8fCBuYW1lID09PSAneG1sbnMnKSAmJiBucyAhPT0geG1sbnMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05hbWVzcGFjZSBFcnJvcicpXG4gIH1cblxuICBpZiAocHJlZml4ICE9PSAneG1sbnMnICYmIG5hbWUgIT09ICd4bWxucycgJiYgbnMgPT09IHhtbG5zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOYW1lc3BhY2UgRXJyb3InKVxuICB9XG5cbiAgcmV0dXJuIFsgbnMsIHByZWZpeCwgbG9jYWxuYW1lIF1cbn1cblxuY29uc3QgZ2V0QXR0cmlidXRlQnlOc0FuZExvY2FsTmFtZSA9IChlbCwgbnMsIGxvY2FsTmFtZSkgPT4ge1xuICBpZiAoIW5zKSBucyA9IG51bGxcbiAgcmV0dXJuIFsgLi4uZWwuYXR0cnMgXS5maW5kKChub2RlKSA9PiBub2RlLmxvY2FsTmFtZSA9PT0gbG9jYWxOYW1lICYmIG5vZGUubmFtZXNwYWNlVVJJID09PSBucylcbn1cblxuY29uc3QgZ2V0QXR0cmlidXRlQnlRdWFsaWZpZWROYW1lID0gKGVsLCBxdWFsaWZpZWROYW1lKSA9PiB7XG4gIGlmIChlbC5uYW1lc3BhY2VVUkkgPT09IGh0bWwgJiYgZWwub3duZXJEb2N1bWVudC5uYW1lc3BhY2VVUkkgPT09IGh0bWwpIHtcbiAgICBxdWFsaWZpZWROYW1lID0gcXVhbGlmaWVkTmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICByZXR1cm4gWyAuLi5lbC5hdHRycyBdLmZpbmQoKG5vZGUpID0+IG5vZGUubmFtZSA9PT0gcXVhbGlmaWVkTmFtZSlcbn1cblxuLy8gVGhpcyBQcm94eSBwcm94aWVzIGFsbCBhY2Nlc3MgdG8gbm9kZS5zdHlsZSB0byB0aGUgY3NzIHNhdmVkIGluIHRoZSBhdHRyaWJ1dGVcbmNvbnN0IGdldFN0eWxlUHJveHkgPSAobm9kZSkgPT4ge1xuXG4gIHJldHVybiBuZXcgUHJveHkobm9kZSwge1xuICAgIGdldCAodGFyZ2V0LCBrZXkpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJydcbiAgICAgIGNvbnN0IHN0eWxlTWFwID0gY3NzVG9NYXAoc3R5bGVzKVxuXG4gICAgICBpZiAoa2V5ID09PSAnY3NzVGV4dCcpIHtcbiAgICAgICAgcmV0dXJuIHN0eWxlc1xuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ID09PSAnc2V0UHJvcGVydHknKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocHJvcGVydHlOYW1lLCB2YWx1ZSA9ICcnLCBwcmlvcml0eSA9ICcnKSB7XG4gICAgICAgICAgbm9kZS5zdHlsZVtwcm9wZXJ0eU5hbWVdID0gdmFsdWUgKyAocHJpb3JpdHkgPyBgICEke3ByaW9yaXR5fWAgOiAnJylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ID09PSAnZ2V0UHJvcGV0eVZhbHVlJykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgIHJldHVybiBub2RlLnN0eWxlW3Byb3BlcnR5TmFtZV0gPz8gJydcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBrZXkgPSBkZWNhbWVsaXplKGtleSlcbiAgICAgIGlmICghc3R5bGVNYXAuaGFzKGtleSkpIHJldHVybiAnJ1xuXG4gICAgICByZXR1cm4gc3R5bGVNYXAuZ2V0KGtleSlcbiAgICB9LFxuICAgIHNldCAodGFyZ2V0LCBrZXksIHZhbHVlKSB7XG4gICAgICBrZXkgPSBkZWNhbWVsaXplKGtleSlcblxuICAgICAgaWYgKGtleSA9PT0gJ2Nzcy10ZXh0Jykge1xuICAgICAgICAvLyBlbnN1cmUgY29ycmVjdCBzcGFjaW5nIGFuZCBzeW50YXggYnkgY29udmVydGluZyBiYWNrIGFuZCBmb3J0aFxuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdzdHlsZScsIG1hcFRvQ3NzKGNzc1RvTWFwKHZhbHVlKSkpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGhleFRvUkdCKHZhbHVlLnRvU3RyaW5nKCkpXG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJydcbiAgICAgICAgY29uc3Qgc3R5bGVNYXAgPSBjc3NUb01hcChzdHlsZXMpXG4gICAgICAgIHN0eWxlTWFwLnNldChrZXksIHZhbHVlKVxuXG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgbWFwVG9Dc3Moc3R5bGVNYXApKVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG4vLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2RvbS1lbGVtZW50LXNldGF0dHJpYnV0ZW5zXG5leHBvcnQgY2xhc3MgRWxlbWVudCBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMsIG5zKSB7XG4gICAgc3VwZXIobmFtZSwgcHJvcHMsIG5zKVxuXG4gICAgdGhpcy5zdHlsZSA9IGdldFN0eWxlUHJveHkodGhpcylcbiAgICB0aGlzLnRhZ05hbWUgPSB0aGlzLm5vZGVOYW1lXG4gIH1cblxuICBnZXRBdHRyaWJ1dGUgKHF1YWxpZmllZE5hbWUpIHtcbiAgICBjb25zdCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlKHF1YWxpZmllZE5hbWUpXG4gICAgcmV0dXJuIGF0dHIgPyBhdHRyLnZhbHVlIDogbnVsbFxuICB9XG5cbiAgZ2V0QXR0cmlidXRlTm9kZSAocXVhbGlmaWVkTmFtZSkge1xuICAgIHJldHVybiBnZXRBdHRyaWJ1dGVCeVF1YWxpZmllZE5hbWUodGhpcywgcXVhbGlmaWVkTmFtZSlcbiAgfVxuXG4gIGdldEF0dHJpYnV0ZU5vZGVOUyAobnMsIGxvY2FsTmFtZSkge1xuICAgIHJldHVybiBnZXRBdHRyaWJ1dGVCeU5zQW5kTG9jYWxOYW1lKHRoaXMsIG5zLCBsb2NhbE5hbWUpXG4gIH1cblxuICBnZXRBdHRyaWJ1dGVOUyAobnMsIGxvY2FsTmFtZSkge1xuICAgIGNvbnN0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGVOUyhucywgbG9jYWxOYW1lKVxuICAgIHJldHVybiBhdHRyID8gYXR0ci52YWx1ZSA6IG51bGxcbiAgfVxuXG4gIGdldEJvdW5kaW5nQ2xpZW50UmVjdCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IGltcGxlbWVudGVkIGZvciBTVkcgRWxlbWVudHMnKVxuICB9XG5cbiAgaGFzQXR0cmlidXRlIChxdWFsaWZpZWROYW1lKSB7XG4gICAgY29uc3QgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZShxdWFsaWZpZWROYW1lKVxuICAgIHJldHVybiAhIWF0dHJcbiAgfVxuXG4gIGhhc0F0dHJpYnV0ZU5TIChucywgbG9jYWxOYW1lKSB7XG4gICAgY29uc3QgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZU5TKG5zLCBsb2NhbE5hbWUpXG4gICAgcmV0dXJuICEhYXR0clxuICB9XG5cbiAgbWF0Y2hlcyAocXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRjaFdpdGhTY29wZShxdWVyeSwgdGhpcylcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZSAocXVhbGlmaWVkTmFtZSkge1xuICAgIGNvbnN0IGF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZU5vZGUocXVhbGlmaWVkTmFtZSlcbiAgICBpZiAoYXR0cikge1xuICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOb2RlKGF0dHIpXG4gICAgfVxuICAgIHJldHVybiBhdHRyXG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGVOb2RlIChub2RlKSB7XG4gICAgaWYgKCF0aGlzLmF0dHJzLmRlbGV0ZShub2RlKSkgdGhyb3cgbmV3IEVycm9yKCdBdHRyaWJ1dGUgY2Fubm90IGJlIHJlbW92ZWQgYmVjYXVzZSBpdCB3YXMgbm90IGZvdW5kIG9uIHRoZSBlbGVtZW50JylcbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgLy8gY2FsbCBpczogZC5yZW1vdmVBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy5tb3ppbGxhLm9yZy9ucy9zcGVjaWFsc3BhY2UnLCAnYWxpZ24nLCAnY2VudGVyJyk7XG4gIHJlbW92ZUF0dHJpYnV0ZU5TIChucywgbG9jYWxOYW1lKSB7XG4gICAgY29uc3QgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZU5TKG5zLCBsb2NhbE5hbWUpXG4gICAgaWYgKGF0dHIpIHtcbiAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTm9kZShhdHRyKVxuICAgIH1cbiAgICByZXR1cm4gYXR0clxuICB9XG5cbiAgLyogVGhlIHNldEF0dHJpYnV0ZShxdWFsaWZpZWROYW1lLCB2YWx1ZSkgbWV0aG9kLCB3aGVuIGludm9rZWQsIG11c3QgcnVuIHRoZXNlIHN0ZXBzOlxuXG4gICAgSWYgcXVhbGlmaWVkTmFtZSBkb2VzIG5vdCBtYXRjaCB0aGUgTmFtZSBwcm9kdWN0aW9uIGluIFhNTCwgdGhlbiB0aHJvdyBhbiBcIkludmFsaWRDaGFyYWN0ZXJFcnJvclwiIERPTUV4Y2VwdGlvbi5cblxuICAgIElmIHRoaXMgaXMgaW4gdGhlIEhUTUwgbmFtZXNwYWNlIGFuZCBpdHMgbm9kZSBkb2N1bWVudCBpcyBhbiBIVE1MIGRvY3VtZW50LCB0aGVuIHNldCBxdWFsaWZpZWROYW1lIHRvIHF1YWxpZmllZE5hbWUgaW4gQVNDSUkgbG93ZXJjYXNlLlxuXG4gICAgTGV0IGF0dHJpYnV0ZSBiZSB0aGUgZmlyc3QgYXR0cmlidXRlIGluIHRoaXPigJlzIGF0dHJpYnV0ZSBsaXN0IHdob3NlIHF1YWxpZmllZCBuYW1lIGlzIHF1YWxpZmllZE5hbWUsIGFuZCBudWxsIG90aGVyd2lzZS5cblxuICAgIElmIGF0dHJpYnV0ZSBpcyBudWxsLCBjcmVhdGUgYW4gYXR0cmlidXRlIHdob3NlIGxvY2FsIG5hbWUgaXMgcXVhbGlmaWVkTmFtZSwgdmFsdWUgaXMgdmFsdWUsIGFuZCBub2RlIGRvY3VtZW50IGlzIHRoaXPigJlzIG5vZGUgZG9jdW1lbnQsIHRoZW4gYXBwZW5kIHRoaXMgYXR0cmlidXRlIHRvIHRoaXMsIGFuZCB0aGVuIHJldHVybi5cblxuICAgIENoYW5nZSBhdHRyaWJ1dGUgdG8gdmFsdWUuXG4gICovXG4gIHNldEF0dHJpYnV0ZSAocXVhbGlmaWVkTmFtZSwgdmFsdWUpIHtcbiAgICAvLyBXZSBoYXZlIHRvIGRvIHRoYXQgaGVyZSBiZWNhdXNlIHdlIGNhbm5vdCBjaGVjayBpZiBgdGhpc2AgaXMgaW4gdGhlIGNvcnJlY3QgbmFtZXNwYWNlXG4gICAgLy8gd2hlbiBkb2luZyBpdCBpbiBjcmVhdGVBdHRyaWJ1dGVcbiAgICBpZiAodGhpcy5uYW1lc3BhY2VVUkkgPT09IGh0bWwgJiYgdGhpcy5vd25lckRvY3VtZW50Lm5hbWVzcGFjZVVSSSA9PT0gaHRtbCkge1xuICAgICAgcXVhbGlmaWVkTmFtZSA9IHF1YWxpZmllZE5hbWUudG9Mb3dlckNhc2UoKVxuICAgIH1cblxuICAgIGxldCBhdHRyID0gdGhpcy5nZXRBdHRyaWJ1dGVOb2RlKHF1YWxpZmllZE5hbWUpXG4gICAgaWYgKCFhdHRyKSB7XG4gICAgICAvLyBCZWNhdXNlIGNyZWF0ZUF0dHJpYnV0ZSBsb3dlcmNhc2VzIHRoZSBhdHRyaWJ1dGUgaW4gYW4gaHRtbCBkb2Mgd2UgaGF2ZSB0byB1c2UgY3JlYXRlQXR0cmlidXRlTlNcbiAgICAgIGF0dHIgPSB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlTlMobnVsbCwgcXVhbGlmaWVkTmFtZSwgdHJ1ZSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlTm9kZShhdHRyKVxuICAgIH1cblxuICAgIGF0dHIudmFsdWUgPSB2YWx1ZVxuICB9XG5cbiAgLypcbiAgICBMZXQgbmFtZXNwYWNlLCBwcmVmaXgsIGFuZCBsb2NhbE5hbWUgYmUgdGhlIHJlc3VsdCBvZiBwYXNzaW5nIG5hbWVzcGFjZSBhbmQgcXVhbGlmaWVkTmFtZSB0byB2YWxpZGF0ZSBhbmQgZXh0cmFjdC5cblxuICAgIFNldCBhbiBhdHRyaWJ1dGUgdmFsdWUgZm9yIHRoaXMgdXNpbmcgbG9jYWxOYW1lLCB2YWx1ZSwgYW5kIGFsc28gcHJlZml4IGFuZCBuYW1lc3BhY2UuXG5cbiAgICBJZiBwcmVmaXggaXMgbm90IGdpdmVuLCBzZXQgaXQgdG8gbnVsbC5cbiAgICBJZiBuYW1lc3BhY2UgaXMgbm90IGdpdmVuLCBzZXQgaXQgdG8gbnVsbC5cbiAgICBMZXQgYXR0cmlidXRlIGJlIHRoZSByZXN1bHQgb2YgZ2V0dGluZyBhbiBhdHRyaWJ1dGUgZ2l2ZW4gbmFtZXNwYWNlLCBsb2NhbE5hbWUsIGFuZCBlbGVtZW50LlxuICAgIElmIGF0dHJpYnV0ZSBpcyBudWxsLCBjcmVhdGUgYW4gYXR0cmlidXRlIHdob3NlIG5hbWVzcGFjZSBpcyBuYW1lc3BhY2UsIG5hbWVzcGFjZSBwcmVmaXggaXMgcHJlZml4LCBsb2NhbCBuYW1lIGlzIGxvY2FsTmFtZSwgdmFsdWUgaXMgdmFsdWUsIGFuZCBub2RlIGRvY3VtZW50IGlzIGVsZW1lbnTigJlzIG5vZGUgZG9jdW1lbnQsIHRoZW4gYXBwZW5kIHRoaXMgYXR0cmlidXRlIHRvIGVsZW1lbnQsIGFuZCB0aGVuIHJldHVybi5cblxuICAgIENoYW5nZSBhdHRyaWJ1dGUgdG8gdmFsdWUuXG4gICovXG5cbiAgc2V0QXR0cmlidXRlTm9kZSAobm9kZSkge1xuICAgIHRoaXMuYXR0cnMuYWRkKG5vZGUpXG4gICAgbm9kZS5vd25lckVsZW1lbnQgPSB0aGlzXG4gIH1cblxuICAvLyBjYWxsIGlzOiBkLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3Lm1vemlsbGEub3JnL25zL3NwZWNpYWxzcGFjZScsICdzcGVjOmFsaWduJywgJ2NlbnRlcicpO1xuICBzZXRBdHRyaWJ1dGVOUyAobmFtZXNwYWNlLCBuYW1lLCB2YWx1ZSkge1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgY29uc3QgWyBucywgcHJlZml4LCBsb2NhbE5hbWUgXSA9IHZhbGlkYXRlQW5kRXh0cmFjdChuYW1lc3BhY2UsIG5hbWUpXG5cbiAgICBsZXQgYXR0ciA9IHRoaXMuZ2V0QXR0cmlidXRlTm9kZU5TKG5zLCBsb2NhbE5hbWUpXG4gICAgaWYgKCFhdHRyKSB7XG4gICAgICBhdHRyID0gdGhpcy5vd25lckRvY3VtZW50LmNyZWF0ZUF0dHJpYnV0ZU5TKG5zLCBuYW1lKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGVOb2RlKGF0dHIpIC8vIHNldEF0dHJpYnV0ZU5vZGVOUyBpcyBhIHN5bm9ueW0gb2Ygc2V0QXR0cmlidXRlTm9kZVxuICAgIH1cblxuICAgIGF0dHIudmFsdWUgPSB2YWx1ZVxuXG4gICAgdGhpcy5hdHRycy5hZGQoYXR0cilcbiAgfVxuXG4gIGdldCBhdHRyaWJ1dGVzICgpIHtcbiAgICByZXR1cm4gWyAuLi50aGlzLmF0dHJzIF1cbiAgfVxuXG4gIGdldCBjbGFzc05hbWUgKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2xhc3MnKVxuICB9XG5cbiAgc2V0IGNsYXNzTmFtZSAoYykge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjbGFzcycsIGMpXG4gIH1cblxuICBnZXQgaWQgKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaWQnKSB8fCAnJ1xuICB9XG5cbiAgc2V0IGlkIChpZCkge1xuICAgIHJldHVybiB0aGlzLnNldEF0dHJpYnV0ZSgnaWQnLCBpZClcbiAgfVxuXG4gIGdldCBpbm5lckhUTUwgKCkge1xuXG4gICAgcmV0dXJuIHRoaXMuY2hpbGROb2Rlcy5tYXAobm9kZSA9PiB7XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHJldHVybiBodG1sRW50aXRpZXMobm9kZS5kYXRhKVxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuQ0RBVEFfU0VDVElPTl9OT0RFKSByZXR1cm4gY2RhdGEobm9kZS5kYXRhKVxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFKSByZXR1cm4gY29tbWVudChub2RlLmRhdGEpXG4gICAgICByZXR1cm4gbm9kZS5vdXRlckhUTUxcbiAgICB9KS5qb2luKCcnKVxuICB9XG5cbiAgc2V0IGlubmVySFRNTCAoc3RyKSB7XG4gICAgd2hpbGUgKHRoaXMuZmlyc3RDaGlsZCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIC8vIFRoZSBwYXJzZXIgYWRkcyB0aGUgaHRtbCB0byB0aGlzXG4gICAgSFRNTFBhcnNlcihzdHIsIHRoaXMpXG4gIH1cblxuICBnZXQgb3V0ZXJIVE1MICgpIHtcbiAgICByZXR1cm4gdGFnKHRoaXMpXG4gIH1cblxuICBzZXQgb3V0ZXJIVE1MIChzdHIpIHtcbiAgICBjb25zdCB3ZWxsID0gbmV3IERvY3VtZW50RnJhZ21lbnQoKVxuICAgIEhUTUxQYXJzZXIoc3RyLCB3ZWxsKVxuICAgIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod2VsbCwgdGhpcylcbiAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcylcbiAgfVxuXG59XG5cbm1peGluKFBhcmVudE5vZGUsIEVsZW1lbnQpXG5taXhpbihlbGVtZW50QWNjZXNzLCBFbGVtZW50KVxubWl4aW4oTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlLCBFbGVtZW50KVxubWl4aW4oQ2hpbGROb2RlLCBFbGVtZW50KVxuIiwiZXhwb3J0IGNsYXNzIEV2ZW50IHtcbiAgY29uc3RydWN0b3IgKHR5cGUpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlXG4gICAgdGhpcy5jYW5jZWxhYmxlID0gZmFsc2VcbiAgICB0aGlzLmRlZmF1bHRQcmV2ZW50ZWQgPSBmYWxzZVxuICAgIHRoaXMudGFyZ2V0ID0gbnVsbFxuICB9XG5cbiAgcHJldmVudERlZmF1bHQgKCkge1xuICAgIGlmICh0aGlzLmNhbmNlbGFibGUpIHtcbiAgICAgIHRoaXMuZGVmYXVsdFByZXZlbnRlZCA9IHRydWVcbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0ICQgPSBTeW1ib2woJ3ByaXZhdGUgcHJvcGVydGllcycpXG5cbmV4cG9ydCBjbGFzcyBFdmVudFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzWyRdID0ge31cbiAgICB0aGlzWyRdLmxpc3RlbmVycyA9IHt9XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyICh0eXBlLCBjYWxsYmFjaykge1xuICAgIGlmICghKHR5cGUgaW4gdGhpc1skXS5saXN0ZW5lcnMpKSB7XG4gICAgICB0aGlzWyRdLmxpc3RlbmVyc1t0eXBlXSA9IFtdXG4gICAgfVxuICAgIHRoaXNbJF0ubGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spXG4gIH1cblxuICBkaXNwYXRjaEV2ZW50IChldmVudCkge1xuICAgIGlmICghKGV2ZW50LnR5cGUgaW4gdGhpc1skXS5saXN0ZW5lcnMpKSB7IHJldHVybiB0cnVlIH1cblxuICAgIHZhciBzdGFjayA9IHRoaXNbJF0ubGlzdGVuZXJzW2V2ZW50LnR5cGVdXG4gICAgZXZlbnQudGFyZ2V0ID0gdGhpc1xuXG4gICAgc3RhY2suZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIGVsKGV2ZW50KVxuICAgIH0pXG5cbiAgICByZXR1cm4gIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWRcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIgKHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzWyRdLmxpc3RlbmVycykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBzdGFjayA9IHRoaXNbJF0ubGlzdGVuZXJzW3R5cGVdXG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc3RhY2subGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgaWYgKHN0YWNrW2ldID09PSBjYWxsYmFjaykge1xuICAgICAgICBzdGFjay5zcGxpY2UoaSwgMSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IGV4dGVuZCwgZXh0ZW5kU3RhdGljIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcblxuaW1wb3J0IHsgRXZlbnRUYXJnZXQgfSBmcm9tICcuL0V2ZW50VGFyZ2V0LmpzJ1xuaW1wb3J0IHsgY2xvbmVOb2RlIH0gZnJvbSAnLi4vdXRpbHMvdGFnVXRpbHMuanMnXG5pbXBvcnQgeyBodG1sIH0gZnJvbSAnLi4vdXRpbHMvbmFtZXNwYWNlcy5qcydcblxuY29uc3Qgbm9kZVR5cGVzID0ge1xuICBFTEVNRU5UX05PREU6IDEsXG4gIEFUVFJJQlVURV9OT0RFOiAyLFxuICBURVhUX05PREU6IDMsXG4gIENEQVRBX1NFQ1RJT05fTk9ERTogNCxcbiAgRU5USVRZX1JFRkVSRU5DRV9OT0RFOiA1LFxuICBFTlRJVFlfTk9ERTogNixcbiAgUFJPQ0VTU0lOR19JTlNUUlVDVElPTl9OT0RFOiA3LFxuICBDT01NRU5UX05PREU6IDgsXG4gIERPQ1VNRU5UX05PREU6IDksXG4gIERPQ1VNRU5UX1RZUEVfTk9ERTogMTAsXG4gIERPQ1VNRU5UX0ZSQUdNRU5UX05PREU6IDExLFxuICBOT1RBVElPTl9OT0RFOiAxMlxufVxuXG5leHBvcnQgY2xhc3MgTm9kZSBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcbiAgY29uc3RydWN0b3IgKG5hbWUgPSAnJywgcHJvcHMgPSB7fSwgbnMgPSBudWxsKSB7XG4gICAgc3VwZXIoKVxuXG4gICAgLy8gSWYgcHJvcHMubG9jYWwgaXMgdHJ1ZSwgdGhlIGVsZW1lbnQgd2FzIE5vZGUgd2FzIGNyZWF0ZWQgd2l0aCB0aGUgbm9uLW5hbWVzcGFjZSBmdW5jdGlvblxuICAgIC8vIHRoYXQgbWVhbnMgd2hhdGV2ZXIgd2FzIHBhc3NlZCBhcyBuYW1lIGlzIHRoZSBsb2NhbCBuYW1lIGV2ZW4gdGhvdWdoIGl0IG1pZ2h0IGxvb2sgbGlrZSBhIHByZWZpeFxuICAgIGlmIChuYW1lLmluY2x1ZGVzKCc6JykgJiYgIXByb3BzLmxvY2FsKSB7XG4gICAgICA7WyB0aGlzLnByZWZpeCwgdGhpcy5sb2NhbE5hbWUgXSA9IG5hbWUuc3BsaXQoJzonKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvY2FsTmFtZSA9IG5hbWVcbiAgICAgIHRoaXMucHJlZml4ID0gbnVsbFxuICAgIH1cblxuICAgIC8vIEZvbGxvdyBzcGVjIGFuZCB1cHBlcmNhc2Ugbm9kZU5hbWUgZm9yIGh0bWxcbiAgICB0aGlzLm5vZGVOYW1lID0gbnMgPT09IGh0bWwgPyBuYW1lLnRvVXBwZXJDYXNlKCkgOiBuYW1lXG5cbiAgICB0aGlzLm5hbWVzcGFjZVVSSSA9IG5zXG4gICAgdGhpcy5ub2RlVHlwZSA9IE5vZGUuRUxFTUVOVF9OT0RFXG4gICAgdGhpcy5ub2RlVmFsdWUgPSBwcm9wcy5ub2RlVmFsdWUgIT0gbnVsbCA/IHByb3BzLm5vZGVWYWx1ZSA6IG51bGxcbiAgICB0aGlzLmNoaWxkTm9kZXMgPSBbXVxuXG4gICAgdGhpcy5hdHRycyA9IHByb3BzLmF0dHJzIHx8IG5ldyBTZXQoKVxuXG4gICAgdGhpcy5vd25lckRvY3VtZW50ID0gcHJvcHMub3duZXJEb2N1bWVudCB8fCBudWxsXG4gICAgdGhpcy5wYXJlbnROb2RlID0gbnVsbFxuXG4gICAgLy8gdGhpcy5uYW1lc3BhY2VzID0ge31cbiAgICAvLyBpZiAodGhpcy5wcmVmaXgpIHtcbiAgICAvLyAgIHRoaXMubmFtZXNwYWNlc1t0aGlzLnByZWZpeF0gPSBuc1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICB0aGlzLm5hbWVzcGFjZXMuZGVmYXVsdCA9IG5zXG4gICAgLy8gfVxuXG4gICAgaWYgKHByb3BzLmNoaWxkTm9kZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IHByb3BzLmNoaWxkTm9kZXMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHByb3BzLmNoaWxkTm9kZXNbaV0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXBwZW5kQ2hpbGQgKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRCZWZvcmUobm9kZSlcbiAgfVxuXG4gIGNsb25lTm9kZSAoZGVlcCA9IGZhbHNlKSB7XG4gICAgY29uc3QgY2xvbmUgPSBjbG9uZU5vZGUodGhpcylcblxuICAgIGlmIChkZWVwKSB7XG4gICAgICB0aGlzLmNoaWxkTm9kZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGVsLmNsb25lTm9kZShkZWVwKVxuICAgICAgICBjbG9uZS5hcHBlbmRDaGlsZChub2RlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmVcbiAgfVxuXG4gIGNvbnRhaW5zIChub2RlKSB7XG4gICAgaWYgKG5vZGUgPT09IHRoaXMpIHJldHVybiBmYWxzZVxuXG4gICAgd2hpbGUgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgaWYgKG5vZGUgPT09IHRoaXMpIHJldHVybiB0cnVlXG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZ2V0Um9vdE5vZGUgKCkge1xuICAgIGlmICghdGhpcy5wYXJlbnROb2RlIHx8IHRoaXMubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfTk9ERSkgcmV0dXJuIHRoaXNcbiAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmdldFJvb3ROb2RlKClcbiAgfVxuXG4gIGhhc0NoaWxkTm9kZXMgKCkge1xuICAgIHJldHVybiAhIXRoaXMuY2hpbGROb2Rlcy5sZW5ndGhcbiAgfVxuXG4gIGluc2VydEJlZm9yZSAobm9kZSwgYmVmb3JlKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5jaGlsZE5vZGVzLmluZGV4T2YoYmVmb3JlKVxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5jaGlsZE5vZGVzLmxlbmd0aFxuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpIHtcbiAgICAgIGxldCBjaGlsZFxuICAgICAgbGV0IG9sZENoaWxkID0gYmVmb3JlXG4gICAgICB3aGlsZSAoKGNoaWxkID0gbm9kZS5jaGlsZE5vZGVzLnBvcCgpKSkge1xuICAgICAgICB0aGlzLmluc2VydEJlZm9yZShjaGlsZCwgb2xkQ2hpbGQpXG4gICAgICAgIG9sZENoaWxkID0gY2hpbGRcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlXG4gICAgfVxuXG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4gICAgfVxuXG4gICAgbm9kZS5wYXJlbnROb2RlID0gdGhpc1xuICAgIC8vIE9iamVjdC5zZXRQcm90b3R5cGVPZihub2RlLm5hbWVzcGFjZXMucHJvdG90eXBlLCB0aGlzLm5hbWVzcGFjZXMucHJvdG90eXBlKVxuXG4gICAgdGhpcy5jaGlsZE5vZGVzLnNwbGljZShpbmRleCwgMCwgbm9kZSlcbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgaXNEZWZhdWx0TmFtZXNwYWNlIChuYW1lc3BhY2VVUkkpIHtcbiAgICBzd2l0Y2ggKHRoaXMubm9kZVR5cGUpIHtcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxuICAgICAgaWYgKCF0aGlzLnByZWZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lc3BhY2VVUkkgPT09IG5hbWVzcGFjZVVSSVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3htbG5zJykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd4bWxucycpXG4gICAgICB9XG5cbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfTk9ERTpcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudC5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxuICAgIGNhc2UgTm9kZS5FTlRJVFlfTk9ERTpcbiAgICBjYXNlIE5vZGUuTk9UQVRJT05fTk9ERTpcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfVFlQRV9OT0RFOlxuICAgIGNhc2UgTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgY2FzZSBOb2RlLkFUVFJJQlVURV9OT0RFOlxuICAgICAgaWYgKHRoaXMub3duZXJFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm93bmVyRWxlbWVudC5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5pc0RlZmF1bHROYW1lc3BhY2UobmFtZXNwYWNlVVJJKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaXNFcXVhbE5vZGUgKG5vZGUpIHtcbiAgICB0aGlzLm5vcm1hbGl6ZSgpXG4gICAgbm9kZS5ub3JtYWxpemUoKVxuXG4gICAgbGV0IGJvb2wgPSB0aGlzLm5vZGVOYW1lID09PSBub2RlLm5vZGVOYW1lXG4gICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5sb2NhbE5hbWUgPT09IG5vZGUubG9jYWxOYW1lXG4gICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5uYW1lc3BhY2VVUkkgPT09IG5vZGUubmFtZXNwYWNlVVJJXG4gICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5wcmVmaXggPT09IG5vZGUucHJlZml4XG4gICAgYm9vbCA9IGJvb2wgJiYgdGhpcy5ub2RlVmFsdWUgPT09IG5vZGUubm9kZVZhbHVlXG5cbiAgICBib29sID0gYm9vbCAmJiB0aGlzLmNoaWxkTm9kZXMubGVuZ3RoID09PSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoXG5cbiAgICAvLyBkb250IGNoZWNrIGNoaWxkcmVuIHJlY3Vyc2l2ZWx5IHdoZW4gdGhlIGNvdW50IGRvZXNudCBldmVudCBhZGQgdXBcbiAgICBpZiAoIWJvb2wpIHJldHVybiBmYWxzZVxuXG4gICAgYm9vbCA9IGJvb2wgJiYgIXRoaXMuY2hpbGROb2Rlcy5yZWR1Y2UoKGxhc3QsIGN1cnIsIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gbGFzdCAmJiBjdXJyLmlzRXF1YWxOb2RlKG5vZGUuY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgfSwgdHJ1ZSlcblxuICAgIC8vIEZJWE1FOiBVc2UgYXR0ciBub2Rlc1xuICAgIC8qIGJvb2wgPSBib29sICYmICFbIC4uLnRoaXMuYXR0cnMuZW50cmllcygpIF0ucmVkdWNlKChsYXN0LCBjdXJyLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgWyBrZXksIHZhbCBdID0gbm9kZS5hdHRycy5lbnRyaWVzKClcbiAgICAgIHJldHVybiBsYXN0ICYmIGN1cnJbMF0gPT09IGtleSAmJiBjdXJyWzFdID09PSB2YWxcbiAgICB9LCB0cnVlKSAqL1xuXG4gICAgLypcbiAgICBUT0RPOlxuICAgIEZvciB0d28gRG9jdW1lbnRUeXBlIG5vZGVzIHRvIGJlIGVxdWFsLCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgbXVzdCBhbHNvIGJlIHNhdGlzZmllZDpcblxuICAgIFRoZSBmb2xsb3dpbmcgc3RyaW5nIGF0dHJpYnV0ZXMgYXJlIGVxdWFsOiBwdWJsaWNJZCwgc3lzdGVtSWQsIGludGVybmFsU3Vic2V0LlxuICAgIFRoZSBlbnRpdGllcyBOYW1lZE5vZGVNYXBzIGFyZSBlcXVhbC5cbiAgICBUaGUgbm90YXRpb25zIE5hbWVkTm9kZU1hcHMgYXJlIGVxdWFsLlxuICAgICovXG5cbiAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9UWVBFX05PREUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9UWVBFX05PREUpIHtcbiAgICAgIGJvb2wgPSBib29sICYmIHRoaXMucHVibGljSWQgPT09IG5vZGUucHVibGljSWRcbiAgICAgIGJvb2wgPSBib29sICYmIHRoaXMuc3lzdGVtSWQgPT09IG5vZGUuc3lzdGVtSWRcbiAgICAgIGJvb2wgPSBib29sICYmIHRoaXMuaW50ZXJuYWxTdWJzZXQgPT09IG5vZGUuaW50ZXJuYWxTdWJzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gYm9vbFxuICB9XG5cbiAgaXNTYW1lTm9kZSAobm9kZSkge1xuICAgIHJldHVybiB0aGlzID09PSBub2RlXG4gIH1cblxuICBsb29rdXBOYW1lc3BhY2VQcmVmaXggKG5hbWVzcGFjZVVSSSwgb3JpZ2luYWxFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMubmFtZXNwYWNlVVJJICYmIHRoaXMubmFtZXNwYWNlVVJJID09PSBuYW1lc3BhY2VVUkkgJiYgdGhpcy5wcmVmaXhcbiAgICAgICAgICYmIG9yaWdpbmFsRWxlbWVudC5sb29rdXBOYW1lc3BhY2VVUkkodGhpcy5wcmVmaXgpID09PSBuYW1lc3BhY2VVUkkpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZWZpeFxuICAgIH1cblxuICAgIGZvciAoY29uc3QgWyBrZXksIHZhbCBdIG9mIHRoaXMuYXR0cnMuZW50cmllcygpKSB7XG4gICAgICBpZiAoIWtleS5pbmNsdWRlcygnOicpKSBjb250aW51ZVxuXG4gICAgICBjb25zdCBbIGF0dHJQcmVmaXgsIG5hbWUgXSA9IGtleS5zcGxpdCgnOicpXG4gICAgICBpZiAoYXR0clByZWZpeCA9PT0gJ3htbG5zJyAmJiB2YWwgPT09IG5hbWVzcGFjZVVSSSAmJiBvcmlnaW5hbEVsZW1lbnQubG9va3VwTmFtZXNwYWNlVVJJKG5hbWUpID09PSBuYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgcmV0dXJuIG5hbWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbnRpdHlSZWZlcmVuY2VzIG1heSBoYXZlIHRvIGJlIHNraXBwZWQgdG8gZ2V0IHRvIGl0XG4gICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJLCBvcmlnaW5hbEVsZW1lbnQpXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBsb29rdXBOYW1lc3BhY2VVUkkgKHByZWZpeCkge1xuICAgIHN3aXRjaCAodGhpcy5ub2RlVHlwZSkge1xuICAgIGNhc2UgTm9kZS5FTEVNRU5UX05PREU6XG4gICAgICBpZiAodGhpcy5uYW1lc3BhY2VVUkkgIT0gbnVsbCAmJiB0aGlzLnByZWZpeCA9PT0gcHJlZml4KSB7XG4gICAgICAgIC8vIE5vdGU6IHByZWZpeCBjb3VsZCBiZSBcIm51bGxcIiBpbiB0aGlzIGNhc2Ugd2UgYXJlIGxvb2tpbmcgZm9yIGRlZmF1bHQgbmFtZXNwYWNlXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVzcGFjZVVSSVxuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IFsga2V5LCB2YWwgXSBvZiB0aGlzLmF0dHJzLmVudHJpZXMoKSkge1xuICAgICAgICBpZiAoIWtleS5pbmNsdWRlcygnOicpKSBjb250aW51ZVxuXG4gICAgICAgIGNvbnN0IFsgYXR0clByZWZpeCwgbmFtZSBdID0ga2V5LnNwbGl0KCc6JylcbiAgICAgICAgaWYgKGF0dHJQcmVmaXggPT09ICd4bWxucycgJiYgbmFtZSA9PT0gcHJlZml4KSB7XG4gICAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgLy8gRklYTUU6IExvb2sgdXAgaWYgcHJlZml4IG9yIGF0dHJQcmVmaXhcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lID09PSAneG1sbnMnICYmIHByZWZpeCA9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRW50aXR5UmVmZXJlbmNlcyBtYXkgaGF2ZSB0byBiZSBza2lwcGVkIHRvIGdldCB0byBpdFxuICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmxvb2t1cE5hbWVzcGFjZVVSSShwcmVmaXgpXG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIGNhc2UgTm9kZS5ET0NVTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRFbGVtZW50Lmxvb2t1cE5hbWVzcGFjZVVSSShwcmVmaXgpXG4gICAgY2FzZSBOb2RlLkVOVElUWV9OT0RFOlxuICAgIGNhc2UgTm9kZS5OT1RBVElPTl9OT0RFOlxuICAgIGNhc2UgTm9kZS5ET0NVTUVOVF9UWVBFX05PREU6XG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XG4gICAgICByZXR1cm4gbnVsbFxuICAgIGNhc2UgTm9kZS5BVFRSSUJVVEVfTk9ERTpcbiAgICAgIGlmICh0aGlzLm93bmVyRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vd25lckVsZW1lbnQubG9va3VwTmFtZXNwYWNlVVJJKHByZWZpeClcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5sb29rdXBOYW1lc3BhY2VVUkkocHJlZml4KVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBsb29rdXBQcmVmaXggKG5hbWVzcGFjZVVSSSkge1xuICAgIGlmICghbmFtZXNwYWNlVVJJKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLm5vZGVUeXBlXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxuICAgICAgcmV0dXJuIHRoaXMubG9va3VwTmFtZXNwYWNlUHJlZml4KG5hbWVzcGFjZVVSSSwgdGhpcylcbiAgICBjYXNlIE5vZGUuRE9DVU1FTlRfTk9ERTpcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudC5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJKVxuICAgIGNhc2UgTm9kZS5FTlRJVFlfTk9ERSA6XG4gICAgY2FzZSBOb2RlLk5PVEFUSU9OX05PREU6XG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XG4gICAgY2FzZSBOb2RlLkRPQ1VNRU5UX1RZUEVfTk9ERTpcbiAgICAgIHJldHVybiBudWxsIC8vIHR5cGUgaXMgdW5rbm93blxuICAgIGNhc2UgTm9kZS5BVFRSSUJVVEVfTk9ERTpcbiAgICAgIGlmICh0aGlzLm93bmVyRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vd25lckVsZW1lbnQubG9va3VwTmFtZXNwYWNlUHJlZml4KG5hbWVzcGFjZVVSSSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIEVudGl0eVJlZmVyZW5jZXMgbWF5IGhhdmUgdG8gYmUgc2tpcHBlZCB0byBnZXQgdG8gaXRcbiAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Tm9kZS5sb29rdXBOYW1lc3BhY2VQcmVmaXgobmFtZXNwYWNlVVJJKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBub3JtYWxpemUgKCkge1xuICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBbXVxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLmNoaWxkTm9kZXMpIHtcbiAgICAgIGNvbnN0IGxhc3QgPSBjaGlsZE5vZGVzLnNoaWZ0KClcbiAgICAgIGlmICghbGFzdCkge1xuICAgICAgICBpZiAobm9kZS5kYXRhKSB7XG4gICAgICAgICAgY2hpbGROb2Rlcy51bnNoaWZ0KG5vZGUpXG4gICAgICAgIH1cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgIGlmICghbm9kZS5kYXRhKSB7XG4gICAgICAgICAgY2hpbGROb2Rlcy51bnNoaWZ0KGxhc3QpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuICAgICAgICAgIGNvbnN0IG1lcmdlZCA9IHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsYXN0LmRhdGEgKyBub2RlLmRhdGEpXG4gICAgICAgICAgY2hpbGROb2Rlcy5wdXNoKG1lcmdlZClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgY2hpbGROb2Rlcy5wdXNoKGxhc3QsIG5vZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hpbGROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgbm9kZS5wYXJlbnROb2RlID0gdGhpc1xuICAgIH0pXG4gICAgdGhpcy5jaGlsZE5vZGVzID0gY2hpbGROb2Rlc1xuICAgIC8vIHRoaXMuY2hpbGROb2RlcyA9IHRoaXMuY2hpbGROb2Rlcy5mb3JFYWNoKCh0ZXh0Tm9kZXMsIG5vZGUpID0+IHtcbiAgICAvLyAgIC8vIEZJWE1FOiBJZiBmaXJzdCBub2RlIGlzIGFuIGVtcHR5IHRleHRub2RlLCB3aGF0IGRvIHdlIGRvPyAtPiBzcGVjXG4gICAgLy8gICBpZiAoIXRleHROb2RlcykgcmV0dXJuIFsgbm9kZSBdXG4gICAgLy8gICB2YXIgbGFzdCA9IHRleHROb2Rlcy5wb3AoKVxuXG4gICAgLy8gICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAvLyAgICAgaWYgKCFub2RlLmRhdGEpIHJldHVybiB0ZXh0Tm9kZXNcblxuICAgIC8vICAgICBpZiAobGFzdC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcbiAgICAvLyAgICAgICBjb25zdCBtZXJnZWQgPSB0aGlzLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGFzdC5kYXRhICsgJyAnICsgbm9kZS5kYXRhKVxuICAgIC8vICAgICAgIHRleHROb2Rlcy5wdXNoKG1lcmdlZClcbiAgICAvLyAgICAgICByZXR1cm4gdGV4dE5vZGVzLmNvbmNhdChtZXJnZWQpXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIHRleHROb2Rlcy5wdXNoKGxhc3QsIG5vZGUpXG4gICAgLy8gICB9XG5cbiAgICAvLyAgIHJldHVybiB0ZXh0Tm9kZXNcbiAgICAvLyB9LCBudWxsKVxuICB9XG5cbiAgcmVtb3ZlQ2hpbGQgKG5vZGUpIHtcblxuICAgIG5vZGUucGFyZW50Tm9kZSA9IG51bGxcbiAgICAvLyBPYmplY3Quc2V0UHJvdG90eXBlT2Yobm9kZSwgbnVsbClcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hpbGROb2Rlcy5pbmRleE9mKG5vZGUpXG4gICAgaWYgKGluZGV4ID09PSAtMSkgcmV0dXJuIG5vZGVcbiAgICB0aGlzLmNoaWxkTm9kZXMuc3BsaWNlKGluZGV4LCAxKVxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICByZXBsYWNlQ2hpbGQgKG5ld0NoaWxkLCBvbGRDaGlsZCkge1xuICAgIGNvbnN0IGJlZm9yZSA9IG9sZENoaWxkLm5leHRTaWJsaW5nXG4gICAgdGhpcy5yZW1vdmVDaGlsZChvbGRDaGlsZClcbiAgICB0aGlzLmluc2VydEJlZm9yZShuZXdDaGlsZCwgYmVmb3JlKVxuICAgIHJldHVybiBvbGRDaGlsZFxuICB9XG5cbiAgZ2V0IG5leHRTaWJsaW5nICgpIHtcbiAgICBjb25zdCBjaGlsZCA9IHRoaXMucGFyZW50Tm9kZSAmJiB0aGlzLnBhcmVudE5vZGUuY2hpbGROb2Rlc1t0aGlzLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5pbmRleE9mKHRoaXMpICsgMV1cbiAgICByZXR1cm4gY2hpbGQgfHwgbnVsbFxuICB9XG5cbiAgZ2V0IHByZXZpb3VzU2libGluZyAoKSB7XG4gICAgY29uc3QgY2hpbGQgPSB0aGlzLnBhcmVudE5vZGUgJiYgdGhpcy5wYXJlbnROb2RlLmNoaWxkTm9kZXNbdGhpcy5wYXJlbnROb2RlLmNoaWxkTm9kZXMuaW5kZXhPZih0aGlzKSAtIDFdXG4gICAgcmV0dXJuIGNoaWxkIHx8IG51bGxcbiAgfVxuXG4gIGdldCB0ZXh0Q29udGVudCAoKSB7XG4gICAgaWYgKHRoaXMubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSByZXR1cm4gdGhpcy5kYXRhXG4gICAgaWYgKHRoaXMubm9kZVR5cGUgPT09IE5vZGUuQ0RBVEFfU0VDVElPTl9OT0RFKSByZXR1cm4gdGhpcy5kYXRhXG4gICAgaWYgKHRoaXMubm9kZVR5cGUgPT09IE5vZGUuQ09NTUVOVF9OT0RFKSByZXR1cm4gdGhpcy5kYXRhXG5cbiAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzLnJlZHVjZShmdW5jdGlvbiAobGFzdCwgY3VycmVudCkge1xuICAgICAgcmV0dXJuIGxhc3QgKyBjdXJyZW50LnRleHRDb250ZW50XG4gICAgfSwgJycpXG4gIH1cblxuICBzZXQgdGV4dENvbnRlbnQgKHRleHQpIHtcbiAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUgfHwgdGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5DREFUQV9TRUNUSU9OX05PREUgfHwgdGhpcy5ub2RlVHlwZSA9PT0gTm9kZS5DT01NRU5UX05PREUpIHtcbiAgICAgIHRoaXMuZGF0YSA9IHRleHRcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLmNoaWxkTm9kZXMgPSBbXVxuICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKVxuICB9XG5cbiAgZ2V0IGxhc3RDaGlsZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hpbGROb2Rlc1t0aGlzLmNoaWxkTm9kZXMubGVuZ3RoIC0gMV0gfHwgbnVsbFxuICB9XG5cbiAgZ2V0IGZpcnN0Q2hpbGQgKCkge1xuICAgIHJldHVybiB0aGlzLmNoaWxkTm9kZXNbMF0gfHwgbnVsbFxuICB9XG59XG5cbmV4dGVuZFN0YXRpYyhOb2RlLCBub2RlVHlwZXMpXG5leHRlbmQoTm9kZSwgbm9kZVR5cGVzKVxuIiwiaW1wb3J0IHsgZXh0ZW5kU3RhdGljIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcblxuZXhwb3J0IGNsYXNzIE5vZGVGaWx0ZXIge1xuICBhY2NlcHROb2RlICgpIHtcbiAgICByZXR1cm4gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUXG4gIH1cbn1cblxuZXh0ZW5kU3RhdGljKE5vZGVGaWx0ZXIsIHtcbiAgRklMVEVSX0FDQ0VQVDogMSxcbiAgRklMVEVSX1JFSkVDVDogMixcbiAgRklMVEVSX0lHTk9SRTogNCxcbiAgU0hPV19BTEw6IC0xLFxuICBTSE9XX0VMRU1FTlQ6IDEsXG4gIFNIT1dfVEVYVDogNCxcbiAgU0hPV19FTlRJVFlfUkVGRVJFTkNFOiAxNixcbiAgU0hPV19FTlRJVFk6IDMyLFxuICBTSE9XX1BST0NFU1NJTkdfSU5TVFJVQ1RJT046IDY0LFxuICBTSE9XX0NPTU1FTlQ6IDEyOCxcbiAgU0hPV19ET0NVTUVOVDogMjU2LFxuICBTSE9XX0RPQ1VNRU5UX1RZUEU6IDUxMixcbiAgU0hPV19ET0NVTUVOVF9GUkFHTUVOVDogMTAyNCxcbiAgU0hPV19OT1RBVElPTjogMjA0OFxufSlcbiIsImltcG9ydCB7IENoYXJhY3RlckRhdGEgfSBmcm9tICcuL0NoYXJhY3RlckRhdGEuanMnXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnLi9Ob2RlLmpzJ1xuXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIENoYXJhY3RlckRhdGEge1xuICBjb25zdHJ1Y3RvciAobmFtZSwgcHJvcHMpIHtcbiAgICBzdXBlcihuYW1lLCBwcm9wcylcbiAgICB0aGlzLm5vZGVUeXBlID0gTm9kZS5URVhUX05PREVcbiAgfVxufVxuIiwiaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcbmltcG9ydCB7IEV2ZW50VGFyZ2V0IH0gZnJvbSAnLi9FdmVudFRhcmdldC5qcydcbmltcG9ydCB7IE5vZGUgfSBmcm9tICcuL05vZGUuanMnXG5pbXBvcnQgeyBEb2N1bWVudCB9IGZyb20gJy4vRG9jdW1lbnQuanMnXG5pbXBvcnQgeyBEb2N1bWVudEZyYWdtZW50IH0gZnJvbSAnLi9Eb2N1bWVudEZyYWdtZW50LmpzJ1xuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vVGV4dC5qcydcbmltcG9ydCB7IEN1c3RvbUV2ZW50IH0gZnJvbSAnLi9DdXN0b21FdmVudC5qcydcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi9FdmVudC5qcydcbmltcG9ydCB7IEVsZW1lbnQgfSBmcm9tICcuL0VsZW1lbnQuanMnXG5pbXBvcnQgeyBBdHRyIH0gZnJvbSAnLi9BdHRyLmpzJ1xuaW1wb3J0IHsgSFRNTEltYWdlRWxlbWVudCB9IGZyb20gJy4vaHRtbC9IVE1MSW1hZ2VFbGVtZW50LmpzJ1xuaW1wb3J0IHsgSFRNTExpbmtFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxMaW5rRWxlbWVudC5qcydcbmltcG9ydCB7IEhUTUxTY3JpcHRFbGVtZW50IH0gZnJvbSAnLi9odG1sL0hUTUxTY3JpcHRFbGVtZW50LmpzJ1xuaW1wb3J0IHsgSFRNTEVsZW1lbnQgfSBmcm9tICcuL2h0bWwvSFRNTEVsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdQb2ludCB9IGZyb20gJy4vc3ZnL1NWR1BvaW50LmpzJ1xuaW1wb3J0IHsgU1ZHTWF0cml4IH0gZnJvbSAnLi9zdmcvU1ZHTWF0cml4LmpzJ1xuaW1wb3J0IHsgU1ZHRWxlbWVudCB9IGZyb20gJy4vc3ZnL1NWR0VsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdTVkdFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHU1ZHRWxlbWVudC5qcydcbmltcG9ydCB7IFNWR1BhdGhFbGVtZW50IH0gZnJvbSAnLi9zdmcvU1ZHUGF0aEVsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdHcmFwaGljc0VsZW1lbnQuanMnXG5pbXBvcnQgeyBTVkdUZXh0Q29udGVudEVsZW1lbnQgfSBmcm9tICcuL3N2Zy9TVkdUZXh0Q29udGVudEVsZW1lbnQuanMnXG5pbXBvcnQgeyBjYW1lbENhc2UgfSBmcm9tICcuLi91dGlscy9zdHJVdGlscy5qcydcbmltcG9ydCAqIGFzIGRlZmF1bHRzIGZyb20gJy4uL3V0aWxzL2RlZmF1bHRzLmpzJ1xuXG5leHBvcnQgY2xhc3MgV2luZG93IGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZG9jdW1lbnQgPSBuZXcgRG9jdW1lbnQoKVxuICAgIHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgPSB0aGlzXG4gICAgdGhpcy5zZWxmID0gdGhpc1xuICAgIGNvbnN0IGRvYyA9IHRoaXMuZG9jdW1lbnRcbiAgICB0aGlzLkltYWdlID0gY2xhc3Mge1xuICAgICAgY29uc3RydWN0b3IgKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgY29uc3QgaW1nID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgIGlmICh3aWR0aCAhPSBudWxsKSBpbWcuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoKVxuICAgICAgICBpZiAoaGVpZ2h0ICE9IG51bGwpIGltZy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgICAgcmV0dXJuIGltZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENvbXB1dGVkU3R5bGUgKG5vZGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gRklYTUU6IEN1cnJlbnRseSB0aGlzIGZ1bmN0aW9uIHRyZWF0cyBldmVyeSBnaXZlbiBhdHRyXG4gICAgICAvLyBhcyBpbmhlcml0YWJsZSBmcm9tIGl0cyBwYXJlbnRzIHdoaWNoIGlzIG9mYyBub3QgYWx3YXlzIHRydWVcbiAgICAgIC8vIGJ1dCBnb29kIGVub3VnaCBmb3Igc3ZnLmpzXG4gICAgICBnZXRQcm9wZXJ0eVZhbHVlIChhdHRyKSB7XG4gICAgICAgIGxldCB2YWx1ZVxuICAgICAgICBsZXQgY3VyID0gbm9kZVxuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICB2YWx1ZSA9IGN1ci5zdHlsZVthdHRyXSB8fCBjdXIuZ2V0QXR0cmlidXRlKGF0dHIpXG4gICAgICAgIH0gd2hpbGUgKFxuICAgICAgICAgIHZhbHVlID09IG51bGxcbiAgICAgICAgICAmJiAoY3VyID0gY3VyLnBhcmVudE5vZGUpXG4gICAgICAgICAgJiYgY3VyLm5vZGVUeXBlID09PSAxXG4gICAgICAgIClcblxuICAgICAgICByZXR1cm4gdmFsdWUgfHwgZGVmYXVsdHNbY2FtZWxDYXNlKGF0dHIpXSB8fCBudWxsXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmxldCBsYXN0VGltZSA9IDBcbmNvbnN0IHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGNhbGxiYWNrID0+IHtcbiAgY29uc3Qgbm93ID0gbmV3IGdsb2JhbC5EYXRlKCkuZ2V0VGltZSgpXG4gIGNvbnN0IHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChub3cgLSBsYXN0VGltZSkpXG4gIHJldHVybiBnbG9iYWwuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbGFzdFRpbWUgPSBub3cgKyB0aW1lVG9DYWxsXG4gICAgY2FsbGJhY2sobGFzdFRpbWUpXG4gIH0sIHRpbWVUb0NhbGwpXG59XG5cbmNvbnN0IG5vd09mZnNldCA9IGdsb2JhbC5EYXRlLm5vdygpXG5jb25zdCBwZXJmb3JtYW5jZSA9IHtcbiAgbm93OiAoKSA9PiBEYXRlLm5vdygpIC0gbm93T2Zmc2V0XG59XG5cbmNvbnN0IHdpblByb3BzID0ge1xuICBXaW5kb3csXG4gIERvY3VtZW50LFxuICBEb2N1bWVudEZyYWdtZW50LFxuICBOb2RlLFxuICBFdmVudFRhcmdldCxcbiAgVGV4dCxcbiAgQXR0cixcbiAgRWxlbWVudCxcbiAgQ3VzdG9tRXZlbnQsXG4gIEV2ZW50LFxuICBIVE1MRWxlbWVudCxcbiAgSFRNTExpbmtFbGVtZW50LFxuICBIVE1MU2NyaXB0RWxlbWVudCxcbiAgSFRNTEltYWdlRWxlbWVudCxcbiAgLy8gSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIC8vIGlzIHNldCBvbiBjb25zdHJ1Y3Rpb25cbiAgU1ZHTWF0cml4LFxuICBTVkdQb2ludCxcbiAgU1ZHRWxlbWVudCxcbiAgU1ZHU1ZHRWxlbWVudCxcbiAgU1ZHUGF0aEVsZW1lbnQsXG4gIFNWR0dyYXBoaWNzRWxlbWVudCxcbiAgU1ZHVGV4dENvbnRlbnRFbGVtZW50LFxuICBzZXRUaW1lb3V0OiBnbG9iYWwuc2V0VGltZW91dCxcbiAgY2xlYXJUaW1lb3V0OiBnbG9iYWwuY2xlYXJUaW1lb3V0LFxuICBwYWdlWE9mZnNldDogMCxcbiAgcGFnZVlPZmZzZXQ6IDAsXG4gIERhdGU6IGdsb2JhbC5EYXRlLFxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lOiBnbG9iYWwuY2xlYXJUaW1lb3V0LFxuICBwZXJmb3JtYW5jZVxufVxuXG5leHRlbmQoV2luZG93LCB3aW5Qcm9wcylcbiIsImltcG9ydCB7IEVsZW1lbnQgfSBmcm9tICcuLi9FbGVtZW50LmpzJ1xuXG5leHBvcnQgY2xhc3MgSFRNTEVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHt9XG4iLCJpbXBvcnQgc2l6ZU9mIGZyb20gJ2ltYWdlLXNpemUnXG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4uL0V2ZW50LmpzJ1xuaW1wb3J0IHsgSFRNTEVsZW1lbnQgfSBmcm9tICcuL0hUTUxFbGVtZW50LmpzJ1xuLy8gaW1wb3J0IHsgZ2V0RmlsZUJ1ZmZlckZyb21VUkwgfSBmcm9tICcuLi8uLi91dGlscy9maWxlVXJsVG9CdWZmZXIuanMnXG4vLyBpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5leHBvcnQgY2xhc3MgSFRNTEltYWdlRWxlbWVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKVxuICAgIHRoaXMubmF0dXJhbFdpZHRoID0gMFxuICAgIHRoaXMubmF0dXJhbEhlaWdodCA9IDBcbiAgICB0aGlzLmNvbXBsZXRlID0gZmFsc2VcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhIVE1MSW1hZ2VFbGVtZW50LnByb3RvdHlwZSwge1xuICBzcmM6IHtcbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgIH0sXG4gICAgc2V0ICh2YWwpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzcmMnLCB2YWwpXG4gICAgICAvLyBjb25zdCB1cmwgPSBwYXRoLnJlc29sdmUodGhpcy5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmxvY2F0aW9uLCB2YWwpXG4gICAgICAvLyBnZXRGaWxlQnVmZmVyRnJvbVVSTCh1cmwsIChidWZmZXIpID0+IHtcbiAgICAgIHNpemVPZih2YWwsIChlcnIsIHNpemUpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2Vycm9yJykpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uYXR1cmFsV2lkdGggPSBzaXplLndpZHRoXG4gICAgICAgIHRoaXMubmF0dXJhbEhlaWdodCA9IHNpemUuaGVpZ2h0XG4gICAgICAgIHRoaXMuY29tcGxldGUgPSB0cnVlXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvYWQnKSlcbiAgICAgIH0pXG4gICAgICAvLyB9KVxuICAgIH1cbiAgfSxcbiAgaGVpZ2h0OiB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykgfHwgdGhpcy5uYXR1cmFsSGVpZ2h0XG4gICAgfSxcbiAgICBzZXQgKHZhbCkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHZhbClcbiAgICB9XG4gIH0sXG4gIHdpZHRoOiB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSB8fCB0aGlzLm5hdHVyYWxXaWR0aFxuICAgIH0sXG4gICAgc2V0ICh2YWwpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHZhbClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBIVE1MRWxlbWVudCB9IGZyb20gJy4vSFRNTEVsZW1lbnQuanMnXG5cbmV4cG9ydCBjbGFzcyBIVE1MTGlua0VsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7fVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhIVE1MTGlua0VsZW1lbnQucHJvdG90eXBlLCB7XG4gIGhyZWY6IHtcbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJylcbiAgICB9LFxuICAgIHNldCAodmFsKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnaHJlZicsIHZhbClcbiAgICB9XG4gIH0sXG4gIHJlbDoge1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3JlbCcpXG4gICAgfSxcbiAgICBzZXQgKHZhbCkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3JlbCcsIHZhbClcbiAgICB9XG4gIH0sXG4gIHR5cGU6IHtcbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0eXBlJylcbiAgICB9LFxuICAgIHNldCAodmFsKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndHlwZScsIHZhbClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgc2F4IGZyb20gJ3NheCdcblxuLy8gVE9ETzogSXRzIGFuIFhNTFBhcnNlciBub3QgSFRNTFBhcnNlciEhXG5leHBvcnQgY29uc3QgSFRNTFBhcnNlciA9IGZ1bmN0aW9uIChzdHIsIGVsKSB7XG4gIGxldCBjdXJyZW50VGFnID0gZWxcbiAgLy8gY29uc3QgbmFtZXNwYWNlcyA9IHsgeG1sbnM6IGVsLmdldEF0dHJpYnV0ZSgneG1sbnMnKSB9XG4gIGxldCBkb2N1bWVudCA9IGVsLm93bmVyRG9jdW1lbnRcbiAgbGV0IGNkYXRhID0gbnVsbFxuXG4gIC8vIHNheCBleHBlY3RzIGEgcm9vdCBlbGVtZW50IGJ1dCB3ZSBhbHNvIG1pc3N1c2UgaXQgdG8gcGFyc2UgZnJhZ21lbnRzXG4gIGlmIChlbC5ub2RlVHlwZSAhPT0gZWwuRE9DVU1FTlRfTk9ERSkge1xuICAgIHN0ciA9ICc8c3ZnZG9tOndyYXBwZXIgeG1sbnM6c3ZnZG9tPVwic3ZnZG9tOnJvY2tzXCI+JyArIHN0ciArICc8L3N2Z2RvbTp3cmFwcGVyPidcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudCA9IGVsXG4gIH1cblxuICBjb25zdCBwYXJzZXIgPSBzYXgucGFyc2VyKHRydWUsIHtcbiAgICAvLyBsb3dlcmNhc2U6IHRydWUsXG4gICAgeG1sbnM6IHRydWUsXG4gICAgc3RyaWN0RW50aXRpZXM6IHRydWVcbiAgfSlcblxuICBwYXJzZXIub25lcnJvciA9IChlKSA9PiB7XG4gICAgdGhyb3cgZVxuICB9XG5cbiAgcGFyc2VyLm9uZG9jdHlwZSA9IChzdHIpID0+IHtcbiAgICBpZiAoY3VycmVudFRhZyAhPT0gZG9jdW1lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRG9jdHlwZSBjYW4gb25seSBiZSBhcHBlbmRlZCB0byBkb2N1bWVudCcpXG4gICAgfVxuICAgIGN1cnJlbnRUYWcuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnRUeXBlKCkpXG4gIH1cblxuICBwYXJzZXIub250ZXh0ID0gKHN0cikgPT4gY3VycmVudFRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKVxuICBwYXJzZXIub25jb21tZW50ID0gKHN0cikgPT4gY3VycmVudFRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVDb21tZW50KHN0cikpXG5cbiAgLy8gcGFyc2VyLm9ub3Blbm5hbWVzcGFjZSA9IG5zID0+IHtcbiAgLy8gICBuYW1lc3BhY2VzW25zLnByZWZpeF0gPSBucy51cmlcbiAgLy8gfVxuICAvLyBwYXJzZXIub25jbG9zZW5hbWVzcGFjZSA9IG5zID0+IHtcbiAgLy8gICBkZWxldGUgbmFtZXNwYWNlc1tucy5wcmVmaXhdXG4gIC8vIH1cblxuICBwYXJzZXIub25vcGVudGFnID0gbm9kZSA9PiB7XG4gICAgaWYgKG5vZGUubmFtZSA9PT0gJ3N2Z2RvbTp3cmFwcGVyJykgcmV0dXJuXG5cbiAgICBjb25zdCBhdHRycyA9IG5vZGUuYXR0cmlidXRlc1xuXG4gICAgY29uc3QgdXJpID0gbm9kZS51cmkgfHwgY3VycmVudFRhZy5sb29rdXBOYW1lc3BhY2VVUkkobm9kZS5wcmVmaXggfHwgbnVsbClcblxuICAgIHZhciBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHVyaSwgbm9kZS5uYW1lKVxuXG4gICAgZm9yIChjb25zdCBbIG5hbWUsIG5vZGUgXSBvZiBPYmplY3QuZW50cmllcyhhdHRycykpIHtcbiAgICAgIG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlTlMobm9kZS51cmksIG5hbWUsIG5vZGUudmFsdWUpXG4gICAgfVxuXG4gICAgY3VycmVudFRhZy5hcHBlbmRDaGlsZChuZXdFbGVtZW50KVxuICAgIGN1cnJlbnRUYWcgPSBuZXdFbGVtZW50XG4gIH1cblxuICBwYXJzZXIub25jbG9zZXRhZyA9IHRhZ05hbWUgPT4ge1xuICAgIGlmICh0YWdOYW1lID09PSAnc3ZnZG9tOndyYXBwZXInKSByZXR1cm5cblxuICAgIGN1cnJlbnRUYWcgPSBjdXJyZW50VGFnLnBhcmVudE5vZGVcbiAgfVxuXG4gIHBhcnNlci5vbm9wZW5jZGF0YSA9ICgpID0+IHtcbiAgICBjZGF0YSA9IGRvY3VtZW50LmNyZWF0ZUNEQVRBU2VjdGlvbignJylcbiAgfVxuXG4gIHBhcnNlci5vbmNkYXRhID0gKHN0cikgPT4ge1xuICAgIGNkYXRhLmFwcGVuZERhdGEoc3RyKVxuICB9XG5cbiAgcGFyc2VyLm9uY2xvc2VjZGF0YSA9ICgpID0+IHtcbiAgICBjdXJyZW50VGFnLmFwcGVuZENoaWxkKGNkYXRhKVxuICB9XG5cbiAgcGFyc2VyLndyaXRlKHN0cilcbn1cbiIsIlxuaW1wb3J0IHsgSFRNTEVsZW1lbnQgfSBmcm9tICcuL0hUTUxFbGVtZW50LmpzJ1xuZXhwb3J0IGNsYXNzIEhUTUxTY3JpcHRFbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge31cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoSFRNTFNjcmlwdEVsZW1lbnQucHJvdG90eXBlLCB7XG4gIHNyYzoge1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NyYycpXG4gICAgfSxcbiAgICBzZXQgKHZhbCkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHZhbClcbiAgICB9XG4gIH0sXG4gIHR5cGU6IHtcbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0eXBlJylcbiAgICB9LFxuICAgIHNldCAodmFsKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgndHlwZScsIHZhbClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBub2Rlc1RvTm9kZSB9IGZyb20gJy4uLy4uL3V0aWxzL25vZGVzVG9Ob2RlLmpzJ1xuXG4vLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI2ludGVyZmFjZS1jaGlsZG5vZGVcbi8vIFRvZG86IGNoZWNrIGlmIHRoaXMgaXMgY29udGFpbmVkIGluIG5vZGVzIG9yIHNpYmxpbmdzIGFyZSBjb250YWluZWQgKHZpYWJsZVByZXZpb3VzU2libGluZywgdmlhYmxlTmV4dFNpYmxpbmcpXG5leHBvcnQgY29uc3QgQ2hpbGROb2RlID0ge1xuICBiZWZvcmUgKC4uLm5vZGVzKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVyblxuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1RvTm9kZShub2RlcywgdGhpcy5vd25lckRvY3VtZW50KVxuICAgIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgdGhpcylcbiAgfSxcbiAgYWZ0ZXIgKC4uLm5vZGVzKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVyblxuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1RvTm9kZShub2RlcywgdGhpcy5vd25lckRvY3VtZW50KVxuICAgIHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgdGhpcy5uZXh0U2libGluZylcbiAgfSxcbiAgcmVwbGFjZVdpdGggKC4uLm5vZGVzKSB7XG4gICAgaWYgKCF0aGlzLnBhcmVudE5vZGUpIHJldHVyblxuICAgIGNvbnN0IG5leHQgPSB0aGlzLm5leHRTaWJsaW5nXG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXG4gICAgdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBuZXh0KVxuICAgIHRoaXMucmVtb3ZlKClcbiAgfSxcbiAgcmVtb3ZlICgpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50Tm9kZSkgcmV0dXJuXG4gICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBOb25Eb2N1bWVudFR5cGVDaGlsZE5vZGUgPSB7XG5cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTm9uRG9jdW1lbnRUeXBlQ2hpbGROb2RlLCB7XG4gIHByZXZpb3VzRWxlbWVudFNpYmxpbmc6IHtcbiAgICBnZXQgKCkge1xuICAgICAgbGV0IG5vZGVcbiAgICAgIHdoaWxlICgobm9kZSA9IHRoaXMucHJldmlvdXNTaWJsaW5nKSkge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfSxcblxuICBuZXh0RWxlbWVudFNpYmxpbmc6IHtcbiAgICBnZXQgKCkge1xuICAgICAgbGV0IG5vZGVcbiAgICAgIHdoaWxlICgobm9kZSA9IHRoaXMubmV4dFNpYmxpbmcpKSB7XG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBub2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgTm9kZUl0ZXJhdG9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvTm9kZUl0ZXJhdG9yLmpzJ1xuaW1wb3J0IHsgTm9kZUZpbHRlciB9IGZyb20gJy4uL05vZGVGaWx0ZXIuanMnXG5cbi8vIGh0dHBzOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jaW50ZXJmYWNlLW5vbmVsZW1lbnRwYXJlbnRub2RlXG5leHBvcnQgY29uc3QgTm9uRWxlbWVudFBhcmVudE5vZGUgPSB7XG4gIGdldEVsZW1lbnRCeUlkIChpZCkge1xuICAgIGNvbnN0IGl0ZXIgPSBuZXcgTm9kZUl0ZXJhdG9yKHRoaXMsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCAobm9kZSkgPT4gaWQgPT09IG5vZGUuaWQgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUsIGZhbHNlKVxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBpdGVyKSB7XG4gICAgICByZXR1cm4gbm9kZVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJpbXBvcnQgeyBDc3NRdWVyeSB9IGZyb20gJy4uLy4uL290aGVyL0Nzc1F1ZXJ5LmpzJ1xuaW1wb3J0IHsgTm9kZUl0ZXJhdG9yIH0gZnJvbSAnLi4vLi4vdXRpbHMvTm9kZUl0ZXJhdG9yLmpzJ1xuaW1wb3J0IHsgTm9kZUZpbHRlciB9IGZyb20gJy4uL05vZGVGaWx0ZXIuanMnXG5pbXBvcnQgeyBub2Rlc1RvTm9kZSB9IGZyb20gJy4uLy4uL3V0aWxzL25vZGVzVG9Ob2RlLmpzJ1xuXG4vLyBodHRwczovL2RvbS5zcGVjLndoYXR3Zy5vcmcvI3BhcmVudG5vZGVcbmNvbnN0IFBhcmVudE5vZGUgPSB7XG4gIG1hdGNoV2l0aFNjb3BlIChxdWVyeSwgc2NvcGUpIHtcbiAgICByZXR1cm4gbmV3IENzc1F1ZXJ5KHF1ZXJ5KS5tYXRjaGVzKHRoaXMsIHNjb3BlKVxuICB9LFxuXG4gIHF1ZXJ5IChxdWVyeSwgc2NvcGUsIHNpbmdsZSA9IGZhbHNlKSB7XG5cbiAgICBjb25zdCBpdGVyID0gbmV3IE5vZGVJdGVyYXRvcihzY29wZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQsIChub2RlKSA9PiBub2RlLm1hdGNoV2l0aFNjb3BlKHF1ZXJ5LCBzY29wZSkgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUsIGZhbHNlKVxuXG4gICAgY29uc3Qgbm9kZXMgPSBbXVxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiBpdGVyKSB7XG4gICAgICBub2Rlcy5wdXNoKG5vZGUpXG4gICAgICBpZiAoc2luZ2xlKSByZXR1cm4gbm9kZXNcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXNcbiAgfSxcblxuICBxdWVyeVNlbGVjdG9yQWxsIChxdWVyeSkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5KHF1ZXJ5LCB0aGlzKVxuICB9LFxuXG4gIHF1ZXJ5U2VsZWN0b3IgKHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMucXVlcnkocXVlcnksIHRoaXMsIHRydWUpWzBdIHx8IG51bGxcbiAgfSxcblxuICBjbG9zZXN0IChxdWVyeSkge1xuICAgIGNvbnN0IGNzc1F1ZXJ5ID0gbmV3IENzc1F1ZXJ5KHF1ZXJ5KVxuICAgIGxldCBub2RlID0gdGhpc1xuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBpZiAoY3NzUXVlcnkubWF0Y2hlcyhub2RlLCB0aGlzKSkge1xuICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgfVxuICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9LFxuXG4gIHByZXBlbmQgKC4uLm5vZGVzKSB7XG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzVG9Ob2RlKG5vZGVzLCB0aGlzLm93bmVyRG9jdW1lbnQpXG5cbiAgICB0aGlzLmluc2VydEJlZm9yZShub2RlLCB0aGlzLmZpcnN0Q2hpbGQpXG4gIH0sXG5cbiAgYXBwZW5kICguLi5ub2Rlcykge1xuICAgIGNvbnN0IG5vZGUgPSBub2Rlc1RvTm9kZShub2RlcywgdGhpcy5vd25lckRvY3VtZW50KVxuICAgIHRoaXMuYXBwZW5kQ2hpbGQobm9kZSlcbiAgfSxcblxuICByZXBsYWNlQ2hpbGRyZW4gKC4uLm5vZGVzKSB7XG4gICAgd2hpbGUgKHRoaXMuZmlyc3RDaGlsZCkge1xuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIHRoaXMuYXBwZW5kKC4uLm5vZGVzKVxuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFBhcmVudE5vZGUsIHtcbiAgY2hpbGRyZW46IHtcbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2hpbGROb2Rlcy5maWx0ZXIoZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFIH0pXG4gICAgfVxuICB9LFxuICBmaXJzdEVsZW1lbnRDaGlsZDoge1xuICAgIGdldCAoKSB7XG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcy5jaGlsZE5vZGVzKSB7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH0sXG4gIGxhc3RFbGVtZW50Q2hpbGQ6IHtcbiAgICBnZXQgKCkge1xuICAgICAgZm9yIChjb25zdCBub2RlIG9mIHRoaXMuY2hpbGROb2Rlcy5zbGljZSgpLnJldmVyc2UoKSkge1xuICAgICAgICBpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9LFxuICBjaGlsZEVsZW1lbnRDb3VudDoge1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGhcbiAgICB9XG4gIH1cbn0pXG5cbmV4cG9ydCB7IFBhcmVudE5vZGUgfVxuIiwiaW1wb3J0IHsgTm9kZUZpbHRlciB9IGZyb20gJy4uL05vZGVGaWx0ZXIuanMnXG5pbXBvcnQgeyBOb2RlSXRlcmF0b3IgfSBmcm9tICcuLi8uLi91dGlscy9Ob2RlSXRlcmF0b3IuanMnXG5cbmNvbnN0IGhhc0NsYXNzID0gKG5vZGUsIG5hbWUpID0+IHtcbiAgY29uc3QgY2xhc3NMaXN0ID0gbm9kZS5jbGFzc05hbWUuc3BsaXQoL1xccysvKVxuICByZXR1cm4gY2xhc3NMaXN0LmluY2x1ZGVzKG5hbWUpXG59XG5cbmNvbnN0IGVsZW1lbnRBY2Nlc3MgPSB7XG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lIChuYW1lKSB7XG4gICAgLy8gY29uc3QgZG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnRcbiAgICBjb25zdCBpdGVyID0gbmV3IE5vZGVJdGVyYXRvcih0aGlzLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCwgKG5vZGUpID0+IG5vZGUubm9kZU5hbWUgPT09IG5hbWUgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUsIGZhbHNlKVxuICAgIC8vIGNvbnN0IGl0ZXIgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3IodGhpcywgMSwgKG5vZGUpID0+IG5vZGUubm9kZU5hbWUgPT09IG5hbWUgPyBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQgOiBOb2RlRmlsdGVyLkZJTFRFUl9JR05PUkUpXG4gICAgcmV0dXJuIFsgLi4uaXRlciBdXG4gIH0sXG5cbiAgZ2V0RWxlbWVudHNCeVRhZ05hbWVOUyAobnMsIG5hbWUpIHtcbiAgICAvLyBjb25zdCBkb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudFxuICAgIGNvbnN0IGl0ZXIgPSBuZXcgTm9kZUl0ZXJhdG9yKHRoaXMsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5ULCAobm9kZSkgPT4gbm9kZS5pc05hbWVzcGFjZShucykgJiYgbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSwgZmFsc2UpXG4gICAgLy8gY29uc3QgaXRlciA9IGRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcih0aGlzLCAxLCAobm9kZSkgPT4gbm9kZS5pc05hbWVzcGFjZShucykgJiYgbm9kZS5ub2RlTmFtZSA9PT0gbmFtZSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSlcbiAgICByZXR1cm4gWyAuLi5pdGVyIF1cbiAgfSxcblxuICBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIChuYW1lKSB7XG4gICAgLy8gY29uc3QgZG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnRcbiAgICBjb25zdCBpdGVyID0gbmV3IE5vZGVJdGVyYXRvcih0aGlzLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCwgKG5vZGUpID0+IGhhc0NsYXNzKG5vZGUsIG5hbWUpID8gTm9kZUZpbHRlci5GSUxURVJfQUNDRVBUIDogTm9kZUZpbHRlci5GSUxURVJfSUdOT1JFLCBmYWxzZSlcbiAgICAvLyBjb25zdCBpdGVyID0gZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKHRoaXMsIDEsIChub2RlKSA9PiBoYXNDbGFzcyhub2RlLCBuYW1lKSA/IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCA6IE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRSlcbiAgICByZXR1cm4gWyAuLi5pdGVyIF1cbiAgfVxufVxuXG5leHBvcnQgeyBlbGVtZW50QWNjZXNzIH1cbiIsIi8vIEB0cy1jaGVja1xuaW1wb3J0IHsgU1ZHTGVuZ3RoIH0gZnJvbSAnLi9TVkdMZW5ndGguanMnXG5cbmV4cG9ydCBjbGFzcyBTVkdBbmltYXRlZExlbmd0aCB7XG4gIGJhc2VWYWxcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgdGhpcy5iYXNlVmFsID0gbmV3IFNWR0xlbmd0aChlbGVtZW50LCBhdHRyaWJ1dGVOYW1lKVxuICB9XG5cbiAgZ2V0IGFuaW1WYWwoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhbmltVmFsIGlzIG5vdCBpbXBsZW1lbnRlZCcpXG4gIH1cbn1cbiIsIi8vIEB0cy1jaGVja1xuaW1wb3J0IHsgU1ZHQW5pbWF0ZWRMZW5ndGggfSBmcm9tICcuL1NWR0FuaW1hdGVkTGVuZ3RoLmpzJ1xuaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9TVkdHcmFwaGljc0VsZW1lbnQuanMnXG5cbmV4cG9ydCBjbGFzcyBTVkdDaXJjbGVFbGVtZW50IGV4dGVuZHMgU1ZHR3JhcGhpY3NFbGVtZW50IHtcbiAgY3ggPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ2N4JylcbiAgY3kgPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ2N5JylcbiAgciA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAncicpXG59XG4iLCJpbXBvcnQgeyBFbGVtZW50IH0gZnJvbSAnLi4vRWxlbWVudC5qcydcbmV4cG9ydCBjbGFzcyBTVkdFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGdldCBvd25lclNWR0VsZW1lbnQgKCkge1xuICAgIGxldCBwYXJlbnQgPSB0aGlzXG4gICAgd2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSkpIHtcbiAgICAgIGlmICgnc3ZnJyA9PSBwYXJlbnQubm9kZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZ2V0IHZpZXdwb3J0RWxlbWVudCAoKSB7XG4gICAgbGV0IHBhcmVudCA9IHRoaXNcbiAgICB3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlKSkge1xuICAgICAgLy8gVE9ETzogYW5kIG90aGVyc1xuICAgICAgaWYgKFsgJ3N2ZycsICdzeW1ib2wnIF0uaW5jbHVkZXMocGFyZW50Lm5vZGVOYW1lKSkge1xuICAgICAgICByZXR1cm4gcGFyZW50XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiIsIi8vIEB0cy1jaGVja1xuaW1wb3J0IHsgU1ZHQW5pbWF0ZWRMZW5ndGggfSBmcm9tICcuL1NWR0FuaW1hdGVkTGVuZ3RoLmpzJ1xuaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9TVkdHcmFwaGljc0VsZW1lbnQuanMnXG5cbmV4cG9ydCBjbGFzcyBTVkdFbGxpcHNlRWxlbWVudCBleHRlbmRzIFNWR0dyYXBoaWNzRWxlbWVudCB7XG4gIGN4ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICdjeCcpXG4gIGN5ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICdjeScpXG4gIHJ4ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICdyeCcpXG4gIHJ5ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICdyeScpXG59XG4iLCIvLyBAdHMtY2hlY2tcblxuaW1wb3J0IHsgU1ZHQW5pbWF0ZWRMZW5ndGggfSBmcm9tICcuL1NWR0FuaW1hdGVkTGVuZ3RoLmpzJ1xuaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9TVkdHcmFwaGljc0VsZW1lbnQuanMnXG5cbmV4cG9ydCBjbGFzcyBTVkdGb3JlaWduT2JqZWN0RWxlbWVudCBleHRlbmRzIFNWR0dyYXBoaWNzRWxlbWVudCB7XG4gIHggPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3gnKVxuICB5ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICd5JylcbiAgd2lkdGggPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3dpZHRoJylcbiAgaGVpZ2h0ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICdoZWlnaHQnKVxufVxuIiwiaW1wb3J0IHsgU1ZHRWxlbWVudCB9IGZyb20gJy4vU1ZHRWxlbWVudC5qcydcbmltcG9ydCB7IGdldFNlZ21lbnRzIH0gZnJvbSAnLi4vLi4vdXRpbHMvYmJveFV0aWxzLmpzJ1xuaW1wb3J0ICogYXMgcmVnZXggZnJvbSAnLi4vLi4vdXRpbHMvcmVnZXguanMnXG5pbXBvcnQgeyBTVkdNYXRyaXggfSBmcm9tICcuL1NWR01hdHJpeC5qcydcblxuLy8gTWFwIG1hdHJpeCBhcnJheSB0byBvYmplY3RcbmZ1bmN0aW9uIGFycmF5VG9NYXRyaXggKGEpIHtcbiAgcmV0dXJuIHsgYTogYVswXSwgYjogYVsxXSwgYzogYVsyXSwgZDogYVszXSwgZTogYVs0XSwgZjogYVs1XSB9XG59XG5cbmV4cG9ydCBjbGFzcyBTVkdHcmFwaGljc0VsZW1lbnQgZXh0ZW5kcyBTVkdFbGVtZW50IHtcbiAgLy8gVE9ETzogaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRzIvY29vcmRzLmh0bWwjQ29tcHV0aW5nQVZpZXdwb3J0c1RyYW5zZm9ybVxuICBnZW5lcmF0ZVZpZXdCb3hNYXRyaXggKCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvdmlld0JveFxuICAgIGlmICghWyAnbWFya2VyJywgJ3N5bWJvbCcsICdwYXR0ZXJuJywgJ3N2ZycsICd2aWV3JyBdLmluY2x1ZGVzKHRoaXMubm9kZU5hbWUpKSB7XG4gICAgICByZXR1cm4gbmV3IFNWR01hdHJpeCgpXG4gICAgfVxuXG4gICAgbGV0IHZpZXcgPSAodGhpcy5nZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnKSB8fCAnJykuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5tYXAocGFyc2VGbG9hdCkuZmlsdGVyKGVsID0+ICFpc05hTihlbCkpXG4gICAgY29uc3Qgd2lkdGggPSBwYXJzZUZsb2F0KHRoaXMuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKSB8fCAwXG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpIHx8IDBcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdCh0aGlzLmdldEF0dHJpYnV0ZSgneCcpKSB8fCAwXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQodGhpcy5nZXRBdHRyaWJ1dGUoJ3knKSkgfHwgMFxuXG4gICAgLy8gVE9ETzogSWYgbm8gd2lkdGggYW5kIGhlaWdodCBpcyBnaXZlbiwgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgb3V0ZXIgc3ZnIGVsZW1lbnQgaXMgdXNlZFxuICAgIGlmICghd2lkdGggfHwgIWhlaWdodCkge1xuICAgICAgcmV0dXJuIG5ldyBTVkdNYXRyaXgoKS50cmFuc2xhdGUoeCwgeSlcbiAgICB9XG5cbiAgICBpZiAodmlldy5sZW5ndGggIT09IDQpIHtcbiAgICAgIHZpZXcgPSBbIDAsIDAsIHdpZHRoLCBoZWlnaHQgXVxuICAgIH1cblxuICAgIC8vIGZpcnN0IGFwcGx5IHggYW5kIHkgaWYgbmVzdGVkLCB0aGVuIHZpZXdib3ggc2NhbGUsIHRoZW4gdmlld0JveCBtb3ZlXG4gICAgcmV0dXJuIG5ldyBTVkdNYXRyaXgoKS50cmFuc2xhdGUoeCwgeSkuc2NhbGUod2lkdGggLyB2aWV3WzJdLCBoZWlnaHQgLyB2aWV3WzNdKS50cmFuc2xhdGUoLXZpZXdbMF0sIC12aWV3WzFdKVxuICB9XG5cbiAgZ2V0QkJveCAoKSB7XG4gICAgcmV0dXJuIGdldFNlZ21lbnRzKHRoaXMpLmJib3goKVxuICB9XG5cbiAgLy8gVE9ETzogVGhpcyBtZXRob2QgYWN0dWFsbHkgZXhpc3RzIG9uIGFsbCBFbGVtZW50c1xuICBnZXRCb3VuZGluZ0NsaWVudFJlY3QgKCkge1xuICAgIC8vIFRoZSBib3VuZGluZyBjbGllbnQgcmVjdCB0YWtlcyB0aGUgc2NyZWVuIGN0bSBvZiB0aGUgZWxlbWVudFxuICAgIC8vIGFuZCBjb252ZXJ0cyB0aGUgYm91bmRpbmcgYm94IHdpdGggaXRcblxuICAgIC8vIGhvd2V2ZXIsIG5vcm1hbCBib3VuZGluZyBjb25zaXN0cyBvZjpcbiAgICAvLyAtIGFsbCBjaGlsZHJlbiB0cmFuc2Zvcm1lZFxuICAgIC8vIC0gdGhlIHZpZXdib3ggb2YgdGhlIGVsZW1lbnQgaWYgYXZhaWxhYmxlXG5cbiAgICAvLyBUaGUgYm91bmRpbmdDbGllbnRSZWN0IGlzIG5vdCBhZmZlY3RlZCBieSBpdHMgb3duIHZpZXdib3hcbiAgICAvLyBTbyB3ZSBhcHBseSBvbmx5IG91ciBvd24gdHJhbnNmb3JtYXRpb25zIGFuZCBwYXJlbnRzIHNjcmVlbkNUTVxuXG4gICAgbGV0IG0gPSB0aGlzLm1hdHJpeGlmeSgpXG5cbiAgICBpZiAodGhpcy5wYXJlbnROb2RlICYmIHRoaXMucGFyZW50Tm9kZS5ub2RlTmFtZSAhPT0gJyNkb2N1bWVudCcpIHtcbiAgICAgIG0gPSB0aGlzLnBhcmVudE5vZGUuZ2V0U2NyZWVuQ1RNKCkubXVsdGlwbHkobSlcbiAgICB9XG5cbiAgICAvLyBsZXQgbSA9IHRoaXMuZ2V0U2NyZWVuQ1RNKClcblxuICAgIC8vIFRoZXJlIGFyZSBhIGZldyBleHRyYSBydWxlcyByZWdhcmRpbmcgcmJveCBhbmQgdGhlIDxzdmc+IGVsZW1lbnRcbiAgICAvLyBOYW1lbHkgdGhpcyBpczpcbiAgICAvLyBCQm94IGlzIGNhbGN1bGF0ZWQgYXMgbm9ybWFsIGZvciBjb250YWluZXIgZWxlbWVudHNcbiAgICAvLyBSYm94IGlzIGNhbGN1bGF0ZWQgd2l0aCB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgPHN2Zz5cbiAgICAvLyBUaGlzIGNvdWxkIGJlIGFsc28gdHJ1ZSBmb3Igc3ltYm9scyBzbyB0aGlzIGlzIGE6XG4gICAgLy8gVG9kbzogLi4uXG4gICAgcmV0dXJuIGdldFNlZ21lbnRzKHRoaXMsIGZhbHNlLCB0cnVlKS50cmFuc2Zvcm0obSkuYmJveCgpXG4gIH1cblxuICBnZXRDVE0gKCkge1xuICAgIGxldCBtID0gdGhpcy5tYXRyaXhpZnkoKVxuXG4gICAgbGV0IG5vZGUgPSB0aGlzXG4gICAgd2hpbGUgKChub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xuICAgICAgaWYgKFsgJ3N2ZycsICdzeW1ib2wnLCAnaW1hZ2UnLCAncGF0dGVybicsICdtYXJrZXInIF0uaW5kZXhPZihub2RlLm5vZGVOYW1lKSA+IC0xKSBicmVha1xuICAgICAgbSA9IG0ubXVsdGlwbHkobm9kZS5tYXRyaXhpZnkoKSlcbiAgICAgIGlmIChub2RlLm5vZGVOYW1lID09PSAnI2RvY3VtZW50JykgcmV0dXJuIHRoaXMuZ2V0U2NyZWVuQ1RNKClcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZS5nZW5lcmF0ZVZpZXdCb3hNYXRyaXgoKS5tdWx0aXBseShtKVxuICB9XG5cbiAgZ2V0SW5uZXJNYXRyaXggKCkge1xuICAgIGxldCBtID0gdGhpcy5tYXRyaXhpZnkoKVxuXG4gICAgaWYgKFsgJ3N2ZycsICdzeW1ib2wnLCAnaW1hZ2UnLCAncGF0dGVybicsICdtYXJrZXInIF0uaW5kZXhPZih0aGlzLm5vZGVOYW1lKSA+IC0xKSB7XG4gICAgICBtID0gdGhpcy5nZW5lcmF0ZVZpZXdCb3hNYXRyaXgoKS5tdWx0aXBseShtKVxuICAgIH1cbiAgICByZXR1cm4gbVxuICB9XG5cbiAgZ2V0U2NyZWVuQ1RNICgpIHtcbiAgICAvLyByZWY6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEzNDQ1MzdcbiAgICAvLyBXZSBmb2xsb3cgQ2hyb21lcyBiZWhhdmlvciBhbmQgaW5jbHVkZSB0aGUgdmlld2JveCBpbiB0aGUgc2NyZWVuQ1RNXG4gICAgY29uc3QgbSA9IHRoaXMuZ2V0SW5uZXJNYXRyaXgoKVxuXG4gICAgLy8gVE9ETzogV2UgaGF2ZSB0byBsb29wIHVudGlsIGRvY3VtZW50LCBob3dldmVyIGh0bWwgZWxlbWVudHMgZG9udCBoYXZlIGdldFNjcmVlbkNUTSBpbXBsZW1lbnRlZFxuICAgIC8vIHRoZXkgYWxzbyBkb250IGhhdmUgYSB0cmFuc2Zvcm0gYXR0cmlidXRlLiBUaGVyZWZvcmUgd2UgbmVlZCBhIGRpZmZlcmVudCB3YXkgb2YgZmlndXJpbmcgb3V0IHRoZWlyIChjc3MpIHRyYW5zZm9ybVxuICAgIGlmICh0aGlzLnBhcmVudE5vZGUgJiYgdGhpcy5wYXJlbnROb2RlIGluc3RhbmNlb2YgU1ZHR3JhcGhpY3NFbGVtZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnROb2RlLmdldFNjcmVlbkNUTSgpLm11bHRpcGx5KG0pXG4gICAgfVxuXG4gICAgcmV0dXJuIG1cbiAgfVxuXG4gIG1hdHJpeGlmeSAoKSB7XG4gICAgY29uc3QgbWF0cml4ID0gKHRoaXMuZ2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nKSB8fCAnJykudHJpbSgpXG4gICAgICAvLyBzcGxpdCB0cmFuc2Zvcm1hdGlvbnNcbiAgICAgIC5zcGxpdChyZWdleC50cmFuc2Zvcm1zKS5zbGljZSgwLCAtMSkubWFwKGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgLy8gZ2VuZXJhdGUga2V5ID0+IHZhbHVlIHBhaXJzXG4gICAgICAgIGNvbnN0IGt2ID0gc3RyLnRyaW0oKS5zcGxpdCgnKCcpXG4gICAgICAgIHJldHVybiBbIGt2WzBdLnRyaW0oKSwga3ZbMV0uc3BsaXQocmVnZXguZGVsaW1pdGVyKS5tYXAoZnVuY3Rpb24gKHN0cikgeyByZXR1cm4gcGFyc2VGbG9hdChzdHIudHJpbSgpKSB9KSBdXG4gICAgICB9KVxuICAgICAgLy8gbWVyZ2UgZXZlcnkgdHJhbnNmb3JtYXRpb24gaW50byBvbmUgbWF0cml4XG4gICAgICAucmVkdWNlKGZ1bmN0aW9uIChtYXRyaXgsIHRyYW5zZm9ybSkge1xuXG4gICAgICAgIGlmICh0cmFuc2Zvcm1bMF0gPT09ICdtYXRyaXgnKSByZXR1cm4gbWF0cml4Lm11bHRpcGx5KGFycmF5VG9NYXRyaXgodHJhbnNmb3JtWzFdKSlcbiAgICAgICAgcmV0dXJuIG1hdHJpeFt0cmFuc2Zvcm1bMF1dLmFwcGx5KG1hdHJpeCwgdHJhbnNmb3JtWzFdKVxuXG4gICAgICB9LCBuZXcgU1ZHTWF0cml4KCkpXG5cbiAgICByZXR1cm4gbWF0cml4XG4gIH1cblxuICBnZXQgdHJhbnNmb3JtICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgU1ZHQW5pbWF0ZWRMZW5ndGggfSBmcm9tICcuL1NWR0FuaW1hdGVkTGVuZ3RoLmpzJ1xuaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9TVkdHcmFwaGljc0VsZW1lbnQuanMnXG5cbmV4cG9ydCBjbGFzcyBTVkdJbWFnZUVsZW1lbnQgZXh0ZW5kcyBTVkdHcmFwaGljc0VsZW1lbnQge1xuICB4ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICd4JylcbiAgeSA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAneScpXG4gIHdpZHRoID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICd3aWR0aCcpXG4gIGhlaWdodCA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAnaGVpZ2h0Jylcbn1cbiIsIi8vIEB0cy1jaGVja1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgZXh0ZW5kU3RhdGljIH0gZnJvbSAnLi4vLi4vdXRpbHMvb2JqZWN0Q3JlYXRpb25VdGlscy5qcydcblxuY29uc3QgdW5pdFR5cGVzID0ge1xuICBTVkdfTEVOR1RIVFlQRV9VTktOT1dOOiAwLFxuICBTVkdfTEVOR1RIVFlQRV9OVU1CRVI6IDEsXG4gIFNWR19MRU5HVEhUWVBFX1BFUkNFTlRBR0U6IDIsXG4gIFNWR19MRU5HVEhUWVBFX0VNUzogMyxcbiAgU1ZHX0xFTkdUSFRZUEVfRVhTOiA0LFxuICBTVkdfTEVOR1RIVFlQRV9QWDogNSxcbiAgU1ZHX0xFTkdUSFRZUEVfQ006IDYsXG4gIFNWR19MRU5HVEhUWVBFX01NOiA3LFxuICBTVkdfTEVOR1RIVFlQRV9JTjogOCxcbiAgU1ZHX0xFTkdUSFRZUEVfUFQ6IDksXG4gIFNWR19MRU5HVEhUWVBFX1BDOiAxMCxcbn1cblxuY29uc3QgdW5pdEJ5U3RyaW5nID0ge1xuICBbJyddOiB1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfTlVNQkVSLFxuICBbJyUnXTogdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX1BFUkNFTlRBR0UsXG4gIFsnZW0nXTogdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX0VNUyxcbiAgWydleCddOiB1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfRVhTLFxuICBbJ3B4J106IHVuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9QWCxcbiAgWydjbSddOiB1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfQ00sXG4gIFsnbW0nXTogdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX01NLFxuICBbJ2luJ106IHVuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9JTixcbiAgWydwdCddOiB1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfUFQsXG4gIFsncGMnXTogdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX1BDLFxufVxuXG5jb25zdCB1bml0U3RyaW5nQnlDb25zdGFudCA9IG5ldyBNYXAoXG4gIE9iamVjdC5lbnRyaWVzKHVuaXRCeVN0cmluZykubWFwKChbdW5pdFN0cmluZywgdW5pdENvbnN0YW50XSkgPT4gW1xuICAgIHVuaXRDb25zdGFudCxcbiAgICB1bml0U3RyaW5nLFxuICBdKVxuKVxuXG5jb25zdCB1bml0RmFjdG9ycyA9IG5ldyBNYXAoW1xuICBbdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX05VTUJFUiwgMV0sXG4gIFt1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfUEVSQ0VOVEFHRSwgTmFOXSxcbiAgW3VuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9FTVMsIE5hTl0sXG4gIFt1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfRVhTLCBOYU5dLFxuICBbdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX1BYLCAxXSxcbiAgW3VuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9DTSwgNl0sXG4gIFt1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfTU0sIDk2IC8gMjUuNF0sXG4gIFt1bml0VHlwZXMuU1ZHX0xFTkdUSFRZUEVfSU4sIDk2XSxcbiAgW3VuaXRUeXBlcy5TVkdfTEVOR1RIVFlQRV9QVCwgNCAvIDNdLFxuICBbdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX1BDLCAxNl0sXG5dKVxuXG5jb25zdCB2YWx1ZVBhdHRlcm4gPSAvXlxccyooWystXT9bMC05XSpbLl0/WzAtOV0rKD86ZVsrLV0/WzAtOV0rKT8pKGVtfGV4fHB4fGlufGNtfG1tfHB0fHBjfCUpP1xccyokL2k7XG5cbmV4cG9ydCBjbGFzcyBTVkdMZW5ndGgge1xuICBlbGVtZW50XG4gIGF0dHJpYnV0ZU5hbWVcblxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVOYW1lXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBhdHRyaWJ1dGVOYW1lKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxuICAgIHRoaXMuYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZU5hbWVcbiAgfVxuXG4gIGdldCB1bml0VHlwZSgpIHtcbiAgICByZXR1cm4gcGFyc2VWYWx1ZSh0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKHRoaXMuYXR0cmlidXRlTmFtZSkpWzFdXG4gIH1cblxuICBnZXQgdmFsdWUoKSB7XG4gICAgY29uc3QgW3ZhbHVlLCB1bml0XSA9IHBhcnNlVmFsdWUoXG4gICAgICB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKHRoaXMuYXR0cmlidXRlTmFtZSlcbiAgICApXG4gICAgcmV0dXJuIHZhbHVlICogZ2V0VW5pdEZhY3Rvcih1bml0KVxuICB9XG5cbiAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgY29uc3QgdW5pdEZhY3RvciA9IGdldFVuaXRGYWN0b3IodGhpcy51bml0VHlwZSlcbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFxuICAgICAgdGhpcy5hdHRyaWJ1dGVOYW1lLFxuICAgICAgdmFsdWUgLyB1bml0RmFjdG9yICsgdW5pdFN0cmluZyh0aGlzKVxuICAgIClcbiAgfVxuXG4gIGdldCB2YWx1ZUluU3BlY2lmaWVkVW5pdHMoKSB7XG4gICAgcmV0dXJuIHBhcnNlVmFsdWUodGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSh0aGlzLmF0dHJpYnV0ZU5hbWUpKVswXVxuICB9XG5cbiAgc2V0IHZhbHVlSW5TcGVjaWZpZWRVbml0cyh2YWx1ZSkge1xuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUodGhpcy5hdHRyaWJ1dGVOYW1lLCB2YWx1ZSArIHVuaXRTdHJpbmcodGhpcykpXG4gIH1cblxuICBnZXQgdmFsdWVBc1N0cmluZygpIHtcbiAgICAvLyBEbyBub3Qgc2ltcGx5IHVzZSBnZXRBdHRyaWJ1dGUoKSBhcyB0aGlzIGZ1bmN0aW9uIGhhcyB0byByZXR1cm4gYSBzdHJpbmdcbiAgICAvLyB0aGF0IGlzIGEgdmFsaWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIHVzZWQgdmFsdWUuXG4gICAgcmV0dXJuIHRoaXMudmFsdWVJblNwZWNpZmllZFVuaXRzICsgdW5pdFN0cmluZyh0aGlzKVxuICB9XG5cbiAgc2V0IHZhbHVlQXNTdHJpbmcodmFsdWVTdHJpbmcpIHtcbiAgICBjb25zdCBbdmFsdWUsIHVuaXRdID0gcGFyc2VWYWx1ZSh2YWx1ZVN0cmluZywgZmFsc2UpXG4gICAgY29uc3QgdW5pdFN0cmluZyA9IHVuaXRTdHJpbmdCeUNvbnN0YW50LmdldCh1bml0KSB8fCAnJ1xuICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUodGhpcy5hdHRyaWJ1dGVOYW1lLCB2YWx1ZSArIHVuaXRTdHJpbmcpXG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ3xudWxsfSB2YWx1ZVN0cmluZ1xuICogQHBhcmFtIHtib29sZWFufSBmYWxsYmFjayAgSWYgc2V0IHRvIGBmYWxzZWAgY2F1c2VzIGFuIGVycm9yIHRvIGJlIHRocm93biBpZlxuICogYHZhbHVlU3RyaW5nYCBjYW4gbm90IGJlIHBhcnNlZCBwcm9wZXJseS4gT3RoZXJ3aXNlIHRoZSByZXR1cm5lZCB2YWx1ZSBmYWxsc1xuICogYmFjayB0byAwIGFuZCB0aGUgdW5pdCBmYWxscyBiYWNrIHRvIGBTVkdfTEVOR1RIVFlQRV9OVU1CRVJgLlxuICogQHJldHVybiB7W251bWJlciwgbnVtYmVyXX0gIFZhbHVlIGFuZCB1bml0LiBGb3IgdW5rbm93biB1bml0cywgaWYgdGhlXG4gKiBhdHRyaWJ1dGUgaXMgbm90IG9mIHRoZSBjb3JyZWN0IGZvcm1hdCBvciBpZiB0aGUgYXR0cmlidXRlIGlzIG5vdCBwcmVzZW50IG9uXG4gKiB0aGUgZWxlbWVudCwgdmFsdWUgMCBhbmQgdW5pdCBTVkdfTEVOR1RIVFlQRV9OVU1CRVIgYXJlIHJldHVybmVkLlxuICovXG5mdW5jdGlvbiBwYXJzZVZhbHVlKHZhbHVlU3RyaW5nLCBmYWxsYmFjayA9IHRydWUpIHtcbiAgY29uc3QgWywgcmF3VmFsdWUsIHJhd1VuaXRdID0gKHZhbHVlU3RyaW5nIHx8ICcnKS5tYXRjaCh2YWx1ZVBhdHRlcm4pIHx8IFtdXG4gIGNvbnN0IHVuaXQgPSB1bml0QnlTdHJpbmdbKHJhd1VuaXQgfHwgJycpLnRvTG93ZXJDYXNlKCldXG4gIGlmIChyYXdWYWx1ZSAhPT0gdW5kZWZpbmVkICYmIHVuaXQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBbcGFyc2VGbG9hdChyYXdWYWx1ZSksIHVuaXRdXG4gIH1cbiAgaWYgKGZhbGxiYWNrKSB7XG4gICAgLy8gRm9yIHVua25vd24gdW5pdHMgb3IgdW5wYXJzYWJsZSBhdHRyaWJ1dGVzLCBicm93c2VycyBmYWxsIGJhY2sgdG8gdmFsdWUgMFxuICAgIHJldHVybiBbMCwgdW5pdFR5cGVzLlNWR19MRU5HVEhUWVBFX05VTUJFUl1cbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ0FuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZCcpXG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IHVuaXQgIFVuaXQgY29uc3RhbnRcbiAqL1xuZnVuY3Rpb24gZ2V0VW5pdEZhY3Rvcih1bml0KSB7XG4gIGNvbnN0IHVuaXRGYWN0b3IgPSB1bml0RmFjdG9ycy5nZXQodW5pdClcbiAgaWYgKHVuaXRGYWN0b3IgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcih1bml0RmFjdG9yICsgJyBpcyBub3QgYSBrbm93biB1bml0IGNvbnN0YW50JylcbiAgfVxuICBpZiAoaXNOYU4odW5pdEZhY3RvcikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuaXQgJHt1bml0U3RyaW5nQnlDb25zdGFudC5nZXQodW5pdCl9IGlzIG5vdCBzdXBwb3J0ZWRgKVxuICB9XG4gIHJldHVybiB1bml0RmFjdG9yXG59XG5cbi8qKlxuICogQHBhcmFtIHtTVkdMZW5ndGh9IHN2Z0xlbmd0aFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB1bml0U3RyaW5nKHN2Z0xlbmd0aCkge1xuICByZXR1cm4gdW5pdFN0cmluZ0J5Q29uc3RhbnQuZ2V0KHN2Z0xlbmd0aC51bml0VHlwZSkgfHwgJydcbn1cblxuZXh0ZW5kU3RhdGljKFNWR0xlbmd0aCwgdW5pdFR5cGVzKVxuIiwiLy8gQHRzLWNoZWNrXG5pbXBvcnQgeyBTVkdBbmltYXRlZExlbmd0aCB9IGZyb20gJy4vU1ZHQW5pbWF0ZWRMZW5ndGguanMnXG5pbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcblxuZXhwb3J0IGNsYXNzIFNWR0xpbmVFbGVtZW50IGV4dGVuZHMgU1ZHR3JhcGhpY3NFbGVtZW50IHtcbiAgeDEgPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3gxJylcbiAgeTEgPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3kxJylcbiAgeDIgPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3gyJylcbiAgeTIgPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3kyJylcbn1cbiIsImNvbnN0IHJhZGlhbnMgPSBmdW5jdGlvbiAoZCkge1xuICByZXR1cm4gZCAlIDM2MCAqIE1hdGguUEkgLyAxODBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hdHJpeEZhY3RvcnkgKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFyIHIgPSBuZXcgU1ZHTWF0cml4KClcbiAgci5hID0gYVxuICByLmIgPSBiXG4gIHIuYyA9IGNcbiAgci5kID0gZFxuICByLmUgPSBlXG4gIHIuZiA9IGZcbiAgcmV0dXJuIHJcbn1cblxuZXhwb3J0IGNsYXNzIFNWR01hdHJpeCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmEgPSB0aGlzLmQgPSAxXG4gICAgdGhpcy5iID0gdGhpcy5jID0gdGhpcy5lID0gdGhpcy5mID0gMFxuICB9XG5cbiAgaW52ZXJzZSAoKSB7XG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHBhcmFtZXRlcnMgb3V0IG9mIHRoZSBtYXRyaXhcbiAgICB2YXIgYSA9IHRoaXMuYVxuICAgIHZhciBiID0gdGhpcy5iXG4gICAgdmFyIGMgPSB0aGlzLmNcbiAgICB2YXIgZCA9IHRoaXMuZFxuICAgIHZhciBlID0gdGhpcy5lXG4gICAgdmFyIGYgPSB0aGlzLmZcblxuICAgIC8vIEludmVydCB0aGUgMngyIG1hdHJpeCBpbiB0aGUgdG9wIGxlZnRcbiAgICB2YXIgZGV0ID0gYSAqIGQgLSBiICogY1xuICAgIGlmICghZGV0KSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnZlcnQgJyArIHRoaXMpXG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIHRvcCAyeDIgbWF0cml4XG4gICAgdmFyIG5hID0gZCAvIGRldFxuICAgIHZhciBuYiA9IC1iIC8gZGV0XG4gICAgdmFyIG5jID0gLWMgLyBkZXRcbiAgICB2YXIgbmQgPSBhIC8gZGV0XG5cbiAgICAvLyBBcHBseSB0aGUgaW52ZXJ0ZWQgbWF0cml4IHRvIHRoZSB0b3AgcmlnaHRcbiAgICB2YXIgbmUgPSAtKG5hICogZSArIG5jICogZilcbiAgICB2YXIgbmYgPSAtKG5iICogZSArIG5kICogZilcblxuICAgIC8vIENvbnN0cnVjdCB0aGUgaW52ZXJ0ZWQgbWF0cml4XG4gICAgdGhpcy5hID0gbmFcbiAgICB0aGlzLmIgPSBuYlxuICAgIHRoaXMuYyA9IG5jXG4gICAgdGhpcy5kID0gbmRcbiAgICB0aGlzLmUgPSBuZVxuICAgIHRoaXMuZiA9IG5mXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgbXVsdGlwbHkgKG0pIHtcbiAgICB2YXIgciA9IG5ldyBTVkdNYXRyaXgoKVxuICAgIHIuYSA9IHRoaXMuYSAqIG0uYSArIHRoaXMuYyAqIG0uYiArIHRoaXMuZSAqIDBcbiAgICByLmIgPSB0aGlzLmIgKiBtLmEgKyB0aGlzLmQgKiBtLmIgKyB0aGlzLmYgKiAwXG4gICAgci5jID0gdGhpcy5hICogbS5jICsgdGhpcy5jICogbS5kICsgdGhpcy5lICogMFxuICAgIHIuZCA9IHRoaXMuYiAqIG0uYyArIHRoaXMuZCAqIG0uZCArIHRoaXMuZiAqIDBcbiAgICByLmUgPSB0aGlzLmEgKiBtLmUgKyB0aGlzLmMgKiBtLmYgKyB0aGlzLmUgKiAxXG4gICAgci5mID0gdGhpcy5iICogbS5lICsgdGhpcy5kICogbS5mICsgdGhpcy5mICogMVxuICAgIHJldHVybiByXG4gIH1cblxuICByb3RhdGUgKHIsIHgsIHkpIHtcbiAgICByID0gciAlIDM2MCAqIE1hdGguUEkgLyAxODBcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBseShtYXRyaXhGYWN0b3J5KFxuICAgICAgTWF0aC5jb3MociksXG4gICAgICBNYXRoLnNpbihyKSxcbiAgICAgIC1NYXRoLnNpbihyKSxcbiAgICAgIE1hdGguY29zKHIpLFxuICAgICAgeCA/IC1NYXRoLmNvcyhyKSAqIHggKyBNYXRoLnNpbihyKSAqIHkgKyB4IDogMCxcbiAgICAgIHkgPyAtTWF0aC5zaW4ocikgKiB4IC0gTWF0aC5jb3MocikgKiB5ICsgeSA6IDBcbiAgICApKVxuICB9XG5cbiAgc2NhbGUgKHNjYWxlWCwgc2NhbGVZID0gc2NhbGVYKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkobWF0cml4RmFjdG9yeShzY2FsZVgsIDAsIDAsIHNjYWxlWSwgMCwgMCkpXG4gIH1cblxuICBza2V3ICh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkobWF0cml4RmFjdG9yeSgxLCBNYXRoLnRhbihyYWRpYW5zKHkpKSwgTWF0aC50YW4ocmFkaWFucyh4KSksIDEsIDAsIDApKVxuICB9XG5cbiAgc2tld1ggKHgpIHtcbiAgICByZXR1cm4gdGhpcy5za2V3KHgsIDApXG4gIH1cblxuICBza2V3WSAoeSkge1xuICAgIHJldHVybiB0aGlzLnNrZXcoMCwgeSlcbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gJ1NWR01hdHJpeCdcbiAgfVxuXG4gIHRyYW5zbGF0ZSAoeCA9IDAsIHkgPSAwKSB7XG4gICAgcmV0dXJuIHRoaXMubXVsdGlwbHkobWF0cml4RmFjdG9yeSgxLCAwLCAwLCAxLCB4LCB5KSlcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBTVkdHcmFwaGljc0VsZW1lbnQgfSBmcm9tICcuL1NWR0dyYXBoaWNzRWxlbWVudC5qcydcbmltcG9ydCAqIGFzIHBhdGhVdGlscyBmcm9tICcuLi8uLi91dGlscy9wYXRoVXRpbHMuanMnXG5cbmV4cG9ydCBjbGFzcyBTVkdQYXRoRWxlbWVudCBleHRlbmRzIFNWR0dyYXBoaWNzRWxlbWVudCB7XG4gIGdldFBvaW50QXRMZW5ndGggKGxlbikge1xuICAgIHJldHVybiBwYXRoVXRpbHMucG9pbnRBdExlbmd0aCh0aGlzLmdldEF0dHJpYnV0ZSgnZCcpLCBsZW4pXG4gIH1cblxuICBnZXRUb3RhbExlbmd0aCAoKSB7XG4gICAgcmV0dXJuIHBhdGhVdGlscy5sZW5ndGgodGhpcy5nZXRBdHRyaWJ1dGUoJ2QnKSlcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFNWR1BvaW50IHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMueCA9IDBcbiAgICB0aGlzLnkgPSAwXG4gIH1cblxuICBtYXRyaXhUcmFuc2Zvcm0gKG0pIHtcbiAgICB2YXIgciA9IG5ldyBTVkdQb2ludCgpXG4gICAgci54ID0gbS5hICogdGhpcy54ICsgbS5jICogdGhpcy55ICsgbS5lICogMVxuICAgIHIueSA9IG0uYiAqIHRoaXMueCArIG0uZCAqIHRoaXMueSArIG0uZiAqIDFcbiAgICByZXR1cm4gclxuICB9XG59XG4iLCIvLyBAdHMtY2hlY2tcbmltcG9ydCB7IFNWR0dyYXBoaWNzRWxlbWVudCB9IGZyb20gJy4vU1ZHR3JhcGhpY3NFbGVtZW50LmpzJ1xuaW1wb3J0IHsgU1ZHQW5pbWF0ZWRMZW5ndGggfSBmcm9tICcuL1NWR0FuaW1hdGVkTGVuZ3RoLmpzJ1xuXG5leHBvcnQgY2xhc3MgU1ZHUmVjdEVsZW1lbnQgZXh0ZW5kcyBTVkdHcmFwaGljc0VsZW1lbnQge1xuICB4ID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICd4JylcbiAgeSA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAneScpXG4gIHdpZHRoID0gbmV3IFNWR0FuaW1hdGVkTGVuZ3RoKHRoaXMsICd3aWR0aCcpXG4gIGhlaWdodCA9IG5ldyBTVkdBbmltYXRlZExlbmd0aCh0aGlzLCAnaGVpZ2h0JylcbiAgcnggPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3J4JylcbiAgcnkgPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3J5Jylcbn1cbiIsImltcG9ydCB7IFNWR0dyYXBoaWNzRWxlbWVudCB9IGZyb20gJy4vU1ZHR3JhcGhpY3NFbGVtZW50LmpzJ1xuaW1wb3J0IHsgQm94IH0gZnJvbSAnLi4vLi4vb3RoZXIvQm94LmpzJ1xuaW1wb3J0IHsgU1ZHTWF0cml4IH0gZnJvbSAnLi9TVkdNYXRyaXguanMnXG5pbXBvcnQgeyBTVkdQb2ludCB9IGZyb20gJy4vU1ZHUG9pbnQuanMnXG5cbmV4cG9ydCBjbGFzcyBTVkdTVkdFbGVtZW50IGV4dGVuZHMgU1ZHR3JhcGhpY3NFbGVtZW50IHtcbiAgY3JlYXRlU1ZHTWF0cml4ICgpIHtcbiAgICByZXR1cm4gbmV3IFNWR01hdHJpeCgpXG4gIH1cblxuICBjcmVhdGVTVkdQb2ludCAoKSB7XG4gICAgcmV0dXJuIG5ldyBTVkdQb2ludCgpXG4gIH1cblxuICBjcmVhdGVTVkdSZWN0ICgpIHtcbiAgICByZXR1cm4gbmV3IEJveCgpXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgU1ZHQW5pbWF0ZWRMZW5ndGggfSBmcm9tICcuL1NWR0FuaW1hdGVkTGVuZ3RoLmpzJ1xuaW1wb3J0IHsgU1ZHR3JhcGhpY3NFbGVtZW50IH0gZnJvbSAnLi9TVkdHcmFwaGljc0VsZW1lbnQuanMnXG5cbmV4cG9ydCBjbGFzcyBTVkdUZXh0Q29udGVudEVsZW1lbnQgZXh0ZW5kcyBTVkdHcmFwaGljc0VsZW1lbnQge1xuICB0ZXh0V2lkdGggPSBuZXcgU1ZHQW5pbWF0ZWRMZW5ndGgodGhpcywgJ3RleHRXaWR0aCcpXG5cbiAgZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCQm94KCkud2lkdGhcbiAgfVxufVxuIiwiaW1wb3J0IHsgV2luZG93IH0gZnJvbSAnLi9kb20vV2luZG93LmpzJ1xuaW1wb3J0IHsgRE9NSW1wbGVtZW50YXRpb24gfSBmcm9tICcuL2RvbS9Eb2N1bWVudC5qcydcbmltcG9ydCAqIGFzIG5hbWVzcGFjZXMgZnJvbSAnLi91dGlscy9uYW1lc3BhY2VzLmpzJ1xuXG5jb25zdCB7IGNyZWF0ZURvY3VtZW50LCBjcmVhdGVIVE1MRG9jdW1lbnQgfSA9IERPTUltcGxlbWVudGF0aW9uXG5cbmNvbnN0IGNyZWF0ZVdpbmRvdyA9ICguLi5hcmdzKSA9PiB7XG4gIGNvbnN0IHdpbmRvdyA9IG5ldyBXaW5kb3coKVxuICBjb25zdCBkb2N1bWVudCA9IGNyZWF0ZURvY3VtZW50KC4uLmFyZ3MpXG4gIHdpbmRvdy5kb2N1bWVudCA9IGRvY3VtZW50XG4gIGRvY3VtZW50LmRlZmF1bHRWaWV3ID0gd2luZG93XG4gIHJldHVybiB3aW5kb3dcbn1cblxuY29uc3QgY3JlYXRlSFRNTFdpbmRvdyA9ICh0aXRsZSkgPT4ge1xuICBjb25zdCB3aW5kb3cgPSBuZXcgV2luZG93KClcbiAgY29uc3QgZG9jdW1lbnQgPSBET01JbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQodGl0bGUpXG4gIHdpbmRvdy5kb2N1bWVudCA9IGRvY3VtZW50XG4gIGRvY3VtZW50LmRlZmF1bHRWaWV3ID0gd2luZG93XG4gIHJldHVybiB3aW5kb3dcbn1cblxuY29uc3QgY3JlYXRlU1ZHV2luZG93ID0gKCkgPT4ge1xuICByZXR1cm4gY3JlYXRlV2luZG93KG5hbWVzcGFjZXMuc3ZnLCAnc3ZnJylcbn1cblxuY29uc3QgY3JlYXRlU1ZHRG9jdW1lbnQgPSAoKSA9PiB7XG4gIHJldHVybiBjcmVhdGVEb2N1bWVudChuYW1lc3BhY2VzLnN2ZywgJ3N2ZycpXG59XG5cbmV4cG9ydCB7XG4gIGNyZWF0ZURvY3VtZW50LFxuICBjcmVhdGVIVE1MRG9jdW1lbnQsXG4gIGNyZWF0ZVNWR0RvY3VtZW50LFxuICBjcmVhdGVXaW5kb3csXG4gIGNyZWF0ZUhUTUxXaW5kb3csXG4gIGNyZWF0ZVNWR1dpbmRvd1xufVxuIiwiaW1wb3J0ICogYXMgcmVnZXggZnJvbSAnLi4vdXRpbHMvcmVnZXguanMnXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4vUG9pbnQuanMnXG5cbmV4cG9ydCBjbGFzcyBCb3gge1xuICBjb25zdHJ1Y3RvciAoc291cmNlKSB7XG4gICAgdmFyIGJhc2UgPSBbIDAsIDAsIDAsIDAgXVxuICAgIHNvdXJjZSA9IHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnID8gc291cmNlLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikubWFwKHBhcnNlRmxvYXQpXG4gICAgICA6IEFycmF5LmlzQXJyYXkoc291cmNlKSA/IHNvdXJjZVxuICAgICAgOiB0eXBlb2Ygc291cmNlID09PSAnb2JqZWN0JyA/IFtcbiAgICAgICAgc291cmNlLmxlZnQgIT0gbnVsbCA/IHNvdXJjZS5sZWZ0IDogc291cmNlLngsXG4gICAgICAgIHNvdXJjZS50b3AgIT0gbnVsbCA/IHNvdXJjZS50b3AgOiBzb3VyY2UueSxcbiAgICAgICAgc291cmNlLndpZHRoLFxuICAgICAgICBzb3VyY2UuaGVpZ2h0XG4gICAgICBdXG4gICAgICA6IGFyZ3VtZW50cy5sZW5ndGggPT09IDQgPyBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICAgIDogYmFzZVxuXG4gICAgdGhpcy54ID0gdGhpcy5sZWZ0ID0gc291cmNlWzBdXG4gICAgdGhpcy55ID0gdGhpcy50b3AgPSBzb3VyY2VbMV1cbiAgICB0aGlzLndpZHRoID0gc291cmNlWzJdXG4gICAgdGhpcy5oZWlnaHQgPSBzb3VyY2VbM11cbiAgICB0aGlzLnJpZ2h0ID0gdGhpcy5sZWZ0ICsgdGhpcy53aWR0aFxuICAgIHRoaXMuYm90dG9tID0gdGhpcy50b3AgKyB0aGlzLmhlaWdodFxuICB9XG5cbiAgLy8gTWVyZ2UgcmVjdCBib3ggd2l0aCBhbm90aGVyLCByZXR1cm4gYSBuZXcgaW5zdGFuY2VcbiAgbWVyZ2UgKGJveCkge1xuICAgIGlmIChib3ggaW5zdGFuY2VvZiBOb0JveCkgcmV0dXJuIG5ldyBCb3godGhpcylcblxuICAgIHZhciB4ID0gTWF0aC5taW4odGhpcy54LCBib3gueClcbiAgICB2YXIgeSA9IE1hdGgubWluKHRoaXMueSwgYm94LnkpXG5cbiAgICByZXR1cm4gbmV3IEJveChcbiAgICAgIHgsIHksXG4gICAgICBNYXRoLm1heCh0aGlzLnggKyB0aGlzLndpZHRoLCBib3gueCArIGJveC53aWR0aCkgLSB4LFxuICAgICAgTWF0aC5tYXgodGhpcy55ICsgdGhpcy5oZWlnaHQsIGJveC55ICsgYm94LmhlaWdodCkgLSB5XG4gICAgKVxuICB9XG5cbiAgdHJhbnNmb3JtIChtKSB7XG4gICAgdmFyIHhNaW4gPSBJbmZpbml0eVxuICAgIHZhciB4TWF4ID0gLUluZmluaXR5XG4gICAgdmFyIHlNaW4gPSBJbmZpbml0eVxuICAgIHZhciB5TWF4ID0gLUluZmluaXR5XG5cbiAgICB2YXIgcHRzID0gW1xuICAgICAgbmV3IFBvaW50KHRoaXMueCwgdGhpcy55KSxcbiAgICAgIG5ldyBQb2ludCh0aGlzLnggKyB0aGlzLndpZHRoLCB0aGlzLnkpLFxuICAgICAgbmV3IFBvaW50KHRoaXMueCwgdGhpcy55ICsgdGhpcy5oZWlnaHQpLFxuICAgICAgbmV3IFBvaW50KHRoaXMueCArIHRoaXMud2lkdGgsIHRoaXMueSArIHRoaXMuaGVpZ2h0KVxuICAgIF1cblxuICAgIHB0cy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICBwID0gcC50cmFuc2Zvcm0obSlcbiAgICAgIHhNaW4gPSBNYXRoLm1pbih4TWluLCBwLngpXG4gICAgICB4TWF4ID0gTWF0aC5tYXgoeE1heCwgcC54KVxuICAgICAgeU1pbiA9IE1hdGgubWluKHlNaW4sIHAueSlcbiAgICAgIHlNYXggPSBNYXRoLm1heCh5TWF4LCBwLnkpXG4gICAgfSlcblxuICAgIHJldHVybiBuZXcgQm94KFxuICAgICAgeE1pbiwgeU1pbixcbiAgICAgIHhNYXggLSB4TWluLFxuICAgICAgeU1heCAtIHlNaW5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vQm94IGV4dGVuZHMgQm94IHtcbiAgLy8gTm9Cb3ggaGFzIG5vIHZhbGlkIHZhbHVlcyBzbyBpdCBjYW50IGJlIG1lcmdlZFxuICBtZXJnZSAoYm94KSB7XG4gICAgcmV0dXJuIGJveCBpbnN0YW5jZW9mIE5vQm94ID8gbmV3IE5vQm94KCkgOiBuZXcgQm94KGJveClcbiAgfVxuXG4gIHRyYW5zZm9ybSAobSkge1xuICAgIHJldHVybiBuZXcgTm9Cb3goKVxuICB9XG59XG4iLCJpbXBvcnQgeyByZW1vdmVRdW90ZXMsIHNwbGl0Tm90SW5CcmFja2V0cyB9IGZyb20gJy4uL3V0aWxzL3N0clV0aWxzLmpzJ1xuaW1wb3J0ICogYXMgcmVnZXggZnJvbSAnLi4vdXRpbHMvcmVnZXguanMnXG5pbXBvcnQgeyBodG1sIH0gZnJvbSAnLi4vdXRpbHMvbmFtZXNwYWNlcy5qcydcblxuZXhwb3J0IGNsYXNzIENzc1F1ZXJ5IHtcbiAgY29uc3RydWN0b3IgKHF1ZXJ5KSB7XG4gICAgaWYgKENzc1F1ZXJ5LmNhY2hlLmhhcyhxdWVyeSkpIHtcbiAgICAgIHRoaXMucXVlcmllcyA9IENzc1F1ZXJ5LmNhY2hlLmdldChxdWVyeSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBxdWVyaWVzID0gc3BsaXROb3RJbkJyYWNrZXRzKHF1ZXJ5LCAnLCcpXG5cbiAgICBxdWVyaWVzID0gcXVlcmllcy5tYXAocXVlcnkgPT4ge1xuXG4gICAgICBsZXQgcm91bmRCcmFja2V0cyA9IDBcbiAgICAgIGxldCBzcXVhcmVCcmFja2V0cyA9IDBcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgc2FtZSBhcyBhYm92ZSBidXQgZWFzaWVyXG4gICAgICBxdWVyeSA9IHF1ZXJ5LnJlcGxhY2UoL1soKVtcXF0+fitdL2csIGZ1bmN0aW9uIChjaCkge1xuICAgICAgICBpZiAoY2ggPT09ICcoJykgKytyb3VuZEJyYWNrZXRzXG4gICAgICAgIGVsc2UgaWYgKGNoID09PSAnKScpIC0tcm91bmRCcmFja2V0c1xuICAgICAgICBlbHNlIGlmIChjaCA9PT0gJ1snKSArK3NxdWFyZUJyYWNrZXRzXG4gICAgICAgIGVsc2UgaWYgKGNoID09PSAnXScpIC0tc3F1YXJlQnJhY2tldHNcblxuICAgICAgICBpZiAoJygpW10nLmluZGV4T2YoY2gpID4gLTEpIHJldHVybiBjaFxuICAgICAgICBpZiAoc3F1YXJlQnJhY2tldHMgfHwgcm91bmRCcmFja2V0cykgcmV0dXJuIGNoXG5cbiAgICAgICAgcmV0dXJuICcgJyArIGNoICsgJyAnXG4gICAgICB9KVxuXG4gICAgICAvLyBzcGxpdCBhdCBzcGFjZSBhbmQgcmVtb3ZlIGVtcHR5IHJlc3VsdHNcbiAgICAgIHF1ZXJ5ID0gc3BsaXROb3RJbkJyYWNrZXRzKHF1ZXJ5LCAnICcpLmZpbHRlcihlbCA9PiAhIWVsLmxlbmd0aClcblxuICAgICAgY29uc3QgcGFpcnMgPSBbXVxuXG4gICAgICBsZXQgcmVsYXRpb24gPSAnJSdcblxuICAgICAgLy8gZ2VuZXJhdGUgcXVlcnlub2RlIHJlbGF0aW9uIHR1cGxlc1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGlsID0gcXVlcnkubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuXG4gICAgICAgIGlmICgnPn4rJScuaW5kZXhPZihxdWVyeVtpXSkgPiAtMSkge1xuICAgICAgICAgIHJlbGF0aW9uID0gcXVlcnlbaV1cbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgcGFpcnMucHVzaChbIHJlbGF0aW9uLCBxdWVyeVtpXSBdKVxuICAgICAgICByZWxhdGlvbiA9ICclJ1xuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYWlyc1xuXG4gICAgfSlcblxuICAgIHRoaXMucXVlcmllcyA9IHF1ZXJpZXNcblxuICAgIC8vIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzIHdlIGhhdmUgdG8gbWFuYWdlIG91ciBjYWNoZS5cbiAgICAvLyB3ZSBkZWxldGUgZXZlcnl0aGluZyB3aGljaCBpcyBvbGRlciB0aGFuIDUwIGVudHJpZXNcbiAgICBpZiAoQ3NzUXVlcnkuY2FjaGVLZXlzLmxlbmd0aCA+IDUwKSB7XG4gICAgICBDc3NRdWVyeS5jYWNoZS5kZWxldGUoQ3NzUXVlcnkuY2FjaGVLZXlzLnNoaWZ0KCkpXG4gICAgfVxuICAgIENzc1F1ZXJ5LmNhY2hlLnNldChxdWVyeSwgcXVlcmllcylcbiAgICBDc3NRdWVyeS5jYWNoZUtleXMucHVzaChxdWVyeSlcblxuICB9XG5cbiAgbWF0Y2hlcyAobm9kZSwgc2NvcGUpIHtcbiAgICBmb3IgKGxldCBpID0gdGhpcy5xdWVyaWVzLmxlbmd0aDsgaS0tOykge1xuICAgICAgaWYgKHRoaXMubWF0Y2hIZWxwZXIodGhpcy5xdWVyaWVzW2ldLCBub2RlLCBzY29wZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBtYXRjaEhlbHBlciAocXVlcnksIG5vZGUsIHNjb3BlKSB7XG4gICAgcXVlcnkgPSBxdWVyeS5zbGljZSgpXG4gICAgY29uc3QgbGFzdCA9IHF1ZXJ5LnBvcCgpXG5cbiAgICBpZiAoIW5ldyBDc3NRdWVyeU5vZGUobGFzdFsxXSkubWF0Y2hlcyhub2RlLCBzY29wZSkpIHsgcmV0dXJuIGZhbHNlIH1cblxuICAgIGlmICghcXVlcnkubGVuZ3RoKSByZXR1cm4gdHJ1ZVxuXG4gICAgaWYgKGxhc3RbMF0gPT09ICcsJykgcmV0dXJuIHRydWVcblxuICAgIGlmIChsYXN0WzBdID09PSAnKycpIHtcbiAgICAgIHJldHVybiAhIW5vZGUucHJldmlvdXNTaWJsaW5nICYmIHRoaXMubWF0Y2hIZWxwZXIocXVlcnksIG5vZGUucHJldmlvdXNTaWJsaW5nLCBzY29wZSlcbiAgICB9XG5cbiAgICBpZiAobGFzdFswXSA9PT0gJz4nKSB7XG4gICAgICByZXR1cm4gISFub2RlLnBhcmVudE5vZGUgJiYgdGhpcy5tYXRjaEhlbHBlcihxdWVyeSwgbm9kZS5wYXJlbnROb2RlLCBzY29wZSlcbiAgICB9XG5cbiAgICBpZiAobGFzdFswXSA9PT0gJ34nKSB7XG4gICAgICB3aGlsZSAoKG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZykpIHtcbiAgICAgICAgaWYgKHRoaXMubWF0Y2hIZWxwZXIocXVlcnksIG5vZGUsIHNjb3BlKSkgeyByZXR1cm4gdHJ1ZSB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAobGFzdFswXSA9PT0gJyUnKSB7XG4gICAgICB3aGlsZSAoKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSB7XG4gICAgICAgIGlmICh0aGlzLm1hdGNoSGVscGVyKHF1ZXJ5LCBub2RlLCBzY29wZSkpIHsgcmV0dXJuIHRydWUgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gIH1cbn1cblxuQ3NzUXVlcnkuY2FjaGUgPSBuZXcgTWFwKClcbkNzc1F1ZXJ5LmNhY2hlS2V5cyA9IFtdXG5cbi8vIGNoZWNrIGlmIFtub2RlXSBpcyB0aGUgW250aF0gY2hpbGQgb2YgW2Fycl0gd2hlcmUgbnRoIGNhbiBhbHNvIGJlIGEgZm9ybXVsYVxuY29uc3QgbnRoID0gKG5vZGUsIGFyciwgbnRoKSA9PiB7XG5cbiAgaWYgKG50aCA9PT0gJ2V2ZW4nKSBudGggPSAnMm4nXG4gIGVsc2UgaWYgKG50aCA9PT0gJ29kZCcpIG50aCA9ICcybisxJ1xuXG4gIC8vIGNoZWNrIGZvciBldmFsIGNoYXJzXG4gIGlmICgvW15cXGRcXC1uKyovXSsvLnRlc3QobnRoKSkgcmV0dXJuIGZhbHNlXG5cbiAgbnRoID0gbnRoLnJlcGxhY2UoJ24nLCAnKm4nKVxuXG4gIC8vIGV2YWwgbnRoIHRvIGdldCB0aGUgaW5kZXhcbiAgZm9yICh2YXIgaSwgbiA9IDAsIG5sID0gYXJyLmxlbmd0aDsgbiA8IG5sOyArK24pIHtcbiAgICAvKiBlc2xpbnQgbm8tZXZhbDogb2ZmICovXG4gICAgaSA9IGV2YWwobnRoKVxuXG4gICAgaWYgKGkgPiBubCkgYnJlYWtcbiAgICBpZiAoYXJyW2kgLSAxXSA9PT0gbm9kZSkgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5jb25zdCBsb3dlciA9IGEgPT4gYS50b0xvd2VyQ2FzZSgpXG5cbi8vIGNoZWNrcyBpZiBhIGFuZCBiIGFyZSBlcXVhbC4gSXMgaW5zZW5zaXRpdmUgd2hlbiBpIGlzIHRydWVcbmNvbnN0IGVxID0gKGEsIGIsIGkpID0+IGkgPyBsb3dlcihhKSA9PT0gbG93ZXIoYikgOiBhID09PSBiXG5cbi8vIFtpXSAocHJlYm91bmQpIGlzIHRydWUgaWYgaW5zZW5zaXRpdmUgbWF0Y2hpbmcgaXMgcmVxdWlyZWRcbi8vIFthXSAocHJlYm91bmQpIGlzIHRoZSB2YWx1ZSB0aGUgYXR0ciBpcyBjb21wYXJlZCB0b1xuLy8gW2JdIChwYXNzZWQpICAgaXMgdGhlIHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGVcbmNvbnN0IGF0dHJpYnV0ZU1hdGNoZXIgPSB7XG4gICc9JzogKGksIGEsIGIpID0+IGVxKGEsIGIsIGkpLFxuICAnfj0nOiAoaSwgYSwgYikgPT4gYi5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihlbCA9PiBlcShlbCwgYSwgaSkpLmxlbmd0aCA+IDAsXG4gICd8PSc6IChpLCBhLCBiKSA9PiBlcShiLnNwbGl0KHJlZ2V4LmRlbGltaXRlcilbMF0sIGEsIGkpLFxuICAnXj0nOiAoaSwgYSwgYikgPT4gaSA/IGxvd2VyKGIpLnN0YXJ0c1dpdGgobG93ZXIoYSkpIDogYi5zdGFydHNXaXRoKGEpLFxuICAnJD0nOiAoaSwgYSwgYikgPT4gaSA/IGxvd2VyKGIpLmVuZHNXaXRoKGxvd2VyKGEpKSA6IGIuZW5kc1dpdGgoYSksXG4gICcqPSc6IChpLCBhLCBiKSA9PiBpID8gbG93ZXIoYikuaW5jbHVkZXMobG93ZXIoYSkpIDogYi5pbmNsdWRlcyhhKSxcbiAgJyonOiAoaSwgYSwgYikgPT4gYiAhPSBudWxsXG59XG5cbmNvbnN0IGdldEF0dHJpYnV0ZVZhbHVlID0gKHByZWZpeCwgbmFtZSwgbm9kZSkgPT4ge1xuICBpZiAoIXByZWZpeCB8fCBwcmVmaXggPT09ICcqJykge1xuICAgIHJldHVybiBub2RlLmdldEF0dHJpYnV0ZShuYW1lKVxuICB9XG4gIHJldHVybiBub2RlLmdldEF0dHJpYnV0ZShwcmVmaXggKyAnOicgKyBuYW1lKVxufVxuXG4vLyBbYV0gKHByZWJvdW5kKSBbYV1yZ3VtZW50IG9mIHRoZSBwc2V1ZG8gc2VsZWN0b3Jcbi8vIFtuXSAocGFzc2VkKSAgIFtuXW9kZVxuLy8gW3NdIChwYXNzZWQpICAgW3NdY29wZSAtIHRoZSBlbGVtZW50IHRoaXMgcXVlcnkgaXMgc2NvcGVkIHRvXG5jb25zdCBwc2V1ZG9NYXRjaGVyID0ge1xuICAnZmlyc3QtY2hpbGQnOiAoYSwgbikgPT4gbi5wYXJlbnROb2RlICYmIG4ucGFyZW50Tm9kZS5maXJzdENoaWxkID09PSBuLFxuICAnbGFzdC1jaGlsZCc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLmxhc3RDaGlsZCA9PT0gbixcbiAgJ250aC1jaGlsZCc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbnRoKG4sIG4ucGFyZW50Tm9kZS5jaGlsZE5vZGVzLCBhKSxcbiAgJ250aC1sYXN0LWNoaWxkJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBudGgobiwgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuc2xpY2UoKS5yZXZlcnNlKCksIGEpLFxuICAnZmlyc3Qtb2YtdHlwZSc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuZmlsdGVyKGVsID0+IGVsLm5vZGVOYW1lID09PSBuLm5vZGVOYW1lKVswXSA9PT0gbixcbiAgJ2xhc3Qtb2YtdHlwZSc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuZmlsdGVyKGVsID0+IGVsLm5vZGVOYW1lID09PSBuLm5vZGVOYW1lKS5wb3AoKSA9PT0gbixcbiAgJ250aC1vZi10eXBlJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBudGgobiwgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuZmlsdGVyKGVsID0+IGVsLm5vZGVOYW1lID09PSBuLm5vZGVOYW1lKSwgYSksXG4gICdudGgtbGFzdC1vZi10eXBlJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBudGgobiwgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMuZmlsdGVyKGVsID0+IGVsLm5vZGVOYW1lID09PSBuLm5vZGVOYW1lKS5yZXZlcnNlKCksIGEpLFxuICAnb25seS1jaGlsZCc6IChhLCBuKSA9PiBuLnBhcmVudE5vZGUgJiYgbi5wYXJlbnROb2RlLmNoaWxkTm9kZXMubGVuZ3RoID09PSAxLFxuICAnb25seS1vZi10eXBlJzogKGEsIG4pID0+IG4ucGFyZW50Tm9kZSAmJiBuLnBhcmVudE5vZGUuY2hpbGROb2Rlcy5maWx0ZXIoZWwgPT4gZWwubm9kZU5hbWUgPT09IG4ubm9kZU5hbWUpLmxlbmd0aCA9PT0gMSxcbiAgcm9vdDogKGEsIG4pID0+IG4ub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgPT09IG4sXG4gIG5vdDogKGEsIG4sIHMpID0+ICEobmV3IENzc1F1ZXJ5KGEpKS5tYXRjaGVzKG4sIHMpLFxuICBtYXRjaGVzOiAoYSwgbiwgcykgPT4gKG5ldyBDc3NRdWVyeShhKSkubWF0Y2hlcyhuLCBzKSxcbiAgc2NvcGU6IChhLCBuLCBzKSA9PiBuID09PSBzXG59XG5cbmV4cG9ydCBjbGFzcyBDc3NRdWVyeU5vZGUge1xuICBjb25zdHJ1Y3RvciAobm9kZSkge1xuICAgIHRoaXMudGFnID0gJydcbiAgICB0aGlzLmlkID0gJydcbiAgICB0aGlzLmNsYXNzTGlzdCA9IFtdXG4gICAgdGhpcy5hdHRycyA9IFtdXG4gICAgdGhpcy5wc2V1ZG8gPSBbXVxuXG4gICAgLy8gbWF0Y2ggdGhlIHRhZyBuYW1lXG4gICAgbGV0IG1hdGNoZXMgPSBub2RlLm1hdGNoKC9eW1xcdy1dK3xeXFwqLylcbiAgICBpZiAobWF0Y2hlcykge1xuICAgICAgdGhpcy50YWcgPSBtYXRjaGVzWzBdXG4gICAgICBub2RlID0gbm9kZS5zbGljZSh0aGlzLnRhZy5sZW5ndGgpXG4gICAgfVxuXG4gICAgLy8gbWF0Y2ggcHNldWRvIGNsYXNzZXNcbiAgICB3aGlsZSAoKG1hdGNoZXMgPSAvOihbXFx3LV0rKSg/OlxcKCguKylcXCkpPy9nLmV4ZWMobm9kZSkpKSB7XG4gICAgICB0aGlzLnBzZXVkby5wdXNoKHBzZXVkb01hdGNoZXJbbWF0Y2hlc1sxXV0uYmluZCh0aGlzLCByZW1vdmVRdW90ZXMobWF0Y2hlc1syXSB8fCAnJykpKVxuICAgICAgbm9kZSA9IG5vZGUuc2xpY2UoMCwgbWF0Y2hlcy5pbmRleCkgKyBub2RlLnNsaWNlKG1hdGNoZXMuaW5kZXggKyBtYXRjaGVzWzBdLmxlbmd0aClcbiAgICB9XG5cbiAgICAvLyBtYXRjaCBhdHRyaWJ1dGVzXG4gICAgd2hpbGUgKChtYXRjaGVzID0gL1xcWyhbXFx3LSpdK1xcfCk/KFtcXHctXSspKChbPV5+JHwqXSspKC4rPykoICtbaUldKT8pP1xcXS9nLmV4ZWMobm9kZSkpKSB7XG4gICAgICBjb25zdCBwcmVmaXggPSBtYXRjaGVzWzFdID8gbWF0Y2hlc1sxXS5zcGxpdCgnfCcpWzBdIDogbnVsbFxuICAgICAgdGhpcy5hdHRycy5wdXNoKHtcbiAgICAgICAgbmFtZTogbWF0Y2hlc1syXSxcbiAgICAgICAgZ2V0VmFsdWU6IGdldEF0dHJpYnV0ZVZhbHVlLmJpbmQodGhpcywgcHJlZml4LCBtYXRjaGVzWzJdKSxcbiAgICAgICAgbWF0Y2hlcjogYXR0cmlidXRlTWF0Y2hlclttYXRjaGVzWzRdIHx8ICcqJ10uYmluZChcbiAgICAgICAgICB0aGlzLFxuICAgICAgICAgICEhbWF0Y2hlc1s2XSwgLy8gY2FzZSBpbnNlbnNpdGl2ZSB5ZXMvbm9cbiAgICAgICAgICByZW1vdmVRdW90ZXMoKG1hdGNoZXNbNV0gfHwgJycpLnRyaW0oKSkgLy8gYXR0cmlidXRlIHZhbHVlXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgICBub2RlID0gbm9kZS5zbGljZSgwLCBtYXRjaGVzLmluZGV4KSArIG5vZGUuc2xpY2UobWF0Y2hlcy5pbmRleCArIG1hdGNoZXNbMF0ubGVuZ3RoKVxuICAgIH1cblxuICAgIC8vIG1hdGNoIHRoZSBpZFxuICAgIG1hdGNoZXMgPSBub2RlLm1hdGNoKC8jKFtcXHctXSspLylcbiAgICBpZiAobWF0Y2hlcykge1xuICAgICAgdGhpcy5pZCA9IG1hdGNoZXNbMV1cbiAgICAgIG5vZGUgPSBub2RlLnNsaWNlKDAsIG1hdGNoZXMuaW5kZXgpICsgbm9kZS5zbGljZShtYXRjaGVzLmluZGV4ICsgbWF0Y2hlc1swXS5sZW5ndGgpXG4gICAgfVxuXG4gICAgLy8gbWF0Y2ggY2xhc3Nlc1xuICAgIHdoaWxlICgobWF0Y2hlcyA9IC9cXC4oW1xcdy1dKykvZy5leGVjKG5vZGUpKSkge1xuICAgICAgdGhpcy5jbGFzc0xpc3QucHVzaChtYXRjaGVzWzFdKVxuICAgICAgbm9kZSA9IG5vZGUuc2xpY2UoMCwgbWF0Y2hlcy5pbmRleCkgKyBub2RlLnNsaWNlKG1hdGNoZXMuaW5kZXggKyBtYXRjaGVzWzBdLmxlbmd0aClcbiAgICB9XG4gIH1cblxuICBtYXRjaGVzIChub2RlLCBzY29wZSkge1xuICAgIGxldCBpXG5cbiAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSkgcmV0dXJuIGZhbHNlXG5cbiAgICAvLyBBbHdheXMgdGhpcyBleHRyYSBjb2RlIGZvciBodG1sIC0uLVxuICAgIGlmIChub2RlLm5hbWVzcGFjZVVSSSA9PT0gaHRtbCkge1xuICAgICAgdGhpcy50YWcgPSB0aGlzLnRhZy50b1VwcGVyQ2FzZSgpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGFnICYmIHRoaXMudGFnICE9PSBub2RlLm5vZGVOYW1lICYmIHRoaXMudGFnICE9PSAnKicpIHsgcmV0dXJuIGZhbHNlIH1cblxuICAgIGlmICh0aGlzLmlkICYmIHRoaXMuaWQgIT09IG5vZGUuaWQpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IGNsYXNzTGlzdCA9IChub2RlLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJykuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5maWx0ZXIoZWwgPT4gISFlbC5sZW5ndGgpXG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmZpbHRlcihjbGFzc05hbWUgPT4gY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKSA8IDApLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZm9yIChpID0gdGhpcy5hdHRycy5sZW5ndGg7IGktLTspIHtcbiAgICAgIGNvbnN0IGF0dHJWYWx1ZSA9IHRoaXMuYXR0cnNbaV0uZ2V0VmFsdWUobm9kZSlcbiAgICAgIGlmIChhdHRyVmFsdWUgPT09IG51bGwgfHwgIXRoaXMuYXR0cnNbaV0ubWF0Y2hlcihhdHRyVmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IHRoaXMucHNldWRvLmxlbmd0aDsgaS0tOykge1xuICAgICAgaWYgKCF0aGlzLnBzZXVkb1tpXShub2RlLCBzY29wZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBTVkdQb2ludCB9IGZyb20gJy4uL2RvbS9zdmcvU1ZHUG9pbnQuanMnXG5cbmV4cG9ydCBjbGFzcyBQb2ludCB7XG4gIC8vIEluaXRpYWxpemVcbiAgY29uc3RydWN0b3IgKHgsIHkpIHtcbiAgICBjb25zdCBiYXNlID0geyB4OiAwLCB5OiAwIH1cblxuICAgIC8vIGVuc3VyZSBzb3VyY2UgYXMgb2JqZWN0XG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh4KVxuICAgICAgPyB7IHg6IHhbMF0sIHk6IHhbMV0gfVxuICAgICAgOiB0eXBlb2YgeCA9PT0gJ29iamVjdCdcbiAgICAgICAgPyB7IHg6IHgueCwgeTogeC55IH1cbiAgICAgICAgOiB4ICE9IG51bGxcbiAgICAgICAgICA/IHsgeDogeCwgeTogKHkgIT0gbnVsbCA/IHkgOiB4KSB9XG4gICAgICAgICAgOiBiYXNlIC8vIElmIHkgaGFzIG5vIHZhbHVlLCB0aGVuIHggaXMgdXNlZCBoYXMgaXRzIHZhbHVlXG5cbiAgICAvLyBtZXJnZSBzb3VyY2VcbiAgICB0aGlzLnggPSBzb3VyY2UueFxuICAgIHRoaXMueSA9IHNvdXJjZS55XG4gIH1cblxuICBhYnMgKCkge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5hYnNRdWFkKCkpXG4gIH1cblxuICBhYnNRdWFkICgpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55XG4gIH1cblxuICBhZGQgKHgsIHkpIHtcbiAgICBjb25zdCBwID0gbmV3IFBvaW50KHgsIHkpXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggKyBwLngsIHRoaXMueSArIHAueSlcbiAgfVxuXG4gIGFuZ2xlVG8gKHApIHtcbiAgICBsZXQgc2lnbiA9IE1hdGguc2lnbih0aGlzLnggKiBwLnkgLSB0aGlzLnkgKiBwLngpXG4gICAgc2lnbiA9IHNpZ24gfHwgMVxuICAgIHJldHVybiBzaWduICogTWF0aC5hY29zKE1hdGgucm91bmQoKHRoaXMuZG90KHApIC8gKHRoaXMuYWJzKCkgKiBwLmFicygpKSkgKiAxMDAwMDAwKSAvIDEwMDAwMDApXG4gIH1cblxuICAvLyBDbG9uZSBwb2ludFxuICBjbG9uZSAoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzKVxuICB9XG5cbiAgY2xvc2VUbyAocCwgZXRhID0gMC4wMDAwMSkge1xuICAgIHJldHVybiB0aGlzLmVxdWFscyhwKSB8fCAoTWF0aC5hYnModGhpcy54IC0gcC54KSA8IGV0YSAmJiBNYXRoLmFicyh0aGlzLnkgLSBwLnkpIDwgZXRhKVxuICB9XG5cbiAgZGl2IChmYWN0b3IpIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCAvIGZhY3RvciwgdGhpcy55IC8gZmFjdG9yKVxuICB9XG5cbiAgZG90IChwKSB7XG4gICAgcmV0dXJuIHRoaXMueCAqIHAueCArIHRoaXMueSAqIHAueVxuICB9XG5cbiAgZXF1YWxzIChwKSB7XG4gICAgcmV0dXJuIHRoaXMueCA9PT0gcC54ICYmIHRoaXMueSA9PT0gcC55XG4gIH1cblxuICBtdWwgKGZhY3Rvcikge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54ICogZmFjdG9yLCB0aGlzLnkgKiBmYWN0b3IpXG4gIH1cblxuICAvLyBDb252ZXJ0IHRvIG5hdGl2ZSBTVkdQb2ludFxuICBuYXRpdmUgKCkge1xuICAgIC8vIGNyZWF0ZSBuZXcgcG9pbnRcbiAgICBjb25zdCBwb2ludCA9IG5ldyBTVkdQb2ludCgpXG5cbiAgICAvLyB1cGRhdGUgd2l0aCBjdXJyZW50IHZhbHVlc1xuICAgIHBvaW50LnggPSB0aGlzLnhcbiAgICBwb2ludC55ID0gdGhpcy55XG5cbiAgICByZXR1cm4gcG9pbnRcbiAgfVxuXG4gIG5vcm1hbCAoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnksIC10aGlzLngpXG4gIH1cblxuICBub3JtYWxpemUgKCkge1xuICAgIGNvbnN0IGFicyA9IHRoaXMuYWJzKClcbiAgICBpZiAoIWFicykgdGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IG5vcm1hbGl6ZSB2ZWN0b3Igb2YgemVybyBsZW5ndGgnKVxuICAgIHJldHVybiB0aGlzLmRpdihhYnMpXG4gIH1cblxuICByZWZsZWN0QXQgKHApIHtcbiAgICByZXR1cm4gcC5hZGQocC5zdWIodGhpcykpXG4gIH1cblxuICBzdWIgKHgsIHkpIHtcbiAgICBjb25zdCBwID0gbmV3IFBvaW50KHgsIHkpXG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnggLSBwLngsIHRoaXMueSAtIHAueSlcbiAgfVxuXG4gIHRvQXJyYXkgKCkge1xuICAgIHJldHVybiBbIHRoaXMueCwgdGhpcy55IF1cbiAgfVxuXG4gIHRvUGF0aCAoKSB7XG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLngsIHRoaXMueSBdLmpvaW4oJyAnKVxuICB9XG5cbiAgLy8gdHJhbnNmb3JtIHBvaW50IHdpdGggbWF0cml4XG4gIHRyYW5zZm9ybSAobWF0cml4KSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLm5hdGl2ZSgpLm1hdHJpeFRyYW5zZm9ybShtYXRyaXgpKVxuICB9XG5cbiAgdHJhbnNmb3JtTyAobWF0cml4KSB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLm5hdGl2ZSgpLm1hdHJpeFRyYW5zZm9ybShtYXRyaXgpXG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOb2RlRmlsdGVyIH0gZnJvbSAnLi4vZG9tL05vZGVGaWx0ZXIuanMnXG5cbmNvbnN0IHNob3dUaGlzTm9kZSA9ICh3aGF0VG9TaG93LCBub2RlKSA9PiB7XG4gIGlmICh3aGF0VG9TaG93ID09PSBOb2RlRmlsdGVyLlNIT1dfQUxMKSByZXR1cm4gdHJ1ZVxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSByZXR1cm4gdHJ1ZVxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19URVhUICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuVEVYVF9OT0RFKSByZXR1cm4gdHJ1ZVxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19FTlRJVFlfUkVGRVJFTkNFICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRU5USVRZX1JFRkVSRU5DRV9OT0RFKSByZXR1cm4gdHJ1ZVxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19FTlRJVFkgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTlRJVFlfTk9ERSkgcmV0dXJuIHRydWVcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfUFJPQ0VTU0lOR19JTlNUUlVDVElPTiAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLlBST0NFU1NJTkdfSU5TVFJVQ1RJT05fTk9ERSkgcmV0dXJuIHRydWVcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkNPTU1FTlRfTk9ERSkgcmV0dXJuIHRydWVcbiAgaWYgKHdoYXRUb1Nob3cgJiBOb2RlRmlsdGVyLlNIT1dfRE9DVU1FTlQgJiYgbm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5ET0NVTUVOVF9OT0RFKSByZXR1cm4gdHJ1ZVxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19ET0NVTUVOVF9UWVBFICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRE9DVU1FTlRfVFlQRV9OT0RFKSByZXR1cm4gdHJ1ZVxuICBpZiAod2hhdFRvU2hvdyAmIE5vZGVGaWx0ZXIuU0hPV19ET0NVTUVOVF9GUkFHTUVOVCAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpIHJldHVybiB0cnVlXG4gIGlmICh3aGF0VG9TaG93ICYgTm9kZUZpbHRlci5TSE9XX05PVEFUSU9OICYmIG5vZGUubm9kZVR5cGUgPT09IG5vZGUuTk9UQVRJT05fTk9ERSkgcmV0dXJuIHRydWVcbiAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBjbGFzcyBOb2RlSXRlcmF0b3Ige1xuICBjb25zdHJ1Y3RvciAocm9vdCwgd2hhdFRvU2hvdyA9IE5vZGVGaWx0ZXIuU0hPV19BTEwsIGZpbHRlciA9ICgpID0+IE5vZGVGaWx0ZXIuRklMVEVSX0FDQ0VQVCwgaW5jbHVkZVBhcmVudCA9IHRydWUpIHtcbiAgICB0aGlzLnJvb3QgPSBpbmNsdWRlUGFyZW50ID8geyBjaGlsZE5vZGVzOiBbIHJvb3QgXSB9IDogcm9vdFxuICAgIHRoaXMud2hhdFRvU2hvdyA9IHdoYXRUb1Nob3dcbiAgICB0aGlzLmZpbHRlciA9IGZpbHRlclxuICB9XG5cbiAgKiBbU3ltYm9sLml0ZXJhdG9yXSAoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLnJvb3QuY2hpbGROb2Rlc1xuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICBpZiAoIXNob3dUaGlzTm9kZSh0aGlzLndoYXRUb1Nob3csIG5vZGUpKSBjb250aW51ZVxuXG4gICAgICBjb25zdCBmaWx0ZXJSZXQgPSB0aGlzLmZpbHRlcihub2RlKVxuXG4gICAgICBpZiAoZmlsdGVyUmV0ID09PSBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1QpIGNvbnRpbnVlXG4gICAgICBpZiAoZmlsdGVyUmV0ID09PSBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQpIHtcbiAgICAgICAgeWllbGQgbm9kZVxuICAgICAgfVxuXG4gICAgICB5aWVsZCAqIG5ldyBOb2RlSXRlcmF0b3Iobm9kZSwgdGhpcy53aGF0VG9TaG93LCB0aGlzLmZpbHRlciwgZmFsc2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuIiwiaW1wb3J0IHsgQm94LCBOb0JveCB9IGZyb20gJy4uL290aGVyL0JveC5qcydcblxuZXhwb3J0IGNsYXNzIFBvaW50Q2xvdWQgZXh0ZW5kcyBBcnJheSB7XG4gIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmdzWzBdID09PSAnbnVtYmVyJykge1xuICAgICAgc3VwZXIoYXJncy5zaGlmdCgpKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlcigpXG4gICAgfVxuXG4gICAgLy8gZXhjZXB0IG11bHRpcGxlIHBvaW50IGFycmF5cyBhcyBpbnB1dCBhbmQgbWVyZ2UgdGhlbSBpbnRvIG9uZVxuICAgIGFyZ3MucmVkdWNlKChsYXN0LCBjdXJyKSA9PiB7XG4gICAgICBsYXN0LnB1c2goLi4uY3VycilcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSwgdGhpcylcbiAgfVxuXG4gIGJib3ggKCkge1xuICAgIGlmICghdGhpcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBuZXcgTm9Cb3goKVxuICAgIH1cblxuICAgIGxldCB4TWluID0gSW5maW5pdHlcbiAgICBsZXQgeE1heCA9IC1JbmZpbml0eVxuICAgIGxldCB5TWluID0gSW5maW5pdHlcbiAgICBsZXQgeU1heCA9IC1JbmZpbml0eVxuXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICB4TWluID0gTWF0aC5taW4oeE1pbiwgcC54KVxuICAgICAgeE1heCA9IE1hdGgubWF4KHhNYXgsIHAueClcbiAgICAgIHlNaW4gPSBNYXRoLm1pbih5TWluLCBwLnkpXG4gICAgICB5TWF4ID0gTWF0aC5tYXgoeU1heCwgcC55KVxuICAgIH0pXG5cbiAgICByZXR1cm4gbmV3IEJveChcbiAgICAgIHhNaW4sIHlNaW4sXG4gICAgICB4TWF4IC0geE1pbixcbiAgICAgIHlNYXggLSB5TWluXG4gICAgKVxuICB9XG5cbiAgbWVyZ2UgKGNsb3VkKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludENsb3VkKHRoaXMsIGNsb3VkKVxuICB9XG5cbiAgdHJhbnNmb3JtIChtKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludENsb3VkKHRoaXMubWFwKChwKSA9PiBwLnRyYW5zZm9ybShtKSkpXG4gIH1cblxufVxuIiwiaW1wb3J0ICogYXMgcGF0aFV0aWxzIGZyb20gJy4vcGF0aFV0aWxzLmpzJ1xuaW1wb3J0ICogYXMgcmVnZXggZnJvbSAnLi9yZWdleC5qcydcbmltcG9ydCAqIGFzIHRleHRVdGlscyBmcm9tICcuL3RleHRVdGlscy5qcydcbmltcG9ydCB7IE5vQm94IH0gZnJvbSAnLi4vb3RoZXIvQm94LmpzJ1xuaW1wb3J0IHsgTm9kZUl0ZXJhdG9yIH0gZnJvbSAnLi9Ob2RlSXRlcmF0b3IuanMnXG5pbXBvcnQgeyBOb2RlRmlsdGVyIH0gZnJvbSAnLi4vZG9tL05vZGVGaWx0ZXIuanMnXG5cbmNvbnN0IGFwcGx5VHJhbnNmb3JtYXRpb24gPSAoc2VnbWVudHMsIG5vZGUsIGFwcGx5VHJhbnNmb3JtYXRpb25zKSA9PiB7XG4gIGlmIChub2RlLm1hdHJpeGlmeSAmJiBhcHBseVRyYW5zZm9ybWF0aW9ucykge1xuICAgIHJldHVybiBzZWdtZW50cy50cmFuc2Zvcm0obm9kZS5tYXRyaXhpZnkoKSlcbiAgfVxuICByZXR1cm4gc2VnbWVudHNcbn1cblxuZXhwb3J0IGNvbnN0IGdldFNlZ21lbnRzID0gKG5vZGUsIGFwcGx5VHJhbnNmb3JtYXRpb25zLCByYm94ID0gZmFsc2UpID0+IHtcbiAgY29uc3Qgc2VnbWVudHMgPSBnZXRQYXRoU2VnbWVudHMobm9kZSwgcmJveClcbiAgcmV0dXJuIGFwcGx5VHJhbnNmb3JtYXRpb24oc2VnbWVudHMsIG5vZGUsIGFwcGx5VHJhbnNmb3JtYXRpb25zKVxufVxuXG5jb25zdCBnZXRQYXRoU2VnbWVudHMgPSAobm9kZSwgcmJveCkgPT4ge1xuICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSkgcmV0dXJuIG5ldyBwYXRoVXRpbHMuUGF0aFNlZ21lbnRBcnJheSgpXG5cbiAgc3dpdGNoIChub2RlLm5vZGVOYW1lKSB7XG4gIGNhc2UgJ3JlY3QnOlxuICBjYXNlICdpbWFnZSc6XG4gIGNhc2UgJ3BhdHRlcm4nOlxuICBjYXNlICdtYXNrJzpcbiAgY2FzZSAnZm9yZWlnbk9iamVjdCc6XG4gICAgLy8gQ3JlYXRlIFBhdGggZnJvbSByZWN0IGFuZCBjcmVhdGUgUG9pbnRDbG91ZCBmcm9tIFBhdGhcbiAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20ucmVjdChub2RlKSlcbiAgY2FzZSAnc3ZnJzpcbiAgY2FzZSAnc3ltYm9sJzpcbiAgICAvLyByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20ucmVjdChub2RlKSlcbiAgICBpZiAocmJveCkge1xuICAgICAgcmV0dXJuIHBhdGhVdGlscy5nZXRQYXRoU2VnbWVudHMocGF0aFV0aWxzLnBhdGhGcm9tLnJlY3Qobm9kZSkpXG4gICAgfVxuICAvLyBBVFRFTlRJT046IEZBTEwgVEhST1VHSFxuICAvLyBCZWNhdXNlIG5vcm1hbCBiYm94IGlzIGNhbGN1bGF0ZWQgYnkgdGhlIGNvbnRlbnQgb2YgdGhlIGVsZW1lbnQgYW5kIG5vdCBpdHMgd2lkdGggYW5kIGhlaWdodFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgY2FzZSAnZyc6XG4gIGNhc2UgJ2NsaXBQYXRoJzpcbiAgY2FzZSAnYSc6XG4gIGNhc2UgJ21hcmtlcic6XG4gICAgLy8gSXRlcmF0ZSB0cm91Z2ggYWxsIGNoaWxkcmVuIGFuZCBnZXQgdGhlIHBvaW50IGNsb3VkIG9mIGVhY2hcbiAgICAvLyBUaGVuIHRyYW5zZm9ybSBpdCB3aXRoIHZpZXdib3ggbWF0cml4IGlmIG5lZWRlZFxuICAgIHJldHVybiBub2RlLmNoaWxkTm9kZXMucmVkdWNlKChzZWdtZW50cywgY2hpbGQpID0+IHtcbiAgICAgIGlmICghY2hpbGQubWF0cml4aWZ5KSByZXR1cm4gc2VnbWVudHNcbiAgICAgIHJldHVybiBzZWdtZW50cy5tZXJnZShnZXRTZWdtZW50cyhjaGlsZCwgdHJ1ZSkudHJhbnNmb3JtKGNoaWxkLmdlbmVyYXRlVmlld0JveE1hdHJpeCgpKSlcbiAgICB9LCBuZXcgcGF0aFV0aWxzLlBhdGhTZWdtZW50QXJyYXkoKSlcbiAgY2FzZSAnY2lyY2xlJzpcbiAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20uY2lyY2xlKG5vZGUpKVxuICBjYXNlICdlbGxpcHNlJzpcbiAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhwYXRoVXRpbHMucGF0aEZyb20uZWxsaXBzZShub2RlKSlcbiAgY2FzZSAnbGluZSc6XG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRQYXRoU2VnbWVudHMocGF0aFV0aWxzLnBhdGhGcm9tLmxpbmUobm9kZSkpXG4gIGNhc2UgJ3BvbHlsaW5lJzpcbiAgY2FzZSAncG9seWdvbic6XG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRQYXRoU2VnbWVudHMocGF0aFV0aWxzLnBhdGhGcm9tLnBvbHlsaW5lKG5vZGUpKVxuICBjYXNlICdwYXRoJzpcbiAgY2FzZSAnZ2x5cGgnOlxuICBjYXNlICdtaXNzaW5nLWdseXBoJzpcbiAgICByZXR1cm4gcGF0aFV0aWxzLmdldFBhdGhTZWdtZW50cyhub2RlLmdldEF0dHJpYnV0ZSgnZCcpKVxuICBjYXNlICd1c2UnOiB7XG4gICAgLy8gR2V0IHJlZmVyZW5jZSBmcm9tIGVsZW1lbnRcbiAgICBjb25zdCByZWYgPSBub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCd4bGluazpocmVmJylcbiAgICAvLyBHZXQgdGhlIGFjdHVhbCByZWZlcmVuY2VkIE5vZGVcbiAgICBjb25zdCByZWZOb2RlID0gbm9kZS5nZXRSb290Tm9kZSgpLnF1ZXJ5U2VsZWN0b3IocmVmKVxuICAgIC8vIEdldCB0aGUgQkJveCBvZiB0aGUgcmVmZXJlbmNlZCBlbGVtZW50IGFuZCBhcHBseSB0aGUgdmlld2JveCBvZiA8dXNlPlxuICAgIC8vIFRPRE86IERvIHdlIG5lZWQgdG8gYXBwbHkgdGhlIHRyYW5zZm9ybWF0aW9ucyBvZiB0aGUgZWxlbWVudD9cbiAgICAvLyBDaGVjayBiYm94IG9mIHRyYW5zZm9ybWVkIGVsZW1lbnQgd2hpY2ggaXMgcmV1c2VkIHdpdGggPHVzZT5cbiAgICByZXR1cm4gZ2V0U2VnbWVudHMocmVmTm9kZSkudHJhbnNmb3JtKG5vZGUuZ2VuZXJhdGVWaWV3Qm94TWF0cml4KCkpXG4gIH1cbiAgY2FzZSAndHNwYW4nOlxuICBjYXNlICd0ZXh0JzpcbiAgY2FzZSAnYWx0R2x5cGgnOiB7XG4gICAgY29uc3QgYm94ID0gZ2V0VGV4dEJCb3gobm9kZSlcblxuICAgIGlmIChib3ggaW5zdGFuY2VvZiBOb0JveCkge1xuICAgICAgcmV0dXJuIG5ldyBwYXRoVXRpbHMuUGF0aFNlZ21lbnRBcnJheSgpXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhVdGlscy5nZXRQYXRoU2VnbWVudHMocGF0aFV0aWxzLnBhdGhGcm9tLmJveChib3gpKVxuICB9XG4gIGRlZmF1bHQ6XG4gICAgcmV0dXJuIG5ldyBwYXRoVXRpbHMuUGF0aFNlZ21lbnRBcnJheSgpXG4gIH1cbn1cblxuY29uc3QgZ2V0VGV4dEJCb3ggPSAobm9kZSkgPT4ge1xuICBjb25zdCB0ZXh0Um9vdCA9IGZpbmRUZXh0Um9vdChub2RlKVxuICBjb25zdCBib3hlcyA9IGdldFRleHRCQm94ZXMobm9kZSwgdGV4dFJvb3QpXG4gIHJldHVybiBib3hlcy5maWx0ZXIoaXNOb3RFbXB0eUJveCkucmVkdWNlKChsYXN0LCBjdXJyKSA9PiBsYXN0Lm1lcmdlKGN1cnIpLCBuZXcgTm9Cb3goKSlcbn1cblxuY29uc3QgZmluZFRleHRSb290ID0gKG5vZGUpID0+IHtcbiAgd2hpbGUgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgIGlmICgobm9kZS5ub2RlTmFtZSA9PT0gJ3RleHQnICYmIG5vZGUucGFyZW50Tm9kZS5ub2RlTmFtZSA9PT0gJ3RleHQnKVxuICAgIHx8ICgobm9kZS5ub2RlTmFtZSA9PT0gJ3RzcGFuJyB8fCBub2RlLm5vZGVOYW1lID09PSAndGV4dFBhdGgnKSAmJiBbICd0c3BhbicsICd0ZXh0JywgJ3RleHRQYXRoJyBdLmluY2x1ZGVzKG5vZGUucGFyZW50Tm9kZS5ub2RlTmFtZSkpKSB7XG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlXG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5vZGVcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiB0YWtlcyBhIG5vZGUgb2Ygd2hpY2ggdGhlIGJib3ggbmVlZHMgdG8gYmUgY2FsY3VsYXRlZFxuLy8gSW4gb3JkZXIgdG8gcG9zaXRpb24gdGhlIGJveCBjb3JyZWN0bHksIHdlIG5lZWQgdG8ga25vdyB3ZXJlIHRoZSBwYXJlbnQgYW5kIHdlcmUgdGhlIHNpYmxpbmdzICpiZWZvcmUqIG91ciBub2RlIGFyZVxuLy8gVGhhdHMgd2h5IGEgdGV4dFJvb3QgaXMgcGFzc2VkIHdoaWNoIGlzIHRoZSBtb3N0IG91dGVyIHRleHRFbGVtZW50IG5lZWRlZCB0byBjYWxjdWxhdGUgYWxsIGJveGVzXG4vLyBXaGVuIHRoZSBpdGVyYXRvciBoaXRzIHRoZSBlbGVtZW50IHdlIG5lZWQgdGhlIGJib3ggb2YsIGl0IGlzIHRlcm1pbmF0ZWQgYW5kIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGFnYWluXG4vLyBvbmx5IGZvciB0aGUgc3Vic3RyZWUgb2Ygb3VyIG5vZGUgYW5kIHdpdGhvdXQgdGV4dFJvb3IgYnV0IGluc3RlYWQgcG9zLCBkeCBhbmQgZHkgYXJlIGtub3duXG5jb25zdCBnZXRUZXh0QkJveGVzID0gZnVuY3Rpb24gKHRhcmdldCwgdGV4dFJvb3QgPSB0YXJnZXQsIHBvcyA9IHsgeDogMCwgeTogMCB9LCBkeCA9IFsgMCBdLCBkeSA9IFsgMCBdLCBib3hlcyA9IFtdKSB7XG5cbiAgLy8gQ3JlYXRlIE5vZGVJdGVyYXRvci4gT25seSBzaG93IGVsZW1udHMgYW5kIHRleHQgYW5kIHNraXAgZGVzY3JpcHRpdmUgZWxlbWVudHNcbiAgLy8gVE9ETzogbWFrZSBhbiBpbnN0YW5jZW9mIGNoZWNrIGZvciBEZXNjcmlwdGl2ZUVsZW1lbnQgaW5zdGVhZCBvZiB0ZXN0aW5nIG9uZSBieSBvbmVcbiAgLy8gT25seSB0aXRsZSBpcyBza2lwcGVkIGF0bVxuICBjb25zdCBpdGVyID0gbmV3IE5vZGVJdGVyYXRvcih0ZXh0Um9vdCwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQgfCBOb2RlRmlsdGVyLlNIT1dfVEVYVCwgKG5vZGUpID0+IHtcbiAgICBpZiAobm9kZS5ub2RlTmFtZSA9PT0gJ3RpdGxlJykgcmV0dXJuIE5vZGVGaWx0ZXIuRklMVEVSX0lHTk9SRVxuICAgIHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFRcbiAgfSlcblxuICAvLyBJdGVyYXRlIHRyb3VnaCBhbGwgbm9kZXMgdG9wIHRvIGJvdHRvbSwgbGVmdCB0byByaWdodFxuICBmb3IgKGNvbnN0IG5vZGUgb2YgaXRlcikge1xuXG4gICAgLy8gSWYgd2UgaGl0IG91ciB0YXJnZXQsIHdlIGdhdGhlcmVkIGFsbCBwb3NpdGlvbmFsIGluZm9ybWF0aW9uIHdlIG5lZWQgdG8gbW92ZSB0aGUgYmJveCB0byB0aGUgY29ycmVjdCBzcG90XG4gICAgaWYgKG5vZGUgPT09IHRhcmdldCAmJiBub2RlICE9PSB0ZXh0Um9vdCkge1xuICAgICAgcmV0dXJuIGdldFRleHRCQm94ZXMobm9kZSwgbm9kZSwgcG9zLCBkeCwgZHkpXG4gICAgfVxuXG4gICAgLy8gVHJhdmVyc2UgdHJvdWdoIHRoaXMgbm9kZSB1cGRhdGluZyBwb3NpdGlvbnMgYW5kIGFkZCBib3hlc1xuICAgIGdldFBvc2l0aW9uRGV0YWlsc0Zvcihub2RlLCBwb3MsIGR4LCBkeSwgYm94ZXMpXG4gIH1cblxuICByZXR1cm4gYm94ZXNcbn1cblxuY29uc3QgaXNOb3RFbXB0eUJveCA9IGJveCA9PiBib3gueCAhPT0gMCB8fCBib3gueSAhPT0gMCB8fCBib3gud2lkdGggIT09IDAgfHwgYm94LmhlaWdodCAhPT0gMFxuXG4vLyBUaGlzIGZ1bmN0aW9uIGVpdGhlciB1cGRhdGVzIHBvcywgZHggYW5kIGR5ICh3aGVuIGl0cyBhbiBlbGVtZW50KSBvciBjYWxjdWxhdGVzIHRoZSBib3hlcyBmb3IgdGV4dCB3aXRoIHRoZSBwYXNzZWQgYXJndW1lbnRzXG4vLyBBbGwgYXJndW1lbnRzIGFyZSBwYXNzZWQgYnkgcmVmZXJlbmNlIHNvIGRvbnQgb3ZlcndyaXRlIHRoZW0gKHRyZWF0IHRoZW0gYXMgY29uc3QhKVxuLy8gVE9ETzogQnJlYWsgdGhpcyBpbnRvIHR3byBmdW5jdGlvbnM/XG5jb25zdCBnZXRQb3NpdGlvbkRldGFpbHNGb3IgPSAobm9kZSwgcG9zLCBkeCwgZHksIGJveGVzKSA9PiB7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSBub2RlLkVMRU1FTlRfTk9ERSkge1xuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd4JykpXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3knKSlcblxuICAgIHBvcy54ID0gaXNOYU4oeCkgPyBwb3MueCA6IHhcbiAgICBwb3MueSA9IGlzTmFOKHkpID8gcG9zLnkgOiB5XG5cbiAgICBjb25zdCBkeDAgPSAobm9kZS5nZXRBdHRyaWJ1dGUoJ2R4JykgfHwgJycpLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikuZmlsdGVyKG51bSA9PiBudW0gIT09ICcnKS5tYXAocGFyc2VGbG9hdClcbiAgICBjb25zdCBkeTAgPSAobm9kZS5nZXRBdHRyaWJ1dGUoJ2R5JykgfHwgJycpLnNwbGl0KHJlZ2V4LmRlbGltaXRlcikuZmlsdGVyKG51bSA9PiBudW0gIT09ICcnKS5tYXAocGFyc2VGbG9hdClcblxuICAgIC8vIFRPRE86IGV2ZW50dWFsbHkgcmVwbGFjZSBvbmx5IGFzIG11Y2ggdmFsdWVzIGFzIHdlIGhhdmUgdGV4dCBjaGFycyAobm9kZS50ZXh0Q29udGVudC5sZW5ndGgpIGJlY2F1c2Ugd2UgY291bGQgZW5kIHVwIGFkZGluZyB0byBtdWNoXG4gICAgLy8gcmVwbGFjZSBpbml0aWFsIHZhbHVlcyB3aXRoIG5vZGUgdmFsdWVzIGlmIHByZXNlbnRcbiAgICBkeC5zcGxpY2UoMCwgZHgwLmxlbmd0aCwgLi4uZHgwKVxuICAgIGR5LnNwbGljZSgwLCBkeTAubGVuZ3RoLCAuLi5keTApXG4gIH0gZWxzZSB7XG4gICAgLy8gZ2V0IHRleHQgZGF0YVxuICAgIGNvbnN0IGRhdGEgPSBub2RlLmRhdGFcblxuICAgIGxldCBqID0gMFxuICAgIGNvbnN0IGpsID0gZGF0YS5sZW5ndGhcbiAgICBjb25zdCBkZXRhaWxzID0gZ2V0Rm9udERldGFpbHMobm9kZSlcblxuICAgIC8vIGlmIGl0IGlzIG1vcmUgdGhhbiBvbmUgZHgvZHkgc2luZ2xlIGxldHRlcnMgYXJlIG1vdmVkIGJ5IHRoZSBhbW91bnQgKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvZHgpXG4gICAgaWYgKGR5Lmxlbmd0aCB8fCBkeC5sZW5ndGgpIHtcbiAgICAgIGZvciAoO2ogPCBqbDsgaisrKSB7XG4gICAgICAgIC8vIENhbGN1bGF0ZSBhIGJveCBmb3IgYSBzaW5nbGUgbGV0dGVyXG4gICAgICAgIGJveGVzLnB1c2godGV4dFV0aWxzLnRleHRCQm94KGRhdGEuc3Vic3RyKGosIDEpLCBwb3MueCwgcG9zLnksIGRldGFpbHMpKVxuXG4gICAgICAgIC8vIEFkZCB0aGUgbmV4dCBwb3NpdGlvbiB0byBjdXJyZW50IG9uZVxuICAgICAgICBwb3MueCArPSBkeC5zaGlmdCgpIHx8IDBcbiAgICAgICAgcG9zLnkgKz0gZHkuc2hpZnQoKSB8fCAwXG5cbiAgICAgICAgaWYgKCFkeS5sZW5ndGggJiYgIWR4Lmxlbmd0aCkgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbiBjYXNlIGl0IHdhcyBvbmx5IG9uZSBkeC9keSBvciBubyBtb3JlIGR4L2R5IG1vdmUgdGhlIHJlc3Qgb2YgdGhlIHRleHRcbiAgICBib3hlcy5wdXNoKHRleHRVdGlscy50ZXh0QkJveChkYXRhLnN1YnN0cihqKSwgcG9zLngsIHBvcy55LCBkZXRhaWxzKSlcbiAgICBwb3MueCArPSBib3hlc1tib3hlcy5sZW5ndGggLSAxXS53aWR0aFxuICB9XG59XG5cbi8qXG4vLyB0aGlzIGZ1bmN0aW9uIGlzIHBhc3NpbmcgZHggYW5kIGR5IHZhbHVlcyBieSByZWZlcmVuY2VzLiBEb250IGFzc2lnbiBuZXcgdmFsdWVzIHRvIGl0XG5jb25zdCB0ZXh0SXRlcmF0b3IgPSBmdW5jdGlvbiAobm9kZSwgcG9zID0geyB4OiAwLCB5OiAwIH0sIGR4ID0gWyAwIF0sIGR5ID0gWyAwIF0pIHtcblxuICB2YXIgeCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3gnKSlcbiAgdmFyIHkgPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd5JykpXG5cbiAgcG9zLnggPSBpc05hTih4KSA/IHBvcy54IDogeFxuICBwb3MueSA9IGlzTmFOKHkpID8gcG9zLnkgOiB5XG5cbiAgdmFyIGR4MCA9IChub2RlLmdldEF0dHJpYnV0ZSgnZHgnKSB8fCAnJykuc3BsaXQocmVnZXguZGVsaW1pdGVyKS5maWx0ZXIobnVtID0+IG51bSAhPT0gJycpLm1hcChwYXJzZUZsb2F0KVxuICB2YXIgZHkwID0gKG5vZGUuZ2V0QXR0cmlidXRlKCdkeScpIHx8ICcnKS5zcGxpdChyZWdleC5kZWxpbWl0ZXIpLmZpbHRlcihudW0gPT4gbnVtICE9PSAnJykubWFwKHBhcnNlRmxvYXQpXG4gIHZhciBib3hlcyA9IFtdXG4gIHZhciBkYXRhID0gJydcblxuICAvLyBUT0RPOiBldmVudHVhbGx5IHJlcGxhY2Ugb25seSBhcyBtdWNoIHZhbHVlcyBhcyB3ZSBoYXZlIHRleHQgY2hhcnMgKG5vZGUudGV4dENvbnRlbnQubGVuZ3RoKSBiZWNhdXNlIHdlIGNvdWxkIGVuZCB1cCBhZGRpbmcgdG8gbXVjaFxuICAvLyByZXBsYWNlIGluaXRpYWwgdmFsdWVzIHdpdGggbm9kZSB2YWx1ZXMgaWYgcHJlc2VudFxuICBkeC5zcGxpY2UoMCwgZHgwLmxlbmd0aCwgLi4uZHgwKVxuICBkeS5zcGxpY2UoMCwgZHkwLmxlbmd0aCwgLi4uZHkwKVxuXG4gIHZhciBpID0gMFxuICB2YXIgaWwgPSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoXG5cbiAgLy8gaXRlcmF0ZSB0aHJvdWdoIGFsbCBjaGlsZHJlblxuICBmb3IgKDsgaSA8IGlsOyArK2kpIHtcblxuICAgIC8vIHNoaWZ0IG5leHQgY2hpbGRcbiAgICBwb3MueCArPSBkeC5zaGlmdCgpIHx8IDBcbiAgICBwb3MueSArPSBkeS5zaGlmdCgpIHx8IDBcblxuICAgIC8vIHRleHRcbiAgICBpZiAobm9kZS5jaGlsZE5vZGVzW2ldLm5vZGVUeXBlID09PSBub2RlLlRFWFRfTk9ERSkge1xuXG4gICAgICAvLyBnZXQgdGV4dCBkYXRhXG4gICAgICBkYXRhID0gbm9kZS5jaGlsZE5vZGVzW2ldLmRhdGFcblxuICAgICAgbGV0IGogPSAwXG4gICAgICBjb25zdCBqbCA9IGRhdGEubGVuZ3RoXG5cbiAgICAgIC8vIGlmIGl0IGlzIG1vcmUgdGhhbiBvbmUgZHgvZHkgc2luZ2xlIGxldHRlcnMgYXJlIG1vdmVkIGJ5IHRoZSBhbW91bnQgKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvZHgpXG4gICAgICBpZiAoZHkubGVuZ3RoIHx8IGR4Lmxlbmd0aCkge1xuICAgICAgICBmb3IgKDtqIDwgamw7IGorKykge1xuICAgICAgICAgIGJveGVzLnB1c2godGV4dFV0aWxzLnRleHRCQm94KGRhdGEuc3Vic3RyKGosIDEpLCBwb3MueCwgcG9zLnksIGdldEZvbnREZXRhaWxzKG5vZGUpKSlcblxuICAgICAgICAgIHBvcy54ICs9IGR4LnNoaWZ0KCkgfHwgMFxuICAgICAgICAgIHBvcy55ICs9IGR5LnNoaWZ0KCkgfHwgMFxuXG4gICAgICAgICAgaWYgKCFkeS5sZW5ndGggJiYgIWR4Lmxlbmd0aCkgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBpbiBjYXNlIGl0IHdhcyBvbmx5IG9uZSBkeC9keSBvciBubyBtb3JlIGR4L2R5IG1vdmUgdGhlIHJlc3Qgb2YgdGhlIHRleHRcblxuICAgICAgYm94ZXMucHVzaCh0ZXh0VXRpbHMudGV4dEJCb3goZGF0YS5zdWJzdHIoaiksIHBvcy54LCBwb3MueSwgZ2V0Rm9udERldGFpbHMobm9kZSkpKVxuICAgICAgcG9zLnggKz0gYm94ZXNbYm94ZXMubGVuZ3RoIC0gMV0ud2lkdGhcblxuICAgIC8vIGVsZW1lbnRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaW4gY2FzZSBvZiBlbGVtZW50LCByZWN1cnNpdmVseSBjYWxsIGZ1bmN0aW9uIGFnYWluIHdpdGggbmV3IHN0YXJ0IHZhbHVlc1xuICAgICAgYm94ZXMgPSBib3hlcy5jb25jYXQodGV4dEl0ZXJhdG9yKG5vZGUuY2hpbGROb2Rlc1tpXSwgcG9zLCBkeCwgZHkpKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBib3hlc1xufSAqL1xuXG5jb25zdCBnZXRGb250RGV0YWlscyA9IChub2RlKSA9PiB7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSBub2RlLlRFWFRfTk9ERSkgbm9kZSA9IG5vZGUucGFyZW50Tm9kZVxuXG4gIGxldCBmb250U2l6ZSA9IG51bGxcbiAgbGV0IGZvbnRGYW1pbHkgPSBudWxsXG4gIGxldCB0ZXh0QW5jaG9yID0gbnVsbFxuICBsZXQgZG9taW5hbnRCYXNlbGluZSA9IG51bGxcblxuICBjb25zdCB0ZXh0Q29udGVudEVsZW1lbnRzID0gW1xuICAgICd0ZXh0JyxcbiAgICAndHNwYW4nLFxuICAgICd0cmVmJyxcbiAgICAndGV4dFBhdGgnLFxuICAgICdhbHRHbHlwaCcsXG4gICAgJ2cnXG4gIF1cblxuICBkbyB7XG4gICAgLy8gVE9ETzogc3RvcCBvblxuICAgIGlmICghZm9udFNpemUpIHsgZm9udFNpemUgPSBub2RlLnN0eWxlLmZvbnRTaXplIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCdmb250LXNpemUnKSB9XG4gICAgaWYgKCFmb250RmFtaWx5KSB7IGZvbnRGYW1pbHkgPSBub2RlLnN0eWxlLmZvbnRGYW1pbHkgfHwgbm9kZS5nZXRBdHRyaWJ1dGUoJ2ZvbnQtZmFtaWx5JykgfVxuICAgIGlmICghdGV4dEFuY2hvcikgeyB0ZXh0QW5jaG9yID0gbm9kZS5zdHlsZS50ZXh0QW5jaG9yIHx8IG5vZGUuZ2V0QXR0cmlidXRlKCd0ZXh0LWFuY2hvcicpIH1cbiAgICBpZiAoIWRvbWluYW50QmFzZWxpbmUpIHsgZG9taW5hbnRCYXNlbGluZSA9IG5vZGUuc3R5bGUuZG9taW5hbnRCYXNlbGluZSB8fCBub2RlLmdldEF0dHJpYnV0ZSgnZG9taW5hbnQtYmFzZWxpbmUnKSB9XG4gICAgLy8gVE9ETzogY2hlY2sgZm9yIGFsaWdubWVudC1iYXNlbGluZSBpbiB0c3BhbiwgdHJlZiwgdGV4dFBhdGgsIGFsdEdseXBoXG4gICAgLy8gVE9ETzogYWxpZ25tZW50LWFkanVzdCwgYmFzZWxpbmUtc2hpZnRcbiAgICAvKlxuICAgIGlmKCFhbGlnbm1lbnRCYXNlbGluZSlcbiAgICBhbGlnbm1lbnRCYXNlbGluZSA9IHRoaXMuc3R5bGUuYWxpZ25tZW50QmFzZWxpbmUgfHwgdGhpcy5nZXRBdHRyaWJ1dGUoJ2FsaWdubWVudC1iYXNlbGluZScpXG4gICAgKi9cblxuICB9IHdoaWxlIChcbiAgICAobm9kZSA9IG5vZGUucGFyZW50Tm9kZSlcbiAgICAmJiBub2RlLm5vZGVUeXBlID09PSBub2RlLkVMRU1FTlRfTk9ERVxuICAgICYmICh0ZXh0Q29udGVudEVsZW1lbnRzLmluY2x1ZGVzKG5vZGUubm9kZU5hbWUpKVxuICApXG5cbiAgcmV0dXJuIHtcbiAgICBmb250RmFtaWx5LFxuICAgIGZvbnRTaXplLFxuICAgIHRleHRBbmNob3I6IHRleHRBbmNob3IgfHwgJ3N0YXJ0JyxcbiAgICAvLyBUT0RPOiB1c2UgY2VudHJhbCBmb3Igd3JpdGluZy1tb2RlID09PSBob3Jpem9udGFsIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvZG9taW5hbnQtYmFzZWxpbmVcbiAgICBkb21pbmFudEJhc2VsaW5lOiBkb21pbmFudEJhc2VsaW5lIHx8ICdhbHBoYWJldGljYWwnXG4gICAgLy8gZm9udEZhbWlseU1hcHBpbmdzOiB0aGlzLm93bmVyRG9jdW1lbnQuZm9udEZhbWlseU1hcHBpbmdzLFxuICAgIC8vIGZvbnREaXI6IHRoaXMub3duZXJEb2N1bWVudC5mb250RGlyLFxuICAgIC8vIHByZWxvYWRlZDogdGhpcy5vd25lckRvY3VtZW50Ll9wcmVsb2FkZWRcbiAgfVxufVxuIiwiaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnXG4vLyBpbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJ1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBfX2Rpcm5hbWUgfSBmcm9tICcuL2Rpcm5hbWUuY2pzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbi8vIHVzZSB0aGlzIGFzIHNvb24gYXMgaW1wb3J0Lm1ldGEgaXMgc3RhbmRhcmRpemVkXG4vLyBjb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XG5cbmV4cG9ydCBjb25zdCBmb250U2l6ZSA9IDE2XG5leHBvcnQgY29uc3QgZm9udEZhbWlseSA9ICdzYW5zLXNlcmlmJ1xuZXhwb3J0IGNvbnN0IGZvbnREaXIgPSBqb2luKF9fZGlybmFtZSwgJy4uLy4uLycsICdmb250cy8nKVxuZXhwb3J0IGNvbnN0IGZvbnRGYW1pbHlNYXBwaW5ncyA9IHtcbiAgJ3NhbnMtc2VyaWYnOiAnT3BlblNhbnMtUmVndWxhci50dGYnLFxuICAnT3BlbiBTYW5zJzogJ09wZW5TYW5zLVJlZ3VsYXIudHRmJ1xufVxuIiwiaW1wb3J0IHsgZGVjYW1lbGl6ZSB9IGZyb20gJy4uL3V0aWxzL3N0clV0aWxzLmpzJ1xuXG5leHBvcnQgY29uc3Qgb2JqZWN0VG9NYXAgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmIChvYmogaW5zdGFuY2VvZiBNYXApIHJldHVybiBuZXcgTWFwKG9iailcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChtYXAsIGtleSkgPT4gbWFwLnNldChrZXksIG9ialtrZXldKSwgbmV3IE1hcCgpKVxufVxuXG5leHBvcnQgY29uc3QgbWFwVG9PYmplY3QgPSBmdW5jdGlvbiAobWFwKSB7XG4gIHZhciBvYmogPSB7fVxuICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIG9ialtrZXldID0gdmFsdWVcbiAgfSlcbiAgcmV0dXJuIG9ialxufVxuXG5leHBvcnQgY29uc3QgbWFwTWFwID0gZnVuY3Rpb24gKG1hcCwgY2IpIHtcbiAgdmFyIGFyciA9IFtdXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgYXJyLnB1c2goY2IodmFsdWUsIGtleSkpXG4gIH0pXG4gIHJldHVybiBhcnJcbn1cblxuZXhwb3J0IGNvbnN0IG1hcFRvQ3NzID0gZnVuY3Rpb24gKG15TWFwKSB7XG4gIHJldHVybiBtYXBNYXAobXlNYXAsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlXG4gICAgcmV0dXJuIGRlY2FtZWxpemUoa2V5KSArICc6ICcgKyB2YWx1ZVxuICB9KS5maWx0ZXIoZnVuY3Rpb24gKGVsKSB7IHJldHVybiAhIWVsIH0pLmpvaW4oJzsgJykgKyAnOycgfHwgbnVsbFxufVxuXG5leHBvcnQgY29uc3QgY3NzVG9NYXAgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIHJldHVybiBuZXcgTWFwKGNzcy5zcGxpdCgvXFxzKjtcXHMqLykuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gISFlbCB9KS5tYXAoZnVuY3Rpb24gKGVsKSB7XG4gICAgcmV0dXJuIGVsLnNwbGl0KC9cXHMqOlxccyovKVxuICB9KSlcbn1cbiIsIlxuZXhwb3J0IGNvbnN0IHN2ZyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcbmV4cG9ydCBjb25zdCB4bGluayA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJ1xuZXhwb3J0IGNvbnN0IGh0bWwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCdcbmV4cG9ydCBjb25zdCBtYXRobWwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCdcbmV4cG9ydCBjb25zdCB4bWwgPSAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJ1xuZXhwb3J0IGNvbnN0IHhtbG5zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvJ1xuIiwiZXhwb3J0IGNvbnN0IG5vZGVzVG9Ob2RlID0gKG5vZGVzLCBkb2N1bWVudCkgPT4ge1xuICBub2RlcyA9IG5vZGVzLm1hcCgobm9kZSkgPT4ge1xuICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKVxuICAgIH1cbiAgICByZXR1cm4gbm9kZVxuICB9KVxuICBpZiAobm9kZXMubGVuZ3RoID09PSAxKSB7IHJldHVybiBub2Rlc1swXSB9XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgbm9kZXMuZm9yRWFjaChub2RlLmFwcGVuZENoaWxkLCBub2RlKVxuICByZXR1cm4gbm9kZVxufVxuIiwiZXhwb3J0IGNvbnN0IGV4dGVuZCA9ICguLi5tb2R1bGVzKSA9PiB7XG4gIHZhciBtZXRob2RzLCBrZXksIGlcblxuICAvLyBHZXQgb2JqZWN0IHdpdGggZXh0ZW5zaW9uc1xuICBtZXRob2RzID0gbW9kdWxlcy5wb3AoKVxuXG4gIGZvciAoaSA9IG1vZHVsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBmb3IgKGtleSBpbiBtZXRob2RzKSB7IG1vZHVsZXNbaV0ucHJvdG90eXBlW2tleV0gPSBtZXRob2RzW2tleV0gfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBleHRlbmRTdGF0aWMgPSAoLi4ubW9kdWxlcykgPT4ge1xuICB2YXIgbWV0aG9kcywga2V5LCBpXG5cbiAgLy8gR2V0IG9iamVjdCB3aXRoIGV4dGVuc2lvbnNcbiAgbWV0aG9kcyA9IG1vZHVsZXMucG9wKClcblxuICBmb3IgKGkgPSBtb2R1bGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgZm9yIChrZXkgaW4gbWV0aG9kcykgeyBtb2R1bGVzW2ldW2tleV0gPSBtZXRob2RzW2tleV0gfVxuICB9XG59XG5cbi8vIFRPRE86IHJlZmFjdG9yIHNvIHRoYXQgaXQgdGFrZXMgYSBjbGFzc1xuZXhwb3J0IGNvbnN0IG1peGluID0gKG1peGluLCBfY2xhc3MpID0+IHtcbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhtaXhpbilcbiAgLy8gY29uc3QgYWxsID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobWl4aW4pXG5cbiAgLy8gY29uc3QgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMoZGVzY3JpcHRvcnMpXG4gIC8vIGNvbnN0IG1ldGhvZE5hbWVzID0gYWxsLmZpbHRlcihwID0+ICFwcm9wTmFtZXMuaW5jbHVkZXMocCkpXG5cbiAgLy8gZm9yIChjb25zdCBtZXRob2Qgb2YgbWV0aG9kTmFtZXMpIHtcbiAgLy8gICBfY2xhc3MucHJvdG90eXBlW21ldGhvZF0gPSBtaXhpblttZXRob2RdXG4gIC8vIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhfY2xhc3MucHJvdG90eXBlLCBkZXNjcmlwdG9ycylcbn1cbiIsImltcG9ydCB7IEJveCwgTm9Cb3ggfSBmcm9tICcuLi9vdGhlci9Cb3guanMnXG5pbXBvcnQgeyBQb2ludCB9IGZyb20gJy4uL290aGVyL1BvaW50LmpzJ1xuaW1wb3J0ICogYXMgcmVnZXggZnJvbSAnLi9yZWdleC5qcydcbi8vIFRPRE86IHVzZSBvd24gbWF0cml4IGltcGxlbWVudGF0aW9uXG5pbXBvcnQgeyBtYXRyaXhGYWN0b3J5IH0gZnJvbSAnLi8uLi9kb20vc3ZnL1NWR01hdHJpeC5qcydcbmltcG9ydCB7IFBvaW50Q2xvdWQgfSBmcm9tICcuL1BvaW50Q2xvdWQuanMnXG5cbmNvbnN0IHBhdGhIYW5kbGVycyA9IHtcbiAgTSAoYywgcCwgciwgcDApIHtcbiAgICBwLnggPSBwMC54ID0gY1swXVxuICAgIHAueSA9IHAwLnkgPSBjWzFdXG5cbiAgICByZXR1cm4gbmV3IE1vdmUocClcbiAgfSxcbiAgTCAoYywgcCkge1xuICAgIGNvbnN0IHJldCA9IG5ldyBMaW5lKHAueCwgcC55LCBjWzBdLCBjWzFdKS8vIC5vZmZzZXQobylcbiAgICBwLnggPSBjWzBdXG4gICAgcC55ID0gY1sxXVxuICAgIHJldHVybiByZXRcbiAgfSxcbiAgSCAoYywgcCkge1xuICAgIHJldHVybiBwYXRoSGFuZGxlcnMuTChbIGNbMF0sIHAueSBdLCBwKVxuICB9LFxuICBWIChjLCBwKSB7XG4gICAgcmV0dXJuIHBhdGhIYW5kbGVycy5MKFsgcC54LCBjWzBdIF0sIHApXG4gIH0sXG4gIFEgKGMsIHAsIHIpIHtcbiAgICBjb25zdCByZXQgPSBDdWJpYy5mcm9tUXVhZChwLCBuZXcgUG9pbnQoY1swXSwgY1sxXSksIG5ldyBQb2ludChjWzJdLCBjWzNdKSkvLyAub2Zmc2V0KG8pXG4gICAgcC54ID0gY1syXVxuICAgIHAueSA9IGNbM11cblxuICAgIGNvbnN0IHJlZmxlY3QgPSBuZXcgUG9pbnQoY1swXSwgY1sxXSkucmVmbGVjdEF0KHApXG4gICAgci54ID0gcmVmbGVjdC54XG4gICAgci55ID0gcmVmbGVjdC55XG5cbiAgICByZXR1cm4gcmV0XG4gIH0sXG4gIFQgKGMsIHAsIHIsIHAwLCByZWZsZWN0aW9uSXNQb3NzaWJsZSkge1xuICAgIGlmIChyZWZsZWN0aW9uSXNQb3NzaWJsZSkgeyBjID0gWyByLngsIHIueSBdLmNvbmNhdChjKSB9IGVsc2UgeyBjID0gWyBwLngsIHAueSBdLmNvbmNhdChjKSB9XG4gICAgcmV0dXJuIHBhdGhIYW5kbGVycy5RKGMsIHAsIHIpXG4gIH0sXG4gIEMgKGMsIHAsIHIpIHtcbiAgICBjb25zdCByZXQgPSBuZXcgQ3ViaWMocCwgbmV3IFBvaW50KGNbMF0sIGNbMV0pLCBuZXcgUG9pbnQoY1syXSwgY1szXSksIG5ldyBQb2ludChjWzRdLCBjWzVdKSkvLyAub2Zmc2V0KG8pXG4gICAgcC54ID0gY1s0XVxuICAgIHAueSA9IGNbNV1cbiAgICBjb25zdCByZWZsZWN0ID0gbmV3IFBvaW50KGNbMl0sIGNbM10pLnJlZmxlY3RBdChwKVxuICAgIHIueCA9IHJlZmxlY3QueFxuICAgIHIueSA9IHJlZmxlY3QueVxuICAgIHJldHVybiByZXRcbiAgfSxcbiAgUyAoYywgcCwgciwgcDAsIHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKSB7XG4gICAgLy8gcmVmbGVjdGlvbiBtYWtlcyBvbmx5IHNlbnNlIGlmIHRoaXMgY29tbWFuZCB3YXMgcHJlY2VlZGVkIGJ5IGFub3RoZXIgYmV6aWVyZSBjb21tYW5kIChRVFNDKVxuICAgIGlmIChyZWZsZWN0aW9uSXNQb3NzaWJsZSkgeyBjID0gWyByLngsIHIueSBdLmNvbmNhdChjKSB9IGVsc2UgeyBjID0gWyBwLngsIHAueSBdLmNvbmNhdChjKSB9XG4gICAgcmV0dXJuIHBhdGhIYW5kbGVycy5DKGMsIHAsIHIpXG4gIH0sXG4gIFogKGMsIHAsIHIsIHAwKSB7XG4gICAgLy8gRklYTUU6IFRoZSBiZWhhdmlvciBvZiBaIGRlcGVuZHMgb24gdGhlIGNvbW1hbmQgYmVmb3JlXG4gICAgcmV0dXJuIHBhdGhIYW5kbGVycy5MKFsgcDAueCwgcDAueSBdLCBwKVxuICB9LFxuICBBIChjLCBwLCByKSB7XG4gICAgY29uc3QgcmV0ID0gbmV3IEFyYyhwLCBuZXcgUG9pbnQoY1s1XSwgY1s2XSksIGNbMF0sIGNbMV0sIGNbMl0sIGNbM10sIGNbNF0pXG4gICAgcC54ID0gY1s1XVxuICAgIHAueSA9IGNbNl1cbiAgICByZXR1cm4gcmV0XG4gIH1cbn1cblxuY29uc3QgbWxodnF0Y3NhID0gJ21saHZxdGNzYXonLnNwbGl0KCcnKVxuXG5mb3IgKGxldCBpID0gMCwgaWwgPSBtbGh2cXRjc2EubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICBwYXRoSGFuZGxlcnNbbWxodnF0Y3NhW2ldXSA9IChmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYywgcCwgciwgcDAsIHJlZmxlY3Rpb25Jc1Bvc3NpYmxlKSB7XG4gICAgICBpZiAoaSA9PT0gJ0gnKSBjWzBdID0gY1swXSArIHAueFxuICAgICAgZWxzZSBpZiAoaSA9PT0gJ1YnKSBjWzBdID0gY1swXSArIHAueVxuICAgICAgZWxzZSBpZiAoaSA9PT0gJ0EnKSB7XG4gICAgICAgIGNbNV0gPSBjWzVdICsgcC54XG4gICAgICAgIGNbNl0gPSBjWzZdICsgcC55XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgamwgPSBjLmxlbmd0aDsgaiA8IGpsOyArK2opIHtcbiAgICAgICAgICBjW2pdID0gY1tqXSArIChqICUgMiA/IHAueSA6IHAueClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGF0aEhhbmRsZXJzW2ldKGMsIHAsIHIsIHAwLCByZWZsZWN0aW9uSXNQb3NzaWJsZSlcbiAgICB9XG4gIH0pKG1saHZxdGNzYVtpXS50b1VwcGVyQ2FzZSgpKVxufVxuXG5mdW5jdGlvbiBwYXRoUmVnUmVwbGFjZSAoYSwgYiwgYywgZCkge1xuICByZXR1cm4gYyArIGQucmVwbGFjZShyZWdleC5kb3RzLCAnIC4nKVxufVxuXG5mdW5jdGlvbiBpc0JlemllcmUgKG9iaikge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgQ3ViaWNcbn1cblxuZXhwb3J0IGNvbnN0IHBhdGhQYXJzZXIgPSAoYXJyYXkpID0+IHtcblxuICAvLyBwcmVwYXJlIGZvciBwYXJzaW5nXG4gIGNvbnN0IHBhcmFtQ250ID0geyBNOiAyLCBMOiAyLCBIOiAxLCBWOiAxLCBDOiA2LCBTOiA0LCBROiA0LCBUOiAyLCBBOiA3LCBaOiAwIH1cblxuICBhcnJheSA9IGFycmF5XG4gICAgLnJlcGxhY2UocmVnZXgubnVtYmVyc1dpdGhEb3RzLCBwYXRoUmVnUmVwbGFjZSkgLy8gY29udmVydCA0NS4xMjMuMTIzIHRvIDQ1LjEyMyAuMTIzXG4gICAgLnJlcGxhY2UocmVnZXgucGF0aExldHRlcnMsICcgJCYgJykgLy8gcHV0IHNvbWUgcm9vbSBiZXR3ZWVuIGxldHRlcnMgYW5kIG51bWJlcnNcbiAgICAucmVwbGFjZShyZWdleC5oeXBoZW4sICckMSAtJykgLy8gYWRkIHNwYWNlIGJlZm9yZSBoeXBoZW5cbiAgICAudHJpbSgpIC8vIHRyaW1cbiAgICAuc3BsaXQocmVnZXguZGVsaW1pdGVyKSAvLyBzcGxpdCBpbnRvIGFycmF5XG5cbiAgLy8gYXJyYXkgbm93IGlzIGFuIGFycmF5IGNvbnRhaW5pbmcgYWxsIHBhcnRzIG9mIGEgcGF0aCBlLmcuIFsnTScsICcwJywgJzAnLCAnTCcsICczMCcsICczMCcgLi4uXVxuICBjb25zdCBhcnIgPSBbXVxuICBjb25zdCBwID0gbmV3IFBvaW50KClcbiAgY29uc3QgcDAgPSBuZXcgUG9pbnQoKVxuICBjb25zdCByID0gbmV3IFBvaW50KClcbiAgbGV0IGluZGV4ID0gMFxuICBjb25zdCBsZW4gPSBhcnJheS5sZW5ndGhcbiAgbGV0IHNcblxuICBkbyB7XG4gICAgLy8gVGVzdCBpZiB3ZSBoYXZlIGEgcGF0aCBsZXR0ZXJcbiAgICBpZiAocmVnZXguaXNQYXRoTGV0dGVyLnRlc3QoYXJyYXlbaW5kZXhdKSkge1xuICAgICAgcyA9IGFycmF5W2luZGV4XVxuICAgICAgKytpbmRleFxuICAgIC8vIElmIGxhc3QgbGV0dGVyIHdhcyBhIG1vdmUgY29tbWFuZCBhbmQgd2UgZ290IG5vIG5ldywgaXQgZGVmYXVsdHMgdG8gW0xdaW5lXG4gICAgfSBlbHNlIGlmIChzID09PSAnTScpIHtcbiAgICAgIHMgPSAnTCdcbiAgICB9IGVsc2UgaWYgKHMgPT09ICdtJykge1xuICAgICAgcyA9ICdsJ1xuICAgIH1cblxuICAgIGFyci5wdXNoKFxuICAgICAgcGF0aEhhbmRsZXJzW3NdLmNhbGwobnVsbCxcbiAgICAgICAgYXJyYXkuc2xpY2UoaW5kZXgsIChpbmRleCA9IGluZGV4ICsgcGFyYW1DbnRbcy50b1VwcGVyQ2FzZSgpXSkpLm1hcChwYXJzZUZsb2F0KSxcbiAgICAgICAgcCwgciwgcDAsXG4gICAgICAgIGlzQmV6aWVyZShhcnJbYXJyLmxlbmd0aCAtIDFdKVxuICAgICAgKVxuICAgIClcblxuICB9IHdoaWxlIChsZW4gPiBpbmRleClcblxuICByZXR1cm4gYXJyXG59XG5cbmNsYXNzIE1vdmUge1xuICBjb25zdHJ1Y3RvciAocCkge1xuICAgIHRoaXMucDEgPSBwLmNsb25lKClcbiAgfVxuXG4gIC8vIEZJWE1FOiBVc2UgcG9pbnRjbG91ZFxuICBiYm94ICgpIHtcbiAgICBjb25zdCBwID0gdGhpcy5wMVxuICAgIHJldHVybiBuZXcgQm94KHAueCwgcC55LCAwLCAwKVxuICB9XG5cbiAgZ2V0Q2xvdWQgKCkge1xuICAgIHJldHVybiBuZXcgUG9pbnRDbG91ZChbIHRoaXMucDEgXSlcbiAgfVxuXG4gIGxlbmd0aCAoKSB7IHJldHVybiAwIH1cblxuICB0b1BhdGggKCkge1xuICAgIHJldHVybiBbICdNJywgdGhpcy5wMS54LCB0aGlzLnAxLnkgXS5qb2luKCcgJylcbiAgfVxuXG4gIHRvUGF0aEZyYWdtZW50ICgpIHtcbiAgICByZXR1cm4gWyAnTScsIHRoaXMucDEueCwgdGhpcy5wMS55IF1cbiAgfVxuXG4gIHRyYW5zZm9ybSAobWF0cml4KSB7XG4gICAgdGhpcy5wMS50cmFuc2Zvcm1PKG1hdHJpeClcbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBcmMge1xuICBjb25zdHJ1Y3RvciAocDEsIHAyLCByeCwgcnksIM+GLCBhcmMsIHN3ZWVwKSB7XG4gICAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL1NWRy9pbXBsbm90ZS5odG1sI0FyY0NvcnJlY3Rpb25PdXRPZlJhbmdlUmFkaWlcbiAgICBpZiAoIXJ4IHx8ICFyeSkgcmV0dXJuIG5ldyBMaW5lKHAxLCBwMilcblxuICAgIHJ4ID0gTWF0aC5hYnMocngpXG4gICAgcnkgPSBNYXRoLmFicyhyeSlcblxuICAgIHRoaXMucDEgPSBwMS5jbG9uZSgpXG4gICAgdGhpcy5wMiA9IHAyLmNsb25lKClcbiAgICB0aGlzLmFyYyA9IGFyYyA/IDEgOiAwXG4gICAgdGhpcy5zd2VlcCA9IHN3ZWVwID8gMSA6IDBcblxuICAgIC8vIENhbGN1bGF0ZSBjb3MgYW5kIHNpbiBvZiBhbmdsZSBwaGlcbiAgICBjb25zdCBjb3PPhiA9IE1hdGguY29zKM+GIC8gMTgwICogTWF0aC5QSSlcbiAgICBjb25zdCBzaW7PhiA9IE1hdGguc2luKM+GIC8gMTgwICogTWF0aC5QSSlcblxuICAgIC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9TVkcvaW1wbG5vdGUuaHRtbCNBcmNDb252ZXJzaW9uRW5kcG9pbnRUb0NlbnRlclxuICAgIC8vIChlcS4gNS4xKVxuICAgIGNvbnN0IHAxXyA9IG5ldyBQb2ludChcbiAgICAgIChwMS54IC0gcDIueCkgLyAyLFxuICAgICAgKHAxLnkgLSBwMi55KSAvIDJcbiAgICApLnRyYW5zZm9ybShtYXRyaXhGYWN0b3J5KFxuICAgICAgY29zz4YsIC1zaW7Phiwgc2luz4YsIGNvc8+GLCAwLCAwXG4gICAgKSlcblxuICAgIC8vIChlcS4gNi4yKVxuICAgIC8vIE1ha2Ugc3VyZSB0aGUgcmFkaXVzIGZpdCB3aXRoIHRoZSBhcmMgYW5kIGNvcnJlY3QgaWYgbmVjY2Vzc2FyeVxuICAgIGNvbnN0IHJhdGlvID0gKHAxXy54ICoqIDIgLyByeCAqKiAyKSArIChwMV8ueSAqKiAyIC8gcnkgKiogMilcblxuICAgIC8vIChlcS4gNi4zKVxuICAgIGlmIChyYXRpbyA+IDEpIHtcbiAgICAgIHJ4ID0gTWF0aC5zcXJ0KHJhdGlvKSAqIHJ4XG4gICAgICByeSA9IE1hdGguc3FydChyYXRpbykgKiByeVxuICAgIH1cblxuICAgIC8vIChlcS4gNS4yKVxuICAgIGNvbnN0IHJ4UXVhZCA9IHJ4ICoqIDJcbiAgICBjb25zdCByeVF1YWQgPSByeSAqKiAyXG5cbiAgICBjb25zdCBkaXZpc29yMSA9IHJ4UXVhZCAqIHAxXy55ICoqIDJcbiAgICBjb25zdCBkaXZpc29yMiA9IHJ5UXVhZCAqIHAxXy54ICoqIDJcbiAgICBjb25zdCBkaXZpZGVuZCA9IChyeFF1YWQgKiByeVF1YWQgLSBkaXZpc29yMSAtIGRpdmlzb3IyKVxuXG4gICAgbGV0IGNfXG4gICAgaWYgKE1hdGguYWJzKGRpdmlkZW5kKSA8IDFlLTE1KSB7XG4gICAgICBjXyA9IG5ldyBQb2ludCgwLCAwKVxuICAgIH0gZWxzZSB7XG4gICAgICBjXyA9IG5ldyBQb2ludChcbiAgICAgICAgcnggKiBwMV8ueSAvIHJ5LFxuICAgICAgICAtcnkgKiBwMV8ueCAvIHJ4XG4gICAgICApLm11bChNYXRoLnNxcnQoXG4gICAgICAgIGRpdmlkZW5kIC8gKGRpdmlzb3IxICsgZGl2aXNvcjIpXG4gICAgICApKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmFyYyA9PT0gdGhpcy5zd2VlcCkgY18gPSBjXy5tdWwoLTEpXG5cbiAgICAvLyAoZXEuIDUuMylcbiAgICBjb25zdCBjID0gY18udHJhbnNmb3JtKG1hdHJpeEZhY3RvcnkoXG4gICAgICBjb3PPhiwgc2luz4YsIC1zaW7PhiwgY29zz4YsIDAsIDBcbiAgICApKS5hZGQobmV3IFBvaW50KFxuICAgICAgKHAxLnggKyBwMi54KSAvIDIsXG4gICAgICAocDEueSArIHAyLnkpIC8gMlxuICAgICkpXG5cbiAgICBjb25zdCBhbmdsZVBvaW50ID0gbmV3IFBvaW50KFxuICAgICAgKHAxXy54IC0gY18ueCkgLyByeCxcbiAgICAgIChwMV8ueSAtIGNfLnkpIC8gcnlcbiAgICApXG5cbiAgICAvKiBGb3IgZXEuIDUuNCBzZWUgYW5nbGVUbyBmdW5jdGlvbiAqL1xuXG4gICAgLy8gKGVxLiA1LjUpXG4gICAgY29uc3QgzrggPSBuZXcgUG9pbnQoMSwgMCkuYW5nbGVUbyhhbmdsZVBvaW50KVxuXG4gICAgLy8gKGVxLiA1LjYpXG4gICAgbGV0IM6UzrggPSBhbmdsZVBvaW50LmFuZ2xlVG8obmV3IFBvaW50KFxuICAgICAgKC1wMV8ueCAtIGNfLngpIC8gcngsXG4gICAgICAoLXAxXy55IC0gY18ueSkgLyByeVxuICAgICkpXG5cbiAgICDOlM64ID0gKM6UzrggJSAoMiAqIE1hdGguUEkpKVxuXG4gICAgaWYgKCFzd2VlcCAmJiDOlM64ID4gMCkgzpTOuCAtPSAyICogTWF0aC5QSVxuICAgIGlmIChzd2VlcCAmJiDOlM64IDwgMCkgzpTOuCArPSAyICogTWF0aC5QSVxuXG4gICAgdGhpcy5jID0gY1xuICAgIHRoaXMudGhldGEgPSDOuCAqIDE4MCAvIE1hdGguUElcbiAgICB0aGlzLnRoZXRhMiA9ICjOuCArIM6UzrgpICogMTgwIC8gTWF0aC5QSVxuXG4gICAgdGhpcy5kZWx0YSA9IM6UzrggKiAxODAgLyBNYXRoLlBJXG4gICAgdGhpcy5yeCA9IHJ4XG4gICAgdGhpcy5yeSA9IHJ5XG4gICAgdGhpcy5waGkgPSDPhlxuICAgIHRoaXMuY29zz4YgPSBjb3PPhlxuICAgIHRoaXMuc2luz4YgPSBzaW7PhlxuICB9XG5cbiAgc3RhdGljIGZyb21DZW50ZXJGb3JtIChjLCByeCwgcnksIM+GLCDOuCwgzpTOuCkge1xuICAgIGNvbnN0IGNvc8+GID0gTWF0aC5jb3Moz4YgLyAxODAgKiBNYXRoLlBJKVxuICAgIGNvbnN0IHNpbs+GID0gTWF0aC5zaW4oz4YgLyAxODAgKiBNYXRoLlBJKVxuICAgIGNvbnN0IG0gPSBtYXRyaXhGYWN0b3J5KGNvc8+GLCBzaW7PhiwgLXNpbs+GLCBjb3PPhiwgMCwgMClcblxuICAgIGNvbnN0IHAxID0gbmV3IFBvaW50KFxuICAgICAgcnggKiBNYXRoLmNvcyjOuCAvIDE4MCAqIE1hdGguUEkpLFxuICAgICAgcnkgKiBNYXRoLnNpbijOuCAvIDE4MCAqIE1hdGguUEkpXG4gICAgKS50cmFuc2Zvcm0obSkuYWRkKGMpXG5cbiAgICBjb25zdCBwMiA9IG5ldyBQb2ludChcbiAgICAgIHJ4ICogTWF0aC5jb3MoKM64ICsgzpTOuCkgLyAxODAgKiBNYXRoLlBJKSxcbiAgICAgIHJ5ICogTWF0aC5zaW4oKM64ICsgzpTOuCkgLyAxODAgKiBNYXRoLlBJKVxuICAgICkudHJhbnNmb3JtKG0pLmFkZChjKVxuXG4gICAgY29uc3QgYXJjID0gTWF0aC5hYnMozpTOuCkgPiAxODAgPyAxIDogMFxuICAgIGNvbnN0IHN3ZWVwID0gzpTOuCA+IDAgPyAxIDogMFxuXG4gICAgcmV0dXJuIG5ldyBBcmMocDEsIHAyLCByeCwgcnksIM+GLCBhcmMsIHN3ZWVwKVxuICB9XG5cbiAgYmJveCAoKSB7XG4gICAgY29uc3QgY2xvdWQgPSB0aGlzLmdldENsb3VkKClcbiAgICByZXR1cm4gY2xvdWQuYmJveCgpXG4gIH1cblxuICBjbG9uZSAoKSB7XG4gICAgcmV0dXJuIG5ldyBBcmModGhpcy5wMSwgdGhpcy5wMiwgdGhpcy5yeCwgdGhpcy5yeSwgdGhpcy5waGksIHRoaXMuYXJjLCB0aGlzLnN3ZWVwKVxuICB9XG5cbiAgZ2V0Q2xvdWQgKCkge1xuICAgIGlmICh0aGlzLnAxLmVxdWFscyh0aGlzLnAyKSkgcmV0dXJuIG5ldyBQb2ludENsb3VkKFsgdGhpcy5wMSBdKVxuXG4gICAgLy8gYXJjIGNvdWxkIGJlIHJvdGF0ZWQuIHRoZSBtaW4gYW5kIG1heCB2YWx1ZXMgdGhlbiBkb250IGxpZSBvbiBtdWx0aXBsZXMgb2YgOTAgZGVncmVzcyBidXQgYXJlIHNoaWZ0ZWQgYnkgdGhlIHJvdGF0aW9uIGFuZ2xlXG4gICAgLy8gc28gd2UgZmlyc3QgY2FsY3VsYXRlIG91ciAwLzkwIGRlZ3JlZSBhbmdsZVxuICAgIGxldCDOuDAxID0gTWF0aC5hdGFuKC10aGlzLnNpbs+GIC8gdGhpcy5jb3PPhiAqIHRoaXMucnkgLyB0aGlzLnJ4KSAqIDE4MCAvIE1hdGguUElcbiAgICBsZXQgzrgwMiA9IE1hdGguYXRhbih0aGlzLmNvc8+GIC8gdGhpcy5zaW7PhiAqIHRoaXMucnkgLyB0aGlzLnJ4KSAqIDE4MCAvIE1hdGguUElcbiAgICBsZXQgzrgxID0gdGhpcy50aGV0YVxuICAgIGxldCDOuDIgPSB0aGlzLnRoZXRhMlxuXG4gICAgaWYgKM64MSA8IDAgfHwgzrgyIDwgMCkge1xuICAgICAgzrgxICs9IDM2MFxuICAgICAgzrgyICs9IDM2MFxuICAgIH1cblxuICAgIGlmICjOuDIgPCDOuDEpIHtcbiAgICAgIGNvbnN0IHRlbXAgPSDOuDFcbiAgICAgIM64MSA9IM64MlxuICAgICAgzrgyID0gdGVtcFxuXG4gICAgfVxuXG4gICAgd2hpbGUgKM64MDEgLSA5MCA+IM64MDEpIM64MDEgLT0gOTBcbiAgICB3aGlsZSAozrgwMSA8IM64MSkgzrgwMSArPSA5MFxuICAgIHdoaWxlICjOuDAyIC0gOTAgPiDOuDAyKSDOuDAyIC09IDkwXG4gICAgd2hpbGUgKM64MDIgPCDOuDEpIM64MDIgKz0gOTBcblxuICAgIGNvbnN0IGFuZ2xlVG9UZXN0ID0gWyDOuDAxLCDOuDAyLCAozrgwMSArIDkwKSwgKM64MDIgKyA5MCksICjOuDAxICsgMTgwKSwgKM64MDIgKyAxODApLCAozrgwMSArIDI3MCksICjOuDAyICsgMjcwKSBdXG5cbiAgICBjb25zdCBwb2ludHMgPSBhbmdsZVRvVGVzdC5maWx0ZXIoZnVuY3Rpb24gKGFuZ2xlKSB7XG4gICAgICByZXR1cm4gKGFuZ2xlID4gzrgxICYmIGFuZ2xlIDwgzrgyKVxuICAgIH0pLm1hcChmdW5jdGlvbiAoYW5nbGUpIHtcbiAgICAgIHdoaWxlICh0aGlzLnRoZXRhIDwgYW5nbGUpIGFuZ2xlIC09IDM2MFxuICAgICAgcmV0dXJuIHRoaXMucG9pbnRBdCgoKGFuZ2xlIC0gdGhpcy50aGV0YSkgJSAzNjApIC8gKHRoaXMuZGVsdGEpKSAvLyBUT0RPOiByZXBsYWNlIHRoYXQgY2FsbCB3aXRoIHBvaW50QXRBbmdsZVxuICAgIH0uYmluZCh0aGlzKSkuY29uY2F0KHRoaXMucDEsIHRoaXMucDIpXG5cbiAgICByZXR1cm4gbmV3IFBvaW50Q2xvdWQocG9pbnRzKVxuICB9XG5cbiAgbGVuZ3RoICgpIHtcbiAgICBpZiAodGhpcy5wMS5lcXVhbHModGhpcy5wMikpIHJldHVybiAwXG5cbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLnAyLnN1Yih0aGlzLnAxKS5hYnMoKVxuXG4gICAgY29uc3QgcmV0ID0gdGhpcy5zcGxpdEF0KDAuNSlcbiAgICBjb25zdCBsZW4xID0gcmV0WzBdLnAyLnN1YihyZXRbMF0ucDEpLmFicygpXG4gICAgY29uc3QgbGVuMiA9IHJldFsxXS5wMi5zdWIocmV0WzFdLnAxKS5hYnMoKVxuXG4gICAgaWYgKGxlbjEgKyBsZW4yIC0gbGVuZ3RoIDwgMC4wMDAwMSkge1xuICAgICAgcmV0dXJuIGxlbjEgKyBsZW4yXG4gICAgfVxuXG4gICAgcmV0dXJuIHJldFswXS5sZW5ndGgoKSArIHJldFsxXS5sZW5ndGgoKVxuICB9XG5cbiAgcG9pbnRBdCAodCkge1xuICAgIGlmICh0aGlzLnAxLmVxdWFscyh0aGlzLnAyKSkgcmV0dXJuIHRoaXMucDEuY2xvbmUoKVxuXG4gICAgY29uc3QgdEluQW5nbGUgPSAodGhpcy50aGV0YSArIHQgKiB0aGlzLmRlbHRhKSAvIDE4MCAqIE1hdGguUElcbiAgICBjb25zdCBzaW7OuCA9IE1hdGguc2luKHRJbkFuZ2xlKVxuICAgIGNvbnN0IGNvc864ID0gTWF0aC5jb3ModEluQW5nbGUpXG5cbiAgICByZXR1cm4gbmV3IFBvaW50KFxuICAgICAgdGhpcy5jb3PPhiAqIHRoaXMucnggKiBjb3POuCAtIHRoaXMuc2luz4YgKiB0aGlzLnJ5ICogc2luzrggKyB0aGlzLmMueCxcbiAgICAgIHRoaXMuc2luz4YgKiB0aGlzLnJ5ICogY29zzrggKyB0aGlzLmNvc8+GICogdGhpcy5yeCAqIHNpbs64ICsgdGhpcy5jLnlcbiAgICApXG4gIH1cblxuICBzcGxpdEF0ICh0KSB7XG4gICAgY29uc3QgYWJzRGVsdGEgPSBNYXRoLmFicyh0aGlzLmRlbHRhKVxuICAgIGNvbnN0IGRlbHRhMSA9IGFic0RlbHRhICogdFxuICAgIGNvbnN0IGRlbHRhMiA9IGFic0RlbHRhICogKDEgLSB0KVxuXG4gICAgY29uc3QgcG9pbnRBdFQgPSB0aGlzLnBvaW50QXQodClcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgQXJjKHRoaXMucDEsIHBvaW50QXRULCB0aGlzLnJ4LCB0aGlzLnJ5LCB0aGlzLnBoaSwgZGVsdGExID4gMTgwLCB0aGlzLnN3ZWVwKSxcbiAgICAgIG5ldyBBcmMocG9pbnRBdFQsIHRoaXMucDIsIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCBkZWx0YTIgPiAxODAsIHRoaXMuc3dlZXApXG4gICAgXVxuICB9XG5cbiAgdG9QYXRoICgpIHtcbiAgICByZXR1cm4gWyAnTScsIHRoaXMucDEueCwgdGhpcy5wMS55LCAnQScsIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCB0aGlzLmFyYywgdGhpcy5zd2VlcCwgdGhpcy5wMi54LCB0aGlzLnAyLnkgXS5qb2luKCcgJylcbiAgfVxuXG4gIHRvUGF0aEZyYWdtZW50ICgpIHtcbiAgICByZXR1cm4gWyAnQScsIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCB0aGlzLmFyYywgdGhpcy5zd2VlcCwgdGhpcy5wMi54LCB0aGlzLnAyLnkgXVxuICB9XG5cbiAgdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiBgcDE6ICR7dGhpcy5wMS54LnRvRml4ZWQoNCl9ICR7dGhpcy5wMS55LnRvRml4ZWQoNCl9LCBwMjogJHt0aGlzLnAyLngudG9GaXhlZCg0KX0gJHt0aGlzLnAyLnkudG9GaXhlZCg0KX0sIGM6ICR7dGhpcy5jLngudG9GaXhlZCg0KX0gJHt0aGlzLmMueS50b0ZpeGVkKDQpfSB0aGV0YTogJHt0aGlzLnRoZXRhLnRvRml4ZWQoNCl9LCB0aGV0YTI6ICR7dGhpcy50aGV0YTIudG9GaXhlZCg0KX0sIGRlbHRhOiAke3RoaXMuZGVsdGEudG9GaXhlZCg0KX0sIGxhcmdlOiAke3RoaXMuYXJjfSwgc3dlZXA6ICR7dGhpcy5zd2VlcH1gXG4gIH1cblxuICB0cmFuc2Zvcm0gKG1hdHJpeCkge1xuICAgIHJldHVybiBuZXcgQXJjKHRoaXMucDEudHJhbnNmb3JtKG1hdHJpeCksIHRoaXMucDIudHJhbnNmb3JtKG1hdHJpeCksIHRoaXMucngsIHRoaXMucnksIHRoaXMucGhpLCB0aGlzLmFyYywgdGhpcy5zd2VlcClcbiAgfVxufVxuXG5jbGFzcyBDdWJpYyB7XG4gIGNvbnN0cnVjdG9yIChwMSwgYzEsIGMyLCBwMikge1xuICAgIGlmIChwMSBpbnN0YW5jZW9mIFBvaW50KSB7XG4gICAgICB0aGlzLnAxID0gbmV3IFBvaW50KHAxKVxuICAgICAgdGhpcy5jMSA9IG5ldyBQb2ludChjMSlcbiAgICAgIHRoaXMuYzIgPSBuZXcgUG9pbnQoYzIpXG4gICAgICB0aGlzLnAyID0gbmV3IFBvaW50KHAyKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnAxID0gbmV3IFBvaW50KHAxLnAxKVxuICAgICAgdGhpcy5jMSA9IG5ldyBQb2ludChwMS5jMSlcbiAgICAgIHRoaXMuYzIgPSBuZXcgUG9pbnQocDEuYzIpXG4gICAgICB0aGlzLnAyID0gbmV3IFBvaW50KHAxLnAyKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tUXVhZCAocDEsIGMsIHAyKSB7XG4gICAgY29uc3QgYzEgPSBwMS5tdWwoMSAvIDMpLmFkZChjLm11bCgyIC8gMykpXG4gICAgY29uc3QgYzIgPSBjLm11bCgyIC8gMykuYWRkKHAyLm11bCgxIC8gMykpXG4gICAgcmV0dXJuIG5ldyBDdWJpYyhwMSwgYzEsIGMyLCBwMilcbiAgfVxuXG4gIGJib3ggKCkge1xuICAgIHJldHVybiB0aGlzLmdldENsb3VkKCkuYmJveCgpXG4gIH1cblxuICBmaW5kUm9vdHMgKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRSb290c1goKS5jb25jYXQodGhpcy5maW5kUm9vdHNZKCkpXG4gIH1cblxuICBmaW5kUm9vdHNYICgpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kUm9vdHNYWSh0aGlzLnAxLngsIHRoaXMuYzEueCwgdGhpcy5jMi54LCB0aGlzLnAyLngpXG4gIH1cblxuICBmaW5kUm9vdHNYWSAocDEsIHAyLCBwMywgcDQpIHtcbiAgICBjb25zdCBhID0gMyAqICgtcDEgKyAzICogcDIgLSAzICogcDMgKyBwNClcbiAgICBjb25zdCBiID0gNiAqIChwMSAtIDIgKiBwMiArIHAzKVxuICAgIGNvbnN0IGMgPSAzICogKHAyIC0gcDEpXG5cbiAgICBpZiAoYSA9PT0gMCkgcmV0dXJuIFsgLWMgLyBiIF0uZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwgPiAwICYmIGVsIDwgMSB9KVxuXG4gICAgaWYgKGIgKiBiIC0gNCAqIGEgKiBjIDwgMCkgcmV0dXJuIFtdXG4gICAgaWYgKGIgKiBiIC0gNCAqIGEgKiBjID09PSAwKSByZXR1cm4gWyBNYXRoLnJvdW5kKCgtYiAvICgyICogYSkpICogMTAwMDAwKSAvIDEwMDAwMCBdLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsID4gMCAmJiBlbCA8IDEgfSlcblxuICAgIHJldHVybiBbXG4gICAgICBNYXRoLnJvdW5kKCgtYiArIE1hdGguc3FydChiICogYiAtIDQgKiBhICogYykpIC8gKDIgKiBhKSAqIDEwMDAwMCkgLyAxMDAwMDAsXG4gICAgICBNYXRoLnJvdW5kKCgtYiAtIE1hdGguc3FydChiICogYiAtIDQgKiBhICogYykpIC8gKDIgKiBhKSAqIDEwMDAwMCkgLyAxMDAwMDBcbiAgICBdLmZpbHRlcihmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGVsID4gMCAmJiBlbCA8IDEgfSlcbiAgfVxuXG4gIGZpbmRSb290c1kgKCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRSb290c1hZKHRoaXMucDEueSwgdGhpcy5jMS55LCB0aGlzLmMyLnksIHRoaXMucDIueSlcbiAgfVxuXG4gIGZsYXRuZXNzICgpIHtcbiAgICBsZXQgdXggPSBNYXRoLnBvdygzICogdGhpcy5jMS54IC0gMiAqIHRoaXMucDEueCAtIHRoaXMucDIueCwgMilcbiAgICBsZXQgdXkgPSBNYXRoLnBvdygzICogdGhpcy5jMS55IC0gMiAqIHRoaXMucDEueSAtIHRoaXMucDIueSwgMilcbiAgICBjb25zdCB2eCA9IE1hdGgucG93KDMgKiB0aGlzLmMyLnggLSAyICogdGhpcy5wMi54IC0gdGhpcy5wMS54LCAyKVxuICAgIGNvbnN0IHZ5ID0gTWF0aC5wb3coMyAqIHRoaXMuYzIueSAtIDIgKiB0aGlzLnAyLnkgLSB0aGlzLnAxLnksIDIpXG5cbiAgICBpZiAodXggPCB2eCkgeyB1eCA9IHZ4IH1cbiAgICBpZiAodXkgPCB2eSkgeyB1eSA9IHZ5IH1cblxuICAgIHJldHVybiB1eCArIHV5XG4gIH1cblxuICBnZXRDbG91ZCAoKSB7XG4gICAgY29uc3QgcG9pbnRzID0gdGhpcy5maW5kUm9vdHMoKVxuICAgICAgLmZpbHRlcihyb290ID0+IHJvb3QgIT09IDAgJiYgcm9vdCAhPT0gMSlcbiAgICAgIC5tYXAocm9vdCA9PiB0aGlzLnBvaW50QXQocm9vdCkpXG4gICAgICAuY29uY2F0KHRoaXMucDEsIHRoaXMucDIpXG5cbiAgICByZXR1cm4gbmV3IFBvaW50Q2xvdWQocG9pbnRzKVxuICB9XG5cbiAgbGVuZ3RoICgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGhBdCgpXG4gIH1cblxuICBsZW5ndGhBdCAodCA9IDEpIHtcbiAgICBjb25zdCBjdXJ2ZXMgPSB0aGlzLnNwbGl0QXQodClbMF0ubWFrZUZsYXQodClcblxuICAgIGxldCBsZW5ndGggPSAwXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGN1cnZlcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGN1cnZlc1tpXS5wMi5zdWIoY3VydmVzW2ldLnAxKS5hYnMoKVxuICAgIH1cblxuICAgIHJldHVybiBsZW5ndGhcbiAgfVxuXG4gIG1ha2VGbGF0ICh0KSB7XG4gICAgaWYgKHRoaXMuZmxhdG5lc3MoKSA+IDAuMTUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNwbGl0QXQoMC41KVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwubWFrZUZsYXQodCAqIDAuNSkgfSlcbiAgICAgICAgLnJlZHVjZShmdW5jdGlvbiAobGFzdCwgY3VycmVudCkgeyByZXR1cm4gbGFzdC5jb25jYXQoY3VycmVudCkgfSwgW10pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudF92YWx1ZSA9IHRcbiAgICAgIHJldHVybiBbIHRoaXMgXVxuICAgIH1cbiAgfVxuXG4gIHBvaW50QXQgKHQpIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KFxuICAgICAgKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpICogdGhpcy5wMS54ICsgMyAqICgxIC0gdCkgKiAoMSAtIHQpICogdCAqIHRoaXMuYzEueCArIDMgKiAoMSAtIHQpICogdCAqIHQgKiB0aGlzLmMyLnggKyB0ICogdCAqIHQgKiB0aGlzLnAyLngsXG4gICAgICAoMSAtIHQpICogKDEgLSB0KSAqICgxIC0gdCkgKiB0aGlzLnAxLnkgKyAzICogKDEgLSB0KSAqICgxIC0gdCkgKiB0ICogdGhpcy5jMS55ICsgMyAqICgxIC0gdCkgKiB0ICogdCAqIHRoaXMuYzIueSArIHQgKiB0ICogdCAqIHRoaXMucDIueVxuICAgIClcbiAgfVxuXG4gIHNwbGl0QXQgKHopIHtcbiAgICBjb25zdCB4ID0gdGhpcy5zcGxpdEF0U2NhbGFyKHosICd4JylcbiAgICBjb25zdCB5ID0gdGhpcy5zcGxpdEF0U2NhbGFyKHosICd5JylcblxuICAgIGNvbnN0IGEgPSBuZXcgQ3ViaWMoXG4gICAgICBuZXcgUG9pbnQoeFswXVswXSwgeVswXVswXSksXG4gICAgICBuZXcgUG9pbnQoeFswXVsxXSwgeVswXVsxXSksXG4gICAgICBuZXcgUG9pbnQoeFswXVsyXSwgeVswXVsyXSksXG4gICAgICBuZXcgUG9pbnQoeFswXVszXSwgeVswXVszXSlcbiAgICApXG5cbiAgICBjb25zdCBiID0gbmV3IEN1YmljKFxuICAgICAgbmV3IFBvaW50KHhbMV1bMF0sIHlbMV1bMF0pLFxuICAgICAgbmV3IFBvaW50KHhbMV1bMV0sIHlbMV1bMV0pLFxuICAgICAgbmV3IFBvaW50KHhbMV1bMl0sIHlbMV1bMl0pLFxuICAgICAgbmV3IFBvaW50KHhbMV1bM10sIHlbMV1bM10pXG4gICAgKVxuXG4gICAgcmV0dXJuIFsgYSwgYiBdXG4gIH1cblxuICBzcGxpdEF0U2NhbGFyICh6LCBwKSB7XG4gICAgY29uc3QgcDEgPSB0aGlzLnAxW3BdXG4gICAgY29uc3QgcDIgPSB0aGlzLmMxW3BdXG4gICAgY29uc3QgcDMgPSB0aGlzLmMyW3BdXG4gICAgY29uc3QgcDQgPSB0aGlzLnAyW3BdXG5cbiAgICBjb25zdCB0ID0geiAqIHogKiB6ICogcDQgLSAzICogeiAqIHogKiAoeiAtIDEpICogcDMgKyAzICogeiAqICh6IC0gMSkgKiAoeiAtIDEpICogcDIgLSAoeiAtIDEpICogKHogLSAxKSAqICh6IC0gMSkgKiBwMVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIFtcbiAgICAgICAgcDEsXG4gICAgICAgIHogKiBwMiAtICh6IC0gMSkgKiBwMSxcbiAgICAgICAgeiAqIHogKiBwMyAtIDIgKiB6ICogKHogLSAxKSAqIHAyICsgKHogLSAxKSAqICh6IC0gMSkgKiBwMSxcbiAgICAgICAgdFxuICAgICAgXSxcbiAgICAgIFtcbiAgICAgICAgdCxcbiAgICAgICAgeiAqIHogKiBwNCAtIDIgKiB6ICogKHogLSAxKSAqIHAzICsgKHogLSAxKSAqICh6IC0gMSkgKiBwMixcbiAgICAgICAgeiAqIHA0IC0gKHogLSAxKSAqIHAzLFxuICAgICAgICBwNFxuICAgICAgXVxuICAgIF1cbiAgfVxuXG4gIHRvUGF0aCAoKSB7XG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLnAxLngsIHRoaXMucDEueSBdLmNvbmNhdCh0aGlzLnRvUGF0aEZyYWdtZW50KCkpLmpvaW4oJyAnKVxuICB9XG5cbiAgdG9QYXRoRnJhZ21lbnQgKCkge1xuICAgIHJldHVybiBbICdDJywgdGhpcy5jMS54LCB0aGlzLmMxLnksIHRoaXMuYzIueCwgdGhpcy5jMi55LCB0aGlzLnAyLngsIHRoaXMucDIueSBdXG4gIH1cblxuICB0cmFuc2Zvcm0gKG1hdHJpeCkge1xuICAgIHRoaXMucDEudHJhbnNmb3JtTyhtYXRyaXgpXG4gICAgdGhpcy5jMS50cmFuc2Zvcm1PKG1hdHJpeClcbiAgICB0aGlzLmMyLnRyYW5zZm9ybU8obWF0cml4KVxuICAgIHRoaXMucDIudHJhbnNmb3JtTyhtYXRyaXgpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5jbGFzcyBMaW5lIHtcbiAgY29uc3RydWN0b3IgKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgaWYgKHgxIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICB0aGlzLnAxID0gbmV3IFBvaW50KHgxKVxuICAgICAgdGhpcy5wMiA9IG5ldyBQb2ludCh5MSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wMSA9IG5ldyBQb2ludCh4MSwgeTEpXG4gICAgICB0aGlzLnAyID0gbmV3IFBvaW50KHgyLCB5MilcbiAgICB9XG4gIH1cblxuICBiYm94ICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDbG91ZCgpLmJib3goKVxuICB9XG5cbiAgZ2V0Q2xvdWQgKCkge1xuICAgIHJldHVybiBuZXcgUG9pbnRDbG91ZChbIHRoaXMucDEsIHRoaXMucDIgXSlcbiAgfVxuXG4gIGxlbmd0aCAoKSB7XG4gICAgcmV0dXJuIHRoaXMucDIuc3ViKHRoaXMucDEpLmFicygpXG4gIH1cblxuICBwb2ludEF0ICh0KSB7XG4gICAgY29uc3QgdmVjID0gdGhpcy5wMi5zdWIodGhpcy5wMSkubXVsKHQpXG4gICAgcmV0dXJuIHRoaXMucDEuYWRkKHZlYylcbiAgfVxuXG4gIHRvUGF0aCAoKSB7XG4gICAgcmV0dXJuIFsgJ00nLCB0aGlzLnAxLngsIHRoaXMucDEueSwgdGhpcy5wMi54LCB0aGlzLnAyLnkgXS5qb2luKCcgJylcbiAgfVxuXG4gIHRvUGF0aEZyYWdtZW50ICgpIHtcbiAgICByZXR1cm4gWyAnTCcsIHRoaXMucDIueCwgdGhpcy5wMi55IF1cbiAgfVxuXG4gIHRyYW5zZm9ybSAobWF0cml4KSB7XG4gICAgdGhpcy5wMS50cmFuc2Zvcm1PKG1hdHJpeClcbiAgICB0aGlzLnAyLnRyYW5zZm9ybU8obWF0cml4KVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHBhdGhCQm94ID0gZnVuY3Rpb24gKGQpIHtcbiAgcmV0dXJuIHBhdGhQYXJzZXIoZCkucmVkdWNlKChsLCBjKSA9PiBsLm1lcmdlKGMuYmJveCgpKSwgbmV3IE5vQm94KCkpXG59XG5cbmV4cG9ydCBjbGFzcyBQYXRoU2VnbWVudEFycmF5IGV4dGVuZHMgQXJyYXkge1xuICBiYm94ICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWR1Y2UoKGwsIGMpID0+IGwubWVyZ2UoYy5iYm94KCkpLCBuZXcgTm9Cb3goKSlcbiAgfVxuXG4gIGNsb3VkICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWR1Y2UoXG4gICAgICAoY2xvdWQsIHNlZ21lbnQpID0+IHNlZ21lbnQuZ2V0Q2xvdWQoKS5tZXJnZShjbG91ZCksXG4gICAgICBuZXcgUG9pbnRDbG91ZCgpXG4gICAgKVxuICB9XG5cbiAgbWVyZ2UgKG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uY2F0KG90aGVyKVxuICB9XG5cbiAgdHJhbnNmb3JtIChtYXRyaXgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoc2VnbWVudCA9PiBzZWdtZW50LnRyYW5zZm9ybShtYXRyaXgpKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRQYXRoU2VnbWVudHMgPSBmdW5jdGlvbiAoZCkge1xuICByZXR1cm4gbmV3IFBhdGhTZWdtZW50QXJyYXkoLi4ucGF0aFBhcnNlcihkKSlcbn1cblxuZXhwb3J0IGNvbnN0IHBvaW50QXRMZW5ndGggPSBmdW5jdGlvbiAoZCwgbGVuKSB7XG4gIGNvbnN0IHNlZ3MgPSBwYXRoUGFyc2VyKGQpXG5cbiAgY29uc3Qgc2VnTGVuZ3RocyA9IHNlZ3MubWFwKGVsID0+IGVsLmxlbmd0aCgpKVxuXG4gIGNvbnN0IGxlbmd0aCA9IHNlZ0xlbmd0aHMucmVkdWNlKChsLCBjKSA9PiBsICsgYywgMClcblxuICBsZXQgaSA9IDBcblxuICBsZXQgdCA9IGxlbiAvIGxlbmd0aFxuXG4gIC8vIEZJWE1FOiBQb3AgTW92ZSBiZWZvcmUgdXNpbmcgc2hvcnRjdXQ/XG4gIC8vIHNob3J0Y3V0IGZvciB0cml2aWFsIGNhc2VzXG4gIGlmICh0ID49IDEpIHtcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIHAyLiBJZiBub3QsIHVzZSBwMVxuICAgIGlmIChzZWdzW3NlZ3MubGVuZ3RoIC0gMV0ucDIpIHtcbiAgICAgIHJldHVybiBzZWdzW3NlZ3MubGVuZ3RoIC0gMV0ucDIubmF0aXZlKClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNlZ3Nbc2Vncy5sZW5ndGggLSAxXS5wMS5uYXRpdmUoKVxuICAgIH1cbiAgfVxuXG4gIGlmICh0IDw9IDApIHJldHVybiBzZWdzWzBdLnAxLm5hdGl2ZSgpXG5cbiAgLy8gcmVtb3ZlIG1vdmUgY29tbWFuZHMgYXQgdGhlIHZlcnkgZW5kIG9mIHRoZSBwYXRoXG4gIHdoaWxlIChzZWdzW3NlZ3MubGVuZ3RoIC0gMV0gaW5zdGFuY2VvZiBNb3ZlKSBzZWdzLnBvcCgpXG5cbiAgbGV0IHNlZ0VuZCA9IDBcblxuICBmb3IgKGNvbnN0IGlsID0gc2VnTGVuZ3Rocy5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG4gICAgY29uc3QgayA9IHNlZ0xlbmd0aHNbaV0gLyBsZW5ndGhcbiAgICBzZWdFbmQgKz0ga1xuXG4gICAgaWYgKHNlZ0VuZCA+IHQpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmF0aW8gPSBsZW5ndGggLyBzZWdMZW5ndGhzW2ldXG4gIHQgPSByYXRpbyAqICh0IC0gc2VnRW5kKSArIDFcblxuICByZXR1cm4gc2Vnc1tpXS5wb2ludEF0KHQpLm5hdGl2ZSgpXG59XG5cbmV4cG9ydCBjb25zdCBsZW5ndGggPSBmdW5jdGlvbiAoZCkge1xuICByZXR1cm4gcGF0aFBhcnNlcihkKVxuICAgIC5yZWR1Y2UoKGwsIGMpID0+IGwgKyBjLmxlbmd0aCgpLCAwKVxufVxuXG5leHBvcnQgY29uc3QgZGVidWcgPSBmdW5jdGlvbiAobm9kZSkge1xuICBjb25zdCBwYXJzZSA9IHBhdGhQYXJzZXIobm9kZS5nZXRBdHRyaWJ1dGUoJ2QnKSlcblxuICBjb25zdCByZXQgPSB7XG4gICAgcGF0aHM6IHBhcnNlLm1hcChlbCA9PiBlbC50b1BhdGgoKSksXG4gICAgZnJhZ21lbnRzOiBwYXJzZS5tYXAoZWwgPT4gZWwudG9QYXRoRnJhZ21lbnQoKS5qb2luKCcgJykpLFxuICAgIGJib3hzOiBwYXJzZS5tYXAoZWwgPT4ge1xuICAgICAgY29uc3QgYm94ID0gZWwuYmJveCgpXG4gICAgICByZXR1cm4gWyBib3gueCwgYm94LnksIGJveC53aWR0aCwgYm94LmhlaWdodCBdXG4gICAgfSksXG4gICAgYmJveDogcGFyc2UucmVkdWNlKChsLCBjKSA9PiBsLm1lcmdlKGMuYmJveCgpKSwgbmV3IE5vQm94KCkpLFxuICAgIGJib3hzVHJhbnNmb3JtZWQ6IHBhcnNlLm1hcChlbCA9PiB7XG4gICAgICByZXR1cm4gZWwuZ2V0Q2xvdWQoKS50cmFuc2Zvcm0obm9kZS5tYXRyaXhpZnkoKSkuYmJveCgpXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZXQsIHtcbiAgICBiYm94VHJhbnNmb3JtZWQ6IHJldC5iYm94c1RyYW5zZm9ybWVkLnJlZHVjZSgobCwgYykgPT4gbC5tZXJnZShjKSwgbmV3IE5vQm94KCkpXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDbG91ZCA9IChkKSA9PiB7XG4gIHJldHVybiBwYXRoUGFyc2VyKGQpLnJlZHVjZSgoY2xvdWQsIHNlZ21lbnQpID0+XG4gICAgc2VnbWVudC5nZXRDbG91ZCgpLm1lcmdlKGNsb3VkKSwgbmV3IFBvaW50Q2xvdWQoKVxuICApXG59XG5cbmV4cG9ydCBjb25zdCBwYXRoRnJvbSA9IHtcbiAgYm94ICh7IHgsIHksIHdpZHRoLCBoZWlnaHQgfSkge1xuICAgIHJldHVybiBgTSAke3h9ICR7eX0gaCAke3dpZHRofSB2ICR7aGVpZ2h0fSBIICR7eH0gViAke3l9YFxuICB9LFxuICByZWN0IChub2RlKSB7XG4gICAgY29uc3Qgd2lkdGggPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCd3aWR0aCcpKSB8fCAwXG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JykpIHx8IDBcbiAgICBjb25zdCB4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgneCcpKSB8fCAwXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3knKSkgfHwgMFxuICAgIHJldHVybiBgTSAke3h9ICR7eX0gaCAke3dpZHRofSB2ICR7aGVpZ2h0fSBIICR7eH0gViAke3l9YFxuICB9LFxuICBjaXJjbGUgKG5vZGUpIHtcbiAgICBjb25zdCByID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgncicpKSB8fCAwXG4gICAgY29uc3QgeCA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ2N4JykpIHx8IDBcbiAgICBjb25zdCB5ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgnY3knKSkgfHwgMFxuXG4gICAgaWYgKHIgPT09IDApIHJldHVybiAnTTAgMCdcblxuICAgIHJldHVybiBgTSAke3ggLSByfSAke3l9IEEgJHtyfSAke3J9IDAgMCAwICR7eCArIHJ9ICR7eX0gQSAke3J9ICR7cn0gMCAwIDAgJHt4IC0gcn0gJHt5fWBcbiAgfSxcbiAgZWxsaXBzZSAobm9kZSkge1xuICAgIGNvbnN0IHJ4ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgncngnKSkgfHwgMFxuICAgIGNvbnN0IHJ5ID0gcGFyc2VGbG9hdChub2RlLmdldEF0dHJpYnV0ZSgncnknKSkgfHwgMFxuICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KG5vZGUuZ2V0QXR0cmlidXRlKCdjeCcpKSB8fCAwXG4gICAgY29uc3QgeSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ2N5JykpIHx8IDBcblxuICAgIHJldHVybiBgTSAke3ggLSByeH0gJHt5fSBBICR7cnh9ICR7cnl9IDAgMCAwICR7eCArIHJ4fSAke3l9IEEgJHtyeH0gJHtyeX0gMCAwIDAgJHt4IC0gcnh9ICR7eX1gXG4gIH0sXG4gIGxpbmUgKG5vZGUpIHtcbiAgICBjb25zdCB4MSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3gxJykpIHx8IDBcbiAgICBjb25zdCB4MiA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3gyJykpIHx8IDBcbiAgICBjb25zdCB5MSA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3kxJykpIHx8IDBcbiAgICBjb25zdCB5MiA9IHBhcnNlRmxvYXQobm9kZS5nZXRBdHRyaWJ1dGUoJ3kyJykpIHx8IDBcblxuICAgIHJldHVybiBgTSAke3gxfSAke3kxfSBMICR7eDJ9ICR7eTJ9YFxuICB9LFxuICBwb2x5Z29uIChub2RlKSB7XG4gICAgcmV0dXJuIGBNICR7bm9kZS5nZXRBdHRyaWJ1dGUoJ3BvaW50cycpfSB6YFxuICB9LFxuICBwb2x5bGluZSAobm9kZSkge1xuICAgIHJldHVybiBgTSAke25vZGUuZ2V0QXR0cmlidXRlKCdwb2ludHMnKX1gXG4gIH1cbn1cbiIsIi8vIHNwbGl0cyBhIHRyYW5zZm9ybWF0aW9uIGNoYWluXG5leHBvcnQgY29uc3QgdHJhbnNmb3JtcyA9IC9cXClcXHMqLD9cXHMqL1xuXG4vLyBzcGxpdCBhdCB3aGl0ZXNwYWNlIGFuZCBjb21tYVxuZXhwb3J0IGNvbnN0IGRlbGltaXRlciA9IC9bXFxzLF0rL1xuXG4vLyBUaGUgZm9sbG93aW5nIHJlZ2V4IGFyZSB1c2VkIHRvIHBhcnNlIHRoZSBkIGF0dHJpYnV0ZSBvZiBhIHBhdGhcblxuLy8gTWF0Y2hlcyBhbGwgaHlwaGVucyB3aGljaCBhcmUgbm90IGFmdGVyIGFuIGV4cG9uZW50XG5leHBvcnQgY29uc3QgaHlwaGVuID0gLyhbXmVdKS0vZ2lcblxuLy8gUmVwbGFjZXMgYW5kIHRlc3RzIGZvciBhbGwgcGF0aCBsZXR0ZXJzXG5leHBvcnQgY29uc3QgcGF0aExldHRlcnMgPSAvW01MSFZDU1FUQVpdL2dpXG5cbi8vIHllcyB3ZSBuZWVkIHRoaXMgb25lLCB0b29cbmV4cG9ydCBjb25zdCBpc1BhdGhMZXR0ZXIgPSAvW01MSFZDU1FUQVpdL2lcblxuLy8gbWF0Y2hlcyAwLjE1NC4yMy40NVxuZXhwb3J0IGNvbnN0IG51bWJlcnNXaXRoRG90cyA9IC8oKFxcZD9cXC5cXGQrKD86ZVsrLV0/XFxkKyk/KSgoPzpcXC5cXGQrKD86ZVsrLV0/XFxkKyk/KSspKSsvZ2lcblxuLy8gbWF0Y2hlcyAuXG5leHBvcnQgY29uc3QgZG90cyA9IC9cXC4vZ1xuIiwiLy8gRW5zdXJlIHRvIHNpeC1iYXNlZCBoZXhcbmV4cG9ydCBjb25zdCBmdWxsSGV4ID0gZnVuY3Rpb24gKGhleCkge1xuICByZXR1cm4gaGV4Lmxlbmd0aCA9PT0gNFxuICAgID8gWyAnIycsXG4gICAgICBoZXguc3Vic3RyaW5nKDEsIDIpLCBoZXguc3Vic3RyaW5nKDEsIDIpLFxuICAgICAgaGV4LnN1YnN0cmluZygyLCAzKSwgaGV4LnN1YnN0cmluZygyLCAzKSxcbiAgICAgIGhleC5zdWJzdHJpbmcoMywgNCksIGhleC5zdWJzdHJpbmcoMywgNClcbiAgICBdLmpvaW4oJycpIDogaGV4XG59XG5cbmV4cG9ydCBjb25zdCBoZXhUb1JHQiA9IGZ1bmN0aW9uICh2YWxPck1hcCkge1xuICBpZiAodHlwZW9mIHZhbE9yTWFwIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgZm9yIChjb25zdCBbIGtleSwgdmFsIF0gb2YgdmFsT3JNYXApIHtcbiAgICAgIHZhbE9yTWFwLnNldChrZXksIGhleFRvUkdCKHZhbCkpXG4gICAgfVxuICAgIHJldHVybiB2YWxPck1hcFxuICB9XG5cbiAgaWYgKCEvI1swLTlhLWZdezMsNn0vLnRlc3QodmFsT3JNYXApKSB7IHJldHVybiB2YWxPck1hcCB9XG5cbiAgdmFsT3JNYXAgPSBmdWxsSGV4KHZhbE9yTWFwKVxuXG4gIHJldHVybiAncmdiKCcgKyBbXG4gICAgcGFyc2VJbnQodmFsT3JNYXAuc2xpY2UoMSwgMyksIDE2KSxcbiAgICBwYXJzZUludCh2YWxPck1hcC5zbGljZSgzLCA1KSwgMTYpLFxuICAgIHBhcnNlSW50KHZhbE9yTWFwLnNsaWNlKDUsIDcpLCAxNilcbiAgXS5qb2luKCcsJykgKyAnKSdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY2FtZWxpemUgKHMpIHtcbiAgcmV0dXJuIFN0cmluZyhzKS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCBmdW5jdGlvbiAobSwgZzEsIGcyKSB7XG4gICAgcmV0dXJuIGcxICsgJy0nICsgZzIudG9Mb3dlckNhc2UoKVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxDYXNlIChzKSB7XG4gIHJldHVybiBTdHJpbmcocykucmVwbGFjZSgvKFthLXpdKS0oW2Etel0pL2csIGZ1bmN0aW9uIChtLCBnMSwgZzIpIHtcbiAgICByZXR1cm4gZzEgKyBnMi50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVRdW90ZXMgKHN0cikge1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoJ1wiJykgfHwgc3RyLnN0YXJ0c1dpdGgoXCInXCIpKSB7XG4gICAgcmV0dXJuIHN0ci5zbGljZSgxLCAtMSlcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBodG1sRW50aXRpZXMgKHN0cikge1xuICByZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5odG1sRW50aXRpZXMgKHN0cikge1xuICByZXR1cm4gU3RyaW5nKHN0cikucmVwbGFjZSgvJmFtcDsvZywgJyYnKS5yZXBsYWNlKC8mbHQ7L2csICc8JykucmVwbGFjZSgvJmd0Oy9nLCAnPicpLnJlcGxhY2UoJyZxdW90OycsICdcIicpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZGF0YSAoc3RyKSB7XG4gIHJldHVybiBgPCFbQ0RBVEFbJHtzdHJ9XV0+YFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tbWVudCAoc3RyKSB7XG4gIHJldHVybiBgPCEtLSR7c3RyfS0tPmBcbn1cblxuZXhwb3J0IGNvbnN0IHNwbGl0Tm90SW5CcmFja2V0cyA9IChzdHIsIGRlbGltaXRlcikgPT4ge1xuICB2YXIgcm91bmRCcmFja2V0cyA9IDBcblxuICB2YXIgc3F1YXJlQnJhY2tldHMgPSAwXG5cbiAgdmFyIGxhc3RJbmRleCA9IDBcblxuICB2YXIgc3BsaXQgPSBbXVxuXG4gIHZhciBjaDsgdmFyIGk7IHZhciBpbFxuXG4gIGZvciAoaSA9IDAsIGlsID0gc3RyLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcbiAgICBjaCA9IHN0ci5jaGFyQXQoaSlcblxuICAgIGlmIChjaCA9PT0gZGVsaW1pdGVyICYmICFyb3VuZEJyYWNrZXRzICYmICFzcXVhcmVCcmFja2V0cykge1xuICAgICAgc3BsaXQucHVzaChzdHIuc2xpY2UobGFzdEluZGV4LCBpKS50cmltKCkpXG4gICAgICBsYXN0SW5kZXggPSBpICsgMVxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoY2ggPT09ICcoJykgKytyb3VuZEJyYWNrZXRzXG4gICAgZWxzZSBpZiAoY2ggPT09ICcpJykgLS1yb3VuZEJyYWNrZXRzXG4gICAgZWxzZSBpZiAoY2ggPT09ICdbJykgKytzcXVhcmVCcmFja2V0c1xuICAgIGVsc2UgaWYgKGNoID09PSAnXScpIC0tc3F1YXJlQnJhY2tldHNcbiAgfVxuXG4gIHNwbGl0LnB1c2goc3RyLnNsaWNlKGxhc3RJbmRleCkudHJpbSgpKVxuICByZXR1cm4gc3BsaXRcbn1cbiIsImNvbnN0IGh0bWxFbnRpdGllcyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHIpLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jylcbn1cblxudmFyIGVtcHR5RWxlbWVudHMgPSB7XG4gIGJyOiB0cnVlLFxuICBocjogdHJ1ZSxcbiAgaW1nOiB0cnVlLFxuICBsaW5rOiB0cnVlXG59XG5cbmV4cG9ydCBjb25zdCB0YWcgPSBmdW5jdGlvbiAobm9kZSkge1xuICBjb25zdCBhdHRycyA9IFsgLi4ubm9kZS5hdHRycyBdLm1hcChmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiAobm9kZS5wcmVmaXggPyBub2RlLnByZWZpeCArICc6JyA6ICcnKSArIG5vZGUubG9jYWxOYW1lICsgJz1cIicgKyBodG1sRW50aXRpZXMobm9kZS52YWx1ZSkgKyAnXCInXG4gIH0pXG5cbiAgY29uc3QgeyBwcmVmaXgsIGxvY2FsTmFtZSB9ID0gbm9kZVxuICBjb25zdCBxdWFsaWZpZWROYW1lID0gKHByZWZpeCA/IHByZWZpeCArICc6JyA6ICcnKSArIGxvY2FsTmFtZVxuXG4gIHJldHVybiAnPCcgKyBbXS5jb25jYXQocXVhbGlmaWVkTmFtZSwgYXR0cnMpLmpvaW4oJyAnKSArICc+JyArIChlbXB0eUVsZW1lbnRzW3F1YWxpZmllZE5hbWUudG9Mb3dlckNhc2UoKV0gPyAnJyA6IG5vZGUuaW5uZXJIVE1MICsgJzwvJyArIHF1YWxpZmllZE5hbWUgKyAnPicpXG59XG5cbmV4cG9ydCBjb25zdCBjbG9uZU5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuXG4gIGNvbnN0IHsgcHJlZml4LCBsb2NhbE5hbWUsIG5hbWVzcGFjZVVSSTogbnMsIG5vZGVWYWx1ZSwgb3duZXJEb2N1bWVudCB9ID0gbm9kZVxuXG4gIC8vIEJ1aWxkIHVwIHRoZSBjb3JyZWN0bHkgY2FzZWQgcXVhbGlmaWVkIG5hbWVcbiAgY29uc3QgcXVhbGlmaWVkTmFtZSA9IChwcmVmaXggPyBwcmVmaXggKyAnOicgOiAnJykgKyBsb2NhbE5hbWVcblxuICAvLyBDaGVjayBpZiBub2RlIHdhcyBjcmVhdGVkIHVzaW5nIG5vbi1uYW1lc3BhY2UgZnVuY3Rpb24gd2hpY2ggY2FuIGxlYWQgdG8gOiBpbiB0aGUgbG9jYWxOYW1lLlxuICAvLyBUaGlzIGNoZWNrIGFsbG93cyBmYWxzZSBuZWdhdGl2ZXMgYmVjYXVzZSBgbG9jYWxgIG9ubHkgbWF0dGVycyBJRiB0aGVyZSBhcmUgOiBpbiB0aGUgbG9jYWxOYW1lXG4gIC8vIGFuZCB3ZSBkb250IGNhcmUgYWJvdXQgaXQgd2hlbiB0aGVyZSBhcmUgbm9uXG4gIGNvbnN0IGxvY2FsID0gbG9jYWxOYW1lLmluY2x1ZGVzKCc6JylcblxuICB2YXIgY2xvbmUgPSBuZXcgbm9kZS5jb25zdHJ1Y3RvcihxdWFsaWZpZWROYW1lLCB7XG4gICAgYXR0cnM6IG5ldyBTZXQoWyAuLi5ub2RlLmF0dHJzIF0ubWFwKG5vZGUgPT4gbm9kZS5jbG9uZU5vZGUoKSkpLFxuICAgIG5vZGVWYWx1ZSxcbiAgICBvd25lckRvY3VtZW50LFxuICAgIGxvY2FsXG4gIH0sIG5zKVxuXG4gIHJldHVybiBjbG9uZVxufVxuIiwiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBmb250a2l0IGZyb20gJ2ZvbnRraXQnXG5pbXBvcnQgKiBhcyBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzLmpzJ1xuaW1wb3J0IHsgQm94LCBOb0JveCB9IGZyb20gJy4uL290aGVyL0JveC5qcydcbmltcG9ydCB7IGdldENvbmZpZywgZ2V0Rm9udHMgfSBmcm9tICcuLi9jb25maWcuanMnXG5cbmV4cG9ydCBjb25zdCB0ZXh0QkJveCA9IGZ1bmN0aW9uICh0ZXh0LCB4LCB5LCBkZXRhaWxzKSB7XG5cbiAgaWYgKCF0ZXh0KSByZXR1cm4gbmV3IE5vQm94KClcblxuICBjb25zdCBjb25maWcgPSBnZXRDb25maWcoKVxuICBjb25zdCBwcmVsb2FkZWQgPSBnZXRGb250cygpXG5cbiAgdmFyIGZhbWlsaWVzID0gKGRldGFpbHMuZm9udEZhbWlseSB8fCBkZWZhdWx0cy5mb250RmFtaWx5KS5zcGxpdCgvXFxzKixcXHMqLylcbiAgdmFyIGZvbnRNYXAgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cy5mb250RmFtaWx5TWFwcGluZ3MsIGNvbmZpZy5mb250RmFtaWx5TWFwcGluZ3MpXG4gIHZhciBmb250U2l6ZSA9IGRldGFpbHMuZm9udFNpemUgfHwgZGVmYXVsdHMuZm9udFNpemVcbiAgdmFyIGZvbnREaXIgPSBjb25maWcuZm9udERpciB8fCBkZWZhdWx0cy5mb250RGlyXG4gIHZhciBmb250RmFtaWx5XG4gIHZhciBmb250XG5cbiAgZm9yICh2YXIgaSA9IDAsIGlsID0gZmFtaWxpZXMubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuICAgIGlmIChmb250TWFwW2ZhbWlsaWVzW2ldXSkge1xuICAgICAgZm9udEZhbWlseSA9IGZhbWlsaWVzW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICghZm9udEZhbWlseSkge1xuICAgIGZvbnRGYW1pbHkgPSBkZWZhdWx0cy5mb250RmFtaWx5XG4gIH1cblxuICBpZiAocHJlbG9hZGVkW2ZvbnRGYW1pbHldKSB7XG4gICAgZm9udCA9IHByZWxvYWRlZFtmb250RmFtaWx5XVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcGF0aC5qb2luKGZvbnREaXIsIGZvbnRNYXBbZm9udEZhbWlseV0pXG4gICAgdHJ5IHtcbiAgICAgIGZvbnQgPSBmb250a2l0Lm9wZW5TeW5jKGZpbGVuYW1lKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IG9wZW4gZm9udCBcIiR7Zm9udEZhbWlseX1cIiBpbiBmaWxlIFwiJHtmaWxlbmFtZX1cIi4gJHtlLnRvU3RyaW5nKCl9YClcbiAgICAgIHJldHVybiBuZXcgTm9Cb3goKVxuICAgIH1cblxuICAgIHByZWxvYWRlZFtmb250RmFtaWx5XSA9IGZvbnRcbiAgfVxuXG4gIHZhciBmb250SGVpZ2h0ID0gZm9udC5hc2NlbnQgLSBmb250LmRlc2NlbnRcbiAgdmFyIGxpbmVIZWlnaHQgPSBmb250SGVpZ2h0ID4gZm9udC51bml0c1BlckVtID8gZm9udEhlaWdodCA6IGZvbnRIZWlnaHQgKyBmb250LmxpbmVHYXBcblxuICB2YXIgaGVpZ2h0ID0gbGluZUhlaWdodCAvIGZvbnQudW5pdHNQZXJFbSAqIGZvbnRTaXplXG4gIHZhciB3aWR0aCA9IGZvbnQubGF5b3V0KHRleHQpLmdseXBocy5yZWR1Y2UoKGxhc3QsIGN1cnIpID0+IGxhc3QgKyBjdXJyLmFkdmFuY2VXaWR0aCwgMCkgLyBmb250LnVuaXRzUGVyRW0gKiBmb250U2l6ZVxuXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvdGV4dC1hbmNob3JcbiAgdmFyIHhBZGp1c3QgPSAwXG4gIGlmIChkZXRhaWxzLnRleHRBbmNob3IgPT09ICdlbmQnKSB7XG4gICAgeEFkanVzdCA9IC13aWR0aFxuICB9IGVsc2UgaWYgKGRldGFpbHMudGV4dEFuY2hvciA9PT0gJ21pZGRsZScpIHtcbiAgICB4QWRqdXN0ID0gLXdpZHRoIC8gMlxuICB9XG5cbiAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMDIvV0QtY3NzMy1saW5lYm94LTIwMDIwNTE1L1xuICAvLyA0LjIuIEJhc2VsaW5lIGlkZW50aWZpZXJzXG4gIHZhciB5QWRqdXN0ID0gZm9udC5hc2NlbnQgLy8gYWxwaGFiZXRpY1xuICBpZiAoZGV0YWlscy5kb21pbmFudEJhc2VsaW5lID09PSAnYmVmb3JlLWVkZ2UnIHx8IGRldGFpbHMuZG9taW5hbnRCYXNlbGluZSA9PT0gJ3RleHQtYmVmb3JlLWVkZ2UnKSB7XG4gICAgeUFkanVzdCA9IDBcbiAgfSBlbHNlIGlmIChkZXRhaWxzLmRvbWluYW50QmFzZWxpbmUgPT09ICdoYW5naW5nJykge1xuICAgIHlBZGp1c3QgPSBmb250LmFzY2VudCAtIGZvbnQueEhlaWdodCAtIGZvbnQuY2FwSGVpZ2h0XG4gIH0gZWxzZSBpZiAoZGV0YWlscy5kb21pbmFudEJhc2VsaW5lID09PSAnbWF0aGVtYXRpY2FsJykge1xuICAgIHlBZGp1c3QgPSBmb250LmFzY2VudCAtIGZvbnQueEhlaWdodFxuICB9IGVsc2UgaWYgKGRldGFpbHMuZG9taW5hbnRCYXNlbGluZSA9PT0gJ21pZGRsZScpIHtcbiAgICB5QWRqdXN0ID0gZm9udC5hc2NlbnQgLSBmb250LnhIZWlnaHQgLyAyXG4gIH0gZWxzZSBpZiAoZGV0YWlscy5kb21pbmFudEJhc2VsaW5lID09PSAnY2VudHJhbCcpIHtcbiAgICB5QWRqdXN0ID0gZm9udC5hc2NlbnQgLyAyICsgZm9udC5kZXNjZW50IC8gMlxuICB9IGVsc2UgaWYgKGRldGFpbHMuZG9taW5hbnRCYXNlbGluZSA9PT0gJ2lkZW9ncmFwaGljJykge1xuICAgIHlBZGp1c3QgPSBmb250LmFzY2VudCArIGZvbnQuZGVzY2VudFxuICB9XG5cbiAgcmV0dXJuIG5ldyBCb3goeCArIHhBZGp1c3QsIHkgLSB5QWRqdXN0IC8gZm9udC51bml0c1BlckVtICogZm9udFNpemUsIHdpZHRoLCBoZWlnaHQpXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAqIGFzIGRlZmF1bHRzIGZyb20gJy4vc3JjL3V0aWxzL2RlZmF1bHRzLmpzJ1xuXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vQXR0ci5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9DaGFyYWN0ZXJEYXRhLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0NvbW1lbnQuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vQ3VzdG9tRXZlbnQuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vRG9jdW1lbnQuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vRG9jdW1lbnRGcmFnbWVudC5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9FbGVtZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0V2ZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL0V2ZW50VGFyZ2V0LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL05vZGUuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vTm9kZUZpbHRlci5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9UZXh0LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL1dpbmRvdy5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9odG1sL0hUTUxFbGVtZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL2h0bWwvSFRNTEltYWdlRWxlbWVudC5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9odG1sL0hUTUxMaW5rRWxlbWVudC5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9odG1sL0hUTUxQYXJzZXIuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vaHRtbC9IVE1MU2NyaXB0RWxlbWVudC5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9taXhpbnMvZWxlbWVudEFjY2Vzcy5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9taXhpbnMvUGFyZW50Tm9kZS5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHRWxlbWVudC5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHR3JhcGhpY3NFbGVtZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdNYXRyaXguanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9kb20vc3ZnL1NWR1BhdGhFbGVtZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9zcmMvZG9tL3N2Zy9TVkdQb2ludC5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHU1ZHRWxlbWVudC5qcydcbmV4cG9ydCAqIGZyb20gJy4vc3JjL2RvbS9zdmcvU1ZHVGV4dENvbnRlbnRFbGVtZW50LmpzJ1xuXG5leHBvcnQgKiBmcm9tICcuL3NyYy9jb25maWcuanMnXG5leHBvcnQgKiBmcm9tICcuL3NyYy9mYWN0b3JpZXMuanMnXG5leHBvcnQgeyBkZWZhdWx0cyB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=