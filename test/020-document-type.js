import assert from 'node:assert/strict'
import { DOMImplementation, HTMLParser } from '../main-module.js'

describe('DocumentType ownership', () => {
  it('creates a detached doctype that can be assigned to a document', () => {
    const doctype = DOMImplementation.createDocumentType(
      'svg',
      'public-id',
      'system-id'
    )

    assert.equal(doctype.ownerDocument, null)
    const document = DOMImplementation.createDocument(null, 'svg', doctype)
    assert.equal(doctype.ownerDocument, document)
    assert.equal(doctype.parentNode, document)
    assert.equal(doctype.publicId, 'public-id')
    assert.equal(doctype.systemId, 'system-id')
  })

  it('rejects reuse by another document before mutation', () => {
    const doctype = DOMImplementation.createDocumentType('svg', '', '')
    const document = DOMImplementation.createDocument(null, 'svg', doctype)

    assert.throws(
      () => DOMImplementation.createDocument(null, 'svg', doctype),
      /wrong Document/
    )
    assert.equal(doctype.ownerDocument, document)
    assert.equal(doctype.parentNode, document)
  })

  it('retains the doctype name while parsing a document', () => {
    const document = DOMImplementation.createDocument(null, null)
    HTMLParser('<!DOCTYPE svg><svg/>', document)

    assert.equal(document.firstChild.name, 'svg')
    assert.equal(document.firstChild.ownerDocument, document)
  })

  it('does not consume a doctype when root construction fails', () => {
    const doctype = DOMImplementation.createDocumentType('svg', 0, false)

    assert.throws(() =>
      DOMImplementation.createDocument(null, 'invalid name', doctype)
    )
    assert.equal(doctype.ownerDocument, null)
    assert.equal(doctype.parentNode, null)
    assert.equal(doctype.publicId, '0')
    assert.equal(doctype.systemId, 'false')
  })
})
