import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxCheckboxComponent } from '@aposin/ng-aquila/checkbox';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldHintDirective,
    NxFormfieldPrefixDirective,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxLicencePlateEuroPrefixComponent,
    NxLicencePlateSeasonSuffixComponent,
    NxLicencePlateValidatorDirective,
} from '@aposin/ng-aquila/licence-plate';

/**
 * @title Licence plate expert states
 */
@Component({
    selector: 'licence-plate-expert-states-example',
    templateUrl: 'licence-plate-expert-states-example.html',
    styleUrls: ['licence-plate-expert-states-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxLicencePlateEuroPrefixComponent,
        NxFormfieldPrefixDirective,
        NxInputDirective,
        FormsModule,
        NxLicencePlateValidatorDirective,
        NxLicencePlateSeasonSuffixComponent,
        NxFormfieldSuffixDirective,
        NxFormfieldHintDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        NxCheckboxComponent,
    ],
})
export class LicencePlateExpertStatesExample {
    disabled = false;
    readonly = false;
    value = '';
}
