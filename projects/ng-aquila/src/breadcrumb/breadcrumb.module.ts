import { NgModule } from '@angular/core';
import { NxBreadcrumbItemComponent } from './breadcrumb-item.component';
import { NxBreadcrumbComponent } from './breadcrumb.component';
import { NxIconModule } from '@aposin/ng-aquila/icon';

@NgModule({
    declarations: [NxBreadcrumbItemComponent, NxBreadcrumbComponent],
    exports: [NxBreadcrumbItemComponent, NxBreadcrumbComponent],
    imports: [NxIconModule],
})
export class NxBreadcrumbModule {}
