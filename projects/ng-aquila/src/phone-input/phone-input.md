---
title: Phone Input
category: components
b2c: true
expert: true
stable: done
---

## Dependencies

The phone input component depends on the `i18n-iso-countries` package. Please install it, e.g. for npm run `npm install i18n-iso-countries --save`.

The phone input is implemented as an `NxFormfieldControl` so you can use it like an input or dropdown inside the formfield component.

## Retail

The retail version with a placeholder. Please note: the floating label is fixed to the top currently for the phone input. This is only visible if you do not use a placeholder value.

<!-- example(phone-input-retail) -->

## Initial selected country

You can set the initial country code via the `countryCode` input. The input expects an internal country code like `DE`, `US` or `AT`. If there is already a number in the input field changing `countryCode` programmatically has no effect.

<!-- example(phone-input-country-code) -->

## Forms

When using `ngModel` or reactive forms the component expects the control value to be in the format of `+<country-calling-code><local number>`, e.g. `+4989123456` as the initial value. It is important that the country calling code is in the beginning of the string that the component can parse it correctly.

<!-- example(phone-input-forms) -->

## Disabled

By adding the `disabled` attribute you can set the phone input into disabled mode. Alternatively you can disable the form control via the reactive forms form control.

<!-- example(phone-input-disabled) -->

## Validation

The component currently doesn't ship with built in validation to keep the dependency and bundle size impact low. For good validation results the dependency libphonenumber-js is often used which is quite heavy.

We will look into providing validators separated from the component later on. If you need client side validation this example should be a good starting point. For the example to work please install libphonenumber-js.

<!-- example(phone-input-validation) -->

## Formatting

Similar to validation the component doesn't provide formatting out of the box to not include the heavy dependency on libphonenumber-js. You can set a custom formatting function via the `inputFormatter` input property. The function is called on the blur event of the input field. To have a clean model the component removes whitespace, parenthesis and dash characters. If you use any kind of additional formatting characters you have to clean these yourself.

<!-- example(phone-input-formatting) -->

## Internationalization

To set different translations of the countries and to change texts like the overlay label you can either override it via inputs in the template or set these via the `NxPhoneInputIntl` class provider.

To get translations for the countries you can import a different locale from the `i18n-iso-countries` package. Please note: if you provide the `NxPhoneInputIntl` class and use the inputs of the component as well, the input values take precedence.

<!-- example(phone-input-i18n) -->


## Blur/focus events

Use (focusOut) to access the blur event which fires when an element has lost focus. Use (focusIn) to access the focus event, which fires when the element has received focus.

<!-- example(phone-input-focus-out) -->

<div class="docs-expert-container">

## Expert

You will automatically get the correct expert version by using the `NxExpertModule`, then you don't have to set the `appearance` and `floatLabel` properties on the formfield, see the [Expert documentation](./documentation/config) for additional information. All other features from above apply also for the expert version.

<!-- example(phone-input-expert) -->

</div>
