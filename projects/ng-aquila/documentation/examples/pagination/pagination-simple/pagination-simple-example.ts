import { Component } from '@angular/core';
import { NxPaginationComponent } from '@aposin/ng-aquila/pagination';

/**
 * @title Simple Pagination Example
 */
@Component({
    selector: 'pagination-simple-example',
    templateUrl: './pagination-simple-example.html',
    styleUrls: ['./pagination-simple-example.css'],
    standalone: true,
    imports: [NxPaginationComponent],
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
