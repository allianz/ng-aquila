import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { nxLicensePlateValidator } from '@aposin/ng-aquila/licence-plate';

/**
 * @title Licence plate reactive form
 */
@Component({
    selector: 'licence-plate-reactive-example',
    templateUrl: 'licence-plate-reactive-example.html',
    styleUrls: ['licence-plate-reactive-example.css'],
})
export class LicencePlateReactiveExample {
    licencePlateForm: FormGroup;

    constructor() {
        this.licencePlateForm = new FormGroup({
            licencePlateInput: new FormControl(
                '',
                nxLicensePlateValidator('de_standard'),
            ),
        });
    }
}
