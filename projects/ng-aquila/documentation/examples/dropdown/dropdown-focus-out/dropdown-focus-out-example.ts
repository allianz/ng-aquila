import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

/**
 * @title Focus out example
 */
@Component({
    selector: 'dropdown-focus-out-example',
    templateUrl: './dropdown-focus-out-example.html',
    styleUrls: ['./dropdown-focus-out-example.css'],
})
export class DropdownFocusOutExampleComponent {
    form = new UntypedFormBuilder().group({
        dropdown: ['BMW'],
    });

    focusing = false;

    onFocusOut() {
        this.focusing = false;
    }

    onFocus() {
        this.focusing = true;
    }
}
