import { NxVideoModule } from '@allianz/ng-aquila/video';
import { NgModule } from '@angular/core';

import { VideoExampleComponent } from './video/video-example';
import { VideoAdvancedExampleComponent } from './video-advanced/video-advanced-example';
import { VideoCustomExampleComponent } from './video-custom/video-custom-example';

const EXAMPLES = [
  VideoExampleComponent,
  VideoAdvancedExampleComponent,
  VideoCustomExampleComponent,
];

@NgModule({
  imports: [NxVideoModule, EXAMPLES],
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
