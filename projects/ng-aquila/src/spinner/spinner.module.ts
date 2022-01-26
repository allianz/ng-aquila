import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSpinnerComponent } from './spinner.component';

@NgModule({
    declarations: [NxSpinnerComponent],
    imports: [CommonModule],
    exports: [NxSpinnerComponent],
    bootstrap: [],
    providers: [],
})
export class NxSpinnerModule {}
