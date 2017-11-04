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

  it ('transform: rotate', () => {

    var circle = svgDoc.querySelector('#circle-1');

    var bbox1 = circle.getBBox();

    circle.setAttribute ('transform', 'rotate (180)');

    var bbox2 = circle.getBBox();

    // floats!
    assert (bbox1.x - bbox2.x < 10.001);
    assert (bbox1.x - bbox2.x >  9.999);
    assert (bbox1.y - bbox2.y < 10.001);
    assert (bbox1.y - bbox2.y >  9.999);
    assert.equal (bbox1.width.toFixed(3), bbox2.width.toFixed(3));
    assert.equal (bbox1.height.toFixed(3), bbox2.height.toFixed(3));

    circle.setAttribute ('transform', 'rotate (90, 5, 5)');

    var bbox3 = circle.getBBox();

    assert.equal (bbox1.x.toFixed(3), bbox3.x.toFixed(3));
    assert.equal (bbox1.y.toFixed(3), bbox3.y.toFixed(3));
    assert.equal (bbox1.width, bbox3.width);
    assert.equal (bbox1.height, bbox3.height);

  })


  it ('transforms', () => {
    var rect = svgDoc.querySelector('#rect-1');

    var x = 0, y = 0, width = 10, height = 10;

    var bbox = rect.getBBox();

    assert.equal (bbox.x, x);
    assert.equal (bbox.y, y);
    assert.equal (bbox.width, width);
    assert.equal (bbox.height, height);

    rect.setAttribute ('transform', 'rotate(45)');

    bbox = rect.getBBox();

    assert (bbox.width > width);
    assert.equal (bbox.width, Math.sqrt (2*width*width));
    assert (bbox.height > height);
    assert.equal (bbox.height, Math.sqrt (2*height*height));

    rect.setAttribute ('transform', '');

    var rect2 = svgDoc.querySelector('#rect-2');

    rect2.setAttribute ('transform', 'translate(15, 0)');

    var circle = svgDoc.querySelector('#circle-1');

    bbox = circle.getBBox();

    assert.equal (bbox.x, x);
    assert.equal (bbox.y, y);
    assert.equal (bbox.width, width);
    assert.equal (bbox.height, height);

    circle.setAttribute ('transform', 'translate(15, 0)');

    bbox = circle.getBBox();

    assert.equal (bbox.x, x + 15);
    assert.equal (bbox.width, width);

    // scales from 0, 0
    circle.setAttribute ('transform', 'scale(2)');

    bbox = circle.getBBox();

    assert.equal (bbox.x, x);
    assert.equal (bbox.y, y);
    assert.equal (bbox.width, width*2);
    assert.equal (bbox.height, height*2);

    var g = svgDoc.querySelector('#g-1');

    bbox = g.getBBox();

    /*
    console.log (bbox);

    assert.equal (bbox.x, 0);
    assert.equal (bbox.y, 0);
    assert.equal (bbox.width, 25);
    assert.equal (bbox.height, 10);
    */
  })

  it ('translateX', () => {

    var rect = svgDoc.querySelector('#rect-1');

    var bbox1 = rect.getBBox();

    rect.setAttribute ('transform', 'translate(15)');

    var bbox2 = rect.getBBox();

    assert.equal (bbox1.x, bbox2.x - 15);

  })

  it ('scaleXY', () => {

    var rect = svgDoc.querySelector('#rect-1');

    var bbox1 = rect.getBBox();

    rect.setAttribute ('transform', 'scale(2, 0.5)');

    var bbox2 = rect.getBBox();

    assert.equal (bbox1.width, bbox2.width/2);
    assert.equal (bbox1.height, bbox2.height*2);

  })

  it ('exposed style attribute on attributes enumeration', () => {

    var connector = svgDoc.querySelector('#rect-1');

    assert.equal (connector.getAttribute ('style'), null);

    connector.style.fill = "black";

    assert.equal (connector.getAttribute ('style'), 'fill: black');

    assert (connector.attributes.some (attr => attr.nodeName === 'style'));
  })

})
