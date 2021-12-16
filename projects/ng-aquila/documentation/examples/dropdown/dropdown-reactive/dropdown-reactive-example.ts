import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Reactive example
 */
@Component({
    selector: 'dropdown-reactive-example',
    templateUrl: './dropdown-reactive-example.html',
    styleUrls: ['./dropdown-reactive-example.css'],
})
export class DropdownReactiveExampleComponent {
    form = new FormBuilder().group({
        dropdown: ['BMW', Validators.required],
    });

    patch(value: string) {
        this.form.patchValue({ dropdown: value });
    }
}
