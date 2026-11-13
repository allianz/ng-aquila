---
title: Signal Button
description: Button with integrated status signal
category: components
a1Full: true
group: Data Display
---

The signal button can be used to open a popover with a message. With use of `popoverDirection` the popover can be opened in the direction `top`, `bottom`, `left` and `right`. The popover `scrollStrategy` can be set to `close` or `reposition`.

### Context

The `context` is set to `positive` per default, but the signal button can also be used with context `critical`, `warning` or `info`.

<div class="docs-deprecation-warning">
<code>error</code> and <code>success</code> are deprecated aliases of <code>critical</code> and <code>positive</code>. They still work, but use the new names for new code.
</div>

<!-- example(signal-button-context) -->

### Size

With `size` the signal button can be rendered as `m` (default) or `s`. Use `s` for dense contexts, for example inside a [formfield](/documentation/formfield/overview) that uses `size="s"`.

<!-- example(signal-button-size) -->

### Disabled

With `disabled` the signal button can be disabled.

<!-- example(signal-button-disabled) -->


### Accessibility

When using the `nx-signal-button` please set a suitable `aria-label` for it.
