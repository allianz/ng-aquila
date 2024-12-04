---
title: Radio Button
category: components
b2c: true
expert: true
stable: done
a1: true
---

Use a radio button when you want the user to choose from a relatively small (i.e. two to six) group of mutually exclusive options. If several options can be selected, consider checkboxes instead. Please note that the radio button has no margins.

<!-- example(radio-button) -->

Keep in mind that the content of `nx-radio` equals the button's label (in this case, "Default", "Checked" etc.).

<!-- example(radio-button-sample) -->

## Radio group

Just like standard `<input type="radio">` elements, these radio button components can be grouped. For this purpose you can use the `nx-radio-group` component. Just make sure to set the name property on the group, which will then take care of assigning the same name to each radio button within the group.

### Basic usage

The radio group is a set of radio buttons grouped together under an optional group label.

<!-- example(radio-button-group) -->

### Horizontal usage

<!-- example(radio-button-group-horizontal) -->

### Template-driven with ngModel

In case `nx-radio-group` is used, the value of the selected option is managed by the group. Consequently, `ngModel` is supposed to be used on the group rather than the contained `nx-radio` components.

<!-- example(radio-button-form) -->

### Reactive form

<!-- example(radio-button-reactive) -->

### Label Sizes

<!-- example(radio-button-sizes) -->

### Negative Styling

You can apply the negative styling to the radio buttons by using the `negative` input on either the radio group or a single radio button.

If used both on a radio button and its containing radio group, the radio group setting overrides the single radio button.

<!-- example(radio-button-negative) -->

### Radio Group Disabled

The disabled-state for radio components contained in a group can be managed by the group.

<!-- example(radio-button-disabled) -->

### Radio Button Event

<!-- example(radio-button-event) -->


### Radio error message retail
<!-- example(radio-button-error-retail) -->

<div class="docs-expert-container">

### Expert: Radio button group label

With `size` you can change the styling of the radio button group's label. The label of the radio button group is by default for B2C. The appearance of the label can be changed setting the `size` property to `small`, which is the formatting for Expert.

<!-- example(radio-button-group-label-size) -->

### Expert: validation and error message

<!-- example(radio-button-group-validation) -->

### Expert: Readonly

<div class="docs-deprecation-warning">
<strong>Expert only: </strong>
  Please note that the readonly option is only for expert/internal applications because of accessibility restrictions. There is currently no solution for readonly states that is accepted for retail applications.
</div>

 <!-- example(radio-button-readonly) -->

</div>

### Accessibility
If your radio button doesn't have any accompanying label text,
it's recommended to use `ariaLabel` or `ariaLabelledBy`
inputs to provide helpful information for users relying on screen readers or other assistive technologies."
