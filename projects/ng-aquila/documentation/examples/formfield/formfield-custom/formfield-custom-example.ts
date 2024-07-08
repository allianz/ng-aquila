import { Component } from '@angular/core';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';

import { FormfieldCustomTelInputExampleComponent } from '../formfield-custom-tel-input/formfield-custom-tel-input-example';

/**
 * @title Usage Custom Formfield Control example
 */
@Component({
    selector: 'formfield-custom-example',
    templateUrl: './formfield-custom-example.html',
    styleUrls: ['./formfield-custom-example.css'],
    standalone: true,
    imports: [NxFormfieldComponent, FormfieldCustomTelInputExampleComponent],
})
export class FormfieldCustomExampleComponent {}
