import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
  NxToggleSectionDirective,
  NxToggleSectionHeaderComponent,
} from '@allianz/ng-aquila/comparison-table';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/** @title Toggle section example */
@Component({
  selector: 'comparison-table-with-toggle-sections-example',
  templateUrl: './comparison-table-with-toggle-sections-example.html',
  styleUrls: ['./comparison-table-with-toggle-sections-example.css'],
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTableCell,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxIconComponent,
    NxToggleSectionDirective,
    NxToggleSectionHeaderComponent,
  ],
})
export class ComparisonTableWithToggleSectionsExampleComponent {}
