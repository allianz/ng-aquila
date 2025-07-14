import { NxSwitcherModule } from '@allianz/ng-aquila/switcher';
import { NgModule } from '@angular/core';

import { ExamplesSharedModule } from '../examples-shared.module';
import { SwitcherDefaultExampleComponent } from './switcher-default/switcher-default-example';
import { SwitcherDisabledExampleComponent } from './switcher-disabled/switcher-disabled-example';
import { SwitcherLabelLeftExampleComponent } from './switcher-label-left/switcher-label-left-example';
import { SwitcherLabelSmallExampleComponent } from './switcher-label-small/switcher-label-small-example';
import { SwitcherLargeExampleComponent } from './switcher-large/switcher-large-example';
import { SwitcherNegativeExampleComponent } from './switcher-negative/switcher-negative-example';
import { SwitcherReactiveFormExampleComponent } from './switcher-reactive-form/switcher-reactive-form-example';
import { SwitcherReadonlyExampleComponent } from './switcher-readonly/switcher-readonly-example';
import { SwitcherTemplateDrivenExampleComponent } from './switcher-template-driven/switcher-template-driven-example';

const EXAMPLES = [
  SwitcherReadonlyExampleComponent,
  SwitcherDefaultExampleComponent,
  SwitcherDisabledExampleComponent,
  SwitcherLabelLeftExampleComponent,
  SwitcherLabelSmallExampleComponent,
  SwitcherLargeExampleComponent,
  SwitcherNegativeExampleComponent,
  SwitcherReactiveFormExampleComponent,
  SwitcherTemplateDrivenExampleComponent,
];

@NgModule({
  imports: [NxSwitcherModule, ExamplesSharedModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class SwitcherExamplesModule {
  static components() {
    return {
      'switcher-readonly': SwitcherReadonlyExampleComponent,
      'switcher-default': SwitcherDefaultExampleComponent,
      'switcher-disabled': SwitcherDisabledExampleComponent,
      'switcher-label-left': SwitcherLabelLeftExampleComponent,
      'switcher-label-small': SwitcherLabelSmallExampleComponent,
      'switcher-large': SwitcherLargeExampleComponent,
      'switcher-negative': SwitcherNegativeExampleComponent,
      'switcher-reactive-form': SwitcherReactiveFormExampleComponent,
      'switcher-template-driven': SwitcherTemplateDrivenExampleComponent,
    };
  }
}
