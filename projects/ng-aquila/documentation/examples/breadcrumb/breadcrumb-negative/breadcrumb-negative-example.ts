import { Component } from '@angular/core';

/**
* @title Negative styling example
*/
@Component({
  templateUrl: './breadcrumb-negative-example.html',
  styleUrls: ['./breadcrumb-negative-example.css']

})
export class BreadcrumbNegativeExampleComponent {

  items = [
    { link: '', name: 'Home'},
    { link: '', name: 'Insurance'},
    { link: '', name: 'Health Insurance'},
  ];

  dynamicItems = this.items;

  goToItem(i: number) {
    this.dynamicItems = this.items.slice(0, i + 1);
  }
}
