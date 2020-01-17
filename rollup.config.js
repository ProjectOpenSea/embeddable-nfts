import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

export default {
  input: "src/nft-card.ts",
  output: {
    file: 'dist/nft-card.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    resolve({
      jsnext: true
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".ts", ".js"]
    }),
    livereload(),
    serve({
      openPage: '/example/index.html',
      open: true,
      contentBase: '.',
    }),
  ]
};
