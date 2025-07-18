import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxRadioToggleModule } from '@allianz/ng-aquila/radio-toggle';
import { NxSidepanelModule } from '@allianz/ng-aquila/sidepanel';
import { NxTabsModule } from '@allianz/ng-aquila/tabs';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SidepanelDarkExampleComponent } from './sidepanel-dark/sidepanel-dark-example';
import { SidepanelFloatingExampleComponent } from './sidepanel-floating/sidepanel-floating-example';
import { SidepanelFocuskExampleComponent } from './sidepanel-focus/sidepanel-focus-example';
import { SidepanelLightExampleComponent } from './sidepanel-light/sidepanel-light-example';
import { SidepanelStaticExampleComponent } from './sidepanel-static/sidepanel-static-example';
import { SidepanelWithTabsExampleComponent } from './sidepanel-with-tabs/sidepanel-with-tabs-example';

const EXAMPLES = [
  SidepanelFloatingExampleComponent,
  SidepanelStaticExampleComponent,
  SidepanelLightExampleComponent,
  SidepanelWithTabsExampleComponent,
  SidepanelDarkExampleComponent,
  SidepanelFocuskExampleComponent,
];

@NgModule({
  imports: [
    NxSidepanelModule,
    NxRadioToggleModule,
    FormsModule,
    NxIconModule,
    NxTabsModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class SidepanelExamplesModule {
  static components() {
    return {
      'sidepanel-floating': SidepanelFloatingExampleComponent,
      'sidepanel-static': SidepanelStaticExampleComponent,
      'sidepanel-light': SidepanelLightExampleComponent,
      'sidepanel-with-tabs': SidepanelWithTabsExampleComponent,
      'sidepanel-dark': SidepanelDarkExampleComponent,
      'sidepanel-focus': SidepanelFocuskExampleComponent,
    };
  }
}
