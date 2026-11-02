---
title: Schematics
---

# Schematics

Besides `ng add` and the migrations that run during `ng update`, ng-aquila and ngx-brand-kit ship `ng generate` schematics. They are **opt-in**: they never run on their own, so you decide when your project changes.

| Schematic | What it does |
| --- | --- |
| [`@allianz/ngx-brand-kit:apply-a1-theme`](./guides/schematics#apply-a1-theme) | Switches your app from the NDBX theme to the A1 theme. |
| [`@allianz/ng-aquila:migrate-button-api`](./guides/schematics#migrate-button-api) | Moves the modifiers in the `nxButton` string into their own inputs. |

## Before you run a schematic

- Run it from your workspace root, where `angular.json` lives.
- Commit your work first, so you can review the changes with `git diff`.
- Add `--dry-run` to see which files would change without writing them.
- If your workspace has several projects, pass `--project=<name>`.

## apply-a1-theme

Applies the [A1 Design System](https://ngx-ndbx.frameworks.allianz.io/guides/a1) theme to your app. It is part of `@allianz/ngx-brand-kit`, so your app needs that package installed.

```sh
npx ng g @allianz/ngx-brand-kit:apply-a1-theme
```

It does the two steps from [Manually applying A1 Theme](https://ngx-ndbx.frameworks.allianz.io/guides/a1#manually-applying-a1-theme) for you:

1. In the `styles` of your build target in `angular.json`, it replaces the NDBX theme CSS with the A1 theme CSS for the density you pick.
2. It adds `provideA1Theme()` to your `main.ts`, or `NxA1ThemeModule` to your `AppModule` in a module-based app.

If your app uses the NDBX Expert theme, it also sets `gridType: 'functional'`.

| Option | Values | Description |
| --- | --- | --- |
| `--type` | `spacious`, `dense`, `compact` | Density of the theme. You are asked if you leave it out. `spacious` is for end-customer apps, `dense` for end-customer portals, `compact` for expert and internal apps. |

## migrate-button-api

`nxButton` and `nxIconButton` now take size, danger, negative and block as their own inputs. The old space-separated string still works, but the separate inputs are the documented API and can each be bound on their own. This schematic rewrites the string for you.

```sh
npx ng g @allianz/ng-aquila:migrate-button-api
```

```html
<!-- before -->
<button nxButton="secondary small danger negative block">Delete</button>
<button nxPlainButton="danger">Delete</button>

<!-- after -->
<button nxButton="secondary" size="small" critical inverse block>Delete</button>
<button nxPlainButton critical>Delete</button>
```

| In `nxButton="…"` / `nxIconButton="…"`                        | Becomes                       |
| ------------------------------------------------------------- | ----------------------------- |
| `primary` `secondary` `tertiary` `cta` `emphasis` `attention` | stays: `nxButton="secondary"` |
| `small` `small-medium` `medium` `large`                       | `size="…"`                    |
| `danger`                                                      | `critical`                    |
| `negative`                                                    | `inverse`                     |
| `block`                                                       | `block`                       |

On `nxPlainButton`, `danger` has no effect any more, so it becomes `critical`. If a modifier is already set through its input, for example `[size]="s"`, the schematic drops the modifier from the string and keeps the input.

It changes `.html` files and inline `template`s of your components.

| Option | Values | Description |
| --- | --- | --- |
| `--path` | folder, from workspace root | Folder to migrate. Defaults to the source root of the project. Fails if the folder doesn't exist. |

### What you migrate by hand

The schematic logs a warning with `file:line:col` for every button it can't migrate. Go through the list once it finishes:

- **Bound value**, such as `[nxButton]="variant"` or `nxButton="primary {{ size }}"`: split it into the separate inputs, for example `nxButton="secondary" [inverse]="isInverse"`.
- **Unknown modifier**, such as `nxButton="secondary smal"`: check for a typo. The button ignores unknown modifiers.
- **Template that is not a plain string**, such as a template literal with `${…}` or a constant: change its buttons by hand.

A template that is imported from another file is not detected at all, so search those files for `nxButton` yourself.
