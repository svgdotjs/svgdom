const objectToMap = function(obj) {
  if(obj instanceof Map) return new Map(obj)
  return Object.keys(obj).reduce((map, key) => map.set(key, obj[key]), new Map());
}

const mapToObject = function(map) {
  var obj = {}
  map.forEach(function(value, key) {
    obj[key] = value
  })
  return obj
}

const mapMap = function(map, cb) {
  var arr = []
  map.forEach(function(value, key){
    arr.push(cb(value, key))
  })
  return arr
}

const mapToCss = function(myMap){
  return mapMap(myMap, function(value, key){
    if(!value) return false
    return key + ': ' + value
  }).filter(function(el){return !!el}).join('; ') || null
}

const cssToMap = function(css){
  return new Map(css.split(/\s*;\s*/).filter(function(el){return !!el}).map(function(el){
    return el.split(/\s*:\s*/)
  }))
}

module.exports = {
  mapMap,
  objectToMap,
  mapToObject,
  mapToCss,
  cssToMap
}