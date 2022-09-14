import { Component, OnInit } from '@angular/core';

/**
 * @title Expert variation
 */
@Component({
    selector: 'phone-input-expert-example',
    templateUrl: 'phone-input-expert-example.html',
    styleUrls: ['./phone-input-expert-example.css'],
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
