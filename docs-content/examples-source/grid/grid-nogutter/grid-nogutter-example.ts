import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Current tier of the grid
 */
@Component({
  selector: 'grid-nogutter-example',
  templateUrl: './grid-nogutter-example.html',
  styleUrls: ['./grid-nogutter-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridNogutterExampleComponent {}
