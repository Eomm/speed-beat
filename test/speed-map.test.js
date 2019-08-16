'use strict'

const { test } = require('tap')

const { speedBeat } = require('../')

test('required options', t => {
  t.plan(1)
  t.throws(speedBeat)
})

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
