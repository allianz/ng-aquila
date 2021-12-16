---
title: Checkbox
category: components
b2c: true
expert: true
stable: done
---

The Checkbox is used when there is a list of options and the user may select one or more options, including all or none. This component appears also in case of yes or no choices (e.g. “Remember me” by Login). It's an efficient and elegant way to select/deselect an item or enable/disable certain actions.

This component implements the checkbox as the combination of a label and an input tag. It is not intended that you use the checkbox without a label.

### Label binding

For better accessibility, the checkbox is always bound to its label by using a `for` tag.

### Examples

The following six checkbox states are supported:

<!-- example(checkbox-states) -->

#### Simple binding

<!-- example(checkbox-simple-binding) -->

#### Label size

The font size of the label can be set to two different sizes with the `[labelSize]` property.

<!-- example(checkbox-label-size) -->

#### Negative Styling

You can apply the negative styling to the checkboxes by using the `negative` input on either the checkbox group or a single checkbox.

If used both on a checkbox and its containing checkbox group, the group setting overrides the single checkbox.

<!-- example(checkbox-negative) -->

#### Template-driven with ngModel

<!-- example(checkbox-template-driven) -->

#### Reactive

<!-- example(checkbox-reactive) -->

#### Outputs

<!-- example(checkbox-outputs) -->

### Checkbox group

Checkboxes can be grouped under one label and validated together. The checkbox group is used when you want to add a label or include an error message.

**Please note:** When wrapping the `<nx-checkbox>` inside a `<nx-checkbox-group>`, the `nx-checkbox-group` takes control.

#### Basic usage

<!-- example(checkbox-group-basic) -->

#### Horizontal usage

<!-- example(checkbox-group-horizontal) -->

#### Reactive form

<!-- example(checkbox-group-reactive) -->

<div class="docs-expert-container">

### Expert: Checkbox group label

With `size` you can change the styling of the checkbox-group's label. The label of the checkbox group is by default for B2C. The appearance of the label can be changed setting the `size` property to `small`.

<!-- example(checkbox-group-label-size) -->

### Validation

**Important**: Please note that the `nx-error` is only for **Expert**.

<!-- example(checkbox-group-validation) -->

</div>

### Dynamic

<!-- example(checkbox-group-dynamic) -->

### Inheritance

The properties can be inherited from the checkbox group to the checkboxes inside it. In this example you can toggle them and check the result.

<!-- example(checkbox-group-inheritance) -->
