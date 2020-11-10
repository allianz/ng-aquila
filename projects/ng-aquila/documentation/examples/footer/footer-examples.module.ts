import { NxFooterModule } from '@aposin/ng-aquila/footer';

import { NgModule } from '@angular/core';
import { FooterExampleComponent } from './footer/footer-example';

const EXAMPLES = [
  FooterExampleComponent
];

 @NgModule({
  imports: [
    NxFooterModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class FooterExamplesModule {
  static components() {
    return {
      'footer': FooterExampleComponent,
    };
  }
}
