import {
  NxActionComponent,
  NxActionIconDirective,
} from '@allianz/ng-aquila/action';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxSidebarComponent } from '@allianz/ng-aquila/sidebar';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Sidebar color scheme
 */
@Component({
  selector: 'sidebar-color-scheme-example',
  styleUrls: ['sidebar-color-scheme-example.css'],
  templateUrl: './sidebar-color-scheme-example.html',
  imports: [
    NxSidebarComponent,
    NxActionComponent,
    NxIconComponent,
    NxActionIconDirective,
    RouterLink,
  ],
})
export class SidebarColorSchemeExampleComponent {
  readonly actions = [
    {
      icon: 'file-text',
      label: 'All Files',
      query: { a: 1 },
    },
    {
      icon: 'calendar',
      label: 'Calendar',
      query: { a: 2 },
    },
    {
      icon: 'mail-o',
      label: 'Email',
      query: { a: 3 },
    },
    {
      icon: 'user-o',
      label: 'My Profile',
      query: { a: 4 },
    },
  ];
}
