import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxFigureComponent } from '@aposin/ng-aquila/image';

/**
 * @title Default styling example
 */
@Component({
    selector: 'image-default-example',
    templateUrl: './image-default-example.html',
    styleUrls: ['./image-default-example.css'],
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFigureComponent,
        NgOptimizedImage,
    ],
})
export class ImageDefaultExampleComponent {}
