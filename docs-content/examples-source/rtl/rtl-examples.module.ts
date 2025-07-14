import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxSliderModule } from '@allianz/ng-aquila/slider';
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RtlBasicExampleComponent } from './rtl-basic/rtl-basic-example';
import { RtlDynamicExampleComponent } from './rtl-dynamic/rtl-dynamic-example';

const EXAMPLES = [RtlBasicExampleComponent, RtlDynamicExampleComponent];

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    NxHeadlineModule,
    NxButtonModule,
    NxCopytextModule,
    NxSliderModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class RtlExamplesModule {
  static components() {
    return {
      'rtl-basic': RtlBasicExampleComponent,
      'rtl-dynamic': RtlDynamicExampleComponent,
    };
  }
}
