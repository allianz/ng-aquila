---
title: Licence Plate
category: components
b2c: true
expert: true
stable: done
---

The licence plate module contains different components to create an input for european licence plate numbers. It constists of a prefix `<nx-licence-plate-euro-prefix>` for the european country code, a validator directive `nxLicencePlate` and a suffix `nx-licence-plate-season-suffix` for seasonal licence plates. The optional validator currently supports only german standard and special number formats. For other countries please use your own validation by providing a `pattern`. All parts are meant to be combined with the form field to create an individual input for different licence plate fromats.

## Validation (Germany)

The validator directive `nxLicencePlate` provides validation for:

-   `de_standard`: german standard licence plate
-   `de_season`: german seasonal licence plate
-   `de_special`: german seasonal licence plate
-   `euro`: choose for euro licence plate and supply your own pattern
-   `other`: choose for any other licence plate and supply your own pattern

Errors will be added to the control under the name `nxLicencePlateError`.

### Standard type (Germany)

The german `de_standard` type handles the generally german licence plate, including the historical and the electric vehicle licence plates. Examples: `M-AB 1234`, `M-AB 1234E` and `M-AB 1234H`. It is recommended to use the hint feature for this component, as a format is specified.

<!-- example(licence-plate-standard) -->

### Seasonal type (Germany)

The german `de_seasonal` licence plate field is identical to the standard type but shows also the start and end date of the registration. Examples: `M-AB 1234`, `M-AB 1234E` and `M-AB 1234H` with filled `startDate` and `endDate` attributes. It is recommended to use the hint feature for this component, as a format is specified.

<!-- example(licence-plate-seasonal) -->

### Special type (Germany)

The german `de_special` licence plate field treats specific purposes, such as military or diplomatic licence plate numbers. Examples: `Y-687 548`, `B-12-345`, `0-123-1` and `0-17-1A`. It is recommended to use the hint feature for this component, as a format is specified.

<!-- example(licence-plate-special) -->

## Additional licence plate types

The following licence plate types are used within an international or unknown context and provide no standard regular expression format (pattern). Please keep in mind that you need to specify your own regular expression pattern for the individual case you implement with these two types.

### Euro type

For other european countries (e.g. France and Spain) the validation can be disabled by choosing the `euro` type. This type enforces no format so you need to specify a regular expression with attribute `pattern` to specify a format for the specific country. In case you specify a pattern, it is also recommended to use the hint feature for this component to explain the format to the user.

<!-- example(licence-plate-euro) -->

### Other type

The `other` type handles all unknown number formats and provides no format or nationality code. This type enforces no format so you need to specify a regular expression with attribute `pattern` to specify a format. In case you specify a pattern, it is also recommended to use the hint feature for this component to explain the format to the user.

<!-- example(licence-plate-other) -->

## NgModel

<!-- example(licence-plate-ngmodel) -->

## Reactive

<!-- example(licence-plate-reactive) -->

## Disabled

By adding the `disabled` attribute you can set the licence plate into disabled mode.

<!-- example(licence-plate-disabled) -->

<div class="docs-expert-container">

## Expert

You will automatically get the expert version of this component by using the `NxExpertModule` see the [Expert documentation](./documentation/config). In case you can not use this module, you need to switch the settings of the licence plate manually by using the `appearance` and `floatLabel` properties.

<!-- example(licence-plate-expert) -->

### States

<!-- example(licence-plate-expert-states) -->

</div>
