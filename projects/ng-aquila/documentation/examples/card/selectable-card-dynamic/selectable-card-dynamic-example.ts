import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

/**
 * @title Selectable cards dynamic example
 */
@Component({
    selector: 'selectable-card-dynamic-example',
    templateUrl: './selectable-card-dynamic-example.html',
    styleUrls: ['./selectable-card-dynamic-example.css'],
})
export class SelectableCardDynamicExampleComponent {
    readonly cardArray = new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
    ]);

    readonly myFormGroup = this.fb.group({
        cards: this.cardArray,
    });

    constructor(private readonly fb: FormBuilder) {}

    addNewCard() {
        this.cardArray.push(new FormControl(false));
    }

    removeFirstCard() {
        this.cardArray.removeAt(0);
    }

    get cards(): FormArray {
        return this.myFormGroup.get('cards') as FormArray;
    }
}
