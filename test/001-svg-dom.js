import assert from 'assert'

import {DOMParser, XMLSerializer, DOMImplementation} from 'xmldom'

import svgdom from '../dom'

import fs from 'fs'

var svgString;
var svgDoc;

function makeEl (nodeName, attrs = {}) {
  var el = this.createElement (nodeName);
  Object.keys (attrs).forEach (attrName => {el.setAttribute (attrName, attrs[attrName])});
  return el;
}

describe ('svg document', () => {

  beforeEach (() => {
    svgDoc = new svgdom.constructor ().document;

    svgDoc.documentElement.appendChild (svgDoc.createTextNode ('\n  '));

    var g = makeEl.call (svgDoc, 'g', {
      id: 'g-1'
    });

    svgDoc.documentElement.appendChild (g);

    g.appendChild (svgDoc.createTextNode ('\n    '));

    var rect = makeEl.call (svgDoc, 'rect', {
      id: 'rect-1',
      x: 0,
      y: 0,
      width: 10,
      height: 10
    });

    g.appendChild (rect);

    g.appendChild (svgDoc.createTextNode ('\n    '));

    var rect = makeEl.call (svgDoc, 'rect', {
      id: 'rect-2',
      x: 0,
      y: 0,
      width: 10,
      height: 10
    });

    g.appendChild (rect);

    var circle = makeEl.call (svgDoc, 'circle', {
      id: 'circle-1',
      cx: 5,
      cy: 5,
      r: 5
    });

    g.appendChild (circle);

  })

  it ('should have children method for nodes', () => {
    assert(svgDoc.documentElement.children);
  })

  it ('should have createComment method', () => {
    assert(svgDoc.createComment ('xxx'));
  })

  it ('should have ownerSVGElement property for nodes', () => {
    assert(svgDoc.documentElement.ownerSVGElement);
    // assert(svgDoc.documentElement.ownerSVGElement === svgDoc.documentElement);
  })

})
