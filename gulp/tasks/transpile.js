'use strict';

var gulp = require('gulp'),
    cfg = require('../config'),
    babel = require('gulp-babel'),
    annotate = require('gulp-ng-annotate'),
    merge2 = require('merge2');

module.exports = gulp.task('transpile', ['clean:transpiled'], function (callback) {
    return merge2 (
        gulp.src([cfg.paths.src + '/**/*.js', '!' + cfg.paths.src + '/**/*.spec.js'])
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(annotate({
                remove: true,
                add: true,
                single_quotes: true
            }))
            .pipe(gulp.dest(cfg.paths.temp + '/transpiled')),
        gulp.src(cfg.paths.src + '/**/*.json')
            .pipe(gulp.dest(cfg.paths.temp + '/transpiled')),
        callback
    );
});