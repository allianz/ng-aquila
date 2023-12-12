import { Injectable } from '@angular/core';

import { Page } from './pagination.component';

interface PaginationItem {
    label: string | number;
    value: number;
    class: string;
}

/** @docs-private */
@Injectable()
export class NxPaginationUtils {
    private readonly _pagesMobile = 3;
    private readonly _elipsisText = '...';
    private readonly _classExpanded = 'expanded-view';

    getSlides(totalSlides: number): any[] {
        return Array.from(Array(totalSlides).keys()).map(item => this.createPaginationItem(item + 1, item + 1));
    }

    getPages(currentPage: number, totalPages: number): Page[] {
        let pages = [];
        let start = [],
            middle = [],
            end = [];

        // First array -> start
        start = this.getStartArray(currentPage, totalPages);
        // Second array -> middle
        middle = this.getMiddleArray(currentPage, totalPages);
        // Third array -> end
        end = this.getEndArray(currentPage, totalPages);

        pages = [...start, ...middle, ...end];

        return pages;
    }

    getMiddleArray(currentPage: number, totalPages: number): any[] {
        let pageNumber = currentPage < 6 ? 4 : currentPage - 1;
        const middle = [];

        while (middle.length < 3 && pageNumber >= 2 && pageNumber <= totalPages - 3 && pageNumber <= currentPage + 1 && pageNumber >= currentPage - 1) {
            middle.push(this.createPaginationItem(pageNumber, pageNumber));
            pageNumber++;
        }
        return middle;
    }
    getEndArray(currentPage: number, totalPages: number): any[] {
        const end = [];
        let currentItemToShow: number = totalPages <= 3 ? totalPages + 1 : totalPages <= 6 ? totalPages - (totalPages - 4) : totalPages - 2;
        const showEllipsis = currentPage < totalPages - 4;

        while (currentItemToShow <= totalPages) {
            const endItem: PaginationItem =
                end.length === 0 && showEllipsis
                    ? this.createPaginationItem(this._elipsisText, currentItemToShow, true)
                    : this.createPaginationItem(currentItemToShow, currentItemToShow, true);
            end.push(endItem);
            currentItemToShow++;
        }

        return end;
    }
    getStartArray(currentPage: number, totalPages: number): any[] {
        let counterPages = 0;
        const start = [];
        const maxSizeArray = 3;

        while (counterPages < maxSizeArray && counterPages < totalPages) {
            const startItem =
                counterPages === 2 && currentPage > 5
                    ? this.createPaginationItem(this._elipsisText, counterPages, true)
                    : this.createPaginationItem(counterPages + 1, counterPages + 1, true);

            start.push(startItem);
            counterPages++;
        }

        return start;
    }

    getMobilePages(currentPage: number, totalPages: number): any[] {
        // if we have less pages than the number we want to display take all
        if (totalPages < this._pagesMobile) {
            return Array.from(Array(totalPages).keys()).map(item => this.createPaginationItem(item + 1, item + 1));
        }

        switch (currentPage) {
            // first page active
            case 1:
                return [1, 2, 3].map(item => this.createPaginationItem(item, item));
            // last page active
            case totalPages:
                return [totalPages - 2, totalPages - 1, totalPages].map(item => this.createPaginationItem(item, item));
            // any other page active
            default:
                return [currentPage - 1, currentPage, currentPage + 1].map(item => this.createPaginationItem(item, item));
        }
    }

    private createPaginationItem(label: string | number, value: number, classExpanded?: boolean): PaginationItem {
        return { label, value, class: classExpanded ? this._classExpanded : '' };
    }
}
