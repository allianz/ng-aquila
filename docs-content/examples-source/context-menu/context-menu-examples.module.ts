import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { NxCardModule } from '@aposin/ng-aquila/card';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxIndicatorModule } from '@aposin/ng-aquila/indicator';
import { NxTableModule } from '@aposin/ng-aquila/table';

import { ExamplesSharedModule } from '../examples-shared.module';
import { ContextMenuBasicExampleComponent } from './context-menu-basic/context-menu-basic-example';
import { ContextMenuCursorModeExampleComponent } from './context-menu-cursor-mode/context-menu-cursor-mode-example';
import { ContextMenuDataExampleComponent } from './context-menu-data/context-menu-data-example';
import { ContextMenuDisabledExampleComponent } from './context-menu-disabled/context-menu-disabled-example';
import { ContextMenuIconsExampleComponent } from './context-menu-icons/context-menu-icons-example';
import { ContextMenuIndicatorExampleComponent } from './context-menu-indicator/context-menu-indicator-example';
import { ContextMenuLazyExampleComponent } from './context-menu-lazy/context-menu-lazy-example';
import { ContextMenuNestedExampleComponent } from './context-menu-nested/context-menu-nested-example';
import { ContextMenuProgrammaticExampleComponent } from './context-menu-programmatic/context-menu-programmatic-example';
import { ContextMenuScrollStrategyExampleComponent } from './context-menu-scroll-strategy/context-menu-scroll-strategy-example';
import { ContextMenuScrollStrategyProviderExampleComponent } from './context-menu-scroll-strategy-provider/context-menu-scroll-strategy-provider-example';
import { ContextMenuSelectMultipleExampleComponent } from './context-menu-select-multiple/context-menu-select-multiple-example';
import { ContextMenuSelectionExampleComponent } from './context-menu-selection/context-menu-selection-example';

const EXAMPLES = [
    ContextMenuBasicExampleComponent,
    ContextMenuDataExampleComponent,
    ContextMenuDisabledExampleComponent,
    ContextMenuIconsExampleComponent,
    ContextMenuLazyExampleComponent,
    ContextMenuNestedExampleComponent,
    ContextMenuProgrammaticExampleComponent,
    ContextMenuScrollStrategyExampleComponent,
    ContextMenuIndicatorExampleComponent,
    ContextMenuCursorModeExampleComponent,
    ContextMenuScrollStrategyProviderExampleComponent,
    ContextMenuSelectionExampleComponent,
    ContextMenuSelectMultipleExampleComponent,
];

@NgModule({
    imports: [
        NxContextMenuModule,
        NxIconModule,
        NxBadgeModule,
        NxIndicatorModule,
        NxTableModule,
        NxCardModule,
        ExamplesSharedModule,
        DragDropModule,
        NxCheckboxModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ContextExamplesModule {
    static components() {
        return {
            'context-menu-basic': ContextMenuBasicExampleComponent,
            'context-menu-data': ContextMenuDataExampleComponent,
            'context-menu-disabled': ContextMenuDisabledExampleComponent,
            'context-menu-icons': ContextMenuIconsExampleComponent,
            'context-menu-lazy': ContextMenuLazyExampleComponent,
            'context-menu-nested': ContextMenuNestedExampleComponent,
            'context-menu-programmatic':
                ContextMenuProgrammaticExampleComponent,
            'context-menu-scroll-strategy':
                ContextMenuScrollStrategyExampleComponent,
            'context-menu-scroll-strategy-provider':
                ContextMenuScrollStrategyProviderExampleComponent,
            'context-menu-indicator': ContextMenuIndicatorExampleComponent,
            'context-menu-cursor-mode': ContextMenuCursorModeExampleComponent,
            'context-menu-selection': ContextMenuSelectionExampleComponent,
            'context-menu-select-multiple':
                ContextMenuSelectMultipleExampleComponent,
        };
    }
}
