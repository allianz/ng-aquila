import { Component } from '@angular/core';

/**
 * @title Basic example
 */
@Component({
    selector: 'footer-basic-example',
    templateUrl: './footer-basic-example.html',
    styleUrls: ['footer-basic-example.css'],
})
export class FooterBasicExampleComponent {
    readonly currentYear = new Date().getFullYear();
}
