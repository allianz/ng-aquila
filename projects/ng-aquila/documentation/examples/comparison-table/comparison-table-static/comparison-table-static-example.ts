import {
  NxButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTablePopularCell,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
  NxComparisonTableViewType,
} from '@allianz/ng-aquila/comparison-table';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/** @title Static layout example */
@Component({
  selector: 'comparison-table-static-example',
  templateUrl: './comparison-table-static-example.html',
  styleUrls: ['./comparison-table-static-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxButtonComponent,
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTablePopularCell,
    NxPlainButtonComponent,
    NxPopoverTriggerDirective,
    NxIconComponent,
    NxPopoverComponent,
    NxComparisonTableCell,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
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
