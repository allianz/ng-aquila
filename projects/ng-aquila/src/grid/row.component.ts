import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
    },
})
export class NxRowComponent {
    private _justifyClasses = '';
    private _alignContentClasses = '';
    private _alignItemsClasses = '';
    private _wrapClasses = '';
    private _rowClass: string = MAPPING_LAYOUT.row;

    get _classNames() {
        return [this._rowClass, this._justifyClasses, this._alignContentClasses, this._alignItemsClasses, this._wrapClasses, this.class]
            .filter(classes => classes?.length)
            .join(' ');
    }

    /**
     * Values: row | row-reverse
     *
     * Default value: row
     */
    @Input()
    set nxRow(value: string) {
        if (value) {
            this._rowClass = MAPPING_LAYOUT[value];

            if (!this._rowClass) {
                throw new Error('nxRow is incorrect');
            }
        } else {
            this._rowClass = MAPPING_LAYOUT.row;
        }
    }

    /** Align items on the main axis (horizontally). */
    @Input('nxRowJustify')
    set nxRowJustify(value: RowJustification | string) {
        this._justifyClasses = value ? addStylesFromDimensions(value, MAPPING_JUSTIFY) : '';
    }

    /** Similar to nxRowAlignItems, but instead of aligning flex items, it aligns flex lines. */
    @Input('nxRowAlignContent')
    set nxRowAlignContent(value: RowContentAlignment | string) {
        this._alignContentClasses = value ? addStylesFromDimensions(value, MAPPING_ALIGN_CONTENT) : '';
    }

    /** The default alignment for items inside the flexible container. */
    @Input('nxRowAlignItems')
    set nxRowAlignItems(value: RowItemsAlignment | string) {
        this._alignItemsClasses = value ? addStylesFromDimensions(value, MAPPING_ALIGN_ITEMS) : '';
    }

    /** How the flexible items should be wrapped. */
    @Input('nxRowWrap')
    set nxRowWrap(value: RowWrapping) {
        this._wrapClasses = value ? addStylesFromDimensions(value, MAPPING_WRAP) : '';
    }

    /**
     * Overwrite default class property to access user provided class.
     * @docs-private
     */
    @Input()
    class = '';
}
