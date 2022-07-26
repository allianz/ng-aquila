---
title: Data Display
category: components
b2c: true
expert: true
stable: done
---

The data display component resembles a HTML description list element. It consists of a label and a value.

### Standard

<!-- example(data-display-standard) -->

<div class="docs-expert-container">

### Expert: Size variations

By default, expert data display is downsized to `size="medium"` via `DATA_DISPLAY_DEFAULT_OPTIONS`.

A more condensed version is available using `size="small"`.

<!-- example(data-display-condensed) -->

### Expert: Horizontal orientation

The orientation of the data display can be changed to horizontal using `orientation="horizontal"` or `orientation="horizontal-columns"` input.

Make sure to treat the `<nx-data-display-label>` element as inline to prevent a space char before the colon.

<!-- example(data-display-horizontal) -->

Application developers can implement responsive layout based on individual needs using the `NxViewportService`.

Use the `labelColumns` input for finer control of the label:value horizontal size ratio when in `orientation="horizontal-columns"` mode.

<!-- example(data-display-responsive) -->

</div>
