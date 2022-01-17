import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxBreadcrumbItemComponent } from './breadcrumb-item.component';
import { NxBreadcrumbComponent } from './breadcrumb.component';

@NgModule({
    declarations: [NxBreadcrumbItemComponent, NxBreadcrumbComponent],
    exports: [NxBreadcrumbItemComponent, NxBreadcrumbComponent],
    imports: [NxIconModule],
})
export class NxBreadcrumbModule {}
