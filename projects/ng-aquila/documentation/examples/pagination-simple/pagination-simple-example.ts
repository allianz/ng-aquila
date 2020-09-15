import { Component } from '@angular/core';

/**
* @title Simple Pagination Example
*/
@Component({
  templateUrl: './pagination-simple-example.html'
})
export class PaginationSimpleExampleComponent {
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
