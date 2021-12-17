import { Component } from '@angular/core';

/**
 * @title Template driven example with ngModel
 */
@Component({
    selector: 'circle-toggle-template-driven-example',
    templateUrl: './circle-toggle-template-driven-example.html',
    styleUrls: ['./circle-toggle-template-driven-example.css'],
})
export class CircleToggleTemplateDrivenExampleComponent {
    toggleGroupModel!: string;

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
}
