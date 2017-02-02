'use strict';

var gulp = require('gulp'),
    cfg = require('../config');

module.exports = gulp.task('resources', ['clean:resources'], function () {
    return gulp.src(cfg.paths.src + '/resources/**/*.*')
        .pipe(gulp.dest(cfg.paths.destWeb + '/resources'));
});