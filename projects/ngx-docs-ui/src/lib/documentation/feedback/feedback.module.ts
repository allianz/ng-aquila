import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxPopoverModule } from '@allianz/ng-aquila/popover';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxvFeedbackComponent } from './feedback.component';

@NgModule({
    imports: [CommonModule, NxIconModule, NxButtonModule, NxPopoverModule],
    declarations: [NxvFeedbackComponent],
    exports: [NxvFeedbackComponent],
})
export class NxvFeedbackModule {}
