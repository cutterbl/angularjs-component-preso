'use strict';

var cfg = require('../config'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

module.exports = gulp.task('lint', function () {
    return gulp.src([
            cfg.paths.src + '/**/*.js',
            //cfg.paths.src + '/server/**/*.js',
            '!' + cfg.paths.src + '/**/*.spec.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));

});

