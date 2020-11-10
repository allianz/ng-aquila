import { CommonModule } from '@angular/common';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { RouterModule } from '@angular/router';
import { NxActionModule } from '@aposin/ng-aquila/action';

import { NgModule } from '@angular/core';
import { ActionExampleComponent } from './action/action-example';
import { ActionWithRouterExampleComponent } from './action-with-router/action-with-router-example';

const EXAMPLES = [
  ActionExampleComponent,
  ActionWithRouterExampleComponent
];

@NgModule({
  imports: [
    NxActionModule,
    RouterModule,
    NxIconModule,
    CommonModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class ActionExamplesModule {
  static components() {
    return {
      'action': ActionExampleComponent,
      'action-with-router': ActionWithRouterExampleComponent,
    };
  }
}
