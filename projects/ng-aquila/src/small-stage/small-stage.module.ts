import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSmallStageImageBottomDirective } from './directives/bottom-image.directive';
import { NxSmallStageImageEndDirective } from './directives/end-image.directive';
import { NxSmallStageHeaderDirective } from './directives/header.directive';
import { NxSmallStageImageDirective } from './directives/image.directive';
import { NxSmallStageImageStartDirective } from './directives/start-image.directive';
import { NxSmallStageComponent } from './small-stage.component';

@NgModule({
    imports: [
        CommonModule,
        NxSmallStageImageDirective,
        NxSmallStageImageStartDirective,
        NxSmallStageImageEndDirective,
        NxSmallStageHeaderDirective,
        NxSmallStageComponent,
        NxSmallStageImageBottomDirective,
    ],
    exports: [
        NxSmallStageImageDirective,
        NxSmallStageImageStartDirective,
        NxSmallStageImageEndDirective,
        NxSmallStageHeaderDirective,
        NxSmallStageComponent,
        NxSmallStageImageBottomDirective,
    ],
    providers: [],
})
export class NxSmallStageModule {}
