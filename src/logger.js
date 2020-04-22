/**
 * Create logger
 * @param  {Object?}  [options={}]
 * @param  {String?}  [options.css='background: rgb(30, 0, 0); color: rgb(217, 89, 93);']
 * @param  {String?}  [options.name=''] name of group
 * @param  {Boolean?} [options.expanded=true]
 * @param  {Boolean?} [options.trace=false]
 * @return {Function}
 */
function createLogger ({
  css = 'background: rgb(30, 0, 0); color: rgb(217, 89, 93);',
  name = '',
  expanded = true,
  trace = false
} = {}) {
  /**
   * @param  {String}       title
   * @param  {Object}       payload
   * @param  {Error.stack?} [nativeStack=null]
   * @return {String}
   */
  return (title, payload, nativeStack = null) => {
    const _group = expanded ? 'group' : 'groupCollapsed'

    console[_group](`%c${name}`, css)
    console.log(`${title}: `, payload)

    if (trace) {
      console.trace()
    }

    if (nativeStack) {
      console.log(nativeStack)
    }

    console.groupEnd()

    return {
      options: { css, name, expanded, trace },
      title,
      payload
    }
  }
}

const logger = createLogger()
logger.extra = createLogger

export default logger
