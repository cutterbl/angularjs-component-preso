'use strict';

var gulp = require('gulp'),
    config = require('../config'),
    runsequence = require('run-sequence');

module.exports = gulp.task('main', function (callback) {
    return runsequence('server', 'transpile', 'browserify', 'less', 'html', 'partials', 'resources', 'fonts', callback);
});