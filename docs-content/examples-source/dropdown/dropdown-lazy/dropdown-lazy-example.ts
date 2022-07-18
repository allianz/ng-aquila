import { Component } from '@angular/core';
import { NxDropdownOption } from '@aposin/ng-aquila/dropdown';

/**
 * @title Standard lazy example
 */
@Component({
    selector: 'dropdown-lazy-example',
    templateUrl: './dropdown-lazy-example.html',
    styleUrls: ['./dropdown-lazy-example.css'],
})
export class DropdownLazyExampleComponent {
    items: NxDropdownOption[];

    constructor() {
        this.items = [];
        for (let i = 1; i <= 500; i++) {
            this.items.push({
                label: `Item ${i}`,
                value: i,
            });
        }
    }
}
