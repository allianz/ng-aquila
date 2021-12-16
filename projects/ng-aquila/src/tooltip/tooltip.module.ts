import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxTooltipComponent } from './tooltip.component';
import { NxTooltipDirective } from './tooltip.directive';

@NgModule({
    imports: [A11yModule, CommonModule, OverlayModule],
    exports: [NxTooltipDirective, NxTooltipComponent],
    declarations: [NxTooltipDirective, NxTooltipComponent],
    entryComponents: [NxTooltipComponent],
})
export class NxTooltipModule {}
