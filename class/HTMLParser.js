const {SVGElement} = require('./Node')
const TextSVGElement = require('./TextSVGElement')
const attrsReg = / (\w+)(?:="(.*?)")?/g

function throwError(msg, col, str) {
  throw new Error([msg, 'at col.', col, 'in', str].join(' '))
}

const HTMLParser = function(str) {
  var index = 0
  var matches, attrs, tag, tagName, opened, closed
  const nodes = []
  const tagNameReg = /<(\/)?(\w+)(?: .+?)?(\/)?>/g

  while(index < str.length){

    // check if we have some text at start and create TextSVGElement
    newIndex = str.indexOf('<', index)
    if(index != newIndex){
      nodes.push(new TextSVGElement(str.slice(index)))
      if(newIndex == -1) break
    }

    // match tag start
    tag = tagNameReg.exec(str)

    // throw error when this is a closing tag
    if(tag[1]) throwError('No matching opening tag found for ' + tag[0], tag.index, str)

    // pull tagname from match
    tagName = tag[2]

    // reset the attribute regex
    attrsReg.lastIndex = 0

    // match attributes of tag
    attrs = {}
    while(matches = attrsReg.exec(tag[0])){
      attrs[matches[1]] = matches[2] || ''
    }

    // create node
    var node = new SVGElement(tagName, {attrs:attrs})
    nodes.push(node)

    // backup lastIndex of regex for later use
    index = tagNameReg.lastIndex
    
    // if tag is selfclosing we can continue because we are done here
    if(tag[3]){
      continue
    }

    // reset counter for opened and closed tags
    opened = 0
    closed = 0

    // search for closing tag
    while(matches = tagNameReg.exec(str)){
      //selfclosing - we did not find anything
      if(matches[3]) continue

      // we find a potential candidate
      if(matches[2] == tagName) {

        // its an opening tag
        if(!matches[1]) {
          ++opened
          continue
        }

        // we did not close all open tags yet
        if(opened != closed){
          ++closed
          continue
        }

        // all checks passed. That's the tag we are looking for
        break
      }

      // increase counters
      if(matches[1]) {
        ++closed
        if(closed > opened) throwError('Closing tag ' + matches[0] + ' was found which was not opened before', matches.index, str)
      }else{
        ++opened
      }
    }

    if(!matches) throwError('No matching closing tag found for ' + tag[0], str.length, str)

    // create a new parser for content of this tag and append returned children to node
    var childSVGElements = HTMLParser(str.slice(index, matches.index))
    for(var i = 0, il = childSVGElements.length; i < il; ++i) {
      node.appendChild(childSVGElements[i])
    }

    // update index
    index = tagNameReg.lastIndex

  }

  return nodes
}

module.exports = HTMLParser
