# API - errorHandler

### errorHandler(err)

1. err (Error): error object

#### Example

```js
import errorHandler from 'thrown'

try {
  throw new Error('this is a error')
} catch (err) {
  errorHandler(err)
}
```

### errorHandler.extra(options)

- options (Object): default - {}

1. options.mode (String): default - process.env.NODE_ENV
1. options.style (String): default - '', CSS text
1. options.name (String): default - '<thrown>'
1. options.expanded (Boolean): default - true
1. options.trace (Boolean): default - false
1. options.externalLogger (Function): define logger
1. options.handler (Function): define additional function  

#### Example

```js
import errorHandler from 'thrown'

try {
  ...
} catch (err) {
  errorHandler.extra({
    mode: 'development',
    style: 'color: #123;',
    name: 'thrown',

    // `console.group` or `console.groupCollapsed`
    expanded: false,

    // `console.trace`
    trace: true,
    /**
     * @param {String}      message
     * @param {Error}       err    
     * @param {Error.stack} stack  
     */
    externalLogger: function (message, err, stack) {
      console.log(message, err);
      console.log(stack);
    },
    /**
     * Log error with external data
     * Normally no need
     * @param  {Error}  err
     * @return {Object}     
     */
    handler: function (err) {
      const compute = 1 + 1

      return { compute }
    }
  })(err)
}
```
