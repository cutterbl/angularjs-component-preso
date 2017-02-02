'use strict';

var gulp = require('gulp'),
    cfg = require('../config'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = gulp.task('html', ['clean:js', 'clean:css'], function (callback) {
    return gulp.src([cfg.paths.src + '/**/*.html'])
        .pipe(usemin({
            css: [
                sourcemaps.init({debug: true, loadMaps: true}),
                cleanCSS({sourceMapInlineSources: true}),
                rev(),
                sourcemaps.write('./')
            ],
            js: [
                sourcemaps.init({debug: true, loadMaps: true}),
                uglify(),
                rev(),
                sourcemaps.write('./')
            ]
        }))
        .pipe(gulp.dest(cfg.paths.destWeb));
});