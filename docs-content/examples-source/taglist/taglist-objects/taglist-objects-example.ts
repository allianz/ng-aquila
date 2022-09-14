import { Component } from '@angular/core';

/**
 * @title Tag Objects Example
 */
@Component({
    selector: 'taglist-objects-example',
    templateUrl: './taglist-objects-example.html',
    styleUrls: ['./taglist-objects-example.css'],
})
export class TaglistObjectsExampleComponent {
    tags: any[] = [
        { nxTaglistLabel: 'Apples' },
        { nxTaglistLabel: 'Oranges' },
        { nxTaglistLabel: 'asd' },
    ];
}
