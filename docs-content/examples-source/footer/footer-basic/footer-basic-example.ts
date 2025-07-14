import {
  NxFooterComponent,
  NxFooterCopyrightDirective,
  NxFooterLinkDirective,
  NxFooterNavigationDirective,
} from '@allianz/ng-aquila/footer';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Basic example
 */
@Component({
  selector: 'footer-basic-example',
  templateUrl: './footer-basic-example.html',
  styleUrls: ['footer-basic-example.css'],
  imports: [
    NxFooterComponent,
    NxFooterCopyrightDirective,
    NxFooterNavigationDirective,
    NxFooterLinkDirective,
    RouterLink,
  ],
})
export class FooterBasicExampleComponent {
  readonly currentYear = new Date().getFullYear();
}
