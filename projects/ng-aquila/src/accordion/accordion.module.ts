import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxAccordionDirective } from './accordion';
import { NxExpansionPanelComponent } from './expansion-panel';
import { NxExpansionPanelBodyDirective } from './expansion-panel-body';
import { NxExpansionPanelDescriptionDirective, NxExpansionPanelHeaderComponent, NxExpansionPanelTitleDirective } from './expansion-panel-header';

@NgModule({
    imports: [CommonModule, PortalModule, NxIconModule],
    exports: [
        NxAccordionDirective,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelDescriptionDirective,
        NxExpansionPanelTitleDirective,
        NxExpansionPanelBodyDirective,
    ],
    declarations: [
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
