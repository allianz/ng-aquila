import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxHeaderActionsDirective,
  NxHeaderAppTitleDirective,
  NxHeaderBrandDirective,
  NxHeaderComponent,
  NxHeaderLinkComponent,
  NxHeaderNavigationComponent,
  NxHeaderNavigationItemDirective,
  NxHeaderRowDirective,
} from '@allianz/ng-aquila/header';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * @title Header with co-branding example
 */
@Component({
  selector: 'header-cobranding-example',
  templateUrl: './header-cobranding-example.html',
  styleUrls: ['header-cobranding-example.css'],
  imports: [
    NxHeaderComponent,
    NxHeaderRowDirective,
    NxHeaderBrandDirective,
    NxLinkComponent,
    NxHeaderAppTitleDirective,
    NxHeaderActionsDirective,
    NxHeaderNavigationComponent,
    NxHeaderNavigationItemDirective,
    NxHeaderLinkComponent,
    RouterLink,
    RouterLinkActive,
    NxPlainButtonComponent,
    NxIconComponent,
  ],
})
export class HeaderCobrandingExampleComponent {}
