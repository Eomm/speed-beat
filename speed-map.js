'use strict'

const speed = require('./speed')

const ms = require('ms')

module.exports = function speedMap (options) {
  if (!options || !options.timer) {
    throw new Error('You must provide a timer option')
  }

  const pitLane = {
    drivers: new Map()
  }

  const timerMs = typeof options.timer === 'string' ? ms(options.timer) : options.timer
  const interval = setInterval(executeJobQueue.bind(pitLane.drivers), timerMs)
  interval.unref()
  pitLane.interval = interval

  return {
    chrono (id, func) {
      const speedEmitter = speed()
      speedEmitter.on('beat', func.bind(speedEmitter, id))
      pitLane.drivers.set(id, speedEmitter)
      return speedEmitter
    },
    lap (id, value) {
      if (pitLane.drivers.has(id)) {
        pitLane.drivers.get(id).inc(value)
      }
    }
  }
}

function executeJobQueue () {
  this.forEach(speed => speed.beat())
}
