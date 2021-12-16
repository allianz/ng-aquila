import { Component } from '@angular/core';

/**
 * @title Multi Accordion Example
 */
@Component({
    selector: 'accordion-multi-example',
    templateUrl: './accordion-multi-example.html',
    styleUrls: ['./accordion-multi-example.css'],
})
export class AccordionMultiExampleComponent {
    multi = true;

    toggleMulti() {
        this.multi = !this.multi;
    }
}
