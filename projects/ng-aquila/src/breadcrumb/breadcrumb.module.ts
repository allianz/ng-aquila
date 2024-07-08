import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxBreadcrumbComponent } from './breadcrumb.component';
import { NxBreadcrumbItemComponent } from './breadcrumb-item.component';

@NgModule({
    exports: [NxBreadcrumbItemComponent, NxBreadcrumbComponent],
    imports: [NxIconModule, NxBreadcrumbItemComponent, NxBreadcrumbComponent],
})
export class NxBreadcrumbModule {}
