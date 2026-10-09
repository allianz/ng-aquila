import {
  NxFooterComponent,
  NxFooterCopyrightDirective,
  NxFooterLinkDirective,
  NxFooterNavigationDirective,
} from '@allianz/ng-aquila/footer';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Divider example
 */
@Component({
  selector: 'footer-divider-example',
  templateUrl: './footer-divider-example.html',
  styleUrls: ['footer-divider-example.css'],
  imports: [
    NxFooterComponent,
    NxFooterCopyrightDirective,
    NxFooterNavigationDirective,
    NxFooterLinkDirective,
    RouterLink,
  ],
})
export class FooterDividerExampleComponent {
  readonly currentYear = new Date().getFullYear();
}
