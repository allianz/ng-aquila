import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { NxSignalButtonComponent } from './signal-button.component';

@NgModule({
    imports: [CommonModule, NxPopoverModule, NxIconModule, NxButtonModule],
    declarations: [NxSignalButtonComponent],
    exports: [NxSignalButtonComponent],
})
export class NxSignalButtonModule {}
