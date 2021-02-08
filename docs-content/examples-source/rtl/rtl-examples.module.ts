import { NgModule } from '@angular/core';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';
import { NxSliderModule } from '@aposin/ng-aquila/slider';
import { RtlBasicExampleComponent } from './rtl-basic/rtl-basic-example';
import { RtlDynamicExampleComponent } from './rtl-dynamic/rtl-dynamic-example';
import { CommonModule } from '@angular/common';
import { BidiModule } from '@angular/cdk/bidi';

const EXAMPLES = [
  RtlBasicExampleComponent,
  RtlDynamicExampleComponent,
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
export class RtlExamplesModule {
  static components() {
    return {
      'rtl-basic': RtlBasicExampleComponent,
      'rtl-dynamic': RtlDynamicExampleComponent,
    };
  }
}
