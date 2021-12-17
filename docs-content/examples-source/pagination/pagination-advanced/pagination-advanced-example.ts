import { Component } from '@angular/core';

/**
 * @title Advanced Pagination Example
 */
@Component({
    selector: 'pagination-advanced-example',
    templateUrl: './pagination-advanced-example.html',
    styleUrls: ['./pagination-advanced-example.css'],
})
export class PaginationAdvancedExampleComponent {
    count: number = 210;
    page: number = 1;
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
