import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxVideoComponent } from './video.component';

@NgModule({
    declarations: [NxVideoComponent],
    exports: [NxVideoComponent],
    imports: [CommonModule, NxIconModule],
})
export class NxVideoModule {}
