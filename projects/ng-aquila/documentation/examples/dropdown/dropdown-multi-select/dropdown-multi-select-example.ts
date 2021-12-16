import { Component } from '@angular/core';

interface MyOption {
    name: string;
    id: number;
}

/**
 * @title Multi select example
 */
@Component({
    selector: 'dropdown-multi-select-example',
    templateUrl: './dropdown-multi-select-example.html',
    styleUrls: ['./dropdown-multi-select-example.css'],
})
export class DropdownMultiSelectExampleComponent {
    options: string[] = ['Apple', 'Orange', 'Plum', 'Cherry'];

    complexOptions: MyOption[] = [
        {
            name: 'Apple',
            id: 1,
        },
        {
            name: 'Orange',
            id: 2,
        },
        {
            name: 'Plum',
            id: 3,
        },
        {
            name: 'Cherry',
            id: 4,
        },
    ];

    selectLabel(option: MyOption): string {
        return option.name;
    }

    selectValue(option: MyOption): number {
        return option.id;
    }
}
