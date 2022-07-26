import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';

/**
 * Suffix for seasonal licence plate inputs.
 */
@Component({
    selector: 'nx-licence-plate-season-suffix',
    template: `
        <span>{{ _format(startMonth) }}</span>
        <span>{{ _format(endMonth) }}</span>
    `,
    styleUrls: ['licence-plate-season-suffix.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxLicencePlateSeasonSuffixComponent {
    /**
     * Start month of the licence plate.
     */
    @Input() startMonth = 1;

    /**
     * End month of the licence plate.
     */
    @Input() endMonth = 1;

    @HostBinding('class.is-disabled') get _disabled(): boolean {
        return this._formField._control?.disabled;
    }

    @HostBinding('class.has-outline') get _hasOutline(): boolean {
        return this._formField.appearance === 'outline';
    }

    constructor(private readonly _formField: NxFormfieldComponent) {}

    _format(value: number): string {
        if (typeof value !== 'number') {
            return '';
        }
        return value >= 10 ? value.toString() : '0' + value;
    }
}
