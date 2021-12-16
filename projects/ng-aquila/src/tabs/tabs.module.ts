import { NxTabHeaderOutletComponent } from './tab-header-outlet';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxAccordionModule } from '@aposin/ng-aquila/accordion';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxTabComponent } from './tab';
import { NxTabBodyComponent } from './tab-body';
import { NxTabGroupComponent } from './tab-group';
import { NxTabHeaderComponent } from './tab-header';
import { NxTabLabelDirective } from './tab-label';
import { NxTabNavBarComponent, NxTabLinkDirective } from './tab-nav-bar';
import { NxTabContentDirective } from './tab-content';
import { NxTabLabelWrapperDirective } from './tab-label-wrapper';
import { NxTabScrollIndicator } from './scroll-indicator/scroll-indicator';

@NgModule({
    imports: [CommonModule, PortalModule, NxAccordionModule, NxIconModule, NxButtonModule],
    exports: [NxTabComponent, NxTabGroupComponent, NxTabLabelDirective, NxTabLabelWrapperDirective, NxTabHeaderComponent, NxTabBodyComponent, NxTabNavBarComponent, NxTabLinkDirective, NxTabContentDirective],
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
        NxTabHeaderOutletComponent,
        NxTabScrollIndicator,
    ],
})
export class NxTabsModule {}
