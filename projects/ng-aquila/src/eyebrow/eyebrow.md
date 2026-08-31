---
title: Eyebrow
description: Small text above headlines for additional context
category: components
a1Full: true
group: Data Display
---

### Overview

Import it with

<p class="docs-api-module-import">
  <code style="white-space: normal">
    <span class="docs-api-module-import__import-span">import</span>
    { NxEyebrowModule }
    <span class="docs-api-module-import__from-span">from</span>
    <span class="docs-api-module-import__path-span">'@allianz/ng-aquila/eyebrow'</span>;
  </code>
</p>

The Eyebrow can give more context with Headlines

<!-- example(eyebrow-headline) -->

The selector for the Eyebrow can be used as a standalone html tag via `<nx-eyebrow>` or as a html attribue like `<p nxEyebrow>`.

<!-- example(eyebrow) -->

### Color scheme

Use the `colorScheme` input (`default` or `on-accent-attention`) to place an eyebrow on an
accent-colored surface. Combine with `inverse` for accent surfaces on dark backgrounds.

<!-- example(eyebrow-color-scheme) -->

