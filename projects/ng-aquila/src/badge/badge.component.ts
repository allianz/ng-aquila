import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
/** Possible badge types. */
export type NxBadgeType = 'active' | 'positive' | 'critical' | 'negative' | '';

@Component({
    selector: 'nx-badge',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./badge.component.scss'],
    host: {
        '[class.nx-badge--active]': 'type === "active"',
        '[class.nx-badge--positive]': 'type === "positive"',
        '[class.nx-badge--critical]': 'type === "critical"',
        '[class.nx-badge--negative]': 'type === "negative"',
        '[class.nx-badge--vibrant]': 'vibrant',
    },
})
export class NxBadgeComponent {
    /** Sets the class name for the badge element.  */
    @Input() set type(value: NxBadgeType | string | null | undefined) {
        if (value !== this._type) {
            this._type = value! as NxBadgeType; // TODO properly coerce input value
            this._cdr.markForCheck();
        }
    }
    get type(): NxBadgeType {
        return this._type;
    }
    private _type!: NxBadgeType;

    /** Change badge style to vibrant. */
    @Input() set vibrant(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);

        if (value !== this._vibrant) {
            this._vibrant = newValue;
            this._cdr.markForCheck();
        }
    }
    get vibrant(): boolean {
        return this._vibrant;
    }
    private _vibrant = false;

    constructor(private readonly _cdr: ChangeDetectorRef) {}
}
