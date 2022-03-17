import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxTooltipComponent } from './tooltip.component';
import { NX_TOOLTIP_SCROLL_STRATEGY_PROVIDER, NxTooltipDirective } from './tooltip.directive';

@NgModule({
    imports: [A11yModule, CommonModule, OverlayModule],
    exports: [NxTooltipDirective, NxTooltipComponent],
    declarations: [NxTooltipDirective, NxTooltipComponent],
    providers: [NX_TOOLTIP_SCROLL_STRATEGY_PROVIDER],
})
export class NxTooltipModule {}
