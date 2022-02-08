import { NgModule } from '@angular/core';
import { NxVideoModule } from '@aposin/ng-aquila/video';
import { VideoAdvancedExampleComponent } from './video-advanced/video-advanced-example';
import { VideoCustomExampleComponent } from './video-custom/video-custom-example';
import { VideoExampleComponent } from './video/video-example';

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
