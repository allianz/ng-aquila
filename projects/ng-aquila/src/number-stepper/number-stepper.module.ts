import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NxAutoResizeDirective } from './auto-resize.directive';
import { NxNumberStepperComponent } from './number-stepper.component';
import { NxNumberStepperIntl } from './number-stepper-intl';
import { NxNumberStepperPrefixDirective } from './number-stepper-prefix.directive';
import { NxNumberStepperSuffixDirective } from './number-stepper-suffix.directive';

@NgModule({
    imports: [NxInputModule, FormsModule, NxIconModule, NxButtonModule, CommonModule],
    exports: [NxNumberStepperComponent, NxAutoResizeDirective, NxNumberStepperPrefixDirective, NxNumberStepperSuffixDirective],
    declarations: [NxNumberStepperComponent, NxAutoResizeDirective, NxNumberStepperPrefixDirective, NxNumberStepperSuffixDirective],
    providers: [NxNumberStepperIntl],
})
export class NxNumberStepperModule {}
