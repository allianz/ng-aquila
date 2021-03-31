import { RouterModule } from '@angular/router';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxCardModule } from '@aposin/ng-aquila/card';

import { NgModule } from '@angular/core';
import { CardExampleComponent } from './card/card-example';
import { CardFooterExampleComponent } from './card-footer/card-footer-example';
import { SelectableCardBasicExampleComponent } from './selectable-card-basic/selectable-card-basic-example';
import { SelectableCardDynamicExampleComponent } from './selectable-card-dynamic/selectable-card-dynamic-example';
import { SelectableCardReactiveExampleComponent } from './selectable-card-reactive/selectable-card-reactive-example';
import { SelectableCardStatesExampleComponent } from './selectable-card-states/selectable-card-states-example';
import { ExamplesSharedModule } from '../examples-shared.module';

const EXAMPLES = [
  CardExampleComponent,
  CardFooterExampleComponent,
  SelectableCardBasicExampleComponent,
  SelectableCardDynamicExampleComponent,
  SelectableCardReactiveExampleComponent,
  SelectableCardStatesExampleComponent
];

 @NgModule({
  imports: [
    NxCardModule,
    NxIconModule,
    NxLinkModule,
    ExamplesSharedModule,
    RouterModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class CardExamplesModule {
  static components() {
    return {
      'card': CardExampleComponent,
      'card-footer': CardFooterExampleComponent,
      'selectable-card-basic': SelectableCardBasicExampleComponent,
      'selectable-card-dynamic': SelectableCardDynamicExampleComponent,
      'selectable-card-reactive': SelectableCardReactiveExampleComponent,
      'selectable-card-states': SelectableCardStatesExampleComponent,
    };
  }
}
