import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxVideoComponent } from './video.component';

@NgModule({
    exports: [NxVideoComponent],
    imports: [CommonModule, NxIconModule, NxVideoComponent],
})
export class NxVideoModule {}
