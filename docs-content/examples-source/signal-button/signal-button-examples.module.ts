import { NxSignalButtonModule } from '@allianz/ng-aquila/signal-button';
import { NgModule } from '@angular/core';

import { SignalButtonContextExampleComponent } from './signal-button-context/signal-button-context-example';
import { SignalButtonContextA1ExampleComponent } from './signal-button-context-a1/signal-button-context-a1-example';
import { SignalButtonDisabledExampleComponent } from './signal-button-disabled/signal-button-disabled-example';
import { SignalButtonDisabledA1ExampleComponent } from './signal-button-disabled-a1/signal-button-disabled-a1-example';

const EXAMPLES = [
  SignalButtonContextExampleComponent,
  SignalButtonContextA1ExampleComponent,
  SignalButtonDisabledExampleComponent,
  SignalButtonDisabledA1ExampleComponent,
];

@NgModule({
  imports: [NxSignalButtonModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class SignalButtonExamplesModule {
  static components() {
    return {
      'signal-button-context': SignalButtonContextExampleComponent,
      'signal-button-context-a1': SignalButtonContextA1ExampleComponent,
      'signal-button-disabled': SignalButtonDisabledExampleComponent,
      'signal-button-disabled-a1': SignalButtonDisabledA1ExampleComponent,
    };
  }
}
