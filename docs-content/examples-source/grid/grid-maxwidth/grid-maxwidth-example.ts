import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Max width example
 */
@Component({
  selector: 'grid-maxwidth-example',
  templateUrl: './grid-maxwidth-example.html',
  styleUrls: ['./grid-maxwidth-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridMaxwidthExampleComponent {}
