'use strict'

const { EventEmitter } = require('events')

module.exports = function speed (options = {}) {
  const ee = new EventEmitter()
  let total = options.start || 0
  let lastBeat = 0

  ee.inc = function (value = 1) {
    total += value
    lastBeat += value
  }

  ee.total = function () {
    return total
  }

  ee.beat = function () {
    ee.emit('beat', lastBeat, total)
    lastBeat = 0
  }

  ee.reset = function () {
    total = options.start || 0
  }

  return ee
}
