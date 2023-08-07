const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

function css() {
  return src('css/application.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('application.css'))
    .pipe(dest('assets'));
}

function js() {
  return src('js/**/*.js').pipe(concat('application.js')).pipe(dest('assets'));
}

exports.watch = function () {
  watch('css/**/*.scss', css);
  watch('js/**/*.js', js);
};

exports.css = css;
exports.js = js;
