import { Component } from '@angular/core';
import {
    UntypedFormArray,
    UntypedFormBuilder,
    UntypedFormControl,
} from '@angular/forms';

/**
 * @title Selectable cards dynamic example
 */
@Component({
    selector: 'selectable-card-dynamic-example',
    templateUrl: './selectable-card-dynamic-example.html',
    styleUrls: ['./selectable-card-dynamic-example.css'],
})
export class SelectableCardDynamicExampleComponent {
    readonly cardArray = new UntypedFormArray([
        new UntypedFormControl(false),
        new UntypedFormControl(false),
        new UntypedFormControl(false),
    ]);

    readonly myFormGroup = this.fb.group({
        cards: this.cardArray,
    });

    constructor(private readonly fb: UntypedFormBuilder) {}

    addNewCard() {
        this.cardArray.push(new UntypedFormControl(false));
    }

    removeFirstCard() {
        this.cardArray.removeAt(0);
    }

    get cards(): UntypedFormArray {
        return this.myFormGroup.get('cards') as UntypedFormArray;
    }
}
