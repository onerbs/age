const { src, dest, series, parallel } = require('gulp')

const pug    = require('gulp-pug')
const stylc  = require('gulp-stylus')
const tsc    = require('gulp-typescript')

const clean  = require('gulp-clean')
const concat = require('gulp-concat')
const minify = require('gulp-minify')
const rename = require('gulp-rename')

const pug_Build = () =>
  src('src/index.pug')
    .pipe(pug())
    .pipe(dest('docs'))

const styl_Build = () =>
  src('src/styl/age.styl')
    .pipe(stylc({ compress: true }))
    .pipe(dest('docs'))

const styl_Rename = () =>
  src("docs/age.css")
    .pipe(rename("age.min.css"))
    .pipe(dest("docs"))

const styl_Clean = () =>
  src("docs/age.css", { read: false })
    .pipe(clean())

const ts_Build = () =>
  src('src/ts/*.ts')
    .pipe(tsc.createProject('tsconfig.json')())
    .pipe(dest('dist'))

const js_Concat = () =>
  src('dist/*.js')
    .pipe(concat('dist.js'))
    .pipe(dest('dist'))

const js_Minify = () =>
  src('dist/dist.js')
    .pipe(minify({ ext: { min: '.min.js' } }))
    .pipe(dest('docs'))

const js_Clean = () =>
  src(["dist", "docs/dist.js"], { read: false })
    .pipe(clean())

exports.default = parallel(
  series(pug_Build),
  series(styl_Build, styl_Rename, styl_Clean),
  series(ts_Build, js_Concat, js_Minify, js_Clean)
)
