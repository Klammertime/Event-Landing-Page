"use strict";
var gulp = require('gulp'),
    del = require('del'),
    pages = require('gulp-gh-pages'),
    sass = require('gulp-sass'),
    csscss = require('gulp-csscss'),
    deleteUnusedImages = require('gulp-delete-unused-images'),
    plumber = require('gulp-plumber'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

var $ = require('gulp-load-plugins')({
    lazy: true
});

var options = {
    dist: './dist/'
};

// Create clean task.
gulp.task('clean', function() {
    del(['dist']);
});

gulp.task("deleteImages", function() {
return gulp.src(['assets/images/*', 'index.html'])
  .pipe(plumber())
  .pipe(deleteUnusedImages({
    log: true,
    delete: true
  }))
    .pipe(plumber.stop());
});

gulp.task('redundantCss', function() {
  gulp.src('assets/css/main.css')
    .pipe(csscss())
});

gulp.task('minifyCSS', function(){
  gulp.src([
    "assets/css/main.css",
    "assets/css/normalize.css"
    ])
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("assets/css"));
});

gulp.task("build", ['minifyCSS'], function(){
  return gulp.src([
    "assets/css/main.min.css",
    "assets/css/normalize.min.css",
    "index.html",
    "event-form-signup.html",
    "assets/images/**"], { base: "./"})
      .pipe(gulp.dest("dist"));
});

gulp.task('serve', ['watchFiles']);

gulp.task('deploy', function() {
    return gulp.src(options.dist + '**/**/*')
        .pipe(pages());
});

gulp.task('default', ['clean'], function() {
    gulp.start('build')
});




