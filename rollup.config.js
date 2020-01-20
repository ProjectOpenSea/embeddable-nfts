import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import filesize from 'rollup-plugin-filesize'
import {terser} from 'rollup-plugin-terser'
const extensions = ['.ts', '.js']

export default {
  input: 'src/nft-card.ts',
  output: {
    name: 'nftcard',
    file: 'dist/nft-card.js',
    compact: true,
    format: 'iife',
    sourcemap: true,
    globals: {
      crypto: 'crypto'
      // Sha3: 'SHA3Hash'
    }
  },
  // External: [ 'sha3' ],
  plugins: [
    resolve({
      preferBuiltins: true,
      extensions
    }),
    commonjs(),
    json(),
    builtins(),
    globals(),
    babel({
      exclude: 'node_modules/**',
      extensions
    }),
    livereload(),
    serve({
      openPage: '/example/index.html',
      contentBase: '.'
    }),
    filesize(),
    terser()
  ]
}
