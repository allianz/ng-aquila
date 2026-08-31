---
title: Text
description: Body text, utility text and inline text styling utilities
category: components
b2c: true
expert: true
stable: done
a1Full: true
group: Data Display
---

<div class="docs-ndbx">

### Not available in NDBX

Body text, utility text and accent color are only available in the A1 theme and are not supported in
the NDBX theme.

Switch the theme to A1 to see the documentation and examples. In NDBX, use
[copytext](./documentation/copytext/overview) for running text.

</div>

<div class="docs-a1">

### Body text

Use `nxBodyText` for running text: paragraphs, descriptions and any longer prose that a user reads
as content. This is the default choice for text. Use `nxUtilityText` only for the UI-labelling
cases below. It is only available in the A1 theme and is not supported in the NDBX theme.

`nxBodyText` is an attribute selector, so it works on any textual element and is not limited to the
paragraphs used in the examples.

#### Sizes

Available sizes are `s`, `m`, and `l`, with `m` as the default.

<!-- example(body-text-sizes) -->

#### Type and inverse

`type` switches between the `primary` (default) and `secondary` text tone. Set `inverse` for use on
dark backgrounds.

<!-- example(body-text-type) -->

#### Color scheme

Use the `colorScheme` input (`default` or `on-accent-attention`) to place `nxBodyText` on an
accent-colored surface. It overrides `type`, since the on-accent-attention foreground color is the
same regardless of tone. Combine with `inverse` for accent surfaces on dark backgrounds.

<!-- example(body-text-color-scheme) -->

### Utility text

Use `nxUtilityText` for functional text that annotates the UI: form labels, captions, table cells
and single-line strings that need to align with an adjacent control or icon. Prefer `nxBodyText` for anything
that wraps onto several lines. It is only available in the A1 theme and is not supported in the NDBX
theme.

`nxUtilityText` is an attribute selector too, so it works on any textual element and is not limited to
the paragraphs used in the examples.

#### Sizes

Available sizes are `s`, `m`, and `l`, with `m` as the default.

<!-- example(utility-text-sizes) -->

#### Type, attention and inverse

`type` switches between the `primary` (default) and `secondary` text tone. `attention` emphasizes
the text with a heavier font weight. Set `inverse` for use on dark backgrounds.

<!-- example(utility-text-attention) -->

#### Color scheme

Use the `colorScheme` input (`default` or `on-accent-attention`) to place `nxUtilityText` on an
accent-colored surface. It overrides `type`, since the on-accent-attention foreground color is the
same regardless of tone. Combine with `inverse` for accent surfaces on dark backgrounds.

<!-- example(utility-text-color-scheme) -->

### Body Text vs Utility Text

A1 splits text into body text and utility text.

| Usage                                                                                                                    | Component       |
|--------------------------------------------------------------------------------------------------------------------------|-----------------|
| Paragraphs, descriptions, running prose and any text that wraps                                                          | `nxBodyText`    |
| Single-line text aligned to an adjacent control or icon, table cells, form labels, captions, or text needing `attention` | `nxUtilityText` |

The two always share font size, family and default weight; line-height is the only property that can
differ. Utility line-heights sit on the baseline grid so text aligns with component boxes, while
body line-heights leave the grid at some sizes for readability in multi-line prose.

</div>

<div class="docs-hide-ndbx">

### Accent color

Use the `nx-accent-color` selector to highlight inline text that requires emphasis. This feature is only available in the A1 theme and is not supported in the NDBX theme.

#### Available colors
`yellow | orange | red | purple | teal | aqua | blue | green | gray`

Example Usage: `<span nx-accent-color="purple"> highlight </span>`

<!-- example(accent-color-basic) -->


#### Integrate with other components

You can also use `nx-accent-color` with other text based component.

<!-- example(accent-color-integration) -->


#### Negative (inverse) usage
You can use `negative` attribute to set it to inverse color.

<!-- example(accent-color-negative) -->

</div>
