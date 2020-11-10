import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxRadioToggleModule } from '@aposin/ng-aquila/radio-toggle';
import { NxSidepanelModule } from '@aposin/ng-aquila/sidepanel';

import { NgModule } from '@angular/core';
import { SidepanelFloatingExampleComponent } from './sidepanel-floating/sidepanel-floating-example';
import { SidepanelStaticExampleComponent } from './sidepanel-static/sidepanel-static-example';
import { FormsModule } from '@angular/forms';

const EXAMPLES = [
  SidepanelFloatingExampleComponent,
  SidepanelStaticExampleComponent
];

 @NgModule({
  imports: [
    NxSidepanelModule,
    NxRadioToggleModule,
    FormsModule,
    NxIconModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class SidepanelExamplesModule {
  static components() {
    return {
      'sidepanel-floating': SidepanelFloatingExampleComponent,
      'sidepanel-static': SidepanelStaticExampleComponent,
    };
  }
}
