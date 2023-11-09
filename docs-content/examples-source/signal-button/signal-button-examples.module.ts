import { NgModule } from '@angular/core';
import { NxSignalButtonModule } from '@aposin/ng-aquila/signal-button';

import { SignalButtonContextExampleComponent } from './signal-button-context/signal-button-context-example';
import { SignalButtonDisabledExampleComponent } from './signal-button-disabled/signal-button-disabled-example';

const EXAMPLES = [
    SignalButtonContextExampleComponent,
    SignalButtonDisabledExampleComponent,
];

@NgModule({
    imports: [NxSignalButtonModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class SignalButtonExamplesModule {
    static components() {
        return {
            'signal-button-context': SignalButtonContextExampleComponent,
            'signal-button-disabled': SignalButtonDisabledExampleComponent,
        };
    }
}
