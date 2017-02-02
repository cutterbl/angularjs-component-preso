'use strict';

var gulp = require('gulp'),
    cfg = require('../config'),
    gls = require('gulp-live-server');

module.exports = gulp.task('serve', function () {
    var entryPoint = cfg.paths.dest + '/server.js';
    var server = gls.new(entryPoint);
    server.start();
});