'use strict';

var karmaConf = require('./karma.common');

module.exports = function (config) {
    config.set(karmaConf({
        logLevel: config.LOG_INFO,

        preprocessors: {
            'src/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [['babelify', {'presets':'es2015'}], 'browserify-shim']
        },

        browsers: ['Chrome'],

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        }

    }));
};

