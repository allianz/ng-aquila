import { NgModule } from '@angular/core';
import { NxListComponent } from './list.component';
import { NxListIconComponent } from './list-icon.component';
import { NxIconModule, NxIconComponent } from '@aposin/ng-aquila/icon';

@NgModule({
    declarations: [NxListComponent, NxListIconComponent],
    imports: [NxIconModule],
    exports: [NxListComponent, NxListIconComponent],
    bootstrap: [NxIconComponent],
})
export class NxListModule {}
