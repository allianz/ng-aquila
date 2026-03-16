module.exports = {
  preset: require.resolve('./changelog-preset.js'),
  skip: {
    tag: true,
  },
  packageFiles: ['projects/ng-aquila/src/package.json'],
  bumpFiles: ['projects/ng-aquila/src/package.json'],
  infile: 'CHANGELOG.md',
  path: 'projects/ng-aquila',
  releaseCommitMessageFormat: 'release: cut {{currentTag}}',
};
