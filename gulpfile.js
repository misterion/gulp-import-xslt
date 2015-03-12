/* jshint node:true */
'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    istanbul = require('gulp-istanbul'),
    mocha = require('gulp-mocha');

gulp.task('lint', function (cb) {
    gulp.src(['*.js', 'test/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['test/*.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports({
                    dir: './coverage',
                    reporters: ['lcov', 'text-summary']
                }))
                .on('end', cb);
        });
});

gulp.task('watch', function() {
    gulp.watch('*.js', ['lint']);
});

gulp.task('default', ['lint']);