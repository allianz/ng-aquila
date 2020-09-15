module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'subject-max-length': [2, 'always', 120],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'release',
        'revert',
        'style',
        'test'
      ]
    ]
  }
};
