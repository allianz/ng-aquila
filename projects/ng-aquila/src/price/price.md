---
title: Price
category: components
b2c: true
expert: true
stable: done
a1: true
---

### Overview

The Price component displays formatted prices with proper localization and currency formatting. It automatically handles different currency symbols, decimal separators, and thousand separators based on the provided locale using the `Intl.NumberFormat` API.

<!-- example(price-basic) -->

### Localization

The component automatically formats prices according to the specified locale (defaults to the application's `LOCALE_ID`) and currency (defaults to `USD`).

**Examples:**
- `en-US` with `USD`: $99.99
- `de-DE` with `EUR`: 99,99€
- `en-GB` with `GBP`: £99.99

**Currency Codes:** Use standard ISO 4217 currency codes (USD, EUR, GBP, JPY, etc.).

**Locale Strings:** Use standard locale identifiers (en-US, de-DE, fr-FR, etc.). The locale affects:
- Decimal separator (`.` vs `,`)
- Thousand separator (`,` vs `.`)
- Currency symbol position (before or after the value)

<!-- example(price-locale) -->

### Sizes

The price component supports 9 size variants: default is `m` (Medium).
<!-- example(price-sizes) -->

### Prefix and Suffix

Add contextual text before or after the price using `prefix` and `suffix` inputs.

<!-- example(price-prefix-suffix) -->

### Inverse 

Use the `inverse` input to apply inverse styling, suitable for dark backgrounds.

<!-- example(price-inverse) -->