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
        '[class.is-small]': 'size === "small"',
        '[class.is-medium]': 'size === "medium"',
        '[class.is-large]': 'size === "large"',
    },
})
export class NxDataDisplayComponent {
    /**
     * Label describing the data.
     */
    @Input() label?: string | null;

    /**
     * Size of the data display.
     *
     * Defaults to 'large'.
     */
    @Input() set size(value: NxDataDisplaySize | null | undefined) {
        this.#size = value;
    }
    get size(): NxDataDisplaySize {
        return this.#size ?? 'large';
    }
    #size?: NxDataDisplaySize | null = this._defaultOptions?.size;

    /**
     * Layout orientation of the label and value.
     * - 'vertical': label and value are vertically stacked.
     * - 'horizontal': label and value are on the same line.
     *
     * Defaults to 'vertical'.
     */
    @Input() set orientation(value: NxDataDisplayOrientation | null | undefined) {
        this.#orientation = value;
    }
    get orientation(): NxDataDisplayOrientation {
        return this.#orientation ?? 'vertical';
    }
    #orientation?: NxDataDisplayOrientation | null;

    constructor(@Optional() @Inject(DATA_DISPLAY_DEFAULT_OPTIONS) private _defaultOptions: DataDisplayDefaultOptions | null) {}
}
