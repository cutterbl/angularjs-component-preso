'use strict';

var config = require('../config'),
    gulp = require('gulp'),
    path = require('path'),
    Server = require('karma').Server;

// Run test once and exit
gulp.task('test', ['lint'], function (done) {
    var fullPath = path.resolve('./karma.conf.js');
    /*karma.start({
        configFile: fullPath,
        singleRun: true
    }, done);*/
    new Server({
        configFile: fullPath,
        singleRun: true
    }, done).start();
});