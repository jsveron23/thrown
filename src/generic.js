/**
 * Create Error
 * @param  {Object|String} options|prefix
 * @return {Function}
 */
function createError (options) {
  let _prefix = ''

  if (typeof options === 'string' && options.length > 0) {
    _prefix = `${options} `
  } else if (typeof options === 'object' && !Array.isArray(options)) {
    const { prefix = '' } = options

    _prefix = prefix ? `${prefix} ` : ''
  }

  /**
   * @param  {String?} [message='undefined message']
   * @param  {Object?} [props={}]
   * @return {Error}
   */
  return (message, props) => {
    message = message || 'undefined message'
    props = props || {}

    const _msg = `${_prefix}${message}`
    const _err = new Error(_msg)

    _err.message = _msg

    Object.keys(props).forEach((key) => {
      _err[key] = props[key]
    })

    return _err
  }
}

const genericError = createError()
genericError.create = createError

export default genericError
