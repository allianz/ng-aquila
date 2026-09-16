import {
  NxSingleProgressIndicatorComponent,
  NxSingleProgressIndicatorIntl,
} from '@allianz/ng-aquila/progress-indicator';
import { Component, Injectable, signal } from '@angular/core';

@Injectable()
export class MySingleProgressIndicatorIntl extends NxSingleProgressIndicatorIntl {
  override readonly label = signal(
    (currentStep: number, totalSteps: number) =>
      `Schritt ${currentStep} von ${totalSteps}`,
  );
}

/**
 * @title Single Progress Indicator localization example
 */
@Component({
  selector: 'single-progress-indicator-localize-example',
  templateUrl: './single-progress-indicator-localize-example.html',
  providers: [
    {
      provide: NxSingleProgressIndicatorIntl,
      useClass: MySingleProgressIndicatorIntl,
    },
  ],
  imports: [NxSingleProgressIndicatorComponent],
})
export class SingleProgressIndicatorLocalizeExampleComponent {}
