# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="10.0.0"></a>
# 10.0.0 (2020-09-15)

### Highlights

#### Open source

The UI component library (now called `ng-aquila`) is now open source 🎉. That brings some changes for internal projects but with the power of schematics all the necessary changes are automatically migrated.

#### Right-to-left support
We are introducing Right-to-left (RTL) Support into the library. We are confident that most components work pretty good but we greatly appreciate any feedback from right-to-left users.
You can change direction by adding `dir="rtl"` to your HTML Element.

### Bug fixes

* **progress-indicator:** fix upstream CdkStepper changes
* **spinner**: indicator color not visible


### Features

* **open source**: open source the library
* **theming:** add opensource expert theme
* **schematics**: add upgrade schematics
* listen to changes of defaultOptions injectionTokens of components
* **accordion:** implement expert mobile styles
* **button:** add new plain button
* **copytext:** allow usage in all html elements
* **icon:** add essential icons and NdbxIconModule
* **schematics:** add ndbx icon module migration
* **rtl:** add right-to-left (RTL) support
* **timefield:** add new timefield component


### BREAKING CHANGES

* **accordion:** In order to change the border color of the tabs on mobile you have to overwrite both the tokens
`accordion-regular-mobile-border-color` and `accordion-regular-mobile-border-separator-color`. Previously only the first one had to be changed.


* **icon-registry**: `getSvgIcon` is deprecated please use `getIcon` instead
* **icon-registry**: `registerFontClass` was removed and replaced by `registerFont`
