---
title: List
description: Styled ordered and unordered lists
category: components
b2c: true
expert: true
stable: done
a1Full: true
group: Data Display
---

The component library supports three types of lists: unordered lists, ordered lists and lists with icons.

### Different list types

#### Default (unordered) list

<!-- example(list-unordered) -->

#### Simple ordered list

<!-- example(list-ordered) -->

#### Ordered list with circles

<!-- example(list-circles) -->

#### Lists with Icons

Custom icons are supported by means of the nxListIcon directive, which can be configured to display individual icons for each item of the list.

<!-- example(list-icons) -->

### List with different copytext sizes

The size can be one of these values: `xsmall`, `small`, `normal`. The default value is `normal`.

<!-- example(list-copytext) -->

<div class="docs-a1">

### List types

You can use the attribute `type` to apply predefined primary or secondary styles to your lists. The default value is `primary`.

<!-- example(list-type) -->

</div>

<div class="docs-hide-a1">

### Condensed list

By using attribute `condensed`, you can activate the condensed mode of the list. Use the style tokens to set the spacing. The normal list remains the same in `condensed` mode.

<!-- example(list-condensed) -->

</div>

### Negative styling

<!-- example(list-negative) -->

### Custom color of list items

You can change the color of the list item circles by overwriting the default color as shown in the example below.

**Please make sure that your color scheme is in line with branding.**

<!-- example(list-custom-color) -->

#### List Nesting

Lists can be nested within each other. You can combine simple ordered, circle ordered, unordered, and icon lists, including mixed types where different list styles are nested inside one another.

Nested ordered lists are numbered by level, using the dot as a level separator: a top level item reads `1.`, its children `1.1` and `1.2`. The trailing dot only appears on the top level, so nested items read `1.1` rather than `1.1.`. The `ordered-circle` variant always shows a plain number without a dot, as the number is displayed inside a circle.

<!-- example(list-nesting) -->
