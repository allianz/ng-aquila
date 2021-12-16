import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxvFeedbackComponent } from './feedback.component';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

@NgModule({
    imports: [CommonModule, NxIconModule, NxButtonModule, NxPopoverModule],
    declarations: [NxvFeedbackComponent],
    exports: [NxvFeedbackComponent],
})
export class NxvFeedbackModule {}
