import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import axe from 'axe-core';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false },
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
                            results.violations.forEach(violation => {
                                console.log(violation.tags, violation.nodes);
                            });
                            result.message = results.violations
                                .map(
                                    violation =>
                                        `* ${violation.description}\n  ${violation.helpUrl}\n  Affected nodes:\n ${violation.nodes.map(node => `  ${node.html}\n  ${node.failureSummary}`).join('\n\n')}}`,
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
