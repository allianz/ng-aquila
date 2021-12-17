import { Component } from '@angular/core';

/**
 * @title Simple binding example
 */
@Component({
    selector: 'circle-toggle-simple-binding-example',
    templateUrl: './circle-toggle-simple-binding-example.html',
    styleUrls: ['./circle-toggle-simple-binding-example.css'],
})
export class CircleToggleSimpleBindingExampleComponent {
    simpleBinding!: string;
    currentChar = 'D';

    sampleValues = [
        {
            value: 'A',
            icon: 'product-heart',
            hint: 'Hint A',
            label: 'Label A',
            selected: false,
        },
        {
            value: 'B',
            icon: 'product-car',
            hint: 'Hint B',
            label: 'Label B',
            selected: true,
        },
        {
            value: 'C',
            icon: 'product-plane',
            hint: 'Hint C',
            label: 'Label C',
            selected: false,
        },
    ];

    addBtn() {
        this.sampleValues.push({
            value: this.currentChar,
            icon: 'product-bike',
            hint: `Hint ${this.currentChar}`,
            label: `Label ${this.currentChar}`,
            selected: false,
        });

        let nextCharCode = this.currentChar.charCodeAt(0) + 1;

        if (nextCharCode >= 90) {
            nextCharCode = 65;
        }

        this.currentChar = String.fromCharCode(nextCharCode);
    }
}
