---
name: a1-migration
description: 'Migrate an Angular application to the One Allianz (A1) Design System. Use when: migrating to A1 design system, applying One Allianz theme, migrating circle toggles to tiles, updating small stages, updating layout to left-alignment, A1 brand kit, ngx-brand-kit, ng-aquila migration, NDBX to A1.'
argument-hint: 'Theme (optional): spacious | compact | dense'
metadata:
  version: 0.1.5
---

# A1 Design System Migration

## When to Use

- Migrating an Angular app from NDBX/old design system to One Allianz (A1) Design System
- Applying One Allianz theme (`spacious`, `compact`, or `dense`)
- Replacing `nx-circle-toggle` / `nx-circle-toggle-group` with `nx-tile` / `nx-tile-group`
- Replacing info buttons with popovers to use the new `NxInfoIconComponent`
- Updating layout from center-aligned to left-aligned (A1 standard)
- Adjusting `nx-small-stage` components, eyebrows and accent-color headlines

## How to Apply Changes
- if css is required, add to the component's CSS file. If the component is standalone, add the CSS to the component's `styles` array in the `@Component` decorator.
- write style definitions into components style file. Do not use inline styles in the HTML template.


---

**IMPORTANT:** Before starting, tell the user the skill version "0.1.5" and that it's in beta phase. This is important for tracking and future updates.

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

4. **Important:** For info buttons **inside** a Formfield (`<nx-formfield>`), do NOT use this standalone
   `<nx-info-icon>` replacement — migrate them with **Step 3.1** below instead. This step (Step 3) only
   covers standalone info buttons that trigger popovers outside of a formfield.

### Step 3.1: Formfield info icons → `nxLabelInfo` projection slot

Formfields expose a content-projection slot for the label info icon: project an info-icon component
into the formfield and mark it with the `nxLabelInfo` directive. It renders next to the label (in A1,
where the label is permanently floated). Migrate the old workaround — an info-icon/popover manually
placed in the formfield's `nxFormfieldAppendix` slot — to this slot.

1. **Identify:** an `<nx-formfield>` that contains, in its `nxFormfieldAppendix` slot, either
   - an existing `<nx-info-icon nxFormfieldAppendix>…</nx-info-icon>`, or
   - a button with `nxPopoverTrigger` (or `[nxPopoverTriggerFor]`) holding an info icon (e.g.
     `<nx-icon name="info-circle-o">`) whose popover just explains the field.
2. **Replace:** put an `<nx-info-icon nxLabelInfo>…</nx-info-icon>` inside the formfield with the help
   content projected directly (plain text or structured markup). Remove the old appendix button/popover
   markup. Because the info icon is now a projected component, you keep full control over its API
   (`popoverDirection`, `popoverWidth`, `popoverModal`, `buttonAriaLabel`, …) directly on the element —
   and you can project a custom/entity-specific info-icon implementation into the same slot.
3. **Works with a custom label too:** the slot renders the icon regardless of whether the label comes
   from the `label` string input or a projected `<nx-formfield-label>`. Do not move the info content
   into `<nx-formfield-label>`.

**Before (appendix workaround — button + popover):**

```html
<nx-formfield label="Email">
  <input nxInput [(ngModel)]="email" />
  <button
    nxFormfieldAppendix
    nxIconButton="tertiary small"
    [nxPopoverTriggerFor]="emailInfo"
    nxPopoverTrigger="click"
    type="button"
    aria-label="More information"
  >
    <nx-icon name="info-circle-o" size="s" aria-hidden="true"></nx-icon>
  </button>
</nx-formfield>

<nx-popover #emailInfo>
  <div style="max-width: 300px">We only use your email to send policy documents.</div>
</nx-popover>
```

**After (string content):**

```html
<nx-formfield label="Email">
  <input nxInput [(ngModel)]="email" />
  <nx-info-icon nxLabelInfo>We only use your email to send policy documents.</nx-info-icon>
</nx-formfield>
```

**After (structured content, projected directly — no `ng-template` needed):**

```html
<nx-formfield label="Email">
  <input nxInput [(ngModel)]="email" />
  <nx-info-icon nxLabelInfo>
    <p nxCopytext>We only use your email to send policy documents.</p>
    <a nxLink href="/privacy">Privacy policy</a>
  </nx-info-icon>
</nx-formfield>
```

Add the info-icon import (and, in a standalone component, add it to `imports`). The `nxLabelInfo`
directive ships with the label/formfield modules:

```ts
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
```

**Note:** the manual `nxFormfieldAppendix` slot still works and is not removed from the framework — but
prefer the `nxLabelInfo` slot for field-level help so the icon aligns with the label consistently in A1.

### Convention: content projection over pass-through inputs

When wrapping one component inside another, prefer **content projection** over adding pass-through
inputs. Do **not** mirror a child component's inputs onto its wrapper (e.g. there is deliberately no
`infoIconContent` input on the formfield) — project the child (`<nx-info-icon nxLabelInfo>`) and let it
own its own API. This keeps a single authoring model, avoids the wrapper drifting out of sync with the
child, and lets consumers swap in their own implementation. Reserve `@Input()` for scalar configuration
the component itself owns with a closed set of options (`size`, `disabled`, `label`).

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

**Always** wrap the most meaningful word or short phrase in the `<h1>` with an accent-color span. This is a required A1 design standard for `nx-small-stage` headlines — do not skip it. Choose the word or phrase that carries the most semantic weight (the product, the action, or the subject — not filler words like "your" or "and").

```html
<h1 nxHeadline size="3xl">Enter your <span [nx-accent-color]="'aqua'">property details</span></h1>
```

```ts
import { NxAccentColorComponent } from '@allianz/ng-aquila/text';
```

If used in a Standalone Component, add the `NxAccentColorComponent` to the components `imports` array.

### 5.3 Headline Size

- remove assignments to `nxHeadline` in HTML headline elements (e.g. `<h1 nxHeadline="page">`) and replace with `<h1 nxHeadline size="3xl">` for all small stage headlines. Ensure the main headline in `nx-small-stage` uses `size="3xl"` for A1 consistency.

---

## Step 6: Migrate File Uploader

### 6.1 Choose File Button

The button that opens the file picker (`nxFileUploadButton`) changes in A1:

| Property | NDBX (legacy) | A1 |
| --- | --- | --- |
| `nxButton` variant | `"primary"` | `"secondary"` |
| Icon | `plus` | `arrow-upload` |
| Label | "Add File" | "Choose File" |

**Before (NDBX):**

```html
<button nxButton="primary" type="button" nxFileUploadButton>
  <nx-icon name="plus" class="nx-margin-right-2xs" aria-hidden="true"></nx-icon>
  Add File
</button>
```

**After (A1):**

```html
<button nxButton="secondary" type="button" nxFileUploadButton>
  <nx-icon name="arrow-upload" class="nx-margin-right-2xs" aria-hidden="true"></nx-icon>
  Choose File
</button>
```

> If the icon uses `nxIconPositionStart` instead of a margin class, keep that positioning attribute and just swap the icon name.

### 6.2 Upload Button — Hide When No Files Are Chosen

For **manual upload flows** (i.e. the uploader has an `[uploader]` binding and the upload button uses `[nxFileUploadTriggerFor]` or triggers upload on click), the upload button must be hidden entirely when no files have been selected yet. A1 removes the disabled state in favour of conditional rendering.

**Before (NDBX) — always visible, disabled when empty:**

```html
<button
  nxButton="secondary small"
  [nxFileUploadTriggerFor]="documentUpload"
  [disabled]="!documentUpload.value?.length"
  type="button"
>
  Upload
</button>
```

**After (A1) — hidden until files are present:**

```html
@if (documentUpload.value?.length) {
  <button
    nxButton="primary"
    [nxFileUploadTriggerFor]="documentUpload"
    type="button"
  >
    Upload files
  </button>
}
```

> Use `nxButton="primary"` for the upload button (the primary action) and `nxButton="secondary"` for the file-picker button.

### 6.3 Auto-upload flows

For **auto-upload** (files are uploaded immediately on selection — no separate upload button), there is no upload button to show or hide. Apply only the Choose File button changes from **6.1**.

### Decision Checklist

For each `nx-file-uploader` found:

1. Update `nxFileUploadButton`: swap `primary` → `secondary`, icon `plus` → `arrow-upload`, label "Add File" → "Choose File".
2. Locate the upload trigger button (`[nxFileUploadTriggerFor]` or a button that manually triggers upload).
   - If it exists and this is **not** an auto-upload flow: wrap in `@if (uploaderRef.value?.length)`, remove `[disabled]`, change variant to `primary`.
   - If there is no upload button (auto-upload), skip step 2.

## Step 7: Migrate Context Menu Selection

`nxContextMenuItem` now has built-in single/multi selection. Hand-rolled patterns that combine `selectable`, a `<nx-icon name="check">`, an explicit `role="menuitemradio|menuitemcheckbox"` and `[attr.aria-checked]` should be migrated to the new API.

### Detection

Look for `nxContextMenuItem` usages that match any of these signals:

- `selectable` (bare attribute) **plus** a manual `<nx-icon name="check">` rendered conditionally on the selected value.
- `role="menuitemradio"` or `role="menuitemcheckbox"` set by hand on a menu item.
- `[attr.aria-checked]` bound by hand on a menu item.

### Replacement

**Before**:

```html
<button
  nxContextMenuItem
  selectable
  type="button"
  (click)="selectedLanguage = o.value"
  role="menuitemradio"
  [attr.aria-checked]="selectedLanguage === o.value ? 'true' : 'false'"
>
  @if (selectedLanguage === o.value) {
    <nx-icon aria-hidden="true" name="check" nxIconPositionStart></nx-icon>
  }
  {{ o.label }}
</button>
```

**After**:

```html
<button
  nxContextMenuItem
  selectable="single"
  [selected]="selectedLanguage === o.value"
  type="button"
  (click)="selectedLanguage = o.value"
>
  {{ o.label }}
</button>
```

For multi-select menus use `selectable="multi"` and keep `disableCloseOnSelect` if the menu should stay open between toggles. Drop any manual `<nx-icon name="check">`, `role`, and `[attr.aria-checked]` bindings — the component renders the indicator and sets the role for you.

### Notes

- Legacy `selectable` without a value still works and is treated as `"true"`. but this is a legacy behavior. This is a behavior change vs. older versions where the bare attribute only adjusted padding; templates relying on the old purely-stylistic behavior should set `[selectable]="null"` (or remove the attribute) if they don't want a radio role.
- After applying this step, append `"context-menu-selection"` to the `a1Migration.steps` array in `package.json`.

---

## Step 8: Migrate Copytext → Body / Utility Text

A1 splits text into **body text** (prose the user reads as content) and **utility text** (functional
text that labels or annotates the UI, aligned to the baseline grid). NDBX copytext has no such
distinction, so every `nxCopytext` has to be classified before it can be replaced. Body text is the
default; utility text is the exception you have to justify.

```ts
import { NxBodyTextComponent, NxUtilityTextComponent } from '@allianz/ng-aquila/text';
```
If used in a Standalone Component, add the used component to the components `imports` array.

### Detection

Look for `nxCopytext` in templates — both the bare attribute (`<p nxCopytext>`) and the string form
(`<p nxCopytext="small">`, `<p nxCopytext="medium negative">`). Also look for the legacy CSS classes
`nx-copy`, `nx-copy--small`, `nx-copy--medium`, `nx-copy--large` and `nx-copy--negative`.

### Which component

**Default to `nxBodyText`.** Under A1 every `nxCopytext` size already resolves to the `body` tokens,
so `nxBodyText` reproduces the current typography exactly — font size, family, weight, letter-spacing
and line-height. Colour is the one property that can move; see "Colour" below. Size is irrelevant to
this choice — a `nxCopytext="small"` paragraph becomes `nxBodyText size="s"`, not utility text.

Switch to `nxUtilityText` only when the occurrence meets one of these:

| Reason to pick utility text | Example |
| --- | --- |
| Single-line text that must align with an adjacent control or icon | label next to a checkbox, switch, radio button or badge |
| Text inside a dense, grid-aligned layout | table cell, list row, key–value pair, toolbar |
| Form or field label, caption, hint, helper text | `<label>`, field description |
| Needs a heavier weight (`attention`) | emphasized metadata, status text |

Line-height is the only property that can differ — font size, family and default weight are always
identical. Utility line-heights are locked to the 4pt baseline grid so text lines up with component
boxes; body line-heights leave the grid at some sizes for readability across multiple lines. How the
leading compares (body → utility):

| size | spacious | compact / dense |
| --- | --- | --- |
| `s` | 22px → 20px | 20px → 16px |
| `m` | identical (24px) | 22px → 20px |
| `l` | identical (28px) | identical (24px) |

Two consequences worth stating explicitly:

- Where the leading is tighter, multi-line prose in utility text looks cramped. If the text wraps, it
  wants body text regardless of size.
- Where the table above shows a change, choosing utility text changes the rendering — a deliberate
  design correction, not a no-op refactor. Call it out in the decision log so a reviewer expects the
  diff. Where the table shows "identical", the swap is pixel-identical and needs no flag.

When an occurrence is genuinely ambiguous, ask: would this text still make sense read on its own,
away from the UI around it? Yes → body text. No → utility text. If still unsure, keep body text.

### Colour

`nxCopytext` sets no colour of its own — it inherits from its ancestor. Both new components set their
own colour on the host, so the migration is only colour-neutral where the text was already inheriting
the default text colour.

Check what colour the occurrence currently renders in:

| Situation | What to do |
| --- | --- |
| No ancestor or local rule sets `color` | Nothing — the token colour matches what was inherited |
| Ancestor sets a dark/inverted background and its own light `color` | Add `inverse` |
| A local or ancestor rule sets a deliberate custom `color` | Keep that rule, or pick `type="secondary"` if it was a muted grey; flag as a visual change |

Only the first row is pixel-identical. The other two change the rendering, so log them.

### Size mapping

| old assignment | `size` |
| --- | --- |
| `nxCopytext="small"` / `.nx-copy--small` | `size="s"` |
| `nxCopytext="medium"` / `nxCopytext` (default) / `.nx-copy--medium` | `size="m"` |
| `nxCopytext="large"` / `.nx-copy--large` | `size="l"` |

`nxCopytext="normal"` is the old default and also maps to `size="m"`.

### Other attributes

| old | new |
| --- | --- |
| `negative` (e.g. `nxCopytext="small negative"`) | `inverse` |
| hand-set `font-weight: 600` / `700` in CSS on the element | `attention` (utility text only) |
| `.nx-copy` legacy classes | remove; the component sets its own classes |

### Examples

**Before**:

```html
<p nxCopytext="medium">
  On the insurance side, Allianz is the market leader in the German market.
</p>
<p nxCopytext="small">
  Your policy covers damage caused by fire, storm and tap water, including any
  follow-up costs incurred while the damage is being repaired.
</p>
<p nxCopytext="small negative">All prices include VAT.</p>
<td nxCopytext="small">12.05.2026</td>
<label nxCopytext="small" for="iban">IBAN</label>
```

**After**:

```html
<!-- prose → body text, size maps straight across -->
<p nxBodyText size="m">
  On the insurance side, Allianz is the market leader in the German market.
</p>
<!-- still prose even though it was "small" → body text, NOT utility -->
<p nxBodyText size="s">
  Your policy covers damage caused by fire, storm and tap water, including any
  follow-up costs incurred while the damage is being repaired.
</p>
<p nxBodyText size="s" inverse>All prices include VAT.</p>
<!-- grid-aligned table cell → utility text (leading tightens; see the table above) -->
<td nxUtilityText size="s">12.05.2026</td>
<!-- field label → utility text -->
<label nxUtilityText size="s" for="iban">IBAN</label>
```

### Notes

- Both components are attribute selectors, so keep the semantic element (`<p>`, `<span>`, `<dd>`, …).
- `nxCopytext` still works and is not removed; migrate incrementally and drop the
  `NxCopytextModule` / `NxCopytextComponent` import once the last occurrence in a file is gone.
- Both components are A1-only. Do not apply this step to an app that has not completed Step 1.
- For each occurrence, output a short decision log: what the text was, body vs utility and why.
  Mark a utility-text choice as a visual change when the leading actually changes — `size="s"` in any
  density, or `size="m"` under compact/dense — so it gets reviewed. Mark it as a visual change too when
  the occurrence needed a colour decision (see "Colour"). Read the density from
  `a1Migration.theme` in `package.json`, or from the `allianz-one*.css` entry in the build `styles`
  array in `angular.json` (`allianz-one.css` = spacious). If neither is present, ask the user.
- After applying this step, append `"text"` to the `a1Migration.steps` array in `package.json`.

---

## Migration Tracking

After completing each step, record the migration so adoption can be tracked across teams via GitHub search.

### Project-level metadata in `package.json`

After **Step 1** (theme applied), add an `a1Migration` key to `package.json`. After each subsequent step completes, append the step name to the `steps` array:

```json
"a1Migration": {
  "skillVersion": "0.1.5",
  "appliedAt": "YYYY-MM-DD",
  "theme": "<spacious|compact|dense>",
  "steps": ["theme"]
}
```

Append step names as they complete: `"theme"`, `"tiles"`, `"info-icons"`, `"layout"`, `"small-stage"`, `"context-menu-selection"`, `"file-uploader"`.

A fully migrated project looks like:

```json
"a1Migration": {
  "skillVersion": "0.1.5",
  "appliedAt": "YYYY-MM-DD",
  "theme": "<spacious|compact|dense>",
  "steps": ["theme", "tiles", "info-icons", "layout", "small-stage", "file-uploader"]
}
```

### tracking of additional migration runs

If `package.json` already has an `a1Migration` key, add the steps to the array for steps that ran in the current session.
