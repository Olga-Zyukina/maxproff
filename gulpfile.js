const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const del = require('del');


const paths = {
  html: {
    src: 'src/*.html',
    dest: '.'
  },
  styles: {
    src: ['src/styles/**/*.sass', 'src/styles/**/*.scss', 'src/styles/**/*.css'],
    dest: 'assets/css/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'assets/js/'
  }
}

function clean() {
  return del([ 'assets/js/*', 'assets/css/*' ]);
}

function html() {
  return gulp.src(paths.html.src)
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest(paths.html.dest))
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
}

// Обработка Java Script
function scripts() {
  return gulp.src(paths.scripts.src)
  .pipe(sourcemaps.init())
  .pipe(babel(
    {
    presets: ['@babel/env']
  }
  ))
  .pipe(concat('main.js'))
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(uglify())
  .pipe(rename({
    basename: 'main',
    suffix: '.min'
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.scripts.dest))
}

// Отслеживание изменений в файлах и запуск live сервера
function watch() {
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, html, gulp.parallel(styles, scripts), watch);

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;