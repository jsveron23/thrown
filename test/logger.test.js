import test from 'ava'
import logger from '../src/logger'
import { createSandbox } from 'sinon'

const sandbox = createSandbox()

test('should be applied default options as expected', (t) => {
  const title = 'this is title'
  const executed = logger(title, {})

  t.deepEqual(executed.options, {
    css: 'background: rgb(30, 0, 0); color: rgb(217, 89, 93);',
    name: '',
    expanded: true,
    trace: false
  })
})

test('should be returned title, payload as expected', (t) => {
  const title = 'this is title'
  const executed = logger(title, {})

  t.is(executed.title, title)
})

test('should be applied CSS text', (t) => {
  const title = 'this is title'
  const executed = logger.extra({ css: 'font-size: 11px;' })(title, {})

  t.is(executed.options.css, 'font-size: 11px;')
})

test('should be executed `console.log` once', (t) => {
  sandbox.spy(console, 'log')

  const title = 'this is title'

  logger(title, {})

  t.truthy(console.log.calledOnce)

  console.log.resetHistory()
  console.log.restore()
})

test('should be executed `console.log` twice', (t) => {
  sandbox.spy(console, 'log')

  const title = 'this is title'
  const err = new Error('this is error')

  logger(title, {}, err.stack)

  t.truthy(console.log.calledTwice)

  console.log.resetHistory()
  console.log.restore()
})

test('should be executed `console.group`', (t) => {
  sandbox.spy(console, 'group')
  sandbox.spy(console, 'groupCollapsed')

  const title = 'this is title'

  logger(title, {})

  t.truthy(console.group.calledOnce)
  t.truthy(console.groupCollapsed.notCalled)

  console.group.resetHistory()
  console.group.restore()
  console.groupCollapsed.resetHistory()
  console.groupCollapsed.restore()
})

test('should be executed `console.groupCollapsed`', (t) => {
  sandbox.spy(console, 'group')
  sandbox.spy(console, 'groupCollapsed')

  const title = 'this is title'

  logger.extra({ expanded: false })(title, {})

  t.truthy(console.group.notCalled)
  t.truthy(console.groupCollapsed.calledOnce)

  console.group.resetHistory()
  console.group.restore()
  console.groupCollapsed.resetHistory()
  console.groupCollapsed.restore()
})

test('should be executed `console.trace`', (t) => {
  sandbox.spy(console, 'trace')

  const title = 'this is title'

  logger.extra({ trace: true })(title, {})

  t.truthy(console.trace.calledOnce)

  console.trace.resetHistory()
  console.trace.restore()
})
