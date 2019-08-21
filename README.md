# speed-beat
Speed counter made easy

## Install

```bash
npm i speed-beat
```


## Usage as interval Beat

Start to track many resource and, every `timer` second execute the `chrono` function!

```js
const { speedBeat } = require('speed-beat)

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
```


## Usage as counter

You will handle when execute the `chrono` function.

```js
const { speedBeat } = require('speed-beat)

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

setTimeout(speedTracker.finish, 3000)
// you can call .finish many time as you want as well
// setInterval(speedTracker.finish, 3000)

function doOnce (id, counter, total, deltaBeat) {
  console.log(`${id} speed is ${counter} and hit ${total} in ${deltaBeat} ms`)
}
```


## API

+ `speedBeat(options)`: create a `speedBeat` instance
  + `.chrono(id, function): EventEmitter`: add a speed element to track
  + `.lap(id[, value]): EventEmitter`: increment the speed value for the element `id`. If the id doesn't exist nothing happen
  + `.driver(id): EventEmitter`: return the speed `id` element
  + `.timer()`: return the `timer` in millisec
  + `.finish()`: stop the call to the chrono functions

The `chrono` function will have 4 parameters:
- `id`: the name of the speed element
- `counter`: the summation of the `lap` values since the last beat was trigger
- `total`: the total amount of `lap` values
- `deltaBeat`: the time in millisec that has passed away since last beat

### Options

+ `timer`: the beat of chrono functions. It can be expressed in milliseconds or as a string in the [ms](https://github.com/zeit/ms) format


## License

Copyright [Manuel Spigolon](https://github.com/Eomm), Licensed under [MIT](./LICENSE).
