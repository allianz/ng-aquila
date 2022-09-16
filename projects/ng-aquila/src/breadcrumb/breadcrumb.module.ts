import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NgModule } from '@angular/core';

import { NxBreadcrumbComponent } from './breadcrumb.component';
import { NxBreadcrumbItemComponent } from './breadcrumb-item.component';

@NgModule({
    declarations: [NxBreadcrumbItemComponent, NxBreadcrumbComponent],
    exports: [NxBreadcrumbItemComponent, NxBreadcrumbComponent],
    imports: [NxIconModule],
})
export class NxBreadcrumbModule {}
