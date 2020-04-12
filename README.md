# thrown [![npm](https://img.shields.io/npm/v/thrown.svg)](https://www.npmjs.com/package/thrown) [![npm](https://img.shields.io/npm/l/thrown.svg)](https://www.npmjs.com/package/thrown) [![Coverage Status](https://coveralls.io/repos/github/jsveron23/thrown/badge.svg?branch=master)](https://coveralls.io/github/jsveron23/thrown?branch=master)

Generic Error handler

```js
npm i thrown
```

Simply, we can use [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) objects but I have published as NPM module. To reduce code and to display fancy,

## Usage

**common usage**

```js
try {
  const err = new Error('this is a message')
  err.extra = 'additional data'

  throw err
} catch (err) {
  customErrorHandler(err)
}
```

**use by `thrown`**

```js
import errorHandler, { genericError } from 'thrown'

try {
  throw genericError('this is a message', { extra: 'additional data' })
} catch (err) {
  errorHandler(err)
}
```

Basically, you won't need this module but `thrown` have additional features to make error handler fancy. You can check out below,

## Example

```js
import errorHandler, { genericError } from 'thrown'

// use options <case 1>
try {
  // prefix
  // or `genericError.create({ prefix: 'A API >' });`
  const appliedPrefix = genericError.create('A API >');

  if (condition 1) {
    throw appliedPrefix('this is first message', { extra1: 1, extra2: 2 })
  }

  if (condition 2) {
    throw appliedPrefix('this is second message', { extra1: 1, extra2: 2 })
  }
} catch (err) {
  errorHandler(err)
}

// use options <case 2>
try {
  throw genericError('this is message', { extra1: 1, extra2: 2 })
} catch (err) {
  errorHandler.extra({
    // if set `externalLogger`, then no more using internal logger
    // internal logger uses `console.group`
    externalLogger: (message, err, stack) => {
      console.log(message, err);
      console.log(stack);
    },

    // additional information
    // it can be useful when `throw` syntax from another function scope
    handler: (err) => {
      // compute something

      // this object will combine with original error object
      // should be an object (not array)
      return { computedErr }
    }
  })(err)
}
```

## API

```js
import errorHandler, { genericError, logger } from 'thrown'

try {
  // generic usage
  throw genericError('this is error', {})

  // options as string
  throw genericError.create('prefix')

  // options as object
  throw genericError.create({
    // for now, only 1 option
    prefix: 'prefix'
  })
} catch (err) {
  // generic usage
  errorHandler(err)

  // all options are optional
  errorHandler.extra({
    // no display in production
    mode: process.env.NODE_ENV,

    // css text
    // eg. 'font-size: 10px;'
    style: '',

    // default <thrown>
    name: 'any name',

    // default true (group or groupCollapsed)
    expanded: true,

    // default false (console.trace)
    // if trace false, it uses error.stack
    trace: false,

    // use external logger
    externalLogger: (message: string, err: object, stack: Error.stack) => {
      console.log(message, err);
      console.log(stack);
    },

    // combine additional information with original error
    handler: (err: Error) => {
      const computedErr = {}

      return { computedErr }
    }

  })(err)
}

// debug, simple logger but fancy
// designed for internal uses

// generic usage
logger('this is a title', {});

// generic usage + stack
const err = new Error('this is an error')
logger('this is a title', {}, err.stack);

// all options are optional
logger.extra({
  // default 'background: rgb(30, 0, 0); color: rgb(217, 89, 93)'
  css: 'font-size: 11px;',

  // default ''
  name: 'this is specific place',

  // whether display `console.group` or `console.groupCollapsed`
  expanded: true,

  // we can use `console.trace`, more detail
  // default false
  trace: false
})
```

## License

MIT
