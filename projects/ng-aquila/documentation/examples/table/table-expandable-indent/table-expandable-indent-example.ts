import { NxBadgeComponent } from '@allianz/ng-aquila/badge';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import {
  NxExpandableTableCellComponent,
  NxExpandableTableDirective,
  NxExpandableTableRowComponent,
  NxHeaderCellDirective,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
  NxToggleButtonComponent,
} from '@allianz/ng-aquila/table';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Expandable Rows
 */
@Component({
  selector: 'table-expandable-indent-example',
  templateUrl: './table-expandable-indent-example.html',
  styleUrls: ['./table-expandable-indent-example.css'],
  imports: [
    NxTableComponent,
    NxExpandableTableDirective,
    NxTableRowComponent,
    NxHeaderCellDirective,
    NxToggleButtonComponent,
    NxTableCellComponent,
    NxBadgeComponent,
    NxExpandableTableRowComponent,
    NxExpandableTableCellComponent,
    NxLinkComponent,
    RouterLink,
  ],
})
export class TableExpandableIndentExampleComponent {
  tableElements = [
    {
      product: 'Car',
      contractNumber: 1234,
      endingAt: '1/3/2020',
      status: 'negative',
      statusText: 'open',
      sub: ['BMW', 'Audi'],
    },
    {
      product: 'Health',
      contractNumber: 2423,
      endingAt: '4/2/2020',
      status: 'active',
      statusText: 'accepted',
      sub: [],
    },
    {
      product: 'Home',
      contractNumber: 22344,
      endingAt: '1/2/2027',
      status: 'critical',
      statusText: 'rejected',
      sub: [],
    },
    {
      product: 'Fruit',
      contractNumber: 2423,
      endingAt: '4/2/2020',
      status: 'active',
      statusText: 'accepted',
      sub: ['Apple', 'Banana', 'Orange'],
    },
  ];
}
