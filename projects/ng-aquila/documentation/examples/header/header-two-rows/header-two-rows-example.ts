import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxHeaderActionsDirective,
  NxHeaderBrandDirective,
  NxHeaderComponent,
  NxHeaderLinkComponent,
  NxHeaderNavigationComponent,
  NxHeaderNavigationItemDirective,
  NxHeaderRowDirective,
} from '@allianz/ng-aquila/header';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * @title Header Two Rows Example
 */
@Component({
  selector: 'header-two-rows-example',
  templateUrl: './header-two-rows-example.html',
  styleUrls: ['./header-two-rows-example.css'],
  imports: [
    NxHeaderComponent,
    NxHeaderRowDirective,
    NxHeaderBrandDirective,
    NxLinkComponent,
    NxHeaderActionsDirective,
    NxButtonComponent,
    NxHeaderNavigationComponent,
    NxHeaderNavigationItemDirective,
    NxHeaderLinkComponent,
    RouterLink,
    RouterLinkActive,
  ],
})
export class HeaderTwoRowsExampleComponent {}
