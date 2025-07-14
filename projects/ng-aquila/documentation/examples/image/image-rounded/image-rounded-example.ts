import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxFigureComponent } from '@allianz/ng-aquila/image';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

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
