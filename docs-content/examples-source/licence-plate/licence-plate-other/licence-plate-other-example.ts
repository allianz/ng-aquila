import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxLicencePlateValidatorDirective } from '@aposin/ng-aquila/licence-plate';

/**
 * @title Licence plate other
 */
@Component({
    selector: 'licence-plate-other-example',
    templateUrl: 'licence-plate-other-example.html',
    styleUrls: ['licence-plate-other-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxInputDirective,
        FormsModule,
        NxLicencePlateValidatorDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class LicencePlateOtherExampleComponent {
    value = '';
}
