/**
 * `toBeAccessible()` — runs axe-core against a DOM element and fails with a
 * readable list of violations. Ported from the former `test.ts`, which
 * registered it via `jasmine.addAsyncMatchers`.
 */
import axe from 'axe-core';
import { expect } from 'vitest';

expect.extend({
  async toBeAccessible(actual: any) {
    const results = await axe.run(actual, {});

    if (!results.violations.length) {
      return {
        pass: true,
        message: () => 'expected element to have accessibility violations, but it had none',
      };
    }

    results.violations.forEach((violation) => {
      console.log(violation.tags, violation.nodes);
    });

    const message = results.violations
      .map(
        (violation) =>
          `* ${violation.description}\n  ${violation.helpUrl}\n  Affected nodes:\n ${violation.nodes.map((node) => `  ${node.html}\n  ${node.failureSummary}`).join('\n\n')}}`,
      )
      .join('\n');

    return { pass: false, message: () => message };
  },
});
