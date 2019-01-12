const { invent } = require('../utils/objectCreationUtils')
const $ = Symbol('private properties')

const EventTarget = invent({
  name: 'EventTarget',
  create: function () {
    this[$] = {}
    this[$].listeners = {}
  },
  extend: {
    addEventListener: function (type, callback) {
      if (!(type in this[$].listeners)) {
        this[$].listeners[type] = []
      }
      this[$].listeners[type].push(callback)
    },
    removeEventListener: function (type, callback) {
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
    },
    dispatchEvent: function (event) {
      if (!(event.type in this[$].listeners)) { return true }

      var stack = this[$].listeners[event.type]
      event.target = this

      stack.forEach(function (el) {
        el(event)
      })

      return !event.defaultPrevented
    }
  }
})

module.exports = EventTarget
