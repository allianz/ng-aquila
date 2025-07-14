import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxFigureComponent } from '@allianz/ng-aquila/image';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

/**
 * @title Fixed ratio styling example
 */
@Component({
  selector: 'image-fixed-ratios-example',
  templateUrl: './image-fixed-ratios-example.html',
  styleUrls: ['./image-fixed-ratios-example.css'],
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
