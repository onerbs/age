const { src, dest, series, parallel } = require('gulp')
const stylc = require('gulp-stylus')
const { createProject } = require('gulp-typescript')
const minify = require('gulp-minify')
const clean = require('gulp-clean')
const rename = require('gulp-rename')

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
  src('age.ts')
    .pipe(createProject('tsconfig.json')())
    .pipe(dest('docs'))

const js_Minify = () =>
  src('docs/age.js')
    .pipe(minify({ ext: { min: '.min.js' } }))
    .pipe(dest('docs', { overwrite: true }))

const js_Clean = () =>
  src("docs/age.js", { read: false })
    .pipe(clean())

exports.default = parallel(
  series(styl_Build, styl_Rename, styl_Clean),
  series(ts_Build, js_Minify, js_Clean)
)
