import { decamelize } from '../utils/strUtils.js'

export const objectToMap = function (obj) {
  if (obj instanceof Map) return new Map(obj)
  return Object.keys(obj).reduce((map, key) => map.set(key, obj[key]), new Map())
}

export const mapToObject = function (map) {
  var obj = {}
  map.forEach(function (value, key) {
    obj[key] = value
  })
  return obj
}

export const mapMap = function (map, cb) {
  var arr = []
  map.forEach(function (value, key) {
    arr.push(cb(value, key))
  })
  return arr
}

export const mapToCss = function (myMap) {
  return mapMap(myMap, function (value, key) {
    if (!value) return false
    return decamelize(key) + ': ' + value
  }).filter(function (el) { return !!el }).join('; ') + ';' || null
}

export const cssToMap = function (css) {
  return new Map(css.split(/\s*;\s*/).filter(function (el) { return !!el }).map(function (el) {
    return el.split(/\s*:\s*/)
  }))
}
