import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxContextMenuModule } from '@allianz/ng-aquila/context-menu';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxToolbarModule } from '@allianz/ng-aquila/toolbar';
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
            'toolbar-positioning-content':
                ToolbarPositioningContentExampleComponent,
        };
    }
}
