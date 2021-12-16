import { Component } from '@angular/core';

/**
 * @title Tag Template Driven Example
 */
@Component({
    selector: 'taglist-templatedriven-example',
    templateUrl: './taglist-templatedriven-example.html',
    styleUrls: ['./taglist-templatedriven-example.css'],
})
export class TaglistTemplatedrivenExampleComponent {
    templateModel = [
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ];
}
