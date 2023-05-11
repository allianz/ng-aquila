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
                            result.message = results.violations.map(violation => `* ${violation.description}\n  ${violation.helpUrl}`).join('\n');
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
