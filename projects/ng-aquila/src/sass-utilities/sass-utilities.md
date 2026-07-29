---
title: Sass utilities
category: general
b2c: true
expert: true
stable: done
noApi: true
a1Light: true
---

The library ships a small set of Sass helpers so you can align your own styles with the same
breakpoints the components use. They are available as a `@use` entry point, no `@import` needed:

```scss
@use '@allianz/ng-aquila/styles/utils' as aquila;

.my-card {
  padding: 16px;

  @include aquila.media-breakpoint-up(medium) {
    padding: 24px;
  }
}
```

### Media queries

Each mixin takes a breakpoint name and wraps its content in the matching media query.
`media-breakpoint-between` takes a lower and an upper breakpoint.

| Mixin | Description |
| --- | --- |
| `media-breakpoint-up($name)` | Applies from the given breakpoint upwards. No query is emitted for the smallest breakpoint. |
| `media-breakpoint-down($name)` | Applies from the given breakpoint downwards. No query is emitted for the largest breakpoint. |
| `media-breakpoint-between($lower, $upper)` | Applies between the two given breakpoints. |
| `media-breakpoint-only($name)` | Applies only within the given breakpoint. |

```scss
@use '@allianz/ng-aquila/styles/utils' as aquila;

.my-teaser {
  @include aquila.media-breakpoint-only(medium) {
    display: none;
  }
}
```

### Container queries

The same breakpoints are available as container queries, for components that should respond to
their container instead of the viewport. Remember to set `container-type` on the containing element.

| Mixin | Description |
| --- | --- |
| `container-breakpoint-up($name)` | Applies from the given breakpoint upwards. |
| `container-breakpoint-down($name)` | Applies from the given breakpoint downwards. |

```scss
@use '@allianz/ng-aquila/styles/utils' as aquila;

.my-panel {
  container-type: inline-size;
}

.my-panel__content {
  @include aquila.container-breakpoint-up(large) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

### Breakpoint values

`$grid-breakpoints` holds the breakpoint names and their minimum widths.

| Name | Min width |
| --- | --- |
| `xsmall` | 0 |
| `small` | 320px |
| `medium` | 704px |
| `large` | 992px |
| `xlarge` | 1280px |
| `2xlarge` | 1472px |
| `3xlarge` | 1760px |

The main entry point also exposes `$grid-breakpoints-short` (the same map keyed `xs` … `3xl`),
`$grid-columns` and `$grid-gutter-widths`.

The directly importable `@allianz/ng-aquila/styles/utils/grid` module additionally exposes the
individual `$grid-gutter-width-large`, `$grid-gutter-width-base` and
`$grid-gutter-width-mobile` values.

Every mixin and function accepts an optional `$breakpoints` argument, so you can pass your own map
instead of the library defaults:

```scss
@use '@allianz/ng-aquila/styles/utils' as aquila;

$my-breakpoints: (
  small: 0,
  large: 900px,
);

.my-component {
  @include aquila.media-breakpoint-up(large, $my-breakpoints) {
    display: flex;
  }
}
```

### Functions

| Function | Description |
| --- | --- |
| `breakpoint-min($name)` | Minimum width of a breakpoint, or `null` for the smallest one. |
| `breakpoint-max($name)` | Maximum width of a breakpoint, or `null` for the largest one. |
| `breakpoint-next($name)` | Name of the next larger breakpoint, or `null`. |
| `breakpoint-infix($name)` | `""` for the smallest breakpoint, otherwise `"-#{$name}"`. Useful for generating responsive class names. |

### Supported scope

The Sass modules shipped under `styles/utils` and their members are supported. Other files from the
library's internal `shared-styles` source folder are not public API.

Theming has its own supported entry point at `styles/theming`, described in
[Theming](./documentation/theming/overview).
