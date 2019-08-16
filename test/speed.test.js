'use strict'

const { test } = require('tap')

const speed = require('../lib/speed')

test('simple usage', t => {
  t.plan(4)

  const s = speed()
  t.equal(s.total(), 0)

  s.inc()
  t.equal(s.total(), 1)

  s.inc()
  t.equal(s.total(), 2)

  s.reset()
  t.equal(s.total(), 0)
})

test('start value', t => {
  t.plan(4)

  const s = speed({ start: 100 })
  t.equal(s.total(), 100)

  s.inc(5)
  t.equal(s.total(), 105)

  s.inc(5)
  t.equal(s.total(), 110)

  s.reset()
  t.equal(s.total(), 100)
})

test('beat', t => {
  t.plan(4)

  const s = speed()
  s.once('beat', (counter, total) => {
    t.equal(counter, 1)
    t.equal(total, 1)
  })
  s.inc()
  s.beat()

  s.once('beat', (counter, total) => {
    t.equal(counter, 2)
    t.equal(total, 3)
  })
  s.inc()
  s.inc()
  s.beat()
})
