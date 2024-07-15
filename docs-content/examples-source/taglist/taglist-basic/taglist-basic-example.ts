import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFormfieldComponent,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxTaglistComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Tag Basic Example
 */
@Component({
    selector: 'taglist-basic-example',
    templateUrl: './taglist-basic-example.html',
    styleUrls: ['./taglist-basic-example.css'],
    standalone: true,
    imports: [
        NxTaglistComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxButtonComponent,
    ],
})
export class TaglistBasicExampleComponent {
    tags: string[] = [
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ];
}
