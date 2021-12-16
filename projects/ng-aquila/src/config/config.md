---
title: Expert
category: general
b2c: true
expert: true
stable: done
noApi: true
---

### Expert module

If you build internal applications (expert) some components need a specific configuration to be compliant with ergonomics and other requirements for internal applications. To obtain this configuration for your whole application, you can simply activate it by importing the expert module. This acts by setting injection tokens for all affected components (e.g., form fields).

When imported, this module sets the injection tokens for a bunch of components. It uses the expert settings explained in dedicated sections of every affected component:

-   **ComparisonTable**: Sets `[useFullRowForExpandableArea]` to `true` for `nxComparisonTableRowGroup`.
-   **Datepicker:**: Sets the `[tabindex]` to `-1` for the `nx-datepicker-toggle`.
-   **Error:** `[appearance]` is set to `"text"` (see [here](./documentation/base/overview#error)).
-   **Formfield:** `[appearance]` is set to `"outline"` and `nxFloatLabel` to `"always"` (see [here](./documentation/formfield/overview#expert%253A-appearance)).
-   **Label:** The size is set to `"small"` (see [here](./documentation/base/overview#label)).
-   **TabGroup** and **TabNavBar**: `[appearance]` is set to `"expert"` for both of the components (see [here](./documentation/tabs/overview#expert%253A-appearance)).
-   **SelectableCard**: `[appearance]` is set to `"expert"` (see [here](./documentation/card/overview#expert%253A-appearance)).
-   **SmallStage**: `[appearance]` is set to `"expert"` (see [here](./documentation/small-stage/overview#expert-specifics)).
-   **CircleToggle**: `[appearance]` is set to `"expert"` and `[responsive]` to `"false"` for the CircleToggleGroup component (see [here](./documentation/circle-toggle/overview#expert%253A-appearance)).
-   **LicencePlate:** `[appearance]` is set to `"outline"` and `nxFloatLabel` to `"always"` (see [here](./documentation/licence-plate/overview#expert)).

If you use this module, you don't need to set these configurations explicitly for every component in your template anymore. This means instead of using the expert properties for the component `<nx-formfield nxFloatLabel="always" appearance="outline">` you only need to write `<nx-formfield>...</nx-formfield>` and `nxFloatLabel`, `appearance` are set for you automatically.

```ts
import { NxExpertModule } from '@aposin/ng-aquila/config';
```

```ts
"imports": [
  ...,
  ...,
  NxExpertModule
]
```

### Expert theming

#### General

Expert components have some style differences from the default B2C component styles which **don't get injected** by the `NxExpertModule`. We reflect such style differences by applying a theme.

Our theming is accomplished by using CSS custom properties (CSS variables) to overwrite the styles of our components. The styles of our components are _view encapsulated_ which means that they cannot be overwritten from outside of the component without using the selector `::ng-deep`. The shadow piercing selector `::ng-deep` disables the view encapsulation for a css rule and should be used only in exceptional cases. You can find more information on view encapsulation in Angular [here](https://angular.io/guide/component-styles#view-encapsulation).

#### Theme import

You have to import the expert CSS theme into your `angular.json` file:

```ts
"styles": [
  "node_modules/@aposin/ng-aquila/themes/expert.css"
]
```

If you don't use the Angular CLI or just prefer another place you can use this CSS import instead:

```css
@import '@aposin/ng-aquila/themes/expert.css';
```
