import { Component } from '@angular/core';
import { NxTaglistComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Tag Example
 */
@Component({
    selector: 'taglist-example',
    templateUrl: './taglist-example.html',
    styleUrls: ['./taglist-example.css'],
    imports: [NxTaglistComponent],
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
