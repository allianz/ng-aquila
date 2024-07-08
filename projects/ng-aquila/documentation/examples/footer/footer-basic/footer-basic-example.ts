import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    NxFooterComponent,
    NxFooterCopyrightDirective,
    NxFooterLinkDirective,
    NxFooterNavigationDirective,
} from '@aposin/ng-aquila/footer';

/**
 * @title Basic example
 */
@Component({
    selector: 'footer-basic-example',
    templateUrl: './footer-basic-example.html',
    styleUrls: ['footer-basic-example.css'],
    standalone: true,
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
