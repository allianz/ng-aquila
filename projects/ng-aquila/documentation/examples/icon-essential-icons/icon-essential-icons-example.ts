import { DEFAULT_ICONS } from '@aposin/ng-aquila/icon';
import { Component, OnInit } from '@angular/core';

/**
 * @title Essential Icons Example
 */
 @Component({
  templateUrl: './icon-essential-icons-example.html',
  styleUrls: ['./icon-essential-icons-example.css']
})
export class IconEssentialIconsExampleComponent {
  iconList = Object.keys(DEFAULT_ICONS);
}
