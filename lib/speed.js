'use strict'

const { EventEmitter } = require('events')

module.exports = function speed (options = {}) {
  const ee = new EventEmitter()
  let total = options.start || 0
  let lastBeat = 0
  let start = Date.now()

  ee.inc = function (value = 1) {
    total += value
    lastBeat += value
  }

  ee.total = function () {
    return total
  }

  ee.beat = function () {
    ee.emit('beat', lastBeat, total, Date.now() - start)
    lastBeat = 0
    start = Date.now()
  }

  ee.reset = function () {
    total = options.start || 0
    start = Date.now()
  }

  return ee
}
