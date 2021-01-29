
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSmallStageComponent } from './small-stage.component';
import { NxSmallStageStartImageDirective } from './directives/start-image.directive';
import { NxSmallStageEndImageDirective } from './directives/end-image.directive';
import { NxSmallStageNarrowScreenImageDirective } from './directives/narrow-screen-image.directive';
import { NxSmallStageContentDirective } from './directives/content.directive';
import { NxSmallStageHeaderDirective } from './directives/header.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NxSmallStageStartImageDirective,
    NxSmallStageEndImageDirective,
    NxSmallStageNarrowScreenImageDirective,
    NxSmallStageContentDirective,
    NxSmallStageHeaderDirective,
    NxSmallStageComponent,
  ],
  declarations: [
    NxSmallStageStartImageDirective,
    NxSmallStageEndImageDirective,
    NxSmallStageNarrowScreenImageDirective,
    NxSmallStageContentDirective,
    NxSmallStageHeaderDirective,
    NxSmallStageComponent,
  ],
  providers: [],
})
export class NxSmallStageModule {}
