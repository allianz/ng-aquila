import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableHeaderPrice,
  NxComparisonTableHeaderTitle,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
  NxComparisonTableViewType,
} from '@allianz/ng-aquila/comparison-table';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/** @title Static layout example */
@Component({
  selector: 'comparison-table-static-example',
  templateUrl: './comparison-table-static-example.html',
  styleUrls: ['./comparison-table-static-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTableCell,
    NxComparisonTableHeaderTitle,
    NxComparisonTableHeaderPrice,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxHeadlineComponent,
    NxPriceComponent,
    NxButtonComponent,
  ],
})
export class ComparisonTableStaticExampleComponent {
  layout?: NxComparisonTableViewType | null;

  cycleLayout(): void {
    switch (this.layout) {
      case 'mobile':
        this.layout = 'tablet';
        break;
      case 'tablet':
        this.layout = 'desktop';
        break;
      default:
        this.layout = 'mobile';
    }
  }

  defaultLayout(): void {
    this.layout = null;
  }
}
