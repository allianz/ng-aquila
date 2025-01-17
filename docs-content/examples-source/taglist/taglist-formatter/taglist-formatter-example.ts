import { Component } from '@angular/core';
import { NxTaglistComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Tag Formatter Example
 */
@Component({
    selector: 'taglist-formatter-example',
    templateUrl: './taglist-formatter-example.html',
    styleUrls: ['./taglist-formatter-example.css'],
    imports: [NxTaglistComponent],
})
export class TaglistFormatterExampleComponent {
    tags: string[] = [
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ];

    myFormatter(value: string): string {
        return 'my ' + value;
    }
}
