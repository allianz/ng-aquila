import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Link with icon example
 */
@Component({
    selector: 'link-icons-example',
    templateUrl: './link-icons-example.html',
    styleUrls: ['./link-icons-example.css'],
    imports: [NxLinkComponent, RouterLink, NxIconComponent],
})
export class LinkIconsExampleComponent {}
