import typescript from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import css from 'rollup-plugin-css-only'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'


export default {
  entry: 'public/javascripts/main.ts',
  dest: 'build/bundle.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    nodeResolve({
      jsnext: true, main: true//, browser: true
    }),
    css({ output: 'build/bundle.css' }),
    commonjs(),
    typescript({
      allowSyntheticDefaultImports: true,
    }),
    replace({
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
    livereload({
      watch: 'build'
    }),
    serve({ contentBase: 'build' })
    ]
};