import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
        '[class.nx-list--xsmall-condensed]': 'type === "xsmall" && condensed',
        '[class.nx-list--small]': 'type === "small"',
        '[class.nx-list--small-condensed]': 'type === "small" && condensed',
        '[class.nx-list--normal]': 'type === "normal"',
        '[class.nx-list--normal-condensed]': 'type === "normal" && condensed',
        '[class.nx-list--negative]': 'negative',
        '[class.nx-list--ordered-circle]': 'orderedCircle',
    },
})
export class NxListComponent {
    /**
     * Sets the visual appearance of the list. You can combine different values:
     *
     * xsmall | small | normal: The listed input values are expanded to the underlying BEM conform styles based
     * on modifiers. Defaults to normal.
     *
     * Negative: Display the list with a negative set of styling.
     *
     * Ordered-circle: Display the list item numbers in a color filled circle.
     */
    @Input('nxList') set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }
        this._classNames = value;

        // TODO kick null safe-guards after setter value or any calling input values are properly coerced as string
        const [type = null] = this._classNames?.match(/xsmall|small|normal/) || [DEFAULT_TYPE];
        this.type = type as any;

        this.negative = !!this._classNames?.match(/negative/);
        this.orderedCircle = !!this._classNames?.match(/ordered-circle/);
    }

    get classNames(): string {
        return this._classNames;
    }
    private _classNames = '';

    /** Change the list mode to condensed  */
    @Input({ transform: booleanAttribute }) set condensed(value) {
        this._condensed = value;
    }
    get condensed(): boolean {
        return this._condensed;
    }
    _condensed: boolean = false;

    /** @docs-private */
    type?: NxListSize = DEFAULT_TYPE;

    /** @docs-private */
    negative = false;

    /** @docs-private */
    orderedCircle = false;
}
