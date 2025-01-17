import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxCheckboxComponent,
    NxCheckboxGroupComponent,
} from '@aposin/ng-aquila/checkbox';

/**
 * @title Checkbox group basic example
 */
@Component({
    selector: 'checkbox-group-basic-example',
    templateUrl: './checkbox-group-basic-example.html',
    styleUrls: ['./checkbox-group-basic-example.css'],
    imports: [
        NxCheckboxGroupComponent,
        FormsModule,
        NxLabelComponent,
        NxCheckboxComponent,
        JsonPipe,
    ],
})
export class CheckboxGroupBasicExampleComponent {
    checkboxes = ['checkbox 1'];
}
