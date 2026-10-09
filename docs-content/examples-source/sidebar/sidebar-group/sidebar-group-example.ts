import {
  NxActionComponent,
  NxActionIconDirective,
} from '@allianz/ng-aquila/action';
import { NxDividerComponent } from '@allianz/ng-aquila/divider';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxSidebarComponent,
  NxSidebarGroupComponent,
} from '@allianz/ng-aquila/sidebar';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * @title Side navigation with groups and dividers
 */
@Component({
  selector: 'sidebar-group-example',
  styleUrls: ['sidebar-group-example.css'],
  templateUrl: './sidebar-group-example.html',
  imports: [
    NxSidebarComponent,
    NxSidebarGroupComponent,
    NxActionComponent,
    NxActionIconDirective,
    NxDividerComponent,
    NxIconComponent,
    RouterLink,
    RouterLinkActive,
  ],
})
export class SidebarGroupExampleComponent {
  groups = [
    {
      label: 'Documents',
      actions: [
        { icon: 'file-text', label: 'All Files', query: { a: 1 } },
        { icon: 'file', label: 'Recent Downloads', query: { a: 2 } },
      ],
    },
    {
      label: 'Communication',
      actions: [
        { icon: 'mail-o', label: 'Email', query: { a: 3 } },
        { icon: 'calendar', label: 'Calendar', query: { a: 4 } },
      ],
    },
  ];
}
