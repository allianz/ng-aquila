import { Component } from '@angular/core';

/**
 * @title Auto and manual select
 */
@Component({
  templateUrl: './tabs-auto-manual-select-example.html',
  styleUrls: ['./tabs-auto-manual-select-example.css']
})
export class TabsAutoManualSelectExampleComponent {

  autoselect: boolean = true;

  toggleAutoselect() {
    this.autoselect = this.autoselect ? false : true;
  }

}
