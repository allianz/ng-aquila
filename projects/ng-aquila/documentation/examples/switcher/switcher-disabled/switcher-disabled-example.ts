import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

/** @title Switcher Disabled Reactive Form */
@Component({
    selector: 'switcher-disabled-example',
    templateUrl: './switcher-disabled-example.html',
    styleUrls: ['./switcher-disabled-example.css'],
})
export class SwitcherDisabledExampleComponent {
    checked = true;
    templateModel = false;

    readonly testForm = this.fb.group({
        switcherDisabledReactive: [false, Validators.requiredTrue],
    });

    constructor(private readonly fb: UntypedFormBuilder) {
        this.testForm.disable();
    }

    switchStatusClick() {
        if (this.testForm.disabled) {
            this.testForm.enable();
        } else {
            this.testForm.disable();
        }
    }
}
