import { NxPaginationModule } from '@aposin/ng-aquila/pagination';

import { NgModule } from '@angular/core';
import { PaginationAdvancedExampleComponent } from './pagination-advanced/pagination-advanced-example';
import { PaginationLocalizeExampleComponent } from './pagination-localize/pagination-localize-example';
import { PaginationLocalizeAdvancedExampleComponent } from './pagination-localize-advanced/pagination-localize-advanced-example';
import { PaginationSimpleExampleComponent } from './pagination-simple/pagination-simple-example';

const EXAMPLES = [
  PaginationAdvancedExampleComponent,
  PaginationLocalizeExampleComponent,
  PaginationLocalizeAdvancedExampleComponent,
  PaginationSimpleExampleComponent
];

 @NgModule({
  imports: [NxPaginationModule],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class PaginationExamplesModule {
  static components() {
    return {
      'pagination-advanced': PaginationAdvancedExampleComponent,
      'pagination-localize': PaginationLocalizeExampleComponent,
      'pagination-localize-advanced': PaginationLocalizeAdvancedExampleComponent,
      'pagination-simple': PaginationSimpleExampleComponent,
    };
  }
}
