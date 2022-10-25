import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';

/**
 * Euro country prefix for the licence plate input.
 */
@Component({
    selector: 'nx-licence-plate-euro-prefix',
    template: `<ng-content></ng-content>`,
    styleUrls: ['licence-plate-euro-prefix.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxLicencePlateEuroPrefixComponent {
    constructor(private readonly _formField: NxFormfieldComponent) {}

    @HostBinding('class.is-disabled') get _disabled(): boolean {
        return this._formField._control?.disabled;
    }

    @HostBinding('class.has-outline') get _hasOutline(): boolean {
        return this._formField.appearance === 'outline';
    }
}
