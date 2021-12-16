import { NxNumberStepperIntl } from './number-stepper-intl';
import { NxAutoResizeDirective } from './auto-resize.directive';
import { CommonModule } from '@angular/common';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NgModule } from '@angular/core';

import { NxNumberStepperComponent } from './number-stepper.component';
import { FormsModule } from '@angular/forms';
import { NxNumberStepperPrefixDirective } from './number-stepper-prefix.directive';
import { NxNumberStepperSuffixDirective } from './number-stepper-suffix.directive';

@NgModule({
    imports: [NxInputModule, FormsModule, NxIconModule, NxButtonModule, CommonModule],
    exports: [NxNumberStepperComponent, NxAutoResizeDirective, NxNumberStepperPrefixDirective, NxNumberStepperSuffixDirective],
    declarations: [NxNumberStepperComponent, NxAutoResizeDirective, NxNumberStepperPrefixDirective, NxNumberStepperSuffixDirective],
    providers: [NxNumberStepperIntl],
})
export class NxNumberStepperModule {}
