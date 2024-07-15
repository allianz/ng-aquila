import { Component } from '@angular/core';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Basic formfield example
 */
@Component({
    selector: 'formfield-basic-example',
    templateUrl: './formfield-basic-example.html',
    styleUrls: ['./formfield-basic-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxInputDirective,
    ],
})
export class FormfieldBasicExampleComponent {}
