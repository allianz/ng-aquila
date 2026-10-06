import {
  NxMultiProgressIndicatorComponent,
  NxMultiProgressIndicatorIntl,
  NxMultiProgressStepComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { Component, Injectable, signal } from '@angular/core';

@Injectable()
export class MyProgressIndicatorIntl extends NxMultiProgressIndicatorIntl {
  override readonly completedLabel = signal('Abgeschlossen: ');
  override readonly currentLabel = signal('Aktuell: ');
}

/**
 * @title Multi Progress Indicator localization example
 */
@Component({
  selector: 'multi-progress-indicator-localize-example',
  templateUrl: './multi-progress-indicator-localize-example.html',
  providers: [
    {
      provide: NxMultiProgressIndicatorIntl,
      useClass: MyProgressIndicatorIntl,
    },
  ],
  imports: [NxMultiProgressIndicatorComponent, NxMultiProgressStepComponent],
})
export class MultiProgressIndicatorLocalizeExampleComponent {}
