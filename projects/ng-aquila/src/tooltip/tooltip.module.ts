import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxTooltipComponent } from './tooltip.component';
import { NxTooltipDirective } from './tooltip.directive';

@NgModule({
    imports: [A11yModule, CommonModule, OverlayModule, NxTooltipDirective, NxTooltipComponent],
    exports: [NxTooltipDirective, NxTooltipComponent],
    providers: [],
})
export class NxTooltipModule {}
