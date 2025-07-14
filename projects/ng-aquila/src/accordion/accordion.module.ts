import { NxIconModule } from '@allianz/ng-aquila/icon';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxAccordionDirective } from './accordion';
import { NxExpansionPanelComponent } from './expansion-panel';
import { NxExpansionPanelBodyDirective } from './expansion-panel-body';
import {
  NxExpansionPanelDescriptionDirective,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from './expansion-panel-header';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    NxIconModule,
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelDescriptionDirective,
    NxExpansionPanelTitleDirective,
    NxExpansionPanelBodyDirective,
  ],
  exports: [
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelDescriptionDirective,
    NxExpansionPanelTitleDirective,
    NxExpansionPanelBodyDirective,
  ],
  providers: [],
})
export class NxAccordionModule {}
