import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

interface MyOption {
    label: string;
    id: number;
}

function getOptions(): MyOption[] {
    return [
        {
            label: 'Apple',
            id: 1,
        },
        {
            label: 'Banana',
            id: 2,
        },
        {
            label: 'Strawberry',
            id: 3,
        },
        {
            label: 'Orange',
            id: 4,
        },
        {
            label: 'Lemon',
            id: 5,
        },
        {
            label: 'Grapefruit',
            id: 6,
        },
        {
            label: 'Mango',
            id: 7,
        },
        {
            label: 'Pineapple',
            id: 8,
        },
        {
            label: 'Kiwi',
            id: 9,
        },
        {
            label: 'Cherry',
            id: 10,
        },
        {
            label: 'Blueberry',
            id: 11,
        },
        {
            label: 'Avocado',
            id: 12,
        },
        {
            label: 'Watermelon',
            id: 13,
        },
        {
            label: 'Raspberry',
            id: 14,
        },
        {
            label: 'Papaya',
            id: 15,
        },
    ];
}

/**
 * @title Basic multi select example
 */
@Component({
    selector: 'multi-select-example',
    templateUrl: './multi-select-example.html',
    styleUrls: ['./multi-select-example.css'],
})
export class MultiSelectExampleComponent {
    model: number[] = [3];

    modelWithFilter: number[] = [];

    options: MyOption[] = getOptions();

    control = new FormControl([], {
        validators: Validators.minLength(3),
    });

    selectLabel(option: MyOption) {
        return option.label;
    }

    selectValue(option: MyOption) {
        return option.id;
    }
}
