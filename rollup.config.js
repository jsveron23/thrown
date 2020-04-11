import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    sourcemap: true,
    exports: 'named'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    terser()
  ]
}
