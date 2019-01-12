var extend = function () {
  var modules, methods, key, i

  // Get list of modules
  modules = [].slice.call(arguments)

  // Get object with extensions
  methods = modules.pop()

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) { modules[i].prototype[key] = methods[key] }
  }
}

var extendClass = function () {
  var modules, methods, key, i

  // Get list of modules
  modules = [].slice.call(arguments)

  // Get object with extensions
  methods = modules.pop()

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) { modules[i][key] = methods[key] }
  }
}

var invent = function (config) {
  var initializer = config.create || function () {}

  if (config.name) { Object.defineProperty(initializer, 'name', { value: config.name }) }

  // Inherit prototype
  if (config.inherit) {
    initializer.prototype = Object.create(config.inherit.prototype)
  }

  initializer.prototype.constructor = initializer

  // Extend with methods
  if (config.extend) { extend(initializer, config.extend) }

  if (config.props) {
    for (var i in config.props) { Object.defineProperty(initializer.prototype, i, config.props[i]) }
  }

  return initializer
}

module.exports = {
  invent: invent,
  extend: extend,
  extendClass: extendClass
}
