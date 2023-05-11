import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Inject, Input, Optional } from '@angular/core';

import { DATA_DISPLAY_DEFAULT_OPTIONS, DataDisplayDefaultOptions, NxDataDisplayOrientation, NxDataDisplaySize } from '../data-display.models';

/**
 * Data display component.
 */
@Component({
    selector: 'nx-data-display',
    templateUrl: './data-display.component.html',
    styleUrls: ['./data-display.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.is-horizontal]': 'orientation === "horizontal"',
        '[class.is-horizontal-columns]': 'orientation === "horizontal-columns"',
        '[class.is-small]': 'size === "small"',
        '[class.is-medium]': 'size === "medium"',
        '[class.is-large]': 'size === "large"',
        '[class.nx-data-display__label-columns-3]': 'labelColumns === 3',
        '[class.nx-data-display__label-columns-4]': 'labelColumns === 4',
        '[class.nx-data-display__label-columns-8]': 'labelColumns === 8',
        '[class.nx-data-display__label-columns-9]': 'labelColumns === 9',
    },
})
export class NxDataDisplayComponent {
    /**
     * Label describing the data.
     */
    @Input() label?: string | null;

    /**
     * Column span of the label text based on a 12 column system, when in `orientation="horizontal-columns"` layout.
     *
     * Accepted values: `3, 4, 6, 8, 9`.
     *
     * Default: `6`.
     */
    @Input() set labelColumns(value: NumberInput) {
        this.#labelColumns = coerceNumberProperty(value);
    }
    get labelColumns(): number {
        return this.#labelColumns ?? 6;
    }
    #labelColumns?: number;

    /**
     * Size of the data display.
     *
     * Default: `'large'`.
     */
    @Input() set size(value: NxDataDisplaySize | null | undefined) {
        this.#size = value;
    }
    get size(): NxDataDisplaySize {
        return this.#size || this._defaultOptions?.size || 'large';
    }
    #size?: NxDataDisplaySize | null;

    /**
     * Layout orientation of the label and value.
     *
     * - 'vertical': label and value are vertically stacked.
     * - 'horizontal': label and value are on the same line.
     * - 'horizontal-columns': label and value are on the same line in a fixed position.
     *
     * Default: `'vertical'`.
     */
    @Input() set orientation(value: NxDataDisplayOrientation | null | undefined) {
        this.#orientation = value;
    }
    get orientation(): NxDataDisplayOrientation {
        return this.#orientation ?? 'vertical';
    }
    #orientation?: NxDataDisplayOrientation | null;

    constructor(@Optional() @Inject(DATA_DISPLAY_DEFAULT_OPTIONS) private readonly _defaultOptions: DataDisplayDefaultOptions | null) {}
}
