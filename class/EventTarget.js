const $ = Symbol('private properties')

class EventTarget {
  constructor () {
    this[$] = {}
    this[$].listeners = {}
  }

  addEventListener (type, callback) {
    if (!(type in this[$].listeners)) {
      this[$].listeners[type] = []
    }
    this[$].listeners[type].push(callback)
  }

  removeEventListener (type, callback) {
    if (!(type in this[$].listeners)) {
      return
    }

    var stack = this[$].listeners[type]
    for (var i = 0, il = stack.length; i < il; i++) {
      if (stack[i] === callback) {
        stack.splice(i, 1)
        return
      }
    }
  }

  dispatchEvent (event) {
    if (!(event.type in this[$].listeners)) { return true }

    var stack = this[$].listeners[event.type]
    event.target = this

    stack.forEach(function (el) {
      el(event)
    })

    return !event.defaultPrevented
  }

}

module.exports = EventTarget
