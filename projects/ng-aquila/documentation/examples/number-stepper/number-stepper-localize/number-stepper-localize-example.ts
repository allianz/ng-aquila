import { Component, Injectable } from '@angular/core';
import { NxNumberStepperIntl } from '@aposin/ng-aquila/number-stepper';

@Injectable()
export class MyIntl extends NxNumberStepperIntl {
  decrementAriaLabel = 'verringern';
  incrementAriaLabel = 'erhöhen';
}

/**
* @title Localization Example
*/
@Component({
  templateUrl: './number-stepper-localize-example.html',
  providers: [
    {provide: NxNumberStepperIntl, useClass: MyIntl},
  ],
})
export class NumberStepperLocalizeExampleComponent {}
