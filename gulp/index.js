'use strict';

var fs = require('fs'),
    //argv = require('yargs').argv,
    tasks = fs.readdirSync(__dirname + '/tasks/'),
    //gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    gulp = require('gulp'),
    _gulpsrc = gulp.src;

gulp.src = function () {
    return _gulpsrc.apply(gulp, arguments)
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'Gulp Error',
                    message: 'Error: <%= error.message %>',
                    sound: 'Bottle'
                })(err);
                this.emit('end');
            }
        }));
};

tasks.forEach(function (task) {
    require('./tasks/' + task);
});