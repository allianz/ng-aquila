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

### Reactive form example

<!-- example(timefield-reactive) -->

### Template Driven form example

<!-- example(timefield-template-driven) -->

### 12h time format toggler example

12h time format AM/PM toggler can be activated using `twelveHourFormat` input. Note that the model value will always be returned in 24h format.

<!-- example(timefield-format-toggler) -->

### Disabled

With `[disabled]` the timefield inputs and radio group can be disabled.

<!-- example(timefield-disabled) -->

### Negative styling

You can apply the negative styling to the timefield by using the `[negative]` input.

<!-- example(timefield-negative) -->

### Localization

By default input fields have English aria-labels. To translate them you can subclass the `NxTimefieldIntl` and provide it in your module.

The default aria-label's are:

-   hours input (hh): "hours"
-   minutes input (mm): "minutes"

Thereby you can provide your own translations for the inputs as given in the example below.

<!-- example(timefield-localize) -->
