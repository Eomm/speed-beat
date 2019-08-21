'use strict'

const speed = require('./speed')

const ms = require('ms')

module.exports = function speedMap (options = {}) {
  const pitLane = {
    drivers: new Map()
  }

  let timerMs = -1
  if (options.timer) {
    timerMs = typeof options.timer === 'string' ? ms(options.timer) : options.timer
    const interval = setInterval(executeJobQueue.bind(pitLane.drivers), timerMs)
    interval.unref()
    pitLane.interval = interval
  }

  return {
    chrono (id, func) {
      const speedEmitter = speed()
      speedEmitter.on('beat', func.bind(speedEmitter, id))
      pitLane.drivers.set(id, speedEmitter)
      return speedEmitter
    },
    driver (id) {
      return pitLane.drivers.get(id) || false
    },
    lap (id, value) {
      const driver = this.driver(id)
      if (driver) {
        driver.inc(value)
      }
      return driver
    },
    timer () {
      return timerMs
    },
    finish () {
      if (pitLane.interval) {
        clearInterval(pitLane.interval)
      } else {
        // flush data
        executeJobQueue.call(pitLane.drivers)
      }
    }
  }
}

function executeJobQueue () {
  this.forEach(speed => speed.beat())
}
