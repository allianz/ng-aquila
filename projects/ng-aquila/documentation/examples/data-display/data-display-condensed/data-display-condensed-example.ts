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
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { NxListComponent } from '@allianz/ng-aquila/list';
import { Component } from '@angular/core';

const options: DataDisplayDefaultOptions = {
  size: 'medium', // expert mode default size
};

/**
 * @title Condensed data display example
 */
@Component({
  selector: 'data-display-condensed-example',
  templateUrl: './data-display-condensed-example.html',
  styleUrls: ['./data-display-condensed-example.css'],
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
    NxDataDisplayComponent,
    NxDataDisplayLabelComponent,
    NxLinkComponent,
    NxListComponent,
  ],
})
export class DataDisplayCondensedExampleComponent {}
