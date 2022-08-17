---
title: Footer
category: components
b2c: false
expert: true
stable: done
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

This component provides a basic skeleton of the footer including two parts. On one hand there is the `nx-footer-copyright` section, which applies a basic styling to this block. On the other hand there is the `nx-footer-navigation` directive in order to give this element the `list` role. In there, you have the option to place all your footer links. They have to be placed inside of the `nx-footer-link` selector in order to get the `listitem` role and the corresponding styling and behaviour.

#### Basic footer

Use the `nx-footer-copyright` directive to set any copyright text and navigation links via `nx-footer-navigation` and `nx-footer-link`.

<!-- example(footer-basic) -->

#### Default copyright

You can set default copyright text by omitting the `nx-footer-copyright` directive and using the `copyright` input for company name instead.

<!-- example(footer-default-copyright) -->
