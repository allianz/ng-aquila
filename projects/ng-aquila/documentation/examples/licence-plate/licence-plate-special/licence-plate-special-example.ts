import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
} from '@aposin/ng-aquila/licence-plate';

/**
 * @title Licence plate special (Germany)
 */
@Component({
    selector: 'licence-plate-special-example',
    templateUrl: 'licence-plate-special-example.html',
    styleUrls: ['licence-plate-special-example.css'],
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
        NxFormfieldHintDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class LicencePlateSpecialExampleComponent {
    value = '';
}
