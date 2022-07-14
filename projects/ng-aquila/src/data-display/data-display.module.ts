import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxDataDisplayComponent } from './data-display/data-display.component';
import { NxDataDisplayLabelComponent } from './data-display-label/data-display-label.component';

@NgModule({
    imports: [CommonModule],
    declarations: [NxDataDisplayComponent, NxDataDisplayLabelComponent],
    exports: [NxDataDisplayComponent, NxDataDisplayLabelComponent],
})
export class NxDataDisplayModule {}
