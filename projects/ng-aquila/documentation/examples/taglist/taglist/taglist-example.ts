import { Component } from '@angular/core';

/**
 * @title Tag Example
 */
@Component({
    selector: 'taglist-example',
    templateUrl: './taglist-example.html',
    styleUrls: ['./taglist-example.css'],
})
export class TaglistExampleComponent {
    tags: string[] = [
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ];
}
