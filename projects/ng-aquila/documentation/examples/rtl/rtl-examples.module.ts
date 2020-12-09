import { NgModule } from '@angular/core';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';
import { NxSliderModule } from '@aposin/ng-aquila/slider';
import { RTLBasicExampleComponent } from './rtl-basic/rtl-basic-example';
import { RTLDynamicExampleComponent } from './rtl-dynamic/rtl-dynamic-example';
import { CommonModule } from '@angular/common';
import { BidiModule } from '@angular/cdk/bidi';

const EXAMPLES = [
  RTLBasicExampleComponent,
  RTLDynamicExampleComponent,
];

 @NgModule({
  imports: [
    BidiModule,
    CommonModule,
    NxHeadlineModule,
    NxButtonModule,
    NxCopytextModule,
    NxSliderModule,
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class RTLExamplesModule {
  static components() {
    return {
      'rtl-basic': RTLBasicExampleComponent,
      'rtl-dynamic': RTLDynamicExampleComponent,
    };
  }
}
