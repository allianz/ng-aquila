import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxIndicatorModule } from '@aposin/ng-aquila/indicator';

import { ActionExampleComponent } from './action/action-example';
import { ActionIndicatorExampleComponent } from './action-indicator/action-indicator-example';
import { ActionWithRouterExampleComponent } from './action-with-router/action-with-router-example';

const EXAMPLES = [
    ActionExampleComponent,
    ActionWithRouterExampleComponent,
    ActionIndicatorExampleComponent,
];

@NgModule({
    imports: [
        NxActionModule,
        RouterModule,
        NxIconModule,
        NxIndicatorModule,
        CommonModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ActionExamplesModule {
    static components() {
        return {
            action: ActionExampleComponent,
            'action-with-router': ActionWithRouterExampleComponent,
            'action-indicator': ActionIndicatorExampleComponent,
        };
    }
}
