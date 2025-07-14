import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title Align self example
 */
@Component({
  selector: 'grid-align-self-example',
  templateUrl: './grid-align-self-example.html',
  styleUrls: ['./grid-align-self-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridAlignSelfExampleComponent {}
