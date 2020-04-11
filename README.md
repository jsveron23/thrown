# Thrown

Generic Error handler

```js
npm i thrown
```

## Example

```js
// logger function is optional
// logger => internal logger
import errorHandler, { genericError, logger } from 'thrown'

// without options
function thisIsFunction() {
  try {
    throw genericError('this is message', { /* ... */ })
  } catch (err) {
    errorHandler(err)
  }
}

// with options : case 1
function thisIsFunction() {
  try {
    throw genericError.create('prefix >')('this is message', { /* ... */ })
    // or
    throw genericError.create({ prefix: 'prefix >' })('this is message', { /* ... */ })
  } catch (err) {
    errorHandler(err)
  }
}

// with options : case 2
function thisIsFunction() {
  try {
    throw genericError('this is message', { /* ... */ })
  } catch (err) {
    errorHandler.extra({
      // if set `externalLogger`, no use internal logger
      // internal logger uses `console.group`
      externalLogger: (message, err, stack) => {
        console.log(message, err);
        console.log(stack);
      }
    })(err)
  }
}

// with options : case 3
function thisIsFunction() {
  try {
    throw genericError.('this is message', { /* ... */ })
  } catch (err) {
    errorHandler.extra({
      // additional information
      handler: (err) => {
        // compute something

        // this object will combine with original error object
        // should be an object (not array)
        return { computedErr }
      }
    })(err)
  }
}
```

## API

```js
import errorHandler from 'thrown'

try {
  throw new Error('this is error')
} catch (err) {
  // all options are optional
  errorHandler.extra({
    // no display in production
    mode: process.env.NODE_ENV,

    // css text eg. 'font-size: 10px;'
    style: '',

    // default <thrown>
    name: 'any name',

    // default true (group or groupCollapsed)
    expanded: true,

    // default false (console.trace), if trace false, it uses error.stack
    trace: false,

    // use external logger
    externalLogger: (message, err, stack) => {
      console.log(message, err);
      console.log(stack);
    },

    // combine additional information with original error
    handler: (err) => {
      const computedErr = {

      return { computedErr }
    }

  })(err)
}
```

## License

MIT
