import { NgModule } from '@angular/core';
import {
  NxDataDisplayComponent,
  NxDataDisplayLabelComponent,
  NxDataDisplayValueComponent
} from './data-display.component';

@NgModule({
  declarations: [
    NxDataDisplayComponent,
    NxDataDisplayLabelComponent,
    NxDataDisplayValueComponent
  ],
  exports: [
    NxDataDisplayComponent,
    NxDataDisplayLabelComponent,
    NxDataDisplayValueComponent
  ]
})
export class NxDataDisplayModule {}
