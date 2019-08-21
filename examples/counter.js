'use strict'

const { speedBeat } = require('../lib/')

const speedTracker = speedBeat()

// the chrono functions are executed every `timer` ms
speedTracker.chrono('john', doOnce)
speedTracker.chrono('bolt', doOnce)
speedTracker.chrono('heavy', doOnce)

// register the speed for each rider adding 1 unit by default
setInterval(() => { speedTracker.lap('john') }, 300).unref()
setInterval(() => { speedTracker.lap('bolt') }, 50).unref()

// you can pass a number value for faster rider
setInterval(() => { speedTracker.lap('heavy', 15) }, 600).unref()
// you can call .finish many time as you want
setInterval(speedTracker.finish, 3000)

function doOnce (id, counter, total, deltaBeat) {
  console.log(`${id} speed is ${counter} and hit ${total} in ${deltaBeat} ms`)
}
