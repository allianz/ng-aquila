import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';
import { NxTreeModule } from '@aposin/ng-aquila/tree';

import { ExamplesSharedModule } from '../examples-shared.module';
import { SidebarExampleComponent } from './sidebar/sidebar-example';
import { SidebarFooterExampleComponent } from './sidebar-footer/sidebar-footer-example';
import { SidebarMethodsExampleComponent } from './sidebar-methods/sidebar-methods-example';
import { SidebarOutputsExampleComponent } from './sidebar-outputs/sidebar-outputs-example';
import { SidebarResizeableExampleComponent } from './sidebar-resizeable/sidebar-resizeable-example';

const EXAMPLES = [
    SidebarExampleComponent,
    SidebarFooterExampleComponent,
    SidebarMethodsExampleComponent,
    SidebarOutputsExampleComponent,
    SidebarResizeableExampleComponent,
];

@NgModule({
    imports: [
        NxSidebarModule,
        NxTreeModule,
        NxInputModule,
        NxIconModule,
        RouterModule,
        NxActionModule,
        ExamplesSharedModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class SidebarExamplesModule {
    static components() {
        return {
            sidebar: SidebarExampleComponent,
            'sidebar-footer': SidebarFooterExampleComponent,
            'sidebar-methods': SidebarMethodsExampleComponent,
            'sidebar-outputs': SidebarOutputsExampleComponent,
            'sidebar-resizeable': SidebarResizeableExampleComponent,
        };
    }
}
