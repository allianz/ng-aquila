import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxErrorComponent } from './error.component';

@NgModule({
    imports: [CommonModule, NxIconModule, NxMessageModule],
    declarations: [NxErrorComponent],
    exports: [NxErrorComponent],
})
export class NxErrorModule {}
