import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Align content example
 */
@Component({
  selector: 'grid-align-content-example',
  templateUrl: './grid-align-content-example.html',
  styleUrls: ['./grid-align-content-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridAlignContentExampleComponent {}
