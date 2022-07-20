import { Component } from '@angular/core';

/**
 * @title Tag Delete Tag Example
 */
@Component({
    selector: 'taglist-delete-example',
    templateUrl: './taglist-delete-example.html',
    styleUrls: ['./taglist-delete-example.css'],
})
export class TaglistDeleteExampleComponent {
    tags: string[] = [
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ];
}
