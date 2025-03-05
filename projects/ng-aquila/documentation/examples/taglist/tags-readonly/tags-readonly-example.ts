import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxTagComponent, NxTagGroupComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Tag Group Readonly Example
 */
@Component({
    selector: 'tags-readonly-example',
    templateUrl: './tags-readonly-example.html',
    styleUrls: ['./tags-readonly-example.css'],
    standalone: true,
    imports: [
        NxTagGroupComponent,
        NxTagComponent,
        ReactiveFormsModule,
        NxCopytextComponent,
    ],
})
export class TagsReadonlyExampleComponent {
    tags: string[] = [
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ];
}
