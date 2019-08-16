'use strict'

const { speedBeat } = require('./')

const speedTracker = speedBeat({ timer: '1s' })

// the chrono functions are executed every `timer` ms
speedTracker.chrono('john', doSomething)
speedTracker.chrono('bolt', doSomething)
speedTracker.chrono('heavy', doSomething)

// register the speed for each rider adding 1 unit by default
setInterval(() => { speedTracker.lap('john') }, 300)
setInterval(() => { speedTracker.lap('bolt') }, 50)

// you can pass a number value for faster rider
setInterval(() => { speedTracker.lap('heavy', 15) }, 600)

function doSomething (id, counter, total) {
  console.log(`${id} speed is ${counter} and hit ${total} right now`)
}
