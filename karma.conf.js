// Karma configuration
// Generated on Mon Feb 20 2017 16:05:23 GMT+0200 (South Africa Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'build/scripts/**/*.js', included: true, served: true, watched: true },
      { pattern: 'build/specs/test-setup.js', included: true, served: true, watched: true },
      { pattern: 'build/**/*.*', included: false, served: true, watched: true },
      { pattern: 'build/specs/test-utils/**/*.js', included: true, served: true, watched: true },
      { pattern: 'build/specs/**/*.spec.js', included: true, served: true, watched: true } 
    ],

    plugins: [
        'karma-jasmine',
        'karma-chrome-launcher',
        'karma-phantomjs-launcher'
    ],
    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],

    customLaunchers: {
      HeadlessChrome: {
        base: 'Chrome',
        flags: [ '--headless', '--disable-gpu', '--remote-debugging-port=9222' ]
      },
      PhantomJsWithDebugging: {
        base: 'PhantomJS',
        flags: [ '--remote-debugger-port=9000' ]
      }
    },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // force no-caching by the browser
    customHeaders: [
      { match: '.*', name: 'Cache-Control', value: 'max-age=0, no-cache, no-store, must-revalidate' },
      { match: '.*', name: 'Pragma', value: 'no-cache' },
      { match: '.*', name: 'Expires', value: 'Tue, 11 Mar 1952 04:20:42 GMT' }
    ]
  })
}
