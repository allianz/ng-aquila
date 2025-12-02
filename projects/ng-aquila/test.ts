/// <reference types="karma-viewport" />

import { getTestBed } from '@angular/core/testing';
import axe from 'axe-core';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

@NgModule({
  providers: [provideZoneChangeDetection()],
})
export class ZoneTestModule {}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment([BrowserTestingModule, ZoneTestModule], platformBrowserTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

const customMatchers: jasmine.CustomAsyncMatcherFactories = {
  toBeAccessible(): jasmine.CustomAsyncMatcher {
    return {
      async compare(actual: any): Promise<jasmine.CustomMatcherResult> {
        return new Promise((resolve, reject) => {
          const result: jasmine.CustomMatcherResult = {
            pass: false,
          };

          axe.run(actual, {}, (error: Error, results: axe.AxeResults) => {
            if (error) {
              reject(error);
              return;
            }

            if (results.violations.length) {
              results.violations.forEach((violation) => {
                console.log(violation.tags, violation.nodes);
              });
              result.message = results.violations
                .map(
                  (violation) =>
                    `* ${violation.description}\n  ${violation.helpUrl}\n  Affected nodes:\n ${violation.nodes.map((node) => `  ${node.html}\n  ${node.failureSummary}`).join('\n\n')}}`,
                )
                .join('\n');
            } else {
              result.pass = true;
            }

            resolve(result);
          });
        });
      },
    };
  },
};

beforeAll(() => {
  jasmine.addAsyncMatchers(customMatchers);
});

afterEach(() => {
  // vscode is lying! it should exist
  viewport.reset();
});
