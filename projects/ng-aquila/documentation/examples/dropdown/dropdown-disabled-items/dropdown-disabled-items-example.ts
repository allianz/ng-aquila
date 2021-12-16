import { Component } from '@angular/core';

interface MyOption {
    name: string;
    id: number;
}

/**
 * @title Disabled items example
 */
@Component({
    selector: 'dropdown-disabled-items-example',
    templateUrl: './dropdown-disabled-items-example.html',
    styleUrls: ['./dropdown-disabled-items-example.css'],
})
export class DropdownDisabledItemsExampleComponent {
    options: MyOption[] = [
        {
            name: 'BMW',
            id: 1,
        },
        {
            name: 'Audi',
            id: 2,
        },
        {
            name: 'Volvo',
            id: 3,
        },
        {
            name: 'Mini',
            id: 4,
        },
    ];

    isOptionDisabled(option: MyOption) {
        return option.id % 2 === 0;
    }
}
