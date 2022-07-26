import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: '[nxLayout]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['layout.component.scss'],
    host: {
        '[class.nx-grid]': 'grid',
        '[class.nx-grid--no-gutters]': 'noGutters',
        '[class.nx-grid--max-width]': 'maxWidth',
        '[class.nx-grid--no-padding]': 'noPadding',
    },
})
export class NxLayoutComponent {
    /** @docs-private */
    grid = true;

    /** @docs-private */
    noGutters!: boolean;

    /** @docs-private */
    maxWidth!: boolean;

    /** @docs-private */
    noPadding!: boolean;

    /**
     * Type of layout.
     *
     * Values: grid | grid nogutters | grid maxwidth | grid nopadding. Default value: grid.
     */
    @Input('nxLayout') set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }
        this._classNames = value;

        // TODO kick null safe-guards after setter value or any calling input values are properly coerced as string
        this.grid = !!this._classNames?.includes('grid');
        this.noGutters = !!this._classNames?.includes('nogutters');
        this.maxWidth = !!this._classNames?.includes('maxwidth');
        this.noPadding = !!this._classNames?.includes('nopadding');
    }
    get classNames(): string {
        return this._classNames;
    }
    private _classNames = '';
}
