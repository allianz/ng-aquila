import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxToolbarModule } from '@aposin/ng-aquila/toolbar';

import { NgModule } from '@angular/core';
import { ToolbarExampleComponent } from './toolbar/toolbar-example';
import { ToolbarPositioningContentExampleComponent } from './toolbar-positioning-content/toolbar-positioning-content-example';

const EXAMPLES = [
    ToolbarExampleComponent,
    ToolbarPositioningContentExampleComponent,
];

@NgModule({
    imports: [
        NxToolbarModule,
        NxContextMenuModule,
        NxIconModule,
        NxButtonModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ToolbarExamplesModule {
    static components() {
        return {
            toolbar: ToolbarExampleComponent,
            'toolbar-positioning-content': ToolbarPositioningContentExampleComponent,
        };
    }
}
