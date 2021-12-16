import { NxActionModule } from '@aposin/ng-aquila/action';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';

import { NgModule } from '@angular/core';
import { ViewportChangeExampleComponent } from './viewport-change/viewport-change-example';

const EXAMPLES = [ViewportChangeExampleComponent];

@NgModule({
    imports: [NxSidebarModule, NxIconModule, RouterModule, CommonModule, NxActionModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ViewportExamplesModule {
    static components() {
        return {
            'viewport-change': ViewportChangeExampleComponent,
        };
    }
}
