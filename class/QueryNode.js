const {invent} = require('../utils/objectCreationUtils')
const {removeQuotes} = require('../utils/strUtils')
const regex = require('../utils/regex')

const matcherFuncs = {
  '=': (a,b) => a == b,
  '~=': (a,b) => a.split(regex.delimiter).indexOf(b) > -1,
  '|=': (a,b) => a.split(regex.delimiter)[0] == b,
  '^=': (a,b) => a.startsWith(b),
  '$=': (a,b) => a.endsWith(b),
  '*=': (a,b) => a.includes(b),
  '*': (a,b) => a != null,
}

const QueryNode = invent({
  name:'QueryNode',
  create: function(node){
    this.tag = ''
    this.id = ''
    this.classList = []
    this.attrs = []

    // match the tag name
    var matches = node.match(/^[\w-]*|\*/)
    if(matches){
      this.tag = matches[0]
      node = node.slice(this.tag.length)
    }

    // match the id
    matches = node.match(/#([\w-]+)/)
    if(matches){
      this.id = matches[1]
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[1].length)
    }

    // match classes
    while(matches = /\.([\w-]+)/g.exec(node)){
      this.classList.push(matches[1])
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[1].length)
    }

    // match attributes
    while(matches = /\[([\w-]+)(([=^~$|*]+)(.+?))?\]/g.exec(node)){
      this.attrs.push({key: matches[1], value: removeQuotes(matches[4] || ''), matcher: matcherFuncs[matches[3] || '*']})
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[1].length)
    }
  }, extend: {
    matches: function(node) {
      var i

      if(this.tag && this.tag != node.nodeName && this.tag != '*')
        return false

      if(this.id && this.id != node.id){
        return false
      }

      var classList = (node.getAttribute('class') || '').split(regex.delimiter).filter(el => !!el.length)
      if(this.classList.filter(className => classList.indexOf(className) < 0).length) {
        return false
      }

      for(i = this.attrs.length; i--;){
        if(!this.attrs[i].matcher(node.getAttribute(this.attrs[i].key), this.attrs[i].value)) {
          return false
        }
      }

      return true
    }
  }
})

module.exports = QueryNode