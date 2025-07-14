import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NxAutoResizeDirective } from './auto-resize.directive';
import { NxNumberStepperComponent } from './number-stepper.component';
import { NxNumberStepperIntl } from './number-stepper-intl';
import { NxNumberStepperPrefixDirective } from './number-stepper-prefix.directive';
import { NxNumberStepperSuffixDirective } from './number-stepper-suffix.directive';

/** @docs-private */
export function NX_NUMBER_STEPPER_INTL_PROVIDER_FACTORY(parentIntl: NxNumberStepperIntl) {
  return parentIntl || new NxNumberStepperIntl();
}

/** @docs-private */
export const NX_NUMBER_STEPPER_INTL_PROVIDER = {
  provide: NxNumberStepperIntl,
  deps: [[new Optional(), new SkipSelf(), NxNumberStepperIntl]],
  useFactory: NX_NUMBER_STEPPER_INTL_PROVIDER_FACTORY,
};

@NgModule({
  imports: [
    NxInputModule,
    FormsModule,
    NxIconModule,
    NxButtonModule,
    CommonModule,
    NxNumberStepperComponent,
    NxAutoResizeDirective,
    NxNumberStepperPrefixDirective,
    NxNumberStepperSuffixDirective,
  ],
  exports: [
    NxNumberStepperComponent,
    NxAutoResizeDirective,
    NxNumberStepperPrefixDirective,
    NxNumberStepperSuffixDirective,
  ],
  providers: [],
})
export class NxNumberStepperModule {}
