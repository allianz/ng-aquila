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
    private _classNames: string = '';

    /** @docs-private */
    grid: boolean = true;

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
    @Input('nxLayout')
    set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }

        this._classNames = value;
        this.grid = /grid/.test(this._classNames);
        this.noGutters = /nogutters/.test(this._classNames);
        this.maxWidth = /maxwidth/.test(this._classNames);
        this.noPadding = /nopadding/.test(this._classNames);
    }

    get classNames(): string {
        return this._classNames;
    }
}
