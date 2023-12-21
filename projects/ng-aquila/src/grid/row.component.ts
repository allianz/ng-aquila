import { ChangeDetectionStrategy, Component, Input, isDevMode, Optional } from '@angular/core';

import { NxLayoutComponent } from './layout.component';
import { addStylesFromDimensions } from './utils';

const MAPPING_JUSTIFY = {
    start: 'nx-justify-content-{tier}-start',
    end: 'nx-justify-content-{tier}-end',
    center: 'nx-justify-content-{tier}-center',
    between: 'nx-justify-content-{tier}-between',
    around: 'nx-justify-content-{tier}-around',
};

const MAPPING_ALIGN_ITEMS = {
    start: 'nx-align-items-{tier}-start',
    end: 'nx-align-items-{tier}-end',
    center: 'nx-align-items-{tier}-center',
    baseline: 'nx-align-items-{tier}-baseline',
    stretch: 'nx-align-items-{tier}-stretch',
};

const MAPPING_ALIGN_CONTENT = {
    start: 'nx-align-content-{tier}-start',
    end: 'nx-align-content-{tier}-end',
    center: 'nx-align-content-{tier}-center',
    between: 'nx-align-content-{tier}-between',
    around: 'nx-align-content-{tier}-around',
    stretch: 'nx-align-content-{tier}-stretch',
};

const MAPPING_WRAP = {
    wrap: 'nx-flex-{tier}-wrap',
    nowrap: 'nx-flex-{tier}-nowrap',
    reverse: 'nx-flex-{tier}-wrap-reverse',
};

const MAPPING_LAYOUT: { [k: string]: string } = {
    row: 'nx-grid__row',
    'row-reverse': 'nx-grid__row-reverse',
};

export type RowJustification = 'start' | 'end' | 'center' | 'between' | 'around';

export type RowContentAlignment = 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch';

export type RowItemsAlignment = 'start' | 'end' | 'center' | 'between' | 'stretch';

export type RowWrapping = 'wrap' | 'nowrap' | 'reverse';

@Component({
    selector: '[nxRow]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['row.component.scss'],
    host: {
        '[class]': '_classNames',
        '[class.nx-grid__row--container-query]': 'gridLayoutComponent?.containerQuery ?? false',
        '[class.nx-grid__row--media-query]': '!gridLayoutComponent?.containerQuery ?? true',
    },
})
export class NxRowComponent {
    /**
     * Overwrite default class property to access user provided class.
     * @docs-private
     */
    @Input() class = '';

    /**
     * Values: row | row-reverse.
     *
     * Default: `'row'`.
     */
    @Input() set nxRow(value: string) {
        if (value) {
            this._rowClass = MAPPING_LAYOUT[value];

            if (!this._rowClass) {
                throw new Error('nxRow is incorrect');
            }
        } else {
            this._rowClass = MAPPING_LAYOUT.row;
        }
    }

    private _rowClass: string = MAPPING_LAYOUT.row;

    /** Align items on the main axis (horizontally). */
    @Input() set rowJustify(value: RowJustification | string) {
        this._justifyClasses = value ? addStylesFromDimensions(value, MAPPING_JUSTIFY) : '';
    }

    private _justifyClasses = '';

    /** Similar to nxRowAlignItems, but instead of aligning flex items, it aligns flex lines. */
    @Input() set rowAlignContent(value: RowContentAlignment | string) {
        this._alignContentClasses = value ? addStylesFromDimensions(value, MAPPING_ALIGN_CONTENT) : '';
    }

    private _alignContentClasses = '';

    /** The default alignment for items inside the flexible container. */
    @Input() set rowAlignItems(value: RowItemsAlignment | string) {
        this._alignItemsClasses = value ? addStylesFromDimensions(value, MAPPING_ALIGN_ITEMS) : '';
    }

    private _alignItemsClasses = '';

    /** How the flexible items should be wrapped. */
    @Input() set rowWrap(value: RowWrapping) {
        this._wrapClasses = value ? addStylesFromDimensions(value, MAPPING_WRAP) : '';
    }

    private _wrapClasses = '';

    get _classNames() {
        return [this._rowClass, this._justifyClasses, this._alignContentClasses, this._alignItemsClasses, this._wrapClasses, this.class]
            .filter(classes => classes?.length)
            .join(' ');
    }

    constructor(@Optional() protected readonly gridLayoutComponent?: NxLayoutComponent) {
        if (isDevMode() && !gridLayoutComponent) {
            console.warn(
                'NxRowComponent: missing NxLayoutComponent in the parent component hierarchy. Please add a <div nxLayout> element around the rows. This might become an error in the future.',
            );
        }
    }
}
