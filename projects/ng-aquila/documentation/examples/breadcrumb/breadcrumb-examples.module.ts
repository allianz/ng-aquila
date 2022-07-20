import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxBreadcrumbModule } from '@aposin/ng-aquila/breadcrumb';

import { BreadcrumbExampleComponent } from './breadcrumb/breadcrumb-example';
import { BreadcrumbLinkExampleComponent } from './breadcrumb-link/breadcrumb-link-example';
import { BreadcrumbNegativeExampleComponent } from './breadcrumb-negative/breadcrumb-negative-example';

const EXAMPLES = [
    BreadcrumbExampleComponent,
    BreadcrumbNegativeExampleComponent,
    BreadcrumbLinkExampleComponent,
];

@NgModule({
    imports: [NxBreadcrumbModule, CommonModule, RouterModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class BreadcrumbExamplesModule {
    static components() {
        return {
            breadcrumb: BreadcrumbExampleComponent,
            'breadcrumb-negative': BreadcrumbNegativeExampleComponent,
            'breadcrumb-link': BreadcrumbLinkExampleComponent,
        };
    }
}
