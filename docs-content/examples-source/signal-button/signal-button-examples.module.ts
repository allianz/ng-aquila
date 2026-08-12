import { NxSignalButtonModule } from '@allianz/ng-aquila/signal-button';
import { NgModule } from '@angular/core';

import { SignalButtonContextExampleComponent } from './signal-button-context/signal-button-context-example';
import { SignalButtonDisabledExampleComponent } from './signal-button-disabled/signal-button-disabled-example';
import { SignalButtonSizeExampleComponent } from './signal-button-size/signal-button-size-example';

const EXAMPLES = [
  SignalButtonContextExampleComponent,
  SignalButtonDisabledExampleComponent,
  SignalButtonSizeExampleComponent,
];

@NgModule({
  imports: [NxSignalButtonModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class SignalButtonExamplesModule {
  static components() {
    return {
      'signal-button-context': SignalButtonContextExampleComponent,
      'signal-button-disabled': SignalButtonDisabledExampleComponent,
      'signal-button-size': SignalButtonSizeExampleComponent,
    };
  }
}
