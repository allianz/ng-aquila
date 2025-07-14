import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { Component } from '@angular/core';

import { FormfieldCustomTelInputExampleComponent } from '../formfield-custom-tel-input/formfield-custom-tel-input-example';

/**
 * @title Usage Custom Formfield Control example
 */
@Component({
  selector: 'formfield-custom-example',
  templateUrl: './formfield-custom-example.html',
  styleUrls: ['./formfield-custom-example.css'],
  imports: [NxFormfieldComponent, FormfieldCustomTelInputExampleComponent],
})
export class FormfieldCustomExampleComponent {}
