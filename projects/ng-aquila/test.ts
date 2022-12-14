import { getTestBed } from '@angular/core/testing';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import axe from 'axe-core';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false },
});

/**
 * https://github.com/angular/angular/issues/31834
 * There is a leak that all inserted styles are not cleaned between tests
 * resulting in hundreds to thousands of style nodes in the DOM.
 * (around 4000 at the time of writing)
 * That's a quick workaround until this is fixed in the framework
 *
 * Benefit: significant speed increase (around 60% faster at the time of writing)
 */
afterEach(() => {
    getTestBed().inject(ɵDomSharedStylesHost).ngOnDestroy();
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
