---
title: Info Icon
description: Icon button that reveals contextual information via a popover
category: components
b2c: true
expert: true
stable: done
a1: true
a1Densities: true
group: Data Display
---

The Info Icon component is a simplified wrapper around the [Popover component](./documentation/popover/overview), designed to display contextual information via an icon button. It requires Angular CDK (incl. CSS). Learn [how to enable Angular CDK styles](./documentation/overlay/overview#angular-cdk).

> **Inside a formfield or label?** To add an info icon to a form field or a [label](./documentation/base/overview), project `<nx-info-icon>` and mark it with the `nxLabelInfo` directive rather than placing a raw popover button in the `nxFormfieldAppendix` slot. The component then handles placement for you — next to the label under Allianz One, and in the appendix under NDBX. See the [formfield documentation](./documentation/formfield/overview) for details.

### Basic Usage

<!-- example(info-icon) -->

### Inline Usage

<!-- example(info-icon-inline) -->

### Modal Popover

<!-- example(info-icon-modal) -->

### Scroll Strategy

The Info Icon component uses the [Popover component](./documentation/popover/overview) internally. The scroll strategy is set to `close` by default, which means the popover will automatically close when the user scrolls. For further Information, refer to the [Popover global settings documentation](./documentation/popover/overview#global-settings-1).
