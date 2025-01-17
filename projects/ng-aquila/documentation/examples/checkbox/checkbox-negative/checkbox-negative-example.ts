import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxCheckboxComponent,
    NxCheckboxGroupComponent,
} from '@aposin/ng-aquila/checkbox';

/**
 * @title Negative styling example
 */
@Component({
    selector: 'checkbox-negative-example',
    templateUrl: './checkbox-negative-example.html',
    styleUrls: ['./checkbox-negative-example.css'],
    imports: [
        NxCheckboxComponent,
        NxCheckboxGroupComponent,
        FormsModule,
        NxLabelComponent,
    ],
})
export class CheckboxNegativeExampleComponent {
    checkboxes = ['checkbox 1'];
}
