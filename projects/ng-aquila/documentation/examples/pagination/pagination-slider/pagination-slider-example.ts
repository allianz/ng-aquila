import { NxPaginationComponent } from '@allianz/ng-aquila/pagination';
import { Component } from '@angular/core';

/**
 * @title Slider Pagination Example
 */
@Component({
  selector: 'pagination-slider-example',
  templateUrl: './pagination-slider-example.html',
  styleUrls: ['./pagination-slider-example.css'],
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
