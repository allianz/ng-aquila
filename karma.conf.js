const OUTPUT = process.env.COMPACT_TEST_RESULTS ? 'minimal' : 'full';

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', '@angular-devkit/build-angular', 'viewport'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-mocha-reporter'),
            require('karma-coverage'),
            require('karma-junit-reporter'),
            require('karma-viewport'),
            require('@angular-devkit/build-angular/plugins/karma'),
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        coverageReporter: {
            subdir: '.',
            reporters: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true,
        },
        angularCli: {
            environment: 'dev',
        },
        reporters: ['junit', 'mocha'],
        mochaReporter: {
            ignoreSkipped: true,
            output: OUTPUT,
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome_Headless'],
        browserDisconnectTimeout: 25000,
        browserNoActivityTimeout: 50000,
        singleRun: false,
        customLaunchers: {
            // provide --no-sandbox to let it run on the virtual machine
            Chrome_Headless: {
                base: 'Chrome',
                flags: ['--headless', '--no-sandbox', '--disable-gpu', '--window-size=1184,900', '--remote-debugging-port=9222'],
            },
            Chrome_with_debugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port=9222'],
                debug: true,
            },
        },
        // Viewport configuration
        viewport: {
            breakpoints: [
                {
                    name: 'mobile',
                    size: {
                        width: 320,
                        height: 480,
                    },
                },
                {
                    name: 'tablet',
                    size: {
                        width: 704,
                        height: 1024,
                    },
                },
                {
                    name: 'desktop',
                    size: {
                        width: 1184,
                        height: 900,
                    },
                },
            ],
        },
    });

    return config;
};
