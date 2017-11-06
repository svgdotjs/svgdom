import puppeteer from 'puppeteer';

import assert from 'assert'

import {DOMParser, XMLSerializer, DOMImplementation} from 'xmldom'

import svgdom from '../dom'

import fs from 'fs'

var svgString;
var svgDoc;
var svgRoot;

function makeEl (nodeName, attrs = {}) {
  var svgNS = 'http://www.w3.org/2000/svg';
  var el = this.createElementNS (svgNS, nodeName);
  Object.keys (attrs).forEach (attrName => {el.setAttribute (attrName, attrs[attrName])});
  return el;
}

var browser, page;

var testEnv = process.env.TEST_BROWSER ? 'browser' : 'node';

function wrappedIt (message, testFn) {
  if (testEnv === 'browser') {
    return it (message, () => page.evaluate (testFn)); // page.evaluate will return promise
  }
  return it (message, testFn);
}

wrappedIt.skip = function (message, testFn) {
  return it.skip (message, testFn);
}

wrappedIt.only = function (message, testFn) {
  if (testEnv === 'browser') {
    return it.only (message, () => page.evaluate (testFn)); // page.evaluate will return promise
  }
  return it.only (message, testFn);
}

describe ('svg document', () => {

  before (async () => {

    if (testEnv === 'browser') {

      var crConfig = {
        headless: false, // replace with false to check rendering
        args: [
          '--disable-infobars',
          '--disable-gpu',
          // '--disable-web-security',
          // '--user-data-dir'
        ]
      };

      if (process.env.CHROMIUM_PATH) {
        crConfig.executablePath = process.env.CHROMIUM_PATH + "/Contents/MacOS/Chromium";
      }

      browser = await puppeteer.launch (crConfig);
      page = await browser.newPage ();

      await page.goto(
        'about:blank',
        {waitUntil: 'load'}
      );

      await page.evaluate (() => {
        window.assert = function (check, message) {
          if (!check) throw (message || "Assertion failed");
        }

        window.assert.equal = function (value1, value2, message) {
          if (value1 !== value2) throw (message || "Assertion failed");
        }
      })

    }
  });

  after (async () => {
    await setTimeout (10000);
    browser && browser.close ();
  })

  beforeEach (async () => {

    function prepare () {

      var svgNS = 'http://www.w3.org/2000/svg';

      svgRoot.appendChild (svgDoc.createTextNode ('\n  '));

      var g = svgDoc.createElementNS (svgNS, 'g')
      g.id = 'g-1';

      svgRoot.appendChild (g);

      g.appendChild (svgDoc.createTextNode ('\n    '));

      var rect = svgDoc.createElementNS (svgNS, 'rect')
      rect.id = 'rect-1';
      rect.setAttribute ('x', 0);
      rect.setAttribute ('y', 0);
      rect.setAttribute ('width', 10);
      rect.setAttribute ('height', 10);

      g.appendChild (rect);

      g.appendChild (svgDoc.createTextNode ('\n    '));

      rect = svgDoc.createElementNS (svgNS, 'rect')
      rect.id = 'rect-2';
      rect.setAttribute ('x', 0);
      rect.setAttribute ('y', 0);
      rect.setAttribute ('width', 10);
      rect.setAttribute ('height', 10);

      g.appendChild (rect);


      var circle = svgDoc.createElementNS (svgNS, 'circle')
      circle.id = 'circle-1';
      circle.setAttribute ('cx', 5);
      circle.setAttribute ('cy', 5);
      circle.setAttribute ('r',  5);

      g.appendChild (circle);

      var text = svgDoc.createElementNS (svgNS, 'text')
      text.id = 'text-1';
      text.setAttribute ('x', 5);
      text.setAttribute ('y', 5);

      text.appendChild (svgDoc.createTextNode ('TEXT'));

      g.appendChild (text);

    }

    if (testEnv === 'browser') {
      await page.evaluate (() => {
        var svgNS = 'http://www.w3.org/2000/svg';
        var svg = window.svgRoot = document.createElementNS (svgNS,'svg');
        svg.setAttribute ('xmlns:xlink','http://www.w3.org/1999/xlink');
        svg.setAttribute ('height','400');
        svg.setAttribute ('width','400');
        svg.setAttribute ('viewPort','0 0 400 400');
        svg.setAttribute ('style', 'background-color: #eee');

        document.body.appendChild (svg);
        window.svgDoc = document;
      })

      await page.evaluate (prepare);
    } else {
      svgDoc = new svgdom.constructor ().document;
      svgRoot = svgDoc.documentElement;

      prepare ();
    }

  })

  wrappedIt ('should have children method for nodes', () => {
    assert(svgRoot.children);
  })

  wrappedIt ('should have createComment method', () => {
    assert(svgDoc.createComment ('xxx'));
  })

  wrappedIt ('should have ownerSVGElement property for nodes', () => {
    assert(svgRoot.ownerSVGElement);
    // assert(svgRoot.ownerSVGElement === svgRoot);
  })

  wrappedIt ('transform: rotate', () => {

    var circle = svgRoot.querySelector('#circle-1');

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


  wrappedIt ('transforms', () => {
    var rect = svgRoot.querySelector('#rect-1');

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

    var rect2 = svgRoot.querySelector('#rect-2');

    rect2.setAttribute ('transform', 'translate(15, 0)');

    var circle = svgRoot.querySelector('#circle-1');

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

    var g = svgRoot.querySelector('#g-1');

    bbox = g.getBBox();

    /*
    console.log (bbox);

    assert.equal (bbox.x, 0);
    assert.equal (bbox.y, 0);
    assert.equal (bbox.width, 25);
    assert.equal (bbox.height, 10);
    */
  })

  wrappedIt ('transform: translateX', () => {

    var rect = svgRoot.querySelector('#rect-1');

    var bbox1 = rect.getBBox();

    rect.setAttribute ('transform', 'translate(15)');

    var bbox2 = rect.getBBox();

    assert.equal (bbox1.x, bbox2.x - 15);

  })

  wrappedIt ('transform: scaleXY', () => {

    var rect = svgRoot.querySelector('#rect-1');

    var bbox1 = rect.getBBox();

    rect.setAttribute ('transform', 'scale(2, 0.5)');

    var bbox2 = rect.getBBox();

    assert.equal (bbox1.width, bbox2.width/2);
    assert.equal (bbox1.height, bbox2.height*2);

  })

  wrappedIt ('exposed style attribute on attributes enumeration', () => {

    var connector = svgRoot.querySelector('#rect-1');

    assert.equal (connector.getAttribute ('style'), null);

    connector.style.fill = "black";

    assert (connector.getAttribute ('style').match(/^fill:\s*black\b/));

    assert ([].some.call (connector.attributes, attr => attr.nodeName === 'style'));
  })

  wrappedIt ('should match [attr^=startsWith] css selector', () => {

    var connector = svgRoot.querySelector('[id^=rect-1]');

    assert (connector);

    var connectors = svgRoot.querySelectorAll ('[id^=rect]');

    assert (connectors);

    assert.equal (connectors.length, 2);
  })

  wrappedIt ('text-anchor should affect bbox', () => {

    var text = svgRoot.querySelector('#text-1');

    assert (text);

    var bbox1 = text.getBBox ();

    text.setAttribute ('text-anchor', 'end');

    var bbox2 = text.getBBox ();

    console.log (bbox1, bbox2)

    assert.equal (bbox1.x, bbox2.x + bbox2.width);
    assert.equal (bbox1.y, bbox2.y);
    assert.equal (bbox1.width, bbox2.width);

  })

})
