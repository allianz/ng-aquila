import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxColComponent } from './col.component';
import { NxLayoutComponent } from './layout.component';
import { NxRowComponent } from './row.component';

@NgModule({
    declarations: [NxLayoutComponent, NxRowComponent, NxColComponent],
    exports: [NxLayoutComponent, NxRowComponent, NxColComponent],
    imports: [CommonModule],
})
export class NxGridModule {}
