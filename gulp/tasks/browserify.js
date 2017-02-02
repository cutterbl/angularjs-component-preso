'use strict';

var gulp = require('gulp'),
    cfg = require('../config'),
    browserify = require('browserify'),
    browserifyShim = require('browserify-shim'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream');

module.exports = gulp.task('browserify', function () {
    return browserify({
            entries: [cfg.paths.temp + '/transpiled/app.js'],
            debug: true
        })
        .transform(browserifyShim)
        .bundle()
        .pipe(source('test-app.js'))
        .pipe(buffer())
        .pipe(gulp.dest(cfg.paths.temp + '/transpiled'));
});