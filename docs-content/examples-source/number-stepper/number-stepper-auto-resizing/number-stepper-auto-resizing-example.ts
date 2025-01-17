import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxNumberStepperComponent } from '@aposin/ng-aquila/number-stepper';

/**
 * @title Auto resizing example
 */
@Component({
    selector: 'number-stepper-auto-resizing-example',
    templateUrl: './number-stepper-auto-resizing-example.html',
    styleUrls: ['./number-stepper-auto-resizing-example.css'],
    imports: [NxNumberStepperComponent, FormsModule],
})
export class NumberStepperAutoResizingExampleComponent {
    number = 1000;
}
