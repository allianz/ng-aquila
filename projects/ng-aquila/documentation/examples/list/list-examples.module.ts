import { NgModule } from '@angular/core';

import { ListCirclesExampleComponent } from './list-circles/list-circles-example';
import { ListCondensedExampleComponent } from './list-condensed/list-condensed-example';
import { ListCopytextExampleComponent } from './list-copytext/list-copytext-example';
import { ListCustomColorExampleComponent } from './list-custom-color/list-custom-color-example';
import { ListIconsExampleComponent } from './list-icons/list-icons-example';
import { ListInverseExampleComponent } from './list-inverse/list-inverse-example';
import { ListNestingExampleComponent } from './list-nesting/list-nesting-example';
import { ListOrderedExampleComponent } from './list-ordered/list-ordered-example';
import { ListSizesExampleComponent } from './list-sizes/list-sizes-example';
import { ListTypeExampleComponent } from './list-type/list-type-example';
import { ListUnorderedExampleComponent } from './list-unordered/list-unordered-example';

const EXAMPLES = [
  ListCirclesExampleComponent,
  ListTypeExampleComponent,
  ListCopytextExampleComponent,
  ListCustomColorExampleComponent,
  ListIconsExampleComponent,
  ListInverseExampleComponent,
  ListNestingExampleComponent,
  ListOrderedExampleComponent,
  ListUnorderedExampleComponent,
  ListCondensedExampleComponent,
  ListSizesExampleComponent,
];

@NgModule({
  imports: [EXAMPLES],
  exports: [EXAMPLES],
})
export class ListExamplesModule {
  static components() {
    return {
      'list-circles': ListCirclesExampleComponent,
      'list-type': ListTypeExampleComponent,
      'list-copytext': ListCopytextExampleComponent,
      'list-custom-color': ListCustomColorExampleComponent,
      'list-icons': ListIconsExampleComponent,
      'list-inverse': ListInverseExampleComponent,
      'list-nesting': ListNestingExampleComponent,
      'list-ordered': ListOrderedExampleComponent,
      'list-unordered': ListUnorderedExampleComponent,
      'list-condensed': ListCondensedExampleComponent,
      'list-sizes': ListSizesExampleComponent,
    };
  }
}
