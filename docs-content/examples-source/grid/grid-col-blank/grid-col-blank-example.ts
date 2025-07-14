import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title nxCol example
 */
@Component({
  selector: 'grid-col-blank-example',
  templateUrl: './grid-col-blank-example.html',
  styleUrls: ['./grid-col-blank-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridColBlankExampleComponent {}
