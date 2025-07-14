import { NxAccordionModule } from '@allianz/ng-aquila/accordion';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxTabScrollIndicator } from './scroll-indicator/scroll-indicator';
import { NxTabComponent } from './tab';
import { NxTabBodyComponent } from './tab-body';
import { NxTabContentDirective } from './tab-content';
import { NxTabGroupComponent } from './tab-group';
import { NxTabHeaderComponent } from './tab-header';
import { NxTabHeaderOutletComponent } from './tab-header-outlet';
import { NxTabLabelDirective } from './tab-label';
import { NxTabLabelWrapperDirective } from './tab-label-wrapper';
import { NxTabLinkDirective, NxTabNavBarComponent } from './tab-nav-bar';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    NxAccordionModule,
    NxIconModule,
    NxButtonModule,
    NxTabComponent,
    NxTabGroupComponent,
    NxTabLabelDirective,
    NxTabLabelWrapperDirective,
    NxTabHeaderComponent,
    NxTabBodyComponent,
    NxTabNavBarComponent,
    NxTabLinkDirective,
    NxTabContentDirective,
    NxTabHeaderOutletComponent,
    NxTabScrollIndicator,
  ],
  exports: [
    NxTabComponent,
    NxTabGroupComponent,
    NxTabLabelDirective,
    NxTabLabelWrapperDirective,
    NxTabHeaderComponent,
    NxTabBodyComponent,
    NxTabNavBarComponent,
    NxTabLinkDirective,
    NxTabContentDirective,
  ],
})
export class NxTabsModule {}
