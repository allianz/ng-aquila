---
title: Code Input
category: components
b2c: true
expert: true
stable: done
---

Use this component when you want users to input a one-time, fixed, and specific set of characters to be validated. There is no limit to how many fields can be used.

The code input component is primarily used for key codes that are generally meaningless and abide by specific character patterns.

This component can be used for anything ranging from one time codes sent via SMS or email verification codes on desktop or mobile.

### 4 character code input

This is a 4 character code input where only uppercase letters are permitted with auto uppercase enabled. This form will validate on submit.

<!-- example(code-input-four-char) -->

### 6 character code input

This is a 6 character code input where any character is permitted. This code input will validate on blur.

<!-- example(code-input-six-char) -->

### 7 character code input

This is an 7 character code input where only lower case letters and numbers are permitted with auto lowercase enabled and input required.

<!-- example(code-input-seven-char) -->

### Disabled

With `[disabled]` the code input can be disabled. When using reactive forms you can also set the disabled state in the FormControl:

<!-- example(code-input-disabled) -->

### Input type

The default type of the inputs is `text`. The value can be changed by setting the property `type`. For example, a PIN code that accepts only four digits.

**Please note** that the selection is not possible on `input["type=number"]`. To get cross browser support for text selection on focus use `input["type=tel"]` instead. For further information see [WHATWG forms spec](https://html.spec.whatwg.org/multipage/input.html#concept-input-apply).

<!-- example(code-input-type) -->

### Negative styling

You can apply the negative styling to the code input by using the `[negative]` input.

<!-- example(code-input-negative) -->

### Accessibility

#### Limitations

The value of the model is a truncated string with no spaces between characters. This means that when the user enters a value and skips one or more inputs, these skipped inputs are not reflected as spaces in the model string and therefore the control is invalid.

It is suggested to only change the programmatic model once the control is valid. Otherwise you can end up in unexpected behavior.

In this example the value is reflected on change. If you try to enter a string like `AB C` the value will be `ABC` and the form will be invalid. In this example, we manipulate the model to `1234` when it is valid.

<!-- example(code-input-model) -->

#### Localization

The input fields need to have an aria-label for a11y support. By default they have english aria-labels, to translate them you can subclass the `NxCodeInputIntl` and provide it in your module. The default aria-label is 'Enter Key X of Y'. Thereby you can provide your own translations for 'Enter Key' and 'of' as shown in the example below.

<!-- example(code-input-localize) -->
