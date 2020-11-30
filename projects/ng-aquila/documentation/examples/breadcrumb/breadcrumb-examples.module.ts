import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NxBreadcrumbModule } from '@aposin/ng-aquila/breadcrumb';

import { NgModule } from '@angular/core';
import { BreadcrumbExampleComponent } from './breadcrumb/breadcrumb-example';
import { BreadcrumbNegativeExampleComponent } from './breadcrumb-negative/breadcrumb-negative-example';

const EXAMPLES = [
  BreadcrumbExampleComponent,
  BreadcrumbNegativeExampleComponent
];

 @NgModule({
  imports: [
    NxBreadcrumbModule,
    CommonModule,
    RouterModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class BreadcrumbExamplesModule {
  static components() {
    return {
      'breadcrumb': BreadcrumbExampleComponent,
      'breadcrumb-negative': BreadcrumbNegativeExampleComponent,
    };
  }
}
