import { NxIconComponent, NxIconModule } from '@allianz/ng-aquila/icon';
import { NgModule } from '@angular/core';

import { NxListComponent } from './list.component';
import { NxListIconComponent } from './list-icon.component';

@NgModule({
    declarations: [NxListComponent, NxListIconComponent],
    imports: [NxIconModule],
    exports: [NxListComponent, NxListIconComponent],
    bootstrap: [NxIconComponent],
})
export class NxListModule {}
