import {
  NxActionComponent,
  NxActionIconDirective,
} from '@allianz/ng-aquila/action';
import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxSidebarComponent,
  NxSidebarFooterComponent,
  NxSidebarToggleComponent,
} from '@allianz/ng-aquila/sidebar';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * @title Side navigation with footer area
 */
@Component({
  selector: 'sidebar-footer-example',
  styleUrls: ['sidebar-footer-example.css'],
  templateUrl: './sidebar-footer-example.html',
  imports: [
    NxSidebarComponent,
    NxActionComponent,
    RouterLink,
    RouterLinkActive,
    NxIconComponent,
    NxActionIconDirective,
    NxSidebarFooterComponent,
    NxIconButtonComponent,
    NxSidebarToggleComponent,
  ],
})
export class SidebarFooterExampleComponent {
  actions = [
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
    {
      icon: 'file',
      label: 'Recent Downloads',
      query: { a: 5 },
    },
  ];
}
