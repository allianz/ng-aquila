import { Component } from '@angular/core';

/** @title Focus in/out example */
@Component({
    selector: 'phone-input-focus-out-example',
    templateUrl: 'phone-input-focus-out-example.html',
    styleUrls: ['./phone-input-focus-out-example.css'],
})
export class PhoneInputFocusOutExampleComponent {
    value = '';

    focusing = false;

    onFocusOut() {
        this.focusing = false;
    }

    onFocusIn() {
        this.focusing = true;
    }
}
