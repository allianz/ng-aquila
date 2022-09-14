import { Component } from '@angular/core';

/**
 * @title Tag Basic Example
 */
@Component({
    selector: 'taglist-basic-example',
    templateUrl: './taglist-basic-example.html',
    styleUrls: ['./taglist-basic-example.css'],
})
export class TaglistBasicExampleComponent {
    tags: string[] = [
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ];
}
