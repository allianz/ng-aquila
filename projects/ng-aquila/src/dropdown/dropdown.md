---
title: Dropdown
category: components
b2c: true
expert: true
stable: done
---
It is recommended to use the dropdown component in combination with NxFormField.
Therefore, make sure to import this module as well:

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
The items inside the dropdown can be rendered either by `[nxValueFormatter]` or by ng-content. If no ng-content is provided, the `[nxValue]` in combination with `[nxValueFormatter]` will be used to render the item content (left). This example also shows the usage of `[nxValueFormatter]`. It is possible to transform any `[nxValue]` into the rendered state (here: "uppercase").

If there is ng-content projected by nx-dropdown-item, this content will be used by the dropdown to display the items (middle). The library implements a fallback if you do not provide `[nxValueFormatter]` and ng-content. In this case, `[nxValue]` will be used by .toString() as value for the item (right).

<!-- example(dropdown-rendering-items) -->

### Custom closed label dropdown
There might be use cases where you want to render a different label when the dropdown is closed. For such a use case we provide the option to add the `nxClosedLabel` directive on a `ng-template`.


You can access the currently selected value via a ngModel binding like you see in the example below, where we use the value to render only the country code without the country id.

<!-- example(dropdown-custom-label) -->

### Negative Styling
See below for an example of a dropdown with negative styling wrapped by a formfield in different states.

<!-- example(dropdown-negative) -->

### Group Dropdown

It might be necessary for your use case to group the items inside of a dropdown.
This is how it's done:

<!-- example(dropdown-group) -->

### Filter dropdown

The dropdown can show an additional filter input, as demonstrated in this example:

<!-- example(dropdown-filter) -->

### Filter dropdown with custom filter function

The default filter function is comparing the lower case dropdown label with the lower case string
from the search filter via `String.indexOf()`.
You can alter the default filter function by setting the `[filterFn]` input.
In this case we want to be really strict and only have a match if a dropdown item contains the
case sensitive user input from the beginning of the string!

<!-- example(dropdown-filter-custom) -->

### Multi select dropdown

The dropdown can be configured to allow multiple items to be selected. In this
mode the dropdown stays open while selecting an item by keyboard or mouse.
Moreover the dropdown renders checkboxes before each item to indicate the selection
of the user.

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

</div>

### Accessibility
The dropdown can be accessed via keyboard. If the component owns the focus, the dropdown will open when you hit ENTER. Pressing ESC while the dropdown is open will close it. To select a value while the dropdown is open, use ARROW-UP and ARROW-DOWN. You can quickly navigate to the first item with the HOME key and to the last item with the END key. Pressing the ALT key plus either the ARROW_UP or ARROW_DOWN key opens or closes the dropdown.

In order to mimic the native `<select>` element accessibility, the library is using `aria-labelledby` attribute to describe the dropdown. Under the hood, html ids of the element containing the rendered dropdown value and the element containing the formfield label are passed to the `aria-labelledby`. This allows assistive technology to read out currently selected value or placeholder of the dropdown together with the label displayed on the screen. If no formfield label is
present, only the dropdown value is read.


#### In single select mode
Hitting SPACE or ENTER closes the dropdown and commit the selected value to the model.

#### In multi select mode
Hitting SPACE or ENTER selects the value and the dropdown stays open. You can close the dropdown by hitting ESC or click the backdrop.

#### Using SPACE in a filter dropdown
Hitting SPACE in a dropdown with filter does not select the value, but filters the options with the SPACE included in the search string.
