import { NxBadgeComponent } from '@allianz/ng-aquila/badge';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import {
  NxHeaderCellDirective,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
} from '@allianz/ng-aquila/table';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Condensed Example
 */
@Component({
  selector: 'table-condensed-example',
  templateUrl: './table-condensed-example.html',
  styleUrls: ['./table-condensed-example.css'],
  imports: [
    NxTableComponent,
    NxTableRowComponent,
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxLinkComponent,
    RouterLink,
    NxBadgeComponent,
  ],
})
export class TableCondensedExampleComponent {
  tableElements = [
    {
      product: 'Car',
      contractNumber: 1234,
      desc: 'This is a contract',
      website: 'www.example.com',
      endingAt: '1/3/2020',
      status: 'negative',
      statusText: 'open',
    },
    {
      product: 'Health',
      contractNumber: 2423,
      desc: 'This is another contract',
      website: 'www.allianz.com',
      endingAt: '4/2/2020',
      status: 'active',
      statusText: 'accepted',
    },
    {
      product: 'Car',
      contractNumber: 353455,
      desc: 'Lorem ipsum dolor sit amet, csis libero. ',
      website: 'www.example.com',
      endingAt: '6/2/2020',
      status: 'positive',
      statusText: 'accepted',
    },
    {
      product: 'Home',
      contractNumber: 22344,
      desc: 'This is a description of a contract',
      website: 'www.example.org',
      endingAt: '1/2/2027',
      status: 'critical',
      statusText: 'rejected',
    },
  ];
}
