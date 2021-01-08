import { Component, OnInit } from '@angular/core';
import * as ICONS from './icons.json';

/**
 * @title Product Icons List Example
 */
 @Component({
  selector: 'icon-list-product-example',
  templateUrl: './icon-list-product-example.html',
  styleUrls: ['./icon-list-product-example.css']
})
export class IconListProductExampleComponent implements OnInit {
  iconList = [];

  ngOnInit() {
    this.iconList = (ICONS as any).icons.map((icon) => {
      return icon.name.replace('c-icon--', '').trim();
    }).filter(iconName => iconName.includes('product'));
  }
}
