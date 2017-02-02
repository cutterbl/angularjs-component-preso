'use strict';

var gulp = require('gulp'),
    cfg = require('../config');

module.exports = gulp.task('server', function () {
    return gulp.src(cfg.paths.src + '/server.js')
        .pipe(gulp.dest(cfg.paths.dest));
});