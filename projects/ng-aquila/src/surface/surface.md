---
title: Surface
category: utilities
b2c: false
expert: false
stable: experimental
a1: true
---

<div class="docs-info">
  <strong>Developer preview: </strong>
  <code>nxSurface</code> is still being integrated across components. Not every component adapts to its surface yet, and the API may still change.
</div>

## Overview

A container that paints a coloured background needs everything inside it to switch to matching
colours. When its content is arbitrary — projected via `ng-content`, or written by an app — it cannot
reach in and set inputs.

`nxSurface` declares the surface for its descendants and paints the matching background on itself.
Adopting components adapt on their own. Use `accent-attention` with `nxSurfaceAccentColor` for one of
the nine accent hues.

```html
<div nxSurface="attention" class="my-banner">
  <h3 nxHeadline size="m">Recommended</h3>
  <my-widget>…</my-widget>
</div>
```

**`accent-attention` is not supported in NDBX** — it has no accent palette of its own, so contrast
fails. Use `attention` or `emphasis` there.

To use the ng-aquila components with `nxSurface` omit any inverse/negative or accentColor inputs otherwise the explicitly set inputs will take precedence.

<!-- example(surface-basic) -->

## Reacting in your own component

Map the surface onto the modes your component already has:

```ts
import { injectSurface } from '@allianz/ng-aquila/surface';

@Component({
  selector: 'my-widget',
  host: { '[class.is-inverse]': '_inverse()' },
})
export class MyWidgetComponent {
  private readonly surface = injectSurface();

  protected readonly _inverse = computed(() => this.surface().surface === 'attention');
}
```

The accent color only exists when surface is set to `accent-attention` arm, so narrow before reading it:

```ts
protected readonly _accentColor = computed(() => {
  const resolved = this.surface();
  return resolved.surface === 'accent-attention' ? resolved.accentColor : undefined;
});
```

Narrowing needs a local — two `surface()` calls do not narrow each other. In a template, bind once
with `@if (surface(); as resolved)`.

## Nesting

The nearest declared `nxSurface` wins over any surface declared further out. Use `inherit` to pass
the enclosing surface through unchanged instead of declaring a new one, and `default` to reset back
to the neutral surface.

<!-- example(surface-nesting) -->

## Resetting for painted containers

A component that paints its own background — a card, a modal panel — sits visually on its own
surface, not on whatever surface encloses it. If it does nothing, `injectSurface()` inside it still
resolves to the enclosing surface, so its content adapts to a background it no longer sits on. Such a
component must reset propagation for its own content by providing `NX_SURFACE` as `undefined`:

```ts
@Component({
  selector: 'my-panel',
  providers: [{ provide: NX_SURFACE, useValue: undefined }],
})
export class MyPanelComponent {}
```

`[nxSurfaceBackground]="false"` is **not** that reset — it only suppresses the paint on the `nxSurface`
host itself, while descendants keep reacting to the declared surface. Reach for it only when the host
paints that *same* surface color itself, through other means.

<!-- example(surface-reset) -->

Overlays (dropdowns, tooltips, modals) are the trickiest case: they render at body level, outside the
visual tree, but injection still reaches them through the trigger's injector, so they need this same
reset. ng-aquila's overlays already do it. Note that today this only resets propagation to `default` —
an overlay opened from an `attention`/inverse context does not yet get a non-attention surface of its
own; that is a planned improvement, not something `NX_SURFACE` solves by itself.

## Styling from CSS

Declared surfaces are also rendered as attributes:

- `data-nx-surface="attention" | "emphasis" | "accent-attention"` — absent on the default surface.
- `data-nx-accent-color="purple" | …` — only on an `accent-attention` surface.

<!-- example(surface-css) -->

Unlike `injectSurface()`, a descendant selector does not stop at a nested reset:
`[data-nx-surface='attention'] .x` still matches inside a `nxSurface="default"`.
