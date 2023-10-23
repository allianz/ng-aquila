import { Component } from '@angular/core';

/**
 * @title Smooth Scrolling Example
 */
@Component({
    selector: 'accordion-scroll-smooth-example',
    templateUrl: './accordion-scroll-smooth-example.html',
    styleUrls: ['./accordion-scroll-smooth-example.css'],
})
export class AccordionScrollSmoothExampleComponent {
    scrollIntoViewActive = true;

    scrollIntoViewOptions: ScrollIntoViewOptions = {
        behavior: 'smooth',
    };
}
