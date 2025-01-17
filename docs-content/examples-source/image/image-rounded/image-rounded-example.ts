import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxFigureComponent } from '@aposin/ng-aquila/image';

/**
 * @title Rounded styling example
 */
@Component({
    selector: 'image-rounded-example',
    templateUrl: './image-rounded-example.html',
    styleUrls: ['./image-rounded-example.css'],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFigureComponent,
        NgOptimizedImage,
    ],
})
export class ImageRoundedExampleComponent {}
