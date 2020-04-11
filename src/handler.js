import genericError from './generic'
import logger from './logger'

/**
 * Create error handler
 * @param  {Object?}   [options={}]
 * @param  {String?}   [options.style='']
 * @param  {String?}   [options.name='<thrown>']
 * @param  {Boolean?}  [options.expanded=true]
 * @param  {Boolean?}  [options.trace=false]
 * @param  {Function?} options.externalLogger
 * @param  {Function?} options.handler additional handler
 * @return {Function}
 */
function createErrorHandler ({
  mode = process.env.NODE_ENV,
  style = '',
  name = '<thrown>',
  expanded = true,
  trace = false,
  externalLogger,
  handler
} = {}) {
  /**
   * @param  {Error} err
   * @return {Error}
   */
  return (err) => {
    const message = err.message
    let additionalErr = {}

    // only pass here when use `errorHandler.extra`
    if (typeof handler === 'function') {
      additionalErr = handler(err)

      if (typeof additionalErr !== 'object' || Array.isArray(additionalErr)) {
        throw genericError.create('error handler >')(
          'additional handler should return object',
          {
            additionalErr
          }
        )
      }
    }

    if (mode !== 'production') {
      const args = [message, {
        ...err,
        ...additionalErr
      }, err.stack]

      if (typeof externalLogger === 'function') {
        externalLogger(...args)
      } else {
        const options = {
          css: style,
          name,
          expanded,
          trace
        }

        logger.extra(options)(...args)
      }
    }

    return err
  }
}

const errorHandler = createErrorHandler()
errorHandler.extra = createErrorHandler

export default errorHandler
