import { Component } from '@angular/core';
import { NxTaglistComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Tag Keyword Example
 */
@Component({
    selector: 'taglist-keyword-example',
    templateUrl: './taglist-keyword-example.html',
    styleUrls: ['./taglist-keyword-example.css'],
    imports: [NxTaglistComponent],
})
export class TaglistKeywordExampleComponent {
    tags: string[] = [
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ];
}
