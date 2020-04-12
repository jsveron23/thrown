module.exports = {
  include: ['src/**/*.js'],
  exclude: ['**/index.js'],
  'check-coverage': true,
  'per-file': true,
  branches: 80,
  lines: 80,
  functions: 80,
  statements: 80,
  sourceMap: false,
  instrument: false,
  reporter: ['lcov', 'text-summary']
}
