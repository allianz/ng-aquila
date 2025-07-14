import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NxRadioToggleComponent } from './radio-toggle.component';
import { NxRadioToggleButtonComponent } from './radio-toggle-button.component';

@NgModule({
  exports: [NxRadioToggleComponent, NxRadioToggleButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    NxIconModule,
    NxRadioToggleComponent,
    NxRadioToggleButtonComponent,
  ],
})
export class NxRadioToggleModule {}
