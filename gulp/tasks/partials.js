'use strict';

var gulp = require('gulp'),
    cfg = require('../config');

module.exports = gulp.task('partials', function () {
    return gulp.src(cfg.paths.src + '/partials/**/*.html')
        .pipe(gulp.dest(cfg.paths.destWeb + '/partials'));
});