import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** A type that specifies the font size of a copytext. */
export type NxCopytextType = 'small' | 'medium' | 'normal' | 'large';

const DEFAULT_TYPE = 'normal';

@Component({
    selector: '[nxCopytext]',
    styleUrls: ['copytext.component.scss'],
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.nx-copy]': 'true',
        '[class.nx-copy--small]': 'type === "small"',
        '[class.nx-copy--medium]': 'type === "medium"',
        '[class.nx-copy--normal]': 'type === "normal"',
        '[class.nx-copy--large]': 'type === "large"',
        '[class.nx-copy--negative]': 'negative',
    },
})
export class NxCopytextComponent {
    /**
     * Sets the type and whether the negative set of styling should be used.
     *
     * You can combine the values of type NxCopytextType and 'negative'.
     *
     * Default: `'normal'`.
     */
    @Input('nxCopytext') set classNames(value: string) {
        if (this._classNames === value) {
            return;
        }
        this._classNames = value;

        // TODO kick null safe-guards after setter value or any calling input values are properly coerced as string
        const [type = null] = this._classNames?.match(/small|medium|normal|large/) ?? [DEFAULT_TYPE];
        this.type = type as NxCopytextType;

        this.negative = !!this._classNames?.match(/negative/);
    }
    get classNames(): string {
        return this._classNames;
    }
    private _classNames = '';

    /** @docs-private */
    type: NxCopytextType = DEFAULT_TYPE;

    /** @docs-private */
    negative = false;
}
