
import { Component } from '@angular/core';

/**
* @title Basic usage
*/
@Component({
  templateUrl: './breadcrumb-example.html',
  styleUrls: ['./breadcrumb-example.css']
})
export class BreadcrumbExampleComponent {

  items = [
    'Home',
    'Insurance',
    'Health Insurance',
  ];

  dynamicItems = this.items;

  goToItem(i: number) {
    this.dynamicItems = this.items.slice(0, i + 1);
  }
}
