'use strict';

var gulp = require('gulp'),
    cfg = require('../config'),
    less = require('gulp-less');

module.exports = gulp.task('less', function () {
    return gulp.src(cfg.paths.src + '/less/core.less')
        .pipe(less())
        .pipe(gulp.dest(cfg.paths.temp + '/transpiled'));
});