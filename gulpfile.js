'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var importer = require('node-sass-globbing');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var cssmin = require('gulp-cssmin');
var uncss = require('gulp-uncss');
var stripCssComments = require('gulp-strip-css-comments');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload')
var sass_config = {
  importer: importer,
  includePaths: [
    'node_modules/breakpoint-sass/stylesheets/',
    'node_modules/singularitygs/stylesheets/',
    'node_modules/modularscale-sass/stylesheets',
    'node_modules/compass-mixins/lib/'
  ]
};

//Uglifies javascript
gulp.task('uglify', function() {
  gulp.src('./lib/*.js')
    .pipe(uglify(''))
    .pipe(gulp.dest('./min-js'))
});

// Combine javascript files
gulp.task('concat', function() {
  return gulp.src('./min-js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js'));
});

//Compiles sass
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass(sass_config).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version']
    }))
    .pipe(stripCssComments({preserve: false}))
    .pipe(cssmin())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

//Type "gulp" on the command line to watch file changes
gulp.task('play', function(){
  livereload.listen();
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./min-js/*.js', ['concat']);
    gulp.watch('./lib/*.js', ['uglify']);
    gulp.watch(['./css/style.css', './**/*.twig', './js/main.js'], function (files){
      livereload.changed(files)
    });
});