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

/** Color scheme for the comparison table header row (A1 only). */
export type NxComparisonTableColorScheme = 'plain' | 'attention' | 'emphasis' | 'accent-attention';
