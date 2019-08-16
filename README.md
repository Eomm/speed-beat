# speed-beat
Speed counter made easy

## Install

```bash
npm i speed-beat
```


## Usage

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


## API

+ `speedBeat(options)`: create a `speedBeat` instance
  + `.chrono(id, function): EventEmitter`: add a speed element to track
  + `.lap(id[, value]): EventEmitter`: increment the speed value for the element `id`. If the id doesn't exist nothing happen
  + `.driver(id): EventEmitter`: return the speed `id` element
  + `.finish()`: stop the call the chrono functions

### Options

+ `timer`: the beat of chrono functions. It can be expressed in milliseconds or as a string in the [ms](https://github.com/zeit/ms) format


## License

Copyright [Manuel Spigolon](https://github.com/Eomm), Licensed under [MIT](./LICENSE).
