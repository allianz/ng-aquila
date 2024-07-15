import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Template driven example
 */
@Component({
    selector: 'dropdown-template-driven-example',
    templateUrl: './dropdown-template-driven-example.html',
    styleUrls: ['./dropdown-template-driven-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        FormsModule,
        NxFormfieldComponent,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxButtonComponent,
        JsonPipe,
    ],
})
export class DropdownTemplateDrivenExampleComponent {
    ngModelBinding = 'Mini';
}
