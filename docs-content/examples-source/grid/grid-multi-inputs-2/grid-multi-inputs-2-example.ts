import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Multiple inputs example 2
 */
@Component({
  selector: 'grid-multi-inputs-2-example',
  templateUrl: './grid-multi-inputs-2-example.html',
  styleUrls: ['./grid-multi-inputs-2-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridMultiInputs2ExampleComponent {}
