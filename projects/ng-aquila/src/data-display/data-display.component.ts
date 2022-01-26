import { ChangeDetectionStrategy, Component, Inject, Input, Optional } from '@angular/core';

import { DATA_DISPLAY_DEFAULT_OPTIONS, DataDisplayDefaultOptions, NxDataDisplayOrientation, NxDataDisplaySize } from './data-display.models';

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
     * Sets the label which will describe the data.
     */
    @Input() label?: string | null;

    /**
     * Size of the data display.
     */
    @Input()
    size: NxDataDisplaySize = this._defaultOptions?.size ?? 'large';

    /**
     * Layout orientation of the label and value.
     * 'vertical': label and value are vertically stacked.
     * 'horizontal': label and value are on the same line.
     */
    @Input()
    orientation: NxDataDisplayOrientation = 'vertical';

    constructor(@Optional() @Inject(DATA_DISPLAY_DEFAULT_OPTIONS) private _defaultOptions: DataDisplayDefaultOptions | null) {}
}

/**
 * Label within a `<nx-data-display>`.
 */
@Component({
    selector: 'nx-data-display-label',
    template: '<ng-content></ng-content>',
    styleUrls: ['./data-display-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxDataDisplayLabelComponent {}
