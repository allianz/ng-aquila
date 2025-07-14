import {
  DATA_DISPLAY_DEFAULT_OPTIONS,
  DataDisplayDefaultOptions,
  NxDataDisplayComponent,
  NxDataDisplayLabelComponent,
} from '@allianz/ng-aquila/data-display';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { NxListComponent } from '@allianz/ng-aquila/list';
import { Component } from '@angular/core';

const options: DataDisplayDefaultOptions = {
  size: 'medium', // expert mode default size
};

/**
 * @title Horizontal data display example
 */
@Component({
  selector: 'data-display-horizontal-example',
  templateUrl: './data-display-horizontal-example.html',
  styleUrls: ['./data-display-horizontal-example.css'],
  providers: [
    {
      provide: DATA_DISPLAY_DEFAULT_OPTIONS,
      useValue: options,
    },
  ],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxHeadlineComponent,
    NxDataDisplayComponent,
    NxDataDisplayLabelComponent,
    NxLinkComponent,
    NxListComponent,
  ],
})
export class DataDisplayHorizontalExampleComponent {}
