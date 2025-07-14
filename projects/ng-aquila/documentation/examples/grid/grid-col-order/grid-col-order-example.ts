import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Column order example
 */
@Component({
  selector: 'grid-col-order-example',
  templateUrl: './grid-col-order-example.html',
  styleUrls: ['./grid-col-order-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridColOrderExampleComponent {}
