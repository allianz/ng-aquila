import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldHintDirective,
    NxFormfieldPrefixDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxLicencePlateEuroPrefixComponent,
    NxLicencePlateValidatorDirective,
    nxLicensePlateValidator,
} from '@aposin/ng-aquila/licence-plate';

/**
 * @title Licence plate reactive form
 */
@Component({
    selector: 'licence-plate-reactive-example',
    templateUrl: 'licence-plate-reactive-example.html',
    styleUrls: ['licence-plate-reactive-example.css'],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        FormsModule,
        ReactiveFormsModule,
        NxFormfieldComponent,
        NxLicencePlateEuroPrefixComponent,
        NxFormfieldPrefixDirective,
        NxInputDirective,
        NxLicencePlateValidatorDirective,
        NxFormfieldHintDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        JsonPipe,
    ],
})
export class LicencePlateReactiveExampleComponent {
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
