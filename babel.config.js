module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          chrome: '70',
          ie: '11'
        }
      }
    ]
  ],
  plugins: ['@babel/plugin-proposal-object-rest-spread'],
  env: {
    test: {
      plugins: [
        ['istanbul', {
          useInlineSourceMaps: false,
          exclude: [
            '**/*.test.js'
          ]
        }]
      ]
    }
  }
}
