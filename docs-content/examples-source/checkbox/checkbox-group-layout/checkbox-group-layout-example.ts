import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxCheckboxComponent,
    NxCheckboxGroupComponent,
} from '@aposin/ng-aquila/checkbox';
import { NxGridModule } from '@aposin/ng-aquila/grid';

/** @title Checkbox Group responsive horizontal layout  */
@Component({
    selector: 'checkbox-group-layout-example',
    templateUrl: './checkbox-group-layout-example.html',
    styleUrls: ['./checkbox-group-layout-example.css'],
    imports: [
        NxCheckboxGroupComponent,
        FormsModule,
        NxLabelComponent,
        NxCheckboxComponent,
        JsonPipe,
        NxGridModule,
    ],
})
export class CheckboxGroupLayoutExampleComponent {
    checkboxes = ['checkbox 1'];
}
