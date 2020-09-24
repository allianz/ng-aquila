import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSidepanelComponent } from './sidepanel';
import { NxSidepanelHeaderComponent } from './sidepanel-header';
import { NxSidepanelContentComponent } from './sidepanel-content';
import { NxSidepanelCloseButtonComponent } from './sidepanel-close-button';

@NgModule({
  imports: [ CommonModule, NxIconModule, NxButtonModule ],
  declarations: [
    NxSidepanelComponent,
    NxSidepanelHeaderComponent,
    NxSidepanelContentComponent,
    NxSidepanelCloseButtonComponent
  ],
  exports: [
    NxSidepanelComponent,
    NxSidepanelHeaderComponent,
    NxSidepanelContentComponent,
    NxSidepanelCloseButtonComponent
  ]
})
export class NxSidepanelModule { }
