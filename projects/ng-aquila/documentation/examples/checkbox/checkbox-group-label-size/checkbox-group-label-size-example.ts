import { Component } from '@angular/core';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxCheckboxComponent,
    NxCheckboxGroupComponent,
} from '@aposin/ng-aquila/checkbox';

/**
 * @title Checkbox group label size example
 */
@Component({
    selector: 'checkbox-group-label-size-example',
    templateUrl: './checkbox-group-label-size-example.html',
    styleUrls: ['./checkbox-group-label-size-example.css'],
    standalone: true,
    imports: [NxCheckboxGroupComponent, NxLabelComponent, NxCheckboxComponent],
})
export class CheckboxGroupLabelSizeExampleComponent {}
