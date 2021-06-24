
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSmallStageComponent } from './small-stage.component';
import { NxSmallStageImageStartDirective } from './directives/start-image.directive';
import { NxSmallStageImageEndDirective } from './directives/end-image.directive';
import { NxSmallStageHeaderDirective } from './directives/header.directive';
import { NxSmallStageImageBottomDirective } from './directives/bottom-image.directive';
import { NxSmallStageImageDirective } from './directives/image.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NxSmallStageImageDirective,
    NxSmallStageImageStartDirective,
    NxSmallStageImageEndDirective,
    NxSmallStageHeaderDirective,
    NxSmallStageComponent,
    NxSmallStageImageBottomDirective
  ],
  declarations: [
    NxSmallStageImageDirective,
    NxSmallStageImageStartDirective,
    NxSmallStageImageEndDirective,
    NxSmallStageHeaderDirective,
    NxSmallStageComponent,
    NxSmallStageImageBottomDirective
  ],
  providers: [],
})
export class NxSmallStageModule {}
