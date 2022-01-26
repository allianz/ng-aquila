import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { NxvFeedbackComponent } from './feedback.component';

@NgModule({
    imports: [CommonModule, NxIconModule, NxButtonModule, NxPopoverModule],
    declarations: [NxvFeedbackComponent],
    exports: [NxvFeedbackComponent],
})
export class NxvFeedbackModule {}
