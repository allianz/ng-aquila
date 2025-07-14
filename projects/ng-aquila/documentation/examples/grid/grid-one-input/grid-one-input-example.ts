import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/**
 * @title One input example
 */
@Component({
  selector: 'grid-one-input-example',
  templateUrl: './grid-one-input-example.html',
  styleUrls: ['./grid-one-input-example.css'],
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
})
export class GridOneInputExampleComponent {}
