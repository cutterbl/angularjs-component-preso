'use strict';
/*jshint -W079 */

var _ = require('lodash'),
    testConfig = {
        basePath: '.',

        frameworks: [
            'browserify',
            'jasmine',
            'sinon'
        ],

        files: [
            // Libraries
            'bower_components/lodash/dist/lodash.min.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            //'bower_components/angular-cookies/angular-cookies.min.js',
            //'bower_components/ng-idle/angular-idle.js',
            //'bower_components/angular-translate/angular-translate.min.js ',
            //'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            //'libs/jasmine-mox-matchers.min.js'

            // Sources/Tests
            'src/**/*.js',
            'src/**/*.spec.js'
        ],

        exclude: [
            'src/server.js',
            'src/app.js',
            'src/**/index.js'
        ],

        reporters: ['dots'],

        port: 8084,

        runnerPort: 9100,

        colors: true,

        autoWatch: false,

        browsers: ['Chrome'],

        browserNoActivityTimeout: 120000,
        browserDisconnectTimeout: 120000,
        browserDisconnectTolerance: 1,
        captureTimeout: 120000,

        singleRun: true
    };

module.exports = function (overrides) {
    return _.extend({}, testConfig, overrides);
};

