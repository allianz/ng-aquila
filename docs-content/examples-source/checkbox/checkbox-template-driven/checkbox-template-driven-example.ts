import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxCheckboxComponent } from '@aposin/ng-aquila/checkbox';

/**
 * @title Template-driven example with ngModel
 */
@Component({
    selector: 'checkbox-template-driven-example',
    templateUrl: './checkbox-template-driven-example.html',
    styleUrls: ['./checkbox-template-driven-example.css'],
    imports: [FormsModule, NxCheckboxComponent],
})
export class CheckboxTemplateDrivenExampleComponent {
    checked = false;
}
