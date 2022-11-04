import { InjectionToken } from '@angular/core';

/**
 * Layout orientation of the NxDataDisplayComponent.
 *
 * - 'vertical': label and value are vertically stacked.
 * - 'horizontal': label and value are on the same line.
 * - 'horizontal-columns': label and value are on the same line in a fixed position.
 */
export type NxDataDisplayOrientation = 'vertical' | 'horizontal' | 'horizontal-columns';

/**
 * Sizes of the NxDataDisplayComponent.
 */
export type NxDataDisplaySize = 'small' | 'medium' | 'large';

/**
 * Default options for the NxDataDisplayComponent.
 */
export interface DataDisplayDefaultOptions {
    /**
     * Size of the data display.
     *
     * Default: `'large'`.
     */
    size?: NxDataDisplaySize;
}

/**
 * Injection token for the default options of the NxDataDisplayComponent.
 */
export const DATA_DISPLAY_DEFAULT_OPTIONS = new InjectionToken<DataDisplayDefaultOptions>('DATA_DISPLAY_DEFAULT_OPTIONS');
