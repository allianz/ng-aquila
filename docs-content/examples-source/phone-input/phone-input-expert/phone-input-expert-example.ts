import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxCheckboxComponent } from '@aposin/ng-aquila/checkbox';
import {
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
} from '@aposin/ng-aquila/formfield';
import { NxPhoneInputComponent } from '@aposin/ng-aquila/phone-input';

/**
 * @title Expert variation
 */
@Component({
    selector: 'phone-input-expert-example',
    templateUrl: 'phone-input-expert-example.html',
    styleUrls: ['./phone-input-expert-example.css'],
    standalone: true,
    imports: [
        NxCheckboxComponent,
        NxFormfieldComponent,
        NxFormfieldLabelDirective,
        NxPhoneInputComponent,
        FormsModule,
    ],
})
export class PhoneInputExpertExampleComponent implements OnInit {
    tel = '+1 123 867593';
    countryCode = 'FR';
    readonly = false;
    disabled = false;

    ngOnInit(): void {
        setTimeout(() => (this.countryCode = 'AT'));
    }
}
