import {
  NxCompactProgressIndicatorComponent,
  NxCompactProgressIndicatorIntl,
  NxMultiProgressIndicatorIntl,
  NxMultiProgressStepComponent,
} from '@allianz/ng-aquila/progress-indicator';
import { Component, Injectable, signal } from '@angular/core';

@Injectable()
export class MyCompactProgressIndicatorIntl extends NxCompactProgressIndicatorIntl {
  override readonly stepCounterLabel = signal(
    (current: number, total: number) => `${current} di ${total}`,
  );
  override readonly expandLabel = signal('passaggi');
  override readonly completedLabel = signal('Completato: ');
  override readonly currentLabel = signal('Attuale: ');
  override readonly notCompletedLabel = signal('Non completato: ');
}

/**
 * @title Compact Progress Indicator localization example
 */
@Component({
  selector: 'compact-progress-indicator-localize-example',
  templateUrl: './compact-progress-indicator-localize-example.html',
  providers: [
    {
      provide: NxCompactProgressIndicatorIntl,
      useClass: MyCompactProgressIndicatorIntl,
    },
    // The steps inject the base class, so point it at the same instance.
    {
      provide: NxMultiProgressIndicatorIntl,
      useExisting: NxCompactProgressIndicatorIntl,
    },
  ],
  imports: [NxCompactProgressIndicatorComponent, NxMultiProgressStepComponent],
})
export class CompactProgressIndicatorLocalizeExampleComponent {
  currentStep = 2;
}
