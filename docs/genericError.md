# API - genericError

### genericError(message, props)

1. message (String): a message of Error object
1. props (Object): properties of Error object

#### Example

```js
import { genericError } from 'thrown'

try {
  throw genericError('this is a message', { data: 'additional data' })
} catch {
  ...
}
```

### genericError.create(options)

- options (Object|String): default - {}

1. options.prefix (String): only option for now

#### Example

```js
import { genericError } from 'thrown'

const aPrefix = genericError({ prefix: 'A -' })
const bPrefix = genericError('B -')
const args = ['this is a message', { data: 'additional data' }]

try {
  if (...) {
    throw aPrefix(...args)
  }

  if (...) {
    throw bPrefix(...args)
  }

  if (...) {
    throw aPrefix(...args)
  }
} catch {
  ...
}
```
