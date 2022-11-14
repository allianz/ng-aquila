---
title: Header
category: components
b2c: false
expert: true
stable: done
alias: toolbar, navbar
---

<div class="docs-deprecation-warning">
  <strong>Expert: </strong>
  Please note that this is an Expert component. This means that it is intended for internal applications (B2B/B2E) and not for applications that are client facing (B2C).
</div>

The header is placed at the top of your application and can have one or two rows. It usually contains a brand logo, navigation links and other actions like a user profile.

The header provides a layout consisting of three sections, `<nx-header-brand>`, `<nx-header-navigation>` and `<nx-header-actions>`. The `<nx-header-brand>` is the first section from the left and contains the applications/brands logo.

Next there is a `<nx-header-navigation>` section that can contain navigation links. The styling of the individual navigation links is provided by the `nxHeaderLink` directive.

The last section is the `<nx-header-actions>` which can contain any other actions like a user profile popover.

### Basic header

<!-- example(header) -->

### Multiple rows

In some cases you want to have a header with two rows. In this case simply place another `<nx-header-row>` element after the first one.

```html
<header nx-header>
    <nx-header-row> First row </nx-header-row>
    <nx-header-row> Second row </nx-header-row>
</header>
```

<!-- example(header-two-rows) -->

<div class="docs-expert-container">

### Expert

#### Application title and Header Actions

You can show the title of your application in the header by using the `<nx-header-app-title>` directive inside the `<nx-header-brand>` as shown in the example below. The application title is displayed after the logo separated by a vertical line.

`<nx-header-actions>` is a container where additional actions can be placed. Depending on the action, use links if it redirects to a different page, or a button if it is an action happening on the current page.

<!-- example(header-icons) -->

#### Co-branding

A co-branding can be used in the header. It is positioned in the rightmost position separated by a vertical line. The `<nx-header-actions>` directive supports showing a left vertical separation line by setting the property `showSeparator=true`.

<!-- example(header-cobranding) -->
</div>
