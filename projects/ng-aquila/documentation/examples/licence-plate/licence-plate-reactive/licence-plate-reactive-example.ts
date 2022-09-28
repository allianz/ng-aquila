import { nxLicensePlateValidator } from '@allianz/ng-aquila/licence-plate';
import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

/**
 * @title Licence plate reactive form
 */
@Component({
    selector: 'licence-plate-reactive-example',
    templateUrl: 'licence-plate-reactive-example.html',
    styleUrls: ['licence-plate-reactive-example.css'],
})
export class LicencePlateReactiveExample {
    licencePlateForm: UntypedFormGroup;

    constructor() {
        this.licencePlateForm = new UntypedFormGroup({
            licencePlateInput: new UntypedFormControl(
                '',
                nxLicensePlateValidator('de_standard'),
            ),
        });
    }
}
