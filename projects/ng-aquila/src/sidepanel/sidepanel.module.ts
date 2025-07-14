import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSidepanelComponent, NxSidepanelOuterContainerComponent } from './sidepanel';
import { NxSidepanelCloseButtonComponent } from './sidepanel-close-button';
import { NxSidepanelContentComponent } from './sidepanel-content';
import { NxSidepanelHeaderComponent } from './sidepanel-header';

@NgModule({
  imports: [
    CommonModule,
    NxIconModule,
    NxButtonModule,
    NxSidepanelComponent,
    NxSidepanelHeaderComponent,
    NxSidepanelContentComponent,
    NxSidepanelCloseButtonComponent,
    NxSidepanelOuterContainerComponent,
  ],
  exports: [
    NxSidepanelComponent,
    NxSidepanelHeaderComponent,
    NxSidepanelContentComponent,
    NxSidepanelCloseButtonComponent,
    NxSidepanelOuterContainerComponent,
  ],
})
export class NxSidepanelModule {}
