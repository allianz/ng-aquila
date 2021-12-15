import { InjectionToken } from '@angular/core';

/**
 * Layout orientation of the NxDataDisplayComponent.
 * 'vertical': label and value are vertically stacked.
 * 'horizontal': label and value are on the same line.
 */
export type NxDataDisplayOrientation = 'vertical' | 'horizontal';

/**
 * Sizes of the NxDataDisplayComponent.
 */
export type NxDataDisplaySize = 'small' | 'medium' | 'large';

/**
 * Default options for the NxDataDisplayComponent.
 */
export interface DataDisplayDefaultOptions {
  size: NxDataDisplaySize;
}

/**
 * Injection token for the default options of the NxDataDisplayComponent.
 */
export const DATA_DISPLAY_DEFAULT_OPTIONS = new InjectionToken<DataDisplayDefaultOptions>('DATA_DISPLAY_DEFAULT_OPTIONS');
