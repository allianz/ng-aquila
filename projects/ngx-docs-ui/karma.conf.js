// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// enabled this flag to remove skipped tests from the output
module.exports = function (config) {
  var baseConfig = require('../../karma.conf')(config);

  config.set({
    ...baseConfig,
    coverageIstanbulReporter: {
      ...baseConfig.coverageIstanbulReporter,
      dir: require('path').join(__dirname, 'coverage')
    },
    junitReporter: {
      outputDir: '../../karma-test-results/ngx-docs-ui'
    },
    browsers: ["Chrome_Headless"],
    files: [
      {pattern: '../../node_modules/@angular/cdk/overlay-prebuilt.css', watched: true, included: true, served: true},
      {pattern: '../../dist/ng-aquila/css/normalize.css', included: true, watched: false}
    ]
  });
};
