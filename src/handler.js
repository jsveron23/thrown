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
function createErrorHandler (options) {
  const {
    mode = process.env.NODE_ENV,
    style = '',
    name = '<thrown>',
    expanded = true,
    trace = false,
    externalLogger,
    handler
  } = options || {}

  /**
   * @param  {Error} err
   * @return {Error}
   */
  return (err) => {
    const _message = err.message
    let _additionalErr = {}

    // only pass here when use `errorHandler.extra`
    if (typeof handler === 'function') {
      _additionalErr = handler(err)

      if (typeof _additionalErr !== 'object' || Array.isArray(_additionalErr)) {
        throw genericError.create('error handler >')(
          'additional handler should return object',
          {
            _additionalErr
          }
        )
      }
    }

    if (mode !== 'production') {
      const _args = [_message, {
        ...err,
        ..._additionalErr
      }, err.stack]

      if (typeof externalLogger === 'function') {
        externalLogger(..._args)
      } else {
        const _options = {
          css: style,
          name,
          expanded,
          trace
        }

        logger.extra(_options)(..._args)
      }
    }

    return err
  }
}

const errorHandler = createErrorHandler()
errorHandler.extra = createErrorHandler

export default errorHandler
