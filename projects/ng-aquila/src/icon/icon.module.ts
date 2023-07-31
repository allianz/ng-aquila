import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxIconComponent } from './icon.component';
import { NxStatusIconComponent } from './status-icon/status-icon.component';

@NgModule({
    imports: [CommonModule],
    declarations: [NxIconComponent, NxStatusIconComponent],
    exports: [NxIconComponent, NxStatusIconComponent],
})
export class NxIconModule {}
