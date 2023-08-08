const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

function css() {
  return src('css/application.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('application.css'))
    .pipe(dest('assets'));
}

function compileScripts() {
  return src('js/**/*.ts')
    .pipe(tsProject())
    .pipe(concat('application.js'))
    .pipe(dest('assets'));
}

exports.watch = function () {
  watch('css/**/*.scss', css);
  watch(['js/**/*.js', 'js/**/*.ts'], compileScripts);
};

exports.build = series(css, compileScripts);
