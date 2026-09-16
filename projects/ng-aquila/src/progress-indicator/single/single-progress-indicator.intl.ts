import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NxSingleProgressIndicatorIntl {
  // A whole-sentence builder rather than separate "Step"/"of" words: locales reorder the parts
  // (Turkish renders "Step 1 of 4" as "4 adımdan 1."), so translating the words in isolation
  // cannot produce a correct label.
  /** Builds the default label, e.g. "Step 1 of 4". */
  readonly label = signal(
    (currentStep: number, totalSteps: number) => `Step ${currentStep} of ${totalSteps}`,
  );
}
