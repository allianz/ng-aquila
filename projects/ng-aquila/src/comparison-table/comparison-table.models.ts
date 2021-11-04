import { InjectionToken } from '@angular/core';

export interface ComparisonTableDefaultOptions {
  /** Sets if the expandable area of a row group uses the full width of the row or leaves out the first column. (optional) */
  useFullRowForExpandableArea?: boolean;
}

export const COMPARISON_TABLE_DEFAULT_OPTIONS =
  new InjectionToken<ComparisonTableDefaultOptions>(
    'COMPARISON_TABLE_DEFAULT_OPTIONS'
  );

/**
 * @docs-private
 * The size of the window.
 */
export type NxComparisonTableViewType = 'mobile' | 'tablet' | 'desktop';

/** The type of the row. */
export type NxComparisonTableRowType = 'header' | 'content' | 'footer';
