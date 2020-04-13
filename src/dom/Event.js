export class Event {
  constructor (type) {
    this.type = type
    this.cancelable = false
    this.defaultPrevented = false
  }

  preventDefault () {
    this.defaultPrevented = true
  }
}
