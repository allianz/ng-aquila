import { Component } from '@angular/core';
import { NxVideoComponent } from '@aposin/ng-aquila/video';

/**
 * @title Video Custom Example
 */
@Component({
    selector: 'video-custom-example',
    templateUrl: './video-custom-example.html',
    styleUrls: ['./video-custom-example.css'],
    standalone: true,
    imports: [NxVideoComponent],
})
export class VideoCustomExampleComponent {}
