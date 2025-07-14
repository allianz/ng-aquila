import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxFigureComponent } from '@allianz/ng-aquila/image';
import { Component } from '@angular/core';

/**
 * @title Images Attribute styling example
 */
@Component({
  selector: 'image-attribute-example',
  templateUrl: './image-attribute-example.html',
  styleUrls: ['./image-attribute-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFigureComponent,
  ],
})
export class ImageAttributeExampleComponent {}
