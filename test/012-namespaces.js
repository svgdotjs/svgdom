/* global describe, it */

import assert from 'assert'
import { createDocument, createHTMLDocument, createSVGDocument, Document, HTMLParser } from '../main-module.js'
import { SVGRectElement } from '../src/dom/svg/SVGRectElement.js'

const svg = 'http://www.w3.org/2000/svg'
const html = 'http://www.w3.org/1999/xhtml'
const xml = 'http://www.w3.org/XML/1998/namespace'
const xmlns = 'http://www.w3.org/2000/xmlns/'

describe('namespaces', () => {
  it('normalizes namespaces and validates qualified names', () => {
    const document = createDocument(null, 'root')
    const emptyNamespace = Object('')

    assert.strictEqual(document.createElementNS('', 'item').namespaceURI, null)
    assert.strictEqual(document.createAttributeNS('', 'value').namespaceURI, null)
    assert.strictEqual(document.createElementNS('urn:test', 'é:item').localName, 'item')
    assert.strictEqual(document.createElementNS(null, '\u3001').localName, '\u3001')
    assert.strictEqual(document.createAttributeNS(xml, 'xml:lang').prefix, 'xml')

    const svgDocument = createSVGDocument()
    assert(svgDocument.createElementNS(svg, 's:rect') instanceof SVGRectElement)
    assert(svgDocument.createElement('rect') instanceof SVGRectElement)
    assert.strictEqual(svgDocument.createElement('rect').namespaceURI, svg)

    assert.throws(() => document.createElementNS(null, 'p:item'), /Namespace Error/)
    assert.throws(() => document.createElementNS(emptyNamespace, 'p:item'), /Namespace Error/)
    assert.throws(() => document.createAttributeNS(emptyNamespace, 'p:item'), /Namespace Error/)
    assert.throws(() => document.createElementNS('urn:test', 'a:b:c'), /Namespace Error/)
    assert.throws(() => document.createElementNS(null, 'not valid'), /Invalid Character Error/)
    assert.throws(() => document.createAttributeNS(xmlns, 'value'), /Namespace Error/)
  })

  it('looks up inherited, default, and prefixed namespace declarations', () => {
    const document = createDocument('urn:root', 'r:root')
    const root = document.documentElement
    root.setAttributeNS(xmlns, 'xmlns:r', 'urn:root')
    root.setAttributeNS(xmlns, 'xmlns', 'urn:default')
    root.setAttributeNS(xmlns, 'xmlns:q', 'urn:q')

    const child = document.createElementNS(null, 'child')
    const attr = document.createAttribute('value')
    child.setAttributeNode(attr)
    child.appendChild(document.createTextNode('text'))
    root.appendChild(child)

    assert.strictEqual(document.lookupPrefix('urn:root'), 'r')
    assert.strictEqual(document.lookupNamespaceURI('xml'), xml)
    assert.strictEqual(document.lookupNamespaceURI('xmlns'), xmlns)
    assert.strictEqual(document.lookupNamespaceURI('q'), 'urn:q')
    assert.strictEqual(child.lookupNamespaceURI(''), 'urn:default')
    assert.strictEqual(child.lookupNamespaceURI(Object('')), 'urn:default')
    assert.strictEqual(child.lookupPrefix('urn:q'), 'q')
    assert.strictEqual(attr.lookupNamespaceURI('q'), 'urn:q')
    assert.strictEqual(child.firstChild.lookupPrefix('urn:q'), 'q')
    assert.strictEqual(child.isDefaultNamespace('urn:default'), true)

    child.setAttributeNS(xmlns, 'xmlns', '')
    assert.strictEqual(child.lookupNamespaceURI(null), null)
    assert.strictEqual(child.isDefaultNamespace(null), true)

    root.setAttributeNS(xmlns, 'xmlns:n', 0)
    assert.strictEqual(root.getAttributeNS(xmlns, 'n'), '0')
    assert.strictEqual(root.lookupNamespaceURI('n'), '0')

    const numericDeclaration = root.getAttributeNodeNS(xmlns, 'n')
    numericDeclaration.nodeValue = 123
    assert.strictEqual(numericDeclaration.value, '123')
    assert.strictEqual(root.lookupPrefix(123), 'n')

    root.setAttribute('data-count', 0)
    assert.strictEqual(root.getAttribute('data-count'), '0')
  })

  it('uses the root element for document lookup when comments follow it', () => {
    const document = new Document(null)
    HTMLParser('<root xmlns:q="urn:q"/><!--after-->', document)

    assert.strictEqual(document.documentElement.nodeName, 'root')
    assert.strictEqual(document.lookupNamespaceURI('q'), 'urn:q')
    assert.strictEqual(document.lookupPrefix('urn:q'), 'q')
  })

  it('finds descendants by namespace URI and local name', () => {
    const document = createDocument('urn:root', 'root')
    const root = document.documentElement
    const first = document.createElementNS('urn:one', 'one:item')
    const second = document.createElementNS('urn:two', 'two:item')
    const plain = document.createElementNS(null, 'item')
    first.appendChild(second)
    root.appendChild(first)
    root.appendChild(plain)

    assert.deepStrictEqual(document.getElementsByTagNameNS('urn:one', 'item'), [ first ])
    assert.deepStrictEqual(document.getElementsByTagNameNS('*', 'item'), [ first, second, plain ])
    assert.deepStrictEqual(document.getElementsByTagNameNS('urn:two', '*'), [ second ])
    assert.deepStrictEqual(document.getElementsByTagNameNS('', 'item'), [ plain ])
  })

  it('updates and replaces namespaced attributes by namespace and local name', () => {
    const document = createDocument('urn:root', 'root')
    const root = document.documentElement

    root.setAttributeNS('urn:value', 'a:value', 'one')
    root.setAttributeNS('urn:value', 'b:value', 'two')

    const value = root.getAttributeNodeNS('urn:value', 'value')
    assert.strictEqual(value.name, 'b:value')
    assert.strictEqual(value.prefix, 'b')
    assert.strictEqual(value.value, 'two')
    assert.strictEqual(root.attributes.length, 1)
    assert.match(root.outerHTML, /xmlns:b="urn:value"/)
    assert.match(root.outerHTML, /b:value="two"/)
    assert.doesNotMatch(root.outerHTML, /a:value=/)

    const first = document.createAttributeNS('urn:replace', 'a:replace')
    const second = document.createAttributeNS('urn:replace', 'b:replace')
    assert.strictEqual(root.setAttributeNodeNS(first), null)
    assert.strictEqual(root.setAttributeNodeNS(second), first)
    assert.strictEqual(first.ownerElement, null)
    assert.strictEqual(second.ownerElement, root)

    root.removeAttributeNode(second)
    assert.strictEqual(second.ownerElement, null)

    const clone = root.cloneNode()
    assert.strictEqual(clone.getAttributeNodeNS('urn:value', 'value').ownerElement, clone)
  })

  it('rejects attributes created by another document', () => {
    const firstDocument = createDocument(null, 'first')
    const secondDocument = createDocument(null, 'second')
    const plain = firstDocument.createAttribute('plain')
    const namespaced = firstDocument.createAttributeNS('urn:value', 'v:value')

    assert.throws(() => secondDocument.documentElement.setAttributeNode(plain), /Wrong Document Error/)
    assert.throws(() => secondDocument.documentElement.setAttributeNodeNS(namespaced), /Wrong Document Error/)
    assert.strictEqual(plain.ownerElement, null)
    assert.strictEqual(namespaced.ownerElement, null)
  })

  it('protects reserved namespace declarations', () => {
    const document = createDocument('urn:root', 'root')
    const root = document.documentElement

    root.setAttributeNS(xmlns, 'xmlns:xml', 'urn:bad')
    assert.throws(() => root.outerHTML, /Namespace Error/)
    root.removeAttributeNS(xmlns, 'xml')

    const declaration = document.createAttributeNS(xmlns, 'xmlns:xml')
    declaration.value = 'urn:bad'
    root.setAttributeNodeNS(declaration)
    assert.throws(() => root.outerHTML, /Namespace Error/)
    root.removeAttributeNS(xmlns, 'xml')

    root.setAttributeNS(xmlns, 'xmlns:xml', xml)
    root.getAttributeNodeNS(xmlns, 'xml').value = 'urn:bad'
    assert.throws(() => root.outerHTML, /Namespace Error/)
  })

  it('preserves createAttributeNS casing in HTML documents', () => {
    const document = createHTMLDocument()
    const attr = document.createAttributeNS(html, 'h:MiX')
    assert.strictEqual(attr.localName, 'MiX')
    assert.strictEqual(attr.name, 'h:MiX')

    const foreign = document.createElementNS(svg, 'svg')
    foreign.setAttributeNodeNS(attr)
    assert.strictEqual(foreign.getAttributeNode('h:MiX'), attr)
  })

  it('rejects namespace-null xmlns attributes during XML serialization', () => {
    const plainDocument = createDocument(null, 'root')
    plainDocument.documentElement.setAttribute('xmlns', 'urn:pretend')
    assert.throws(() => plainDocument.documentElement.outerHTML, /Invalid State Error/)

    const namespacedDocument = createDocument('urn:root', 'root')
    namespacedDocument.documentElement.setAttribute('xmlns', 'urn:pretend')
    assert.throws(() => namespacedDocument.documentElement.outerHTML, /Invalid State Error/)
  })

  it('uses the document namespace for lightweight HTML behavior', () => {
    const document = createDocument(html, 'html')
    const mixed = document.createElement('MiXeD')
    assert.strictEqual(mixed.localName, 'mixed')
    assert.strictEqual(mixed.nodeName, 'MIXED')
    assert.strictEqual(mixed.outerHTML, '<mixed></mixed>')

    assert.strictEqual(document.createElement('br').outerHTML, '<br>')
  })

  it('serializes namespace declarations and closes foreign elements', () => {
    const document = createDocument('urn:test', 'root')
    const root = document.documentElement
    root.setAttributeNS('urn:attribute', 'value', 'yes')
    root.appendChild(document.createElementNS('urn:test', 'br'))

    const markup = root.outerHTML
    assert.match(markup, /^<root xmlns="urn:test"/)
    assert.match(markup, /xmlns:ns1="urn:attribute"/)
    assert.match(markup, /ns1:value="yes"/)
    assert.match(markup, /<br><\/br>/)

    const parsed = new Document(null)
    HTMLParser(markup, parsed)
    assert.strictEqual(parsed.documentElement.namespaceURI, 'urn:test')
    assert.strictEqual(parsed.documentElement.getAttributeNS('urn:attribute', 'value'), 'yes')

    const htmlDocument = createHTMLDocument()
    assert.strictEqual(htmlDocument.createElement('br').outerHTML, '<br>')
  })

  it('serializes XHTML elements in XML documents with XML rules', () => {
    const document = createSVGDocument()
    const foreignObject = document.createElementNS(svg, 'foreignObject')
    const br = document.createElementNS('http://www.w3.org/1999/xhtml', 'br')
    document.documentElement.appendChild(foreignObject)
    foreignObject.appendChild(br)

    const markup = document.documentElement.outerHTML
    assert.match(markup, /<br xmlns="http:\/\/www.w3.org\/1999\/xhtml"><\/br>/)

    const parsed = new Document(null)
    HTMLParser(markup, parsed)
    assert.strictEqual(parsed.documentElement.firstChild.firstChild.namespaceURI, 'http://www.w3.org/1999/xhtml')
  })

  it('serializes colliding attribute prefixes without rebinding earlier names', () => {
    const document = createDocument('urn:element', 'p:root')
    const root = document.documentElement
    root.setAttributeNS('urn:first', 'p:first', 'one')
    root.setAttributeNS('urn:second', 'p:second', 'two')

    const markup = root.outerHTML
    const parsed = new Document(null)
    HTMLParser(markup, parsed)

    assert.strictEqual(parsed.documentElement.namespaceURI, 'urn:element')
    assert.strictEqual(parsed.documentElement.getAttributeNS('urn:first', 'first'), 'one')
    assert.strictEqual(parsed.documentElement.getAttributeNS('urn:second', 'second'), 'two')
  })

  it('serializes descendant outerHTML with self-contained namespace bindings', () => {
    const document = createDocument('urn:root', 'root')
    const root = document.documentElement
    const child = document.createElementNS('urn:root', 'child')
    root.setAttributeNS(xmlns, 'xmlns:q', 'urn:q')
    child.setAttributeNS('urn:q', 'q:value', 'yes')
    root.appendChild(child)

    const childMarkup = child.outerHTML
    assert.match(childMarkup, /xmlns="urn:root"/)
    assert.match(childMarkup, /xmlns:q="urn:q"/)

    const parsedChild = new Document(null)
    HTMLParser(childMarkup, parsedChild)
    assert.strictEqual(parsedChild.documentElement.namespaceURI, 'urn:root')
    assert.strictEqual(parsedChild.documentElement.getAttributeNS('urn:q', 'value'), 'yes')

    const rootMarkup = root.outerHTML
    assert.strictEqual(rootMarkup.match(/xmlns="urn:root"/g).length, 1)
    assert.strictEqual(rootMarkup.match(/xmlns:q="urn:q"/g).length, 1)
  })

  it('inherits the document namespace in createElement and rejects colon names in XML serialization', () => {
    const document = createDocument('urn:root', 'root')
    const root = document.documentElement
    const child = document.createElement('child')
    assert.strictEqual(child.namespaceURI, 'urn:root')

    root.setAttributeNS(xmlns, 'xmlns:q', 'urn:q')
    child.setAttribute('q:value', 'yes')
    root.appendChild(child)
    assert.throws(() => child.outerHTML, /Invalid State Error/)

    const colonElement = document.createElement('q:child')
    assert.strictEqual(colonElement.namespaceURI, 'urn:root')
    assert.strictEqual(colonElement.prefix, null)
    assert.strictEqual(colonElement.localName, 'q:child')
    assert.throws(() => colonElement.outerHTML, /Invalid State Error/)
  })

  it('parses fragment namespaces inherited from the host element', () => {
    const document = createSVGDocument()
    const root = document.documentElement
    root.setAttributeNS(xmlns, 'xmlns:q', 'urn:q')
    root.innerHTML = '<q:item q:value="yes"/><g/>'

    assert.strictEqual(root.children[0].namespaceURI, 'urn:q')
    assert.strictEqual(root.children[0].getAttributeNS('urn:q', 'value'), 'yes')
    assert.strictEqual(root.children[1].namespaceURI, svg)

    root.innerHTML = '<group xmlns="urn:group"><item/></group>'
    assert.strictEqual(root.firstChild.namespaceURI, 'urn:group')
    assert.strictEqual(root.firstChild.firstChild.namespaceURI, 'urn:group')

    root.innerHTML = '<group xmlns=""><item xmlns="urn:item"><plain xmlns=""/></item></group>'
    assert.strictEqual(root.firstChild.namespaceURI, null)
    assert.strictEqual(root.firstChild.firstChild.namespaceURI, 'urn:item')
    assert.strictEqual(root.firstChild.firstChild.firstChild.namespaceURI, null)
  })

  it('does not confuse user content with the synthetic fragment wrapper', () => {
    const document = createSVGDocument()
    const root = document.documentElement
    root.innerHTML = '<svgdom:wrapper xmlns:svgdom="urn:user"><svgdom:child/></svgdom:wrapper>'

    assert.strictEqual(root.children.length, 1)
    assert.strictEqual(root.firstChild.nodeName, 'svgdom:wrapper')
    assert.strictEqual(root.firstChild.namespaceURI, 'urn:user')
    assert.strictEqual(root.firstChild.firstChild.nodeName, 'svgdom:child')
    assert.strictEqual(root.firstChild.firstChild.namespaceURI, 'urn:user')

    assert.throws(() => {
      root.innerHTML = '<svgdom:item/>'
    }, /Unbound namespace prefix/)
  })

  it('creates, parses, and serializes CDATA sections', () => {
    const document = createSVGDocument()
    const cdata = document.createCDATASection('<direct>')
    assert.strictEqual(cdata.nodeType, cdata.CDATA_SECTION_NODE)
    assert.strictEqual(cdata.data, '<direct>')

    const root = document.documentElement
    root.innerHTML = '<g><![CDATA[<fragment>&text]]></g>'
    const parsed = root.firstChild.firstChild
    assert.strictEqual(parsed.nodeType, parsed.CDATA_SECTION_NODE)
    assert.strictEqual(parsed.data, '<fragment>&text')
    assert.match(root.outerHTML, /<!\[CDATA\[<fragment>&text\]\]>/)

    assert.throws(() => document.createCDATASection('bad]]>data'), /Invalid Character Error/)
    assert.throws(() => createHTMLDocument().createCDATASection('data'), /Not Supported Error/)

    parsed.data = 'bad]]>data'
    assert.throws(() => root.outerHTML, /Invalid State Error/)
  })

  it('handles reserved element namespaces during XML serialization', () => {
    const document = createDocument(null, 'root')
    const xmlElement = document.createElementNS(xml, 'item')
    assert.strictEqual(xmlElement.outerHTML, '<xml:item></xml:item>')

    document.documentElement.setAttributeNS(xml, 'p:lang', 'en')
    assert.strictEqual(document.documentElement.outerHTML, '<root xml:lang="en"></root>')

    const parsed = new Document(null)
    HTMLParser(xmlElement.outerHTML, parsed)
    assert.strictEqual(parsed.documentElement.namespaceURI, xml)

    const xmlnsElement = document.createElementNS(xmlns, 'xmlns:item')
    assert.throws(() => xmlnsElement.outerHTML, /Invalid State Error/)
  })
})
