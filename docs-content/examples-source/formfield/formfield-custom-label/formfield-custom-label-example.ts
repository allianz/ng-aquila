import { Component } from '@angular/core';

/**
 * @title Custom formfield label example
 */
@Component({
    selector: 'formfield-custom-label-example',
    templateUrl: './formfield-custom-label-example.html',
    styleUrls: ['./formfield-custom-label-example.css'],
})
export class FormfieldCustomLabelExampleComponent {
    suffix = '(suffix)';

    addOptionalSuffix() {
        this.suffix = this.suffix === '' ? '(suffix)' : '';
    }
}
