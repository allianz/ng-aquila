---
title: Info Icon
category: components
b2c: true
expert: true
stable: done
a1: true
---

The Info Icon component is a simplified wrapper around the [Popover component](./documentation/popover/overview), designed to display contextual information via an icon button. It requires Angular CDK (incl. CSS). Learn [how to enable Angular CDK styles](./documentation/overlay/overview#angular-cdk).

### Basic Usage

<!-- example(info-icon) -->

### Inline Usage

<!-- example(info-icon-inline) -->

### Modal Popover

<!-- example(info-icon-modal) -->

### Scroll Strategy

The Info Icon component uses the [Popover component](./documentation/popover/overview) internally. The scroll strategy is set to `close` by default, which means the popover will automatically close when the user scrolls. For further Information, refer to the [Popover global settings documentation](./documentation/popover/overview#global-settings-1).
