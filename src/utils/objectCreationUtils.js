export const extend = (...modules) => {
  var methods, key, i

  // Get object with extensions
  methods = modules.pop()

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) { modules[i].prototype[key] = methods[key] }
  }
}

export const extendStatic = (...modules) => {
  var methods, key, i

  // Get object with extensions
  methods = modules.pop()

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) { modules[i][key] = methods[key] }
  }
}

export const mixInterface = (_interface, _class) => {
  const descriptors = Object.getOwnPropertyDescriptors(_interface)
  const all = Object.getOwnPropertyNames(_interface)

  const propNames = descriptors.map((d) => d.value)
  const methodNames = all.filter(p => !propNames.includes(p))

  for (const method of methodNames) {
    _class.prototype[method] = _interface[method]
  }

  Object.defineProperties(descriptors)
}
