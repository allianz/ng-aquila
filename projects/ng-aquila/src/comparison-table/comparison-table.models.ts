import { NxSurfaceType } from '@allianz/ng-aquila/surface';
import { InjectionToken } from '@angular/core';

/**
 * The size of the window.
 * @docs-private
 */
export type NxComparisonTableViewType = 'mobile' | 'tablet' | 'desktop';

export interface NxComparisonTableBreakpoint {
  minWidth: number;
  viewType?: NxComparisonTableViewType;
  columns?: number;
}

export interface ComparisonTableDefaultOptions {
  /** Sets if the expandable area of a row group uses the full width of the row or leaves out the first column. (optional) */
  useFullRowForExpandableArea?: boolean;
  responsiveMode?: 'viewport' | 'container';
  responsiveBreakpoints?: NxComparisonTableBreakpoint[];
}

export const COMPARISON_TABLE_DEFAULT_OPTIONS = new InjectionToken<ComparisonTableDefaultOptions>(
  'COMPARISON_TABLE_DEFAULT_OPTIONS',
);

/** The type of the row. */
export type NxComparisonTableRowType = 'header' | 'content' | 'footer';

/**
 * Color scheme for the comparison table header and footer rows (A1 only).
 * `'plain'` is deprecated - use `'default'` instead.
 */
export type NxComparisonTableColorScheme = NxSurfaceType | 'plain';

/**
 * Folds the deprecated `'plain'` alias onto the surface vocabulary.
 * @docs-private
 */
export function normalizeComparisonTableColorScheme(
  colorScheme: NxComparisonTableColorScheme,
): NxSurfaceType {
  return colorScheme === 'plain' ? 'default' : colorScheme;
}
