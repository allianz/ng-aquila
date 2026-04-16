---
name: a1-migration
description: 'Migrate an Angular application to the One Allianz (A1) Design System. Use when: migrating to A1 design system, applying One Allianz theme, migrating circle toggles to tiles, updating small stages, updating layout to left-alignment, A1 brand kit, ngx-brand-kit, ng-aquila migration, NDBX to A1.'
argument-hint: 'Theme (optional): spacious | compact | dense'
metadata:
  version: 0.1.3
---

# A1 Design System Migration

## When to Use

- Migrating an Angular app from NDBX/old design system to One Allianz (A1) Design System
- Applying One Allianz theme (`spacious`, `compact`, or `dense`)
- Replacing `nx-circle-toggle` / `nx-circle-toggle-group` with `nx-tile` / `nx-tile-group`
- Replacing info buttons with popovers to use the new `NxInfoIconComponent`
- Updating layout from center-aligned to left-aligned (A1 standard)
- Adjusting `nx-small-stage` components, eyebrows and attention-color headlines

## How to Apply Changes
- if css is required, add to the component's CSS file. If the component is standalone, add the CSS to the component's `styles` array in the `@Component` decorator.
- write style definitions into components style file. Do not use inline styles in the HTML template. 


---

**IMPORTANT:** Before starting, tell the user the skill version "0.1.3" and that it's in beta phase. This is important for tracking and future updates.

## Step 1: Apply A1 Theme

**Important:** check if package `@allianz/ngx-brand-kit` is installed.
- if not installed, do not try to install, do not ask the user to install and skip this step and continue with Step 2. 
- if installed, continue with the Procedure as described below.

### Procedure

1. If theme is not specified, ask the user which theme they want: `spacious`, `compact`, or `dense`.

- spacious for end customer-facing apps with more white space and larger touch targets
- compact for internal tools and dashboards where more information density is needed
- dense for data-heavy applications where maximum information density is required (e.g. tables, analytics)

2. Run the schematic from the project root (where `angular.json` lives):
   ```bash
   ng g @allianz/ngx-brand-kit:apply-a1-theme --type=<THEME>
   ```


---

## Step 2: Migrate Circle Toggles → Tiles

**Stack**: Angular standalone components, TypeScript, `@allianz/ng-aquila`

### Imports

```ts
import { NxTileComponent, NxTileGroupComponent } from '@allianz/ng-aquila/tile';
```

If used in a Standalone Component, add the `NxTileComponent, NxTileGroupComponent` to the components `imports` array.

### Decision Rules

| Scenario | Action |
| --- | --- |
| `nx-circle-toggle` not in a group | Multi-select → use `nx-tile-group [value]="arrayOfValues"` |
| `nx-circle-toggle` inside `nx-circle-toggle-group` | Single-select → use `nx-tile-group [value]="selectedValue"` |
| `circleText` attribute present | Remove it; add `<!-- TODO: revisit once toggle-button component is available -->` |

### Selection / Forms Pattern

**Before (checked-based)**:

```html
<nx-circle-toggle-group>
  <nx-circle-toggle
    [checked]="sel==='a'"
    value="a"
    label="Label A"
    icon="icon-name"
  ></nx-circle-toggle>
  <nx-circle-toggle
    [checked]="sel==='b'"
    value="b"
    label="Label B"
    icon="icon-name"
  ></nx-circle-toggle>
</nx-circle-toggle-group>
```

**After (value-based on group)**:

```html
<nx-tile-group [value]="sel">
  <nx-tile value="a" label="Label A" icon="icon-name"></nx-tile>
  <nx-tile value="b" label="Label B" icon="icon-name"></nx-tile>
</nx-tile-group>
```

> **IMPORTANT**: Do NOT put content inside `<nx-tile>`. Use only `label`, `value`, and `icon` attributes.

### Layout Rules

| Layout found | What to do |
| --- | --- |
| No wrapper, no layout CSS | Replace group directly; no extra layout needed |
| `nxLayout` / `nxRow` / `nxCol` grid | Derive `maxColumns` from lowest `nxCol` number: `12 ÷ lowest = maxColumns`. Remove grid wrapper. |
| Custom CSS | Translate to `[maxColumns]` on `nx-tile-group`; copy CSS only if auto-grid is insufficient |
| 2–3 tiles total | Wrap `nx-tile-group` in `nxCol="12,12,6"` (half-width) |

For each occurrence found, output a short decision log: what was there, what you chose and why.

---

## Step 3: Migrate Info Popups → new Info Icon Component

1. **Identify info buttons with popups:** look for buttons (e.g. buttons with directive `nxPopoverTrigger`) that trigger popovers and just have an info icon inside.
2. **Replace with `NxInfoIconComponent`:** use the new component for consistent styling and behavior.
3. **Example:**

```html
<nx-info-icon
  nxFormfieldAppendix
  buttonAriaLabel="Additional information"
  popoverDirection="bottom"
  popoverWidth="300px"
>
  <span>
    This is an info icon with a popover. Click the icon to see additional information. Sadipscing
    elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua.
  </span>
</nx-info-icon>
```

And the corresponding import:

```ts
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
```
If used in a Standalone Component, add the `NxInfoIconComponent` to the components `imports` array.

4. **Important:** Do not change buttons inside Formfields (`<nx-formfield>`). Only replace standalone info buttons that trigger popovers.

---

## Step 4: Update Layout — Left Alignment

A1 uses left-alignment throughout for accessibility and consistency.

### Checklist

1. **Remove centering on rows**: Change or remove `rowJustify="center"` → use `rowJustify="start"` or remove entirely.
2. **Remove text centering**: Remove `class="text-center"`, `style="text-align: center"`, and similar on headings and paragraphs.
3. **Bottom navigation buttons (Back / Next)**:
   - Must be **right-aligned** (`rowJustify="end"`)
   - Must be **side-by-side** (same `nxRow`, not stacked in separate rows)
   - Must use **sentence case** ("Back", "Next") not ALL CAPS
   - `nxCol` only accepts numbers — **warning** `nxCol="auto"` will break; use `nxCol="12"`, `nxCol="12,12,6"` or similar
   - info on `nxCol`: breakpoints are defined as `nxCol="<tiny>, <small>, <medium>, <large>, <xlarge>, <2xlarge>, <3xlarge>"`
   - must be vertically centered within the row — if `nxRow` is used, add `rowAlignItems="center"`. 
4. **Margins / padding**: Remove `margin: auto`, horizontal centering, and ensure content aligns to the left edge.

### Vertical Spacing Adjustments
- **Important**: Skip this step if the `ngx-brand-kit` is not installed and continue with `Headline Sizes` below. The spacing values below rely on CSS variables from the A1 brand kit, so if it's not installed, leave spacing as-is.
- Find Dividers (`<hr>`, `nx-divider`, `nxCol="12" class="section-divider"` or similar) divider lines that span the full width of the page and add vertical spacing above and below them. Use `var(--semantic-gap-all-static-1600)` for this spacing to ensure consistency with A1 design standards.
- Headlines that are used standalone (outside of other components) should have a spacing below them. Use the mapping below
  - `nxHeadline size="3xl"` → `var(--semantic-gap-all-static-1200)`
  - `nxHeadline size="2xl"` → `var(--semantic-gap-all-static-1000)`
  - `nxHeadline size="xl"` → `var(--semantic-gap-all-static-800)`
- If the element underneath the headline has a top spacing (e.g. `margin-top` or `padding-top`), remove it to avoid double spacing or subtract the headline spacing from it.

### Headline Sizes

**Hierarchy rule — applies after the mapping table and overrides it where needed:**
The mapping table below is a starting point, not a final answer. After applying it, verify that the resulting sizes form a clear visual hierarchy on the page. If a primary section heading (e.g. an `<h2>` that is the main title of a page section) maps to a small size like `s` or `m`, **override the mapped value** to restore the hierarchy. A page with an `h1` at `size="3xl"` should use `size="2xl"` for its primary `h2` sections, `size="xl"` for sub-sections, and so on — regardless of what the old assignment was.

- if you find `nxHeadline` with type assignments (e.g.  `<h1 nxHeadline="page">` ), translate to `size` attribute. For example, `<h1 nxHeadline="page">` becomes `<h1 nxHeadline size="3xl">`. Ensure the main headline in `nx-small-stage` uses `size="3xl"` for A1 consistency.

| old assignment | size attribute | use for |
| --- | --- | --- |
| nxHeadline="page-bold-caps" | nxHeadline size="4xl" | huge page headlines, only for marketing pages, not for product UIs |
| nxHeadline="page" | nxHeadline size="3xl" | main page headlines |
| nxHeadline="section" | nxHeadline size="2xl" | section headlines |
| nxHeadline="subsection-large" | nxHeadline size="xl" | large subsection headlines |
| nxHeadline="subsection-medium" | nxHeadline size="l" | medium subsection headlines |
| nxHeadline="subsection-small" | nxHeadline size="m" | small subsection headlines |
| nxHeadline="subsection-xsmall" | nxHeadline size="s" | extra small subsection headlines |

After applying the table, check: does the result make sense in context? A primary `<h2>` section heading should never end up at `size="s"` just because the old code used `subsection-xsmall`. Promote it to the correct level in the page hierarchy.

---

## Step 5: Adjust Small Stages

### 5.1 Subline → Eyebrow

Move any `<p nxCopytext="large">Subline</p>` inside `nx-small-stage` to an eyebrow **above** the `<h1>`:

```html
<nx-eyebrow size="s">Subline Text</nx-eyebrow>
<h1 nxHeadline size="3xl">...</h1>
```

Use the `size="s"` eyebrow size for nxHeadline size 3xl and smaller. If the user wants a nxHeadline larger than 3xl, use `size="m"` for the eyebrow.

```ts
import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
```
If used in a Standalone Component, add the `NxEyebrowComponent` to the components `imports` array.

### 5.2 Partial Headline Coloring (required)

**Always** wrap the most meaningful word or short phrase in the `<h1>` with an attention-color span. This is a required A1 design standard for `nx-small-stage` headlines — do not skip it. Choose the word or phrase that carries the most semantic weight (the product, the action, or the subject — not filler words like "your" or "and").

```html
<h1 nxHeadline size="3xl">Enter your <span [nx-attention-color]="'aqua'">property details</span></h1>
```

```ts
import { NxAttentionColorComponent } from '@allianz/ng-aquila/text';
```

If used in a Standalone Component, add the `NxAttentionColorComponent` to the components `imports` array.

### 5.3 Headline Size

- remove assignments to `nxHeadline` in HTML headline elements (e.g. `<h1 nxHeadline="page">`) and replace with `<h1 nxHeadline size="3xl">` for all small stage headlines. Ensure the main headline in `nx-small-stage` uses `size="3xl"` for A1 consistency.

---

## Migration Tracking

After completing each step, record the migration so adoption can be tracked across teams via GitHub search.

### Project-level metadata in `package.json` 

After **Step 1** (theme applied), add an `a1Migration` key to `package.json`. After each subsequent step completes, append the step name to the `steps` array:

```json
"a1Migration": {
  "skillVersion": "0.1.3",
  "appliedAt": "YYYY-MM-DD",
  "theme": "<spacious|compact|dense>",
  "steps": ["theme"]
}
```

Append step names as they complete: `"theme"`, `"tiles"`, `"info-icons"`, `"layout"`, `"small-stage"`.

A fully migrated project looks like:

```json
"a1Migration": {
  "skillVersion": "0.1.3",
  "appliedAt": "YYYY-MM-DD",
  "theme": "<spacious|compact|dense>",
  "steps": ["theme", "tiles", "info-icons", "layout", "small-stage"]
}
```

### tracking of additional migration runs

If `package.json` already has an `a1Migration` key, add the steps to the array for steps that ran in the current session. 