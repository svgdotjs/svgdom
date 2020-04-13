import { Event } from './Event.js'
export class CustomEvent extends Event {
  constructor (name, props = {}) {
    super(name)
    this.detail = props.detail || null
    this.cancelable = props.cancelable || false
  }
}
