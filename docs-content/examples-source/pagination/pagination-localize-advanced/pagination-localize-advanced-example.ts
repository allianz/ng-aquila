import { Component } from '@angular/core';
import {
    IPaginationTexts,
    NX_PAGINATION_TEXTS,
} from '@aposin/ng-aquila/pagination';

const myPaginationTexts: IPaginationTexts = {
    previous: 'myPreviousText',
    next: 'myNextText',
    ofLabel: 'myOf',
    ariaLabel: 'myAriaLabelText',
    last: 'myLastText',
    first: 'myFirstText',
};

/**
 * @title Localization - Advanced Pagination
 */
@Component({
    selector: 'pagination-localize-advanced-example',
    templateUrl: './pagination-localize-advanced-example.html',
    styleUrls: ['./pagination-localize-advanced-example.css'],
    providers: [{ provide: NX_PAGINATION_TEXTS, useValue: myPaginationTexts }],
})
export class PaginationLocalizeAdvancedExampleComponent {
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
