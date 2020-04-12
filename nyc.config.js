module.exports = {
  include: ['src/**/*.js'],
  // exclude: ['**/index.js'],
  'check-coverage': true,
  'per-file': true,
  reporter: ['lcov', 'text-summary'],
  branches: 80,
  lines: 80,
  functions: 80,
  statements: 80,
  sourceMap: true,
  instrument: true,
  cache: true,
  all: false
}
