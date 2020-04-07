const { src, dest, series, parallel } = require('gulp')

const pug = require('gulp-pug')
const cleaner = require('gulp-clean')
const minifier = require('gulp-minify')
const renamer = require('gulp-rename')

const build__pug = () =>
  src('src/index.pug')
    .pipe(pug())
    .pipe(dest('public'))

const job_minify = () =>
  src('public/age.js')
    .pipe(minifier({
      mangle: {
        eval: true,
        toplevel: true
      }
    }))
    .pipe(dest('public'))

const job_suffix = () =>
  src(`public/age-min.js`)
    .pipe(renamer(`age.min.js`))
    .pipe(dest('public'))

const job_clean = () =>
  src([
      'public/age.js', 
      'public/age-min.js'
  ], { read: false })
    .pipe(cleaner())

exports.default = series(
  parallel(
    build__pug,
    job_minify,
  ),
  job_suffix,
  job_clean
)
