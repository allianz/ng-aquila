# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="10.1.0"></a>
# [10.1.0](https://github.com/aposin/ng-aquila/compare/v10.0.0...v10.1.0) (2020-09-29)


### Bug Fixes

* **formfield:** add background to outline formfield ([a42a695](https://github.com/aposin/ng-aquila/commit/a42a695))
* **formfield:** change order of label and input in template ([2016ff6](https://github.com/aposin/ng-aquila/commit/2016ff6))
* **sidepanel:** use box-shadow only for floating variant ([4feb209](https://github.com/aposin/ng-aquila/commit/4feb209))
* **spinner:** correct size of bobbles for small spinner ([b252164](https://github.com/aposin/ng-aquila/commit/b252164))
* **tabs:** only show content focus when keyboard is used ([eb94092](https://github.com/aposin/ng-aquila/commit/eb94092))


### Features

* **button:** add danger option ([e38f563](https://github.com/aposin/ng-aquila/commit/e38f563))
* **comparison-table:** popular cell for mobile view ([4e84871](https://github.com/aposin/ng-aquila/commit/4e84871))
* **number-stepper:** add inputs for aria-labels ([90adcc7](https://github.com/aposin/ng-aquila/commit/90adcc7))
* **popover:** new positioning logic ported from tooltip ([9c8eb7d](https://github.com/aposin/ng-aquila/commit/9c8eb7d))
* **sidepanel:** add component ([a050365](https://github.com/aposin/ng-aquila/commit/a050365))
* **tooltip:** new positions in fallback ([9c2d3ef](https://github.com/aposin/ng-aquila/commit/9c2d3ef))



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
