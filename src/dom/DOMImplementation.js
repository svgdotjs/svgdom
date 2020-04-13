import { Document } from './Document.js'

// Feature/version pairs that DOMImplementation.hasFeature() returns true for.  It returns false for anything else.
var supportedFeatures = {
  xml: { '': true, '1.0': true, '2.0': true },
  core: { '': true, '2.0': true },
  html: { '': true, '1.0': true, '2.0': true },
  xhtml: { '': true, '1.0': true, '2.0': true } // HTML
}

export class DOMImplementation {
  hasFeature (feature, version) {
    var f = supportedFeatures[(feature || '').toLowerCase()]
    return (f && f[version || '']) || false
  }

  createDocumentType (qualifiedName, publicId, systemId) {
    throw new Error('createDocumentType not implemented yet')
  }

  createDocument (namespace, qualifiedName, doctype) {
    var doc = new Document()
    if (doctype) {
      if (doctype.ownerDocument) {
        throw new Error('the object is in the wrong Document, a call to importNode is required')
      }
      doc.appendChild(doctype)
    }
    if (qualifiedName) {
      doc.appendChild(doc.createElementNS(namespace, qualifiedName))
    }
    return doc
  }

  createHTMLDocument (titleText) {
    var d = new Document('html')
    var root = d.documentElement
    var head = d.createElement('head')
    root.appendChild(head)
    var title = d.createElement('title')
    head.appendChild(title)
    title.appendChild(d.createTextNode(titleText))
    root.appendChild(d.createElement('body'))
    return d
  }
}
