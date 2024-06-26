---
title: Timefield
category: components
b2c: true
expert: true
stable: done
alias: timepicker
---

The timefield component makes it easier for users to enter time inputs. Maximum character length per input field is 2 and by default it accepts time inputs in 24h format (ex: 23:00, 12:35,...). Programmatic time input is always accepted in `ISO 24h` time format.

In 24h format you can enter hours between 0-23 and minutes between 0-59. Using the `twelveHourFormat` input of the timefield component, the AM/PM toggler can be activated. In 12h format you can enter hours between 1-12 and minutes between 0-59. Note that the model will always accept and return time in 24h format.

### Timefield

<!-- example(timefield-default) -->

### With timepicker dropdown
You can opt in to use the timepicker dropdown by setting the `withTimepicker` input to `true`. The timepicker dropdown will be displayed either by clicking on the icon button or when the user starts typing inside the input fields.

**Important:** With the timepicker enabled you have to translate the `buttonOpenTimepickerAriaLabel` in the `NxTimefieldIntl` class for non-english languages to provide a meaningful label for the timepicker button.

<!-- example(timefield-with-timepicker) -->

#### Changing the timepicker options
You can set the start time, end time or the desired interval via component inputs.

<!-- example(timefield-options-interval) -->

#### Enabling timepicker globally
You can enable the timepicker globally by providing the `TimefieldDefaultOptions` and set `withTimepicker` to `true`, see the example below.

<!-- example(timefield-with-timepicker-global) -->

### Reactive forms

<!-- example(timefield-reactive) -->

### Template Driven forms

<!-- example(timefield-template-driven) -->

### 12h time format toggle

12h time format AM/PM toggler can be activated using `twelveHourFormat` input. Note that the model value will always be returned in 24h format.

<!-- example(timefield-format-toggler) -->

### Disabled

With `[disabled]` the timefield inputs and radio group can be disabled.

<!-- example(timefield-disabled) -->

### Negative styling

You can apply the negative styling to the timefield by using the `[negative]` input.

<!-- example(timefield-negative) -->

### Expert

Switching the appearance will typically happen by providers, e.g. from the `NxExpertModule`, then you can omit the `appearance` input property. But you can also set the appearance directly on the component with the `appearance` property.

 <!-- example(timefield-expert) -->

### Localization

By default input fields and the timepicker button have english aria-labels. To translate them you can subclass the `NxTimefieldIntl` and provide it in your module.

The default aria-label's are:

-   hours input (hh): "hours"
-   minutes input (mm): "minutes"
-   timepicker button: "Open time picker"

Thereby you can provide your own translations for the inputs as given in the example below.

<!-- example(timefield-localize) -->

