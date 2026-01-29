# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [21.2.0](https://github.com/allianz/ng-aquila/compare/v21.1.0...v21.2.0) (2026-01-29)

### New components: price and info-icon
We just added two new components. One for showing prices which formats the price based on the locale. Additional layouts coming soon.
And a component for the info-icon that reduces the API and code needed compared to the popover to show most of the needed info icon overlays.

### Explicit inputs for buttons
The buttons now have explicit options instead of the string based inputs like `nxButton="primary small block`. Now you can set these individually and type safe `nxButton="primary" size="small" block`.

### Documentation 📚

* a1 component docs ([8e4cb32](https://github.com/allianz/ng-aquila/commit/8e4cb326b5f7eb0b3e48d1262e4152cc7c3043fa))


### Bug Fixes 🐛

* **data-display:** prevent long label & value from content overflowing ([6f4634f](https://github.com/allianz/ng-aquila/commit/6f4634f1906acda6e6c0a28248e0186d9d980c86))
* **date-range:** adjust overflow handling and text overflow for input ([1646481](https://github.com/allianz/ng-aquila/commit/16464819a614c7afec03ddfa156147da9030aec7))
* **datemask:** calculate width of the input fields dynamically ([41069b0](https://github.com/allianz/ng-aquila/commit/41069b02303418180075e4eab402961e449fbade))
* **datemask:** return parse error on incomplete dates ([85f83f9](https://github.com/allianz/ng-aquila/commit/85f83f983ed4ff96c0c7e9952ade65b79593b0c2))
* **modal:** change animation event ([8022109](https://github.com/allianz/ng-aquila/commit/80221090fccbe15aa4b21011b6a130a36d2e30ba))
* **multi-select:** double value announcement with screen readers ([e92f075](https://github.com/allianz/ng-aquila/commit/e92f07545cb19621ee9ee5e1c7a379a479bcfb1e))
* **tab-group:** remove debug text ([e6e7936](https://github.com/allianz/ng-aquila/commit/e6e7936ed179dcb5f5906fbd66e0b5737350d3ad))
* **tile:** make checkbox indicator bg color on tile transparent ([4929516](https://github.com/allianz/ng-aquila/commit/4929516b9184d90d733b6c368ae58404baee09af))
* **timefield:** fix focus border when click ([f73f872](https://github.com/allianz/ng-aquila/commit/f73f872a4acd96e89cded28a5b8a7fe8aa1f5c16))
* **toast:** add id to our aria-live ([d1e6d7a](https://github.com/allianz/ng-aquila/commit/d1e6d7a4196da338800517c32959f9fe35037b12))


### Features ✨

* **badge:** a1 full implementation ([2ef40e7](https://github.com/allianz/ng-aquila/commit/2ef40e77b305846e128f9036d89c5cb0ed2c5d5e))
* **button:** add separate inputs for different properties ([d88e475](https://github.com/allianz/ng-aquila/commit/d88e475fa65aa084b818c6f23ce14f5d99a2e6f4))
* **data-display:** tokenize data-display component ([1a2d13d](https://github.com/allianz/ng-aquila/commit/1a2d13d2ee91b5f89fa4b07614732aebcb7716f6))
* **indicator:** a1 light mapping ([f306124](https://github.com/allianz/ng-aquila/commit/f306124807a68ff5774449fee4ffdc2ccc6d76ba))
* **info-icon:** add new Info Icon component with popover functionality ([e9ee405](https://github.com/allianz/ng-aquila/commit/e9ee40557ff63e7e85de84d8255dcce5743b778e))
* **menu:** tokenize menu component ([3950a40](https://github.com/allianz/ng-aquila/commit/3950a4013bbbcc8636a42395e12b1dbae50043d8))
* **popover:** layout update ([a0aa6b3](https://github.com/allianz/ng-aquila/commit/a0aa6b3ab1eb1f18c7b48f7259d4b5caa56bd266))
* **price:** add price component ([09b9fc8](https://github.com/allianz/ng-aquila/commit/09b9fc8cfec5d361951385f31235e3da6606d57f))
* **tile:** update styling ([31960f7](https://github.com/allianz/ng-aquila/commit/31960f746ef408c1f634166e6d870a8c62cbc734))

## [21.1.0](https://github.com/allianz/ng-aquila/compare/v21.0.0...v21.1.0) (2025-12-23)


### Documentation 📚

* add shadowDom guide ([ccf79ef](https://github.com/allianz/ng-aquila/commit/ccf79efdaf71dca3ebf445d740971a78990ffb22))
* fix wrong import in code snippet ([8ad5886](https://github.com/allianz/ng-aquila/commit/8ad5886802bafaa8a90bc082464c3a574a15445f))


### Bug Fixes 🐛

* add missing peerDependencies for stackblitz ([482061f](https://github.com/allianz/ng-aquila/commit/482061fbcf8b825cc5f450839a80f6251b8769a7))
* **badge:** remove markForChecks in inputs for performance ([c9f3700](https://github.com/allianz/ng-aquila/commit/c9f3700d480531d7f3655ae4239b98258a8def3c))
* **breadcrumb:** fix icon breadcrumb icon not aligned ([c691ee9](https://github.com/allianz/ng-aquila/commit/c691ee9067a0d3f8d1d2646e0f82c4bb089ba8bd))
* **date:** prevent date range error with expert module or tabindex < 0 ([2d32f32](https://github.com/allianz/ng-aquila/commit/2d32f328350d8624904c0085326c0b8cba996e19))
* **expandable row:** add border between rows ([730c190](https://github.com/allianz/ng-aquila/commit/730c19023678e29b23ddb259134ef5eae6b4ff2e))
* **toggle-buton:** add cdk-visually-hidden to input ([ce87bfe](https://github.com/allianz/ng-aquila/commit/ce87bfe12341c238eccc7dadcea3a9755d087c18))


### Features ✨

* **badge:** a1 light mapping ([ebaf900](https://github.com/allianz/ng-aquila/commit/ebaf900829191e4416c0431a0068fa98776ab24c))
* **breadcrumb:** add css tokens ([2b9716c](https://github.com/allianz/ng-aquila/commit/2b9716ccad24530065c4a76d440c5623393538fa))
* **copytext:** a1 mapping ([b3ab3f5](https://github.com/allianz/ng-aquila/commit/b3ab3f5b34eca3c9e3116cf1f3ef1466e5bf4f4b))
* **formfield:** a1 styling ([930bf52](https://github.com/allianz/ng-aquila/commit/930bf52f2e40fb79ce25238a34b6dcf42f7da95f))
* **formfield:** allow signal based default nxOptionalLabel ([0938894](https://github.com/allianz/ng-aquila/commit/093889449a9eb80518af94581370152d856ddaef))
* **icons:** update allianz icon ([9848dd5](https://github.com/allianz/ng-aquila/commit/9848dd5102194dc9c96e2af0f9f692736f6cd0a1))
* **list:** a1 light mapping ([f0d3f25](https://github.com/allianz/ng-aquila/commit/f0d3f25d43a0a6d4e1f873615956d04adc47ad30))
* **list:** add type property for a1 ([f1e5a18](https://github.com/allianz/ng-aquila/commit/f1e5a181f6933015babf608417714414d0500175))
* **radio:** allow messages and connect outside messages via describedBy ([f52ccfc](https://github.com/allianz/ng-aquila/commit/f52ccfc826c9f553479ebe5429eadbb55db383d9))
* **slider:** add ariaLabelledBy input for external label reference ([2ca1bfb](https://github.com/allianz/ng-aquila/commit/2ca1bfb771260c00adb18c103170167fd29bdeaa))

## [21.0.0](https://github.com/allianz/ng-aquila/compare/v20.7.0...v21.0.0) (2025-12-04)

### ⚠ BREAKING CHANGES

* **checkbox:** the id of the internal input element was changed to `<checkbox-id>-input`, so an `-input` suffix was added.
* **signal-inputs**: we migrated a first batch of component inputs to signal properties. this might break your test or direct usage in code.
* **swipebar:** the deprecated swipebar component was removed.
* **various:** the deprecated Angular animations package was removed and replaced with CSS animations. with this change we removed animation exports from components.
* **number-stepper:** the `valueChange` outputs' typing was changed from `number` to `number | null`
* **rating:** the `size` input incorrectly allowed the `IconSize` type from the icon component. This was replaced with a new dedicated `RatingSize` type.
* **iban-mask**: the deprecated `iban` package was exchanged with `ibantools`. Running `ng update @allianz/ng-aquila` will exchange the dependency in your project.
* **file-uploader:** fixed a typo in the constructor `elemetRef` -> `elementRef`

### Features ✨

* **rating:** add label css vars per size ([b2ed790](https://github.com/allianz/ng-aquila/commit/b2ed790efe614c7f91b3c8148583e6c563610b4a))
* remove animations package ([4fb2797](https://github.com/allianz/ng-aquila/commit/4fb2797bef05ea9cc47f6e8598d672a24a51725b))
* update to angular v21 stable ([1ebd602](https://github.com/allianz/ng-aquila/commit/1ebd60280a6e944601a7bbc7d819e1df23fcb5f5))


### Code Refactoring 🧾

* migrate to signal input ([a161bb5](https://github.com/allianz/ng-aquila/commit/a161bb5e8cb9d756a59dc74f7063abc16dc07a6a))


### Bug Fixes 🐛

* **checkbox:** add postfix to checkbox's input and label id ([b35a69e](https://github.com/allianz/ng-aquila/commit/b35a69e7ad0fb26ac62c19b970802897b7c97a6b))
* **file-uploader:** Fix typo in element reference ([4d0e398](https://github.com/allianz/ng-aquila/commit/4d0e398d8e77f36c3d094785cd11d58e8196c103))
* **iban-mask:** update unmaintained dependency ([b6f0688](https://github.com/allianz/ng-aquila/commit/b6f0688c7d864751867bee3ba86f48e373a96e18))
* **iban:** clean up and update package in stackblitz ([b29d5ad](https://github.com/allianz/ng-aquila/commit/b29d5adaff2e23902c01c777be0fc2ea432d79f5))
* **number-stepper:** change type for valueChange emitter ([22bdcc4](https://github.com/allianz/ng-aquila/commit/22bdcc4de923b2591e3954ce410b7a880a49bb63))
* **rating:** replace IconSize with more specific RatingSize type ([444a40e](https://github.com/allianz/ng-aquila/commit/444a40ee6ac63e759a82beb67d95b0d7bb100851))


### Documentation 📚

* update releases for v21 ([ef0c93b](https://github.com/allianz/ng-aquila/commit/ef0c93b1a92634f0691c9b417f8d3f0b4de103f3))


## [20.7.0](https://github.com/allianz/ng-aquila/compare/v20.6.0...v20.7.0) (2025-11-27)

### Documentation 📚

* **button:** update documentation for nxButton attribute usage ([49f903d](https://github.com/allianz/ng-aquila/commit/49f903d8928f40d9751fe3ed4ba93b77bb17dd78))
* **sidepanel:** update tab header styles for example ([d099018](https://github.com/allianz/ng-aquila/commit/d0990183627ee8b085c88867fe6414d47bc0e2bf))


### Features ✨

* **rating:** add css variables for icon gaps ([1818da8](https://github.com/allianz/ng-aquila/commit/1818da80ebd780dcacd94c917824a2b1501f7980))
* show pattern examples ([2aafe1b](https://github.com/allianz/ng-aquila/commit/2aafe1b44d0753a2f8873a9eff9af06ac8fe5956))
* **sidebar:** combine aria-expanded to the label ([10c299c](https://github.com/allianz/ng-aquila/commit/10c299ca6ff5dc8ecda2f4f666235b21a6067308))
* **theming:** add possibility to scope themes ([e4821e3](https://github.com/allianz/ng-aquila/commit/e4821e3bfda0b3698cbaa54660779c4f111fafbf))


### Bug Fixes 🐛

* **comparison-table:** remove disabled text color ([7f66926](https://github.com/allianz/ng-aquila/commit/7f669268bf704cf701b4508ad239987535cc3a5f))
* **context-menu:** resolve circular dependency in vitetests ([1a0c141](https://github.com/allianz/ng-aquila/commit/1a0c141d8db01467dd4510077038ee1602509340))
* **datemask:** invalid values not resetting the input fields ([02fb3cc](https://github.com/allianz/ng-aquila/commit/02fb3cc8fe00e615d7d467b6b7de35bf38a1da0a))
* **dialog:** move cdk-live-annoucer into modal container ([1bbb509](https://github.com/allianz/ng-aquila/commit/1bbb5098fc506939de1eca028065ad6fc193ec08))
* **dropdown:** adjust max-height to prevent minimal scrollbar ([564ccad](https://github.com/allianz/ng-aquila/commit/564ccad1214fd240866270c188ee8592d0792922))
* **mask:** add event composition handler for samsung keyboard ([adc8c3f](https://github.com/allianz/ng-aquila/commit/adc8c3f8ca2154dc50488229edd511f999eff9b2))
* **message-toast:** add live region and move content ([44674f7](https://github.com/allianz/ng-aquila/commit/44674f703544d9b13c223e264862936b8149bc24))
* **modal:** update margin for fullscreen modal ([090423c](https://github.com/allianz/ng-aquila/commit/090423c37a76f5982678b3b9d4ed45c3a22d91c2))
* **number-stepper:** fix zero value being replaced by empty string ([820aa16](https://github.com/allianz/ng-aquila/commit/820aa169d050abc2a93ffbe6d3cb11cd34f5184e))
* **rating:** add missing gap between icon & label as per design ([21fc64b](https://github.com/allianz/ng-aquila/commit/21fc64b0356502c19a5f821f9f58d84686133ebe))
* **rating:** remove xl support ([cca4692](https://github.com/allianz/ng-aquila/commit/cca46925589d120615c13fa9bd2457db502ebfed))
* **tile:** add token for horizontal gap ([28698d5](https://github.com/allianz/ng-aquila/commit/28698d59b12592c7e20cb49f0398847a8c41b7e8))
* **timefield:** throw error when enableTimeValidation with non-number character input ([98fd419](https://github.com/allianz/ng-aquila/commit/98fd419d8f40c477deeffd1d662adcd147bce429))
* **toast:** always show toast on top ([256d8e5](https://github.com/allianz/ng-aquila/commit/256d8e5013338bfa094dbb6de6988da08d62015c))
* **tree:** update attributes for accessibility issue ([6321dc1](https://github.com/allianz/ng-aquila/commit/6321dc1a690405b89088fc227fc184567bc5abfd))

## [20.6.0](https://github.com/allianz/ng-aquila/compare/v20.5.0...v20.6.0) (2025-10-24)


### Documentation 📚

* change starter stackblitz app in welcome page to github ([10802cf](https://github.com/allianz/ng-aquila/commit/10802cf3fd703541ee3d708eecd79dbe9bf03cbe))
* **contained-list:** add a contained list pattern example ([73746db](https://github.com/allianz/ng-aquila/commit/73746db615a8b220d7f85a95cb6e451cb5fb890f))
* **headline:** add example for headline with attention text ([40041cc](https://github.com/allianz/ng-aquila/commit/40041cc967ca442e80a9d2d94518cdb44a7dc900))
* **table:** mask drag&drop column as technical demo ([0de183c](https://github.com/allianz/ng-aquila/commit/0de183c7a4acc800b0bdc556c8a5cd8b3989ac97))


### Features ✨

* **attention-color:** a1 attention color ([901607d](https://github.com/allianz/ng-aquila/commit/901607d05bf90d470f4b2f9c996a05b47c0faad2))
* **avatar:** A1 accent color for avatar ([862796e](https://github.com/allianz/ng-aquila/commit/862796ec55248996abb3290a4f6cf7177d386bd9))
* **context-menu:** add NxContextMenuGroupComponent for grouping menu items ([154e63e](https://github.com/allianz/ng-aquila/commit/154e63e931124860ccb87d83ae98e2097f6a4467))
* **number-stepper:** defer error display until input blur ([dc3ab91](https://github.com/allianz/ng-aquila/commit/dc3ab9172689303b5c87f951347cf52f32b8eab5))
* **popover:** update style token ([49d5615](https://github.com/allianz/ng-aquila/commit/49d5615ad058b288dcbfa098dd13f06031fc0942))
* **table:** add indent option to expandable cell ([417f750](https://github.com/allianz/ng-aquila/commit/417f7509cc566ab05eb8c4506de10894c1d187c0))


### Bug Fixes 🐛

* **autocomplete:** a11y in shadowDom ([7b1cd89](https://github.com/allianz/ng-aquila/commit/7b1cd8930fdce09a27c34a2f3101ba216665cc84))
* **circle-toggle:** has-error class host binding ([2b7f4b2](https://github.com/allianz/ng-aquila/commit/2b7f4b25c5dd7df348753a16bb87907d79bf6845))
* **circle-toggle:** make dom state sync correctly ([dbc11d9](https://github.com/allianz/ng-aquila/commit/dbc11d9181f08bc4faeb43ebd4f1c673ea1bdb18))
* **modal:** update horizontal margin ([a70421b](https://github.com/allianz/ng-aquila/commit/a70421b0fcb0f058acb75a5b2c2a83350059697c))
* **multi-select:** fix a11y issues shown in axe DevTools  ([c5c3f0b](https://github.com/allianz/ng-aquila/commit/c5c3f0b6973ab0f5afdcfb9fb8188f0ddf1d7b4d))
* **timefield:** prevent formfield ellipsis styles bleeding into timefield inputs ([fafaafe](https://github.com/allianz/ng-aquila/commit/fafaafeedff44ae6e2ca35bc15e0df583458d95e))

## [20.5.0](https://github.com/allianz/ng-aquila/compare/v20.4.0...v20.5.0) (2025-10-10)


### Documentation 📚

* update mcp generation ([71d6925](https://github.com/allianz/ng-aquila/commit/71d6925028445734b106994c23ab60a8b2c3ebf3))
* update mcp guide for claude code ([48a1cdb](https://github.com/allianz/ng-aquila/commit/48a1cdb779fa4980339c638c934be630e3d3a1ee))


### Features ✨

* **button:** add loading state ([6ef19ce](https://github.com/allianz/ng-aquila/commit/6ef19ce37ca23950629a0ffa6a305f9d1d4bd86a))
* **divider:** introduce divider base component & context menu specific adaption ([eb76516](https://github.com/allianz/ng-aquila/commit/eb765162da4a1d3c26d2f65e69f041e6e9ea8cb5))


### Bug Fixes 🐛

* **accordion:** add padding for mobile light styling ([2eb389a](https://github.com/allianz/ng-aquila/commit/2eb389ab26fbc35cbe508705b2a3fad1bd86f112))
* add COT to prevent token glitch in claude ([e8c95b6](https://github.com/allianz/ng-aquila/commit/e8c95b6dd3bbb7c65756062d568f5ca67f61c6f0))
* **dropdown:** update tooltip on initial and programmatic value changes ([431805e](https://github.com/allianz/ng-aquila/commit/431805ed22dec4b4eacc5cd98cea01e949a1e0ef))
* **file-uploader:** long file names can wrap to new line ([2998c84](https://github.com/allianz/ng-aquila/commit/2998c844cd4b6974c6e1cf8f9e5f7adb34a82d9b))
* **file-uploader:** retain external validators for noBlockingValidators ([d5488f9](https://github.com/allianz/ng-aquila/commit/d5488f9e93199b1a0b028feeffa1b1a0d8363bc2))
* **mask:** delete spaces should work for deactivated masks ([ab71653](https://github.com/allianz/ng-aquila/commit/ab71653e9e60d5a7397ffabcf2f761ea0bf0c55e))
* **table:** stop propagation of native select event ([61e2d7f](https://github.com/allianz/ng-aquila/commit/61e2d7ffec7999d016c06292b69e9d093d140212))

## [20.4.0](https://github.com/allianz/ng-aquila/compare/v20.3.0...v20.4.0) (2025-09-18)

### Documentation 📚

* **mcp:** Update initial MCP version ([b48df4d](https://github.com/allianz/ng-aquila/commit/b48df4d9b0954bc558baeb8d7bfccba819737ea0))


### Features ✨

* **datemask:** improve mouse and keyboard behavior ([96a049a](https://github.com/allianz/ng-aquila/commit/96a049a06a315b77ef06d400032d91584cbfffb7))
* **headline:** a1 size and color type ([a95d720](https://github.com/allianz/ng-aquila/commit/a95d720905bb4cc7ef54fd50f6f633e33dc235c7))
* **link:** add primary and secondary link for A1 ([083dfea](https://github.com/allianz/ng-aquila/commit/083dfea330c03ac47e6611ca795ebdb9c721d95c))
* **link:** add underline style and prominence option ([3f4a790](https://github.com/allianz/ng-aquila/commit/3f4a7909686ecf174d1b6942e08c40118c064217))
* **mcp:** add 'ngx-brand-kit' to MCP tool descriptions ([a44e73c](https://github.com/allianz/ng-aquila/commit/a44e73ce4d88ce1444d25c22511e455a9eb8a28c))


### Bug Fixes 🐛

*  add IdGenerationService for unique ID and prevent id collide ([a9f2e00](https://github.com/allianz/ng-aquila/commit/a9f2e002e705a29038e9b2054499db79519dab5d))
* **accordion:** add top padding ([9dfdfb2](https://github.com/allianz/ng-aquila/commit/9dfdfb2902fe88a515b5b2bcd1556c45e4aadb48))
* **datepicker:** wrong current date because of timezone ([278a4fe](https://github.com/allianz/ng-aquila/commit/278a4fee8d5b9ad78d2a12d5c5effc0bb91b0eab))
* **file-uploader:** disable delete button when form is disabled ([a3970df](https://github.com/allianz/ng-aquila/commit/a3970df1cd380313154156221e938b319e944024))
* **number-stepper:** refine invalid value handling ([e90a1e1](https://github.com/allianz/ng-aquila/commit/e90a1e1008ef48319d0b57e0ded2e434bd2f127b))

## [20.3.0](https://github.com/allianz/ng-aquila/compare/v20.2.0...v20.3.0) (2025-09-04)

### New: MCP Support (Developer Preview)
Starting with v20.3.0, our library ships with a local Model Context Protocol (MCP) server. It runs inside your IDE (e.g. VS Code) and has been tested with GitHub Copilot to provide LLMs with the context they need. This makes code completions for our components more accurate and helpful.
Each library version comes with its own MCP definition, so completions always match the version you’re using.

This is a developer preview — we’d love your feedback to make MCP even more valuable for your workflow. You can find more information in the [MCP documentation](https://allianz.github.io/ng-aquila/guides/mcp).

### Features ✨

* add mcp server ([e0dfaa4](https://github.com/allianz/ng-aquila/commit/e0dfaa4e1b338badc8fc3939be3ae00a7d7be4b7)), closes [#1558](https://github.com/allianz/ng-aquila/issues/1558) [#1565](https://github.com/allianz/ng-aquila/issues/1565) [#1567](https://github.com/allianz/ng-aquila/issues/1567)
* **link:** a1 light mapping ([a693bf0](https://github.com/allianz/ng-aquila/commit/a693bf00ebbdda945435144c1015116649e93451))


### Bug Fixes 🐛

* **file-uploader:** use unique trackBy for file items to fix warnings ([bb8ef9d](https://github.com/allianz/ng-aquila/commit/bb8ef9d426022658fe79ff55dab654107f638f04))
* **multi-select:** use dropdown option VALUE to check for selected ([22e6673](https://github.com/allianz/ng-aquila/commit/22e66736e084d7b6030f162c7035fe33297d4c66))
* **tile:** add token for horizontal layout icon size ([77658c3](https://github.com/allianz/ng-aquila/commit/77658c3f8a01433accf06ca3595d61e29b0052b7))

## [20.2.0](https://github.com/allianz/ng-aquila/compare/v20.1.0...v20.2.0) (2025-08-21)


### Documentation 📚

* **datemask:** fix no-unused-imports error and improve example ([99f8dd5](https://github.com/allianz/ng-aquila/commit/99f8dd54fb156b7ded7be8569a82b686bd08d7bc))
* remove nxStyle="block" from the docs ([bd1c7e9](https://github.com/allianz/ng-aquila/commit/bd1c7e98ca758999efc59ce66e5a200d525db1e2))


### Features ✨

* **tile:** add new tile component ([4b16d41](https://github.com/allianz/ng-aquila/commit/4b16d418f891851f19d8a1d1c31d69ac6dbb0502))


### Bug Fixes 🐛

* **checkbox:** change detection on form submit ([b109e6b](https://github.com/allianz/ng-aquila/commit/b109e6b13c56fd0ad3963b2f1c8aa1a6269d132d))
* **circle-toggle:** readonly group change not updating in tiles ([afe0147](https://github.com/allianz/ng-aquila/commit/afe0147f1d308d6c3ce0e29640874ec7b4e7bb38))
* **datepicker:** toggle button reflect input disable state ([7eef109](https://github.com/allianz/ng-aquila/commit/7eef109420372af1fd0cebe966523f96f64be3a1))
* **multi-select:** make disabled state can't be focus ([428942a](https://github.com/allianz/ng-aquila/commit/428942aadfb481363b42426fa3707ab720dd5804))
* **popover:** keyboard navigation not focused when click space button ([43f3c63](https://github.com/allianz/ng-aquila/commit/43f3c6382d0469634fd72b00adce47031f339ef6))
* **popover:** tabbing stuck at container ([5e74441](https://github.com/allianz/ng-aquila/commit/5e7444136a2744bd17ef648fbd51103159f2603f))
* **table:** expandable toggle button submitting forms ([5ab098b](https://github.com/allianz/ng-aquila/commit/5ab098b7e3b20135c106e2ddda94996ddb053eac))

## [20.1.0](https://github.com/allianz/ng-aquila/compare/v20.0.0...v20.1.0) (2025-07-30)


### Features ✨

* **datemask:** introduce new datemask component  ([4e5b89b](https://github.com/allianz/ng-aquila/commit/4e5b89b0eb07dba34d384bb742f50ec53ec98248))


### Bug Fixes 🐛

* **build:** prevent wrong module resolution ([49d3ca8](https://github.com/allianz/ng-aquila/commit/49d3ca82bcf369e5d7afce83bcbddcf767413f03))
* **checkbox:** cursor style for disabled states ([5f72761](https://github.com/allianz/ng-aquila/commit/5f7276112b2cf714c7ce3cef2cb2a3d1835fbf63))
* **datepicker:** NVDA not going into focus mode ([755473c](https://github.com/allianz/ng-aquila/commit/755473c038dd192e06aa7454f05e5104a2db4a2a))
* **formfield:** evaluate tooltip visibility on mouseenter to improve performance ([4007801](https://github.com/allianz/ng-aquila/commit/4007801fc03fd4f4f20919ddb2a58bb5f64caab0))
* **switcher:** small label font size ([dad63ee](https://github.com/allianz/ng-aquila/commit/dad63ee335540913187975fce9925e913fbaab45))
* **timefield:** input does not grow with container ([82ceeec](https://github.com/allianz/ng-aquila/commit/82ceeecd0c63a0943a49fa6a8c6bc3b8e9083c32))

## [20.0.0](https://github.com/allianz/ng-aquila/compare/v19.7.0...v20.0.0) (2025-07-14)

### Moving ng-aquila from @aposin to @allianz organization

The aposin organization has been decommisioned for a while now and we are moving the ng-aquila package to the Allianz npm organization.
The package has been renamed from `@aposin/ng-aquila` to `@allianz/ng-aquila`. This update will be done automatically by using ng update.

Run:
```bash
ng update @aposin/ng-aquila
```

### ⚠ BREAKING CHANGES

* **package:** - the package scope has been changed from `@aposin/ng-aquila` to `@allianz/ng-aquila`
- the `aposin` theme has been renamed to `aquila`
* **datefield:** - the `text` property in `nxDatefieldParse` error object now provides the value of the input element instead of the reference to the whole input element.
* **button:** The 'danger' string option has been removed from the plain button component.
Use the critical property ('critical="true"') instead.

### Documentation 📚

* update icon provider name ([484213a](https://github.com/allianz/ng-aquila/commit/484213aa1b25b53addd53b5b6605adf5e6275a8e))


### Bug Fixes 🐛

* **datefield:** update `nxDatefieldParse` validator error content ([82dde71](https://github.com/allianz/ng-aquila/commit/82dde717a1fefa01cc7a4bce5ac708c601abac61))
* **schematics:** handle objects in angular.json properly ([6a058e6](https://github.com/allianz/ng-aquila/commit/6a058e6d07437a84f131cbc6d833ae92cacd62f4))


### Features ✨

* **button:** remove deprecated 'danger' property from plain button ([6a73a4d](https://github.com/allianz/ng-aquila/commit/6a73a4d35ad7eca0de0608e1c750efdfdcddb399))
* **package:** add migration to change org to [@allianz](https://github.com/allianz) ([03db417](https://github.com/allianz/ng-aquila/commit/03db4174225c7a4899e474df40e892cc074d1abd))
* **package:** change name to @allianz/ng-aquila ([c089457](https://github.com/allianz/ng-aquila/commit/c089457914db0cfe9f4bfbe8af4ae56b1386e45e))
* **radio-button/testing:** add convenience functions to RadioGroupHarness ([4894374](https://github.com/allianz/ng-aquila/commit/489437435ada0e62dacfa9c1bfe920c90efd22ce))
* **schematics:** add schematic to rename aposin theme ([878da08](https://github.com/allianz/ng-aquila/commit/878da0848d76d9c9696176841bd1aa0b889a13b6))


## [19.7.0](https://github.com/allianz/ng-aquila/compare/v19.6.0...v19.7.0) (2025-06-26)


### Features ✨

* **accordion:** update  mapping ([3fc03fe](https://github.com/allianz/ng-aquila/commit/3fc03fe50e4497dea6b0f3896705cf230fc0424d))
* **toggle-button:** add a1 styling ([b26357a](https://github.com/allianz/ng-aquila/commit/b26357a99c01d6c98beb9d14be5bde026f5b5878))


### Bug Fixes 🐛

* **file-uploader:** validation of file extension case-insensitive ([b540a59](https://github.com/allianz/ng-aquila/commit/b540a59d65072a15d74e8aac348f2ef942d327a7))
* **multi-select:** move aria attributes to correct elements ([f2c6e82](https://github.com/allianz/ng-aquila/commit/f2c6e82793b5c457bdcf87adbaf8e7eaf3b64673))
* **multi-select:** prevent formfield access if it doesn't exist ([f541484](https://github.com/allianz/ng-aquila/commit/f5414844c469c76dc9a9216cfb572d862ec9109f))
* **switcher:** missing readonly border color ([e710980](https://github.com/allianz/ng-aquila/commit/e71098048a01c208bacecfcefbacda9ccc52ccae))


### Documentation 📚

* **patterns:** show patterns docs page ([86c1b4f](https://github.com/allianz/ng-aquila/commit/86c1b4feeaa78c8c385b79285f3db2c4df922b50))

## [19.6.0](https://github.com/allianz/ng-aquila/compare/v19.5.0...v19.6.0) (2025-06-23)


### Features ✨

* **ag-grid:** migrate to the new Theming API ([bee2ca4](https://github.com/allianz/ng-aquila/commit/bee2ca4e7504abe82d5556aad4b869f6ce15f2b9))
* **checkbox:** add transition token ([1ac8d67](https://github.com/allianz/ng-aquila/commit/1ac8d673471658e426b1bd3b9dfc8fc3295f5e34))
* **dropdown:** update token ([4464f8f](https://github.com/allianz/ng-aquila/commit/4464f8fa2dd763f299ce14aee7c4f766f81253f8))
* **radio-button:** add a1 light styling ([35cf44b](https://github.com/allianz/ng-aquila/commit/35cf44b3ebee3474cbf39447400f7693a7da4e93))
* **tabs:** add a1 light styling ([12f0057](https://github.com/allianz/ng-aquila/commit/12f0057e0f376466830ef9914b34b83c24e12556))


### Bug Fixes 🐛

* **datefield:** handle focus when datepicker is opened with spacebar ([2d31fea](https://github.com/allianz/ng-aquila/commit/2d31fea1de294da044f7ba8d16b7932484e37541))
* **dropdown:** remove ul for improved a11y ([7d4c576](https://github.com/allianz/ng-aquila/commit/7d4c576becf51a14d82b2c0faebf2bef3c043c78))
* **multi-select:** options overlap input ([5c9770a](https://github.com/allianz/ng-aquila/commit/5c9770a17c0dc1c535f8a325bc622aec3212002e))
* **overlay:** remove const from enum ([e839e47](https://github.com/allianz/ng-aquila/commit/e839e47d0c893e663a993f321576c8a2be8d5795))
* pierce shadow dom for activeElement ([17d5f01](https://github.com/allianz/ng-aquila/commit/17d5f01c52755aa17d005926ab1dc20fca9167d6))
* **radio-toggle:** radio toggle is too large on small screens ([47e0a77](https://github.com/allianz/ng-aquila/commit/47e0a773ac564aead57737cd594b260023b85bd5))

## [19.5.0](https://github.com/allianz/ng-aquila/compare/v19.4.0...v19.5.0) (2025-06-05)


### Documentation 📚

* remove unused imports ([5d446f4](https://github.com/allianz/ng-aquila/commit/5d446f42c69c0d614d72b0ee45623139a722351b))


### Features ✨

* **formfield:** update token ([094d004](https://github.com/allianz/ng-aquila/commit/094d00437df4ec368f34a41067395b8fba7a6932))
* **modal:** add global provider for inert exception list ([abbef68](https://github.com/allianz/ng-aquila/commit/abbef688f3940335fe8135c16996d58ba03aff72))
* **switcher:** add tokens for a1 light styling ([1537c90](https://github.com/allianz/ng-aquila/commit/1537c90c666b1577e4db46227e93b80c7a1dce02))


### Bug Fixes 🐛

* **circle-toggle:** add empty alt to image ([ba9c160](https://github.com/allianz/ng-aquila/commit/ba9c16031d63c59b9af304baafcca0d71f20d704))
* **formfield:** fix text color ([e5abe1c](https://github.com/allianz/ng-aquila/commit/e5abe1caf826f50887850f8ea2370a799e4ee035))
* **progress-stepper:** adjust vertical line spacing ([659b926](https://github.com/allianz/ng-aquila/commit/659b92633e651a842f5da8dc8c4f524f0a8d53c6))
* **tabs:** remove first and last items padding ([888b042](https://github.com/allianz/ng-aquila/commit/888b042055430d534e1f01fa5042119be2e16a94))

## [19.4.0](https://github.com/allianz/ng-aquila/compare/v19.3.2...v19.4.0) (2025-05-15)


### Documentation 📚

* **comparison-table:** fix color contrast for minus icon ([75462d0](https://github.com/allianz/ng-aquila/commit/75462d0c828e845447c4dac198b90f75bed7df9d))


### Bug Fixes 🐛

* **code-input:** prevent code suggestion emit twice on safari ([9943285](https://github.com/allianz/ng-aquila/commit/99432859db584ad7522b607f4de5a6b801ff72bf))
* **dropdown:** make dropdown highlightable ([f62d835](https://github.com/allianz/ng-aquila/commit/f62d83576ea6176f5728c27edd488166c35548ae))
* **modal:** prevent aria-hidden elements state loss with nested dialogs ([89ecb31](https://github.com/allianz/ng-aquila/commit/89ecb31547c99739201640deb4a4e4781bc02dbe))
* **small-stage:** expert layout and header example font size ([3b0ea69](https://github.com/allianz/ng-aquila/commit/3b0ea69cd8bae8ff23fa5ce1ccf20ef2f38cfd7c))
* **timefield:** fix typo ([e3ef3b2](https://github.com/allianz/ng-aquila/commit/e3ef3b263f0d61a0dd73f76048427e333a4920e9))
* **timefield:** hint not properly projected ([dcde71a](https://github.com/allianz/ng-aquila/commit/dcde71a037e84cade9bca3ea7410fb4dbc8d9d0a))
* **tooltip:** change word-break property to improve text wrapping ([d25b827](https://github.com/allianz/ng-aquila/commit/d25b827c887687fdc4c60e2046c2d40f188a9710))


### Features ✨

* **checkbox:** update token for a1 ([b1f4058](https://github.com/allianz/ng-aquila/commit/b1f4058e701b868c251ac6e28f543a5b0fa749ad))
* **datefield:** add today button ([1025db6](https://github.com/allianz/ng-aquila/commit/1025db6701f45bb317fde43a9611600127d3b9e9))
* **timefield:** add inputmode and inputmode example ([61b3eb8](https://github.com/allianz/ng-aquila/commit/61b3eb878934156f6b6ad29591d6f3552c31db04))

### [19.3.2](https://github.com/allianz/ng-aquila/compare/v19.3.1...v19.3.2) (2025-04-16)


### Documentation 📚

* **input:** reactive error example ([1ddbc81](https://github.com/allianz/ng-aquila/commit/1ddbc8161fba390602ff13364dd155baf972a353))


### Bug Fixes 🐛

* **date-field:** remove console logging ([e6d6ce4](https://github.com/allianz/ng-aquila/commit/e6d6ce4aab1ed0577d08a6deee6234f17f6f7fd8))
* **natural-language-form:** access before initalization error ([08f4519](https://github.com/allianz/ng-aquila/commit/08f451982fab6ff75b8b4aca4e4bbeac5826c374))

### [19.3.1](https://github.com/allianz/ng-aquila/compare/v19.3.0...v19.3.1) (2025-04-10)


### Bug Fixes 🐛

* **cards:** radio button color ([2a9d008](https://github.com/allianz/ng-aquila/commit/2a9d008bd1b1c9ba47b22f483793cbab7a19ba94))
* **datepicker:** no modal cutoff on small screens ([ce541c7](https://github.com/allianz/ng-aquila/commit/ce541c7ba6d1786525746234a7068c1bdacde395))
* **dropdown:** remove cursor style for readonly ([86fa9f8](https://github.com/allianz/ng-aquila/commit/86fa9f8d830fd5cdcb1d19e15ca03e0fc8e91cba))
* **natural-language-form:** improved error messages ([2945d4d](https://github.com/allianz/ng-aquila/commit/2945d4dfddcf1979bf2784bdaeb205d5b0f18d20))
* **signal-button:** align icon vertically ([f083974](https://github.com/allianz/ng-aquila/commit/f0839745c9539ebdd81289ccd80451a7c84c334b))
* **toast:** a11y message does not announce ([1acb1a4](https://github.com/allianz/ng-aquila/commit/1acb1a43535b4531171a5580f6403b2d44a5b6d1))


### Deprecations
* **natural-language-form:** showing the error messages in a popover has been deprecated. Please use a combined error message instead. See the natural language form documentation for more details.


## [19.3.0](https://github.com/allianz/ng-aquila/compare/v19.2.0...v19.3.0) (2025-04-03)


### Documentation 📚

* add header examples for responsiveness ([0af52c7](https://github.com/allianz/ng-aquila/commit/0af52c7cec9cbc55531077d76dfe85c3460b14bf))
* add release guide for v19 ([c0594bc](https://github.com/allianz/ng-aquila/commit/c0594bc0561c91e1fa630731aebc724d79e28e3d))
* **checkbox, radio, circle-toggle:** add layout example ([aee750b](https://github.com/allianz/ng-aquila/commit/aee750b63ccd4e1e41f080e42e5c78cb12b5eaff))


### Bug Fixes 🐛

* **checkbox:** clickable white space ([1e4bc42](https://github.com/allianz/ng-aquila/commit/1e4bc42dc365b99c12d75533a3634d0551018bed))
* **checkbox:** correct background color for inderterminate in high contrast mode ([b433214](https://github.com/allianz/ng-aquila/commit/b433214305f0dc886917ec00cf31bfec2cd7ed15))
* **input:** change focusout to blur ([a30a922](https://github.com/allianz/ng-aquila/commit/a30a9226387c33b0cc30fd7da521436dad92975c))
* **phone-input:** Reactive form does not disable ([0a04bf5](https://github.com/allianz/ng-aquila/commit/0a04bf581c92b5e2df166a5f50ea01eb5d3753ad))
* **side-navigation:** update sidebar labels visibility and center icon in collapse state ([1713afa](https://github.com/allianz/ng-aquila/commit/1713afaddcf3cf0944f77de9d24c8a699b4a234c))
* **slider:** fix accessibility for slider ([4b73a95](https://github.com/allianz/ng-aquila/commit/4b73a95c0b93eecc34e25ddadc45efa3457be78b))


### Features ✨

* **date field:** date range component ([5664494](https://github.com/allianz/ng-aquila/commit/5664494fe3298b47f8f45b9fd9c5fee9403196dc))
* **file-uploader:** enable multiple uploaders ([bd81fbc](https://github.com/allianz/ng-aquila/commit/bd81fbcce71dba0702d8d3905147c7a8a4bf5203))
* **notification-panel:** make panel responsive ([faa268d](https://github.com/allianz/ng-aquila/commit/faa268d3012359f33506feb47949b530f50f3a66))
* **overlay:** add viewportMargin function ([cd70b94](https://github.com/allianz/ng-aquila/commit/cd70b946329c6fe956600c5a3e57fbaa188cba2e))

## [19.2.0](https://github.com/allianz/ng-aquila/compare/v19.1.0...v19.2.0) (2025-03-05)

### Tags design and accessibility update
The tags component got an update to also support checked and readonly states. The supported patterns for tags are now multi-select and removable tags. To support the new features and provide better accessibility a new `nx-tag-group` was introduced. The `nxTaglist` component has been deprecated. We recommend using the new `nx-tag-group` in the future especially to be accessibility compliant.

### Grid: empty nxCol possible now
Formerly it was not possible to use an empty `nxCol`, you had to set a column size. Now you can use an empty `nxCol` to let the grid automatically distribute the space for that column.

### Popover content slots
The popover provides optional content slots for header, content and footer now.

### Advanced Pagination reacts to container queries
The simple and advanced pagination variants automatically react in the same way they do to media queries to container queries now, changing the layout to a more compact version if inside a containment context.


### Documentation 📚

* disable resizable option for static example ([1687a93](https://github.com/allianz/ng-aquila/commit/1687a9392a830e1880b439130f3176cbf1267663))
* edit localization example ([dcca46e](https://github.com/allianz/ng-aquila/commit/dcca46ed5260c0bc310ee1d6341064deceabf6ce))


### Bug Fixes 🐛

* **accordion:** a11y border is not visible in high contrast mode ([38ec80e](https://github.com/allianz/ng-aquila/commit/38ec80e8301983ff9195477bac50fabf3321c340))
* **autocomplete:** defer scrollToOption with afterNextRender ([089eff9](https://github.com/allianz/ng-aquila/commit/089eff9de52ae02b49d92d9a6da04e3bab532a31))
* **checkbox:** hide error container when inside group ([9f5cc83](https://github.com/allianz/ng-aquila/commit/9f5cc835e70231c4a1af1fd24bedddb17afb7ac2))
* **dropdown:** center check icon vertically ([1f82eb3](https://github.com/allianz/ng-aquila/commit/1f82eb314a3beb208bde116ddb9a9d42f9598282))
* **formfield:** focus border in high contrast mode ([7cf5819](https://github.com/allianz/ng-aquila/commit/7cf58198bf8debeedcc39177d4d21d511f32bd95))
* **message,popover,modal:** set close icon as a plain button ([1e3d357](https://github.com/allianz/ng-aquila/commit/1e3d3571e18baf0a2dce99e2da9295979757f550))
* **message:** add bottom spacing to toast messages ([baca28b](https://github.com/allianz/ng-aquila/commit/baca28b6824d3b37e1eac8d29f96fff8e8583b69))
* **number-stepper:** handle decimals better with signals ([ca3dd8b](https://github.com/allianz/ng-aquila/commit/ca3dd8b384777fe14b2b873036b0496ac2782a8f))
* **table:** add top border in table component and edit example ([0e91747](https://github.com/allianz/ng-aquila/commit/0e91747bf70f1bcd180430b1c87867156b917fe8))
* **table:** enable sticky expanded columns ([b1fee27](https://github.com/allianz/ng-aquila/commit/b1fee2750a208f7b442e3a4ee4c2bb949d4d72f4))
* **viewport-service:** update to rx7 and fix settings ([a90626f](https://github.com/allianz/ng-aquila/commit/a90626f6d6a191132b93258cc3ff36b99ccb2205))


### Features ✨

* **autocomplete:** enable panelGrow and introduce panelMaxWidth ([5b58c65](https://github.com/allianz/ng-aquila/commit/5b58c653591b506b901f259ddffa0fb05d5ef2c7))
* **checkbox:** one Allianz styling ([0f89d14](https://github.com/allianz/ng-aquila/commit/0f89d14eacc2a2e489220143d75b44f184722975))
* **grid:** blank nxcol will automatically take up the remaining space ([29d6e18](https://github.com/allianz/ng-aquila/commit/29d6e18a7d518d9f9fd92d1305567e94308ec570))
* **number-stepper:** enhance error state visibility ([f8b25b2](https://github.com/allianz/ng-aquila/commit/f8b25b2fb198f88d476867eb64c9fadbda995bd9))
* **pagination:** add containerQuery responsive ([0bd9da8](https://github.com/allianz/ng-aquila/commit/0bd9da8068a382a64b5df50a2da1c76b892f262c))
* **popover:** add header, content and footer slots ([4851915](https://github.com/allianz/ng-aquila/commit/48519158e4f87a9720dd089a7250d0d60ec0d41c))
* **tag:** add new nx-tag-group and improve a11y ([d3aaf82](https://github.com/allianz/ng-aquila/commit/d3aaf8278f5ab1135cef8b81fe88b689d63b30cd))
* **tree:** add tree with checkboxes example ([54a0184](https://github.com/allianz/ng-aquila/commit/54a018432742f53353f7fdf426bd57f2e944c5da))

### Deprecations
* **taglist**: nxTaglist has been deprecated. Please use the new nx-tag-group instead.


## [19.1.0](https://github.com/allianz/ng-aquila/compare/v19.0.0...v19.1.0) (2025-02-06)


### Radio button and checkbox design update
The radio button and checkbox components got a design update to align them with Allianz One and make the transition easier.
For the checkbox the indeterminate state was updated. The radio button got an overall design update.


### Features ✨

* **button:** add secondary plain button variant for a1 ([8adf5cd](https://github.com/allianz/ng-aquila/commit/8adf5cd7e123eca1dba749e0d4378e2ac462d37a))
* **checkbox, radio:** update design ([84109c2](https://github.com/allianz/ng-aquila/commit/84109c26aef7b6637d33d06538494ac001837318))
* **circle toggle:** expert for circle toggles ([0ba7e70](https://github.com/allianz/ng-aquila/commit/0ba7e700c2ccbf5e7154cb8585bbb77aacc601e0))


### Bug Fixes 🐛

* **context-menu:** remove setTimeout for focusing first item ([54024c1](https://github.com/allianz/ng-aquila/commit/54024c1ddc74499d7a015750353d91ec3992a3ad))
* **dropdown:** prevent keyboard shortcuts from opening dropdown ([5c7aaa1](https://github.com/allianz/ng-aquila/commit/5c7aaa18ac96f90186bd6941cf82a1c5e69dded4))
* **formfield:** set aria-hidden to formfield hint when disabled ([fe4c6b4](https://github.com/allianz/ng-aquila/commit/fe4c6b44a6fee569d85e7ab0176d2bd46cc55488))
* **table:** fix css issues caused by host inside host ([4c9f030](https://github.com/allianz/ng-aquila/commit/4c9f030322fa11eb20660da3a0c77c223f1edcc4))

## [19.0.0](https://github.com/allianz/ng-aquila/compare/v18.7.0...v19.0.0) (2025-01-17)


### ⚠ BREAKING CHANGES

Please run `ng update @allianz/ng-aquila` to migrate the breaking changes automatically.

* **number-stepper:** the `readonly` input got renamed to `inputFieldReadonly`. the `readonly` property before this change only set the input field to readonly but left the number stepper operational via the buttons. this was not properly named and was changed now to make room for a proper readonly state that got added.

### Features ✨

* **number-stepper:** add readonly state and rename former readonly to inputFieldReadonly ([1665a04](https://github.com/allianz/ng-aquila/commit/1665a04e00c6ae3c8f169614f8f1efc072b44668))
* update to Angular 19 ([d36aba5](https://github.com/allianz/ng-aquila/commit/d36aba5e97d30a60da32d1582cac004828907953))

## [18.7.0](https://github.com/allianz/ng-aquila/compare/v18.6.1...v18.7.0) (2025-01-17)


### Features ✨

* **number-stepper:** link error messages to input for assistive tools ([1824f2b](https://github.com/allianz/ng-aquila/commit/1824f2b17a839c9084fa8929ac4cee87b0b4735d))


### Bug Fixes 🐛

* **badge:** make single character circle ([a121099](https://github.com/allianz/ng-aquila/commit/a121099041c66dfa0348e9d0cd69f74dd40a6a80))
* **dropdown:** add aria-controls to filter input ([05f2928](https://github.com/allianz/ng-aquila/commit/05f29283f0c6e06dd7e8d8bb323b879ae12a0f3f))
* **dropdown:** add group role to make screenreader read correctly ([6b4abb7](https://github.com/allianz/ng-aquila/commit/6b4abb7db65490c3c81204733ddd51ef2e6b2abd))
* **dropdown:** open flyout and focus item when characters are typed ([5df221a](https://github.com/allianz/ng-aquila/commit/5df221a1180cce903a26cc7bd4a24be32b164536))
* **multi-select:** prevent close emit twice ([8a75b24](https://github.com/allianz/ng-aquila/commit/8a75b24aedf3b1025a383ff26434bbb204a92326))
* **radio-button:** mark control as touched only when leave group ([831c04e](https://github.com/allianz/ng-aquila/commit/831c04e9c292df5814fd4dcf348647f240e3b22d))
* **selectable-card:** prevent overflow style cut out ([2f93b23](https://github.com/allianz/ng-aquila/commit/2f93b23323a61e2ad877cd25bc583e378608a612))
* **table:** add selector for multiple expandable rows ([1fe4c3a](https://github.com/allianz/ng-aquila/commit/1fe4c3a813b4710c2b35471aadfedef88506a791))
* **table:** prevent resize column break sticky column ([1ebc90a](https://github.com/allianz/ng-aquila/commit/1ebc90a2535b126483a333ae733c84b2686e3ce3))
* **timefield:** update errorState handling to use signal ([158bed2](https://github.com/allianz/ng-aquila/commit/158bed21337aba713806937b1ef346d9c3ebde8c))
* **tree:** role treeitem for nodes to be counted correctly ([b5a7023](https://github.com/allianz/ng-aquila/commit/b5a7023c0fe00389a626b885ca6c105030b11e4f))

### [18.6.1](https://github.com/allianz/ng-aquila/compare/v18.6.0...v18.6.1) (2024-12-05)


### Documentation 📚

* activate a1 for all components ([ba59316](https://github.com/allianz/ng-aquila/commit/ba59316f0130294f320838b32811558741a82855))


### Bug Fixes 🐛

* **breadcrumb:** make nxBreadcrumbItem more lenient and add example with context menu and buttons ([e4a24ad](https://github.com/allianz/ng-aquila/commit/e4a24ad3682e7bd5cafb722ffd8a0529744d065b))
* **circle toggle:** link error message to controls ([56ad612](https://github.com/allianz/ng-aquila/commit/56ad612b00fb85bcb5a94ad71659b02f194197fe))
* **context-menu:** replace onStable with afterNextRender for zoneless compatability ([e7709bd](https://github.com/allianz/ng-aquila/commit/e7709bd7dce5645bca792620f51c017bc97a29ff))
* **context-menu:** stop propagation on esc ([24e0fb6](https://github.com/allianz/ng-aquila/commit/24e0fb611a021bd51b30aaceda87d544d6c615c6))
* **datefield:** add role="button" to the dates in the datepicker ([36daeee](https://github.com/allianz/ng-aquila/commit/36daeee1441e222e47dbbff57e5c12567463e9ca))
* **datepicker:** disabled selected styling ([c55a66b](https://github.com/allianz/ng-aquila/commit/c55a66bdd9a5a6526ed134f4905994fa4576e05b))
* **docs:** replace px with rem ([0bc5fd1](https://github.com/allianz/ng-aquila/commit/0bc5fd1059a8c1e30d5ae7034768ca3171d275a9))
* **dropdown:** prevent unnecessary macrotasks ([7cec758](https://github.com/allianz/ng-aquila/commit/7cec758e323989d5bb715772ee22070eb533185e))
* **formfield, autocomplete, datefield, multi-select:** fix accessibility issues with aria owns ([137e136](https://github.com/allianz/ng-aquila/commit/137e1361f88d8069377ab66fab891c40d5d41885))
* **modal:** use inert to block content outside of dialog ([581b574](https://github.com/allianz/ng-aquila/commit/581b574bb0a3f8e0c573c1267199795054ec12d0))
* **natural-language-form:** replace zone.onStable for zoneless compatibility ([7e7d1da](https://github.com/allianz/ng-aquila/commit/7e7d1da6b7f2f56f74043f50eefcd0fceac2a8d9))
* **pagination:** improve and maintain focus state ([e8448b5](https://github.com/allianz/ng-aquila/commit/e8448b5a55d8826dc1744957490bc355f99b5118))
* **popover:** fix IntersectionObserver not defined error in SSR when popover can only be opened through client interaction ([9a92304](https://github.com/allianz/ng-aquila/commit/9a92304c173f1d4f2f3990cab607fa98e7dc73bd))
* **popover:** set active state for trigger button ([d33c2da](https://github.com/allianz/ng-aquila/commit/d33c2da91d2f21a6cbe2b7bd7cb1e28c4ce57116))
* **rating:** implement radio behaviour ([e1c9842](https://github.com/allianz/ng-aquila/commit/e1c984261dc0d95b10adda609a7aed62bf9632b3))
* **table:** fix condensed styling ([ccb6e11](https://github.com/allianz/ng-aquila/commit/ccb6e11479ed0a72e15d5186bf85ad7e4197877b))
* **tabs:** make tabs ssr ready ([77f4235](https://github.com/allianz/ng-aquila/commit/77f42354d099b7a8f3ea72e0b60365ce07fcce80))
* **tree:** fix errors for undefined treeControl and elementRef with separate declarations ([a560ac5](https://github.com/allianz/ng-aquila/commit/a560ac53fd8c91321def0220520d77de4c5ce4d2))
* **word:** width of input should adapt to rendered value ([1499c01](https://github.com/allianz/ng-aquila/commit/1499c015bea727f6a73868afdb15dd5415cfe388))

## [18.6.0](https://github.com/allianz/ng-aquila/compare/v18.5.1...v18.6.0) (2024-10-31)

### Timefield built in validator
The timefield component now has a built in validator to check if the entered time is valid. The feature can be enabled by an opt-in setting `enableTimeValidation`.


### Features ✨

* **modal:** add more autofocus options ([a2eb516](https://github.com/allianz/ng-aquila/commit/a2eb5162fa137b35c042dd4597903091c3c9f452))
* **switcher:** always show tickmark when checked ([6f3f5a2](https://github.com/allianz/ng-aquila/commit/6f3f5a213cb34db0166fc2c5934ea6018b732bde))
* **timefield:** add custom validator for invalid time ([ce55e71](https://github.com/allianz/ng-aquila/commit/ce55e710c1d8259b885aa8b6ef86e9b022dfb267))


### Bug Fixes 🐛

* **checkbox:** active and error hover/active styles ([b3dbac7](https://github.com/allianz/ng-aquila/commit/b3dbac782d15e5cf00fd43617fdd1a514900c231))
* **circle-toggle:** allow any value ([5866d47](https://github.com/allianz/ng-aquila/commit/5866d47115076029039312021f6deeb47d762375))
* **datefield:** use spacebar to select date ([4622d74](https://github.com/allianz/ng-aquila/commit/4622d74d7e1cde19b6f7a5afe5853b65b36a1291))
* **grid:** convert scss example file to css ([3b7ea9e](https://github.com/allianz/ng-aquila/commit/3b7ea9e54410f65268101f057fc6c9d41358e3e6))
* **headline:** add css for links inside of headline ([ae0cd54](https://github.com/allianz/ng-aquila/commit/ae0cd54c29e0c4f7f264f5d6777a80000ad1f281))
* **message-toast:** add NxMessageToastService to providers ([bab33f4](https://github.com/allianz/ng-aquila/commit/bab33f497e7a1e055a8658ba0e75126265f0a1b4))
* **message-toast:** replace onMicrotaskEmpty with queueMicrotask for zoneless compatability ([3fcde39](https://github.com/allianz/ng-aquila/commit/3fcde39fe6fa511b00ffd3ef6d71679f6652815a))
* **sidebar:** item position while resizing and when closed([0d5cf74](https://github.com/allianz/ng-aquila/commit/0d5cf745b7cecdf9ea624bbd2df93d41411c04f4))
* **table:** change sorting direction ([e67a600](https://github.com/allianz/ng-aquila/commit/e67a6006b358fcba00d7be9f77a0f6a415728aac))
* **tooltip:** replace onMicrotaskEmpty with afterNextRender for zoneless compatability ([7357258](https://github.com/allianz/ng-aquila/commit/7357258a582fbb5890db2669a8a70997e9b1196c))

### [18.5.1](https://github.com/allianz/ng-aquila/compare/v18.5.0...v18.5.1) (2024-10-11)


### Bug Fixes 🐛

* **autocomplete:** replace onStable to make it zoneless compatible ([5fcc2ec](https://github.com/allianz/ng-aquila/commit/5fcc2ecaac535d292a83e15299a290d9223e870f))
* **checkbox:** link aria-describedby with projected nx-error ([32bbdde](https://github.com/allianz/ng-aquila/commit/32bbdde3ede04acbc5afc9068000178ac89ebfab))
* **formfield:** remove css coloring icons blue in appendix ([dcea5da](https://github.com/allianz/ng-aquila/commit/dcea5da381245292147190052c30ecad69bc54a3))
* **formfield:** remove reveal icon in Edge only when password toggle exists ([7036b7a](https://github.com/allianz/ng-aquila/commit/7036b7a82b36dbb73327a158319a83b151fbeef2))
* **number-stepper:** allow comma as decimal separator, add commaDecimal input ([f144496](https://github.com/allianz/ng-aquila/commit/f14449607a31518ae1e7a310c47c809b87346812))
* **radio-toggle-button:** fix disable-mobile styles ([2daa138](https://github.com/allianz/ng-aquila/commit/2daa13855c161cf99b2e2840cf9a4e48f6f3ca11))
* **switcher:** fix css for label left ([22354ca](https://github.com/allianz/ng-aquila/commit/22354ca8dbb45b94400917568d81124d77f950ad))
* **table:** fix sticky column not working ([c0f5b36](https://github.com/allianz/ng-aquila/commit/c0f5b366b5a6deaf7c0720463719c291bc1cff2c))

## [18.5.0](https://github.com/allianz/ng-aquila/compare/v18.4.0...v18.5.0) (2024-09-30)


### Documentation 📚

* **file-uploader:** make screenreader read error message ([7a5ac74](https://github.com/allianz/ng-aquila/commit/7a5ac749d8cb8ac10823953a68f3fa7279f296c5))
* only show implemented components for A1 themes ([9d190ed](https://github.com/allianz/ng-aquila/commit/9d190ed302ed44d05b26685eb0fa8f2df4f85936))


### Bug Fixes 🐛

* **radio-button, circle-toggle:** add tabindex="-1" to label element in radio groups ([e3ada6b](https://github.com/allianz/ng-aquila/commit/e3ada6b3f60a8564bf71e1d307afd74f2193c877))


### Features ✨

* **radio toggle:** link error message to radio toggle by aria-describedby ([50249cf](https://github.com/allianz/ng-aquila/commit/50249cf52bfa4ef8b77cbe13aa4d094fcf0aa614))
* **spinner:** add ariaPoliteness input ([0aa0483](https://github.com/allianz/ng-aquila/commit/0aa0483889e04317291a94fded6df0838eb8b6b0))

## [18.4.0](https://github.com/allianz/ng-aquila/compare/v18.3.0...v18.4.0) (2024-09-26)


### Documentation 📚

* add aquila issue template ([05515fd](https://github.com/allianz/ng-aquila/commit/05515fd58d1e2a5478c2afb007b353ff5ea32d15))
* update icon version info ([e6c02ea](https://github.com/allianz/ng-aquila/commit/e6c02eaf75d01ca8775105ee126043fbdf189d76))
* update safari just to most recent ([6193c65](https://github.com/allianz/ng-aquila/commit/6193c658c2cca374f24fb0a9b7ed709c4b0c776f))
* update screenreader support page ([feaae27](https://github.com/allianz/ng-aquila/commit/feaae27f9b84ecd433d4abfe4d37d212bb32ce85))


### Bug Fixes 🐛

* **checkbox:** link checkbox group aria-labelledby with projected nx-error ([1793088](https://github.com/allianz/ng-aquila/commit/1793088a10734af02d93ad84a77a29f7adcd02e9))
* **datefield:** make the datepicker zoneless ready ([e64213d](https://github.com/allianz/ng-aquila/commit/e64213da6ad6b47ddd285a4aee7f05eacd5f73e5))
* **foooter:** first year then company ([78da2e8](https://github.com/allianz/ng-aquila/commit/78da2e81e2e30c7cc4bef3cbc227b8a05158d2e7))
* **list:** icons missing aria-labels ([50da7ee](https://github.com/allianz/ng-aquila/commit/50da7ee3c2f639dbbdea6ef85d7e2996a838dd24))
* **multi-stepper:** remove unnecessary aria role ([967aea3](https://github.com/allianz/ng-aquila/commit/967aea32ad1da17f8dcec887e6d8939a7113ca75))
* **table:** add :host to ::ng-deep for block-scoped styles ([d1014e3](https://github.com/allianz/ng-aquila/commit/d1014e3e63b01468f7c84e05836b32603d4b08e7))
* **table:** spacing issues with ndbx-base-integrated styles ([4d4dc1c](https://github.com/allianz/ng-aquila/commit/4d4dc1cf9725126aa349eee1d0fdd54e61686bc8))


### Features ✨

* **formfield-harness:** add isReadonly query and filter ([93c1149](https://github.com/allianz/ng-aquila/commit/93c1149ded8b85dbe74da1c27361866f3f60b47b))
* **formfield:** add example of customizing spacing with theming tokens ([6b25bac](https://github.com/allianz/ng-aquila/commit/6b25bacfdb5ffd5e534ece77c843d008405455b0))
* **switcher:** announce errors by screen readers by linking error message  ([4ba485f](https://github.com/allianz/ng-aquila/commit/4ba485f6702903c099dc36677c57a26f2b80ea44))

## [18.3.0](https://github.com/allianz/ng-aquila/compare/v18.2.0...v18.3.0) (2024-09-09)

### Readonly states for radio- and checkbox-style components
With this release we added a readonly state to the circle toggle, radio button, checkbox, switcher and toggle button components. The number stepper has to be delayed until the next major version because of a necessary breaking change.
Please note: the readonly states on these elements is only approved for internal (expert) applications because of accessibility constraints.


### Features ✨

* **accordion:** add flush alignment option ([28a37fd](https://github.com/allianz/ng-aquila/commit/28a37fd1dfb2b288790e5a6ff755b99fd7d9da4b))
* **circle-toggle:** add readonly state ([c2abe67](https://github.com/allianz/ng-aquila/commit/c2abe678743f9048771aab840ac8fc1b062416a9))
* **multi-select:** add filterInput output  ([d61712c](https://github.com/allianz/ng-aquila/commit/d61712cfe04cda0f8ec564638f0d6329cd5609f7))
* **radio-button:** add readonly state ([b6ef4f6](https://github.com/allianz/ng-aquila/commit/b6ef4f6e8997c95dad641777a35ca68fb534a966))
* **switcher:** add readonly state ([a72712a](https://github.com/allianz/ng-aquila/commit/a72712a0ab4036cdf175b82ea101057d208acb72))
* **toggle-button:** add readonly state ([571e1df](https://github.com/allianz/ng-aquila/commit/571e1df916779ee42a91299a6c3bf025e0d261c4))


### Bug Fixes 🐛

* **circle-toggle:** invalid aria-required attributes in radio group ([79e18ce](https://github.com/allianz/ng-aquila/commit/79e18ce252076f0a153ffa347cac5e2e97d461b9))
* **datefield:** to use plain buttons and update cell font-weight ([ea29b77](https://github.com/allianz/ng-aquila/commit/ea29b77f2360122328056babba084bd03c4571ac))
* **grid:** use DI for missing nxRow warning ([8d4a236](https://github.com/allianz/ng-aquila/commit/8d4a236d85e70f7d587392270567a16f6dd91799))
* **header:** change height of header to match figma designs ([d5bf893](https://github.com/allianz/ng-aquila/commit/d5bf893e171a37fbe77dda9facd354faf14859e7))
* **multi-select:** open dropdown with arrow keys ([785b98e](https://github.com/allianz/ng-aquila/commit/785b98eec814969e898f7d58a55366f3535ba8f6))
* **radio-toggle:** forward focus to toggleInput ([7c6edda](https://github.com/allianz/ng-aquila/commit/7c6edda7a4dc22fb993fb4ba82054c5bd04fdf5f))
* **sidenavigation,action:** text and icon alignment in the navigation items ([b6b2c79](https://github.com/allianz/ng-aquila/commit/b6b2c796811c598a19d647e75d5455551b946e17))


### Documentation 📚

* **accordion:** add aria-hidden to error icons ([74c9106](https://github.com/allianz/ng-aquila/commit/74c9106eb620f6c34d2c59b50cbc9ff921d48c46))

## [18.2.0](https://github.com/allianz/ng-aquila/compare/v18.1.0...v18.2.0) (2024-08-26)


### Features ✨

* **checkbox:** add readonly state ([96e717c](https://github.com/allianz/ng-aquila/commit/96e717c0e80f344fd1c8bf546c48f3f7fbe50214))


### Bug Fixes 🐛

* **code-input:** link error message with  aria-describedby ([ce2c995](https://github.com/allianz/ng-aquila/commit/ce2c995a6852d1ba5b8e98607c21f490e6fb5e32))
* **comparision-table:** track expression warning ([f400dd8](https://github.com/allianz/ng-aquila/commit/f400dd8ed1f444bcdad9a462899053efe0b6e539))
* **context-menu:** change behavior to match a11y guidelines ([5595eaf](https://github.com/allianz/ng-aquila/commit/5595eaf76bf778f18467539586097364842bbb1a))
* **dropdown:** change keyboard behavior ([7f23419](https://github.com/allianz/ng-aquila/commit/7f23419a4022634b1823b7191b395ec9f9a570bf))
* **input:** remove a password reveal button in Microsoft Edge ([f1f55df](https://github.com/allianz/ng-aquila/commit/f1f55dfc97ca4df70161a0fb0b28ee1513e1cf1d))
* **multi-select:** add aria-describedby, aria-invalid ([98f784d](https://github.com/allianz/ng-aquila/commit/98f784d1cb30f5b04ebf62c0a82b33f1dba66a3f))
* **phone-input:** correct focused state ([71527c5](https://github.com/allianz/ng-aquila/commit/71527c5054b2fb4d9fb3319f191c4dfdfbbe1eb5))
* **phone-input:** remove binding from role attribute ([bfe1f23](https://github.com/allianz/ng-aquila/commit/bfe1f23e666a0187207a7a137d68379bfdc38f1b))
* **popover:** change aria-haspopup to dialog ([7e4cdf5](https://github.com/allianz/ng-aquila/commit/7e4cdf5589e0876e8a911061a29d2b62b2f6b25e))


### Documentation 📚

* add documentation for non interactive scrollable content ([e4e201f](https://github.com/allianz/ng-aquila/commit/e4e201f1aae049a07f3b473e44f11531aa0b169f))
* fix opening examples in stackblitz ([ea96a78](https://github.com/allianz/ng-aquila/commit/ea96a78890e18f8185dc497c65f00462f5cd6e2b))

## [18.1.0](https://github.com/allianz/ng-aquila/compare/v18.0.0...v18.1.0) (2024-08-08)

### Emphasis button update
The emphasis button was deprecated in 18.0.0 because there was no plan to make the colors accessibility compliant. This decision was changed and now the orange colors got updated to fulfill WCAG contrast requirements. The emphasis button is not deprecated anymore and can be used again.

### Features ✨

* **dropdown:** align dropdown checkmark ([5fed95d](https://github.com/allianz/ng-aquila/commit/5fed95ddd5cba2ee510600a9c3f6f5850559b09c))
* **natural-language-form:** enable `aria-describedby` for words  ([d418a65](https://github.com/allianz/ng-aquila/commit/d418a6584bf0a6b98526e98a7016871bf37620ac))
* **tag:** add nxTagIntl provider for i18n ([a4b9ffd](https://github.com/allianz/ng-aquila/commit/a4b9ffd38982784a949707eeea060602544b987d))


### Bug Fixes 🐛

* **action:** use new line instead of ellipsis for narrow space ([aa76f08](https://github.com/allianz/ng-aquila/commit/aa76f08f223227f1c84f4a36599c750d3accf696))
* **context-menu:** adjust header styles to selection menu designs ([adb40ee](https://github.com/allianz/ng-aquila/commit/adb40ee210f4f5d2de70049607819606d92c34c5))
* **dynamictable:** add nxContextMenuItemCheckbox to column settings checkboxes ([edd5cd0](https://github.com/allianz/ng-aquila/commit/edd5cd07805bdbe3d5c91640ccf0421cf98e6fbc))
* **dynamictable:** remove drag and drop from custom settings ([f70cf23](https://github.com/allianz/ng-aquila/commit/f70cf2368effe12d60eb4825b5ce69c6383d7056))
* **file-uploader:** don't intterupt adding file when an invalid file is found ([2f23c2a](https://github.com/allianz/ng-aquila/commit/2f23c2aca1330576218fe1aadf7c50735a175079))
* **formfield:** add role group and aria label to custom formfield ([0852a44](https://github.com/allianz/ng-aquila/commit/0852a44ff245a436dffd9b3663145407282e5ba6))
* **formfield:** change from nx-icon hover to button click for popover ([a0b8d2b](https://github.com/allianz/ng-aquila/commit/a0b8d2b6bbcdb103539e5a1c1bcf2d9d7fd353d2))
* **formfield:** remove aria label for readonly ([b3f5125](https://github.com/allianz/ng-aquila/commit/b3f5125a00da71adc6da05ccfe0f4bc58110e27e))
* **licence-plate:** empty value is valid in validator ([0ed5059](https://github.com/allianz/ng-aquila/commit/0ed505964d46af2ac1bfe770a7b82caca96ac3e8))
* **popover:** change maxwidth to 100% to work for small screens ([3c7f91c](https://github.com/allianz/ng-aquila/commit/3c7f91c95ae6847762aa173154a9965c3b79214e))
* **switcher:** set required validator, correct aria ([1e4c2e7](https://github.com/allianz/ng-aquila/commit/1e4c2e7d3f135617c6cc15905a4c3454a7c51dc1))
* **table:** don't emit sortChange when set active, direction ([06390a9](https://github.com/allianz/ng-aquila/commit/06390a92404ee4097014acb883d6b52f0e363b0e))
* **table:** remove nxTableCellClip from column resize table ([02143af](https://github.com/allianz/ng-aquila/commit/02143afe6257b47f7100e82d646dd3807e9f649e))
* **tag:** remove backspace deletion use focusable button instead ([f456efe](https://github.com/allianz/ng-aquila/commit/f456efe74450381f8b5acbbb6e1340e05adff1d6))
* **tooltip:** annouce message when show ([3d39cd5](https://github.com/allianz/ng-aquila/commit/3d39cd564fa02af10a19b05c115b8b8f19f94c78))


### Documentation 📚

* **button:** undeprecate emphasis button ([fc1d126](https://github.com/allianz/ng-aquila/commit/fc1d1265f62bce03afec162e5c505ebb8cbeebcc))
* **checkbox:** show freedom of layouting ([7c3f680](https://github.com/allianz/ng-aquila/commit/7c3f6804433e54440b4ef833e2f0a25ea03c9b0a))
* **datefield:** add error messages in examples ([19b76ec](https://github.com/allianz/ng-aquila/commit/19b76eccd02813fee8e751337a01c113acd76a88))
* **file-uploader:** fix a11y screen reader issue in example  ([4b677d4](https://github.com/allianz/ng-aquila/commit/4b677d4822c73ee5cd73cda43a3b64b3a9099af3))
* **input-mask:** add error messages in examples ([90589dd](https://github.com/allianz/ng-aquila/commit/90589dd37d8b064eac71104690a4338f48e98a37))
* **input:** add instruction to import css when using cdkTextareaAutosize ([56b12bd](https://github.com/allianz/ng-aquila/commit/56b12bd1a4b4d688804dfadae94aee476e95c335))
* **mask-input:** add error messages to examples ([e221643](https://github.com/allianz/ng-aquila/commit/e2216433173a8340462c1f9e783fb34dca11106e))
* release guide update  ([e769015](https://github.com/allianz/ng-aquila/commit/e7690152a20480b11d63fc48904528578143ee42))
* sync browser support with Angular ([318cce1](https://github.com/allianz/ng-aquila/commit/318cce1c028ab1dfad67f773eb1f55babe366163))

## [18.0.0](https://github.com/allianz/ng-aquila/compare/v17.9.1...v18.0.0) (2024-07-15)

### Replacement of the emphasis button
The emphasis button was not fulfilling WCAG accessibility requirements and was replaced by the new attention button variant. The emphasis button is deprecated and will be removed in the future. As different usages could lead to other solutions than using the attention button, the change is opt-in and will not be done automatically.

### Library migration to standalone
The library has been migrated to the Angular standalone APIs. This change should not affect you and everything should work the same and you can import and use the modules as before. But the components and directives are now standalone and you can make use of new Angular features like host directives, import only components/directives instead of a module or find better solutions for mocking in tests.

### Library migration to new control flow syntax
The templates of components use the new control flow syntax from Angular. This should have no negative effect on your application or changes needed as everything should work as before.

### ⚠ BREAKING CHANGES

* **iso-date-adapter:** The iso date adapter was loading the requested locales from dayjs lazily by a built in feature.
This doesn't work with the new vite based build system from Angular anymore so we remove it.
If you did not explicitly import the necessary locales before you will have to do so with this update.

Add the respective imports into your application:
```
import 'dayjs/locales/de';
import 'dayjs/locales/es';
```

For lazy loading projects have to find a custom solution that works together with vite and rollup.
* **layout:** The order of the nx-margins have been changed for specificity reasons, this can change the behaviour of current margins.

EXAMPLES:

class="nx-margin-0 nx-margin-top-xl"
before: margin top: 0, left: 0 , right: 0 , bottom: 0
now: margin: top: 64 (xl), left: 0 , right: 0 , bottom: 0

class="nx-margin-s nx-margin-top-xs nx-margin-bottom-m"
before: margin top: 16 (s), left: 16 (s), right: 16 (s), bottom: 24 (m)
now: margin: top: 12 (xs), left: 16 (s), right: 16 (s), bottom: 24 (m)
* **progress-indicator**: to fulfill accessibility requirements the variant with a progress bar between steps needs an accessible label. The label can be set with the `progressbarAriaLabel` or `progressbarAriaLabelledBy` input. There is an english default but you should set this to a meaningful value for your application. Please see more details in the documentatioon.

### DEPRECATIONS
* **swipebar:**: The swipebar component has been deprecated and will be removed in the future. Please rely on native scroll bars.
* **button:**: the `emphasis` button has been deprecated and will be removed in the future. Please use the `attention` button instead.

### Documentation 📚

* **swipebar:** deprecate swipebar component ([88f7127](https://github.com/allianz/ng-aquila/commit/88f71273fd1ad99c7c73e78a60e71fd53960b057))


### Features ✨

* **button:** add attention button and deprecate emphasis button ([b043927](https://github.com/allianz/ng-aquila/commit/b043927f44bde4d8e396d1d1aaea23ff449a3414))
* migrate library to standalone ([0a9b4ee](https://github.com/allianz/ng-aquila/commit/0a9b4eeda7deec1036d7cff15a796b2ff7b75b87))
* **progress-bar:** set aria attributes and allow custom ranges ([e7fa382](https://github.com/allianz/ng-aquila/commit/e7fa3829d51875b8bce3842db582106b7eca1b37))
* update to Angular 18 ([717db8b](https://github.com/allianz/ng-aquila/commit/717db8bd6c2620dc19070cfba16fe39922ed8c95))


### Bug Fixes 🐛

* **avatar:** add role image in examples ([1209151](https://github.com/allianz/ng-aquila/commit/120915193a23a5c8d4a845fb286d89a81a6a9baa))
* **datefield:** propagate readonly state to all directives and components ([8ca1e89](https://github.com/allianz/ng-aquila/commit/8ca1e899ec0b9447a10e266a9eb0c1959248a247))
* **iso-date-adapter:** remove automatic lazy loading of locales ([edb6909](https://github.com/allianz/ng-aquila/commit/edb6909ae5259ad657c2d99eb15f9d446e351628))
* **layout:** fix nx-margin-classes for better specificity ([3b050dd](https://github.com/allianz/ng-aquila/commit/3b050ddbe029ca29aa301569e1890b3448e04d71))
* **radio-button:** cannot access radiogroup before initialization error ([49a6346](https://github.com/allianz/ng-aquila/commit/49a634634cf163a47ff3e273196040795da78534))
* **status-icon:** add inline-flex to status icon ([a5cdc6a](https://github.com/allianz/ng-aquila/commit/a5cdc6a059beaf5c10235c79ecba0971e944ceae))
* **tag:** keep focus after tag deleted ([c8ee14e](https://github.com/allianz/ng-aquila/commit/c8ee14e1051a12b835961b0238e841cd03cac3ef))
* **timefield:** group time input fields for improved screen reader us… ([3bc35e9](https://github.com/allianz/ng-aquila/commit/3bc35e99b260a62ad1d1d226f081da2024e2b6dd))
* **timefield:** make screen readers read all infos instead of content only ([415c553](https://github.com/allianz/ng-aquila/commit/415c5537659715a341ba945598c7a926fa69f9cf))

### [17.9.1](https://github.com/allianz/ng-aquila/compare/v17.9.0...v17.9.1) (2024-07-03)


### Documentation 📚

* **action:** correct content for screenreader ([5ede503](https://github.com/allianz/ng-aquila/commit/5ede503fefe02a51b59c632dd1a34928c6b2b29b))
* **formfield:** correct count remaining example ([b3065a4](https://github.com/allianz/ng-aquila/commit/b3065a43ddd78dfd45574ae8f2d9a7f6f1fdb875))
* **rating:** add more info for assistive technology ([671d729](https://github.com/allianz/ng-aquila/commit/671d72954bb21c95c438979028d24e0a2eb0c321))


### Bug Fixes 🐛

* **context-menu:** correct high contrast color ([b7ddf40](https://github.com/allianz/ng-aquila/commit/b7ddf40753c25de446b718664d6ab3b310a41089))
* **context:** keyboard selection ([f2c7342](https://github.com/allianz/ng-aquila/commit/f2c7342d3f1bb2f3a1f9d0014966af54a479d4c2))
* **dropdown:** adjust group header label styles to match figma ([820be6f](https://github.com/allianz/ng-aquila/commit/820be6fc9312b2db2e1a9a31d449bfe18176fe66))
* **icon:** add NX_ICON_INITIALIZER for internal icons ([e5595dc](https://github.com/allianz/ng-aquila/commit/e5595dc40479fe818a15e48365563088753a8236))
* **mask:** don't do masking if deactivate is enabled ([13df8ef](https://github.com/allianz/ng-aquila/commit/13df8eff480672dcc25832b8b679c6771f1a26fa))
* **phone-input:** add role group, add separate aria labels for dropdown and input ([3b1e23e](https://github.com/allianz/ng-aquila/commit/3b1e23e1261b4db12a7e35fadd41848e649d4504))
* **radio:** add describe error message for screenreader ([7a1acc6](https://github.com/allianz/ng-aquila/commit/7a1acc64a368bd935cca79db6e5f340fa1ebd609))

## [17.9.0](https://github.com/allianz/ng-aquila/compare/v17.8.0...v17.9.0) (2024-06-26)

### Timefield new opt-in timepicker
A new timepicker dropdown was added to the timefield that let's users select a time from a dropdown. This feature is opt-in for now, please see the documentation page for more infos.


### Documentation 📚

* **avatar:** add aria-label in examples ([bb20e9d](https://github.com/allianz/ng-aquila/commit/bb20e9d664f99df5ce8b2e9f5d8e11974381cdb3))


### Bug Fixes 🐛

* **circle-toggle:** setting group control value reflect on child view ([302b511](https://github.com/allianz/ng-aquila/commit/302b511a9b9d31d553fe499bd915190611d069d7))
* **schematics:** schematics and tests for standalone ([7b2037c](https://github.com/allianz/ng-aquila/commit/7b2037c766ed14698bce63c7ca43e6db0ea8d675))


### Features ✨

* **popover:** enable setting tabindex for manual trigger ([d729998](https://github.com/allianz/ng-aquila/commit/d729998eb9a917e8bce4ef2243ad9aa0b23fc94c))
* **timefield:** add timepicker dropdown ([f912ec7](https://github.com/allianz/ng-aquila/commit/f912ec7557858bdebc3a3d0cd02e40511539c73b))
* **toggle-button:** enable setting aria-label for the inner radio input ([e74335d](https://github.com/allianz/ng-aquila/commit/e74335d63b1781277999d9a5bd0d956189436372))

## [17.8.0](https://github.com/allianz/ng-aquila/compare/v17.7.0...v17.8.0) (2024-06-18)


### Features ✨

* **checkbox-harness:** add isDisabled ([5e3a96f](https://github.com/allianz/ng-aquila/commit/5e3a96f9413fa836b5bad327be49fe09c9344382))


### Documentation 📚

* **accordion:** improve accessibility of the error state example ([bbec6d5](https://github.com/allianz/ng-aquila/commit/bbec6d5d837591e2482165f67a762607fa1b3714))
* **circle-toggle:** correct disabled element ([20c6aab](https://github.com/allianz/ng-aquila/commit/20c6aab52af82748e6a199a447a7a407c51e8b63))
* **comparison-table:** enhance NVDA readability for column header cells ([1bc8534](https://github.com/allianz/ng-aquila/commit/1bc853499dc0695b45d7d7668d0d6dbf60bcc933))
* **small-stage:** focusable breadcrumb in small stage example ([f5ccd56](https://github.com/allianz/ng-aquila/commit/f5ccd56e652fd8aa546557714f82d9168fbc73da))
* **table:** correct aria label ([656b258](https://github.com/allianz/ng-aquila/commit/656b2588d90fe7e9c9d3cd286cbba827fb5c5259))
* **tooltip:** show focusable non-interactive tooltip ([92d09d5](https://github.com/allianz/ng-aquila/commit/92d09d5bd7a3341c00bda67ed40c14cdef63196b))
* update allianz-icons version ([216c5b8](https://github.com/allianz/ng-aquila/commit/216c5b8d8c22193a5a2c3a33824de6cd3bff393a))


### Bug Fixes 🐛

* **autocomplete:** prevent early error ([9fe622f](https://github.com/allianz/ng-aquila/commit/9fe622f15f06f58b248430305c9a1e7b0c411730))
* **circle-toggle:** addition check error state from group ([01e518f](https://github.com/allianz/ng-aquila/commit/01e518fe6b1faa315aaf1a1cc7d81edbbb316fa3))
* **datefield:** add localization for de, ja and ar ([419ed09](https://github.com/allianz/ng-aquila/commit/419ed099ef04679286959049d4d9089f2025d6eb))
* **dropdown:** only show focus when interact by keyboard ([e8ee8af](https://github.com/allianz/ng-aquila/commit/e8ee8af5b74a360a48c05755d359e169c230b25c))
* **dropdown:** round position offset values ([5e6bca0](https://github.com/allianz/ng-aquila/commit/5e6bca03d01ba20a3f0a3e7393e7cf099917425f))
* **header:** prevent style leak ([21a5907](https://github.com/allianz/ng-aquila/commit/21a5907412f4c5e57981827da1a1b0c1bb893113))
* **radio-button:** focus host element ([2cd3c3d](https://github.com/allianz/ng-aquila/commit/2cd3c3d7d11c7cc0124221d85d584e82f679becd))
* **sidebar:** add aria labels on examples ([f971fa6](https://github.com/allianz/ng-aquila/commit/f971fa6250fc3fd63325023b9ea1acfba13c307c))
* **spinner:** announce spinner via screen reader ([9de19d4](https://github.com/allianz/ng-aquila/commit/9de19d42179e1fb91c7848593c2018902044dd4a))

## [17.7.0](https://github.com/allianz/ng-aquila/compare/v17.6.0...v17.7.0) (2024-05-16)


### Dropdown and multiselect flyout changes

The label options inside the dropdown where limited to a certain character length and then cut off. This has been revised and long labels will now line break again. In addition the dropdown overlay size will now always be the size of the dropdown trigger element. As that can sometimes mean the overlay would be very narrow we introduced a new API that lets the overlay grow past the trigger element width if needed. In addition you can also set a max-width that the overlay doesn't get too long.


### Bug Fixes 🐛

* **selectable-card:** visual design enhancement ([318f6ed](https://github.com/allianz/ng-aquila/commit/318f6edb64eaff39fa3ef04bc166f2aec6a220db))
* **table:** change sorted arial label and move myintl to docs ([072cac0](https://github.com/allianz/ng-aquila/commit/072cac07d17eae823848ade69e1333714fea6482))


### Features ✨
* **dropdown, multi-select:** let overlay scroll out of viewport ([61cfed2](https://github.com/allianz/ng-aquila/commit/61cfed2534305cba7da7efb30e2cbf98af890400))
* **dropdown, multi-select:** remove ellipsis and add new api for overlaywidth ([b09e876](https://github.developer.allianz.io/ilt/ng-aquila/commit/b09e8764c9093f9418c0f1746d3dfd187efca542))
* **dropdown:** add ariaLabelledBy input ([c96d4fe](https://github.com/allianz/ng-aquila/commit/c96d4fe43daecc364d2f5f5051f207b5942516cb))


### Documentation 📚

* **action, side nav:** a11y ([c1feff9](https://github.com/allianz/ng-aquila/commit/c1feff98778264b94bd43bd92967a42016d6cae0))
* **comparison-table:** add error message in example ([8ce553c](https://github.com/allianz/ng-aquila/commit/8ce553c043d483b9cdfc6d1c1553ad673f57b82f))
* **input:** enhance accessibility of documentation examples  ([463c366](https://github.com/allianz/ng-aquila/commit/463c36673a0e021a76efe9a943c830ca0f3383bb))
* **table**: use aria-labelledby in example ([c96d4fe](https://github.com/allianz/ng-aquila/commit/c96d4fe43daecc364d2f5f5051f207b5942516cb))

## [17.6.0](https://github.com/allianz/ng-aquila/compare/v17.5.0...v17.6.0) (2024-05-02)


### Documentation 📚

* **modal:** showcase correct button size for expert ([9d1e8c1](https://github.com/allianz/ng-aquila/commit/9d1e8c11d39850ca0a8bae6d8f6afcfa67d96437))


### Features ✨

* **context-menu:** selection menu styling([d03bec4](https://github.com/allianz/ng-aquila/commit/d03bec4fbb68332efad7c931f816b7caeef32dec))
* **switcher, radio, checkbox:** add ariaLabel ([c85820f](https://github.com/allianz/ng-aquila/commit/c85820f5e03f28003779f6c1f06291b3b12640b9))


### Bug Fixes 🐛

* **checkbox:** solve circular dependency ([072b664](https://github.com/allianz/ng-aquila/commit/072b664669f69250136790f2c8778dcd8dbcb2d0))
* **circle-toggle:** change cursor for disabled flipped circle toggle ([4a4ad48](https://github.com/allianz/ng-aquila/commit/4a4ad4896800dc2cbda0e611253c5a376b58833c))
* **datefield:** remove days from previous month and following month in current month view ([4f88a99](https://github.com/allianz/ng-aquila/commit/4f88a991e64816c7b262f9fd34bbd932c009d6bb))
* **datepicker:** datepicker colors ([47552d6](https://github.com/allianz/ng-aquila/commit/47552d62418b8d84e8138890817113a96188a855))
* **dropdown:** allow focus readonly ([c41b78b](https://github.com/allianz/ng-aquila/commit/c41b78b6a489aa2bc8f89ac07b819a7a61afcd60))
* **dropdown:** fix scrollActiveOptionIntoView for dropdown with many groups ([b63fb68](https://github.com/allianz/ng-aquila/commit/b63fb684aab64799ca6a66ae3578064bbd280c8d))
* **formfield:** show focus style on readonly field ([5c63d95](https://github.com/allianz/ng-aquila/commit/5c63d9528ac4fb4298ae98f72c636035469a0146))
* move focusmonitor from constructor to ngAfterViewInit ([2118d17](https://github.com/allianz/ng-aquila/commit/2118d175215252388ea5e4bc16a7c2b80c4e2fed))
* **multi-select:** auto focus first element on open ([c771eba](https://github.com/allianz/ng-aquila/commit/c771ebaff710d4e84451d1bb3217a191d47da4c7))
* **toolbar, header:** mobile padding ([90452e9](https://github.com/allianz/ng-aquila/commit/90452e96d1bae0fcdb4cc85cbd0631911c413a4e))

## [17.5.0](https://github.com/allianz/ng-aquila/compare/v17.4.0...v17.5.0) (2024-04-15)


### Documentation 📚

* **date:** correct appearance ([494095c](https://github.com/allianz/ng-aquila/commit/494095cade74d25b2be7bc0dc9c760c4e658cd84))
* **table:** add showcase of filter+selecting table ([9e80f60](https://github.com/allianz/ng-aquila/commit/9e80f60e065e059d886065c30f8a957339d83f61))


### Features ✨

* **card:** add clickable card ([6859993](https://github.com/allianz/ng-aquila/commit/685999363098622eb66e28f57278600c5e3f48cb))


### Bug Fixes 🐛

* **context-menu:** position icon ([5ad6feb](https://github.com/allianz/ng-aquila/commit/5ad6feb02ed4fbe76ec677eaa7f0214ef083a8d1))
* **dropdown, multiselect:** Add tooltip only if label overflows ([bd84f4c](https://github.com/allianz/ng-aquila/commit/bd84f4c9ed230a7c7f970eee166b9ac4d1f71530))
* **dropdown:** active filter bottom padding ([888b500](https://github.com/allianz/ng-aquila/commit/888b5000d7cbcef82ee1bdb8ebc35b3babc3652e))
* **dropdown:** fix tests ([c9499ee](https://github.com/allianz/ng-aquila/commit/c9499ee32a3bc36a02b5644d2c65d1d0c7d6df72))
* **dropdown:** increase time to wait for withTypeAhead ([8a1de5f](https://github.com/allianz/ng-aquila/commit/8a1de5f49a846997880f40e60959dd53cf5c30da))
* **dropdown:** no scrolling or highlighting of the selected option if list not loaded before ([54aa4f4](https://github.com/allianz/ng-aquila/commit/54aa4f425c6308fa30a0f2f6fc27c2304fab829d))
* **formfield:** prevent animation for label when always floating ([5b961d2](https://github.com/allianz/ng-aquila/commit/5b961d2260b2188b212f878e0efba3674a28efc1))
* improve Accordion error accessibility ([18adddf](https://github.com/allianz/ng-aquila/commit/18adddfb88ce7727d2941356930c4d8bc4323465))
* **link:** add x-small link ([bff886a](https://github.com/allianz/ng-aquila/commit/bff886a9bc51d9ec6761e9e792981660c7608a87))
* **list:** add condensed option ([4e1b0d7](https://github.com/allianz/ng-aquila/commit/4e1b0d70f9d10a5a6f122d6de230f15fbbb9fe94))
* **message:** fix injector bug ([9c9f115](https://github.com/allianz/ng-aquila/commit/9c9f1152a5a64eba2d24eb30e50e707a583c25e3))
* **table:** add css for nxtablecellclip pagination ([6a76b5b](https://github.com/allianz/ng-aquila/commit/6a76b5b459999c4b41c95c10d1c1871d07ef3c58))
* **table:** remove clipcell and width calculation ([f4ac95d](https://github.com/allianz/ng-aquila/commit/f4ac95d65740ff0100d08675fcc2d94aa643028c))
* **timefield:** call ontouched only when the whole component gets blurred ([4690669](https://github.com/allianz/ng-aquila/commit/46906695feb88b1a704fa1398fc46c4b81a950d3))
* **tree, action:** make navigation work with screenreader ([f550810](https://github.com/allianz/ng-aquila/commit/f550810f81a101214748625067ea13428df7edeb))

# [17.4.0](https://github.com/allianz/ng-aquila/compare/v17.3.2...v17.4.0) (2024-03-20)


### Bug Fixes

* **grid:** throw only warning if nxRow element is missing ([bd35395](https://github.com/allianz/ng-aquila/commit/bd353956d0c5b11594759831d91a5da93e4856b2))


### Features

* **forms:** add Formfield, Dropdown and Input harnesses ([36d4b1d](https://github.com/allianz/ng-aquila/commit/36d4b1d78c21241d956faf00e6e2367ab7299713))



## [17.3.2](https://github.com/allianz/ng-aquila/compare/v17.3.1...v17.3.2) (2024-03-08)


### Bug Fixes

* **circle-toggle:** inherit properties from group dynamically ([c4b899d](https://github.com/allianz/ng-aquila/commit/c4b899d00e2b32786e37a2c5918cfb655871f3fc))
* **table:** allow sort column to read out by screeenreader ([16e71e0](https://github.com/allianz/ng-aquila/commit/16e71e076adfb0a57fa59b7c3638409c4d95af03))



## [17.3.1](https://github.com/allianz/ng-aquila/compare/v17.3.0...v17.3.1) (2024-03-07)


### Bug Fixes

* **grid:** remove :host from css selectors ([ebf1c82](https://github.com/allianz/ng-aquila/commit/ebf1c825d8dfbcd13b6901646a8702116937b541))
* **mask:** handle initial number values in form model ([42747b3](https://github.com/allianz/ng-aquila/commit/42747b3e305d500e76b18aa8f1e0cf399437e04c))
* **small-stage:** change spacings ([5d70fb8](https://github.com/allianz/ng-aquila/commit/5d70fb80b6818903ae68a834910015376aa4766f))
* **table:** table and ag-grid visual alignments ([f9e0c83](https://github.com/allianz/ng-aquila/commit/f9e0c83311dd69a5be065d5bb0715cf38a9a2970))



# [17.3.0](https://github.com/allianz/ng-aquila/compare/v17.2.0...v17.3.0) (2024-02-27)


### Bug Fixes

* **ag-grid-theme:** remove selected row border ([457ca0c](https://github.com/allianz/ng-aquila/commit/457ca0ce4d25f60606324659f23e545f2ae7140e))
* **formfield:** run change detection when control changes ([9cfddc8](https://github.com/allianz/ng-aquila/commit/9cfddc88328b7766b94762cc03cdf815eaba36c5))
* **icon:** set aria-hidden ([d7f47de](https://github.com/allianz/ng-aquila/commit/d7f47deaa3e97b54a2f8cbabad9f969739351934))
* **mask:** update model correclty when dropspecialcharacters changes ([1859690](https://github.com/allianz/ng-aquila/commit/1859690f566d2b2d52c57f817fb2bba9054fe791))
* **multi-select:** prevent overlay scroll when text too long ([37bf2de](https://github.com/allianz/ng-aquila/commit/37bf2dec1d5ea1b432540c8b5f8b08258f64c421))
* **progress-indicator:** change disabled colors ([e87eec4](https://github.com/allianz/ng-aquila/commit/e87eec426604f70f409425942fa30820f4de0c62))
* **small-stage:** vertical spacing ([56834b4](https://github.com/allianz/ng-aquila/commit/56834b4f6ad8540c62ac7758e15b417602702035))


### Features

* **link,data-display,checkbox,radio,card:** add testing harnesses ([8ae0652](https://github.com/allianz/ng-aquila/commit/8ae065222ba87afc006871613bc8075eec086c3b))
* **message-toast:** message toast from component ([882010f](https://github.com/allianz/ng-aquila/commit/882010f0a4b23b16949b79c6c6c3526e590ef9da))



# [17.2.0](https://github.com/allianz/ng-aquila/compare/v17.1.2...v17.2.0) (2024-02-01)


### Bug Fixes

* **grid-examples:** wrong imports breaking the docs ([7f1a13a](https://github.com/allianz/ng-aquila/commit/7f1a13ab87a55f0490155b6f49264af2f8729cd3))
* **multi-select:** error message shown too early([cc5f666](https://github.com/allianz/ng-aquila/commit/cc5f666f22a20722995ece8afb03010f51a82fe4))
* **radio-button:** no random suffix for custom ID ([65d9828](https://github.com/allianz/ng-aquila/commit/65d98282c602031261541c6c12a945ab504e62a2))


### Features

* **button,icon:** add testing harness ([cd07c76](https://github.com/allianz/ng-aquila/commit/cd07c7629adf23fd9ed33d48b4e036fa5ecb4995))



## [17.1.2](https://github.com/allianz/ng-aquila/compare/v17.1.1...v17.1.2) (2024-01-25)


### Bug Fixes

* **checkbox:** add custom requiredTrue validator ([081fd6a](https://github.com/allianz/ng-aquila/commit/081fd6aee12e460389122e602631d6e088894b9b))
* **file-uploader:** disable in reactive form ([6e22a4b](https://github.com/allianz/ng-aquila/commit/6e22a4bd5729ff99510deabc66dd481ea614fd52))
* **formfield:** ellipsis and tooltip for disabled and readonly nxInput ([7bf660d](https://github.com/allianz/ng-aquila/commit/7bf660d49f679a27ee5f1e627ef0b6c4c225f0be))
* **table:** design alignment NDBX  and AG Grid theme ([38e9123](https://github.com/allianz/ng-aquila/commit/38e9123f0ac121f50bdefdddac30ad44ef61de21))
* **tree:** use inputs alias to mitigate CDK change ([15caf21](https://github.com/allianz/ng-aquila/commit/15caf2136c2fef5f6c1e98018d5a4258ece1aeac))



## [17.1.1](https://github.com/allianz/ng-aquila/compare/v17.1.0...v17.1.1) (2024-01-11)


### Bug Fixes

* **dropdown:** filter input resizing on focus out ([59bdd31](https://github.com/allianz/ng-aquila/commit/59bdd311c8a6a517f9dec9fd4bf60aed3be672c8))
* **formfield:** correct focus style ([a9dffff](https://github.com/allianz/ng-aquila/commit/a9dffff96f49792efd5beb4d079e802688baa45d))
* **popover:** defer opening of popover ([3c29a37](https://github.com/allianz/ng-aquila/commit/3c29a3797e7cb77f863dad8018788aa1bd23512b))



# [17.1.0](https://github.com/allianz/ng-aquila/compare/v17.0.0...v17.1.0) (2023-12-21)

### Grid structure expectations
Some projects were affected by a change in 16.12.0 that caused a runtime error. The error is caused when `nxRow` elements are not surrounded by any `nxLayout` parent.
As a workaround we made the `nxLayout` parent optional for now. But we want to encourage you to always use the `nxLayout` parent as it is described in the grid documentation. A warning is shown in the console when the dev mode is active to show you that you are affected. But we might change this in a future major version and make the `nxLayout` parent mandatory.

For users affected in the 16.x.x versions we recommend to stay at 16.11.0 and not update to 16.12.0 before you upate to 17.1.0.

### Ag-grid theme beta necessary breaking change
We had to move away from our first approach to use the SASS API of Ag-grid for multiple reasons. This unfortunately results in a breaking change which we reserve outside of a major version while a feature is still in beta/experimental state.

Please see the [ag-grid theme documentation](https://allianz.github.io/ng-aquila/documentation/ag-grid-theme) for the updated documentation.

In short:
- make sure that you import the ag-grid base styles and the alpine theme. these were compiled into the aquila theme file before which is the root of the problems. e.g. in the angular.json file:
```
"styles": [
  "node_modules/ag-grid-community/styles/ag-grid.css",
  "node_modules/ag-grid-community/styles/ag-theme-alpine.css",
  "node_modules/@allianz/ng-aquila/themes/ag-theme-aquila.css",
  "src/styles.scss"
]
```
- add the `ag-theme-alpine` class to the grid container
```
<ag-grid-angular class="ag-theme-alpine ag-theme-aquila"></ag-grid-angular>
```
- Allianz internal projects: rename `ag-allianz-icons` to `ag-theme-allianz-icons`


### Bug Fixes

* **ag-grid:** remove SASS API usage ([0c6ab9a](https://github.com/allianz/ng-aquila/commit/0c6ab9a3832117212d860dbb064e053a0556e209))
* **formfield:** make focus style always at the bottom ([0e43f44](https://github.com/allianz/ng-aquila/commit/0e43f442848315d5fa99f1d540095509f8b6fb40))
* **grid:** make nxLayout parent optional for now ([5147ae6](https://github.com/allianz/ng-aquila/commit/5147ae6b02e98147764a240694d60abb9bbe5cd4))
* **table:** hide sort button in screen reader form mode  ([0b0bad1](https://github.com/allianz/ng-aquila/commit/0b0bad144fb73d272538f3b49addc1b545dbf048))
* **timefield:** remove ontouched from oninput ([8572312](https://github.com/allianz/ng-aquila/commit/8572312292feb080eaf7d9dbccb4faf7ebb785cd))


### Features

* **pagination:** pagination with bullets ([f334029](https://github.com/allianz/ng-aquila/commit/f334029a3f1b77212fc39a760a5b9890cf2af35e))



# [17.0.0](https://github.com/allianz/ng-aquila/compare/v16.12.0...v17.0.0) (2023-11-29)


### Features

* update to Angular 17 ([ebdf31e](https://github.com/allianz/ng-aquila/commit/ebdf31e8cfcc6be87d7bc5a472e5d7e1c07cae17))



# [16.12.0](https://github.com/allianz/ng-aquila/compare/v16.11.0...v16.12.0) (2023-11-29)

### Container Queries
We added a new feature to the grid component that introduces container queries. The grid will then automatically adjust the number of columns and rows based on the container size and not on the viewport size.


### Bug Fixes

* **comparision-table:** improve toggle section screen reader output([f435eb0](https://github.com/allianz/ng-aquila/commit/f435eb0b00c815695072f4590fda1c85ada6e4f7))
* **datefield:** provide NxDatepickerIntl in root and not in module  ([36b46fe](https://github.com/allianz/ng-aquila/commit/36b46fed725350667a7e9c49988c7f99c19c3fec))
* **dropdown:** cursor navigation in filter input field ([0f44626](https://github.com/allianz/ng-aquila/commit/0f446261d54e37c2f06b0c25e244810180919665))
* **formfield:** formfield focus style ([ac6c1bb](https://github.com/allianz/ng-aquila/commit/ac6c1bbe64934eabec17fe0161a7ff3b4ea7f93e))
* overflow issue on sticky header and column ([5e73c09](https://github.com/allianz/ng-aquila/commit/5e73c09cb2138cb93d2dfafe6cbd4f98f377e686))
* **phone-input:** mark for check when setReadonly is called ([620ab37](https://github.com/allianz/ng-aquila/commit/620ab370bf6278b88161b127f66a0659c150d494))
* remove relation icon from essential icons ([50272e9](https://github.com/allianz/ng-aquila/commit/50272e978cf7eac9f476e40876c9198b855b43e8))
* **signal-button:** change warning icon ([1e27714](https://github.com/allianz/ng-aquila/commit/1e2771468959029e89e5b0ea19209fadaa74032c))
* **tabs:** correct disabled style ([255377f](https://github.com/allianz/ng-aquila/commit/255377f15e85177e0851d675228f15021007fc70))


### Features

* **grid:** add container query option ([017bad2](https://github.com/allianz/ng-aquila/commit/017bad21d9e34c44a2bd2a5a27b7e9576942a813))
* **selectable-card:** add radio button behavior ([d24d5a6](https://github.com/allianz/ng-aquila/commit/d24d5a69b96fe0b11f389739cb30e3df2cb78805))
* **slider:** slider info icon slot ([f068681](https://github.com/allianz/ng-aquila/commit/f068681336e77991d5a81143f3ad4145c1d70bdb))



# [16.11.0](https://github.com/allianz/ng-aquila/compare/v16.10.0...v16.11.0) (2023-11-09)


### Bug Fixes

* **context-menu:** checked icon position ([24c0e94](https://github.com/allianz/ng-aquila/commit/24c0e943057403e97f3b277b289d45ba3b50c640))
* **context-menu:** revert icon size change ([ca341d4](https://github.com/allianz/ng-aquila/commit/ca341d4c89ca684f0e0ef2b1d991148cba6c0a40))
* **file-uploader:** add aria label for file list ([8254c00](https://github.com/allianz/ng-aquila/commit/8254c00210e6f6760d637c677f00cfeca76ddfd0))
* **formfield:** dont overwrite the formfield-outline-label-font-weight token ([5dcd3c2](https://github.com/allianz/ng-aquila/commit/5dcd3c25f3f201e15c90163641f80d2b95211e98))
* **tabs:** fully scroll button into view ([51656a0](https://github.com/allianz/ng-aquila/commit/51656a062eb9f75757b6d3456bdb3a9ee6e2bc0d))


### Features

* **formfield:** add new active border width token ([6d08cd6](https://github.com/allianz/ng-aquila/commit/6d08cd6a5bc58bb6afc380c8ff982b92b451a751))
* **popover:** popover width and maxwidth ([7813b54](https://github.com/allianz/ng-aquila/commit/7813b5446e7d1b8e2287cb9ab466fb684393147b))
* **signal-button:** signal button with popover ([9abaec1](https://github.com/allianz/ng-aquila/commit/9abaec177b74a0a304c579ffd35c9befce1286c8))



# [16.10.0](https://github.com/allianz/ng-aquila/compare/v16.9.0...v16.10.0) (2023-10-23)

### File Uploader UX updates
The file uploader got some updates to recent UX guideline changes. Most notable changes are:
- the error messages are shown above the label
- files that do not validate or have an error while uploading get removed from the file list
- the file list shows a file icon depending on the type now


### Bug Fixes

* **ag-grid:** color and layout fixes([735d3ea](https://github.com/allianz/ng-aquila/commit/735d3ea887d9dc42ecb68ef1ac3cb4a7c60f3aa0))
* **datefield:** accessible disabled colors ([4f96fbf](https://github.com/allianz/ng-aquila/commit/4f96fbf4531e1d44939c530679d66928db90aaa9))
* **formfield:** update focus styles ([2fb75fe](https://github.com/allianz/ng-aquila/commit/2fb75fe979b84b783849892a03e175aa41bd2510))
* **license-plate:** correct disable style ([9a40f97](https://github.com/allianz/ng-aquila/commit/9a40f97a039112d2aef24e38105f30f97ac86def))
* **multi-select:** prevent value is not present in option warning ([c3291c0](https://github.com/allianz/ng-aquila/commit/c3291c0700a776f95ab08f6735c70c0dd11def0e))
* **pagination:** add button type ([f87c95d](https://github.com/allianz/ng-aquila/commit/f87c95dd75003b5c9e4b171cd73d009313b560f0))
* **popover:** fix for keycode enter ([28fe521](https://github.com/allianz/ng-aquila/commit/28fe521e512caf40ba4d2ad9ac39aa4fd33856fa))
* **radio:** prevent group overwrite checked button ([cd6e2b2](https://github.com/allianz/ng-aquila/commit/cd6e2b22381be0d28298b29fafc7ed80a8382d3e))
* **table:** set sticky header z-index ([89c05ad](https://github.com/allianz/ng-aquila/commit/89c05ad99abb63c9153f356abfadd10dcbc496c3))
* **tabs:** remove scroll buttons from tabindex ([6738f12](https://github.com/allianz/ng-aquila/commit/6738f12c0d692e0f3b07959497c7c1bf5b6573e8))
* **upload:** prevent error disappear when upload failed ([cffaca6](https://github.com/allianz/ng-aquila/commit/cffaca6607564d12e840903372ec84817fc79c69))
* **word:** update focus styles ([cadd2ee](https://github.com/allianz/ng-aquila/commit/cadd2ee48590b5ccafebabbd14f5cc36165f2656))


### Features

* **accordion:** add option to scroll body into view when panel gets opened ([3cf35ab](https://github.com/allianz/ng-aquila/commit/3cf35ab331d418abaf8719a7e8c694bcb0e5d049))
* **forms:** add programmatic readonly api to existing components ([d715947](https://github.com/allianz/ng-aquila/commit/d715947cef67f53fdb113219021ab55478b2b87d))
* **uploader:** changes showing error, add file icon ([c4c592e](https://github.com/allianz/ng-aquila/commit/c4c592e89c72bb0f2aa4d1f88104773f54df0329))



# [16.9.0](https://github.com/allianz/ng-aquila/compare/v16.8.0...v16.9.0) (2023-09-20)


### File uploader new option to handle errors
We identified some problems with how the file type, max file size and max files validators are handled. These validators were added to the form control validators. But as they also block the files from being added to the file list this can lead to a situation where the control is invalid but it is not obvious for the user how to resolve that.
The mentioned validations can now be accessed via an `errors` property on the `nx-file-uploader` component. In addition you can disable that the validators are added to the form control validators by setting `noBlockingValidators="true"`. This is opt-in as it would be a breaking change. You can find more information and updated examples in the file uploader documentation page.

### Bug Fixes

* **ag-grid:** add more icon mappings ([8fee8a0](https://github.com/allianz/ng-aquila/commit/8fee8a07a37ce8ae06996d4a615142c9cf4cbb00))
* **data-display:** correct font weight ([d036d23](https://github.com/allianz/ng-aquila/commit/d036d23f923ba2338d8c4ad29d2674c4db52e7b0))
* **datepicker:** add close icon aria label ([b971a2a](https://github.com/allianz/ng-aquila/commit/b971a2a789211933b61f1c9bf5af037de599bfdc))
* **docs:** add nxModalTitle ([12781f9](https://github.com/allianz/ng-aquila/commit/12781f985f529d39a1bf121352c572068d4b868a))
* **error:** add aria-hidden to the icon ([0f899e3](https://github.com/allianz/ng-aquila/commit/0f899e32908594203102430ea92b32a58086f10d))
* export themes and styles in package.json ([3b5bc1d](https://github.com/allianz/ng-aquila/commit/3b5bc1da2b8d06cd7aad0cb33fbb779a5b751c63))
* **fileuploader:** hide file list container ([4b1fe2d](https://github.com/allianz/ng-aquila/commit/4b1fe2db17a19a72936e9cd9cad4f80c5829b5d1))
* **mulit-select:** add readonly ([86013b1](https://github.com/allianz/ng-aquila/commit/86013b15788be3f522438aa21e8567b8ae0fe7d8))
* **phone-input:** allow leading zero for Italy ([399cd9e](https://github.com/allianz/ng-aquila/commit/399cd9ef47cb3d9d84653c65463053cadc80a470))
* **tooltip:** add retail ([eb82e89](https://github.com/allianz/ng-aquila/commit/eb82e89c4bcd72d14490027b7549ad47c8ad9fef))
* **tree:** keyboard navigation ([46448ea](https://github.com/allianz/ng-aquila/commit/46448ead48380b5bf659e1157ec345cbc1b880b4))
* **tree:** use role tree, correct aria-level ([a865a0d](https://github.com/allianz/ng-aquila/commit/a865a0d10d8ad1d0576b999403529f8ca67e7036))


### Features

* **file-uploader:** provide new error list for blocking validations ([d5f6b2e](https://github.com/allianz/ng-aquila/commit/d5f6b2e02b192e94f334136ce529d372b293de86))



# [16.8.0](https://github.com/allianz/ng-aquila/compare/v16.7.1...v16.8.0) (2023-08-31)


### Ag-grid theme
For complex data tables we are now providing a theme for ag-grid. We wanted to provide an early version and we are looking for feedback. Please try it out and let us know what you think.

### Bug Fixes

* **ag-grid:** resize handle, popup backgrounds ([2a37a0e](https://github.com/allianz/ng-aquila/commit/2a37a0e6bfee11f141ba8df146a636768daf2a9a))
* **code-input:** fix initial disabled state ([b435621](https://github.com/allianz/ng-aquila/commit/b4356219ef4c33a699a7012c5f7d6d53c01ff87d))
* **pagination:** add font inherit ([0de0306](https://github.com/allianz/ng-aquila/commit/0de030609dabe5f035cf3b6272406634bd6f4990))


### Features

* **ag-grid:** provide theme for ag-grid ([74ada8e](https://github.com/allianz/ng-aquila/commit/74ada8ee5133c273a7f177695d85faf739c74ea6))



## [16.7.1](https://github.com/allianz/ng-aquila/compare/v16.7.0...v16.7.1) (2023-08-24)


### Bug Fixes

* **code-input:** handle mobile keyboard clipboard pasting ([bf095ee](https://github.com/allianz/ng-aquila/commit/bf095ee1ce94926d70da6bbcef70a731bdec052b))
* **multi-select:** select all with filter ([b1af230](https://github.com/allianz/ng-aquila/commit/b1af2306e73021190b2d5e34a498d1df251f4caf))
* **slider:** increase value label font-weight ([ba1ea01](https://github.com/allianz/ng-aquila/commit/ba1ea01c3efdcaaf9408b007d84136ed4cf7e309))



# [16.7.0](https://github.com/allianz/ng-aquila/compare/v16.6.0...v16.7.0) (2023-08-17)


### Bug Fixes

* **breadcrumbs:** add hover to all variants ([36b0c36](https://github.com/allianz/ng-aquila/commit/36b0c36807f291fe62b58f2170191e5df630976a))
* **stepper:** show check mark when form  disabled ([f646b34](https://github.com/allianz/ng-aquila/commit/f646b3495172ad7647ace3099dbcf824af2ddd70))
* **tabs:** mobileAccordion option not working with rxjs > 7.8.0 ([9307ba0](https://github.com/allianz/ng-aquila/commit/9307ba0162883e7354ccb3e84240561a3ce98fdc))


### Features

* **modal:** add modal status config ([41705dd](https://github.com/allianz/ng-aquila/commit/41705ddd72107ebe9ad7a65b50aded8235008765))



# [16.6.0](https://github.com/allianz/ng-aquila/compare/v16.5.0...v16.6.0) (2023-08-03)


### Bug Fixes

* **footer:** center align navigation items on mobile ([d412e88](https://github.com/allianz/ng-aquila/commit/d412e8814182f6c0a51010c2a57374b86adfb2fd))
* **iban-mask:** set country code earlier on browser autofill ([7c61a10](https://github.com/allianz/ng-aquila/commit/7c61a108fe30a8185ca3986de4e44859c7023c69))
* **list:** change font weight of xsmall lists ([bad4c27](https://github.com/allianz/ng-aquila/commit/bad4c27d728e0d4eb786b5a919d2857eef213c52))
* **modal:** revert back to old fullscreen css ([94705a8](https://github.com/allianz/ng-aquila/commit/94705a897c21c5c956adad93ce51da8ee5ad4fc1))
* **nx-word, nxAutoResize:** prevent runtime error ([81ebd74](https://github.com/allianz/ng-aquila/commit/81ebd74e12dac1bee5001e6193d5d4bde4d26304))
* **popover:** padding without close icon ([bb1eeb7](https://github.com/allianz/ng-aquila/commit/bb1eeb73f5f1e3abdd697d25216d4ae19d7ed21e))
* **popover:** prevent focusing for trigger type hover ([25f5472](https://github.com/allianz/ng-aquila/commit/25f5472e7eb4d24c7cff60a48394c5a4de8b2ff7))
* update font version in docs ([c330d6e](https://github.com/allianz/ng-aquila/commit/c330d6ecd5ae79155375bc0a46840a44f4a04419))


### Features

* **status-icon:** add status icon component ([854cbc5](https://github.com/allianz/ng-aquila/commit/854cbc56c7bca9b384fe82d51786b1f5ab50a12e))



# [16.5.0](https://github.com/allianz/ng-aquila/compare/v16.4.1...v16.5.0) (2023-07-27)


### Bug Fixes

* **popover:** correct content padding and close icon size ([5a4c54a](https://github.com/allianz/ng-aquila/commit/5a4c54a7571a69fdf8eff7b7dfbe9870ce5b0756))


### Features

* **file-uploader:** add option for stricter file type validation ([37f6f32](https://github.com/allianz/ng-aquila/commit/37f6f325ad44185dbcffa8d09a25d59922d57ec7))
* **modal:** add fullscreen config option ([0edede7](https://github.com/allianz/ng-aquila/commit/0edede7e8fb33ee81162b920d71e09a11f84fca9))



## [16.4.1](https://github.com/allianz/ng-aquila/compare/v16.4.0...v16.4.1) (2023-07-20)


### Bug Fixes

* **comparison-table:** tablet layout sticky on mobile ([c6532ba](https://github.com/allianz/ng-aquila/commit/c6532ba19602b89719b9e492930300b4b8ee0d40))
* **formfield:** correct optional label style ([3f130cf](https://github.com/allianz/ng-aquila/commit/3f130cf0343065e165f0e0250aa19c930b3dcdfe))
* **message:** increase the right padding ([03d1879](https://github.com/allianz/ng-aquila/commit/03d187959529e64dec5bbbed54d446408de3a55c))
* **pagination:** prevent a11y landmark duplication ([d0748e6](https://github.com/allianz/ng-aquila/commit/d0748e64ad627bc39e5c47d5a868856542230361))
* **popover:** change role for a11y landmark ([6318c56](https://github.com/allianz/ng-aquila/commit/6318c56ad4f3502bbf7fdca41d53eb3c43e7a1ec))
* **popover:** don't move focus and remove close button for trigger type hover ([a6c5279](https://github.com/allianz/ng-aquila/commit/a6c5279cbb17603d1b578e3ce314648753fbafee))
* **table:** add zebra color to sticky column ([f5d071a](https://github.com/allianz/ng-aquila/commit/f5d071a6d705b81dbab29ecc082e26f017641e4a))



# [16.4.0](https://github.com/allianz/ng-aquila/compare/v16.3.2...v16.4.0) (2023-07-11)

### Grid bundle size reduction
The grid component created a lot of duplicate or unused css. We optimized this now which results in a parsed size reduction of around 50% and a compressed size reduction of around 33%. We removed some css classes that were there in code but were not used by any public API of the component. The classes affected are `push-{tier}-{number}` and `pull-{tier}-{number}`. If you have applied them manually please use some other mechanism like flexbox order instead.


### Bug Fixes

* **button:** prevent click bindings from firing on disabled anchor buttons ([3d2ef2d](https://github.com/allianz/ng-aquila/commit/3d2ef2dba24ab466a327c7f85e5500a712cf9cc9))
* **datefield:** allow NX_DATE_LOCALE to be provided in platformBrowserDynamic ([2928f7a](https://github.com/allianz/ng-aquila/commit/2928f7aaaecc13a17fdaa21afdb5737038eaee53))
* **modal:** scope modal style ([b6e50a6](https://github.com/allianz/ng-aquila/commit/b6e50a66e07e959b2c71174e587c692a0ad12767))


### Features

* **grid:** improve css to reduce bundle size ([b9789c4](https://github.com/allianz/ng-aquila/commit/b9789c4c2def600c5745d4d46c1bb684019b1dda))
* **modal:** add shouldClose api ([1693766](https://github.com/allianz/ng-aquila/commit/1693766be1a2d709881c009d7efeeec627974aef))



## [16.3.2](https://github.com/allianz/ng-aquila/compare/v16.3.1...v16.3.2) (2023-06-30)

This is a technical release containing internal documentation changes.

## [16.3.1](https://github.com/allianz/ng-aquila/compare/v16.3.0...v16.3.1) (2023-06-30)


### Bug Fixes

* **card:** fix highlight background token ([2a52654](https://github.com/allianz/ng-aquila/commit/2a5265496e17e8eea80af84009fcfaf6c0270f68))
* **multi-select:** add select all to keyboard nav ([f101dbf](https://github.com/allianz/ng-aquila/commit/f101dbfc1d63479588a5d39d4be528c7d56fb325))
* **multi-select:** prevent incorrect sorting of the list when applying filter ([ebe1381](https://github.com/allianz/ng-aquila/commit/ebe1381b730cf135e2ed52685329e83ec09f9a15))
* **table:** default sticky row background ([f3acc02](https://github.com/allianz/ng-aquila/commit/f3acc0273466c6fa78379f2ccb2b258da043a10e))



# [16.3.0](https://github.com/allianz/ng-aquila/compare/v16.2.0...v16.3.0) (2023-06-21)


### Bug Fixes

* **datepicker:** have fallback for locale normalize format ([294027a](https://github.com/allianz/ng-aquila/commit/294027a707adbbef08e5d8bb7079010e17e69b40))
* **schematics:** add workaround for nx workspaces ([63c361b](https://github.com/allianz/ng-aquila/commit/63c361b7b8e396e90b7e85e9542fd188d1464ce0))


### Features

* **table:** table row maystick ([7ea074a](https://github.com/allianz/ng-aquila/commit/7ea074a2241a6308674ac8adc94f8eaf726729f2))



# [16.2.0](https://github.com/allianz/ng-aquila/compare/v16.1.0...v16.2.0) (2023-06-13)


### Bug Fixes

* **modal:** prevent buttons flicker when open modal ([5bcbd9f](https://github.com/allianz/ng-aquila/commit/5bcbd9f77881a11214e38cf07c3b305e733dc366))


### Features

* **headline:** add size and negative inputs ([b1ca6ff](https://github.com/allianz/ng-aquila/commit/b1ca6ff22e357582232a1052124fc2ccc53a05dd))
* **formfield:** add new tokens for one allianz ([1979b4b](https://github.com/allianz/ng-aquila/commit/1979b4b9c6124d7c73bad53ad690efb2ce3853a7))



# [16.1.0](https://github.com/allianz/ng-aquila/compare/v16.0.0...v16.1.0) (2023-06-06)

### Button with icons
A new API was added to position icons inside buttons correctly with the proper spacing. That way you do not have to add spacing between icons and text manually anymore. See the
[with icons example](https://allianz.github.io/ng-aquila/documentation/button/overview#with-icons) how to use it.

### Bug Fixes

* **mult-select:** remove focus outline ([89c8e2b](https://github.com/allianz/ng-aquila/commit/89c8e2bed2e82f144438503bc610b5b0a968f0a9))
* **multiselect:** open with alt plus arrow ([58b0749](https://github.com/allianz/ng-aquila/commit/58b0749992912e315bc2b81d112d57948fd49fe3))
* **popover:** prevent page scroll and close abruptly ([0c9c813](https://github.com/allianz/ng-aquila/commit/0c9c813ece4c470c4a48d15566a1f51dcdc98b1b))
* **radio:** respect errorstatematcher ([b83ee84](https://github.com/allianz/ng-aquila/commit/b83ee84caf4ebfbb645776a6f911e08d24b0330e))
* **tabs:** prevent navigation button flashing ([c1e8421](https://github.com/allianz/ng-aquila/commit/c1e84210a52f1591a2ffa1df7d43787e98caa3be))


### Features

* **button:** add icon position attributes ([d50c923](https://github.com/allianz/ng-aquila/commit/d50c923a0b3798c700c42c0cb57b8d8d64eebca5))
* **plain-button:** add variant and size for one allianz ([eb4f5c3](https://github.com/allianz/ng-aquila/commit/eb4f5c30c2389ffc38ab481c0de74a42a81b7e68))



# [16.0.0](https://github.com/allianz/ng-aquila/compare/v15.3.0...v16.0.0) (2023-05-23)

Aquila v16.0.0 is based on Angular 16. For updating please see our update guide: https://allianz.github.io/ng-aquila/guides/releases

### Removal of `nx` prefixes for Inputs and Outputs
We cleaned up some inconsistencies in our input and output namings and removed `nx` prefixes, e.g. `nxDisabled` on the dropdown is now `disabled`. These changes will be migrated automatically for you and applied in your application when you run `ng update`.
In the `Breaking Changes` section of [the Changelog](./guides/CHANGELOG) you can find commits with affected components. If after the migrations you get errors please check the API pages of the respective components. The angular compiler should also guide you pretty well and often suggest the correct names.

### Formfield visual change
The formfield formerly reserved space at the bottom for a possible hint. This space also served as the spacing between formfields and the hint would render in this reserved space. This leads to situations where you don't have sufficient space between the hint and the next row.
From now on if a hint is present there will be additional space after the hint.

If this somehow affects your application in a negative way you can temporarily use a compatibility CSS file which provides the previous styles. For that import the file `@allianz/ng-aquila/css/compatibility/formfield-padding.css` in the angular.json

### `nxMask` validation prevented optional controls
The `nxMask` internal validator always validated empty strings, resulting in a `nxMaskLengthError`. This makes it impossible to have a control as optional. We fixed this bug which is technically a breaking change. If you relied on getting the `nxMaskLengthError` for empty strings as a replacement for a required validator please add the `required` validator now.


### BREAKING CHANGES

* **accordion:** remove nx prefixes for inputs ([449178e](https://github.com/allianz/ng-aquila/commit/449178e70312e7e0502cb75aa93099c50a53feea))
* **autocomplete:** remove nx prefixes from inputs ([c00cda0](https://github.com/allianz/ng-aquila/commit/c00cda0c31826a2c91a8404a4025eab088b63245))
* **code-input:** remove nx prefix from inputs ([b539cda](https://github.com/allianz/ng-aquila/commit/b539cdac9d98783c32e1dd5b05c98b7226104a9c))
* **col:** remove nx prefix from input ([a79ea4d](https://github.com/allianz/ng-aquila/commit/a79ea4d41ea5220a2ed8a5d17799881c7ec494cf))
* **col:** remove nx prefix from input ([50e1baf](https://github.com/allianz/ng-aquila/commit/50e1baf2f91234b84b3e61c3630c4db437faf1ae))
* **dropdown:** remove nx prefixes from inputs and outputs ([a416425](https://github.com/allianz/ng-aquila/commit/a416425173108e45d039fbd316d692f1dd3718b4))
* **dynamic-table:** remove nx prefix from input and output ([d249203](https://github.com/allianz/ng-aquila/commit/d249203b17b60bf86668cd42f32415b12475d3f1))
* **formfield:** change tokens for bottom padding ([79dc92f](https://github.com/allianz/ng-aquila/commit/79dc92fe134fea4c457413a306828c9d2aa73d3c))
* **formfield:** remove nx prefixes from inputs ([2192dcf](https://github.com/allianz/ng-aquila/commit/2192dcffa8b4f8061a40da2535f246697ad270b9))
* **formfield:** rename input name nxStyle to negative ([0b2667f](https://github.com/allianz/ng-aquila/commit/0b2667f424242e754c0523a036de8bfbb2e06894))
* **spinner, switcher, taglist:** remove nx prefixes ([f900cb0](https://github.com/allianz/ng-aquila/commit/f900cb0a1841a8eb12e11834546e8758815b6ae2))
* **number-stepper, page-search, pagination, radio-button:** remove nx prefixes ([c6088bc](https://github.com/allianz/ng-aquila/commit/c6088bc999d74033d1a0c616a392cfd1b8ab2862))
* **menu-button, message, modal, natural-language-form, word:** remove nx prefixes ([65f6b63](https://github.com/allianz/ng-aquila/commit/65f6b6383a3fb2c23d2016b9ff34cdaf6558ed12))
* **row:** remove nx prefix from input ([4be7205](https://github.com/allianz/ng-aquila/commit/4be7205fc01f395b4ce3c3b5ed0a86899330522c))
* **row:** remove nx prefix from inputs ([7cd01b7](https://github.com/allianz/ng-aquila/commit/7cd01b72f7b8e3dc4ac009425414fd4d074657a0))
* **video:** remove nx prefix input ([a5dedc1](https://github.com/allianz/ng-aquila/commit/a5dedc11cb4e9c0e334ccd7562a15bb0cfe8ee18))
* **mask:** not mark empty value as invalid ([b35473d](https://github.com/allianz/ng-aquila/commit/b35473dc9648e961b403e188b062cd9d41388c57))




# [15.3.0](https://github.com/allianz/ng-aquila/compare/v15.2.1...v15.3.0) (2023-05-22)


### Bug Fixes

* **auto-complete:** open panel in shadow dom ([d55e0f9](https://github.com/allianz/ng-aquila/commit/d55e0f9baf5ba1decf8d8e9a2e59b1138cac9918))
* **circle-toggle:** add aria-required ([fed3efe](https://github.com/allianz/ng-aquila/commit/fed3efe7bf5aacf5db4632e46d62654d4697120c))
* **dropdown:** close tooltip on dropdown click ([e2ac39d](https://github.com/allianz/ng-aquila/commit/e2ac39de8ddb3d055c019cdd7e4010267deecfd1))
* **multi-select:** screenreader for option selection ([54dcf0a](https://github.com/allianz/ng-aquila/commit/54dcf0adf2a4056d0fa8ae016af4cf9e199a8810))
* **multi-step:** add aria-controls ([7213fd1](https://github.com/allianz/ng-aquila/commit/7213fd112dabe6eafb7164680ded80e6616a8dac))
* **number-stepper:** prevent null id ([1e71035](https://github.com/allianz/ng-aquila/commit/1e7103522e06f482362ad86121ad8d55a606e4fe))
* **phone-input, dropdown:** add aria-invalid ([da08695](https://github.com/allianz/ng-aquila/commit/da086951ec00c3d17c08a8ea1314acb3a0305d8e))
* **popover:** add extended example ([dcb8cf5](https://github.com/allianz/ng-aquila/commit/dcb8cf5aec1b2c4c366cabae99e8bd1bc79f2da8))
* **popover:** close on tab ([cab9391](https://github.com/allianz/ng-aquila/commit/cab9391c7171ff127046f93b581a95f2a987172a))
* **radiobutton:** give radiobuttons a random ID suffix ([0bae42a](https://github.com/allianz/ng-aquila/commit/0bae42ab9d24ad125b63ede15bc5af591014fcea))
* **table:** remove empty aria label of sort-header ([c901b8a](https://github.com/allianz/ng-aquila/commit/c901b8a459ae79631d4daaf74f8ec83d1d02b11e))


### Features

* **allianz-one:** add allianz one module ([463ec5d](https://github.com/allianz/ng-aquila/commit/463ec5d25c28681f7458cb176c9e8f050835a091))
* **datefield:** introduce strict date parsing token ([74caa17](https://github.com/allianz/ng-aquila/commit/74caa176ee1c1d48f76c52adedd6a365ecb56e02))
* **number-stepper:** add api to disable input field direct interaction ([39aabd0](https://github.com/allianz/ng-aquila/commit/39aabd081cfd4b5111644a8f2987d9bc3db11a50))
* **toolbar:** add divider component ([5dd0b95](https://github.com/allianz/ng-aquila/commit/5dd0b9576acd3dc3eec95e6ef6812b5208fad940))



## [15.2.1](https://github.com/allianz/ng-aquila/compare/v15.2.0...v15.2.1) (2023-04-21)


### Bug Fixes

* **comparison-table:** avoid circular dependency ([3743236](https://github.com/allianz/ng-aquila/commit/37432362be84f79139e82106fa3313857f1b05bf))
* **data-display:** add missing module in stackblitz ([edb9bfa](https://github.com/allianz/ng-aquila/commit/edb9bfa7850b4294fffcb572fba23c2114443076))
* **datepicker:** add focus to close button ([0e2ac29](https://github.com/allianz/ng-aquila/commit/0e2ac296f44dcdee1ee56a7d399377fc1f190443))
* **dropdown:** add aria-controls ([70368f2](https://github.com/allianz/ng-aquila/commit/70368f23c1858921b01a572c634efc99793e848c))



# [15.2.0](https://github.com/allianz/ng-aquila/compare/v15.1.0...v15.2.0) (2023-04-18)


### Bug Fixes

* **file-uploader:** file name overflow ([d474a5e](https://github.com/allianz/ng-aquila/commit/d474a5e91bc25ae087b0393768db556c5e0fb06f))
* **file-uploader:** prevent undefined id and label ([af02631](https://github.com/allianz/ng-aquila/commit/af026313ee21498214e985f35aa05608ca27660a))
* **forms:** migration to typed forms ([b41d419](https://github.com/allianz/ng-aquila/commit/b41d41928b666390b48badd1afff4a8c06e3702a))
* **input:** set aria-required when form control is required ([762ec06](https://github.com/allianz/ng-aquila/commit/762ec066a41e39e90064635b2b90f75b7652bf44))
* **modal:** button styling ([1267d16](https://github.com/allianz/ng-aquila/commit/1267d1662a23184e9540c06794ebbd135a134f8e))
* **modal:** update vertical spacings ([18bd4e4](https://github.com/allianz/ng-aquila/commit/18bd4e4d60bdca265b1a578600a7c0f3d8d0e14c))
* **multi-select:** sort by selected before filter ([686f678](https://github.com/allianz/ng-aquila/commit/686f67844a49bcbe13a5099d255d426afbeb9f26))
* **multi-select/dropdown:** comply with updateOn formcontrol ([ff97c82](https://github.com/allianz/ng-aquila/commit/ff97c8256ae518a2165da80eda7bb8b9c066a34c))
* **multi-select:** correct divider style ([acf6c93](https://github.com/allianz/ng-aquila/commit/acf6c93b05df74005111e2fe852a42641abe8a10))
* **multi-select:** keep selected value when option changes ([0f44af1](https://github.com/allianz/ng-aquila/commit/0f44af14dc6b0112a4a41eb94d6600307e1d87c0))
* **multi-select:** update tooltip on value change ([d6edef6](https://github.com/allianz/ng-aquila/commit/d6edef6eae43fa155a109016b669a66ae026958a))
* **table:** column resize error in firefox/safari ([946d96d](https://github.com/allianz/ng-aquila/commit/946d96d2f82626c8b0112c521589cf9061ec5272))


### Features

* **card:** add highlight header ([b5f37cc](https://github.com/allianz/ng-aquila/commit/b5f37ccb15e326d6bab524abd685b856f00e7bbc))
* **comparison-table:** add error state ([521bf44](https://github.com/allianz/ng-aquila/commit/521bf44edbd1f22c327432f279a6989ccc38f61e))
* **error:** allow setting empty appearance and fallback to message type ([bd7c684](https://github.com/allianz/ng-aquila/commit/bd7c684222dd98ee894d7e99fa3ee6cab61faf90))
* **multi-select:** add opened/closed event ([4e44786](https://github.com/allianz/ng-aquila/commit/4e447861c4c7a7afe77f8ddabb7f1b819a0a962b))

### Styles

* **multi-select:** change select all button style, remove clear all button ([bf01401](https://github.com/allianz/ng-aquila/commit/bf01401af44164457118ea19ca8ea88089878a69))

### BREAKING CHANGES

-   We have moved DayJS and Decimal.js to peerDepencencies ([fa5eef59f](https://github.com/allianz/ng-aquila/commit/fa5eef59ff9d18af16d5868c4fc715a26eb97586)). In case you experience problems, make sure you install these libraries.


# [15.1.0](https://github.com/allianz/ng-aquila/compare/v15.0.0...v15.1.0) (2023-02-20)


### Bug Fixes

* **build:** export css path ([747b314](https://github.com/allianz/ng-aquila/commit/747b314e5ee1f34a1711029b2f1e9005e0b76e41))
* **datepicker:** fix contrast style ([86f6dd1](https://github.com/allianz/ng-aquila/commit/86f6dd13bae9341201e527cd189dd29cff2b5da0))
* **docs:** stackblitz example template ([e28454e](https://github.com/allianz/ng-aquila/commit/e28454e49bb7cfa56ca84423e912d86169af219a))
* **dropdown:** a11y screenreader repeat value ([0b4e176](https://github.com/allianz/ng-aquila/commit/0b4e17679e4cdf9d841c6a2ccb56a27be80452fd))
* **dropdown:** update group styling ([4039bd5](https://github.com/allianz/ng-aquila/commit/4039bd5e2cddca9914ccfab71bbf6c52abb50e34))
* **images:** use ngoptimizedimage  ([bf36cd9](https://github.com/allianz/ng-aquila/commit/bf36cd904badb459571b8596bd98c1eac5e7820c))
* **modal:** changed one and two button styling ([73de432](https://github.com/allianz/ng-aquila/commit/73de43278399ec91f992ee23bc8ad9553c92eb9a))
* **phone-input:** add support for blur and focus ([cb9b9cf](https://github.com/allianz/ng-aquila/commit/cb9b9cfce5a9e5d457c443185c93eb2d14fc1b9b))
* **popover:** popover content should not be focusable ([84e448b](https://github.com/allianz/ng-aquila/commit/84e448bdc0413d05496d0d264dc8f8a75855a179))


### Features

* **dropdown:** provide focus out event ([eccc424](https://github.com/allianz/ng-aquila/commit/eccc4248720125d05e132d65d77e06b340988700))
* **table:** add column reorder example and resize header directive ([35382fc](https://github.com/allianz/ng-aquila/commit/35382fc409fd778bfb196f7880796bb0f022778e))



# [15.0.0](https://github.com/allianz/ng-aquila/compare/v14.2.0...v15.0.0) (2022-12-14)

Aquila v15.0.0 is based on Angular 15. For updating please see our update guide: https://allianz.github.io/ng-aquila/guides/releases

# [14.2.0](https://github.com/allianz/ng-aquila/compare/v14.1.0...v14.2.0) (2022-12-13)


### Bug Fixes

* **formfield:** add change detection switch ([8e2d8cf](https://github.com/allianz/ng-aquila/commit/8e2d8cfb8785b24ced2394e0efd52dfa9b2a5a09))
* **phone-input:** rename wrapper class to specific name ([5223b62](https://github.com/allianz/ng-aquila/commit/5223b628423c1b3af696aad41b049f5bf42ae8d6))


### Features

* **rating:** add different sizes ([b1a4362](https://github.com/allianz/ng-aquila/commit/b1a4362f23479428e9a234c83553f42515746489))



# [14.1.0](https://github.com/allianz/ng-aquila/compare/v14.0.0...v14.1.0) (2022-11-18)


### Bug Fixes

* **dropdown:** tooltip closes on dropdown click ([d61d449](https://github.com/allianz/ng-aquila/commit/d61d4495dea4ce3d93f1bcae42d02511e7bdc5ce))


### Features

* **comparison-table:** add view input ([3f49015](https://github.com/allianz/ng-aquila/commit/3f4901580298afc8126003a8105fe7b3fbc11920))



# [14.0.0](https://github.com/allianz/ng-aquila/compare/v14.0.0-next.0...v14.0.0) (2022-11-14)

Aquila v14.0.0 is based on Angular 14. For updating please see our update guide: https://allianz.github.io/ng-aquila/guides/releases

### Bug Fixes

* **context-menu:** focus on opening a new panel ([10ca714](https://github.com/allianz/ng-aquila/commit/10ca714544fca745918e6978b2ed77c52be2321c))
* **datefield:** styling of states ([1d54cb5](https://github.com/allianz/ng-aquila/commit/1d54cb54acd0d65e763c536b97b52b4b5af21ec9))
* **progress-stepper:** always show selected step ([72d6b65](https://github.com/allianz/ng-aquila/commit/72d6b653a4ce6cacfe64946478f58298e1f37817))
* **rating:** add selected hover and active styling ([cdcbadf](https://github.com/allianz/ng-aquila/commit/cdcbadfd09c909bde3098da3c0e7d4a2e4e28587))
* **toggle-button:** make view align with state ([1ca164d](https://github.com/allianz/ng-aquila/commit/1ca164d17cef5de1526dfb61927d593408cec759))
* **autocomplete:** disabled option styling ([#757](https://github.com/allianz/ng-aquila/commit/479e8f3401aad30ccc5ef5c86bb0b7d9afd0f6c4))
* **dropdown:** prevent selecting disabled option by keyboard ([#755](https://github.com/allianz/ng-aquila/commit/f17389e1dbdf360c380a138c96198e71ea5542cc))
* **modal:** remove extra scrollbar ([#760](https://github.com/allianz/ng-aquila/commit/e1c186375387130f4c0b12e679668dc08873ee0c))


### Features

* **dropdown:** add readonly state ([5bddd4d](https://github.com/allianz/ng-aquila/commit/5bddd4d0cc8a545b4f2d0778754866f0d0731136))



# [14.0.0-next.0](https://github.com/allianz/ng-aquila/compare/v13.9.1...v14.0.0-next.0) (2022-11-07)

This is an alpha-release of Aquila v14.0.0.


## [13.9.1](https://github.com/allianz/ng-aquila/compare/v13.9.0...v13.9.1) (2022-09-21)


### Bug Fixes

* **context-menu:** close old overlay when new one is opened ([00cdaee](https://github.com/allianz/ng-aquila/commit/00cdaee7c90f192cbd932e4887feb2088edce725))
* **dropdown:** group usage formatting ([3cc29c2](https://github.com/allianz/ng-aquila/commit/3cc29c2088ca466f854b340761ef201cae92a677))
* **modal:** correct modal padding ([2e1d321](https://github.com/allianz/ng-aquila/commit/2e1d321a7978dbc267278b51d742cd154df96d42))


# [13.9.0](https://github.com/allianz/ng-aquila/compare/v13.8.0...v13.9.0) (2022-09-13)


### Bug Fixes

* **dropdown:** support null and undefined ([c030431](https://github.com/allianz/ng-aquila/commit/c030431a3622276f5d1535a39b803ba6a57c8b9a))
* **file-uploader:** add null checks ([60aafac](https://github.com/allianz/ng-aquila/commit/60aafacceffe52d26295ecbc9dcb2e7417b0ae19))
* **file-uploader:** avoid label undefined error ([6fa0f8f](https://github.com/allianz/ng-aquila/commit/6fa0f8f48935486db083185263e835e47c86c450))
* **file-uploader:** change file name font weight to regular ([25d6adf](https://github.com/allianz/ng-aquila/commit/25d6adf75f1e27d6c7e887ca0b7dfb0be425632b))
* **footer:** add keyboard focus outline to links ([bd0f6ac](https://github.com/allianz/ng-aquila/commit/bd0f6ac1ce846c888a9899e67e81c1a4b0c22efe))
* **footer:** add role attribute ([c99754e](https://github.com/allianz/ng-aquila/commit/c99754e620deeb1f6e06066b1f5fe8c32a0fc0d3))
* **formfield:** align html title with label ([0501a52](https://github.com/allianz/ng-aquila/commit/0501a5266ac38175bccdf544782ea61da0fbbaf4))
* **link:** top align icons ([d39b1bd](https://github.com/allianz/ng-aquila/commit/d39b1bdb43fe440c0743f17d0369280485f1e642))
* **mask:** prevent undefined error from unordered setter ([5c381af](https://github.com/allianz/ng-aquila/commit/5c381afd1a01ccc847b32557b823935639cf8219))
* **modal:** prevent horizontal scroll on mobile view, modal style ([925b5b8](https://github.com/allianz/ng-aquila/commit/925b5b84ce7f99dc7be17b333d1d7485e1c66394))
* **multi-select:** add open method ([8155532](https://github.com/allianz/ng-aquila/commit/81555321c2a1cb3e6e0d1bbdfaed58d94b459fd4))
* **multi-select:** make reactive form disable work ([3dedbe8](https://github.com/allianz/ng-aquila/commit/3dedbe8006ff41c6fc3c4bd55cd326c4558e17a0))
* **multi-select:** make screenreader work when focus on options ([15b99ed](https://github.com/allianz/ng-aquila/commit/15b99edff3ffd62790cd472aeb88faee06c9ff26))
* **multi-step:** add aria attributes ([b0e97f2](https://github.com/allianz/ng-aquila/commit/b0e97f21322d207fbae539f4752eadfa8f73e074))
* **phone-input:** update country, call formatter when countryCode changed ([0d67679](https://github.com/allianz/ng-aquila/commit/0d676790fc82d42ac31f32c40134e1c62c88cfec))
* **popover:** hide popover when left viewport ([c4e474a](https://github.com/allianz/ng-aquila/commit/c4e474a8d0e583b6dfd8b2636a32c0a1d31a77f3))
* **tabs:** remove tab area focus ([d886209](https://github.com/allianz/ng-aquila/commit/d8862091702933fcc3c1a7e76e0f4f268aab9402))
* **circle-toggle-group:** preset model is not reflected in view ([3f806bd](https://github.com/allianz/ng-aquila/commit/3f806bd617262324b857f70a5862b250be490c8c))



### Features

* **comparison-table:** add recommendation table example ([acf95de](https://github.com/allianz/ng-aquila/commit/acf95de1f1ac21a4def412782fe605fc7e6d6a41))
* **data-display:** add horizontal column layout ([cd5ea34](https://github.com/allianz/ng-aquila/commit/cd5ea34500d1c6f4cb45a06efbb7eb3b98f03da8))
* **data-display:** add label column span input ([f866f3e](https://github.com/allianz/ng-aquila/commit/f866f3e10b48333365c660d710e72ebc8149a44c))
* **datefield:** add today mark ([d644c07](https://github.com/allianz/ng-aquila/commit/d644c0705d0c524269e08a7777bce9a466d85544))
* **file-uploader:** hide dropzone on mobile ([4b0d20c](https://github.com/allianz/ng-aquila/commit/4b0d20c9256220062a2287af6e106c9ecf765984))
* **footer:** add copyright input and default text ([79bab34](https://github.com/allianz/ng-aquila/commit/79bab346c31a0638433340d2b57fb12f0fea7cf0))
* **icons:** add relation icon svg ([d0c270e](https://github.com/allianz/ng-aquila/commit/d0c270ecc1f3d2f2cb0376b9106a2c2e63fa0077))
* **multi-select:** add selectionChange api ([6886631](https://github.com/allianz/ng-aquila/commit/688663170358603e4d4c5540151aa05645a4d78e))
* **multiselect:** add filter function input ([0d67d80](https://github.com/allianz/ng-aquila/commit/0d67d80196f4530e3dc93f6aa69ee088e8458252))
* **rating:** default blue color ([ff90255](https://github.com/allianz/ng-aquila/commit/ff902554d07336d26d7d21b8e28c612d03e59a10))
* **slider:** add tick marker ([cb2ab6f](https://github.com/allianz/ng-aquila/commit/cb2ab6f45ca8fd1f26a8b277838fa52afe34d4c2))



## [13.8.0](https://github.com/allianz/ng-aquila/compare/v13.7.0...v13.8.0) (2022-07-15)

### Features

* **dropdown:** optional truncation of items ([e437cfe](https://github.com/allianz/ng-aquila/commit/e437cfe7fff2d27835dc67b8b9e7b14b0f5f49cb))

# [13.7.0](https://github.com/allianz/ng-aquila/compare/v13.6.3...v13.7.0) (2022-07-12)


### Bug Fixes

* **formfield:** hide undefined html title ([95f6f60](https://github.com/allianz/ng-aquila/commit/95f6f60b10cf6da84cc12c14c056d8da3e96efbd))
* **slider:** update control value when slider is moved ([91d10b0](https://github.com/allianz/ng-aquila/commit/91d10b00b57ad8c4bdc7a316d8f65be8025c723c))
* **toggle-button:** track model changes after buttons changed ([985ba20](https://github.com/allianz/ng-aquila/commit/985ba2014fb1ecef87dd5d26e070343aa7570ce1))
* **tree:** prevent screenreader intercept key event ([a88ed7a](https://github.com/allianz/ng-aquila/commit/a88ed7a627a0d836f0b1ac6b586c98b650420fa2))


### Features

* **dynamic-table:** add column definition model ([6bcf047](https://github.com/allianz/ng-aquila/commit/6bcf04795646ab060f1692e37f2a1b4d5e9ad898))
* **dynamic-table:** add column styles ([5757c29](https://github.com/allianz/ng-aquila/commit/5757c296652e16095618627c9457e5e5690eef48))
* **sidepanel:** focus on opened and closed ([97a4acb](https://github.com/allianz/ng-aquila/commit/97a4acbbf9e844904754b5cbe1f818fc94f9ba0d))



## [13.6.3](https://github.com/allianz/ng-aquila/compare/v13.6.2...v13.6.3) (2022-06-24)


### Bug Fixes

* **input-mask:** keep model value if deactiveMask is set ([388dba6](https://github.com/allianz/ng-aquila/commit/388dba60aca949242089475ce5a549cb7ef71dda))
* **multi-select:** show formfield error state ([7ffebec](https://github.com/allianz/ng-aquila/commit/7ffebec4ee5b7b55669517851bc799fbe30962e3))
* **phone-input:** add missing initial country number code ([34aa6a1](https://github.com/allianz/ng-aquila/commit/34aa6a1b66c20e3d5d2d8e460c502db50f0aa6df))



## [13.6.2](https://github.com/allianz/ng-aquila/compare/v13.6.1...v13.6.2) (2022-06-17)

This is a technical release to help us move our project to `github/allianz`.

## [13.6.1](https://github.com/allianz/ng-aquila/compare/v13.6.0...v13.6.1) (2022-06-10)

### Bug Fixes

* **menu-button:** mark aria expanded ([7038fcf](https://github.com/allianz/ng-aquila/commit/7038fcf9cd127997f7462960df078c01c261be29))



# [13.6.0](https://github.com/aposin/ng-aquila/compare/v13.5.0...v13.6.0) (2022-05-27)


### Bug Fixes

* **comparisontable:** fix wrong reading for NVDA screen reader ([f5679fd](https://github.com/aposin/ng-aquila/commit/f5679fdfaac4aab7a9005b2ae1b66b5140e0ec70))
* **multi-select:** bring back select all/clear all i18n label ([7abbf34](https://github.com/aposin/ng-aquila/commit/7abbf34fcbe513297619700fe0f7e1e386a0c7e3))
* **multi-select:** deactivate disabled options ([cdf9e51](https://github.com/aposin/ng-aquila/commit/cdf9e51d33c73cc143fda8e29a371d1679c73706))
* **multi-select:** deactivate when disabled ([7b766ef](https://github.com/aposin/ng-aquila/commit/7b766ef0e64934d587614e1fdd19f419f736d16f))
* **radio-button:** add aria-invalid to input ([840b158](https://github.com/aposin/ng-aquila/commit/840b158ca326aed0d5e3f6f4d03b017f06f4a7fc))
* **slider:** fix keydown func name ([2e0ff8b](https://github.com/aposin/ng-aquila/commit/2e0ff8b424aad3a46fb224762e01fa1edfdb5aa8))
* **switcher:** add random id to prevent id collide ([178b782](https://github.com/aposin/ng-aquila/commit/178b782c6e1d762b60346fe0b8346cb028856519))


### Features

* **circle-toggle:** add error state ([cc7e196](https://github.com/aposin/ng-aquila/commit/cc7e19697d001f2e433bae927065f9b7a2ae81a2))



# [13.5.0](https://github.com/aposin/ng-aquila/compare/v13.4.0...v13.5.0) (2022-05-16)


### Bug Fixes

* **multi-select:** select all only visible items when filter ([1c3c832](https://github.com/aposin/ng-aquila/commit/1c3c832c9d47887666e345dacffdb33ae8d6e6e8))


### Features

* **dropdown:** add inputType for filter input ([db3e732](https://github.com/aposin/ng-aquila/commit/db3e732481d1246356a0c22b4593e724ccebe696))



# [13.4.0](https://github.com/aposin/ng-aquila/compare/v13.3.1...v13.4.0) (2022-05-03)

### Bug Fixes

-   **form-field:** add note-directive into change detection ([bccf169](https://github.com/aposin/ng-aquila/commit/bccf169151871867f382570d011ec4238f246935))
-   **input:** make autocomplete work ([02e4685](https://github.com/aposin/ng-aquila/commit/02e4685e1a2cf65ed712dd93ff37250a9715b20c))

### Features

-   **context-menu:** add selection menu reference ([5ac733e](https://github.com/aposin/ng-aquila/commit/5ac733e260165d71fcc588c5ad129b9293b96039))

## [13.3.1](https://github.com/aposin/ng-aquila/compare/v13.3.0...v13.3.1) (2022-04-07)

### Bug Fixes

-   **comparison-table:** teardown subscription and change detection ([e060040](https://github.com/aposin/ng-aquila/commit/e060040ccf7e1fe319e5f2cfd657a8f20af2148b))
-   **iso-date-adapter:** only load JS files to avoid webpack issue ([605df85](https://github.com/aposin/ng-aquila/commit/605df85e46dd017da6800e15349e3cb0738ce67d))

# [13.3.0](https://github.com/aposin/ng-aquila/compare/v13.2.0...v13.3.0) (2022-04-01)

### Bug Fixes

-   **compare-table:** hide popover when table is scrolling horizontally ([2b75c97](https://github.com/aposin/ng-aquila/commit/2b75c97492dccc1e1d6af7223b5b61ecf5c88cea))
-   **dropdown:** force active item to speak in screen-reader for a11y ([e682198](https://github.com/aposin/ng-aquila/commit/e6821989200088e940b37e781b0378d2ab255f47))
-   **dropdown:** use label viewValue fallback ([ea4f931](https://github.com/aposin/ng-aquila/commit/ea4f9311abe28cc51f259e197e4fe0b50ed1b71d))
-   **modal:** cdk re-focus open button on close ([3861518](https://github.com/aposin/ng-aquila/commit/3861518a1a093afa51c560d36ce03b64a3894676))

### Features

-   **autocomplete:** add scroll strategy provider ([7eb4634](https://github.com/aposin/ng-aquila/commit/7eb46340ea7dd864160d683e8c504fa32ae46302))
-   **dropdown:** multi-select i18n provider ([cf078d1](https://github.com/aposin/ng-aquila/commit/cf078d18ad458afd738ade605265047df2c4e245))
-   **dropdown:** truncate long text in dropdown ([40a53a8](https://github.com/aposin/ng-aquila/commit/40a53a8d67577286cb6115747192e2377781cb3b))
-   **multi-select:** add divider line when sorted ([aa51a07](https://github.com/aposin/ng-aquila/commit/aa51a07455222e686be05041fa366fd1728f7fe3))
-   **multi-select:** add option to disable select all/clear all ([2f5d181](https://github.com/aposin/ng-aquila/commit/2f5d18179bc52a8abe9d358a300c7e9c80de0f8c))
-   **config:** add scroll strategy provider module ([4785962](https://github.com/aposin/ng-aquila/commit/4785962c8bca89e458e3e1cef69afd1586225a24))
-   **config:** add scroll strategy provider module extra config ([5a999b8](https://github.com/aposin/ng-aquila/commit/5a999b8e4c0399518fd67d4eb718cc228ff52998))
-   **config:** add scroll strategy provider module override config ([c78c775](https://github.com/aposin/ng-aquila/commit/c78c775a3eecb5814835553002aaa6cc3892cf00))
-   **context-menu:** add scroll strategy provider ([10d6c2d](https://github.com/aposin/ng-aquila/commit/10d6c2dae79db062ba37be5a814f59bada3759a6))
-   **datefield:** add scroll strategy provider ([39987fd](https://github.com/aposin/ng-aquila/commit/39987fd5d5c6fbae5ce7d4d9bbbc258f830d2053))
-   **dropdown:** add scroll strategy provider ([bc1ae19](https://github.com/aposin/ng-aquila/commit/bc1ae19e038b2219cb097d91a2fbad9d3debe93c))
-   **notification-panel:** add scroll strategy provider ([2248cea](https://github.com/aposin/ng-aquila/commit/2248cea6c06d6915dc61764022b1dc16f5e1c865))
-   **overlay:** add scroll strategy provider ([048d7b7](https://github.com/aposin/ng-aquila/commit/048d7b7e893629b4f2ed01be9505c3dd71a4efe9))
-   **popover:** add scroll strategy provider ([1e4f89d](https://github.com/aposin/ng-aquila/commit/1e4f89d9fc084c3dceb2d99609c42e856a5eac1c))
-   **tooltip:** add scroll strategy provider ([6f320d9](https://github.com/aposin/ng-aquila/commit/6f320d9a9134f3ac3dedb0368c498ffa55817f34))

# [13.2.0](https://github.com/aposin/ng-aquila/compare/v13.1.0...v13.2.0) (2022-03-08)

### Bug Fixes

-   **formfield:** add a title attribute ([f35da28](https://github.com/aposin/ng-aquila/commit/f35da282d434004e4c70e8cdb7946467cc85f054))
-   **dropdown:** disabled option hover visuals ([9dcdb43](https://github.com/aposin/ng-aquila/commit/9dcdb43b3ed15441f28ae572224f01a85e9a191a))
-   **dropdown:** do not run value formatter on label ([fe2ca60](https://github.com/aposin/ng-aquila/commit/fe2ca60ef6e22418b5dd1c3b12fec20d6b13417a))
-   **dropdown:** fix keyboard selection ([9f19ea7](https://github.com/aposin/ng-aquila/commit/9f19ea79def377e4bde19b9c819e9f679eb86772))
-   **formfield:** bottom line color in readonly mode ([9623429](https://github.com/aposin/ng-aquila/commit/962342936ece13bf0e40e420d72ac4921d09e942))
-   **table:** disable zebra in expandable mode ([e3d91bd](https://github.com/aposin/ng-aquila/commit/e3d91bd5c6183bedb5888cd6554169cb43283cd2))

### Features

-   **autocomplete:** use generic element to support shadowDom ([9889791](https://github.com/aposin/ng-aquila/commit/9889791c996f3af052f63f1665e90971e283c7e1))
-   **swipebar:** move swipebar to own module ([7c3f348](https://github.com/aposin/ng-aquila/commit/7c3f348dfb04d0128f3582934ce9d84311d3eea2))

# [13.1.0](https://github.com/aposin/ng-aquila/compare/v13.0.0...v13.1.0) (2022-02-08)

### Bug Fixes

-   **dropdown:** add missing multi-select placeholder ([c64da50](https://github.com/aposin/ng-aquila/commit/c64da50c3fabbaea07769429d34ee5afd881c615))
-   **file-upload:** update errors on file remove ([59681ca](https://github.com/aposin/ng-aquila/commit/59681ca3842f03d1cb74396826580866707f2074))
-   **input-mask:** iban on-blur infinite validation loop ([0dff959](https://github.com/aposin/ng-aquila/commit/0dff9597ab2f515c92cdc830af240592a9e5ed1a))
-   **phone-input:** reset country code to correct initial value ([723a9d2](https://github.com/aposin/ng-aquila/commit/723a9d29096e14ab234196e2d00260ecd2ab8a00))
-   **radio-group:** move error message to bottom of group ([37e42cb](https://github.com/aposin/ng-aquila/commit/37e42cbe18c5247aa26a9d24686d550bda138d9e))
-   **sidepanel:** resolve circular dependency ([9474a14](https://github.com/aposin/ng-aquila/commit/9474a142292a4cb24744ecc3ffb59e6322190d7f))
-   **slider:** prevent clipping of value label ([557f16e](https://github.com/aposin/ng-aquila/commit/557f16ef993aa2b1c6ef929f9b91e0371a64fbd9))
-   **stepper:** add background to dot ([bc47d28](https://github.com/aposin/ng-aquila/commit/bc47d28c1c2b09e0a1ac478b31385f9ddff23391))
-   **table:** sort header icon spacing ([c37c045](https://github.com/aposin/ng-aquila/commit/c37c045d8bbc4ca1aa62109bb511fd9f52bf05fa))

### Features

-   **context-menu:** add possibility to open via right click ([c87c0b6](https://github.com/aposin/ng-aquila/commit/c87c0b6d4844d1d637c696e457735b754f754770))
-   **iso-date-adapter:** automatically fall back to valid dayjs locales ([75ed494](https://github.com/aposin/ng-aquila/commit/75ed494503d779d3543677b754bbb0d1f652044c))
-   **iso-date-adapter:** automatically lazy-load dayjs locales ([74fbbe1](https://github.com/aposin/ng-aquila/commit/74fbbe1284377c6963d0947bf3068d60ca714a6d))
-   **theming:** add support for web components ([53b171d](https://github.com/aposin/ng-aquila/commit/53b171dd585159b1b15133040a1a968cb414488a))

# [13.0.0](https://github.com/aposin/ng-aquila/compare/v13.0.0-next.0...v13.0.0) (2021-12-30)

We are officially releasing version 13 that is based on Angular 13. For updating please see our update guide: https://aposin.github.io/ng-aquila/guides/releases

### Highlights

#### Removal of IE support

Following the official Angular guidelines, with this release we are dropping support of Internet Explorer and removing all the code that was meant to support IE-only functionality and fix its issues.

#### Ivy compilation mode

Following the official Angular guidelines, starting with this release, the library is now being compiled with the ivy partial compilation mode.

#### Multi Select component

The new `nx-multi-select` supports selection of multiple items as well as filtering.

#### Data Display component

The new `nx-data-display` provides a description component that consists of a label and a value.

### BREAKING CHANGES

-   We have removed JS code and CSS specific to Internet Explorer, so make sure your project doesn't need IE support before migrating to v13. In case you still need to support IE, consider using our LTS v12.
-   **footer:** default paddings changed (to restore previous values, please refer to our release notes)

### Features

-   **footer:** variable paddings ([442fad4](https://github.com/aposin/ng-aquila/commit/442fad4ef8ca9978ae34a3d3b49da2b398b77383))

### Bug Fixes

-   **accordion:** remove outside spacing from mobile light accordion ([360f5dc](https://github.com/aposin/ng-aquila/commit/360f5dcf0b7abefd6c9ad4adb6d7ddb37963d5c9))
-   **comparison-table:** update cell clipping if mayStick property of header row changes ([b338b03](https://github.com/aposin/ng-aquila/commit/b338b03a5d8e0a0adac3cc507a6418f4f9872ae2))
-   **dropdown:** flip chevron when open ([1c52a95](https://github.com/aposin/ng-aquila/commit/1c52a95ddd271879329a63646de3c2e5c5201404))
-   **file-uploader:** fix a11y by adding missing label references ([74b23e1](https://github.com/aposin/ng-aquila/commit/74b23e1f15b459994906bf049644a3359485a3f7))
-   **table:** prevent clicks on interactive elements to select row ([09b3d6a](https://github.com/aposin/ng-aquila/commit/09b3d6ae572b6370fdca0079176dcc7906538aa3))
-   **tree:** freezing when collapsing focused item ([7e8f824](https://github.com/aposin/ng-aquila/commit/7e8f824c50efe0e2dd0c9b8e27e42071d6d5a9f1))

# [13.0.0-next.0](https://github.com/aposin/ng-aquila/compare/v12.2.2...v13.0.0-next.0) (2021-12-17)

To install this version, run `npm install @allianz/ng-aquila@next`.

### Features

-   **multi-select:** add new component ([ee85087](https://github.com/aposin/ng-aquila/commit/ee85087bc46cc57d0d2e74dffcc6c298813738c0))
-   **data-display:** add new component ([e71281b](https://github.com/aposin/ng-aquila/commit/e71281bbc3f0171cc28a6b52c280c894af74ad5b))

## [12.2.2](https://github.com/aposin/ng-aquila/compare/v12.2.1...v12.2.2) (2021-12-21)

### Bug Fixes

-   **sidebar:** adapt compatibility sidebar toggle margin fix ([dc5d293](https://github.com/aposin/ng-aquila/commit/dc5d2935ca3191a04eaf1891f74ac033d3c4f411))

## [12.2.1](https://github.com/aposin/ng-aquila/compare/v12.2.0...v12.2.1) (2021-12-07)

### Bug Fixes

-   **accordion:** correct paddings and add missing css variables ([0f7a231](https://github.com/aposin/ng-aquila/commit/0f7a23132ddc0d1a9e2e572490be03fa1c21a563))
-   **circle-toggle:** remove forced layout for expert style ([9c5bc54](https://github.com/aposin/ng-aquila/commit/9c5bc544b995b925386235f4b3454c72695593fd))
-   **context-menu:** fix keyboard focus ([f48e824](https://github.com/aposin/ng-aquila/commit/f48e82448809416497cb95995e3d7f8a2cf629ea))
-   **context-menu:** open by trigger in shadow dom ([97991e8](https://github.com/aposin/ng-aquila/commit/97991e81296661f27e3f6e0a3422be786b6899d4))
-   **dropdown:** prevent false focus visuals ([060c09f](https://github.com/aposin/ng-aquila/commit/060c09f16465af7152d9c0d93b83b7078109b7ca))
-   **formfield:** connection container position ([31d1fae](https://github.com/aposin/ng-aquila/commit/31d1fae419b5d990fa7875f5c34ce2fb3f7dc041))
-   **input:** change autosized textarea box sizing ([9febc8c](https://github.com/aposin/ng-aquila/commit/9febc8c8b569df34cfa0cf22594e5445b158580d))
-   **sidebar:** toggle button exception for compatibility stylesheet ([bac8599](https://github.com/aposin/ng-aquila/commit/bac85996c1240572ee2b78f8438246450dc67ddf))

# [12.2.0](https://github.com/aposin/ng-aquila/compare/v12.1.1...v12.2.0) (2021-10-27)

### Bug Fixes

-   **accordion:** light mobile padding ([5607d47](https://github.com/aposin/ng-aquila/commit/5607d47c99f9428c683e0cc5ef0739e0457d97e3))
-   **dropdown:** check keymanager initialization ([14bb4d2](https://github.com/aposin/ng-aquila/commit/14bb4d27988dee45b29b634e815a669c70ba636e))
-   **licence-plate:** fix prefix radius ([189dd82](https://github.com/aposin/ng-aquila/commit/189dd82c59fab9a665872c32f18383ddf3b092db))
-   **list:** set default size when input is empty ([85f18f5](https://github.com/aposin/ng-aquila/commit/85f18f516e94282a67a0d7f7dd68e0a1e98443d6))
-   **modal:** restore focus in shadow dom ([85191d3](https://github.com/aposin/ng-aquila/commit/85191d3b77e33af3b711a48c1383cf09bc1985d5))
-   **plain-button:** implement nxtriggerbutton ([f2fb505](https://github.com/aposin/ng-aquila/commit/f2fb50551e323c870fd1f7a55a63d9c7947cc1ba))
-   **docs:** fix stackblitz examples ([baff785](https://github.com/aposin/ng-aquila/commit/baff7858c83ab018c10b194aef12d006626e5c57))
-   **table:** do not prevent space input on textarea ([66b0c9c](https://github.com/aposin/ng-aquila/commit/66b0c9c21fee75065f0e5b695365d6f89b743677))

### Features

-   **comparison-table:** allow to opt-out of sticky header row ([b972561](https://github.com/aposin/ng-aquila/commit/b9725612cfe1bb2ed111e0ef73c2cd9968b28297))

## [12.1.1](https://github.com/aposin/ng-aquila/compare/v12.1.0...v12.1.1) (2021-09-30)

### Bug Fixes

-   **comparison-table:** adjust checkmark color ([d218b95](https://github.com/aposin/ng-aquila/commit/d218b95ca17ba47205ed0c2808b315142c8fbba5))
-   **licence-plate:** fix prefix color ([86d1249](https://github.com/aposin/ng-aquila/commit/86d1249e2e264f59fb9e4999f3b5b00074cc7f40))

# [12.1.0](https://github.com/aposin/ng-aquila/compare/v12.0.0...v12.1.0) (2021-09-22)

### Bug Fixes

-   **formfield:** limit out of bounds resizing of textarea ([fd1edd9](https://github.com/aposin/ng-aquila/commit/fd1edd94d5280c5391387b9b61f8ff9c28c885ab))
-   **formfield:** remove label z-index ([bec95d7](https://github.com/aposin/ng-aquila/commit/bec95d709617af9777ed15b3dbfded57dfc7605f))
-   **icon:** clear svg when changing to icon font ([e322c61](https://github.com/aposin/ng-aquila/commit/e322c6129f56840b2d66a5cf075e1352472eb07c))
-   **pagination:** ondestroy check ([62eca10](https://github.com/aposin/ng-aquila/commit/62eca109f8d6ed97ee3113b3f8166c296cf2684e))
-   **phone-input:** change default dropdown label ([682f932](https://github.com/aposin/ng-aquila/commit/682f9329d269fc376b29ebce8bd9d4b2cd236a4a))
-   **phone-input:** update model when country changed ([20e2f3b](https://github.com/aposin/ng-aquila/commit/20e2f3b073268f056e2ffac94ca05bd0d101488a))
-   **table:** apply zebra color only to tbody ([8cd3006](https://github.com/aposin/ng-aquila/commit/8cd300684f98e7d94b21e3744f12767436581da6))
-   **table:** sticky column styles ([70451f6](https://github.com/aposin/ng-aquila/commit/70451f6d40d4630d2efaf532c7d47384a6e9947c))

### Features

-   **licence-plate:** add component ([07594fd](https://github.com/aposin/ng-aquila/commit/07594fd5d03f3801961a85af38d09e8bd64df713))

# [12.0.0](https://github.com/aposin/ng-aquila/compare/v12.0.0-next.0...v12.0.0) (2021-09-02)

We are officially releasing version 12 that is based on Angular12. For updating please see our update guide: https://aposin.github.io/ng-aquila/guides/releases

### Bug Fixes

-   **accordion:** adjust expert body padding ([cb6d6f5](https://github.com/aposin/ng-aquila/commit/cb6d6f5929abc3eed21d77d8504528d1af08d7cd))
-   **selectable-card:** error state change ([b06db80](https://github.com/aposin/ng-aquila/commit/b06db80a79fdfb89ebc263529c46af7ceb3f3011))
-   **selectable-card:** remove expert active style ([f7e2f10](https://github.com/aposin/ng-aquila/commit/f7e2f1017fe25e2a250403f4188ce5d7048a8441))
-   **small-stage:** image alignment ([afc2cdc](https://github.com/aposin/ng-aquila/commit/afc2cdce6f66f0ba146278fef654ed7820c36404))

### Features

-   **popover:** add i18n for close icon aria label ([92cb031](https://github.com/aposin/ng-aquila/commit/92cb03100e8c05d8d953c6ad220b85d5166c9cb0))
-   **dropdown:** adapt new expert styling ([edf2389](https://github.com/aposin/ng-aquila/commit/edf238910049398c4500eda6921ba7605a0ac73a))
-   **progress-stepper:** hide labels in mobile view when undefined ([bfedc4b](https://github.com/aposin/ng-aquila/commit/bfedc4be4a3542049e8370e39c3e4c30d607774c))

# [12.0.0-next.0](https://github.com/aposin/ng-aquila/compare/v11.7.3...v12.0.0-next.0) (2021-08-09)

To install this version, run `npm install @allianz/ng-aquila@next`.

### Features

-   update to angular 12 ([caded36](https://github.com/aposin/ng-aquila/commit/caded36caf4f20c285162a1e3f5f8950024170ef))

### Bug Fixes

-   **accordion:** unify content padding ([65e46cc](https://github.com/aposin/ng-aquila/commit/65e46ccef971adc04e4e7d7efba3b6608b3e210e))
-   **progress-stepper:** cdk typings change ([c82d7f2](https://github.com/aposin/ng-aquila/commit/c82d7f20b47d833d6ea85935eeca0efb2e1c04cd))

## [11.7.3](https://github.com/aposin/ng-aquila/compare/v11.7.2...v11.7.3) (2021-07-27)

### Bug Fixes

-   **docs:** stackblitz link ([5ed228c](https://github.com/aposin/ng-aquila/commit/5ed228c1c59af6c2b9ca0c0dd9a9a779d5b0a0e1))

## [11.7.2](https://github.com/aposin/ng-aquila/compare/v11.7.1...v11.7.2) (2021-07-27)

### Bug Fixes

-   **code-input:** spinners in firefox ([e1d9ac4](https://github.com/aposin/ng-aquila/commit/e1d9ac4b94d4907e79ac8d305b57af50ae9c2e95))

## [11.7.1](https://github.com/aposin/ng-aquila/compare/v11.7.0...v11.7.1) (2021-07-23)

### Bug Fixes

-   **code-input:** underlines on ios ([32a273b](https://github.com/aposin/ng-aquila/commit/32a273bd33b1a82fff8833a62b2f16ccc6799105))
-   **docs:** fix theme switcher ([bdb050d](https://github.com/aposin/ng-aquila/commit/bdb050d451c23c967784ffd7119cdb54afb865a0))

# [11.7.0](https://github.com/aposin/ng-aquila/compare/v11.6.0...v11.7.0) (2021-07-19)

### Bug Fixes

-   **peer-dependencies:** add i18n-iso-countries peer dependency ([4cd8c55](https://github.com/aposin/ng-aquila/commit/4cd8c5518412da3e44ef9c357239a7e08ac1835d))

### Features

-   **circle-toggle:** expert appearance ([3f7909f](https://github.com/aposin/ng-aquila/commit/3f7909fdb09f324330f4192e765007e81b9494e4))
-   **dropdown:** lazy rendering ([f28fa3a](https://github.com/aposin/ng-aquila/commit/f28fa3a53cb08b0cfe64e77d35b91d1ff6f74369))
-   **sidebar:** maxwidth property ([20e357e](https://github.com/aposin/ng-aquila/commit/20e357e061320dc6e46eae64e027c7b6c6859e69))
-   **small-stage:** add default config to expert module ([d9f68d3](https://github.com/aposin/ng-aquila/commit/d9f68d3a93c16d4fa794387bdbbd427a473880ba))

# [11.6.0](https://github.com/aposin/ng-aquila/compare/v11.5.0...v11.6.0) (2021-06-24)

### Bug Fixes

-   **checkbox-group:** reset values with empty array ([1bf4fa9](https://github.com/aposin/ng-aquila/commit/1bf4fa9a844302f3e4221a17b918f3dc649d2768))

### Features

-   **docs:** add starter app ([c0ed1e4](https://github.com/aposin/ng-aquila/commit/c0ed1e45a06393e866f09b0e28f8ebb46e7443c2))
-   **comparison-table:** add hidden columns feature ([db2a9fe](https://github.com/aposin/ng-aquila/commit/db2a9fec20e60c86aba7ed5344b4ebbb11351e61))
-   **small-stage:** refine component ([d58bc2e](https://github.com/aposin/ng-aquila/commit/d58bc2e13c53408dfc8a9e6f1e0df19957540ad8))

# [11.5.0](https://github.com/aposin/ng-aquila/compare/v11.4.0...v11.5.0) (2021-06-10)

### Bug Fixes

-   **circle-toggle:** remove bottom padding ([012923b](https://github.com/aposin/ng-aquila/commit/012923ba7ee132a3207562dd2390a091fb9a52d9))

### Features

-   **breadcrumb:** add link appearance ([303b7b1](https://github.com/aposin/ng-aquila/commit/303b7b1f0e4c543e7b2ef3e33296b104c19ff90a))
-   **message:** align styling of message, message banner & message toast ([9493eae](https://github.com/aposin/ng-aquila/commit/9493eaeecd9b8c412037b36ccbc8ab8946055e50))
-   **scroll-indicator:** add scroll indicator component ([a3f9151](https://github.com/aposin/ng-aquila/commit/a3f9151cdb1446c37cfba45004d3d235ec3620e8))
-   **slider:** hide min and max labels ([dc09449](https://github.com/aposin/ng-aquila/commit/dc094492fa42406c67d56ddd80b488ed7a87e75c))
-   **table:** add sticky columns feature ([b6ea02c](https://github.com/aposin/ng-aquila/commit/b6ea02cc3e9254b0d42908c0575b45720de10397))
-   **tabs:** add hover and active styles ([707a63a](https://github.com/aposin/ng-aquila/commit/707a63a7965966554ec988164f491217d4ccee8c))

# [11.4.0](https://github.com/aposin/ng-aquila/compare/v11.3.0...v11.4.0) (2021-05-18)

### Bug Fixes

-   **datefield:** use moment.utc() for creating dates ([5cebca0](https://github.com/aposin/ng-aquila/commit/5cebca0fdbd8da669ce975fc925229289b23f321))
-   **file-uploader:** reset native value ([dfc87cf](https://github.com/aposin/ng-aquila/commit/dfc87cf0861cdefe4e5bf8278a28aca94f571c59))
-   **grid:** support dynamic input bindings ([b02f6b6](https://github.com/aposin/ng-aquila/commit/b02f6b685eca86ed1d02091a03c6339ea5f10fe6))
-   **phone-input:** mark component for check when form value is changed ([62595a9](https://github.com/aposin/ng-aquila/commit/62595a9f91f7e2ecad60305a18187b98bd4e6fe1))
-   **popover:** cleanup event listeners to avoid memory leaks ([2fd400f](https://github.com/aposin/ng-aquila/commit/2fd400f36d4b0a6cf4f71452d19cea96c3cff905))
-   **popover:** querying text node with preserveWhitespaces ([4ada217](https://github.com/aposin/ng-aquila/commit/4ada21732b8c0ea7cbb75cb0d1b37bd449a67226))
-   **table:** improve screenreader experience for sorting ([d191797](https://github.com/aposin/ng-aquila/commit/d1917974ccd9e3073ce5b3b2ec714107df020d97))

### Features

-   **grid:** add nopadding option for grid ([0b5fc77](https://github.com/aposin/ng-aquila/commit/0b5fc77f5d3afcc8cca55afd09ede9f66ce560af))
-   **phone-input:** add rtl support ([af77264](https://github.com/aposin/ng-aquila/commit/af7726464922eac2f987447205c37256971a5c16))
-   **selectable-card:** add retail selectable card ([b55c00a](https://github.com/aposin/ng-aquila/commit/b55c00a695ab15e77ba790b057b8c52d8b39a8f7))
-   **utils:** add classes to hide elements ([10b56cd](https://github.com/aposin/ng-aquila/commit/10b56cd39de8822a6df91723721077296b097258))
-   **small-stage:** add default small stage background token ([d5a9f4d](https://github.com/aposin/ng-aquila/commit/d5a9f4d06d24b384ede2e169ba48d2bac0792481))

# [11.3.0](https://github.com/aposin/ng-aquila/compare/v11.2.0...v11.3.0) (2021-03-31)

### Tabs changes

The structure of the **tabs component** slightly changed. If you're using a tab-group which is aligned to the left and not centered, you need to modify the custom css and change `.nx-tab-header` to `nx-tab-header`:

```
:host ::ng-deep nx-tab-header {
  justify-content: flex-start!important;
}
```

### Bug Fixes

-   **card:** prevent header contents overflowing icon ([91ebb2c](https://github.com/aposin/ng-aquila/commit/91ebb2c46b2bde3b9e381c9f6709ecffedf94dbb))
-   **checkbox:** add checkbox indeterminate fill color ([522a6f4](https://github.com/aposin/ng-aquila/commit/522a6f475bf70374d883a7d7dc2592e669dca4b5))
-   **comparison-table:** use plain button for info icons, update popular cell theming tokens ([ce1ecbb](https://github.com/aposin/ng-aquila/commit/ce1ecbb7d2211ccef9aa36a8851985940ae67632))
-   **sidebar:** drag animation is visible again ([0fc1318](https://github.com/aposin/ng-aquila/commit/0fc13187607294dfbee8723e2256ec8057b381f2))
-   **small-stage:** add theming token for text color ([75c410a](https://github.com/aposin/ng-aquila/commit/75c410a6cb792108c35cf756750d033ffba67ac9))
-   **table, formfield:** remove padding from formfields inside table and add example ([ad7e21d](https://github.com/aposin/ng-aquila/commit/ad7e21d0bcad004d3afa7814c199bb9d7c4ac3bc))

### Features

-   **card:** show icon outline for expert when card not selected ([e72aea9](https://github.com/aposin/ng-aquila/commit/e72aea9e01404fe9006b2719a42e9a6a976d15c9))
-   **dropdown:** add custom overlay label ([6670b31](https://github.com/aposin/ng-aquila/commit/6670b314131fe0de5fbb188327c3652a71b4ade3))
-   **phone-input:** add component ([d51e888](https://github.com/aposin/ng-aquila/commit/d51e888e0fe7197def8b162e44e61e2a1d16c244))
-   **table:** add isExpanded input for nxExpandableTableRow ([5916a1a](https://github.com/aposin/ng-aquila/commit/5916a1a0326bd95b364c7a49a35b6b3d563a1b75))
-   **tabs:** implement scrolling behavior of tabs header ([699adc9](https://github.com/aposin/ng-aquila/commit/699adc939576c0c1148d4685d78acccdf563c1d6))

# [11.2.0](https://github.com/aposin/ng-aquila/compare/v11.1.0...v11.2.0) (2021-03-15)

For the **sidepanel component** there was introduced the wrapping `nx-sidepanel-outer-container` component. The standalone sidepanel without a wrapper is deprecated. Please check the [documentation of the sidepanel](https://aposin.github.io/ng-aquila/documentation/sidepanel/overview) for more information.

For the **tree component** there was a `nxTreeNodeActionItem` directive introduced. It should be added on actionable items (i.e. links, checkboxes, etc.) within the tree for better accessibility. Please check the [documentation of the tree](https://aposin.github.io/ng-aquila/documentation/tree/overview) for more information.

### Bug Fixes

-   **button:** stop relying on attributes for styling ([e4d5f87](https://github.com/aposin/ng-aquila/commit/e4d5f870e7d87c32fb20148a3b44cfb321afcfab))
-   **dropdown:** not showing errors in progress indicators ([e8b9b10](https://github.com/aposin/ng-aquila/commit/e8b9b1062b108e97c03e93b4aae94b94dc0c4234))
-   **popover:** scroll positioning ([b8c909d](https://github.com/aposin/ng-aquila/commit/b8c909d89aaba0d92ba6ac2db2bd533238b64533))
-   **system:** stop relying on attributes for styling ([e6c63b2](https://github.com/aposin/ng-aquila/commit/e6c63b26f18ec9c5e5202a03fb188f8f270872e1))

### Features

-   **button:** add anchor buttons ([6919587](https://github.com/aposin/ng-aquila/commit/69195873abb5f0cd73b2d5d474170e58a2af0fea))
-   **comparison-table:** support expert theme ([c66e9ec](https://github.com/aposin/ng-aquila/commit/c66e9ecce2b82a6337d671a4f816f71c46f2be6b))
-   **indicator:** positioning enhancements ([61ad282](https://github.com/aposin/ng-aquila/commit/61ad2820543beb5528950551be85d1dd39f459e3))
-   **sidepanel:** introduce wrapper container around sidepanel ([e07ed18](https://github.com/aposin/ng-aquila/commit/e07ed18ea1a07155d324452bb68a0df466bd3a2b))
-   **tree:** keyboard navigation ([f401de8](https://github.com/aposin/ng-aquila/commit/f401de860b9c868ca756c0bbf6df84e9db18b5da))

# [11.1.0](https://github.com/aposin/ng-aquila/compare/v11.0.1...v11.1.0) (2021-03-01)

### Bug Fixes

-   **avatar:** focus style not visible in high contrast on edge ([a54ed9b](https://github.com/aposin/ng-aquila/commit/a54ed9b2db530c38b9d234d20b7f4ccd2fa048a7))
-   **comparison-table:** scroll element into view when hidden by header ([177faca](https://github.com/aposin/ng-aquila/commit/177facaf9bc98cdab9cd3d870cbc64a421958a76))
-   **context-menu:** update styling of keyboard focus ([416ad77](https://github.com/aposin/ng-aquila/commit/416ad775b120032c7d6bdf437e8eaa4970648e30))
-   **formfield:** apply expert placeholder styles to textarea ([aa89c37](https://github.com/aposin/ng-aquila/commit/aa89c37eb0c233123cf6fa5b089acf4cdf830289))
-   **formfield:** autofill style when using appearance is outline ([e105a79](https://github.com/aposin/ng-aquila/commit/e105a797acf7c7367f1bfae645fd6d8aa069f5e1))
-   **progress-stepper:** truncate long labels ([7bb06fd](https://github.com/aposin/ng-aquila/commit/7bb06fd1547aaa1101966b6287bb67766e491dcf))
-   **tooltip:** update padding ([2725c01](https://github.com/aposin/ng-aquila/commit/2725c018368c580659088666e4aa0df565386c71))

### Features

-   **progress-indicator:** improve a11y for multi-stepper ([d8e6b70](https://github.com/aposin/ng-aquila/commit/d8e6b70c0fbe2866bc8182a0e11d6b613571f64c))
-   **small-stage:** design feedback based enhancements ([7f363bd](https://github.com/aposin/ng-aquila/commit/7f363bdc1b0178b05748410795b2a07439a160d1))

## [11.0.1](https://github.com/aposin/ng-aquila/compare/v11.0.0...v11.0.1) (2021-02-08)

### Bug Fixes

-   **icon-registry:** throw proper error if HttpClient is missing ([86c6f69](https://github.com/aposin/ng-aquila/commit/86c6f69204110db4ebceb6364ac3d0c494508ef8))
-   **popover:** handle document clicks in shadow dom ([14025df](https://github.com/aposin/ng-aquila/commit/14025dfc63f3d805fb7c52be0e13ae356d87bc4e))
-   **tooltip:** add input to allow selection of text in trigger ([f12b99e](https://github.com/aposin/ng-aquila/commit/f12b99eb627709c7f00f26c37ac53c258d432b55))
-   **various:** high contrast on Chromium Edge ([1ade45c](https://github.com/aposin/ng-aquila/commit/1ade45cd69be90e71cbba921eb9fbd2baf27d7fe))
-   **various:** high contrast on Chromium Edge ([7858f2f](https://github.com/aposin/ng-aquila/commit/7858f2f3b5b672a611e1f166878e6751f3c82c3d))
-   **various:** high contrast on Chromium Edge ([3eaa23d](https://github.com/aposin/ng-aquila/commit/3eaa23d58375cf9ea884d171a7141409519feabf))

# [11.0.0](https://github.com/aposin/ng-aquila/compare/v10.9.0...v11.0.0) (2021-01-29)

### Highlights

#### Removal of outer default margins

In this release we removed some default outer margins of components that were coming from the early days of the library and do not match the many different scenarios and layouts where these components are used. You are free to set a margin appropriate to your designs. As this can potentially mean visual changes we provide a compatibility css file that restores the former default margins. See the BREAKING CHANGES section below or the [update guide](https://aposin.github.io/ng-aquila/guides/releases) for more details and how to use the compatibility css.

#### Deprecation removals

After quite some time we cleaned up a lot of deprecations. We tried our best to migrate these deprecations during `ng update` or give you a warning in case you have to update manually.

#### Small stage

The small stage was extended to be used in both expert and retail scenarios. It should give you a lot of flexibility now to create the best experience for the end user. For that some adjustments have to be made as the code prior to this release is not working anymore. You find all relevant code examples in the documentation.

### Bug Fixes

-   **breakpoints:** correct breakpoints and improve comments ([bec4636](https://github.com/aposin/ng-aquila/commit/bec4636d1546f583b2f22bdac9733a61e6609da3))
-   **button:** high contrast on chromium edge ([f65ab98](https://github.com/aposin/ng-aquila/commit/f65ab9828bad5c85159cc6f5a59d4d308347fbdc))
-   **checkbox:** high contrast on chromium edge ([a049888](https://github.com/aposin/ng-aquila/commit/a0498884ed957258a9b4f6a8f08947e6945e22f0))
-   **context-menu:** icons still have auto size ([cf20b17](https://github.com/aposin/ng-aquila/commit/cf20b17ed01ff2e9a99d2fbacf7bd9cd0d65b197))
-   **file-uploader:** add missing styles for components ([d8b7095](https://github.com/aposin/ng-aquila/commit/d8b70953c386d2880ff7a6f56e20532c13b82d2b))
-   **focus-styles:** high contrast on chromium edge ([d96a2cb](https://github.com/aposin/ng-aquila/commit/d96a2cba6491987b1148ba4403a67c5e500d584c))
-   **icon:** align to center ([b9a4b08](https://github.com/aposin/ng-aquila/commit/b9a4b08d96cc72bcae7b18ee1e60324f07792a00))
-   **iso-date-adapter:** use formats without separators first ([dac1128](https://github.com/aposin/ng-aquila/commit/dac11287b6f846b6bea17cf96cd07f25d7bf1f89))
-   **margin-classes:** add nx-margin-x-0 and nx-margin-y-0 classes ([d13370a](https://github.com/aposin/ng-aquila/commit/d13370ae9c8cb24261ea70747bb8503a5a565b8b))
-   **margin-classes:** only affect horizontal/vertical margins when using x/y ([f54ecc1](https://github.com/aposin/ng-aquila/commit/f54ecc1b35e6b9e740bc7f5782e6623776d3f0b4))
-   **progress-stepper:** match type of \_stepHeader with CDK ([0ced970](https://github.com/aposin/ng-aquila/commit/0ced970480ca163a975f15113d402b45c0f7f961))
-   **radio-button:** high contrast on chromium edge ([221ea41](https://github.com/aposin/ng-aquila/commit/221ea417948733e6720257818088692d09bcdc1b))
-   **radio-toggle:** high contrast on chromium edge ([0aa4b0d](https://github.com/aposin/ng-aquila/commit/0aa4b0daa138e3f8517960dfda91ffa66899c3be))
-   **schematics:** update to new CLI api ([d5286de](https://github.com/aposin/ng-aquila/commit/d5286deef5dbce20b3925bb48082d5cd36b12ad7))
-   **switcher:** high contrast on chromium edge ([b038b69](https://github.com/aposin/ng-aquila/commit/b038b6962fcad0cbabbb8ad6ea6c8fae222463f8))

### Code Refactoring

-   remove deprecations without automatic update ([c5a7830](https://github.com/aposin/ng-aquila/commit/c5a78308c848f85c54800022c1ebd41a6fd85513))
-   remove various deprecations ([1084f82](https://github.com/aposin/ng-aquila/commit/1084f8297bbb95e02a53b718b01150ae2e9255ed))

### Features

-   remove default outer margins from components ([778f43a](https://github.com/aposin/ng-aquila/commit/778f43ac4900d05e7467d70c84d44a6328ad0d51))
-   **file-uploader:** add maxFileNumber validation ([e6a1af9](https://github.com/aposin/ng-aquila/commit/e6a1af93c98ef010658660c84d30d010ba0dae98))
-   **file-uploader:** custom file item templates ([690aa98](https://github.com/aposin/ng-aquila/commit/690aa9871750bef9a80cd98094ded8e3f8b99f18))
-   update to Angular 11 ([7157dfd](https://github.com/aposin/ng-aquila/commit/7157dfd6fb7c38659ba1bd6e143b5103efe275de))
-   **small-stage**: rewrite to support retail ([dd7e22e](https://github.com/aposin/ng-aquila/commit/dd7e22e91bbd23ff113e080cdd2b64ada88b9db7))

### BREAKING CHANGES

-   **small-stage**: the component was refactored to support both retail and expert, the changes in detail contain:
    -   The `contentNarrow` input of `nx-small-stage` was renamed to `narrow` and moved to the `nx-small-stage-content` directive.
    -   The `offsetEnd` input of `nx-small-stage` was moved to the `nx-small-stage-end-image` directive.
    -   The `inputUrl` input of `nx-small-stage` was renamed to `src` and moved to the `nx-small-stage-end-image` directive.
    -   The `small-stage-image-container-padding-start` theming token was renamed to `small-stage-image-container-padding-to-content`.
    -   The `small-stage-background-color` theming token was removed. Please set the background-color directly with css.
-   **comparison-table**: removed the `label` input, use `labelCollapsed` instead
-   **datefield**: removed the `getPopupConnectionElementRef`method, use `getConnectedOverlayOrigin` instead
-   **datefield**: removed the `calendarHeader` property from `NxDatepickerIntl`, use `switchToMultiYearViewLabel` instead
-   **dropdown**: removed the `nxAriaLabel` input. Accessibility for dropdown is achieved with aria-labelledby that is set automatically
-   **progress-indicator**: removed the `title` input for all progress-indicators. Use a `nx-label` element as content to the indicator instead. Example:

```
  <nx-single-stepper currentStepLabel="Step">
    <nx-label>My Title</nx-label>
    ...
  </nx-single-stepper>
```

-   The outer margins of components were removed. For an easier upgrade path we provide a `compatibility.css` file that restores the margins prior to this change. To use this add "node_modules/@allianz/ng-aquila/css/compatibility.css" to your styles in `angular.json`.

    The exact changes are:

    -   expansion-panel/accordion: Removed `margin-top: 16px` before the first expansion-panel inside an accordion.
    -   button: Removed `margin: 0 0 24px 0`.
    -   cards: Removed `margin-bottom: 24px` from the `nx-card` component and `margin-bottom: 8px` from the `nx-selectable-card` component.
    -   checkbox: Removed `margin-bottom: 16px`.
    -   copytext: Removed `margin: 0 0 32px 0`. The copytext now has a default `margin: 0`.
    -   dynamic-table: Removed `margin: 32px 0`.
    -   headlines: Removed `margin-bottom` from each headline size. The headlines now have a default `margin: 0`.
    -   lists: Removed `margin-bottom: 32px` from the list and `margin-bottom: 16px` from the last list item.
    -   notifications and errors: Removed `margin: 12px 0` from `nx-message`, `nx-message-banner` and `nx-error` (of type `message`). For the Message Toast the margin is still used.
    -   number-stepper: Removed `margin-top: 12px` if there is no label set.
    -   pagination: Removed `margin: 8px 0` from the Advanced Pagination (+ smaller screens: `margin: 8px 0 40px 0` ) and `margin: 16px 0` from the Simple Pagination (smaller screens: `margin: 40px 0`).
    -   taglist: Removed `margin-bottom: 32px` on the list. On the single tag items, there is still used a `margin-bottom`.

-   **margin-classes:** When using nx-margin-x-..., the vertical margins are no longer set to 0. When using nx-margin-y-..., the horizontal margins are no longer set to 0.
-   -   **card**: remove deprecated selectable, selected, disabled and selectedChange property. Please update to the `nx-selectable-card` component
-   **datefield**: remove deprecated format function which is not needed to be called anymore
-   **icon-registry**: remove deprecated `getSvgIcon` method. Use `getIcon` instead.
-   **radio-toggle**: remove deprecated `selection` setter

# [10.9.0](https://github.com/aposin/ng-aquila/compare/v10.8.0...v10.9.0) (2021-01-12)

As a documentation change there was added a link to stack-blitz for the examples.

### Bug Fixes

-   **avatar:** hover and active grey bloom changes text color ([28e9a1e](https://github.com/aposin/ng-aquila/commit/28e9a1e0034878f9fff2edcbe5089a39427f921c))
-   **context-menu:** adjust height of items and offset of submenus ([6c504e3](https://github.com/aposin/ng-aquila/commit/6c504e37ab406290fdcc6212f58e09a23f2abdbf))
-   **datefield:** parseError when input is empty ([d9be564](https://github.com/aposin/ng-aquila/commit/d9be5643ad35e7f9f658e26a243226ee1723a2df))
-   **datefield:** select correct year in adjacent cells in datepicker ([c954981](https://github.com/aposin/ng-aquila/commit/c954981d299000fdc2fc4fa8b642ecb323af1f05))
-   **file-uploader, formfield:** remove delay(0) ([340866f](https://github.com/aposin/ng-aquila/commit/340866fedca30340c4f6bba769776406ea8f5313))
-   **formfield:** remove font-weight on nx-icons ([f992b32](https://github.com/aposin/ng-aquila/commit/f992b32024ad7a9fe4767e17867cdc6e4e46e857))
-   **icon:** svg does not fit in flexbox space inside icon ([da71316](https://github.com/aposin/ng-aquila/commit/da713165a8a8c92f9d270f754beaaea42b416caf))
-   **side-navigation:** add missing padding-bottom ([11584cb](https://github.com/aposin/ng-aquila/commit/11584cb97440c9929ad5589f7ab25ac099fe9128))
-   **toggle-button:** allow reset values as radio values ([c2720b9](https://github.com/aposin/ng-aquila/commit/c2720b92cc08a94e84df92487667db66b20a8c24))

### Features

-   **checkbox:** add focus() method ([3cbb4bd](https://github.com/aposin/ng-aquila/commit/3cbb4bd1b52df0a286de1d6431da6d540dfb6716))
-   **circle-toggle:** add focus() method ([079d64d](https://github.com/aposin/ng-aquila/commit/079d64d3788601f842a8b800f13a726d3ac8bd03))
-   **radio-button:** add focus() method ([e3cd98b](https://github.com/aposin/ng-aquila/commit/e3cd98b9c454a6984ff8f5b58c5d1102e929077f))

# [10.8.0](https://github.com/aposin/ng-aquila/compare/v10.7.0...v10.8.0) (2020-12-21)

### Bug Fixes

-   **iso-date-adapter:** use the locale of the date adapter ([cd55c93](https://github.com/aposin/ng-aquila/commit/cd55c939f04c90d1c7bfe4567e592d6820d4d896))

### Features

-   **sidepanel:** add light color variant ([7b0959f](https://github.com/aposin/ng-aquila/commit/7b0959f219d0fe2844abff196c9136b4d91ad277))

# [10.7.0](https://github.com/aposin/ng-aquila/compare/v10.6.0...v10.7.0) (2020-12-14)

### Bug Fixes

-   **accordion:** proper margins for rtl extra-light ver ([59d692a](https://github.com/aposin/ng-aquila/commit/59d692a575582e1a1d7214da8853be86d03d39a4))
-   **accordion:** proper padding tokens for rtl ([a81706b](https://github.com/aposin/ng-aquila/commit/a81706ba1289efe7626757422a956d9dc17f2b0c))
-   **datefield:** no error when parsing invalid date ([57a28fc](https://github.com/aposin/ng-aquila/commit/57a28fc62625dd54b3c825439b3e847b48983475))
-   **formfield:** float label to start for outline formfields ([f068094](https://github.com/aposin/ng-aquila/commit/f06809420b9d939965854b62d8d167b23d91ab6b))
-   **tooltip:** add a11y styles to global css, update docs ([2ce3923](https://github.com/aposin/ng-aquila/commit/2ce392304d75da8a8fca0e689de76d827b529165))

### Features

-   **avatar:** add component ([0d075e8](https://github.com/aposin/ng-aquila/commit/0d075e8c973fa2e22bd30858848a39ba26b35cf2))
-   **comparison-table:** use CDK FocusMonitor for focus style ([85d47b8](https://github.com/aposin/ng-aquila/commit/85d47b8932ce46ee32a4ec396d758d79bbda3e05))
-   **indicator:** add indicator component ([3311a94](https://github.com/aposin/ng-aquila/commit/3311a9426305b635e1fe9f40e4b397a80252c498))
-   **various:** use CDK FocusMonitor for keyboard focus style ([587d86d](https://github.com/aposin/ng-aquila/commit/587d86d68e54dd14622bdb80726584c684e24b9b))

### Reverts

-   Revert "fix(tooltip): add a11y styles to global css, update docs (#151)" (#154) ([01b936c](https://github.com/aposin/ng-aquila/commit/01b936caf881a14fa00895dc7d936d1d564c66c7))

# [10.6.0](https://github.com/aposin/ng-aquila/compare/v10.5.0...v10.6.0) (2020-12-04)

### Bug Fixes

-   **moment-date-adapter:** moment is not a function error on StackBlitz ([14f0638](https://github.com/aposin/ng-aquila/commit/14f0638b7b5d9c9d47b1462108f8e7162c854208))
-   migration schema ([db7e08b](https://github.com/aposin/ng-aquila/commit/db7e08bbf0bc58a991149aae15c8c843fac42f14))
-   **slider:** prevent focus when disabled ([b7ac7ef](https://github.com/aposin/ng-aquila/commit/b7ac7ef6c1451a0ca6400cebbfccfd0764cae3f7))

### Features

-   **autocomplete:** allow dynamic dir switching ([bb1c7b0](https://github.com/aposin/ng-aquila/commit/bb1c7b054fb85616abefb11830eea77c52ed1e88))
-   **context-menu:** allow dynamic dir switching ([8e04f09](https://github.com/aposin/ng-aquila/commit/8e04f09fb3ee123dd47f80124c1d2d0646b7a957))
-   **datepicker:** allow dynamic dir switching ([5b1624e](https://github.com/aposin/ng-aquila/commit/5b1624ec4b9bbe313294bca8a80e0c5ac637dc48))
-   **modal:** allow dynamic dir switching ([a8c1616](https://github.com/aposin/ng-aquila/commit/a8c16164c82088c4d59a914718a18578b0d47af6))
-   **pagination:** allow dynamic dir switching ([ae7a65e](https://github.com/aposin/ng-aquila/commit/ae7a65e38e5e555bbcd7ebdcfc682060808080b2))
-   **popover:** allow dynamic dir switching ([6890385](https://github.com/aposin/ng-aquila/commit/6890385089fe336bb3a80038eb6052e6b06e0e6f))
-   **tooltip:** allow dynamic dir switching ([79e37c3](https://github.com/aposin/ng-aquila/commit/79e37c34ed652ced407e8c421ef1943f09575b7c))
-   **various:** use CDK FocusMonitor for keyboard focus style ([ec47e38](https://github.com/aposin/ng-aquila/commit/ec47e388c698b6ec7349c48ce9ef26508785e31c))
-   **various:** use CDK FocusMonitor for keyboard focus style ([aa48a39](https://github.com/aposin/ng-aquila/commit/aa48a392dd53abbbb83f1b219696ff23fa4f8bf3))

# [10.5.0](https://github.com/aposin/ng-aquila/compare/v10.4.1...v10.5.0) (2020-11-19)

### Bug Fixes

-   **comparison-table:** use clip-path for sticky behaviour ([e812ccd](https://github.com/aposin/ng-aquila/commit/e812ccd5195805f33f2b4e0f0e7af7664f92dbf2))
-   **popover:** proper rtl positioning ([e09a7cd](https://github.com/aposin/ng-aquila/commit/e09a7cd276e6dd2877ba73c1cced3c9584a371d4))

### Features

-   **various:** use CDK FocusMonitor for keyboard focus style ([dfc2e79](https://github.com/aposin/ng-aquila/commit/dfc2e79a0699de0824fabe95e3fd870bda53ecf0))

## [10.4.1](https://github.com/aposin/ng-aquila/compare/v10.4.0...v10.4.1) (2020-11-11)

### Bug Fixes

-   **accordion:** chevron loses size ([090cc93](https://github.com/aposin/ng-aquila/commit/090cc93a538da0a2b3bbffa284be516eb4a4fef2))
-   **comparison-table:** not updating when parent is onPush ([52c6b69](https://github.com/aposin/ng-aquila/commit/52c6b697192b752eb806fba0db238e5bf29e076c))
-   **file-uploader:** file cannot be added in single input in IE ([a3f7a18](https://github.com/aposin/ng-aquila/commit/a3f7a184dd2997daf17438c2851ed4aec513ade3))

# [10.4.0](https://github.com/aposin/ng-aquila/compare/v10.3.0...v10.4.0) (2020-11-04)

### Bug Fixes

-   **autocomplete:** overlay being opened too small ([5fbbe9a](https://github.com/aposin/ng-aquila/commit/5fbbe9adfd471204006ab7a121981180589ca936))
-   **popover:** not applying direction classes correctly ([fe39d81](https://github.com/aposin/ng-aquila/commit/fe39d814a8f13794ab233ab379d872451a16b0b6))

### Features

-   **context-menu, notification-panel:** set trigger button as active ([6ffd738](https://github.com/aposin/ng-aquila/commit/6ffd738c295bb81595a0627d342fedcac2ab100b))
-   **iso-date-adapter:** add new adapter ([50c36d5](https://github.com/aposin/ng-aquila/commit/50c36d5349956925d6e52061e260af300742b3e1))

<a name="10.3.0"></a>

# [10.3.0](https://github.com/aposin/ng-aquila/compare/v10.2.0...v10.3.0) (2020-10-21)

### Bug Fixes

-   **plain-button:** remove browser focus outline ([67bcb60](https://github.com/aposin/ng-aquila/commit/67bcb60))

### Features

-   **notification-panel:** add new component ([ef30e5c](https://github.com/aposin/ng-aquila/commit/ef30e5c))
-   **small-stage:** introduce component ([b0035b6](https://github.com/aposin/ng-aquila/commit/b0035b6))

<a name="10.2.0"></a>

# [10.2.0](https://github.com/aposin/ng-aquila/compare/v10.1.0...v10.2.0) (2020-10-16)

### Bug Fixes

-   letter-spacing token for extra-light accordion and comparison-table ([59cf1f6](https://github.com/aposin/ng-aquila/commit/59cf1f6))
-   **circle-toggle:** group does not recognize toggle-button descendants ([46f6dca](https://github.com/aposin/ng-aquila/commit/46f6dca))
-   **comparison-table:** correct aria-colspan on toggle-section headers ([e6c3740](https://github.com/aposin/ng-aquila/commit/e6c3740))
-   **comparison-table:** remove doubled rowgroup role ([c9160c1](https://github.com/aposin/ng-aquila/commit/c9160c1))
-   **link:** new option for using an icon with no text ([f01a7b6](https://github.com/aposin/ng-aquila/commit/f01a7b6))
-   **modal:** add border to container for high contrast ([d13a73d](https://github.com/aposin/ng-aquila/commit/d13a73d))
-   **popover:** allow closeOnClickOutside and manual trigger for modal ([8684d31](https://github.com/aposin/ng-aquila/commit/8684d31))

### Features

-   **overlay-service:** add new overlay service ([9755de6](https://github.com/aposin/ng-aquila/commit/9755de6))
-   typescript 4 support ([c1330ad](https://github.com/aposin/ng-aquila/commit/c1330ad))
-   **accordion:** add extra light option ([38b9652](https://github.com/aposin/ng-aquila/commit/38b9652))

<a name="10.1.0"></a>

# [10.1.0](https://github.com/aposin/ng-aquila/compare/v10.0.0...v10.1.0) (2020-09-29)

### Bug Fixes

-   **formfield:** add background to outline formfield ([a42a695](https://github.com/aposin/ng-aquila/commit/a42a695))
-   **formfield:** change order of label and input in template ([2016ff6](https://github.com/aposin/ng-aquila/commit/2016ff6))
-   **sidepanel:** use box-shadow only for floating variant ([4feb209](https://github.com/aposin/ng-aquila/commit/4feb209))
-   **spinner:** correct size of bobbles for small spinner ([b252164](https://github.com/aposin/ng-aquila/commit/b252164))
-   **tabs:** only show content focus when keyboard is used ([eb94092](https://github.com/aposin/ng-aquila/commit/eb94092))

### Features

-   **button:** add danger option ([e38f563](https://github.com/aposin/ng-aquila/commit/e38f563))
-   **comparison-table:** popular cell for mobile view ([4e84871](https://github.com/aposin/ng-aquila/commit/4e84871))
-   **number-stepper:** add inputs for aria-labels ([90adcc7](https://github.com/aposin/ng-aquila/commit/90adcc7))
-   **popover:** new positioning logic ported from tooltip ([9c8eb7d](https://github.com/aposin/ng-aquila/commit/9c8eb7d))
-   **sidepanel:** add component ([a050365](https://github.com/aposin/ng-aquila/commit/a050365))
-   **tooltip:** new positions in fallback ([9c2d3ef](https://github.com/aposin/ng-aquila/commit/9c2d3ef))

<a name="10.0.0"></a>

# 10.0.0 (2020-09-15)

### Highlights

#### Open source

The UI component library (now called `ng-aquila`) is now open source 🎉. That brings some changes for internal projects but with the power of schematics all the necessary changes are automatically migrated.

#### Right-to-left support

We are introducing Right-to-left (RTL) Support into the library. We are confident that most components work pretty good but we greatly appreciate any feedback from right-to-left users. You can change direction by adding `dir="rtl"` to your HTML Element.

### Bug fixes

-   **progress-indicator:** fix upstream CdkStepper changes
-   **spinner**: indicator color not visible

### Features

-   **open source**: open source the library
-   **theming:** add opensource expert theme
-   **schematics**: add upgrade schematics
-   listen to changes of defaultOptions injectionTokens of components
-   **accordion:** implement expert mobile styles
-   **button:** add new plain button
-   **copytext:** allow usage in all html elements
-   **icon:** add essential icons and NdbxIconModule
-   **schematics:** add ndbx icon module migration
-   **rtl:** add right-to-left (RTL) support
-   **timefield:** add new timefield component

### BREAKING CHANGES

-   **accordion:** In order to change the border color of the tabs on mobile you have to overwrite both the tokens `accordion-regular-mobile-border-color` and `accordion-regular-mobile-border-separator-color`. Previously only the first one had to be changed.

-   **icon-registry**: `getSvgIcon` is deprecated please use `getIcon` instead
-   **icon-registry**: `registerFontClass` was removed and replaced by `registerFont`
