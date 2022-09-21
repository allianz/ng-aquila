import { NxNumberStepperIntl } from '@allianz/ng-aquila/number-stepper';
import { Component, Injectable } from '@angular/core';

@Injectable()
export class MyIntl extends NxNumberStepperIntl {
    decrementAriaLabel = 'verringern';
    incrementAriaLabel = 'erhöhen';
}

/**
 * @title Localization Example
 */
@Component({
    selector: 'number-stepper-localize-example',
    templateUrl: './number-stepper-localize-example.html',
    styleUrls: ['./number-stepper-localize-example.css'],
    providers: [{ provide: NxNumberStepperIntl, useClass: MyIntl }],
})
export class NumberStepperLocalizeExampleComponent {}
