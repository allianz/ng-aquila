import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxTagComponent } from './tag.component';
import { NxTaglistComponent } from './taglist.component';

@NgModule({
    exports: [NxTaglistComponent, NxTagComponent],
    imports: [CommonModule, NxIconModule, NxTaglistComponent, NxTagComponent],
})
export class NxTaglistModule {}
