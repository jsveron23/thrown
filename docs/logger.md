# API - logger

### logger(title, payload[, nativeStack])

1. title (String): first argument of `console.log`
1. payload (Any): second argument of `console.log`
1. nativeStack (Any): designed for Error.stack. but for now no type check, so, argument for next `console.log`

#### Example

```js
import { logger } from 'thrown'

logger('this is a title', { prop: 'this is a property of payload' })
```

### logger.extra(options)

- options (Object): default - {}

1. options.css (String): default - background: rgb(30, 0, 0); color: rgb(217, 89, 93);
1. options.name (String): argument of `console.group`
1. options.expanded (Boolean): default - true
1. options.trace (Boolean): default - false

#### Example

```js
import { logger } from 'thrown'

logger.extra({
  css: 'background: #567;',
  name: 'DEBUG:',
  expanded: false,
  trace: true
})('this is a title', { prop: 'this is a property of payload' })
```
