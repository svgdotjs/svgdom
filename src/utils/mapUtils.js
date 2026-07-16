import { decamelize } from '../utils/strUtils.js'
import { parseStyleDeclarations } from './styleUtils.js'

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
  return new Map(parseStyleDeclarations(css).map(({ name, value }) => [ name, value ]))
}
