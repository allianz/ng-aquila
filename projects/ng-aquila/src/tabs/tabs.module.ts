import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxAccordionModule } from '@aposin/ng-aquila/accordion';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';

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
    imports: [CommonModule, PortalModule, NxAccordionModule, NxIconModule, NxButtonModule],
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
