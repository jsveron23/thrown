import test from 'ava'
import errorHandler from '../src/handler'
import logger from '../src/logger'
import { createSandbox } from 'sinon'

const sandbox = createSandbox()

test('should be returned error and logged error', (t) => {
  sandbox.spy(logger, 'extra')

  const message = 'this is message'
  const err = new Error(message)
  const nextErr = errorHandler(err)

  t.truthy(logger.extra.calledOnce)
  t.deepEqual(err, nextErr)

  logger.extra.resetHistory()
  logger.extra.restore()
})

test('should be returned error and no logged error in production', (t) => {
  sandbox.spy(logger, 'extra')

  const message = 'this is message'
  const err = new Error(message)
  const nextErr = errorHandler.extra({ mode: 'production' })(err)

  t.truthy(logger.extra.notCalled)
  t.deepEqual(err, nextErr)

  logger.extra.resetHistory()
  logger.extra.restore()
})

test('should be returned error and logged error by external logger', (t) => {
  const externalLoggerObj = {}

  externalLoggerObj.fn = (...args) => args

  sandbox.spy(externalLoggerObj, 'fn')

  const message = 'this is message'
  const err = new Error(message)
  const nextErr = errorHandler.extra({ externalLogger: externalLoggerObj.fn })(err)

  t.truthy(externalLoggerObj.fn.calledOnce)
  t.deepEqual(err, nextErr)

  externalLoggerObj.fn.resetHistory()
  externalLoggerObj.fn.restore()
})

test('should be returned error with additional information', (t) => {
  const additionalObj = {}

  additionalObj.handler = () => ({ from: 'where error from' })

  sandbox.spy(additionalObj, 'handler')

  const message = 'this is message'
  const err = new Error(message)
  const nextErr = errorHandler.extra({ handler: additionalObj.handler })(err)

  t.truthy(additionalObj.handler.calledOnce)
  t.deepEqual(err, nextErr)

  additionalObj.handler.resetHistory()
  additionalObj.handler.restore()
})

test('should be throw if additional information will not return as object', (t) => {
  const additionalObj = {}

  additionalObj.handler = () => ['invalid additional information type']

  sandbox.spy(additionalObj, 'handler')

  const message = 'this is message'
  const err = new Error(message)

  t.throws(() => errorHandler.extra({ handler: additionalObj.handler })(err))

  additionalObj.handler.resetHistory()
  additionalObj.handler.restore()
})
