import { Component } from '@angular/core';

/**
 * @title Simple Pagination Example
 */
@Component({
    selector: 'pagination-simple-example',
    templateUrl: './pagination-simple-example.html',
    styleUrls: ['./pagination-simple-example.css'],
})
export class PaginationSimpleExampleComponent {
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
