import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxProgressbarComponent } from './progressbar.component';

@NgModule({
    imports: [CommonModule, NxProgressbarComponent],
    exports: [NxProgressbarComponent],
    providers: [],
})
export class NxProgressbarModule {}
