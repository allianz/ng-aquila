---
title: Slider
category: components
b2c: true
expert: true
stable: done
alias: number input, range
---

The slider component allows the user to select a value from a range between a minimum and a maximum value, using a given granularity (e.g. step size). The value can be selected via mouse, touch or keyboard (arrow keys).

For better decimal/floating point handling this module is using the 3rd party library [decimal.js](http://mikemcl.github.io/decimal.js/) which is required in the library dependencies and will be installed automatically.

### Basic

<!-- example(slider-basic) -->

### Appendix

Provide additional information like info icons aligned with the slider line.

<!-- example(slider-appendix) -->

### Default values

If no input is provided, the default values of `min=0`, `max=100` and `step=1` apply. This is also the case if the provided inputs are invalid, for example if the minimum value is higher than the maximum value.

<!-- example(slider-default) -->

### Decimal handling

To mitigate floating point precision erros the value of the slider gets rounded to the closest value based on the step size. For integer step sizes the value will be integers. For decimal step sizes the value will be rounded to the number of decimal places. So for `step=0.1` the value will have a maximum of 1 decimal place (1, 1.1 etc.). For `step=0.01` the value will have a maximum of 2 decimal places (1, 1.01, etc.) and so on.

Try to change the step size below to 0.01 and move the slider again to see the effect.

<!-- example(slider-decimal) -->

### Label Formatters

By default, the minimum value is displayed in a label on the bottom left- and the maximum value on the bottom right-hand side of the slider. The current value is displayed above the slider handle. All three of these labels can be completely customized by providing formatter functions as input. By default, the values are rendered unchanged. In the following example, a Euro symbol is attached to the respective value, which is rounded to two decimal places.

<!-- example(slider-label) -->

Formatter functions can also be applied to create sliders that do not show numeric values at all. In the following example, textual values are mapped to the numeric slider model.

<!-- example(slider-textual) -->

### Disabled Slider

A disabled slider does not react to mouse, touch or keyboard events.

<!-- example(slider-disabled) -->

### Negative Slider

You can change the styling of the slider to negative via the `negative` property as shown in the example below.

<!-- example(slider-negative) -->

### Inverted Slider

In a scenario where the general text direction is set to right-to-left, the slider should be oriented accordingly. For this purpose, the `inverted` flag can be set to `true`. As a consequence, the maximum value is associated with the left-hand side of the slider and the minimum value is found on the right.

<!-- example(slider-inverted) -->

### Template-driven Form with ngModel

The slider can be used in template-driven forms.

<!-- example(slider-template) -->

### Reactive Form

The slider can be used in reactive forms.

<!-- example(slider-reactive) -->

### Hide thumb label

The thumb label on top of the slider can be hidden by changing the `[thumbLabel]` input property to false.

<!-- example(slider-thumb) -->

### Hide Min/Max labels

The Min/Max labels under the slider can be hidden by changing the `[hideLabels]` input property to true.

<!-- example(slider-labels) -->

### Slider with ticks

Tick under the slider can be shown with `[tickInterval]` which relative to `[step]`
<!-- example(slider-tick) -->
