import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { NxPaginationComponent } from '@allianz/ng-aquila/pagination';
import {
  NxHeaderCellDirective,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
} from '@allianz/ng-aquila/table';
import { Component } from '@angular/core';

/**
 * @title A11y Example
 */
@Component({
  selector: 'pagination-a11y-example',
  templateUrl: './pagination-a11y-example.html',
  styleUrls: ['./pagination-a11y-example.css'],
  imports: [
    NxMessageComponent,
    NxTableComponent,
    NxTableRowComponent,
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxPaginationComponent,
  ],
})
export class PaginationA11yExampleComponent {
  page = 1;
  count = 210;
  perPage = 10;

  prevPage() {
    this.page--;
  }

  nextPage() {
    this.page++;
  }

  goToPage(n: number) {
    this.page = n;
  }
}
