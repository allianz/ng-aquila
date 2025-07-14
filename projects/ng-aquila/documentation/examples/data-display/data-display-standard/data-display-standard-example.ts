import {
  NxDataDisplayComponent,
  NxDataDisplayLabelComponent,
} from '@allianz/ng-aquila/data-display';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { NxListComponent } from '@allianz/ng-aquila/list';
import { Component } from '@angular/core';

/**
 * @title Standard data display example
 */
@Component({
  selector: 'data-display-standard-example',
  templateUrl: './data-display-standard-example.html',
  styleUrls: ['./data-display-standard-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxDataDisplayComponent,
    NxDataDisplayLabelComponent,
    NxLinkComponent,
    NxListComponent,
  ],
})
export class DataDisplayStandardExampleComponent {}
