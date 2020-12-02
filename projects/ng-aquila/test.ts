// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'core-js/es';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
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
