import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxBreadcrumbComponent } from './breadcrumb.component';
import { NxBreadcrumbItemComponent } from './breadcrumb-item.component';

@NgModule({
    declarations: [NxBreadcrumbItemComponent, NxBreadcrumbComponent],
    exports: [NxBreadcrumbItemComponent, NxBreadcrumbComponent],
    imports: [NxIconModule],
})
export class NxBreadcrumbModule {}
