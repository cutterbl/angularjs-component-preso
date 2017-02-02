'use strict';

var gulp = require('gulp'),
    cfg = require('../config'),
    del = require('del');

gulp.task('clean:js', function () {
    return del([cfg.paths.destWeb + '/js/**/*.*']);
});

gulp.task('clean:css', function () {
    return del([cfg.paths.destWeb + '/css/**/*.*']);
});

gulp.task('clean:partials', function () {
    return del([cfg.paths.destWeb + '/partials/**/*.*']);
});

gulp.task('clean:fonts', function () {
    return del([cfg.paths.destWeb + '/fonts/**/*.*']);
});

gulp.task('clean:transpiled', function () {
    return del([cfg.paths.temp + '/**/*.*']);
});

gulp.task('clean:resources', function () {
    return del([cfg.paths.destWeb + '/resources/**/*.*']);
});

gulp.task('clean:allweb', function () {
    return del([cfg.paths.destWeb + '/**/*.*']);
});

gulp.task('clean:all', function () {
    return del([cfg.paths.dest + '/**/*.*']);
});