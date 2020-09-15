import { Component } from '@angular/core';

/**
* @title Button click example
*/
@Component({
  templateUrl: './page-search-click-example.html'
})
export class PageSearchClickExampleComponent {

  valuesByClick = [];
  searchTerm: string;

  onButtonClick(value) {
    this.valuesByClick.push(value);
  }
}
