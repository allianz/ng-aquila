---
title: Formfield
category: components
b2c: true
expert: true
stable: done
---
In most cases it is sufficient to only import the nxInputModule - this **already includes the NxFormfieldModule module**.

```ts
import { NxInputModule } from '@aposin/ng-aquila/input';
```

---

Alternatively you could import NxFormfieldModule, but in this case you are required to also add an [nxInput](./documentation/input/overview) control to the html template, like in the Basic Example below.

```ts
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
```

The formfield component is only usable in combination with a compatible input like nxInput. You will get floating labels, hints and a space to properly render additional information and errors below the input.

You can't use the formfield without a matching input. A matching input fulfills the requirements of the `NxFormfieldControl` interface.

### Basic Example

<!-- example(formfield-basic) -->

### Simple Form
This form will show a validation error as both fields are required and one fields uses the appendix slot to display an info [`<nx-icon>`](./documentation/icon/overview) together with a popover.

The formfield width depends only on the grid column it is placed in and expands until it has taken 100% of the width.

**Note:** You have to include NxPopoverModule to run this example. See [NxPopover](./documentation/popover/overview) for details.

<!-- example(formfield-simple-form) -->

### Floating
By default the label will float once the input is focused or filled. By specifying `nxFloatLabel` with a value of always you can make this formfield appear as a static input + label combination.

<!-- example(formfield-floating) -->

### Custom formfield label
You can pass text label content via the input `nxLabel`. If you need a more complex label you an use the directive `nx-formfield-label` as shown in the code example below.
If both are defined, then `nx-formfield-label` will take precedence.

<!-- example(formfield-custom-label) -->

### Negative styling
The negative modifier can be used whenever the component is used on a dark background.

<!-- example(formfield-negative) -->

### Hint
You can add a hint to a formfield which is then displayed on the bottom right corner.

<!-- example(formfield-hint) -->

### Character count
To show the user both the character restrictions and the characters remaining, you can simply use the slot of the `nxFormfieldHint`.

<!-- example(formfield-character-count) -->

### Supplements (Errors, Notes)
It's possible to display additional information like error messages below the input. The component will render either errors or the information, depending on the state of the input.

#### Notes

<!-- example(formfield-note) -->

#### Errors
Errors are shown once the textfield is touched. This textfield was programatically touched to demonstrate the error state in this example.

<!-- example(formfield-error) -->

#### Multiple Errors
You can also show different errors on one input field according to the particular error occurring in the form as shown in the example below.

<!-- example(formfield-multiple-errors) -->

#### Notes and Errors
Initially, the info is shown here. But once you touch the textfield (try focus and blur), it displays the error instead.

<!-- example(formfield-note-and-error) -->

### Prefix, Suffix, Appendix
Provide additional information like the unit or icons with popovers by using additional spaces before and after the input. Both prefix and suffix are visually inside the input, the appendix is located outside to display elements like info icons as they need to be placed outside.

Projected content is automatically colored in  a secondary color, auto-sized icons get a size of 24px (s) and a primary action dark color.

Please note that the prefix and suffix are not read out by the screenreader, so you would have to set an explicit `aria-label` (which includes the prefix/suffix information) via the `nxAriaLabel` input on `nxInput` as shown in the example below.
<!-- example(formfield-prefix-suffix-appendix) -->

### Placeholder
Using placeholders is an optional way to assist the user when filling out inputs. Placeholders normally disappear when the user types something in or if the input is filled. A placeholder can be an example of what should be typed into the field. It is important not to confuse placeholders with labels and hints.

Please note that placeholders are not fully accessible because their color contrast is usually lower than the one of actual text input. In addition, placeholders are **not supported by all screen readers**. Therefore, a placeholder should provide **only non-essential information**.

<!-- example(formfield-placeholder) -->

### Password visibility toggle
In order to hide/show characters on inputs of type password you can use the `nx-password-toggle` component in combination with a `nxFormFieldSuffix` as shown in the example below.
The input field has to be passed as a `control` to the `nx-password-toggle` component.

**Important:** When using a formfield with a visibility toggle please pass an `aria-label` to the password toggle via the `ariaLabel` input. If you don't set it explicitly it will have 'Show password' as default value. As the default is in English, in almost all cases you should explicitly set the label.

For more information on the password toggle component have a look at the [Input API](./documentation/input/api).

<!-- example(formfield-password-visibility) -->
<div class="docs-expert-container">

### Expert: Appearance
With `appearance` you can change the styling of the formfield and add an outline.

Please note that **this is an Expert styling option**. This means that the outline appearance is only intended for internal applications and not for applications that are client facing.

<!-- example(formfield-appearance) -->

### Expert: Error message

For internal applications you can use the `nx-error` component with `appearance="text"` to display errors. This textfield was programatically touched to demonstrate the error state in this example.

<!-- example(formfield-expert-error) -->

</div>

### Global settings

If you want to use default settings for all of your formfields, you can use the `FORMFIELD_DEFAULT_OPTIONS` injection token. Here global settings for `appearance` and `nxFloatLabel` can be defined.

If a certain formfield should have another styling, you can overwrite it by explicitly defining the property in the template.

The same is valid for the formfield error notifications (`nx-error`). The default error style is 'message', but you can use the `ERROR_DEFAULT_OPTIONS` injection token to overwrite it, as shown in the example below.

<!-- example(formfield-global) -->

### Creating a custom form field control

If you want you can create custom form field controls and add custom logic to it. Your custom form field control then should be wrapped inside `nx-formfield`.
Let's start simple and check how it looks once you implement the necessary interfaces. Our goal is to implement custom form field controls for phone numbers.

The HTML code below shows how we can consume our custom control.


```html
<nx-formfield nxLabel="Phone number">
  <nx-custom-tel-input-example></nx-custom-tel-input-example>
</nx-formfield>
```

<!-- example(formfield-custom) -->

####  Implementing the methods and properties of NxFormFieldControl
The implementation is similar to Angular Material and can be checked for reference [Angular Material - Custom Formfield Controls](https://material.angular.io/guide/creating-a-custom-form-field-control)
<!-- example(formfield-custom-tel-input) -->

