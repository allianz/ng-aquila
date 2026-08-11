---
title: Progress Bar
description: Progress bar indicator
category: components
b2c: true
expert: true
stable: done
alias: progress, loading bar
a1Light: true
a1Densities: true
a1Full: true
group: Data Display
---

The progress bar module provides a simple horizontal bar to show progress.

### Examples

<!-- example(progressbar) -->

Bind a variable to `value` input to set the progress bar value.

<!-- example(progressbar-basic) -->

Use custom ranges with `min` and `max`. When using those, `value` has to be `min <= value <= max` to have a meaningful progress bar.

<!-- example(progressbar-custom-range) -->

<div class="docs-hide-ndbx">

### Color Scheme

Use `colorScheme` input to set positive color.

<!-- example(progressbar-positive) -->

### Transparent

Set transparent background using `transparentBackground` input.

<!-- example(progressbar-transparent) -->

</div>

### Accessibility

For more verbose value texts you can use `aria-valuetext`.

If the progress changes dynamically and a `aria-label` with additional `aria-description` is set, some browser <-> screen reader combinations will not announce the full information.
Try to keep your descriptions and labels short to avoid that or try to make use of `aria-valuetext`. `aria-valuetext` was more reliable in our testing for those cases.
