import { NgModule } from '@angular/core';

import { NxvGuideViewComponent } from './guide-view.component';
import { RouterModule } from '@angular/router';
import { DocViewerModule } from '../../../doc-viewer/public_api';
import { NxvTableOfContentsModule } from '../../table-of-contents/table-of-contents.module';
import { CommonModule } from '@angular/common';
import { NxvFeedbackModule } from '../../feedback/feedback.module';

@NgModule({
    imports: [CommonModule, RouterModule, DocViewerModule, NxvTableOfContentsModule, NxvFeedbackModule],
    exports: [],
    declarations: [NxvGuideViewComponent],
    providers: [],
})
export class NxvGuideViewModule {}
