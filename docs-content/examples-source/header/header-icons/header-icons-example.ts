import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxHeaderActionsDirective,
  NxHeaderAppTitleDirective,
  NxHeaderBrandDirective,
  NxHeaderComponent,
} from '@allianz/ng-aquila/header';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Header with functional icons example
 */
@Component({
  selector: 'header-icons-example',
  templateUrl: './header-icons-example.html',
  styleUrls: ['./header-icons-example.css'],
  imports: [
    NxHeaderComponent,
    NxHeaderBrandDirective,
    NxLinkComponent,
    NxHeaderAppTitleDirective,
    NxHeaderActionsDirective,
    NxPlainButtonComponent,
    NxIconComponent,
    RouterLink,
  ],
})
export class HeaderIconsExampleComponent {}
