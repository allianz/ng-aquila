import { Component } from '@angular/core';
import { NxTaglistComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Tag Delete Tag Example
 */
@Component({
    selector: 'taglist-delete-example',
    templateUrl: './taglist-delete-example.html',
    styleUrls: ['./taglist-delete-example.css'],
    imports: [NxTaglistComponent],
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
