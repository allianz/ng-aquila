import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxListComponent } from './list.component';
import { NxListIconComponent } from './list-icon.component';

@NgModule({
    imports: [NxIconModule, NxListComponent, NxListIconComponent],
    exports: [NxListComponent, NxListIconComponent],
})
export class NxListModule {}
