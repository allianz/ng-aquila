import { NgModule } from '@angular/core';

import { NxToolbarDividerComponent } from './divider/toolbar-divider.component';
import { NxToolbarComponent } from './toolbar.component';

@NgModule({
    declarations: [NxToolbarComponent, NxToolbarDividerComponent],
    exports: [NxToolbarComponent, NxToolbarDividerComponent],
})
export class NxToolbarModule {}
