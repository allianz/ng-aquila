import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxContextMenuModule } from '@allianz/ng-aquila/context-menu';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxToolbarModule } from '@allianz/ng-aquila/toolbar';
import { NgModule } from '@angular/core';

import { ToolbarExampleComponent } from './toolbar/toolbar-example';
import { ToolbarDividerExampleComponent } from './toolbar-divider/toolbar-divider-example';
import { ToolbarDividerA1ExampleComponent } from './toolbar-divider-a1/toolbar-divider-a1-example';
import { ToolbarPositioningContentExampleComponent } from './toolbar-positioning-content/toolbar-positioning-content-example';
import { ToolbarPositioningContentA1ExampleComponent } from './toolbar-positioning-content-a1/toolbar-positioning-content-a1-example';

const EXAMPLES = [
  ToolbarExampleComponent,
  ToolbarPositioningContentExampleComponent,
  ToolbarPositioningContentA1ExampleComponent,
  ToolbarDividerExampleComponent,
  ToolbarDividerA1ExampleComponent,
];

@NgModule({
  imports: [
    NxToolbarModule,
    NxContextMenuModule,
    NxIconModule,
    NxButtonModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class ToolbarExamplesModule {
  static components() {
    return {
      toolbar: ToolbarExampleComponent,
      'toolbar-positioning-content': ToolbarPositioningContentExampleComponent,
      'toolbar-positioning-content-a1':
        ToolbarPositioningContentA1ExampleComponent,
      'toolbar-divider': ToolbarDividerExampleComponent,
      'toolbar-divider-a1': ToolbarDividerA1ExampleComponent,
    };
  }
}
