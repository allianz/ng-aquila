import {NgModule} from '@angular/core';
import {NxDataDisplayModule} from '@aposin/ng-aquila/data-display';
import {NxGridModule} from '@aposin/ng-aquila/grid';
import {NxLinkModule} from '@aposin/ng-aquila/link';
import {DataDisplayColsExampleComponent} from './data-display-cols/data-display-cols-example';
import { DataDisplayCustomLabelExampleComponent } from './data-display-custom-label/data-display-custom-label-example';
import {DataDisplayExpertExampleComponent} from './data-display-expert/data-display-expert-example';
import {DataDisplayHorizontalExampleComponent} from './data-display-horizontal/data-display-horizontal-example';
import {DataDisplayExampleComponent} from './data-display/data-display-example';

const EXAMPLES = [
  DataDisplayExampleComponent,
  DataDisplayCustomLabelExampleComponent,
  DataDisplayColsExampleComponent,
  DataDisplayHorizontalExampleComponent,
  DataDisplayExpertExampleComponent
];

@NgModule({
  imports: [
    NxDataDisplayModule,
    NxGridModule,
    NxLinkModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class BadgeExamplesModule {
  static components() {
    return {
      'data-display': DataDisplayExampleComponent,
      'data-display-custom-label': DataDisplayCustomLabelExampleComponent,
      'data-display-cols': DataDisplayColsExampleComponent,
      'data-display-horizontal': DataDisplayHorizontalExampleComponent,
      'data-display-expert': DataDisplayExpertExampleComponent
    };
  }
}
