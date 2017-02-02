'use strict';

var gulp = require('gulp'),
    cfg = require('../config');

module.exports = gulp.task('fonts', function () {
    return gulp.src([
        cfg.paths.bower + '/bootstrap/dist/fonts/**/*.*',
        cfg.paths.bower + '/font-awesome/fonts/**/*.*'
    ])
        .pipe(gulp.dest(cfg.paths.destWeb + '/fonts'));
});