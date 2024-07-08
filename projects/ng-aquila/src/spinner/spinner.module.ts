import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSpinnerComponent } from './spinner.component';

@NgModule({
    imports: [CommonModule, NxSpinnerComponent],
    exports: [NxSpinnerComponent],
    bootstrap: [],
    providers: [],
})
export class NxSpinnerModule {}
