import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxTagComponent } from './tag.component';
import { NxTaglistComponent } from './taglist.component';

@NgModule({
    declarations: [NxTaglistComponent, NxTagComponent],
    exports: [NxTaglistComponent, NxTagComponent],
    imports: [CommonModule, NxIconModule],
})
export class NxTaglistModule {}
