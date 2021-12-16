---
title: Input Mask
category: components
b2c: true
expert: true
stable: done
---

### Mask

Input masks can be used to provide guidance to users when inputing long strings or numbers. Masks are often used for inputs like dates, long numbers and IBAN. The mask can be applied through `nxMask`.

The mask formatting is defined though a combination of the following values and additional separators:

-   **0**: digits (0 to 9 numbers)
-   **A**: letters (uppercase and lowercase), digits
-   **S**: letters (uppercase and lowercase)

Thus, if you write `000-AAA` this specifies a mask that consists of three numbers and then three letters, with a separator in the middle.

**Please note** that language specific characters (e.g. 'ä', 'ö', 'ü') are currently not supported.

<!-- example(mask) -->

### IBAN mask

`nxIbanMask` provides a mask for IBANs. The IBAN mask directive does some basic validation (e.g. regarding length and correctly placed characters), but is not able to verify if valid bank codes and account numbers are used. Lowercase letters are automatically converted to uppercase.

**Important:** To use this, the peer dependency [iban.js](https://github.com/arhs/iban.js/) is needed.

<!-- example(iban-mask) -->

### Custom separators

The default separators are `/`, `(`, `)`, `.`, `:`, `-`, `+`, `,` and space.

With `separators` you can set custom separators.

<!-- example(mask-separators) -->

### Drop separators in ngModel

By default the value of your binding (ngModel/reactive forms) will include the separator characters of the mask. If you want to drop separators in this value, you can use the `dropSpecialCharacters` input.

An alternative way to get the value without separators is calling the `getUnmaskedValue()` function.

<!-- example(mask-drop-characters) -->

### Validation

Per default the mask is validated. It will send a `nxMaskLengthError`, if the lengths of input value and given mask do not match.

The validation can be turned off via the `[validateMask]` input. In both cases you can add your custom validators (e.g. `required`) for the input.

<!-- example(mask-validation) -->

### Case sensitivity

Optionally you can use the `nxConvertTo` input to automatically capitalize or lower the mask input value.

<!-- example(mask-case) -->

### Deactivate mask

You can optionally deactivate the mask controls using `deactivateMask` property. Activating this option will return the mask value as is without any validations.

<!-- example(mask-deactivate) -->
