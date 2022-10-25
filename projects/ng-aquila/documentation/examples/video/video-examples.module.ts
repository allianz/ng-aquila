import { NgModule } from '@angular/core';
import { NxVideoModule } from '@aposin/ng-aquila/video';

import { VideoExampleComponent } from './video/video-example';
import { VideoAdvancedExampleComponent } from './video-advanced/video-advanced-example';
import { VideoCustomExampleComponent } from './video-custom/video-custom-example';

const EXAMPLES = [
    VideoExampleComponent,
    VideoAdvancedExampleComponent,
    VideoCustomExampleComponent,
];

@NgModule({
    imports: [NxVideoModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class VideoExamplesModule {
    static components() {
        return {
            video: VideoExampleComponent,
            'video-advanced': VideoAdvancedExampleComponent,
            'video-custom': VideoCustomExampleComponent,
        };
    }
}
