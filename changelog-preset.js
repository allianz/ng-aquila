const conventionalCommits = require('conventional-changelog-conventionalcommits');

module.exports = conventionalCommits({
  types: [
    { type: 'feat', section: 'Features ✨' },
    { type: 'fix', section: 'Bug Fixes 🐛' },
    { type: 'docs', section: 'Documentation 📚' },
    { type: 'test', section: 'Tests 🧪', hidden: true },
    { type: 'build', section: 'Build & CI 👷', hidden: true },
    { type: 'ci', section: 'Build & CI 👷', hidden: true },
    { type: 'chore', section: 'Other 🧹', hidden: true },
    { type: 'refactor', section: 'Code Refactoring 🔧', hidden: true },
  ],
}).then((preset) => {
  // Add DEPRECATION to noteKeywords
  preset.parserOpts.noteKeywords = ['BREAKING CHANGE', 'BREAKING-CHANGE', 'DEPRECATION'];

  // Wrap the transform to rename DEPRECATION title
  const originalTransform = preset.writerOpts.transform;
  preset.writerOpts.transform = (commit, context) => {
    // Track which notes are deprecations before the original transform mangles them
    const deprecationIndices = commit.notes
      .map((note, i) => (note.title === 'DEPRECATION' ? i : -1))
      .filter((i) => i !== -1);

    const result = originalTransform(commit, context);

    // Restore the correct title for deprecation notes and add emojis
    if (result) {
      result.notes.forEach((note, i) => {
        if (deprecationIndices.includes(i)) {
          note.title = 'Deprecations ⚠️';
        } else if (note.title === 'BREAKING CHANGES') {
          note.title = 'BREAKING CHANGES 💥';
        }
      });
    }

    return result;
  };

  // Move Deprecations to the end of the changelog via finalizeContext
  const originalFinalizeContext = preset.writerOpts.finalizeContext;
  preset.writerOpts.finalizeContext = (context, options, commits, keyCommit) => {
    const result = originalFinalizeContext
      ? originalFinalizeContext(context, options, commits, keyCommit)
      : context;

    // Extract deprecation notes and remove from noteGroups
    const deprecationIndex = result.noteGroups?.findIndex((g) => g.title === 'Deprecations ⚠️');
    if (deprecationIndex !== undefined && deprecationIndex !== -1) {
      result.deprecations = result.noteGroups[deprecationIndex].notes;
      result.noteGroups.splice(deprecationIndex, 1);
    } else {
      result.deprecations = [];
    }

    return result;
  };

  // Append Deprecations section at the end of the template
  preset.writerOpts.mainTemplate +=
    '{{#if deprecations.length}}\n### Deprecations ⚠️\n\n{{#each deprecations}}\n* {{#if commit.scope}}**{{commit.scope}}:** {{/if}}{{text}}\n{{/each}}\n\n{{/if}}';

  return preset;
});
