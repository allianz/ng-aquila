import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxPopoverModule } from '@allianz/ng-aquila/popover';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSignalButtonComponent } from './signal-button.component';

@NgModule({
  imports: [CommonModule, NxPopoverModule, NxIconModule, NxButtonModule, NxSignalButtonComponent],
  exports: [NxSignalButtonComponent],
})
export class NxSignalButtonModule {}
