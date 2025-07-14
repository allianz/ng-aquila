import {
  NxFooterComponent,
  NxFooterLinkDirective,
  NxFooterNavigationDirective,
} from '@allianz/ng-aquila/footer';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @title Footer default copyright
 */
@Component({
  selector: 'footer-default-copyright-example',
  templateUrl: './footer-default-copyright-example.html',
  styleUrls: ['footer-default-copyright-example.css'],
  imports: [
    NxFooterComponent,
    NxFooterNavigationDirective,
    NxFooterLinkDirective,
    RouterLink,
  ],
})
export class FooterDefaultCopyrightExampleComponent {}
