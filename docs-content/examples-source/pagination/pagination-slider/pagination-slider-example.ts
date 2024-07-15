import { Component } from '@angular/core';
import { NxPaginationComponent } from '@aposin/ng-aquila/pagination';

/**
 * @title Slider Pagination Example
 */
@Component({
    selector: 'pagination-slider-example',
    templateUrl: './pagination-slider-example.html',
    styleUrls: ['./pagination-slider-example.css'],
    standalone: true,
    imports: [NxPaginationComponent],
})
export class PaginationSliderExampleComponent {
    activeSlide = 1;
    slides = 6;

    prevPage() {
        this.activeSlide--;
    }

    nextPage() {
        this.activeSlide++;
    }

    goToPage(n: number) {
        this.activeSlide = n;
    }
}
