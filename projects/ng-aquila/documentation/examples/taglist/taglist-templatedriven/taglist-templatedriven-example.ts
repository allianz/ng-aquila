import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFormfieldComponent,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxTaglistComponent } from '@aposin/ng-aquila/taglist';

/**
 * @title Tag Template Driven Example
 */
@Component({
    selector: 'taglist-templatedriven-example',
    templateUrl: './taglist-templatedriven-example.html',
    styleUrls: ['./taglist-templatedriven-example.css'],
    imports: [
        FormsModule,
        NxTaglistComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxButtonComponent,
    ],
})
export class TaglistTemplatedrivenExampleComponent {
    templateModel = [
        'Apples',
        'Oranges',
        'Bananas',
        'Strawberries',
        'Melons',
        'Lemons',
    ];
}
