import { Component } from '@angular/core';
import { NxVideoComponent } from '@aposin/ng-aquila/video';

/**
 * @title Video Example
 */
@Component({
    selector: 'video-example',
    templateUrl: './video-example.html',
    styleUrls: ['./video-example.css'],
    standalone: true,
    imports: [NxVideoComponent],
})
export class VideoExampleComponent {}
