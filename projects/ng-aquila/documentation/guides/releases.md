---
title: Releases und updating
---
# Releases und updating

## Updating to version 11
### Breaking Changes

With v11 there are some breaking changes:

- **Removal of outer margins of components**

  When ng-aquila was started, the first components were implemented with default outer margins. But since the number of projects using ng-aquila is growing, this is not suitable anymore for a lot of use cases and projects. This is why we decided to remove them with v11.

  <p class="docs-danger-text nx-font-weight-bold">Please be aware that this change might affect the styling and layout of your application and it should be checked for visual differences.</p>

  For an easier upgrade path we provide a compatibility css file that restores the margins prior to this change. To use this file add it to your `angular.json`:


  ```
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:browser",
      "options": {
        // ...
        "styles": [
          // ...
          "node_modules/@aposin/ng-aquila/css/compatibility.css",
        ]
      }
    }
  }
  ```

  For the exact changes please check `compatibility.css` or

  <details>
    <summary>Expand here to show a summary of the changes</summary>

    | **Component**                 | **Changes**                                                                                                                                                                                |
    |-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | **expansion-panel/accordion** | Removed  `margin-top: 16px`  before the first expansion-panel inside an accordion.                                                                                                         |
    | **button**                    | Removed  `margin: 0 0 24px 0` .                                                                                                                                                            |
    | **cards**                     | Removed  `margin-bottom: 24px`  from the  `nx-card`  component and  `margin-bottom: 8px`  from the  `nx-selectable-card`  component.                                                       |
    | **checkbox**                  | Removed  `margin-bottom: 16px` .                                                                                                                                                           |
    | **copytext**                  | Removed  `margin: 0 0 32px 0` . The copytext now has a default  `margin: 0` .                                                                                                              |
    | **dynamic-table**             | Removed  `margin: 32px 0` .                                                                                                                                                                |
    | **headlines**                 | Removed  `margin-bottom`  from each headline size. The headlines now have a default  `margin: 0` .                                                                                         |
    | **lists**                     | Removed  `margin-bottom: 32px`  from the list and  `margin-bottom: 16px`  from the last list item.                                                                                         |
    | **notifications and errors**  | Removed  `margin: 12px 0`  from  `nx-message` ,  `nx-message-banner`  and  `nx-error`  (of type  `message` ). For the Message Toast the margin is still used.                              |
    | **number-stepper**            | Removed  `margin-top: 12px`  if there is no label set.                                                                                                                                     |
    | **pagination**                | Removed  `margin: 8px 0`  from the Advanced Pagination (+ smaller screens:  `margin: 8px 0 40px 0` ) and  `margin: 16px 0`  from the Simple Pagination (smaller screens: `margin: 40px 0). |
    | **taglist**                   | Removed  `margin-bottom: 32px`  on the list. On the single tag items, there is still used a  `margin-bottom` .                                                                             |

  </details>

  <br>

- **card**: Removal of the selecting functionality for the `nx-card` component in favor of `nx-selectable-card`

  The deprecated `selectable`, `selected`, `disabled` and `selectedChange` properties were removed from the `nx-card` component. Please update to the `nx-selectable-card` component that covers all this functionality.

- **comparison-table**: The deprecated `label` input of `nxComparisonTableRowGroup` was removed. Use `labelCollapsed` instead.

- **datefield**:

  - The deprecated `format()` function was removed, which is not needed to be called anymore.
  - The deprecated `getPopupConnectionElementRef()` method was removed. Use `getConnectedOverlayOrigin()` instead.
  - The deprecated `calendarHeader` property was removed from `NxDatepickerIntl`. Use `switchToMultiYearViewLabel` instead.

- **dropdown**: The deprecated `nxAriaLabel` input input was removed. Accessibility for dropdown is now achieved with `aria-labelledby` that is set automatically.

- **icon-registry**: The deprecated `getSvgIcon()` method was removed. Please use `getIcon()` instead.

- **margin-classes**: corrected `nx-margin-x-{size}` and `nx-margin-y-{size}` classes

  Previously when using a `nx-margin-x-{size}` or `nx-margin-y-{size}` class, all four margins (top, right, bottom, left) were affected. When using `nx-margin-x-{size}` classes, the **vertical margins are no longer set to 0**. When using `nx-margin-y-{size}` classes, the **horizontal margins are no longer set to 0**.

- **progress-indicator**: The deprecated `title` input was removed. Use a `nx-label` element as content to the indicator instead.

- **radio-toggle**: Removal of the deprecated `selection` setter.

- **small-stage**: Rewrite to support retail

  - The `contentNarrow` input of `nx-small-stage` was renamed to `narrow` and moved to the `nx-small-stage-content` directive.
  - The `offsetEnd` input of `nx-small-stage` was moved to the `nx-small-stage-end-image` directive.
  - The `inputUrl` input of `nx-small-stage` was renamed to `src` and moved to the `nx-small-stage-end-image` directive.
  - The `small-stage-image-container-padding-start` theming token was renamed to `small-stage-image-container-padding-to-content`.
  - The `small-stage-background-color` theming token was removed. Please set the background-color directly with css.

### Automatic update (`ng update`)

We want to make the update as seamless as possible for you with the use of Angular schematics. By using `ng update` from the Angular CLI this will automatically migrate your project to the new setup.
You can update with the following commands:
 
```
ng update @angular/cli @angular/core --force
ng update @angular/cdk --force
ng update @aposin/ng-aquila --force
```
 
You can use the Angular CLI's `--allowDirty` flag if you don't want to commit between these steps.

### Release plan

Our release strategy is naturally synchronized with [Angular's](https://github.com/angular/angular/blob/master/docs/RELEASE_SCHEDULE.md). The main reason for this is to minimize the frequency of breaking changes. The Angular team releases a major version every six months, whenever we update to this version we expect breaking changes. Thus, we will release any breaking change within Angular NDBX along with the major release of Angular. Consequently, you can expect breaking changes (major update) within ng-aquila about every six months. As the Angular team does no longer provide concrete release dates, we also cannot provide concrete release dates any more for major releases. We trigger minor or bug fix releases if they provide a meaningful delivery (fix or feature). This is usually decided in our weekly refinement meeting.


| Date                   | Angular version | ng-aquila version    | LTS end          |
|------------------------|-----------------|----------------------|------------------|
| September 2020         | 10              | 10                   | December 2021    |
| January 2021           | 11              | 11                   | May 2022         |


During Long-Term Support (LTS) only critical fixes and security patches will be released. LTS of a major version starts as soon as the successor is released. If your applications are running of the LTS, you may (at your own discretion) fork your respective version and support it within your organization.
