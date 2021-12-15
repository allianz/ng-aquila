/// <reference path="./src/types/jasmine.d.ts"/>

// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'core-js/es';
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';
import axe from 'axe-core';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
}
);
// Then we find all the tests.
const context = require.context('./src/', true, /\.\/(?!schematics).*\/.*\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

/**
 * https://github.com/angular/angular/issues/31834
 * There is a leak that all inserted styles are not cleaned between tests
 * resulting in hundreds to thousands of style nodes in the DOM.
 * (around 4000 at the time of writing)
 * That's a quick workaround until this is fixed in the framework
 */
afterEach(() => {
  getTestBed().inject(ɵDomSharedStylesHost).ngOnDestroy();
});

const customMatchers: jasmine.CustomAsyncMatcherFactories = {
  toBeAccessible(): jasmine.CustomAsyncMatcher {
    return {
      compare(actual: any): Promise<jasmine.CustomMatcherResult> {
        return new Promise((resolve, reject) => {
          const result: jasmine.CustomMatcherResult = {
            pass: false
          };

          axe.run(actual, {}, (error: Error, results: axe.AxeResults) => {
            if (error) {
              reject(error);
              return;
            }

            if (results.violations.length) {
              result.message = results.violations
                .map((violation) => {
                  return `* ${violation.description}\n  ${violation.helpUrl}`;
                })
                .join('\n');
            } else {
              result.pass = true;
            }

            resolve(result);
          });
        });
      }
    };
  }
};

beforeAll(() => {
  jasmine.addAsyncMatchers(customMatchers);
});
