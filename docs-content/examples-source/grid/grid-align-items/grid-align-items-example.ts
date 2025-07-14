import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Align items example
 */
@Component({
  selector: 'grid-align-items-example',
  templateUrl: './grid-align-items-example.html',
  styleUrls: ['./grid-align-items-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridAlignItemsExampleComponent {}
