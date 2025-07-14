import {
  NxActionComponent,
  NxActionIconDirective,
} from '@allianz/ng-aquila/action';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxSidebarComponent } from '@allianz/ng-aquila/sidebar';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * @title Side navigation Methods
 */
@Component({
  selector: 'sidebar-methods-example',
  styleUrls: ['sidebar-methods-example.css'],
  templateUrl: './sidebar-methods-example.html',
  imports: [
    NxSidebarComponent,
    NxActionComponent,
    RouterLink,
    RouterLinkActive,
    NxIconComponent,
    NxActionIconDirective,
    NxButtonComponent,
    NxFormfieldComponent,
    NxInputDirective,
    FormsModule,
  ],
})
export class SidebarMethodsExampleComponent {
  expandedWidth = 350;

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
