---
title: Tabs
description: Tabbed content navigation
category: components
b2c: true
expert: true
stable: done
alias: navigation tabs
a1Densities: true
group: Navigation
---

### Basic Example

<!-- example(tabs-basic) -->

### Header alignment and styles

From the style guide, the tab buttons are centered inside the tab header by default. You can change it by using the `nx-tab-header` element and set `justify-content: flex-start`.

<!-- example(tabs-styling) -->

### Template Example

If you want to use more than just a string in the header you can provide a template with the `nxTabLabel` directive.

<!-- example(tabs-template) -->

### Lazy loaded content

If you want to delay the initialization of the content of the tabs you can provide a template with the `nxTabContent` directive. _Please note_: only the content of the active tab is attached to the DOM regardless if you use lazy loading or not but if you do not provide a template the content is created by Angular when the tabs are created.

<!-- example(tabs-lazy) -->

### Dynamic

You can add and remove tabs dynamically.

<!-- example(tabs-dynamic) -->

<div class="docs-hide-ndbx">

### Closable tabs

Add `closable` to an `nx-tab` to show a close button next to its label. The button can also be triggered with the keyboard by pressing `DELETE` or `BACKSPACE` while the tab is focused.

Closing a tab doesn't remove it on its own. Instead the `nx-tab-group` emits `tabClose` (and the individual tab emits `closed`), leaving you in control of what happens next — usually removing the tab from the list you render it from, as shown below.

<!-- example(tabs-closable) -->

#### Closing event

You can use the `tabClose` event to run your own logic before a tab disappears, for example asking the user to confirm. This is also useful to prevent a tab from being closed accidentally with `DELETE` or `BACKSPACE`.

<!-- example(tabs-closable-confirm) -->

</div>

### Tabs as a Navigation Bar

While `nx-tab-group` is used to switch the content within a single route, `nx-tab-nav-bar` provides a tab-like component for navigating between routes. The `nx-tab-nav-bar` component is not tied to any router, it uses normal `a` elements and the active property of `nxTabLink` to determine which tab is currently active. The corresponding `router-outlet` can be placed anywhere in the view.

<!-- example(tabs-nav-bar) -->

### Negative styling

<!-- example(tabs-negative) -->

### Disabled

You can disable the whole tab group by setting the property `disabled` on `nx-tab-group` or alternatively disable only a particular tab by setting it on `nx-tab`.

**Pay attention that a disabled and active tab violates the accessibility of the component**, therefore we set the next focusable tab as active in case active and disabled is set on the same tab. If no tab is focusable, no tab is set as active and `selectedIndex` becomes -1.

<!-- example(tabs-disabled) -->

### Output events

The `selectedTabChange` event is emitted when the active tab changes

The `focusChange` event is emitted when the focus on a tab label changed.

Both events return an instance of `NxTabChangeEvent` containing the index and the tab instance.

If no tab is selectable anymore, `selectedIndexChange` emits `-1` while `selectedTabChange` does not emit, as there is no tab instance to report.

Limitations: The `focusChange` event is currently not supported on mobile breakpoints as the accordion is lacking this feature.

<!-- example(tabs-output-events) -->

### Responsive behavior

The tabs component will switch to an accordion for mobile viewports and reuses the libraries' Accordion component. The content of the tab gets detached in this process and attached into the accordion and vice versa. Components in the tab contents will not be destroyed and keep their state so you can safely use any custom component.

You can access the accordion component instance by the public accordion property of the TabGroupComponent. To disable the switch to the accordion you can set the input property `mobileAccordion = false`.

Important notice: The `(focusChange)` event is currently not supported by the accordion so you should not rely on this event for mobile viewports. The `(selectedTabChange)` event however will work also if the accordion is active.

<!-- example(tabs-responsive) -->

<div class="docs-expert-container">

### Expert: Appearance

With `appearance="expert"` you can change the styling of the tabs.

Please note that **this is an Expert styling option**. This means that the expert appearance is only intended for internal applications and not for applications that are client facing.

<!-- example(tabs-appearance) -->

You can also use the expert styling with the navigation bar:

<!-- example(tabs-nav-bar-appearance) -->

#### Indicators

Using the [`<nx-indicator>`](./documentation/indicator/overview) certain tabs can be marked.

<!-- example(tabs-with-indicator) -->

This is also possible with the navigation bar:

<!-- example(tabs-nav-bar-with-indicator) -->

</div>

### Accessibility

#### Keyboard support

| Shortcut | Action |
| --- | --- |
| `LEFT_ARROW` | Move focus to the previous tab. If focus is on the first tab move to the last tab. |
| `RIGHT_ARROW` | Arrow Move focus to the next tab. If focus is on the last tab move to the first tab. |
| `TAB` | When the focus moves into the tab header, places the focus on the active tab header element. When the tab header is already focused, moves focus to the next element in the tab sequence which is the tab-body element. |
| `HOME` | Move focus to the first tab. |
| `END` | Move focus to the last tab. |
| `ENTER`, `SPACE` | Select the focused tab and show its content. When a close button is focused, closes its tab instead. |
| `DELETE`, `BACKSPACE` | Close the focused tab if it is `closable`. |

On a `closable` tab, `TAB` moves focus from the tab onto its close button and `SHIFT+TAB` moves it back.

After a tab is removed, focus moves to the tab that took its place, or to the nearest enabled tab. If no tab is focusable anymore, focus moves to the first focusable element after the tab group. When you remove the last tab, render an empty state, `selectedIndexChange` emits `-1` to signal that no tab is selectable.

#### Auto select vs. manual select

You can choose between two patterns:

-   **auto select:** when the user puts focus on a tab label via keyboard input the tab gets automatically selected and shown.
-   **manual select:** when the user puts focus on a tab label he has to manually press SPACE or ENTER to select the tab.

You can toggle the autoselect setting with the button below. Then try it out by tabbing onto the tab labels and see the difference when you press the left and right arrow keys.

<!-- example(tabs-auto-manual-select) -->

### Localization

The close button of a `closable` tab has an `aria-label` and closing a tab is announced to screen readers. Both texts are english by default. To translate them, subclass `NxTabsIntl` and provide it in your module or component.

| Property | Default | Description |
| --- | --- | --- |
| `closeAriaLabel` | `Close {label}` | The `aria-label` of a closable tab's close button. Receives the tab's label. |
| `closeAnnouncement` | `{label} closed` | The message announced to screen readers after a closable tab was closed. Receives the tab's label. |

<!-- example(tabs-localize) -->

### Global settings

You can use the `TAB_GROUP_DEFAULT_OPTIONS` injection token if you want to set the `[appearance]` property on `<nx-tab-group>` component globally.

<!-- example(tabs-injection-token) -->

The same applies if you're using the tabs as a navigation bar (use `TABS_NAV_BAR_DEFAULT_OPTIONS`):

<!-- example(tabs-nav-bar-injection-token) -->
