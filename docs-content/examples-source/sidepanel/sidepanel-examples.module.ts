import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxRadioToggleModule } from '@aposin/ng-aquila/radio-toggle';
import { NxSidepanelModule } from '@aposin/ng-aquila/sidepanel';
import { NxTabsModule } from '@aposin/ng-aquila/tabs';

import { NgModule } from '@angular/core';
import { SidepanelFloatingExampleComponent } from './sidepanel-floating/sidepanel-floating-example';
import { SidepanelStaticExampleComponent } from './sidepanel-static/sidepanel-static-example';
import { SidepanelLightExampleComponent } from './sidepanel-light/sidepanel-light-example';
import { SidepanelWithTabsExampleComponent } from './sidepanel-with-tabs/sidepanel-with-tabs-example';
import { SidepanelDarkExampleComponent } from './sidepanel-dark/sidepanel-dark-example';
import { FormsModule } from '@angular/forms';

const EXAMPLES = [
  SidepanelFloatingExampleComponent,
  SidepanelStaticExampleComponent,
  SidepanelLightExampleComponent,
  SidepanelWithTabsExampleComponent,
  SidepanelDarkExampleComponent
];

 @NgModule({
  imports: [
    NxSidepanelModule,
    NxRadioToggleModule,
    FormsModule,
    NxIconModule,
    NxTabsModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class SidepanelExamplesModule {
  static components() {
    return {
      'sidepanel-floating': SidepanelFloatingExampleComponent,
      'sidepanel-static': SidepanelStaticExampleComponent,
      'sidepanel-light': SidepanelLightExampleComponent,
      'sidepanel-with-tabs': SidepanelWithTabsExampleComponent,
      'sidepanel-dark': SidepanelDarkExampleComponent
    };
  }
}
