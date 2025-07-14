import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Justify row example
 */
@Component({
  selector: 'grid-justify-example',
  templateUrl: './grid-justify-example.html',
  styleUrls: ['./grid-justify-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridJustifyExampleComponent {}
