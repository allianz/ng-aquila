import { Component, OnInit } from '@angular/core';
import * as ICONS from './icons.json';

/**
 * @title Functional Icons List Example
 */
 @Component({
  templateUrl: './icon-list-functional-example.html',
  styleUrls: ['./icon-list-functional-example.css']
})
export class IconListFunctionalExampleComponent implements OnInit {
  iconList = [];

  ngOnInit() {
    this.iconList = (ICONS as any).icons.map((icon) => {
      return icon.name.replace('c-icon--', '').trim();
    }).filter(iconName => !iconName.includes('product'));
  }
}
