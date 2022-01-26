import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxLinkModule } from '@aposin/ng-aquila/link';

import { NxvTopInfoComponent } from './top-info.component';

@NgModule({
    imports: [CommonModule, NxLinkModule],
    declarations: [NxvTopInfoComponent],
    exports: [NxvTopInfoComponent],
})
export class NxvTopInfoModule {}
