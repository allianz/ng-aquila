// not active as long as we use a preset
// but currently there doesn't seem to be a way to specify the order
// of the types in the changelog
const TYPES = [
    { type: 'feat', section: 'Features ✨' },
    { type: 'fix', section: 'Bug Fixes 🐛' },
    { type: 'test', section: 'Tests', hidden: true },
    { type: 'build', section: 'Build & CI 👷‍', hidden: true },
    { type: 'ci', section: 'Build & CI 👷‍', hidden: true },
    { type: 'chore', section: 'Other 🧾', hidden: true },
    { type: 'docs', section: 'Documentation 📚', hidden: false },
];

module.exports = {
    types: TYPES,
    skip: {
        // we need to tag on the CI
        tag: true,
    },
    // read from here
    packageFiles: ['projects/ng-aquila/src/package.json'],
    // set version in those files
    bumpFiles: ['projects/ng-aquila/src/package.json'],
    infile: 'CHANGELOG.md',
    path: 'projects/ng-aquila',
    /* the preset seems to not work somehow disabling it for now */
    //preset: 'angular',
    releaseCommitMessageFormat: 'release: cut {{currentTag}}',
};
