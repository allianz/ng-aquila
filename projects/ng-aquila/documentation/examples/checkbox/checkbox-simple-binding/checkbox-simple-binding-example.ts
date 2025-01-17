import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxCheckboxComponent } from '@aposin/ng-aquila/checkbox';

/**
 * @title Simple binding example
 */
@Component({
    selector: 'checkbox-simple-binding-example',
    templateUrl: './checkbox-simple-binding-example.html',
    styleUrls: ['./checkbox-simple-binding-example.css'],
    imports: [FormsModule, NxCheckboxComponent],
})
export class CheckboxSimpleBindingExampleComponent {
    checkedRaw = false;
}
