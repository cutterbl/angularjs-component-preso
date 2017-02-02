'use strict';

var gulp = require('gulp'),
    config = require('../config'),
    runsequence = require('run-sequence');

module.exports = gulp.task('default', ['lint'], function (callback) {
    return runsequence('main', 'serve', callback);
});