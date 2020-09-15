import { Component } from '@angular/core';

/**
* @title Multi Accordion Example
*/
@Component({
  templateUrl: './accordion-multi-example.html'
})
export class AccordionMultiExampleComponent {
  multi = true;

  toggleMulti() {
    this.multi = !this.multi;
  }
}
