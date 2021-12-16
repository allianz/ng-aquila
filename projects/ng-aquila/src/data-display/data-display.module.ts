import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxDataDisplayComponent, NxDataDisplayLabelComponent } from './data-display.component';

@NgModule({
    imports: [CommonModule],
    declarations: [NxDataDisplayComponent, NxDataDisplayLabelComponent],
    exports: [NxDataDisplayComponent, NxDataDisplayLabelComponent],
})
export class NxDataDisplayModule {}
