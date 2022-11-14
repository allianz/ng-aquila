---
title: Natural Language Form
category: components
b2c: true
expert: true
stable: done
alias: text form, inline field
---

### Module

We have a hard dependency on NxPopover (to display error messages) so make sure to import the OverlayModule and its css as described in [NxPopover](./documentation/popover/overview).

A Natural Language Form is a composition of your usual set of html elements and 'Words' (`NxWordComponent`).

Words are wrappers for `NxFormfieldControl` components like [NxInput](./documentation/input/overview) and [NxDropdown](./documentation/dropdown/overview) and provide the necessary functionality to use them inline, with appropriate styling and a functionality to show errors in a popover. A word has the ability to grow and shrink while maintaining a minimal width which can be chosen by you.

### Examples

#### Basic example

Here is a simple example. You can trigger the error by touching and blurring the field as it's set to be required. Each word will display an error message in a popover if any is given through the directive nxError.

<!-- example(natural-language-form-basic) -->

#### Extended

A Natural Language Form can contain an unlimited amount of words. You can pass in all inputs that you can already use with a [NxFormfield](./documentation/formfield/overview) which are at the moment [NxInput](./documentation/input/overview) and [NxDropdown](./documentation/dropdown/overview). If you want to create your own input, you have to implement the abstract class `NxFormfieldControl`.

<!-- example(natural-language-form-extended) -->

#### Negative styling

<!-- example(natural-language-form-negative) -->

#### Sizes

The default size of the Natural Language Form is `large`. You can change this via the `[size]` input as shown below.

<!-- example(natural-language-form-sizes) -->

### Accessibility

Don't forget to add a label to any word you are using. Otherwise you will hurt accessibility and people won't know which input is expected.
