import { NxTabHeaderOutletComponent } from './tab-header-outlet';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxAccordionModule } from '@aposin/ng-aquila/accordion';
import { NxTabComponent } from './tab';
import { NxTabBodyComponent } from './tab-body';
import { NxTabGroupComponent } from './tab-group';
import { NxTabHeaderComponent } from './tab-header';
import { NxTabLabelDirective } from './tab-label';
import { NxTabNavBarComponent, NxTabLinkDirective } from './tab-nav-bar';
import { NxTabContentDirective} from './tab-content';
import { NxTabLabelWrapperDirective } from './tab-label-wrapper';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    NxAccordionModule
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
    NxTabContentDirective
  ],
  declarations: [
    NxTabComponent,
    NxTabGroupComponent,
    NxTabLabelDirective,
    NxTabLabelWrapperDirective,
    NxTabHeaderComponent,
    NxTabBodyComponent,
    NxTabNavBarComponent,
    NxTabLinkDirective,
    NxTabContentDirective,
    NxTabHeaderOutletComponent
  ]
})
export class NxTabsModule { }
