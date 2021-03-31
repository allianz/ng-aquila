# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [11.3.0](https://github.com/aposin/ng-aquila/compare/v11.2.0...v11.3.0) (2021-03-31)

### Tabs changes
The structure of the **tabs component** slightly changed. If you're using a tab-group which is aligned to the left and not centered, you need to modify the custom css and change `.nx-tab-header` to `nx-tab-header`:
```
:host ::ng-deep nx-tab-header {
  justify-content: flex-start!important;
}
```

### Bug Fixes

* **card:** prevent header contents overflowing icon ([91ebb2c](https://github.com/aposin/ng-aquila/commit/91ebb2c46b2bde3b9e381c9f6709ecffedf94dbb))
* **checkbox:** add checkbox indeterminate fill color ([522a6f4](https://github.com/aposin/ng-aquila/commit/522a6f475bf70374d883a7d7dc2592e669dca4b5))
* **comparison-table:** use plain button for info icons, update popular cell theming tokens ([ce1ecbb](https://github.com/aposin/ng-aquila/commit/ce1ecbb7d2211ccef9aa36a8851985940ae67632))
* **sidebar:** drag animation is visible again ([0fc1318](https://github.com/aposin/ng-aquila/commit/0fc13187607294dfbee8723e2256ec8057b381f2))
* **small-stage:** add theming token for text color ([75c410a](https://github.com/aposin/ng-aquila/commit/75c410a6cb792108c35cf756750d033ffba67ac9))
* **table, formfield:** remove padding from formfields inside table and add example ([ad7e21d](https://github.com/aposin/ng-aquila/commit/ad7e21d0bcad004d3afa7814c199bb9d7c4ac3bc))


### Features

* **card:** show icon outline for expert when card not selected ([e72aea9](https://github.com/aposin/ng-aquila/commit/e72aea9e01404fe9006b2719a42e9a6a976d15c9))
* **dropdown:** add custom overlay label ([6670b31](https://github.com/aposin/ng-aquila/commit/6670b314131fe0de5fbb188327c3652a71b4ade3))
* **phone-input:** add component ([d51e888](https://github.com/aposin/ng-aquila/commit/d51e888e0fe7197def8b162e44e61e2a1d16c244))
* **table:** add isExpanded input for nxExpandableTableRow ([5916a1a](https://github.com/aposin/ng-aquila/commit/5916a1a0326bd95b364c7a49a35b6b3d563a1b75))
* **tabs:** implement scrolling behavior of tabs header ([699adc9](https://github.com/aposin/ng-aquila/commit/699adc939576c0c1148d4685d78acccdf563c1d6))



# [11.2.0](https://github.com/aposin/ng-aquila/compare/v11.1.0...v11.2.0) (2021-03-15)

For the **sidepanel component** there was introduced the wrapping `nx-sidepanel-outer-container` component. The standalone sidepanel without a wrapper is deprecated. Please check the [documentation of the sidepanel](https://aposin.github.io/ng-aquila/documentation/sidepanel/overview) for more information.

For the **tree component** there was a `nxTreeNodeActionItem` directive introduced. It should be added on actionable items (i.e. links, checkboxes, etc.) within the tree for better accessibility. Please check the [documentation of the tree](https://aposin.github.io/ng-aquila/documentation/tree/overview) for more information.

### Bug Fixes

* **button:** stop relying on attributes for styling ([e4d5f87](https://github.com/aposin/ng-aquila/commit/e4d5f870e7d87c32fb20148a3b44cfb321afcfab))
* **dropdown:** not showing errors in progress indicators ([e8b9b10](https://github.com/aposin/ng-aquila/commit/e8b9b1062b108e97c03e93b4aae94b94dc0c4234))
* **popover:** scroll positioning ([b8c909d](https://github.com/aposin/ng-aquila/commit/b8c909d89aaba0d92ba6ac2db2bd533238b64533))
* **system:** stop relying on attributes for styling ([e6c63b2](https://github.com/aposin/ng-aquila/commit/e6c63b26f18ec9c5e5202a03fb188f8f270872e1))


### Features

* **button:** add anchor buttons ([6919587](https://github.com/aposin/ng-aquila/commit/69195873abb5f0cd73b2d5d474170e58a2af0fea))
* **comparison-table:** support expert theme ([c66e9ec](https://github.com/aposin/ng-aquila/commit/c66e9ecce2b82a6337d671a4f816f71c46f2be6b))
* **indicator:** positioning enhancements ([61ad282](https://github.com/aposin/ng-aquila/commit/61ad2820543beb5528950551be85d1dd39f459e3))
* **sidepanel:** introduce wrapper container around sidepanel ([e07ed18](https://github.com/aposin/ng-aquila/commit/e07ed18ea1a07155d324452bb68a0df466bd3a2b))
* **tree:** keyboard navigation ([f401de8](https://github.com/aposin/ng-aquila/commit/f401de860b9c868ca756c0bbf6df84e9db18b5da))



# [11.1.0](https://github.com/aposin/ng-aquila/compare/v11.0.1...v11.1.0) (2021-03-01)


### Bug Fixes

* **avatar:** focus style not visible in high contrast on edge ([a54ed9b](https://github.com/aposin/ng-aquila/commit/a54ed9b2db530c38b9d234d20b7f4ccd2fa048a7))
* **comparison-table:** scroll element into view when hidden by header ([177faca](https://github.com/aposin/ng-aquila/commit/177facaf9bc98cdab9cd3d870cbc64a421958a76))
* **context-menu:** update styling of keyboard focus ([416ad77](https://github.com/aposin/ng-aquila/commit/416ad775b120032c7d6bdf437e8eaa4970648e30))
* **formfield:** apply expert placeholder styles to textarea ([aa89c37](https://github.com/aposin/ng-aquila/commit/aa89c37eb0c233123cf6fa5b089acf4cdf830289))
* **formfield:** autofill style when using appearance is outline ([e105a79](https://github.com/aposin/ng-aquila/commit/e105a797acf7c7367f1bfae645fd6d8aa069f5e1))
* **progress-stepper:** truncate long labels ([7bb06fd](https://github.com/aposin/ng-aquila/commit/7bb06fd1547aaa1101966b6287bb67766e491dcf))
* **tooltip:** update padding ([2725c01](https://github.com/aposin/ng-aquila/commit/2725c018368c580659088666e4aa0df565386c71))


### Features

* **progress-indicator:** improve a11y for multi-stepper ([d8e6b70](https://github.com/aposin/ng-aquila/commit/d8e6b70c0fbe2866bc8182a0e11d6b613571f64c))
* **small-stage:** design feedback based enhancements ([7f363bd](https://github.com/aposin/ng-aquila/commit/7f363bdc1b0178b05748410795b2a07439a160d1))



## [11.0.1](https://github.com/aposin/ng-aquila/compare/v11.0.0...v11.0.1) (2021-02-08)


### Bug Fixes

* **icon-registry:** throw proper error if HttpClient is missing ([86c6f69](https://github.com/aposin/ng-aquila/commit/86c6f69204110db4ebceb6364ac3d0c494508ef8))
* **popover:** handle document clicks in shadow dom ([14025df](https://github.com/aposin/ng-aquila/commit/14025dfc63f3d805fb7c52be0e13ae356d87bc4e))
* **tooltip:** add input to allow selection of text in trigger ([f12b99e](https://github.com/aposin/ng-aquila/commit/f12b99eb627709c7f00f26c37ac53c258d432b55))
* **various:** high contrast on Chromium Edge ([1ade45c](https://github.com/aposin/ng-aquila/commit/1ade45cd69be90e71cbba921eb9fbd2baf27d7fe))
* **various:** high contrast on Chromium Edge ([7858f2f](https://github.com/aposin/ng-aquila/commit/7858f2f3b5b672a611e1f166878e6751f3c82c3d))
* **various:** high contrast on Chromium Edge ([3eaa23d](https://github.com/aposin/ng-aquila/commit/3eaa23d58375cf9ea884d171a7141409519feabf))



# [11.0.0](https://github.com/aposin/ng-aquila/compare/v10.9.0...v11.0.0) (2021-01-29)

### Highlights

#### Removal of outer default margins
In this release we removed some default outer margins of components that were coming from the early days of the library and do not match the many different scenarios and layouts where these components are used. You are free to set a margin appropriate to your designs. As this can potentially mean visual changes we provide a compatibility css file that restores the former default margins. See the BREAKING CHANGES section below or the [update guide](https://aposin.github.io/ng-aquila/guides/releases) for more details and how to use the compatibility css.

#### Deprecation removals
After quite some time we cleaned up a lot of deprecations. We tried our best to migrate these deprecations during `ng update` or give you a warning in case you have to update manually.

#### Small stage
The small stage was extended to be used in both expert and retail scenarios. It should give you a lot of flexibility now to create the best experience for the end user. For that some adjustments have to be made as the code prior to this release is not working anymore. You find all relevant code examples in the documentation.


### Bug Fixes

* **breakpoints:** correct breakpoints and improve comments ([bec4636](https://github.com/aposin/ng-aquila/commit/bec4636d1546f583b2f22bdac9733a61e6609da3))
* **button:** high contrast on chromium edge ([f65ab98](https://github.com/aposin/ng-aquila/commit/f65ab9828bad5c85159cc6f5a59d4d308347fbdc))
* **checkbox:** high contrast on chromium edge ([a049888](https://github.com/aposin/ng-aquila/commit/a0498884ed957258a9b4f6a8f08947e6945e22f0))
* **context-menu:** icons still have auto size ([cf20b17](https://github.com/aposin/ng-aquila/commit/cf20b17ed01ff2e9a99d2fbacf7bd9cd0d65b197))
* **file-uploader:** add missing styles for components ([d8b7095](https://github.com/aposin/ng-aquila/commit/d8b70953c386d2880ff7a6f56e20532c13b82d2b))
* **focus-styles:** high contrast on chromium edge ([d96a2cb](https://github.com/aposin/ng-aquila/commit/d96a2cba6491987b1148ba4403a67c5e500d584c))
* **icon:** align to center ([b9a4b08](https://github.com/aposin/ng-aquila/commit/b9a4b08d96cc72bcae7b18ee1e60324f07792a00))
* **iso-date-adapter:** use formats without separators first ([dac1128](https://github.com/aposin/ng-aquila/commit/dac11287b6f846b6bea17cf96cd07f25d7bf1f89))
* **margin-classes:** add nx-margin-x-0 and nx-margin-y-0 classes ([d13370a](https://github.com/aposin/ng-aquila/commit/d13370ae9c8cb24261ea70747bb8503a5a565b8b))
* **margin-classes:** only affect horizontal/vertical margins when using x/y ([f54ecc1](https://github.com/aposin/ng-aquila/commit/f54ecc1b35e6b9e740bc7f5782e6623776d3f0b4))
* **progress-stepper:** match type of _stepHeader with CDK ([0ced970](https://github.com/aposin/ng-aquila/commit/0ced970480ca163a975f15113d402b45c0f7f961))
* **radio-button:** high contrast on chromium edge  ([221ea41](https://github.com/aposin/ng-aquila/commit/221ea417948733e6720257818088692d09bcdc1b))
* **radio-toggle:** high contrast on chromium edge ([0aa4b0d](https://github.com/aposin/ng-aquila/commit/0aa4b0daa138e3f8517960dfda91ffa66899c3be))
* **schematics:** update to new CLI api ([d5286de](https://github.com/aposin/ng-aquila/commit/d5286deef5dbce20b3925bb48082d5cd36b12ad7))
* **switcher:** high contrast on chromium edge ([b038b69](https://github.com/aposin/ng-aquila/commit/b038b6962fcad0cbabbb8ad6ea6c8fae222463f8))

### Code Refactoring

* remove deprecations without automatic update ([c5a7830](https://github.com/aposin/ng-aquila/commit/c5a78308c848f85c54800022c1ebd41a6fd85513))
* remove various deprecations ([1084f82](https://github.com/aposin/ng-aquila/commit/1084f8297bbb95e02a53b718b01150ae2e9255ed))


### Features

* remove default outer margins from components  ([778f43a](https://github.com/aposin/ng-aquila/commit/778f43ac4900d05e7467d70c84d44a6328ad0d51))
* **file-uploader:** add maxFileNumber validation ([e6a1af9](https://github.com/aposin/ng-aquila/commit/e6a1af93c98ef010658660c84d30d010ba0dae98))
* **file-uploader:** custom file item templates ([690aa98](https://github.com/aposin/ng-aquila/commit/690aa9871750bef9a80cd98094ded8e3f8b99f18))
* update to Angular 11 ([7157dfd](https://github.com/aposin/ng-aquila/commit/7157dfd6fb7c38659ba1bd6e143b5103efe275de))
* **small-stage**: rewrite to support retail ([dd7e22e](https://github.com/aposin/ng-aquila/commit/dd7e22e91bbd23ff113e080cdd2b64ada88b9db7))


### BREAKING CHANGES

* **small-stage**: the component was refactored to support both retail and expert, the changes in detail contain:
  * The `contentNarrow` input of `nx-small-stage` was renamed to `narrow` and moved to the `nx-small-stage-content` directive.
  * The `offsetEnd` input of `nx-small-stage` was moved to the `nx-small-stage-end-image` directive.
  * The `inputUrl` input of `nx-small-stage` was renamed to `src` and moved to the `nx-small-stage-end-image` directive.
  * The `small-stage-image-container-padding-start` theming token was renamed to `small-stage-image-container-padding-to-content`.
  * The `small-stage-background-color` theming token was removed. Please set the background-color directly with css.
* **comparison-table**: removed the `label` input, use `labelCollapsed` instead
* **datefield**: removed the `getPopupConnectionElementRef`method, use `getConnectedOverlayOrigin` instead
* **datefield**: removed the `calendarHeader` property from `NxDatepickerIntl`, use `switchToMultiYearViewLabel` instead
* **dropdown**: removed the `nxAriaLabel` input. Accessibility for dropdown is achieved with aria-labelledby that is set automatically
* **progress-indicator**: removed the `title` input for all progress-indicators. Use a `nx-label` element as content to the indicator instead. Example:
```
  <nx-single-stepper currentStepLabel="Step">
    <nx-label>My Title</nx-label>
    ...
  </nx-single-stepper>
```
* The outer margins of components were removed. For an easier upgrade path we provide a `compatibility.css` file that restores the margins prior to this change. To use this add "node_modules/@aposin/ng-aquila/css/compatibility.css" to your styles in `angular.json`.

  The exact changes are:

  - expansion-panel/accordion: Removed `margin-top: 16px`  before the first expansion-panel inside an accordion.
  - button: Removed `margin: 0 0 24px 0`.
  - cards: Removed `margin-bottom: 24px` from the `nx-card` component and `margin-bottom: 8px` from the `nx-selectable-card` component.                                                      
  - checkbox: Removed `margin-bottom: 16px`.
  - copytext: Removed `margin: 0 0 32px 0`. The copytext now has a default `margin: 0`.
  - dynamic-table: Removed `margin: 32px 0`.
  - headlines: Removed `margin-bottom` from each headline size. The headlines now have a default `margin: 0`.
  - lists: Removed `margin-bottom: 32px` from the list and `margin-bottom: 16px` from the last list item.
  - notifications and errors: Removed `margin: 12px 0` from `nx-message`, `nx-message-banner` and `nx-error` (of type `message`). For the Message Toast the margin is still used.
  - number-stepper: Removed `margin-top: 12px` if there is no label set.
  - pagination: Removed `margin: 8px 0` from the Advanced Pagination (+ smaller screens: `margin: 8px 0 40px 0` ) and  `margin: 16px 0`  from the Simple Pagination (smaller screens: `margin: 40px 0`).
  - taglist: Removed `margin-bottom: 32px` on the list. On the single tag items, there is still used a `margin-bottom`.

* **margin-classes:** When using nx-margin-x-..., the vertical margins are no longer set to 0. When using nx-margin-y-..., the horizontal margins are no longer set to 0.
* * **card**: remove deprecated selectable, selected, disabled and selectedChange property. Please update to the `nx-selectable-card` component
* **datefield**: remove deprecated format function which is not needed to be called anymore
* **icon-registry**: remove deprecated `getSvgIcon` method. Use `getIcon` instead.
* **radio-toggle**: remove deprecated `selection` setter



# [10.9.0](https://github.com/aposin/ng-aquila/compare/v10.8.0...v10.9.0) (2021-01-12)

As a documentation change there was added a link to stack-blitz for the examples.

### Bug Fixes

* **avatar:** hover and active grey bloom changes text color ([28e9a1e](https://github.com/aposin/ng-aquila/commit/28e9a1e0034878f9fff2edcbe5089a39427f921c))
* **context-menu:** adjust height of items and offset of submenus ([6c504e3](https://github.com/aposin/ng-aquila/commit/6c504e37ab406290fdcc6212f58e09a23f2abdbf))
* **datefield:** parseError when input is empty ([d9be564](https://github.com/aposin/ng-aquila/commit/d9be5643ad35e7f9f658e26a243226ee1723a2df))
* **datefield:** select correct year in adjacent cells in datepicker ([c954981](https://github.com/aposin/ng-aquila/commit/c954981d299000fdc2fc4fa8b642ecb323af1f05))
* **file-uploader, formfield:** remove delay(0) ([340866f](https://github.com/aposin/ng-aquila/commit/340866fedca30340c4f6bba769776406ea8f5313))
* **formfield:** remove font-weight on nx-icons ([f992b32](https://github.com/aposin/ng-aquila/commit/f992b32024ad7a9fe4767e17867cdc6e4e46e857))
* **icon:** svg does not fit in flexbox space inside icon ([da71316](https://github.com/aposin/ng-aquila/commit/da713165a8a8c92f9d270f754beaaea42b416caf))
* **side-navigation:** add missing padding-bottom ([11584cb](https://github.com/aposin/ng-aquila/commit/11584cb97440c9929ad5589f7ab25ac099fe9128))
* **toggle-button:** allow reset values as radio values ([c2720b9](https://github.com/aposin/ng-aquila/commit/c2720b92cc08a94e84df92487667db66b20a8c24))


### Features

* **checkbox:** add focus() method ([3cbb4bd](https://github.com/aposin/ng-aquila/commit/3cbb4bd1b52df0a286de1d6431da6d540dfb6716))
* **circle-toggle:** add focus() method ([079d64d](https://github.com/aposin/ng-aquila/commit/079d64d3788601f842a8b800f13a726d3ac8bd03))
* **radio-button:** add focus() method ([e3cd98b](https://github.com/aposin/ng-aquila/commit/e3cd98b9c454a6984ff8f5b58c5d1102e929077f))



# [10.8.0](https://github.com/aposin/ng-aquila/compare/v10.7.0...v10.8.0) (2020-12-21)


### Bug Fixes

* **iso-date-adapter:** use the locale of the date adapter ([cd55c93](https://github.com/aposin/ng-aquila/commit/cd55c939f04c90d1c7bfe4567e592d6820d4d896))


### Features

* **sidepanel:** add light color variant ([7b0959f](https://github.com/aposin/ng-aquila/commit/7b0959f219d0fe2844abff196c9136b4d91ad277))



# [10.7.0](https://github.com/aposin/ng-aquila/compare/v10.6.0...v10.7.0) (2020-12-14)


### Bug Fixes

* **accordion:** proper margins for rtl extra-light ver ([59d692a](https://github.com/aposin/ng-aquila/commit/59d692a575582e1a1d7214da8853be86d03d39a4))
* **accordion:** proper padding tokens for rtl ([a81706b](https://github.com/aposin/ng-aquila/commit/a81706ba1289efe7626757422a956d9dc17f2b0c))
* **datefield:** no error when parsing invalid date ([57a28fc](https://github.com/aposin/ng-aquila/commit/57a28fc62625dd54b3c825439b3e847b48983475))
* **formfield:** float label to start for outline formfields ([f068094](https://github.com/aposin/ng-aquila/commit/f06809420b9d939965854b62d8d167b23d91ab6b))
* **tooltip:** add a11y styles to global css, update docs ([2ce3923](https://github.com/aposin/ng-aquila/commit/2ce392304d75da8a8fca0e689de76d827b529165))


### Features

* **avatar:** add component ([0d075e8](https://github.com/aposin/ng-aquila/commit/0d075e8c973fa2e22bd30858848a39ba26b35cf2))
* **comparison-table:** use CDK FocusMonitor for focus style ([85d47b8](https://github.com/aposin/ng-aquila/commit/85d47b8932ce46ee32a4ec396d758d79bbda3e05))
* **indicator:** add indicator component ([3311a94](https://github.com/aposin/ng-aquila/commit/3311a9426305b635e1fe9f40e4b397a80252c498))
* **various:** use CDK FocusMonitor for keyboard focus style ([587d86d](https://github.com/aposin/ng-aquila/commit/587d86d68e54dd14622bdb80726584c684e24b9b))


### Reverts

* Revert "fix(tooltip): add a11y styles to global css, update docs (#151)" (#154) ([01b936c](https://github.com/aposin/ng-aquila/commit/01b936caf881a14fa00895dc7d936d1d564c66c7))



# [10.6.0](https://github.com/aposin/ng-aquila/compare/v10.5.0...v10.6.0) (2020-12-04)


### Bug Fixes

* **moment-date-adapter:** moment is not a function error on StackBlitz ([14f0638](https://github.com/aposin/ng-aquila/commit/14f0638b7b5d9c9d47b1462108f8e7162c854208))
* migration schema ([db7e08b](https://github.com/aposin/ng-aquila/commit/db7e08bbf0bc58a991149aae15c8c843fac42f14))
* **slider:** prevent focus when disabled ([b7ac7ef](https://github.com/aposin/ng-aquila/commit/b7ac7ef6c1451a0ca6400cebbfccfd0764cae3f7))


### Features

* **autocomplete:** allow dynamic dir switching ([bb1c7b0](https://github.com/aposin/ng-aquila/commit/bb1c7b054fb85616abefb11830eea77c52ed1e88))
* **context-menu:** allow dynamic dir switching ([8e04f09](https://github.com/aposin/ng-aquila/commit/8e04f09fb3ee123dd47f80124c1d2d0646b7a957))
* **datepicker:** allow dynamic dir switching ([5b1624e](https://github.com/aposin/ng-aquila/commit/5b1624ec4b9bbe313294bca8a80e0c5ac637dc48))
* **modal:** allow dynamic dir switching ([a8c1616](https://github.com/aposin/ng-aquila/commit/a8c16164c82088c4d59a914718a18578b0d47af6))
* **pagination:** allow dynamic dir switching ([ae7a65e](https://github.com/aposin/ng-aquila/commit/ae7a65e38e5e555bbcd7ebdcfc682060808080b2))
* **popover:** allow dynamic dir switching ([6890385](https://github.com/aposin/ng-aquila/commit/6890385089fe336bb3a80038eb6052e6b06e0e6f))
* **tooltip:** allow dynamic dir switching ([79e37c3](https://github.com/aposin/ng-aquila/commit/79e37c34ed652ced407e8c421ef1943f09575b7c))
* **various:** use CDK FocusMonitor for keyboard focus style ([ec47e38](https://github.com/aposin/ng-aquila/commit/ec47e388c698b6ec7349c48ce9ef26508785e31c))
* **various:** use CDK FocusMonitor for keyboard focus style ([aa48a39](https://github.com/aposin/ng-aquila/commit/aa48a392dd53abbbb83f1b219696ff23fa4f8bf3))



# [10.5.0](https://github.com/aposin/ng-aquila/compare/v10.4.1...v10.5.0) (2020-11-19)


### Bug Fixes

* **comparison-table:** use clip-path for sticky behaviour ([e812ccd](https://github.com/aposin/ng-aquila/commit/e812ccd5195805f33f2b4e0f0e7af7664f92dbf2))
* **popover:** proper rtl positioning ([e09a7cd](https://github.com/aposin/ng-aquila/commit/e09a7cd276e6dd2877ba73c1cced3c9584a371d4))


### Features

* **various:** use CDK FocusMonitor for keyboard focus style ([dfc2e79](https://github.com/aposin/ng-aquila/commit/dfc2e79a0699de0824fabe95e3fd870bda53ecf0))



## [10.4.1](https://github.com/aposin/ng-aquila/compare/v10.4.0...v10.4.1) (2020-11-11)


### Bug Fixes

* **accordion:** chevron loses size ([090cc93](https://github.com/aposin/ng-aquila/commit/090cc93a538da0a2b3bbffa284be516eb4a4fef2))
* **comparison-table:** not updating when parent is onPush ([52c6b69](https://github.com/aposin/ng-aquila/commit/52c6b697192b752eb806fba0db238e5bf29e076c))
* **file-uploader:** file cannot be added in single input in IE ([a3f7a18](https://github.com/aposin/ng-aquila/commit/a3f7a184dd2997daf17438c2851ed4aec513ade3))



# [10.4.0](https://github.com/aposin/ng-aquila/compare/v10.3.0...v10.4.0) (2020-11-04)


### Bug Fixes

* **autocomplete:** overlay being opened too small ([5fbbe9a](https://github.com/aposin/ng-aquila/commit/5fbbe9adfd471204006ab7a121981180589ca936))
* **popover:** not applying direction classes correctly ([fe39d81](https://github.com/aposin/ng-aquila/commit/fe39d814a8f13794ab233ab379d872451a16b0b6))


### Features

* **context-menu, notification-panel:** set trigger button as active ([6ffd738](https://github.com/aposin/ng-aquila/commit/6ffd738c295bb81595a0627d342fedcac2ab100b))
* **iso-date-adapter:** add new adapter ([50c36d5](https://github.com/aposin/ng-aquila/commit/50c36d5349956925d6e52061e260af300742b3e1))



<a name="10.3.0"></a>
# [10.3.0](https://github.com/aposin/ng-aquila/compare/v10.2.0...v10.3.0) (2020-10-21)


### Bug Fixes

* **plain-button:** remove browser focus outline ([67bcb60](https://github.com/aposin/ng-aquila/commit/67bcb60))


### Features

* **notification-panel:** add new component ([ef30e5c](https://github.com/aposin/ng-aquila/commit/ef30e5c))
* **small-stage:** introduce component ([b0035b6](https://github.com/aposin/ng-aquila/commit/b0035b6))



<a name="10.2.0"></a>
# [10.2.0](https://github.com/aposin/ng-aquila/compare/v10.1.0...v10.2.0) (2020-10-16)


### Bug Fixes

* letter-spacing token for extra-light accordion and comparison-table ([59cf1f6](https://github.com/aposin/ng-aquila/commit/59cf1f6))
* **circle-toggle:** group does not recognize toggle-button descendants ([46f6dca](https://github.com/aposin/ng-aquila/commit/46f6dca))
* **comparison-table:** correct aria-colspan on toggle-section headers ([e6c3740](https://github.com/aposin/ng-aquila/commit/e6c3740))
* **comparison-table:** remove doubled rowgroup role ([c9160c1](https://github.com/aposin/ng-aquila/commit/c9160c1))
* **link:** new option for using an icon with no text ([f01a7b6](https://github.com/aposin/ng-aquila/commit/f01a7b6))
* **modal:** add border to container for high contrast ([d13a73d](https://github.com/aposin/ng-aquila/commit/d13a73d))
* **popover:** allow closeOnClickOutside and manual trigger for modal ([8684d31](https://github.com/aposin/ng-aquila/commit/8684d31))


### Features

* **overlay-service:** add new overlay service ([9755de6](https://github.com/aposin/ng-aquila/commit/9755de6))
* typescript 4 support ([#66](https://github.com/aposin/ng-aquila/issues/66)) ([c1330ad](https://github.com/aposin/ng-aquila/commit/c1330ad))
* **accordion:** add extra light option ([38b9652](https://github.com/aposin/ng-aquila/commit/38b9652))



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
