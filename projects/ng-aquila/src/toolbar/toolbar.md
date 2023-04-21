---
title: Toolbar
category: components
b2c: false
expert: true
stable: done
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

The toolbar is a visual container for elements (e.g. icons, buttons, icon tooltips). It is recommended to keep the total number of icons as short as possible as well as to avoid combining a back button with breadcrumbs. The toolbar should only contain CTA elements that influence the content area. It is not used for information or global navigation (e.g progress bar).

<!-- example(toolbar) -->

### Toolbar with divider

In combination with a business description and a divider line, an icon only back-link can be used. Use `<nx-toolbar-divider>` for the divider.

<!-- example(toolbar-divider) -->

### Positioning toolbar content

The toolbar component is a container for its content without any positioning. So you have the freedom to position the content depending on the use case.

The toolbar uses a flexbox row layout. This makes positioning the elements easy using flex.

<!-- example(toolbar-positioning-content) -->
