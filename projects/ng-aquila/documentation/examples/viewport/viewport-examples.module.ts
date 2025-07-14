import { NxActionModule } from '@allianz/ng-aquila/action';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxSidebarModule } from '@allianz/ng-aquila/sidebar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ViewportChangeExampleComponent } from './viewport-change/viewport-change-example';

const EXAMPLES = [ViewportChangeExampleComponent];

@NgModule({
  imports: [
    NxSidebarModule,
    NxIconModule,
    RouterModule,
    CommonModule,
    NxActionModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class ViewportExamplesModule {
  static components() {
    return {
      'viewport-change': ViewportChangeExampleComponent,
    };
  }
}
