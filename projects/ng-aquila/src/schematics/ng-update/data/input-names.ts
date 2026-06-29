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

export const inputNames: VersionChanges<InputNameUpgradeData> = {
  [TargetVersion.V22]: [
    {
      pr: 'https://github.developer.allianz.io/ilt/ng-aquila/pull/1898',
      changes: dateRangeInputNameChanges,
    },
  ],
};
