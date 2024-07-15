import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    NxFooterComponent,
    NxFooterLinkDirective,
    NxFooterNavigationDirective,
} from '@aposin/ng-aquila/footer';

/**
 * @title Footer default copyright
 */
@Component({
    selector: 'footer-default-copyright-example',
    templateUrl: './footer-default-copyright-example.html',
    styleUrls: ['footer-default-copyright-example.css'],
    standalone: true,
    imports: [
        NxFooterComponent,
        NxFooterNavigationDirective,
        NxFooterLinkDirective,
        RouterLink,
    ],
})
export class FooterDefaultCopyrightExampleComponent {}
