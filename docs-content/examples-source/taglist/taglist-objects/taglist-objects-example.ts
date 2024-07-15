import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFormfieldComponent,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxTaglistComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Tag Objects Example
 */
@Component({
    selector: 'taglist-objects-example',
    templateUrl: './taglist-objects-example.html',
    styleUrls: ['./taglist-objects-example.css'],
    standalone: true,
    imports: [
        NxTaglistComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxButtonComponent,
        JsonPipe,
    ],
})
export class TaglistObjectsExampleComponent {
    tags: any[] = [
        { nxTaglistLabel: 'Apples' },
        { nxTaglistLabel: 'Oranges' },
        { nxTaglistLabel: 'asd' },
    ];
}
