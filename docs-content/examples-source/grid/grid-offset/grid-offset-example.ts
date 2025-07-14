import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Offset example
 */
@Component({
  selector: 'grid-offset-example',
  templateUrl: './grid-offset-example.html',
  styleUrls: ['./grid-offset-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridOffsetExampleComponent {}
