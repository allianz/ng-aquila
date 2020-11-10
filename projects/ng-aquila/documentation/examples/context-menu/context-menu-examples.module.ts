import { NxBadgeModule } from '@aposin/ng-aquila/badge';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxTableModule } from '@aposin/ng-aquila/table';

import { NgModule } from '@angular/core';
import { ContextMenuBasicExampleComponent } from './context-menu-basic/context-menu-basic-example';
import { ContextMenuDataExampleComponent } from './context-menu-data/context-menu-data-example';
import { ContextMenuDisabledExampleComponent } from './context-menu-disabled/context-menu-disabled-example';
import { ContextMenuIconsExampleComponent } from './context-menu-icons/context-menu-icons-example';
import { ContextMenuLazyExampleComponent } from './context-menu-lazy/context-menu-lazy-example';
import { ContextMenuNestedExampleComponent } from './context-menu-nested/context-menu-nested-example';
import { ContextMenuProgrammaticExampleComponent } from './context-menu-programmatic/context-menu-programmatic-example';
import { ContextMenuScrollStrategyExampleComponent } from './context-menu-scroll-strategy/context-menu-scroll-strategy-example';
import { ExamplesSharedModule } from '../examples-shared.module';

const EXAMPLES = [
  ContextMenuBasicExampleComponent,
  ContextMenuDataExampleComponent,
  ContextMenuDisabledExampleComponent,
  ContextMenuIconsExampleComponent,
  ContextMenuLazyExampleComponent,
  ContextMenuNestedExampleComponent,
  ContextMenuProgrammaticExampleComponent,
  ContextMenuScrollStrategyExampleComponent
];

 @NgModule({
  imports: [
    NxContextMenuModule,
    NxIconModule,
    NxBadgeModule,
    NxTableModule,
    ExamplesSharedModule
  ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
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
      'context-menu-programmatic': ContextMenuProgrammaticExampleComponent,
      'context-menu-scroll-strategy': ContextMenuScrollStrategyExampleComponent,
    };
  }
}
