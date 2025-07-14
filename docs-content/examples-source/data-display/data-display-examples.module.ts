import { NxDataDisplayModule } from '@allianz/ng-aquila/data-display';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxListModule } from '@allianz/ng-aquila/list';
import { NgModule } from '@angular/core';

import { ExamplesSharedModule } from '../examples-shared.module';
import { DataDisplayCondensedExampleComponent } from './data-display-condensed/data-display-condensed-example';
import { DataDisplayHorizontalExampleComponent } from './data-display-horizontal/data-display-horizontal-example';
import { DataDisplayResponsiveExampleComponent } from './data-display-responsive/data-display-responsive-example';
import { DataDisplayStandardExampleComponent } from './data-display-standard/data-display-standard-example';

const EXAMPLES = [
  DataDisplayStandardExampleComponent,
  DataDisplayCondensedExampleComponent,
  DataDisplayHorizontalExampleComponent,
  DataDisplayResponsiveExampleComponent,
];

@NgModule({
  imports: [
    NxDataDisplayModule,
    NxLinkModule,
    NxListModule,
    ExamplesSharedModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class DataDisplayExamplesModule {
  static components() {
    return {
      'data-display-standard': DataDisplayStandardExampleComponent,
      'data-display-condensed': DataDisplayCondensedExampleComponent,
      'data-display-horizontal': DataDisplayHorizontalExampleComponent,
      'data-display-responsive': DataDisplayResponsiveExampleComponent,
    };
  }
}
