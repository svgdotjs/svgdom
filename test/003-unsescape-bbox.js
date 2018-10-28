
import svgdom from '../dom'
const bbox = require('../utils/bboxUtils')
import assert from 'assert'

describe("unescape-bbox",() => {
    it(" bbox('<').x should be less then bbox('WW') ", ()=>{
        var svgDoc = new svgdom.constructor ().document;
        var svgRoot = svgDoc.documentElement;
        var textLt = svgDoc.createElement("text");
        textLt.textContent="<";
        var textWW = svgDoc.createElement("text");
        textWW.textContent="W";
        svgRoot.appendChild(textLt);
        svgRoot.appendChild(textWW);
        var bboxLt = bbox(textLt);
        var bboxWW = bbox(textWW);
        assert(bboxLt.width < bboxWW.width);
    });
});
