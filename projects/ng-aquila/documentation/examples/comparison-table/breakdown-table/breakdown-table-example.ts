import {
  NxExpansionPanelComponent,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from '@allianz/ng-aquila/accordion';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxDataDisplayComponent } from '@allianz/ng-aquila/data-display';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Breakdown table example
 */
@Component({
  selector: 'breakdown-table-example',
  templateUrl: './breakdown-table-example.html',
  styleUrls: ['./breakdown-table-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxCopytextComponent,
    NxHeadlineComponent,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
    NxDataDisplayComponent,
    CurrencyPipe,
  ],
})
export class BreakdownTableExampleComponent {}
