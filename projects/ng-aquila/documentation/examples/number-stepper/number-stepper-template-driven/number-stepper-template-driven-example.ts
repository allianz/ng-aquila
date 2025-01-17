import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxNumberStepperComponent } from '@aposin/ng-aquila/number-stepper';

/**
 * @title Template-driven example with ngModel
 */
@Component({
    selector: 'number-stepper-template-driven-example',
    templateUrl: './number-stepper-template-driven-example.html',
    styleUrls: ['./number-stepper-template-driven-example.css'],
    imports: [FormsModule, NxNumberStepperComponent],
})
export class NumberStepperTemplateDrivenExampleComponent {
    number = 3;
}
