import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxSidepanelComponent, NxSidepanelOuterContainerComponent } from './sidepanel';
import { NxSidepanelCloseButtonComponent } from './sidepanel-close-button';
import { NxSidepanelContentComponent } from './sidepanel-content';
import { NxSidepanelHeaderComponent } from './sidepanel-header';

@NgModule({
    imports: [CommonModule, NxIconModule, NxButtonModule],
    declarations: [
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
