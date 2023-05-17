---
title: Number Stepper
category: components
b2c: true
expert: true
stable: done
alias: number input, range
---

### Examples

This component has two sizes - big and normal.

<!-- example(number-stepper-sizes) -->

#### Standalone

<!-- example(number-stepper-standalone) -->

#### Custom label

You can use custom markup by omiting the nxLabel attribute and provide your markup inside the element, e.g. to show a tooltip. If nxLabel is set the custom content will not be rendered!

<!-- example(number-stepper-custom-label) -->

#### Leading Zero (Number Formatting)

By default, numbers have a preceeding zero. You can disable this by setting the `leadingZero` property to false as shown in the example below.

<!-- example(number-stepper-formatting) -->

#### Prefix and Suffix

You can add a prefix/suffix at the beginning or at the end of the number input by using `nx-number-stepper-prefix` or `nx-number-stepper-suffix` as shown in the example below.

<!-- example(number-stepper-additions) -->

#### Simple Binding

<!-- example(number-stepper-simple-binding) -->

#### Template-driven with ngModel

<!-- example(number-stepper-template-driven) -->

#### Reactive

<!-- example(number-stepper-reactive) -->

#### Floating point support

Floating point numbers are fully supported and can be enabled by setting the step size to a decimal number

<!-- example(number-stepper-floating-point) -->

#### Negative styling

<!-- example(number-stepper-negative) -->

#### Disabled

You can fully disable user input on the number stepper component by setting `disabled` property to `true`.

<!-- example(number-stepper-disabled-explicit) -->

The number stepper will also be disabled as part of a disabled form.

<!-- example(number-stepper-disabled-implicit) -->

### Validation

The directive registers itself as a validator and will append one of the following errors:

-   `nxNumberStepperStepError` when the value is not a valid step. E.g. for nxMin=0 and nxStep=2 the value 1 is not a valid step
-   `nxNumberStepperFormatError` when the value contains invalid characters, e.g. letters

As usual you can use this error key to distinguish from other errors. Try it below: Enter 1 or type in any letter to see the errors.

<!-- example(number-stepper-validation) -->

### Auto resizing

When working with larger numbers or decimals the input width might be too small to properly show the current number. By enabling `resize="true"` the input automatically grows and shrinks to the width of the input value including border and padding.

<!-- example(number-stepper-auto-resizing) -->

### Accessibility

If the component owns the focus, you can increment by pressing the ARROW-UP button and decrement by pressing the ARROW-DOWN button.

The increment and decrement buttons need to have an `aria-label` for a11y support. By default they have english aria-labels, to translate them you can subclass the `NxNumberStepperIntl` and provide it in your module as shown in the [Localization example](./documentation/number-stepper/overview#localization). If you want to set these aria-labels separately for a certain number stepper you can use the inputs `incrementAriaLabel` and `decrementAriaLabel`. These inputs take precedence over `NxNumberStepperIntl`.

In addition, the input of the number stepper should also have an `aria-label` attribute, which can be set only via the input `inputAriaLabel`.

**Please make sure to use either `[label]` or `inputAriaLabel`** to set the label on the number-stepper. In case you use a [custom label](./documentation/number-stepper/overview#custom-label), you should also use an additional `inputAriaLabel`.

The example below shows the usage of the above mentioned `aria-label` inputs.

<!-- example(number-stepper-a11y) -->

#### Localization

<!-- example(number-stepper-localize) -->
 
 ### Readonly input field
 You can use the `[readonly]` attribute to prevent manual input of values in an input field.
 <!-- example(number-stepper-readonly-input) -->