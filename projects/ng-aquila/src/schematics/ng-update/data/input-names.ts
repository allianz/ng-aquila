import { InputNameUpgradeData, TargetVersion, VersionChanges } from '@angular/cdk/schematics';

/**
 * v22 breaking change: `nx-date-range` split its single `minDate`/`maxDate` inputs
 * into separate bounds for the start and end date. `minDate` only ever constrained
 * the start date and `maxDate` only ever constrained the end date, so they map to
 * `minStartDate` and `maxEndDate` respectively. The new `maxStartDate`/`minEndDate`
 * inputs have no predecessor and therefore nothing to migrate.
 */
export const dateRangeInputNameChanges: InputNameUpgradeData[] = [
  { replace: 'minDate', replaceWith: 'minStartDate', limitedTo: { elements: ['nx-date-range'] } },
  { replace: 'maxDate', replaceWith: 'maxEndDate', limitedTo: { elements: ['nx-date-range'] } },
];

// NOTE: the selection-indicator `appearance` -> `colorScheme` rename is intentionally NOT
// expressed here. That rename is coupled with a value change (`'full'` -> `'default'`) and the
// removal of the `defaultAppearance` input, which the declarative input-name tooling cannot
// express. It is handled by `SelectionIndicatorMigration` instead.

/**
 * v22 breaking change: the badge `colorScheme` input was renamed to `accentColor`.
 * Scoped to `nx-badge` so the identically named inputs on `nx-sidebar`, `nx-sidepanel`
 * and `nx-small-stage` are left untouched. The associated `NxBadgeColorScheme` type
 * rename is handled by the `BadgeAccentColorMigration` custom migration.
 */
export const badgeInputNameChanges: InputNameUpgradeData[] = [
  { replace: 'colorScheme', replaceWith: 'accentColor', limitedTo: { elements: ['nx-badge'] } },
];

export const inputNames: VersionChanges<InputNameUpgradeData> = {
  [TargetVersion.V22]: [
    {
      pr: 'https://github.developer.allianz.io/ilt/ng-aquila/pull/1898',
      changes: dateRangeInputNameChanges,
    },
    {
      pr: 'https://github.developer.allianz.io/ilt/ng-aquila/pull/1919',
      changes: badgeInputNameChanges,
    },
  ],
};
