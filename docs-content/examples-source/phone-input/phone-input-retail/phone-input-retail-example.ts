import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
} from '@aposin/ng-aquila/formfield';
import { NxPhoneInputComponent } from '@aposin/ng-aquila/phone-input';

/** @title Retail variation */
@Component({
    selector: 'phone-input-retail-example',
    templateUrl: 'phone-input-retail-example.html',
    styleUrls: ['./phone-input-retail-example.css'],
    imports: [
        NxFormfieldComponent,
        NxFormfieldLabelDirective,
        NxPhoneInputComponent,
        FormsModule,
    ],
})
export class PhoneInputRetailExampleComponent {
    value = '';
}
