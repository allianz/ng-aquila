import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxFigureComponent } from '@aposin/ng-aquila/image';

/**
 * @title Fixed ratio styling example
 */
@Component({
    selector: 'image-fixed-ratios-example',
    templateUrl: './image-fixed-ratios-example.html',
    styleUrls: ['./image-fixed-ratios-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxCopytextComponent,
        NxFigureComponent,
        NgOptimizedImage,
    ],
})
export class ImageFixedRatiosExampleComponent {}
