/* jshint node:true */
'use strict';

var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    clear   = require('clear'),
    mocha   = require('gulp-mocha'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('lint', function () {
    gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(mocha());
});

gulp.task('watch', function() {
    gulp.watch('*.js', ['lint']);
});

gulp.task('default', ['lint', 'watch']);