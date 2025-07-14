import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxHeaderActionsDirective,
  NxHeaderBrandDirective,
  NxHeaderComponent,
  NxHeaderLinkComponent,
  NxHeaderNavigationComponent,
  NxHeaderNavigationItemDirective,
} from '@allianz/ng-aquila/header';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * @title Single Row Header Example
 */
@Component({
  selector: 'header-example',
  templateUrl: './header-example.html',
  styleUrls: ['./header-example.css'],
  imports: [
    NxHeaderComponent,
    NxHeaderBrandDirective,
    NxLinkComponent,
    NxHeaderNavigationComponent,
    NxHeaderNavigationItemDirective,
    NxHeaderLinkComponent,
    RouterLink,
    RouterLinkActive,
    NxHeaderActionsDirective,
    NxButtonComponent,
  ],
})
export class HeaderExampleComponent {}
