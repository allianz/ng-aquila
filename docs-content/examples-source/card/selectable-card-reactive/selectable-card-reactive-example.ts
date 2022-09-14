import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Selectable cards reactive example
 */
@Component({
    selector: 'selectable-card-reactive-example',
    templateUrl: './selectable-card-reactive-example.html',
    styleUrls: ['./selectable-card-reactive-example.css'],
})
export class SelectableCardReactiveExampleComponent {
    readonly testForm = this.fb.group({
        selectableCardTestReactive: [false, Validators.requiredTrue],
    });

    constructor(private readonly fb: FormBuilder) {}
}
