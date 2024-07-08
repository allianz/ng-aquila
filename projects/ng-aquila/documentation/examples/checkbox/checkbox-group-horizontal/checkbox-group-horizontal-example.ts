import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxCheckboxComponent,
    NxCheckboxGroupComponent,
} from '@aposin/ng-aquila/checkbox';

/** @title Checkbox Group Horizontal Example */
@Component({
    selector: 'checkbox-group-horizontal-example',
    templateUrl: './checkbox-group-horizontal-example.html',
    styleUrls: ['./checkbox-group-horizontal-example.css'],
    standalone: true,
    imports: [
        NxCheckboxGroupComponent,
        FormsModule,
        NxLabelComponent,
        NxCheckboxComponent,
        JsonPipe,
    ],
})
export class CheckboxGroupHorizontalExampleComponent {
    checkboxes = ['checkbox 1'];
}
