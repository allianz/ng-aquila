import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxComparisonTableCell,
  NxComparisonTableComponent,
  NxComparisonTableDescriptionCell,
  NxComparisonTableHeaderEyebrow,
  NxComparisonTableHeaderPrice,
  NxComparisonTableHeaderTitle,
  NxComparisonTablePopularCell,
  NxComparisonTableRowDirective,
  NxComparisonTableSelectButton,
} from '@allianz/ng-aquila/comparison-table';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/** @title Basic example */
@Component({
  selector: 'comparison-table-example',
  templateUrl: './comparison-table-example.html',
  styleUrls: ['./comparison-table-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxComparisonTableComponent,
    NxComparisonTableRowDirective,
    NxComparisonTablePopularCell,
    NxComparisonTableCell,
    NxComparisonTableHeaderEyebrow,
    NxComparisonTableHeaderTitle,
    NxComparisonTableHeaderPrice,
    NxComparisonTableSelectButton,
    NxComparisonTableDescriptionCell,
    NxEyebrowComponent,
    NxHeadlineComponent,
    NxPriceComponent,
    NxIconComponent,
    NxPlainButtonComponent,
    NxPopoverComponent,
    NxPopoverTriggerDirective,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
  ],
})
export class ComparisonTableExampleComponent {
  readonly headlineSize = signal<'l' | 'xl'>('xl');
  readonly headlineSizeOptions: ('l' | 'xl')[] = ['l', 'xl'];
}
