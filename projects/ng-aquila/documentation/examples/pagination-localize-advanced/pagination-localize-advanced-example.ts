import { Component } from '@angular/core';
import { IPaginationTexts, NX_PAGINATION_TEXTS } from '@aposin/ng-aquila/pagination';

const myPaginationTexts: IPaginationTexts = {
  previous: 'myPreviousText',
  next: 'myNextText',
  ofLabel: 'myOf',
  ariaLabel: 'myAriaLabelText',
  last: 'myLastText',
  first: 'myFirstText'
};

/**
* @title Localization - Advanced Pagination
*/
@Component({
  templateUrl: './pagination-localize-advanced-example.html',
  providers: [
    {provide: NX_PAGINATION_TEXTS, useValue: myPaginationTexts}
  ]
})
export class PaginationLocalizeAdvancedExampleComponent {
  page: number = 1;
  count: number = 210;
  perPage: number = 10;

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
