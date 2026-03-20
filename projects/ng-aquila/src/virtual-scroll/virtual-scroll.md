---
title: Virtual Scroll
description: Efficient rendering of large lists by virtualizing viewport items
category: components
b2c: true
expert: true
stable: done
a1: true
---

The virtual scroll component provides efficient rendering of large lists by only rendering items visible in the viewport. The items can be of various and dynamic height.


### Basic Usage

The simplest usage requires only an array of items. By default, the component expects items to have a `value` property for tracking.

<!-- example(virtual-scroll-basic) -->

### Custom Item Template

Items are rendered using the `*nxVirtualFor` structural directive, similar to `*ngFor`. The template context provides the following variables:

| Variable | Type | Description |
| -------- | ---- | ----------- |
| `$implicit` | `T` | The item data (accessed via `let item`) |
| `index` | `number` | The index in the items array |
| `count` | `number` | Total number of items |
| `first` | `boolean` | Whether this is the first item |
| `last` | `boolean` | Whether this is the last item |
| `even` | `boolean` | Whether the index is even |
| `odd` | `boolean` | Whether the index is odd |

<!-- example(virtual-scroll-template) -->

### Track By

Use the `trackBy` option on `*nxVirtualFor` to optimize rendering and height caching when items change.

**String accessor** (property name):

```html
<ng-container *nxVirtualFor="let item of items; trackBy: 'id'">
```

**Function accessor** (for complex objects):

```html
<ng-container *nxVirtualFor="let item of items; trackBy: trackByFn">
```

```typescript
trackByFn = (index: number, item: MyItem) => item.id;
```

### Item Height and Performance

The component uses a hybrid approach for item heights:

1. **Initial estimate**: Items start with the `itemHeight` value (default: 36px)
2. **Dynamic measurement**: After rendering, actual heights are measured via ResizeObserver
3. **Height cache**: Measured heights are cached for optimal performance

| Input | Default | Description |
| ----- | ------- | ----------- |
| `itemHeight` | `36` | Estimated height in pixels for items before measurement |
| `overscan` | `20` | Number of items to render above/below visible area |

**Performance tips:**

- Set `itemHeight` close to your actual item height for smoother initial scroll
- Increase `overscan` if you see blank areas during fast scrolling

### Events

The viewport emits events when the visible range changes. For item clicks, use standard Angular `(click)` event binding on your item template.

<!-- example(virtual-scroll-events) -->

| Output | Event Type | Description |
| ------ | ---------- | ----------- |
| `visibleRangeChange` | `VirtualRangeChangeEvent` | Emitted when the visible range changes |

**VirtualRangeChangeEvent properties:**

```typescript
interface VirtualRangeChangeEvent {
    start: number;  // First visible index (including overscan)
    end: number;    // Last visible index (including overscan)
}
```

### Programmatic Navigation

The viewport provides methods for programmatic scrolling.

<!-- example(virtual-scroll-navigation) -->

**Viewport methods:**

| Method | Parameters | Description |
| ------ | ---------- | ----------- |
| `scrollToIndex(index, behavior?)` | `index: number`, `behavior: ScrollBehavior = 'auto'` | Scroll to put a specific index at the top |
| `scrollIntoView(index)` | `index: number` | Minimal scroll to make an item visible (no-op if already visible) |

**ScrollBehavior options:**

- `'auto'` - Instant scroll (default)
- `'smooth'` - Animated smooth scroll

### Accessibility

When integrating the virtual viewport with form controls like dropdowns, the parent component is responsible for managing keyboard navigation and active state. Ensure proper ARIA attributes are applied to the container for screen reader support.
