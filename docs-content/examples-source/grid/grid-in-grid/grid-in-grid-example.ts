import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Grid in grid example
 */
@Component({
  selector: 'grid-in-grid-example',
  templateUrl: './grid-in-grid-example.html',
  styleUrls: ['./grid-in-grid-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridInGridExampleComponent {}
