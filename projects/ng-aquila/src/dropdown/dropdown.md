---
title: Dropdown
category: components
b2c: true
expert: true
stable: done
alias: select, multi select
---

<div class="docs-deprecation-warning">
  <strong>Important: </strong>
  Please note that the <strong>isMultiselect</strong> option of the dropdown is deprecated. Use the new <strong>nx-multi-select</strong> component instead.
</div>

It is recommended to use the dropdown component in combination with NxFormField. Therefore, make sure to import this module as well:

```ts
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
```

Dropdown requires Angular CDK (incl. CSS). Learn [how to enable Angular CDK styles](./documentation/overlay/overview#angular-cdk).

### Standard Dropdown

The dropdown wrapped by a formfield in different states is displayed in the following example.

<!-- example(dropdown-standard) -->

### Placeholder

It is possible to show a placeholder instead of the floating label. The placeholder will only be shown if no option is selected.

<!-- example(dropdown-placeholder) -->

### Rendering of dropdown-items

The items inside the dropdown can be rendered either by `[valueFormatter]` or by ng-content. If no ng-content is provided, the `[value]` in combination with `[valueFormatter]` will be used to render the item content (left). This example also shows the usage of `[valueFormatter]`. It is possible to transform any `[value]` into the rendered state (here: "uppercase").

If there is ng-content projected by nx-dropdown-item, this content will be used by the dropdown to display the items (middle). The library implements a fallback if you do not provide `[valueFormatter]` and ng-content. In this case, `[value]` will be used by .toString() as value for the item (right).

<!-- example(dropdown-rendering-items) -->

### Custom closed label dropdown

There might be use cases where you want to render a different label when the dropdown is closed. For such a use case we provide the option to add the `nxClosedLabel` directive on a `ng-template`.

You can access the currently selected value via a ngModel binding like you see in the example below, where we use the value to render only the country code without the country id.

<!-- example(dropdown-custom-label) -->

### Negative Styling

See below for an example of a dropdown with negative styling wrapped by a formfield in different states.

<!-- example(dropdown-negative) -->

### Group Dropdown

It might be necessary for your use case to group the items inside of a dropdown. This is how it's done:

⚠️ Every item should have a unique value, regardless of which group it belongs to.

<!-- example(dropdown-group) -->

### Filter dropdown

The dropdown can show an additional filter input, as demonstrated in this example:

<!-- example(dropdown-filter) -->

### Filter dropdown with custom filter function

The default filter function is comparing the lower case dropdown label with the lower case string from the search filter via `String.indexOf()`. You can alter the default filter function by setting the `[filterFn]` input. In this case we want to be really strict and only have a match if a dropdown item contains the case sensitive user input from the beginning of the string!

<!-- example(dropdown-filter-custom) -->

### Multi select dropdown

The multi select is a separate component from the dropdown. It supports selection on multiple items as well as filtering. Instead of a single value the model is an array of options. Options are passed into the component via the `options` input. In the simplest case you can pass in a list of strings. That way the selected values and the displayed labels are the same. If you need labels that are different to the values you can also pass in arbitrary complex objects as options. In that case the value and label can be selected by specifying `selectValue` and `selectLabel`. The optional filter can be enabled via the `filter` input.

<!-- example(dropdown-multi-select) -->

### Disabling items

You can disable the whole dropdown as well as single dropdown items by setting their `disabled` property as shown in the example below:

<!-- example(dropdown-disabled-items) -->

### Simple binding

<!-- example(dropdown-simple-binding) -->

### Template-driven form with ngModel

<!-- example(dropdown-template-driven) -->

### Reactive form

<!-- example(dropdown-reactive) -->

### Data-driven (lazy rendering)

The options can also be passed to the dropdown using the `options` input. Dropdowns with many options benefit from this approach, as they will only be rendered when the dropdown is open. Grouping of options is currently not supported.

<!-- example(dropdown-lazy) -->

<div class="docs-expert-container">

### Expert: Dropdown with outline

In a formfield with an outline the styling of the dropdown will adjust accordingly.

Please note that **this is an Expert styling option**. This means that the outline appearance is only intended for internal applications and not for applications that are client facing.

<!-- example(dropdown-outline) -->

#### Multi Select Dropdown

The multi select dropdown is a new component which is a replacement for the `<dropdown isMultiselect ...>`. It offers a filter to quicky find items in long lists, improved accessibility and better performance.

<!-- example(multi-select) -->

</div>

### Global Settings

If you want to use a custom scroll strategy, you can use the `NX_DROPDOWN_SCROLL_STRATEGY` injection token with a factory provider. The `Overlay` service from `@angular/cdk/overlay` offers 4 different scroll strategy options:

-   **reposition:** allow background scroll, the overlay moves with the background (default).
-   **close:** allow background scroll, closes the overlay on scroll.
-   **block:** disallow background scroll, the overlay does not move.
-   **noop:** allow background scroll, the overlay does not move.

<!-- example(dropdown-scroll-strategy-provider) -->

Alternatively, the `NX_DROPDOWN_SCROLL_STRATEGY` injection token can be provided by importing `NxScrollStrategyModule.withConfig({ ... })` into your application or feature module, after your other aquila imports.

#### Internationalization

The provider `NxDropdownIntl` contains various strings to provide labels for display and screen readers. You have to provide a proper translation for each of your locales.

The provider includes a `changes` subject that you can use to notify dependent components about changes of the strings during runtime.

<!-- example(multi-select-intl) -->

### Focus out
A focusout event is emitted when the selected dropdown has lost focus.
<!-- example(dropdown-focus-out) -->

### Accessibility

The dropdown can be accessed via keyboard. If the component owns the focus, the dropdown will open when you hit ENTER. Pressing ESC while the dropdown is open will close it. To select a value while the dropdown is open, use ARROW-UP and ARROW-DOWN. You can quickly navigate to the first item with the HOME key and to the last item with the END key. Pressing the ALT key plus either the ARROW_UP or ARROW_DOWN key opens or closes the dropdown.

In order to mimic the native `<select>` element accessibility, the library is using `aria-labelledby` attribute to describe the dropdown. Under the hood, html ids of the element containing the rendered dropdown value and the element containing the formfield label are passed to the `aria-labelledby`. This allows assistive technology to read out currently selected value or placeholder of the dropdown together with the label displayed on the screen. If no formfield label is present, only the dropdown value is read.

#### In single select mode

Hitting SPACE or ENTER closes the dropdown and commit the selected value to the model.

#### In multi select mode

Hitting SPACE or ENTER selects the value and the dropdown stays open. You can close the dropdown by hitting ESC or click the backdrop.

#### Using SPACE in a filter dropdown

Hitting SPACE in a dropdown with filter does not select the value, but filters the options with the SPACE included in the search string.
