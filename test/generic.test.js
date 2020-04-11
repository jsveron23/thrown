import test from 'ava'
import genericError from '../src/generic'

test('should be applied options as prefix', (t) => {
  const prefix = 'this is prefix'
  const message = 'this is message'
  const executed = genericError.create(prefix)(message, {})

  t.is(executed.message, `${prefix} ${message}`)
})

test('should be applied prefix as object', (t) => {
  const prefix = 'this is prefix'
  const message = 'this is message'
  const executed = genericError.create({ prefix })(message, {})

  t.is(executed.message, `${prefix} ${message}`)
})

test('should be executed with props', (t) => {
  const message = 'this is message'
  const prop = 'this is prop'
  const executed = genericError(message, {
    prop
  })

  t.is(executed.message, message)
  t.is(executed.prop, prop)
})
