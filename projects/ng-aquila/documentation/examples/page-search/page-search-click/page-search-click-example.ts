import { Component } from '@angular/core';

/**
* @title Button click example
*/
@Component({
  selector: 'page-search-click-example',
  templateUrl: './page-search-click-example.html',
  styleUrls: ['./page-search-click-example.css']
})
export class PageSearchClickExampleComponent {

  valuesByClick = [];
  searchTerm: string;

  onButtonClick(value) {
    this.valuesByClick.push(value);
  }
}
