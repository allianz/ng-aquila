import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const DEFAULT_TYPE = 'normal';

/** Size of the list */
export type NxListSize = 'xsmall' | 'small' | 'normal';

@Component({
    selector: 'ul[nxList], ol[nxList]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['list.component.scss'],
    host: {
        '[class.nx-list]': 'true',
        '[class.nx-list--xsmall]': 'type === "xsmall"',
        '[class.nx-list--small]': 'type === "small"',
        '[class.nx-list--normal]': 'type === "normal"',
        '[class.nx-list--negative]': 'negative',
        '[class.nx-list--ordered-circle]': 'orderedCircle',
    },
})
export class NxListComponent {
    private _classNames: string = '';

    /** @docs-private */
    type: NxListSize | undefined = DEFAULT_TYPE;

    /** @docs-private */
    negative: boolean = false;

    /** @docs-private */
    orderedCircle: boolean = false;

    /**
     * Sets the visual appearance of the list. You can combine different values:
     *
     * xsmall | small | normal: The listed input values are expanded to the underlying BEM conform styles based
     * on modifiers. Defaults to normal.
     *
     * negative: Display the list with a negative set of styling.
     *
     * ordered-circle: Display the list item numbers in a color filled circle.
     */
    @Input('nxList')
    set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }

        this._classNames = value;

        const [type = null] = this._classNames.match(/xsmall|small|normal/) || [DEFAULT_TYPE];
        this.type = type as any;

        this.negative = !!this._classNames.match(/negative/);
        this.orderedCircle = !!this._classNames.match(/ordered-circle/);
    }

    get classNames(): string {
        return this._classNames;
    }
}
