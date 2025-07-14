import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import {
  DATA_DISPLAY_DEFAULT_OPTIONS,
  DataDisplayDefaultOptions,
  NxDataDisplayComponent,
} from '@allianz/ng-aquila/data-display';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

const options: DataDisplayDefaultOptions = {
  size: 'medium', // expert mode default size
};

/**
 * @title Breakdown table expert example
 */
@Component({
  selector: 'breakdown-table-expert-example',
  templateUrl: './breakdown-table-expert-example.html',
  styleUrls: ['./breakdown-table-expert-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    NxCopytextComponent,
    NxHeadlineComponent,
    NxDataDisplayComponent,
    CurrencyPipe,
  ],
})
export class BreakdownTableExpertExampleComponent {}
