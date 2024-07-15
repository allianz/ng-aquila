import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxCheckboxComponent } from '@aposin/ng-aquila/checkbox';

/**
 * @title Label size example
 */
@Component({
    selector: 'checkbox-label-size-example',
    templateUrl: './checkbox-label-size-example.html',
    styleUrls: ['./checkbox-label-size-example.css'],
    standalone: true,
    imports: [FormsModule, NxCheckboxComponent],
})
export class CheckboxLabelSizeExampleComponent {}
