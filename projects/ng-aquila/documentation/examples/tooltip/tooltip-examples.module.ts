import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxDynamicTableModule } from '@aposin/ng-aquila/dynamic-table';
import { NxTooltipModule } from '@aposin/ng-aquila/tooltip';
import { TooltipBasicExampleComponent } from './tooltip-basic/tooltip-basic-example';
import { TooltipDelayExampleComponent } from './tooltip-delay/tooltip-delay-example';
import { TooltipDisabledExampleComponent } from './tooltip-disabled/tooltip-disabled-example';
import { TooltipFallbacksTableExampleComponent } from './tooltip-fallbacks-table/tooltip-fallbacks-table-example';
import { TooltipPositionsExampleComponent } from './tooltip-positions/tooltip-positions-example';
import { TooltipProgrammaticExampleComponent } from './tooltip-programmatic/tooltip-programmatic-example';
import { TooltipSettingsExampleComponent } from './tooltip-settings/tooltip-settings-example';

const EXAMPLES = [
    TooltipBasicExampleComponent,
    TooltipDelayExampleComponent,
    TooltipDisabledExampleComponent,
    TooltipFallbacksTableExampleComponent,
    TooltipPositionsExampleComponent,
    TooltipProgrammaticExampleComponent,
    TooltipSettingsExampleComponent,
];

@NgModule({
    imports: [
        NxTooltipModule,
        NxDynamicTableModule,
        CommonModule,
        NxButtonModule,
        NxBadgeModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class TooltipExamplesModule {
    static components() {
        return {
            'tooltip-basic': TooltipBasicExampleComponent,
            'tooltip-delay': TooltipDelayExampleComponent,
            'tooltip-disabled': TooltipDisabledExampleComponent,
            'tooltip-fallbacks-table': TooltipFallbacksTableExampleComponent,
            'tooltip-positions': TooltipPositionsExampleComponent,
            'tooltip-programmatic': TooltipProgrammaticExampleComponent,
            'tooltip-settings': TooltipSettingsExampleComponent,
        };
    }
}
