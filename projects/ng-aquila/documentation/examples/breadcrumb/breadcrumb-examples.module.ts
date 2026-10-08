import { NxBreadcrumbModule } from '@allianz/ng-aquila/breadcrumb';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbExampleComponent } from './breadcrumb/breadcrumb-example';
import { BreadcrumbContextMenuExampleComponent } from './breadcrumb-context-menu/breadcrumb-context-menu-example';
import { BreadcrumbLinkExampleComponent } from './breadcrumb-link/breadcrumb-link-example';
import { BreadcrumbNegativeExampleComponent } from './breadcrumb-negative/breadcrumb-negative-example';
import { BreadcrumbResponsiveExampleComponent } from './breadcrumb-responsive/breadcrumb-responsive-example';
import { BreadcrumbTypeExampleComponent } from './breadcrumb-type/breadcrumb-type-example';

const EXAMPLES = [
  BreadcrumbExampleComponent,
  BreadcrumbNegativeExampleComponent,
  BreadcrumbLinkExampleComponent,
  BreadcrumbTypeExampleComponent,
  BreadcrumbContextMenuExampleComponent,
  BreadcrumbResponsiveExampleComponent,
];

@NgModule({
  imports: [NxBreadcrumbModule, CommonModule, RouterModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class BreadcrumbExamplesModule {
  static components() {
    return {
      breadcrumb: BreadcrumbExampleComponent,
      'breadcrumb-negative': BreadcrumbNegativeExampleComponent,
      'breadcrumb-link': BreadcrumbLinkExampleComponent,
      'breadcrumb-type': BreadcrumbTypeExampleComponent,
      'breadcrumb-context-menu': BreadcrumbContextMenuExampleComponent,
      'breadcrumb-responsive': BreadcrumbResponsiveExampleComponent,
    };
  }
}
