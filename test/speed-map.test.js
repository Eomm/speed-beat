'use strict'

const { test } = require('tap')

const { speedBeat } = require('../lib')

test('simple usage', t => {
  t.plan(18)

  const s1 = speedBeat({ timer: 1000 })
  const s2 = speedBeat({ timer: '900ms' })

  s1.chrono('foo', checker('foo', 1, 1))
  s1.chrono('bar', checker('bar', 10, 10))
  s1.chrono('neo', checker('neo', 6, 6))

  s2.chrono('foo', checker('foo', 2, 2))
  s2.chrono('bar', checker('bar', 42, 42))
  s2.chrono('neo', checker('neo', -1, -1))

  s1.lap('foo')
  s1.lap('bar', 10)
  s1.lap('neo', 3)
  s1.lap('neo', 3)

  s2.lap('foo', 2)
  s2.lap('bar', 42)
  s2.lap('neo', -1)
  s2.lap('not exists')

  setTimeout(() => {
    s1.finish()
    s2.finish()
  }, 1100)

  function checker (_id, _counter, _total) {
    return (id, counter, total) => {
      t.equals(id, _id)
      t.equals(counter, _counter)
      t.equals(total, _total)
    }
  }
})

test('timing usage', t => {
  t.plan(6)

  const s = speedBeat({ timer: '500ms' })

  let tot = 0
  s.chrono('foo', (id, counter, total) => {
    t.equals(id, 'foo')
    t.equals(counter, 2)
    t.equals(total, tot)
  })

  setInterval(() => {
    s.lap('foo')
    tot++
  }, 200).unref()
  setTimeout(s.finish, 1200)
})

test('getter', t => {
  t.plan(6)

  const s = speedBeat({ timer: '500ms' })
  s.chrono('foo', () => {})
  const ee1 = s.driver('foo')
  t.ok(ee1)
  t.equals(ee1.total(), 0)

  const ee2 = s.lap('foo')
  t.ok(ee2)
  t.equals(ee2.total(), 1)

  const notFound = s.lap('fooo')
  t.notOk(notFound)

  t.equals(s.timer(), 500)
})

test('counter usage', t => {
  t.plan(4)

  const s = speedBeat()

  let tot = 0
  s.chrono('bravos', (id, counter, total, delta) => {
    t.equals(id, 'bravos')
    t.equals(counter, 5)
    t.equals(total, tot)
    t.ok(delta >= 1200 && delta < 1300, 'delta time of execution')
  })

  setInterval(() => {
    s.lap('bravos')
    tot++
  }, 200).unref()
  setTimeout(s.finish, 1200)
})

test('counter usage with multiple finish', t => {
  t.plan(4)

  const s = speedBeat()
  s.chrono('bravos', (id, counter, total, delta) => {
    t.equals(id, 'bravos')
    t.ok(delta >= 1200 && delta < 1300, 'delta time constant between finish call')
  })

  setTimeout(() => {
    s.finish()
    setTimeout(s.finish, 1200)
  }, 1200)
})
