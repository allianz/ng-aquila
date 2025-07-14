import {
  IPaginationTexts,
  NX_PAGINATION_TEXTS,
  NxPaginationComponent,
} from '@allianz/ng-aquila/pagination';
import { Component } from '@angular/core';

const myPaginationTexts: IPaginationTexts = {
  previous: 'myPreviousText',
  next: 'myNextText',
  ofLabel: 'myOf',
  ariaLabel: 'myAriaLabelText',
};

/**
 * @title Localization Example
 */
@Component({
  selector: 'pagination-localize-example',
  templateUrl: './pagination-localize-example.html',
  styleUrls: ['./pagination-localize-example.css'],
  providers: [{ provide: NX_PAGINATION_TEXTS, useValue: myPaginationTexts }],
  imports: [NxPaginationComponent],
})
export class PaginationLocalizeExampleComponent {
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
