import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NxTagComponent, NxTagGroupComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Tag Group Example
 */
@Component({
    selector: 'tag-group-example',
    templateUrl: './tag-group-example.html',
    styleUrls: ['./tag-group-example.css'],
    standalone: true,
    imports: [NxTagGroupComponent, NxTagComponent, ReactiveFormsModule],
})
export class TagGroupExampleComponent {
    tags: string[] = [
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ];
}
