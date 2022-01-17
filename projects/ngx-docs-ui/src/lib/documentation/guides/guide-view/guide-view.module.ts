import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocViewerModule } from '../../../doc-viewer/public_api';
import { NxvFeedbackModule } from '../../feedback/feedback.module';
import { NxvTableOfContentsModule } from '../../table-of-contents/table-of-contents.module';
import { NxvGuideViewComponent } from './guide-view.component';

@NgModule({
    imports: [CommonModule, RouterModule, DocViewerModule, NxvTableOfContentsModule, NxvFeedbackModule],
    exports: [],
    declarations: [NxvGuideViewComponent],
    providers: [],
})
export class NxvGuideViewModule {}
