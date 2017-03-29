// Ensure to six-based hex
const fullHex = function(hex) {
  return hex.length == 4 ?
    [ '#',
      hex.substring(1, 2), hex.substring(1, 2)
    , hex.substring(2, 3), hex.substring(2, 3)
    , hex.substring(3, 4), hex.substring(3, 4)
    ].join('') : hex
}

const hexToRGB = function(a) {
  if(typeof a == 'object'){
    for(var i in a) {
      a[i] = hexToRGB(a[i])
    }
    return a
  }

  if(!/#[0-9a-f]{3,6}/.test(a))
    return a

  a = fullHex(a)


  return 'rgb(' + [
    parseInt(a.slice(1,3), 16),
    parseInt(a.slice(3,5), 16),
    parseInt(a.slice(5,7), 16)
    ].join(',') + ')'
}

function camelCase(s) {
  return s.toLowerCase().replace(/-(.)/g, function(m, g) {
    return g.toUpperCase()
  })
}

function removeQuotes(str){
  if(str.startsWith('"')){
    return str.slice(1,-1)
  }
  return str
}

function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = {
  fullHex,
  hexToRGB,
  camelCase,
  removeQuotes,
  htmlEntities
}