import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NgModule } from '@angular/core';

import { NxBreadcrumbComponent } from './breadcrumb.component';
import { NxBreadcrumbItemComponent } from './breadcrumb-item.component';

@NgModule({
  exports: [NxBreadcrumbItemComponent, NxBreadcrumbComponent],
  imports: [NxIconModule, NxBreadcrumbItemComponent, NxBreadcrumbComponent],
})
export class NxBreadcrumbModule {}
