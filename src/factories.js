import { Window } from './dom/Window.js'
import { DOMImplementation } from './dom/Document.js'
import * as namespaces from './utils/namespaces.js'

const { createDocument, createHTMLDocument } = DOMImplementation

const createWindow = (...args) => {
  const window = new Window()
  const document = createDocument(...args)
  window.document = document
  document.defaultView = window
  return window
}

const createHTMLWindow = (title) => {
  const window = new Window()
  const document = DOMImplementation.createHTMLDocument(title)
  window.document = document
  document.defaultView = window
  return window
}

const createSVGWindow = () => {
  return createWindow(namespaces.svg, 'svg')
}

const createSVGDocument = () => {
  return createDocument(namespaces.svg, 'svg')
}

export {
  createDocument,
  createHTMLDocument,
  createSVGDocument,
  createWindow,
  createHTMLWindow,
  createSVGWindow
}
