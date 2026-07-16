import { hexToRGB } from '../utils/strUtils.js'
import {
  normalizeStylePropertyName,
  parseStyleDeclarations,
  serializeStyleDeclarations,
  splitStylePriority
} from '../utils/styleUtils.js'

const isArrayIndex = (key) => typeof key === 'string' && /^(?:0|[1-9]\d*)$/.test(key)

export class CSSStyleDeclaration {
  constructor (element) {
    Object.defineProperty(this, '_element', { value: element })
  }

  getPropertyPriority (propertyName) {
    const name = normalizeStylePropertyName(propertyName)
    return this._declarations().find((declaration) => declaration.name === name)?.priority || ''
  }

  getPropertyValue (propertyName) {
    const name = normalizeStylePropertyName(propertyName)
    return this._declarations().find((declaration) => declaration.name === name)?.value || ''
  }

  item (index) {
    return this._declarations()[Number(index) >>> 0]?.name || ''
  }

  removeProperty (propertyName) {
    const name = normalizeStylePropertyName(propertyName)
    const declarations = this._declarations()
    const index = declarations.findIndex((declaration) => declaration.name === name)
    if (index === -1) return ''

    const [ { value } ] = declarations.splice(index, 1)
    this._write(declarations)
    return value
  }

  setProperty (propertyName, value = '', priority = '') {
    const name = normalizeStylePropertyName(propertyName)
    if (!name) return

    value = value == null ? '' : String(value)
    priority = priority == null ? '' : String(priority).toLowerCase()

    if (!value) {
      this.removeProperty(name)
      return
    }

    if (priority !== '' && priority !== 'important') return
    if (splitStylePriority(value).priority) return

    if (!name.startsWith('--') && /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/.test(value)) {
      value = hexToRGB(value)
    }

    const declarations = this._declarations()
    const existing = declarations.find((declaration) => declaration.name === name)

    if (existing) {
      existing.value = value.trim()
      existing.priority = priority
    } else {
      declarations.push({ name, value: value.trim(), priority })
    }

    this._write(declarations)
  }

  _declarations () {
    return parseStyleDeclarations(this._element.getAttribute('style') || '')
  }

  _write (declarations) {
    this._element.setAttribute('style', serializeStyleDeclarations(declarations))
  }

  get cssText () {
    return serializeStyleDeclarations(this._declarations())
  }

  set cssText (value) {
    this._write(parseStyleDeclarations(value))
  }

  get length () {
    return this._declarations().length
  }

  get parentRule () {
    return null
  }
}

Object.defineProperty(CSSStyleDeclaration.prototype, Symbol.toStringTag, {
  value: 'CSSStyleDeclaration'
})

export const createCSSStyleDeclaration = (element) => {
  const declaration = new CSSStyleDeclaration(element)

  return new Proxy(declaration, {
    get (target, key, receiver) {
      if (isArrayIndex(key)) return target.item(key)
      if (typeof key === 'symbol' || key in target) return Reflect.get(target, key, receiver)
      return target.getPropertyValue(key)
    },

    set (target, key, value, receiver) {
      if (key === 'cssText') {
        target.cssText = value
        return true
      }

      if (typeof key === 'symbol' || key in target) return Reflect.set(target, key, value, receiver)
      if (isArrayIndex(key)) return true

      target.setProperty(key, value)
      return true
    },

    getOwnPropertyDescriptor (target, key) {
      if (isArrayIndex(key) && Number(key) < target.length) {
        return { configurable: true, enumerable: true, value: target.item(key), writable: false }
      }
      return Reflect.getOwnPropertyDescriptor(target, key)
    },

    ownKeys (target) {
      const indices = Array.from({ length: target.length }, (_, index) => String(index))
      return [ ...indices, ...Reflect.ownKeys(target) ]
    }
  })
}
