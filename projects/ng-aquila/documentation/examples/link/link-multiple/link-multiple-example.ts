import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Multiple modifiers example
 */
@Component({
    selector: 'link-multiple-example',
    templateUrl: './link-multiple-example.html',
    styleUrls: ['./link-multiple-example.css'],
    imports: [NxLinkComponent, RouterLink, NxIconComponent],
})
export class LinkMultipleExampleComponent {}
