module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['standard'],
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
    'max-len': ['error', { code: 90 }],
    'space-before-function-paren': ['error', 'always']
  }
}
