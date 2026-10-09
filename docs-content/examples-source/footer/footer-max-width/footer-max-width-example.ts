import {
  NxFooterComponent,
  NxFooterCopyrightDirective,
  NxFooterLinkDirective,
  NxFooterNavigationDirective,
} from '@allianz/ng-aquila/footer';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Max width example
 */
@Component({
  selector: 'footer-max-width-example',
  templateUrl: './footer-max-width-example.html',
  styleUrls: ['footer-max-width-example.css'],
  imports: [
    NxFooterComponent,
    NxFooterCopyrightDirective,
    NxFooterNavigationDirective,
    NxFooterLinkDirective,
    RouterLink,
  ],
})
export class FooterMaxWidthExampleComponent {
  readonly currentYear = new Date().getFullYear();
}
