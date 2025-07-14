import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxFigureComponent } from '@allianz/ng-aquila/image';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

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
