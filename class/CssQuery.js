const {invent} = require('../utils/objectCreationUtils')
const {removeQuotes, splitNotInBrackets} = require('../utils/strUtils')
const regex = require('../utils/regex')

const CssQuery = invent({
  name: 'CssQuery',
  create: function(query){

    if(CssQuery.cache.has(query)) {
      this.queries = CssQuery.cache.get(query)
      return
    }

    var queries = splitNotInBrackets(query, ',')

    queries = queries.map(query => {

      var roundBrackets = 0, squareBrackets = 0

      // make sure there is a space before and after every relation sign (>~+)
      //for(var i = 0, il = query.length; i < il; ++i) {
      //  var ch = query.charAt(i)
      //
      //  if(ch == '(') ++roundBrackets
      //  else if(ch == ')') --roundBrackets
      //  else if(ch == '[') ++squareBrackets
      //  else if(ch == ']') --squareBrackets
      //
      //  if(squareBrackets || roundBrackets) continue
      //
      //  if('>~+'.indexOf(ch) > -1) {
      //    query = query.substr(0, i) + ' ' + ch + ' ' + query.substr(i+1)
      //    i+=2
      //    il+=2
      //  }
      //}
      
      // this is the same as above but easier
      query.replace(/[()\[\]>~+]/g, function (ch) {
        if(ch == '(') ++roundBrackets
        else if(ch == ')') --roundBrackets
        else if(ch == '[') ++squareBrackets
        else if(ch == ']') --squareBrackets
      
        if(squareBrackets || roundBrackets) return ch
        
        return ' ' + ch + ' '
      })

      // split at space and remove empty results
      query = splitNotInBrackets(query, ' ').filter(el => !!el.length)

      var pairs = []
        , relation = '%'

      // generate querynode relation tuples
      for(var i = 0, il = query.length; i < il; ++i) {

        if('>~+%'.indexOf(query[i]) > -1) {
          relation = query[i]
          continue
        }

        pairs.push([relation, query[i]])
        relation = '%'

      }

      return pairs


      return ['%'].concat(query).reduce((l,c,i) => {
        i % 2 ? l[l.length-1].push(c) : l.push([c])
        return l
      }, [])

    })

    this.queries = queries

    // to prevent memory leaks we have to manage our cache.
    // we delete everything which is older than 50 entries
    if(CssQuery.cacheKeys.length > 50) {
      CssQuery.cache.delete(CssQuery.cacheKeys.shift())
    }
    CssQuery.cache.set(query, queries)
    CssQuery.cacheKeys.push(query)

  }, extend: {
    matches: function(node) {
      for(var i = this.queries.length;i--;) {
        if(this.matchHelper(this.queries[i], node)) return true
      }
    },
    matchHelper: function(query, node) {
      query = query.slice()
      var last = query.pop()

      if(!new CssQueryNode(last[1]).matches(node))
        return false

      if(!query.length) return true

      if(last[0] == ',') return true

      if(last[0] == '+'){
        return !!node.previousSibling && this.matchHelper(query, node.previousSibling)
      }

      if(last[0] == '>'){
        return !!node.parentNode && this.matchHelper(query, node.parentNode)
      }

      if(last[0] == '~'){
        while(node = node.previousSibling){
          if(this.matchHelper(query, node))
            return true
        }
        return false
      }

      if(last[0] == '%'){
        while(node = node.parentNode){
          if(this.matchHelper(query, node))
            return true
        }
        return false
      }
    }
  }
})

CssQuery.cache = new Map()
CssQuery.cacheKeys = []

// check if [node] is the [nth] child of [arr] where nth can also be a formula
const nth = (node, arr, nth) => {

  if(nth == 'even') nth = '2n'
  else if(nth == 'odd') nth = '2n+1'

  // check for eval chars
  if(/[^\d\-n+*/]+/.test(nth)) return false

  nth = nth.replace('n', '*n')

  // eval nth to get the index
  for(var i, n = 0, nl = arr.length; n < nl; ++n) {
    i = eval(nth)

    if(i > nl) break
    if(arr[i-1] == node) return true
  }

  return false
}

const lower = a => a.toLowerCase()

// checks if a and b are equal. Is insensitive when i is true
const eq = (a, b, i) => i ? lower(a) == lower(b) : a == b


// [i] (prebound) is true if insensitive matching is required
// [a] (prebound) is the value the attr is compared to
// [b] (passed)   is the value of the attribute
const attributeMatcher = {
  '=':  (i, a, b) => eq(a, b, i),
  '~=': (i, a, b) => b.split(regex.delimiter).filter(el => eq(el, a, i)).length > 0,
  '|=': (i, a, b) => eq(b.split(regex.delimiter)[0], a, i),
  '^=': (i, a, b) => i ? lower(b).startsWith(lower(a)) : b.startsWith(a),
  '$=': (i, a, b) => i ? lower(b).endsWith(lower(a)) : b.endsWith(a),
  '*=': (i, a, b) => i ? lower(b).includes(lower(a)) : b.includes(a),
  '*':  (i, a, b) => b != null,
}

// [a] (prebound) [a]rgument of the pseudo selector
// [n] (passed)   [n]ode
const pseudoMatcher = {
  'first-child':     (a, n) => n.parentNode && n.parentNode.firstChild == n,
  'last-child':      (a, n) => n.parentNode && n.parentNode.lastChild == n,
  'nth-child':       (a, n) => n.parentNode && nth(n, n.parentNode.childNodes, a),
  'nth-last-child':  (a, n) => n.parentNode && nth(n, n.parentNode.childNodes.slice().reverse(), a),
  'first-of-type':   (a, n) => n.parentNode && n.parentNode.childNodes.filter(el => el.nodeName == n.nodeName)[0] == n,
  'last-of-type':    (a, n) => n.parentNode && n.parentNode.childNodes.filter(el => el.nodeName == n.nodeName).pop() == n,
  'nth-of-type':     (a, n) => n.parentNode && nth(n, n.parentNode.childNodes.filter(el => el.nodeName == n.nodeName), a),
  'nth-last-of-type':(a, n) => n.parentNode && nth(n, n.parentNode.childNodes.filter(el => el.nodeName == n.nodeName).reverse(), a),
  'only-child':      (a, n) => n.parentNode && n.parentNode.childNodes.length == 1,
  'only-of-type':    (a, n) => n.parentNode && n.parentNode.childNodes.filter(el => el.nodeName == n.nodeName).length == 1,
  'root':            (a, n) => n.ownerDocument.documentElement == n,
  'not':             (a, n) => !(new CssQuery(a)).matches(n),
  'matches':         (a, n) => (new CssQuery(a)).matches(n)
}

const CssQueryNode = invent({
  name:'CssQueryNode',
  create: function(node){
    this.tag = ''
    this.id = ''
    this.classList = []
    this.attrs = []
    this.pseudo = []

    // match the tag name
    var matches = node.match(/^[\w-]+|\*/)
    if(matches){
      this.tag = matches[0]
      node = node.slice(this.tag.length)
    }

    // match pseudo classes
    while(matches = /:([\w-]+)(?:\((.+)\))?/g.exec(node)){
      this.pseudo.push(pseudoMatcher[matches[1]].bind(this, removeQuotes(matches[2] || '')))
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[0].length)
    }

    // match the id
    matches = node.match(/#([\w-]+)/)
    if(matches){
      this.id = matches[1]
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[0].length)
    }

    // match classes
    while(matches = /\.([\w-]+)/g.exec(node)){
      this.classList.push(matches[1])
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[0].length)
    }

    // match attributes
    while(matches = /\[([\w-]+)(([=^~$|*]+)(.+?)( +[iI])?)?\]/g.exec(node)){
      this.attrs.push({
        name: matches[1],
        matcher: attributeMatcher[matches[3] || '*'].bind(
          this,
          !!matches[5], // case insensitive yes/no
          removeQuotes((matches[4] || '').trim()) // attribute value
        )
      })
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[0].length)
    }

  }, extend: {
    matches: function(node) {
      var i

      if(node.nodeType != 1) return false

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
        if(!this.attrs[i].matcher(node.getAttribute(this.attrs[i].name))) {
          return false
        }
      }

      for(i = this.pseudo.length; i--;){
        if(!this.pseudo[i](node)) {
          return false
        }
      }

      return true
    }
  }
})

module.exports = CssQuery
